import type {
  GraphAnalysis,
  InputId,
  LevelDoc,
  MechanicDoc,
  PrototypePackage,
  SearchStatus,
  Solution,
  WinCondition,
} from "../core/types.js";
import { analyzeGraphWithRuntime } from "../core/graphAnalyzer.js";
import {
  counterfactualOptions,
  solveWithRuntime,
} from "../core/solver.js";
import {
  analyzeObjectParticipation,
  type ObjectParticipationSummary,
} from "../prototypes/objectParticipation.js";
import {
  analyzeAgencyWithRuntime,
  type AgencyAnalysis,
  type AgencyDecisionStep,
  type AgencySolutionBranchSummary,
  type SccAnalysis,
  type SccSolutionBranchSummary,
} from "../core/agencyAnalyzer.js";
import { buildAgencyDigest, formatAgencyDigestMarkdown } from "../core/agencyDigest.js";
import {
  calibrateTraceMetrics,
  type CalibratedTraceMetrics,
  type RawSolutionTraceMetrics,
} from "./traceMetricCalibration.js";
import {
  getRuntimeAdapter,
  type CurrentRuntimeAdapter,
} from "../prototypes/runtimeAdapter.js";

type RuntimeState = unknown;

export type LevelAnalysisOptions = {
  maxStates?: number;
  maxDepth?: number;
  graphMaxStates?: number;
  counterfactualMaxStates?: number;
};

export type TraceSnapshot = {
  step: number;
  input: InputId;
  legal: boolean;
  events: string[];
  reason?: string;
  before: string;
  after: string;
};

export type SolutionTraceMetrics = RawSolutionTraceMetrics & {
  playerTotalVisits?: number;
  playerUniqueVisitedCells?: number;
  walkableCellCount?: number;
  heavyReuseCellCount?: number;
  calibrated: CalibratedTraceMetrics;
};

export type CounterfactualAnalysis = {
  model: string;
  solvable: boolean;
  cost?: number;
  exploredStates: number;
  searchStatus?: SearchStatus;
  reason?: string;
};

export type LevelAnalysis = {
  prototype: string;
  level: {
    id: string;
    title: string;
    winCondition: WinCondition;
  };
  initialState: string;
  solution: {
    found: boolean;
    cost?: number;
    depth?: number;
    exploredStates: number;
    searchStatus?: SearchStatus;
    reason?: string;
    inputs: InputId[];
    events: string[];
    eventCounts: Record<string, number>;
    objectParticipation: ObjectParticipationSummary[];
    traceMetrics: SolutionTraceMetrics;
  };
  keySnapshots: TraceSnapshot[];
  graph: GraphAnalysis;
  agency: AgencyAnalysis;
  counterfactuals: CounterfactualAnalysis[];
};

export function analyzeLevel(
  pkg: PrototypePackage,
  level: LevelDoc,
  options: LevelAnalysisOptions = {},
): LevelAnalysis {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  const initial = adapter.parseLevel(level);
  const winCondition = level.win ?? pkg.mechanic.win;
  const maxStates = options.maxStates ?? 100_000;
  const maxDepth = options.maxDepth ?? 200;
  const solution = solveWithRuntime(runtime, initial, {
    winCondition,
    maxStates,
    maxDepth,
  });
  const graph = analyzeGraphWithRuntime(runtime, initial, {
    winCondition,
    maxStates: options.graphMaxStates ?? maxStates,
  });
  const agency = analyzeAgencyWithRuntime(runtime, initial, solution, {
    winCondition,
    maxStates: options.graphMaxStates ?? maxStates,
  });
  const solutionTrace = collectSolutionTraceData(
    adapter,
    pkg.mechanic,
    initial,
    solution,
    winCondition,
  );
  const traceMetrics: SolutionTraceMetrics = {
    ...solutionTrace.traceMetrics,
    calibrated: calibrateTraceMetrics(solutionTrace.traceMetrics, pkg.traceMetricCalibration),
  };
  const counterfactuals = analyzeCounterfactuals(adapter, pkg.mechanic, initial, winCondition, {
    maxStates: options.counterfactualMaxStates ?? maxStates,
    maxDepth,
  });
  return {
    prototype: pkg.mechanic.id,
    level: {
      id: level.id,
      title: level.title,
      winCondition,
    },
    initialState: adapter.renderState(initial),
    solution: {
      found: solution.found,
      cost: solution.found ? solution.cost : undefined,
      depth: solution.depth,
      exploredStates: solution.exploredStates,
      searchStatus: solution.searchStatus,
      reason: solution.reason,
      inputs: solution.inputs,
      events: solution.events,
      eventCounts: countEvents(solution.events),
      objectParticipation: analyzeObjectParticipation(pkg.mechanic.id, solution.events),
      traceMetrics,
    },
    keySnapshots: solutionTrace.keySnapshots,
    graph,
    agency,
    counterfactuals,
  };
}

function collectSolutionTraceData(
  adapter: CurrentRuntimeAdapter,
  mechanic: MechanicDoc,
  initial: RuntimeState,
  solution: Solution,
  winCondition: WinCondition,
): { keySnapshots: TraceSnapshot[]; traceMetrics: RawSolutionTraceMetrics & Pick<SolutionTraceMetrics, "playerTotalVisits" | "playerUniqueVisitedCells" | "walkableCellCount" | "heavyReuseCellCount"> } {
  if (!solution.found) {
    return {
      keySnapshots: [],
      traceMetrics: {
        status: "unavailable",
        reason: "No winning solution was available for trajectory replay.",
      },
    };
  }

  const keySnapshots: TraceSnapshot[] = [];
  let state = initial;
  const visitCounts = new Map<string, number>();
  let walkableCellCount: number | undefined;
  let traceFailure: string | undefined;
  const recordPlayerCells = (rendered: string, currentState: RuntimeState): void => {
    if (traceFailure) return;
    const board = readTrajectoryBoard(rendered, currentState);
    if (!board) {
      traceFailure = "Could not read a board for the canonical solution trace.";
      return;
    }
    if (walkableCellCount === undefined) {
      walkableCellCount = board.walkableCells.size;
      if (walkableCellCount === 0) {
        traceFailure = "The initial board has no readable walkable cells.";
        return;
      }
    }
    if (board.playerCells.size === 0) return;
    for (const key of board.playerCells) {
      visitCounts.set(key, (visitCounts.get(key) ?? 0) + 1);
    }
  }

  const initialRendered = adapter.renderState(initial);
  recordPlayerCells(initialRendered, initial);
  if (!traceFailure && visitCounts.size === 0) {
    traceFailure = "The initial board has no readable player cell.";
  }

  for (const [index, input] of solution.inputs.entries()) {
    const before = index === 0 ? initialRendered : adapter.renderState(state);
    if (index > 0) recordPlayerCells(before, state);

    const result = adapter.step(mechanic, state, input, { winCondition });
    const afterState = result.legal ? result.state : state;
    const shouldKeep = result.events.some((event) => event !== "walk");
    const isLast = index === solution.inputs.length - 1;
    const after = shouldKeep || isLast ? adapter.renderState(afterState) : undefined;
    if (shouldKeep) {
      keySnapshots.push({
        step: index + 1,
        input,
        legal: result.legal,
        events: result.events,
        reason: result.reason,
        before,
        after: after!,
      });
    }
    if (!result.legal) {
      traceFailure = `Canonical solution replay became illegal at input '${input}'.`;
    }
    state = afterState;
    if (isLast && after) recordPlayerCells(after, state);
  }

  if (traceFailure) {
    return {
      keySnapshots,
      traceMetrics: { status: "unavailable", reason: traceFailure },
    };
  }

  if (solution.inputs.length === 0 && visitCounts.size === 0) {
    return {
      keySnapshots,
      traceMetrics: {
        status: "unavailable",
        reason: "The canonical solution trace did not contain a readable player cell.",
      },
    };
  }

  const playerTotalVisits = [...visitCounts.values()].reduce((sum, count) => sum + count, 0);
  const playerUniqueVisitedCells = visitCounts.size;
  const heavyReuseCellCount = [...visitCounts.values()].filter((count) => count >= 3).length;

  return {
    keySnapshots,
    traceMetrics: {
      status: "complete",
      solutionCost: solution.cost,
      nonWalkEventCount: solution.events.filter((event) => event !== "walk").length,
      playerTotalVisits,
      playerUniqueVisitedCells,
      walkableCellCount,
      revisitRate: safeDivide(playerTotalVisits - playerUniqueVisitedCells, playerTotalVisits),
      heavyReuseCellCount,
      heavyReuseRatio: safeDivide(heavyReuseCellCount, walkableCellCount ?? 0),
    },
  };
}

type TrajectoryBoard = {
  playerCells: Set<string>;
  walkableCells: Set<string>;
};

function readTrajectoryBoard(rendered: string, state: RuntimeState): TrajectoryBoard | undefined {
  const rows = rendered.replace(/\r/g, "").split("\n");
  const stateRecord = state as { width?: unknown; height?: unknown };
  const width = typeof stateRecord.width === "number"
    ? stateRecord.width
    : Math.max(0, ...rows.map((row) => row.length));
  const height = typeof stateRecord.height === "number" ? stateRecord.height : rows.length;
  if (width === 0 || height === 0) return undefined;

  const playerCells = new Set<string>();
  const walkableCells = new Set<string>();
  for (let y = 0; y < height; y += 1) {
    const row = rows[y] ?? "";
    for (let x = 0; x < width; x += 1) {
      const glyph = row[x] ?? " ";
      if (glyph === "#") continue;
      const key = trajectoryCellKey(x, y);
      walkableCells.add(key);
      if (glyph === "@" || glyph === "+") playerCells.add(key);
    }
  }
  return { playerCells, walkableCells };
}

function trajectoryCellKey(x: number, y: number): string {
  return `${x},${y}`;
}

function safeDivide(numerator: number, denominator: number): number {
  return denominator === 0 ? 0 : numerator / denominator;
}

function analyzeCounterfactuals(
  adapter: CurrentRuntimeAdapter,
  mechanic: MechanicDoc,
  initial: RuntimeState,
  winCondition: WinCondition,
  options: { maxStates: number; maxDepth: number },
): CounterfactualAnalysis[] {
  return Object.keys(mechanic.counterfactuals ?? {}).map((model) => {
    const result = solveWithRuntime(
      adapter.createRuntime(mechanic),
      initial,
      counterfactualOptions(mechanic, model, {
        winCondition,
        maxStates: options.maxStates,
        maxDepth: options.maxDepth,
      }),
    );

    return {
      model,
      solvable: result.found,
      cost: result.found ? result.cost : undefined,
      exploredStates: result.exploredStates,
      searchStatus: result.searchStatus,
      reason: result.reason,
    };
  });
}

function countEvents(events: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const event of events) {
    counts[event] = (counts[event] ?? 0) + 1;
  }
  return counts;
}

export function formatLevelAnalysisMarkdown(analysis: LevelAnalysis): string {
  const lines: string[] = [
    `# Level Analysis: ${analysis.level.id}`,
    "",
    "## Summary",
    "",
    `- Prototype: ${analysis.prototype}`,
    `- Title: ${analysis.level.title}`,
    `- Win: ${analysis.level.winCondition.type}`,
    "",
    "## Initial State",
    "",
    codeBlock(analysis.initialState),
    "",
    "## Shortest Solution",
    "",
    ...formatSolutionSummary(analysis),
    "",
    "## Solution Trace Metrics",
    "",
    ...formatSolutionTraceMetrics(analysis.solution.traceMetrics),
    "",
    "## Object Participation",
    "",
    ...formatObjectParticipation(analysis.solution.objectParticipation),
    "",
    "## Key Event Snapshots",
    "",
    ...formatSnapshots(analysis.keySnapshots),
    "",
    "## Graph Facts",
    "",
    `- Status: ${analysis.graph.status}`,
    `- Reachable states: ${analysis.graph.reachableStateCount}`,
    `- Legal transitions: ${analysis.graph.legalTransitionCount}`,
    `- Event-only illegal transitions: ${analysis.graph.eventOnlyTransitionCount}`,
    `- Winning states: ${formatWinStateCount(analysis)}`,
    `- Budget: maxStates=${analysis.graph.budget.maxStates}${analysis.graph.budget.maxDepth === undefined ? "" : `, maxDepth=${analysis.graph.budget.maxDepth}`}`,
    ...(analysis.graph.reason ? [`- Reason: ${analysis.graph.reason}`] : []),
    "",
    "## Agency Facts",
    "",
    ...formatAgency(analysis.agency),
    "",
    "## Counterfactuals",
    "",
    ...formatCounterfactuals(analysis.counterfactuals),
    "",
    "## LLM Reviewer Material",
    "",
    "- Treat this report as evidence, not as a quality verdict.",
    "- Solution trace metrics describe execution pressure and space reuse only; they do not measure insight, causal dependency, counterintuitive reframing, or surprise payoff.",
    "- Read the key snapshots as candidate causal-chain nodes.",
    "- Check whether each non-walk event produces a later consumed state change.",
    "- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.",
  ];

  return `${lines.join("\n").trimEnd()}\n`;
}

function formatSolutionSummary(analysis: LevelAnalysis): string[] {
  if (!analysis.solution.found) {
    return [
      `- Found: no`,
      `- Explored states: ${analysis.solution.exploredStates}`,
      `- Search status: ${analysis.solution.searchStatus ?? "unknown"}`,
      `- Reason: ${analysis.solution.reason ?? "none"}`,
    ];
  }

  return [
    "- Found: yes",
    `- Cost: ${analysis.solution.cost}`,
    `- Depth: ${analysis.solution.depth ?? "unknown"}`,
    `- Explored states: ${analysis.solution.exploredStates}`,
    `- Inputs: ${analysis.solution.inputs.join(" ")}`,
    `- Events: ${analysis.solution.events.join(" ") || "none"}`,
    `- Event counts: ${formatEventCounts(analysis.solution.eventCounts)}`,
  ];
}

function formatSolutionTraceMetrics(metrics: SolutionTraceMetrics): string[] {
  if (metrics.status !== "complete") {
    return [
      `- Status: unavailable`,
      `- Reason: ${metrics.reason ?? "unknown"}`,
      ...formatCalibratedTraceMetrics(metrics.calibrated),
    ];
  }

  return [
    "- Scope: canonical solution trace only; not a quality verdict.",
    `- Solution cost: ${metrics.solutionCost}`,
    `- Non-walk events: ${metrics.nonWalkEventCount}`,
    `- Player visits: ${metrics.playerTotalVisits} total / ${metrics.playerUniqueVisitedCells} unique`,
    `- Walkable cells: ${metrics.walkableCellCount}`,
    `- Revisit rate: ${formatRatio(metrics.revisitRate)}`,
    `- Heavy-reuse cells: ${metrics.heavyReuseCellCount}`,
    `- Heavy-reuse ratio: ${formatRatio(metrics.heavyReuseRatio)}`,
    ...formatCalibratedTraceMetrics(metrics.calibrated),
  ];
}

function formatCalibratedTraceMetrics(metrics: CalibratedTraceMetrics): string[] {
  if (metrics.status === "unavailable") {
    return [
      `- Calibration: ${metrics.calibration}`,
      `- Calibrated status: unavailable (${metrics.reason ?? "unknown"})`,
    ];
  }

  return [
    `- Calibration: ${metrics.calibration} (${metrics.status})`,
    `- Execution-pressure band: ${formatCalibratedBand(metrics.solution_execution_pressure)}`,
    `- Space-reuse band: ${formatCalibratedBand(metrics.solution_space_reuse)}`,
  ];
}

function formatCalibratedBand(scope: CalibratedTraceMetrics["solution_execution_pressure"]): string {
  if (!scope || scope.status !== "enabled" || scope.aggregateBand === undefined) {
    return `unavailable (${scope?.reason ?? "unknown"})`;
  }
  return String(scope.aggregateBand);
}

function formatRatio(value: number | undefined): string {
  return value === undefined ? "unknown" : value.toFixed(3);
}

function formatObjectParticipation(participation: ObjectParticipationSummary[]): string[] {
  if (participation.length === 0) {
    return ["No instance-level object participation was reported on the returned solution."];
  }

  return participation.flatMap((item) => [
    `- ${item.objectType}/${item.role} via ${item.eventType}: distinct=${item.distinctInstances.length}, instances=${item.distinctInstances.join(", ")}, events=${item.eventCount}, evidence=${item.evidence}`,
    ...(item.note ? [`  ${item.note}`] : []),
  ]);
}

function formatSnapshots(snapshots: TraceSnapshot[]): string[] {
  if (snapshots.length === 0) {
    return ["No non-walk events were found on the returned solution."];
  }

  return snapshots.flatMap((snapshot) => [
    `### Step ${snapshot.step}: ${snapshot.input}`,
    "",
    `- Legal: ${snapshot.legal}`,
    `- Events: ${snapshot.events.join(", ") || "none"}`,
    ...(snapshot.reason ? [`- Reason: ${snapshot.reason}`] : []),
    "",
    "Before:",
    "",
    codeBlock(snapshot.before),
    "",
    "After:",
    "",
    codeBlock(snapshot.after),
    "",
  ]);
}

function formatAgency(agency: AgencyAnalysis): string[] {
  const header = [
    `- Status: ${agency.status}`,
    `- Compression rule: ${agency.compressionRule}`,
    `- Reachable states: ${agency.reachableStateCount}`,
    `- Legal transitions: ${agency.legalTransitionCount}`,
    `- Budget: maxStates=${agency.budget.maxStates}${agency.budget.maxDepth === undefined ? "" : `, maxDepth=${agency.budget.maxDepth}`}${agency.budget.maxTransitions === undefined ? "" : `, maxTransitions=${agency.budget.maxTransitions}`}`,
    ...(agency.reason ? [`- Reason: ${agency.reason}`] : []),
  ];

  if (agency.status !== "complete") {
    return [
      ...header,
      "- Metrics: unavailable because the reachable graph was not fully enumerated.",
    ];
  }

  return [
    ...header,
    `- Compressed regions: ${agency.compressedRegionCount}`,
    `- Bidirectional transitions: ${agency.bidirectionalTransitionCount}`,
    `- Commitment transitions: ${agency.commitmentTransitionCount}`,
    `- Winning regions: ${agency.winningRegionCount}`,
    `- Initial region: ${formatAgencyRegion(agency.initialRegion)}`,
    `- Solution region path: ${formatSolutionRegionPath(agency.solutionRegionPath ?? [])}`,
    `- Forced commitment prefix length: ${agency.forcedCommitmentPrefixLength ?? 0}`,
    `- Forced viable prefix length: ${agency.forcedViablePrefixLength ?? 0}`,
    `- Forced optimal prefix length: ${agency.forcedOptimalPrefixLength ?? 0}`,
    "",
    "### SCC Irreversible Progress",
    "",
    ...formatSccAnalysis(agency.scc),
    "",
    "### Bidirectional Compression Digest",
    "",
    ...formatAgencyDigestMarkdown(buildAgencyDigest(agency)),
    "",
    "### Solution Path Branches",
    "",
    ...formatAgencyBranches(agency),
    "",
    "### Decision Profile By Solution Step",
    "",
    ...formatDecisionSteps(agency.decisionSteps ?? []),
  ];
}

function formatAgencyRegion(region: AgencyAnalysis["initialRegion"]): string {
  if (!region) {
    return "n/a";
  }

  return [
    `r${region.regionId}`,
    `states=${region.stateCount}`,
    `dist=${formatNullableNumber(region.distanceToWin)}`,
    `internalBidirectional=${region.internalBidirectionalTransitionCount}`,
    `commitments=${region.commitmentCount}`,
    `viableCommitments=${region.viableCommitmentCount}`,
    `deadCommitments=${region.deadCommitmentCount}`,
    `progressCommitments=${region.progressCommitmentCount}`,
    `optimalCommitments=${region.optimalCommitmentCount}`,
  ].join(", ");
}

function formatSolutionRegionPath(path: NonNullable<AgencyAnalysis["solutionRegionPath"]>): string {
  if (path.length === 0) {
    return "none";
  }

  return path.map((entry) => `r${entry.regionId}@${entry.enteredAtStep}`).join(" -> ");
}

function formatAgencyBranches(agency: AgencyAnalysis): string[] {
  const branches = agency.branchCountsOnSolutionPath ?? [];
  if (branches.length === 0) {
    return ["No returned solution path was available."];
  }

  return [
    "| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |",
    ...branches.map((branch, index) =>
      formatAgencyBranchRow(branch, agency.solutionRegionPath?.[index]?.enteredAtStep),
    ),
  ];
}

function formatAgencyBranchRow(
  branch: AgencySolutionBranchSummary,
  enteredAtStep: number | undefined,
): string {
  return [
    `r${branch.regionId}`,
    enteredAtStep ?? "n/a",
    formatNullableNumber(branch.distanceToWin),
    branch.stateCount,
    branch.commitmentCount,
    branch.viableCommitmentCount,
    branch.deadCommitmentCount,
    branch.progressCommitmentCount,
    branch.optimalCommitmentCount,
    branch.solutionNextRegion === null ? "win/end" : `r${branch.solutionNextRegion}`,
    branch.forcedCommitment ? "yes" : "no",
    branch.forcedViableProgress ? "yes" : "no",
    branch.forcedOptimalProgress ? "yes" : "no",
  ].join(" | ").replace(/^/, "| ").replace(/$/, " |");
}

function formatSccAnalysis(scc: SccAnalysis | undefined): string[] {
  if (!scc) {
    return ["No SCC condensation was available."];
  }

  return [
    "- Shape: " +
      [
        `sccs=${scc.sccCount}`,
        `edges=${scc.sccEdgeCount}`,
        `winReachable=${scc.winReachableSccCount}`,
        `winning=${scc.winningSccCount}`,
        `winSubgraph=${scc.winSubgraphShape}`,
      ].join(", "),
    "- Solution irreversible path: " +
      [
        `steps=${scc.solutionIrreversibleStepCount}`,
        `forcedWinPrefix=${scc.forcedWinContinuationPrefixLength}/${scc.solutionIrreversibleStepCount}`,
        `branchingWinSccs=${scc.winContinuationBranchingSccCount}`,
        `mergingWinSccs=${scc.winContinuationMergingSccCount}`,
      ].join(", "),
    "- Handoff scriptiness: " +
      [
        `scope=${scc.handoffProfile.scope}`,
        `scripted=${scc.handoffProfile.scriptedHandoffCount}/${scc.handoffProfile.handoffCount}`,
        `trivial=${scc.handoffProfile.trivialSourceSccCount}`,
        `sameEntryExit=${scc.handoffProfile.sameEntryExitStateCount}`,
        `forcedScripted=${scc.handoffProfile.forcedScriptedHandoffCount}`,
        `maxRun=${scc.handoffProfile.maxConsecutiveScriptedHandoffs}`,
      ].join(", "),
    `- Initial SCC: ${formatSccNode(scc.initialScc)}`,
    `- SCC path: ${formatSccPath(scc.solutionSccPath)}`,
    "",
    "#### SCC Solution Path",
    "",
    ...formatSccSolutionBranches(scc.solutionPathBranches),
    "",
    "#### SCC Handoff Scriptiness",
    "",
    ...formatSccHandoffs(scc.handoffProfile.handoffs),
  ];
}

function formatSccNode(node: SccAnalysis["initialScc"]): string {
  return [
    `s${node.sccId}`,
    `states=${node.stateCount}`,
    `dist=${formatNullableNumber(node.distanceToWin)}`,
    `out=${node.outgoingCount}`,
    `winOut=${node.winReachableOutgoingCount}`,
    `deadOut=${node.deadOutgoingCount}`,
  ].join(", ");
}

function formatSccPath(path: SccAnalysis["solutionSccPath"]): string {
  if (path.length === 0) {
    return "none";
  }
  return path.map((entry) => `s${entry.sccId}@${entry.enteredAtStep}`).join(" -> ");
}

function formatSccSolutionBranches(branches: SccSolutionBranchSummary[]): string[] {
  if (branches.length === 0) {
    return ["No SCC solution path was available."];
  }

  return [
    "| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |",
    ...branches.map(formatSccSolutionBranchRow),
  ];
}

function formatSccSolutionBranchRow(branch: SccSolutionBranchSummary): string {
  return [
    `s${branch.sccId}`,
    branch.enteredAtStep ?? "n/a",
    formatNullableNumber(branch.distanceToWin),
    branch.stateCount,
    branch.outgoingCount,
    branch.winReachableOutgoingCount,
    branch.deadOutgoingCount,
    branch.incomingCount,
    branch.winReachableIncomingCount,
    branch.solutionNextSccId === null ? "win/end" : `s${branch.solutionNextSccId}`,
    branch.forcedWinContinuation ? "yes" : "no",
  ].join(" | ").replace(/^/, "| ").replace(/$/, " |");
}

function formatSccHandoffs(handoffs: SccAnalysis["handoffProfile"]["handoffs"]): string[] {
  if (handoffs.length === 0) {
    return ["No SCC handoffs were found on the returned solution."];
  }

  return [
    "| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |",
    "| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |",
    ...handoffs.map(formatSccHandoffRow),
  ];
}

function formatSccHandoffRow(handoff: SccAnalysis["handoffProfile"]["handoffs"][number]): string {
  return [
    `s${handoff.fromSccId}`,
    handoff.sourceEnteredAtStep,
    handoff.exitActionStep,
    `s${handoff.toSccId}`,
    handoff.sourceStateCount,
    handoff.entryEqualsExitSource ? "yes" : "no",
    handoff.forcedWinContinuation ? "yes" : "no",
    handoff.input ?? "n/a",
    escapeCell(handoff.events.join(", ") || "none"),
    handoff.reading,
  ].join(" | ").replace(/^/, "| ").replace(/$/, " |");
}

function formatDecisionSteps(steps: AgencyDecisionStep[]): string[] {
  if (steps.length === 0) {
    return ["No decision-step profile was available."];
  }

  return [
    "| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |",
    "| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...steps.map(formatDecisionStepRow),
  ];
}

function formatDecisionStepRow(step: AgencyDecisionStep): string {
  return [
    step.step,
    step.input ?? "initial",
    formatNullableRegion(step.regionId),
    step.enteredNewRegion ? "yes" : "no",
    formatNullableNumber(step.distanceToWin),
    formatNullableNumber(step.commitmentCount),
    formatNullableNumber(step.viableCommitmentCount),
    formatNullableNumber(step.deadCommitmentCount),
    formatNullableNumber(step.progressCommitmentCount),
    formatNullableNumber(step.optimalCommitmentCount),
    formatNullableRegion(step.nextSolutionRegionId),
    step.solutionTakesCommitmentNext ? "yes" : "no",
    formatNullableBoolean(step.nextSolutionIsViable),
    formatNullableBoolean(step.nextSolutionIsProgress),
    formatNullableBoolean(step.nextSolutionIsOptimal),
    formatNullableBoolean(step.forcedViableChoice),
    formatNullableBoolean(step.forcedOptimalChoice),
    escapeCell(step.events.join(", ") || "none"),
  ].join(" | ").replace(/^/, "| ").replace(/$/, " |");
}

function formatCounterfactuals(counterfactuals: CounterfactualAnalysis[]): string[] {
  if (counterfactuals.length === 0) {
    return ["No counterfactual models are configured."];
  }

  return [
    "| Model | Solvable | Cost | Explored | Status | Reason |",
    "| --- | --- | ---: | ---: | --- | --- |",
    ...counterfactuals.map(
      (item) =>
        `| ${escapeCell(item.model)} | ${item.solvable ? "yes" : "no"} | ${item.cost ?? "n/a"} | ${item.exploredStates} | ${item.searchStatus ?? "unknown"} | ${escapeCell(item.reason ?? "")} |`,
    ),
  ];
}

function formatWinStateCount(analysis: LevelAnalysis): string {
  if (analysis.level.winCondition.type === "event_occurs") {
    return `${analysis.graph.winStateCount} (state-win count only; event wins are checked by solver and bypass probes)`;
  }
  return String(analysis.graph.winStateCount);
}

function formatEventCounts(counts: Record<string, number>): string {
  const entries = Object.entries(counts);
  if (entries.length === 0) {
    return "none";
  }
  return entries.map(([event, count]) => `${event}=${count}`).join(", ");
}

function codeBlock(text: string): string {
  return `\`\`\`text\n${text}\n\`\`\``;
}

function escapeCell(text: string): string {
  return text.replaceAll("|", "\\|");
}

function formatNullableNumber(value: number | null | undefined): string {
  return value === null || value === undefined ? "n/a" : String(value);
}

function formatNullableRegion(value: number | null | undefined): string {
  return value === null || value === undefined ? "n/a" : `r${value}`;
}

function formatNullableBoolean(value: boolean | null | undefined): string {
  if (value === null || value === undefined) {
    return "n/a";
  }
  return value ? "yes" : "no";
}

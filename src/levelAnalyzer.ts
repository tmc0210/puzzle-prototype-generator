import type {
  GameState,
  GraphAnalysis,
  InputId,
  KnowledgeItem,
  LevelDoc,
  MechanicDoc,
  PrototypePackage,
  SearchStatus,
  Solution,
  WinCondition,
} from "./types.js";
import { analyzeGraphWithRuntime } from "./graphAnalyzer.js";
import {
  counterfactualOptions,
  findUncoveredGoalPathWithRuntime,
  solveWithRuntime,
} from "./solver.js";
import { coversEventPatterns } from "./events.js";
import {
  analyzeObjectParticipation,
  type ObjectParticipationSummary,
} from "./objectParticipation.js";
import {
  analyzeAgencyWithRuntime,
  type AgencyAnalysis,
  type AgencyDecisionStep,
  type AgencySolutionBranchSummary,
  type SccAnalysis,
  type SccSolutionBranchSummary,
} from "./agencyAnalyzer.js";
import { buildAgencyDigest, formatAgencyDigestMarkdown } from "./agencyDigest.js";
import { getRuntimeAdapter, type CurrentRuntimeAdapter } from "./runtimeAdapter.js";

export type LevelAnalysisOptions = {
  maxStates?: number;
  maxDepth?: number;
  graphMaxStates?: number;
  bypassMaxStates?: number;
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

export type CounterfactualAnalysis = {
  model: string;
  solvable: boolean;
  cost?: number;
  exploredStates: number;
  searchStatus?: SearchStatus;
  reason?: string;
};

export type BypassAnalysis = {
  checked: boolean;
  scope?: "shortest_cost_bound" | "full_search";
  found?: boolean;
  cost?: number;
  inputs?: InputId[];
  events?: string[];
  exploredStates?: number;
  searchStatus?: SearchStatus;
  reason?: string;
};

export type TargetEventAnalysis = {
  targetId: string;
  statement?: string;
  requiredEvents: string[];
  forbiddenEvents: string[];
  detectorConfigured: boolean;
  returnedSolutionCovers: boolean | "unknown";
  shortestBypass: BypassAnalysis;
  winningBypass: BypassAnalysis;
};

export type LevelAnalysis = {
  prototype: string;
  level: {
    id: string;
    title: string;
    role: string;
    status: string;
    targets: string[];
    supportLevel: string;
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
  };
  keySnapshots: TraceSnapshot[];
  graph: GraphAnalysis;
  agency: AgencyAnalysis;
  counterfactuals: CounterfactualAnalysis[];
  targets: TargetEventAnalysis[];
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
  const keySnapshots = collectKeySnapshots(adapter, pkg.mechanic, initial, solution, winCondition);
  const counterfactuals = analyzeCounterfactuals(adapter, pkg.mechanic, initial, winCondition, {
    maxStates: options.counterfactualMaxStates ?? maxStates,
    maxDepth,
  });
  const targets = level.targets.map((targetId) =>
    analyzeTargetEvents({
      mechanic: pkg.mechanic,
      adapter,
      knowledge: pkg.knowledge.knowledge,
      targetId,
      initial,
      winCondition,
      solution,
      maxStates: options.bypassMaxStates ?? maxStates,
      maxDepth,
    }),
  );

  return {
    prototype: pkg.mechanic.id,
    level: {
      id: level.id,
      title: level.title,
      role: level.role,
      status: level.status,
      targets: level.targets,
      supportLevel: level.support_level,
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
      objectParticipation: analyzeObjectParticipation(solution.events),
    },
    keySnapshots,
    graph,
    agency,
    counterfactuals,
    targets,
  };
}

function collectKeySnapshots(
  adapter: CurrentRuntimeAdapter,
  mechanic: MechanicDoc,
  initial: GameState,
  solution: Solution,
  winCondition: WinCondition,
): TraceSnapshot[] {
  if (!solution.found) {
    return [];
  }

  const snapshots: TraceSnapshot[] = [];
  let state = initial;
  for (const [index, input] of solution.inputs.entries()) {
    const before = adapter.renderState(state);
    const result = adapter.step(mechanic, state, input, { winCondition });
    const afterState = result.legal ? result.state : state;
    const shouldKeep = result.events.some((event) => event !== "walk");
    if (shouldKeep) {
      snapshots.push({
        step: index + 1,
        input,
        legal: result.legal,
        events: result.events,
        reason: result.reason,
        before,
        after: adapter.renderState(afterState),
      });
    }
    state = afterState;
  }
  return snapshots;
}

function analyzeCounterfactuals(
  adapter: CurrentRuntimeAdapter,
  mechanic: MechanicDoc,
  initial: GameState,
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

function analyzeTargetEvents({
  mechanic,
  adapter,
  knowledge,
  targetId,
  initial,
  winCondition,
  solution,
  maxStates,
  maxDepth,
}: {
  mechanic: MechanicDoc;
  adapter: CurrentRuntimeAdapter;
  knowledge: KnowledgeItem[];
  targetId: string;
  initial: GameState;
  winCondition: WinCondition;
  solution: Solution;
  maxStates: number;
  maxDepth: number;
}): TargetEventAnalysis {
  const item = knowledge.find((candidate) => candidate.id === targetId);
  const requiredEvents = item?.detector.required_events ?? [];
  const forbiddenEvents = item?.detector.forbidden_events ?? [];
  const detectorConfigured = requiredEvents.length > 0 || forbiddenEvents.length > 0;

  if (!detectorConfigured) {
    return {
      targetId,
      statement: item?.statement,
      requiredEvents,
      forbiddenEvents,
      detectorConfigured,
      returnedSolutionCovers: solution.found ? true : "unknown",
      shortestBypass: {
        checked: false,
        reason: "No event detector is configured for this target.",
      },
      winningBypass: {
        checked: false,
        reason: "No event detector is configured for this target.",
      },
    };
  }

  const returnedSolutionCovers = solution.found
    ? coversEventPatterns(solution.events, requiredEvents, forbiddenEvents)
    : "unknown";
  const shortestBypass = solution.found
    ? toBypassAnalysis(
        findUncoveredGoalPathWithRuntime(
          adapter.createRuntime(mechanic),
          initial,
          requiredEvents,
          forbiddenEvents,
          { winCondition, maxStates, maxDepth },
          solution.cost,
        ),
        "shortest_cost_bound",
      )
    : {
        checked: false,
        reason: "No returned winning solution; shortest bypass was not checked.",
      };
  const winningBypass = solution.found
    ? toBypassAnalysis(
        findUncoveredGoalPathWithRuntime(
          adapter.createRuntime(mechanic),
          initial,
          requiredEvents,
          forbiddenEvents,
          { winCondition, maxStates },
        ),
        "full_search",
      )
    : {
        checked: false,
        reason: "No returned winning solution; winning bypass was not checked.",
      };

  return {
    targetId,
    statement: item?.statement,
    requiredEvents,
    forbiddenEvents,
    detectorConfigured,
    returnedSolutionCovers,
    shortestBypass,
    winningBypass,
  };
}

function toBypassAnalysis(
  solution: Solution,
  scope: NonNullable<BypassAnalysis["scope"]>,
): BypassAnalysis {
  return {
    checked: true,
    scope,
    found: solution.found,
    cost: solution.found ? solution.cost : undefined,
    inputs: solution.found ? solution.inputs : undefined,
    events: solution.found ? solution.events : undefined,
    exploredStates: solution.exploredStates,
    searchStatus: solution.searchStatus,
    reason: solution.reason,
  };
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
    `- Role: ${analysis.level.role}`,
    `- Status: ${analysis.level.status}`,
    `- Support: ${analysis.level.supportLevel}`,
    `- Win: ${analysis.level.winCondition.type}`,
    `- Targets: ${analysis.level.targets.length > 0 ? analysis.level.targets.join(", ") : "none"}`,
    "",
    "## Initial State",
    "",
    codeBlock(analysis.initialState),
    "",
    "## Shortest Solution",
    "",
    ...formatSolutionSummary(analysis),
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
    "## Target Event Checks",
    "",
    ...formatTargets(analysis.targets),
    "",
    "## LLM Reviewer Material",
    "",
    "- Treat this report as evidence, not as a quality verdict.",
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
    `- Initial SCC: ${formatSccNode(scc.initialScc)}`,
    `- SCC path: ${formatSccPath(scc.solutionSccPath)}`,
    "",
    "#### SCC Solution Path",
    "",
    ...formatSccSolutionBranches(scc.solutionPathBranches),
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

function formatTargets(targets: TargetEventAnalysis[]): string[] {
  if (targets.length === 0) {
    return ["No level targets are declared."];
  }

  return targets.flatMap((target) => [
    `### ${target.targetId}`,
    "",
    ...(target.statement ? [`${target.statement}`, ""] : []),
    `- Required events: ${target.requiredEvents.join(", ") || "none"}`,
    `- Forbidden events: ${target.forbiddenEvents.join(", ") || "none"}`,
    `- Detector configured: ${target.detectorConfigured}`,
    `- Returned solution covers detector: ${target.returnedSolutionCovers}`,
    `- Shortest bypass: ${formatBypass(target.shortestBypass)}`,
    `- Winning bypass: ${formatBypass(target.winningBypass)}`,
    "",
  ]);
}

function formatBypass(bypass: BypassAnalysis): string {
  if (!bypass.checked) {
    return `not checked (${bypass.reason ?? "no reason"})`;
  }

  if (bypass.found) {
    return `found cost=${bypass.cost}, inputs=${bypass.inputs?.join(" ") ?? "n/a"}`;
  }

  if (bypass.scope === "shortest_cost_bound" && bypass.reason?.startsWith("depth budget exceeded")) {
    return `none found within returned shortest-cost bound; explored=${bypass.exploredStates}`;
  }

  if (bypass.searchStatus === "complete") {
    return `none found; complete search, explored=${bypass.exploredStates}`;
  }

  return `unknown; status=${bypass.searchStatus ?? "unknown"}, explored=${bypass.exploredStates ?? "n/a"}, reason=${bypass.reason ?? "none"}`;
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

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

import { eventMatchesPattern } from "../../../../../../src/core/events.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { InputId, LevelDoc, Point } from "../../../../../../src/core/types.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypeRoot = "prototypes/reality_anchor";
const studioRoot = `${prototypeRoot}/reports/studio_giant_sticky_piston_order_20260715`;
const candidateId = "RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL_v4";
const exactVersion = "v4_sha256_39839eef5d8c118500a0e4f3a48bfb9e38819fbb8a3cf06f6210f1e6ae58772b";
const expectedRawSha256 = "39839eef5d8c118500a0e4f3a48bfb9e38819fbb8a3cf06f6210f1e6ae58772b";
const layoutPath = `${studioRoot}/candidates/baseline/${candidateId}.txt`;
const outDir = `${studioRoot}/pre_submission_attempt_1/${candidateId}`;
const maxStates = 300_000;
const maxDepth = 120;
const canonicalInputs: InputId[] = [
  "up", "up", "up", "up", "left", "left", "left", "left", "down", "left", "left", "down", "right", "right",
];
const coreGroups = [
  { name: "完整三叉刚体受力", patterns: ["push_object:sticky#1", "move_sticky_rigid"] },
  { name: "四对象同拍力链", patterns: ["force_chain:n4"] },
  { name: "三触点同拍切箱", patterns: ["sticky_to_box:n3"] },
] as const;

type Graph = RuntimeGraph<RealityAnchorState, InputId>;
type Analysis = ReturnType<typeof analyzeState> | ReturnType<typeof invalidAnalysis>;

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const rawText = await readFile(layoutPath, "utf8");
const rawSha256 = createHash("sha256").update(rawText).digest("hex");
if (rawSha256 !== expectedRawSha256) {
  throw new Error(`exact v4 hash mismatch: expected ${expectedRawSha256}, got ${rawSha256}`);
}
const layout = normalize(rawText);
const initial = parse(candidateId, layout);

await Promise.all([
  mkdir(`${outDir}/goal_variants`, { recursive: true }),
  mkdir(`${outDir}/object_variants`, { recursive: true }),
  mkdir(`${outDir}/space_variants`, { recursive: true }),
  mkdir(`${outDir}/outline_variants`, { recursive: true }),
]);

const base = analyzeState(initial);
if (!base.solutionFound || base.shortestCost !== 14 || base.graphStatus !== "complete" || !base.canonicalReplayWin) {
  throw new Error(`base evidence mismatch: ${JSON.stringify(base)}`);
}

const goalVariants = [];
for (const target of targetCells(layout)) {
  const [x, y] = target;
  const id = `REMOVE_GOAL_${x}_${y}`;
  const variantLayout = removeGoal(layout, x, y);
  goalVariants.push(await persistVariant("goal_variants", id, variantLayout, {
    operation: "remove_goal_overlay",
    target,
  }));
}

const opening = analyzeOpening(initial);

const objectCandidates = [
  {
    id: "BOX_STICKY_ANCHOR",
    kind: "box_sticky_anchor",
    cells: findCells(layout, ["B", "S"]),
    candidateReason: "规范 trace 中不移动，且位于隔离墙室；submission 已把其玩家侧回报列为已知缺陷。",
  },
  {
    id: "PUSH_PULL_ANCHOR",
    kind: "push_pull_anchor",
    cells: findCells(layout, ["P", "L"]),
    candidateReason: "规范 trace 中不移动，且位于隔离墙室；需排除其仅为静态 blocker 的可能。",
  },
];
const objectVariants = [];
for (const object of objectCandidates) {
  for (const action of ["remove", "wallify"] as const) {
    const id = `${action.toUpperCase()}_${object.id}`;
    const variantLayout = rewriteObject(layout, object.cells, action);
    objectVariants.push(await persistVariant("object_variants", id, variantLayout, {
      operation: action,
      object,
    }));
  }
}

const canonicalTraceCells = traceCells(base.canonicalReplayStates);
const branchYs = [5, 9, 13, 17];
const leafTips = branchYs.map((y) => [12, y] as [number, number]);
const rightBranches = branchYs.map((y) => ({
  id: `RIGHT_BRANCH_Y${y}`,
  cells: [10, 11, 12].map((x) => [x, y] as [number, number]),
  entrance: [9, y] as [number, number],
}));
validateSpaceDiscovery(layout, leafTips, rightBranches);

const spaceCandidateFacts = {
  ordinaryFloorCount: findCells(layout, ["."]).length,
  leafTips: leafTips.map((cell) => ({
    cell,
    staticDegree: staticDegree(layout, cell[0], cell[1]),
    canonicalTraceUsed: canonicalTraceCells.has(cellKey(cell)),
  })),
  rightBranches: rightBranches.map((branch) => ({
    ...branch,
    externalNonWallNeighbors: externalNonWallNeighbors(layout, branch.cells),
    staticDegrees: branch.cells.map(([x, y]) => ({ cell: [x, y], degree: staticDegree(layout, x, y) })),
    canonicalTraceUsedCells: branch.cells.filter((cell) => canonicalTraceCells.has(cellKey(cell))),
  })),
};

const spaceVariants = [];
for (const [x, y] of leafTips) {
  const id = `WALL_LEAF_${x}_${y}`;
  spaceVariants.push(await persistVariant("space_variants", id, wallCells(layout, [[x, y]]), {
    operation: "floor_to_wall",
    scope: "single_leaf_tip",
    cells: [[x, y]],
  }));
}
for (const branch of rightBranches) {
  const id = `WALL_${branch.id}`;
  spaceVariants.push(await persistVariant("space_variants", id, wallCells(layout, branch.cells), {
    operation: "floor_to_wall",
    scope: "whole_single_entry_branch",
    cells: branch.cells,
    entrance: branch.entrance,
  }));
}
const allLeafLayout = wallCells(layout, leafTips);
spaceVariants.push(await persistVariant("space_variants", "WALL_ALL_LEAF_TIPS", allLeafLayout, {
  operation: "floor_to_wall",
  scope: "all_leaf_tips_combined",
  cells: leafTips,
}));
const allBranchCells = rightBranches.flatMap((branch) => branch.cells);
const allBranchLayout = wallCells(layout, allBranchCells);
spaceVariants.push(await persistVariant("space_variants", "WALL_ALL_RIGHT_BRANCHES", allBranchLayout, {
  operation: "floor_to_wall",
  scope: "all_single_entry_branches_combined",
  cells: allBranchCells,
}));

const originalOutlineAudit = outlineCandidates(layout);
const conditionalOutlineVariants = [];
for (const [id, predecessor, predecessorLayout] of [
  ["TRIM_RIGHT_AFTER_ALL_LEAF_TIPS", "WALL_ALL_LEAF_TIPS", allLeafLayout],
  ["TRIM_RIGHT_AFTER_ALL_RIGHT_BRANCHES", "WALL_ALL_RIGHT_BRANCHES", allBranchLayout],
] as const) {
  const candidate = outlineCandidates(predecessorLayout).find((item) => item.side === "right");
  if (!candidate) throw new Error(`${id}: expected conditional right trim candidate`);
  conditionalOutlineVariants.push(await persistVariant("outline_variants", id, candidate.layout, {
    operation: "trim_outline",
    side: "right",
    predecessor,
  }));
}

const report = {
  candidate_id: candidateId,
  exact_version: exactVersion,
  raw_layout_sha256: rawSha256,
  generated_at: new Date().toISOString(),
  command: `npx tsx ${outDir}/analyze.ts`,
  authorities: [
    `${prototypeRoot}/docs/design_handoff.yml`,
    `${prototypeRoot}/docs/goal_prune_check.md`,
    `${prototypeRoot}/docs/opening_comfort_check.md`,
    `${prototypeRoot}/docs/redundant_element_prune.md`,
  ],
  budgets: { maxStates, maxDepth, terminalizeWins: true },
  solve_instance: { layout_ref: layoutPath, layout },
  canonical_inputs: canonicalInputs,
  core_event_groups: coreGroups,
  base,
  goal_variants: goalVariants,
  opening,
  object_audit: {
    candidate_rule: "仅把规范 trace 中不移动、不转换且疑似隔离的锚点送入 remove；remove 失败后再测 wallify。",
    candidates: objectCandidates,
    variants: objectVariants,
    screened_non_candidates: [
      {
        id: "STICKY_COMPONENT_1",
        cells: findStickyComponents(layout)[0],
        reason: "21 格连通黏体在 step 13/14 整体右移，并在胜利步产生 move_sticky_rigid、force_chain:n4、sticky_to_box:n3。",
      },
      ...findCells(layout, ["C", "*"]).map((cell, index) => ({
        id: `CRATE_${index + 1}`,
        cells: [cell],
        reason: "三只目标箱均在胜利步由 x=10 推至 x=11 覆盖对应目标，参与 force_chain:n4。",
      })),
    ],
  },
  space_audit: {
    discovery_rule: "普通地面中的 degree<=1 leaf，以及边界外部非墙邻接仅有一个入口的单入口支路；同时测试相邻组合。",
    candidate_facts: spaceCandidateFacts,
    variants: spaceVariants,
  },
  outline_audit: {
    original_dimensions: dimensions(layout),
    original_candidates: originalOutlineAudit,
    conditional_after_space_prune: conditionalOutlineVariants,
  },
};

await writeFile(`${outDir}/raw_evidence.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  base: summarize(base),
  targets: goalVariants.map((item) => ({ id: item.id, ...summarize(item.analysis) })),
  opening: {
    initialSccStateCount: opening.initialSccStateCount,
    candidateStartCount: opening.candidates.length,
    current: opening.candidates.find((item) => item.isCurrentStart),
  },
  objects: objectVariants.map((item) => ({ id: item.id, ...summarize(item.analysis) })),
  spaces: spaceVariants.map((item) => ({ id: item.id, ...summarize(item.analysis), openingDelta: item.openingDelta })),
  outline: conditionalOutlineVariants.map((item) => ({ id: item.id, ...summarize(item.analysis), openingDelta: item.openingDelta })),
}, null, 2));

async function persistVariant(folder: string, id: string, variantLayout: string, operation: Record<string, unknown>) {
  const layoutRef = `${outDir}/${folder}/${id}.txt`;
  const evidenceRef = `${outDir}/${folder}/${id}.json`;
  const analysis = analyzeLayout(id, variantLayout);
  const openingDelta = compareOpening(base.opening, analysis.opening);
  const exactTraceUnchanged = sameReplay(base.canonicalReplay, analysis.canonicalReplay);
  const artifact = {
    candidate_id: candidateId,
    exact_version: exactVersion,
    operation,
    layout_ref: layoutRef,
    layout: variantLayout,
    analysis,
    hard_gate_comparison: {
      exact_trace_unchanged: exactTraceUnchanged,
      shortest_cost_unchanged: analysis.shortestCost === base.shortestCost,
      full_graph_complete: analysis.graphStatus === "complete",
      core_event_probe_complete: analysis.coreEventProbe.status === "complete",
      missing_core_event_winning_bypass: analysis.coreEventProbe.foundViolation
        ? analysis.coreEventProbe.missingGroups
        : "none",
      opening_delta: openingDelta,
    },
  };
  await writeFile(layoutRef, `${variantLayout}\n`, "utf8");
  await writeFile(evidenceRef, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
  return { id, layoutRef, evidenceRef, operation, analysis, openingDelta, exactTraceUnchanged };
}

function parse(id: string, candidateLayout: string): RealityAnchorState {
  const level: LevelDoc = { id, title: id, layout: candidateLayout, win: pkg.mechanic.win };
  return adapter.parseLevel(level) as RealityAnchorState;
}

function analyzeLayout(id: string, candidateLayout: string): Analysis {
  try {
    return analyzeState(parse(id, candidateLayout));
  } catch (error) {
    return invalidAnalysis(error);
  }
}

function invalidAnalysis(error: unknown) {
  return {
    parseStatus: "invalid" as const,
    parseError: error instanceof Error ? error.message : String(error),
    solutionFound: false,
    shortestCost: null,
    shortestInputs: [] as InputId[],
    solverStatus: "not_run_parse_invalid",
    graphStatus: "not_run_parse_invalid",
    reachableStates: 0,
    legalTransitions: 0,
    winningStates: 0,
    canonicalReplayLegal: false,
    canonicalReplayWin: false,
    canonicalReplay: null,
    canonicalReplayStates: [] as RealityAnchorState[],
    initialLegalActions: {},
    coreEventProbe: {
      status: "not_run_parse_invalid",
      foundViolation: false,
      missingGroups: coreGroups.map((group) => group.name),
    },
    opening: null,
    winningTransitionSummary: null,
  };
}

function analyzeState(state: RealityAnchorState) {
  const solution = solveWithRuntime(runtime, state, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth,
  });
  const graph = enumerateRuntimeGraph(
    runtime,
    state,
    pkg.mechanic.win,
    { winCondition: pkg.mechanic.win },
    { maxStates, terminalizeWins: true },
  ) as Graph;
  const canonical = replay(state, canonicalInputs);
  return {
    parseStatus: "valid" as const,
    solutionFound: solution.found,
    shortestCost: Number.isFinite(solution.cost) ? solution.cost : null,
    shortestInputs: solution.inputs,
    solverStatus: solution.searchStatus,
    graphStatus: graph.status,
    graphReason: graph.reason,
    reachableStates: graph.keys.length,
    legalTransitions: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    canonicalReplayLegal: canonical.legal,
    canonicalReplayWin: canonical.win,
    canonicalReplay: canonical.serializable,
    canonicalReplayStates: canonical.states,
    initialLegalActions: legalActions(state),
    coreEventProbe: findWinningPathMissingCore(state),
    opening: graph.status === "complete" ? openingMetrics(graph) : null,
    winningTransitionSummary: graph.status === "complete" ? winningTransitionSummary(graph) : null,
  };
}

function replay(initialState: RealityAnchorState, inputs: readonly InputId[]) {
  let state = initialState;
  const states = [state];
  const steps: Array<{ action: InputId; legal: boolean; events: string[]; stateKey: string }> = [];
  for (const action of inputs) {
    const result = runtime.step(state, action, { winCondition: pkg.mechanic.win });
    steps.push({ action, legal: result.legal, events: result.events, stateKey: runtime.key(result.state) });
    if (!result.legal) {
      return {
        legal: false,
        win: false,
        states,
        serializable: { legal: false, win: false, steps, finalStateKey: runtime.key(state) },
      };
    }
    state = result.state as RealityAnchorState;
    states.push(state);
  }
  const win = runtime.isWin(state, pkg.mechanic.win);
  return {
    legal: true,
    win,
    states,
    serializable: { legal: true, win, steps, finalStateKey: runtime.key(state) },
  };
}

function legalActions(state: RealityAnchorState) {
  return Object.fromEntries(
    (runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]).flatMap((action) => {
      const result = runtime.step(state, action, { winCondition: pkg.mechanic.win });
      return result.legal ? [[action, result.events]] : [];
    }),
  );
}

function findWinningPathMissingCore(initialState: RealityAnchorState) {
  const allMask = (1 << coreGroups.length) - 1;
  const queue: Array<{ state: RealityAnchorState; mask: number; depth: number; inputs: InputId[] }> = [
    { state: initialState, mask: 0, depth: 0, inputs: [] },
  ];
  const visited = new Set([`${runtime.key(initialState)}|0`]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    if (visited.size > maxStates) {
      return {
        status: "exhausted" as const,
        foundViolation: false,
        exploredProductStates: visited.size,
        reason: `state budget exceeded (${maxStates})`,
        missingGroups: coreGroups.map((group) => group.name),
      };
    }
    const current = queue[cursor]!;
    const isWin = runtime.isWin(current.state, pkg.mechanic.win);
    if (isWin && current.mask !== allMask) {
      return {
        status: "found" as const,
        foundViolation: true,
        exploredProductStates: visited.size,
        bypassDepth: current.depth,
        bypassInputs: current.inputs,
        missingGroups: coreGroups
          .filter((_, index) => (current.mask & (1 << index)) === 0)
          .map((group) => group.name),
      };
    }
    if (isWin) continue;
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) continue;
      let mask = current.mask;
      coreGroups.forEach((group, index) => {
        if (group.patterns.some((pattern) => result.events.some((event) => eventMatchesPattern(event, pattern)))) {
          mask |= 1 << index;
        }
      });
      const nextState = result.state as RealityAnchorState;
      const key = `${runtime.key(nextState)}|${mask}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: nextState, mask, depth: current.depth + 1, inputs: [...current.inputs, action] });
    }
  }
  return {
    status: "complete" as const,
    foundViolation: false,
    exploredProductStates: visited.size,
    missingGroups: [] as string[],
    reason: "完整乘积图中不存在缺少任一核心事件组的胜路。",
  };
}

function winningTransitionSummary(graph: Graph) {
  const incoming = graph.edges.filter((edge) => graph.winStateIndexes.has(edge.to) && !graph.winStateIndexes.has(edge.from));
  return {
    nonWinToWinEdgeCount: incoming.length,
    everyWinningEdgeMovesRight: incoming.every((edge) => edge.action === "right"),
    everyWinningEdgeHasCompleteStickyPush: incoming.every((edge) =>
      edge.events.includes("push_object:sticky#1") && edge.events.includes("move_sticky_rigid")),
    everyWinningEdgeHasForceChainN4: incoming.every((edge) => edge.events.includes("force_chain:n4")),
    everyWinningEdgeHasStickyToBoxN3: incoming.every((edge) => edge.events.includes("sticky_to_box:n3")),
    eventSets: [...new Set(incoming.map((edge) => JSON.stringify(edge.events)))].map((events) => JSON.parse(events)),
  };
}

function analyzeOpening(initialState: RealityAnchorState) {
  const graph = enumerateRuntimeGraph(
    runtime,
    initialState,
    pkg.mechanic.win,
    { winCondition: pkg.mechanic.win },
    { maxStates, terminalizeWins: true },
  ) as Graph;
  if (graph.status !== "complete") throw new Error("opening source graph incomplete");
  const scc = tarjan(graph);
  const initialComponent = scc.of[0]!;
  const members = new Set(scc.components[initialComponent]!);
  const sameObjectPositions = new Map<string, Point>();
  for (const index of members) {
    const candidateState = graph.states[index]!;
    const player = candidateState.player;
    const candidate = { ...initialState, player } as RealityAnchorState;
    if (runtime.key(candidate) === runtime.key(candidateState)) {
      sameObjectPositions.set(`${player.x},${player.y}`, { ...player });
    }
  }
  const candidates = [...sameObjectPositions.values()]
    .sort((a, b) => a.y - b.y || a.x - b.x)
    .map((player) => {
      const candidateState = { ...initialState, player } as RealityAnchorState;
      const analysis = analyzeState(candidateState);
      const firstStepLegalEvents = legalActions(candidateState);
      return {
        candidateStartPosition: [player.x, player.y],
        isCurrentStart: player.x === initialState.player.x && player.y === initialState.player.y,
        shortestSolutionCost: analysis.shortestCost,
        shortestSolutionDeltaFromCurrent: analysis.shortestCost === null ? null : analysis.shortestCost - 14,
        initialSccSize: analysis.opening?.initialSccSize ?? null,
        initialSccExitCount: analysis.opening?.initialSccExitSourceCount ?? null,
        initialExitSourceDistances: analysis.opening?.exitSourceDistances ?? [],
        initialWinExitSourceDistances: analysis.opening?.winExitSourceDistances ?? [],
        nearestIrreversibleExitDistance: analysis.opening?.nearestIrreversibleExitDistance ?? null,
        nearestWinReachingExitDistance: analysis.opening?.nearestWinExitDistance ?? null,
        deadExitsBeforeFirstWinExit: analysis.opening?.deadExitsBeforeFirstWinExit ?? null,
        firstStepLegalEvents,
        whetherCoreChainPreserved: analysis.coreEventProbe.status === "complete" && !analysis.coreEventProbe.foundViolation,
        graphStatus: analysis.graphStatus,
        coreEventProbeStatus: analysis.coreEventProbe.status,
      };
    });
  return {
    sourceGraphStatus: graph.status,
    sourceReachableStates: graph.keys.length,
    sourceLegalTransitions: graph.edges.length,
    initialSccStateCount: members.size,
    sameObjectCandidateStartCount: candidates.length,
    enumerationRule: "完整 runtime 图 initial SCC 内、对象配置与 exact v4 初态相同的全部玩家位置；每个位置重跑 solver、完整图与核心事件乘积图。",
    candidates,
  };
}

function openingMetrics(graph: Graph) {
  const scc = tarjan(graph);
  const initialComponent = scc.of[0]!;
  const members = new Set(scc.components[initialComponent]!);
  const distances = distancesInside(graph, members);
  const winReachable = reverseWinReachable(graph);
  const exitEdges = graph.edges.filter((edge) => members.has(edge.from) && !members.has(edge.to));
  const bySource = new Map<number, { distance: number; winReaching: boolean; dead: boolean }>();
  for (const edge of exitEdges) {
    const distance = distances[edge.from];
    if (distance === undefined) continue;
    const current = bySource.get(edge.from) ?? { distance, winReaching: false, dead: false };
    current.winReaching ||= winReachable.has(edge.to);
    current.dead ||= !winReachable.has(edge.to);
    bySource.set(edge.from, current);
  }
  const exitSources = [...bySource.values()];
  const exitSourceDistances = exitSources.map((item) => item.distance).sort((a, b) => a - b);
  const winExitSourceDistances = exitSources.filter((item) => item.winReaching).map((item) => item.distance).sort((a, b) => a - b);
  const nearestWinExitDistance = winExitSourceDistances.length ? Math.min(...winExitSourceDistances) : null;
  const targetSummaries = new Map<number, {
    targetScc: number;
    winReaching: boolean;
    transitionCount: number;
    sourceStates: Set<number>;
    distances: number[];
    actions: Set<string>;
    eventSets: Set<string>;
  }>();
  for (const edge of exitEdges) {
    const targetScc = scc.of[edge.to]!;
    const summary = targetSummaries.get(targetScc) ?? {
      targetScc,
      winReaching: winReachable.has(edge.to),
      transitionCount: 0,
      sourceStates: new Set<number>(),
      distances: [],
      actions: new Set<string>(),
      eventSets: new Set<string>(),
    };
    summary.transitionCount += 1;
    summary.sourceStates.add(edge.from);
    if (distances[edge.from] !== undefined) summary.distances.push(distances[edge.from]!);
    summary.actions.add(edge.action);
    summary.eventSets.add(JSON.stringify(edge.events));
    targetSummaries.set(targetScc, summary);
  }
  return {
    initialSccSize: members.size,
    initialSccExitTransitionCount: exitEdges.length,
    initialSccExitSourceCount: bySource.size,
    initialSccExitTargetCount: new Set(exitEdges.map((edge) => scc.of[edge.to]!)).size,
    exitSourceDistances,
    winExitSourceDistances,
    nearestIrreversibleExitDistance: exitSourceDistances.length ? Math.min(...exitSourceDistances) : null,
    nearestWinExitDistance,
    deadExitsBeforeFirstWinExit: nearestWinExitDistance === null
      ? null
      : exitSources.filter((item) => item.dead && item.distance < nearestWinExitDistance).length,
    deadExitTargetSccsBeforeFirstWinExit: nearestWinExitDistance === null
      ? null
      : new Set(exitEdges.filter((edge) => {
        const distance = distances[edge.from];
        return distance !== undefined && distance < nearestWinExitDistance && !winReachable.has(edge.to);
      }).map((edge) => scc.of[edge.to]!)).size,
    exitTargetSummaries: [...targetSummaries.values()].map((summary) => ({
      targetScc: summary.targetScc,
      winReaching: summary.winReaching,
      transitionCount: summary.transitionCount,
      sourceStateCount: summary.sourceStates.size,
      sourceDistances: summary.distances.sort((a, b) => a - b),
      actions: [...summary.actions].sort(),
      eventSets: [...summary.eventSets].map((events) => JSON.parse(events)),
    })).sort((a, b) => Number(b.winReaching) - Number(a.winReaching) || a.targetScc - b.targetScc),
  };
}

function compareOpening(baseOpening: ReturnType<typeof openingMetrics> | null, variantOpening: ReturnType<typeof openingMetrics> | null) {
  if (!baseOpening || !variantOpening) return { status: "unknown" };
  return {
    status: "measured",
    initialSccSize: `${baseOpening.initialSccSize}->${variantOpening.initialSccSize}`,
    initialSccSizeDelta: variantOpening.initialSccSize - baseOpening.initialSccSize,
    initialSccExitSourceCount: `${baseOpening.initialSccExitSourceCount}->${variantOpening.initialSccExitSourceCount}`,
    nearestIrreversibleExitDistance: `${baseOpening.nearestIrreversibleExitDistance}->${variantOpening.nearestIrreversibleExitDistance}`,
    nearestWinReachingExitDistance: `${baseOpening.nearestWinExitDistance}->${variantOpening.nearestWinExitDistance}`,
    deadExitsBeforeFirstWinExit: `${baseOpening.deadExitsBeforeFirstWinExit}->${variantOpening.deadExitsBeforeFirstWinExit}`,
    irreversibleCommitmentMovedEarlier:
      baseOpening.nearestIrreversibleExitDistance !== null &&
      variantOpening.nearestIrreversibleExitDistance !== null &&
      variantOpening.nearestIrreversibleExitDistance < baseOpening.nearestIrreversibleExitDistance,
    winCommitmentMovedFarther:
      baseOpening.nearestWinExitDistance !== null &&
      variantOpening.nearestWinExitDistance !== null &&
      variantOpening.nearestWinExitDistance > baseOpening.nearestWinExitDistance,
    moreDeadExitsBeforeFirstWin:
      baseOpening.deadExitsBeforeFirstWinExit !== null &&
      variantOpening.deadExitsBeforeFirstWinExit !== null &&
      variantOpening.deadExitsBeforeFirstWinExit > baseOpening.deadExitsBeforeFirstWinExit,
  };
}

function summarize(analysis: Analysis) {
  return {
    parseStatus: analysis.parseStatus,
    parseError: "parseError" in analysis ? analysis.parseError : undefined,
    shortestCost: analysis.shortestCost,
    graphStatus: analysis.graphStatus,
    reachableStates: analysis.reachableStates,
    legalTransitions: analysis.legalTransitions,
    winningStates: analysis.winningStates,
    canonicalReplayLegal: analysis.canonicalReplayLegal,
    canonicalReplayWin: analysis.canonicalReplayWin,
    coreEventProbe: analysis.coreEventProbe,
  };
}

function sameReplay(a: unknown, b: unknown) {
  return a !== null && b !== null && JSON.stringify(a) === JSON.stringify(b);
}

function targetCells(candidateLayout: string): Array<[number, number]> {
  return candidateLayout.split("\n").flatMap((row, y) => [...row].flatMap((glyph, x) =>
    ["G", "*", "m", "+"].includes(glyph) ? [[x, y] as [number, number]] : []));
}

function removeGoal(candidateLayout: string, x: number, y: number) {
  const rows = grid(candidateLayout);
  const replacements: Record<string, string> = { G: ".", "*": "C", m: "M", "+": "@" };
  const glyph = rows[y]?.[x];
  if (!glyph || !(glyph in replacements)) throw new Error(`no goal at ${x},${y}`);
  rows[y]![x] = replacements[glyph]!;
  return joinGrid(rows);
}

function findCells(candidateLayout: string, glyphs: string[]): Array<[number, number]> {
  return candidateLayout.split("\n").flatMap((row, y) => [...row].flatMap((glyph, x) =>
    glyphs.includes(glyph) ? [[x, y] as [number, number]] : []));
}

function findStickyComponents(candidateLayout: string) {
  const remaining = new Set(findCells(candidateLayout, ["M", "m"]).map(cellKey));
  const components: Array<Array<[number, number]>> = [];
  while (remaining.size) {
    const first = remaining.values().next().value as string;
    remaining.delete(first);
    const queue = [parseCellKey(first)];
    for (let cursor = 0; cursor < queue.length; cursor += 1) {
      const [x, y] = queue[cursor]!;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const key = `${x + dx},${y + dy}`;
        if (remaining.delete(key)) queue.push([x + dx, y + dy]);
      }
    }
    components.push(queue.sort((a, b) => a[1] - b[1] || a[0] - b[0]));
  }
  return components;
}

function rewriteObject(candidateLayout: string, cells: Array<[number, number]>, action: "remove" | "wallify") {
  const rows = grid(candidateLayout);
  const remove: Record<string, string> = { B: ".", S: ".", P: ".", L: ".", C: ".", "*": "G", M: ".", m: "G" };
  for (const [x, y] of cells) {
    const glyph = rows[y]?.[x];
    if (!glyph) throw new Error(`missing object cell ${x},${y}`);
    rows[y]![x] = action === "wallify" ? "#" : remove[glyph]!;
  }
  return joinGrid(rows);
}

function wallCells(candidateLayout: string, cells: Array<[number, number]>) {
  const rows = grid(candidateLayout);
  for (const [x, y] of cells) {
    if (rows[y]?.[x] !== ".") throw new Error(`space candidate ${x},${y} is not ordinary floor`);
    rows[y]![x] = "#";
  }
  return joinGrid(rows);
}

function staticDegree(candidateLayout: string, x: number, y: number) {
  const rows = candidateLayout.split("\n");
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => {
    const glyph = rows[y + dy]?.[x + dx];
    return glyph !== undefined && glyph !== "#";
  }).length;
}

function externalNonWallNeighbors(candidateLayout: string, cells: Array<[number, number]>) {
  const member = new Set(cells.map(cellKey));
  const rows = candidateLayout.split("\n");
  const external = new Set<string>();
  for (const [x, y] of cells) {
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const next: [number, number] = [x + dx, y + dy];
      const glyph = rows[next[1]]?.[next[0]];
      if (glyph !== undefined && glyph !== "#" && !member.has(cellKey(next))) external.add(cellKey(next));
    }
  }
  return [...external].map(parseCellKey).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
}

function validateSpaceDiscovery(
  candidateLayout: string,
  tips: Array<[number, number]>,
  branches: Array<{ cells: Array<[number, number]>; entrance: [number, number] }>,
) {
  for (const [x, y] of tips) {
    if (staticDegree(candidateLayout, x, y) !== 1) throw new Error(`expected leaf at ${x},${y}`);
  }
  for (const branch of branches) {
    const outside = externalNonWallNeighbors(candidateLayout, branch.cells);
    if (outside.length !== 1 || cellKey(outside[0]!) !== cellKey(branch.entrance)) {
      throw new Error(`expected single-entry branch at ${branch.cells.map(cellKey).join(";")}`);
    }
  }
}

function outlineCandidates(candidateLayout: string) {
  const rows = candidateLayout.split("\n");
  const closed = (candidate: string[]) =>
    candidate.length >= 3 &&
    [...candidate[0]!].every((glyph) => glyph === "#") &&
    [...candidate.at(-1)!].every((glyph) => glyph === "#") &&
    candidate.every((row) => row[0] === "#" && row.at(-1) === "#");
  return [
    { side: "top", rows: rows.slice(1) },
    { side: "bottom", rows: rows.slice(0, -1) },
    { side: "left", rows: rows.map((row) => row.slice(1)) },
    { side: "right", rows: rows.map((row) => row.slice(0, -1)) },
  ].flatMap((item) => closed(item.rows) ? [{ side: item.side, layout: item.rows.join("\n") }] : []);
}

function traceCells(states: RealityAnchorState[]) {
  const cells = new Set<string>();
  for (const state of states) {
    cells.add(`${state.player.x},${state.player.y}`);
    state.crates.forEach((point) => cells.add(`${point.x},${point.y}`));
    state.stickyGroups.forEach((group) => group.forEach((point) => cells.add(`${point.x},${point.y}`)));
    if (state.pushPullAnchor) {
      cells.add(`${state.pushPullAnchor.push.x},${state.pushPullAnchor.push.y}`);
      cells.add(`${state.pushPullAnchor.pull.x},${state.pushPullAnchor.pull.y}`);
    }
    if (state.boxStickyAnchor) {
      cells.add(`${state.boxStickyAnchor.box.x},${state.boxStickyAnchor.box.y}`);
      cells.add(`${state.boxStickyAnchor.sticky.x},${state.boxStickyAnchor.sticky.y}`);
    }
  }
  return cells;
}

function tarjan(graph: Graph) {
  const adjacency = Array.from({ length: graph.states.length }, () => [] as number[]);
  graph.edges.forEach((edge) => adjacency[edge.from]!.push(edge.to));
  const indexes = Array(graph.states.length).fill(-1) as number[];
  const low = Array(graph.states.length).fill(0) as number[];
  const onStack = Array(graph.states.length).fill(false) as boolean[];
  const stack: number[] = [];
  const components: number[][] = [];
  const of = Array(graph.states.length).fill(-1) as number[];
  let nextIndex = 0;
  const visit = (node: number) => {
    indexes[node] = low[node] = nextIndex++;
    stack.push(node);
    onStack[node] = true;
    for (const target of adjacency[node]!) {
      if (indexes[target] === -1) {
        visit(target);
        low[node] = Math.min(low[node]!, low[target]!);
      } else if (onStack[target]) {
        low[node] = Math.min(low[node]!, indexes[target]!);
      }
    }
    if (low[node] !== indexes[node]) return;
    const component: number[] = [];
    while (true) {
      const member = stack.pop()!;
      onStack[member] = false;
      component.push(member);
      of[member] = components.length;
      if (member === node) break;
    }
    components.push(component);
  };
  for (let index = 0; index < graph.states.length; index += 1) {
    if (indexes[index] === -1) visit(index);
  }
  return { components, of };
}

function distancesInside(graph: Graph, members: Set<number>) {
  const adjacency = Array.from({ length: graph.states.length }, () => [] as number[]);
  graph.edges.forEach((edge) => adjacency[edge.from]!.push(edge.to));
  const distances = Array<number | undefined>(graph.states.length).fill(undefined);
  distances[0] = 0;
  const queue = [0];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    for (const to of adjacency[from]!) {
      if (!members.has(to) || distances[to] !== undefined) continue;
      distances[to] = distances[from]! + 1;
      queue.push(to);
    }
  }
  return distances;
}

function reverseWinReachable(graph: Graph) {
  const reverse = Array.from({ length: graph.states.length }, () => [] as number[]);
  graph.edges.forEach((edge) => reverse[edge.to]!.push(edge.from));
  const seen = new Set(graph.winStateIndexes);
  const queue = [...seen];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const previous of reverse[queue[cursor]!]!) {
      if (seen.has(previous)) continue;
      seen.add(previous);
      queue.push(previous);
    }
  }
  return seen;
}

function dimensions(candidateLayout: string) {
  const rows = candidateLayout.split("\n");
  return { width: rows[0]!.length, height: rows.length };
}

function cellKey([x, y]: [number, number]) { return `${x},${y}`; }
function parseCellKey(key: string) { return key.split(",").map(Number) as [number, number]; }
function grid(candidateLayout: string) { return candidateLayout.split("\n").map((row) => [...row]); }
function joinGrid(rows: string[][]) { return rows.map((row) => row.join("")).join("\n"); }
function normalize(text: string) { return text.replace(/\r/g, "").replace(/\n+$/g, ""); }

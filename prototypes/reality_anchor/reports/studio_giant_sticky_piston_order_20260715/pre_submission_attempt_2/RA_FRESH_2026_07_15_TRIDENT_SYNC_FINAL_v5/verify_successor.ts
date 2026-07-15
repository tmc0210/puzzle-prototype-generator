import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

import { eventMatchesPattern } from "../../../../../../src/core/events.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../../../../src/core/types.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypeRoot = "prototypes/reality_anchor";
const studioRoot = `${prototypeRoot}/reports/studio_giant_sticky_piston_order_20260715`;
const candidateId = "RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL";
const exactVersion = "v5";
const layoutRef = `${studioRoot}/candidates/baseline/${candidateId}_${exactVersion}.txt`;
const predecessorRef = `${studioRoot}/pre_submission_attempt_1/RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL_v4/outline_variants/TRIM_RIGHT_AFTER_ALL_LEAF_TIPS.txt`;
const outDir = `${studioRoot}/pre_submission_attempt_2/${candidateId}_${exactVersion}`;
const expectedSha256 = "79dcb407d4464dc53e839129afb4e511a7785166d99a8fa58ad093509c9bdee4";
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

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const rawText = await readFile(layoutRef, "utf8");
const predecessorText = await readFile(predecessorRef, "utf8");
const rawSha256 = sha256(rawText);
if (rawSha256 !== expectedSha256) {
  throw new Error(`v5 hash mismatch: expected ${expectedSha256}, got ${rawSha256}`);
}
if (rawText !== predecessorText) {
  throw new Error("v5 is not byte-identical to the reviewed v4 cleanup successor artifact");
}
const layout = normalize(rawText);

await Promise.all([
  mkdir(`${outDir}/goal_variants`, { recursive: true }),
  mkdir(`${outDir}/object_variants`, { recursive: true }),
  mkdir(`${outDir}/space_variants`, { recursive: true }),
]);

const base = analyze("BASE", layout);
assertBase(base);

const goalVariants = [];
for (const [x, y] of [[11, 7], [11, 11], [11, 15]] as Array<[number, number]>) {
  goalVariants.push(await persist("goal_variants", `REMOVE_GOAL_${x}_${y}`, removeGoal(layout, x, y), {
    operation: "remove_goal_overlay",
    target: [x, y],
  }));
}

const objectVariants = [];
for (const object of [
  { id: "BOX_STICKY_ANCHOR", cells: [[9, 1], [10, 1]] as Array<[number, number]> },
  { id: "PUSH_PULL_ANCHOR", cells: [[9, 3], [10, 3]] as Array<[number, number]> },
]) {
  objectVariants.push(await persist("object_variants", `REMOVE_${object.id}`, rewriteCells(layout, object.cells, "."), {
    operation: "remove",
    object,
  }));
  objectVariants.push(await persist("object_variants", `WALLIFY_${object.id}`, rewriteCells(layout, object.cells, "#"), {
    operation: "wallify",
    object,
  }));
}

const branchYs = [5, 9, 13, 17];
const spaceVariants = [];
for (const y of branchYs) {
  spaceVariants.push(await persist("space_variants", `WALL_LEAF_11_${y}`, rewriteCells(layout, [[11, y]], "#"), {
    operation: "floor_to_wall",
    scope: "remaining_leaf_tip",
    cells: [[11, y]],
  }));
  spaceVariants.push(await persist(
    "space_variants",
    `WALL_RIGHT_BRANCH_Y${y}`,
    rewriteCells(layout, [[10, y], [11, y]], "#"),
    {
      operation: "floor_to_wall",
      scope: "remaining_two_cell_observation_branch",
      cells: [[10, y], [11, y]],
      entrance: [9, y],
    },
  ));
}
const allRemainingLeafTips = branchYs.map((y) => [11, y] as [number, number]);
spaceVariants.push(await persist(
  "space_variants",
  "WALL_ALL_REMAINING_LEAF_TIPS",
  rewriteCells(layout, allRemainingLeafTips, "#"),
  {
    operation: "floor_to_wall",
    scope: "all_remaining_leaf_tips",
    cells: allRemainingLeafTips,
  },
));
const allBranchCells = branchYs.flatMap((y) => [[10, y], [11, y]] as Array<[number, number]>);
spaceVariants.push(await persist("space_variants", "WALL_ALL_RIGHT_BRANCHES", rewriteCells(layout, allBranchCells, "#"), {
  operation: "floor_to_wall",
  scope: "all_remaining_two_cell_observation_branches",
  cells: allBranchCells,
}));

const report = {
  candidate_id: candidateId,
  exact_version: exactVersion,
  layout_ref: layoutRef,
  raw_layout_sha256: rawSha256,
  normalized_layout_sha256: sha256(layout),
  predecessor_cleanup_artifact_ref: predecessorRef,
  predecessor_byte_identical: rawText === predecessorText,
  generated_at: new Date().toISOString(),
  command: `npx tsx ${outDir}/verify_successor.ts`,
  authorities: [
    `${prototypeRoot}/docs/design_handoff.yml`,
    `${prototypeRoot}/docs/goal_prune_check.md`,
    `${prototypeRoot}/docs/opening_comfort_check.md`,
    `${prototypeRoot}/docs/redundant_element_prune.md`,
  ],
  budgets: { maxStates, maxDepth, terminalizeWins: true },
  canonical_inputs: canonicalInputs,
  core_event_groups: coreGroups,
  base,
  goal_variants: goalVariants,
  object_variants: objectVariants,
  remaining_space_candidates: {
    branch_cells: branchYs.map((y) => ({
      y,
      cells: [[10, y], [11, y]],
      tip_static_degree: staticDegree(layout, 11, y),
      role_under_designer_judgment: "opening_readability_aesthetic_observation_band",
    })),
    variants: spaceVariants,
  },
  outline_audit: {
    dimensions: { width: layout.split("\n")[0]!.length, height: layout.split("\n").length },
    trim_candidates: [],
    reason: "继续裁右列会使 x=11 的三个目标和保留观察短槽成为非墙外边界，不满足外圈全墙。",
  },
};

await writeFile(`${outDir}/successor_verification.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  hash: rawSha256,
  predecessorByteIdentical: rawText === predecessorText,
  base: compact(base),
  goals: goalVariants.map((item) => ({ id: item.id, ...compact(item.analysis) })),
  objects: objectVariants.map((item) => ({ id: item.id, ...compact(item.analysis) })),
  spaces: spaceVariants.map((item) => ({ id: item.id, ...compact(item.analysis) })),
}, null, 2));

async function persist(folder: string, id: string, variantLayout: string, operation: Record<string, unknown>) {
  const variantRef = `${outDir}/${folder}/${id}.txt`;
  const evidenceRef = `${outDir}/${folder}/${id}.json`;
  const analysis = analyze(id, variantLayout);
  const artifact = {
    candidate_id: candidateId,
    exact_version: exactVersion,
    source_layout_sha256: rawSha256,
    operation,
    layout_ref: variantRef,
    layout_sha256: sha256(`${variantLayout}\n`),
    analysis,
    comparison_to_base: {
      shortest_cost_delta: `${base.shortestCost}->${analysis.shortestCost}`,
      exact_trace_legal: analysis.canonicalReplayLegal,
      exact_trace_win: analysis.canonicalReplayWin,
      full_graph_status: analysis.graphStatus,
      missing_core_event_winning_bypass: analysis.coreEventProbe.foundViolation
        ? analysis.coreEventProbe.missingGroups
        : "none",
      opening: compareOpening(base.opening, analysis.opening),
    },
  };
  await writeFile(variantRef, `${variantLayout}\n`, "utf8");
  await writeFile(evidenceRef, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
  return { id, layoutRef: variantRef, evidenceRef, operation, analysis };
}

function analyze(id: string, candidateLayout: string) {
  try {
    const state = parse(id, candidateLayout);
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
      initialLegalActions: legalActions(state),
      coreEventProbe: findWinningPathMissingCore(state),
      opening: graph.status === "complete" ? openingMetrics(graph) : null,
      winningTransitionSummary: graph.status === "complete" ? winningTransitionSummary(graph) : null,
    };
  } catch (error) {
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
      initialLegalActions: {},
      coreEventProbe: {
        status: "not_run_parse_invalid" as const,
        foundViolation: false,
        missingGroups: coreGroups.map((group) => group.name),
      },
      opening: null,
      winningTransitionSummary: null,
    };
  }
}

function legalActions(state: RealityAnchorState) {
  return Object.fromEntries(
    (runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]).flatMap((action) => {
      const result = runtime.step(state, action, { winCondition: pkg.mechanic.win });
      return result.legal ? [[action, result.events]] : [];
    }),
  );
}

function parse(id: string, candidateLayout: string) {
  const level: LevelDoc = { id, title: id, layout: candidateLayout, win: pkg.mechanic.win };
  return adapter.parseLevel(level) as RealityAnchorState;
}

function replay(initial: RealityAnchorState, inputs: readonly InputId[]) {
  let state = initial;
  const steps: Array<{ action: InputId; legal: boolean; events: string[]; stateKey: string }> = [];
  for (const action of inputs) {
    const result = runtime.step(state, action, { winCondition: pkg.mechanic.win });
    steps.push({ action, legal: result.legal, events: result.events, stateKey: runtime.key(result.state) });
    if (!result.legal) {
      return { legal: false, win: false, serializable: { legal: false, win: false, steps, finalStateKey: runtime.key(state) } };
    }
    state = result.state as RealityAnchorState;
  }
  const win = runtime.isWin(state, pkg.mechanic.win);
  return { legal: true, win, serializable: { legal: true, win, steps, finalStateKey: runtime.key(state) } };
}

function findWinningPathMissingCore(initial: RealityAnchorState) {
  const allMask = (1 << coreGroups.length) - 1;
  const queue: Array<{ state: RealityAnchorState; mask: number; depth: number; inputs: InputId[] }> = [
    { state: initial, mask: 0, depth: 0, inputs: [] },
  ];
  const visited = new Set([`${runtime.key(initial)}|0`]);
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
        missingGroups: coreGroups.filter((_, index) => (current.mask & (1 << index)) === 0).map((group) => group.name),
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
    reason: "完整事件乘积图中不存在缺少任一核心事件组的胜路。",
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

function openingMetrics(graph: Graph) {
  const scc = tarjan(graph);
  const initialComponent = scc.of[0]!;
  const members = new Set(scc.components[initialComponent]!);
  const initialObjectKey = withoutPlayer(graph.keys[0]!);
  const sameObjectCandidateStarts = [...members]
    .filter((index) => withoutPlayer(graph.keys[index]!) === initialObjectKey)
    .map((index) => graph.keys[index]!.match(/^Ply:([^|]+)/)?.[1] ?? "unknown")
    .sort((a, b) => {
      const [ax, ay] = a.split(",").map(Number);
      const [bx, by] = b.split(",").map(Number);
      return ay! - by! || ax! - bx!;
    });
  const distances = distancesInside(graph, members);
  const winReachable = reverseWinReachable(graph);
  const exitEdges = graph.edges.filter((edge) => members.has(edge.from) && !members.has(edge.to));
  const bySource = new Map<number, { distance: number; winReaching: boolean; dead: boolean }>();
  for (const edge of exitEdges) {
    const distance = distances[edge.from];
    if (distance === undefined) continue;
    const item = bySource.get(edge.from) ?? { distance, winReaching: false, dead: false };
    item.winReaching ||= winReachable.has(edge.to);
    item.dead ||= !winReachable.has(edge.to);
    bySource.set(edge.from, item);
  }
  const sources = [...bySource.values()];
  const exitSourceDistances = sources.map((item) => item.distance).sort((a, b) => a - b);
  const winExitSourceDistances = sources.filter((item) => item.winReaching).map((item) => item.distance).sort((a, b) => a - b);
  const nearestWin = winExitSourceDistances.length ? Math.min(...winExitSourceDistances) : null;
  return {
    initialSccSize: members.size,
    sameObjectCandidateStartCount: sameObjectCandidateStarts.length,
    sameObjectCandidateStarts,
    initialSccExitSourceCount: bySource.size,
    exitSourceDistances,
    winExitSourceDistances,
    nearestIrreversibleExitDistance: exitSourceDistances.length ? Math.min(...exitSourceDistances) : null,
    nearestWinExitDistance: nearestWin,
    deadExitsBeforeFirstWinExit: nearestWin === null ? null : sources.filter((item) => item.dead && item.distance < nearestWin).length,
  };
}

function withoutPlayer(key: string) {
  return key.replace(/^Ply:[^|]+\|/, "");
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

function compareOpening(baseOpening: ReturnType<typeof openingMetrics> | null, variantOpening: ReturnType<typeof openingMetrics> | null) {
  if (!baseOpening || !variantOpening) return { status: "unknown" };
  return {
    status: "measured",
    initialSccSize: `${baseOpening.initialSccSize}->${variantOpening.initialSccSize}`,
    nearestIrreversibleExitDistance: `${baseOpening.nearestIrreversibleExitDistance}->${variantOpening.nearestIrreversibleExitDistance}`,
    nearestWinExitDistance: `${baseOpening.nearestWinExitDistance}->${variantOpening.nearestWinExitDistance}`,
    deadExitsBeforeFirstWinExit: `${baseOpening.deadExitsBeforeFirstWinExit}->${variantOpening.deadExitsBeforeFirstWinExit}`,
  };
}

function assertBase(analysis: ReturnType<typeof analyze>) {
  if (
    analysis.parseStatus !== "valid" ||
    !analysis.solutionFound ||
    analysis.shortestCost !== 14 ||
    analysis.graphStatus !== "complete" ||
    analysis.reachableStates !== 923 ||
    analysis.legalTransitions !== 2929 ||
    analysis.winningStates !== 9 ||
    !analysis.canonicalReplayWin ||
    analysis.coreEventProbe.status !== "complete" ||
    analysis.coreEventProbe.foundViolation
  ) {
    throw new Error(`base successor verification failed: ${JSON.stringify(analysis)}`);
  }
}

function compact(analysis: ReturnType<typeof analyze>) {
  return {
    parseStatus: analysis.parseStatus,
    shortestCost: analysis.shortestCost,
    graphStatus: analysis.graphStatus,
    states: analysis.reachableStates,
    transitions: analysis.legalTransitions,
    wins: analysis.winningStates,
    traceLegal: analysis.canonicalReplayLegal,
    traceWin: analysis.canonicalReplayWin,
    coreProbe: analysis.coreEventProbe,
    opening: analysis.opening,
  };
}

function removeGoal(candidateLayout: string, x: number, y: number) {
  const rows = candidateLayout.split("\n").map((row) => [...row]);
  const glyph = rows[y]?.[x];
  if (glyph === "G") rows[y]![x] = ".";
  else if (glyph === "*") rows[y]![x] = "C";
  else if (glyph === "m") rows[y]![x] = "M";
  else if (glyph === "+") rows[y]![x] = "@";
  else throw new Error(`expected goal overlay at ${x},${y}, found ${glyph}`);
  return rows.map((row) => row.join("")).join("\n");
}

function rewriteCells(candidateLayout: string, cells: Array<[number, number]>, glyph: string) {
  const rows = candidateLayout.split("\n").map((row) => [...row]);
  for (const [x, y] of cells) rows[y]![x] = glyph;
  return rows.map((row) => row.join("")).join("\n");
}

function staticDegree(candidateLayout: string, x: number, y: number) {
  const rows = candidateLayout.split("\n");
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => rows[y + dy]?.[x + dx] !== "#").length;
}

function sha256(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

function normalize(text: string) {
  return text.replace(/\r/g, "").replace(/\n+$/g, "");
}

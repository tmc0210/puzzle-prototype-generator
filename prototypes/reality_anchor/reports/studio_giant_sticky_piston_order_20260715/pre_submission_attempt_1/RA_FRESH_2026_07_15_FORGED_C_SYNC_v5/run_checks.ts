import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { InputId, LevelDoc, Point } from "../../../../../../src/core/types.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const root = "prototypes/reality_anchor";
const studioRoot = `${root}/reports/studio_giant_sticky_piston_order_20260715`;
const candidateId = "RA_FRESH_2026_07_15_FORGED_C_SYNC_v5";
const exactVersion = `${candidateId}_sha256_9bfae9c5c1160d4088fc59c317c2bfef33bd77b7066bca23e19850fd867cb590`;
const expectedRawSha256 = "9bfae9c5c1160d4088fc59c317c2bfef33bd77b7066bca23e19850fd867cb590";
const layoutPath = `${studioRoot}/candidates/application/${candidateId}.txt`;
const replayPath = `${root}/reports/input_replay_${candidateId}.json`;
const outDir = `${studioRoot}/pre_submission_attempt_1/${candidateId}`;
const maxStates = 300_000;
const canonicalInputs: InputId[] = [
  "right", "right", "right",
  "left", "left", "left", "left", "left",
  "down", "down", "down", "right",
];
const coreNames = [
  "B/S 第一段 S4/B5→S5/B6（box_to_sticky:n2）",
  "B/S 第二段 S5/B6→S6/B7（box_to_sticky:n2）",
  "B/S 第三段 S6/B7→S7/B8（box_to_sticky:n4）",
  "29 格完整主体终拍（n3 + rigid + n4，并覆盖两个远端点）",
] as const;

type Graph = RuntimeGraph<RealityAnchorState, InputId>;
type ObjectUnit = {
  id: string;
  kind: string;
  cells: Array<[number, number]>;
  grouping?: "runtime_object" | "design_material_group";
};

const pkg = await loadPrototypePackage(root);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

await mkdir(outDir, { recursive: true });
for (const child of ["goal_variants", "object_variants", "space_variants", "outline_variants"]) {
  await mkdir(`${outDir}/${child}`, { recursive: true });
}

const rawText = await readFile(layoutPath, "utf8");
const rawSha256 = createHash("sha256").update(rawText).digest("hex");
if (rawSha256 !== expectedRawSha256) throw new Error(`exact layout hash mismatch: ${rawSha256}`);
const layout = normalize(rawText);
const replayDoc = JSON.parse(await readFile(replayPath, "utf8"));
if (JSON.stringify(replayDoc.inputs) !== JSON.stringify(canonicalInputs)) throw new Error("canonical replay inputs mismatch");

const initial = parse(candidateId, layout);
const baseDetailed = analyzeState(initial);
if (
  !baseDetailed.serializable.solutionFound
  || baseDetailed.serializable.shortestCost !== 12
  || baseDetailed.serializable.graphStatus !== "complete"
  || !baseDetailed.serializable.canonicalReplayWin
  || baseDetailed.serializable.coreEventProbe.status !== "complete"
  || baseDetailed.serializable.coreEventProbe.foundViolation
) {
  throw new Error("base evidence does not match reviewed v5");
}

const goals = targetCells(layout);
const goalVariants = [];
for (const [x, y] of goals) {
  const id = `NO_GOAL_${x}_${y}`;
  const variantLayout = removeGoal(layout, x, y);
  const analysis = analyzeLayout(`${candidateId}_${id}`, variantLayout);
  const layoutRef = `${outDir}/goal_variants/${id}.txt`;
  const evidenceRef = `${outDir}/goal_variants/${id}.json`;
  await writeFile(layoutRef, `${variantLayout}\n`, "utf8");
  const record = {
    operation: "remove_goal_overlay",
    target: [x, y],
    layoutRef,
    evidenceRef,
    analysis,
  };
  await writeJson(evidenceRef, { candidateId, exactVersion, ...record, layout: variantLayout });
  goalVariants.push(record);
}

const opening = analyzeOpening(initial, baseDetailed.graph);

const objectUnits: ObjectUnit[] = [
  { id: "BOX_STICKY_ANCHOR", kind: "box_sticky_anchor", cells: [[4, 2], [5, 2]], grouping: "runtime_object" },
  { id: "PUSH_PULL_ANCHOR", kind: "push_pull_anchor", cells: [[7, 1], [8, 1]], grouping: "runtime_object" },
  { id: "MATERIAL_UPPER_TIP", kind: "crate", cells: [[7, 5]], grouping: "runtime_object" },
  { id: "TARGET_BOX_UPPER", kind: "crate", cells: [[8, 5]], grouping: "runtime_object" },
  { id: "MATERIAL_UPPER_SUPPORT_1", kind: "crate", cells: [[5, 6]], grouping: "runtime_object" },
  { id: "MATERIAL_UPPER_SUPPORT_2", kind: "crate", cells: [[6, 6]], grouping: "runtime_object" },
  { id: "MATERIAL_UPPER_SUPPORT_3", kind: "crate", cells: [[7, 6]], grouping: "runtime_object" },
  { id: "MATERIAL_LOWER_SUPPORT_1", kind: "crate", cells: [[5, 10]], grouping: "runtime_object" },
  { id: "MATERIAL_LOWER_SUPPORT_2", kind: "crate", cells: [[6, 10]], grouping: "runtime_object" },
  { id: "MATERIAL_LOWER_SUPPORT_3", kind: "crate", cells: [[7, 10]], grouping: "runtime_object" },
  { id: "MATERIAL_LOWER_TIP", kind: "crate", cells: [[7, 11]], grouping: "runtime_object" },
  { id: "TARGET_BOX_LOWER", kind: "crate", cells: [[8, 11]], grouping: "runtime_object" },
  {
    id: "THICK_SPINE_3X7",
    kind: "sticky_component",
    cells: rectangleCells(2, 5, 4, 11),
    grouping: "runtime_object",
  },
  {
    id: "MATERIAL_OCTET",
    kind: "crate_design_group",
    cells: [[7, 5], [5, 6], [6, 6], [7, 6], [5, 10], [6, 10], [7, 10], [7, 11]],
    grouping: "design_material_group",
  },
];

const objectVariants = [];
for (const unit of objectUnits) {
  for (const action of ["remove", "wallify"] as const) {
    const id = `${action.toUpperCase()}_${unit.id}`;
    const variantLayout = rewriteCells(layout, unit.cells, action);
    const analysis = analyzeLayout(`${candidateId}_${id}`, variantLayout);
    const layoutRef = `${outDir}/object_variants/${id}.txt`;
    const evidenceRef = `${outDir}/object_variants/${id}.json`;
    await writeFile(layoutRef, `${variantLayout}\n`, "utf8");
    const record = { operation: action, object: unit, layoutRef, evidenceRef, analysis };
    await writeJson(evidenceRef, { candidateId, exactVersion, ...record, layout: variantLayout });
    objectVariants.push(record);
  }
}

const traceCells = canonicalTraceCells(initial, canonicalInputs);
const degreeOneFloors = floorCells(layout).filter(([x, y]) => staticDegree(layout, x, y) <= 1);
const spaceUnits = [
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `LEFT_CHANNEL_${index + 2}`,
    kind: "left_channel_cell",
    cells: [[1, index + 2] as [number, number]],
  })),
  { id: "UPPER_CLOSED_POCKET", kind: "closed_pocket", cells: [[8, 6] as [number, number]] },
  { id: "LOWER_CLOSED_POCKET", kind: "closed_pocket", cells: [[8, 10] as [number, number]] },
  { id: "BOTH_CLOSED_POCKETS", kind: "closed_pocket_pair", cells: [[8, 6] as [number, number], [8, 10] as [number, number]] },
  ...degreeOneFloors
    .filter(([x, y]) => !(x === 1 && y >= 2 && y <= 11))
    .map(([x, y]) => ({ id: `STATIC_LEAF_${x}_${y}`, kind: "static_degree_le_1", cells: [[x, y] as [number, number]] })),
];
const seenSpaceUnits = new Set<string>();
const spaceVariants = [];
for (const unit of spaceUnits) {
  const cellKey = unit.cells.map(([x, y]) => `${x},${y}`).sort().join(";");
  if (seenSpaceUnits.has(cellKey)) continue;
  seenSpaceUnits.add(cellKey);
  const id = `WALL_${unit.id}`;
  const variantLayout = wallCells(layout, unit.cells);
  const analysis = analyzeLayout(`${candidateId}_${id}`, variantLayout);
  const layoutRef = `${outDir}/space_variants/${id}.txt`;
  const evidenceRef = `${outDir}/space_variants/${id}.json`;
  await writeFile(layoutRef, `${variantLayout}\n`, "utf8");
  const record = {
    operation: "wall_prune",
    space: {
      ...unit,
      staticDegrees: unit.cells.map(([x, y]) => ({ cell: [x, y], degree: staticDegree(layout, x, y) })),
      canonicalTraceUsed: unit.cells.some(([x, y]) => traceCells.has(`${x},${y}`)),
    },
    layoutRef,
    evidenceRef,
    analysis,
  };
  await writeJson(evidenceRef, { candidateId, exactVersion, ...record, layout: variantLayout });
  spaceVariants.push(record);
}

const outlineAudit = auditOutline(layout);
const outlineVariants = [];
for (const variant of outlineAudit.variants) {
  const id = `TRIM_${variant.side.toUpperCase()}_${variant.count}`;
  const analysis = analyzeLayout(`${candidateId}_${id}`, variant.layout);
  const layoutRef = `${outDir}/outline_variants/${id}.txt`;
  const evidenceRef = `${outDir}/outline_variants/${id}.json`;
  await writeFile(layoutRef, `${variant.layout}\n`, "utf8");
  const record = { operation: "trim", side: variant.side, count: variant.count, layoutRef, evidenceRef, analysis };
  await writeJson(evidenceRef, { candidateId, exactVersion, ...record, layout: variant.layout });
  outlineVariants.push(record);
}

const rawEvidence = {
  workflow: "reality_anchor_application_exact_v5_pre_submission_check",
  candidate_id: candidateId,
  exact_version: exactVersion,
  raw_layout_sha256: rawSha256,
  solve_instance_ref: layoutPath,
  canonical_replay_ref: replayPath,
  command: `npx tsx ${outDir}/run_checks.ts`,
  budget: { maxStates, terminalizeWins: true },
  core_definition: {
    groups: coreNames,
    matching_rule: "B/S 三段按 before/after 锚点坐标与 n2/n2/n4 事件分别识别；终拍要求前态最大 sticky 分量恰为 29 格、n3/rigid/n4 事件齐全，且后态同时覆盖 (9,5)/(9,11)。",
  },
  base: baseDetailed.serializable,
  goal_variants: goalVariants,
  opening,
  redundant_element_audit: {
    sequence: ["goal_prune", "object_remove_prune", "object_wallify_prune", "space_prune", "wall_outline_prune"],
    object_units: objectUnits,
    object_variants: objectVariants,
    space_candidate_rule: "显式检查左通道、上下闭合口袋与全部静态 degree<=1 普通地面；凸包式普通房间不自动列入。",
    degree_one_floor_candidates: degreeOneFloors,
    space_variants: spaceVariants,
    outline_audit: outlineAudit,
    outline_variants: outlineVariants,
  },
};
await writeJson(`${outDir}/raw_evidence.json`, rawEvidence);

console.log(JSON.stringify({
  candidateId,
  exactVersion,
  base: compact(baseDetailed.serializable),
  goals: goalVariants.map((item) => ({ target: item.target, ...compact(item.analysis) })),
  opening: {
    initialSccSize: opening.initialSccSize,
    candidateStarts: opening.candidates.length,
    current: opening.candidates.find((item) => item.isCurrentStart),
  },
  outline: outlineVariants.map((item) => ({ side: item.side, count: item.count, ...compact(item.analysis) })),
}, null, 2));

function parse(id: string, candidateLayout: string): RealityAnchorState {
  const level: LevelDoc = {
    id,
    title: id,
    layout: candidateLayout,
    win: pkg.mechanic.win,
  };
  return adapter.parseLevel(level) as RealityAnchorState;
}

function analyzeLayout(id: string, candidateLayout: string) {
  try {
    return analyzeState(parse(id, candidateLayout)).serializable;
  } catch (error) {
    return {
      parseStatus: "invalid",
      parseError: error instanceof Error ? error.message : String(error),
      solutionFound: false,
      shortestCost: null,
      graphStatus: "not_run_parse_invalid",
      reachableStates: 0,
      legalTransitions: 0,
      winningStates: 0,
      canonicalReplayLegal: false,
      canonicalReplayWin: false,
      coreEventProbe: {
        status: "not_run_parse_invalid",
        foundViolation: false,
        missingGroups: [...coreNames],
      },
      opening: null,
    };
  }
}

function analyzeState(state: RealityAnchorState) {
  const solution = solveWithRuntime(runtime, state, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth: 120,
  });
  const graph = enumerateRuntimeGraph(
    runtime,
    state,
    pkg.mechanic.win,
    { winCondition: pkg.mechanic.win },
    { maxStates, terminalizeWins: true },
  ) as Graph;
  const canonical = replay(state, canonicalInputs);
  const coreEventProbe = coreBypassProbe(graph);
  return {
    graph,
    serializable: {
      parseStatus: "valid",
      solutionFound: solution.found,
      shortestCost: Number.isFinite(solution.cost) ? solution.cost : null,
      shortestInputs: solution.inputs ?? [],
      graphStatus: graph.status,
      graphReason: graph.reason,
      reachableStates: graph.keys.length,
      legalTransitions: graph.edges.length,
      winningStates: graph.winStateIndexes.size,
      canonicalReplayLegal: canonical.legal,
      canonicalReplayWin: canonical.win,
      canonicalReplay: canonical.serializable,
      coreEventProbe,
      opening: graph.status === "complete" ? openingMetrics(graph) : null,
    },
  };
}

function coreBypassProbe(graph: Graph) {
  const allMask = (1 << coreNames.length) - 1;
  const outgoing = Array.from({ length: graph.states.length }, () => [] as Graph["edges"]);
  for (const edge of graph.edges) outgoing[edge.from]!.push(edge);
  const queue: Array<{ index: number; mask: number }> = [{ index: 0, mask: 0 }];
  const visited = new Set<string>(["0|0"]);
  const winningMasks = new Set<number>();
  const transitionCounts = Object.fromEntries(coreNames.map((name) => [name, 0])) as Record<string, number>;
  for (const edge of graph.edges) {
    const bit = coreTransitionBit(graph.states[edge.from]!, graph.states[edge.to]!, edge.events);
    if (bit !== 0) transitionCounts[coreNames[Math.log2(bit)]!] += 1;
  }
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (graph.winStateIndexes.has(current.index)) {
      winningMasks.add(current.mask);
      if (current.mask !== allMask) {
        return {
          status: "found",
          foundViolation: true,
          exploredProductStates: visited.size,
          winningProductStates: winningMasks.size,
          winningMasks: [...winningMasks].sort((a, b) => a - b),
          missingGroups: coreNames.filter((_, index) => (current.mask & (1 << index)) === 0),
          transitionCounts,
        };
      }
    }
    for (const edge of outgoing[current.index]!) {
      const nextMask = current.mask | coreTransitionBit(graph.states[edge.from]!, graph.states[edge.to]!, edge.events);
      const key = `${edge.to}|${nextMask}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ index: edge.to, mask: nextMask });
    }
  }
  return {
    status: graph.status === "complete" ? "complete" : "exhausted",
    foundViolation: false,
    exploredProductStates: visited.size,
    winningProductStates: winningMasks.size,
    winningMasks: [...winningMasks].sort((a, b) => a - b),
    missingGroups: [],
    transitionCounts,
  };
}

function coreTransitionBit(before: RealityAnchorState, after: RealityAnchorState, events: readonly string[]) {
  const has = (event: string) => events.includes(event);
  const sweepEvents = has("push_object:box_sticky_anchor") && has("anchor_boundary_shift:box_sticky") && has("sticky_merge:n1");
  if (sweepEvents && anchorAt(before, 4, 5) && anchorAt(after, 5, 6) && has("box_to_sticky:n2")) return 1 << 0;
  if (sweepEvents && anchorAt(before, 5, 6) && anchorAt(after, 6, 7) && has("box_to_sticky:n2")) return 1 << 1;
  if (sweepEvents && anchorAt(before, 6, 7) && anchorAt(after, 7, 8) && has("box_to_sticky:n4")) return 1 << 2;
  const largestSticky = Math.max(0, ...before.stickyGroups.map((group) => group.length));
  if (
    largestSticky === 29
    && has("push_object:sticky#1")
    && has("force_chain:n3")
    && has("move_sticky_rigid")
    && has("sticky_to_box:n4")
    && occupiedByObject(after, 9, 5)
    && occupiedByObject(after, 9, 11)
  ) return 1 << 3;
  return 0;
}

function anchorAt(state: RealityAnchorState, stickyX: number, boxX: number) {
  const anchor = state.boxStickyAnchor;
  return anchor?.sticky.x === stickyX && anchor.sticky.y === 2 && anchor.box.x === boxX && anchor.box.y === 2;
}

function occupiedByObject(state: RealityAnchorState, x: number, y: number) {
  if (state.crates.some((point) => point.x === x && point.y === y)) return true;
  if (state.stickyGroups.some((group) => group.some((point) => point.x === x && point.y === y))) return true;
  if (state.pushPullAnchor && [state.pushPullAnchor.push, state.pushPullAnchor.pull].some((point) => point.x === x && point.y === y)) return true;
  if (state.boxStickyAnchor && [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky].some((point) => point.x === x && point.y === y)) return true;
  return false;
}

function replay(initialState: RealityAnchorState, inputs: readonly InputId[]) {
  let state = initialState;
  const states = [state];
  const steps = [];
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    steps.push({ input, legal: result.legal, events: result.events, stateKey: runtime.key(result.state) });
    if (!result.legal) return { legal: false, win: false, states, serializable: { legal: false, win: false, steps } };
    state = result.state as RealityAnchorState;
    states.push(state);
  }
  const win = runtime.isWin(state, pkg.mechanic.win);
  return { legal: true, win, states, serializable: { legal: true, win, steps, finalStateKey: runtime.key(state) } };
}

function analyzeOpening(initialState: RealityAnchorState, baseGraph: Graph) {
  const scc = tarjan(baseGraph);
  const members = new Set(scc.components[scc.of[0]!]!);
  const positions = new Map<string, Point>();
  for (const index of members) {
    const player = baseGraph.states[index]!.player;
    positions.set(`${player.x},${player.y}`, { ...player });
  }
  const memberKeys = new Set([...members].map((index) => baseGraph.keys[index]!));
  const candidates = [...positions.values()]
    .map((player) => ({ ...initialState, player }))
    .filter((state) => memberKeys.has(runtime.key(state)))
    .sort((a, b) => a.player.y - b.player.y || a.player.x - b.player.x)
    .map((state) => {
      const analysis = analyzeState(state).serializable;
      const firstStepLegalEvents = Object.fromEntries(
        (runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]).flatMap((action) => {
          const step = runtime.step(state, action, { winCondition: pkg.mechanic.win });
          return step.legal ? [[action, step.events]] : [];
        }),
      );
      return {
        candidateStartPosition: [state.player.x, state.player.y],
        isCurrentStart: state.player.x === initialState.player.x && state.player.y === initialState.player.y,
        shortestSolutionDelta: `12->${analysis.shortestCost ?? "unavailable"}`,
        initialSccSize: analysis.opening?.initialSccSize ?? null,
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
    enumerationRule: "完整图 initial SCC 中保持原对象配置的全部玩家位置；每个起点重跑最短解、完整图与坐标化核心事件乘积图。",
    initialSccSize: members.size,
    playerPositionsSeen: positions.size,
    candidates,
  };
}

function openingMetrics(graph: Graph) {
  const scc = tarjan(graph);
  const members = new Set(scc.components[scc.of[0]!]!);
  const distances = distancesInside(graph, members);
  const winReachable = reverseWinReachable(graph);
  const exits = graph.edges
    .filter((edge) => members.has(edge.from) && !members.has(edge.to))
    .map((edge) => ({
      sourceDistance: distances[edge.from] ?? null,
      winReaching: winReachable.has(edge.to),
      targetScc: scc.of[edge.to]!,
    }));
  const allDistances = exits.map((item) => item.sourceDistance).filter((item): item is number => item !== null).sort((a, b) => a - b);
  const winDistances = exits.filter((item) => item.winReaching).map((item) => item.sourceDistance).filter((item): item is number => item !== null).sort((a, b) => a - b);
  const nearestWin = winDistances.length ? winDistances[0]! : null;
  return {
    initialSccSize: members.size,
    exitSourceDistances: allDistances,
    winExitSourceDistances: winDistances,
    nearestIrreversibleExitDistance: allDistances.length ? allDistances[0]! : null,
    nearestWinExitDistance: nearestWin,
    deadExitsBeforeFirstWinExit: nearestWin === null
      ? null
      : new Set(exits.filter((item) => !item.winReaching && item.sourceDistance !== null && item.sourceDistance < nearestWin).map((item) => item.targetScc)).size,
  };
}

function tarjan(graph: Graph) {
  const adjacency = Array.from({ length: graph.states.length }, () => [] as number[]);
  for (const edge of graph.edges) adjacency[edge.from]!.push(edge.to);
  const index = Array<number>(graph.states.length).fill(-1);
  const low = Array<number>(graph.states.length).fill(0);
  const onStack = Array<boolean>(graph.states.length).fill(false);
  const stack: number[] = [];
  const components: number[][] = [];
  const of = Array<number>(graph.states.length).fill(-1);
  let next = 0;
  const visit = (v: number) => {
    index[v] = low[v] = next++;
    stack.push(v);
    onStack[v] = true;
    for (const w of adjacency[v]!) {
      if (index[w] === -1) {
        visit(w);
        low[v] = Math.min(low[v]!, low[w]!);
      } else if (onStack[w]) {
        low[v] = Math.min(low[v]!, index[w]!);
      }
    }
    if (low[v] !== index[v]) return;
    const component: number[] = [];
    while (true) {
      const w = stack.pop()!;
      onStack[w] = false;
      component.push(w);
      of[w] = components.length;
      if (w === v) break;
    }
    components.push(component);
  };
  for (let v = 0; v < graph.states.length; v += 1) if (index[v] === -1) visit(v);
  return { components, of };
}

function distancesInside(graph: Graph, members: Set<number>) {
  const outgoing = Array.from({ length: graph.states.length }, () => [] as number[]);
  for (const edge of graph.edges) outgoing[edge.from]!.push(edge.to);
  const distance = Array<number | undefined>(graph.states.length).fill(undefined);
  distance[0] = 0;
  const queue = [0];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const next of outgoing[queue[cursor]!]!) {
      if (!members.has(next) || distance[next] !== undefined) continue;
      distance[next] = distance[queue[cursor]!]! + 1;
      queue.push(next);
    }
  }
  return distance;
}

function reverseWinReachable(graph: Graph) {
  const reverse = Array.from({ length: graph.states.length }, () => [] as number[]);
  for (const edge of graph.edges) reverse[edge.to]!.push(edge.from);
  const seen = new Set<number>(graph.winStateIndexes);
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

function canonicalTraceCells(initialState: RealityAnchorState, inputs: readonly InputId[]) {
  const result = replay(initialState, inputs);
  const cells = new Set<string>();
  for (const state of result.states) {
    cells.add(`${state.player.x},${state.player.y}`);
    for (const point of state.crates) cells.add(`${point.x},${point.y}`);
    for (const group of state.stickyGroups) for (const point of group) cells.add(`${point.x},${point.y}`);
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

function targetCells(candidateLayout: string): Array<[number, number]> {
  return candidateLayout.split("\n").flatMap((row, y) => [...row].flatMap((glyph, x) => ["G", "m", "+", "*"].includes(glyph) ? [[x, y] as [number, number]] : []));
}

function floorCells(candidateLayout: string): Array<[number, number]> {
  return candidateLayout.split("\n").flatMap((row, y) => [...row].flatMap((glyph, x) => glyph === "." ? [[x, y] as [number, number]] : []));
}

function removeGoal(candidateLayout: string, x: number, y: number) {
  const rows = candidateLayout.split("\n").map((row) => [...row]);
  const replacements: Record<string, string> = { G: ".", "*": "C", m: "M", "+": "@" };
  const glyph = rows[y]![x]!;
  if (!(glyph in replacements)) throw new Error(`no goal at ${x},${y}`);
  rows[y]![x] = replacements[glyph]!;
  return rows.map((row) => row.join("")).join("\n");
}

function rewriteCells(candidateLayout: string, cells: Array<[number, number]>, action: "remove" | "wallify") {
  const rows = candidateLayout.split("\n").map((row) => [...row]);
  const removal: Record<string, string> = { B: ".", S: ".", P: ".", L: ".", C: ".", "*": "G", M: ".", m: "G" };
  for (const [x, y] of cells) {
    const current = rows[y]![x]!;
    rows[y]![x] = action === "wallify" ? "#" : removal[current] ?? current;
  }
  return rows.map((row) => row.join("")).join("\n");
}

function wallCells(candidateLayout: string, cells: Array<[number, number]>) {
  const rows = candidateLayout.split("\n").map((row) => [...row]);
  for (const [x, y] of cells) {
    if (rows[y]![x] !== ".") throw new Error(`space candidate ${x},${y} is not ordinary floor`);
    rows[y]![x] = "#";
  }
  return rows.map((row) => row.join("")).join("\n");
}

function staticDegree(candidateLayout: string, x: number, y: number) {
  const rows = candidateLayout.split("\n");
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => {
    const glyph = rows[y + dy]?.[x + dx];
    return glyph !== undefined && glyph !== "#";
  }).length;
}

function rectangleCells(x1: number, y1: number, x2: number, y2: number) {
  const cells: Array<[number, number]> = [];
  for (let y = y1; y <= y2; y += 1) for (let x = x1; x <= x2; x += 1) cells.push([x, y]);
  return cells;
}

function auditOutline(candidateLayout: string) {
  const variants: Array<{ side: string; count: number; layout: string }> = [];
  for (const side of ["top", "bottom", "left", "right"] as const) {
    let current = candidateLayout;
    for (let count = 1; count < Math.max(candidateLayout.split("\n").length, candidateLayout.split("\n")[0]!.length); count += 1) {
      const next = trimSide(current, side);
      if (!next || !hasClosedWallFrame(next)) break;
      current = next;
      variants.push({ side, count, layout: current });
    }
  }
  const maximalBySide = Object.fromEntries(["top", "bottom", "left", "right"].map((side) => [
    side,
    Math.max(0, ...variants.filter((variant) => variant.side === side).map((variant) => variant.count)),
  ]));
  return {
    originalWidth: candidateLayout.split("\n")[0]!.length,
    originalHeight: candidateLayout.split("\n").length,
    maximalLegalTrimBySide: maximalBySide,
    variants,
  };
}

function trimSide(candidateLayout: string, side: "top" | "bottom" | "left" | "right") {
  const rows = candidateLayout.split("\n");
  if (rows.length <= 2 || rows[0]!.length <= 2) return null;
  if (side === "top") return rows.slice(1).join("\n");
  if (side === "bottom") return rows.slice(0, -1).join("\n");
  if (side === "left") return rows.map((row) => row.slice(1)).join("\n");
  return rows.map((row) => row.slice(0, -1)).join("\n");
}

function hasClosedWallFrame(candidateLayout: string) {
  const rows = candidateLayout.split("\n");
  if (rows.length < 3 || rows.some((row) => row.length !== rows[0]!.length) || rows[0]!.length < 3) return false;
  return [...rows[0]!].every((glyph) => glyph === "#")
    && [...rows.at(-1)!].every((glyph) => glyph === "#")
    && rows.every((row) => row[0] === "#" && row.at(-1) === "#");
}

function compact(analysis: any) {
  return {
    parseStatus: analysis.parseStatus,
    shortestCost: analysis.shortestCost,
    graphStatus: analysis.graphStatus,
    reachableStates: analysis.reachableStates,
    winningStates: analysis.winningStates,
    canonicalReplayWin: analysis.canonicalReplayWin,
    coreStatus: analysis.coreEventProbe?.status,
    coreBypass: analysis.coreEventProbe?.foundViolation,
    opening: analysis.opening,
  };
}

function normalize(text: string) {
  return text.replace(/\r/g, "").replace(/\n+$/g, "");
}

async function writeJson(file: string, value: unknown) {
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

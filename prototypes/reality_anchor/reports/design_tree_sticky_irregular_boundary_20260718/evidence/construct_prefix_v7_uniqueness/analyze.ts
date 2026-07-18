import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const prototypeRoot = path.join(repoRoot, "prototypes", "reality_anchor");
const candidateId = "RA_STICKY_IRREGULAR_BOUNDARY_CONSTRUCT_PREFIX";
const layoutSha256Expected = "b9671c2f0485553f0a9bb09cccf170026a4553bb1fb7ee6e51bcb9c689a4d0d5";
const exactVersion = `v7_sha256_${layoutSha256Expected}`;
const layoutPath = path.join(
  repoRoot,
  "prototypes", "reality_anchor", "reports", "design_tree_sticky_irregular_boundary_20260718",
  "nodes", "construct_prefix_v7", "layout.txt",
);
const canonicalInputs = ["left", "left", "up", "left", "left", "left", "up", "right"];

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const layoutSha256 = createHash("sha256").update(layout).digest("hex");
if (layoutSha256 !== layoutSha256Expected) throw new Error(`layout hash mismatch: ${layoutSha256}`);
const level: LevelDoc = { id: `${candidateId}_${exactVersion}`, title: candidateId, layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const runtimeOptions = { winCondition: pkg.mechanic.win, maxStates: 400_000 };
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  pkg.mechanic.win,
  runtimeOptions,
  { maxStates: 400_000, terminalizeWins: true },
);
if (graph.status !== "complete") throw new Error(`graph incomplete: ${graph.status}`);

type Edge = (typeof graph.edges)[number];
const outgoing = new Map<number, Edge[]>();
const incoming = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  (outgoing.get(edge.from) ?? outgoing.set(edge.from, []).get(edge.from)!).push(edge);
  (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
}
function objectKey(stateIndex: number): string {
  return graph.keys[stateIndex]!.replace(/^Ply:[^|]+\|/, "");
}

// 所有可达状态都由 enumerateRuntimeGraph 从初态生成；从所有 terminal win 逆向闭包，
// 可精确得到至少一条胜路上的全部原始 runtime states。
const canReachWin = new Set<number>(graph.winStateIndexes);
const reverseQueue = [...graph.winStateIndexes];
for (let cursor = 0; cursor < reverseQueue.length; cursor += 1) {
  for (const edge of incoming.get(reverseQueue[cursor]!) ?? []) {
    if (canReachWin.has(edge.from)) continue;
    canReachWin.add(edge.from);
    reverseQueue.push(edge.from);
  }
}
const winReachingEdges = graph.edges.filter((edge) => canReachWin.has(edge.from) && canReachWin.has(edge.to));

// 对 win-reaching 原始状态直接做 Tarjan SCC，不聚合玩家坐标。
const rawAdjacency = new Map<number, Set<number>>();
for (const edge of winReachingEdges) {
  (rawAdjacency.get(edge.from) ?? rawAdjacency.set(edge.from, new Set()).get(edge.from)!).add(edge.to);
}
let tarjanIndex = 0;
const indexes = new Map<number, number>();
const lowLinks = new Map<number, number>();
const stack: number[] = [];
const onStack = new Set<number>();
const rawSccs: number[][] = [];
function strongConnect(v: number): void {
  indexes.set(v, tarjanIndex);
  lowLinks.set(v, tarjanIndex);
  tarjanIndex += 1;
  stack.push(v);
  onStack.add(v);
  for (const w of rawAdjacency.get(v) ?? []) {
    if (!indexes.has(w)) {
      strongConnect(w);
      lowLinks.set(v, Math.min(lowLinks.get(v)!, lowLinks.get(w)!));
    } else if (onStack.has(w)) {
      lowLinks.set(v, Math.min(lowLinks.get(v)!, indexes.get(w)!));
    }
  }
  if (lowLinks.get(v) !== indexes.get(v)) return;
  const component: number[] = [];
  while (true) {
    const w = stack.pop()!;
    onStack.delete(w);
    component.push(w);
    if (w === v) break;
  }
  rawSccs.push(component.sort((a, b) => a - b));
}
for (const stateIndex of [...canReachWin].sort((a, b) => a - b)) {
  if (!indexes.has(stateIndex)) strongConnect(stateIndex);
}
const rawSccIdByState = new Map<number, number>();
for (const [rawSccId, stateIndexes] of rawSccs.entries()) {
  for (const stateIndex of stateIndexes) rawSccIdByState.set(stateIndex, rawSccId);
}
const syntheticSinkId = rawSccs.length;
const rawSccAdjacency = new Map<number, Set<number>>();
function addRawSccEdge(from: number, to: number): void {
  if (from === to) return;
  (rawSccAdjacency.get(from) ?? rawSccAdjacency.set(from, new Set()).get(from)!).add(to);
}
for (const edge of winReachingEdges) addRawSccEdge(rawSccIdByState.get(edge.from)!, rawSccIdByState.get(edge.to)!);
const winRawSccIds = [...new Set([...graph.winStateIndexes].map((stateIndex) => rawSccIdByState.get(stateIndex)!))];
for (const rawSccId of winRawSccIds) addRawSccEdge(rawSccId, syntheticSinkId);
const initialRawSccId = rawSccIdByState.get(0)!;
const rawPaths: number[][] = [];
function enumerateRawPaths(cursor: number, prefix: number[]): void {
  if (cursor === syntheticSinkId) {
    rawPaths.push([...prefix, cursor]);
    return;
  }
  for (const target of [...(rawSccAdjacency.get(cursor) ?? [])].sort((a, b) => a - b)) {
    enumerateRawPaths(target, [...prefix, cursor]);
  }
}
enumerateRawPaths(initialRawSccId, []);

const anchorSuffix = "|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1";
const roleKeys = {
  initialSeparateMaterials: `C:|M:3,4;4,4|5,5${anchorSuffix}`,
  boundaryReadyL: `C:|M:3,4;4,4;4,5${anchorSuffix}`,
  preCutL: `C:|M:2,4;3,4;3,5${anchorSuffix}`,
  postCutProducts: `C:1,4|M:2,4;2,5${anchorSuffix}`,
  crateDone: `C:1,3|M:2,4;2,5${anchorSuffix}`,
  tailAdvanced: `C:1,4|M:3,4;3,5${anchorSuffix}`,
  finalProducts: `C:1,3|M:3,4;3,5${anchorSuffix}`,
} as const;
const roleStates = Object.fromEntries(Object.entries(roleKeys).map(([role, key]) => {
  const stateIndexes = [...canReachWin].filter((stateIndex) => objectKey(stateIndex) === key).sort((a, b) => a - b);
  if (stateIndexes.length === 0) throw new Error(`missing role state: ${role}`);
  return [role, stateIndexes];
})) as Record<keyof typeof roleKeys, number[]>;
const winReachingObjectKeys = [...new Set([...canReachWin].map((stateIndex) => objectKey(stateIndex)))].sort();
const expectedRoleKeySet = [...new Set(Object.values(roleKeys))].sort();
if (
  winReachingObjectKeys.length !== expectedRoleKeySet.length
  || !winReachingObjectKeys.every((key, index) => key === expectedRoleKeySet[index])
) throw new Error("undeclared win-reaching object state found");
const objectTransitionSignatures = new Map<string, {
  fromObjectKey: string;
  toObjectKey: string;
  action: string;
  events: string[];
  count: number;
}>();
for (const edge of winReachingEdges) {
  const fromObjectKey = objectKey(edge.from);
  const toObjectKey = objectKey(edge.to);
  if (fromObjectKey === toObjectKey) continue;
  const signature = JSON.stringify([fromObjectKey, toObjectKey, edge.action, edge.events]);
  const record = objectTransitionSignatures.get(signature) ?? { fromObjectKey, toObjectKey, action: edge.action, events: edge.events, count: 0 };
  record.count += 1;
  objectTransitionSignatures.set(signature, record);
}

function searchWinAvoidingRole(role: keyof typeof roleStates): { foundWin: boolean; exploredStates: number; status: "found" | "complete" } {
  const forbidden = new Set(roleStates[role]);
  const visited = new Set<number>([0]);
  const queue = [0];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const stateIndex = queue[cursor]!;
    if (graph.winStateIndexes.has(stateIndex)) return { foundWin: true, exploredStates: visited.size, status: "found" };
    for (const edge of outgoing.get(stateIndex) ?? []) {
      if (forbidden.has(edge.to) || visited.has(edge.to)) continue;
      visited.add(edge.to);
      queue.push(edge.to);
    }
  }
  return { foundWin: false, exploredStates: visited.size, status: "complete" };
}
const mandatoryRoleChecks = (["boundaryReadyL", "preCutL", "postCutProducts", "finalProducts"] as const).map((role) => ({
  role,
  ...searchWinAvoidingRole(role),
}));
if (mandatoryRoleChecks.some((check) => check.foundWin || check.status !== "complete")) throw new Error("mandatory role bypass found");

const roleByState = new Map<number, keyof typeof roleStates>();
for (const [role, stateIndexes] of Object.entries(roleStates) as Array<[keyof typeof roleStates, number[]]>) {
  for (const stateIndex of stateIndexes) roleByState.set(stateIndex, role);
}
const rawPathRecords = rawPaths.map((rawSccPath, index) => {
  const roles = rawSccPath.flatMap((rawSccId) => rawSccId === syntheticSinkId
    ? []
    : [...new Set(rawSccs[rawSccId]!.map((stateIndex) => roleByState.get(stateIndex)).filter(Boolean))] as Array<keyof typeof roleStates>);
  for (const mandatory of ["boundaryReadyL", "preCutL", "postCutProducts", "finalProducts"] as const) {
    if (!roles.includes(mandatory)) throw new Error(`raw path misses ${mandatory}`);
  }
  const finalOrder = roles.includes("crateDone") ? "crate_then_tail" : "tail_then_crate";
  return { rawPathId: `R${index + 1}`, rawSccPath, roles, constructionLogic: "direct_boundary_merge", finalOrder };
});
const finalOrderCounts = Object.fromEntries(["crate_then_tail", "tail_then_crate"].map((finalOrder) => [
  finalOrder,
  rawPathRecords.filter((record) => record.finalOrder === finalOrder).length,
]));
if (Object.values(finalOrderCounts).some((count) => count === 0)) throw new Error("missing final-order class");

const mergeEdges = winReachingEdges.filter((edge) => edge.events.some((event) => event.startsWith("sticky_merge")));
const normalizationEdges = winReachingEdges.filter((edge) => edge.events.some((event) => event.startsWith("sticky_to_box")));
if (
  mergeEdges.length !== 1
  || objectKey(mergeEdges[0]!.from) !== roleKeys.initialSeparateMaterials
  || objectKey(mergeEdges[0]!.to) !== roleKeys.boundaryReadyL
) throw new Error("win-reaching merge is not unique direct construction");
if (
  normalizationEdges.length !== 1
  || objectKey(normalizationEdges[0]!.from) !== roleKeys.preCutL
  || objectKey(normalizationEdges[0]!.to) !== roleKeys.postCutProducts
) throw new Error("win-reaching normalization is not unique cut");

function searchWinWithoutEvent(prefixes: string[]): { foundWin: boolean; exploredStates: number; status: "found" | "complete" } {
  const visited = new Set<number>([0]);
  const queue = [0];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const stateIndex = queue[cursor]!;
    if (graph.winStateIndexes.has(stateIndex)) return { foundWin: true, exploredStates: visited.size, status: "found" };
    for (const edge of outgoing.get(stateIndex) ?? []) {
      if (edge.events.some((event) => prefixes.some((prefix) => event.startsWith(prefix)))) continue;
      if (visited.has(edge.to)) continue;
      visited.add(edge.to);
      queue.push(edge.to);
    }
  }
  return { foundWin: false, exploredStates: visited.size, status: "complete" };
}
const eventNecessityChecks = [
  { group: "pull_event", prefixes: ["pull_object"], ...searchWinWithoutEvent(["pull_object"]) },
  { group: "push_event", prefixes: ["push_object"], ...searchWinWithoutEvent(["push_object"]) },
  { group: "material_normalization", prefixes: ["box_to_sticky", "sticky_to_box"], ...searchWinWithoutEvent(["box_to_sticky", "sticky_to_box"]) },
  { group: "sticky_merge", prefixes: ["sticky_merge"], ...searchWinWithoutEvent(["sticky_merge"]) },
  { group: "sticky_rigid_move", prefixes: ["move_sticky_rigid"], ...searchWinWithoutEvent(["move_sticky_rigid"]) },
];
if (eventNecessityChecks.some((check) => check.foundWin || check.status !== "complete")) throw new Error("event bypass found");
const anchorShiftEdges = graph.edges.filter((edge) => edge.events.some((event) => event.startsWith("anchor_boundary_shift")));
if (anchorShiftEdges.length !== 0) throw new Error("unexpected reachable anchor shift");

function runPrefix(inputs: string[]): {
  inputs: string[];
  legal: boolean;
  events: string[][];
  stateKey: string;
  render: string;
  suffix: { found: boolean; status: string; exploredStates: number; cost: number | null; inputs: string[] } | null;
} {
  let state = initial;
  let legal = true;
  const events: string[][] = [];
  for (const input of inputs) {
    const transition = runtime.step(state, input, runtimeOptions);
    events.push(transition.events ?? []);
    if (!transition.legal) {
      legal = false;
      break;
    }
    state = transition.state;
  }
  const suffixResult = legal ? solveWithRuntime(runtime, state, runtimeOptions) : null;
  return {
    inputs,
    legal,
    events,
    stateKey: runtime.key(state),
    render: adapter.renderState(state).trimEnd(),
    suffix: suffixResult ? {
      found: suffixResult.found,
      status: suffixResult.searchStatus,
      exploredStates: suffixResult.exploredStates,
      cost: suffixResult.found ? suffixResult.cost : null,
      inputs: suffixResult.found ? suffixResult.inputs : [],
    } : null,
  };
}
const prefixCounterfactuals = {
  correctL: runPrefix(["left", "left", "up", "left"]),
  wrongGoalBar: runPrefix(["left", "left", "up", "down"]),
};
if (!prefixCounterfactuals.correctL.legal || !prefixCounterfactuals.correctL.suffix?.found) throw new Error("correct L prefix failed");
if (!prefixCounterfactuals.wrongGoalBar.legal || prefixCounterfactuals.wrongGoalBar.suffix?.found || prefixCounterfactuals.wrongGoalBar.suffix?.status !== "complete") {
  throw new Error("wrong goal bar is not a complete dead end");
}

const winningObjectKeys = [...new Set([...graph.winStateIndexes].map((stateIndex) => objectKey(stateIndex)))];
if (winningObjectKeys.length !== 1 || winningObjectKeys[0] !== roleKeys.finalProducts) throw new Error("winning object duties differ");
const finalIncomingEdges = graph.edges
  .filter((edge) => graph.winStateIndexes.has(edge.to) && !graph.winStateIndexes.has(edge.from))
  .map((edge) => ({
    fromState: edge.from,
    toWinState: edge.to,
    fromObjectKey: objectKey(edge.from),
    action: edge.action,
    events: edge.events,
  }));
if (
  finalIncomingEdges.length !== 3
  || !finalIncomingEdges.every((edge) => [roleKeys.crateDone, roleKeys.tailAdvanced].includes(edge.fromObjectKey as never))
) throw new Error("unexpected final incoming edge family");

const canonicalResult = runPrefix(canonicalInputs);
if (!canonicalResult.legal || !canonicalResult.stateKey.startsWith("Ply:") || !graph.winStateIndexes.size) throw new Error("canonical replay failed");
const result = {
  candidateId,
  exactVersion,
  layoutSha256,
  graph: {
    status: graph.status,
    reachableStates: graph.keys.length,
    transitions: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    winReachingStates: canReachWin.size,
    winReachingTransitions: winReachingEdges.length,
    terminalizeWins: true,
  },
  rawStateSccProof: {
    rawSccCount: rawSccs.length,
    syntheticSinkId,
    exactAcyclicPathCount: rawPathRecords.length,
    paths: rawPathRecords,
    allPathsUseSingleConstructionLogic: rawPathRecords.every((record) => record.constructionLogic === "direct_boundary_merge"),
    finalOrderCounts,
  },
  causalMilestones: {
    roleKeys,
    winReachingObjectKeys,
    roleStateCounts: Object.fromEntries(Object.entries(roleStates).map(([role, states]) => [role, states.length])),
    mandatoryRoleChecks,
    uniqueWinReachingMergeEdge: mergeEdges.map((edge) => ({ from: edge.from, to: edge.to, action: edge.action, events: edge.events })),
    uniqueWinReachingNormalizationEdge: normalizationEdges.map((edge) => ({ from: edge.from, to: edge.to, action: edge.action, events: edge.events })),
    allWinReachingObjectTransitionSignatures: [...objectTransitionSignatures.values()],
  },
  equivalence: {
    result: "equivalent_variants_only",
    constructionLogicClasses: ["direct_boundary_merge"],
    allowedFinalOrderClasses: ["crate_then_tail", "tail_then_crate"],
    winningObjectKeys,
    finalIncomingEdges,
    account: "全部 raw SCC 路径只用同一直接边界合 L；差异仅为玩家绕步及箱子/竖条两个独立目标兑现的先后。",
  },
  eventNecessityChecks,
  reachableAnchorShiftEdgeCount: anchorShiftEdges.length,
  prefixCounterfactuals,
  canonical: canonicalResult,
};

const reportLines = [
  "# Construct Prefix V7 完整解族与因果审计",
  "",
  `- candidate: ${candidateId}`,
  `- exact: ${exactVersion}`,
  `- layout SHA256: ${layoutSha256}`,
  `- complete graph: ${result.graph.reachableStates} states / ${result.graph.transitions} transitions / ${result.graph.winningStates} wins`,
  `- win-reaching closure: ${result.graph.winReachingStates} states / ${result.graph.winReachingTransitions} transitions`,
  `- raw SCC: ${rawSccs.length}; exact acyclic source-to-win paths: ${rawPathRecords.length}`,
  "",
  "## 全路径逻辑分类",
  "",
  ...rawPathRecords.map((record) => `- ${record.rawPathId}: ${record.constructionLogic}；${record.finalOrder}；SCC ${record.rawSccPath.join(" -> ")}`),
  "",
  `全部路径的前段只有 direct_boundary_merge；末段分类计数 ${JSON.stringify(finalOrderCounts)}。所有路径必经 boundaryReadyL → preCutL → postCutProducts → finalProducts，四个对象态分别禁用后的完整搜索均无胜。`,
  "",
  "win-reaching 子图仅有一条 sticky_merge 边（初始两片材料直接合成边界就位 L）和一条 sticky_to_box 边（preCutL 切成箱子与竖条），因此不存在 V6 的异地合 L 再搬回逻辑。三个胜态只有一个对象态；三个非胜到胜入边只交换箱子与竖条两个独立目标的最后兑现顺序。",
  "",
  "## 构造反事实",
  "",
  `- correct L: prefix legal=${prefixCounterfactuals.correctL.legal}; suffix found=${prefixCounterfactuals.correctL.suffix?.found}; cost=${prefixCounterfactuals.correctL.suffix?.cost}`,
  `- wrong goal bar: prefix legal=${prefixCounterfactuals.wrongGoalBar.legal}; suffix status=${prefixCounterfactuals.wrongGoalBar.suffix?.status}; explored=${prefixCounterfactuals.wrongGoalBar.suffix?.exploredStates}; found=${prefixCounterfactuals.wrongGoalBar.suffix?.found}`,
  "",
  "错误分支与正确分支从同一个把手位发生：left 把单格拉入横臂形成 L；down 把横臂拉入目标行形成横条并立即覆盖东目标，但完整后缀图无胜。",
  "",
];
await mkdir(import.meta.dirname, { recursive: true });
await writeFile(path.join(import.meta.dirname, "results.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
await writeFile(path.join(import.meta.dirname, "report.md"), `${reportLines.join("\n")}\n`, "utf8");
console.log(JSON.stringify({
  exactVersion,
  graph: result.graph,
  rawStateSccProof: result.rawStateSccProof,
  prefixCounterfactuals: {
    correctL: prefixCounterfactuals.correctL.suffix,
    wrongGoalBar: prefixCounterfactuals.wrongGoalBar.suffix,
  },
}, null, 2));

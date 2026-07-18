import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const prototypeRoot = path.join(repoRoot, "prototypes", "reality_anchor");
const candidateId = "RA_STICKY_IRREGULAR_BOUNDARY_CONSTRUCT_PREFIX";
const exactVersion = "v6_sha256_6bdff0b7ab64ca4558140b5b31567f94c28af3bce3e427dd3d05a5038a74cb03";
const expectedSha256 = "6bdff0b7ab64ca4558140b5b31567f94c28af3bce3e427dd3d05a5038a74cb03";
const layoutPath = path.join(
  repoRoot,
  "prototypes", "reality_anchor", "reports",
  "design_tree_sticky_irregular_boundary_20260718", "nodes", "construct_prefix_v6", "layout.txt",
);

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const layoutSha256 = createHash("sha256").update(layout).digest("hex");
if (layoutSha256 !== expectedSha256) throw new Error(`layout hash mismatch: ${layoutSha256}`);
const level: LevelDoc = {
  id: `${candidateId}_${exactVersion}`,
  title: `${candidateId}_${exactVersion}`,
  layout,
  win: pkg.mechanic.win,
};
const initial = adapter.parseLevel(level);
const winCondition = level.win ?? pkg.mechanic.win;
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  winCondition,
  { winCondition },
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

const canReachWin = new Set<number>(graph.winStateIndexes);
const reverseQueue = [...graph.winStateIndexes];
for (let cursor = 0; cursor < reverseQueue.length; cursor += 1) {
  const state = reverseQueue[cursor]!;
  for (const edge of incoming.get(state) ?? []) {
    if (canReachWin.has(edge.from)) continue;
    canReachWin.add(edge.from);
    reverseQueue.push(edge.from);
  }
}

// 在原始 runtime state 上先做一次精确 SCC 凝聚。这里不聚合玩家坐标，因而不会产生
// objectKey quotient 可能带来的伪拼接；它是“消去循环后覆盖全部实际胜路”的证明底座。
const rawAdjacency = new Map<number, Set<number>>();
for (const edge of graph.edges) {
  if (!canReachWin.has(edge.from) || !canReachWin.has(edge.to)) continue;
  (rawAdjacency.get(edge.from) ?? rawAdjacency.set(edge.from, new Set()).get(edge.from)!).add(edge.to);
}
let rawTarjanIndex = 0;
const rawIndexes = new Map<number, number>();
const rawLowLinks = new Map<number, number>();
const rawStack: number[] = [];
const rawOnStack = new Set<number>();
const rawSccs: number[][] = [];
function rawStrongConnect(v: number): void {
  rawIndexes.set(v, rawTarjanIndex);
  rawLowLinks.set(v, rawTarjanIndex);
  rawTarjanIndex += 1;
  rawStack.push(v);
  rawOnStack.add(v);
  for (const w of rawAdjacency.get(v) ?? []) {
    if (!rawIndexes.has(w)) {
      rawStrongConnect(w);
      rawLowLinks.set(v, Math.min(rawLowLinks.get(v)!, rawLowLinks.get(w)!));
    } else if (rawOnStack.has(w)) {
      rawLowLinks.set(v, Math.min(rawLowLinks.get(v)!, rawIndexes.get(w)!));
    }
  }
  if (rawLowLinks.get(v) !== rawIndexes.get(v)) return;
  const component: number[] = [];
  while (true) {
    const w = rawStack.pop()!;
    rawOnStack.delete(w);
    component.push(w);
    if (w === v) break;
  }
  rawSccs.push(component.sort((a, b) => a - b));
}
for (const stateIndex of [...canReachWin].sort((a, b) => a - b)) {
  if (!rawIndexes.has(stateIndex)) rawStrongConnect(stateIndex);
}
const rawSccIdByState = new Map<number, number>();
for (const [rawSccId, stateIndexes] of rawSccs.entries()) {
  for (const stateIndex of stateIndexes) rawSccIdByState.set(stateIndex, rawSccId);
}
const rawSyntheticSinkId = rawSccs.length;
const rawSccAdjacency = new Map<number, Set<number>>();
const addRawSccEdge = (from: number, to: number): void => {
  if (from === to) return;
  (rawSccAdjacency.get(from) ?? rawSccAdjacency.set(from, new Set()).get(from)!).add(to);
};
for (const [fromState, targets] of rawAdjacency.entries()) {
  for (const toState of targets) addRawSccEdge(rawSccIdByState.get(fromState)!, rawSccIdByState.get(toState)!);
}
const rawWinSccIds = [...new Set([...graph.winStateIndexes].map((stateIndex) => rawSccIdByState.get(stateIndex)!))];
for (const rawWinSccId of rawWinSccIds) addRawSccEdge(rawWinSccId, rawSyntheticSinkId);
const rawInitialSccId = rawSccIdByState.get(0)!;
const rawAllSccIds = [...Array(rawSccs.length).keys(), rawSyntheticSinkId];
const rawIndegree = new Map(rawAllSccIds.map((id) => [id, 0]));
for (const targets of rawSccAdjacency.values()) {
  for (const target of targets) rawIndegree.set(target, rawIndegree.get(target)! + 1);
}
const rawTopoQueue = rawAllSccIds.filter((id) => rawIndegree.get(id) === 0).sort((a, b) => a - b);
const rawTopoOrder: number[] = [];
while (rawTopoQueue.length > 0) {
  const id = rawTopoQueue.shift()!;
  rawTopoOrder.push(id);
  for (const target of rawSccAdjacency.get(id) ?? []) {
    rawIndegree.set(target, rawIndegree.get(target)! - 1);
    if (rawIndegree.get(target) === 0) rawTopoQueue.push(target);
  }
  rawTopoQueue.sort((a, b) => a - b);
}
if (rawTopoOrder.length !== rawAllSccIds.length) throw new Error("raw condensation graph is not a DAG");
const rawSkeletonPaths: number[][] = [];
function enumerateRawSkeletonPaths(cursor: number, prefix: number[]): void {
  if (cursor === rawSyntheticSinkId) {
    rawSkeletonPaths.push([...prefix, cursor]);
    return;
  }
  for (const target of [...(rawSccAdjacency.get(cursor) ?? [])].sort((a, b) => a - b)) {
    enumerateRawSkeletonPaths(target, [...prefix, cursor]);
  }
}
enumerateRawSkeletonPaths(rawInitialSccId, []);

function objectKey(stateIndex: number): string {
  return graph.keys[stateIndex]!.replace(/^Ply:[^|]+\|/, "");
}

const relevantStateIndexes = [...canReachWin].sort((a, b) => a - b);
const classIdByKey = new Map<string, number>();
const classMembers: number[][] = [];
for (const stateIndex of relevantStateIndexes) {
  const key = objectKey(stateIndex);
  let classId = classIdByKey.get(key);
  if (classId === undefined) {
    classId = classMembers.length;
    classIdByKey.set(key, classId);
    classMembers.push([]);
  }
  classMembers[classId]!.push(stateIndex);
}

type ClassEdgeRecord = {
  fromClass: number;
  toClass: number;
  action: string;
  events: string[];
  count: number;
  examples: Array<{ fromState: number; toState: number }>;
};
const classEdgeBySignature = new Map<string, ClassEdgeRecord>();
const classAdjacency = new Map<number, Set<number>>();
for (const edge of graph.edges) {
  if (!canReachWin.has(edge.from) || !canReachWin.has(edge.to)) continue;
  const fromClass = classIdByKey.get(objectKey(edge.from))!;
  const toClass = classIdByKey.get(objectKey(edge.to))!;
  if (fromClass === toClass) continue;
  (classAdjacency.get(fromClass) ?? classAdjacency.set(fromClass, new Set()).get(fromClass)!).add(toClass);
  const signature = JSON.stringify([fromClass, toClass, edge.action, edge.events]);
  const record = classEdgeBySignature.get(signature) ?? {
    fromClass,
    toClass,
    action: edge.action,
    events: edge.events,
    count: 0,
    examples: [],
  };
  record.count += 1;
  if (record.examples.length < 3) record.examples.push({ fromState: edge.from, toState: edge.to });
  classEdgeBySignature.set(signature, record);
}

// Tarjan：先消去对象态层面的可逆循环，再在凝聚 DAG 上讨论所有获胜路径。
let tarjanIndex = 0;
const indexes = new Map<number, number>();
const lowLinks = new Map<number, number>();
const stack: number[] = [];
const onStack = new Set<number>();
const sccs: number[][] = [];
function strongConnect(v: number): void {
  indexes.set(v, tarjanIndex);
  lowLinks.set(v, tarjanIndex);
  tarjanIndex += 1;
  stack.push(v);
  onStack.add(v);
  for (const w of classAdjacency.get(v) ?? []) {
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
  sccs.push(component.sort((a, b) => a - b));
}
for (let classId = 0; classId < classMembers.length; classId += 1) {
  if (!indexes.has(classId)) strongConnect(classId);
}
const sccIdByClass = new Map<number, number>();
for (const [sccId, members] of sccs.entries()) {
  for (const classId of members) sccIdByClass.set(classId, sccId);
}

const sinkSccId = sccs.length;
const sccAdjacency = new Map<number, Set<number>>();
const sccPredecessors = new Map<number, Set<number>>();
function addSccEdge(from: number, to: number): void {
  if (from === to) return;
  (sccAdjacency.get(from) ?? sccAdjacency.set(from, new Set()).get(from)!).add(to);
  (sccPredecessors.get(to) ?? sccPredecessors.set(to, new Set()).get(to)!).add(from);
}
for (const [fromClass, targets] of classAdjacency.entries()) {
  for (const toClass of targets) addSccEdge(sccIdByClass.get(fromClass)!, sccIdByClass.get(toClass)!);
}
const winClassIds = [...new Set([...graph.winStateIndexes].map((index) => classIdByKey.get(objectKey(index))!))];
const winSccIds = [...new Set(winClassIds.map((classId) => sccIdByClass.get(classId)!))];
for (const winSccId of winSccIds) addSccEdge(winSccId, sinkSccId);
const initialClassId = classIdByKey.get(objectKey(0))!;
const initialSccId = sccIdByClass.get(initialClassId)!;

// 凝聚图是 DAG。计算从初态到统一胜利汇点的全部路径数与支配 SCC。
const allSccIds = [...Array(sccs.length).keys(), sinkSccId];
const indegree = new Map(allSccIds.map((id) => [id, 0]));
for (const targets of sccAdjacency.values()) {
  for (const target of targets) indegree.set(target, indegree.get(target)! + 1);
}
const topoQueue = allSccIds.filter((id) => indegree.get(id) === 0).sort((a, b) => a - b);
const topoOrder: number[] = [];
while (topoQueue.length > 0) {
  const id = topoQueue.shift()!;
  topoOrder.push(id);
  for (const target of sccAdjacency.get(id) ?? []) {
    indegree.set(target, indegree.get(target)! - 1);
    if (indegree.get(target) === 0) topoQueue.push(target);
  }
  topoQueue.sort((a, b) => a - b);
}
if (topoOrder.length !== allSccIds.length) throw new Error("condensation graph is not a DAG");

const reachableFromInitial = new Set<number>([initialSccId]);
for (const id of topoOrder) {
  if (!reachableFromInitial.has(id)) continue;
  for (const target of sccAdjacency.get(id) ?? []) reachableFromInitial.add(target);
}
const reachesSink = new Set<number>([sinkSccId]);
for (const id of [...topoOrder].reverse()) {
  if ([...(sccAdjacency.get(id) ?? [])].some((target) => reachesSink.has(target))) reachesSink.add(id);
}
const relevantSccIds = topoOrder.filter((id) => reachableFromInitial.has(id) && reachesSink.has(id));
const relevantSccSet = new Set(relevantSccIds);

const pathCounts = new Map<number, bigint>([[initialSccId, 1n]]);
for (const id of topoOrder) {
  const count = pathCounts.get(id) ?? 0n;
  for (const target of sccAdjacency.get(id) ?? []) {
    if (!relevantSccSet.has(target)) continue;
    pathCounts.set(target, (pathCounts.get(target) ?? 0n) + count);
  }
}

const dominators = new Map<number, Set<number>>();
const allRelevant = new Set(relevantSccIds);
for (const id of relevantSccIds) dominators.set(id, id === initialSccId ? new Set([id]) : new Set(allRelevant));
for (const id of relevantSccIds) {
  if (id === initialSccId) continue;
  const predecessors = [...(sccPredecessors.get(id) ?? [])].filter((pred) => relevantSccSet.has(pred));
  let intersection = new Set(allRelevant);
  for (const pred of predecessors) {
    const predDominators = dominators.get(pred)!;
    intersection = new Set([...intersection].filter((candidate) => predDominators.has(candidate)));
  }
  intersection.add(id);
  dominators.set(id, intersection);
}
const mandatorySccIds = relevantSccIds.filter((id) => dominators.get(sinkSccId)!.has(id));

const skeletonPaths: number[][] = [];
function enumerateSkeletonPaths(cursor: number, prefix: number[]): void {
  if (cursor === sinkSccId) {
    skeletonPaths.push([...prefix, cursor]);
    return;
  }
  for (const target of [...(sccAdjacency.get(cursor) ?? [])].filter((id) => relevantSccSet.has(id)).sort((a, b) => a - b)) {
    enumerateSkeletonPaths(target, [...prefix, cursor]);
  }
}
enumerateSkeletonPaths(initialSccId, []);
if (BigInt(skeletonPaths.length) !== (pathCounts.get(sinkSccId) ?? 0n)) {
  throw new Error("enumerated skeleton path count mismatch");
}

function renderClass(classId: number): string {
  return adapter.renderState(graph.states[classMembers[classId]![0]!]!).trimEnd();
}
const classRecords = classMembers.map((members, classId) => ({
  classId,
  objectKey: objectKey(members[0]!),
  stateIndexes: members,
  playerStateCount: members.length,
  isInitial: classId === initialClassId,
  isWin: winClassIds.includes(classId),
  sccId: sccIdByClass.get(classId),
  render: renderClass(classId),
}));
const sccRecords = relevantSccIds.map((sccId) => ({
  sccId,
  isSyntheticWinSink: sccId === sinkSccId,
  classIds: sccId === sinkSccId ? [] : sccs[sccId],
  mandatoryOnEveryWinPath: mandatorySccIds.includes(sccId),
  outgoingSccIds: [...(sccAdjacency.get(sccId) ?? [])].filter((id) => relevantSccSet.has(id)).sort((a, b) => a - b),
}));

const requiredObjectKeys = {
  initialSeparateMaterials: "C:|M:3,4;4,4|5,5|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1",
  optionalRightStagedL: "C:|M:4,4;5,4;5,5|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1",
  optionalRightStagedLUp1: "C:|M:4,3;5,3;5,4|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1",
  optionalRightStagedLUp2: "C:|M:4,2;5,2;5,3|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1",
  boundaryReadyL: "C:|M:3,4;4,4;4,5|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1",
  preCutL: "C:|M:2,4;3,4;3,5|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1",
  postCutProducts: "C:1,4|M:2,4;2,5|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1",
  crateDone: "C:1,3|M:2,4;2,5|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1",
  tailAdvanced: "C:1,4|M:3,4;3,5|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1",
  finalProducts: "C:1,3|M:3,4;3,5|PL:P:1,2;L:2,2|BS:B:1,1;S:2,1",
} as const;
const requiredClassIds = Object.fromEntries(
  Object.entries(requiredObjectKeys).map(([role, key]) => {
    const classId = classIdByKey.get(key);
    if (classId === undefined) throw new Error(`missing expected object class: ${role}`);
    return [role, classId];
  }),
) as Record<keyof typeof requiredObjectKeys, number>;
const roleSccIds = Object.fromEntries(
  Object.entries(requiredClassIds).map(([role, classId]) => [role, sccIdByClass.get(classId)!]),
) as Record<keyof typeof requiredObjectKeys, number>;

function searchWinAvoidingObjectClasses(forbiddenClassIds: Set<number>): {
  foundWin: boolean;
  exploredStates: number;
  status: "found" | "complete";
} {
  if (forbiddenClassIds.has(initialClassId)) return { foundWin: false, exploredStates: 0, status: "complete" };
  const visited = new Set<number>([0]);
  const queue = [0];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const stateIndex = queue[cursor]!;
    if (graph.winStateIndexes.has(stateIndex)) return { foundWin: true, exploredStates: visited.size, status: "found" };
    for (const edge of outgoing.get(stateIndex) ?? []) {
      if (forbiddenClassIds.has(classIdByKey.get(objectKey(edge.to))!)) continue;
      if (visited.has(edge.to)) continue;
      visited.add(edge.to);
      queue.push(edge.to);
    }
  }
  return { foundWin: false, exploredStates: visited.size, status: "complete" };
}

function searchObjectClassAvoidingClass(targetClassId: number, forbiddenClassId: number): {
  foundTarget: boolean;
  exploredStates: number;
  status: "found" | "complete";
} {
  if (forbiddenClassId === initialClassId) return { foundTarget: false, exploredStates: 0, status: "complete" };
  const visited = new Set<number>([0]);
  const queue = [0];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const stateIndex = queue[cursor]!;
    if (classIdByKey.get(objectKey(stateIndex)) === targetClassId) {
      return { foundTarget: true, exploredStates: visited.size, status: "found" };
    }
    for (const edge of outgoing.get(stateIndex) ?? []) {
      if (classIdByKey.get(objectKey(edge.to)) === forbiddenClassId) continue;
      if (visited.has(edge.to)) continue;
      visited.add(edge.to);
      queue.push(edge.to);
    }
  }
  return { foundTarget: false, exploredStates: visited.size, status: "complete" };
}

for (const role of ["boundaryReadyL", "preCutL", "postCutProducts", "finalProducts"] as const) {
  if (!mandatorySccIds.includes(roleSccIds[role])) throw new Error(`${role} is not mandatory on every win path`);
}
const optionalStagingSccId = roleSccIds.optionalRightStagedL;
if (roleSccIds.optionalRightStagedLUp1 !== optionalStagingSccId || roleSccIds.optionalRightStagedLUp2 !== optionalStagingSccId) {
  throw new Error("optional staged-L translations do not form one reversible SCC");
}
if (roleSccIds.postCutProducts !== roleSccIds.tailAdvanced) {
  throw new Error("post-cut tail advance is not in the same reversible SCC");
}

const skeletonRecords = skeletonPaths.map((sccPath, index) => {
  const usesOptionalStaging = sccPath.includes(optionalStagingSccId);
  const finishesCrateFirst = sccPath.includes(roleSccIds.crateDone);
  return {
    skeletonId: `S${index + 1}`,
    sccPath,
    preparationClass: usesOptionalStaging ? "right_staged_same_orientation_l_then_return" : "direct_boundary_ready_l",
    finalIndependentOrder: finishesCrateFirst ? "crate_then_tail" : "tail_then_crate",
  };
});
const preparationClasses = [...new Set(skeletonRecords.map((record) => record.preparationClass))].sort();
const finalOrders = [...new Set(skeletonRecords.map((record) => record.finalIndependentOrder))].sort();
if (preparationClasses.length !== 2 || finalOrders.length !== 2 || skeletonRecords.length !== 4) {
  throw new Error("unexpected causal skeleton classification");
}
const mandatoryPredicateChecks = ([
  "boundaryReadyL",
  "preCutL",
  "postCutProducts",
  "finalProducts",
] as const).map((role) => ({
  role,
  forbiddenClassId: requiredClassIds[role],
  ...searchWinAvoidingObjectClasses(new Set([requiredClassIds[role]])),
}));
for (const check of mandatoryPredicateChecks) {
  if (check.foundWin || check.status !== "complete") throw new Error(`mandatory predicate bypass found: ${check.role}`);
}

const rawSccRecords = rawSccs.map((stateIndexes, rawSccId) => {
  const objectClassIds = [...new Set(stateIndexes.map((stateIndex) => classIdByKey.get(objectKey(stateIndex))!))].sort((a, b) => a - b);
  const objectSccIds = [...new Set(objectClassIds.map((classId) => sccIdByClass.get(classId)!))];
  if (objectSccIds.length !== 1) throw new Error(`raw SCC ${rawSccId} spans multiple object SCCs`);
  return {
    rawSccId,
    stateIndexes,
    stateCount: stateIndexes.length,
    objectClassIds,
    objectSccId: objectSccIds[0]!,
    isInitial: rawSccId === rawInitialSccId,
    containsWinState: stateIndexes.some((stateIndex) => graph.winStateIndexes.has(stateIndex)),
    outgoingRawSccIds: [...(rawSccAdjacency.get(rawSccId) ?? [])].sort((a, b) => a - b),
  };
});
const rawPathRecords = rawSkeletonPaths.map((rawSccPath, index) => {
  const objectSccPathWithRepeats = rawSccPath.map((rawSccId) =>
    rawSccId === rawSyntheticSinkId ? sinkSccId : rawSccRecords[rawSccId]!.objectSccId,
  );
  const objectSccPath = objectSccPathWithRepeats.filter((value, itemIndex) => itemIndex === 0 || value !== objectSccPathWithRepeats[itemIndex - 1]);
  const matchingObjectSkeleton = skeletonRecords.find((record) =>
    record.sccPath.length === objectSccPath.length && record.sccPath.every((value, itemIndex) => value === objectSccPath[itemIndex]),
  );
  if (!matchingObjectSkeleton) throw new Error(`raw path ${index + 1} does not map to an object skeleton`);
  return {
    rawPathId: `R${index + 1}`,
    rawSccPath,
    mappedObjectSccPath: objectSccPath,
    mappedObjectSkeletonId: matchingObjectSkeleton.skeletonId,
    preparationClass: matchingObjectSkeleton.preparationClass,
    finalIndependentOrder: matchingObjectSkeleton.finalIndependentOrder,
  };
});
const rawPathCountsByObjectSkeleton = Object.fromEntries(skeletonRecords.map((skeleton) => [
  skeleton.skeletonId,
  rawPathRecords.filter((rawPath) => rawPath.mappedObjectSkeletonId === skeleton.skeletonId).length,
]));
if (rawPathRecords.length !== 12 || Object.values(rawPathCountsByObjectSkeleton).some((count) => count === 0)) {
  throw new Error("unexpected raw SCC path coverage");
}
const multiObjectSccCertificates = sccs
  .map((classIds, objectSccId) => ({ objectSccId, classIds }))
  .filter((record) => record.classIds.length > 1 && relevantSccSet.has(record.objectSccId))
  .map((record) => {
    const witness = rawSccRecords.find((rawRecord) =>
      rawRecord.objectClassIds.length === record.classIds.length
      && rawRecord.objectClassIds.every((classId, index) => classId === record.classIds[index]),
    );
    if (!witness) throw new Error(`object SCC ${record.objectSccId} lacks a concrete raw-SCC witness`);
    const stateSet = new Set(witness.stateIndexes);
    const internalEventHistogram = new Map<string, number>();
    let internalEdges = 0;
    for (const edge of graph.edges) {
      if (!stateSet.has(edge.from) || !stateSet.has(edge.to)) continue;
      internalEdges += 1;
      for (const event of edge.events) internalEventHistogram.set(event, (internalEventHistogram.get(event) ?? 0) + 1);
    }
    return {
      objectSccId: record.objectSccId,
      objectClassIds: record.classIds,
      witnessRawSccId: witness.rawSccId,
      witnessRawStateCount: witness.stateCount,
      witnessInternalEdgeCount: internalEdges,
      witnessInternalEventHistogram: Object.fromEntries([...internalEventHistogram.entries()].sort(([a], [b]) => a.localeCompare(b))),
      exactClassCoverage: true,
    };
  });
const orderSpecificChecks = [
  {
    claim: "reach_preCutL_without_boundaryReadyL",
    targetRole: "preCutL",
    forbiddenRole: "boundaryReadyL",
    ...searchObjectClassAvoidingClass(requiredClassIds.preCutL, requiredClassIds.boundaryReadyL),
  },
  {
    claim: "reach_postCutProducts_without_preCutL",
    targetRole: "postCutProducts",
    forbiddenRole: "preCutL",
    ...searchObjectClassAvoidingClass(requiredClassIds.postCutProducts, requiredClassIds.preCutL),
  },
];
for (const check of orderSpecificChecks) {
  if (check.foundTarget || check.status !== "complete") throw new Error(`order bypass found: ${check.claim}`);
}
const winReachingEventBearingEdges = graph.edges
  .filter((edge) => canReachWin.has(edge.from) && canReachWin.has(edge.to))
  .filter((edge) => edge.events.some((event) => event.startsWith("sticky_merge") || event.startsWith("sticky_to_box")))
  .map((edge) => ({
    fromState: edge.from,
    toState: edge.to,
    fromClass: classIdByKey.get(objectKey(edge.from)),
    toClass: classIdByKey.get(objectKey(edge.to)),
    action: edge.action,
    events: edge.events,
  }));
const mergeBearingEdges = winReachingEventBearingEdges.filter((edge) => edge.events.some((event) => event.startsWith("sticky_merge")));
const normalizationBearingEdges = winReachingEventBearingEdges.filter((edge) => edge.events.some((event) => event.startsWith("sticky_to_box")));
if (
  mergeBearingEdges.length !== 2
  || !mergeBearingEdges.every((edge) => edge.fromClass === initialClassId && [requiredClassIds.optionalRightStagedL, requiredClassIds.boundaryReadyL].includes(edge.toClass!))
) throw new Error("unexpected win-reaching sticky_merge edges");
if (
  normalizationBearingEdges.length !== 1
  || normalizationBearingEdges[0]!.fromClass !== requiredClassIds.preCutL
  || normalizationBearingEdges[0]!.toClass !== requiredClassIds.postCutProducts
) throw new Error("unexpected win-reaching sticky_to_box edges");
const finalIncomingEdges = graph.edges
  .filter((edge) => graph.winStateIndexes.has(edge.to) && !graph.winStateIndexes.has(edge.from))
  .map((edge) => ({
    fromState: edge.from,
    toWinState: edge.to,
    fromClass: classIdByKey.get(objectKey(edge.from)),
    toClass: classIdByKey.get(objectKey(edge.to)),
    action: edge.action,
    events: edge.events,
    completionRole: classIdByKey.get(objectKey(edge.from)) === requiredClassIds.crateDone
      ? "tail_completes_east_target_after_crate"
      : "crate_completes_west_target_after_tail",
  }));
if (
  finalIncomingEdges.length !== 3
  || !finalIncomingEdges.every((edge) => edge.toClass === requiredClassIds.finalProducts)
  || !finalIncomingEdges.every((edge) => [requiredClassIds.crateDone, requiredClassIds.tailAdvanced].includes(edge.fromClass!))
) throw new Error("unexpected final incoming edge family");
const initialObjectChangingOutgoing = [...classEdgeBySignature.values()].filter((edge) => edge.fromClass === initialClassId);
const objectChangingIncomingToInitial = [...classEdgeBySignature.values()].filter((edge) => edge.toClass === initialClassId);
if (
  initialObjectChangingOutgoing.length !== 2
  || !initialObjectChangingOutgoing.every((edge) => edge.events.some((event) => event.startsWith("sticky_merge")))
  || objectChangingIncomingToInitial.length !== 0
) throw new Error("initial merge phase is not one-way and exhaustive");

const result = {
  candidateId,
  exactVersion,
  layoutSha256,
  graph: {
    status: graph.status,
    reachableStates: graph.keys.length,
    transitions: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    winReachableStates: relevantStateIndexes.length,
    winReachableTransitions: graph.edges.filter((edge) => canReachWin.has(edge.from) && canReachWin.has(edge.to)).length,
  },
  objectQuotient: {
    classCount: classRecords.length,
    nonWalkTransitionSignatures: classEdgeBySignature.size,
    classes: classRecords,
    transitions: [...classEdgeBySignature.values()].sort((a, b) => a.fromClass - b.fromClass || a.toClass - b.toClass),
  },
  sccCondensation: {
    sccCountBeforeSyntheticSink: sccs.length,
    relevantSccCountIncludingSink: relevantSccIds.length,
    initialSccId,
    syntheticWinSinkSccId: sinkSccId,
    objectQuotientDagPathCount: (pathCounts.get(sinkSccId) ?? 0n).toString(),
    mandatorySccIds,
    records: sccRecords,
  },
  rawStateSccProof: {
    method: "对 96 个 win-reaching 原始 runtime states 直接做 SCC；不聚合玩家坐标。",
    rawSccCountBeforeSyntheticSink: rawSccs.length,
    rawWinSccIds,
    rawInitialSccId,
    rawSyntheticWinSinkSccId: rawSyntheticSinkId,
    exactAcyclicPathCount: rawPathRecords.length,
    records: rawSccRecords,
    paths: rawPathRecords,
    mappedPathCountsByObjectSkeleton: rawPathCountsByObjectSkeleton,
    allRawPathsMappedToDeclaredObjectSkeleton: true,
    multiObjectQuotientSccConcreteWitnesses: multiObjectSccCertificates,
  },
  causalClassification: {
    coverageMethod: [
      "从 complete 状态图的全部胜态做逆向闭包，得到每一条可能胜路必然落入的 win-reaching 子图。",
      "去除玩家坐标形成对象态商；同一对象态内的边只改变玩家站位，不改变对象职责。",
      "对全部对象变化边建图并做 SCC；SCC 消去可逆对象循环，凝聚图为 DAG。",
      "枚举凝聚 DAG 从初态到统一胜利汇点的全部路径，并计算支配 SCC。",
    ],
    expectedRoles: Object.fromEntries(Object.entries(requiredClassIds).map(([role, classId]) => [role, {
      classId,
      sccId: sccIdByClass.get(classId),
      objectKey: requiredObjectKeys[role as keyof typeof requiredObjectKeys],
    }])),
    mandatoryMilestonesOnEveryWinPath: [
      "boundaryReadyL",
      "preCutL",
      "postCutProducts",
      "finalProducts",
    ],
    mandatoryPredicateBypassChecks: mandatoryPredicateChecks,
    orderSpecificRawChecks: orderSpecificChecks,
    eventPhaseConstraints: {
      winReachingEventBearingEdges,
      stickyMergeEdgeCount: mergeBearingEdges.length,
      stickyToBoxEdgeCount: normalizationBearingEdges.length,
      interpretation: "每条胜路离开 initialSeparateMaterials 时恰经两条 merge 边之一，之后不能返回初始对象态；sticky_to_box 只出现在 mandatory preCutL -> postCutProducts 边，且切割后没有 merge 或 material-normalization 边。因此所有胜路恰有一次合 L、一次 B/S 切割，且合 L 严格先于切割。",
    },
    finalIncomingEdgeExhaustiveness: {
      incomingEdgeCount: finalIncomingEdges.length,
      edges: finalIncomingEdges,
      finalObjectClassId: requiredClassIds.finalProducts,
      finalObjectKey: requiredObjectKeys.finalProducts,
      targetDutyAssignment: "crate_at_west_target_1,3; sticky_tail_at_east_target_column_3,4_and_3,5",
      interpretation: "全部非胜到胜入边只来自 crateDone 或 tailAdvanced：要么末推竖条，要么末推箱子；胜态对象类唯一，产品目标职责固定。",
    },
    skeletonPathCount: skeletonRecords.length,
    skeletons: skeletonRecords,
    exhaustiveBranchProduct: {
      preparationClasses,
      finalIndependentOrders: finalOrders,
      expectedCartesianProductSize: preparationClasses.length * finalOrders.length,
    },
    noOtherWinReachingObjectBranches: true,
  },
};

const roleLines = Object.entries(result.causalClassification.expectedRoles).map(([role, record]) =>
  `- ${role}: class ${record.classId}, SCC ${record.sccId}, \`${record.objectKey}\``,
);
const skeletonLines = skeletonRecords.map((record) =>
  `- ${record.skeletonId}: SCC ${record.sccPath.join(" -> ")}；前段=${record.preparationClass}；末段=${record.finalIndependentOrder}`,
);
const reportLines = [
  `# V6 全胜路因果等价审计`,
  "",
  `- candidate: ${candidateId}`,
  `- exact: ${exactVersion}`,
  `- layout SHA256: ${layoutSha256}`,
  `- 完整状态图: ${graph.keys.length} 状态 / ${graph.edges.length} 转移 / ${graph.winStateIndexes.size} 胜态`,
  `- 逆向胜利闭包: ${result.graph.winReachableStates} 状态 / ${result.graph.winReachableTransitions} 转移`,
  `- 对象态商: ${classRecords.length} 类；对象变化转移签名 ${classEdgeBySignature.size} 种`,
  `- 消去可逆对象循环后的完整因果骨架: ${skeletonRecords.length} 条`,
  `- 原始 runtime state SCC: ${rawSccs.length} 个；精确 source-to-win DAG 路径: ${rawPathRecords.length} 条`,
  "",
  "## 覆盖方法",
  "",
  ...result.causalClassification.coverageMethod.map((line) => `- ${line}`),
  "",
  "任何实际胜路都在完整图中，且从其每个状态仍能到达某个胜态，所以必被逆向闭包覆盖。先在 96 个原始 runtime states 上做 SCC，精确得到 14 个 SCC 与 12 条 source-to-win DAG 路径；这一步不聚合玩家坐标。随后才把这 12 条逐条映射到对象态商，全部落入下述 4 个宏骨架。对象态商只负责命名玩家逻辑，不单独承担无旁路证明。",
  "",
  "## 具名对象态",
  "",
  ...roleLines,
  "",
  "## 全部因果骨架",
  "",
  ...skeletonLines,
  "",
  `原始 12 条路径到宏骨架的计数：${Object.entries(rawPathCountsByObjectSkeleton).map(([id, count]) => `${id}=${count}`).join("，")}。四条骨架恰为 2×2：前段要么直接形成边界就位 L，要么先在右侧形成同朝向 L、在一个 raw-state 可逆 SCC 内上下试探后唯一汇入边界就位 L；末段要么先推箱上西目标再推竖条上东目标，要么先推竖条再推箱。除此之外没有仍可获胜的对象分支。`,
  "",
  "对四个具名必经对象态另做了原始完整状态图上的禁用搜索（不是只依赖对象商）：分别禁止 boundaryReadyL、preCutL、postCutProducts 或 finalProducts 的所有具体玩家状态后，搜索均 complete 且找不到胜路。具体 exploredStates 记录在 results.json。",
  "",
  "顺序探针同样在原始图上成立：避开 boundaryReadyL 无法抵达 preCutL，避开 preCutL 无法抵达 postCutProducts。win-reaching 子图中只有两条 sticky_merge 边（初始材料分别汇入直接 L 或右侧同向 L）和一条 sticky_to_box 边（preCutL 到 postCutProducts）；因此每条胜路恰合并一次、切割一次，且合并严格早于切割。",
  "",
  "三个非胜到胜入边也已全部枚举：只可能从 crateDone 末推竖条，或从 tailAdvanced 末推箱子；三者都进入同一个 finalProducts 对象类。因此箱子固定承担西目标、竖条固定承担东目标。",
  "",
  "## 必经因果链与等价边界",
  "",
  "raw SCC 路径逐条映射、对象商凝聚 DAG 的支配分析以及原始图禁用搜索三者一致：全部胜路都必经 boundaryReadyL → preCutL → postCutProducts → finalProducts。也就是：同朝向三格 L 必须在边界前就位，整块再左移一格，随后由 B/S 切成西侧箱子与两格竖条，终局箱子固定覆盖西目标、竖条固定覆盖东目标。可选前段只增加同一 L 的可逆搬运/试探；可选末段只交换两个切割产物的独立兑现顺序。",
  "",
  "本证据不声称所有胜路在同一格触发 sticky_merge，也不把循环展开为有限条原始输入串；它证明的是消去回返循环后，全部胜路只剩上述四个逻辑骨架，且对象职责、目标分配和核心依赖顺序一致。",
  "",
];

await mkdir(import.meta.dirname, { recursive: true });
await writeFile(path.join(import.meta.dirname, "results.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
await writeFile(path.join(import.meta.dirname, "report.md"), `${reportLines.join("\n")}\n`, "utf8");
console.log(JSON.stringify({
  graph: result.graph,
  objectClasses: classRecords.length,
  sccs: result.sccCondensation.sccCountBeforeSyntheticSink,
  relevantSccs: result.sccCondensation.relevantSccCountIncludingSink,
  objectQuotientDagPathCount: result.sccCondensation.objectQuotientDagPathCount,
  mandatorySccIds,
}, null, 2));

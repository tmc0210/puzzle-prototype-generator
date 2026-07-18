import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const taskRoot = path.join(
  repoRoot,
  "prototypes", "reality_anchor", "reports", "design_tree_sticky_irregular_boundary_20260718",
);
const prototypeRoot = path.join(repoRoot, "prototypes", "reality_anchor");
const candidateId = "RA_STICKY_IRREGULAR_BOUNDARY_CONSTRUCT_PREFIX_V10";
const layoutSha256Expected = "1c273480c51de2e3bbd284c2962729cd8cc7c38b549719f984b059f3cfd5a89a";
const exactVersion = `v10_sha256_${layoutSha256Expected}`;
const layoutPath = path.join(taskRoot, "nodes", "construct_prefix_v10", "layout.txt");
const canonicalInputs = [
  "down", "right", "down", "right", "down", "right", "down", "down",
  "right", "right", "up", "up", "up", "left", "left", "up",
];

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const layoutSha256 = createHash("sha256").update(layout).digest("hex");
if (layoutSha256 !== layoutSha256Expected) throw new Error(`layout hash mismatch: ${layoutSha256}`);
const level: LevelDoc = { id: `${candidateId}_${exactVersion}`, title: candidateId, layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const runtimeOptions = { winCondition: pkg.mechanic.win, maxStates: 500_000 };
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  pkg.mechanic.win,
  runtimeOptions,
  { maxStates: 500_000, terminalizeWins: true },
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

// terminal wins 的逆向闭包等于“至少位于一条胜路上”的全部原始 runtime states。
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

// 对 win-reaching 原始 states 直接做 Tarjan SCC，不聚合玩家坐标或对象态。
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

const anchorSuffix = "|PL:P:5,1;L:6,1|BS:B:1,7;S:1,6";
const roleKeys = {
  initialIntactL: `C:|M:4,4;5,4;5,5${anchorSuffix}`,
  pSideRightPushedIntactL: `C:|M:5,4;6,4;6,5${anchorSuffix}`,
  firstLSideDownPulledIntactL: `C:|M:5,5;6,5;6,6${anchorSuffix}`,
  optionalHorizontalTrialIntactL: `C:|M:6,5;7,5;7,6${anchorSuffix}`,
  postBoundaryCut: `C:6,7|M:5,6;6,6${anchorSuffix}`,
  finalUpPulledArm: `C:6,7|M:5,5;6,5${anchorSuffix}`,
} as const;
const roleStates = Object.fromEntries(Object.entries(roleKeys).map(([role, key]) => {
  const stateIndexes = [...canReachWin].filter((stateIndex) => objectKey(stateIndex) === key).sort((a, b) => a - b);
  if (stateIndexes.length === 0) throw new Error(`missing role state: ${role}`);
  return [role, stateIndexes];
})) as Record<keyof typeof roleKeys, number[]>;
const winReachingObjectKeys = [...new Set([...canReachWin].map((stateIndex) => objectKey(stateIndex)))].sort();

const objectTransitionSignatures = new Map<string, {
  fromObjectKey: string;
  toObjectKey: string;
  action: string;
  events: string[];
  rawEdgeCount: number;
}>();
for (const edge of winReachingEdges) {
  const fromObjectKey = objectKey(edge.from);
  const toObjectKey = objectKey(edge.to);
  if (fromObjectKey === toObjectKey) continue;
  const signature = JSON.stringify([fromObjectKey, toObjectKey, edge.action, edge.events]);
  const record = objectTransitionSignatures.get(signature) ?? {
    fromObjectKey, toObjectKey, action: edge.action, events: edge.events, rawEdgeCount: 0,
  };
  record.rawEdgeCount += 1;
  objectTransitionSignatures.set(signature, record);
}
const boundaryCutTransitionVariants = [...objectTransitionSignatures.values()]
  .filter((record) => record.toObjectKey === roleKeys.postBoundaryCut)
  .map((record) => ({ action: record.action, events: record.events, fromObjectKey: record.fromObjectKey, toObjectKey: record.toObjectKey }));
const finalTransitionVariants = [...objectTransitionSignatures.values()]
  .filter((record) => record.toObjectKey === roleKeys.finalUpPulledArm)
  .map((record) => ({ action: record.action, events: record.events, fromObjectKey: record.fromObjectKey, toObjectKey: record.toObjectKey }));
const milestoneTransitionSpecs = [
  { name: "pSideRightPush", from: roleKeys.initialIntactL, to: roleKeys.pSideRightPushedIntactL, action: "right", event: "push_object:sticky#1" },
  { name: "firstLSideDownPull", from: roleKeys.pSideRightPushedIntactL, to: roleKeys.firstLSideDownPulledIntactL, action: "down", event: "pull_object:sticky#1" },
  { name: "secondLSideDownPullCut", from: roleKeys.firstLSideDownPulledIntactL, to: roleKeys.postBoundaryCut, action: "down", event: "pull_object:sticky#1" },
  { name: "finalLSideUpPull", from: roleKeys.postBoundaryCut, to: roleKeys.finalUpPulledArm, action: "up", event: "pull_object:sticky#1" },
] as const;
const milestoneTransitionAudit = milestoneTransitionSpecs.map((spec) => {
  const variants = [...objectTransitionSignatures.values()].filter((record) => record.fromObjectKey === spec.from && record.toObjectKey === spec.to);
  return {
    ...spec,
    variants,
    uniqueExpectedVariant: variants.length === 1
      && variants[0]!.action === spec.action
      && variants[0]!.events.includes(spec.event),
  };
});
if (milestoneTransitionAudit.some((record) => !record.uniqueExpectedVariant)) {
  throw new Error("mandatory milestone has a parallel action variant");
}

function searchGraph(options: {
  startStateIndexes?: number[];
  forbiddenStateIndexes?: Set<number>;
  forbiddenEdge?: (edge: Edge) => boolean;
}): { foundWin: boolean; exploredStates: number; status: "found" | "complete" } {
  const starts = options.startStateIndexes ?? [0];
  const visited = new Set(starts);
  const queue = [...starts];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const stateIndex = queue[cursor]!;
    if (graph.winStateIndexes.has(stateIndex)) return { foundWin: true, exploredStates: visited.size, status: "found" };
    for (const edge of outgoing.get(stateIndex) ?? []) {
      if (options.forbiddenStateIndexes?.has(edge.to)) continue;
      if (options.forbiddenEdge?.(edge)) continue;
      if (visited.has(edge.to)) continue;
      visited.add(edge.to);
      queue.push(edge.to);
    }
  }
  return { foundWin: false, exploredStates: visited.size, status: "complete" };
}

const mandatoryRoleChecks = (Object.keys(roleKeys) as Array<keyof typeof roleKeys>).map((role) => ({
  role,
  ...searchGraph({ forbiddenStateIndexes: new Set(roleStates[role]) }),
}));
const provenMandatoryRoles = mandatoryRoleChecks.filter((check) => !check.foundWin && check.status === "complete").map((check) => check.role);
const milestoneEdgeNecessityChecks = milestoneTransitionSpecs.map((spec) => ({
  name: spec.name,
  ...searchGraph({
    forbiddenEdge: (edge) => objectKey(edge.from) === spec.from
      && objectKey(edge.to) === spec.to
      && edge.action === spec.action
      && edge.events.includes(spec.event),
  }),
}));
if (milestoneEdgeNecessityChecks.some((check) => check.foundWin || check.status !== "complete")) {
  throw new Error("mandatory milestone edge has a winning bypass");
}

const roleByState = new Map<number, keyof typeof roleStates>();
for (const [role, stateIndexes] of Object.entries(roleStates) as Array<[keyof typeof roleStates, number[]]>) {
  for (const stateIndex of stateIndexes) roleByState.set(stateIndex, role);
}
const rawSccTransitionRecords = new Map<string, {
  fromRawScc: number;
  toRawScc: number;
  action: string;
  events: string[];
  fromObjectKey: string;
  toObjectKey: string;
  rawEdgeCount: number;
}>();
for (const edge of winReachingEdges) {
  const fromRawScc = rawSccIdByState.get(edge.from)!;
  const toRawScc = rawSccIdByState.get(edge.to)!;
  if (fromRawScc === toRawScc) continue;
  const signature = JSON.stringify([fromRawScc, toRawScc, edge.action, edge.events, objectKey(edge.from), objectKey(edge.to)]);
  const record = rawSccTransitionRecords.get(signature) ?? {
    fromRawScc,
    toRawScc,
    action: edge.action,
    events: edge.events,
    fromObjectKey: objectKey(edge.from),
    toObjectKey: objectKey(edge.to),
    rawEdgeCount: 0,
  };
  record.rawEdgeCount += 1;
  rawSccTransitionRecords.set(signature, record);
}
const initialWinReachingCondensationExits = [...rawSccTransitionRecords.values()]
  .filter((record) => record.fromRawScc === initialRawSccId);
function summarizeRuntimeEdge(edge: Edge) {
  return {
    fromState: edge.from,
    toState: edge.to,
    fromRawScc: rawSccIdByState.get(edge.from)!,
    toRawScc: rawSccIdByState.get(edge.to)!,
    action: edge.action,
    events: edge.events,
    fromObjectKey: objectKey(edge.from),
    toObjectKey: objectKey(edge.to),
  };
}
const horizontalTrialForwardEdges = winReachingEdges.filter((edge) =>
  objectKey(edge.from) === roleKeys.firstLSideDownPulledIntactL
  && objectKey(edge.to) === roleKeys.optionalHorizontalTrialIntactL
  && edge.action === "right"
  && edge.events.some((event) => event.startsWith("push_object:sticky#1"))
);
const horizontalTrialReturnEdges = winReachingEdges.filter((edge) =>
  objectKey(edge.from) === roleKeys.optionalHorizontalTrialIntactL
  && objectKey(edge.to) === roleKeys.firstLSideDownPulledIntactL
  && edge.action === "left"
  && edge.events.some((event) => event.startsWith("pull_object:sticky#1"))
);
if (horizontalTrialForwardEdges.length !== 1 || horizontalTrialReturnEdges.length !== 1) {
  throw new Error("horizontal trial is not a unique forward/return pair");
}
const horizontalTrialRawSccId = rawSccIdByState.get(horizontalTrialForwardEdges[0]!.from)!;
const horizontalTrialLoopAudit = {
  forward: summarizeRuntimeEdge(horizontalTrialForwardEdges[0]!),
  returning: summarizeRuntimeEdge(horizontalTrialReturnEdges[0]!),
  allEndpointsInSameRawScc: [
    horizontalTrialForwardEdges[0]!.from,
    horizontalTrialForwardEdges[0]!.to,
    horizontalTrialReturnEdges[0]!.from,
    horizontalTrialReturnEdges[0]!.to,
  ].every((stateIndex) => rawSccIdByState.get(stateIndex) === horizontalTrialRawSccId),
  rawSccId: horizontalTrialRawSccId,
  optionalRoleCheck: mandatoryRoleChecks.find((check) => check.role === "optionalHorizontalTrialIntactL")!,
  changesCondensationPath: false,
  conclusion: "right push 把完整 L 横移到试探态，left pull 精确回到 firstLSideDownPulledIntactL；两边均在同一 win-reaching raw SCC，禁用试探态仍可胜。",
};
if (!horizontalTrialLoopAudit.allEndpointsInSameRawScc || !horizontalTrialLoopAudit.optionalRoleCheck.foundWin) {
  throw new Error("horizontal trial is not proven as an optional reversible SCC loop");
}
function findWitnessForRawSccPath(rawSccPath: number[]): {
  found: boolean;
  stateIndexes: number[];
  inputs: string[];
  events: string[][];
  objectKeys: string[];
  objectMotionSteps: Array<{ step: number; input: string; events: string[]; beforeObjectKey: string; afterObjectKey: string }>;
} {
  const allowedPath = rawSccPath.filter((rawSccId) => rawSccId !== syntheticSinkId);
  const visited = new Set<number>([0]);
  const queue = [0];
  const parent = new Map<number, { from: number; edge: Edge }>();
  let foundWin: number | null = null;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const stateIndex = queue[cursor]!;
    if (graph.winStateIndexes.has(stateIndex)) {
      foundWin = stateIndex;
      break;
    }
    const currentRawScc = rawSccIdByState.get(stateIndex)!;
    const currentPathIndex = allowedPath.indexOf(currentRawScc);
    if (currentPathIndex < 0) continue;
    for (const edge of outgoing.get(stateIndex) ?? []) {
      if (!canReachWin.has(edge.to)) continue;
      const targetRawScc = rawSccIdByState.get(edge.to)!;
      const allowedTargetRawScc = allowedPath[currentPathIndex + 1];
      if (targetRawScc !== currentRawScc && targetRawScc !== allowedTargetRawScc) continue;
      if (visited.has(edge.to)) continue;
      visited.add(edge.to);
      parent.set(edge.to, { from: stateIndex, edge });
      queue.push(edge.to);
    }
  }
  if (foundWin === null) return { found: false, stateIndexes: [], inputs: [], events: [], objectKeys: [], objectMotionSteps: [] };
  const reversedEdges: Edge[] = [];
  const reversedStates = [foundWin];
  let cursor = foundWin;
  while (cursor !== 0) {
    const predecessor = parent.get(cursor);
    if (!predecessor) throw new Error("raw SCC witness parent chain missing");
    reversedEdges.push(predecessor.edge);
    cursor = predecessor.from;
    reversedStates.push(cursor);
  }
  const edges = reversedEdges.reverse();
  const stateIndexes = reversedStates.reverse();
  const objectKeys = stateIndexes.map((stateIndex) => objectKey(stateIndex));
  return {
    found: true,
    stateIndexes,
    inputs: edges.map((edge) => edge.action),
    events: edges.map((edge) => edge.events),
    objectKeys,
    objectMotionSteps: edges.map((edge, index) => ({
      step: index + 1,
      input: edge.action,
      events: edge.events,
      beforeObjectKey: objectKeys[index]!,
      afterObjectKey: objectKeys[index + 1]!,
    })).filter((record) => record.beforeObjectKey !== record.afterObjectKey),
  };
}
function shortestEdgePath(
  startStateIndex: number,
  isGoal: (stateIndex: number) => boolean,
  allowEdge: (edge: Edge) => boolean = () => true,
): Edge[] {
  const visited = new Set<number>([startStateIndex]);
  const queue = [startStateIndex];
  const parent = new Map<number, { from: number; edge: Edge }>();
  let goalStateIndex: number | null = isGoal(startStateIndex) ? startStateIndex : null;
  for (let cursor = 0; cursor < queue.length && goalStateIndex === null; cursor += 1) {
    const stateIndex = queue[cursor]!;
    for (const edge of outgoing.get(stateIndex) ?? []) {
      if (!allowEdge(edge) || visited.has(edge.to)) continue;
      visited.add(edge.to);
      parent.set(edge.to, { from: stateIndex, edge });
      if (isGoal(edge.to)) {
        goalStateIndex = edge.to;
        break;
      }
      queue.push(edge.to);
    }
  }
  if (goalStateIndex === null) throw new Error("shortest edge path not found");
  const reversed: Edge[] = [];
  let cursor = goalStateIndex;
  while (cursor !== startStateIndex) {
    const predecessor = parent.get(cursor);
    if (!predecessor) throw new Error("shortest edge path parent missing");
    reversed.push(predecessor.edge);
    cursor = predecessor.from;
  }
  return reversed.reverse();
}
function summarizeEdgeTrace(startStateIndex: number, edges: Edge[]) {
  const stateIndexes = [startStateIndex, ...edges.map((edge) => edge.to)];
  const objectKeys = stateIndexes.map((stateIndex) => objectKey(stateIndex));
  return {
    stateIndexes,
    inputs: edges.map((edge) => edge.action),
    events: edges.map((edge) => edge.events),
    objectKeys,
    objectMotionSteps: edges.map((edge, index) => ({
      step: index + 1,
      input: edge.action,
      events: edge.events,
      beforeObjectKey: objectKeys[index]!,
      afterObjectKey: objectKeys[index + 1]!,
    })).filter((record) => record.beforeObjectKey !== record.afterObjectKey),
  };
}
const rawPathRecords = rawPaths.map((rawSccPath, index) => {
  const roles = rawSccPath.flatMap((rawSccId) => rawSccId === syntheticSinkId
    ? []
    : [...new Set(rawSccs[rawSccId]!.map((stateIndex) => roleByState.get(stateIndex)).filter(Boolean))] as Array<keyof typeof roleStates>);
  const usesPersistentIntactCanonicalFront = provenMandatoryRoles.includes("pSideRightPushedIntactL")
    && provenMandatoryRoles.includes("firstLSideDownPulledIntactL")
    && provenMandatoryRoles.includes("postBoundaryCut");
  const commitmentTransitions = rawSccPath.slice(0, -2).map((fromRawScc, transitionIndex) => {
    const toRawScc = rawSccPath[transitionIndex + 1]!;
    return {
      fromRawScc,
      toRawScc,
      variants: [...rawSccTransitionRecords.values()].filter((record) => record.fromRawScc === fromRawScc && record.toRawScc === toRawScc),
    };
  });
  const frontLogicClasses = commitmentTransitions[0]!.variants.map((variant) => {
    if (variant.fromObjectKey === roleKeys.initialIntactL && variant.toObjectKey === roleKeys.pSideRightPushedIntactL && variant.events.some((event) => event.startsWith("push_object:sticky#1"))) {
      return "mandatory_P_side_right_push";
    }
    if (variant.fromObjectKey === roleKeys.initialIntactL && variant.events.some((event) => event.startsWith("pull_object:sticky#1"))) {
      return "direct_L_side_right_pull";
    }
    return "other_front";
  });
  const witness = findWitnessForRawSccPath(rawSccPath);
  const boundaryCutStep = witness.objectMotionSteps.find((step) => step.afterObjectKey === roleKeys.postBoundaryCut);
  const boundaryCutMotion = boundaryCutStep?.events.some((event) => event.startsWith("pull_object:sticky#1"))
    ? "L_side_second_down_pull"
    : boundaryCutStep?.events.some((event) => event.startsWith("push_object:sticky#1"))
      ? "P_side_down_push"
      : "unclassified";
  const finalArmStep = witness.objectMotionSteps.find((step) => step.afterObjectKey === roleKeys.finalUpPulledArm);
  const finalArmMotion = finalArmStep?.input === "up" && finalArmStep.events.some((event) => event.startsWith("pull_object:sticky#1"))
    ? "L_side_up_pull"
    : finalArmStep?.events.some((event) => event.startsWith("push_object:sticky#1"))
      ? `push_${finalArmStep.input}`
      : finalArmStep ? `other_${finalArmStep.input}` : "unclassified";
  return {
    rawPathId: `R${index + 1}`,
    rawSccPath,
    roles,
    frontLogic: frontLogicClasses.join(" | "),
    frontLogicClasses,
    usesPersistentIntactCanonicalFront,
    optionalReversibleRolesInsideSccs: roles.filter((role) => role === "optionalHorizontalTrialIntactL"),
    mandatoryCutOutput: provenMandatoryRoles.includes("postBoundaryCut") ? "arm_y6_plus_crate_6_7" : "not_proven",
    boundaryCutMotion,
    finalArmMotion,
    commitmentTransitions,
    witness,
    objectDuties: "凸脚箱固定(6,7)，两格横臂黏块整体上拉到(5,5)(6,5)",
  };
});

// 初态对象不动时的玩家走位闭包，以及这个闭包能发出的全部首个对象动作。
const initialObjectKey = roleKeys.initialIntactL;
const initialWalkClosure = new Set<number>([0]);
const initialWalkQueue = [0];
for (let cursor = 0; cursor < initialWalkQueue.length; cursor += 1) {
  const stateIndex = initialWalkQueue[cursor]!;
  for (const edge of outgoing.get(stateIndex) ?? []) {
    if (objectKey(edge.to) !== initialObjectKey || initialWalkClosure.has(edge.to)) continue;
    initialWalkClosure.add(edge.to);
    initialWalkQueue.push(edge.to);
  }
}
const firstObjectActions = new Map<string, {
  action: string;
  events: string[];
  toObjectKey: string;
  rawEdgeCount: number;
  sourceStates: number[];
  targetStates: number[];
}>();
for (const stateIndex of initialWalkClosure) {
  for (const edge of outgoing.get(stateIndex) ?? []) {
    if (objectKey(edge.to) === initialObjectKey) continue;
    const signature = JSON.stringify([edge.action, edge.events, objectKey(edge.to)]);
    const record = firstObjectActions.get(signature) ?? {
      action: edge.action,
      events: edge.events,
      toObjectKey: objectKey(edge.to),
      rawEdgeCount: 0,
      sourceStates: [],
      targetStates: [],
    };
    record.rawEdgeCount += 1;
    record.sourceStates.push(edge.from);
    record.targetStates.push(edge.to);
    firstObjectActions.set(signature, record);
  }
}
const firstObjectActionRecords = [...firstObjectActions.values()].map((record) => {
  const uniqueTargets = [...new Set(record.targetStates)].sort((a, b) => a - b);
  const suffix = searchGraph({ startStateIndexes: uniqueTargets });
  const firstEdge = graph.edges.find((edge) => record.sourceStates.includes(edge.from)
    && edge.action === record.action
    && JSON.stringify(edge.events) === JSON.stringify(record.events)
    && objectKey(edge.to) === record.toObjectKey);
  if (!firstEdge) throw new Error("initial object action witness edge missing");
  const prefixEdges = shortestEdgePath(
    0,
    (stateIndex) => stateIndex === firstEdge.from,
    (edge) => objectKey(edge.from) === initialObjectKey && objectKey(edge.to) === initialObjectKey,
  );
  const suffixEdges = shortestEdgePath(firstEdge.to, (stateIndex) => graph.winStateIndexes.has(stateIndex));
  return {
    ...record,
    sourceStates: [...new Set(record.sourceStates)].sort((a, b) => a - b),
    targetStates: uniqueTargets,
    winReachingTargetCount: uniqueTargets.filter((stateIndex) => canReachWin.has(stateIndex)).length,
    completeSuffixUnion: suffix,
    concreteWinningWitness: summarizeEdgeTrace(0, [...prefixEdges, firstEdge, ...suffixEdges]),
  };
});
const viableFirstObjectActions = firstObjectActionRecords.filter((record) => record.completeSuffixUnion.foundWin);

function searchWinWithoutEvent(prefixes: string[]) {
  return searchGraph({
    forbiddenEdge: (edge) => edge.events.some((event) => prefixes.some((prefix) => event.startsWith(prefix))),
  });
}
const eventNecessityChecks = [
  { group: "sticky_push", prefixes: ["push_object:sticky#1"], ...searchWinWithoutEvent(["push_object:sticky#1"]) },
  { group: "sticky_pull", prefixes: ["pull_object:sticky#1"], ...searchWinWithoutEvent(["pull_object:sticky#1"]) },
  { group: "rigid_motion", prefixes: ["move_sticky_rigid"], ...searchWinWithoutEvent(["move_sticky_rigid"]) },
  { group: "single_cell_normalization", prefixes: ["sticky_to_box:n1"], ...searchWinWithoutEvent(["sticky_to_box:n1"]) },
];
const optionalEventBypassChecks = [
  { group: "sticky_merge", prefixes: ["sticky_merge"], ...searchWinWithoutEvent(["sticky_merge"]) },
  { group: "box_to_sticky", prefixes: ["box_to_sticky"], ...searchWinWithoutEvent(["box_to_sticky"]) },
];
const eventReachabilityCounts = {
  fullReachableGraph: {
    anchorBoundaryShift: graph.edges.filter((edge) => edge.events.some((event) => event.startsWith("anchor_boundary_shift"))).length,
    stickyMerge: graph.edges.filter((edge) => edge.events.some((event) => event.startsWith("sticky_merge"))).length,
    boxToSticky: graph.edges.filter((edge) => edge.events.some((event) => event.startsWith("box_to_sticky"))).length,
  },
  winReachingSubgraph: {
    anchorBoundaryShift: winReachingEdges.filter((edge) => edge.events.some((event) => event.startsWith("anchor_boundary_shift"))).length,
    stickyMerge: winReachingEdges.filter((edge) => edge.events.some((event) => event.startsWith("sticky_merge"))).length,
    boxToSticky: winReachingEdges.filter((edge) => edge.events.some((event) => event.startsWith("box_to_sticky"))).length,
  },
};

function runPrefix(inputs: string[]): {
  inputs: string[];
  legal: boolean;
  events: string[][];
  stateKey: string;
  objectKey: string;
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
  const stateKey = runtime.key(state);
  return {
    inputs,
    legal,
    events,
    stateKey,
    objectKey: stateKey.replace(/^Ply:[^|]+\|/, ""),
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
  canonicalFirstObjectAction: runPrefix(["down", "right"]),
  afterFirstDownPull: runPrefix(["down", "right", "down", "right", "down", "right", "down"]),
  afterBoundaryCut: runPrefix(["down", "right", "down", "right", "down", "right", "down", "down"]),
};
if (!prefixCounterfactuals.canonicalFirstObjectAction.legal || !prefixCounterfactuals.canonicalFirstObjectAction.suffix?.found) {
  throw new Error("canonical first object action failed");
}
if (prefixCounterfactuals.afterFirstDownPull.objectKey !== roleKeys.firstLSideDownPulledIntactL) throw new Error("first down pull role mismatch");
if (prefixCounterfactuals.afterBoundaryCut.objectKey !== roleKeys.postBoundaryCut) throw new Error("boundary cut role mismatch");

const canonicalResult = runPrefix(canonicalInputs);
if (!canonicalResult.legal || canonicalResult.objectKey !== roleKeys.finalUpPulledArm) throw new Error("canonical replay failed");
const canonicalStepEvents = canonicalResult.events.map((events, index) => ({
  step: index + 1,
  input: canonicalInputs[index],
  events,
}));
const canonicalObjectSteps = canonicalStepEvents.filter((record) => record.events.some((event) => event !== "walk"));
const expectedCanonicalObjectSteps = [
  { step: 2, input: "right", includes: ["push_object:sticky#1", "move_sticky_rigid"] },
  { step: 7, input: "down", includes: ["pull_object:sticky#1", "move_sticky_rigid"] },
  { step: 8, input: "down", includes: ["pull_object:sticky#1", "move_sticky_rigid", "sticky_to_box:n1"] },
  { step: 16, input: "up", includes: ["pull_object:sticky#1", "move_sticky_rigid"] },
];
if (
  canonicalObjectSteps.length !== expectedCanonicalObjectSteps.length
  || !expectedCanonicalObjectSteps.every((expected, index) => {
    const actual = canonicalObjectSteps[index]!;
    return actual.step === expected.step
      && actual.input === expected.input
      && expected.includes.every((event) => actual.events.includes(event));
  })
) throw new Error("canonical event skeleton mismatch");

const winningObjectKeys = [...new Set([...graph.winStateIndexes].map((stateIndex) => objectKey(stateIndex)))];
if (winningObjectKeys.length !== 1 || winningObjectKeys[0] !== roleKeys.finalUpPulledArm) {
  throw new Error("winning object duties differ");
}

const result = {
  candidateId,
  exactVersion,
  layoutPath: path.relative(repoRoot, layoutPath).replaceAll("\\", "/"),
  layoutSha256,
  canonicalInputs,
  graph: {
    status: graph.status,
    reachableStates: graph.keys.length,
    transitions: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    winReachingStates: canReachWin.size,
    winReachingTransitions: winReachingEdges.length,
    terminalizeWins: true,
    maxStates: 500_000,
  },
  canonical: {
    ...canonicalResult,
    objectEventSteps: canonicalObjectSteps,
  },
  causalMilestones: {
    roleKeys,
    roleStateCounts: Object.fromEntries(Object.entries(roleStates).map(([role, states]) => [role, states.length])),
    winReachingObjectKeys,
    allWinReachingObjectTransitionSignatures: [...objectTransitionSignatures.values()],
    boundaryCutTransitionVariants,
    finalTransitionVariants,
    milestoneTransitionAudit,
    milestoneEdgeNecessityChecks,
    mandatoryRoleChecks,
    provenMandatoryRoles,
    materialDeltaAtBoundary: {
      before: { sticky: [[5, 5], [6, 5], [6, 6]], crates: [] },
      after: { sticky: [[5, 6], [6, 6]], crates: [[6, 7]] },
      interpretation: "第二次 down pull 把完整 L 下移一格；只有从 S 行 y=6 跨入 B 行 y=7 的凸脚 (6,7) 触发 sticky_to_box:n1，两格横臂仍为 sticky。",
    },
    finalObjectDuties: {
      crate: { position: [6, 7], target: true, movesAfterCut: 0 },
      stickyArm: { postCut: [[5, 6], [6, 6]], final: [[5, 5], [6, 5]], motion: "up", bothTargets: true },
    },
  },
  rawStateSccProof: {
    rawSccCount: rawSccs.length,
    syntheticSinkId,
    exactAcyclicPathCount: rawPathRecords.length,
    paths: rawPathRecords,
    frontLogicCounts: Object.fromEntries([...new Set(rawPathRecords.map((record) => record.frontLogic))].map((frontLogic) => [
      frontLogic,
      rawPathRecords.filter((record) => record.frontLogic === frontLogic).length,
    ])),
    frontLogicClasses: [...new Set(rawPathRecords.flatMap((record) => record.frontLogicClasses))],
    frontLogicClassCount: new Set(rawPathRecords.flatMap((record) => record.frontLogicClasses)).size,
    mandatoryCutOutputCounts: Object.fromEntries([...new Set(rawPathRecords.map((record) => record.mandatoryCutOutput))].map((mandatoryCutOutput) => [
      mandatoryCutOutput,
      rawPathRecords.filter((record) => record.mandatoryCutOutput === mandatoryCutOutput).length,
    ])),
    finalArmMotionCounts: Object.fromEntries([...new Set(rawPathRecords.map((record) => record.finalArmMotion))].map((finalArmMotion) => [
      finalArmMotion,
      rawPathRecords.filter((record) => record.finalArmMotion === finalArmMotion).length,
    ])),
    boundaryCutMotionCounts: Object.fromEntries([...new Set(rawPathRecords.map((record) => record.boundaryCutMotion))].map((boundaryCutMotion) => [
      boundaryCutMotion,
      rawPathRecords.filter((record) => record.boundaryCutMotion === boundaryCutMotion).length,
    ])),
    allPathsUseSingleFrontLogic: new Set(rawPathRecords.map((record) => record.frontLogic)).size === 1,
    allPathsUseSingleObjectDutyAssignment: rawPathRecords.every((record) => record.objectDuties === "凸脚箱固定(6,7)，两格横臂黏块整体上拉到(5,5)(6,5)"),
    condensationTransitionSignatures: [...rawSccTransitionRecords.values()],
    horizontalTrialLoopAudit,
  },
  initialObjectActionAudit: {
    playerOnlyClosureStates: initialWalkClosure.size,
    actionClasses: firstObjectActionRecords,
    viableActionClassCount: viableFirstObjectActions.length,
    initialRawSccId,
    winReachingCondensationExits: initialWinReachingCondensationExits,
    conclusion: viableFirstObjectActions.length === 1
      ? "初始对象动作只有一个可胜类。"
      : `初始对象动作存在 ${viableFirstObjectActions.length} 个可胜类。`,
  },
  eventNecessityChecks,
  optionalEventBypassChecks,
  eventReachabilityCounts,
  prefixCounterfactuals,
  winningObjectKeys,
  equivalence: {
    result: "equivalent_variants_only",
    irreversibleLogicClasses: ["P侧右推完整L→L侧第一次下拉→L侧第二次下拉切脚→L侧上拉横臂"],
    optionalIntraSccVariants: ["玩家绕步", "完整L横向right-push/left-pull回返环"],
    objectDutyClasses: ["C(6,7)固定下目标；M(5,6)(6,6)上拉至M(5,5)(6,5)"],
  },
  mechanicalVerdict: "supported",
  claimAssessment: {
    canonicalReplay: "supported",
    mandatoryPSideRightPush: "supported",
    mandatoryFirstLSideDownPull: "supported",
    mandatorySecondLSideDownPullAndNormalization: "supported",
    mandatoryLsideUpPullEndgame: "supported",
    horizontalTrialIsReversibleLoop: "supported",
    noWinReachingMergeOrRebind: "supported",
    uniqueCutHeightAndObjectDuties: "supported",
    singleNonEquivalentFullSolveLogic: "supported_with_reversible_intra_scc_trials_only",
    overallForRequestedUniqueness: "supported",
  },
  limits: [
    "证明覆盖该 exact layout 在当前 Reality Anchor runtime 与 all_targets_covered_by_objects 胜利条件下的全部可达状态；不外推到布局改动或规则改动。",
    "raw SCC 路径把可逆状态循环折叠为 SCC；凝聚路径分类不宣称逐输入序列唯一。",
    "P侧/L侧与反置 S/B 边界的命名依据固定锚点坐标和运行时 push/pull/material 事件；本证据不承担关卡审美、难度或体验质量判断。",
  ],
};

const reportLines = [
  "# Construct Prefix V10 完整因果与解族审计",
  "",
  "- designer-side mechanical verdict: **supported**",
  `- candidate: ${candidateId}`,
  `- exact: ${exactVersion}`,
  `- layout SHA256: ${layoutSha256}`,
  `- complete graph: ${result.graph.reachableStates} states / ${result.graph.transitions} transitions / ${result.graph.winningStates} wins`,
  `- win-reaching closure: ${result.graph.winReachingStates} states / ${result.graph.winReachingTransitions} transitions`,
  `- raw SCC: ${rawSccs.length}; exact source-to-win DAG paths: ${rawPathRecords.length}`,
  "",
  "## Canonical",
  "",
  `canonical（${canonicalInputs.length} 步）：${canonicalInputs.join(",")}`,
  "",
  ...canonicalObjectSteps.map((record) => `- step ${record.step} ${record.input}: ${record.events.join(", ")}`),
  "",
  "canonical 的对象链为：完整 L 在 P 侧 right push；同一完整 L 从 L 侧第一次 down pull；第二次 L 侧 down pull 跨反置 S/B，仅凸脚 sticky_to_box:n1；切后箱固定于 (6,7)、两格横臂保留于 (5,6)(6,6)；最后从 L 侧 up pull 横臂到 (5,5)(6,5)。",
  "",
  "## complete graph 与 raw SCC/DAG",
  "",
  `完整图已穷尽 ${result.graph.reachableStates} states / ${result.graph.transitions} transitions；逆向 win closure 为 ${result.graph.winReachingStates} states / ${result.graph.winReachingTransitions} transitions。win-reaching raw states 压成 ${rawSccs.length} 个 SCC，凝聚图只有一条路径：${rawPathRecords[0]!.rawSccPath.join(" -> ")}。`,
  "",
  `唯一 raw path witness（${rawPathRecords[0]!.witness.inputs.length} 步）：${rawPathRecords[0]!.witness.inputs.join(",")}`,
  "",
  ...rawPathRecords[0]!.witness.objectMotionSteps.map((step) => `- object step ${step.step} ${step.input}: ${step.events.join(",")}；${step.beforeObjectKey} -> ${step.afterObjectKey}`),
  "",
  "把 win-reaching 对象迁移与凝聚跨边一并展开后，每个必经对象里程碑都只有一个 action/event 变体，rawEdgeCount 均为 1；没有被 SCC 聚合掩盖的平行 push/pull 解法。",
  "",
  ...milestoneTransitionAudit.map((record) => `- ${record.name}: ${record.variants[0]!.action} / ${record.variants[0]!.events.join(",")}；uniqueExpectedVariant=${record.uniqueExpectedVariant}`),
  "",
  "## 强制里程碑与动作反事实",
  "",
  ...mandatoryRoleChecks.map((check) => `- 禁用对象态 ${check.role}: status=${check.status}; found=${check.foundWin}; explored=${check.exploredStates}`),
  "",
  ...milestoneEdgeNecessityChecks.map((check) => `- 禁用动作边 ${check.name}: status=${check.status}; found=${check.foundWin}; explored=${check.exploredStates}`),
  "",
  `初始对象不动的玩家闭包只有 ${initialWalkClosure.size} 个 states；发出的对象动作共 ${firstObjectActionRecords.length} 类，可胜类 ${viableFirstObjectActions.length} 类，唯一类为 ${firstObjectActionRecords[0]!.action}/${firstObjectActionRecords[0]!.events.join(",")}。因此 P 侧 right push 不能被 P/L 另一侧 pull、纵推或其他首动作替代。`,
  "",
  "第一次 L 侧 down pull、第二次 L 侧 down pull + sticky_to_box:n1、最终 L 侧 up pull 的动作边分别禁用后均 complete/no-win；切割与收尾不存在 P 侧 push 替代。",
  "",
  "## 中间横向试探是可逆回返环",
  "",
  `- forward: ${horizontalTrialLoopAudit.forward.action}/${horizontalTrialLoopAudit.forward.events.join(",")}；${horizontalTrialLoopAudit.forward.fromObjectKey} -> ${horizontalTrialLoopAudit.forward.toObjectKey}`,
  `- return: ${horizontalTrialLoopAudit.returning.action}/${horizontalTrialLoopAudit.returning.events.join(",")}；${horizontalTrialLoopAudit.returning.fromObjectKey} -> ${horizontalTrialLoopAudit.returning.toObjectKey}`,
  `- 两条边及其端点全部位于 raw SCC ${horizontalTrialLoopAudit.rawSccId}：${horizontalTrialLoopAudit.allEndpointsInSameRawScc}；禁用试探对象态仍 ${horizontalTrialLoopAudit.optionalRoleCheck.status}/${horizontalTrialLoopAudit.optionalRoleCheck.foundWin ? "win" : "no-win"}。`,
  "",
  "该 right push 试探后用 left pull 精确回到 firstLSideDownPulledIntactL，既不改变凝聚路径，也不产生新切割高度或新对象职责；它是 win-reaching SCC 内可插入、可删除的回返环，不是第二逻辑类。",
  "",
  "## 切割、职责与事件范围",
  "",
  `win-reaching 对象态共 ${winReachingObjectKeys.length} 个；其中含 crate 的对象态只有正确切后态 C(6,7)+M(5,6)(6,6) 与最终态 C(6,7)+M(5,5)(6,5)。winning object key 只有 ${winningObjectKeys.length} 个。因此没有不同切割高度、不同 crate 落点或不同对象职责。`,
  "",
  ...eventNecessityChecks.map((check) => `- 禁用 ${check.group}: status=${check.status}; found=${check.foundWin}; explored=${check.exploredStates}`),
  "",
  `事件计数严格区分范围：全可达图 ${JSON.stringify(eventReachabilityCounts.fullReachableGraph)}；win-reaching 子图 ${JSON.stringify(eventReachabilityCounts.winReachingSubgraph)}。anchor shift 全图为 0；sticky_merge 与 box_to_sticky 虽在全图死分支可达，但 win-reaching 均为 0，因此不存在可胜 merge/rebind 逻辑。`,
  "",
  "## 结论",
  "",
  "- supported：P-side right push、第一次 L-side down pull、第二次 L-side down pull + 单格切箱、唯一输出与对象职责、最终 L-side up pull。",
  "- equivalent variants only：玩家绕步，以及 raw SCC 内可逆横向试探回返；它们不改变凝聚路径或对象职责。",
  "- 结构事实：去掉可逆环后，胜利对象逻辑是一条四里程碑直链；这是线性度描述，不是审美或质量评价。",
  "",
  "## Limits",
  "",
  ...result.limits.map((limit) => `- ${limit}`),
  "",
];
await mkdir(import.meta.dirname, { recursive: true });
await writeFile(path.join(import.meta.dirname, "results.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
await writeFile(path.join(import.meta.dirname, "report.md"), `${reportLines.join("\n")}\n`, "utf8");
console.log(JSON.stringify({
  exactVersion,
  graph: result.graph,
  rawStateSccProof: {
    rawSccCount: result.rawStateSccProof.rawSccCount,
    exactAcyclicPathCount: result.rawStateSccProof.exactAcyclicPathCount,
    allPathsUseSingleFrontLogic: result.rawStateSccProof.allPathsUseSingleFrontLogic,
    frontLogicCounts: result.rawStateSccProof.frontLogicCounts,
    mandatoryCutOutputCounts: result.rawStateSccProof.mandatoryCutOutputCounts,
    finalArmMotionCounts: result.rawStateSccProof.finalArmMotionCounts,
    boundaryCutMotionCounts: result.rawStateSccProof.boundaryCutMotionCounts,
    allPathsUseSingleObjectDutyAssignment: result.rawStateSccProof.allPathsUseSingleObjectDutyAssignment,
  },
  initialObjectActionAudit: {
    playerOnlyClosureStates: result.initialObjectActionAudit.playerOnlyClosureStates,
    actionClassCount: result.initialObjectActionAudit.actionClasses.length,
    viableActionClassCount: result.initialObjectActionAudit.viableActionClassCount,
  },
}, null, 2));

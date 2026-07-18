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
const candidateId = "RA_STICKY_IRREGULAR_BOUNDARY_PL_BS_TURN_V9";
const layoutSha256Expected = "80eef50e37f6d4cd1cc6be36a0b3352b3289290aae65b6ee588be9fef8a53f28";
const exactVersion = `v9_sha256_${layoutSha256Expected}`;
const layoutPath = path.join(taskRoot, "scratch", "pl_bs_family", "v4.txt");
const canonicalInputs = [
  "down", "right", "down", "down", "right", "right", "down", "down",
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

const anchorSuffix = "|PL:P:5,1;L:6,1|BS:B:1,8;S:1,7";
const roleKeys = {
  initialIntactL: `C:|M:4,5;5,5;5,6${anchorSuffix}`,
  initialDownShiftedIntactL: `C:|M:4,6;5,6;5,7${anchorSuffix}`,
  rightShiftedIntactL: `C:|M:5,5;6,5;6,6${anchorSuffix}`,
  boundaryReadyIntactL: `C:|M:5,6;6,6;6,7${anchorSuffix}`,
  postBoundaryCut: `C:6,8|M:5,7;6,7${anchorSuffix}`,
  finalUpPulledArm: `C:6,8|M:5,6;6,6${anchorSuffix}`,
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
  const usesPersistentIntactCanonicalFront = provenMandatoryRoles.includes("rightShiftedIntactL")
    && provenMandatoryRoles.includes("boundaryReadyIntactL")
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
    if (variant.fromObjectKey === roleKeys.initialIntactL && variant.events.some((event) => event.startsWith("push_object:sticky#1"))) {
      return "direct_P_side_right_push";
    }
    if (variant.fromObjectKey === roleKeys.initialIntactL && variant.events.some((event) => event.startsWith("pull_object:sticky#1"))) {
      return "direct_L_side_right_pull";
    }
    if (variant.fromObjectKey === roleKeys.initialDownShiftedIntactL && variant.events.some((event) => event.startsWith("pull_object:sticky#1"))) {
      return "initial_down_push_then_L_side_right_pull";
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
    optionalReversibleRolesInsideSccs: roles.filter((role) => role === "initialDownShiftedIntactL"),
    mandatoryCutOutput: provenMandatoryRoles.includes("postBoundaryCut") ? "arm_y7_plus_crate_6_8" : "not_proven",
    boundaryCutMotion,
    finalArmMotion,
    commitmentTransitions,
    witness,
    objectDuties: "凸脚箱固定(6,8)，横臂黏块整体上拉到(5,6)(6,6)",
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
  wrongVerticalPush: runPrefix(["right", "down"]),
  wrongVerticalBoundaryCommit: runPrefix(["right", "down", "down"]),
  blockedSecondRightPush: runPrefix(["down", "right", "right"]),
  afterFirstDownPull: runPrefix(["down", "right", "down", "down", "right", "right", "down"]),
  afterBoundaryCut: runPrefix(["down", "right", "down", "down", "right", "right", "down", "down"]),
};
if (!prefixCounterfactuals.canonicalFirstObjectAction.legal || !prefixCounterfactuals.canonicalFirstObjectAction.suffix?.found) {
  throw new Error("canonical first object action failed");
}
if (prefixCounterfactuals.blockedSecondRightPush.legal) throw new Error("second right push should be blocked by wall mouth");
if (
  !prefixCounterfactuals.wrongVerticalBoundaryCommit.legal
  || prefixCounterfactuals.wrongVerticalBoundaryCommit.suffix?.found
  || prefixCounterfactuals.wrongVerticalBoundaryCommit.suffix?.status !== "complete"
) throw new Error("wrong vertical boundary commitment is not a complete dead branch");
if (prefixCounterfactuals.afterFirstDownPull.objectKey !== roleKeys.boundaryReadyIntactL) throw new Error("first down pull role mismatch");
if (prefixCounterfactuals.afterBoundaryCut.objectKey !== roleKeys.postBoundaryCut) throw new Error("boundary cut role mismatch");
const wrongVerticalStateIndex = graph.keys.indexOf(prefixCounterfactuals.wrongVerticalPush.stateKey);
if (wrongVerticalStateIndex < 0) throw new Error("wrong vertical trial state absent from complete graph");
const wrongVerticalMustReturnInitialObject = searchGraph({
  startStateIndexes: [wrongVerticalStateIndex],
  forbiddenStateIndexes: new Set(roleStates.initialIntactL),
});

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
    mandatoryRoleChecks,
    provenMandatoryRoles,
    materialDeltaAtBoundary: {
      before: { sticky: [[5, 6], [6, 6], [6, 7]], crates: [] },
      after: { sticky: [[5, 7], [6, 7]], crates: [[6, 8]] },
      interpretation: "第二次 down pull 把完整 L 下移一格；只有从 S 行 y=7 跨入 B 行 y=8 的凸脚 (6,8) 触发 sticky_to_box:n1，横臂仍为 sticky。",
    },
    finalObjectDuties: {
      crate: { position: [6, 8], target: true, movesAfterCut: 0 },
      stickyArm: { postCut: [[5, 7], [6, 7]], final: [[5, 6], [6, 6]], motion: "up", bothTargets: true },
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
    allPathsUseSingleObjectDutyAssignment: rawPathRecords.every((record) => record.objectDuties === "凸脚箱固定(6,8)，横臂黏块整体上拉到(5,6)(6,6)"),
    condensationTransitionSignatures: [...rawSccTransitionRecords.values()],
  },
  initialObjectActionAudit: {
    playerOnlyClosureStates: initialWalkClosure.size,
    actionClasses: firstObjectActionRecords,
    viableActionClassCount: viableFirstObjectActions.length,
    initialRawSccId,
    winReachingCondensationExits: initialWinReachingCondensationExits,
    wrongVerticalMustReturnInitialObject,
    conclusion: "首个对象动作共有三个可胜动作类：right push、down push、right pull。down push 后无需回到 initialIntactL 也可胜；right pull 也可直接进入替代前段。第三次 down 的错误材质提交才是 complete dead。",
  },
  eventNecessityChecks,
  optionalEventBypassChecks,
  eventReachabilityCounts,
  prefixCounterfactuals,
  relatedCounterfactualEvidence: {
    wrongCommitLayoutRef: "prototypes/reality_anchor/reports/design_tree_sticky_irregular_boundary_20260718/evidence/construct_prefix_v9/wrong_commit_state_layout.txt",
    wrongCommitAnalysisRef: "prototypes/reality_anchor/reports/design_tree_sticky_irregular_boundary_20260718/evidence/construct_prefix_v9/wrong_commit_state_analysis.json",
    wrongCommitCompleteGraph: { reachableStates: 246, transitions: 629, winningStates: 0 },
  },
  winningObjectKeys,
  mechanicalVerdict: "contradicted",
  claimAssessment: {
    canonicalReplay: "supported",
    mandatoryPSideRightPush: "contradicted_by_direct_right_pull_and_R2_vertical_front",
    mandatoryLSideDownPull: "contradicted_by_R2_horizontal_pull_front",
    mandatorySingleCellBoundaryNormalization: "supported",
    mandatorySecondDownPullForBoundaryNormalization: "contradicted_by_P_side_down_push_variant",
    mandatoryLsideUpPullEndgame: "supported",
    initialWrongVerticalTrialIsDead: "contradicted_it_is_an_alternative_front_but_third_down_commit_is_dead",
    singleNonEquivalentFullSolveLogic: "contradicted_by_three_front_classes_and_two_cut_modes",
    overallForRequestedUniqueness: "contradicted",
  },
  limits: [
    "证明覆盖该 exact layout 在当前 Reality Anchor runtime 与 all_targets_covered_by_objects 胜利条件下的全部可达状态；不外推到布局改动或规则改动。",
    "raw SCC 路径把可逆状态循环折叠为 SCC；R1/R2 是不可逆凝聚路径分类，不宣称逐输入序列唯一。",
    "P侧/L侧与反置 S/B 边界的命名依据固定锚点坐标和运行时 push/pull/material 事件；本证据不承担关卡审美、难度或体验质量判断。",
  ],
};

const wrongVertical = prefixCounterfactuals.wrongVerticalPush;
const wrongVerticalCommit = prefixCounterfactuals.wrongVerticalBoundaryCommit;
const reportLines = [
  "# Construct Prefix V9 完整因果与解族审计",
  "",
  "- overall for requested uniqueness: **contradicted**",
  `- candidate: ${candidateId}`,
  `- exact: ${exactVersion}`,
  `- layout SHA256: ${layoutSha256}`,
  `- complete graph: ${result.graph.reachableStates} states / ${result.graph.transitions} transitions / ${result.graph.winningStates} wins`,
  `- win-reaching closure: ${result.graph.winReachingStates} states / ${result.graph.winReachingTransitions} transitions`,
  `- raw SCC: ${rawSccs.length}; exact acyclic source-to-win paths: ${rawPathRecords.length}; front logic classes: ${result.rawStateSccProof.frontLogicClassCount}`,
  "",
  "## Canonical 与关键对象动作",
  "",
  `canonical（${canonicalInputs.length} 步）：${canonicalInputs.join(",")}`,
  "",
  ...canonicalObjectSteps.map((record) => `- step ${record.step} ${record.input}: ${record.events.join(", ")}`),
  "",
  "canonical 本身成立：同一 sticky#1 完整三格 L 在 step 2 由 P 侧 right push；墙口阻断继续横推；step 7/8 从另一侧连续 down pull，第二次跨反置 S/B 时仅凸脚变箱，得到 C(6,8)+M(5,7)(6,7)；step 16 从 L 侧 up pull 横臂到 M(5,6)(6,6)。",
  "",
  "## 全胜路强制项与非强制项",
  "",
  `win-reaching 对象态共 ${winReachingObjectKeys.length} 个。mandatory role 反事实结果：${mandatoryRoleChecks.map((check) => `${check.role}=${check.status}/${check.foundWin ? "bypass" : "mandatory"}`).join("；")}。`,
  "",
  "`rightShiftedIntactL`（canonical 的 P 侧右推后对象态）可被完整绕过；`boundaryReadyIntactL`、正确切后态 C(6,8)+M(5,7)(6,7) 与最终态 C(6,8)+M(5,6)(6,6) 才是强制对象态。对象态强制不代表抵达它的动作侧或方向唯一。",
  "",
  "## raw SCC/DAG 与具体逻辑类",
  "",
  ...rawPathRecords.flatMap((record) => [
    `- ${record.rawPathId}: SCC ${record.rawSccPath.join(" -> ")}；front classes=${record.frontLogicClasses.join(",")}；witness cut=${record.boundaryCutMotion}；end=${record.finalArmMotion}`,
    `  - witness (${record.witness.inputs.length}): ${record.witness.inputs.join(",")}`,
    ...record.witness.objectMotionSteps.map((step) => `  - object step ${step.step} ${step.input}: ${step.events.join(",")}；${step.beforeObjectKey} -> ${step.afterObjectKey}`),
  ]),
  "",
  `凝聚图只有 ${rawPathRecords.length} 条 raw DAG 路径，但平行凝聚边仍包含不同动作逻辑；完整分类得到 ${result.rawStateSccProof.frontLogicClassCount} 类前段：${result.rawStateSccProof.frontLogicClasses.join("；")}。R1 的首个提交到同一对象态既可 right push，也可绕至另一侧 right pull；R2 则先 down push，再以水平 right pull 搬运完整 L。`,
  "",
  "三类首对象动作的具体胜局：",
  "",
  ...firstObjectActionRecords.map((record, index) => `- A${index + 1}: ${record.action} / ${record.events.join(",")}；cost=${record.concreteWinningWitness.inputs.length}；${record.concreteWinningWitness.inputs.join(",")}`),
  "",
  `禁用全部 push_object:sticky#1 后仍 found win（搜索至 ${eventNecessityChecks.find((check) => check.group === "sticky_push")?.exploredStates} states 找到胜局），因此 P-side right push 并非胜利必要事件，而不只是对象态层面的命名差异。`,
  "",
  "## 切割与收尾",
  "",
  `切割输出与对象职责唯一：所有胜路最终都使用凸脚箱 C(6,8) 固定覆盖下目标，横臂覆盖 M(5,6)(6,6)；winning object key 只有 ${winningObjectKeys.length} 个。win-reaching 中也没有其他 crate 坐标或切割高度。`,
  "",
  `但进入正确切后态有两种动作：${boundaryCutTransitionVariants.map((variant) => `${variant.action}/${variant.events.join(",")}`).join("；")}。也就是第二次 down 可由 L 侧 pull，也可由 P 侧 push；“第二次 down 必须 pull”不成立。`,
  "",
  `最终 transition 只有 ${finalTransitionVariants.length} 类：${finalTransitionVariants.map((variant) => `${variant.action}/${variant.events.join(",")}`).join("；")}。所以修订目标确实消除了 V8 的 P 侧 push 收尾：所有胜路最终只能从 L 侧 up pull 横臂到 (5,6)(6,6)。`,
  "",
  "## 初始错误对象动作完整审计",
  "",
  `对象不动的初始玩家走位闭包为 ${initialWalkClosure.size} 个 raw states；从该闭包发出的首个对象动作合并为 ${firstObjectActionRecords.length} 类，三类全部可胜。`,
  "",
  ...firstObjectActionRecords.map((record, index) => `- A${index + 1}: action=${record.action}; events=${record.events.join(",")}; rawEdges=${record.rawEdgeCount}; suffix=${record.completeSuffixUnion.status}/${record.completeSuffixUnion.foundWin ? "win" : "no-win"}`),
  "",
  `right,down 不是必须回退的 excursion：suffix found=${wrongVertical.suffix?.found}; cost=${wrongVertical.suffix?.cost}；即使禁入 initialIntactL 仍 ${wrongVerticalMustReturnInitialObject.status}/${wrongVerticalMustReturnInitialObject.foundWin ? "win" : "no-win"}。它已经形成 R2 的替代前段。`,
  `right,down,down 才是错误切割提交：events(step3)=${wrongVerticalCommit.events[2]?.join(",")}; suffix=${wrongVerticalCommit.suffix?.status}/${wrongVerticalCommit.suffix?.found ? "win" : "no-win"}; explored=${wrongVerticalCommit.suffix?.exploredStates}。独立 exact-state 图为 246 states / 629 transitions / 0 wins。`,
  `继续横推反事实 down,right,right：第三步 legal=${prefixCounterfactuals.blockedSecondRightPush.legal}，墙口直接删除该操作位。`,
  "",
  "## 事件与里程碑反事实",
  "",
  ...eventNecessityChecks.map((check) => `- 禁用 ${check.group}: status=${check.status}; found=${check.foundWin}; explored=${check.exploredStates}`),
  "",
  ...optionalEventBypassChecks.map((check) => `- 禁用可选 ${check.group}: status=${check.status}; found=${check.foundWin}; explored=${check.exploredStates}`),
  "",
  `事件范围：全可达图 ${JSON.stringify(eventReachabilityCounts.fullReachableGraph)}；win-reaching 子图 ${JSON.stringify(eventReachabilityCounts.winReachingSubgraph)}。anchor shift 全图为 0；merge 与 box_to_sticky 虽在全图可达，但 win-reaching 均为 0，故不存在可胜 merge/rebind 旁路。`,
  "",
  "## 判定",
  "",
  "- supported：canonical；正确切割输出、唯一对象职责、最终 L 侧 up pull；无 win-reaching merge/rebind。",
  "- contradicted：P 侧 right push 非必要，L 侧 down pull 非必要，第二次 down 的 pull 模式也非必要；存在 direct right pull 与 initial down push→horizontal pull 两类替代前段。",
  "- mechanical verdict：V9 虽修掉 V8 的 push 收尾，却引入/保留了更强的前段旁路，不能支持目标唯一性，应拒绝并继续修图。",
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
  wrongVerticalPush: wrongVertical.suffix,
}, null, 2));

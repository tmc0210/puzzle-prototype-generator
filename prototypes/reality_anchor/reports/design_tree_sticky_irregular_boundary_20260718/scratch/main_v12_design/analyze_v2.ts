import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const here = import.meta.dirname;
const prototypeRoot = path.resolve(here, "../../../..");
const maxStates = 500_000;

const variant = process.argv[2] ?? "v2";
const configs = {
  v2: {
    layoutFile: "v2_s_order_upper_start.txt",
    candidateId: "RA_TREE_MAIN_V12_S_ORDER_UPPER_START",
    canonicalInputs: [
      "down",
      "left", "left", "left", "left",
      "right", "right", "right", "right",
      "up",
      "left", "left", "left",
      "down", "left", "left", "down",
    ],
    constructedStep: 13,
    beforeFinalPullStep: 16,
    wrongSquarePrefix: [
      "left", "left", "left", "left",
      "right", "right", "right", "right",
      "down",
      "left", "left", "left", "left",
    ],
    upperPartialThenLowerPrefix: [
      "left", "left", "left",
      "right", "right", "right", "down",
      "left", "left", "left",
    ],
  },
  v3: {
    layoutFile: "v3_s_order_compact.txt",
    candidateId: "RA_TREE_MAIN_V12_S_ORDER_COMPACT",
    canonicalInputs: [
      "down",
      "left", "left", "left",
      "right", "right", "right",
      "up",
      "left", "left",
      "down", "left", "left", "down",
    ],
    constructedStep: 10,
    beforeFinalPullStep: 13,
    wrongSquarePrefix: [
      "left", "left", "left",
      "right", "right", "right",
      "down",
      "left", "left", "left",
    ],
    upperPartialThenLowerPrefix: [
      "left", "left",
      "right", "right", "down",
      "left", "left",
    ],
  },
  v4: {
    layoutFile: "v4_s_order_bottom_goals.txt",
    candidateId: "RA_TREE_MAIN_V12_S_ORDER_BOTTOM_GOALS",
    canonicalInputs: [
      "down",
      "left", "left", "left",
      "right", "right", "right",
      "up",
      "left", "left",
      "down", "left", "left", "down",
    ],
    constructedStep: 10,
    beforeFinalPullStep: 13,
    wrongSquarePrefix: [
      "left", "left", "left",
      "right", "right", "right",
      "down",
      "left", "left", "left",
    ],
    upperPartialThenLowerPrefix: [
      "left", "left",
      "right", "right", "down",
      "left", "left",
    ],
  },
  v5: {
    layoutFile: "v5_s_order_single_goal.txt",
    candidateId: "RA_TREE_MAIN_V12_S_ORDER_SINGLE_GOAL",
    canonicalInputs: [
      "down",
      "left", "left", "left",
      "right", "right", "right",
      "up",
      "left", "left",
      "down", "left", "left", "down",
    ],
    constructedStep: 10,
    beforeFinalPullStep: 13,
    wrongSquarePrefix: [
      "left", "left", "left",
      "right", "right", "right",
      "down",
      "left", "left", "left",
    ],
    upperPartialThenLowerPrefix: [
      "left", "left",
      "right", "right", "down",
      "left", "left",
    ],
  },
  v6: {
    layoutFile: "v6_s_order_pruned.txt",
    candidateId: "RA_TREE_MAIN_V12_S_ORDER_PRUNED",
    canonicalInputs: [
      "down",
      "left", "left", "left",
      "right", "right", "right",
      "up",
      "left", "left",
      "down", "left", "left", "down",
    ],
    constructedStep: 10,
    beforeFinalPullStep: 13,
    wrongSquarePrefix: [
      "left", "left", "left",
      "right", "right", "right",
      "down",
      "left", "left", "left",
    ],
    upperPartialThenLowerPrefix: [
      "left", "left",
      "right", "right", "down",
      "left", "left",
    ],
  },
} as const;
const config = configs[variant as keyof typeof configs];
if (!config) throw new Error(`unknown variant: ${variant}`);
const layoutPath = path.resolve(here, config.layoutFile);
const canonicalInputs = [...config.canonicalInputs];
const constructedSPrefix = canonicalInputs.slice(0, config.constructedStep);
const beforeFinalPullPrefix = canonicalInputs.slice(0, config.beforeFinalPullStep);
const wrongSquarePrefix = [...config.wrongSquarePrefix];
const upperPartialThenLowerPrefix = [...config.upperPartialThenLowerPrefix];

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const runtimeOptions = { winCondition: pkg.mechanic.win, maxStates };
const layout = await readFile(layoutPath, "utf8");
const level: LevelDoc = {
  id: config.candidateId,
  title: config.candidateId,
  layout,
  win: pkg.mechanic.win,
};
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  pkg.mechanic.win,
  runtimeOptions,
  { maxStates, terminalizeWins: true },
);
if (graph.status !== "complete") throw new Error(`graph incomplete: ${graph.status}`);

type Edge = (typeof graph.edges)[number];
const outgoing = new Map<number, Edge[]>();
const incoming = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  const out = outgoing.get(edge.from) ?? [];
  out.push(edge);
  outgoing.set(edge.from, out);
  const inc = incoming.get(edge.to) ?? [];
  inc.push(edge);
  incoming.set(edge.to, inc);
}
const objectKeyAt = (index: number) => graph.keys[index]!.replace(/^Ply:[^|]+\|/, "");

function runPrefix(inputs: string[]) {
  let state = initial;
  const steps: Array<{ input: string; legal: boolean; events: string[]; stateKey: string }> = [];
  for (const input of inputs) {
    const transition = runtime.step(state, input, runtimeOptions);
    if (transition.legal) state = transition.state;
    steps.push({
      input,
      legal: transition.legal,
      events: transition.events ?? [],
      stateKey: runtime.key(state),
    });
    if (!transition.legal) break;
  }
  const legal = steps.length === inputs.length && steps.every((step) => step.legal);
  const suffix = legal ? solveWithRuntime(runtime, state, runtimeOptions) : null;
  const stateKey = runtime.key(state);
  return {
    inputs,
    legal,
    stateKey,
    objectKey: stateKey.replace(/^Ply:[^|]+\|/, ""),
    lastEvents: steps.at(-1)?.events ?? [],
    suffix: suffix ? {
      found: suffix.found,
      searchStatus: suffix.searchStatus,
      exploredStates: suffix.exploredStates,
      cost: suffix.found ? suffix.cost : null,
      inputs: suffix.found ? suffix.inputs : [],
    } : null,
  };
}

const canonical = runPrefix(canonicalInputs);
const constructedS = runPrefix(constructedSPrefix);
const beforeFinalPull = runPrefix(beforeFinalPullPrefix);
const wrongSquare = runPrefix(wrongSquarePrefix);
const upperPartialThenLower = runPrefix(upperPartialThenLowerPrefix);
for (const [name, replay] of Object.entries({ canonical, constructedS, beforeFinalPull, wrongSquare, upperPartialThenLower })) {
  if (!replay.legal) throw new Error(`${name} replay is illegal`);
}
if (!canonical.suffix?.found || canonical.suffix.cost !== 0) throw new Error("canonical does not win");
if (!constructedS.lastEvents.some((event) => event.startsWith("sticky_merge"))) throw new Error("S prefix does not merge");
if (wrongSquare.suffix?.found || wrongSquare.suffix?.searchStatus !== "complete") throw new Error("wrong square can still win or suffix is incomplete");
if (upperPartialThenLower.suffix?.found || upperPartialThenLower.suffix?.searchStatus !== "complete") {
  throw new Error("upper-first partial construction can still win or suffix is incomplete");
}
if (!beforeFinalPull.suffix?.found || beforeFinalPull.suffix.cost !== 1) throw new Error("final pull is not a one-step suffix");

const wins = new Set(graph.winStateIndexes);
const winReaching = new Set<number>(wins);
const reverseQueue = [...wins];
for (let cursor = 0; cursor < reverseQueue.length; cursor += 1) {
  for (const edge of incoming.get(reverseQueue[cursor]!) ?? []) {
    if (winReaching.has(edge.from)) continue;
    winReaching.add(edge.from);
    reverseQueue.push(edge.from);
  }
}
const winEdges = graph.edges.filter((edge) => winReaching.has(edge.from) && winReaching.has(edge.to));

function stickyCellCount(objectKey: string) {
  let count = 0;
  for (const match of objectKey.matchAll(/(?:^|\|)M:([^|]+)/g)) {
    count += match[1]!.split(";").filter(Boolean).length;
  }
  return count;
}

const mergeEdgesOnWinClosure = winEdges.filter((edge) => edge.events.some((event) => event.startsWith("sticky_merge")));
const objectTransitionGroups = new Map<string, {
  fromObject: string;
  toObject: string;
  action: string;
  events: string[];
  rawEdgeCount: number;
}>();
for (const edge of winEdges) {
  const fromObject = objectKeyAt(edge.from);
  const toObject = objectKeyAt(edge.to);
  if (fromObject === toObject) continue;
  const events = [...edge.events].sort();
  const key = JSON.stringify([fromObject, toObject, edge.action, events]);
  const group = objectTransitionGroups.get(key) ?? {
    fromObject,
    toObject,
    action: edge.action,
    events,
    rawEdgeCount: 0,
  };
  group.rawEdgeCount += 1;
  objectTransitionGroups.set(key, group);
}
const fourCellMergeGroups = new Map<string, { count: number; fromObjects: Set<string>; actions: Set<string> }>();
for (const edge of mergeEdgesOnWinClosure) {
  const toObject = objectKeyAt(edge.to);
  if (stickyCellCount(toObject) !== 4) continue;
  const group = fourCellMergeGroups.get(toObject) ?? { count: 0, fromObjects: new Set<string>(), actions: new Set<string>() };
  group.count += 1;
  group.fromObjects.add(objectKeyAt(edge.from));
  group.actions.add(edge.action);
  fourCellMergeGroups.set(toObject, group);
}

function forbiddenObjectState(objectKey: string) {
  const seen = new Set<number>([0]);
  const queue = [0];
  let foundWin = wins.has(0);
  for (let cursor = 0; cursor < queue.length && !foundWin; cursor += 1) {
    for (const edge of outgoing.get(queue[cursor]!) ?? []) {
      if (objectKeyAt(edge.to) === objectKey) continue;
      if (seen.has(edge.to)) continue;
      seen.add(edge.to);
      if (wins.has(edge.to)) {
        foundWin = true;
        break;
      }
      queue.push(edge.to);
    }
  }
  return { status: "complete", exploredStates: seen.size, foundWin };
}

function forbiddenExactEdge(fromObject: string, toObject: string, action: string, requiredEventPrefix: string) {
  const seen = new Set<number>([0]);
  const queue = [0];
  let foundWin = wins.has(0);
  let forbiddenCount = 0;
  for (let cursor = 0; cursor < queue.length && !foundWin; cursor += 1) {
    for (const edge of outgoing.get(queue[cursor]!) ?? []) {
      const forbidden = objectKeyAt(edge.from) === fromObject
        && objectKeyAt(edge.to) === toObject
        && edge.action === action
        && edge.events.some((event) => event.startsWith(requiredEventPrefix));
      if (forbidden) {
        forbiddenCount += 1;
        continue;
      }
      if (seen.has(edge.to)) continue;
      seen.add(edge.to);
      if (wins.has(edge.to)) {
        foundWin = true;
        break;
      }
      queue.push(edge.to);
    }
  }
  return { status: "complete", exploredStates: seen.size, foundWin, forbiddenCount };
}

const finalPullToObject = canonical.objectKey;
const constructedSNecessity = forbiddenObjectState(constructedS.objectKey);
const finalPullNecessity = forbiddenExactEdge(
  beforeFinalPull.objectKey,
  finalPullToObject,
  "down",
  "pull_object",
);

// Raw SCC proof over the complete win-reaching closure.
const adjacency = new Map<number, number[]>();
const reverseAdjacency = new Map<number, number[]>();
for (const edge of winEdges) {
  const out = adjacency.get(edge.from) ?? [];
  out.push(edge.to);
  adjacency.set(edge.from, out);
  const inc = reverseAdjacency.get(edge.to) ?? [];
  inc.push(edge.from);
  reverseAdjacency.set(edge.to, inc);
}
const visited = new Set<number>();
const finishOrder: number[] = [];
for (const root of [...winReaching].sort((a, b) => a - b)) {
  if (visited.has(root)) continue;
  visited.add(root);
  const stack: Array<{ state: number; cursor: number }> = [{ state: root, cursor: 0 }];
  while (stack.length > 0) {
    const frame = stack.at(-1)!;
    const targets = adjacency.get(frame.state) ?? [];
    if (frame.cursor < targets.length) {
      const target = targets[frame.cursor++]!;
      if (!visited.has(target)) {
        visited.add(target);
        stack.push({ state: target, cursor: 0 });
      }
    } else {
      finishOrder.push(frame.state);
      stack.pop();
    }
  }
}
const assigned = new Set<number>();
const sccs: number[][] = [];
for (let index = finishOrder.length - 1; index >= 0; index -= 1) {
  const root = finishOrder[index]!;
  if (assigned.has(root)) continue;
  assigned.add(root);
  const component: number[] = [];
  const stack = [root];
  while (stack.length > 0) {
    const state = stack.pop()!;
    component.push(state);
    for (const target of reverseAdjacency.get(state) ?? []) {
      if (assigned.has(target)) continue;
      assigned.add(target);
      stack.push(target);
    }
  }
  sccs.push(component);
}
const sccByState = new Map<number, number>();
for (const [id, states] of sccs.entries()) for (const state of states) sccByState.set(state, id);
const condensation = new Map<number, Set<number>>();
for (const edge of winEdges) {
  const from = sccByState.get(edge.from)!;
  const to = sccByState.get(edge.to)!;
  if (from === to) continue;
  const targets = condensation.get(from) ?? new Set<number>();
  targets.add(to);
  condensation.set(from, targets);
}
const winSccs = new Set([...wins].map((state) => sccByState.get(state)!));
const pathMemo = new Map<number, bigint>();
function countPaths(scc: number): bigint {
  if (winSccs.has(scc)) return 1n;
  const memo = pathMemo.get(scc);
  if (memo !== undefined) return memo;
  let count = 0n;
  for (const next of condensation.get(scc) ?? []) count += countPaths(next);
  pathMemo.set(scc, count);
  return count;
}
const sourceScc = sccByState.get(0)!;

const results = {
  candidateId: config.candidateId,
  layoutSha256: createHash("sha256").update(layout).digest("hex"),
  search: {
    status: graph.status,
    states: graph.states.length,
    transitions: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    terminalizeWins: true,
  },
  canonical,
  constructedS,
  wrongSquare,
  upperPartialThenLower,
  winClosure: {
    states: winReaching.size,
    transitions: winEdges.length,
    rawSccCount: sccs.length,
    sourceToWinRawSccPathCount: countPaths(sourceScc).toString(),
    objectTransitionGroups: [...objectTransitionGroups.values()].sort((a, b) =>
      a.fromObject.localeCompare(b.fromObject)
        || a.toObject.localeCompare(b.toObject)
        || a.action.localeCompare(b.action)),
    fourCellMergeGroups: [...fourCellMergeGroups.entries()].map(([objectKey, group]) => ({
      objectKey,
      edgeCount: group.count,
      fromObjects: [...group.fromObjects].sort(),
      actions: [...group.actions].sort(),
    })),
  },
  counterfactuals: {
    constructedSNecessity,
    finalPullNecessity,
  },
};

if (fourCellMergeGroups.size !== 1) throw new Error(`expected one four-cell merge outcome, got ${fourCellMergeGroups.size}`);
if ([...fourCellMergeGroups.keys()][0] !== constructedS.objectKey) throw new Error("winning four-cell merge is not the canonical S");
if (constructedSNecessity.foundWin) throw new Error("constructed S is bypassable");
if (finalPullNecessity.foundWin || finalPullNecessity.forbiddenCount === 0) throw new Error("final pull is bypassable or not matched");

await writeFile(path.resolve(here, `${variant}_analysis.json`), `${JSON.stringify(results, null, 2)}\n`, "utf8");
console.log(JSON.stringify(results, null, 2));

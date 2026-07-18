import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const here = import.meta.dirname;
const prototypeRoot = path.resolve(here, "../../../..");
const layoutPath = path.resolve(here, "../../nodes/apply_suffix_v14/layout.txt");
const layout = await readFile(layoutPath, "utf8");
const expectedLayoutSha256 = "7a6a3612ac653b6058d665d09bc6c96d44adcffd50fb8525dd08ad1715191139";
const layoutSha256 = createHash("sha256").update(layout).digest("hex");
if (layoutSha256 !== expectedLayoutSha256) throw new Error(`layout hash mismatch ${layoutSha256}`);
const exactVersion = `v14_sha256_${layoutSha256}`;

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win, maxStates: 500_000 };
const level: LevelDoc = {
  id: "RA_STICKY_IRREGULAR_BOUNDARY_S_REBIND_MOUTH_V14",
  title: "V14",
  layout,
  win: pkg.mechanic.win,
};
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, {
  maxStates: 500_000,
  terminalizeWins: true,
});
if (graph.status !== "complete") throw new Error(`incomplete graph ${graph.status}`);

type Edge = (typeof graph.edges)[number];
const outgoing = new Map<number, Edge[]>();
const incoming = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  (outgoing.get(edge.from) ?? (outgoing.set(edge.from, []), outgoing.get(edge.from)!)).push(edge);
  (incoming.get(edge.to) ?? (incoming.set(edge.to, []), incoming.get(edge.to)!)).push(edge);
}
const wins = graph.winStateIndexes;
const objectKey = (state: number) => graph.keys[state]!.replace(/^Ply:[^|]+\|/, "");
const player = (state: number) => graph.keys[state]!.match(/^Ply:(\d+),(\d+)/)!.slice(1).map(Number) as [number, number];
const stickyComponents = (state: number) => {
  const field = objectKey(state).match(/\|M:(.*?)\|PL:/)?.[1] ?? "";
  return field ? field.split("|").map((part) => part.split(";").filter(Boolean)) : [];
};
const normalizedShape = (state: number) => {
  const components = stickyComponents(state);
  if (!objectKey(state).startsWith("C:|") || components.length !== 1) return null;
  const pts = components[0]!.map((cell) => cell.split(",").map(Number) as [number, number]);
  const minX = Math.min(...pts.map(([x]) => x));
  const minY = Math.min(...pts.map(([, y]) => y));
  return pts.map(([x, y]) => `${x - minX},${y - minY}`).sort().join(";");
};
const CORRECT_S = "0,1;1,0;1,1;2,0";
const WRONG_SQUARE = "0,0;0,1;1,0;1,1";

const closure = new Set<number>(wins);
const reverseQueue = [...wins];
for (let i = 0; i < reverseQueue.length; i += 1) {
  for (const edge of incoming.get(reverseQueue[i]!) ?? []) {
    if (closure.has(edge.from)) continue;
    closure.add(edge.from);
    reverseQueue.push(edge.from);
  }
}
const closureEdges = graph.edges.filter((edge) => closure.has(edge.from) && closure.has(edge.to));

const canonicalInputs = [
  "right", "right", "right", "left", "left", "left", "down", "right", "right",
  "up", "right", "right", "up", "left", "left", "down", "down", "right", "up", "up",
];
let canonicalState = initial;
const canonicalTrace: Array<{ step: number; action: string; state: number; key: string; events: string[] }> = [];
for (const [index, action] of canonicalInputs.entries()) {
  const transition = runtime.step(canonicalState, action, options);
  if (!transition.legal) throw new Error(`illegal canonical step ${index + 1}`);
  canonicalState = transition.state;
  const state = graph.indexByKey.get(runtime.key(canonicalState));
  if (state === undefined) throw new Error(`canonical step ${index + 1} absent`);
  canonicalTrace.push({ step: index + 1, action, state, key: runtime.key(canonicalState), events: transition.events });
}
if (!runtime.isWin(canonicalState, pkg.mechanic.win)) throw new Error("canonical trace is not a win");
const canonicalObject = (step: number) => objectKey(canonicalTrace[step - 1]!.state);
const canonicalConstructedS = canonicalObject(9);
const canonicalPostBoundaryPush = canonicalObject(12);
const canonicalPostLUpPull = canonicalObject(13);
const canonicalPostRebind = canonicalObject(14);
const canonicalMouthEntry = canonicalObject(19);
const canonicalWin = canonicalObject(20);

function avoidState(predicate: (state: number) => boolean) {
  const seen = new Set<number>();
  const queue: number[] = [];
  if (!predicate(0)) { seen.add(0); queue.push(0); }
  let foundWin = false;
  for (let i = 0; i < queue.length && !foundWin; i += 1) {
    for (const edge of outgoing.get(queue[i]!) ?? []) {
      if (predicate(edge.to) || seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push(edge.to);
      if (wins.has(edge.to)) { foundWin = true; break; }
    }
  }
  return { status: "complete", exploredStates: seen.size, foundWin };
}

function avoidEdge(predicate: (edge: Edge) => boolean) {
  const seen = new Set([0]);
  const queue = [0];
  const predecessor = new Map<number, Edge>();
  let foundWin = wins.has(0);
  let foundWinState = foundWin ? 0 : undefined;
  let forbiddenEdgesEncountered = 0;
  for (let i = 0; i < queue.length && !foundWin; i += 1) {
    for (const edge of outgoing.get(queue[i]!) ?? []) {
      if (predicate(edge)) { forbiddenEdgesEncountered += 1; continue; }
      if (seen.has(edge.to)) continue;
      seen.add(edge.to);
      predecessor.set(edge.to, edge);
      queue.push(edge.to);
      if (wins.has(edge.to)) { foundWin = true; foundWinState = edge.to; break; }
    }
  }
  const witnessInputs: string[] = [];
  if (foundWinState !== undefined) {
    let cursor = foundWinState;
    while (cursor !== 0) {
      const edge = predecessor.get(cursor);
      if (!edge) break;
      witnessInputs.push(edge.action);
      cursor = edge.from;
    }
    witnessInputs.reverse();
  }
  return { status: "complete", exploredStates: seen.size, foundWin, forbiddenEdgesEncountered, witnessInputs };
}

function replayDescendants(inputs: string[]) {
  let state = initial;
  const trace: Array<{ step: number; action: string; events: string[]; key: string }> = [];
  for (const [index, action] of inputs.entries()) {
    const transition = runtime.step(state, action, options);
    if (!transition.legal) throw new Error(`illegal witness step ${index + 1}: ${inputs.join(",")}`);
    state = transition.state;
    trace.push({ step: index + 1, action, events: transition.events, key: runtime.key(state) });
  }
  const index = graph.indexByKey.get(runtime.key(state));
  if (index === undefined) throw new Error("witness absent from graph");
  const descendants = new Set([index]);
  const queue = [index];
  let foundWin = wins.has(index);
  for (let i = 0; i < queue.length; i += 1) {
    for (const edge of outgoing.get(queue[i]!) ?? []) {
      if (descendants.has(edge.to)) continue;
      descendants.add(edge.to);
      queue.push(edge.to);
      if (wins.has(edge.to)) foundWin = true;
    }
  }
  return {
    inputs,
    trace,
    stateKey: graph.keys[index],
    objectKey: objectKey(index),
    normalizedShape: normalizedShape(index),
    completeGraphDescendants: descendants.size,
    foundWin,
    inWinClosure: closure.has(index),
  };
}

const isCorrectSMerge = (edge: Edge) => normalizedShape(edge.to) === CORRECT_S
  && normalizedShape(edge.from) !== CORRECT_S
  && (edge.events ?? []).some((event) => event.startsWith("sticky_merge"));
const exactObjectTransition = (from: string, to: string, action: string, eventPrefix: string) => (edge: Edge) => objectKey(edge.from) === from
  && objectKey(edge.to) === to
  && edge.action === action
  && (edge.events ?? []).some((event) => event.startsWith(eventPrefix));
const exactBoundaryRightPush = exactObjectTransition(canonicalConstructedS, canonicalPostBoundaryPush, "right", "push_object:sticky");
const exactLUpPull = exactObjectTransition(canonicalPostBoundaryPush, canonicalPostLUpPull, "up", "pull_object:sticky");
const exactLeftRebind = exactObjectTransition(canonicalPostLUpPull, canonicalPostRebind, "left", "pull_object:sticky");
const exactFirstPUpPush = exactObjectTransition(canonicalPostRebind, canonicalMouthEntry, "up", "push_object:sticky");
const exactFinalPUpPush = exactObjectTransition(canonicalMouthEntry, canonicalWin, "up", "push_object:sticky");

const describeEdge = (edge: Edge) => ({
  action: edge.action,
  fromPlayer: player(edge.from),
  toPlayer: player(edge.to),
  fromObject: objectKey(edge.from),
  toObject: objectKey(edge.to),
  fromShape: normalizedShape(edge.from),
  toShape: normalizedShape(edge.to),
  events: edge.events,
  inWinClosure: closure.has(edge.from) && closure.has(edge.to),
});

function variantSummary(id: string, variantLayout: string) {
  const variantLevel: LevelDoc = { id, title: id, layout: variantLayout, win: pkg.mechanic.win };
  const variantGraph = enumerateRuntimeGraph(runtime, adapter.parseLevel(variantLevel), pkg.mechanic.win, options, {
    maxStates: 500_000,
    terminalizeWins: true,
  });
  return {
    id,
    status: variantGraph.status,
    states: variantGraph.keys.length,
    transitions: variantGraph.edges.length,
    winStates: variantGraph.winStateIndexes.size,
  };
}

const wrongSquareInputs = [
  "down", "right", "right", "right", "left", "left", "left", "up", "right", "right", "right",
  "right", "up", "right", "up", "left", "down", "left",
];
const wrongSquareAfterRebind = replayDescendants(wrongSquareInputs);
if (wrongSquareAfterRebind.normalizedShape !== WRONG_SQUARE) throw new Error("wrong-square witness shape mismatch");

const rows = layout.trimEnd().split("\n");
const withRow = (row: number, value: string) => rows.map((line, index) => index === row ? value : line).join("\n");
const closeSquareReleaseCell = variantSummary("V14_CLOSE_SQUARE_RELEASE_CELL", withRow(7, "#.C..M.###"));
const reopenUpperRightStop = variantSummary("V14_REOPEN_UPPER_RIGHT_STOP", withRow(4, "###.....##"));
const removeLeftMouthGoal = variantSummary("V14_REMOVE_LEFT_MOUTH_GOAL", withRow(3, "#####.G###"));
const removeRightMouthGoal = variantSummary("V14_REMOVE_RIGHT_MOUTH_GOAL", withRow(3, "#####G.###"));

const shapeCountsInClosure = new Map<string, number>();
for (const state of closure) {
  const label = normalizedShape(state) ?? (stickyComponents(state).map((component) => component.length).sort().join("+") || "none");
  shapeCountsInClosure.set(label, (shapeCountsInClosure.get(label) ?? 0) + 1);
}

const report = {
  candidateId: "RA_STICKY_IRREGULAR_BOUNDARY_S_REBIND_MOUTH",
  exactVersion,
  layoutSha256,
  graph: {
    status: graph.status,
    states: graph.keys.length,
    transitions: graph.edges.length,
    winStates: wins.size,
    winClosureStates: closure.size,
    winClosureEdges: closureEdges.length,
  },
  canonical: {
    inputs: canonicalInputs,
    trace: canonicalTrace,
    constructedS: canonicalConstructedS,
    postBoundaryRightPush: canonicalPostBoundaryPush,
    postLUpPull: canonicalPostLUpPull,
    postLeftRebind: canonicalPostRebind,
    mouthEntry: canonicalMouthEntry,
    win: canonicalWin,
  },
  winFamily: {
    winningObjectKeys: [...new Set([...wins].map(objectKey))].sort(),
    normalizedWinningShapes: [...new Set([...wins].map(normalizedShape))].sort(),
    shapeCountsInClosure: Object.fromEntries([...shapeCountsInClosure.entries()].sort()),
    closureMergeEdges: closureEdges.filter((edge) => (edge.events ?? []).some((event) => event.startsWith("sticky_merge"))).map(describeEdge),
  },
  necessity: {
    anyCorrectSState: avoidState((state) => normalizedShape(state) === CORRECT_S),
    anyCorrectSMerge: avoidEdge(isCorrectSMerge),
    exactBoundaryRightPush: avoidEdge(exactBoundaryRightPush),
    exactLUpPull: avoidEdge(exactLUpPull),
    exactLeftRebind: avoidEdge(exactLeftRebind),
    exactFirstPUpPush: avoidEdge(exactFirstPUpPush),
    exactFinalPUpPush: avoidEdge(exactFinalPUpPush),
    matchedEdges: {
      correctSMerge: graph.edges.filter(isCorrectSMerge).map(describeEdge),
      boundaryRightPush: graph.edges.filter(exactBoundaryRightPush).map(describeEdge),
      lUpPull: graph.edges.filter(exactLUpPull).map(describeEdge),
      leftRebind: graph.edges.filter(exactLeftRebind).map(describeEdge),
      firstPUpPush: graph.edges.filter(exactFirstPUpPush).map(describeEdge),
      finalPUpPush: graph.edges.filter(exactFinalPUpPush).map(describeEdge),
    },
  },
  wrongCompleteState: {
    squareAfterBoundaryPullAndRebind: wrongSquareAfterRebind,
  },
  counterfactuals: {
    closeSquareReleaseCell,
    reopenUpperRightStop,
    removeLeftMouthGoal,
    removeRightMouthGoal,
  },
  evidenceLimits: [
    "完整图和反事实只支持当前 exact、当前 runtime 与目标覆盖胜利条件。",
    "机械证据不判断难度、目标是否泄题、错误反馈舒适度或归档防撞。",
    "wrong-square 见证只证明指定完整状态及其全部后继无胜，不把错误尝试次数当作质量指标。",
  ],
};

await mkdir(here, { recursive: true });
await writeFile(path.join(here, "equivalence_audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  graph: report.graph,
  winFamily: report.winFamily,
  necessity: report.necessity,
  wrongCompleteState: report.wrongCompleteState,
  counterfactuals: report.counterfactuals,
}, null, 2));

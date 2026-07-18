import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const here = import.meta.dirname;
const prototypeRoot = path.resolve(here, "../../../..");
const layoutPath = path.resolve(here, "../../nodes/apply_suffix_v13/layout.txt");
const layout = await readFile(layoutPath, "utf8");
const expectedLayoutSha256 = "f84169f60dfb99593d38b761cca308d7aa818b36150ce099d9303912b250cc26";
const layoutSha256 = createHash("sha256").update(layout).digest("hex");
if (layoutSha256 !== expectedLayoutSha256) throw new Error(`layout hash mismatch ${layoutSha256}`);
const exactVersion = `v13_sha256_${layoutSha256}`;

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win, maxStates: 500_000 };
const level: LevelDoc = { id: "RA_STICKY_IRREGULAR_BOUNDARY_Z_MOUTH_V13", title: "V13", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 500_000, terminalizeWins: true });
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
const CORRECT_Z = "0,1;1,0;1,1;2,0";
const WRONG_S = "0,0;1,0;1,1;2,1";

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

const canonicalInputs = ["left", "left", "down", "right", "up", "right", "right", "left", "down", "down", "down"];
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
const canonicalConstructedZ = canonicalObject(7);
const canonicalPostBoundaryPush = canonicalObject(8);
const canonicalPostTurnPull = canonicalObject(9);
const canonicalMouthEntry = canonicalObject(10);
const canonicalWin = canonicalObject(11);

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
  for (const action of inputs) {
    const transition = runtime.step(state, action, options);
    if (!transition.legal) throw new Error(`illegal witness ${inputs.join(",")}`);
    state = transition.state;
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
  return { inputs, stateKey: graph.keys[index], objectKey: objectKey(index), normalizedShape: normalizedShape(index), completeGraphDescendants: descendants.size, foundWin, inWinClosure: closure.has(index) };
}

const isCorrectZMerge = (edge: Edge) => normalizedShape(edge.to) === CORRECT_Z
  && normalizedShape(edge.from) !== CORRECT_Z
  && (edge.events ?? []).some((event) => event.startsWith("sticky_merge"));
const isBoundaryLeftPush = (edge: Edge) => normalizedShape(edge.from) === CORRECT_Z
  && edge.action === "left"
  && player(edge.from)[0] === 6
  && player(edge.to)[0] === 5
  && (edge.events ?? []).some((event) => event.startsWith("push_object:sticky"));
const exactObjectTransition = (from: string, to: string, action: string, eventPrefix: string) => (edge: Edge) => objectKey(edge.from) === from
  && objectKey(edge.to) === to
  && edge.action === action
  && (edge.events ?? []).some((event) => event.startsWith(eventPrefix));
const exactTurnPull = exactObjectTransition(canonicalPostBoundaryPush, canonicalPostTurnPull, "down", "pull_object:sticky");
const exactMouthPull = exactObjectTransition(canonicalPostTurnPull, canonicalMouthEntry, "down", "pull_object:sticky");
const exactFinalHandlePull = exactObjectTransition(canonicalMouthEntry, canonicalWin, "down", "pull_object:sticky");

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
  const variantGraph = enumerateRuntimeGraph(runtime, adapter.parseLevel(variantLevel), pkg.mechanic.win, options, { maxStates: 500_000, terminalizeWins: true });
  const variantObject = (state: number) => variantGraph.keys[state]!.replace(/^Ply:[^|]+\|/, "");
  const variantPlayer = (state: number) => variantGraph.keys[state]!.match(/^Ply:(\d+),(\d+)/)!.slice(1).map(Number) as [number, number];
  const variantShape = (state: number) => {
    const object = variantObject(state);
    if (!object.startsWith("C:|")) return null;
    const field = object.match(/\|M:(.*?)\|PL:/)?.[1] ?? "";
    const components = field ? field.split("|").map((part) => part.split(";").filter(Boolean)) : [];
    if (components.length !== 1) return null;
    const pts = components[0]!.map((cell) => cell.split(",").map(Number) as [number, number]);
    const minX = Math.min(...pts.map(([x]) => x));
    const minY = Math.min(...pts.map(([, y]) => y));
    return pts.map(([x, y]) => `${x - minX},${y - minY}`).sort().join(";");
  };
  const variantOutgoing = new Map<number, (typeof variantGraph.edges)[number][]>();
  for (const edge of variantGraph.edges) (variantOutgoing.get(edge.from) ?? (variantOutgoing.set(edge.from, []), variantOutgoing.get(edge.from)!)).push(edge);
  const seen = new Set([0]);
  const queue = [0];
  const predecessor = new Map<number, (typeof variantGraph.edges)[number]>();
  let bypassWin: number | undefined;
  for (let i = 0; i < queue.length && bypassWin === undefined; i += 1) {
    for (const edge of variantOutgoing.get(queue[i]!) ?? []) {
      const isBoundaryPush = variantShape(edge.from) === CORRECT_Z
        && edge.action === "left"
        && variantPlayer(edge.from)[0] === 6
        && variantPlayer(edge.to)[0] === 5
        && (edge.events ?? []).some((event) => event.startsWith("push_object:sticky"));
      if (isBoundaryPush || seen.has(edge.to)) continue;
      seen.add(edge.to);
      predecessor.set(edge.to, edge);
      queue.push(edge.to);
      if (variantGraph.winStateIndexes.has(edge.to)) { bypassWin = edge.to; break; }
    }
  }
  const bypassInputs: string[] = [];
  if (bypassWin !== undefined) {
    let cursor = bypassWin;
    while (cursor !== 0) {
      const edge = predecessor.get(cursor);
      if (!edge) break;
      bypassInputs.push(edge.action);
      cursor = edge.from;
    }
    bypassInputs.reverse();
  }
  return {
    id,
    status: variantGraph.status,
    states: variantGraph.keys.length,
    transitions: variantGraph.edges.length,
    winStates: variantGraph.winStateIndexes.size,
    winningObjectKeys: [...new Set([...variantGraph.winStateIndexes].map(variantObject))].sort(),
    winningShapes: [...new Set([...variantGraph.winStateIndexes].map(variantShape))].sort(),
    winWithoutCorrectZBoundaryLeftPush: bypassWin !== undefined,
    bypassInputs,
  };
}

const layoutRows = layout.trimEnd().split("\n");
const withRow = (row: number, value: string) => layoutRows.map((line, index) => index === row ? value : line).join("\n");
const leftWallToothRemoved = variantSummary("V13_REMOVE_LEFT_WALL_TOOTH", withRow(7, "#.....####"));
const rightWallToothRemoved = variantSummary("V13_REMOVE_RIGHT_WALL_TOOTH", withRow(7, "#.#....###"));
const ceilingRightStopRemoved = variantSummary("V13_REMOVE_CEILING_RIGHT_STOP", withRow(4, "#......###"));

const shapeCountsInClosure = new Map<string, number>();
for (const state of closure) {
  const label = normalizedShape(state) ?? (stickyComponents(state).map((component) => component.length).sort().join("+") || "none");
  shapeCountsInClosure.set(label, (shapeCountsInClosure.get(label) ?? 0) + 1);
}
const closureMergeEdges = closureEdges.filter((edge) => (edge.events ?? []).some((event) => event.startsWith("sticky_merge")));

const report = {
  candidateId: "RA_STICKY_IRREGULAR_BOUNDARY_Z_MOUTH",
  exactVersion,
  layoutSha256,
  graph: { status: graph.status, states: graph.keys.length, transitions: graph.edges.length, winStates: wins.size, winClosureStates: closure.size, winClosureEdges: closureEdges.length },
  canonical: {
    inputs: canonicalInputs,
    trace: canonicalTrace,
    constructedZ: canonicalConstructedZ,
    postBoundaryPush: canonicalPostBoundaryPush,
    postTurnPull: canonicalPostTurnPull,
    mouthEntry: canonicalMouthEntry,
    win: canonicalWin,
  },
  winFamily: {
    winningObjectKeys: [...new Set([...wins].map(objectKey))].sort(),
    normalizedWinningShapes: [...new Set([...wins].map(normalizedShape))].sort(),
    shapeCountsInClosure: Object.fromEntries([...shapeCountsInClosure.entries()].sort()),
    closureMergeEdges: closureMergeEdges.map(describeEdge),
    closureBoundaryLeftPushes: closureEdges.filter(isBoundaryLeftPush).map(describeEdge),
  },
  necessity: {
    anyCorrectZState: avoidState((state) => normalizedShape(state) === CORRECT_Z),
    anyCorrectZMerge: avoidEdge(isCorrectZMerge),
    anyCorrectZBoundaryLeftPush: avoidEdge(isBoundaryLeftPush),
    exactTurnPull: avoidEdge(exactTurnPull),
    exactMouthPull: avoidEdge(exactMouthPull),
    exactFinalHandlePull: avoidEdge(exactFinalHandlePull),
    matchedEdges: {
      correctZMerge: graph.edges.filter(isCorrectZMerge).map(describeEdge),
      correctZBoundaryLeftPush: graph.edges.filter(isBoundaryLeftPush).map(describeEdge),
      turnPull: graph.edges.filter(exactTurnPull).map(describeEdge),
      mouthPull: graph.edges.filter(exactMouthPull).map(describeEdge),
      finalHandlePull: graph.edges.filter(exactFinalHandlePull).map(describeEdge),
    },
  },
  deadEnds: {
    wrongSAfterBoundaryUse: replayDescendants(["down", "left", "up", "up", "right", "right", "left", "up"]),
  },
  wallCounterfactuals: { leftWallToothRemoved, rightWallToothRemoved, ceilingRightStopRemoved },
  evidenceLimits: [
    "完整图和反事实只支持当前 exact、当前 runtime 与目标覆盖胜利条件。",
    "机械证据不判断难度、目标泄题程度、错误反馈舒适度或归档防撞。",
  ],
};

await mkdir(here, { recursive: true });
await writeFile(path.join(here, "equivalence_audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ graph: report.graph, winFamily: report.winFamily, necessity: report.necessity, deadEnds: report.deadEnds, wallCounterfactuals: report.wallCounterfactuals }, null, 2));

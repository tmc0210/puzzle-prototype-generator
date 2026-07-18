import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../../..");
const prototypeRoot = path.join(repoRoot, "prototypes", "reality_anchor");
const layoutPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(import.meta.dirname, "construct_prefix_v7_wall64.txt");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const hash = createHash("sha256").update(layout).digest("hex");
const level: LevelDoc = { id: "construct_prefix_v7_wall64", title: "construct_prefix_v7_wall64", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win, maxStates: 400_000 };
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 400_000, terminalizeWins: true });

const parent = new Map<number, (typeof graph.edges)[number]>();
for (const edge of graph.edges) {
  if (graph.depthByIndex[edge.to] === graph.depthByIndex[edge.from]! + 1 && !parent.has(edge.to)) parent.set(edge.to, edge);
}
function inputsFor(index: number): string[] {
  const out: string[] = [];
  while (index !== 0) {
    const edge = parent.get(index);
    if (!edge) throw new Error(`no parent ${index}`);
    out.push(edge.action);
    index = edge.from;
  }
  return out.reverse();
}
function objectKey(key: string): string { return key.replace(/^Ply:[^|]+\|/, ""); }
function runPrefix(inputs: string[]) {
  let state = initial;
  let legal = true;
  const events: string[][] = [];
  for (const input of inputs) {
    const t = runtime.step(state, input, options);
    events.push(t.events ?? []);
    if (!t.legal) { legal = false; break; }
    state = t.state;
  }
  const suffix = legal ? solveWithRuntime(runtime, state, options) : null;
  return {
    inputs,
    legal,
    stateKey: runtime.key(state),
    render: adapter.renderState(state).trimEnd(),
    events,
    suffix: suffix && { found: suffix.found, status: suffix.searchStatus, explored: suffix.exploredStates, cost: suffix.found ? suffix.cost : null, inputs: suffix.found ? suffix.inputs : [] },
  };
}
const wins = [...graph.winStateIndexes].map(index => ({
  index,
  depth: graph.depthByIndex[index],
  key: graph.keys[index],
  objectKey: objectKey(graph.keys[index]!),
  inputs: inputsFor(index),
}));
const reverse = new Map<number, number[]>();
for (const edge of graph.edges) {
  const bucket = reverse.get(edge.to) ?? [];
  bucket.push(edge.from);
  reverse.set(edge.to, bucket);
}
const canReachWin = new Set<number>(graph.winStateIndexes);
const queue = [...graph.winStateIndexes];
while (queue.length) {
  const current = queue.shift()!;
  for (const previous of reverse.get(current) ?? []) {
    if (!canReachWin.has(previous)) { canReachWin.add(previous); queue.push(previous); }
  }
}
const viableMergeEdges = graph.edges.filter(edge =>
  canReachWin.has(edge.to) && edge.events.some(event => event.startsWith("sticky_merge")),
).map(edge => ({
  from: edge.from,
  to: edge.to,
  fromDepth: graph.depthByIndex[edge.from],
  toDepth: graph.depthByIndex[edge.to],
  action: edge.action,
  prefixInputs: inputsFor(edge.from),
  events: edge.events,
  before: graph.keys[edge.from],
  after: graph.keys[edge.to],
}));
const viableNormalizationEdges = graph.edges.filter(edge =>
  canReachWin.has(edge.to) && edge.events.some(event => event.startsWith("sticky_to_box")),
).map(edge => ({ from: edge.from, to: edge.to, action: edge.action, events: edge.events, before: graph.keys[edge.from], after: graph.keys[edge.to] }));
const prefixes = {
  canonicalL: runPrefix(["left", "left", "up", "left"]),
  wrongLowerBar: runPrefix(["left", "left", "up", "down"]),
  wrongUpperBar: runPrefix(["up", "up", "left", "up"]),
  upperCuldesacLeft: runPrefix(["up", "left"]),
  upperCuldesacDownLeft: runPrefix(["up", "down", "left"]),
};
console.log(JSON.stringify({
  layout,
  hash,
  graph: { status: graph.status, reason: graph.reason, states: graph.keys.length, transitions: graph.edges.length, wins: wins.length },
  winningObjectClasses: [...new Set(wins.map(w => w.objectKey))],
  winningDepths: [...new Set(wins.map(w => w.depth))],
  viableStateCount: canReachWin.size,
  viableMergeEdges,
  viableNormalizationEdges,
  wins,
  prefixes,
}, null, 2));

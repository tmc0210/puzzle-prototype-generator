import path from "node:path";
import { readFileSync } from "node:fs";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = readFileSync(path.resolve(process.argv[2]!), "utf8").trimEnd();
const level: LevelDoc = { id: "balanced_starts", title: "balanced_starts", layout, win: pkg.mechanic.win };
const graph = enumerateRuntimeGraph(runtime, adapter.parseLevel(level), pkg.mechanic.win, { winCondition: pkg.mechanic.win, maxStates: 100_000 }, { maxStates: 100_000, terminalizeWins: false });
if (graph.status !== "complete") throw new Error(`graph ${graph.status}`);

type Edge = (typeof graph.edges)[number];
const incoming = new Map<number, Edge[]>();
const outgoing = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  (incoming.get(edge.to) ?? (incoming.set(edge.to, []), incoming.get(edge.to)!)).push(edge);
  (outgoing.get(edge.from) ?? (outgoing.set(edge.from, []), outgoing.get(edge.from)!)).push(edge);
}
const objectKey = (state: number) => graph.keys[state]!.replace(/^Ply:[^|]+\|/, "");
const player = (state: number) => graph.keys[state]!.match(/^Ply:(\d+),(\d+)/)!.slice(1).map(Number) as [number, number];
const stickyComponents = (state: number) => {
  const field = objectKey(state).match(/\|M:(.*?)\|PL:/)?.[1] ?? "";
  return field ? field.split("|").map((part) => part.split(";").filter(Boolean)) : [];
};
const normalizedTetromino = (state: number) => {
  const components = stickyComponents(state);
  if (components.length !== 1 || components[0]!.length !== 4 || !objectKey(state).startsWith("C:|")) return null;
  const pts = components[0]!.map((cell) => cell.split(",").map(Number) as [number, number]);
  const minX = Math.min(...pts.map(([x]) => x));
  const minY = Math.min(...pts.map(([, y]) => y));
  return pts.map(([x, y]) => `${x - minX},${y - minY}`).sort().join(";");
};
const shapes = {
  s: "0,0;1,0;1,1;2,1",
  z: "0,1;1,0;1,1;2,0",
};

const coreTargets = new Map<keyof typeof shapes, Set<number>>([
  ["s", new Set<number>()],
  ["z", new Set<number>()],
]);
for (const push of graph.edges) {
  const entry = (Object.entries(shapes) as [keyof typeof shapes, string][]).find(([, value]) => normalizedTetromino(push.from) === value);
  if (!entry || push.action !== "left" || player(push.from)[0] !== 5 || player(push.to)[0] !== 4 || !(push.events ?? []).some((event) => event.startsWith("push_object:sticky"))) continue;
  const pushedObject = objectKey(push.to);
  const walkQueue = [push.to];
  const seen = new Set<number>(walkQueue);
  let hasOrthogonalPull = false;
  for (let i = 0; i < walkQueue.length; i += 1) {
    const state = walkQueue[i]!;
    for (const edge of outgoing.get(state) ?? []) {
      if (["up", "down"].includes(edge.action) && (edge.events ?? []).some((event) => event.startsWith("pull_object:sticky"))) hasOrthogonalPull = true;
      if (objectKey(edge.to) !== pushedObject || seen.has(edge.to)) continue;
      seen.add(edge.to);
      walkQueue.push(edge.to);
    }
  }
  if (hasOrthogonalPull) coreTargets.get(entry[0])!.add(push.from);
}

function reverseDistances(targets: Set<number>) {
  const distance = new Map<number, number>();
  const next = new Map<number, Edge>();
  const queue = [...targets];
  for (const target of queue) distance.set(target, 0);
  for (let i = 0; i < queue.length; i += 1) {
    const state = queue[i]!;
    for (const edge of incoming.get(state) ?? []) {
      if (distance.has(edge.from)) continue;
      distance.set(edge.from, distance.get(state)! + 1);
      next.set(edge.from, edge);
      queue.push(edge.from);
    }
  }
  return { distance, next };
}
const sReverse = reverseDistances(coreTargets.get("s")!);
const zReverse = reverseDistances(coreTargets.get("z")!);
const trace = (start: number, reverse: ReturnType<typeof reverseDistances>) => {
  const actions: string[] = [];
  let cursor = start;
  while ((reverse.distance.get(cursor) ?? 0) > 0) {
    const edge = reverse.next.get(cursor)!;
    actions.push(edge.action);
    cursor = edge.to;
  }
  return { actions, target: cursor, targetKey: graph.keys[cursor] };
};

const candidates = graph.keys.map((key, state) => {
  const components = stickyComponents(state);
  if (!objectKey(state).startsWith("C:|") || components.length !== 2 || components.some((part) => part.length !== 2)) return null;
  const ds = sReverse.distance.get(state);
  const dz = zReverse.distance.get(state);
  if (ds === undefined || dz === undefined || ds === 0 || dz === 0) return null;
  return {
    state,
    key,
    sDistance: ds,
    zDistance: dz,
    delta: Math.abs(ds - dz),
    max: Math.max(ds, dz),
    sTrace: trace(state, sReverse),
    zTrace: trace(state, zReverse),
  };
}).filter(Boolean).sort((a, b) => a!.max - b!.max || a!.delta - b!.delta || a!.sDistance - b!.sDistance).slice(0, 30);

console.log(JSON.stringify({ graph: { states: graph.keys.length, transitions: graph.edges.length }, targetCounts: { s: coreTargets.get("s")!.size, z: coreTargets.get("z")!.size }, candidates }, null, 2));

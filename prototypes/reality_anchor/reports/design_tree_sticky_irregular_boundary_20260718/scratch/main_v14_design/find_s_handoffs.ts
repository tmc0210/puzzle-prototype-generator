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
const level: LevelDoc = { id: "find_s_handoffs", title: "find_s_handoffs", layout, win: pkg.mechanic.win };
const graph = enumerateRuntimeGraph(runtime, adapter.parseLevel(level), pkg.mechanic.win, { winCondition: pkg.mechanic.win, maxStates: 500_000 }, { maxStates: 500_000, terminalizeWins: false });
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
function oneSticky(state: number) {
  const key = objectKey(state);
  const crates = key.match(/^C:([^|]*)\|/)?.[1] ?? "";
  const raw = key.match(/\|M:(.*?)\|PL:/)?.[1] ?? "";
  if (crates || !raw || raw.includes("|")) return null;
  const pts = raw.split(";").map((cell) => cell.split(",").map(Number) as [number, number]);
  if (pts.length !== 4) return null;
  const minX = Math.min(...pts.map(([x]) => x));
  const minY = Math.min(...pts.map(([, y]) => y));
  const shape = pts.map(([x, y]) => `${x - minX},${y - minY}`).sort().join(";");
  return { pts, minX, minY, shape };
}
const correctS = "0,1;1,0;1,1;2,0";

const distance = Array(graph.keys.length).fill(Number.POSITIVE_INFINITY);
const previous = new Map<number, Edge>();
distance[0] = 0;
const queue = [0];
for (let i = 0; i < queue.length; i += 1) {
  const state = queue[i]!;
  for (const edge of outgoing.get(state) ?? []) {
    if (distance[edge.to] !== Number.POSITIVE_INFINITY) continue;
    distance[edge.to] = distance[state] + 1;
    previous.set(edge.to, edge);
    queue.push(edge.to);
  }
}
function trace(state: number) {
  const actions: string[] = [];
  let cursor = state;
  while (cursor !== 0) {
    const edge = previous.get(cursor)!;
    actions.push(edge.action);
    cursor = edge.from;
  }
  return actions.reverse();
}

const hits: unknown[] = [];
for (const push of graph.edges) {
  const shape = oneSticky(push.from);
  if (!shape || shape.shape !== correctS) continue;
  if (push.action !== "left" || player(push.from)[0] !== 5 || player(push.to)[0] !== 4) continue;
  if (!(push.events ?? []).some((event) => event.startsWith("push_object:sticky"))) continue;
  const down = (outgoing.get(push.to) ?? []).find((edge) => edge.action === "down" && (edge.events ?? []).some((event) => event.startsWith("pull_object:sticky")));
  if (!down) continue;
  hits.push({
    state: push.from,
    y: shape.minY,
    key: graph.keys[push.from],
    distance: distance[push.from],
    trace: trace(push.from),
    pushTo: graph.keys[push.to],
    downTo: graph.keys[down.to],
  });
}
hits.sort((a: any, b: any) => a.y - b.y || a.distance - b.distance || a.state - b.state);
console.log(JSON.stringify({ graph: { states: graph.keys.length, transitions: graph.edges.length }, hits }, null, 2));

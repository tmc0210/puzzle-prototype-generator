import { readFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutPath = path.resolve(process.argv[2]!);
const maxStates = Number(process.argv[3] ?? 500_000);
const pkg = await loadPrototypePackage(path.resolve(import.meta.dirname, "../../../.."));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level: LevelDoc = { id: path.basename(layoutPath), title: path.basename(layoutPath), layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, level.win!, { winCondition: level.win!, maxStates }, { maxStates, terminalizeWins: true });
const outgoing = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) (outgoing.get(edge.from) ?? outgoing.set(edge.from, []).get(edge.from)!).push(edge);
const parent = new Map<number, (typeof graph.edges)[number]>();
for (const edge of graph.edges) if (graph.depthByIndex[edge.to] === graph.depthByIndex[edge.from]! + 1 && !parent.has(edge.to)) parent.set(edge.to, edge);
function prefix(index: number) {
  const actions: string[] = [];
  while (index !== 0) { const edge = parent.get(index); if (!edge) break; actions.push(edge.action); index = edge.from; }
  return actions.reverse();
}
const objectKey = (i: number) => graph.keys[i]!.replace(/^Ply:[^|]+\|/, "");
function reachable(filter: (edge: (typeof graph.edges)[number]) => boolean) {
  const seen = new Set([0]); const queue = [0];
  for (let i = 0; i < queue.length; i++) for (const edge of outgoing.get(queue[i]!) ?? []) {
    if (!filter(edge) || seen.has(edge.to)) continue; seen.add(edge.to); queue.push(edge.to);
  }
  return { states: seen.size, wins: [...graph.winStateIndexes].filter((i) => seen.has(i)).map((i) => ({ index: i, key: graph.keys[i], objectKey: objectKey(i), cost: graph.depthByIndex[i], inputs: prefix(i) })) };
}
const wins = [...graph.winStateIndexes].map((i) => ({ index: i, key: graph.keys[i], objectKey: objectKey(i), cost: graph.depthByIndex[i], inputs: prefix(i) }));
const incoming = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
const canReachWin = new Set<number>(graph.winStateIndexes); const reverseQueue = [...graph.winStateIndexes];
for (let i = 0; i < reverseQueue.length; i++) for (const edge of incoming.get(reverseQueue[i]!) ?? []) if (!canReachWin.has(edge.from)) { canReachWin.add(edge.from); reverseQueue.push(edge.from); }
function stickyCells(key: string) {
  const field = key.match(/(?:^|\|)M:(.*)\|PL:/)?.[1] ?? "";
  return field ? field.split(/[;|]/).filter((token) => /^\d+,\d+$/.test(token)).map((token) => token.split(",").map(Number) as [number, number]) : [];
}
function normalizedShape(cells: [number, number][]) {
  const minX = Math.min(...cells.map(([x]) => x)); const minY = Math.min(...cells.map(([, y]) => y));
  return cells.map(([x,y]) => [x-minX,y-minY] as [number,number]).sort(([ax,ay],[bx,by]) => ay-by || ax-bx).map(([x,y]) => `${x},${y}`).join(";");
}
function hasT(key: string) {
  const cells = stickyCells(key); if (cells.length !== 4) return false;
  const degrees = cells.map(([x,y]) => cells.filter(([a,b]) => Math.abs(a-x)+Math.abs(b-y)===1).length).sort();
  return degrees.join(",") === "1,1,1,3";
}
const mergeShapes = new Map<string, number>();
for (const edge of graph.edges) if (canReachWin.has(edge.to) && edge.events.some((e) => e.startsWith("sticky_merge"))) {
  const shape = normalizedShape(stickyCells(objectKey(edge.to))); mergeShapes.set(shape, (mergeShapes.get(shape) ?? 0) + 1);
}
const withoutMerge = reachable((edge) => !edge.events.some((e) => e.startsWith("sticky_merge")));
const withoutT = reachable((edge) => !hasT(objectKey(edge.to)));
const tEntryGroups = new Map<string, { toObject: string; count: number; minCost: number; inputs: string[]; events: string[] }>();
for (const edge of graph.edges) if (canReachWin.has(edge.to) && !hasT(objectKey(edge.from)) && hasT(objectKey(edge.to))) {
  const key = objectKey(edge.to); const cost = prefix(edge.from).length + 1; const old = tEntryGroups.get(key);
  if (!old || cost < old.minCost) tEntryGroups.set(key, { toObject: key, count: (old?.count ?? 0) + 1, minCost: cost, inputs: [...prefix(edge.from), edge.action], events: edge.events });
  else old.count += 1;
}
console.log(JSON.stringify({ graph: { status: graph.status, states: graph.keys.length, transitions: graph.edges.length }, wins, tEntries: [...tEntryGroups.values()].sort((a,b)=>a.minCost-b.minCost), withoutMerge, withoutT }, null, 2));

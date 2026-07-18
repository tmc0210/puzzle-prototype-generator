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
const level: LevelDoc = { id: "graph_summary", title: "graph_summary", layout, win: pkg.mechanic.win };
const graph = enumerateRuntimeGraph(runtime, adapter.parseLevel(level), pkg.mechanic.win, { winCondition: pkg.mechanic.win, maxStates: 500_000 }, { maxStates: 500_000, terminalizeWins: true });
const incoming = new Map<number, (typeof graph.edges)[number][]>();
for (const edge of graph.edges) (incoming.get(edge.to) ?? (incoming.set(edge.to, []), incoming.get(edge.to)!)).push(edge);
const shortest = (target: number) => {
  const result: string[] = [];
  let cursor = target;
  const seen = new Set<number>();
  while (cursor !== 0 && !seen.has(cursor)) {
    seen.add(cursor);
    const edge = (incoming.get(cursor) ?? [])[0];
    if (!edge) break;
    result.push(edge.action);
    cursor = edge.from;
  }
  return result.reverse();
};
const wins = [...graph.winStateIndexes];
console.log(JSON.stringify({
  status: graph.status,
  states: graph.keys.length,
  transitions: graph.edges.length,
  winStates: wins.length,
  wins: wins.slice(0, 20).map((state) => ({ state, key: graph.keys[state], trace: shortest(state) })),
}, null, 2));

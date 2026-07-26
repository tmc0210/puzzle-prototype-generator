import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layout = await readFile(process.argv[2]!, "utf8");
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel({ id: "win_summary", title: "win_summary", layout, win: pkg.mechanic.win } satisfies LevelDoc);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 300000, terminalizeWins: true });
const parent = new Array<number>(graph.keys.length).fill(-1);
const parentEdge = new Array<number>(graph.keys.length).fill(-1);
for (const [i, edge] of graph.edges.entries()) if (edge.to !== 0 && parent[edge.to] === -1) { parent[edge.to] = edge.from; parentEdge[edge.to] = i; }
function route(index: number) {
  const edges: number[] = [];
  for (let cursor = index; cursor !== 0 && parentEdge[cursor] >= 0; cursor = parent[cursor]!) edges.push(parentEdge[cursor]!);
  edges.reverse();
  return edges.map((i) => graph.edges[i]!);
}
const rows = [...graph.winStateIndexes].map((index) => {
  const edges = route(index);
  const events = edges.flatMap((edge) => edge.events);
  return {
    depth: graph.depthByIndex[index],
    key: graph.keys[index],
    milestones: events.filter((event) => /extinguish_by_wall|ignite_from_brazier|light_brazier|burn_out|win_all_braziers_lit/.test(event)),
  };
});
const groups = new Map<string, { count: number; keys: string[]; depths: number[] }>();
for (const row of rows) {
  const signature = row.milestones.join("|");
  const group = groups.get(signature) ?? { count: 0, keys: [], depths: [] };
  group.count += 1; group.keys.push(row.key); group.depths.push(row.depth ?? 0); groups.set(signature, group);
}
console.log(JSON.stringify({ status: graph.status, states: graph.keys.length, edges: graph.edges.length, winning_states: rows.length, signatures: [...groups.entries()].map(([signature, value]) => ({ signature, ...value })) }, null, 2));

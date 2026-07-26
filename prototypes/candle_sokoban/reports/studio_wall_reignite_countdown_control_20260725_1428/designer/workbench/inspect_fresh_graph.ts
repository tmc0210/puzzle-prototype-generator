import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2]!;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const layout = await readFile(layoutPath, "utf8");
const level: LevelDoc = { id: "fresh_graph_inspect", title: "fresh_graph_inspect", layout, win: pkg.mechanic.win };
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 300000, terminalizeWins: true });
const parent = new Array<number>(graph.keys.length).fill(-1);
const parentEdge = new Array<number>(graph.keys.length).fill(-1);
for (const [edgeIndex, edge] of graph.edges.entries()) {
  if (edge.to !== 0 && parent[edge.to] === -1) {
    parent[edge.to] = edge.from;
    parentEdge[edge.to] = edgeIndex;
  }
}
function pathFor(index: number) {
  const edges: number[] = [];
  let cursor = index;
  while (cursor !== 0) {
    const edge = parentEdge[cursor];
    if (edge < 0) break;
    edges.push(edge);
    cursor = parent[cursor]!;
  }
  edges.reverse();
  return edges;
}
const rows = [...graph.winStateIndexes].sort((a, b) => (graph.depthByIndex[a] ?? 0) - (graph.depthByIndex[b] ?? 0)).map((index) => {
  const edgeIndexes = pathFor(index);
  const edges = edgeIndexes.map((edgeIndex) => graph.edges[edgeIndex]!);
  const events = edges.flatMap((edge) => edge.events);
  return {
    index,
    depth: graph.depthByIndex[index],
    key: graph.keys[index],
    actions: edges.map((edge) => edge.action),
    event_types: [...new Set(events.map((event) => event.split(":")[0]))],
    milestone_events: events.filter((event) => /extinguish_by_wall|ignite_from_brazier|light_brazier|burn_out|win_all_braziers_lit/.test(event)),
  };
});
console.log(JSON.stringify({ status: graph.status, states: graph.keys.length, edges: graph.edges.length, winning_states: rows.length, rows }, null, 2));

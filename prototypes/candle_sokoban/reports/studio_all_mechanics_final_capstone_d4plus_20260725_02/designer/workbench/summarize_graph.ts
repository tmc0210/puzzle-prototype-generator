import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/candle_sokoban";
const layoutPath =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02/designer/workbench/working_layout.txt";
const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const initial = adapter.parseLevel({
  id: "candidate_graph_summary",
  title: "candidate_graph_summary",
  layout,
  win: pkg.mechanic.win,
});
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  pkg.mechanic.win,
  { winCondition: pkg.mechanic.win, maxStates: 500_000, maxDepth: 200 },
  { maxStates: 500_000 },
);

const byObject = new Map<string, Set<string>>();
const objectSets = new Map<string, number>();
for (const key of graph.keys) {
  const candlePart = key.split("|C:")[1]?.split("|B:")[0] ?? "";
  objectSets.set(candlePart, (objectSets.get(candlePart) ?? 0) + 1);
  for (const encoded of candlePart.split("|")) {
    if (!encoded) continue;
    const id = encoded.split(":")[0]!;
    const bucket = byObject.get(id) ?? new Set<string>();
    bucket.add(encoded);
    byObject.set(id, bucket);
  }
}

console.log(JSON.stringify({
  status: graph.status,
  states: graph.states.length,
  edges: graph.edges.length,
  wins: graph.winStateIndexes.size,
  distinctFullCandleConfigurations: objectSets.size,
  distinctStatesByObject: Object.fromEntries([...byObject].map(([id, values]) => [id, values.size])),
  mostFrequentFullCandleConfigurations: [...objectSets.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20),
}, null, 2));

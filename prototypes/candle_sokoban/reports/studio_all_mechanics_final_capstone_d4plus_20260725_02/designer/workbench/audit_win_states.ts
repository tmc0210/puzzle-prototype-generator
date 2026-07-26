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
const winCondition = pkg.mechanic.win;
const initial = adapter.parseLevel({
  id: "candidate_win_state_audit",
  title: "candidate_win_state_audit",
  layout,
  win: winCondition,
});
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  winCondition,
  { winCondition, maxStates: 500_000, maxDepth: 200 },
  { maxStates: 500_000 },
);

if (graph.status !== "complete") {
  throw new Error(`graph incomplete: ${graph.reason ?? "unknown"}`);
}

const incoming = new Map<number, typeof graph.edges[number][]>();
for (const edge of graph.edges) {
  const bucket = incoming.get(edge.to) ?? [];
  bucket.push(edge);
  incoming.set(edge.to, bucket);
}

for (const winIndex of [...graph.winStateIndexes].sort((a, b) => graph.depthByIndex[a]! - graph.depthByIndex[b]!)) {
  const path: typeof graph.edges = [];
  let cursor = winIndex;
  while (cursor !== 0) {
    const depth = graph.depthByIndex[cursor]!;
    const edge = (incoming.get(cursor) ?? []).find(
      (candidate) => graph.depthByIndex[candidate.from] === depth - 1,
    );
    if (!edge) {
      throw new Error(`no BFS parent for win state ${winIndex} at ${cursor}`);
    }
    path.push(edge);
    cursor = edge.from;
  }
  path.reverse();
  const events = path.flatMap((edge) => edge.events);
  const important = events.filter(
    (event) =>
      event.startsWith("push_axis") ||
      event.startsWith("roll_candle") ||
      event.startsWith("extinguish_by_") ||
      event.startsWith("ignite_from_") ||
      event.startsWith("shrink:") ||
      event.startsWith("shrink_ignite") ||
      event.startsWith("simultaneous_burn") ||
      event.startsWith("burn_out") ||
      event.startsWith("light_brazier") ||
      event.startsWith("win_")
  );
  console.log(JSON.stringify({
    winIndex,
    depth: graph.depthByIndex[winIndex],
    inputs: path.map((edge) => edge.action),
    important,
    stateKey: graph.keys[winIndex],
  }));
}

console.error(JSON.stringify({
  graphStatus: graph.status,
  reachableStates: graph.states.length,
  legalTransitions: graph.edges.length,
  winningStates: graph.winStateIndexes.size,
}));

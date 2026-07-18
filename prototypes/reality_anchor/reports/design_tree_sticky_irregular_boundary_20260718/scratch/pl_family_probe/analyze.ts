import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutArg = process.argv[2];
if (!layoutArg) throw new Error("usage: analyze.ts <layout> [maxStates]");
const maxStates = Number(process.argv[3] ?? 300_000);
const layoutPath = path.resolve(layoutArg);
const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level: LevelDoc = { id: path.basename(layoutPath), title: path.basename(layoutPath), layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, level.win!, { winCondition: level.win! }, { maxStates, terminalizeWins: true });

const parent = new Map<number, (typeof graph.edges)[number]>();
for (const edge of graph.edges) {
  if (graph.depthByIndex[edge.to] === graph.depthByIndex[edge.from]! + 1 && !parent.has(edge.to)) parent.set(edge.to, edge);
}
function trace(index: number) {
  const edges: (typeof graph.edges)[number][] = [];
  while (index !== 0) {
    const edge = parent.get(index);
    if (!edge) throw new Error(`missing parent ${index}`);
    edges.push(edge);
    index = edge.from;
  }
  return edges.reverse();
}
const wins = [...graph.winStateIndexes].map((index) => ({
  index,
  depth: graph.depthByIndex[index],
  inputs: trace(index).map((edge) => edge.action),
  events: trace(index).map((edge) => edge.events),
  render: adapter.renderState(graph.states[index]!),
  key: graph.keys[index],
})).sort((a, b) => a.depth! - b.depth!);
const output = {
  graph: { status: graph.status, reason: graph.reason, states: graph.keys.length, transitions: graph.edges.length, wins: wins.length },
  wins: wins.slice(0, 30),
};
console.log(JSON.stringify(output, null, 2));
await writeFile(`${layoutPath}.analysis.json`, `${JSON.stringify(output, null, 2)}\n`, "utf8");

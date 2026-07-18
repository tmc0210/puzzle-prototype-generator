import { readFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutArg = process.argv[2];
if (!layoutArg) throw new Error("usage: inspect_wins.ts <layout> [maxStates]");
const maxStates = Number(process.argv[3] ?? 300_000);
const layoutPath = path.resolve(layoutArg);
const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level: LevelDoc = {
  id: path.basename(layoutPath),
  title: path.basename(layoutPath),
  layout,
  win: pkg.mechanic.win,
};
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  level.win!,
  { winCondition: level.win!, maxStates },
  { maxStates, terminalizeWins: true },
);

type Edge = (typeof graph.edges)[number];
const parent = new Map<number, Edge>();
for (const edge of graph.edges) {
  if (graph.depthByIndex[edge.to] === graph.depthByIndex[edge.from]! + 1 && !parent.has(edge.to)) {
    parent.set(edge.to, edge);
  }
}
function trace(index: number): Array<{ action: string; events: string[] }> {
  const result: Array<{ action: string; events: string[] }> = [];
  while (index !== 0) {
    const edge = parent.get(index);
    if (!edge) break;
    result.push({ action: edge.action, events: edge.events });
    index = edge.from;
  }
  return result.reverse();
}
const objectKey = (index: number) => graph.keys[index]!.replace(/^Ply:[^|]+\|/, "");
console.log(JSON.stringify({
  graph: {
    status: graph.status,
    states: graph.keys.length,
    transitions: graph.edges.length,
    wins: graph.winStateIndexes.size,
  },
  winningStates: [...graph.winStateIndexes].map((index) => ({
    index,
    depth: graph.depthByIndex[index],
    stateKey: graph.keys[index],
    objectKey: objectKey(index),
    trace: trace(index),
  })),
}, null, 2));

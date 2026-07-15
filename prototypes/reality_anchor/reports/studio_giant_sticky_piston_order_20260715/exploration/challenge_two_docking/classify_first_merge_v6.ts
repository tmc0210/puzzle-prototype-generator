import { readFileSync } from "node:fs";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const layoutPath = process.argv[2] ??
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/exploration/challenge_two_docking/two_docking_v6.txt";
const layout = readFileSync(layoutPath, "utf8");
const level = { id: "TD_V6_CLASSIFY", title: "TD_V6_CLASSIFY", layout, win: pkg.mechanic.win };
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(
  runtime as never,
  initial as never,
  pkg.mechanic.win,
  { winCondition: pkg.mechanic.win } as never,
  { maxStates: 300_000 },
);

type Category = "none" | "up" | "down" | "left" | "right";
type Node = { state: number; category: Category; inputs: string[] };
const outgoing = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) {
  const list = outgoing.get(edge.from) ?? [];
  list.push(edge);
  outgoing.set(edge.from, list);
}

const queue: Node[] = [{ state: 0, category: "none", inputs: [] }];
const visited = new Set(["0|none"]);
const winningExample = new Map<Category, string[]>();
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const current = queue[cursor]!;
  if (graph.winStateIndexes.has(current.state) && !winningExample.has(current.category)) {
    winningExample.set(current.category, current.inputs);
  }
  for (const edge of outgoing.get(current.state) ?? []) {
    const firstMerge = edge.events.some((event) => event.startsWith("sticky_merge:"));
    const category = current.category === "none" && firstMerge
      ? (edge.action as Category)
      : current.category;
    const key = `${edge.to}|${category}`;
    if (visited.has(key)) continue;
    visited.add(key);
    queue.push({ state: edge.to, category, inputs: [...current.inputs, edge.action] });
  }
}

console.log(JSON.stringify({
  graphStatus: graph.status,
  layoutPath,
  graphReason: graph.reason,
  states: graph.states.length,
  edges: graph.edges.length,
  rawWinStates: graph.winStateIndexes.size,
  reachableAugmentedPairs: visited.size,
  winningFirstMergeCategories: [...winningExample.entries()].map(([category, inputs]) => ({
    category,
    cost: inputs.length,
    inputs,
  })),
}, null, 2));

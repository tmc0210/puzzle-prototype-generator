import { readFileSync } from "node:fs";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const layoutPath = process.argv[2] ?? "cathedral_brake_v3.txt";
const maxStates = Number(process.argv[3] ?? 50_000);
const layout = readFileSync(layoutPath, "utf8");
const level = { id: "CATHEDRAL_BRAKE_CLASSIFY", title: "CATHEDRAL_BRAKE_CLASSIFY", layout, win: pkg.mechanic.win };
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(
  runtime as never,
  initial as never,
  pkg.mechanic.win,
  { winCondition: pkg.mechanic.win } as never,
  { maxStates },
);

type Category = "none" | "up" | "down" | "left" | "right";
type Node = { state: number; category: Category; inputs: string[]; objectEvents: string[] };
const outgoing = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) {
  const list = outgoing.get(edge.from) ?? [];
  list.push(edge);
  outgoing.set(edge.from, list);
}

const queue: Node[] = [{ state: 0, category: "none", inputs: [], objectEvents: [] }];
const visited = new Set(["0|none"]);
const categoryWitness = new Map<Category, Node>();
const objectFamilies = new Map<string, Node>();
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const current = queue[cursor]!;
  if (graph.winStateIndexes.has(current.state)) {
    if (!categoryWitness.has(current.category)) categoryWitness.set(current.category, current);
    const signature = objectSignature(graph.states[current.state] as unknown as RealityAnchorState);
    if (!objectFamilies.has(signature)) objectFamilies.set(signature, current);
  }
  for (const edge of outgoing.get(current.state) ?? []) {
    const firstMerge = edge.events.some((event) => event.startsWith("sticky_merge:"));
    const category = current.category === "none" && firstMerge
      ? (edge.action as Category)
      : current.category;
    const key = `${edge.to}|${category}`;
    if (visited.has(key)) continue;
    visited.add(key);
    const eventText = edge.events.filter((event) => event !== "walk").join("+");
    queue.push({
      state: edge.to,
      category,
      inputs: [...current.inputs, edge.action],
      objectEvents: eventText ? [...current.objectEvents, `${edge.action}:${eventText}`] : current.objectEvents,
    });
  }
}

console.log(JSON.stringify({
  graphStatus: graph.status,
  graphReason: graph.reason,
  maxStates,
  states: graph.states.length,
  edges: graph.edges.length,
  rawWinStates: graph.winStateIndexes.size,
  winningObjectFamilies: objectFamilies.size,
  winningFirstMergeCategories: [...categoryWitness.entries()].map(([category, node]) => ({
    category,
    cost: node.inputs.length,
    inputs: node.inputs,
    objectEvents: node.objectEvents,
  })),
  objectFamilySamples: [...objectFamilies.values()].slice(0, 5).map((node) => ({
    category: node.category,
    cost: node.inputs.length,
    inputs: node.inputs,
    objectEvents: node.objectEvents,
  })),
}, null, 2));

function objectSignature(state: RealityAnchorState): string {
  const crates = state.crates.map(pointKey).sort().join(";");
  const groups = state.stickyGroups
    .map((group) => group.map(pointKey).sort().join(";"))
    .sort()
    .join("|");
  return `C:${crates}|M:${groups}`;
}

function pointKey(point: { x: number; y: number }): string {
  return `${point.x},${point.y}`;
}

import fs from "node:fs";

type Node = { index: number; key: string; depth: number; winning: boolean };
type Edge = { index: number; from: number; to: number; action: string; events: string[] };
type Audit = { raw_graph: { nodes: Node[]; edges: Edge[] } };

const source = process.argv[2];
if (!source) throw new Error("usage: npx tsx analyze_win_families.ts <audit.json>");
const audit = JSON.parse(fs.readFileSync(source, "utf8")) as Audit;
const { nodes, edges } = audit.raw_graph;
const significantPrefixes = [
  "push_axis:",
  "roll_candle:",
  "shrink:",
  "shrink_ignite:",
  "ignite:",
  "ignite_from_",
  "extinguish:",
  "extinguish_by_",
  "wick_reexposed_unlit:",
  "burn_out:",
  "light_brazier:",
  "player_died:",
  "win_",
];
const significant = (edge: Edge) => edge.events.filter((event) =>
  significantPrefixes.some((prefix) => event.startsWith(prefix))
);

const predecessor: Array<Edge | undefined> = new Array(nodes.length);
for (const edge of edges) {
  if (nodes[edge.to]!.depth === nodes[edge.from]!.depth + 1 && !predecessor[edge.to]) {
    predecessor[edge.to] = edge;
  }
}

const variants = new Map<string, Array<{ node: number; depth: number; inputs: string[] }>>();
for (const node of nodes.filter((candidate) => candidate.winning)) {
  const trace: Edge[] = [];
  let cursor = node.index;
  while (cursor !== 0) {
    const edge = predecessor[cursor];
    if (!edge) throw new Error(`missing predecessor for ${cursor}`);
    trace.push(edge);
    cursor = edge.from;
  }
  trace.reverse();
  const signature = trace
    .map((edge) => significant(edge).join("&"))
    .filter(Boolean)
    .join("||");
  const bucket = variants.get(signature) ?? [];
  bucket.push({ node: node.index, depth: node.depth, inputs: trace.map((edge) => edge.action) });
  variants.set(signature, bucket);
}

console.log(JSON.stringify({
  win_count: nodes.filter((node) => node.winning).length,
  shortest_witness_signature_count: variants.size,
  variants: [...variants.entries()].map(([signature, witnesses]) => ({
    signature,
    witness_count: witnesses.length,
    min_depth: Math.min(...witnesses.map((witness) => witness.depth)),
    max_depth: Math.max(...witnesses.map((witness) => witness.depth)),
    example: witnesses[0],
  })),
}, null, 2));

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraphEdge } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const maxStates = Number(process.argv[2] ?? 100_000);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win } as never;
const layoutPath = fileURLToPath(new URL(
  "../local_noncollinear/noncollinear_crate_vacate_v4.txt",
  import.meta.url,
));
const initial = adapter.parseLevel({
  id: "NONCOLLINEAR_CRATE_VACATE_V4",
  title: "NONCOLLINEAR_CRATE_VACATE_V4",
  layout: readFileSync(layoutPath, "utf8"),
  win: pkg.mechanic.win,
});

const graph = enumerateRuntimeGraph(
  runtime as never,
  initial as never,
  pkg.mechanic.win,
  options,
  { maxStates, terminalizeWins: true },
);
const witnesses = findHistoryWitnesses(graph);

console.log(JSON.stringify({
  layoutPath,
  maxStates,
  graph: {
    status: graph.status,
    reason: graph.reason,
    states: graph.states.length,
    transitions: graph.edges.length,
    rawWins: graph.winStateIndexes.size,
    objectWinFamilies: new Set(
      [...graph.winStateIndexes].map(index => graph.keys[index]!.replace(/^Ply:[^|]+\|/, "")),
    ).size,
  },
  witnesses,
}, null, 2));

function findHistoryWitnesses(input: typeof graph) {
  const CUT = 1;
  const REBIND = 2;
  const VERTICAL_GIANT = 4;
  const CRATE_MOVE = 8;
  const ANCHOR_MOVE = 16;
  const found = new Map<string, ReturnType<typeof compact>>();
  const outgoing = new Map<number, RuntimeGraphEdge[]>();
  for (const edge of input.edges) {
    const list = outgoing.get(edge.from) ?? [];
    list.push(edge);
    outgoing.set(edge.from, list);
  }
  const queue: Array<{ state: number; mask: number; edges: RuntimeGraphEdge[] }> = [
    { state: 0, mask: 0, edges: [] },
  ];
  const visited = new Set(["0|0"]);
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    if (input.winStateIndexes.has(current.state)) {
      const labels = [
        current.mask & CUT ? "cut" : "no_cut",
        current.mask & REBIND ? "rebind" : "no_rebind",
        current.mask & CRATE_MOVE ? "crate_move" : "no_crate_move",
        current.mask & VERTICAL_GIANT ? "vertical_giant" : "no_vertical_giant",
      ];
      const category = labels.join("+");
      if (!found.has(category)) found.set(category, compact(current.edges));
    }
    for (const edge of outgoing.get(current.state) ?? []) {
      let mask = current.mask;
      if (edge.events.some(event => event.startsWith("sticky_to_box:"))) mask |= CUT;
      if (edge.events.some(event => event.startsWith("box_to_sticky:"))) mask |= REBIND;
      if (edge.events.some(event => event.startsWith("push_object:crate#") || event.startsWith("pull_object:crate#"))) mask |= CRATE_MOVE;
      if ((edge.action === "up" || edge.action === "down") && edge.events.includes("move_sticky_rigid")) mask |= VERTICAL_GIANT;
      if (edge.events.some(event => event.startsWith("anchor_boundary_shift:"))) mask |= ANCHOR_MOVE;
      const key = `${edge.to}|${mask}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: edge.to, mask, edges: [...current.edges, edge] });
    }
  }
  return Object.fromEntries([...found.entries()].sort((a, b) => a[1].length - b[1].length));
}

function compact(edges: RuntimeGraphEdge[]) {
  return {
    length: edges.length,
    inputs: edges.map(edge => edge.action),
    nonWalk: edges
      .map((edge, index) => ({ index: index + 1, input: edge.action, events: edge.events }))
      .filter(step => step.events.some(event => event !== "walk")),
  };
}

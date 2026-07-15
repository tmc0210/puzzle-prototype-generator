import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraphEdge } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const seedName = process.argv[2] ?? "full_rebind";
const maxStates = Number(process.argv[3] ?? 50_000);
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

const cut = ["right", "right"];
const arrange = [
  "up", ...repeat("left", 4), ...repeat("up", 2), "left", ...repeat("up", 8), "right", "up",
  "left", ...repeat("down", 3), ...repeat("right", 2), "up", "left", "down",
];
const toAnchor = ["left", ...repeat("down", 8), ...repeat("right", 2), "down"];
const intendedPrefix = [...cut, ...arrange, ...toAnchor, "left", "left"];
const seeds: Record<string, string[]> = {
  initial: [],
  cut,
  setup_no_restore: [...cut, ...arrange],
  no_restore: [...cut, ...arrange, ...toAnchor],
  partial_restore: [...cut, ...arrange, ...toAnchor, "left"],
  full_rebind: intendedPrefix,
  contact_not_moved: [...cut, "up", ...repeat("left", 3), "down", "left", "left"],
  piston_not_restored_trapped: [...cut, ...arrange.slice(0, -1)],
  overcut: ["right", "right", "right"],
  initial_right_shift: ["up", ...repeat("right", 7), ...repeat("up", 7), "right"],
};
const prefix = seeds[seedName];
if (!prefix) throw new Error(`unknown seed ${seedName}`);
const seedTrace = replay(initial, prefix);
if (!seedTrace.legal) throw new Error(`illegal seed ${seedName} at ${seedTrace.legalThrough}`);

const graph = enumerateRuntimeGraph(
  runtime as never,
  seedTrace.state as never,
  pkg.mechanic.win,
  options,
  { maxStates, terminalizeWins: true },
);

console.log(JSON.stringify({
  seedName,
  prefixLength: prefix.length,
  seedNonWalk: seedTrace.nonWalk,
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
  firstWin: firstWin(graph),
  winWithoutFutureRebind: firstWin(graph, edge => !edge.events.some(event => event.startsWith("box_to_sticky:"))),
  winWithoutFutureCrateMove: firstWin(graph, edge => !edge.events.some(event => event.startsWith("push_object:crate#") || event.startsWith("pull_object:crate#"))),
  winWithoutFutureVerticalGiant: firstWin(graph, edge => !(
    (edge.action === "up" || edge.action === "down") && edge.events.includes("move_sticky_rigid")
  )),
}, null, 2));

function replay(start: unknown, inputs: string[]) {
  let state = start;
  const nonWalk: Array<{ index: number; input: string; events: string[] }> = [];
  for (const [index, input] of inputs.entries()) {
    const transition = runtime.step(state as never, input as never, options);
    if (!transition.legal) return { state, legal: false, legalThrough: index, nonWalk };
    if (transition.events.some(event => event !== "walk")) {
      nonWalk.push({ index: index + 1, input, events: transition.events });
    }
    state = transition.state;
  }
  return { state, legal: true, legalThrough: inputs.length, nonWalk };
}

function firstWin(input: typeof graph, allow: (edge: RuntimeGraphEdge) => boolean = () => true) {
  const outgoing = new Map<number, RuntimeGraphEdge[]>();
  for (const edge of input.edges) {
    if (!allow(edge)) continue;
    const list = outgoing.get(edge.from) ?? [];
    list.push(edge);
    outgoing.set(edge.from, list);
  }
  const queue: number[] = [0];
  const predecessor = new Map<number, RuntimeGraphEdge>();
  const visited = new Set([0]);
  for (let head = 0; head < queue.length; head += 1) {
    const state = queue[head]!;
    if (input.winStateIndexes.has(state)) {
      const edges: RuntimeGraphEdge[] = [];
      let cursor = state;
      while (cursor !== 0) {
        const edge = predecessor.get(cursor)!;
        edges.push(edge);
        cursor = edge.from;
      }
      edges.reverse();
      return compact(edges);
    }
    for (const edge of outgoing.get(state) ?? []) {
      if (visited.has(edge.to)) continue;
      visited.add(edge.to);
      predecessor.set(edge.to, edge);
      queue.push(edge.to);
    }
  }
  return null;
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

function repeat(input: string, count: number) {
  return Array.from({ length: count }, () => input);
}

import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

const layout = `##########
#####SB###
####LP####
##########
#..M....@#
#...MM.C.#
#G.......#
##########`;

const level: LevelDoc = { id: "one_crate_shape_search", title: "one_crate_shape_search", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win, maxStates: 200_000 }, {
  maxStates: 200_000,
  terminalizeWins: false,
});

type Edge = (typeof graph.edges)[number];
const incoming = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  const list = incoming.get(edge.to) ?? [];
  list.push(edge);
  incoming.set(edge.to, list);
}

function traceTo(target: number): string[] {
  const actions: string[] = [];
  const seen = new Set<number>();
  let cursor = target;
  while (cursor !== 0) {
    if (seen.has(cursor)) throw new Error("loop");
    seen.add(cursor);
    const edge = (incoming.get(cursor) ?? []).sort((a, b) => a.from - b.from || a.action.localeCompare(b.action))[0];
    if (!edge) throw new Error(`no predecessor ${cursor}`);
    actions.push(edge.action);
    cursor = edge.from;
  }
  return actions.reverse();
}

function parse(key: string) {
  const object = key.replace(/^Ply:[^|]+\|/, "");
  const crates = (object.match(/^C:([^|]*)\|M:/)?.[1] ?? "").split(";").filter(Boolean);
  const stickyRaw = object.match(/\|M:(.*?)\|PL:/)?.[1] ?? "";
  const components = stickyRaw ? stickyRaw.split("|").map((part) => part.split(";").filter(Boolean)) : [];
  return { crates, components };
}

function shape(cells: string[]): string {
  const pts = cells.map((cell) => cell.split(",").map(Number) as [number, number]);
  const minX = Math.min(...pts.map(([x]) => x));
  const minY = Math.min(...pts.map(([, y]) => y));
  return pts.map(([x, y]) => `${x - minX},${y - minY}`).sort().join(";");
}

const found = new Map<string, unknown>();
for (let state = 0; state < graph.keys.length; state += 1) {
  const parsed = parse(graph.keys[state]!);
  if (parsed.crates.length || parsed.components.length !== 1 || parsed.components[0]!.length !== 4) continue;
  const s = shape(parsed.components[0]!);
  if (found.has(s)) continue;
  const trace = traceTo(state);
  found.set(s, { state, steps: trace.length, key: graph.keys[state], trace });
}

console.log(JSON.stringify({ layout, graph: { status: graph.status, states: graph.keys.length, transitions: graph.edges.length }, shapes: Object.fromEntries(found) }, null, 2));

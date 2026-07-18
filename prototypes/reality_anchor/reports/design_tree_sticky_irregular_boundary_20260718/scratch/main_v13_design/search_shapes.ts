import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

type Edge = { from: number; to: number; action: string };

function makeLayout(topX: number, bottomX: number): string {
  const rows = [
    "##########".split(""),
    "#####SB###".split(""),
    "####LP####".split(""),
    "##########".split(""),
    "#.......@#".split(""),
    "#........#".split(""),
    "#G.......#".split(""),
    "##########".split(""),
  ];
  rows[4]![topX] = "M";
  rows[5]![bottomX] = "M";
  rows[4]![7] = "C";
  rows[5]![7] = "C";
  return rows.map((row) => row.join("")).join("\n");
}

function parseObjectKey(key: string) {
  const object = key.replace(/^Ply:[^|]+\|/, "");
  const crateMatch = object.match(/^C:([^|]*)\|M:/);
  const stickyMatch = object.match(/\|M:(.*?)\|PL:/);
  const crates = (crateMatch?.[1] ?? "").split(";").filter(Boolean);
  const stickyRaw = stickyMatch?.[1] ?? "";
  const components = stickyRaw ? stickyRaw.split("|").map((part) => part.split(";").filter(Boolean)) : [];
  return { crates, components };
}

function normalizedShape(cells: string[]): string {
  const points = cells.map((cell) => cell.split(",").map(Number) as [number, number]);
  const minX = Math.min(...points.map(([x]) => x));
  const minY = Math.min(...points.map(([, y]) => y));
  return points
    .map(([x, y]) => `${x - minX},${y - minY}`)
    .sort()
    .join(";");
}

function traceToState(initial: number, target: number, edges: Edge[]): string[] {
  const incoming = new Map<number, Edge[]>();
  for (const edge of edges) {
    const list = incoming.get(edge.to) ?? [];
    list.push(edge);
    incoming.set(edge.to, list);
  }
  const actions: string[] = [];
  let cursor = target;
  const seen = new Set<number>();
  while (cursor !== initial) {
    if (seen.has(cursor)) throw new Error("predecessor loop");
    seen.add(cursor);
    const edge = (incoming.get(cursor) ?? []).sort((a, b) => a.from - b.from || a.action.localeCompare(b.action))[0];
    if (!edge) throw new Error(`no predecessor for ${cursor}`);
    actions.push(edge.action);
    cursor = edge.from;
  }
  return actions.reverse();
}

const results: unknown[] = [];
for (let topX = 2; topX <= 5; topX += 1) {
  for (let bottomX = 2; bottomX <= 5; bottomX += 1) {
    if (topX === bottomX) continue;
    const layout = makeLayout(topX, bottomX);
    const level: LevelDoc = {
      id: `shape_${topX}_${bottomX}`,
      title: `shape_${topX}_${bottomX}`,
      layout,
      win: pkg.mechanic.win,
    };
    const initial = adapter.parseLevel(level);
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win, maxStates: 80_000 }, {
      maxStates: 80_000,
      terminalizeWins: false,
    });
    const shapes = new Map<string, { state: number; key: string; trace: string[] }>();
    for (let state = 0; state < graph.keys.length; state += 1) {
      const parsed = parseObjectKey(graph.keys[state]!);
      if (parsed.crates.length !== 0 || parsed.components.length !== 1 || parsed.components[0]!.length !== 4) continue;
      const shape = normalizedShape(parsed.components[0]!);
      if (shapes.has(shape)) continue;
      shapes.set(shape, { state, key: graph.keys[state]!, trace: traceToState(0, state, graph.edges as Edge[]) });
    }
    if (shapes.size > 0) {
      results.push({ topX, bottomX, graph: { status: graph.status, states: graph.keys.length }, layout, shapes: Object.fromEntries(shapes) });
    }
  }
}

console.log(JSON.stringify(results, null, 2));

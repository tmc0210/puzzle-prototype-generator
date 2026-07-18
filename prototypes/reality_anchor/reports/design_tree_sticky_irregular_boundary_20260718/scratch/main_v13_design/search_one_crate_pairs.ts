import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const wanted = new Set(["0,0;1,0;1,1;2,1", "0,1;1,0;1,1;2,0"]);

function layoutFor(singleX: number, dominoX: number) {
  const rows = [
    "##########".split(""),
    "#####SB###".split(""),
    "####LP####".split(""),
    "##########".split(""),
    "#.......@#".split(""),
    "#......C.#".split(""),
    "#G.......#".split(""),
    "##########".split(""),
  ];
  rows[4]![singleX] = "M";
  rows[5]![dominoX] = "M";
  rows[5]![dominoX + 1] = "M";
  return rows.map((row) => row.join("")).join("\n");
}

function parsed(key: string) {
  const object = key.replace(/^Ply:[^|]+\|/, "");
  const crates = (object.match(/^C:([^|]*)\|M:/)?.[1] ?? "").split(";").filter(Boolean);
  const stickyRaw = object.match(/\|M:(.*?)\|PL:/)?.[1] ?? "";
  const components = stickyRaw ? stickyRaw.split("|").map((part) => part.split(";").filter(Boolean)) : [];
  return { crates, components };
}

function shape(cells: string[]) {
  const pts = cells.map((cell) => cell.split(",").map(Number) as [number, number]);
  const minX = Math.min(...pts.map(([x]) => x));
  const minY = Math.min(...pts.map(([, y]) => y));
  return pts.map(([x, y]) => `${x - minX},${y - minY}`).sort().join(";");
}

const rows: unknown[] = [];
for (let singleX = 2; singleX <= 5; singleX += 1) {
  for (let dominoX = 1; dominoX <= 5; dominoX += 1) {
    if (singleX === dominoX || singleX === dominoX + 1) continue;
    const layout = layoutFor(singleX, dominoX);
    const level: LevelDoc = { id: `pair_${singleX}_${dominoX}`, title: "pair", layout, win: pkg.mechanic.win };
    const initial = adapter.parseLevel(level);
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win, maxStates: 80_000 }, {
      maxStates: 80_000,
      terminalizeWins: false,
    });
    const incoming = new Map<number, (typeof graph.edges)[number][]>();
    for (const edge of graph.edges) {
      const list = incoming.get(edge.to) ?? [];
      list.push(edge);
      incoming.set(edge.to, list);
    }
    const trace = (target: number) => {
      const actions: string[] = [];
      let cursor = target;
      while (cursor !== 0) {
        const edge = (incoming.get(cursor) ?? []).sort((a, b) => a.from - b.from || a.action.localeCompare(b.action))[0];
        if (!edge) throw new Error(`no predecessor ${cursor}`);
        actions.push(edge.action);
        cursor = edge.from;
      }
      return actions.reverse();
    };
    const found = new Map<string, unknown>();
    for (let state = 0; state < graph.keys.length; state += 1) {
      const p = parsed(graph.keys[state]!);
      if (p.crates.length || p.components.length !== 1 || p.components[0]!.length !== 4) continue;
      const s = shape(p.components[0]!);
      if (!wanted.has(s) || found.has(s)) continue;
      const actions = trace(state);
      found.set(s, { steps: actions.length, key: graph.keys[state], trace: actions });
    }
    if (found.size) rows.push({ singleX, dominoX, graph: { status: graph.status, states: graph.keys.length }, layout, outcomes: Object.fromEntries(found) });
  }
}
console.log(JSON.stringify(rows, null, 2));

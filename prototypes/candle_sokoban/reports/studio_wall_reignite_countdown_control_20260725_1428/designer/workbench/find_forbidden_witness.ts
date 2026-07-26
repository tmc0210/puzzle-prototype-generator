import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2]!;
const layout = `${(await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "forbidden-witness", title: "forbidden-witness", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 300000, terminalizeWins: true });
const parent = new Map<number, { from: number; action: string; events: string[] }>();
for (const edge of graph.edges) if (!parent.has(edge.to)) parent.set(edge.to, { from: edge.from, action: edge.action, events: edge.events });
for (const edge of graph.edges) {
  const hits = edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event));
  if (hits.length === 0) continue;
  const links: Array<{ action: string; events: string[]; to: string }> = [];
  let at = edge.from;
  while (at !== 0 && parent.has(at)) {
    const link = parent.get(at)!;
    links.push({ action: link.action, events: link.events, to: graph.keys[at]! });
    at = link.from;
  }
  links.reverse();
  links.push({ action: edge.action, events: edge.events, to: graph.keys[edge.to]! });
  console.log(JSON.stringify({ hit: hits, from: graph.keys[edge.from], to: graph.keys[edge.to], path: links }, null, 2));
  break;
}

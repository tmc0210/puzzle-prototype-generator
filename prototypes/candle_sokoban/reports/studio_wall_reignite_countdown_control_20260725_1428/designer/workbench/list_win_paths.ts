import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layout = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel({ id: "list-win", title: "list-win", layout, global_burn_cycle: 5, win: pkg.mechanic.win });
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 100000, terminalizeWins: true });
const parent = new Map<number, { from: number; action: string; events: string[] }>();
for (const edge of graph.edges) if (!parent.has(edge.to)) parent.set(edge.to, { from: edge.from, action: edge.action, events: edge.events });
function signature(key: string): string { return key.split("|C:")[1]?.split("|B:")[0] ?? key; }
const wins = [...graph.winStateIndexes].map((index) => ({ index, key: graph.keys[index]!, signature: signature(graph.keys[index]!) }));
for (const item of wins) {
  const path: Array<{ step: number; action: string; events: string[]; key: string }> = [];
  let at = item.index;
  while (at > 0) { const p = parent.get(at); if (!p) break; path.push({ step: path.length + 1, action: p.action, events: p.events, key: graph.keys[at]! }); at = p.from; }
  path.reverse();
  const relevant = path.filter((step) => step.events.some((event) => /light_brazier|ignite_from_brazier|burn_out|win_all/.test(event)));
  console.log(JSON.stringify({ ...item, relevant }));
}

import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
const layout = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban"); const adapter = getRuntimeAdapter(pkg.mechanic); const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel({ id: "sum-win", title: "sum-win", layout, global_burn_cycle: 5, win: pkg.mechanic.win });
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 100000, terminalizeWins: true });
const parent = new Map<number, { from: number; action: string; events: string[] }>(); for (const e of graph.edges) if (!parent.has(e.to)) parent.set(e.to, { from: e.from, action: e.action, events: e.events });
function sig(k: string): string { return k.split("|C:")[1]?.split("|B:")[0] ?? k; }
const seen = new Set<string>();
for (const index of graph.winStateIndexes) {
  const signature = sig(graph.keys[index]!); if (seen.has(signature)) continue; seen.add(signature);
  const path: Array<{ action: string; events: string[]; key: string }> = []; let at = index;
  while (at > 0) { const p = parent.get(at); if (!p) break; path.push({ action: p.action, events: p.events, key: graph.keys[at]! }); at = p.from; }
  path.reverse();
  console.log(JSON.stringify({ signature, steps: path.length, actions: path.map((x) => x.action).join(","), relevant: path.map((x, i) => ({ step: i + 1, action: x.action, events: x.events.filter((e) => /light_brazier|ignite_from_brazier|burn_out|win_all/.test(e)), key: x.key })).filter((x) => x.events.length > 0) }));
}

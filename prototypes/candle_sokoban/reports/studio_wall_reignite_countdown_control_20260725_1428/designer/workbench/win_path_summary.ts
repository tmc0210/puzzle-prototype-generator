import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
const layout = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const wanted = process.argv[3] ?? "";
const pkg = await loadPrototypePackage("prototypes/candle_sokoban"); const adapter = getRuntimeAdapter(pkg.mechanic); const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel({ id: "win-summary", title: "win-summary", layout, global_burn_cycle: 5, win: pkg.mechanic.win });
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 100000, terminalizeWins: true });
const index = [...graph.winStateIndexes].find((candidate) => graph.keys[candidate]!.includes(wanted));
const parent = new Map<number, { from: number; action: string; events: string[] }>(); for (const edge of graph.edges) if (!parent.has(edge.to)) parent.set(edge.to, { from: edge.from, action: edge.action, events: edge.events });
const path: Array<{ step: number; action: string; events: string[]; key: string }> = []; let at = index ?? -1;
while (at > 0) { const link = parent.get(at); if (!link) break; path.push({ step: path.length + 1, action: link.action, events: link.events, key: graph.keys[at]! }); at = link.from; }
console.log(JSON.stringify({ status: graph.status, index, key: index === undefined ? null : graph.keys[index], path: path.reverse() }, null, 2));

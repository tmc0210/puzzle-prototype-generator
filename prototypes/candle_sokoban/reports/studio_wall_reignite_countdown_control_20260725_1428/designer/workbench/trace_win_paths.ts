import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
const layout = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`; const wanted = process.argv[3] ?? "";
const pkg = await loadPrototypePackage("prototypes/candle_sokoban"); const adapter = getRuntimeAdapter(pkg.mechanic); const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel({ id: "trace-win", title: "trace-win", layout, global_burn_cycle: 5, win: pkg.mechanic.win }); const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 100000, terminalizeWins: true });
const parent = new Map<number, { from: number; action: string; events: string[] }>(); for (const e of graph.edges) if (!parent.has(e.to)) parent.set(e.to, { from: e.from, action: e.action, events: e.events });
function sig(k: string): string { return k.split("|C:")[1]?.split("|B:")[0] ?? k; }
const index = [...graph.winStateIndexes].find((i) => sig(graph.keys[i]!).includes(wanted)); if (index === undefined) throw new Error("no matching win"); const path: Array<{ action: string; events: string[]; key: string }> = []; let at = index; while (at > 0) { const p = parent.get(at); if (!p) break; path.push({ action: p.action, events: p.events, key: graph.keys[at]! }); at = p.from; } path.reverse();
path.forEach((x, i) => { const p = x.key.match(/^P:([^|]+)/)?.[1] ?? "?"; const t = x.key.match(/\|T:([^|]+)/)?.[1] ?? "?"; console.log(JSON.stringify({ step: i + 1, action: x.action, p, t, events: x.events })); });

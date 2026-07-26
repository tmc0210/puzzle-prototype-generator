import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
const source = (await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd(); const rows = source.split("\n");
const pkg = await loadPrototypePackage("prototypes/candle_sokoban"); const adapter = getRuntimeAdapter(pkg.mechanic); const runtime = adapter.createRuntime(pkg.mechanic); const options = { winCondition: pkg.mechanic.win };
function setCell(layout: string, cell: string): string { const [x, y] = cell.split(",").map(Number); const rs = layout.split("\n"); const row = rs[y]!; rs[y] = row.slice(0, x) + "#" + row.slice(x + 1); return rs.join("\n"); }
function sig(key: string): string { return key.split("|C:")[1]?.split("|B:")[0] ?? key; }
const cells: string[] = []; for (let y = 4; y <= 9; y++) for (let x = 5; x <= 12; x++) if (rows[y]?.[x] === ".") cells.push(`${x},${y}`);
for (let y = 9; y <= 18; y++) for (let x = 8; x <= 12; x++) if (rows[y]?.[x] === ".") cells.push(`${x},${y}`);
const combos: string[][] = cells.map((c) => [c]);
let tried = 0;
for (const cuts of combos) {
  tried++; let layout = source; try { for (const c of cuts) layout = setCell(layout, c); const initial = adapter.parseLevel({ id: "cut115", title: "cut115", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win }); const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 30000, maxDepth: 120 }); if (!solution.found) continue; const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win); const ev = replay.steps.flatMap((s) => s.events); if (!replay.final.isWin || !ev.some((e) => e.startsWith("extinguish_by_wall")) || !ev.some((e) => e.startsWith("ignite_from_brazier"))) continue; const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 30000, terminalizeWins: true }); if (graph.status !== "complete") continue; const forbidden = graph.edges.flatMap((e) => e.events.filter((e) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(e))); if (forbidden.length) continue; const wins = [...graph.winStateIndexes].map((i) => graph.keys[i]!); const signatures = [...new Set(wins.map(sig))]; if (signatures.length <= 2) console.error(`cuts=${cuts.join(" ")} depth=${solution.inputs.length} states=${graph.keys.length} wins=${wins.length} sigs=${signatures.join(" || ")}`); if (signatures.length === 1) { console.log(JSON.stringify({ cuts, depth: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: wins.length, signatures, inputs: solution.inputs, layout: `${layout}\n` }, null, 2)); process.exit(0); } } catch { /* skip */ }
  if (tried % 100 === 0) console.error(`tried ${tried}/${combos.length}`);
}
console.log("NO_UNIQUE");

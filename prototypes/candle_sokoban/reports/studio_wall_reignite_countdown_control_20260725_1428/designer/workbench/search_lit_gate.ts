import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
const base = (await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage("prototypes/candle_sokoban"); const adapter = getRuntimeAdapter(pkg.mechanic); const runtime = adapter.createRuntime(pkg.mechanic); const options = { winCondition: pkg.mechanic.win };
function setCell(layout: string, x: number, y: number, g: string) { const rows = layout.split("\n"); const row = rows[y]!; rows[y] = `${row.slice(0,x)}${g}${row.slice(x+1)}`; return rows.join("\n"); }
function sig(k: string) { return k.split("|C:")[1]?.split("|B:")[0] ?? k; }
function test(layout: string) {
  const level: LevelDoc = { id: "lit-gate", title: "lit-gate", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win };
  let initial; try { initial = adapter.parseLevel(level); } catch { return null; }
  const sol = solveWithRuntime(runtime, initial, { ...options, maxStates: 80000, maxDepth: 200 }); if (!sol.found) return null;
  const rep = replayInputSequence(adapter, runtime, initial, sol.inputs, options, pkg.mechanic.win); const ev = rep.steps.flatMap(s => s.events);
  if (!rep.final.isWin || !ev.some(e => e.startsWith("extinguish_by_wall")) || !ev.some(e => e.startsWith("ignite_from_brazier"))) return null;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 80000, terminalizeWins: true }); if (graph.status !== "complete") return null;
  const forbidden = graph.edges.flatMap(e => e.events.filter(x => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(x))); if (forbidden.length) return null;
  const signatures = [...new Set([...graph.winStateIndexes].map(i => sig(graph.keys[i]!)))];
  return { depth: sol.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, signatures, inputs: sol.inputs, events: ev, layout: `${layout}\n` };
}
const rows = base.split("\n"); const cells: Array<[number,number]> = [];
for (let y=8;y<=18;y++) for(let x=7;x<=12;x++) if(rows[y]![x] === ".") cells.push([x,y]);
for (const [x,y] of cells) {
  const result = test(setCell(base,x,y,"R"));
  if (result && result.signatures.length === 1) { console.log(JSON.stringify({gate:[x,y],...result},null,2)); process.exit(0); }
  console.error(`${x},${y} ${result ? result.signatures.length : "no"}`);
}
console.log("NO_UNIQUE");

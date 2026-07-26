import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const source = (await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
function setCell(layout: string, cell: string, glyph: string): string {
  const [x, y] = cell.split(",").map(Number);
  const rows = layout.split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return rows.join("\n");
}
const cells = ["10,3", "10,4", "10,7", "11,4", "11,5", "11,6", "11,7", "12,7", "7,2", "7,3", "7,4", "7,5", "7,6", "10,14", "10,15", "10,16", "10,17", "12,14", "12,15", "12,16", "12,17"];
const cuts: string[][] = [[], ...cells.map((cell) => [cell])];
for (let i = 0; i < cells.length; i += 1) for (let j = i + 1; j < cells.length; j += 1) cuts.push([cells[i]!, cells[j]!]);
for (const chosen of cuts) {
  let layout = source;
  try {
    for (const cell of chosen) layout = setCell(layout, cell, "#");
    const level: LevelDoc = { id: "exact-cut", title: "exact-cut", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win };
    const initial = adapter.parseLevel(level);
    const options = { winCondition: pkg.mechanic.win };
    const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 150000, maxDepth: 180 });
    if (!solution.found) continue;
    const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
    const events = replay.steps.flatMap((step) => step.events);
    if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier"))) continue;
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 150000, terminalizeWins: true });
    if (graph.status !== "complete") continue;
    const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
    const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
    const signatures = [...new Set(wins.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
    console.log(JSON.stringify({ chosen, routeSteps: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: wins.length, forbidden: [...new Set(forbidden)], signatures, inputs: solution.inputs }, null, 2));
  } catch {
    // Skip invalid walls.
  }
}

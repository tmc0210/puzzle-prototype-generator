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
const cells = ["5,7", "6,7", "7,7", "8,7", "9,7", "10,7", "11,7", "11,8", "11,9", "8,8", "8,10", "11,6"];
const patterns: string[][] = [[]];
for (let i = 0; i < cells.length; i += 1) patterns.push([cells[i]!]);
for (let i = 0; i < cells.length; i += 1) for (let j = i + 1; j < cells.length; j += 1) patterns.push([cells[i]!, cells[j]!]);
for (const walls of patterns) {
  let layout = source;
  try {
    for (const cell of walls) layout = setCell(layout, cell, "#");
    const level: LevelDoc = { id: "corridor-cut", title: "corridor-cut", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win };
    const initial = adapter.parseLevel(level);
    const options = { winCondition: pkg.mechanic.win };
    const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 70000, maxDepth: 240 });
    if (!solution.found) continue;
    const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
    const events = replay.steps.flatMap((step) => step.events);
    if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier"))) continue;
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 70000, terminalizeWins: true });
    if (graph.status !== "complete") continue;
    const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
    if (forbidden.length > 0) continue;
    const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
    const signatures = [...new Set(wins.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
    console.log(JSON.stringify({ walls, routeSteps: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: wins.length, signatures, inputs: solution.inputs, layout: `${layout}\n` }, null, 2));
    if (signatures.length === 1) process.exit(0);
  } catch {
    // Skip malformed cuts.
  }
}

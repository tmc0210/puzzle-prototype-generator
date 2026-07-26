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
  const rows = layout.split("\n"); const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`; return rows.join("\n");
}
const rows = source.split("\n");
const cells: string[] = [];
for (let y = 9; y <= 18; y += 1) for (let x = 5; x <= 13; x += 1) {
  if (rows[y]?.[x] === ".") cells.push(`${x},${y}`);
}
const patterns: string[][] = [[]];
for (let i = 0; i < cells.length; i += 1) patterns.push([cells[i]!]);
for (let i = 0; i < cells.length; i += 1) for (let j = i + 1; j < cells.length; j += 1) patterns.push([cells[i]!, cells[j]!]);
const options = { winCondition: pkg.mechanic.win };
for (const walls of patterns) {
  let layout = source;
  try {
    for (const cell of walls) layout = setCell(layout, cell, "#");
    const level: LevelDoc = { id: "lower-unique", title: "lower-unique", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win };
    const initial = adapter.parseLevel(level);
    const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 30000, maxDepth: 180 });
    if (!solution.found) continue;
    const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
    const events = replay.steps.flatMap((step) => step.events);
    if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier"))) continue;
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 30000, terminalizeWins: true });
    if (graph.status !== "complete") continue;
    const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
    if (forbidden.length > 0) continue;
    const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
    const signatures = [...new Set(wins.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
    console.log(JSON.stringify({ walls, depth: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: wins.length, signatures, inputs: solution.inputs, layout: `${layout}\n` }, null, 2));
    if (signatures.length === 1) process.exit(0);
  } catch {
    // malformed candidate
  }
}

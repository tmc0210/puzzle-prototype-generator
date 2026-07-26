import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const source = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
function setCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.trimEnd().split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return `${rows.join("\n")}\n`;
}
const cells = [
  ...[2, 3, 4, 5].map((y) => `9,${y}`),
  ...[2, 3, 4, 5].map((y) => `10,${y}`),
  ...[2, 3, 4, 5].map((y) => `11,${y}`),
  ...[2, 3, 4, 5].map((y) => `6,${y}`),
];
for (const cell of cells) {
  const [x, y] = cell.split(",").map(Number);
  const layout = setCell(source, x!, y!, "#");
  try {
    const level: LevelDoc = { id: "axis-cut", title: "axis-cut", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
    const initial = adapter.parseLevel(level);
    const options = { winCondition: pkg.mechanic.win };
    const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 300000, maxDepth: 200 });
    if (!solution.found) continue;
    const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
    if (!replay.final.isWin) continue;
    const events = replay.steps.flatMap((step) => step.events);
    if (!events.some((event) => event.startsWith("extinguish_by_wall")) ||
        !events.some((event) => event.startsWith("ignite_from_brazier")) ||
        !events.includes("win_all_braziers_lit")) continue;
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 300000, terminalizeWins: true });
    const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
    if (graph.status !== "complete" || forbidden.length > 0) continue;
    const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
    const signatures = [...new Set(wins.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
    console.log(JSON.stringify({ cut: cell, routeSteps: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, signatures, inputs: solution.inputs, layout }, null, 2));
  } catch {
    // Skip invalid static cuts.
  }
}

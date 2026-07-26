import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const path = "D:/Developer/sokoban/prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench/candle_shared_fire_wall_timing_20260725_1428_constrained.layout";
const base = (await readFile(path, "utf8")).replace(/\r/g, "").trimEnd().split("\n");
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
function setCell(rows: string[], x: number, y: number, glyph: string): void {
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
}
const baseCandidates = [
  "9,14", "10,14", "11,14", "12,14", "9,15", "10,15", "11,15", "12,15",
  "9,16", "10,16", "11,16", "9,17", "10,17", "11,17", "9,18", "10,18", "11,18", "12,18",
  "6,4", "7,4", "9,4", "10,4", "11,4", "7,5", "9,5", "10,5",
];
for (const target of baseCandidates) {
  const rows = [...base];
  // Retain only candle#3 and the initially lit source; all target candidates are rebuilt below.
  setCell(rows, 6, 4, ".");
  for (let y = 10; y <= 13; y += 1) setCell(rows, 11, y, ".");
  setCell(rows, 9, 15, ".");
  setCell(rows, 10, 18, ".");
  const [x, y] = target.split(",").map(Number);
  if (rows[y]![x!] === "#" || (x === 7 && y === 1) || (x === 8 && y >= 3 && y <= 7) || (x === 8 && y === 9)) continue;
  setCell(rows, x!, y!, "o");
  const layout = `${rows.join("\n")}\n`;
  try {
    const level: LevelDoc = { id: "single-candle-full-search", title: "single-candle-full-search", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
    const initial = adapter.parseLevel(level);
    const options = { winCondition: pkg.mechanic.win };
    const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 160000, maxDepth: 180 });
    if (!solution.found) continue;
    const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
    const events = replay.steps.flatMap((step) => step.events);
    if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier"))) continue;
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 160000, terminalizeWins: true });
    const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
    if (graph.status !== "complete" || forbidden.length > 0) continue;
    const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
    const signatures = [...new Set(wins.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
    console.log(JSON.stringify({ target, routeSteps: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: wins.length, signatures, inputs: solution.inputs, layout }, null, 2));
  } catch {
    // Skip invalid mutations.
  }
}

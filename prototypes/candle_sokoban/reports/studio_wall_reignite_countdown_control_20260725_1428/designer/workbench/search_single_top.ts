import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const baseRows = [
  "##############",
  "#######O######",
  "#######...####",
  "#######.U..###",
  "######..3...##",
  "######..3.#.##",
  "######..3##.##",
  "#####...3...##",
  "########.##.##",
  "########@##.##",
  "##############",
  "##############",
  "##############",
  "##############",
  "##############",
];
const candidates = [
  "6,2", "8,2", "9,2", "7,3", "9,3", "10,3", "6,4", "9,4", "10,4", "11,4",
  "6,5", "7,5", "10,5", "6,6", "7,6", "10,6", "11,7", "10,7", "9,7",
];
function setCell(rows: string[], cell: string, glyph: string): void {
  const [x, y] = cell.split(",").map(Number);
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
}
for (const target of candidates) {
  const rows = [...baseRows];
  setCell(rows, target, "o");
  const layout = `${rows.join("\n")}\n`;
  try {
    const level: LevelDoc = { id: "single-top-search", title: "single-top-search", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
    const initial = adapter.parseLevel(level);
    const options = { winCondition: pkg.mechanic.win };
    const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 100000, maxDepth: 150 });
    if (!solution.found) continue;
    const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
    const events = replay.steps.flatMap((step) => step.events);
    if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier"))) continue;
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 100000, terminalizeWins: true });
    const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
    const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
    const signatures = [...new Set(wins.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
    if (graph.status === "complete" && forbidden.length === 0) {
      console.log(JSON.stringify({ target, routeSteps: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: wins.length, signatures, inputs: solution.inputs, layout }, null, 2));
    }
  } catch {
    // Skip occupied or otherwise invalid target cells.
  }
}

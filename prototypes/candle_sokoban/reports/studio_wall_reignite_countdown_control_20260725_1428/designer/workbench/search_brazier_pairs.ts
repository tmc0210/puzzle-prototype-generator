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

function setCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return rows.join("\n");
}

function glyphAt(layout: string, x: number, y: number): string {
  return layout.split("\n")[y]![x]!;
}

const candidateCells = [
  ...[10, 11, 12, 13].flatMap((x) => [14, 15, 16, 17, 18].map((y) => `${x},${y}`)),
];

for (const sourceCell of candidateCells) {
  for (const targetCell of candidateCells) {
    if (sourceCell === targetCell) continue;
    const [sx, sy] = sourceCell.split(",").map(Number);
    const [tx, ty] = targetCell.split(",").map(Number);
    const current = candidateCells.filter((cell) => glyphAt(source, ...cell.split(",").map(Number) as [number, number]) === "O" || glyphAt(source, ...cell.split(",").map(Number) as [number, number]) === "o");
    if (current.length !== 2) throw new Error("expected lower brazier pair");
    let layout = source;
    for (const cell of current) {
      const [x, y] = cell.split(",").map(Number);
      layout = setCell(layout, x!, y!, ".");
    }
    if (glyphAt(layout, sx!, sy!) !== "." || glyphAt(layout, tx!, ty!) !== ".") continue;
    layout = setCell(layout, sx!, sy!, "O");
    layout = setCell(layout, tx!, ty!, "o");
    try {
      const level: LevelDoc = { id: "brazier-pair", title: "brazier-pair", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win };
      const initial = adapter.parseLevel(level);
      const options = { winCondition: pkg.mechanic.win };
      const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 90000, maxDepth: 180 });
      if (!solution.found) continue;
      const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
      const events = replay.steps.flatMap((step) => step.events);
      if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier")) || !events.includes("win_all_braziers_lit")) continue;
      const canonicalForbidden = events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event));
      if (canonicalForbidden.length > 0) continue;
      const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 90000, terminalizeWins: true });
      if (graph.status !== "complete") continue;
      const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
      if (forbidden.length > 0) continue;
      const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
      const signatures = [...new Set(wins.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
      console.log(JSON.stringify({ sourceCell, targetCell, routeSteps: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: wins.length, signatures, inputs: solution.inputs, layout: `${layout}\n` }, null, 2));
      if (signatures.length === 1) process.exit(0);
    } catch {
      // Skip malformed or unreachable mutations.
    }
  }
}

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
const targets = ["5,3", "6,3", "7,3", "9,3", "10,3", "11,3", "5,4", "6,4", "7,4", "9,4", "10,4", "11,4", "5,5", "6,5", "7,5", "9,5", "10,5", "11,5", "5,6", "6,6", "7,6", "9,6", "10,6", "11,6", "5,7", "6,7", "7,7", "9,7", "10,7", "11,7"];
const rows = source.split("\n");
const currentY = rows.findIndex((row, index) => index < 9 && row.includes("o"));
const currentX = currentY >= 0 ? rows[currentY]!.indexOf("o") : -1;
for (const target of targets) {
  if (currentX < 0 || currentY < 0) continue;
  let layout = setCell(source, currentX, currentY, ".");
  const [x, y] = target.split(",").map(Number);
  if (layout.split("\n")[y]![x!] !== ".") continue;
  layout = `${setCell(layout, x!, y!, "o")}\n`;
  try {
    const level: LevelDoc = { id: "top-target-mutation", title: "top-target-mutation", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
    const initial = adapter.parseLevel(level);
    const options = { winCondition: pkg.mechanic.win };
    const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 100000, maxDepth: 180 });
    if (!solution.found) continue;
    const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
    const events = replay.steps.flatMap((step) => step.events);
    if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier"))) continue;
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 100000, terminalizeWins: true });
    if (graph.status !== "complete") continue;
    const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
    if (forbidden.length > 0) continue;
    const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
    const signatures = [...new Set(wins.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
    console.log(JSON.stringify({ target, routeSteps: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: wins.length, signatures, inputs: solution.inputs, layout }, null, 2));
  } catch {
    // Skip invalid target cells.
  }
}

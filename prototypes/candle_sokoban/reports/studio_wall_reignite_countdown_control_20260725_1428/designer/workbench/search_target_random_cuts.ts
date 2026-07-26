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
const baseRows = source.split("\n");
const currentY = baseRows.findIndex((row, index) => index > 9 && row.includes("o"));
const currentX = currentY >= 0 ? baseRows[currentY]!.indexOf("o") : -1;
const candidates = ["9,14", "9,15", "9,16", "9,17", "9,18", "10,14", "10,15", "10,16", "10,17", "10,18", "11,14", "11,15", "12,14", "12,15"];
let seed = 2026072511;
function rand(): number { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x100000000; }
for (let iteration = 0; iteration < 300; iteration += 1) {
  const target = candidates[Math.floor(rand() * candidates.length)]!;
  let layout = setCell(source, currentX, currentY, ".");
  const [tx, ty] = target.split(",").map(Number);
  const targetRows = layout.split("\n");
  if (targetRows[ty]![tx!] === "#") continue;
  layout = setCell(layout, tx!, ty!, "o");
  const available: string[] = [];
  const rows = layout.split("\n");
  for (let y = 1; y < rows.length - 1; y += 1) for (let x = 1; x < rows[y]!.length - 1; x += 1) {
    const glyph = rows[y]![x]!;
    if (glyph === ".") available.push(`${x},${y}`);
  }
  const count = 1 + Math.floor(rand() * 8);
  const cuts = new Set<string>();
  while (cuts.size < count) cuts.add(available[Math.floor(rand() * available.length)]!);
  for (const cell of cuts) { const [x, y] = cell.split(",").map(Number); layout = setCell(layout, x!, y!, "#"); }
  try {
    const level: LevelDoc = { id: "target-random-cut", title: "target-random-cut", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win };
    const initial = adapter.parseLevel(level);
    const options = { winCondition: pkg.mechanic.win };
    const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 120000, maxDepth: 180 });
    if (!solution.found) continue;
    const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
    const events = replay.steps.flatMap((step) => step.events);
    if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier"))) continue;
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 120000, terminalizeWins: true });
    if (graph.status !== "complete") continue;
    const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
    if (forbidden.length > 0) continue;
    const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
    const signatures = [...new Set(wins.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
    console.log(JSON.stringify({ iteration, target, cuts: [...cuts].sort(), routeSteps: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: wins.length, signatures, inputs: solution.inputs, layout: `${layout}\n` }, null, 2));
    if (signatures.length === 1) break;
  } catch {
    // Skip invalid mutation.
  }
}

import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const base = (await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
function setCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return rows.join("\n");
}
const rows = base.split("\n");
const blocked = new Set<string>();
for (let y = 0; y < rows.length; y += 1) for (let x = 0; x < rows[y]!.length; x += 1) {
  const glyph = rows[y]![x]!;
  if (glyph !== ".") blocked.add(`${x},${y}`);
}
const cells: string[] = [];
for (let y = 1; y < rows.length - 1; y += 1) for (let x = 1; x < rows[y]!.length - 1; x += 1) {
  const cell = `${x},${y}`;
  if (!blocked.has(cell)) cells.push(cell);
}
let seed = 2026072501;
function rand(): number { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x100000000; }
const tried = new Set<string>();
for (let iteration = 0; iteration < 180; iteration += 1) {
  const count = 1 + Math.floor(rand() * 7);
  const chosen = new Set<string>();
  while (chosen.size < count) chosen.add(cells[Math.floor(rand() * cells.length)]!);
  const cuts = [...chosen].sort();
  const signature = cuts.join(" ");
  if (tried.has(signature)) continue;
  tried.add(signature);
  let layout = base;
  for (const cell of cuts) { const [x, y] = cell.split(",").map(Number); layout = setCell(layout, x!, y!, "#"); }
  try {
    const level: LevelDoc = { id: "random-cut", title: "random-cut", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win };
    const initial = adapter.parseLevel(level);
    const options = { winCondition: pkg.mechanic.win };
    const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 180000, maxDepth: 180 });
    if (!solution.found) continue;
    const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
    const events = replay.steps.flatMap((step) => step.events);
    if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier")) || !events.some((event) => event.startsWith("light_brazier"))) continue;
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 180000, terminalizeWins: true });
    if (graph.status !== "complete") continue;
    const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
    if (forbidden.length > 0) continue;
    const wins = [...graph.winStateIndexes].map((index) => graph.keys[index]!);
    const signatures = [...new Set(wins.map((key) => key.split("|C:")[1]?.split("|B:")[0] ?? key))];
    if (signatures.length !== 1) continue;
    console.log(JSON.stringify({ iteration, cuts, routeSteps: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: wins.length, signatures, inputs: solution.inputs, layout: `${layout}\n` }, null, 2));
    break;
  } catch {
    // Skip invalid random mutations.
  }
}

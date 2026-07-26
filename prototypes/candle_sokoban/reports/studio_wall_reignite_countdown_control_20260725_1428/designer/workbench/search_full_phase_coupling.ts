import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const source = (await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd();
const rows = source.split("\n");
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win };
const forbiddenPattern = /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite|extinguish_by_candle_body)/;
function cellKey(x: number, y: number): string { return `${x},${y}`; }
function setCell(layout: string, x: number, y: number, glyph: string): string {
  const next = layout.split("\n");
  const row = next[y]!;
  next[y] = row.slice(0, x) + glyph + row.slice(x + 1);
  return next.join("\n");
}
function signature(key: string): string { return key.split("|C:")[1]?.split("|B:")[0] ?? key; }
const blocked = new Set<string>();
for (let y = 0; y < rows.length; y += 1) for (let x = 0; x < rows[y]!.length; x += 1) if (rows[y]![x] !== ".") blocked.add(cellKey(x, y));
const candidates: Array<[number, number]> = [];
for (let y = 1; y <= 15; y += 1) for (let x = 1; x <= 22; x += 1) {
  if (!blocked.has(cellKey(x, y))) candidates.push([x, y]);
}
let seed = 0x517cc1b7;
function random(): number { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x1_0000_0000; }
function shuffle<T>(items: T[]): T[] { return [...items].sort(() => random() - 0.5); }

for (let iteration = 0; iteration < 6000; iteration += 1) {
  let layout = source;
  const count = 1 + Math.floor(random() * 7);
  const chosen = shuffle(candidates).slice(0, count);
  for (const [x, y] of chosen) layout = setCell(layout, x, y, "#");
  let initial;
  try {
    initial = adapter.parseLevel({ id: "phase-coupling", title: "phase-coupling", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win } as LevelDoc);
  } catch {
    continue;
  }
  const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 50000, maxDepth: 180 });
  if (!solution.found || !solution.inputs) continue;
  const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
  const events = replay.steps.flatMap((step) => step.events);
  if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier")) || !events.some((event) => event.startsWith("light_brazier"))) continue;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 50000, terminalizeWins: true });
  if (graph.status !== "complete") continue;
  const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => forbiddenPattern.test(event)));
  if (forbidden.length > 0) continue;
  const signatures = [...new Set([...graph.winStateIndexes].map((index) => signature(graph.keys[index]!)))];
  if (iteration % 100 === 0) console.error(`tested ${iteration} candidates; solver=${solution.inputs.length}; signatures=${signatures.length}`);
  if (signatures.length === 1) {
    console.log(JSON.stringify({ iteration, walls: chosen, depth: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, signatures, inputs: solution.inputs, events, layout: `${layout}\n` }, null, 2));
    process.exit(0);
  }
}
console.log("NO_UNIQUE");

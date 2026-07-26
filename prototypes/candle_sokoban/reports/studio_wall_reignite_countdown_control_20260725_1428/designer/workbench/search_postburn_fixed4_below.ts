import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win };
const W = 11;
const H = 11;
const fixed = new Set(["2,3", "2,4", "2,5"]);
function empty(): string {
  return Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => x === 0 || y === 0 || x === W - 1 || y === H - 1 ? "#" : ".").join(""),
  ).join("\n");
}
function setCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.split("\n");
  const row = rows[y]!;
  rows[y] = row.slice(0, x) + glyph + row.slice(x + 1);
  return rows.join("\n");
}
function signature(key: string): string {
  return key.split("|C:")[1]?.split("|B:")[0] ?? key;
}
function groups(graph: ReturnType<typeof enumerateRuntimeGraph>): string[] {
  return [...new Set([...graph.winStateIndexes].map((index) => signature(graph.keys[index]!)))];
}

const cells: Array<[number, number]> = [];
for (let y = 2; y < H - 2; y++) {
  for (let x = 2; x < W - 2; x++) {
    if (!fixed.has(`${x},${y}`)) cells.push([x, y]);
  }
}
let seed = 0x9e3779b9;
function random(): number {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0x1_0000_0000;
}

for (let iteration = 0; iteration < 20000; iteration += 1) {
  let layout = empty();
  const shuffled = [...cells].sort(() => random() - 0.5);
  const target = shuffled[0]!;
  layout = setCell(layout, 2, 3, "O");
  layout = setCell(layout, 2, 4, "U");
  layout = setCell(layout, 2, 5, "@");
  layout = setCell(layout, target[0], target[1], "o");
  const wallCount = 8 + Math.floor(random() * 16);
  for (const [x, y] of shuffled.slice(1, 1 + wallCount)) layout = setCell(layout, x, y, "#");

  let initial;
  try {
    initial = adapter.parseLevel({
      id: "postburn-fixed4-below",
      title: "postburn-fixed4-below",
      layout: `${layout}\n`,
      global_burn_cycle: 5,
      win: pkg.mechanic.win,
    } as LevelDoc);
  } catch {
    continue;
  }
  const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 30000, maxDepth: 16 });
  if (!solution.found || !solution.inputs || solution.inputs.length !== 4) continue;
  const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
  const events = replay.steps.flatMap((step) => step.events);
  const finalEvents = replay.steps.at(-1)?.events ?? [];
  if (!replay.final.isWin || !finalEvents.some((event) => event.startsWith("roll_candle")) || !finalEvents.some((event) => event.startsWith("light_brazier"))) continue;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 30000, terminalizeWins: true });
  if (graph.status !== "complete" || graph.winStateIndexes.size === 0) continue;
  const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite|extinguish_by_candle_body)/.test(event)));
  if (forbidden.length > 0) continue;
  const sigs = groups(graph);
  if (sigs.length !== 1) continue;
  console.log(JSON.stringify({ iteration, target, inputs: solution.inputs, events, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, signatures: sigs, layout: `${layout}\n` }, null, 2));
  process.exit(0);
}
console.log("NO_UNIQUE");

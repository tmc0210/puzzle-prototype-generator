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
const width = 11;
const height = 11;

function empty(): string {
  return Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => (x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : ".")).join(""),
  ).join("\n");
}
function setCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return rows.join("\n");
}
function signatures(graph: ReturnType<typeof enumerateRuntimeGraph>) {
  const parent = new Array<number>(graph.keys.length).fill(-1);
  const parentEdge = new Array<number>(graph.keys.length).fill(-1);
  for (const [edgeIndex, edge] of graph.edges.entries()) if (edge.to !== 0 && parentEdge[edge.to] < 0) { parent[edge.to] = edge.from; parentEdge[edge.to] = edgeIndex; }
  const groups = new Map<string, number>();
  for (const index of graph.winStateIndexes) {
    const events: string[] = [];
    for (let cursor = index; cursor !== 0 && parentEdge[cursor] >= 0; cursor = parent[cursor]!) events.push(...graph.edges[parentEdge[cursor]!]!.events);
    events.reverse();
    const signature = events.filter((event) => /light_brazier|burn_out|win_all_braziers_lit/.test(event)).join("|");
    groups.set(signature, (groups.get(signature) ?? 0) + 1);
  }
  return [...groups.entries()].map(([signature, count]) => ({ signature, count }));
}

const usable: Array<[number, number]> = [];
for (let y = 2; y < height - 2; y++) for (let x = 2; x < width - 2; x++) usable.push([x, y]);
let seed = 0x55443322;
function random(): number { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x1_0000_0000; }
for (let iteration = 0; iteration < 8000; iteration += 1) {
  let layout = empty();
  const shuffled = [...usable].sort(() => random() - 0.5);
  const player = shuffled[0]!;
  const candle = shuffled[1]!;
  const source = shuffled[2]!;
  const target = shuffled[3]!;
  layout = setCell(layout, player[0], player[1], "@");
  layout = setCell(layout, candle[0], candle[1], "U");
  layout = setCell(layout, source[0], source[1], "O");
  layout = setCell(layout, target[0], target[1], "o");
  const wallCount = 10 + Math.floor(random() * 14);
  for (const [x, y] of shuffled.slice(4, 4 + wallCount)) layout = setCell(layout, x, y, "#");
  let initial;
  try {
    const level: LevelDoc = { id: "postburn-gate", title: "postburn-gate", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win };
    initial = adapter.parseLevel(level);
    initial.globalBurnCountdown = 4;
  } catch { continue; }
  const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 12_000, maxDepth: 20 });
  if (!solution.found || !solution.inputs) continue;
  const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
  const events = replay.steps.flatMap((step) => step.events);
  if (!replay.final.isWin || !events.some((event) => event.startsWith("light_brazier")) || !events.some((event) => event.startsWith("burn_out"))) continue;
  if (solution.inputs.length !== 4) continue;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 12_000, terminalizeWins: true });
  if (graph.status !== "complete" || graph.winStateIndexes.size === 0) continue;
  const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite|extinguish_by_candle_body)/.test(event)));
  if (forbidden.length > 0) continue;
  const groups = signatures(graph);
  if (groups.length === 1) {
    console.log(JSON.stringify({ iteration, player, candle, source, target, walls: shuffled.slice(4, 4 + wallCount), inputs: solution.inputs, events, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, groups, layout: `${layout}\n` }, null, 2));
    process.exit(0);
  }
}
console.log("NO_UNIQUE");

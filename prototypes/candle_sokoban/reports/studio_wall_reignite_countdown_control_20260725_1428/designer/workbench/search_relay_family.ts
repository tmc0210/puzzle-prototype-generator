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
const options = { winCondition: pkg.mechanic.win };
const budget = 15_000;

function setCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return rows.join("\n");
}

function signature(events: string[]): string {
  return events
    .filter((event) => /extinguish_by_wall|ignite_from_brazier|ignite_from_wick|light_brazier|burn_out|win_all_braziers_lit/.test(event))
    .join("|");
}

function graphSignatures(graph: ReturnType<typeof enumerateRuntimeGraph>) {
  const parent = new Array<number>(graph.keys.length).fill(-1);
  const parentEdge = new Array<number>(graph.keys.length).fill(-1);
  for (const [edgeIndex, edge] of graph.edges.entries()) {
    if (edge.to !== 0 && parentEdge[edge.to] === -1) {
      parent[edge.to] = edge.from;
      parentEdge[edge.to] = edgeIndex;
    }
  }
  const groups = new Map<string, number>();
  for (const index of graph.winStateIndexes) {
    const events: string[] = [];
    for (let cursor = index; cursor !== 0 && parentEdge[cursor] >= 0; cursor = parent[cursor]!) {
      events.push(...graph.edges[parentEdge[cursor]!]!.events);
    }
    events.reverse();
    const key = signature(events);
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  return [...groups.entries()].map(([key, count]) => ({ key, count }));
}

function test(layout: string) {
  let initial;
  try {
    const level: LevelDoc = { id: "relay-family", title: "relay-family", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
    initial = adapter.parseLevel(level);
  } catch {
    return null;
  }
  const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: budget, maxDepth: 160 });
  if (!solution.found || !solution.inputs) return null;
  const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
  const events = replay.steps.flatMap((step) => step.events);
  if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall"))) return null;
  if (!events.some((event) => event.startsWith("ignite_from_brazier:candle#single"))) return null;
  if (!events.some((event) => event.startsWith("light_brazier")) || !events.some((event) => event.startsWith("burn_out:candle#single"))) return null;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: budget, terminalizeWins: true });
  if (graph.status !== "complete" || graph.winStateIndexes.size === 0) return null;
  const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(extinguish_by_candle_body|wick_reexposed_unlit|shrink_ignite|roll_intermediate_|roll_reignite_after_extinguish)/.test(event)));
  if (forbidden.length > 0) return null;
  return { depth: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, signatures: graphSignatures(graph), inputs: solution.inputs, events, layout };
}

const cells: Array<[number, number]> = [];
for (let y = 8; y <= 13; y += 1) for (let x = 14; x <= 20; x += 1) cells.push([x, y]);
let seed = 0x1a2b3c4d;
function random(): number { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x1_0000_0000; }
const dirs = ["u", "d", "l", "r"];

for (let iteration = 0; iteration < 900; iteration += 1) {
  let layout = base;
  for (const [x, y] of cells) layout = setCell(layout, x, y, ".");
  const shuffled = [...cells].sort(() => random() - 0.5);
  const [sx, sy] = shuffled[0]!;
  const [tx, ty] = shuffled[1]!;
  const [c1x, c1y] = shuffled[2]!;
  const [c2x, c2y] = shuffled[3]!;
  layout = setCell(layout, sx, sy, "O");
  layout = setCell(layout, tx, ty, "o");
  layout = setCell(layout, c1x, c1y, dirs[Math.floor(random() * dirs.length)]!);
  layout = setCell(layout, c2x, c2y, dirs[Math.floor(random() * dirs.length)]!);
  const wallCount = 5 + Math.floor(random() * 6);
  for (const [x, y] of shuffled.slice(4, 4 + wallCount)) layout = setCell(layout, x, y, "#");
  const result = test(`${layout}\n`);
  if (result && result.signatures.length <= 2) console.log(JSON.stringify({ iteration, source: [sx, sy], target: [tx, ty], candle1: [c1x, c1y], candle2: [c2x, c2y], ...result }, null, 2));
  if (result && result.signatures.length === 1) process.exit(0);
  if (iteration % 100 === 0) console.error(`tested ${iteration}`);
}
console.log("NO_UNIQUE");

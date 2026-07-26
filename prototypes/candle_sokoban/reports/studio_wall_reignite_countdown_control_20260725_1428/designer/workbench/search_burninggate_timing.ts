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
const graphBudget = 30_000;

function setCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return rows.join("\n");
}

function milestoneSignature(events: string[]): string {
  return events
    .filter((event) => /extinguish_by_wall|ignite_from_brazier|light_brazier|burn_out|win_all_braziers_lit/.test(event))
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
  const signatures = new Map<string, number>();
  for (const index of graph.winStateIndexes) {
    const events: string[] = [];
    for (let cursor = index; cursor !== 0 && parentEdge[cursor] >= 0; cursor = parent[cursor]!) {
      events.push(...graph.edges[parentEdge[cursor]!]!.events);
    }
    events.reverse();
    const signature = milestoneSignature(events);
    signatures.set(signature, (signatures.get(signature) ?? 0) + 1);
  }
  return [...signatures.entries()].map(([signature, count]) => ({ signature, count }));
}

function candidateLayout(
  source: [number, number],
  target: [number, number],
  candle: [number, number, string],
  walls: Array<[number, number]>,
): string {
  let layout = base;
  for (let y = 8; y <= 13; y += 1) {
    for (let x = 14; x <= 20; x += 1) layout = setCell(layout, x, y, ".");
  }
  for (const [x, y] of walls) layout = setCell(layout, x, y, "#");
  layout = setCell(layout, source[0], source[1], "O");
  layout = setCell(layout, target[0], target[1], "o");
  layout = setCell(layout, candle[0], candle[1], candle[2]);
  return `${layout}\n`;
}

function test(layout: string) {
  let initial;
  try {
    const level: LevelDoc = {
      id: "burninggate-timing-search",
      title: "burninggate-timing-search",
      layout,
      global_burn_cycle: 5,
      win: pkg.mechanic.win,
    };
    initial = adapter.parseLevel(level);
  } catch {
    return null;
  }
  const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: graphBudget, maxDepth: 180 });
  if (!solution.found || !solution.inputs) return null;
  const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
  const replayEvents = replay.steps.flatMap((step) => step.events);
  if (!replay.final.isWin) return null;
  if (!replayEvents.some((event) => event.startsWith("extinguish_by_wall"))) return null;
  if (!replayEvents.some((event) => event.startsWith("ignite_from_brazier:candle#2"))) return null;
  if (!replayEvents.some((event) => event.startsWith("ignite_from_brazier:candle#single"))) return null;
  if (!replayEvents.some((event) => event.startsWith("light_brazier"))) return null;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, {
    maxStates: graphBudget,
    terminalizeWins: true,
  });
  if (graph.status !== "complete" || graph.winStateIndexes.size === 0) return null;
  const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) =>
    /^(extinguish_by_candle_body|wick_reexposed_unlit|shrink_ignite|roll_intermediate_|roll_reignite_after_extinguish)/.test(event),
  ));
  if (forbidden.length > 0) return null;
  const signatures = graphSignatures(graph);
  return {
    solution_depth: solution.inputs.length,
    states: graph.keys.length,
    edges: graph.edges.length,
    wins: graph.winStateIndexes.size,
    signatures,
    inputs: solution.inputs,
    events: replayEvents,
    layout,
  };
}

const sourceCells: Array<[number, number]> = [[18, 9], [18, 10], [19, 9], [19, 10], [17, 10], [19, 11]];
const targetCells: Array<[number, number]> = [[16, 9], [17, 9], [19, 9], [20, 9], [16, 10], [17, 10], [19, 10], [20, 10], [17, 11], [19, 11]];
const candleCells: Array<[number, number, string]> = [
  [18, 11, "u"], [19, 11, "u"], [18, 10, "u"], [19, 10, "u"],
  [17, 10, "l"], [18, 10, "l"], [19, 10, "l"],
  [17, 11, "l"], [18, 11, "l"], [19, 11, "l"],
];
const wallCells: Array<[number, number]> = [
  [16, 10], [17, 10], [18, 10], [19, 10], [20, 10],
  [16, 11], [17, 11], [19, 11], [20, 11],
  [16, 12], [17, 12], [18, 12], [19, 12], [20, 12],
];

let seed = 0x725b0a11;
function random(): number {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0x1_0000_0000;
}

for (let iteration = 0; iteration < 1200; iteration += 1) {
  const source = sourceCells[Math.floor(random() * sourceCells.length)]!;
  const target = targetCells[Math.floor(random() * targetCells.length)]!;
  const candle = candleCells[Math.floor(random() * candleCells.length)]!;
  const wallCount = 1 + Math.floor(random() * 5);
  const walls: Array<[number, number]> = [];
  while (walls.length < wallCount) {
    const cell = wallCells[Math.floor(random() * wallCells.length)]!;
    if (!walls.some(([x, y]) => x === cell[0] && y === cell[1])) walls.push(cell);
  }
  const occupied = new Set([
    `${source[0]},${source[1]}`,
    `${target[0]},${target[1]}`,
    `${candle[0]},${candle[1]}`,
    ...walls.map(([x, y]) => `${x},${y}`),
  ]);
  if (occupied.size !== 3 + walls.length) continue;
  const result = test(candidateLayout(source, target, candle, walls));
  if (result && result.signatures.length <= 2) {
    console.log(JSON.stringify({ iteration, source, target, candle, walls, ...result }, null, 2));
  }
  if (result && result.signatures.length === 1) process.exit(0);
}
console.log("NO_UNIQUE");

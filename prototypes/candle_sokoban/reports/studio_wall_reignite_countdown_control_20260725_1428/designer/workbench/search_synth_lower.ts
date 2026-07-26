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
const upper = [
  "##############", "#######.######", "########.#.###", "########U#.###",
  "######O#3#..##", "######.#3##.##", "######.#3...##", "#####..#@#..##", "###########.##",
];
const lower = Array.from({ length: 10 }, () => "########.....#");
const dirs = [
  { cap: "l", dx: -1, dy: 0 }, { cap: "r", dx: 1, dy: 0 },
  { cap: "u", dx: 0, dy: -1 }, { cap: "d", dx: 0, dy: 1 },
];
let seed = 0x25072528;
function rand(): number { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x100000000; }
function pick<T>(items: T[]): T { return items[Math.floor(rand() * items.length)]!; }
function put(rows: string[], x: number, y: number, glyph: string): void {
  const row = rows[y]!; rows[y] = row.slice(0, x) + glyph + row.slice(x + 1);
}
function key(x: number, y: number): string { return `${x},${y}`; }
function signature(stateKey: string): string { return stateKey.split("|C:")[1]?.split("|B:")[0] ?? stateKey; }
function makeCandidate(): string | null {
  const rows = [...upper, ...lower];
  const open = new Set<string>();
  for (let y = 9; y <= 18; y += 1) for (let x = 8; x <= 12; x += 1) open.add(key(x, y));
  const wallCount = 3 + Math.floor(rand() * 12);
  const walls = new Set<string>();
  while (walls.size < wallCount) {
    const cell = pick([...open]);
    if (cell === "11,9" || cell === "8,14" || cell === "8,16") continue;
    walls.add(cell);
  }
  for (const cell of walls) { const [x, y] = cell.split(",").map(Number); put(rows, x!, y!, "#"); open.delete(cell); }
  const patterns: Array<{ cells: string[]; cap: string; capCell: string }> = [];
  for (const dir of dirs) for (let len = 1; len <= 3; len += 1) {
    for (const capY of Array.from({ length: 10 }, (_, i) => i + 9)) for (const capX of [8, 9, 10, 11, 12]) {
      const cells: string[] = []; let valid = true;
      for (let i = 0; i < len; i += 1) {
        const x = capX - dir.dx * i; const y = capY - dir.dy * i;
        const cell = key(x, y);
        if (!open.has(cell) || cells.includes(cell)) { valid = false; break; }
        cells.push(cell);
      }
      if (valid) patterns.push({ cells, cap: dir.cap, capCell: key(capX, capY) });
    }
  }
  if (patterns.length === 0) return null;
  const pattern = pick(patterns);
  for (const cell of pattern.cells) open.delete(cell);
  const sources = [...open].filter((cell) => cell !== "11,9");
  if (sources.length < 2) return null;
  const source = pick(sources); open.delete(source);
  const targets = [...open]; if (targets.length === 0) return null;
  const target = pick(targets);
  const [sx, sy] = source.split(",").map(Number); put(rows, sx!, sy!, "O");
  const [tx, ty] = target.split(",").map(Number); put(rows, tx!, ty!, "o");
  for (let i = 0; i < pattern.cells.length; i += 1) {
    const [x, y] = pattern.cells[i]!.split(",").map(Number);
    put(rows, x!, y!, i === pattern.cells.length - 1 ? pattern.cap : "1");
  }
  return `${rows.join("\n")}\n`;
}
function test(layout: string): unknown | null {
  let initial;
  try {
    const level: LevelDoc = { id: "synth-lower", title: "synth-lower", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
    initial = adapter.parseLevel(level);
  } catch { return null; }
  const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 22000, maxDepth: 120 });
  if (!solution.found) return null;
  const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
  const events = replay.steps.flatMap((step) => step.events);
  if (!replay.final.isWin || !events.some((event) => event.startsWith("extinguish_by_wall")) || !events.some((event) => event.startsWith("ignite_from_brazier")) || !events.some((event) => event.startsWith("light_brazier"))) return null;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 22000, terminalizeWins: true });
  if (graph.status !== "complete") return null;
  const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
  if (forbidden.length > 0) return null;
  const signatures = [...new Set([...graph.winStateIndexes].map((index) => signature(graph.keys[index]!)))];
  return { depth: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, signatures, inputs: solution.inputs, events, layout };
}
for (let iteration = 0; iteration < 12000; iteration += 1) {
  const layout = makeCandidate(); if (!layout) continue;
  const result = test(layout);
  if (result && (result as { signatures: string[] }).signatures.length === 1) {
    console.log(JSON.stringify({ iteration, ...result }, null, 2)); process.exit(0);
  }
  if (iteration % 250 === 0) console.error(`tested ${iteration}`);
}
console.log("NO_UNIQUE");

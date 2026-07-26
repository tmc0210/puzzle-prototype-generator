import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const basePath = process.argv[2]!;
const base = (await readFile(basePath, "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win };
function setCell(layout: string, x: number, y: number, glyph: string) {
  const rows = layout.split("\n"); const row = rows[y]!;
  if (row[x] === undefined) throw new Error(`bad cell ${x},${y}`);
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`; return rows.join("\n");
}
function signature(key: string) { return key.split("|C:")[1]?.split("|B:")[0] ?? key; }
function test(layout: string) {
  const level: LevelDoc = { id: "timing-family", title: "timing-family", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win };
  const initial = adapter.parseLevel(level);
  const sol = solveWithRuntime(runtime, initial, { ...options, maxStates: 50000, maxDepth: 200 });
  if (!sol.found) return null;
  const replay = replayInputSequence(adapter, runtime, initial, sol.inputs, options, pkg.mechanic.win);
  const events = replay.steps.flatMap((step) => step.events);
  if (!replay.final.isWin || !events.some((e) => e.startsWith("extinguish_by_wall")) || !events.some((e) => e.startsWith("ignite_from_brazier"))) return null;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 50000, terminalizeWins: true });
  if (graph.status !== "complete") return null;
  const forbidden = graph.edges.flatMap((edge) => edge.events.filter((e) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(e)));
  if (forbidden.length) return null;
  const signatures = [...new Set([...graph.winStateIndexes].map((index) => signature(graph.keys[index]!)))];
  return { depth: sol.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, signatures, inputs: sol.inputs, events, layout: `${layout}\n` };
}

const fixed = new Set(["8,13", "9,13", "10,13", "11,13", "12,13", "9,14", "10,14", "11,14", "12,14", "12,16", "11,17"]);
const cells: Array<[number, number]> = [];
for (let y = 12; y <= 18; y++) for (let x = 8; x <= 12; x++) if (!fixed.has(`${x},${y}`)) cells.push([x, y]);
let seed = 0x517a2026;
function rand() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x100000000; }
for (let i = 0; i < 3000; i++) {
  let layout = base;
  const shuffled = [...cells].sort(() => rand() - 0.5);
  const count = Math.floor(rand() * 5);
  const walls = shuffled.slice(0, count);
  try {
    for (const [x, y] of walls) if (layout.split("\n")[y]![x] === ".") layout = setCell(layout, x, y, "#");
    const result = test(layout);
    if (result && result.signatures.length === 1) { console.log(JSON.stringify({ index: i, walls, ...result }, null, 2)); process.exit(0); }
    if (i % 250 === 0) console.error(`tested ${i}`);
  } catch { /* reject malformed or mechanically invalid probes */ }
}
console.log("NO_UNIQUE");

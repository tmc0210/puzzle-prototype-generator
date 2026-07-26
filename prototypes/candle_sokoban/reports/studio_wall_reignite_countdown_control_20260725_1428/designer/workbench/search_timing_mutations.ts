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
const options = { winCondition: pkg.mechanic.win };
function setCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.split("\n");
  const row = rows[y]!;
  rows[y] = row.slice(0, x) + glyph + row.slice(x + 1);
  return rows.join("\n");
}
function sig(key: string): string { return key.split("|C:")[1]?.split("|B:")[0] ?? key; }
function run(layout: string) {
  let initial;
  try {
    const level: LevelDoc = { id: "timing-mutation", title: "timing-mutation", layout: `${layout}\n`, global_burn_cycle: 5, win: pkg.mechanic.win };
    initial = adapter.parseLevel(level);
  } catch { return null; }
  const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 22000, maxDepth: 120 });
  if (!solution.found) return null;
  const replay = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
  const events = replay.steps.flatMap((step) => step.events);
  if (!replay.final.isWin || !events.some((e) => e.startsWith("extinguish_by_wall")) || !events.some((e) => e.startsWith("ignite_from_brazier"))) return null;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 22000, terminalizeWins: true });
  if (graph.status !== "complete") return null;
  const forbidden = graph.edges.flatMap((edge) => edge.events.filter((e) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(e)));
  if (forbidden.length) return null;
  const signatures = [...new Set([...graph.winStateIndexes].map((i) => sig(graph.keys[i]!)))];
  return { depth: solution.inputs.length, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, signatures, inputs: solution.inputs, events, layout: `${layout}\n` };
}

type Mutation = { name: string; layout: string };
const mutations: Mutation[] = [{ name: "base", layout: source }];
const add = (name: string, f: (layout: string) => string) => { mutations.push({ name, layout: f(source) }); };
const topTargets = [[6, 3], [6, 4], [6, 5], [7, 4], [5, 4], [5, 5], [7, 5], [6, 6]] as const;
for (const [x, y] of topTargets) add(`top-target-${x}-${y}`, (l) => {
  let out = l;
  const rows = out.split("\n");
  for (let yy = 1; yy < 8; yy++) for (let xx = 1; xx < 13; xx++) if (rows[yy]![xx] === "o") out = setCell(out, xx, yy, ".");
  return rows[y]![x] === "." ? setCell(out, x, y, "o") : out;
});
const lowerTargets = [[8, 16], [8, 17], [8, 18], [9, 16], [10, 16], [11, 16], [12, 16], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15]] as const;
for (const [x, y] of lowerTargets) add(`lower-target-${x}-${y}`, (l) => {
  let out = l; const rows = out.split("\n");
  for (let yy = 12; yy < rows.length - 1; yy++) for (let xx = 1; xx < 13; xx++) if (rows[yy]![xx] === "o") out = setCell(out, xx, yy, ".");
  return rows[y]![x] === "." ? setCell(out, x, y, "o") : out;
});
const lowerCuts = [[9, 13], [10, 13], [11, 13], [12, 13], [9, 15], [10, 15], [11, 15], [12, 15], [9, 16], [10, 16], [11, 16], [12, 16], [9, 17], [10, 17], [11, 17], [12, 17], [9, 18], [10, 18], [11, 18], [12, 18]] as const;
for (const [x, y] of lowerCuts) add(`cut-${x}-${y}`, (l) => rowsafe(l, x, y, "#"));
function rowsafe(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.split("\n");
  if (rows[y]![x] !== ".") return layout;
  return setCell(layout, x, y, glyph);
}
const comboBases = [...mutations];
for (const a of comboBases) for (const b of lowerCuts.slice(0, 12)) {
  const [x, y] = b;
  mutations.push({ name: `${a.name}+cut-${x}-${y}`, layout: rowsafe(a.layout, x, y, "#") });
}

for (const [index, mutation] of mutations.entries()) {
  const result = run(mutation.layout);
  if (!result) continue;
  console.error(`candidate ${index}/${mutations.length} ${mutation.name} sigs=${result.signatures.length}`);
  if (result.signatures.length <= 2) console.log(JSON.stringify({ name: mutation.name, ...result }, null, 2));
  if (result.signatures.length === 1) process.exit(0);
}
console.log("NO_UNIQUE");

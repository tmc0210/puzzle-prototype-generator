import { readFile, writeFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const sourcePath = process.argv[2]!;
const outputPath = process.argv.find((arg) => arg.startsWith("output="))?.slice(7);

function setCell(rows: string[], x: number, y: number, glyph: string): void {
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
}

const rows = (await readFile(sourcePath, "utf8")).replace(/\r/g, "").trimEnd().split("\n");
setCell(rows, 9, 17, ".");
setCell(rows, 10, 18, "o");
setCell(rows, 11, 18, "O");
if (!process.argv.includes("noLowerWalls")) {
  for (let y = 14; y <= 17; y += 1) setCell(rows, 9, y, "#");
}
const layout = `${rows.join("\n")}\n`;
if (outputPath) await writeFile(outputPath, layout, "utf8");

const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "axis-source-probe", title: "axis-source-probe", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win };
const prefix = ["up", "up"];
const prefixReplay = replayInputSequence(adapter, runtime, initial, prefix, options, pkg.mechanic.win);
const solution = solveWithRuntime(runtime, prefixReplay.finalState, { ...options, maxStates: 300000, maxDepth: 200 });
const route = [...prefix, ...solution.inputs];
const replay = replayInputSequence(adapter, runtime, initial, route, options, pkg.mechanic.win);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 300000, terminalizeWins: true });
const forbidden = graph.edges.flatMap((edge) => edge.events.filter((event) => /^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(event)));
console.log(JSON.stringify({
  layout,
  solution: { found: solution.found, depth: solution.depth, inputs: solution.inputs, exploredStates: solution.exploredStates },
  replay: { finalWin: replay.final.isWin, events: replay.steps.flatMap((step) => step.events) },
  graph: { status: graph.status, states: graph.keys.length, edges: graph.edges.length, winningStates: graph.winStateIndexes.size, winningKeys: [...graph.winStateIndexes].map((index) => graph.keys[index]) },
  forbidden,
}, null, 2));

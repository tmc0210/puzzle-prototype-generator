import { readFile, writeFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const sourcePath = process.argv[2]!;
const topY = Number(process.argv.find((arg) => arg.startsWith("topY="))?.slice(5) ?? "9");
const length = Number(process.argv.find((arg) => arg.startsWith("length="))?.slice(7) ?? "4");
const lowerX = Number(process.argv.find((arg) => arg.startsWith("x="))?.slice(2) ?? "11");
const target = process.argv.find((arg) => arg.startsWith("target="))?.slice(7) ?? "9,17";
const walls = process.argv.find((arg) => arg.startsWith("walls="))?.slice(6)?.split(" ").filter(Boolean) ?? [];
const floors = process.argv.find((arg) => arg.startsWith("floors="))?.slice(7)?.split(" ").filter(Boolean) ?? [];
const outputPath = process.argv.find((arg) => arg.startsWith("output="))?.slice(7);

function setCell(rows: string[], x: number, y: number, glyph: string): void {
  const row = rows[y];
  if (!row || x < 0 || x >= row.length) throw new Error(`cell out of bounds: ${x},${y}`);
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
}

function applyCells(rows: string[], cells: string[], glyph: string): void {
  for (const cell of cells) {
    const [x, y] = cell.split(",").map(Number);
    setCell(rows, x!, y!, glyph);
  }
}

let rows = (await readFile(sourcePath, "utf8")).replace(/\r/g, "").trimEnd().split("\n");
for (let y = 9; y <= 13; y += 1) setCell(rows, 11, y, ".");
const capY = topY + length - 1;
for (let y = topY; y <= capY; y += 1) setCell(rows, lowerX, y, y === capY ? "d" : "1");
const [targetX, targetY] = target.split(",").map(Number);
for (let y = 10; y <= 18; y += 1) {
  const x = rows[y]!.indexOf("o");
  if (x >= 0) setCell(rows, x, y, ".");
}
setCell(rows, targetX!, targetY!, "o");
applyCells(rows, walls, "#");
applyCells(rows, floors, ".");
const layout = `${rows.join("\n")}\n`;
if (outputPath) await writeFile(outputPath, layout, "utf8");

const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "lower-geometry-probe", title: "lower-geometry-probe", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win };
const prefix = ["up", "up"];
const prefixReplay = replayInputSequence(adapter, runtime, initial, prefix, options, pkg.mechanic.win);
const suffix = solveWithRuntime(runtime, prefixReplay.finalState, { ...options, maxStates: 300000, maxDepth: 200 });
const route = [...prefix, ...suffix.inputs];
const replay = replayInputSequence(adapter, runtime, initial, route, options, pkg.mechanic.win);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 300000, terminalizeWins: true });
console.log(JSON.stringify({
  topY,
  length,
  lowerX,
  target,
  walls,
  floors,
  layout,
  prefixLegal: !prefixReplay.stoppedAtIllegalAction,
  suffix: { found: suffix.found, depth: suffix.depth, exploredStates: suffix.exploredStates, inputs: suffix.inputs },
  routeSteps: route.length,
  routeFinalWin: replay.final.isWin,
  routeEvents: replay.steps.flatMap((step) => step.events),
  graph: {
    status: graph.status,
    reason: graph.reason ?? null,
    states: graph.keys.length,
    edges: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    winningKeys: [...graph.winStateIndexes].map((index) => graph.keys[index]),
  },
}, null, 2));

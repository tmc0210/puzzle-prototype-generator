import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const root = process.cwd();
const layoutPath = process.argv[2] ?? "prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench/candle_shared_fire_wall_timing_20260725_1428_constrained.layout";
const defaultCanonical = [
  "up", "up", "right", "right", "right", "up", "up", "up", "left", "up", "left", "up", "left",
  "down", "down", "down", "down", "down", "left", "left", "left", "right", "up", "up", "right",
  "right", "up", "up", "right", "right", "down", "right", "down", "down", "down", "down", "down",
  "down", "down", "down", "down", "right", "down", "down", "down", "down", "left",
  "right", "left", "right", "left", "right", "left", "right", "left", "right", "left", "right", "left",
  "right", "left", "up", "up", "up", "left",
];
const canonical = process.argv[3]?.trim() ? process.argv[3].trim().split(/\s+/) : defaultCanonical;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
let layoutRows = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd().split("\n");
const option = (name: string): string | undefined => process.argv.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1);
const positional = (index: number): string | undefined => process.argv[index]?.includes("=") ? undefined : process.argv[index];
const targetArg = option("target") ?? positional(4);
if (targetArg) {
  const [targetXRaw, targetYRaw] = targetArg.split(",");
  const targetX = Number(targetXRaw);
  const targetY = Number(targetYRaw);
  const currentTargetY = layoutRows.findIndex((row) => row.includes("o"));
  const currentTargetX = currentTargetY >= 0 ? layoutRows[currentTargetY]!.indexOf("o") : -1;
  if (currentTargetY >= 0 && currentTargetX >= 0) {
    const row = layoutRows[currentTargetY]!;
    layoutRows[currentTargetY] = `${row.slice(0, currentTargetX)}.${row.slice(currentTargetX + 1)}`;
  }
  const row = layoutRows[targetY]!;
  layoutRows[targetY] = `${row.slice(0, targetX)}o${row.slice(targetX + 1)}`;
}
const wallArg = option("walls") ?? positional(5);
if (wallArg) {
  for (const cell of wallArg.split(" ").filter(Boolean)) {
    const [xRaw, yRaw] = cell.split(",");
    const x = Number(xRaw);
    const y = Number(yRaw);
    const row = layoutRows[y]!;
    layoutRows[y] = `${row.slice(0, x)}#${row.slice(x + 1)}`;
  }
}
const secondaryTargetArg = option("secondary") ?? positional(6);
if (secondaryTargetArg) {
  const [xRaw, yRaw] = secondaryTargetArg.split(",");
  const x = Number(xRaw);
  const y = Number(yRaw);
  const row = layoutRows[y]!;
  layoutRows[y] = `${row.slice(0, x)}o${row.slice(x + 1)}`;
}
const lateTargetArg = option("lateTarget");
if (lateTargetArg) {
  const [xRaw, yRaw] = lateTargetArg.split(",");
  const x = Number(xRaw);
  const y = Number(yRaw);
  const currentLateY = layoutRows.findIndex((row, rowIndex) => rowIndex > 9 && row.includes("o"));
  const currentLateX = currentLateY >= 0 ? layoutRows[currentLateY]!.indexOf("o") : -1;
  if (currentLateY >= 0 && currentLateX >= 0) {
    const row = layoutRows[currentLateY]!;
    layoutRows[currentLateY] = `${row.slice(0, currentLateX)}.${row.slice(currentLateX + 1)}`;
  }
  const row = layoutRows[y]!;
  layoutRows[y] = `${row.slice(0, x)}o${row.slice(x + 1)}`;
}
const floorArg = option("floors") ?? positional(7);
if (floorArg) {
  for (const cell of floorArg.split(" ").filter(Boolean)) {
    const [xRaw, yRaw] = cell.split(",");
    const x = Number(xRaw);
    const y = Number(yRaw);
    const row = layoutRows[y]!;
    layoutRows[y] = `${row.slice(0, x)}.${row.slice(x + 1)}`;
  }
}
const lowerLenArg = option("len") ?? positional(8);
if (lowerLenArg) {
  const lowerLen = Number(lowerLenArg);
  const lowerBodyX = 11;
  const capY = 10 + lowerLen - 1;
  for (let y = 10; y <= 13; y += 1) {
    const row = layoutRows[y]!;
    let glyph = ".";
    if (y < capY) glyph = "1";
    if (y === capY) glyph = "d";
    layoutRows[y] = `${row.slice(0, lowerBodyX)}${glyph}${row.slice(lowerBodyX + 1)}`;
  }
}
const startArg = option("start") ?? positional(9);
if (startArg) {
  const [xRaw, yRaw] = startArg.split(",");
  const x = Number(xRaw);
  const y = Number(yRaw);
  for (let rowIndex = 0; rowIndex < layoutRows.length; rowIndex += 1) {
    const row = layoutRows[rowIndex]!;
    const at = row.indexOf("@");
    if (at >= 0) layoutRows[rowIndex] = `${row.slice(0, at)}.${row.slice(at + 1)}`;
  }
  const row = layoutRows[y]!;
  layoutRows[y] = `${row.slice(0, x)}@${row.slice(x + 1)}`;
}
const layout = `${layoutRows.join("\n")}\n`;
const level: LevelDoc = { id: "probe", title: "probe", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const replay = replayInputSequence(adapter, runtime, initial, canonical, { winCondition: pkg.mechanic.win }, pkg.mechanic.win);
const solution = solveWithRuntime(runtime, initial, { winCondition: pkg.mechanic.win, maxStates: 300000, maxDepth: 200 });
const solutionReplay = solution.found
  ? replayInputSequence(adapter, runtime, adapter.parseLevel(level), solution.inputs, { winCondition: pkg.mechanic.win }, pkg.mechanic.win)
  : undefined;
const graph = option("graph")
  ? enumerateRuntimeGraph(runtime, adapter.parseLevel(level), pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 300000, terminalizeWins: true })
  : undefined;
console.log(JSON.stringify({
  layoutPath,
  layout,
  canonical: { legal: !replay.stoppedAtIllegalAction, executed: replay.steps.length, finalWin: replay.final.isWin, lastEvents: replay.steps.flatMap((step) => step.events).slice(-12), steps: replay.steps.map((step) => ({ step: step.step, action: step.action, events: step.events, key: step.after.key })) },
  solver: { found: solution.found, depth: solution.depth, inputs: solution.inputs, exploredStates: solution.exploredStates, events: solution.events, steps: solutionReplay?.steps.map((step) => ({ step: step.step, action: step.action, events: step.events, key: step.after.key })) },
  graph: graph ? {
    status: graph.status,
    reason: graph.reason ?? null,
    states: graph.keys.length,
    edges: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    winningKeys: [...graph.winStateIndexes].map((index) => ({ depth: graph.depthByIndex[index] ?? 0, key: graph.keys[index] })),
  } : undefined,
}, null, 2));

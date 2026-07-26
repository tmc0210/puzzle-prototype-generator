import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2]!;
const target = process.argv.find((arg) => arg.startsWith("target="))?.slice(7) ?? "9,16";
const topTarget = process.argv.find((arg) => arg.startsWith("topTarget="))?.slice(10);
const walls = process.argv.find((arg) => arg.startsWith("walls="))?.slice(6)?.split(" ").filter(Boolean) ?? [];
const floors = process.argv.find((arg) => arg.startsWith("floors="))?.slice(7)?.split(" ").filter(Boolean) ?? [];
const prefix = (process.argv.find((arg) => arg.startsWith("prefix="))?.slice(7) ?? "up up")
  .split(/\s+/)
  .filter(Boolean);

function replaceCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.replace(/\r/g, "").trimEnd().split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return `${rows.join("\n")}\n`;
}

let layout = `${(await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const targetRows = layout.split("\n");
if (topTarget) {
  const [topX, topY] = topTarget.split(",").map(Number);
  const currentTopY = targetRows.findIndex((row, index) => index < 9 && row.includes("o"));
  const currentTopX = currentTopY >= 0 ? targetRows[currentTopY]!.indexOf("o") : -1;
  if (currentTopY >= 0 && currentTopX >= 0) layout = replaceCell(layout, currentTopX, currentTopY, ".");
  layout = replaceCell(layout, topX!, topY!, "o");
}
const [targetX, targetY] = target.split(",").map(Number);
const currentTargetY = targetRows.findIndex((row, index) => index > 9 && row.includes("o"));
const currentTargetX = currentTargetY >= 0 ? targetRows[currentTargetY]!.indexOf("o") : -1;
if (currentTargetY >= 0 && currentTargetX >= 0) layout = replaceCell(layout, currentTargetX, currentTargetY, ".");
layout = replaceCell(layout, targetX!, targetY!, "o");
for (const wall of walls) {
  const [x, y] = wall.split(",").map(Number);
  layout = replaceCell(layout, x!, y!, "#");
}
for (const floor of floors) {
  const [x, y] = floor.split(",").map(Number);
  layout = replaceCell(layout, x!, y!, ".");
}

const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "doused-probe", title: "doused-probe", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const options = { winCondition: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const prefixReplay = replayInputSequence(adapter, runtime, initial, prefix, options, pkg.mechanic.win);
const suffix = solveWithRuntime(runtime, prefixReplay.finalState, { ...options, maxStates: 300000, maxDepth: 200 });
const full = replayInputSequence(adapter, runtime, initial, [...prefix, ...suffix.inputs], options, pkg.mechanic.win);
console.log(JSON.stringify({
  target,
  walls,
  floors,
  prefix,
  prefixLegal: !prefixReplay.stoppedAtIllegalAction,
  prefixEvents: prefixReplay.steps.flatMap((step) => step.events),
  suffix: { found: suffix.found, depth: suffix.depth, inputs: suffix.inputs, events: suffix.events, exploredStates: suffix.exploredStates },
  full: { finalWin: full.final.isWin, legal: !full.stoppedAtIllegalAction, steps: full.steps.length, events: full.steps.flatMap((step) => step.events) },
}, null, 2));

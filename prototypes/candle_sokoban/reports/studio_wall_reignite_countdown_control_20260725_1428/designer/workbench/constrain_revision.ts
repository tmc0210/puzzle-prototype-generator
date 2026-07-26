import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import { wickProjections } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const root = path.resolve(process.cwd());
const workbench = path.join(root, "prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench");
const sourcePath = path.join(workbench, "candle_shared_fire_wall_timing_20260725_1428/candle_shared_fire_wall_timing_20260725_1428.exact.004/layout.layout");
const outputPath = path.join(workbench, "candle_shared_fire_wall_timing_20260725_1428_revision_001_constrained.layout");
const inputs = ["up", "up", "down", "up", "down", "up", "down", "up", "down", "up", "right", "right", "right", "up", "up", "up", "left", "up", "left", "left", "up", "down", "up", "down", "up", "down", "down", "down", "down", "down", "left", "up", "left", "up", "right", "right", "down", "down", "right", "right", "right", "down", "down", "down", "down", "down", "down", "right", "down", "left", "up", "up", "down", "down", "down", "left"];
const key = (x: number, y: number) => `${x},${y}`;
function replaceCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.replace(/\r/g, "").trimEnd().split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return `${rows.join("\n")}\n`;
}

let layout = `${(await readFile(sourcePath, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
layout = replaceCell(layout, 9, 15, ".");
layout = replaceCell(layout, 9, 16, "o");
layout = replaceCell(layout, 9, 6, "#");
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level = { id: "revision-probe", title: "revision-probe", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const keep = new Set<string>();
const record = (state: any) => {
  keep.add(key(state.player.x, state.player.y));
  for (const candle of state.candles) for (const cell of candle.bodyCells) keep.add(key(cell.x, cell.y));
  for (const brazier of state.braziers) keep.add(key(brazier.position.x, brazier.position.y));
  for (const projection of wickProjections(state)) keep.add(key(projection.point.x, projection.point.y));
};
let current: any = initial;
record(current);
for (const [index, action] of inputs.entries()) {
  const transition = runtime.step(current, action, { winCondition: pkg.mechanic.win });
  if (!transition.legal) throw new Error(`route illegal at ${index + 1}:${action}; ${runtime.key(current)}`);
  current = transition.state;
  record(current);
}
if (!runtime.isWin(current, pkg.mechanic.win)) throw new Error(`route did not win: ${runtime.key(current)}`);
const rows = layout.trimEnd().split("\n");
const constrained = `${rows.map((row, y) => [...row].map((glyph, x) => glyph === "#" ? "#" : keep.has(key(x, y)) ? glyph : "#").join("")).join("\n")}\n`;
await writeFile(outputPath, constrained, "utf8");
await writeFile(path.join(workbench, "revision_001_keep_cells.json"), `${JSON.stringify({ inputs, keep: [...keep].sort(), count: keep.size }, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, stepCount: inputs.length, keepCount: keep.size, finalKey: runtime.key(current) }, null, 2));

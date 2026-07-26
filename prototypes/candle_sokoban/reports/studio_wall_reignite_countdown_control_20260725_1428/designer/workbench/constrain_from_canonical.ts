import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import { wickProjections } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const repoRoot = path.resolve(process.cwd());
const workbench = path.join(
  repoRoot,
  "prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench",
);
const sourcePath = path.join(workbench, "candle_shared_fire_wall_timing_20260725_1428_working.layout");
const outputPath = path.join(workbench, "candle_shared_fire_wall_timing_20260725_1428_constrained.layout");
const inputs = [
  "up", "up", "right", "right", "right", "up", "up", "up", "left", "up", "left", "up", "left",
  "down", "down", "down", "down", "down", "left", "left", "left", "right", "up", "up", "right",
  "right", "up", "up", "right", "right", "down", "right", "down", "down", "down", "down", "down",
  "down", "down", "down", "down", "right", "down", "down", "down", "down", "left",
  "right", "left", "right", "left", "right", "left", "right", "left", "right", "left", "right", "left",
  "right", "left", "up", "up", "up", "left",
];

const layout = `${(await readFile(sourcePath, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const state = adapter.parseLevel({ id: "working", title: "working", layout, win: pkg.mechanic.win });
const keep = new Set<string>();
const key = (x: number, y: number) => `${x},${y}`;
const record = (current: any) => {
  keep.add(key(current.player.x, current.player.y));
  for (const candle of current.candles) {
    for (const cell of candle.bodyCells) keep.add(key(cell.x, cell.y));
  }
  for (const brazier of current.braziers) keep.add(key(brazier.position.x, brazier.position.y));
  for (const projection of wickProjections(current)) keep.add(key(projection.point.x, projection.point.y));
};

let current: any = state;
record(current);
for (const [stepIndex, action] of inputs.entries()) {
  const transition = runtime.step(current, action, { winCondition: pkg.mechanic.win });
  if (!transition.legal) throw new Error(`canonical action became illegal at step ${stepIndex + 1}: ${action}; state=${runtime.key(current)}`);
  current = transition.state;
  record(current);
}

// 两个合法终点滚动需要的身体落点，以及末端目标滚入格。
keep.add(key(9, 5));
keep.add(key(9, 6));
keep.add(key(9, 14));

const rows = layout.trimEnd().split("\n");
const constrained = rows.map((row, y) =>
  [...row].map((glyph, x) => {
    if (glyph === "#") return "#";
    return keep.has(key(x, y)) ? glyph : "#";
  }).join(""),
).join("\n") + "\n";
await writeFile(outputPath, constrained, "utf8");
await writeFile(path.join(workbench, "constrained_keep_cells.json"), `${JSON.stringify({ cell_count: keep.size, cells: [...keep].sort() }, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, keptCells: keep.size }, null, 2));

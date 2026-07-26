import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import { wickProjections } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const workbench = path.resolve(process.cwd(), "prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench");
const sourcePath = process.argv[2]!;
const outputPath = process.argv[3]!;
const route = process.argv[4]!.split(/\s+/).filter(Boolean);
const walls = process.argv.find((arg) => arg.startsWith("walls="))?.slice(6)?.split(" ").filter(Boolean) ?? [];
const floors = process.argv.find((arg) => arg.startsWith("floors="))?.slice(7)?.split(" ").filter(Boolean) ?? [];
const target = process.argv.find((arg) => arg.startsWith("target="))?.slice(7) ?? "9,16";
function replaceCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.replace(/\r/g, "").trimEnd().split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return `${rows.join("\n")}\n`;
}
let layout = `${(await readFile(sourcePath, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const [targetX, targetY] = target.split(",").map(Number);
const rowsForTarget = layout.trimEnd().split("\n");
const currentLateY = rowsForTarget.findIndex((row, index) => index > 9 && row.includes("o"));
const currentLateX = currentLateY >= 0 ? rowsForTarget[currentLateY]!.indexOf("o") : -1;
if (currentLateY >= 0 && currentLateX >= 0) layout = replaceCell(layout, currentLateX, currentLateY, ".");
layout = replaceCell(layout, targetX!, targetY!, "o");
for (const wall of walls) { const [x, y] = wall.split(",").map(Number); layout = replaceCell(layout, x!, y!, "#"); }
for (const floor of floors) { const [x, y] = floor.split(",").map(Number); layout = replaceCell(layout, x!, y!, "."); }
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level = { id: "route-variant", title: "route-variant", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win };
let current: any = initial;
const keep = new Set<string>();
const key = (x: number, y: number) => `${x},${y}`;
const record = (state: any) => {
  keep.add(key(state.player.x, state.player.y));
  for (const candle of state.candles) for (const cell of candle.bodyCells) keep.add(key(cell.x, cell.y));
  for (const brazier of state.braziers) keep.add(key(brazier.position.x, brazier.position.y));
  for (const projection of wickProjections(state)) keep.add(key(projection.point.x, projection.point.y));
};
record(current);
for (const [index, action] of route.entries()) {
  const transition = runtime.step(current, action, options);
  if (!transition.legal) throw new Error(`route illegal at ${index + 1}:${action}; ${runtime.key(current)}`);
  current = transition.state;
  record(current);
}
if (!runtime.isWin(current, pkg.mechanic.win)) throw new Error(`route did not win: ${runtime.key(current)}`);
const rows = layout.trimEnd().split("\n");
const constrained = `${rows.map((row, y) => [...row].map((glyph, x) => glyph === "#" ? "#" : keep.has(key(x, y)) ? glyph : "#").join("")).join("\n")}\n`;
await writeFile(outputPath, constrained, "utf8");
console.log(JSON.stringify({ outputPath, routeSteps: route.length, keepCells: keep.size, finalKey: runtime.key(current) }, null, 2));

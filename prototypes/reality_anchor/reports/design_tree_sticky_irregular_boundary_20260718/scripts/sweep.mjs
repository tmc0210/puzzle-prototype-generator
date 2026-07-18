// Multi-shape sweep test through a nub field. One layout file per shape:
// pass layout + cells origin and watch the sweep. Compares E vs U vs T vs SQ
// rising through a two-nub offset gate.
// usage: sweep.mjs <layout> dx dy steps
import { readFile } from "node:fs/promises";
const [layoutPath, dxs, dys, stepsS] = process.argv.slice(2);
const dx = Number(dxs), dy = Number(dys), steps = Number(stepsS);
const rows = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").split("\n").filter((l) => l.length);
const walls = new Set();
let cells = [];
rows.forEach((row, y) => [...row].forEach((ch, x) => {
  if (ch === "#") walls.add(`${x},${y}`);
  if (ch === "M") cells.push({ x, y });
}));
const w = rows[0].length;
function render() {
  const mset = new Set(cells.map((m) => `${m.x},${m.y}`));
  return rows.map((row, y) => [...Array(w)].map((_, x) => walls.has(`${x},${y}`) ? "#" : mset.has(`${x},${y}`) ? "M" : ".").join("")).join("\n");
}
for (let s = 1; s <= steps; s++) {
  const moved = cells.map((c) => ({ x: c.x + dx, y: c.y + dy }));
  const hits = moved.filter((m) => walls.has(`${m.x},${m.y}`));
  cells = moved;
  if (hits.length) { console.log(`BLOCKED step ${s} at ${hits.map((h) => `${h.x},${h.y}`).join(" ")}`); process.exit(1); }
}
console.log(`PASSED ${steps} steps`);
console.log(render());

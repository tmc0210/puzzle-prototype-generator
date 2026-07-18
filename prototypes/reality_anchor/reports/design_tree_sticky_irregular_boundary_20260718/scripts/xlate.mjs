// Cellwise translation: show whether translating a shape through a nub field
// collides; supports multi-step. Layout-free version with explicit coords.
// usage: xlate.mjs "<nubs>" "<cells>" dx dy steps
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
for (let s = 1; s <= steps; s++) {
  const moved = cells.map((c) => ({ x: c.x + dx, y: c.y + dy }));
  const hits = moved.filter((m) => walls.has(`${m.x},${m.y}`));
  cells = moved;
  const mset = new Set(moved.map((m) => `${m.x},${m.y}`));
  rows.forEach((row, y) => {
    let out = "";
    for (let x = 0; x < row.length; x++) out += walls.has(`${x},${y}`) ? "#" : mset.has(`${x},${y}`) ? "M" : ".";
    console.log(out);
  });
  console.log(hits.length ? `step ${s} BLOCKED at ${hits.map((h) => `${h.x},${h.y}`).join(" ")}` : `step ${s} ok`);
  if (hits.length) break;
}

// Cellwise occupancy sim for sticky vs wall nubs. Parse a board of '#','M',
// translate ALL M by (dx,dy), show final board + which M targets hit walls.
// usage: cellwise.mjs <layout> dx dy
import { readFile } from "node:fs/promises";
const [layoutPath, dxs, dys] = process.argv.slice(2);
const dx = Number(dxs), dy = Number(dys);
const rows = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").split("\n").filter((l) => l.length);
const walls = new Set(), cells = [];
rows.forEach((row, y) => [...row].forEach((ch, x) => {
  if (ch === "#") walls.add(`${x},${y}`);
  if (ch === "M") cells.push({ x, y });
}));
const moved = cells.map((c) => ({ x: c.x + dx, y: c.y + dy }));
const hits = moved.filter((m) => walls.has(`${m.x},${m.y}`));
const mset = new Set(moved.map((m) => `${m.x},${m.y}`));
rows.forEach((row, y) => {
  let out = "";
  for (let x = 0; x < row.length; x++) out += walls.has(`${x},${y}`) ? "#" : mset.has(`${x},${y}`) ? "M" : ".";
  console.log(out);
});
console.log(hits.length ? `HITS: ${hits.map((h) => `${h.x},${h.y}`).join(" ")}` : "CLEAR");

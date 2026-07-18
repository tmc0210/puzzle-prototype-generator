// Cellwise sim for a shape crossing the B/S boundary as it's PULLED one cell
// per step: after each translation step, cells on the box side become crates
// (C), sticky-side cells regroup. Pull stops (force_blocked) when a sticky
// cell's target hits a wall. Shows the whole crossing storyboard.
// usage: cut-sim.mjs <layout-with-BS-and-M> dx dy steps
// Layout glyphs: '#' wall, 'B'/'S' anchor (defines box side = B's side),
// 'M' sticky group, '.' floor, 'G' goal, '@' player (decorative).
import { readFile } from "node:fs/promises";
const [layoutPath, dxs, dys, stepsS] = process.argv.slice(2);
const dx = Number(dxs), dy = Number(dys), steps = Number(stepsS);
const rows = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").split("\n").filter((l) => l.length);
const walls = new Set();
let sticky = [], crates = [], B = null, S = null;
rows.forEach((row, y) => [...row].forEach((ch, x) => {
  if (ch === "#") walls.add(`${x},${y}`);
  if (ch === "M") sticky.push({ x, y });
  if (ch === "C") crates.push({ x, y });
  if (ch === "B") B = { x, y };
  if (ch === "S") S = { x, y };
}));
const boxSide = (p) => (B.x !== S.x ? (B.x < S.x ? p.x <= B.x : p.x >= B.x) : B.y < S.y ? p.y <= B.y : p.y >= B.y);
function render(tag) {
  console.log(`--- ${tag} ---`);
  const cs = new Set(crates.map((c) => `${c.x},${c.y}`));
  const ms = new Set(sticky.map((c) => `${c.x},${c.y}`));
  rows.forEach((row, y) => {
    let out = "";
    for (let x = 0; x < row.length; x++) {
      const k = `${x},${y}`;
      out += walls.has(k) ? "#" : (B.x === x && B.y === y) ? "B" : (S.x === x && S.y === y) ? "S" : cs.has(k) ? "C" : ms.has(k) ? "M" : row[x] === "G" ? "G" : ".";
    }
    console.log(out);
  });
}
render("start");
for (let s = 1; s <= steps; s++) {
  // rigid translate sticky; check wall collisions on sticky cells only after normalize
  const moved = sticky.map((c) => ({ x: c.x + dx, y: c.y + dy }));
  // normalize: box-side cells -> crates
  const newCrates = moved.filter(boxSide);
  const remainSticky = moved.filter((p) => !boxSide(p));
  // pull legality: sticky cells' targets must not be walls
  const hit = remainSticky.filter((p) => walls.has(`${p.x},${p.y}`));
  crates = [...crates, ...newCrates];
  sticky = remainSticky;
  render(`step ${s}: cut ${newCrates.length} cell(s) -> crates${hit.length ? " | WOULD force_blocked next (sticky target in wall): " + hit.map((h) => `${h.x},${h.y}`).join(" ") : ""}`);
  if (!sticky.length) { console.log("all converted to crates"); break; }
}

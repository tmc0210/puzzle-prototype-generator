// Shape geometry sim: translate a shape (given as cell list) step by step in
// a direction; wall nubs block when any cell's target lands on a nub. No
// runtime, no player. Just: which shapes pass a given nub pattern?
// usage: shape-gate.mjs "<nubs x,y;...>" "<shape x,y;...>" dx dy steps
const [nubsS, shapeS, dxs, dys, stepsS] = process.argv.slice(2);
const parse = (s) => s.split(";").filter(Boolean).map((p) => { const [x, y] = p.split(",").map(Number); return { x, y }; });
const nubs = new Set(parse(nubsS).map((p) => `${p.x},${p.y}`));
let cells = parse(shapeS);
const dx = Number(dxs), dy = Number(dys), steps = Number(stepsS);
const min = (a) => Math.min(...a), max = (a) => Math.max(...a);
for (let s = 1; s <= steps; s++) {
  const moved = cells.map((c) => ({ x: c.x + dx, y: c.y + dy }));
  const hits = moved.filter((m) => nubs.has(`${m.x},${m.y}`));
  if (hits.length) {
    console.log(`step ${s}: BLOCKED at ${hits.map((h) => `${h.x},${h.y}`).join(" ")}`);
    process.exit(0);
  }
  cells = moved;
  console.log(`step ${s}: ok -> ${cells.map((c) => `${c.x},${c.y}`).join(" ")}`);
}
console.log("PASSED all steps");

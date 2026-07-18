// Rigid-translate sim for arbitrary shape sets. Define a shape by cells,
// translate by (dx,dy), print resulting board. Pure geometry, no runtime.
// usage: rigid-sim.mjs "<w>x<h>" "<anchor cells as x,y;x,y>" "<shape cells>" dx dy
const [wh, anchors, shape, dxs, dys] = process.argv.slice(2);
const [w, h] = wh.split("x").map(Number);
const dx = Number(dxs), dy = Number(dys);
const parse = (s) => s.split(";").filter(Boolean).map((p) => { const [x, y] = p.split(",").map(Number); return { x, y }; });
const walls = parse(anchors);
const cells = parse(shape);
const moved = cells.map((c) => ({ x: c.x + dx, y: c.y + dy }));
const key = (p) => `${p.x},${p.y}`;
const wset = new Set(walls.map(key));
const mset = new Set(moved.map(key));
const collide = moved.filter((m) => wset.has(key(m)));
for (let y = 0; y < h; y++) {
  let row = "";
  for (let x = 0; x < w; x++) row += wset.has(`${x},${y}`) ? "#" : mset.has(`${x},${y}`) ? "M" : ".";
  console.log(row);
}
console.log(collide.length ? `COLLIDES at ${collide.map(key).join(" ")}` : "CLEAR");

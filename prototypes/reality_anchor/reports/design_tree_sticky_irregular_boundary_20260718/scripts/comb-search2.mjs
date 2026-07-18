// Brute-force comb-gate search: find nub sets (size <= N) in a strip above a
// shape's start position such that the TARGET shape can rise K steps without
// collision while every REJECT shape collides at some step <= K.
// Shapes may be placed at DIFFERENT x offsets (they'd approach the gate along
// the floor); we test each reject at every x offset whose rise path stays in
// bounds — the gate must reject all of them, and pass the target at its
// designed offset.
const W = 12, FLOOR_Y = 6, K = 3;
const SHAPES = {
  E: [[0,0],[1,0],[2,0],[0,1],[0,2],[1,2],[2,2]],
  RING: [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2]],
  U: [[0,0],[2,0],[0,1],[1,1],[2,1]],
  L4: [[0,0],[1,0],[2,0],[0,1]],
  T: [[0,0],[1,0],[2,0],[1,1]],
  SQ: [[0,0],[1,0],[0,1],[1,1]],
  V3: [[0,0],[0,1],[0,2]],
  I3: [[0,0],[1,0],[2,0]],
};
function width(cells) { return Math.max(...cells.map(([x]) => x)) + 1; }
function sweepHits(cells, ox, oy, nubs, k) {
  for (let s = 1; s <= k; s++)
    for (const [cx, cy] of cells)
      if (nubs.has(`${cx + ox},${cy + oy - s}`)) return true;
  return false;
}
function search(targetName, rejectNames, targetOx, maxNubs) {
  const target = SHAPES[targetName];
  const oy = FLOOR_Y - (Math.max(...target.map(([, y]) => y)) + 0) - 0; // target base at floor: cells y relative; place so max y = FLOOR_Y
  const tOy = FLOOR_Y - Math.max(...target.map(([, y]) => y));
  // nubs forbidden anywhere on target's swept region
  const forbidden = new Set();
  for (let s = 0; s <= K; s++)
    for (const [cx, cy] of target) forbidden.add(`${cx + targetOx},${cy + tOy - s}`);
  const pool = [];
  for (let y = 1; y <= FLOOR_Y; y++)
    for (let x = 1; x <= W - 2; x++)
      if (!forbidden.has(`${x},${y}`)) pool.push([x, y]);
  // reject placements: every x offset such that the shape's cells stay in 1..W-2
  const rejectPlacements = [];
  for (const rn of rejectNames) {
    const cells = SHAPES[rn];
    const ry = FLOOR_Y - Math.max(...cells.map(([, y]) => y));
    for (let ox = 1; ox + width(cells) - 1 <= W - 2; ox++)
      rejectPlacements.push({ name: rn, cells, ox, oy: ry });
  }
  // a nub set works if EVERY reject placement collides within K steps
  function rejectsAll(nubSet) {
    return rejectPlacements.every((p) => sweepHits(p.cells, p.ox, p.oy, nubSet, K));
  }
  // greedy + backtrack over combos (pool is big; do random-restart greedy)
  const results = [];
  function greedyOrder() {
    // score each pool cell by how many reject placements it helps reject
    const scored = pool.map(([x, y]) => {
      const set = new Set([`${x},${y}`]);
      const c = rejectPlacements.filter((p) => sweepHits(p.cells, p.ox, p.oy, set, K)).length;
      return { x, y, c };
    }).filter((s) => s.c > 0).sort((a, b) => b.c - a.c);
    const chosen = [];
    const nubSet = new Set();
    let remaining = [...rejectPlacements];
    for (const s of scored) {
      if (!remaining.length) break;
      if (chosen.length >= maxNubs) break;
      const key = `${s.x},${s.y}`;
      if (nubSet.has(key)) continue;
      const helps = remaining.some((p) => sweepHits(p.cells, p.ox, p.oy, new Set([key]), K));
      if (!helps) continue;
      chosen.push([s.x, s.y]);
      nubSet.add(key);
      remaining = remaining.filter((p) => !sweepHits(p.cells, p.ox, p.oy, nubSet, K));
    }
    return { chosen, done: remaining.length === 0, remainingCount: remaining.length };
  }
  return greedyOrder();
}
const target = process.argv[2] ?? "E";
const rejects = (process.argv[3] ?? "U,L4,T,SQ,V3,I3").split(",");
const ox = Number(process.argv[4] ?? 4);
const r = search(target, rejects, ox, Number(process.argv[5] ?? 5));
console.log(`target=${target}@ox=${ox} rejects=${rejects} nubs=${JSON.stringify(r.chosen)} done=${r.done} remaining=${r.remainingCount}`);
const nubSet = new Set(r.chosen.map(([x, y]) => `${x},${y}`));
const tcells = new Set(SHAPES[target].map(([cx, cy]) => `${cx + ox},${cy + FLOOR_Y - Math.max(...SHAPES[target].map(([, y]) => y))}`));
for (let y = 0; y <= FLOOR_Y + 1; y++) {
  let row = "";
  for (let x = 0; x < W; x++)
    row += x === 0 || x === W - 1 || y === FLOOR_Y + 1 ? "#" : nubSet.has(`${x},${y}`) ? "#" : tcells.has(`${x},${y}`) ? "M" : ".";
  console.log(row);
}

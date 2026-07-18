// Search for a "comb gate": a set of wall nub cells such that translating the
// target shape UP by k steps stays clear, while every shape in the reject set
// collides at some step <= k. Shapes given as relative cell sets.
// usage: comb-search.mjs
const L = [[0,0],[1,0],[2,0],[0,1]];          // 4-cell L (arm + foot)
const SQ = [[0,0],[1,0],[0,1],[1,1]];          // 2x2 square
const T = [[0,0],[1,0],[2,0],[1,1]];           // T
const I3 = [[0,0],[1,0],[2,0]];                // horizontal bar
const V3 = [[0,0],[0,1],[0,2]];                // vertical bar
const RING = [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2]]; // 8-ring
const shapes = { L, SQ, T, I3, V3, RING };
const W = 8, H = 9; // board interior-ish; walls at border implied
function collides(shapeCells, ox, oy, dx, dy, nubs) {
  return shapeCells.some(([cx, cy]) => nubs.has(`${cx + ox + dx},${cy + oy + dy}`));
}
// target: shape placed with origin (ox,oy); rises k steps.
// nubs: candidate wall cells within board (excluding border ring).
// brute force over subsets of a candidate pool is too big; instead greedy:
// find nub sets of size <= 4 that reject all rejects at some step of 1..k
// while never hitting target at steps 1..k.
function search(target, rejects, k, maxNubs) {
  const ox = 3, oy = 5; // target origin
  // candidate nub cells: any cell in [1..W-2]x[1..oy-1] that is NOT on the
  // target's swept path (those would hit target) — actually we WANT some
  // nubs near the path to reject others; nubs on target path are forbidden.
  const forbidden = new Set();
  for (let s = 1; s <= k; s++)
    for (const [cx, cy] of target) forbidden.add(`${cx + ox},${cy + oy - s}`);
  // also nubs can't be ON the target start cells
  for (const [cx, cy] of target) forbidden.add(`${cx + ox},${cy + oy}`);
  const pool = [];
  for (let y = 1; y <= oy + 1; y++)
    for (let x = 1; x <= W - 2; x++)
      if (!forbidden.has(`${x},${y}`)) pool.push([x, y]);
  // a nub set rejects shape S if for SOME step s in 1..k, some S cell lands on a nub
  // (S placed at same origin ox,oy)
  function rejectedBy(nubSet, S) {
    for (let s = 1; s <= k; s++)
      for (const [cx, cy] of S)
        if (nubSet.has(`${cx + ox},${cy + oy - s}`)) return true;
    return false;
  }
  // greedy set cover: pick nubs that reject the most not-yet-rejected shapes
  const results = [];
  function greedy() {
    let remaining = [...rejects];
    const chosen = [];
    while (remaining.length && chosen.length < maxNubs) {
      let best = null, bestCount = 0;
      for (const [x, y] of pool) {
        if (chosen.some(([cx, cy]) => cx === x && cy === y)) continue;
        const set = new Set(chosen.map(([cx, cy]) => `${cx},${cy}`));
        set.add(`${x},${y}`);
        const c = remaining.filter((S) => rejectedBy(set, S)).length;
        if (c > bestCount) { bestCount = c; best = [x, y]; }
      }
      if (!best) break;
      chosen.push(best);
      remaining = remaining.filter((S) => !rejectedBy(new Set(chosen.map(([cx, cy]) => `${cx},${cy}`)), S));
    }
    return { chosen, rejectedAll: remaining.length === 0, remaining: remaining.map((S) => Object.keys(shapes).find((k2) => shapes[k2] === S)) };
  }
  return greedy();
}
const target = L;
const rejects = [SQ, T, I3, V3];
const r = search(target, rejects, 3, 5);
console.log(`target=L origin(3,5) k=3`);
console.log(`nubs: ${JSON.stringify(r.chosen)}`);
console.log(`rejectedAll=${r.rejectedAll} remaining=${r.remaining.join(",") || "-"}`);
// visual
const nubSet = new Set(r.chosen.map(([x, y]) => `${x},${y}`));
for (let y = 0; y < 8; y++) {
  let row = "";
  for (let x = 0; x < 9; x++) {
    const onTarget = L.some(([cx, cy]) => cx + 3 === x && cy + 5 === y);
    row += nubSet.has(`${x},${y}`) ? "#" : onTarget ? "M" : ".";
  }
  console.log(row);
}

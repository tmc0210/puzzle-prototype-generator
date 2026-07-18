// Exhaustive comb-gate search: for a TARGET shape at a fixed start, find ALL
// minimal nub sets (up to size N, within a small region) that let the target
// rise K steps while blocking every REJECT shape at every x-offset.
// Uses DFS over candidate cells sorted by reject-coverage.
const W = 11, K = 3;
const SHAPES = {
  E: [[0,0],[1,0],[2,0],[0,1],[0,2],[1,2],[2,2]],
  RING: [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2]],
  U: [[0,0],[2,0],[0,1],[1,1],[2,1]],
  L4: [[0,0],[1,0],[2,0],[0,1]],
  J4: [[0,0],[1,0],[2,0],[2,1]],
  T: [[0,0],[1,0],[2,0],[1,1]],
  SQ: [[0,0],[1,0],[0,1],[1,1]],
  V3: [[0,0],[0,1],[0,2]],
  I3: [[0,0],[1,0],[2,0]],
  Z: [[0,0],[1,0],[1,1],[2,1]],
  S: [[1,0],[2,0],[0,1],[1,1]],
  P: [[0,0],[1,0],[0,1],[1,1],[0,2]],
};
const FLOOR_Y = 7;
function baseY(cells) { return FLOOR_Y - Math.max(...cells.map(([, y]) => y)); }
function w(cells) { return Math.max(...cells.map(([x]) => x)) + 1; }
function sweepHits(cells, ox, oy, nubSet, k) {
  for (let s = 1; s <= k; s++)
    for (const [cx, cy] of cells)
      if (nubSet.has(`${cx + ox},${cy + oy - s}`)) return true;
  return false;
}
function solve(targetName, rejectNames, targetOx, maxNubs) {
  const target = SHAPES[targetName];
  const toy = baseY(target);
  const forbidden = new Set();
  for (let s = 0; s <= K; s++)
    for (const [cx, cy] of target) forbidden.add(`${cx + targetOx},${cy + toy - s}`);
  // reject placements at all x offsets
  const placements = [];
  for (const rn of rejectNames) {
    const cells = SHAPES[rn];
    const oy = baseY(cells);
    for (let ox = 1; ox + w(cells) - 1 <= W - 2; ox++) placements.push({ rn, cells, ox, oy });
  }
  // candidate nub cells: any non-forbidden cell in rows 1..FLOOR_Y, cols 1..W-2
  // that blocks at least one placement
  const cand = [];
  for (let y = 1; y < FLOOR_Y; y++)
    for (let x = 1; x <= W - 2; x++) {
      const key = `${x},${y}`;
      if (forbidden.has(key)) continue;
      const hits = placements.filter((p) => sweepHits(p.cells, p.ox, p.oy, new Set([key]), K)).length;
      if (hits > 0) cand.push({ x, y, hits });
    }
  cand.sort((a, b) => b.hits - a.hits);
  const solutions = [];
  const chosen = [];
  const chosenSet = new Set();
  function uncovered() {
    return placements.filter((p) => !sweepHits(p.cells, p.ox, p.oy, chosenSet, K));
  }
  function dfs(startIdx) {
    if (solutions.length > 20) return;
    const un = uncovered();
    if (un.length === 0) { solutions.push([...chosen]); return; }
    if (chosen.length >= maxNubs) return;
    for (let i = startIdx; i < cand.length; i++) {
      const c = cand[i];
      const key = `${c.x},${c.y}`;
      // must cover at least one currently-uncovered placement
      if (!un.some((p) => sweepHits(p.cells, p.ox, p.oy, new Set([key]), K))) continue;
      chosen.push([c.x, c.y]); chosenSet.add(key);
      dfs(i + 1);
      chosen.pop(); chosenSet.delete(key);
    }
  }
  dfs(0);
  return solutions;
}
const [target, rejectsS, oxS, maxS] = process.argv.slice(2);
const sols = solve(target, rejectsS.split(","), Number(oxS ?? 4), Number(maxS ?? 3));
console.log(`target=${target} ox=${oxS ?? 4} rejects=${rejectsS} maxNubs=${maxS ?? 3}: ${sols.length} solutions`);
for (const sol of sols.slice(0, 5)) {
  console.log(`\nnubs: ${JSON.stringify(sol)}`);
  const nubSet = new Set(sol.map(([x, y]) => `${x},${y}`));
  const t = SHAPES[target];
  const tset = new Set(t.map(([cx, cy]) => `${cx + Number(oxS ?? 4)},${cy + baseY(t)}`));
  for (let y = 0; y <= FLOOR_Y + 1; y++) {
    let row = "";
    for (let x = 0; x < W; x++)
      row += x === 0 || x === W - 1 || y === 0 || y === FLOOR_Y + 1 ? "#" : nubSet.has(`${x},${y}`) ? "#" : tset.has(`${x},${y}`) ? "M" : ".";
    console.log(row);
  }
}

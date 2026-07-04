import { loadPrototypePackage } from "../../../src/core/io.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";
import { compareIceSlideStarts } from "../../../src/prototypes/ice_slide_escape/tools/startComparison.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const baseRows = [
  "###########",
  "#....#....#",
  "#.#..#....#",
  "#....I.####",
  "#I..I....##",
  "#.#####.###",
];
const A: Pt = [1, 5];
const B: Pt = [7, 5];
const C: Pt = [7, 5];
const D: Pt = [10, 4];
const existingIce = new Set(["5,3", "1,4", "4,4"]);
const lateForbidden = ["ice_pass_through_d5", "slide_restart_after_group", "ice_destroy_group_d6_plus"];

function key(p: Pt): string {
  return `${p[0]},${p[1]}`;
}
function same(a: Pt, b: Pt): boolean {
  return a[0] === b[0] && a[1] === b[1];
}
function eventType(e: string): string {
  return e.split(":")[0]!;
}
function count(events: string[], type: string): number {
  return events.filter((e) => eventType(e) === type).length;
}
function level(id: string, layout: string, start: Pt, goal: Pt): LevelDoc {
  return {
    id,
    title: id,
    role: "challenge",
    status: "candidate",
    targets: [],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
    win: { type: "ice_slide_escape_explicit_goal", player_start: start, player_goal: goal } satisfies WinCondition,
  };
}
function staticPath(layout: string, start: Pt, goal: Pt, blocked: Set<string>): boolean {
  const rows = layout.split("\n");
  const q: Pt[] = [start];
  const seen = new Set([key(start)]);
  for (let i = 0; i < q.length; i += 1) {
    const [x, y] = q[i]!;
    if (same([x, y], goal)) return true;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as Pt[]) {
      const nx = x + dx;
      const ny = y + dy;
      if (ny < 0 || ny >= rows.length || nx < 0 || nx >= rows[ny]!.length) continue;
      if (rows[ny]![nx] === "#" || blocked.has(`${nx},${ny}`)) continue;
      const k = `${nx},${ny}`;
      if (!seen.has(k)) {
        seen.add(k);
        q.push([nx, ny]);
      }
    }
  }
  return false;
}
function makeLayout(star: Pt, removeIceKeys: Set<string>): string {
  const grid = baseRows.map((r) => [...r]);
  for (const ice of existingIce) {
    if (!removeIceKeys.has(ice)) {
      const [x, y] = ice.split(",").map(Number) as Pt;
      grid[y]![x] = "I";
    }
  }
  grid[star[1]]![star[0]] = "*";
  return grid.map((r) => r.join("")).join("\n");
}

const cells: Pt[] = [];
for (let y = 0; y < baseRows.length; y += 1) {
  for (let x = 0; x < baseRows[y]!.length; x += 1) {
    if (baseRows[y]![x] !== "#") cells.push([x, y]);
  }
}

const hits: unknown[] = [];
for (const star of cells) {
  for (let mask = 0; mask < 8; mask += 1) {
    const remove = new Set<string>();
    [...existingIce].forEach((ice, index) => {
      if ((mask & (1 << index)) !== 0) remove.add(ice);
    });
    const layout = makeLayout(star, remove);
    const starBlock = new Set([key(star)]);
    if (staticPath(layout, A, B, starBlock)) continue;
    if (!staticPath(layout, A, B, new Set())) continue;
    if (staticPath(layout, C, D, starBlock)) continue;
    if (!staticPath(layout, C, D, new Set())) continue;
    try {
      const base = analyzeLevel(pkg, level(`r43_0035like_base_${key(star)}_${mask}`, layout, A, B), {
        maxStates: 120000,
        graphMaxStates: 120000,
        maxDepth: 160,
        bypassMaxStates: 120000,
      });
      const meta = analyzeLevel(pkg, level(`r43_0035like_meta_${key(star)}_${mask}`, layout, C, D), {
        maxStates: 120000,
        graphMaxStates: 120000,
        maxDepth: 160,
        bypassMaxStates: 120000,
      });
      if (!base.solution.found || !meta.solution.found) continue;
      if (base.graph.status !== "complete" || meta.graph.status !== "complete") continue;
      if (count(base.solution.events, "push_ice") < 2 || count(meta.solution.events, "push_ice") < 2) continue;
      const gate = compareIceSlideStarts(pkg, layout, {
        id: `r43_0035like_gate_${key(star)}_${mask}`,
        title: `r43_0035like_gate_${key(star)}_${mask}`,
        role: "challenge",
        supportLevel: "none",
        targets: [],
        playerGoal: B,
        starts: [A],
        requiredWinningEvents: [],
        forbiddenWinningEvents: [],
        forbiddenReachableEvents: lateForbidden,
        maxStates: 120000,
        maxDepth: 160,
        graphMaxStates: 120000,
      });
      if (gate.starts[0]?.machineGate !== "pass") continue;
      hits.push({
        star,
        remove: [...remove],
        layout,
        base: {
          cost: base.solution.cost,
          events: base.solution.events,
          states: base.graph.reachableStateCount,
          wins: base.graph.winStateCount,
        },
        meta: {
          cost: meta.solution.cost,
          events: meta.solution.events,
          states: meta.graph.reachableStateCount,
          wins: meta.graph.winStateCount,
        },
        baseGate: gate.starts[0],
      });
    } catch {
      // skip
    }
  }
}
console.log(JSON.stringify({ hitCount: hits.length, hits }, null, 2));

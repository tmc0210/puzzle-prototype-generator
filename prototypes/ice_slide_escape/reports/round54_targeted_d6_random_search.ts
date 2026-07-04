import { loadPrototypePackage } from "../../../src/core/io.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { compareIceSlideStarts } from "../../../src/prototypes/ice_slide_escape/tools/startComparison.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

const seed0 = Number(process.argv[2] ?? 5401);
const iterations = Number(process.argv[3] ?? 2000);
const fastStates = Number(process.argv[4] ?? 30000);
const fullStates = Number(process.argv[5] ?? 120000);
const maxDepth = Number(process.argv[6] ?? 200);

let seed = seed0 >>> 0;
function rnd(): number {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0x100000000;
}
function choice<T>(items: T[]): T {
  return items[Math.floor(rnd() * items.length)]!;
}
function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}
function key(p: Pt): string {
  return `${p[0]},${p[1]}`;
}
function same(a: Pt, b: Pt): boolean {
  return a[0] === b[0] && a[1] === b[1];
}
function eventType(event: string): string {
  return event.split(":")[0]!;
}
function has(events: string[], pattern: string): boolean {
  return events.some((event) => eventMatchesPattern(event, pattern));
}
function count(events: string[], type: string): number {
  return events.filter((event) => eventType(event) === type).length;
}
function hasAny(events: string[], types: string[]): boolean {
  return events.some((event) => types.includes(eventType(event)));
}
function levelFor(id: string, layout: string, start: Pt, goal: Pt): LevelDoc {
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
    win: {
      type: "ice_slide_escape_explicit_goal",
      player_start: start,
      player_goal: goal,
    } satisfies WinCondition,
  };
}
function edgeCells(w: number, h: number): Pt[] {
  const pts: Pt[] = [];
  for (let x = 1; x < w - 1; x += 1) pts.push([x, 0], [x, h - 1]);
  for (let y = 1; y < h - 1; y += 1) pts.push([0, y], [w - 1, y]);
  return pts;
}
function inBounds(w: number, h: number, p: Pt): boolean {
  return p[0] >= 0 && p[0] < w && p[1] >= 0 && p[1] < h;
}
function staticPath(layout: string, start: Pt, goal: Pt, blocked: Set<string>): boolean {
  const rows = layout.split("\n");
  const h = rows.length;
  const w = rows[0]!.length;
  const q: Pt[] = [start];
  const seen = new Set<string>([key(start)]);
  for (let i = 0; i < q.length; i += 1) {
    const p = q[i]!;
    if (same(p, goal)) return true;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as Pt[]) {
      const np: Pt = [p[0] + dx, p[1] + dy];
      if (!inBounds(w, h, np)) continue;
      const c = rows[np[1]]![np[0]]!;
      if (c === "#" || blocked.has(key(np))) continue;
      const k = key(np);
      if (!seen.has(k)) {
        seen.add(k);
        q.push(np);
      }
    }
  }
  return false;
}
function floorConnected(layout: string, required: Pt[]): boolean {
  const rows = layout.split("\n");
  const floors: Pt[] = [];
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[0]!.length; x += 1) {
      if (rows[y]![x] !== "#") floors.push([x, y]);
    }
  }
  if (floors.length === 0) return false;
  const q: Pt[] = [floors[0]!];
  const seen = new Set<string>([key(floors[0]!)]);
  for (let i = 0; i < q.length; i += 1) {
    const p = q[i]!;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as Pt[]) {
      const np: Pt = [p[0] + dx, p[1] + dy];
      if (!inBounds(rows[0]!.length, rows.length, np)) continue;
      if (rows[np[1]]![np[0]] === "#") continue;
      const k = key(np);
      if (!seen.has(k)) {
        seen.add(k);
        q.push(np);
      }
    }
  }
  return required.every((p) => seen.has(key(p)));
}
function charAtSnapshot(snapshot: string, p: Pt): string | undefined {
  return snapshot.split("\n")[p[1]]?.[p[0]];
}
function hasTargetDebt(analysis: any, stars: Pt[]): boolean {
  const snapshots = analysis.keySnapshots ?? [];
  return snapshots.some((snap: any) =>
    stars.some((star) => charAtSnapshot(snap.before ?? "", star) === "G" || charAtSnapshot(snap.after ?? "", star) === "G"),
  );
}
function icePositions(snapshot: string): Set<string> {
  const out = new Set<string>();
  const rows = snapshot.split("\n");
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y]!.length; x += 1) {
      const c = rows[y]![x]!;
      if (c === "I" || c === "*") out.add(`${x},${y}`);
    }
  }
  return out;
}
function d6AfterIceMovedLater(analysis: any): boolean {
  const snaps = analysis.keySnapshots ?? [];
  const d6Index = snaps.findIndex((snap: any) =>
    (snap.events ?? []).some((event: string) => eventMatchesPattern(event, "ice_destroy_group_d6_plus")),
  );
  if (d6Index < 0) return false;
  const after = icePositions(snaps[d6Index]!.after ?? "");
  const before = icePositions(snaps[d6Index]!.before ?? "");
  const newOrMoved = [...after].filter((p) => !before.has(p));
  if (newOrMoved.length === 0) return false;
  for (let i = d6Index + 1; i < snaps.length; i += 1) {
    const snap = snaps[i]!;
    if (!(snap.events ?? []).includes("push_ice")) continue;
    const b = icePositions(snap.before ?? "");
    const a = icePositions(snap.after ?? "");
    if (newOrMoved.some((p) => b.has(p) && !a.has(p))) return true;
  }
  return false;
}

type BuildResult = { layout: string; edges: Pt[]; stars: Pt[]; launcher: { C: Pt; ice: Pt; dir: string } };

function carveD6Launcher(grid: string[][], edges: Pt[]): { C: Pt; ice: Pt; dir: string } | undefined {
  const h = grid.length;
  const w = grid[0]!.length;
  const dirs = shuffle(["left", "right", "down", "up"]);
  for (const dir of dirs) {
    const d = choice([6, 7]);
    if (dir === "left") {
      const y = 1 + Math.floor(rnd() * (h - 2));
      const C: Pt = [w - 1, y];
      const ice: Pt = [w - 2, y];
      const obstacleX = ice[0] - d - 1;
      if (obstacleX < 2) continue;
      grid[C[1]]![C[0]] = ".";
      grid[ice[1]]![ice[0]] = "I";
      for (let x = obstacleX + 1; x < ice[0]; x += 1) grid[y]![x] = ".";
      grid[y]![obstacleX] = "#";
      grid[y]![obstacleX - 1] = ".";
      grid[y]![obstacleX - 2] = "#";
      edges.push(C);
      return { C, ice, dir };
    }
    if (dir === "right") {
      const y = 1 + Math.floor(rnd() * (h - 2));
      const C: Pt = [0, y];
      const ice: Pt = [1, y];
      const obstacleX = ice[0] + d + 1;
      if (obstacleX > w - 3) continue;
      grid[C[1]]![C[0]] = ".";
      grid[ice[1]]![ice[0]] = "I";
      for (let x = ice[0] + 1; x < obstacleX; x += 1) grid[y]![x] = ".";
      grid[y]![obstacleX] = "#";
      grid[y]![obstacleX + 1] = ".";
      grid[y]![obstacleX + 2] = "#";
      edges.push(C);
      return { C, ice, dir };
    }
    if (dir === "down") {
      const x = 1 + Math.floor(rnd() * (w - 2));
      const C: Pt = [x, 0];
      const ice: Pt = [x, 1];
      const obstacleY = ice[1] + d + 1;
      if (obstacleY > h - 3) continue;
      grid[C[1]]![C[0]] = ".";
      grid[ice[1]]![ice[0]] = "I";
      for (let y = ice[1] + 1; y < obstacleY; y += 1) grid[y]![x] = ".";
      grid[obstacleY]![x] = "#";
      grid[obstacleY + 1]![x] = ".";
      grid[obstacleY + 2]![x] = "#";
      edges.push(C);
      return { C, ice, dir };
    }
    if (dir === "up") {
      const x = 1 + Math.floor(rnd() * (w - 2));
      const C: Pt = [x, h - 1];
      const ice: Pt = [x, h - 2];
      const obstacleY = ice[1] - d - 1;
      if (obstacleY < 2) continue;
      grid[C[1]]![C[0]] = ".";
      grid[ice[1]]![ice[0]] = "I";
      for (let y = obstacleY + 1; y < ice[1]; y += 1) grid[y]![x] = ".";
      grid[obstacleY]![x] = "#";
      grid[obstacleY - 1]![x] = ".";
      grid[obstacleY - 2]![x] = "#";
      edges.push(C);
      return { C, ice, dir };
    }
  }
  return undefined;
}

function buildLayout(): BuildResult | undefined {
  const w = choice([11, 12, 13, 14]);
  const h = choice([8, 9, 10, 11]);
  const grid = Array.from({ length: h }, (_, y) =>
    Array.from({ length: w }, (_, x) => {
      const edge = x === 0 || y === 0 || x === w - 1 || y === h - 1;
      if (edge) return "#";
      return rnd() < 0.34 ? "#" : ".";
    }),
  );
  const edges: Pt[] = [];
  const launcher = carveD6Launcher(grid, edges);
  if (!launcher) return undefined;

  // Open several explicit interface candidates, separated from C. Final
  // candidates still need a later edge-risk sealing pass; this is discovery.
  const availableEdges = shuffle(edgeCells(w, h).filter((p) => !same(p, launcher.C)));
  for (const p of availableEdges.slice(0, 7)) {
    grid[p[1]]![p[0]] = ".";
    edges.push(p);
  }
  if (edges.length < 4) return undefined;

  // Add a little room around each interface.
  for (const [x, y] of edges) {
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as Pt[]) {
      const p: Pt = [x + dx, y + dy];
      if (inBounds(w, h, p) && p[0] > 0 && p[1] > 0 && p[0] < w - 1 && p[1] < h - 1) {
        grid[p[1]]![p[0]] = ".";
      }
    }
  }

  let layout = grid.map((row) => row.join("")).join("\n");
  if (!floorConnected(layout, edges)) return undefined;

  const inner: Pt[] = [];
  for (let y = 1; y < h - 1; y += 1) {
    for (let x = 1; x < w - 1; x += 1) {
      if (grid[y]![x] === ".") inner.push([x, y]);
    }
  }
  if (inner.length < 18 || inner.length > 58) return undefined;

  const blockerCandidates: Pt[] = [];
  for (const p of inner) {
    const blocked = new Set<string>([key(p)]);
    if (edges.some((a) => edges.some((b) => !same(a, b) && !staticPath(layout, a, b, blocked) && staticPath(layout, a, b, new Set())))) {
      blockerCandidates.push(p);
    }
  }
  if (blockerCandidates.length === 0) return undefined;

  const stars: Pt[] = [];
  for (const p of shuffle(blockerCandidates)) {
    if (stars.length >= choice([1, 2, 2])) break;
    if (same(p, launcher.ice)) continue;
    stars.push(p);
  }
  if (stars.length === 0) return undefined;
  for (const [x, y] of stars) grid[y]![x] = "*";

  const used = new Set([...stars.map(key), key(launcher.ice)]);
  for (const [x, y] of shuffle(inner).filter((p) => !used.has(key(p))).slice(0, choice([0, 1, 1, 2]))) {
    grid[y]![x] = "I";
  }
  layout = grid.map((row) => row.join("")).join("\n");
  return { layout, edges, stars, launcher };
}

const lateForbidden = ["ice_pass_through_d5", "slide_restart_after_group", "ice_destroy_group_d6_plus"];
const hits: any[] = [];
const nearMisses: any[] = [];
const counters: Record<string, number> = {
  generated: 0,
  built: 0,
  fastPairs: 0,
  fullPairs: 0,
  baseGatePass: 0,
  metaD6BeforeDebt: 0,
  metaD6Considered: 0,
  d6Consumed: 0,
  interfaceClean: 0,
};

for (let iter = 0; iter < iterations; iter += 1) {
  counters.generated += 1;
  const built = buildLayout();
  if (!built) continue;
  counters.built += 1;
  const { layout, edges, stars, launcher } = built;
  const fastPairs: Array<{ start: Pt; goal: Pt; solution: any }> = [];
  for (const start of edges) {
    for (const goal of edges) {
      if (same(start, goal)) continue;
      try {
        const level = levelFor(`r54_fast_${iter}_${key(start)}_${key(goal)}`, layout, start, goal);
        const initial = adapter.parseLevel(level);
        const solution = solveWithRuntime(runtime, initial, {
          winCondition: level.win,
          maxStates: fastStates,
          maxDepth,
        });
        if (!solution.found || count(solution.events, "push_ice") < 1) continue;
        fastPairs.push({ start, goal, solution });
      } catch {
        // ignore
      }
    }
  }
  if (fastPairs.length < 2) continue;
  counters.fastPairs += 1;

  const fullPairs: Array<{ start: Pt; goal: Pt; analysis: any }> = [];
  for (const p of fastPairs) {
    try {
      const analysis = analyzeLevel(pkg, levelFor(`r54_full_${iter}_${key(p.start)}_${key(p.goal)}`, layout, p.start, p.goal), {
        maxStates: fullStates,
        maxDepth,
        graphMaxStates: fullStates,
        bypassMaxStates: fullStates,
      });
      if (!analysis.solution.found || analysis.graph.status !== "complete") continue;
      fullPairs.push({ start: p.start, goal: p.goal, analysis });
    } catch {
      // ignore
    }
  }
  if (fullPairs.length < 2) continue;
  counters.fullPairs += 1;

  for (const base of fullPairs) {
    const be = base.analysis.solution.events as string[];
    if (count(be, "push_ice") < 2) continue;
    if (hasAny(be, lateForbidden)) continue;
    if (!hasTargetDebt(base.analysis, stars)) continue;
    let baseGate: any;
    try {
      baseGate = compareIceSlideStarts(pkg, layout, {
        id: `r54_base_gate_${iter}`,
        title: `r54_base_gate_${iter}`,
        role: "challenge",
        supportLevel: "none",
        targets: [],
        playerGoal: base.goal,
        starts: [base.start],
        requiredWinningEvents: [],
        forbiddenWinningEvents: lateForbidden,
        forbiddenReachableEvents: lateForbidden,
        maxStates: fullStates,
        maxDepth,
        graphMaxStates: fullStates,
      });
    } catch {
      continue;
    }
    if (baseGate.starts[0]?.machineGate !== "pass") continue;
    counters.baseGatePass += 1;

    for (const meta of fullPairs) {
      if (new Set([base.start, base.goal, meta.start, meta.goal].map(key)).size !== 4) continue;
      const me = meta.analysis.solution.events as string[];
      if (!has(me, "ice_destroy_group_d6_plus") || !has(me, "slide_restart_after_group")) continue;
      counters.metaD6BeforeDebt += 1;
      if (!hasTargetDebt(meta.analysis, stars)) {
        if (nearMisses.length < 12) {
          nearMisses.push({
            reason: "d6_present_but_no_target_debt",
            layout,
            A: base.start,
            B: base.goal,
            C: meta.start,
            D: meta.goal,
            stars,
            launcher,
            base: { cost: base.analysis.solution.cost, events: be, inputs: base.analysis.solution.inputs },
            meta: { cost: meta.analysis.solution.cost, events: me, inputs: meta.analysis.solution.inputs },
          });
        }
        continue;
      }
      counters.metaD6Considered += 1;
      const consumed = d6AfterIceMovedLater(meta.analysis);
      if (!consumed) {
        if (nearMisses.length < 12) {
          nearMisses.push({
            reason: "d6_present_but_product_not_moved_later",
            layout,
            A: base.start,
            B: base.goal,
            C: meta.start,
            D: meta.goal,
            stars,
            launcher,
            base: { cost: base.analysis.solution.cost, events: be, inputs: base.analysis.solution.inputs },
            meta: { cost: meta.analysis.solution.cost, events: me, inputs: meta.analysis.solution.inputs },
          });
        }
        continue;
      }
      counters.d6Consumed += 1;

      const aToD = fullPairs.find((p) => same(p.start, base.start) && same(p.goal, meta.goal));
      const bToD = fullPairs.find((p) => same(p.start, base.goal) && same(p.goal, meta.goal));
      if (aToD || bToD) continue;
      counters.interfaceClean += 1;

      const score =
        count(be, "push_ice") * 10 +
        count(me, "push_ice") * 16 +
        Math.min(base.analysis.solution.cost, 40) +
        Math.min(meta.analysis.solution.cost, 60) +
        Math.min(meta.analysis.graph.reachableStateCount, 5000) / 100;
      hits.push({
        score,
        layout,
        A: base.start,
        B: base.goal,
        C: meta.start,
        D: meta.goal,
        stars,
        launcher,
        base: {
          cost: base.analysis.solution.cost,
          inputs: base.analysis.solution.inputs,
          events: be,
          states: base.analysis.graph.reachableStateCount,
          wins: base.analysis.graph.winStateCount,
          commitments: base.analysis.agency?.solutionCommitmentCount,
          gate: baseGate.starts[0],
        },
        meta: {
          cost: meta.analysis.solution.cost,
          inputs: meta.analysis.solution.inputs,
          events: me,
          states: meta.analysis.graph.reachableStateCount,
          wins: meta.analysis.graph.winStateCount,
          commitments: meta.analysis.agency?.solutionCommitmentCount,
          d6Consumed,
        },
      });
      if (hits.length >= 20) break;
    }
    if (hits.length >= 20) break;
  }
  if (hits.length >= 20) break;
}

hits.sort((a, b) => b.score - a.score);
console.log(JSON.stringify({ seed: seed0, iterations, counters, hitCount: hits.length, top: hits.slice(0, 20), nearMisses }, null, 2));

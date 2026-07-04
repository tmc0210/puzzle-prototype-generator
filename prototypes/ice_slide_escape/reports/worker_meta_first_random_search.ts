import { loadPrototypePackage } from "../../../src/core/io.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { compareIceSlideStarts } from "../../../src/prototypes/ice_slide_escape/tools/startComparison.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const seed0 = Number(process.argv[2] ?? 20260702);
const iterations = Number(process.argv[3] ?? 1000);
const maxStates = Number(process.argv[4] ?? 80000);
const maxDepth = Number(process.argv[5] ?? 160);

let seed = seed0 >>> 0;
function rnd(): number {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0x100000000;
}
function choice<T>(items: T[]): T {
  return items[Math.floor(rnd() * items.length)]!;
}
function key(p: Pt): string {
  return `${p[0]},${p[1]}`;
}
function same(a: Pt, b: Pt): boolean {
  return a[0] === b[0] && a[1] === b[1];
}
function edgeCandidates(w: number, h: number): Pt[] {
  const pts: Pt[] = [];
  for (let x = 1; x < w - 1; x += 1) {
    pts.push([x, 0], [x, h - 1]);
  }
  for (let y = 1; y < h - 1; y += 1) {
    pts.push([0, y], [w - 1, y]);
  }
  return pts;
}
function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}
function buildLevel(id: string, layout: string, start: Pt, goal: Pt): LevelDoc {
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
function staticPath(layout: string, start: Pt, goal: Pt, ignoreTargets: boolean): boolean {
  const rows = layout.split("\n");
  const h = rows.length;
  const w = rows[0]!.length;
  const q: Pt[] = [start];
  const seen = new Set<string>([key(start)]);
  for (let i = 0; i < q.length; i += 1) {
    const [x, y] = q[i]!;
    if (x === goal[0] && y === goal[1]) return true;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as Pt[]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const c = rows[ny]![nx]!;
      if (c === "#" || c === "I" || (!ignoreTargets && c === "*")) continue;
      const k = `${nx},${ny}`;
      if (!seen.has(k)) {
        seen.add(k);
        q.push([nx, ny]);
      }
    }
  }
  return false;
}
function summarizeEvents(events: string[]): string[] {
  return [...new Set(events.filter((e) => e !== "walk").map((e) => e.split(":")[0]))].sort();
}
function candidateScore(base: any, meta: any): number {
  const baseKinds = summarizeEvents(base.solution.events);
  const metaKinds = summarizeEvents(meta.solution.events);
  const basePush = base.solution.events.filter((e: string) => e === "push_ice").length;
  const metaPush = meta.solution.events.filter((e: string) => e === "push_ice").length;
  let s = 0;
  s += basePush * 8 + metaPush * 10;
  s += baseKinds.length * 15 + metaKinds.length * 18;
  if (base.solution.events.some((e: string) => e.startsWith("ice_rebound_d4"))) s += 30;
  if (meta.solution.events.some((e: string) => e.startsWith("ice_destroy_group_d6_plus"))) s += 45;
  if (meta.solution.events.some((e: string) => e.startsWith("slide_restart_after_group"))) s += 15;
  if (base.solution.events.some((e: string) => e.startsWith("ice_boundary"))) s -= 12;
  s += Math.min(base.solution.cost, 35) + Math.min(meta.solution.cost, 45);
  return s;
}

type Hit = {
  score: number;
  layout: string;
  A: Pt;
  B: Pt;
  C: Pt;
  D: Pt;
  base: { cost: number; inputs: string[]; events: string[]; states: number; wins: number; shape?: string };
  meta: { cost: number; inputs: string[]; events: string[]; states: number; wins: number; shape?: string };
  baseGate?: unknown;
};

const hits: Hit[] = [];

for (let iter = 0; iter < iterations; iter += 1) {
  const w = choice([8, 9, 10]);
  const h = choice([6, 7]);
  const edges = shuffle(edgeCandidates(w, h)).slice(0, 4);
  const edgeSet = new Set(edges.map(key));
  const grid = Array.from({ length: h }, (_, y) =>
    Array.from({ length: w }, (_, x) => {
      const edge = x === 0 || y === 0 || x === w - 1 || y === h - 1;
      if (edge) return edgeSet.has(`${x},${y}`) ? "." : "#";
      return rnd() < 0.30 ? "#" : ".";
    }),
  );

  const inner: Pt[] = [];
  for (let y = 1; y < h - 1; y += 1) {
    for (let x = 1; x < w - 1; x += 1) {
      if (grid[y]![x] === ".") inner.push([x, y]);
    }
  }
  if (inner.length < 18) continue;

  const targets = shuffle(inner).slice(0, choice([1, 2]));
  for (const [x, y] of targets) grid[y]![x] = "*";
  const blocked = new Set(targets.map(key));
  const iceCount = choice([2, 3, 4]);
  for (const [x, y] of shuffle(inner).filter((p) => !blocked.has(key(p))).slice(0, iceCount)) {
    grid[y]![x] = "I";
  }

  const layout = grid.map((row) => row.join("")).join("\n");
  const promising: Array<{ start: Pt; goal: Pt; solution: any }> = [];
  for (const start of edges) {
    for (const goal of edges) {
      if (same(start, goal)) continue;
      try {
        const level = buildLevel(`worker_rand_${iter}`, layout, start, goal);
        const initial = adapter.parseLevel(level);
        const solution = solveWithRuntime(runtime, initial, {
          winCondition: level.win,
          maxStates: Math.min(maxStates, 20000),
          maxDepth,
        });
        if (!solution.found) continue;
        if (solution.events.every((e: string) => e === "walk")) continue;
        promising.push({ start, goal, solution });
      } catch {
        // ignore invalid/too-large cases
      }
    }
  }
  if (promising.length < 2) continue;

  const pairs: Array<{ start: Pt; goal: Pt; analysis: any }> = [];
  for (const item of promising) {
    try {
      const analysis = analyzeLevel(pkg, buildLevel(`worker_rand_${iter}`, layout, item.start, item.goal), {
        maxStates,
        maxDepth,
        graphMaxStates: maxStates,
        bypassMaxStates: maxStates,
      });
      if (!analysis.solution.found || analysis.graph.status !== "complete") continue;
      pairs.push({ start: item.start, goal: item.goal, analysis });
    } catch {
      // ignore
    }
  }
  if (pairs.length < 2) continue;

  for (const basePair of pairs) {
    const be = basePair.analysis.solution.events;
    const basePushes = be.filter((e: string) => e === "push_ice").length;
    if (basePushes < 2) continue;
    if (be.some((e: string) => e.startsWith("ice_destroy_group_d6_plus"))) continue;
    if (!be.some((e: string) => e.startsWith("ice_rebound_d4") || e.startsWith("ice_stop_short"))) continue;
    const baseStaticSealed =
      !staticPath(layout, basePair.start, basePair.goal, false) &&
      staticPath(layout, basePair.start, basePair.goal, true);
    if (!baseStaticSealed) continue;

    let gate: ReturnType<typeof compareIceSlideStarts> | undefined;
    try {
      gate = compareIceSlideStarts(pkg, layout, {
        id: `worker_rand_${iter}_base_gate`,
        title: `worker_rand_${iter}_base_gate`,
        role: "challenge",
        supportLevel: "none",
        targets: [],
        playerGoal: basePair.goal,
        starts: [basePair.start],
        requiredWinningEvents: [],
        forbiddenWinningEvents: [],
        forbiddenReachableEvents: ["ice_destroy_group_d6_plus"],
        maxStates,
        maxDepth,
        graphMaxStates: maxStates,
      });
    } catch {
      continue;
    }
    if (gate.starts[0]?.machineGate !== "pass") continue;

    for (const metaPair of pairs) {
      if (same(metaPair.start, basePair.start) || same(metaPair.start, basePair.goal)) continue;
      if (same(metaPair.goal, basePair.start) || same(metaPair.goal, basePair.goal)) continue;
      const me = metaPair.analysis.solution.events;
      const metaPushes = me.filter((e: string) => e === "push_ice").length;
      if (metaPushes < 2) continue;
      if (!me.some((e: string) => e.startsWith("ice_destroy_group_d6_plus"))) continue;
      const metaStaticSealed =
        !staticPath(layout, metaPair.start, metaPair.goal, false) &&
        staticPath(layout, metaPair.start, metaPair.goal, true);
      if (!metaStaticSealed) continue;
      const sc = candidateScore(basePair.analysis, metaPair.analysis);
      hits.push({
        score: sc,
        layout,
        A: basePair.start,
        B: basePair.goal,
        C: metaPair.start,
        D: metaPair.goal,
        base: {
          cost: basePair.analysis.solution.cost,
          inputs: basePair.analysis.solution.inputs,
          events: be,
          states: basePair.analysis.graph.reachableStateCount,
          wins: basePair.analysis.graph.winStateCount,
          shape: basePair.analysis.agency.scc?.winSubgraphShape,
        },
        meta: {
          cost: metaPair.analysis.solution.cost,
          inputs: metaPair.analysis.solution.inputs,
          events: me,
          states: metaPair.analysis.graph.reachableStateCount,
          wins: metaPair.analysis.graph.winStateCount,
          shape: metaPair.analysis.agency.scc?.winSubgraphShape,
        },
        baseGate: gate.starts[0],
      });
    }
  }
}

hits.sort((a, b) => b.score - a.score);
console.log(JSON.stringify({ seed: seed0, iterations, hits: hits.slice(0, 20) }, null, 2));

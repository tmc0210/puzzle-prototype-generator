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

const seed0 = Number(process.argv[2] ?? 20260703);
const iterations = Number(process.argv[3] ?? 2000);
const fastStates = Number(process.argv[4] ?? 25000);
const fullStates = Number(process.argv[5] ?? 100000);
const maxDepth = Number(process.argv[6] ?? 160);

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
function eventTypes(events: string[]): string[] {
  return [...new Set(events.map(eventType).filter((e) => e !== "walk"))].sort();
}
function countType(events: string[], type: string): number {
  return events.filter((e) => eventType(e) === type).length;
}
function hasAny(events: string[], types: string[]): boolean {
  return events.some((e) => types.includes(eventType(e)));
}
function nonWalkPushSignature(events: string[]): string[] {
  return events.map(eventType).filter((e) => e !== "walk" && e !== "push_ice");
}
function containsSubsequence(haystack: string[], needle: string[]): boolean {
  if (needle.length === 0) return true;
  let j = 0;
  for (const item of haystack) {
    if (item === needle[j]) j += 1;
    if (j >= needle.length) return true;
  }
  return false;
}
function charAtSnapshot(snapshot: string, p: Pt): string | undefined {
  const rows = snapshot.split("\n");
  return rows[p[1]]?.[p[0]];
}
function hasTargetDebt(analysis: any, stars: Pt[]): boolean {
  const snapshots = analysis.keySnapshots ?? [];
  for (const snap of snapshots) {
    for (const star of stars) {
      if (charAtSnapshot(snap.before ?? "", star) === "G" || charAtSnapshot(snap.after ?? "", star) === "G") {
        return true;
      }
    }
  }
  return false;
}
function edgeCells(w: number, h: number): Pt[] {
  const pts: Pt[] = [];
  for (let x = 1; x < w - 1; x += 1) pts.push([x, 0], [x, h - 1]);
  for (let y = 1; y < h - 1; y += 1) pts.push([0, y], [w - 1, y]);
  return pts;
}
function inBounds(rows: string[], p: Pt): boolean {
  return p[1] >= 0 && p[1] < rows.length && p[0] >= 0 && p[0] < rows[0]!.length;
}
function staticPath(layout: string, start: Pt, goal: Pt, blocked: Set<string>): boolean {
  const rows = layout.split("\n");
  const q: Pt[] = [start];
  const seen = new Set<string>([key(start)]);
  for (let i = 0; i < q.length; i += 1) {
    const p = q[i]!;
    if (same(p, goal)) return true;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as Pt[]) {
      const np: Pt = [p[0] + dx, p[1] + dy];
      if (!inBounds(rows, np)) continue;
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
function floorConnected(layout: string, required: Pt[]): boolean {
  const rows = layout.split("\n");
  const floors: Pt[] = [];
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y]!.length; x += 1) {
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
      if (!inBounds(rows, np)) continue;
      if (rows[np[1]]![np[0]] === "#") continue;
      const k = key(np);
      if (!seen.has(k)) {
        seen.add(k);
        q.push(np);
      }
    }
  }
  return floors.every((p) => seen.has(key(p))) && required.every((p) => seen.has(key(p)));
}
function makeLayout(iter: number): { layout: string; edges: Pt[]; stars: Pt[] } | undefined {
  const w = choice([9, 10, 11, 12]);
  const h = choice([7, 8, 9]);
  const edges = shuffle(edgeCells(w, h)).slice(0, 4);
  const edgeSet = new Set(edges.map(key));
  const grid = Array.from({ length: h }, (_, y) =>
    Array.from({ length: w }, (_, x) => {
      const edge = x === 0 || y === 0 || x === w - 1 || y === h - 1;
      if (edge) return edgeSet.has(`${x},${y}`) ? "." : "#";
      const cx = Math.abs(x - (w - 1) / 2) / w;
      const cy = Math.abs(y - (h - 1) / 2) / h;
      const centerBias = 0.18 + (cx + cy) * 0.24;
      return rnd() < Math.min(0.48, centerBias) ? "#" : ".";
    }),
  );

  // Keep a compact middle chamber from collapsing into isolated pinholes.
  for (let y = 2; y < h - 2; y += 1) {
    for (let x = 2; x < w - 2; x += 1) {
      if (rnd() < 0.16) grid[y]![x] = ".";
    }
  }

  let layout = grid.map((r) => r.join("")).join("\n");
  if (!floorConnected(layout, edges)) return undefined;

  const inner: Pt[] = [];
  for (let y = 1; y < h - 1; y += 1) {
    for (let x = 1; x < w - 1; x += 1) {
      if (grid[y]![x] === ".") inner.push([x, y]);
    }
  }
  if (inner.length < 16 || inner.length > 44) return undefined;

  const blockerCandidates: Pt[] = [];
  for (const p of inner) {
    const blocked = new Set<string>([key(p)]);
    let blocksSomePair = false;
    for (const a of edges) {
      for (const b of edges) {
        if (same(a, b)) continue;
        if (!staticPath(layout, a, b, blocked) && staticPath(layout, a, b, new Set())) {
          blocksSomePair = true;
        }
      }
    }
    if (blocksSomePair) blockerCandidates.push(p);
  }
  if (blockerCandidates.length === 0) return undefined;

  const starCount = choice([2, 2, 3]);
  const stars = [choice(blockerCandidates)];
  const restStars = shuffle(inner).filter((p) => !same(p, stars[0]!));
  for (const p of restStars) {
    if (stars.length >= starCount) break;
    stars.push(p);
  }
  for (const [x, y] of stars) grid[y]![x] = "*";
  const used = new Set(stars.map(key));
  const iceCount = choice([1, 2, 2, 3]);
  for (const [x, y] of shuffle(inner).filter((p) => !used.has(key(p))).slice(0, iceCount)) {
    grid[y]![x] = "I";
  }

  layout = grid.map((r) => r.join("")).join("\n");
  // Require at least one pair whose path is specifically sealed by target ice.
  const blockers = new Set(stars.map(key));
  let sealedPair = false;
  for (const a of edges) {
    for (const b of edges) {
      if (!same(a, b) && !staticPath(layout, a, b, blockers) && staticPath(layout, a, b, new Set())) {
        sealedPair = true;
      }
    }
  }
  if (!sealedPair) return undefined;
  return { layout, edges, stars };
}
type Pair = {
  start: Pt;
  goal: Pt;
  analysis: any;
};
type Hit = {
  score: number;
  layout: string;
  A: Pt;
  B: Pt;
  C: Pt;
  D: Pt;
  stars: Pt[];
  base: Record<string, unknown>;
  meta: Record<string, unknown>;
  notes: string[];
};

const hits: Hit[] = [];
const nearMisses: Hit[] = [];
const lateForbidden = ["ice_pass_through_d5", "slide_restart_after_group", "ice_destroy_group_d6_plus"];
const counters: Record<string, number> = {
  generated: 0,
  geometryAccepted: 0,
  hasFastPairs: 0,
  hasFullPairs: 0,
  baseGatePass: 0,
  distinctMetaConsidered: 0,
  rejectedSmallDoorOnly: 0,
  rejectedNoMetaLateOrShort: 0,
  rejectedReverseLike: 0,
  hits: 0,
};

for (let iter = 0; iter < iterations; iter += 1) {
  counters.generated += 1;
  const built = makeLayout(iter);
  if (!built) continue;
  counters.geometryAccepted += 1;
  const { layout, edges, stars } = built;
  const starBlockers = new Set(stars.map(key));
  const fastPairs: Array<{ start: Pt; goal: Pt; solution: any }> = [];
  for (const start of edges) {
    for (const goal of edges) {
      if (same(start, goal)) continue;
      if (staticPath(layout, start, goal, starBlockers)) continue;
      if (!staticPath(layout, start, goal, new Set())) continue;
      try {
        const level = levelFor(`r43_fast_${iter}_${key(start)}_${key(goal)}`, layout, start, goal);
        const initial = adapter.parseLevel(level);
        const solution = solveWithRuntime(runtime, initial, {
          winCondition: level.win,
          maxStates: fastStates,
          maxDepth,
        });
        if (!solution.found) continue;
        if (countType(solution.events, "push_ice") < 3) continue;
        fastPairs.push({ start, goal, solution });
      } catch {
        // ignore invalid/large cases
      }
    }
  }
  if (fastPairs.length < 2) continue;
  counters.hasFastPairs += 1;

  const pairs: Pair[] = [];
  for (const p of fastPairs) {
    try {
      const analysis = analyzeLevel(pkg, levelFor(`r43_full_${iter}_${key(p.start)}_${key(p.goal)}`, layout, p.start, p.goal), {
        maxStates: fullStates,
        maxDepth,
        graphMaxStates: fullStates,
        bypassMaxStates: fullStates,
      });
      if (!analysis.solution.found || analysis.graph.status !== "complete") continue;
      pairs.push({ start: p.start, goal: p.goal, analysis });
    } catch {
      // ignore
    }
  }
  if (pairs.length < 2) continue;
  counters.hasFullPairs += 1;

  for (const base of pairs) {
    const be = base.analysis.solution.events as string[];
    if (countType(be, "push_ice") < 3) continue;
    if (!hasAny(be, ["ice_rebound_d4", "ice_destroyed_d3"])) continue;
    if (!hasTargetDebt(base.analysis, stars)) continue;
    if (hasAny(be, lateForbidden)) continue;
    let baseGate: any;
    try {
      baseGate = compareIceSlideStarts(pkg, layout, {
        id: `r43_gate_${iter}`,
        title: `r43_gate_${iter}`,
        role: "challenge",
        supportLevel: "none",
        targets: [],
        playerGoal: base.goal,
        starts: [base.start],
        requiredWinningEvents: [],
        forbiddenWinningEvents: [],
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

    for (const meta of pairs) {
      const points = [base.start, base.goal, meta.start, meta.goal].map(key);
      const distinctInterfaceCount = new Set(points).size;
      if (distinctInterfaceCount < 4) continue;
      counters.distinctMetaConsidered += 1;
      const me = meta.analysis.solution.events as string[];
      if (countType(me, "push_ice") < 3) continue;
      if (!hasTargetDebt(meta.analysis, stars)) continue;
      const metaTypes = eventTypes(me);
      const baseTypes = eventTypes(be);
      const onlySmallDoor =
        [...new Set([...baseTypes, ...metaTypes])].every((t) =>
          ["push_ice", "ice_rebound_d4", "ice_destroyed_d3"].includes(t),
        );
      if (onlySmallDoor) {
        counters.rejectedSmallDoorOnly += 1;
        continue;
      }
      const metaHasD6Restart =
        hasAny(me, ["ice_destroy_group_d6_plus"]) && hasAny(me, ["slide_restart_after_group"]);
      if (!metaHasD6Restart) {
        counters.rejectedNoMetaLateOrShort += 1;
        continue;
      }
      if (metaTypes.length < 3) {
        counters.rejectedNoMetaLateOrShort += 1;
        continue;
      }

      const reverseLike =
        (same(base.start, meta.goal) && same(base.goal, meta.start)) ||
        base.analysis.solution.inputs.join(" ") === [...meta.analysis.solution.inputs].reverse().join(" ");
      if (reverseLike) {
        counters.rejectedReverseLike += 1;
        continue;
      }
      const baseSig = nonWalkPushSignature(be);
      const metaSig = nonWalkPushSignature(me);
      if (containsSubsequence(metaSig, baseSig) || containsSubsequence(baseSig, metaSig)) {
        if (nearMisses.length < 12) {
          nearMisses.push({
            score: -1,
            layout,
            A: base.start,
            B: base.goal,
            C: meta.start,
            D: meta.goal,
            stars,
            base: {
              cost: base.analysis.solution.cost,
              inputs: base.analysis.solution.inputs,
              events: be,
              eventTypes: baseTypes,
              targetDebt: hasTargetDebt(base.analysis, stars),
            },
            meta: {
              cost: meta.analysis.solution.cost,
              inputs: meta.analysis.solution.inputs,
              events: me,
              eventTypes: metaTypes,
              targetDebt: hasTargetDebt(meta.analysis, stars),
            },
            notes: [
              "near_miss: d6/restart present but non-walk signature subsequence suggests meta may be base replay plus opener",
            ],
          });
        }
        counters.rejectedReverseLike += 1;
        continue;
      }

      const sharedTypes = baseTypes.filter((t) => metaTypes.includes(t)).length;
      const score =
        countType(be, "push_ice") * 9 +
        countType(me, "push_ice") * 11 +
        baseTypes.length * 12 +
        metaTypes.length * 18 +
        Math.min(base.analysis.solution.cost, 45) +
        Math.min(meta.analysis.solution.cost, 55) +
        Math.min(base.analysis.agency?.solutionCommitmentCount ?? 0, 6) * 8 +
        Math.min(meta.analysis.agency?.solutionCommitmentCount ?? 0, 6) * 10 -
        sharedTypes * 10 -
        (distinctInterfaceCount < 4 ? 18 : 0) -
        (base.analysis.solution.cost + meta.analysis.solution.cost > 90 ? 20 : 0);

      hits.push({
        score,
        layout,
        A: base.start,
        B: base.goal,
        C: meta.start,
        D: meta.goal,
        stars,
        base: {
          cost: base.analysis.solution.cost,
          inputs: base.analysis.solution.inputs,
          events: be,
          eventTypes: baseTypes,
          graph: {
            states: base.analysis.graph.reachableStateCount,
            wins: base.analysis.graph.winStateCount,
            status: base.analysis.graph.status,
          },
          agency: {
            regions: base.analysis.agency?.compressedRegions,
            commitments: base.analysis.agency?.solutionCommitmentCount,
            forcedViable: base.analysis.agency?.forcedViablePrefixLength,
            sccShape: base.analysis.agency?.scc?.winSubgraphShape,
          },
          gate: baseGate.starts[0],
        },
        meta: {
          cost: meta.analysis.solution.cost,
          inputs: meta.analysis.solution.inputs,
          events: me,
          eventTypes: metaTypes,
          graph: {
            states: meta.analysis.graph.reachableStateCount,
            wins: meta.analysis.graph.winStateCount,
            status: meta.analysis.graph.status,
          },
          agency: {
            regions: meta.analysis.agency?.compressedRegions,
            commitments: meta.analysis.agency?.solutionCommitmentCount,
            forcedViable: meta.analysis.agency?.forcedViablePrefixLength,
            sccShape: meta.analysis.agency?.scc?.winSubgraphShape,
          },
        },
        notes: [
          distinctInterfaceCount === 4 ? "A/B/C/D distinct" : "three-interface compact re-entry; not pure reverse",
          "base and meta static paths sealed by target ice, open when target ice ignored",
          "base complete reachable scan has no d5/restart/d6 hits",
          "small d4+d3-only concatenations and same-signature subroutes rejected",
        ],
      });
      counters.hits += 1;
    }
  }
}

hits.sort((a, b) => b.score - a.score);
console.log(
  JSON.stringify({ seed: seed0, iterations, counters, hitCount: hits.length, top: hits.slice(0, 20), nearMisses }, null, 2),
);

import { readFileSync } from "node:fs";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";
import { compareIceSlideStarts } from "../../../src/prototypes/ice_slide_escape/tools/startComparison.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const minerPath = process.argv[2] ?? "prototypes/ice_slide_escape/reports/temporary_seed_miner.json";
const data = JSON.parse(readFileSync(minerPath, "utf8"));
const maxStates = Number(process.argv[3] ?? 120000);
const maxDepth = Number(process.argv[4] ?? 160);
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
function eventTypes(events: string[]): string[] {
  return [...new Set(events.map(eventType).filter((e) => e !== "walk"))].sort();
}
function count(events: string[], type: string): number {
  return events.filter((e) => eventType(e) === type).length;
}
function has(events: string[], type: string): boolean {
  return events.some((e) => eventType(e) === type);
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
function edgeCells(layout: string): Pt[] {
  const rows = layout.split("\n");
  const pts: Pt[] = [];
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y]!.length; x += 1) {
      const edge = x === 0 || y === 0 || x === rows[y]!.length - 1 || y === rows.length - 1;
      if (edge && rows[y]![x] !== "#" && rows[y]![x] !== "*" && rows[y]![x] !== "I") pts.push([x, y]);
    }
  }
  return pts;
}
function allEdgeGoals(layout: string): Pt[] {
  const rows = layout.split("\n");
  const pts: Pt[] = [];
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y]!.length; x += 1) {
      if (x === 0 || y === 0 || x === rows[y]!.length - 1 || y === rows.length - 1) pts.push([x, y]);
    }
  }
  return pts;
}
function stars(layout: string): Pt[] {
  const out: Pt[] = [];
  for (const [y, row] of layout.split("\n").entries()) {
    for (let x = 0; x < row.length; x += 1) if (row[x] === "*") out.push([x, y]);
  }
  return out;
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
function snapshotChar(snapshot: string, p: Pt): string | undefined {
  return snapshot.split("\n")[p[1]]?.[p[0]];
}
function hasTargetDebt(analysis: any, targetStars: Pt[]): boolean {
  for (const snap of analysis.keySnapshots ?? []) {
    for (const p of targetStars) {
      if (snapshotChar(snap.before ?? "", p) === "G" || snapshotChar(snap.after ?? "", p) === "G") return true;
    }
  }
  return false;
}
function signature(events: string[]): string {
  return events.map(eventType).filter((e) => e !== "walk" && e !== "push_ice").join(",");
}

const hits: any[] = [];
for (const finding of data.findings ?? []) {
  const original = String(finding.layout);
  const layout = original.replace(/G/g, "*");
  const targetStars = stars(layout);
  const starts = edgeCells(layout);
  const goals = allEdgeGoals(layout);
  const starBlock = new Set(targetStars.map(key));
  const pairs: any[] = [];
  for (const start of starts) {
    for (const goal of goals) {
      if (same(start, goal)) continue;
      if (staticPath(layout, start, goal, starBlock)) continue;
      if (!staticPath(layout, start, goal, new Set())) continue;
      try {
        const analysis = analyzeLevel(pkg, level(`${finding.id}_${key(start)}_${key(goal)}`, layout, start, goal), {
          maxStates,
          graphMaxStates: maxStates,
          maxDepth,
          bypassMaxStates: maxStates,
        });
        if (!analysis.solution.found || analysis.graph.status !== "complete") continue;
        if (count(analysis.solution.events, "push_ice") < 2) continue;
        if (!hasTargetDebt(analysis, targetStars)) continue;
        pairs.push({ start, goal, analysis });
      } catch {
        // skip
      }
    }
  }
  for (const base of pairs) {
    const be = base.analysis.solution.events as string[];
    if (!has(be, "ice_rebound_d4") && !has(be, "ice_destroyed_d3") && !has(be, "ice_stop_short")) continue;
    let gate: any;
    try {
      gate = compareIceSlideStarts(pkg, layout, {
        id: `${finding.id}_base_gate`,
        title: `${finding.id}_base_gate`,
        role: "challenge",
        supportLevel: "none",
        targets: [],
        playerGoal: base.goal,
        starts: [base.start],
        requiredWinningEvents: [],
        forbiddenWinningEvents: [],
        forbiddenReachableEvents: lateForbidden,
        maxStates,
        maxDepth,
        graphMaxStates: maxStates,
      });
    } catch {
      continue;
    }
    if (gate.starts[0]?.machineGate !== "pass") continue;
    for (const meta of pairs) {
      const points = [base.start, base.goal, meta.start, meta.goal].map(key);
      if (new Set(points).size < 3) continue;
      const me = meta.analysis.solution.events as string[];
      if (signature(be) === signature(me)) continue;
      const metaRich = eventTypes(me).length >= 3 || has(me, "ice_destroy_group_d6_plus") || has(me, "ice_pass_through_d5");
      if (!metaRich) continue;
      hits.push({
        id: finding.id,
        source: finding.source,
        layout,
        stars: targetStars,
        A: base.start,
        B: base.goal,
        C: meta.start,
        D: meta.goal,
        base: {
          cost: base.analysis.solution.cost,
          events: be,
          eventTypes: eventTypes(be),
          states: base.analysis.graph.reachableStateCount,
          wins: base.analysis.graph.winStateCount,
          gate: gate.starts[0],
        },
        meta: {
          cost: meta.analysis.solution.cost,
          events: me,
          eventTypes: eventTypes(me),
          states: meta.analysis.graph.reachableStateCount,
          wins: meta.analysis.graph.winStateCount,
        },
      });
    }
  }
}
console.log(JSON.stringify({ hitCount: hits.length, hits: hits.slice(0, 20) }, null, 2));

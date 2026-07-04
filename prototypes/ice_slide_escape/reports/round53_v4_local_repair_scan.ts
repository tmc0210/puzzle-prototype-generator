import { loadPrototypePackage } from "../../../src/core/io.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";
import { compareIceSlideStarts } from "../../../src/prototypes/ice_slide_escape/tools/startComparison.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const baseRows = [
  "############",
  "##.#......I.",
  "###.########",
  "..#.*....###",
  "#...#......#",
  "#####.......",
  "#####......#",
  "#####.######",
  "#####.######",
].map((row) => row.split(""));

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const A: Pt = [0, 3];
const B: Pt = [5, 8];
const C: Pt = [11, 1];
const maxStates = 80000;
const maxDepth = 170;
const lateForbidden = ["ice_pass_through_d5", "slide_restart_after_group", "ice_destroy_group_d6_plus"];

const toggleCells: Pt[] = [
  [0, 1], [1, 1], [2, 1], [3, 1],
  [9, 5], [10, 5],
  [9, 6], [10, 6],
];

const forcedKeep: Pt[] = [A, B, C, [4, 3], [10, 1]];

function key(p: Pt): string {
  return `${p[0]},${p[1]}`;
}

function same(a: Pt, b: Pt): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

function layoutFromMask(mask: number): string {
  const rows = baseRows.map((row) => [...row]);
  const keep = new Set(forcedKeep.map(key));
  for (let i = 0; i < toggleCells.length; i += 1) {
    const p = toggleCells[i]!;
    if (keep.has(key(p))) continue;
    rows[p[1]]![p[0]] = (mask & (1 << i)) !== 0 ? "." : "#";
  }
  // Preserve the core exactly.
  rows[3]![2] = "#";
  rows[3]![4] = "*";
  rows[3]![9] = "#";
  rows[1]![10] = "I";
  rows[A[1]]![A[0]] = ".";
  rows[B[1]]![B[0]] = ".";
  rows[C[1]]![C[0]] = ".";
  return rows.map((row) => row.join("")).join("\n");
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
    expected_solver_evidence: [],
    expected_llm_player_evidence: [],
    layout,
    win: { type: "ice_slide_escape_explicit_goal", player_start: start, player_goal: goal } satisfies WinCondition,
  };
}

function edgeGoals(): Pt[] {
  const rows = baseRows;
  const out: Pt[] = [];
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[0]!.length; x += 1) {
      if (x === 0 || y === 0 || x === rows[0]!.length - 1 || y === rows.length - 1) out.push([x, y]);
    }
  }
  return out;
}

function has(events: string[], p: string): boolean {
  return events.some((e) => eventMatchesPattern(e, p));
}

function analyzeSafe(layout: string, start: Pt, goal: Pt) {
  try {
    return analyzeLevel(pkg, level(`r53_local_${key(start)}_${key(goal)}`, layout, start, goal), {
      maxStates,
      maxDepth,
      graphMaxStates: maxStates,
      bypassMaxStates: maxStates,
    });
  } catch {
    return undefined;
  }
}

const hits: any[] = [];
let masksChecked = 0;
let basePass = 0;

for (let mask = 0; mask < (1 << toggleCells.length); mask += 1) {
  const layout = layoutFromMask(mask);
  masksChecked += 1;
  let gate;
  try {
    gate = compareIceSlideStarts(pkg, layout, {
      id: "r53_local_base_gate",
      title: "r53_local_base_gate",
      role: "challenge",
      supportLevel: "none",
      targets: [],
      playerGoal: B,
      starts: [A],
      requiredWinningEvents: ["ice_rebound_d4"],
      forbiddenWinningEvents: lateForbidden,
      forbiddenReachableEvents: lateForbidden,
      maxStates,
      maxDepth,
      graphMaxStates: maxStates,
    });
  } catch {
    continue;
  }
  if (gate.starts[0]?.machineGate !== "pass") continue;
  basePass += 1;

  for (const D of edgeGoals()) {
    if (same(D, A) || same(D, B) || same(D, C)) continue;
    const meta = analyzeSafe(layout, C, D);
    if (!meta?.solution.found || meta.graph.status !== "complete") continue;
    const me = meta.solution.events as string[];
    if (!has(me, "ice_destroy_group_d6_plus") || !has(me, "slide_restart_after_group") || !has(me, "ice_rebound_d4")) continue;
    const aToD = analyzeSafe(layout, A, D);
    const bToD = analyzeSafe(layout, B, D);
    if (aToD?.solution.found || bToD?.solution.found) continue;
    hits.push({
      mask,
      D,
      layout,
      base: {
        cost: gate.starts[0].cost,
        states: gate.starts[0].reachableStates,
        wins: gate.starts[0].winningStates,
        events: gate.starts[0].returnedEvents,
      },
      meta: {
        cost: meta.solution.cost,
        states: meta.graph.reachableStateCount,
        wins: meta.graph.winStateCount,
        events: me,
        inputs: meta.solution.inputs,
      },
    });
    if (hits.length >= 20) break;
  }
  if (hits.length >= 20) break;
}

console.log(JSON.stringify({ masksChecked, basePass, hitCount: hits.length, hits }, null, 2));

import { readFileSync } from "node:fs";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";
import { compareIceSlideStarts } from "../../../src/prototypes/ice_slide_escape/tools/startComparison.js";
import type { LevelDoc, Point, WinCondition } from "../../../src/core/types.js";

type PairResult = {
  start: [number, number];
  goal: [number, number];
  cost: number;
  events: string[];
  inputs: string[];
  states: number;
  wins: number;
  shape?: string;
  forced?: number;
  irreversible?: number;
};

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const inputPath = process.argv[2];
if (!inputPath) throw new Error("usage: worker_meta_first_search.ts <layout-file|-> [maxStates] [maxDepth]");
const rawInput = inputPath === "-" ? readFileSync(0, "utf8") : readFileSync(inputPath, "utf8");
const raw = rawInput.replace(/\r/g, "").replace(/\n+$/g, "");
const maxStates = Number(process.argv[3] ?? 120000);
const maxDepth = Number(process.argv[4] ?? 180);

function edgeStarts(layout: string): [number, number][] {
  const rows = layout.split("\n");
  const h = rows.length;
  const w = rows[0]!.length;
  const out: [number, number][] = [];
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const edge = x === 0 || y === 0 || x === w - 1 || y === h - 1;
      const c = rows[y]![x]!;
      if (edge && c !== "#" && c !== "I" && c !== "*") out.push([x, y]);
    }
  }
  return out;
}
function edgeGoals(layout: string): [number, number][] {
  const rows = layout.split("\n");
  const h = rows.length;
  const w = rows[0]!.length;
  const out: [number, number][] = [];
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) out.push([x, y]);
    }
  }
  return out;
}

function levelFor(id: string, start: [number, number], goal: [number, number]): LevelDoc {
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
    layout: raw,
    win: {
      type: "ice_slide_escape_explicit_goal",
      player_start: start,
      player_goal: goal,
    } satisfies WinCondition,
  };
}

function score(events: string[], cost: number, states: number): number {
  const uniq = new Set(events.filter((e) => e !== "walk" && e !== "push_ice").map((e) => e.split(":")[0]));
  let s = 0;
  s += events.filter((e) => e === "push_ice").length * 6;
  s += uniq.size * 10;
  if (events.some((e) => e.startsWith("ice_rebound_d4"))) s += 18;
  if (events.some((e) => e.startsWith("ice_stop_short"))) s += 8;
  if (events.some((e) => e.startsWith("ice_destroyed_d3"))) s += 5;
  if (events.some((e) => e.startsWith("ice_destroy_group_d6_plus"))) s += 20;
  if (events.some((e) => e.startsWith("slide_restart_after_group"))) s += 8;
  if (events.some((e) => e.startsWith("ice_boundary"))) s -= 8;
  s += Math.min(cost, 40) * 0.4;
  s += Math.min(states, 2000) * 0.002;
  return s;
}

function eventKinds(events: string[]): string[] {
  return [...new Set(events.filter((e) => e !== "walk").map((e) => e.split(":")[0]))].sort();
}

const starts = edgeStarts(raw);
const goals = edgeGoals(raw);
const results: PairResult[] = [];
for (const start of starts) {
  for (const goal of goals) {
    if (start[0] === goal[0] && start[1] === goal[1]) continue;
    try {
      const analysis = analyzeLevel(pkg, levelFor(`worker_${start.join("_")}_${goal.join("_")}`, start, goal), {
        maxStates,
        maxDepth,
        graphMaxStates: maxStates,
        bypassMaxStates: maxStates,
      });
      if (!analysis.solution.found || analysis.graph.status !== "complete") continue;
      results.push({
        start,
        goal,
        cost: analysis.solution.cost,
        events: analysis.solution.events,
        inputs: analysis.solution.inputs,
        states: analysis.graph.reachableStateCount,
        wins: analysis.graph.winStateCount,
        shape: analysis.agency.scc?.winSubgraphShape,
        forced: analysis.agency.scc?.forcedWinContinuationPrefixLength,
        irreversible: analysis.agency.scc?.solutionIrreversibleStepCount,
      });
    } catch {
      // ignored
    }
  }
}

const ranked = results
  .map((r) => ({ ...r, score: score(r.events, r.cost, r.states), kinds: eventKinds(r.events) }))
  .sort((a, b) => b.score - a.score);

console.log(JSON.stringify({
  layout: raw,
  starts,
  goals,
  count: ranked.length,
  top: ranked.slice(0, 60),
}, null, 2));

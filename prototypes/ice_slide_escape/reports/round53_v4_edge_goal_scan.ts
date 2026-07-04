import { loadPrototypePackage } from "../../../src/core/io.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const layout = [
  "############",
  "##.#......I.",
  "###.########",
  "..#.*....###",
  "#...#......#",
  "#####.......",
  "#####......#",
  "#####.######",
  "#####.######",
].join("\n");

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const maxStates = 120000;
const maxDepth = 180;
const starts: Record<string, Pt> = {
  A: [0, 3],
  B: [5, 8],
  C: [11, 1],
  Dold: [11, 5],
};

function level(id: string, start: Pt, goal: Pt): LevelDoc {
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
  const rows = layout.split("\n");
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

const rows: any[] = [];
for (const goal of edgeGoals()) {
  const entry: any = { goal };
  for (const [name, start] of Object.entries(starts)) {
    try {
      const a = analyzeLevel(pkg, level(`r53_v4_${name}_${goal.join("_")}`, start, goal), {
        maxStates,
        maxDepth,
        graphMaxStates: maxStates,
        bypassMaxStates: maxStates,
      });
      entry[name] = {
        found: a.solution.found,
        cost: a.solution.found ? a.solution.cost : null,
        events: a.solution.found ? [...new Set(a.solution.events.filter((e) => e !== "walk"))] : [],
        graph: a.graph.status,
        states: a.graph.reachableStateCount,
        wins: a.graph.winStateCount,
        cRequiredLike:
          name === "C" &&
          a.solution.found &&
          has(a.solution.events, "ice_destroy_group_d6_plus") &&
          has(a.solution.events, "slide_restart_after_group") &&
          has(a.solution.events, "ice_rebound_d4"),
      };
    } catch (error) {
      entry[name] = { error: error instanceof Error ? error.message : String(error) };
    }
  }
  if (entry.C?.cRequiredLike && !entry.A?.found && !entry.B?.found && goal.join(",") !== "11,1") {
    rows.push(entry);
  }
}

console.log(JSON.stringify(rows, null, 2));

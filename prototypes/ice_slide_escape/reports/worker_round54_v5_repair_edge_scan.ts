import { readFileSync, writeFileSync } from "node:fs";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const layoutPath =
  process.argv[2] ??
  "prototypes/ice_slide_escape/reports/worker_round54_v5_repair_v4_remove_b_launcher_ice_layout.txt";
const outPrefix =
  process.argv[3] ?? "prototypes/ice_slide_escape/reports/worker_round54_v5_repair_v4_edge_scan";

const layout = readFileSync(layoutPath, "utf8").replace(/\r/g, "").replace(/\n+$/g, "");
const rows = layout.split("\n");
const width = rows[0]!.length;
const height = rows.length;

const declared: Record<string, Pt> = {
  A: [0, 6],
  B: [7, 0],
  C: [10, 0],
  D: [0, 10],
};

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

function same(left: Pt, right: Pt): boolean {
  return left[0] === right[0] && left[1] === right[1];
}

function key(point: Pt): string {
  return `${point[0]},${point[1]}`;
}

function edgeGoals(): Pt[] {
  const out: Pt[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
        out.push([x, y]);
      }
    }
  }
  return out;
}

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
    win: {
      type: "ice_slide_escape_explicit_goal",
      player_start: start,
      player_goal: goal,
    } satisfies WinCondition,
  };
}

function compactEvents(events: string[]): string[] {
  return [...new Set(events.filter((event) => event !== "walk"))];
}

type Classification =
  | "target_pair"
  | "ignored_internal_reverse"
  | "risky_internal_non_target"
  | "external_edge_escape";

type Hit = {
  startName: string;
  start: Pt;
  goal: Pt;
  goalName?: string;
  cost: number;
  events: string[];
  classification: Classification;
};

const startValidity: Record<string, { valid: boolean; error?: string }> = {};
const hits: Hit[] = [];
const goals = edgeGoals();

for (const [startName, start] of Object.entries(declared)) {
  try {
    adapter.parseLevel(level(`worker_round54_v5_repair_start_valid_${startName}`, start, start));
    startValidity[startName] = { valid: true };
  } catch (error) {
    startValidity[startName] = {
      valid: false,
      error: error instanceof Error ? error.message : String(error),
    };
    continue;
  }

  for (const goal of goals) {
    if (same(start, goal)) {
      continue;
    }
    const goalName = Object.entries(declared).find(([, point]) => same(point, goal))?.[0];
    const doc = level(`worker_round54_v5_repair_edge_${startName}_${key(goal).replace(",", "_")}`, start, goal);
    try {
      const initial = adapter.parseLevel(doc);
      const solution = solveWithRuntime(runtime, initial, {
        winCondition: doc.win,
        maxStates: 200000,
        maxDepth: 360,
      });
      if (!solution.found) {
        continue;
      }

      let classification: Classification;
      if ((startName === "A" && goalName === "B") || (startName === "C" && goalName === "D")) {
        classification = "target_pair";
      } else if ((startName === "C" || startName === "D") && (goalName === "A" || goalName === "B")) {
        classification = "ignored_internal_reverse";
      } else if (goalName) {
        classification = "risky_internal_non_target";
      } else {
        classification = "external_edge_escape";
      }

      hits.push({
        startName,
        start,
        goal,
        goalName,
        cost: solution.cost,
        events: compactEvents(solution.events),
        classification,
      });
    } catch {
      // Some edge goals are static walls and simply remain unsolved or invalid in explicit-goal mode.
    }
  }
}

const hitCounts = hits.reduce<Record<string, number>>((acc, hit) => {
  acc[hit.classification] = (acc[hit.classification] ?? 0) + 1;
  return acc;
}, {});
const risky = hits.filter(
  (hit) => hit.classification === "external_edge_escape" || hit.classification === "risky_internal_non_target",
);
const ignored = hits.filter((hit) => hit.classification === "ignored_internal_reverse");
const targets = hits.filter((hit) => hit.classification === "target_pair");

const report = {
  layoutPath,
  declared,
  startValidity,
  scannedEdgeGoals: goals.length,
  hitCounts,
  targetPairs: targets,
  ignoredInternalReversePairs: ignored,
  riskyPairs: risky,
  policyNote:
    "C/D -> A/B are policy-ignored reverse/internal routes. Other internal non-target pairs and external edge escapes are risks.",
};

writeFileSync(`${outPrefix}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");

const lines = [
  "# worker round54 v5 repair edge scan",
  "",
  `- layout: ${layoutPath}`,
  `- declared: ${JSON.stringify(declared)}`,
  `- start_validity: ${JSON.stringify(startValidity)}`,
  `- scanned_edge_goals: ${goals.length}`,
  `- hit_counts: ${JSON.stringify(hitCounts)}`,
  `- risky_pairs: ${risky.length}`,
  `- ignored_internal_reverse_pairs: ${ignored.length}`,
  "",
  "## Risky Pairs",
  "",
  ...(risky.length === 0
    ? ["- none"]
    : risky.map(
        (hit) =>
          `- ${hit.startName} ${key(hit.start)} -> ${hit.goalName ?? key(hit.goal)} cost=${hit.cost} events=${hit.events.join(",") || "walk_only"} classification=${hit.classification}`,
      )),
  "",
  "## Ignored Internal Reverse Pairs",
  "",
  ...(ignored.length === 0
    ? ["- none"]
    : ignored.map(
        (hit) =>
          `- ${hit.startName} ${key(hit.start)} -> ${hit.goalName ?? key(hit.goal)} cost=${hit.cost} events=${hit.events.join(",") || "walk_only"} verdict_effect=none`,
      )),
  "",
  "## Target Pairs Found",
  "",
  ...(targets.length === 0
    ? ["- none"]
    : targets.map(
        (hit) =>
          `- ${hit.startName} ${key(hit.start)} -> ${hit.goalName ?? key(hit.goal)} cost=${hit.cost} events=${hit.events.join(",") || "walk_only"}`,
      )),
];

writeFileSync(`${outPrefix}.md`, `${lines.join("\n")}\n`, "utf8");
console.log(JSON.stringify({ outPrefix, hitCounts, riskyPairs: risky.length, startValidity }, null, 2));

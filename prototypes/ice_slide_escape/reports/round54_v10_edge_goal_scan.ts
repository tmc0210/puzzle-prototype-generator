import { readFileSync, writeFileSync } from "node:fs";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const layoutPath =
  "prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round54_v10_two_target_late_reseal_layout.txt";
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
const starts = declared;

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

function key(point: Pt): string {
  return `${point[0]},${point[1]}`;
}

function same(left: Pt, right: Pt): boolean {
  return left[0] === right[0] && left[1] === right[1];
}

function edgeGoals(): Pt[] {
  const out: Pt[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) out.push([x, y]);
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
    win: { type: "ice_slide_escape_explicit_goal", player_start: start, player_goal: goal } satisfies WinCondition,
  };
}

function compactEvents(events: string[]): string[] {
  return [...new Set(events.filter((event) => event !== "walk"))];
}

function has(events: string[], pattern: string): boolean {
  return events.some((event) => eventMatchesPattern(event, pattern));
}

type Hit = {
  startName: string;
  start: Pt;
  goal: Pt;
  goalName?: string;
  cost: number;
  events: string[];
  requiredLike?: boolean;
  classification: "target_pair" | "ignored_internal_reverse" | "risky_internal_non_target" | "external_edge_escape";
};

const startValidity: Record<string, { valid: boolean; error?: string }> = {};
for (const [startName, start] of Object.entries(starts)) {
  try {
    adapter.parseLevel(level(`round54_v10_start_valid_${startName}`, start, start));
    startValidity[startName] = { valid: true };
  } catch (error) {
    startValidity[startName] = { valid: false, error: error instanceof Error ? error.message : String(error) };
  }
}

const hits: Hit[] = [];
for (const [startName, start] of Object.entries(starts)) {
  if (!startValidity[startName]?.valid) continue;
  for (const goal of edgeGoals()) {
    if (same(start, goal)) continue;
    const goalName = Object.entries(declared).find(([, point]) => same(point, goal))?.[0];
    const doc = level(`round54_v10_edge_${startName}_${key(goal).replace(",", "_")}`, start, goal);
    try {
      const initial = adapter.parseLevel(doc);
      const solution = solveWithRuntime(runtime, initial, {
        winCondition: doc.win,
        maxStates: 120000,
        maxDepth: 180,
      });
      if (!solution.found) continue;

      let classification: Hit["classification"];
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
        requiredLike:
          has(solution.events, "ice_destroy_group_d6_plus") &&
          has(solution.events, "slide_restart_after_group") &&
          has(solution.events, "ice_rebound_d4"),
        classification,
      });
    } catch {
      // Invalid goal cells are not useful for this diagnostic.
    }
  }
}

const byClass = hits.reduce<Record<string, number>>((acc, hit) => {
  acc[hit.classification] = (acc[hit.classification] ?? 0) + 1;
  return acc;
}, {});
const targetPairs = hits.filter((hit) => hit.classification === "target_pair");
const ignored = hits.filter((hit) => hit.classification === "ignored_internal_reverse");
const risky = hits.filter(
  (hit) => hit.classification === "external_edge_escape" || hit.classification === "risky_internal_non_target",
);

const report = {
  layoutPath,
  declared,
  startValidity,
  scannedEdgeGoals: edgeGoals().length,
  hitCounts: byClass,
  targetPairs,
  ignoredInternalReversePairs: ignored,
  riskyPairs: risky,
};

const jsonPath = "prototypes/ice_slide_escape/reports/round54_v10_edge_goal_scan.json";
const mdPath = "prototypes/ice_slide_escape/reports/round54_v10_edge_goal_scan.md";
writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

const formatHit = (hit: Hit): string =>
  `- ${hit.startName} ${key(hit.start)} -> ${hit.goalName ?? key(hit.goal)} cost=${hit.cost} events=${hit.events.join(",") || "walk_only"} classification=${hit.classification}${hit.requiredLike ? " required_like=true" : ""}`;

writeFileSync(
  mdPath,
  `${[
    "# round54 v10 edge-goal scan",
    "",
    `- layout: ${layoutPath}`,
    `- declared: ${JSON.stringify(declared)}`,
    `- start_validity: ${JSON.stringify(startValidity)}`,
    `- scanned_edge_goals: ${edgeGoals().length}`,
    `- hit_counts: ${JSON.stringify(byClass)}`,
    `- risky_pairs: ${risky.length}`,
    `- ignored_internal_reverse_pairs: ${ignored.length}`,
    "",
    "## Risky Pairs",
    "",
    ...(risky.length > 0 ? risky.map(formatHit) : ["- none"]),
    "",
    "## Ignored Internal Reverse Pairs",
    "",
    ...(ignored.length > 0 ? ignored.map((hit) => `${formatHit(hit)} verdict_effect=none`) : ["- none"]),
    "",
    "## Target Pairs Found",
    "",
    ...(targetPairs.length > 0 ? targetPairs.map(formatHit) : ["- none"]),
  ].join("\n")}\n`,
  "utf8",
);

console.log(JSON.stringify({ jsonPath, mdPath, hitCounts: byClass, riskyPairs: risky.length }, null, 2));

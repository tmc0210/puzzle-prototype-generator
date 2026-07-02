import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.ts";
import { solveWithRuntime } from "../../../src/core/solver.ts";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.ts";

type Point = [number, number];

const points: Record<string, Point> = {
  A: [0, 5],
  B: [21, 5],
  C: [6, 0],
  D: [5, 21],
};

const layoutPath =
  "prototypes/ice_slide_escape/reports/worker_fresh_chain3_d4_target_debt_layout.txt";

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const layout = (await readFile(layoutPath, "utf8"))
  .replace(/\r/g, "")
  .replace(/\n+$/g, "");
const lines = layout.split("\n");
const height = lines.length;
const width = lines[0]?.length ?? 0;
if (width === 0 || lines.some((line) => line.length !== width)) {
  throw new Error("layout must be non-empty and rectangular");
}

const labelOf = new Map(
  Object.entries(points).map(([label, point]) => [point.join(","), label]),
);

const edgeGoals: Point[] = [];
for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      edgeGoals.push([x, y]);
    }
  }
}

const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const solved: Array<{
  from: string;
  to: string;
  goal: Point;
  cost: number | undefined;
  events: string[];
  inputs: string[];
}> = [];

for (const [from, start] of Object.entries(points)) {
  for (const goal of edgeGoals) {
    const win = {
      type: "ice_slide_escape_explicit_goal",
      player_start: start,
      player_goal: goal,
    } as const;
    const level = {
      id: `worker_fresh_scan_${from}_${goal[0]}_${goal[1]}`,
      title: "worker fresh edge scan",
      role: "challenge",
      status: "candidate",
      targets: [],
      known_before: [],
      target_learning: [],
      support_level: "none",
      expected_solver_evidence: ["solvable"],
      expected_llm_player_evidence: [],
      layout,
      win,
    } as const;

    try {
      const initial = adapter.parseLevel(level);
      const solution = solveWithRuntime(runtime, initial, {
        winCondition: win,
        maxStates: 20_000,
        maxDepth: 120,
      });
      if (solution.found) {
        solved.push({
          from,
          to: labelOf.get(goal.join(",")) ?? "external",
          goal,
          cost: solution.cost,
          events: solution.events,
          inputs: solution.inputs,
        });
      }
    } catch {
      // Illegal starts/goals are not expected for the declared points; wall goals
      // are legal by the prototype solver contract, so parse failures are simply
      // unsolved for this edge scan.
    }
  }
}

const targetPairs = new Set(["A->B", "C->D"]);
const ignoredPairs = new Set(["C->A", "C->B", "D->A", "D->B"]);
const selfPairs = new Set(["A->A", "B->B", "C->C", "D->D"]);
const pairKey = (row: { from: string; to: string }) => `${row.from}->${row.to}`;

const summarize = (row: (typeof solved)[number]): string =>
  `${pairKey(row)} goal=[${row.goal.join(",")}] cost=${row.cost} events=${
    row.events.filter((event) => event !== "walk").join("+") || "walk/zero"
  }`;

const report = {
  width,
  height,
  declaredPoints: points,
  edgeGoalsChecked: edgeGoals.length,
  solvedPairCount: solved.length,
  targetPairs: solved.filter((row) => targetPairs.has(pairKey(row))).map(summarize),
  externalEdgeEscapes: solved
    .filter((row) => row.to === "external")
    .map(summarize),
  riskyInternalNonTargetPairs: solved
    .filter(
      (row) =>
        row.to !== "external" &&
        !targetPairs.has(pairKey(row)) &&
        !ignoredPairs.has(pairKey(row)) &&
        !selfPairs.has(pairKey(row)),
    )
    .map(summarize),
  ignoredInternalReversePairs: solved
    .filter((row) => ignoredPairs.has(pairKey(row)))
    .map(summarize),
  selfPairs: solved.filter((row) => selfPairs.has(pairKey(row))).map(summarize),
};

console.log(JSON.stringify(report, null, 2));

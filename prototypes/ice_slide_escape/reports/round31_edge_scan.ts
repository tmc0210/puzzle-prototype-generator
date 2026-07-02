import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.ts";
import { solveWithRuntime } from "../../../src/core/solver.ts";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.ts";

type Point = [number, number];

const [layoutPath, aRaw, bRaw, cRaw, dRaw] = process.argv.slice(2);
if (!layoutPath || !aRaw || !bRaw || !cRaw || !dRaw) {
  throw new Error("usage: tsx round31_edge_scan.ts <layout> A B C D, points as x,y");
}

const parsePoint = (raw: string): Point => {
  const [xRaw, yRaw] = raw.split(",");
  const x = Number(xRaw);
  const y = Number(yRaw);
  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new Error(`bad point ${raw}`);
  }
  return [x, y];
};

const points: Record<string, Point> = {
  A: parsePoint(aRaw),
  B: parsePoint(bRaw),
  C: parsePoint(cRaw),
  D: parsePoint(dRaw),
};

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const lines = layout.split("\n");
const height = lines.length;
const width = lines[0]?.length ?? 0;
if (width === 0 || lines.some((line) => line.length !== width)) {
  throw new Error("layout must be rectangular");
}

const labelOf = new Map(Object.entries(points).map(([label, point]) => [point.join(","), label]));
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
const solved: Array<{ from: string; to: string; goal: Point; cost?: number; events: string[] }> = [];

for (const [from, start] of Object.entries(points)) {
  for (const goal of edgeGoals) {
    const win = {
      type: "ice_slide_escape_explicit_goal",
      player_start: start,
      player_goal: goal,
    } as const;
    const level = {
      id: `round31_scan_${from}_${goal[0]}_${goal[1]}`,
      title: "round31 edge scan",
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
        maxStates: 40_000,
        maxDepth: 170,
      });
      if (solution.found) {
        solved.push({
          from,
          to: labelOf.get(goal.join(",")) ?? "external",
          goal,
          cost: solution.cost,
          events: solution.events,
        });
      }
    } catch {
      // invalid start/goal for this diagnostic
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

console.log(JSON.stringify({
  width,
  height,
  declaredPoints: points,
  edgeGoalsChecked: edgeGoals.length,
  solvedPairCount: solved.length,
  targetPairs: solved.filter((row) => targetPairs.has(pairKey(row))).map(summarize),
  externalEdgeEscapes: solved.filter((row) => row.to === "external").map(summarize),
  riskyInternalNonTargetPairs: solved
    .filter((row) =>
      row.to !== "external" &&
      !targetPairs.has(pairKey(row)) &&
      !ignoredPairs.has(pairKey(row)) &&
      !selfPairs.has(pairKey(row)))
    .map(summarize),
  ignoredInternalReversePairs: solved.filter((row) => ignoredPairs.has(pairKey(row))).map(summarize),
  selfPairs: solved.filter((row) => selfPairs.has(pairKey(row))).map(summarize),
}, null, 2));

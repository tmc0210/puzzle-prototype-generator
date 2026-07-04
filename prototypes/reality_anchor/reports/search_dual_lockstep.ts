import { writeFile } from "node:fs/promises";
import path from "node:path";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Rng = () => number;

type CandidateHit = {
  score: number;
  id: string;
  layout: string;
  cost: number;
  explored: number;
  events: string[];
  inputs: InputId[];
  graphStatus: string;
  graphStates: number;
  winStates: number;
  sccShape?: string;
};

type SolverHit = {
  score: number;
  id: string;
  layout: string;
  cost: number;
  explored: number;
  events: string[];
  inputs: InputId[];
  initialRender: string;
};

const prototypePath = "prototypes/reality_anchor";
const seed = Number(process.argv[2] ?? 740704);
const iterations = Number(process.argv[3] ?? 2000);
const maxHits = Number(process.argv[4] ?? 20);
const minCost = Number(process.argv[5] ?? 12);
const maxStates = Number(process.argv[6] ?? 90000);
const graphMaxStates = Number(process.argv[7] ?? 90000);
const solverPoolSize = Number(process.argv[8] ?? 80);
const analyzePoolSize = Number(process.argv[9] ?? 40);

const requiredGroups: Array<{ name: string; patterns: string[] }> = [
  { name: "push_pull_anchor_shift", patterns: ["anchor_boundary_shift:push_pull"] },
  { name: "box_sticky_anchor_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "pull_event", patterns: ["pull_object"] },
  { name: "material_normalization", patterns: ["box_to_sticky", "sticky_to_box"] },
  { name: "sticky_merge", patterns: ["sticky_merge"] },
  { name: "sticky_rigid_move", patterns: ["move_sticky_rigid"] },
];

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const rng = mulberry32(seed);
const hits: CandidateHit[] = [];
const solverHits: SolverHit[] = [];
const seen = new Set<string>();

for (let index = 0; index < iterations; index += 1) {
  const layout = sampleLayout(rng);
  if (seen.has(layout)) {
    continue;
  }
  seen.add(layout);

  const level = toLevel(`RA_SEARCH_${index}`, layout);
  let initial: unknown;
  try {
    initial = adapter.parseLevel(level);
  } catch {
    continue;
  }

  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth: 90,
  });
  if (!solution.found || solution.cost === undefined || solution.cost < minCost) {
    continue;
  }
  if (!coversGroups(solution.events, requiredGroups)) {
    continue;
  }

  const eventVariety = new Set(solution.events.map((event) => event.split(":")[0])).size;
  solverHits.push({
    score: solution.cost * 5 + eventVariety * 20 - solution.exploredStates / 3000,
    id: level.id,
    layout,
    cost: solution.cost,
    explored: solution.exploredStates,
    events: solution.events,
    inputs: solution.inputs,
    initialRender: adapter.renderState(initial as never),
  });
  solverHits.sort((left, right) => right.score - left.score);
  solverHits.splice(solverPoolSize);
}

for (const solverHit of solverHits.slice(0, analyzePoolSize)) {
  const level = toLevel(solverHit.id, solverHit.layout);
  let analysis;
  try {
    analysis = analyzeLevel(pkg, level, {
      maxStates,
      graphMaxStates,
      counterfactualMaxStates: 5000,
    });
  } catch {
    continue;
  }
  if (analysis.graph.status !== "complete") {
    continue;
  }

  const eventVariety = new Set(solverHit.events.map((event) => event.split(":")[0])).size;
  const score =
    solverHit.cost * 5 +
    eventVariety * 20 +
    (analysis.agency.scc?.solutionIrreversibleStepCount ?? 0) * 8 +
    Math.min(analysis.graph.reachableStateCount, 5000) / 50 -
    analysis.graph.winStateCount * 2;

  hits.push({
    score,
    id: level.id,
    layout: solverHit.initialRender,
    cost: solverHit.cost,
    explored: solverHit.explored,
    events: solverHit.events,
    inputs: solverHit.inputs,
    graphStatus: analysis.graph.status,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    sccShape: analysis.agency.scc?.winSubgraphShape,
  });
  hits.sort((left, right) => right.score - left.score);
  hits.splice(maxHits);
}

const report = formatHits({
  seed,
  iterations,
  maxHits,
  minCost,
  maxStates,
  graphMaxStates,
  solverHits,
  hits,
});
const out = path.join(prototypePath, "reports", "search_dual_lockstep.md");
await writeFile(out, report, "utf8");
console.log(report);
console.log(`Wrote ${out}`);

function sampleLayout(rng: Rng): string {
  const width = choice(rng, [8, 9, 10, 11]);
  const height = choice(rng, [6, 7, 8]);
  const grid = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) =>
      x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : ".",
    ),
  );

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      if (rng() < 0.11) {
        grid[y]![x] = "#";
      }
    }
  }

  const points = interiorPoints(width, height);
  shuffle(rng, points);
  const used = new Set<string>();
  const place = (glyph: string): Point | undefined => {
    while (points.length > 0) {
      const point = points.pop()!;
      const key = `${point.x},${point.y}`;
      if (used.has(key) || grid[point.y]![point.x] === "#") {
        continue;
      }
      used.add(key);
      grid[point.y]![point.x] = glyph;
      return point;
    }
    return undefined;
  };
  const placePair = (a: string, b: string): boolean => {
    const candidates = interiorPoints(width, height).filter((point) => grid[point.y]![point.x] === ".");
    shuffle(rng, candidates);
    for (const first of candidates) {
      const dirs = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ];
      shuffle(rng, dirs);
      for (const dir of dirs) {
        const second = { x: first.x + dir.x, y: first.y + dir.y };
        if (
          second.x <= 0 ||
          second.y <= 0 ||
          second.x >= width - 1 ||
          second.y >= height - 1 ||
          grid[second.y]![second.x] !== "."
        ) {
          continue;
        }
        grid[first.y]![first.x] = a;
        grid[second.y]![second.x] = b;
        used.add(`${first.x},${first.y}`);
        used.add(`${second.x},${second.y}`);
        return true;
      }
    }
    return false;
  };

  if (rng() < 0.5) {
    placePair("P", "L");
    placePair("B", "S");
  } else {
    placePair("B", "S");
    placePair("P", "L");
  }

  place("@");
  const crates = choice(rng, [1, 2, 2, 3]);
  const sticky = choice(rng, [1, 2, 2, 3]);
  const goals = choice(rng, [2, 3, 3, 4]);
  for (let index = 0; index < crates; index += 1) {
    place("C");
  }
  for (let index = 0; index < sticky; index += 1) {
    place("M");
  }
  for (let index = 0; index < goals; index += 1) {
    place("G");
  }
  return grid.map((row) => row.join("").replace(/\.+$/g, (tail) => tail)).join("\n");
}

function toLevel(id: string, layout: string): LevelDoc {
  return {
    id,
    title: id,
    role: "challenge",
    status: "candidate",
    targets: ["K_runtime_smoke"],
    known_before: ["K_runtime_smoke"],
    target_learning: ["K_runtime_smoke"],
    support_level: "none",
    expected_solver_evidence: ["solvable", "player_win_standard"],
    expected_llm_player_evidence: [],
    layout,
  };
}

function coversGroups(events: string[], groups: Array<{ patterns: string[] }>): boolean {
  return groups.every((group) =>
    group.patterns.some((pattern) => events.some((event) => event.startsWith(pattern))),
  );
}

function formatHits(input: {
  seed: number;
  iterations: number;
  maxHits: number;
  minCost: number;
  maxStates: number;
  graphMaxStates: number;
  solverHits: SolverHit[];
  hits: CandidateHit[];
}): string {
  const lines = [
    "# Dual Lockstep Search",
    "",
    `- seed: ${input.seed}`,
    `- iterations: ${input.iterations}`,
    `- minCost: ${input.minCost}`,
    `- maxStates: ${input.maxStates}`,
    `- graphMaxStates: ${input.graphMaxStates}`,
    `- solverHits: ${input.solverHits.length}`,
    `- hits: ${input.hits.length}/${input.maxHits}`,
    "",
  ];
  for (const [index, hit] of input.hits.entries()) {
    lines.push(`## ${index + 1}. ${hit.id}`);
    lines.push("");
    lines.push(
      `- score=${hit.score.toFixed(1)} cost=${hit.cost} explored=${hit.explored} graph=${hit.graphStatus}/${hit.graphStates} wins=${hit.winStates} scc=${hit.sccShape ?? "n/a"}`,
    );
    lines.push(`- inputs=${hit.inputs.join(" ")}`);
    lines.push(`- events=${hit.events.join(" ")}`);
    lines.push("");
    lines.push("```text");
    lines.push(hit.layout);
    lines.push("```");
    lines.push("");
  }
  if (input.solverHits.length > 0) {
    lines.push("## Solver-Only Hits");
    lines.push("");
    for (const [index, hit] of input.solverHits.slice(0, 12).entries()) {
      lines.push(`### ${index + 1}. ${hit.id}`);
      lines.push("");
      lines.push(`- score=${hit.score.toFixed(1)} cost=${hit.cost} explored=${hit.explored}`);
      lines.push(`- inputs=${hit.inputs.join(" ")}`);
      lines.push(`- events=${hit.events.join(" ")}`);
      lines.push("");
      lines.push("```text");
      lines.push(hit.initialRender);
      lines.push("```");
      lines.push("");
    }
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

function interiorPoints(width: number, height: number): Point[] {
  const points: Point[] = [];
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      points.push({ x, y });
    }
  }
  return points;
}

function choice<T>(rng: Rng, values: T[]): T {
  return values[Math.floor(rng() * values.length)]!;
}

function shuffle<T>(rng: Rng, values: T[]): void {
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1));
    [values[index], values[swap]] = [values[swap]!, values[index]!];
  }
}

function mulberry32(value: number): Rng {
  let state = value >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

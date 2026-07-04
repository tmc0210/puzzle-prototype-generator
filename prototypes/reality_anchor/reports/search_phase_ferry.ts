import { writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, Point, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";

type Rng = () => number;
type RuntimeState = unknown;
type Group = { name: string; patterns: string[] };
type ProbeResult = {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
  missingGroups?: string[];
};
type Hit = {
  score: number;
  id: string;
  layout: string;
  cost: number;
  explored: number;
  inputs: InputId[];
  events: string[];
  graphStates: number;
  winStates: number;
  probeStates: number;
  sccShape?: string;
};
type SolverHit = {
  score: number;
  id: string;
  layout: string;
  cost: number;
  explored: number;
  inputs: InputId[];
  events: string[];
  probeStatus?: SearchStatus;
  probeFoundBypass?: boolean;
  probeMissing?: string[];
};

const prototypePath = "prototypes/reality_anchor";
const seed = Number(process.argv[2] ?? 741001);
const iterations = Number(process.argv[3] ?? 1500);
const maxStates = Number(process.argv[4] ?? 90000);
const graphMaxStates = Number(process.argv[5] ?? 120000);
const maxDepth = Number(process.argv[6] ?? 90);
const maxHits = Number(process.argv[7] ?? 12);
const minCost = Number(process.argv[8] ?? 18);
const sampleMode = process.argv[9] ?? "default";
const wallRate = Number(process.argv[10] ?? (sampleMode === "lean" ? 0.16 : 0.09));

const groups: Group[] = [
  { name: "push_pull_anchor_shift", patterns: ["anchor_boundary_shift:push_pull"] },
  { name: "box_sticky_anchor_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "pull_event", patterns: ["pull_object"] },
  { name: "material_normalization", patterns: ["box_to_sticky", "sticky_to_box"] },
  { name: "sticky_merge", patterns: ["sticky_merge"] },
  { name: "sticky_rigid_move", patterns: ["move_sticky_rigid"] },
];

const knownLayouts = new Set([
  [
    "##########",
    "#.##MG.###",
    "#.....P###",
    "#@CBSMLG##",
    "###..M..##",
    "#####G####",
    "##########",
  ].join("\n"),
  [
    "###########",
    "###.PL.####",
    "##@BSGG####",
    "###.MM...G#",
    "###.M..M.##",
    "###########",
  ].join("\n"),
]);

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const rng = mulberry32(seed);
const seen = new Set<string>();
const hits: Hit[] = [];
const solverHits: SolverHit[] = [];

for (let index = 0; index < iterations; index += 1) {
  const layout = sampleLayout(rng);
  if (knownLayouts.has(layout) || seen.has(layout)) {
    continue;
  }
  seen.add(layout);

  const level = toLevel(`RA_PHASE_FERRY_SEARCH_${index}`, layout);
  let initial: RuntimeState;
  try {
    initial = adapter.parseLevel(level);
  } catch {
    continue;
  }

  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth,
  });
  if (!solution.found || solution.cost === undefined || solution.cost < minCost) {
    continue;
  }
  if (!coversGroups(solution.events, groups)) {
    continue;
  }

  const solverHit: SolverHit = {
    score: solution.cost * 10 + new Set(solution.events.map((event) => event.split(":")[0])).size * 20,
    id: level.id,
    layout: adapter.renderState(initial as never),
    cost: solution.cost,
    explored: solution.exploredStates,
    inputs: solution.inputs,
    events: solution.events,
  };

  const probe = findWinMissingGroups(initial, groups, { maxStates, maxDepth });
  solverHit.probeStatus = probe.status;
  solverHit.probeFoundBypass = probe.found;
  solverHit.probeMissing = probe.missingGroups;
  solverHits.push(solverHit);
  solverHits.sort((left, right) => right.score - left.score);
  solverHits.splice(16);
  if (probe.found || probe.status !== "complete") {
    continue;
  }

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

  const repeatedBsPushes = solution.events.filter((event) => event === "push_object:box_sticky_anchor").length;
  const eventVariety = new Set(solution.events.map((event) => event.split(":")[0])).size;
  const score =
    solution.cost * 12 +
    eventVariety * 22 +
    Math.min(analysis.graph.reachableStateCount, 6000) / 35 +
    (analysis.agency.scc?.solutionIrreversibleStepCount ?? 0) * 9 -
    analysis.graph.winStateCount * 2 -
    repeatedBsPushes * 5;

  hits.push({
    score,
    id: level.id,
    layout: adapter.renderState(initial as never),
    cost: solution.cost,
    explored: solution.exploredStates,
    inputs: solution.inputs,
    events: solution.events,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    probeStates: probe.exploredStates,
    sccShape: analysis.agency.scc?.winSubgraphShape,
  });
  hits.sort((left, right) => right.score - left.score);
  hits.splice(maxHits);
}

const report = formatReport();
const out = path.join(prototypePath, "reports", `search_phase_ferry_${seed}.md`);
await writeFile(out, report, "utf8");
console.log(report);
console.log(`Wrote ${out}`);

function sampleLayout(rng: Rng): string {
  const width = choice(rng, sampleMode === "micro" ? [8, 9, 10] : [9, 10, 11]);
  const height = choice(rng, sampleMode === "micro" ? [5, 6] : [6, 7, 8]);
  const grid = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) =>
      x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : ".",
    ),
  );

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      if (rng() < wallRate) {
        grid[y]![x] = "#";
      }
    }
  }

  const used = new Set<string>();
  const reserve = (point: Point, glyph: string): boolean => {
    if (!isInterior(point, width, height) || grid[point.y]![point.x] !== ".") {
      return false;
    }
    const key = `${point.x},${point.y}`;
    if (used.has(key)) {
      return false;
    }
    used.add(key);
    grid[point.y]![point.x] = glyph;
    return true;
  };

  if (sampleMode === "micro") {
    if (!placePairAny(grid, used, rng, width, height, "P", "L")) return "";
    if (!placePairAny(grid, used, rng, width, height, "B", "S")) return "";
  } else {
    const ppY = choice(rng, range(1, height - 2));
    const ppX = choice(rng, range(2, width - 4));
    const plLeftToRight = rng() < 0.75;
    if (!reserve({ x: ppX, y: ppY }, plLeftToRight ? "P" : "L")) {
      return "";
    }
    if (!reserve({ x: ppX + 1, y: ppY }, plLeftToRight ? "L" : "P")) {
      return "";
    }

    const bsX = choice(rng, range(2, width - 3));
    const bsY = choice(rng, range(1, height - 3));
    const bsTopToBottom = rng() < 0.75;
    if (!reserve({ x: bsX, y: bsY }, bsTopToBottom ? "B" : "S")) {
      return "";
    }
    if (!reserve({ x: bsX, y: bsY + 1 }, bsTopToBottom ? "S" : "B")) {
      return "";
    }
  }

  placeRandom(grid, used, "@", rng, width, height);
  for (let index = 0; index < choice(rng, sampleMode === "micro" ? [1, 1, 2] : sampleMode === "lean" ? [1, 1, 2] : [1, 2, 2, 3]); index += 1) {
    placeRandom(grid, used, "C", rng, width, height);
  }
  for (let index = 0; index < choice(rng, sampleMode === "micro" ? [2, 2, 3] : sampleMode === "lean" ? [2, 2, 3] : [2, 2, 3, 4]); index += 1) {
    placeRandom(grid, used, "M", rng, width, height);
  }
  for (let index = 0; index < choice(rng, sampleMode === "micro" ? [2, 3] : sampleMode === "lean" ? [2, 3, 3] : [3, 3, 4]); index += 1) {
    placeRandom(grid, used, "G", rng, width, height);
  }

  return grid.map((row) => row.join("")).join("\n");
}

function placePairAny(
  grid: string[][],
  used: Set<string>,
  rng: Rng,
  width: number,
  height: number,
  firstGlyph: string,
  secondGlyph: string,
): boolean {
  const points = interiorPoints(width, height).filter((point) => grid[point.y]![point.x] === ".");
  shuffle(rng, points);
  for (const first of points) {
    const dirs = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
    shuffle(rng, dirs);
    for (const dir of dirs) {
      const second = { x: first.x + dir.x, y: first.y + dir.y };
      if (!isInterior(second, width, height) || grid[second.y]![second.x] !== ".") {
        continue;
      }
      const flip = rng() < 0.5;
      grid[first.y]![first.x] = flip ? secondGlyph : firstGlyph;
      grid[second.y]![second.x] = flip ? firstGlyph : secondGlyph;
      used.add(`${first.x},${first.y}`);
      used.add(`${second.x},${second.y}`);
      return true;
    }
  }
  return false;
}

function placeRandom(
  grid: string[][],
  used: Set<string>,
  glyph: string,
  rng: Rng,
  width: number,
  height: number,
): boolean {
  const points = interiorPoints(width, height).filter((point) => grid[point.y]![point.x] === ".");
  shuffle(rng, points);
  for (const point of points) {
    const key = `${point.x},${point.y}`;
    if (used.has(key)) {
      continue;
    }
    used.add(key);
    grid[point.y]![point.x] = glyph;
    return true;
  }
  return false;
}

function findWinMissingGroups(
  initial: RuntimeState,
  requiredGroups: Group[],
  budget: { maxStates: number; maxDepth: number },
): ProbeResult {
  const allMask = (1 << requiredGroups.length) - 1;
  const queue: Array<{ state: RuntimeState; mask: number; depth: number }> = [
    { state: initial, mask: 0, depth: 0 },
  ];
  const visited = new Set<string>([`${runtime.key(initial)}|0`]);
  let cursor = 0;
  let depthHit = false;

  while (cursor < queue.length) {
    if (visited.size > budget.maxStates) {
      return { found: false, status: "exhausted", exploredStates: visited.size };
    }
    const current = queue[cursor]!;
    cursor += 1;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win) && current.mask !== allMask) {
      return {
        found: true,
        status: "found",
        exploredStates: visited.size,
        missingGroups: requiredGroups
          .filter((_, index) => (current.mask & (1 << index)) === 0)
          .map((group) => group.name),
      };
    }
    if (current.depth >= budget.maxDepth) {
      depthHit = true;
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) {
        continue;
      }
      const mask = collectMask(current.mask, result.events, requiredGroups);
      const key = `${runtime.key(result.state)}|${mask}`;
      if (visited.has(key)) {
        continue;
      }
      visited.add(key);
      queue.push({ state: result.state, mask, depth: current.depth + 1 });
    }
  }

  return { found: false, status: depthHit ? "exhausted" : "complete", exploredStates: visited.size };
}

function collectMask(current: number, events: string[], requiredGroups: Group[]): number {
  let mask = current;
  for (const [index, group] of requiredGroups.entries()) {
    if (group.patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern)))) {
      mask |= 1 << index;
    }
  }
  return mask;
}

function coversGroups(events: string[], requiredGroups: Group[]): boolean {
  return requiredGroups.every((group) =>
    group.patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern))),
  );
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
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
  };
}

function formatReport(): string {
  const lines = [
    "# Phase Ferry Search",
    "",
    `- seed: ${seed}`,
    `- iterations: ${iterations}`,
    `- maxStates: ${maxStates}`,
    `- graphMaxStates: ${graphMaxStates}`,
    `- maxDepth: ${maxDepth}`,
    `- minCost: ${minCost}`,
    `- sampleMode: ${sampleMode}`,
    `- wallRate: ${wallRate}`,
    `- hits: ${hits.length}`,
    `- solverHits: ${solverHits.length}`,
    "",
  ];
  for (const [index, hit] of hits.entries()) {
    lines.push(`## ${index + 1}. ${hit.id}`);
    lines.push("");
    lines.push(`- score=${hit.score.toFixed(1)} cost=${hit.cost} explored=${hit.explored} graphStates=${hit.graphStates} winStates=${hit.winStates} probeStates=${hit.probeStates} scc=${hit.sccShape ?? "n/a"}`);
    lines.push(`- inputs=${hit.inputs.join(" ")}`);
    lines.push(`- events=${hit.events.join(" ")}`);
    lines.push("");
    lines.push("```text");
    lines.push(hit.layout);
    lines.push("```");
    lines.push("");
  }
  if (solverHits.length > 0) {
    lines.push("## Solver-Only Material");
    lines.push("");
    for (const [index, hit] of solverHits.entries()) {
      lines.push(`### ${index + 1}. ${hit.id}`);
      lines.push("");
      lines.push(`- score=${hit.score.toFixed(1)} cost=${hit.cost} explored=${hit.explored} probe=${hit.probeStatus ?? "not_checked"} bypass=${hit.probeFoundBypass ?? "unknown"} missing=${hit.probeMissing?.join(",") ?? "n/a"}`);
      lines.push(`- inputs=${hit.inputs.join(" ")}`);
      lines.push(`- events=${hit.events.join(" ")}`);
      lines.push("");
      lines.push("```text");
      lines.push(hit.layout);
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

function isInterior(point: Point, width: number, height: number): boolean {
  return point.x > 0 && point.y > 0 && point.x < width - 1 && point.y < height - 1;
}

function range(min: number, max: number): number[] {
  const values: number[] = [];
  for (let value = min; value <= max; value += 1) {
    values.push(value);
  }
  return values;
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

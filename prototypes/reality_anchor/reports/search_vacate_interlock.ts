import { writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, Point, SearchStatus } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
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
type StepEvent = {
  input: InputId;
  events: string[];
  state: RealityAnchorState;
};
type VacateFact = {
  target: string;
  firstCoveredStep: number;
  firstUncoveredAfterCoveredStep: number;
  finalCovered: boolean;
};
type Hit = {
  score: number;
  id: string;
  layout: string;
  cost: number;
  explored: number;
  inputs: InputId[];
  events: string[];
  stepEvents: StepEvent[];
  graphStates: number;
  winStates: number;
  probeStates: number;
  sccShape?: string;
  walkSteps: number;
  firstPushPullShift: number;
  firstBoxStickyShift: number;
  firstMaterial: number;
  vacateFacts: VacateFact[];
  scriptedCount?: number;
};
type SolverHit = Omit<Hit, "graphStates" | "winStates" | "probeStates" | "sccShape"> & {
  probeStatus?: SearchStatus;
  probeFoundBypass?: boolean;
  probeMissing?: string[];
};

const prototypePath = "prototypes/reality_anchor";
const seed = Number(process.argv[2] ?? 743001);
const iterations = Number(process.argv[3] ?? 4000);
const maxStates = Number(process.argv[4] ?? 90000);
const graphMaxStates = Number(process.argv[5] ?? 120000);
const maxDepth = Number(process.argv[6] ?? 44);
const maxHits = Number(process.argv[7] ?? 16);
const minCost = Number(process.argv[8] ?? 12);
const maxCost = Number(process.argv[9] ?? 20);
const wallRate = Number(process.argv[10] ?? 0.13);

const coreGroups: Group[] = [
  { name: "push_pull_anchor_shift", patterns: ["anchor_boundary_shift:push_pull"] },
  { name: "box_sticky_anchor_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "pull_event", patterns: ["pull_object"] },
  { name: "material_normalization", patterns: ["box_to_sticky", "sticky_to_box"] },
  { name: "sticky_rigid_move", patterns: ["move_sticky_rigid"] },
];
const preferredGroups: Group[] = [
  { name: "sticky_merge", patterns: ["sticky_merge"] },
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
  [
    "########",
    "#..#..G#",
    "##GMLP.#",
    "#.BS.M.#",
    "##..@.##",
    "########",
  ].join("\n"),
  [
    "#########",
    "#...G.@.#",
    "#C.GLP.##",
    "#BS#.#..#",
    "#########",
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
  if (!layout || knownLayouts.has(layout) || seen.has(layout)) {
    continue;
  }
  seen.add(layout);

  const level = toLevel(`RA_VACATE_INTERLOCK_SEARCH_${seed}_${index}`, layout);
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
  if (
    !solution.found ||
    solution.cost === undefined ||
    solution.cost < minCost ||
    solution.cost > maxCost
  ) {
    continue;
  }
  if (!coversGroups(solution.events, coreGroups)) {
    continue;
  }

  const stepEvents = replayEvents(initial, solution.inputs);
  const walkSteps = stepEvents.filter((step) => step.events.length === 1 && step.events[0] === "walk").length;
  const firstPushPullShift = firstStep(stepEvents, "anchor_boundary_shift:push_pull");
  const firstBoxStickyShift = firstStep(stepEvents, "anchor_boundary_shift:box_sticky");
  const firstMaterial = firstStepAny(stepEvents, ["box_to_sticky", "sticky_to_box"]);
  const firstPull = firstStep(stepEvents, "pull_object");
  const firstStickyRigid = firstStep(stepEvents, "move_sticky_rigid");
  const vacateFacts = targetVacateFacts(initial as RealityAnchorState, stepEvents);

  if (walkSteps > Math.floor(solution.cost * 0.6)) {
    continue;
  }
  if (firstPushPullShift < 0 || firstBoxStickyShift < 0 || firstMaterial < 0 || firstPull < 0) {
    continue;
  }
  if (firstStickyRigid < 0 || vacateFacts.length === 0) {
    continue;
  }
  if (firstPushPullShift > solution.cost - 3) {
    continue;
  }
  if (firstBoxStickyShift > solution.cost - 3) {
    continue;
  }
  const interlock =
    firstPushPullShift < firstMaterial ||
    Math.abs(firstPushPullShift - firstBoxStickyShift) <= 1 ||
    stepEvents.some((step) =>
      step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:push_pull")) &&
      step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky")),
    );
  if (!interlock) {
    continue;
  }

  const preferredCovered = preferredGroups.filter((group) => coversGroups(solution.events, [group])).length;
  const solverScore =
    280 -
    Math.abs(solution.cost - 24) * 5 -
    walkSteps * 6 +
    vacateFacts.length * 40 +
    preferredCovered * 22 +
    (firstPushPullShift < firstMaterial ? 28 : 0) +
    (firstStickyRigid >= 0 ? 16 : 0) +
    new Set(solution.events.map((event) => event.split(":")[0])).size * 12;

  const solverHit: SolverHit = {
    score: solverScore,
    id: level.id,
    layout: adapter.renderState(initial as never),
    cost: solution.cost,
    explored: solution.exploredStates,
    inputs: solution.inputs,
    events: solution.events,
    stepEvents,
    walkSteps,
    firstPushPullShift,
    firstBoxStickyShift,
    firstMaterial,
    vacateFacts,
  };

  const requiredGroups = preferredCovered > 0 ? [...coreGroups, preferredGroups[0]!] : coreGroups;
  const probe = findWinMissingGroups(initial, requiredGroups, { maxStates, maxDepth });
  solverHit.probeStatus = probe.status;
  solverHit.probeFoundBypass = probe.found;
  solverHit.probeMissing = probe.missingGroups;
  solverHits.push(solverHit);
  solverHits.sort((left, right) => right.score - left.score);
  solverHits.splice(24);
  if (probe.found || probe.status !== "complete") {
    continue;
  }

  let analysis;
  try {
    analysis = analyzeLevel(pkg, level, {
      maxStates,
      maxDepth,
      graphMaxStates,
      counterfactualMaxStates: 5000,
    });
  } catch {
    continue;
  }
  if (analysis.graph.status !== "complete") {
    continue;
  }

  const eventVariety = new Set(solution.events.map((event) => event.split(":")[0])).size;
  const score =
    solverScore +
    eventVariety * 15 +
    Math.min(analysis.graph.reachableStateCount, 3000) / 35 -
    Math.min(analysis.graph.winStateCount, 60) * 1.5 +
    (analysis.agency.scc?.solutionIrreversibleStepCount ?? 0) * 5 -
    ((analysis.agency.scc as { handoffScriptiness?: { scriptedCount?: number } } | undefined)
      ?.handoffScriptiness?.scriptedCount ?? 0) * 8;

  hits.push({
    ...solverHit,
    score,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    probeStates: probe.exploredStates,
    sccShape: analysis.agency.scc?.winSubgraphShape,
    scriptedCount: analysis.agency.scc?.handoffScriptiness.scriptedCount,
  });
  hits.sort((left, right) => right.score - left.score);
  hits.splice(maxHits);
}

const report = formatReport();
const out = path.join(prototypePath, "reports", `search_vacate_interlock_${seed}.md`);
await writeFile(out, report, "utf8");
console.log(report);
console.log(`Wrote ${out}`);

function sampleLayout(rng: Rng): string {
  const width = choice(rng, [7, 8, 9, 9, 10]);
  const height = choice(rng, [5, 6, 6]);
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
  if (!placePairAny(grid, used, rng, width, height, "P", "L")) return "";
  if (!placePairAny(grid, used, rng, width, height, "B", "S")) return "";
  if (!placeRandom(grid, used, "@", rng, width, height)) return "";

  const crateCount = choice(rng, [1, 1, 2, 2, 3]);
  const stickyCount = choice(rng, [1, 2, 2, 3]);
  const goalCount = choice(rng, [2, 2, 3]);
  for (let index = 0; index < crateCount; index += 1) {
    if (!placeRandom(grid, used, "C", rng, width, height)) return "";
  }
  for (let index = 0; index < stickyCount; index += 1) {
    if (!placeRandom(grid, used, "M", rng, width, height)) return "";
  }
  for (let index = 0; index < goalCount; index += 1) {
    if (!placeRandom(grid, used, "G", rng, width, height)) return "";
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

function replayEvents(initial: RuntimeState, inputs: InputId[]): StepEvent[] {
  let state = initial;
  const steps: StepEvent[] = [];
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) {
      return steps;
    }
    steps.push({ input, events: result.events, state: result.state as RealityAnchorState });
    state = result.state;
  }
  return steps;
}

function targetVacateFacts(initial: RealityAnchorState, stepEvents: StepEvent[]): VacateFact[] {
  const targets = [...initial.goals].sort();
  const frames = [initial, ...stepEvents.map((step) => step.state)];
  const facts: VacateFact[] = [];
  for (const target of targets) {
    const coverage = frames.map((state) => coversTarget(state, target));
    const firstCovered = coverage.findIndex(Boolean);
    if (firstCovered < 0) continue;
    const firstUncoveredAfterCovered = coverage.findIndex((covered, index) => index > firstCovered && !covered);
    if (firstUncoveredAfterCovered < 0) continue;
    if (!coverage.at(-1)) continue;
    facts.push({
      target,
      firstCoveredStep: firstCovered,
      firstUncoveredAfterCoveredStep: firstUncoveredAfterCovered,
      finalCovered: true,
    });
  }
  return facts;
}

function coversTarget(state: RealityAnchorState, target: string): boolean {
  for (const crate of state.crates) {
    if (`${crate.x},${crate.y}` === target) return true;
  }
  for (const group of state.stickyGroups) {
    for (const cell of group) {
      if (`${cell.x},${cell.y}` === target) return true;
    }
  }
  const pushPull = state.pushPullAnchor;
  if (pushPull && (`${pushPull.push.x},${pushPull.push.y}` === target || `${pushPull.pull.x},${pushPull.pull.y}` === target)) {
    return true;
  }
  const boxSticky = state.boxStickyAnchor;
  if (boxSticky && (`${boxSticky.box.x},${boxSticky.box.y}` === target || `${boxSticky.sticky.x},${boxSticky.sticky.y}` === target)) {
    return true;
  }
  return false;
}

function firstStep(stepEvents: StepEvent[], pattern: string): number {
  return stepEvents.findIndex((step) => step.events.some((event) => eventMatchesPattern(event, pattern))) + 1 || -1;
}

function firstStepAny(stepEvents: StepEvent[], patterns: string[]): number {
  return stepEvents.findIndex((step) =>
    patterns.some((pattern) => step.events.some((event) => eventMatchesPattern(event, pattern))),
  ) + 1 || -1;
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

function coversGroups(events: string[], groups: Group[]): boolean {
  return groups.every((group) =>
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
    "# Vacate Interlock Search",
    "",
    `- seed: ${seed}`,
    `- iterations: ${iterations}`,
    `- maxStates: ${maxStates}`,
    `- graphMaxStates: ${graphMaxStates}`,
    `- maxDepth: ${maxDepth}`,
    `- costRange: ${minCost}-${maxCost}`,
    `- wallRate: ${wallRate}`,
    `- hits: ${hits.length}`,
    `- solverHits: ${solverHits.length}`,
    "",
  ];
  for (const [index, hit] of hits.entries()) {
    lines.push(`## ${index + 1}. ${hit.id}`);
    lines.push("");
    lines.push(`- score=${hit.score.toFixed(1)} cost=${hit.cost} walkSteps=${hit.walkSteps} explored=${hit.explored} graphStates=${hit.graphStates} winStates=${hit.winStates} probeStates=${hit.probeStates} scc=${hit.sccShape ?? "n/a"} scripted=${hit.scriptedCount ?? "n/a"}`);
    lines.push(`- firstPushPullShift=${hit.firstPushPullShift} firstBoxStickyShift=${hit.firstBoxStickyShift} firstMaterial=${hit.firstMaterial}`);
    lines.push(`- vacateFacts=${hit.vacateFacts.map((fact) => `${fact.target}:${fact.firstCoveredStep}->${fact.firstUncoveredAfterCoveredStep}->final`).join(", ")}`);
    lines.push(`- inputs=${hit.inputs.join(" ")}`);
    lines.push(`- events=${hit.events.join(" ")}`);
    lines.push("- stepEvents=");
    for (const [stepIndex, step] of hit.stepEvents.entries()) {
      lines.push(`  ${stepIndex + 1}. ${step.input}: ${step.events.join(" ") || "none"}`);
    }
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
      lines.push(`- score=${hit.score.toFixed(1)} cost=${hit.cost} walkSteps=${hit.walkSteps} explored=${hit.explored} probe=${hit.probeStatus ?? "not_checked"} bypass=${hit.probeFoundBypass ?? "unknown"} missing=${hit.probeMissing?.join(",") ?? "n/a"}`);
      lines.push(`- firstPushPullShift=${hit.firstPushPullShift} firstBoxStickyShift=${hit.firstBoxStickyShift} firstMaterial=${hit.firstMaterial}`);
      lines.push(`- vacateFacts=${hit.vacateFacts.map((fact) => `${fact.target}:${fact.firstCoveredStep}->${fact.firstUncoveredAfterCoveredStep}->final`).join(", ")}`);
      lines.push(`- inputs=${hit.inputs.join(" ")}`);
      lines.push(`- events=${hit.events.join(" ")}`);
      lines.push("- stepEvents=");
      for (const [stepIndex, step] of hit.stepEvents.entries()) {
        lines.push(`  ${stepIndex + 1}. ${step.input}: ${step.events.join(" ") || "none"}`);
      }
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

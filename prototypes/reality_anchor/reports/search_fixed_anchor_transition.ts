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
type FixedKind = "box_sticky" | "push_pull";
type Group = { name: string; patterns: string[] };
type ProbeResult = {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
  missingGroups?: string[];
};
type ReachableScan = {
  status: SearchStatus;
  reachableStates: number;
  legalTransitions: number;
  eventCounts: Record<string, number>;
  forbiddenHits: string[];
  reason?: string;
};
type Hit = {
  score: number;
  id: string;
  fixedKind: FixedKind;
  layout: string;
  cost: number;
  explored: number;
  inputs: InputId[];
  events: string[];
  graphStates: number;
  winStates: number;
  probeStates: number;
  sccShape?: string;
  scripted?: string;
  forbiddenHits: string[];
};

const prototypePath = "prototypes/reality_anchor";
const fixedKind = parseFixedKind(process.argv[2] ?? "box_sticky");
const seed = Number(process.argv[3] ?? 801001);
const iterations = Number(process.argv[4] ?? 5000);
const maxStates = Number(process.argv[5] ?? 80000);
const graphMaxStates = Number(process.argv[6] ?? 120000);
const maxDepth = Number(process.argv[7] ?? 30);
const maxHits = Number(process.argv[8] ?? 18);
const minCost = Number(process.argv[9] ?? 6);
const maxCost = Number(process.argv[10] ?? 16);
const wallRate = Number(process.argv[11] ?? 0.12);
const profile = process.argv[12] ?? "default";

const groups = buildGroups(fixedKind, profile);

const forbiddenReachable =
  fixedKind === "box_sticky" ? ["anchor_boundary_shift:box_sticky"] : ["anchor_boundary_shift:push_pull"];

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const rng = mulberry32(seed);
const hits: Hit[] = [];
const seen = new Set<string>();

for (let index = 0; index < iterations; index += 1) {
  const layout = sampleLayout(rng, fixedKind);
  if (!layout || seen.has(layout)) continue;
  seen.add(layout);

  const level = toLevel(`RA_FIXED_${fixedKind.toUpperCase()}_SEARCH_${seed}_${index}`, layout);
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
  if (!solution.found || solution.cost === undefined || solution.cost < minCost || solution.cost > maxCost) {
    continue;
  }
  if (!coversGroups(solution.events, groups)) {
    continue;
  }
  if (forbiddenReachable.some((pattern) => solution.events.some((event) => eventMatchesPattern(event, pattern)))) {
    continue;
  }

  const probe = findWinMissingGroups(initial, groups, { maxStates, maxDepth });
  if (probe.found || probe.status !== "complete") {
    continue;
  }

  const reachableScan = scanReachableEvents(initial, forbiddenReachable, {
    maxStates: graphMaxStates,
    maxDepth: undefined,
  });
  if (reachableScan.status !== "complete" || reachableScan.forbiddenHits.length > 0) {
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
  if (analysis.graph.status !== "complete" || analysis.agency.status !== "complete") {
    continue;
  }

  const eventVariety = new Set(solution.events.map((event) => event.split(":")[0])).size;
  const walkCount = solution.events.filter((event) => event === "walk").length;
  const optional =
    (solution.events.some((event) => eventMatchesPattern(event, "sticky_merge")) ? 1 : 0) +
    (solution.events.some((event) => eventMatchesPattern(event, "move_sticky_rigid")) ? 1 : 0);
  const scripted = analysis.agency.scc?.handoffProfile.scriptedHandoffCount ?? 0;
  const handoffs = analysis.agency.scc?.handoffProfile.handoffCount ?? 0;
  const score =
    260 -
    Math.abs(solution.cost - 11) * 10 +
    eventVariety * 16 +
    optional * 14 +
    Math.min(analysis.graph.reachableStateCount, 2000) / 40 -
    Math.min(analysis.graph.winStateCount, 40) * 1.4 -
    walkCount * 1.5 -
    scripted * 5;

  hits.push({
    score,
    id: level.id,
    fixedKind,
    layout: adapter.renderState(initial as never),
    cost: solution.cost,
    explored: solution.exploredStates,
    inputs: solution.inputs,
    events: solution.events,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    probeStates: probe.exploredStates,
    sccShape: analysis.agency.scc?.winSubgraphShape,
    scripted: handoffs > 0 ? `${scripted}/${handoffs}` : undefined,
    forbiddenHits: reachableScan.forbiddenHits,
  });
  hits.sort((left, right) => right.score - left.score);
  hits.splice(maxHits);
}

const report = formatReport();
const out = path.join(prototypePath, "reports", `search_fixed_anchor_transition_${fixedKind}_${seed}.md`);
await writeFile(out, report, "utf8");
console.log(report);
console.log(`Wrote ${out}`);

function parseFixedKind(value: string): FixedKind {
  if (value === "box_sticky" || value === "push_pull") return value;
  throw new Error("fixed kind must be box_sticky or push_pull");
}

function buildGroups(kind: FixedKind, groupProfile: string): Group[] {
  const base =
    kind === "box_sticky"
      ? [
          { name: "movable_push_pull_shift", patterns: ["anchor_boundary_shift:push_pull"] },
          { name: "fixed_box_sticky_effect", patterns: ["box_to_sticky", "sticky_to_box"] },
          { name: "pull_event", patterns: ["pull_object"] },
        ]
      : [
          { name: "movable_box_sticky_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
          { name: "fixed_push_pull_effect", patterns: ["pull_object"] },
          { name: "material_normalization", patterns: ["box_to_sticky", "sticky_to_box"] },
        ];
  if (groupProfile === "strong_material_no_pull" && kind === "box_sticky") {
    return [
      { name: "movable_push_pull_shift", patterns: ["anchor_boundary_shift:push_pull"] },
      { name: "fixed_box_sticky_effect", patterns: ["box_to_sticky", "sticky_to_box"] },
      { name: "box_to_sticky", patterns: ["box_to_sticky"] },
      { name: "sticky_merge", patterns: ["sticky_merge"] },
      { name: "sticky_rigid_move", patterns: ["move_sticky_rigid"] },
    ];
  }
  if (groupProfile !== "strong_material") return base;
  return [
    ...base,
    { name: "box_to_sticky", patterns: ["box_to_sticky"] },
    { name: "sticky_merge", patterns: ["sticky_merge"] },
    { name: "sticky_rigid_move", patterns: ["move_sticky_rigid"] },
  ];
}

function sampleLayout(rng: Rng, kind: FixedKind): string {
  const width = choice(rng, [8, 9, 10]);
  const lowerHeight = choice(rng, [4, 5]);
  const height = lowerHeight + 3;
  const grid = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) =>
      x === 0 || y === 0 || x === width - 1 || y === height - 1 || y === 2 ? "#" : ".",
    ),
  );

  const chamberX = Math.max(2, Math.min(width - 4, Math.floor(width / 2) - 1 + choice(rng, [-1, 0, 1])));
  grid[1] = Array.from({ length: width }, () => "#");
  if (kind === "box_sticky") {
    const flip = rng() < 0.3;
    grid[1]![chamberX] = flip ? "S" : "B";
    grid[1]![chamberX + 1] = flip ? "B" : "S";
  } else {
    const flip = rng() < 0.3;
    grid[1]![chamberX] = flip ? "L" : "P";
    grid[1]![chamberX + 1] = flip ? "P" : "L";
  }

  for (let y = 3; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      if (rng() < wallRate) grid[y]![x] = "#";
    }
  }

  const used = new Set<string>();
  if (kind === "box_sticky") {
    if (!placePairAny(grid, used, rng, width, height, "P", "L")) return "";
  } else {
    if (!placePairAny(grid, used, rng, width, height, "B", "S")) return "";
  }
  if (!placeRandom(grid, used, "@", rng, width, height)) return "";

  const crateCount = choice(rng, [1, 1, 2]);
  const stickyCount = choice(rng, [0, 1, 1, 2]);
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

function findWinMissingGroups(
  initial: RuntimeState,
  requiredGroups: Group[],
  budget: { maxStates: number; maxDepth: number },
): ProbeResult {
  const allMask = (1 << requiredGroups.length) - 1;
  const queue: Array<{ state: RuntimeState; mask: number; depth: number }> = [{ state: initial, mask: 0, depth: 0 }];
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
      if (!result.legal) continue;
      const mask = collectMask(current.mask, result.events, requiredGroups);
      const key = `${runtime.key(result.state)}|${mask}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: result.state, mask, depth: current.depth + 1 });
    }
  }
  return { found: false, status: depthHit ? "exhausted" : "complete", exploredStates: visited.size };
}

function scanReachableEvents(
  initial: RuntimeState,
  forbiddenPatterns: string[],
  budget: { maxStates: number; maxDepth?: number },
): ReachableScan {
  const queue: Array<{ state: RuntimeState; depth: number }> = [{ state: initial, depth: 0 }];
  const visited = new Set<string>([runtime.key(initial)]);
  const eventCounts: Record<string, number> = {};
  const forbiddenHits = new Set<string>();
  let legalTransitions = 0;
  let cursor = 0;
  while (cursor < queue.length) {
    if (visited.size > budget.maxStates) {
      return {
        status: "exhausted",
        reachableStates: visited.size,
        legalTransitions,
        eventCounts,
        forbiddenHits: [...forbiddenHits].sort(),
        reason: `state budget exceeded (${budget.maxStates})`,
      };
    }
    const current = queue[cursor]!;
    cursor += 1;
    if (budget.maxDepth !== undefined && current.depth >= budget.maxDepth) continue;
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) continue;
      legalTransitions += 1;
      for (const event of result.events) {
        eventCounts[event] = (eventCounts[event] ?? 0) + 1;
        if (forbiddenPatterns.some((pattern) => eventMatchesPattern(event, pattern))) {
          forbiddenHits.add(event);
        }
      }
      const key = runtime.key(result.state);
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: result.state, depth: current.depth + 1 });
    }
  }
  return {
    status: "complete",
    reachableStates: visited.size,
    legalTransitions,
    eventCounts,
    forbiddenHits: [...forbiddenHits].sort(),
  };
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
    "# Fixed Anchor Transition Search",
    "",
    `- fixedKind: ${fixedKind}`,
    `- seed: ${seed}`,
    `- iterations: ${iterations}`,
    `- maxStates: ${maxStates}`,
    `- graphMaxStates: ${graphMaxStates}`,
    `- maxDepth: ${maxDepth}`,
    `- costRange: ${minCost}-${maxCost}`,
    `- wallRate: ${wallRate}`,
    `- profile: ${profile}`,
    `- requiredGroups: ${groups.map((group) => group.name).join(", ")}`,
    `- forbiddenReachable: ${forbiddenReachable.join(", ")}`,
    `- hits: ${hits.length}`,
    "",
  ];
  for (const [index, hit] of hits.entries()) {
    lines.push(`## ${index + 1}. ${hit.id}`);
    lines.push("");
    lines.push(`- score=${hit.score.toFixed(1)} cost=${hit.cost} explored=${hit.explored} graphStates=${hit.graphStates} winStates=${hit.winStates} probeStates=${hit.probeStates} scc=${hit.sccShape ?? "n/a"} scripted=${hit.scripted ?? "n/a"}`);
    lines.push(`- inputs=${hit.inputs.join(" ")}`);
    lines.push(`- events=${hit.events.join(" ")}`);
    lines.push(`- forbiddenHits=${hit.forbiddenHits.join(", ") || "none"}`);
    lines.push("");
    lines.push("```text");
    lines.push(hit.layout);
    lines.push("```");
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
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
  const points = interiorPoints(width, height).filter((point) => grid[point.y]![point.x] === "." && point.y >= 3);
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
      if (!isInterior(second, width, height) || second.y < 3 || grid[second.y]![second.x] !== ".") continue;
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
  const points = interiorPoints(width, height).filter((point) => grid[point.y]![point.x] === "." && point.y >= 3);
  shuffle(rng, points);
  for (const point of points) {
    const key = `${point.x},${point.y}`;
    if (used.has(key)) continue;
    used.add(key);
    grid[point.y]![point.x] = glyph;
    return true;
  }
  return false;
}

function interiorPoints(width: number, height: number): Point[] {
  const points: Point[] = [];
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) points.push({ x, y });
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

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";

type Rng = () => number;
type RuntimeState = unknown;
type Group = { name: string; patterns: string[] };
type TraceStep = { input: InputId; events: string[] };
type ProbeResult = { found: boolean; status: SearchStatus; exploredStates: number; missingGroups?: string[] };
type Hit = {
  score: number;
  id: string;
  layout: string;
  cost: number;
  inputs: InputId[];
  events: string[];
  graphStates: number;
  winStates: number;
  firstMerge: number;
  firstBsShift: number;
  firstSplit: number;
  postSplitMoves: number;
  bsShiftCount: number;
  probeStates: number;
};

const prototypePath = "prototypes/reality_anchor";
const seed = Number(process.argv[2] ?? 872001);
const iterations = Number(process.argv[3] ?? 18000);
const maxStates = Number(process.argv[4] ?? 160000);
const graphMaxStates = Number(process.argv[5] ?? 180000);
const maxDepth = Number(process.argv[6] ?? 34);
const maxHits = Number(process.argv[7] ?? 12);
const minCost = Number(process.argv[8] ?? 8);
const maxCost = Number(process.argv[9] ?? 26);
const wallRate = Number(process.argv[10] ?? 0.18);

const coreGroups: Group[] = [
  { name: "bs_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "box_to_sticky", patterns: ["box_to_sticky"] },
  { name: "sticky_merge", patterns: ["sticky_merge"] },
  { name: "sticky_to_box", patterns: ["sticky_to_box"] },
  { name: "sticky_split", patterns: ["sticky_split"] },
  { name: "sticky_rigid", patterns: ["move_sticky_rigid"] },
];

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const rng = mulberry32(seed);
const seen = new Set<string>();
const hits: Hit[] = [];

for (let index = 0; index < iterations; index += 1) {
  const sourceLayout = sampleLayout(rng);
  if (!sourceLayout || seen.has(sourceLayout)) continue;
  seen.add(sourceLayout);
  const level = toLevel(`RA_MOVABLE_BS_SPLIT_${seed}_${index}`, sourceLayout);
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
  if (!solution.found || solution.cost === undefined) continue;
  if (solution.cost < minCost || solution.cost > maxCost) continue;
  if (!coversGroups(solution.events, coreGroups)) continue;

  const trace = replayTrace(initial, solution.inputs);
  const semantic = semanticStats(trace);
  if (semantic.firstMerge < 0 || semantic.firstBsShift < 0 || semantic.firstSplit < 0) continue;
  if (!(semantic.firstMerge < semantic.firstBsShift && semantic.firstBsShift <= semantic.firstSplit)) continue;
  if (semantic.bsShiftCount < 1) continue;
  if (semantic.postSplitMoves < 2) continue;

  const probe = findWinMissingGroups(initial, coreGroups, { maxStates, maxDepth });
  if (probe.found || probe.status !== "complete") continue;

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
  if (analysis.graph.status !== "complete") continue;

  const score =
    solution.cost * 10 +
    semantic.postSplitMoves * 45 +
    semantic.bsShiftCount * 20 +
    Math.min(analysis.graph.reachableStateCount, 4000) / 40 -
    Math.min(analysis.graph.winStateCount, 160) * 1.2 +
    (analysis.agency.scc?.solutionIrreversibleStepCount ?? 0) * 10;

  hits.push({
    score,
    id: level.id,
    layout: adapter.renderState(initial as never),
    cost: solution.cost,
    inputs: solution.inputs,
    events: solution.events,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    firstMerge: semantic.firstMerge,
    firstBsShift: semantic.firstBsShift,
    firstSplit: semantic.firstSplit,
    postSplitMoves: semantic.postSplitMoves,
    bsShiftCount: semantic.bsShiftCount,
    probeStates: probe.exploredStates,
  });
  hits.sort((left, right) => right.score - left.score);
  hits.splice(maxHits);
}

const report = formatReport();
const out = path.join(prototypePath, "reports", `search_movable_bs_split_${seed}.md`);
await writeFile(out, report, "utf8");
console.log(report);
console.log(`Wrote ${out}`);

function sampleLayout(rng: Rng): string {
  const width = choice(rng, [9, 10, 10, 11]);
  const height = choice(rng, [6, 7, 7, 8]);
  const grid = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) =>
      x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : ".",
    ),
  );

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      if (rng() < wallRate) grid[y]![x] = "#";
    }
  }

  const horizontal = rng() < 0.65;
  const anchorX = randInt(rng, 1, horizontal ? width - 3 : width - 2);
  const anchorY = randInt(rng, 1, horizontal ? height - 2 : height - 3);
  if (horizontal) {
    grid[anchorY]![anchorX] = "B";
    grid[anchorY]![anchorX + 1] = "S";
  } else {
    grid[anchorY]![anchorX] = "B";
    grid[anchorY + 1]![anchorX] = "S";
  }

  const occupied = new Set<string>(
    horizontal
      ? [`${anchorX},${anchorY}`, `${anchorX + 1},${anchorY}`]
      : [`${anchorX},${anchorY}`, `${anchorX},${anchorY + 1}`],
  );
  const openCells = (): Array<[number, number]> => {
    const cells: Array<[number, number]> = [];
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        if (grid[y]![x] === "." && !occupied.has(`${x},${y}`)) cells.push([x, y]);
      }
    }
    return cells;
  };
  const place = (char: string): boolean => {
    const cells = openCells();
    if (cells.length === 0) return false;
    const [x, y] = choice(rng, cells);
    grid[y]![x] = char;
    occupied.add(`${x},${y}`);
    return true;
  };

  if (!place("@")) return "";
  const crates = choice(rng, [1, 1, 2]);
  const sticky = choice(rng, [4, 4, 5, 5, 6]);
  const goals = choice(rng, [2, 2, 3]);
  for (let i = 0; i < crates; i += 1) {
    if (!place("C")) return "";
  }
  for (let i = 0; i < sticky; i += 1) {
    if (!place("M")) return "";
  }
  for (let i = 0; i < goals; i += 1) {
    if (!place("G")) return "";
  }
  return grid.map((row) => row.join("")).join("\n");
}

function replayTrace(initial: RuntimeState, inputs: InputId[]): TraceStep[] {
  let state = initial;
  const steps: TraceStep[] = [];
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) break;
    steps.push({ input, events: result.events });
    state = result.state;
  }
  return steps;
}

function semanticStats(trace: TraceStep[]): {
  firstMerge: number;
  firstBsShift: number;
  firstSplit: number;
  postSplitMoves: number;
  bsShiftCount: number;
} {
  const firstMergeIndex = trace.findIndex((step) =>
    step.events.some((event) => eventMatchesPattern(event, "sticky_merge")),
  );
  const firstBsShiftIndex = trace.findIndex((step) =>
    step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky")),
  );
  const firstSplitIndex = trace.findIndex((step) =>
    step.events.some((event) => eventMatchesPattern(event, "sticky_split")),
  );
  const postSplitMoves =
    firstSplitIndex < 0
      ? 0
      : trace
          .slice(firstSplitIndex + 1)
          .filter((step) =>
            step.events.some(
              (event) =>
                eventMatchesPattern(event, "move_sticky_rigid") ||
                eventMatchesPattern(event, "push_object:crate"),
            ),
          ).length;
  const bsShiftCount = trace.filter((step) =>
    step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky")),
  ).length;
  return {
    firstMerge: firstMergeIndex < 0 ? -1 : firstMergeIndex + 1,
    firstBsShift: firstBsShiftIndex < 0 ? -1 : firstBsShiftIndex + 1,
    firstSplit: firstSplitIndex < 0 ? -1 : firstSplitIndex + 1,
    postSplitMoves,
    bsShiftCount,
  };
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

function coversGroups(events: string[], groups: Group[]): boolean {
  return groups.every((group) =>
    group.patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern))),
  );
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
    const current = queue[cursor++]!;
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
      const nextMask = collectMask(current.mask, result.events, requiredGroups);
      const nextKey = `${runtime.key(result.state)}|${nextMask}`;
      if (visited.has(nextKey)) continue;
      visited.add(nextKey);
      queue.push({ state: result.state, mask: nextMask, depth: current.depth + 1 });
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

function formatReport(): string {
  const lines = [
    "# Movable B/S Split Search",
    "",
    `seed=${seed} iterations=${iterations} maxStates=${maxStates} graphMaxStates=${graphMaxStates} maxDepth=${maxDepth}`,
    `minCost=${minCost} maxCost=${maxCost} wallRate=${wallRate}`,
    `hits=${hits.length}`,
    "",
  ];
  for (const [index, hit] of hits.entries()) {
    lines.push(`## ${index + 1}. ${hit.id}`);
    lines.push("");
    lines.push(
      `- score=${hit.score.toFixed(1)} cost=${hit.cost} graphStates=${hit.graphStates} winStates=${hit.winStates} probeStates=${hit.probeStates}`,
    );
    lines.push(
      `- firstMerge=${hit.firstMerge} firstBsShift=${hit.firstBsShift} firstSplit=${hit.firstSplit} bsShiftCount=${hit.bsShiftCount} postSplitMoves=${hit.postSplitMoves}`,
    );
    lines.push(`- inputs=${hit.inputs.join(" ")}`);
    lines.push(`- events=${hit.events.join(" ")}`);
    lines.push("");
    lines.push("```text");
    lines.push(hit.layout);
    lines.push("```");
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

function choice<T>(rng: Rng, values: T[]): T {
  return values[Math.floor(rng() * values.length)]!;
}

function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
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

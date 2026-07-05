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
type Hit = {
  id: string;
  score: number;
  layout: string;
  cost: number;
  inputs: InputId[];
  events: string[];
  graphStates: number;
  winStates: number;
  firstMerge: number;
  firstBsShift: number;
  firstCut: number;
  bsShiftCount: number;
  cutCount: number;
  postCutCratePushes: number;
  postCutStickyMoves: number;
  cratePushBeforeLaterCore: boolean;
  coreProbeStates: number;
  orderProbeStates: number;
};

const prototypePath = "prototypes/reality_anchor";
const seed = Number(process.argv[2] ?? 910001);
const iterations = Number(process.argv[3] ?? 6000);
const maxStates = Number(process.argv[4] ?? 60000);
const graphMaxStates = Number(process.argv[5] ?? 120000);
const maxDepth = Number(process.argv[6] ?? 36);
const maxHits = Number(process.argv[7] ?? 12);
const minCost = Number(process.argv[8] ?? 10);
const maxCost = Number(process.argv[9] ?? 34);
const wallRate = Number(process.argv[10] ?? 0.2);

const coreGroups: Group[] = [
  { name: "bs_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "box_to_sticky", patterns: ["box_to_sticky"] },
  { name: "sticky_merge", patterns: ["sticky_merge"] },
  { name: "sticky_to_box", patterns: ["sticky_to_box"] },
  { name: "sticky_rigid", patterns: ["move_sticky_rigid"] },
  { name: "crate_push", patterns: ["push_object:crate"] },
];

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const rng = mulberry32(seed);
const seen = new Set<string>();
const hits: Hit[] = [];

for (let index = 0; index < iterations; index += 1) {
  const layout = sampleLayout(rng);
  if (!layout || seen.has(layout)) continue;
  seen.add(layout);
  const id = `RA_L11_INTERLOCK_${seed}_${index}`;
  const level = toLevel(id, layout);
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
  if (semantic.firstMerge < 0 || semantic.firstBsShift < 0 || semantic.firstCut < 0) continue;
  if (!(semantic.firstMerge < semantic.firstBsShift)) continue;
  if (semantic.bsShiftCount < 2 || semantic.cutCount < 1) continue;
  if (semantic.postCutCratePushes < 1 || semantic.postCutStickyMoves < 1) continue;
  if (!semantic.cratePushBeforeLaterCore) continue;

  const coreProbe = findWinMissingGroups(initial, coreGroups, { maxStates, maxDepth });
  if (coreProbe.found || coreProbe.status !== "complete") continue;

  const orderProbe = findWinWithEarlyBeforeRequired(initial, "anchor_boundary_shift:box_sticky", "sticky_merge", {
    maxStates,
    maxDepth,
  });
  if (orderProbe.found || orderProbe.status !== "complete") continue;

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
    semantic.postCutStickyMoves * 65 +
    semantic.postCutCratePushes * 45 +
    (semantic.cratePushBeforeLaterCore ? 90 : 0) +
    semantic.bsShiftCount * 22 +
    Math.min(analysis.graph.reachableStateCount, 5000) / 35 -
    Math.min(analysis.graph.winStateCount, 250) * 1.6 +
    (analysis.agency.scc?.solutionIrreversibleStepCount ?? 0) * 10;

  hits.push({
    id,
    score,
    layout: adapter.renderState(initial as never),
    cost: solution.cost,
    inputs: solution.inputs,
    events: solution.events,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    firstMerge: semantic.firstMerge,
    firstBsShift: semantic.firstBsShift,
    firstCut: semantic.firstCut,
    bsShiftCount: semantic.bsShiftCount,
    cutCount: semantic.cutCount,
    postCutCratePushes: semantic.postCutCratePushes,
    postCutStickyMoves: semantic.postCutStickyMoves,
    cratePushBeforeLaterCore: semantic.cratePushBeforeLaterCore,
    coreProbeStates: coreProbe.exploredStates,
    orderProbeStates: orderProbe.exploredStates,
  });
  hits.sort((left, right) => right.score - left.score);
  hits.splice(maxHits);
}

const report = formatReport();
const out = path.join(prototypePath, "reports", `search_l11_interlock_${seed}.md`);
await writeFile(out, report, "utf8");
console.log(report);
console.log(`Wrote ${out}`);

function sampleLayout(rng: Rng): string {
  const width = choice(rng, [8, 9, 9, 10, 10, 11]);
  const height = choice(rng, [6, 6, 7, 7]);
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

  const horizontal = rng() < 0.8;
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
  const sticky = choice(rng, [2, 3, 3, 4]);
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
  firstCut: number;
  bsShiftCount: number;
  cutCount: number;
  postCutCratePushes: number;
  postCutStickyMoves: number;
  cratePushBeforeLaterCore: boolean;
} {
  const firstMergeIndex = trace.findIndex((step) =>
    step.events.some((event) => eventMatchesPattern(event, "sticky_merge")),
  );
  const firstBsShiftIndex = trace.findIndex((step) =>
    step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky")),
  );
  const firstCutIndex = trace.findIndex((step) =>
    step.events.some((event) => eventMatchesPattern(event, "sticky_to_box")),
  );
  const bsShiftCount = trace.filter((step) =>
    step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky")),
  ).length;
  const cutCount = trace.filter((step) =>
    step.events.some((event) => eventMatchesPattern(event, "sticky_to_box")),
  ).length;
  const postCutTrace = firstCutIndex < 0 ? [] : trace.slice(firstCutIndex + 1);
  const postCutCratePushes = postCutTrace.filter((step) =>
    step.events.some((event) => eventMatchesPattern(event, "push_object:crate")),
  ).length;
  const postCutStickyMoves = postCutTrace.filter((step) =>
    step.events.some((event) => eventMatchesPattern(event, "move_sticky_rigid")),
  ).length;
  const cratePushBeforeLaterCore = postCutTrace.some((step, index) => {
    const hasCratePush = step.events.some((event) => eventMatchesPattern(event, "push_object:crate"));
    if (!hasCratePush) return false;
    return postCutTrace.slice(index + 1).some((later) =>
      later.events.some((event) =>
        ["move_sticky_rigid", "anchor_boundary_shift:box_sticky", "sticky_to_box", "box_to_sticky", "sticky_merge"].some(
          (pattern) => eventMatchesPattern(event, pattern),
        ),
      ),
    );
  });
  return {
    firstMerge: firstMergeIndex < 0 ? -1 : firstMergeIndex + 1,
    firstBsShift: firstBsShiftIndex < 0 ? -1 : firstBsShiftIndex + 1,
    firstCut: firstCutIndex < 0 ? -1 : firstCutIndex + 1,
    bsShiftCount,
    cutCount,
    postCutCratePushes,
    postCutStickyMoves,
    cratePushBeforeLaterCore,
  };
}

function findWinMissingGroups(
  initial: RuntimeState,
  requiredGroups: Group[],
  budget: { maxStates: number; maxDepth: number },
): { found: boolean; status: SearchStatus; exploredStates: number } {
  const allMask = (1 << requiredGroups.length) - 1;
  const queue: Array<{ state: RuntimeState; mask: number; depth: number }> = [
    { state: initial, mask: 0, depth: 0 },
  ];
  const visited = new Set<string>([`${runtime.key(initial)}|0`]);
  let cursor = 0;
  let depthHit = false;
  while (cursor < queue.length) {
    if (visited.size > budget.maxStates) return { found: false, status: "exhausted", exploredStates: visited.size };
    const current = queue[cursor++]!;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win) && current.mask !== allMask) {
      return { found: true, status: "found", exploredStates: visited.size };
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

function findWinWithEarlyBeforeRequired(
  initial: RuntimeState,
  earlyPattern: string,
  requiredBeforePattern: string,
  budget: { maxStates: number; maxDepth: number },
): { found: boolean; status: SearchStatus; exploredStates: number } {
  const queue: Array<{ state: RuntimeState; seenRequired: boolean; violated: boolean; depth: number }> = [
    { state: initial, seenRequired: false, violated: false, depth: 0 },
  ];
  const visited = new Set<string>([`${runtime.key(initial)}|0|0`]);
  let cursor = 0;
  let depthHit = false;
  while (cursor < queue.length) {
    if (visited.size > budget.maxStates) return { found: false, status: "exhausted", exploredStates: visited.size };
    const current = queue[cursor++]!;
    if (current.depth > 0 && current.violated && runtime.isWin(current.state, pkg.mechanic.win)) {
      return { found: true, status: "found", exploredStates: visited.size };
    }
    if (current.depth >= budget.maxDepth) {
      depthHit = true;
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) continue;
      const hasRequired = result.events.some((event) => eventMatchesPattern(event, requiredBeforePattern));
      const hasEarly = result.events.some((event) => eventMatchesPattern(event, earlyPattern));
      const seenRequired = current.seenRequired || hasRequired;
      const violated = current.violated || (hasEarly && !current.seenRequired && !hasRequired);
      const nextKey = `${runtime.key(result.state)}|${seenRequired ? 1 : 0}|${violated ? 1 : 0}`;
      if (visited.has(nextKey)) continue;
      visited.add(nextKey);
      queue.push({ state: result.state, seenRequired, violated, depth: current.depth + 1 });
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

function formatReport(): string {
  const lines = [
    "# L11 Interlock Search",
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
      `- score=${hit.score.toFixed(1)} cost=${hit.cost} graph=${hit.graphStates} win=${hit.winStates} coreProbe=${hit.coreProbeStates} orderProbe=${hit.orderProbeStates}`,
    );
    lines.push(
      `- firstMerge=${hit.firstMerge} firstBsShift=${hit.firstBsShift} firstCut=${hit.firstCut} bsShiftCount=${hit.bsShiftCount} cutCount=${hit.cutCount}`,
    );
    lines.push(
      `- postCutCratePushes=${hit.postCutCratePushes} postCutStickyMoves=${hit.postCutStickyMoves} cratePushBeforeLaterCore=${hit.cratePushBeforeLaterCore}`,
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

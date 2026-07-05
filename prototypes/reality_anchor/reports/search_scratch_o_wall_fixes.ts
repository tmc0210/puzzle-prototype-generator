import { writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";

type RuntimeState = unknown;
type Group = { name: string; patterns: string[] };

const prototypePath = "prototypes/reality_anchor";
const baseRows = `
############
#.........@#
#.G...C..#.#
#...M#.#####
#...SB.#####
###G##.....#
############
`.trim().split("\n");
const expectedInputs = "left left down left left left left right right down down left left left right up up left down down"
  .split(/\s+/) as InputId[];
const maxStates = Number(process.argv[2] ?? 220000);
const maxDepth = Number(process.argv[3] ?? 120);
const maxCombos = Number(process.argv[4] ?? 2);

const groups: Group[] = [
  { name: "bs_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "box_to_sticky", patterns: ["box_to_sticky"] },
  { name: "sticky_merge", patterns: ["sticky_merge"] },
  { name: "sticky_to_box", patterns: ["sticky_to_box"] },
  { name: "sticky_rigid", patterns: ["move_sticky_rigid"] },
  {
    name: "crate_push",
    patterns: Array.from({ length: 8 }, (_, index) => `push_object:crate#${index + 1}`),
  },
];

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

const baseLevel = toLevel("scratch_o_base", baseRows.join("\n"));
const baseInitial = adapter.parseLevel(baseLevel);
const protectedCells = collectRenderedOccupancy(baseInitial, expectedInputs);
const mutableCells: Array<{ x: number; y: number }> = [];
for (const [y, row] of baseRows.entries()) {
  for (let x = 0; x < row.length; x += 1) {
    if (row[x] !== ".") continue;
    if (protectedCells.has(`${x},${y}`)) continue;
    mutableCells.push({ x, y });
  }
}

const hits: Array<{
  walls: string[];
  cost: number;
  graphStates: number;
  winStates: number;
  layout: string;
  inputs: InputId[];
  events: string[];
  probeStates: number;
}> = [];

for (const combo of combinations(mutableCells, maxCombos)) {
  const rows = baseRows.map((row) => row.split(""));
  for (const cell of combo) rows[cell.y]![cell.x] = "#";
  const layout = rows.map((row) => row.join("")).join("\n");
  const level = toLevel(`scratch_o_fix_${combo.map((cell) => `${cell.x}_${cell.y}`).join("_")}`, layout);
  let initial: RuntimeState;
  try {
    initial = adapter.parseLevel(level);
  } catch {
    continue;
  }
  const replay = replayInputs(initial, expectedInputs);
  if (!replay.legal || !replay.win) continue;

  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth,
  });
  if (!solution.found || solution.cost === undefined) continue;
  if (!groups.every((group) => group.patterns.some((pattern) => solution.events.some((event) => eventMatchesPattern(event, pattern))))) {
    continue;
  }
  const probe = findWinMissingGroups(initial, groups, { maxStates, maxDepth });
  if (probe.found || probe.status !== "complete") continue;

  let analysis;
  try {
    analysis = analyzeLevel(pkg, level, {
      maxStates,
      maxDepth,
      graphMaxStates: maxStates,
      counterfactualMaxStates: 5000,
    });
  } catch {
    continue;
  }
  if (analysis.graph.status !== "complete") continue;
  hits.push({
    walls: combo.map((cell) => `${cell.x},${cell.y}`),
    cost: solution.cost,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    layout: adapter.renderState(initial as never),
    inputs: solution.inputs,
    events: solution.events,
    probeStates: probe.exploredStates,
  });
  if (hits.length >= 20) break;
}

const report = [
  "# scratch_o wall fix search",
  "",
  `mutable=${mutableCells.length} maxCombos=${maxCombos} hits=${hits.length}`,
  "",
  ...hits.flatMap((hit, index) => [
    `## Hit ${index + 1}`,
    "",
    `walls=${hit.walls.join(" ")} cost=${hit.cost} graph=${hit.graphStates} win=${hit.winStates} probe=${hit.probeStates}`,
    "",
    "```text",
    hit.layout,
    "```",
    "",
    `inputs=${hit.inputs.join(" ")}`,
    `events=${hit.events.join(" ")}`,
    "",
  ]),
].join("\n");
const out = path.join(prototypePath, "reports", "search_scratch_o_wall_fixes.md");
await writeFile(out, `${report.trimEnd()}\n`, "utf8");
console.log(report);

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

function collectRenderedOccupancy(initial: RuntimeState, inputs: InputId[]): Set<string> {
  const occupied = new Set<string>();
  let state = initial;
  mark(adapter.renderState(state as never), occupied);
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) break;
    state = result.state;
    mark(adapter.renderState(state as never), occupied);
  }
  return occupied;
}

function mark(rendered: string, occupied: Set<string>): void {
  for (const [y, row] of rendered.split("\n").entries()) {
    for (let x = 0; x < row.length; x += 1) {
      const char = row[x]!;
      if (char !== "." && char !== "G") occupied.add(`${x},${y}`);
    }
  }
}

function replayInputs(initial: RuntimeState, inputs: InputId[]): { legal: boolean; win: boolean } {
  let state = initial;
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) return { legal: false, win: false };
    state = result.state;
  }
  return { legal: true, win: runtime.isWin(state, pkg.mechanic.win) };
}

function* combinations<T>(items: T[], maxSize: number): Generator<T[]> {
  for (let size = 1; size <= maxSize; size += 1) {
    yield* combineFrom(items, size, 0, []);
  }
}

function* combineFrom<T>(items: T[], remaining: number, start: number, prefix: T[]): Generator<T[]> {
  if (remaining === 0) {
    yield prefix;
    return;
  }
  for (let index = start; index <= items.length - remaining; index += 1) {
    yield* combineFrom(items, remaining - 1, index + 1, [...prefix, items[index]!]);
  }
}

function findWinMissingGroups(
  initial: RuntimeState,
  requiredGroups: Group[],
  budget: { maxStates: number; maxDepth: number },
): {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
} {
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
      return { found: true, status: "found", exploredStates: visited.size };
    }
    if (current.depth >= budget.maxDepth) {
      depthHit = true;
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) continue;
      let nextMask = current.mask;
      for (const [index, group] of requiredGroups.entries()) {
        if (group.patterns.some((pattern) => result.events.some((event) => eventMatchesPattern(event, pattern)))) {
          nextMask |= 1 << index;
        }
      }
      const key = `${runtime.key(result.state)}|${nextMask}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: result.state, mask: nextMask, depth: current.depth + 1 });
    }
  }
  return {
    found: false,
    status: depthHit ? "exhausted" : "complete",
    exploredStates: visited.size,
  };
}

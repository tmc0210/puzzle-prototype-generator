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

const prototypePath = "prototypes/reality_anchor";
const seed = Number(process.argv[2] ?? 901001);
const iterations = Number(process.argv[3] ?? 3000);
const maxStates = Number(process.argv[4] ?? 120000);
const maxDepth = Number(process.argv[5] ?? 80);
const maxHits = Number(process.argv[6] ?? 10);

const base = `
############
#.........@#
#.G...C..#.#
#...M#.#####
#...SB.#####
###G##.....#
############
`.trim().split("\n");

const mutable = [
  [7, 2], [8, 2], [10, 2],
  [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
  [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
  [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
  [1, 3], [2, 3], [3, 3],
  [1, 4], [2, 4],
] as const;

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
const rng = mulberry32(seed);
const seen = new Set<string>();
const hits: Array<{
  id: string;
  layout: string;
  cost: number;
  inputs: InputId[];
  events: string[];
  graphStates: number;
  winStates: number;
  firstBsShift: number;
  probeStates: number;
}> = [];

for (let i = 0; i < iterations; i += 1) {
  const layout = sampleLayout(rng);
  if (seen.has(layout)) continue;
  seen.add(layout);
  const id = `RA_REVERSE_KEYHOLE_LOCAL_${seed}_${i}`;
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
  if (solution.cost < 12 || solution.cost > 40) continue;
  if (!coversGroups(solution.events, groups)) continue;
  const firstBsShift = firstStepWith(solution.inputs, initial, "anchor_boundary_shift:box_sticky");
  if (firstBsShift <= 2) continue;
  if (!hasPostCutCratePush(initial, solution.inputs)) continue;

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
    id,
    layout: adapter.renderState(initial as never),
    cost: solution.cost,
    inputs: solution.inputs,
    events: solution.events,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    firstBsShift,
    probeStates: probe.exploredStates,
  });
  hits.sort((a, b) => a.cost - b.cost || a.graphStates - b.graphStates);
  hits.splice(maxHits);
}

const report = [
  "# Reverse Keyhole Local Search",
  "",
  `seed=${seed} iterations=${iterations} maxStates=${maxStates} maxDepth=${maxDepth} hits=${hits.length}`,
  "",
  ...hits.flatMap((hit, index) => [
    `## Hit ${index + 1}: ${hit.id}`,
    "",
    `cost=${hit.cost} graph=${hit.graphStates} win=${hit.winStates} firstBsShift=${hit.firstBsShift} probe=${hit.probeStates}`,
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

const out = path.join(prototypePath, "reports", `search_reverse_keyhole_local_${seed}.md`);
await writeFile(out, `${report.trimEnd()}\n`, "utf8");
console.log(report);

function sampleLayout(rng: Rng): string {
  const grid = base.map((row) => row.split(""));
  for (const [x, y] of mutable) {
    const roll = rng();
    if (roll < 0.48) grid[y]![x] = "#";
    else grid[y]![x] = ".";
  }
  // Keep these structural cells stable.
  grid[1]![10] = "@";
  grid[2]![2] = "G";
  grid[2]![6] = "C";
  grid[3]![4] = "M";
  grid[4]![4] = "S";
  grid[4]![5] = "B";
  grid[5]![3] = "G";
  return grid.map((row) => row.join("")).join("\n");
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

function coversGroups(events: string[], required: Group[]): boolean {
  return required.every((group) =>
    group.patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern))),
  );
}

function firstStepWith(inputs: InputId[], initial: RuntimeState, pattern: string): number {
  let state = initial;
  for (const [index, input] of inputs.entries()) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) return -1;
    if (result.events.some((event) => eventMatchesPattern(event, pattern))) return index + 1;
    state = result.state;
  }
  return -1;
}

function hasPostCutCratePush(initial: RuntimeState, inputs: InputId[]): boolean {
  let state = initial;
  let cutSeen = false;
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) return false;
    if (cutSeen && result.events.some((event) => /^push_object:crate#/.test(event))) return true;
    if (result.events.some((event) => eventMatchesPattern(event, "sticky_to_box"))) cutSeen = true;
    state = result.state;
  }
  return false;
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
  return { found: false, status: depthHit ? "exhausted" : "complete", exploredStates: visited.size };
}

function mulberry32(seedValue: number): Rng {
  let value = seedValue >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

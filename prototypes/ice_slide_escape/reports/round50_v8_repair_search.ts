import { loadPrototypePackage } from "../../../src/core/io.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const baseRows = [
  "#######################",
  "#######################",
  "#######################",
  "####.##################",
  "####.##################",
  ".....*...*...##........",
  "####..###..############",
  "####II###I..###########",
  "####.......############",
  "####**...#.############",
  "##########.############",
];

const addWallCandidates: Pt[] = [
  [4, 6],
  [5, 6],
  [9, 6],
  [10, 6],
  [10, 7],
  [11, 7],
  [4, 8],
  [5, 8],
  [6, 8],
  [7, 8],
  [8, 8],
  [9, 8],
  [10, 8],
  [6, 9],
  [7, 9],
  [8, 9],
  [10, 9],
];

const removeWallCandidates: Pt[] = [
  [6, 6],
  [7, 6],
  [8, 6],
  [6, 7],
  [7, 7],
  [8, 7],
  [9, 9],
];

const forbiddenBase = [
  "ice_destroy_group_d6_plus",
  "ice_pass_through_d5",
  "slide_restart_after_group",
];
const baseRequired = ["ice_destroyed_d3", "ice_stop_short"];
const metaRequired = [
  "ice_destroy_group_d6_plus",
  "ice_destroyed_d3",
  "ice_stop_short",
  "ice_rebound_d4",
];

function mutate(addWalls: Pt[], removeWalls: Pt[]): string | undefined {
  const rows = baseRows.map((row) => row.split(""));
  for (const [x, y] of removeWalls) {
    if (rows[y]?.[x] !== "#") return undefined;
    rows[y]![x] = ".";
  }
  for (const [x, y] of addWalls) {
    if (rows[y]?.[x] !== ".") return undefined;
    rows[y]![x] = "#";
  }
  return rows.map((row) => row.join("")).join("\n");
}

function buildLevel(layout: string, start: Pt, goal: Pt): LevelDoc {
  return {
    id: "round50_v8_repair_search",
    title: "round50_v8_repair_search",
    role: "challenge",
    status: "candidate",
    targets: [],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: [],
    expected_llm_player_evidence: [],
    layout,
    win: {
      type: "ice_slide_escape_explicit_goal",
      player_start: start,
      player_goal: goal,
    } satisfies WinCondition,
  };
}

function covers(events: string[], patterns: string[]): boolean {
  return patterns.every((pattern) => events.some((event) => eventMatchesPattern(event, pattern)));
}

function hits(events: string[], patterns: string[]): boolean {
  return patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern)));
}

function scan(layout: string, start: Pt, goal: Pt, options: { maxStates: number; maxDepth: number }) {
  const level = buildLevel(layout, start, goal);
  const initial = adapter.parseLevel(level);
  const winCondition = level.win!;
  const queue: Array<{ state: unknown; inputs: string[]; events: string[]; depth: number }> = [
    { state: initial, inputs: [], events: [], depth: 0 },
  ];
  const visited = new Set<string>([runtime.key(initial)]);
  let cursor = 0;
  let firstWin: { inputs: string[]; events: string[]; depth: number } | undefined;
  const reachableEvents: string[] = [];

  while (cursor < queue.length) {
    if (visited.size > options.maxStates) {
      return { status: "exhausted" as const, states: visited.size, firstWin, reachableEvents };
    }
    const current = queue[cursor]!;
    cursor += 1;
    if (current.depth >= options.maxDepth) continue;

    for (const action of runtime.actions(current.state, { winCondition })) {
      const result = runtime.step(current.state, action, { winCondition });
      if (!result.legal) continue;
      reachableEvents.push(...result.events);
      const nextInputs = [...current.inputs, action];
      const nextEvents = [...current.events, ...result.events];
      if (runtime.isWin(result.state, winCondition)) {
        firstWin ??= { inputs: nextInputs, events: nextEvents, depth: current.depth + 1 };
      }
      const key = runtime.key(result.state);
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: result.state, inputs: nextInputs, events: nextEvents, depth: current.depth + 1 });
    }
  }

  return { status: "complete" as const, states: visited.size, firstWin, reachableEvents };
}

function key(points: Pt[]): string {
  return points.map(([x, y]) => `${x},${y}`).join("+") || "none";
}

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

const addSets: Pt[][] = [[]];
for (const point of addWallCandidates) addSets.push([point]);
for (let i = 0; i < addWallCandidates.length; i += 1) {
  for (let j = i + 1; j < addWallCandidates.length; j += 1) {
    addSets.push([addWallCandidates[i]!, addWallCandidates[j]!]);
  }
}

const removeSets: Pt[][] = [[]];
for (const point of removeWallCandidates) removeSets.push([point]);
for (let i = 0; i < removeWallCandidates.length; i += 1) {
  for (let j = i + 1; j < removeWallCandidates.length; j += 1) {
    removeSets.push([removeWallCandidates[i]!, removeWallCandidates[j]!]);
  }
}

let checked = 0;
let baseStrictPasses = 0;
let bothPasses = 0;

for (const addWalls of addSets) {
  for (const removeWalls of removeSets) {
    const layout = mutate(addWalls, removeWalls);
    if (!layout) continue;
    checked += 1;
    const base = scan(layout, [0, 5], [10, 10], { maxStates: 60000, maxDepth: 240 });
    if (
      base.status !== "complete" ||
      !base.firstWin ||
      !covers(base.firstWin.events, baseRequired) ||
      hits(base.firstWin.events, forbiddenBase) ||
      hits(base.reachableEvents, forbiddenBase)
    ) {
      continue;
    }
    baseStrictPasses += 1;
    const meta = scan(layout, [10, 10], [22, 5], { maxStates: 80000, maxDepth: 280 });
    if (
      meta.status !== "complete" ||
      !meta.firstWin ||
      !covers(meta.firstWin.events, metaRequired)
    ) {
      continue;
    }
    bothPasses += 1;
    const id = `add_${key(addWalls)}__remove_${key(removeWalls)}`.replace(/[^a-zA-Z0-9_-]/g, "_");
    console.log(`PASS ${id} baseDepth=${base.firstWin.depth} baseStates=${base.states} metaDepth=${meta.firstWin.depth} metaStates=${meta.states}`);
    console.log(layout);
  }
}

console.log(JSON.stringify({ checked, baseStrictPasses, bothPasses }, null, 2));

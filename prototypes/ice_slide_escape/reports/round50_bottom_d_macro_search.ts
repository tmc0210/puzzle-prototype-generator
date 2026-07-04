import { loadPrototypePackage } from "../../../src/core/io.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const template = [
  "#######################",
  "#######################",
  "#######################",
  "####.##################",
  "####.#################.",
  ".....*...*...##......II",
  "#####.###..###########.",
  "####II#.#I..###########",
  "####.......############",
  "####**.##..############",
  "##########..###########",
];

const forbiddenBase = [
  "ice_destroy_group_d6_plus",
  "ice_pass_through_d5",
  "slide_restart_after_group",
];
const baseRequired = ["ice_destroyed_d3", "ice_stop_short"];
const metaRequired = ["ice_destroy_group_d6_plus", "ice_destroyed_d3", "ice_stop_short:d2"];

function build(row9Mask: number, bottomStart: number, bottomEnd: number): string {
  const rows = template.map((row) => row.split(""));
  for (const x of [6, 7, 8, 9, 10]) {
    rows[9]![x] = row9Mask & (1 << (x - 6)) ? "." : "#";
  }
  rows[9]![4] = "*";
  rows[9]![5] = "*";
  for (let x = 0; x < rows[10]!.length; x += 1) {
    rows[10]![x] = "#";
  }
  for (let x = bottomStart; x <= bottomEnd; x += 1) {
    rows[10]![x] = ".";
  }
  return rows.map((row) => row.join("")).join("\n");
}

function buildLevel(layout: string, start: Pt, goal: Pt): LevelDoc {
  return {
    id: "round50_bottom_d_macro_search",
    title: "round50_bottom_d_macro_search",
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

function scan(layout: string, start: Pt, goal: Pt, maxStates: number, maxDepth: number) {
  const level = buildLevel(layout, start, goal);
  const initial = adapter.parseLevel(level);
  const winCondition = level.win!;
  const queue: Array<{ state: unknown; inputs: string[]; events: string[]; depth: number }> = [
    { state: initial, inputs: [], events: [], depth: 0 },
  ];
  const visited = new Set<string>([runtime.key(initial)]);
  const reachableEvents: string[] = [];
  let firstWin: { inputs: string[]; events: string[]; depth: number } | undefined;
  let cursor = 0;

  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return { status: "exhausted" as const, states: visited.size, reachableEvents, firstWin };
    }
    const current = queue[cursor]!;
    cursor += 1;
    if (current.depth >= maxDepth) continue;

    for (const action of runtime.actions(current.state, { winCondition })) {
      const result = runtime.step(current.state, action, { winCondition });
      if (!result.legal) continue;
      reachableEvents.push(...result.events);
      const nextInputs = [...current.inputs, action];
      const nextEvents = [...current.events, ...result.events];
      if (!firstWin && runtime.isWin(result.state, winCondition)) {
        firstWin = { inputs: nextInputs, events: nextEvents, depth: current.depth + 1 };
      }
      const key = runtime.key(result.state);
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: result.state, inputs: nextInputs, events: nextEvents, depth: current.depth + 1 });
    }
  }
  return { status: "complete" as const, states: visited.size, reachableEvents, firstWin };
}

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

let checked = 0;
let basePass = 0;
let bothPass = 0;

for (let row9Mask = 0; row9Mask < 32; row9Mask += 1) {
  for (let bottomStart = 4; bottomStart <= 10; bottomStart += 1) {
    for (let bottomEnd = bottomStart; bottomEnd <= 11; bottomEnd += 1) {
      const layout = build(row9Mask, bottomStart, bottomEnd);
      const openGoals: Pt[] = [];
      for (let x = bottomStart; x <= bottomEnd; x += 1) openGoals.push([x, 10]);
      checked += 1;
      const base = scan(layout, [0, 5], [11, 10], 60000, 240);
      if (
        base.status !== "complete" ||
        !base.firstWin ||
        !covers(base.firstWin.events, baseRequired) ||
        hits(base.firstWin.events, forbiddenBase) ||
        hits(base.reachableEvents, forbiddenBase)
      ) {
        continue;
      }
      basePass += 1;
      for (const goal of openGoals) {
        const meta = scan(layout, [22, 4], goal, 90000, 320);
        const pushCount = meta.firstWin.events.filter((event) => event === "push_ice").length;
        if (
          meta.status === "complete" &&
          meta.firstWin &&
          covers(meta.firstWin.events, metaRequired) &&
          pushCount >= 4
        ) {
          bothPass += 1;
          console.log(
            `PASS row9Mask=${row9Mask.toString(2).padStart(5, "0")} bottom=${bottomStart}-${bottomEnd} D=${goal.join(",")} baseDepth=${base.firstWin.depth} metaDepth=${meta.firstWin.depth}`,
          );
          console.log(layout);
          console.log(`metaInputs=${meta.firstWin.inputs.join(" ")}`);
          console.log(`metaEvents=${meta.firstWin.events.join(" ")}`);
        }
      }
    }
  }
}

console.log(JSON.stringify({ checked, basePass, bothPass }, null, 2));

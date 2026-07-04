import { readFileSync } from "node:fs";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { renderState, type IceSlideState } from "../../../src/prototypes/ice_slide_escape/mechanics.js";

type Pt = [number, number];

const layoutPath = process.argv[2];
const startRaw = process.argv[3] ?? "0,6";
const goalRaw = process.argv[4] ?? "6,12";
const patternsRaw =
  process.argv[5] ?? "ice_pass_through_d5,slide_restart_after_group,ice_destroy_group_d6_plus";
const limit = Number(process.argv[6] ?? 12);

if (!layoutPath) {
  throw new Error("usage: tsx worker_round54_v5_repair_probe.ts <layout> [start] [goal] [patterns] [limit]");
}

function point(raw: string): Pt {
  const [x, y] = raw.split(",").map(Number);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    throw new Error(`bad point: ${raw}`);
  }
  return [x!, y!];
}

function level(layout: string, start: Pt, goal: Pt): LevelDoc {
  return {
    id: "worker_round54_v5_repair_probe",
    title: "worker_round54_v5_repair_probe",
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

const layout = readFileSync(layoutPath, "utf8").replace(/\r/g, "").replace(/\n+$/g, "");
const start = point(startRaw);
const goal = point(goalRaw);
const patterns = patternsRaw.split(",").map((item) => item.trim()).filter(Boolean);

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level(layout, start, goal)) as IceSlideState;
const winCondition = level(layout, start, goal).win;

type Item = {
  state: IceSlideState;
  depth: number;
  inputs: string[];
};

const queue: Item[] = [{ state: initial, depth: 0, inputs: [] }];
const visited = new Set<string>([runtime.key(initial)]);
const hits: Array<{
  depth: number;
  action: string;
  inputs: string[];
  events: string[];
  before: string;
  after: string;
}> = [];
let cursor = 0;

while (cursor < queue.length && hits.length < limit) {
  const current = queue[cursor++]!;
  if (current.depth >= 160) {
    continue;
  }

  for (const action of runtime.actions(current.state, { winCondition, maxStates: 200000, maxDepth: 160 })) {
    const result = runtime.step(current.state, action, { winCondition, maxStates: 200000, maxDepth: 160 });
    const matched = result.events.some((event) => patterns.some((pattern) => eventMatchesPattern(event, pattern)));
    if (matched) {
      hits.push({
        depth: current.depth + 1,
        action,
        inputs: [...current.inputs, action],
        events: result.events,
        before: renderState(current.state),
        after: result.legal ? renderState(result.state as IceSlideState) : renderState(current.state),
      });
      if (hits.length >= limit) {
        break;
      }
    }
    if (!result.legal) {
      continue;
    }
    const nextKey = runtime.key(result.state);
    if (visited.has(nextKey)) {
      continue;
    }
    visited.add(nextKey);
    queue.push({
      state: result.state as IceSlideState,
      depth: current.depth + 1,
      inputs: [...current.inputs, action],
    });
  }
}

console.log(
  JSON.stringify(
    {
      layoutPath,
      start,
      goal,
      patterns,
      reachableStatesSeen: visited.size,
      hits: hits.map((hit) => ({
        depth: hit.depth,
        action: hit.action,
        inputs: hit.inputs.join(" "),
        events: hit.events,
        before: hit.before,
        after: hit.after,
      })),
    },
    null,
    2,
  ),
);

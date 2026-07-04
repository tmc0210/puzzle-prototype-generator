import { loadPrototypePackage } from "../../../src/core/io.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type PointTuple = [number, number];
type Action = "up" | "down" | "left" | "right";

const layout = [
  "#######.########",
  "#######I########",
  "#######.########",
  "#######.########",
  "#######.########",
  "#######.########",
  "#######.########",
  "#######.########",
  "################",
  "####.....#######",
  "..#.*....*....##",
  "....##.##.......",
  "######.#########",
].join("\n");

const forbidden = [
  "ice_pass_through_d5",
  "slide_restart_after_group",
  "ice_destroy_group_d6_plus",
];

async function main(): Promise<void> {
  const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  const initial = adapter.parseLevel(levelFor([0, 10], [6, 12]));
  const queue: Array<{ state: unknown; inputs: Action[]; events: string[]; depth: number }> = [
    { state: initial, inputs: [], events: [], depth: 0 },
  ];
  const visited = new Set<string>([runtime.key(initial)]);
  let cursor = 0;
  while (cursor < queue.length) {
    const current = queue[cursor]!;
    cursor += 1;
    if (current.depth >= 80) {
      continue;
    }
    for (const action of runtime.actions(current.state as never, { winCondition: win([0, 10], [6, 12]) }) as Action[]) {
      const result = runtime.step(current.state as never, action, {
        winCondition: win([0, 10], [6, 12]),
      });
      const nextEvents = [...current.events, ...result.events];
      if (result.events.some((event) => forbidden.some((pattern) => eventMatchesPattern(event, pattern)))) {
        console.log(
          JSON.stringify(
            {
              inputs: [...current.inputs, action],
              stepEvents: result.events,
              allEvents: nextEvents,
              before: adapter.renderState(current.state),
              after: result.legal ? adapter.renderState(result.state) : adapter.renderState(current.state),
              legal: result.legal,
              reason: result.reason,
            },
            null,
            2,
          ),
        );
        return;
      }
      if (!result.legal) {
        continue;
      }
      const key = runtime.key(result.state);
      if (visited.has(key)) {
        continue;
      }
      visited.add(key);
      queue.push({
        state: result.state,
        inputs: [...current.inputs, action],
        events: nextEvents,
        depth: current.depth + 1,
      });
    }
  }
  console.log("no forbidden trace");
}

function levelFor(start: PointTuple, goal: PointTuple): LevelDoc {
  return {
    id: "worker_round54_lshape_late_trace",
    title: "worker_round54_lshape_late_trace",
    role: "challenge",
    status: "candidate",
    targets: [],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
    win: win(start, goal),
  };
}

function win(start: PointTuple, goal: PointTuple): WinCondition {
  return {
    type: "ice_slide_escape_explicit_goal",
    player_start: start,
    player_goal: goal,
  };
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exitCode = 1;
});

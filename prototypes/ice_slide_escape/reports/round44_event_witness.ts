import { readFileSync } from "node:fs";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc, WinCondition } from "../../../src/core/types.js";

type Pt = [number, number];

const [, , layoutPath, startRaw, goalRaw, eventPattern, maxStatesRaw, maxDepthRaw] = process.argv;
if (!layoutPath || !startRaw || !goalRaw || !eventPattern) {
  throw new Error(
    "usage: round44_event_witness.ts <layout> <sx,sy> <gx,gy> <event-pattern> [maxStates] [maxDepth]",
  );
}

function point(raw: string): Pt {
  const [xRaw, yRaw] = raw.split(",");
  const x = Number(xRaw);
  const y = Number(yRaw);
  if (!Number.isInteger(x) || !Number.isInteger(y)) throw new Error(`bad point: ${raw}`);
  return [x, y];
}

const maxStates = Number(maxStatesRaw ?? 200000);
const maxDepth = Number(maxDepthRaw ?? 180);
const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = readFileSync(layoutPath, "utf8").replace(/\r/g, "").replace(/\n+$/g, "");
const start = point(startRaw);
const goal = point(goalRaw);

const level: LevelDoc = {
  id: "round44_event_witness",
  title: "round44_event_witness",
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

const initial = adapter.parseLevel(level);
const queue: Array<{ state: unknown; inputs: string[]; depth: number }> = [
  { state: initial, inputs: [], depth: 0 },
];
const visited = new Set<string>([runtime.key(initial)]);
let cursor = 0;

while (cursor < queue.length) {
  if (visited.size > maxStates) {
    console.log(JSON.stringify({ found: false, reason: "state budget exceeded", visited: visited.size }, null, 2));
    process.exit(0);
  }
  const current = queue[cursor]!;
  cursor += 1;
  if (current.depth >= maxDepth) continue;
  for (const action of runtime.actions(current.state, { winCondition: level.win })) {
    const before = adapter.renderState(current.state);
    const result = runtime.step(current.state, action, { winCondition: level.win });
    if (!result.legal) continue;
    const nextInputs = [...current.inputs, action];
    if (result.events.some((event: string) => eventMatchesPattern(event, eventPattern))) {
      console.log(
        JSON.stringify(
          {
            found: true,
            eventPattern,
            action,
            inputs: nextInputs,
            events: result.events,
            before,
            after: adapter.renderState(result.state),
            visited: visited.size,
            depth: current.depth + 1,
          },
          null,
          2,
        ),
      );
      process.exit(0);
    }
    const key = runtime.key(result.state);
    if (visited.has(key)) continue;
    visited.add(key);
    queue.push({ state: result.state, inputs: nextInputs, depth: current.depth + 1 });
  }
}

console.log(JSON.stringify({ found: false, reason: "complete", visited: visited.size }, null, 2));

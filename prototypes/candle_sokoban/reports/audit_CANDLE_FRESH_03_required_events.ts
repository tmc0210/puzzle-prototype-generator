import { loadPrototypePackage } from "../../../src/core/io.js";
import { findUncoveredGoalPathWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const root = "prototypes/candle_sokoban";
const levelId = "CANDLE_FRESH_03_RECEDING_FLAME_RELAY";
const pkg = await loadPrototypePackage(root);
const level = pkg.levels.levels.find((item) => item.id === levelId);
if (!level) throw new Error(`missing level ${levelId}`);

const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const requiredEvents = [
  "shrink_ignite:candle#2",
  "shrink_ignite:candle#3",
  "shrink_ignite:candle#4",
  "light_brazier:8,5",
  "light_brazier:1,4",
  "light_brazier:1,7",
];
const result = findUncoveredGoalPathWithRuntime(
  runtime,
  initial,
  requiredEvents,
  [],
  { winCondition: pkg.mechanic.win, maxStates: 100_000 },
);

console.log(JSON.stringify({
  level_id: levelId,
  audit: "find winning path missing any required event",
  required_events: requiredEvents,
  bypass_found: result.found,
  search_status: result.searchStatus,
  explored_states: result.exploredStates,
  reason: result.reason,
  bypass_inputs: result.found ? result.inputs : [],
  interpretation: result.found
    ? "A winning path omitted at least one required event."
    : result.searchStatus === "complete"
      ? "Every winning path contains every required event."
      : "Search budget was insufficient for an all-solution claim.",
}, null, 2));

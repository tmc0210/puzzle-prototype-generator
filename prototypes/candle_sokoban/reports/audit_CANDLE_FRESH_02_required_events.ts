import { loadPrototypePackage } from "../../../src/core/io.js";
import { findUncoveredGoalPathWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const root = "prototypes/candle_sokoban";
const levelId = "CANDLE_FRESH_02_DIAGONAL_BURN_LOCK";
const pkg = await loadPrototypePackage(root);
const level = pkg.levels.levels.find((item) => item.id === levelId);
if (!level) throw new Error(`missing level ${levelId}`);

const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const requiredEvents = [
  "burn_out:candle#single4",
  "burn_out:candle#2",
  "burn_out:candle#3",
  "burn_out:candle#4",
  "light_brazier:6,9",
  "light_brazier:5,8",
  "light_brazier:4,7",
  "light_brazier:3,6",
];
const result = findUncoveredGoalPathWithRuntime(
  runtime,
  initial,
  requiredEvents,
  [],
  { winCondition: pkg.mechanic.win, maxStates: 500_000 },
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

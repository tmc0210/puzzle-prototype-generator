import { writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { findUncoveredGoalPathWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const root = "prototypes/candle_sokoban";
const levelId = "CANDLE_FRESH_05_PHASE_SPLIT_WEAVE";
const pkg = await loadPrototypePackage(root);
const level = pkg.levels.levels.find((item) => item.id === levelId);
if (!level) throw new Error(`missing level ${levelId}`);

const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const requiredEvents = [
  "light_brazier:10,3",
  "extinguish:candle#1:concealed",
  "shrink:candle#2:len2",
  "shrink:candle#4:len1",
  "shrink_ignite:candle#1",
  "push_axis:candle#4",
  "shrink:candle#1:len3",
  "shrink:candle#2:len1",
  "burn_out:candle#4",
  "light_brazier:8,5",
  "ignite:candle#3",
  "burn_out:candle#2",
  "shrink:candle#3:len2",
  "shrink:candle#3:len1",
  "light_brazier:9,8",
];
const result = findUncoveredGoalPathWithRuntime(
  runtime,
  initial,
  requiredEvents,
  [],
  { winCondition: pkg.mechanic.win, maxStates: 50_000 },
);

const report = {
  level_id: levelId,
  audit: "find winning path missing any required event",
  required_events: requiredEvents,
  bypass_found: result.found,
  search_status: result.searchStatus,
  explored_states: result.exploredStates,
  reason: result.reason,
  bypass_inputs: result.found ? result.inputs : [],
  bypass_events: result.found ? result.events : [],
  interpretation: result.found
    ? "A winning path omitted at least one required event."
    : result.searchStatus === "complete"
      ? "Every winning path contains every required event."
      : "Search budget was insufficient for an all-solution claim.",
};
const json = `${JSON.stringify(report, null, 2)}\n`;
await writeFile(
  `${root}/reports/CANDLE_FRESH_05_REQUIRED_EVENTS_AUDIT.json`,
  json,
  "utf8",
);
console.log(json);

import { loadPrototypePackage } from "../../../src/core/io.js";
import { findUncoveredGoalPathWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { writeFile } from "node:fs/promises";

const root = "prototypes/candle_sokoban";
const levelId = "CANDLE_FRESH_04_SMOTHERED_REVERSE_RELAY";
const pkg = await loadPrototypePackage(root);
const level = pkg.levels.levels.find((item) => item.id === levelId);
if (!level) throw new Error(`missing level ${levelId}`);

const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const requiredEvents = [
  "extinguish:candle#1:concealed",
  "burn_out:candle#single1",
  "burn_out:candle#single4",
  "ignite:candle#1",
  "ignite:candle#2",
  "shrink:candle#2:len3",
  "shrink:candle#2:len2",
  "light_brazier:12,5",
  "light_brazier:13,2",
  "light_brazier:14,4",
];
const result = findUncoveredGoalPathWithRuntime(
  runtime,
  initial,
  requiredEvents,
  [],
  { winCondition: pkg.mechanic.win, maxStates: 300_000 },
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
  `${root}/reports/CANDLE_FRESH_04_REQUIRED_EVENTS_AUDIT.json`,
  json,
  "utf8",
);
console.log(json);

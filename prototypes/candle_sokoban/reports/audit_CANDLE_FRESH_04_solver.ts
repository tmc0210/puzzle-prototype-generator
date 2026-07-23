import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const root = "prototypes/candle_sokoban";
const levelId = "CANDLE_FRESH_04_SMOTHERED_REVERSE_RELAY";
const pkg = await loadPrototypePackage(root);
const level = pkg.levels.levels.find((item) => item.id === levelId);
if (!level) throw new Error(`missing level ${levelId}`);

const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const solution = solveWithRuntime(runtime, initial, {
  winCondition: level.win ?? pkg.mechanic.win,
  maxStates: 100_000,
  maxDepth: 200,
});

console.log(JSON.stringify({
  level_id: levelId,
  found: solution.found,
  search_status: solution.searchStatus,
  explored_states: solution.exploredStates,
  reason: solution.reason,
  cost: solution.cost,
  depth: solution.depth,
  inputs: solution.inputs,
  events: solution.events,
  steps: solution.steps,
}, null, 2));

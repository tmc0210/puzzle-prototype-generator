import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { findUncoveredGoalPathWithRuntime } from "../../../../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";

const layoutPath = process.argv[2];
if (!layoutPath) {
  throw new Error("usage: npx tsx coverage_probe.ts <layout> <required-event>...");
}
const requiredEvents = process.argv.slice(3);
const prototypeRoot = path.resolve("prototypes", "candle_sokoban");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = {
  id: "CANDLE_CURRICULUM_L13_COVERAGE_PROBE",
  title: "CANDLE_CURRICULUM_L13_COVERAGE_PROBE",
  global_burn_cycle: 5,
  layout: (await readFile(path.resolve(layoutPath), "utf8")).replace(/\r/g, "").trimEnd(),
};
const initial = adapter.parseLevel(level);
const result = findUncoveredGoalPathWithRuntime(
  runtime,
  initial,
  requiredEvents,
  [],
  { winCondition: level.win ?? pkg.mechanic.win, maxStates: 500_000 },
);
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);

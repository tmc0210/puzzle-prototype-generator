import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../src/workflows/inputSequenceReplay.js";

const exactRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/CANDLE_CURRICULUM_L13_001_exact_001",
);
const levelSpec = YAML.parse(
  await readFile(path.join(exactRoot, "level.yml"), "utf8"),
) as LevelDoc & { exact_version: string };
const solveSpec = YAML.parse(
  await readFile(path.join(exactRoot, "solve_instance.yml"), "utf8"),
) as { canonical_inputs: string[]; solver_result: { shortest_cost: number } };
const layout = await readFile(path.join(exactRoot, "layout.txt"), "utf8");
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = levelSpec.win ?? pkg.mechanic.win;
const level: LevelDoc = {
  id: levelSpec.id,
  title: levelSpec.title,
  global_burn_cycle: levelSpec.global_burn_cycle,
  win: winCondition,
  layout,
};
const execution = replayInputSequence(
  adapter,
  runtime,
  adapter.parseLevel(level),
  solveSpec.canonical_inputs,
  { winCondition },
  winCondition,
);
const report = buildInputSequenceReplayReport(
  {
    id: `${levelSpec.exact_version}_canonical`,
    prototype: "candle_sokoban",
    layoutSource:
      "prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/CANDLE_CURRICULUM_L13_001_exact_001/layout.txt",
    layout,
    winCondition,
  },
  execution,
);
const requiredEvents = [
  "roll_candle:candle#single2:d2",
  "extinguish_by_candle_body:candle#single2",
  "shrink:candle#1:len1",
  "shrink_ignite:candle#single3",
  "push_axis:candle#single3",
  "light_brazier:6,1",
  "win_all_braziers_lit",
];
const allEvents = report.steps.flatMap((step) => step.events);
if (
  report.replay.completed !== true ||
  report.replay.executedSteps !== solveSpec.canonical_inputs.length ||
  report.replay.executedSteps !== solveSpec.solver_result.shortest_cost ||
  report.steps.some((step) => step.legal !== true) ||
  report.final.isWin !== true ||
  requiredEvents.some((event) => !allEvents.includes(event))
) {
  throw new Error("exact_001 canonical replay 未完整合法通关或缺少身份事件");
}
await writeFile(
  path.join(exactRoot, "evidence/canonical_replay.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
await writeFile(
  path.join(exactRoot, "evidence/canonical_replay.md"),
  formatInputSequenceReplayMarkdown(report),
  "utf8",
);
process.stdout.write(
  `${JSON.stringify(
    {
      exact_version: levelSpec.exact_version,
      completed: report.replay.completed,
      executed_steps: report.replay.executedSteps,
      legal_through: report.replay.legalThroughStep,
      final_is_win: report.final.isWin,
      required_events_present: true,
      final_key: report.final.key,
    },
    null,
    2,
  )}\n`,
);

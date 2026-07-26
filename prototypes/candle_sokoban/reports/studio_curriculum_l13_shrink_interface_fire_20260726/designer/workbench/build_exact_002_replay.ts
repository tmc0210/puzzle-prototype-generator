import crypto from "node:crypto";
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

const candidateId = "CANDLE_CURRICULUM_L13_001";
const exactVersion = "CANDLE_CURRICULUM_L13_001_exact_002";
const exactRoot = path.resolve(
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}`,
);
const solveInstanceRef =
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/solve_instance.yml`;
const levelSpec = YAML.parse(
  await readFile(path.join(exactRoot, "level.yml"), "utf8"),
) as LevelDoc & { exact_version: string; metadata: { candidate_id: string } };
const solveSpec = YAML.parse(
  await readFile(path.join(exactRoot, "solve_instance.yml"), "utf8"),
) as { canonical_inputs: string[]; solver_result: { shortest_cost: number } };
const layout = await readFile(path.join(exactRoot, "layout.txt"), "utf8");
const layoutSha256 = crypto.createHash("sha256").update(layout).digest("hex");
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
const runtimeReport = buildInputSequenceReplayReport(
  {
    id: `${exactVersion}_canonical`,
    prototype: "candle_sokoban",
    layoutSource:
      `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/layout.txt`,
    layout,
    winCondition,
  },
  execution,
);
const report = {
  schema_version: "candle_exact_canonical_replay.v2",
  candidate_id: candidateId,
  exact_version: exactVersion,
  layout_sha256: layoutSha256,
  solve_instance_ref: solveInstanceRef,
  provenance: {
    candidate_id: candidateId,
    exact_version: exactVersion,
    layout_sha256: layoutSha256,
    solve_instance_ref: solveInstanceRef,
  },
  ...runtimeReport,
};
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
  levelSpec.exact_version !== exactVersion ||
  levelSpec.metadata.candidate_id !== candidateId ||
  report.replay.completed !== true ||
  report.replay.executedSteps !== solveSpec.canonical_inputs.length ||
  report.replay.executedSteps !== solveSpec.solver_result.shortest_cost ||
  report.steps.some((step) => step.legal !== true) ||
  report.final.isWin !== true ||
  requiredEvents.some((event) => !allEvents.includes(event))
) {
  throw new Error("exact_002 canonical replay 未完整合法通关或 provenance/身份事件不一致");
}
await writeFile(
  path.join(exactRoot, "evidence/canonical_replay.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
await writeFile(
  path.join(exactRoot, "evidence/canonical_replay.md"),
  [
    `candidate_id: ${candidateId}`,
    `exact_version: ${exactVersion}`,
    `layout_sha256: ${layoutSha256}`,
    `solve_instance_ref: ${solveInstanceRef}`,
    "",
    formatInputSequenceReplayMarkdown(runtimeReport),
  ].join("\n"),
  "utf8",
);
process.stdout.write(
  `${JSON.stringify(
    {
      candidate_id: candidateId,
      exact_version: exactVersion,
      layout_sha256: layoutSha256,
      solve_instance_ref: solveInstanceRef,
      completed: report.replay.completed,
      executed_steps: report.replay.executedSteps,
      final_is_win: report.final.isWin,
      required_events_present: true,
    },
    null,
    2,
  )}\n`,
);

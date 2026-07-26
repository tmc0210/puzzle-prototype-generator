import crypto from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
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
const sourceExactLayoutSha256 =
  "9cbc87a1177c5168f65d42fe5a0a6cb23efad0c2b7993b747c517f3b271e15eb";
const solveInstanceRef =
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/solve_instance.yml`;
const evidenceRoot = path.resolve(
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/evidence/counterfactuals/receiver_one_cell_gap`,
);
const layoutPath = path.join(evidenceRoot, "layout.txt");
const layout = await readFile(layoutPath, "utf8");
const counterfactualLayoutSha256 = crypto
  .createHash("sha256")
  .update(layout)
  .digest("hex");
const inputs = ["up", "up", "down", "down", "right", "up"];
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;
const level: LevelDoc = {
  id: `${exactVersion}_CF_RECEIVER_ONE_CELL_GAP`,
  title: "receiver_one_cell_gap",
  global_burn_cycle: 5,
  win: winCondition,
  layout,
};
const execution = replayInputSequence(
  adapter,
  runtime,
  adapter.parseLevel(level),
  inputs,
  { winCondition },
  winCondition,
);
const runtimeReport = buildInputSequenceReplayReport(
  {
    id: `${exactVersion}_receiver_one_cell_gap`,
    prototype: "candle_sokoban",
    layoutSource:
      `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/evidence/counterfactuals/receiver_one_cell_gap/layout.txt`,
    layout,
    winCondition,
  },
  execution,
);
const report = {
  schema_version: "candle_exact_counterfactual_replay.v1",
  candidate_id: candidateId,
  exact_version: exactVersion,
  source_exact_layout_sha256: sourceExactLayoutSha256,
  solve_instance_ref: solveInstanceRef,
  counterfactual_id: "receiver_one_cell_gap",
  counterfactual_layout_sha256: counterfactualLayoutSha256,
  provenance: {
    candidate_id: candidateId,
    exact_version: exactVersion,
    source_exact_layout_sha256: sourceExactLayoutSha256,
    solve_instance_ref: solveInstanceRef,
    counterfactual_id: "receiver_one_cell_gap",
    counterfactual_layout_sha256: counterfactualLayoutSha256,
  },
  expected_identity_difference:
    "目标边界只开门；B 在下一次轴推后才以普通 ignite_from_wick 接火，不发生同格 shrink_ignite。",
  ...runtimeReport,
};
const step5 = report.steps[4];
const step6 = report.steps[5];
if (
  report.replay.completed !== true ||
  report.replay.executedSteps !== 6 ||
  report.steps.some((step) => step.legal !== true) ||
  step5?.events.includes("shrink:candle#1:len2") !== true ||
  step5?.events.some((event) => event.startsWith("shrink_ignite:")) !== false ||
  step6?.events.includes("push_axis:candle#2") !== true ||
  step6?.events.includes("ignite_from_wick:candle#2:4,2") !== true ||
  report.final.isWin !== false
) {
  throw new Error("receiver_one_cell_gap raw replay 未复现预期身份差异");
}
await writeFile(path.join(evidenceRoot, "replay.json"), `${JSON.stringify(report, null, 2)}\n`);
await writeFile(
  path.join(evidenceRoot, "replay.md"),
  [
    `candidate_id: ${candidateId}`,
    `exact_version: ${exactVersion}`,
    `source_exact_layout_sha256: ${sourceExactLayoutSha256}`,
    `solve_instance_ref: ${solveInstanceRef}`,
    `counterfactual_layout_sha256: ${counterfactualLayoutSha256}`,
    "",
    formatInputSequenceReplayMarkdown(runtimeReport),
  ].join("\n"),
);
process.stdout.write(
  `${JSON.stringify(
    {
      candidate_id: candidateId,
      exact_version: exactVersion,
      source_exact_layout_sha256: sourceExactLayoutSha256,
      solve_instance_ref: solveInstanceRef,
      counterfactual_id: "receiver_one_cell_gap",
      counterfactual_layout_sha256: counterfactualLayoutSha256,
      completed: report.replay.completed,
      step5_events: step5.events,
      step6_events: step6.events,
      final_is_win: report.final.isWin,
    },
    null,
    2,
  )}\n`,
);

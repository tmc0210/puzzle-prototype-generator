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
const exactVersion = "CANDLE_CURRICULUM_L13_001_exact_003";
const sourceExactLayoutSha256 =
  "9cbc87a1177c5168f65d42fe5a0a6cb23efad0c2b7993b747c517f3b271e15eb";
const solveInstanceRef =
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/solve_instance.yml`;
const counterfactualId = "receiver_b_shift_down_one_cell";
const evidenceRoot = path.resolve(
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/evidence/counterfactuals/cf_receiver_b_shift_down`,
);
const layoutPath = path.join(evidenceRoot, "layout.txt");
const layout = await readFile(layoutPath, "utf8");
const counterfactualLayoutSha256 = crypto
  .createHash("sha256")
  .update(layout)
  .digest("hex");
const inputs = ["right", "down", "right", "right", "up"];
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;
const level: LevelDoc = {
  id: `${exactVersion}_CF_RECEIVER_B_SHIFT_DOWN_ONE_CELL`,
  title: counterfactualId,
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
    id: `${exactVersion}_${counterfactualId}`,
    prototype: "candle_sokoban",
    layoutSource:
      `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/evidence/counterfactuals/cf_receiver_b_shift_down/layout.txt`,
    layout,
    winCondition,
  },
  execution,
);
const report = {
  schema_version: "candle_exact_counterfactual_replay.v2",
  candidate_id: candidateId,
  exact_version: exactVersion,
  source_exact_layout_sha256: sourceExactLayoutSha256,
  solve_instance_ref: solveInstanceRef,
  counterfactual_id: counterfactualId,
  counterfactual_layout_sha256: counterfactualLayoutSha256,
  intervention: {
    changed_variable: "candle#single3.body_position",
    source_position: [6, 3],
    counterfactual_position: [6, 4],
    displacement: [0, 1],
    manhattan_distance: 1,
    invariants:
      "10x6 画布、全部墙、玩家、火盆、A、C、全部方向/长度/燃烧态不变。",
  },
  provenance: {
    candidate_id: candidateId,
    exact_version: exactVersion,
    source_exact_layout_sha256: sourceExactLayoutSha256,
    solve_instance_ref: solveInstanceRef,
    counterfactual_id: counterfactualId,
    counterfactual_layout_sha256: counterfactualLayoutSha256,
  },
  replay_purpose:
    "沿当前 exact 的准备方向到首个燃烧边界，直接观察 B 下移一格后的实际目标与接口差异。",
  ...runtimeReport,
};
const boundaryStep = report.steps[4];
if (
  report.replay.completed !== true ||
  report.replay.executedSteps !== inputs.length ||
  report.steps.some((step) => step.legal !== true) ||
  boundaryStep?.events.includes("shrink:candle#1:len1") !== true ||
  boundaryStep?.events.includes("shrink_ignite:candle#single3") === true ||
  boundaryStep?.events.includes("shrink_ignite:candle#single2") !== true ||
  report.final.isWin !== false
) {
  throw new Error("strict B shift raw replay 未复现预期单变量差异");
}
await writeFile(
  path.join(evidenceRoot, "replay.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
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
      counterfactual_id: counterfactualId,
      counterfactual_layout_sha256: counterfactualLayoutSha256,
      completed: report.replay.completed,
      boundary_events: boundaryStep.events,
      final_is_win: report.final.isWin,
    },
    null,
    2,
  )}\n`,
);

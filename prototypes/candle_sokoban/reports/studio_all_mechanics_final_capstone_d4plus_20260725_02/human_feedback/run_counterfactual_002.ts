import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { loadPrototypePackage } from "../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.js";
import { replayInputSequence } from "../../../../../src/workflows/inputSequenceReplay.js";

const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02",
);
const baselineReplay = JSON.parse(await readFile(
  path.join(taskRoot, "candidate/versions/v004/canonical_replay.json"),
  "utf8",
)) as {
  inputs: string[];
  steps: Array<{ step: number; action: string; events: string[]; after: { isWin: boolean } }>;
};
const layout = await readFile(
  path.join(taskRoot, "human_feedback/counterfactual_002_right_of_gate_removed.txt"),
  "utf8",
);
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;
const level: LevelDoc = {
  id: "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v004_right_of_gate_removed",
  title: "right of gate removed counterfactual",
  global_burn_cycle: 5,
  win: winCondition,
  layout,
};
const prefixInputs = baselineReplay.inputs.slice(0, 20);
const execution = replayInputSequence(
  adapter,
  runtime,
  adapter.parseLevel(level),
  prefixInputs,
  { winCondition },
  winCondition,
);
const baselinePrefix = baselineReplay.steps.slice(0, 19);
const counterfactualPrefix = execution.steps.slice(0, 19);
const prefixEventsEqual = baselinePrefix.length === counterfactualPrefix.length
  && baselinePrefix.every((step, index) =>
    step.action === counterfactualPrefix[index]?.action
    && JSON.stringify(step.events) === JSON.stringify(counterfactualPrefix[index]?.events)
  );
const result = {
  schema_version: 1,
  candidate_id: "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002",
  baseline_exact_version: "v004",
  mutation: "保留中央 gate 火盆 (4,6)，删除其右侧全部区域、最终火盆与 candle#3，并在 x=5 封闭外墙",
  baseline_layout_ref: "candidate/versions/v004/layout.txt",
  counterfactual_layout_ref: "human_feedback/counterfactual_002_right_of_gate_removed.txt",
  replay: {
    requested_inputs: prefixInputs,
    legal_through: execution.legalThroughStep,
    completed: execution.completed,
    final_is_win: execution.final.isWin,
    first_win_step: execution.steps.find((step) => step.after.isWin)?.step ?? null,
    first_19_actions_and_events_equal_to_baseline: prefixEventsEqual,
    step_20_baseline_events: baselineReplay.steps[19]?.events ?? [],
    step_20_counterfactual_events: execution.steps[19]?.events ?? [],
  },
  structural_read: "若前 19 步完全不变、同一个第 20 步 right 在删翼版本中直接点亮 gate 并胜利，则右侧 consumer 翼没有改变此前 writer/receiver 的构造选择；它只在核心完成后延长同一解，属于可拆卸后继。",
};
await writeFile(
  path.join(taskRoot, "human_feedback/counterfactual_002_replay.json"),
  `${JSON.stringify(result, null, 2)}\n`,
  "utf8",
);
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);

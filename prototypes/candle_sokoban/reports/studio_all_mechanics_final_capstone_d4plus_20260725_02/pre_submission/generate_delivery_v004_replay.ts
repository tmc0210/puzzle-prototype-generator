import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { loadPrototypePackage } from "../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../src/workflows/inputSequenceReplay.js";

const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02",
);
const exactRoot = path.join(taskRoot, "candidate/versions/v004");
const levelSpec = YAML.parse(await readFile(path.join(exactRoot, "level.yml"), "utf8")) as {
  id: string;
  title: string;
  global_burn_cycle: number;
  win: LevelDoc["win"];
};
const solveSpec = YAML.parse(await readFile(path.join(exactRoot, "solve_instance.yml"), "utf8")) as {
  canonical_solution: { inputs: string[]; cost: number; depth: number };
};
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
  solveSpec.canonical_solution.inputs,
  { winCondition },
  winCondition,
);
const report = buildInputSequenceReplayReport(
  {
    id: `${levelSpec.id}_canonical`,
    prototype: "candle_sokoban",
    layoutSource: "candidate/versions/v004/layout.txt",
    layout,
    winCondition,
  },
  execution,
);
if (
  report.replay.completed !== true
  || report.replay.executedSteps !== solveSpec.canonical_solution.inputs.length
  || report.steps.some((step) => step.legal !== true)
  || report.final.isWin !== true
  || report.steps.at(-1)?.events.includes("win_all_braziers_lit") !== true
) {
  throw new Error("v004 canonical runtime replay 未完整合法通关");
}
await writeFile(path.join(exactRoot, "canonical_replay.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(path.join(exactRoot, "canonical_replay.md"), formatInputSequenceReplayMarkdown(report), "utf8");
process.stdout.write(`${JSON.stringify({
  completed: report.replay.completed,
  steps: report.steps.length,
  legal_through: report.replay.legalThroughStep,
  final_is_win: report.final.isWin,
  final_key: report.final.key,
}, null, 2)}\n`);

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../src/workflows/inputSequenceReplay.js";

const layoutPath = path.resolve(requireArg(2, "layout path"));
const outputDir = path.resolve(requireArg(3, "output directory"));
const id = process.argv[4] ?? "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_001_v1";
const inputs = [
  "right", "up", "right", "right", "down",
  "up", "left", "left", "down", "right",
  "up", "down", "up", "right", "right",
  "down", "right", "down", "right", "down",
  "left", "left", "left",
];

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level: LevelDoc = {
  id,
  title: id,
  global_burn_cycle: 5,
  layout,
};
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const winCondition = level.win ?? pkg.mechanic.win;
const execution = replayInputSequence(
  adapter,
  runtime,
  initial,
  inputs,
  { winCondition },
  winCondition,
);
if (execution.stoppedAtIllegalAction || execution.legalThroughStep !== inputs.length) {
  throw new Error(`规范回放未完整合法：legalThrough=${execution.legalThroughStep}`);
}
if (!runtime.isWin(execution.finalState, winCondition)) {
  throw new Error("规范回放结束后未满足 all_braziers_lit。");
}
const report = buildInputSequenceReplayReport(
  {
    id,
    prototype: pkg.mechanic.id,
    layoutSource: layoutPath,
    layout,
    winCondition,
  },
  execution,
);
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, "canonical_replay.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(path.join(outputDir, "canonical_replay.md"), formatInputSequenceReplayMarkdown(report), "utf8");
process.stdout.write(
  `canonical_replay id=${id} steps=${inputs.length} legal=${execution.legalThroughStep} win=${report.final.isWin} out=${outputDir}\n`,
);

function requireArg(index: number, label: string): string {
  const value = process.argv[index];
  if (!value) throw new Error(`缺少 ${label}`);
  return value;
}

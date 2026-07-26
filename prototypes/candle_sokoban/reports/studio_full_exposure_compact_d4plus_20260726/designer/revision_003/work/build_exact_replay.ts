import fs from "node:fs";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  replayInputSequence,
} from "../../../../../../../src/workflows/inputSequenceReplay.js";
import type { LevelDoc } from "../../../../../../../src/core/types.js";

const [prototypePath, layoutPath, exactVersion, inputCsv, outputPath] = process.argv.slice(2);
if (!prototypePath || !layoutPath || !exactVersion || !inputCsv || !outputPath) {
  throw new Error(
    "usage: tsx build_exact_replay.ts <prototype> <layout> <exact> <comma-inputs> <out>",
  );
}

const pkg = await loadPrototypePackage(path.resolve(prototypePath));
const layout = fs.readFileSync(layoutPath, "utf8").trimEnd();
const winCondition = pkg.mechanic.win;
const level: LevelDoc = {
  id: exactVersion,
  title: exactVersion,
  layout,
  win: winCondition,
};
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const inputs = inputCsv.split(",").filter(Boolean);
const execution = replayInputSequence(
  adapter,
  runtime,
  initial,
  inputs,
  { winCondition },
  winCondition,
);
if (execution.stoppedAtIllegalAction || !execution.final.isWin) {
  throw new Error(
    `replay did not produce a legal win: stopped=${execution.stoppedReason ?? "none"} finalWin=${execution.final.isWin}`,
  );
}
const report = buildInputSequenceReplayReport(
  {
    id: exactVersion,
    prototype: pkg.mechanic.id,
    layoutSource: layoutPath.replaceAll("\\", "/"),
    layout,
    winCondition,
  },
  execution,
);
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify({
    id: exactVersion,
    steps: report.replay.executedSteps,
    legalThrough: report.replay.legalThroughStep,
    finalWin: report.final.isWin,
    finalKey: report.final.key,
  }),
);

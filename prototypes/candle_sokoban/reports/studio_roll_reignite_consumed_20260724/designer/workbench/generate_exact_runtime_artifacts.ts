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
import {
  analyzeLevel,
  formatLevelAnalysisMarkdown,
} from "../../../../../../src/workflows/levelAnalyzer.js";

const exactRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_roll_reignite_consumed_20260724/candidate/versions/v1",
);
const layoutPath = path.join(exactRoot, "layout.txt");
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const inputs = [
  "left", "up", "left", "down", "down", "down", "down", "down",
  "left", "left", "left", "down", "down", "down", "right", "right", "up",
];
const level: LevelDoc = {
  id: "CANDLE_ROLL_REIGNITE_CONSUMED_001_V1",
  title: "回焰门",
  global_burn_cycle: 5,
  layout,
  win: { type: "all_braziers_lit" },
};

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const execution = replayInputSequence(
  adapter,
  runtime,
  initial,
  inputs,
  { winCondition: level.win },
  level.win,
);
const replay = buildInputSequenceReplayReport(
  {
    id: level.id,
    prototype: pkg.mechanic.id,
    layoutSource: layoutPath,
    layout,
    winCondition: level.win,
  },
  execution,
);
const analysis = analyzeLevel(pkg, level, {
  maxStates: 500000,
  graphMaxStates: 500000,
  counterfactualMaxStates: 500000,
});

await mkdir(exactRoot, { recursive: true });
await Promise.all([
  writeFile(path.join(exactRoot, "canonical_replay.json"), `${JSON.stringify(replay, null, 2)}\n`, "utf8"),
  writeFile(path.join(exactRoot, "canonical_replay.md"), formatInputSequenceReplayMarkdown(replay), "utf8"),
  writeFile(path.join(exactRoot, "layout_analysis.json"), `${JSON.stringify(analysis, null, 2)}\n`, "utf8"),
  writeFile(path.join(exactRoot, "layout_analysis.md"), formatLevelAnalysisMarkdown(analysis), "utf8"),
]);

if (execution.stoppedAtIllegalAction || !execution.final.isWin) {
  throw new Error("Canonical replay did not finish in a winning state");
}
if (analysis.graph.status !== "complete") {
  throw new Error(`Layout graph is not complete: ${analysis.graph.status}`);
}
process.stdout.write(
  `exact=v1 replay_complete=${!execution.stoppedAtIllegalAction} win=${execution.final.isWin} graph=${analysis.graph.status} states=${analysis.graph.reachableStateCount}\n`,
);

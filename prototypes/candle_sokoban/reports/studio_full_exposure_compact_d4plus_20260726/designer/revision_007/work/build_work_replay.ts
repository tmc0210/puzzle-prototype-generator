import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../../src/workflows/inputSequenceReplay.js";

const work = path.resolve(
  "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726/designer/revision_007/work",
);
const layoutPath = path.join(work, "layout_v001.layout");
const layoutRef = "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726/designer/revision_007/work/layout_v001.layout";
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;
const level: LevelDoc = {
  id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_revision_007_v001",
  title: "revision 007 v001 work replay",
  layout,
  win: winCondition,
};
const initial = adapter.parseLevel(level);
const inputs = [
  "up", "left", "up", "up", "left", "right", "up",
  "left", "up", "right", "down", "down", "down", "right",
];
const execution = replayInputSequence(adapter, runtime, initial, inputs, { winCondition }, winCondition);
if (execution.stoppedAtIllegalAction || !execution.final.isWin || execution.steps.length !== 14) {
  throw new Error("work canonical replay did not win in 14 legal steps");
}
const replay = buildInputSequenceReplayReport({
  id: level.id,
  prototype: pkg.mechanic.id,
  layoutSource: layoutRef,
  layout,
  winCondition,
}, execution);
await writeFile(path.join(work, "canonical_replay_v001.json"), `${JSON.stringify(replay, null, 2)}\n`, "utf8");
await writeFile(path.join(work, "canonical_replay_v001.md"), formatInputSequenceReplayMarkdown(replay), "utf8");
console.log(`work replay written: steps=${replay.steps.length} win=${replay.final.isWin}`);

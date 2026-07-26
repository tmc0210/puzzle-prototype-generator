import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import YAML from "yaml";
import {
  isCandleSearchTerminal,
  isWin,
  parseLevel,
  renderState,
  step,
} from "../../../../../src/prototypes/candle_sokoban/mechanics.ts";

const taskRoot = "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726";
const layoutRef = `${taskRoot}/pre_submission/redundancy_checks/outer_outline_band_left_0_0_9/layout.txt`;
const sourceReplayRef = `${taskRoot}/candidate/versions/CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_002/evidence/canonical_replay.json`;
const outRoot = `${taskRoot}/candidate/delivery/CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_delivery_001`;
const layout = fs.readFileSync(layoutRef, "utf8").trimEnd();
const sourceReplay = JSON.parse(fs.readFileSync(sourceReplayRef, "utf8"));
const mechanic = YAML.parse(fs.readFileSync("prototypes/candle_sokoban/mechanic.yml", "utf8"));
let state = parseLevel({
  id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_DELIVERY_001",
  title: "退焰接力",
  layout,
  win: { type: "all_braziers_lit" },
} as any);
const steps = [];
for (let index = 0; index < sourceReplay.inputs.length; index += 1) {
  if (isCandleSearchTerminal(state)) throw new Error(`delivery terminal before step ${index + 1}`);
  const input = sourceReplay.inputs[index];
  const result = step(mechanic, state, input);
  if (!result.legal) throw new Error(`delivery illegal at step ${index + 1}`);
  state = result.state;
  steps.push({ step: index + 1, input, events: result.events, state: renderState(state) });
  if (index < sourceReplay.inputs.length - 1 && isWin(state)) throw new Error(`delivery won early at step ${index + 1}`);
}
if (!isWin(state)) throw new Error("delivery canonical inputs did not win");

const layoutSha256 = createHash("sha256").update(`${layout}\n`).digest("hex");
const replay = {
  schema_version: "candle_delivery_replay.v1",
  candidate_id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003",
  reviewed_exact_version: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_002",
  delivery_exact_version: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_delivery_001",
  layout_sha256: layoutSha256,
  complete: true,
  cost: sourceReplay.inputs.length,
  inputs: sourceReplay.inputs,
  initial_layout: layout,
  final_win: true,
  steps,
};
const level = {
  id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_DELIVERY_001",
  title: "退焰接力",
  global_burn_cycle: 5,
  layout,
  win: { type: "all_braziers_lit" },
  expected_trace: steps.map(({ input, events }) => ({ input, events })),
  expected_events: [...new Set(steps.flatMap(({ events }) => events.map((event: string) => event.split(":")[0])))],
};
const manifest = {
  schema_version: "candle_delivery_manifest.v1",
  candidate_id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003",
  reviewed_exact_version: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_002",
  delivery_exact_version: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_delivery_001",
  level_id: level.id,
  title: level.title,
  layout_sha256: layoutSha256,
  version_effect: "review_preserving_change",
  normalization: "trim outer_outline_band:left:0,0:9",
  canonical_cost: steps.length,
  layout_ref: `${outRoot}/layout.txt`,
  level_ref: `${outRoot}/level.yml`,
  replay_ref: `${outRoot}/canonical_replay.json`,
};
fs.mkdirSync(outRoot, { recursive: true });
fs.writeFileSync(`${outRoot}/layout.txt`, `${layout}\n`);
fs.writeFileSync(`${outRoot}/canonical_replay.json`, `${JSON.stringify(replay, null, 2)}\n`);
fs.writeFileSync(`${outRoot}/level.yml`, YAML.stringify(level));
fs.writeFileSync(`${outRoot}/manifest.yml`, YAML.stringify(manifest));

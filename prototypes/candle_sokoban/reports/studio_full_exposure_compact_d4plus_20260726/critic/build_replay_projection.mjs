import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const source = "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726/candidate/versions/CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_002/evidence/canonical_replay.json";
const target = "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726/critic/canonical_replay_projection_exact_002.json";

const replay = JSON.parse(await readFile(source, "utf8"));
let before = replay.initial_layout;
const steps = replay.steps.map((step) => {
  const projected = {
    step: step.step,
    action: step.input,
    legal: true,
    before: { render: before },
    events: step.events,
    after: { render: step.state },
  };
  before = step.state;
  return projected;
});

const projection = {
  projection_schema: "studio_critic_replay_projection.v1",
  prototype: "candle_sokoban",
  source_ref: source,
  source_layout_sha256: replay.layout_sha256,
  layout: replay.initial_layout,
  inputs: replay.inputs,
  winCondition: { type: "all_braziers_lit" },
  complete: replay.complete,
  cost: replay.cost,
  replay: { completed: replay.complete === true },
  final: { isWin: replay.complete === true },
  steps,
};

await mkdir(path.dirname(target), { recursive: true });
await writeFile(target, `${JSON.stringify(projection, null, 2)}\n`, "utf8");

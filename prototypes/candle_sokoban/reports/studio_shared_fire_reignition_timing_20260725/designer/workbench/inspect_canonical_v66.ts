import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { parseLevel, renderState, step, type CandleAction } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const layoutPath = path.resolve(process.argv[2] ?? "candidate_v66.layout");
const sequence: CandleAction[] = [
  "down", "right", "right", "right", "up", "right", "right", "down",
  "down", "right", "right", "down", "down", "left", "left", "left",
  "left", "left", "up", "up", "down", "down", "right", "up", "down",
  "up", "up", "down", "up", "down", "up", "up",
];
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level = { id: "CANDLE_SHARED_FIRE_REIGNITION_TIMING_001_V4_INSPECT", global_burn_cycle: 5, layout, win: { type: "all_braziers_lit" as const } };
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
let state = parseLevel(level);
for (let index = 0; index < sequence.length; index += 1) {
  const input = sequence[index]!;
  const transition = step(pkg.mechanic, state, input, { winCondition: level.win });
  if (!transition.legal) {
    console.log(JSON.stringify({ step: index + 1, input, legal: false, events: transition.events, state: renderState(state) }, null, 2));
    break;
  }
  state = transition.state;
  console.log(JSON.stringify({ step: index + 1, input, legal: true, events: transition.events, state: renderState(state), player: state.player, countdown: state.globalBurnCountdown, candles: state.candles.map((candle) => ({ id: candle.id, bodyCells: candle.bodyCells, wickDir: candle.wickDir, lit: candle.lit })) }, null, 2));
}

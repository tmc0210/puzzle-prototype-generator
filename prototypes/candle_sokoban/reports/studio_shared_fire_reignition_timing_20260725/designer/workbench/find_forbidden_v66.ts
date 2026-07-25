import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { parseLevel, renderState, stateKey, step, type CandleAction, type CandleSokobanState } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const layoutPath = path.resolve(process.argv[2] ?? "candidate_v66.layout");
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level = { id: "CANDLE_SHARED_FIRE_REIGNITION_TIMING_001_V4_FORBIDDEN", global_burn_cycle: 5, layout, win: { type: "all_braziers_lit" as const } };
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
const forbidden = ["extinguish_by_candle_body", "wick_reexposed_unlit", "shrink_ignite", "roll_intermediate_light_brazier", "roll_last_brazier_before_endpoint", "roll_intermediate_ignite", "roll_intermediate_extinguish", "roll_reignite_after_extinguish"];
const start = parseLevel(level);
const queue: Array<{ state: CandleSokobanState; depth: number }> = [{ state: start, depth: 0 }];
const seen = new Set([stateKey(start)]);
const hits: unknown[] = [];
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const current = queue[cursor]!;
  if (current.state.braziers.every((brazier) => brazier.lit)) continue;
  for (const action of actions) {
    const transition = step(pkg.mechanic, current.state, action, { winCondition: level.win });
    if (!transition.legal) continue;
    const patterns = forbidden.filter((pattern) => transition.events.some((event) => event.includes(pattern)));
    if (patterns.length > 0 && hits.length < 12) {
      hits.push({ depth: current.depth, action, patterns, events: transition.events, from: renderState(current.state), to: renderState(transition.state), fromPlayer: current.state.player, toPlayer: transition.state.player, fromCountdown: current.state.globalBurnCountdown, toCountdown: transition.state.globalBurnCountdown, fromCandles: describe(current.state), toCandles: describe(transition.state) });
    }
    const key = stateKey(transition.state);
    if (!seen.has(key)) { seen.add(key); queue.push({ state: transition.state, depth: current.depth + 1 }); }
  }
}
console.log(JSON.stringify({ states: seen.size, hits }, null, 2));

function describe(state: CandleSokobanState) { return state.candles.map((candle) => ({ id: candle.id, bodyCells: candle.bodyCells, wickDir: candle.wickDir, lit: candle.lit })); }

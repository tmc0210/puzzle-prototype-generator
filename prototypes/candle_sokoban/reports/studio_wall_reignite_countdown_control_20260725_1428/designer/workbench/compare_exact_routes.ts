import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutPath = "D:/Developer/sokoban/prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench/candle_shared_fire_wall_timing_20260725_1428_constrained.layout";
const layout = `${(await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const canonical = (JSON.parse(await readFile("D:/Developer/sokoban/prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench/candle_shared_fire_wall_timing_20260725_1428/candle_shared_fire_wall_timing_20260725_1428.exact.004/canonical_inputs.json", "utf8")) as { inputs: string[] }).inputs;
const alternate = (JSON.parse(await readFile("D:/Developer/sokoban/prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench/candle_shared_fire_wall_timing_20260725_1428/candle_shared_fire_wall_timing_20260725_1428.exact.004/solve_instance.json", "utf8")) as { inputs: string[] }).inputs;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "compare-routes", title: "compare-routes", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
function collect(inputs: string[]) {
  const replay = replayInputSequence(adapter, runtime, initial, inputs, { winCondition: pkg.mechanic.win }, pkg.mechanic.win);
  const states = [initial];
  let current = initial;
  for (const input of inputs) {
    const transition = runtime.step(current, input, { winCondition: pkg.mechanic.win });
    if (!transition.legal) break;
    current = transition.state;
    states.push(current);
  }
  const player = new Set(states.map((state) => `${state.player.x},${state.player.y}`));
  const object = new Set(states.flatMap((state) => state.candles.flatMap((candle) => candle.bodyCells.map((cell) => `${cell.x},${cell.y}`))));
  const events = replay.steps.flatMap((step) => step.events);
  return { replay, player, object, events };
}
const c = collect(canonical);
const a = collect(alternate);
console.log(JSON.stringify({
  canonical: { steps: canonical.length, win: c.replay.final.isWin, player: [...c.player].sort(), object: [...c.object].sort(), events: c.events },
  alternate: { steps: alternate.length, win: a.replay.final.isWin, player: [...a.player].sort(), object: [...a.object].sort(), events: a.events },
  alternateOnlyPlayerCells: [...a.player].filter((cell) => !c.player.has(cell)).sort(),
  canonicalOnlyPlayerCells: [...c.player].filter((cell) => !a.player.has(cell)).sort(),
  alternateOnlyObjectCells: [...a.object].filter((cell) => !c.object.has(cell)).sort(),
  canonicalOnlyObjectCells: [...c.object].filter((cell) => !a.object.has(cell)).sort(),
}, null, 2));

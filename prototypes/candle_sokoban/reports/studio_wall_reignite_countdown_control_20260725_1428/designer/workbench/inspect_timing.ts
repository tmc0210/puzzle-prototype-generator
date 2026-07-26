import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
const layout = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "timing", title: "timing", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
let state = adapter.parseLevel(level);
const solution = solveWithRuntime(runtime, state, { winCondition: pkg.mechanic.win, maxStates: 300000, maxDepth: 180 });
for (const [i, input] of solution.inputs.entries()) {
  const transition = runtime.step(state, input, { winCondition: pkg.mechanic.win });
  if (!transition.legal) break;
  state = transition.state;
  if (state.candles.some((candle) => candle.id === "candle#1") || transition.events.some((event) => event.includes("candle#1"))) {
    console.log(JSON.stringify({ step: i + 1, input, events: transition.events, key: runtime.key(state) }));
  }
}

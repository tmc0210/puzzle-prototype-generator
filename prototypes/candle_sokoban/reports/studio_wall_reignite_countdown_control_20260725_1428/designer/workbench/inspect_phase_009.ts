import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layout = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "phase-009", title: "phase-009", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial: any = adapter.parseLevel(level);
const routes: Record<string, string[]> = {
  canonical: ["left", "left", "down", "up", "down", "left", "up", "up", "up", "up", "right", "up", "right", "up", "left"],
  alternate: ["left", "left", "down", "up", "down", "up", "down", "up", "down", "left", "up", "up", "up", "up", "right", "up", "right", "up", "left"],
};
for (const [name, inputs] of Object.entries(routes)) {
  let state: any = initial;
  console.log(`ROUTE ${name}`);
  for (let index = 0; index < inputs.length; index++) {
    const result = adapter.step(pkg.mechanic, state, inputs[index] as any, { winCondition: pkg.mechanic.win });
    state = result.state;
    console.log(JSON.stringify({
      step: index + 1,
      input: inputs[index],
      legal: result.legal,
      player: state.player,
      timer: state.globalBurnCountdown,
      candles: state.candles.map((candle: any) => ({ id: candle.id, lit: candle.lit, body: candle.bodyCells })),
      braziers: state.braziers,
      events: result.events,
      win: adapter.isWin(state, pkg.mechanic.win),
    }));
  }
}

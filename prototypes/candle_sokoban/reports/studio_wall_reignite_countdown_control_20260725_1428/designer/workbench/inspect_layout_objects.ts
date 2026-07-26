import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
for (const file of process.argv.slice(2)) {
  const layout = await readFile(file, "utf8");
  const state = adapter.parseLevel({ id: file, title: file, layout, win: pkg.mechanic.win });
  console.log(JSON.stringify({ file, player: state.player, candles: state.candles, braziers: state.braziers }, null, 2));
}

// After pulling a ring once from inside its hole, test whether a SECOND
// same-direction pull is possible from the player's new position (they are
// now standing in the hole's previous cell, and the hole moved with them).
// usage: probe-ringlift.mjs <proto> <layout> <holeX> <holeY> <dir> <times>
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { cloneState } from "../../../../../src/prototypes/reality_anchor/mechanics.ts";

const [protoRoot, layoutPath, hx, hy, dir, times] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: 200000 };
let state = cloneState(initial);
state.player = { x: Number(hx), y: Number(hy) };
console.log(adapter.renderState(state));
for (let i = 0; i < Number(times); i++) {
  const t = runtime.step(state, dir, opts);
  console.log(`${dir}#${i + 1}: legal=${t.legal}${t.reason ? " " + t.reason : ""} events=${(t.events ?? []).join("|")}`);
  if (!t.legal) break;
  state = t.state;
  console.log(adapter.renderState(state));
}

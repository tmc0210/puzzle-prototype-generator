// Call the mechanics step() directly (bypassing the runtime adapter wrapper).
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { step, cloneState } from "../../../../../src/prototypes/reality_anchor/mechanics.ts";

const [protoRoot, layoutPath, stanceX, stanceY, ...inputs] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
let state = cloneState(initial);
if (stanceX !== "-") state.player = { x: Number(stanceX), y: Number(stanceY) };
console.log(adapter.renderState(state));
for (const inp of inputs) {
  const t = step(pkg.mechanic, state, inp, { winCondition: pkg.mechanic.win, maxStates: 200000 });
  console.log(`${inp}: legal=${t.legal}${t.reason ? ` reason=${t.reason}` : ""} events=${(t.events ?? []).join("|")}`);
  if (t.legal) { state = t.state; console.log(adapter.renderState(state)); }
}

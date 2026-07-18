// Probe prefix_a1-like geometry: which pulls near the P/L boundary force an
// asymmetric state change (sticky_to_box cut), and what remains legal after.
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";

const [protoRoot, layoutPath] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: 200000 };

console.log(adapter.renderState(initial));
console.log("--- per-action from initial ---");
for (const action of runtime.actions(initial, opts)) {
  const t = runtime.step(initial, action, opts);
  console.log(`${action}: legal=${t.legal}${t.reason ? ` reason=${t.reason}` : ""} events=${(t.events ?? []).join("|")}`);
  if (t.legal) {
    console.log(adapter.renderState(t.state));
    console.log("  --- follow-ups from result ---");
    for (const a2 of runtime.actions(t.state, opts)) {
      const t2 = runtime.step(t.state, a2, opts);
      console.log(`  ${a2}: legal=${t2.legal}${t2.reason ? ` reason=${t2.reason}` : ""} events=${(t2.events ?? []).join("|")}`);
    }
  }
}

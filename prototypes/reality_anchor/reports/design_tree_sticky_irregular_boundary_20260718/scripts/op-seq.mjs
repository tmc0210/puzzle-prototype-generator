// Test the STEP-LIFT concept: J-hook shape (vertical bar + foot) at a ledge.
// Player pulls up from beside the bar (stance = inner cell, behind = bar cell,
// destination = the notch the foot vacates). Then "re-stance" one cell up the
// shaft and repeat. Geometry: shaft walls funnel the bar; foot swings up the
// player's column.
// Layout: bar at (5,4)(5,5)(5,6), foot at (4,6); ledge = wall platform at
// (4,3)-(5,3)? No: ledge the shape must be lifted ONTO at top.
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { cloneState } from "../../../../../src/prototypes/reality_anchor/mechanics.ts";

const [protoRoot, layoutPath, ...ops] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: 200000 };
let state = cloneState(initial);
console.log(adapter.renderState(state));
// ops: pairs "T x y" (teleport) or "M dir" (move)
for (let i = 0; i < ops.length; i += 2) {
  if (ops[i] === "T") {
    state = cloneState(state);
    state.player = { x: Number(ops[i + 1].split(",")[0]), y: Number(ops[i + 1].split(",")[1]) };
    console.log(`teleport -> (${ops[i + 1]})`);
    continue;
  }
  const t = runtime.step(state, ops[i + 1], opts);
  console.log(`${ops[i + 1]}: legal=${t.legal}${t.reason ? " " + t.reason : ""} events=${(t.events ?? []).join("|")}`);
  if (t.legal) { state = t.state; console.log(adapter.renderState(state)); }
}

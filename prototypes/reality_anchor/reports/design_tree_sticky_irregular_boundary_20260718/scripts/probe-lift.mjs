// Given a layout, pull the group from a stance in a direction, then teleport
// the player into the hole cell (x fixed, just below the group's new bottom)
// and pull again — the "delivery lift" primitive: player inside the notch,
// shape rises around them.
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { cloneState } from "../../../../../src/prototypes/reality_anchor/mechanics.ts";

const [protoRoot, layoutPath, stance1x, stance1y, dir1, holeX, holeY, dir2] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: 200000 };
let state = cloneState(initial);
state.player = { x: Number(stance1x), y: Number(stance1y) };
const t1 = runtime.step(state, dir1, opts);
console.log(`${dir1}: legal=${t1.legal}${t1.reason ? " " + t1.reason : ""} events=${(t1.events ?? []).join("|")}`);
if (!t1.legal) process.exit(0);
state = t1.state;
console.log(adapter.renderState(state));
state = cloneState(state);
state.player = { x: Number(holeX), y: Number(holeY) };
const t2 = runtime.step(state, dir2, opts);
console.log(`teleport(${holeX},${holeY}) ${dir2}: legal=${t2.legal}${t2.reason ? " " + t2.reason : ""} events=${(t2.events ?? []).join("|")}`);
if (t2.legal) console.log(adapter.renderState(t2.state));

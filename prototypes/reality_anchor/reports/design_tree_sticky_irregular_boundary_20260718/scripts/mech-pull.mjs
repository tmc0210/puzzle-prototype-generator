// Mechanical pull sim: allow wall-teleport — override player stance to any
// (x,y) then issue a pull. Bypasses walkability so we can test pure geometry
// of "pull this shape in this direction from this stance".
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { cloneState, forceModeAt } from "../../../../../src/prototypes/reality_anchor/mechanics.ts";

const [protoRoot, layoutPath, sx, sy, dir] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: 200000 };
const state = cloneState(initial);
state.player = { x: Number(sx), y: Number(sy) };
console.log(adapter.renderState(state));
console.log(`mode at stance: ${forceModeAt(state, state.player)}`);
const t = runtime.step(state, dir, opts);
console.log(`${dir}: legal=${t.legal}${t.reason ? " " + t.reason : ""} events=${(t.events ?? []).join("|")}`);
if (t.legal) console.log(adapter.renderState(t.state));

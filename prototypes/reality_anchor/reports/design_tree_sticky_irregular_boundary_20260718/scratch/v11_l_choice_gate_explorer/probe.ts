import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const [layoutArg, ...rawInputs] = process.argv.slice(2);
if (!layoutArg) throw new Error("usage: probe.ts <layout> [prefix inputs]");
const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(path.resolve(layoutArg), "utf8");
const level: LevelDoc = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
let state = adapter.parseLevel(level);
const prefix = rawInputs.flatMap((value) => value.split(/[\s,]+/)).filter(Boolean) as InputId[];
const events: string[][] = [];
for (const input of prefix) {
  const transition = runtime.step(state, input, { winCondition: pkg.mechanic.win, maxStates: 500_000 });
  events.push(transition.events ?? []);
  if (!transition.legal) {
    console.log(JSON.stringify({ prefix, legal: false, events, blockedAt: input, render: adapter.renderState(state) }, null, 2));
    process.exit(0);
  }
  state = transition.state;
}
const solution = solveWithRuntime(runtime, state, { winCondition: pkg.mechanic.win, maxStates: 500_000 });
console.log(JSON.stringify({
  prefix,
  legal: true,
  events,
  stateKey: runtime.key(state),
  render: adapter.renderState(state),
  suffix: { status: solution.searchStatus, found: solution.found, cost: solution.found ? solution.cost : null, inputs: solution.found ? solution.inputs : [] },
}, null, 2));

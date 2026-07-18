// Instrumented solver: print every depth-1 and depth-2 node on the BFS path tree
// so we can see what the short solution on a scratch layout actually does.
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { solveWithRuntime } from "../../../../../src/core/solver.ts";

const [protoRoot, layoutPath] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "scratch", title: "scratch", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const solution = solveWithRuntime(runtime, initial, {
  winCondition: pkg.mechanic.win,
  maxStates: 200000,
});
if (!solution.found) {
  console.log("UNSOLVED", solution.searchStatus);
  process.exit(1);
}
console.log(`SOLVED cost=${solution.cost}`);
// Replay the found inputs step by step, printing state + events.
let state = initial;
console.log(adapter.renderState(state));
solution.inputs.forEach((inp, i) => {
  const t = runtime.step(state, inp, { winCondition: pkg.mechanic.win, maxStates: 200000 });
  console.log(`--- step ${i + 1}: ${inp} legal=${t.legal} events=${(t.events ?? []).join("|")}`);
  if (!t.legal) return;
  state = t.state;
  console.log(adapter.renderState(state));
});

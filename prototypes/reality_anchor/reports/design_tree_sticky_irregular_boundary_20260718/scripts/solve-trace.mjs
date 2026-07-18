// Solve a layout but print per-step player positions alongside events, and
// annotate which sticky GROUP moved (index + cells) so we can see which piece
// a solution actually manipulated.
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
  console.log("UNSOLVED", solution.searchStatus ?? "");
  process.exit(1);
}
console.log(`SOLVED cost=${solution.cost}`);
let state = initial;
const key = (p) => `${p.x},${p.y}`;
const gkey = (g) => g.map(key).sort().join(" ");
console.log(`start player=(${key(state.player)}) groups=[${state.stickyGroups.map(gkey).join("] [")}] crates=[${state.crates.map(key).join(" ")}]`);
solution.inputs.forEach((inp, i) => {
  const t = runtime.step(state, inp, { winCondition: pkg.mechanic.win, maxStates: 200000 });
  if (!t.legal) { console.log(`step${i + 1} ${inp}: ILLEGAL ${t.reason}`); return; }
  state = t.state;
  console.log(
    `step${i + 1} ${inp}: player=(${key(state.player)}) groups=[${state.stickyGroups.map(gkey).join("] [")}] crates=[${state.crates.map(key).join(" ")}] events=${(t.events ?? []).join("|")}`
  );
});

// ax2: same pocket concept, sources switched — bar in the north lane (2,2)(3,2),
// barrel on the east lane (6,5). North lane has no cross wall, so the bar is freely
// pushable south onto the barrel, forming L (2,4)(2,5)(3,4) ... check merges.
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { solveWithRuntime } from "../../../../../src/core/solver.ts";

const protoRoot = "prototypes/reality_anchor";
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = `########
#BS#...#
#PLMM..#
#G##...#
#..#G.M#
#..@#..#
#..#...#
########`;
const level = { id: "ax2", title: "ax2", layout, win: pkg.mechanic.win };
let state = adapter.parseLevel(level);
const key = (p) => `${p.x},${p.y}`;
const gkey = (g) => g.map(key).sort().join(" ");
console.log(`start groups=[${state.stickyGroups.map(gkey).join("] [")}] crates=[${state.crates.map(key).join(" ")}]`);
const solution = solveWithRuntime(runtime, state, { winCondition: pkg.mechanic.win, maxStates: 300000 });
if (!solution.found) { console.log("UNSOLVED", solution.searchStatus ?? ""); process.exit(1); }
console.log(`SOLVED cost=${solution.cost}`);
solution.inputs.forEach((inp, i) => {
  const t = runtime.step(state, inp, { winCondition: pkg.mechanic.win, maxStates: 300000 });
  if (!t.legal) { console.log(`step${i + 1} ${inp}: ILLEGAL ${t.reason}`); return; }
  state = t.state;
  console.log(`step${i + 1} ${inp}: player=(${key(state.player)}) groups=[${state.stickyGroups.map(gkey).join("] [")}] crates=[${state.crates.map(key).join(" ")}] events=${(t.events ?? []).join("|")}`);
});

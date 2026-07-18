// ax1: two-source assembly through a lane-crossing pocket, then exact baseline spine.
// Sources: barrel M@(2,2) north; bar M@(6,5)(7,5) east. Pocket: lane enters west zone
// through mouth (4,5), flanked by blockers (4,4)/(4,6); barrel rests above mouth on
// the west side (3,4). Intended: push the bar left through the mouth (it dissolves the
// pocket, re-forms as the L (3,4)(3,5)(2,5)), cut at B/S line x1|2, crate west to
// G(1,4), bar south to G(4,6).
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { solveWithRuntime } from "../../../../../src/core/solver.ts";

const protoRoot = "prototypes/reality_anchor";
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = `########
#BS#...#
#PLM...#
#G##...#
#..#GMM#
#..@#..#
#..#...#
########`;
const level = { id: "ax1", title: "ax1", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const solution = solveWithRuntime(runtime, initial, {
  winCondition: pkg.mechanic.win,
  maxStates: 300000,
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
  const t = runtime.step(state, inp, { winCondition: pkg.mechanic.win, maxStates: 300000 });
  if (!t.legal) { console.log(`step${i + 1} ${inp}: ILLEGAL ${t.reason}`); return; }
  state = t.state;
  console.log(
    `step${i + 1} ${inp}: player=(${key(state.player)}) groups=[${state.stickyGroups.map(gkey).join("] [")}] crates=[${state.crates.map(key).join(" ")}] events=${(t.events ?? []).join("|")}`
  );
});

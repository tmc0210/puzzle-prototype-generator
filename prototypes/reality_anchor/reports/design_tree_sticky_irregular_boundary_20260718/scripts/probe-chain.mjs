// Pull-chain simulation: from a layout + start stance, repeatedly pull in a
// direction. After each step, teleport the player back to the pull stance
// (cell - dir for the group's nearest cell) to test whether a SAME-direction
// chain could continue geometrically if the player could keep up.
// Also reports, after each step, whether any REAL same-dir stance exists on
// the moved group (player destination free, behind = group cell).
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { cloneState, forceModeAt } from "../../../../../src/prototypes/reality_anchor/mechanics.ts";

const [protoRoot, layoutPath, sx, sy, dir, steps] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: 200000 };
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const [dx, dy] = DIRS[dir];
const key = (p) => `${p.x},${p.y}`;

let state = cloneState(initial);
state.player = { x: Number(sx), y: Number(sy) };
console.log(adapter.renderState(state));

function groupAt(p) {
  for (const [gi, g] of state.stickyGroups.entries())
    if (g.some((c) => key(c) === key(p))) return gi;
  return -1;
}

for (let i = 0; i < Number(steps); i++) {
  const behind = { x: state.player.x - dx, y: state.player.y - dy };
  const gi = groupAt(behind);
  const t = runtime.step(state, dir, opts);
  console.log(`step${i + 1} ${dir}: legal=${t.legal}${t.reason ? " " + t.reason : ""} events=${(t.events ?? []).join("|")}`);
  if (!t.legal) break;
  state = t.state;
  console.log(adapter.renderState(state));
  if (gi < 0) { console.log("  (no group was pulled; teleport needs a pulled group — stop)"); break; }
  // does a real same-dir stance exist on the moved group now?
  const g = state.stickyGroups[gi];
  let real = "none";
  for (const c of g) {
    const st = { x: c.x - dx, y: c.y - dy };
    const dest = { x: st.x + dx, y: st.y + dy };
    const occByOther = state.stickyGroups.some((og, oi) => oi !== gi && og.some((p) => key(p) === key(dest)))
      || state.crates.some((p) => key(p) === key(dest));
    if (!state.walls.has(key(st)) && !state.walls.has(key(dest)) && !occByOther) {
      real = `stance(${key(st)}) dest(${key(dest)})`;
      break;
    }
  }
  console.log(`  real same-dir stance on group#${gi}: ${real}`);
  // teleport for next iteration (wall-teleport pull sim)
  state = cloneState(state);
  const cell = g.find((c) => true);
  state.player = { x: cell.x - dx, y: cell.y - dy };
}

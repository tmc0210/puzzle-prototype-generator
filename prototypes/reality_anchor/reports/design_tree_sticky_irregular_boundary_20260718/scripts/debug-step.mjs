// Debug a single step: print force mode, destination, behind cell, occupancy,
// and the force plan failure cell for one stance+input.
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { cloneState, forceModeAt } from "../../../../../src/prototypes/reality_anchor/mechanics.ts";

const [protoRoot, layoutPath, sx, sy, input] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const state = cloneState(initial);
state.player = { x: Number(sx), y: Number(sy) };
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const [dx, dy] = DIRS[input];
const mode = forceModeAt(state, state.player);
const dest = { x: state.player.x + dx, y: state.player.y + dy };
const behind = { x: state.player.x - dx, y: state.player.y - dy };
const key = (p) => `${p.x},${p.y}`;
console.log(`player=(${key(state.player)}) mode=${mode}`);
console.log(`dest=(${key(dest)}) wall=${state.walls.has(key(dest))}`);
console.log(`behind=(${key(behind)}) wall=${state.walls.has(key(behind))}`);
for (const [gi, g] of state.stickyGroups.entries())
  console.log(`stickyGroup#${gi}: ${g.map(key).join(" ")}`);
console.log(`crates: ${state.crates.map(key).join(" ")}`);
// emulate planObjectMove for a pull from behind
const occupancy = new Map();
state.crates.forEach((c, i) => occupancy.set(key(c), `crate:${i}`));
state.stickyGroups.forEach((g, i) => g.forEach((p) => occupancy.set(key(p), `sticky:${i}`)));
const anchorCells = [];
if (state.pushPullAnchor) anchorCells.push(state.pushPullAnchor.push, state.pushPullAnchor.pull);
if (state.boxStickyAnchor) anchorCells.push(state.boxStickyAnchor.box, state.boxStickyAnchor.sticky);
for (const p of anchorCells) occupancy.set(key(p), "anchor");
console.log(`occupancy at behind: ${occupancy.get(key(behind)) ?? "EMPTY"}`);
const targetId = occupancy.get(key(behind));
if (targetId) {
  const cells = targetId.startsWith("sticky:")
    ? state.stickyGroups[Number(targetId.split(":")[1])]
    : targetId.startsWith("crate:")
      ? [state.crates[Number(targetId.split(":")[1])]]
      : anchorCells;
  for (const cell of cells) {
    const t = { x: cell.x + dx, y: cell.y + dy };
    const blocker = occupancy.get(key(t));
    console.log(
      `  cell(${key(cell)}) -> target(${key(t)}) wall=${state.walls.has(key(t))} blocker=${blocker ?? "none"}`
    );
  }
}

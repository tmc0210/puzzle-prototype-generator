// Directional pull probe with WALL teleport (pushes the object but player stays
// put). For every open stance adjacent to a sticky group, try each direction:
// reports pull_legal + first blocking cell of the group's translation.
// This maps the geometry of "where can this shape go via one more same-dir pull".
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { cloneState, forceModeAt } from "../../../../../src/prototypes/reality_anchor/mechanics.ts";

const [protoRoot, layoutPath] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: 200000 };
const key = (p) => `${p.x},${p.y}`;
const walls = initial.walls;
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

console.log(adapter.renderState(initial));
initial.stickyGroups.forEach((group, gi) => {
  console.log(`--- group#${gi}: ${group.map(key).join(" ")} ---`);
  for (const cell of group) {
    for (const [dirName, [dx, dy]] of Object.entries(DIRS)) {
      // stance so that `dirName` is a PULL of this cell: player at cell - dir
      const sx = cell.x - dx, sy = cell.y - dy;
      const dest = { x: sx + dx, y: sy + dy };
      if (walls.has(key(dest)) || walls.has(key({ x: sx, y: sy }))) continue;
      const state = cloneState(initial);
      state.player = { x: sx, y: sy };
      if (forceModeAt(state, state.player) !== "pull") continue;
      const t = runtime.step(state, dirName, opts);
      const tag = t.legal ? "PULL" : (t.reason === "force_blocked" ? "BLOCK" : t.reason);
      // find first blocking cell for the translation
      let block = "";
      if (!t.legal) {
        for (const c of group) {
          const tp = { x: c.x + dx, y: c.y + dy };
          if (walls.has(key(tp))) { block = ` cell(${key(c)}) hits wall(${key(tp)})`; break; }
        }
      }
      console.log(`stance(${sx},${sy}) pull-${dirName}: ${tag}${block}`);
    }
  }
});

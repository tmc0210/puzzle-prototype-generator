// Enumerate ALL (stance, direction) pulls for every sticky cell and print
// legal/illegal WITHOUT the occupancy illusion: for each candidate, also
// simulate the object's translation and the player's destination explicitly.
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
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

console.log(adapter.renderState(initial));
const occ = new Set();
initial.crates.forEach((c) => occ.add(key(c)));
initial.stickyGroups.forEach((g) => g.forEach((p) => occ.add(key(p))));

initial.stickyGroups.forEach((group, gi) => {
  const gset = new Set(group.map(key));
  console.log(`--- group#${gi}: ${group.map(key).join(" ")} ---`);
  for (const cell of group) {
    for (const [dirName, [dx, dy]] of Object.entries(DIRS)) {
      const sx = cell.x - dx, sy = cell.y - dy; // pull stance for this cell
      const dest = { x: sx + dx, y: sy + dy };
      if (initial.walls.has(key(dest)) || initial.walls.has(key({ x: sx, y: sy }))) continue;
      // player destination must not be occupied by a DIFFERENT object
      if (occ.has(key(dest)) && !gset.has(key(dest))) continue;
      // object translation legality: every cell's target must be free (wall/other object)
      let blockedBy = null;
      for (const c of group) {
        const tp = { x: c.x + dx, y: c.y + dy };
        if (initial.walls.has(key(tp))) { blockedBy = `wall(${key(tp)})`; break; }
        if (occ.has(key(tp)) && !gset.has(key(tp))) { blockedBy = `obj(${key(tp)})`; break; }
      }
      // now the actual runtime verdict
      const state = cloneState(initial);
      state.player = { x: sx, y: sy };
      if (forceModeAt(state, state.player) !== "pull") { console.log(`stance(${sx},${sy}) ${dirName}: NOT PULL SIDE`); continue; }
      const t = runtime.step(state, dirName, opts);
      console.log(
        `stance(${sx},${sy}) pull-${dirName}: mine=${blockedBy ? "BLOCK " + blockedBy : "PULL"} runtime=${t.legal ? "legal " + (t.events ?? []).join("+") : t.reason}`
      );
    }
  }
});

// Probe: on a layout, stand below each sticky cell and try `up` repeatedly.
// Answers: which stances yield pull_object (handle) vs walk (no handle).
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { cloneState } from "../../../../../src/prototypes/reality_anchor/mechanics.ts";

const [protoRoot, layoutPath, ...rest] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: 200000 };
const dir = rest.find((a) => a.startsWith("--dir="))?.slice(6) ?? "up";
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const [dx, dy] = DIRS[dir];

for (const group of initial.stickyGroups) {
  for (const cell of group) {
  // stance: the cell OPPOSITE the pull direction from the sticky cell
  const sx = cell.x - dx, sy = cell.y - dy;
  // walls from parse: use runtime by probing a walk into the stance cell
  const state = cloneState(initial);
  state.player = { x: sx, y: sy };
  const t = runtime.step(state, dir, opts);
  console.log(
    `sticky@(${cell.x},${cell.y}) stance(${sx},${sy}) ${dir}: legal=${t.legal}${t.reason ? ` reason=${t.reason}` : ""} events=${(t.events ?? []).join("|")}`
  );
    if (t.legal) {
      const t2 = runtime.step(t.state, dir, opts);
      console.log(
        `   again ${dir}: legal=${t2.legal}${t2.reason ? ` reason=${t2.reason}` : ""} events=${(t2.events ?? []).join("|")}`
      );
    }
  }
}
console.log(adapter.renderState(initial));

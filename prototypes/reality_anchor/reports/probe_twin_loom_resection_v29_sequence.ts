import { readFile, writeFile } from "node:fs/promises";
import { stringify } from "yaml";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { realityAnchorAdapter } from "../../../src/prototypes/reality_anchor/runtime.js";
import { pointKey, stateKey, type RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import type { LevelDoc } from "../../../src/core/types.js";

const root = "prototypes/reality_anchor";
const id = process.argv[2] ?? "RA_FRESH_2026_07_11_TWIN_LOOM_RESECTION_v29";
const offset = id.endsWith("_v31") ? -1 : 0;
const pkg = await loadPrototypePackage(root);
const layout = (await readFile(`${root}/reports/${id}.layout.txt`, "utf8")).trimEnd();
const level: LevelDoc = { id, title: id, layout, win: pkg.mechanic.win };
const runtime = realityAnchorAdapter.createRuntime(pkg.mechanic);
const initial = realityAnchorAdapter.parseLevel(level);
const items: Array<{ state: RealityAnchorState; bad: boolean }> = [{ state: initial, bad: false }];
const visited = new Set<string>([`${stateKey(initial)}|0`]);
let violatingWinningPath = false;
for (let cursor = 0; cursor < items.length; cursor += 1) {
  const item = items[cursor]!;
  if (runtime.isWin(item.state, pkg.mechanic.win)) {
    if (item.bad) { violatingWinningPath = true; break; }
    continue;
  }
  for (const action of runtime.actions(item.state, { winCondition: pkg.mechanic.win })) {
    const transition = runtime.step(item.state, action, { winCondition: pkg.mechanic.win });
    if (!transition.legal) continue;
    const bad = item.bad || (covered(transition.state, 7 + offset, 5) && !covered(transition.state, 4 + offset, 2));
    const key = `${stateKey(transition.state)}|${bad ? 1 : 0}`;
    if (visited.has(key)) continue;
    visited.add(key);
    items.push({ state: transition.state, bad });
  }
}
const report = {
  candidate_id: id,
  status: "complete",
  monitor_states: visited.size,
  violating_winning_path: violatingWinningPath,
  obligation: `任一胜路中 (${7 + offset},5) 门箱目标不得早于 (${4 + offset},2) 上黏臂目标；下黏臂可在门箱前后完成。`,
};
await writeFile(`${root}/reports/${id}_sequence_report.yml`, stringify(report), "utf8");
console.log(JSON.stringify(report, null, 2));

function covered(state: RealityAnchorState, x: number, y: number) {
  const key = `${x},${y}`;
  return state.crates.some((point) => pointKey(point) === key) ||
    state.stickyGroups.some((group) => group.some((point) => pointKey(point) === key)) ||
    (state.pushPullAnchor ? [state.pushPullAnchor.push, state.pushPullAnchor.pull].some((point) => pointKey(point) === key) : false) ||
    (state.boxStickyAnchor ? [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky].some((point) => pointKey(point) === key) : false);
}

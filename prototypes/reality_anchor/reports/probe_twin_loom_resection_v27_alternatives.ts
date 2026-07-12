import { readFile, writeFile } from "node:fs/promises";
import { stringify } from "yaml";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { realityAnchorAdapter } from "../../../src/prototypes/reality_anchor/runtime.js";
import type { Direction, LevelDoc } from "../../../src/core/types.js";

const root = "prototypes/reality_anchor";
const id = "RA_FRESH_2026_07_11_TWIN_LOOM_RESECTION_v27";
const pkg = await loadPrototypePackage(root);
const layout = (await readFile(`${root}/reports/${id}.layout.txt`, "utf8")).trimEnd();
const level: LevelDoc = { id, title: id, layout, win: pkg.mechanic.win };
const runtime = realityAnchorAdapter.createRuntime(pkg.mechanic);
const initial = realityAnchorAdapter.parseLevel(level);
const prefix: Direction[] = ["right", "right", "up", "up", "up", "right", "right", "right", "up", "up", "left", "right"];
const temptation: Direction[] = ["right", "right"];
const split = replay(initial, prefix).state;
const result = replay(split, temptation);
const continuation = solveWithRuntime(runtime, result.state, {
  winCondition: pkg.mechanic.win,
  maxStates: 1_200_000,
  maxDepth: 200,
});
const report = {
  candidate_id: id,
  command: `npx tsx ${root}/reports/probe_twin_loom_resection_v27_alternatives.ts`,
  canonical_prefix_to_split_state: prefix,
  split_state: realityAnchorAdapter.renderState(split),
  alternatives: [{
    id: "ALT1_fill_near_crate_goal_immediately",
    exact_inputs: temptation,
    replay_legal: result.legal,
    replay_steps: result.steps,
    local_gain: "切割后连续右拉两次，把最下方切出箱直接送上同排近目标；该目标立即从空变为覆盖。",
    result_state: realityAnchorAdapter.renderState(result.state),
    continuation_search: {
      found: continuation.found,
      status: continuation.searchStatus,
      explored_states: continuation.exploredStates,
      reason: continuation.reason,
    },
  }],
};
await writeFile(`${root}/reports/${id}_alternative_report.yml`, stringify(report), "utf8");
console.log(JSON.stringify(report, null, 2));

function replay(state: typeof initial, inputs: Direction[]) {
  let current = state;
  const steps: Array<{ step: number; input: Direction; legal: boolean; events: string[]; reason?: string }> = [];
  for (const [index, input] of inputs.entries()) {
    const transition = runtime.step(current, input, { winCondition: pkg.mechanic.win });
    steps.push({ step: index + 1, input, legal: transition.legal, events: transition.events, ...(transition.reason ? { reason: transition.reason } : {}) });
    if (!transition.legal) return { state: current, steps, legal: false };
    current = transition.state;
  }
  return { state: current, steps, legal: true };
}

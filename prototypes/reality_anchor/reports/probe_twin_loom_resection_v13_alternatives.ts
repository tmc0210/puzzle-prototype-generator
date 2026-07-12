import { readFile, writeFile } from "node:fs/promises";
import { stringify } from "yaml";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { realityAnchorAdapter } from "../../../src/prototypes/reality_anchor/runtime.js";
import type { Direction, LevelDoc } from "../../../src/core/types.js";

const prototypeRoot = "prototypes/reality_anchor";
const candidateId = "RA_FRESH_2026_07_11_TWIN_LOOM_RESECTION_v13";
const layout = (await readFile(`${prototypeRoot}/reports/${candidateId}.layout.txt`, "utf8")).trimEnd();
const pkg = await loadPrototypePackage(prototypeRoot);
const level: LevelDoc = { id: candidateId, title: candidateId, layout, win: pkg.mechanic.win };
const runtime = realityAnchorAdapter.createRuntime(pkg.mechanic);
const initial = realityAnchorAdapter.parseLevel(level);

const canonicalPrefix: Direction[] = [
  "right", "right", "up", "up", "up", "up", "right", "right", "up", "right",
];
const connectorPocketAlternative: Direction[] = ["right"];
const upperFirstAlternative: Direction[] = [
  "down", "left", "left", "left", "down", "left", "left", "left",
  "up", "up", "up", "up", "up", "right", "right", "right", "right", "up",
];

const splitState = replay(initial, canonicalPrefix).state;
const alternatives = [
  analyzeAlternative(
    "ALT1_pull_cut_crate_into_right_pocket",
    splitState,
    connectorPocketAlternative,
    "切割后玩家面前的 x=6 下箱可以被向右拉；箱移动到 x=7，看似清开连接柱。",
  ),
  analyzeAlternative(
    "ALT2_finish_upper_goal_before_lower",
    splitState,
    upperFirstAlternative,
    "切割后绕左回廊先到上臂外侧，并把上臂向上拉入目标。",
  ),
];

const report = {
  candidate_id: candidateId,
  command: `npx tsx ${prototypeRoot}/reports/probe_twin_loom_resection_v13_alternatives.ts`,
  canonical_prefix_to_split_state: canonicalPrefix,
  split_state: realityAnchorAdapter.renderState(splitState),
  alternatives,
};

await writeFile(
  `${prototypeRoot}/reports/${candidateId}_alternative_report.yml`,
  stringify(report),
  "utf8",
);
console.log(JSON.stringify(report, null, 2));

function analyzeAlternative(
  id: string,
  fromState: typeof initial,
  inputs: Direction[],
  localGain: string,
) {
  const replayResult = replay(fromState, inputs);
  const continuation = solveWithRuntime(runtime, replayResult.state, {
    winCondition: pkg.mechanic.win,
    maxStates: 1_200_000,
    maxDepth: 200,
  });
  return {
    id,
    exact_inputs: inputs,
    replay_legal: replayResult.legal,
    replay_steps: replayResult.steps,
    local_gain: localGain,
    result_state: realityAnchorAdapter.renderState(replayResult.state),
    continuation_search: {
      found: continuation.found,
      status: continuation.searchStatus,
      explored_states: continuation.exploredStates,
      reason: continuation.reason,
    },
  };
}

function replay(state: typeof initial, inputs: Direction[]) {
  let current = state;
  const steps: Array<{ step: number; input: Direction; legal: boolean; events: string[]; reason?: string }> = [];
  for (const [index, input] of inputs.entries()) {
    const transition = runtime.step(current, input, { winCondition: pkg.mechanic.win });
    steps.push({
      step: index + 1,
      input,
      legal: transition.legal,
      events: transition.events,
      ...(transition.reason ? { reason: transition.reason } : {}),
    });
    if (!transition.legal) return { state: current, steps, legal: false };
    current = transition.state;
  }
  return { state: current, steps, legal: true };
}

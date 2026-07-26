import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../../../src/workflows/inputSequenceReplay.js";
import {
  analyzeLevel,
  formatLevelAnalysisMarkdown,
} from "../../../../../../../../src/workflows/levelAnalyzer.js";

const taskRoot = path.resolve("prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726");
const work = path.join(taskRoot, "designer/revision_006/work/shared_goal_boundary_choice");
const exact = path.join(taskRoot, "candidate/versions/CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_005");
const layoutRef = "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726/candidate/versions/CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_005/layout.txt";
const layout = (await readFile(path.join(exact, "layout.txt"), "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;
const level: LevelDoc = {
  id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_005",
  title: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003 exact 005",
  layout,
  win: winCondition,
};
const initial = adapter.parseLevel(level);
if (adapter.renderState(initial) !== layout) throw new Error("initial render differs from frozen layout");

const inputs = ["up", "left", "up", "up", "left", "up", "left", "up", "right", "down", "down", "down", "right", "right"];
const execution = replayInputSequence(adapter, runtime, initial, inputs, { winCondition }, winCondition);
if (execution.stoppedAtIllegalAction || !execution.final.isWin || execution.steps.length !== 14) {
  throw new Error("canonical replay did not complete as frozen");
}
const replay = buildInputSequenceReplayReport({
  id: level.id,
  prototype: pkg.mechanic.id,
  layoutSource: layoutRef,
  layout,
  winCondition,
}, execution);
await writeFile(path.join(exact, "canonical_replay.json"), `${JSON.stringify(replay, null, 2)}\n`, "utf8");
await writeFile(path.join(exact, "canonical_replay.md"), formatInputSequenceReplayMarkdown(replay), "utf8");

const analysis = analyzeLevel(pkg, level, {
  maxStates: 700_000,
  graphMaxStates: 700_000,
  counterfactualMaxStates: 700_000,
});
if (analysis.graph.status !== "complete" || analysis.graph.reachableStateCount !== 107188 || analysis.graph.winStateCount !== 3) {
  throw new Error(`unexpected graph ${analysis.graph.status}/${analysis.graph.reachableStateCount}/${analysis.graph.winStateCount}`);
}
await writeFile(path.join(exact, "graph_analysis.json"), `${JSON.stringify(analysis, null, 2)}\n`, "utf8");
await writeFile(path.join(exact, "graph_analysis.md"), formatLevelAnalysisMarkdown(analysis), "utf8");

const workAudit = JSON.parse(await readFile(path.join(work, "audit_v004.json"), "utf8"));
if (
  workAudit.graph?.status !== "complete" ||
  workAudit.recovery_counterfactuals?.some((item: { win_reachable?: boolean }) => item.win_reachable) ||
  workAudit.required_winning_events?.some((item: { required?: boolean }) => !item.required) ||
  workAudit.forbidden_winning_events?.some((item: { occurs_on_any_winning_path?: boolean }) => item.occurs_on_any_winning_path) ||
  workAudit.order_checks?.some((item: { violation_on_any_winning_path?: boolean }) => item.violation_on_any_winning_path)
) {
  throw new Error("work solution-family audit did not satisfy publication gate");
}
const exactAudit = {
  ...workAudit,
  candidate_id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003",
  exact_version: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_005",
  work_version: undefined,
  layout_ref: layoutRef,
  layout_sha256: "6a0728145fbc9f2a762e4fd823d9e97cfec649433bc9ff2d9247f1e18477a812",
  declared_solution_family_result: "equivalent_variants_only",
  equivalence_account: {
    direct_family: "14-step direct donor phase-row route",
    rehandoff_family: "18/20-step extra body-concealment and second shrink_ignite route",
    invariant: "same target allocation, required first shrink_ignite, donor upper target, receiver singleton double-consumer roll; no ordinary reignition or wrong-branch recovery",
  },
};
delete exactAudit.work_version;
await writeFile(path.join(exact, "solution_family_audit.json"), `${JSON.stringify(exactAudit, null, 2)}\n`, "utf8");
const sourceMd = await readFile(path.join(work, "audit_v004.md"), "utf8");
await writeFile(
  path.join(exact, "solution_family_audit.md"),
  sourceMd
    .replace("# v004 完整图审计", "# CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003 exact_005 完整解族审计")
    .replaceAll("v004", "exact_005"),
  "utf8",
);
console.log(`published generated artifacts: replay_steps=${replay.steps.length} graph_states=${analysis.graph.reachableStateCount} wins=${analysis.graph.winStateCount}`);

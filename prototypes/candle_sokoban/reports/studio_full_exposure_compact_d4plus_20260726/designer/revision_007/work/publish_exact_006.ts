import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../../src/workflows/inputSequenceReplay.js";
import { analyzeLevel, formatLevelAnalysisMarkdown } from "../../../../../../../src/workflows/levelAnalyzer.js";

const taskRoot = path.resolve("prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726");
const work = path.join(taskRoot, "designer/revision_007/work");
const exactVersion = "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_006";
const exact = path.join(taskRoot, "candidate/versions", exactVersion);
const layoutRef = `prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726/candidate/versions/${exactVersion}/layout.txt`;
const layout = (await readFile(path.join(exact, "layout.txt"), "utf8")).replace(/\r/g, "").trimEnd();
const workLayout = (await readFile(path.join(work, "layout_v001.layout"), "utf8")).replace(/\r/g, "").trimEnd();
if (layout !== workLayout) throw new Error("frozen exact layout differs from audited work layout");
const layoutSha256 = createHash("sha256").update(`${layout}\n`, "utf8").digest("hex");

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;
const level: LevelDoc = { id: exactVersion, title: "Candle Full Exposure Compact Capstone 003 exact 006", layout, win: winCondition };
const initial = adapter.parseLevel(level);
if (adapter.renderState(initial) !== layout) throw new Error("initial render differs from frozen layout");

const inputs = [
  "up", "left", "up", "up", "left", "right", "up",
  "left", "up", "right", "down", "down", "down", "right",
];
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
if (
  analysis.graph.status !== "complete" ||
  analysis.graph.reachableStateCount !== 51042 ||
  analysis.graph.winStateCount !== 1
) {
  throw new Error(`unexpected graph ${analysis.graph.status}/${analysis.graph.reachableStateCount}/${analysis.graph.winStateCount}`);
}
await writeFile(path.join(exact, "graph_analysis.json"), `${JSON.stringify(analysis, null, 2)}\n`, "utf8");
await writeFile(path.join(exact, "graph_analysis.md"), formatLevelAnalysisMarkdown(analysis), "utf8");

const workAudit = JSON.parse(await readFile(path.join(work, "audit_v001.json"), "utf8"));
if (
  workAudit.graph?.status !== "complete" ||
  workAudit.graph?.reachable_states !== 51042 ||
  workAudit.graph?.winning_states !== 1 ||
  workAudit.required_winning_events?.some((item: { required?: boolean }) => !item.required) ||
  workAudit.forbidden_winning_events?.some((item: { occurs_on_any_winning_path?: boolean }) => item.occurs_on_any_winning_path) ||
  workAudit.exact_once_checks?.some((item: { count_not_one_on_any_winning_path?: boolean }) => item.count_not_one_on_any_winning_path) ||
  workAudit.order_checks?.some((item: { violation_on_any_winning_path?: boolean }) => item.violation_on_any_winning_path) ||
  workAudit.recovery_counterfactuals?.some((item: { win_reachable?: boolean }) => item.win_reachable)
) {
  throw new Error("work solution-family audit did not satisfy publication gate");
}
const exactAudit = {
  ...workAudit,
  candidate_id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003",
  exact_version: exactVersion,
  layout_ref: layoutRef,
  layout_sha256: layoutSha256,
  declared_solution_family_result: "unique_complete",
  uniqueness_account: {
    complete_graph_winning_states: 1,
    only_winning_representative_depth: 14,
    sole_receiver_shrink_ignite_count: 1,
    receiver_body_extinguish_on_any_winning_path: false,
    causal_identity: "first-boundary one-shot shrink_ignite -> continuous receiver fire retention -> receiver shrink -> final long-roll double consumer",
  },
};
delete exactAudit.work_version;
await writeFile(path.join(exact, "solution_family_audit.json"), `${JSON.stringify(exactAudit, null, 2)}\n`, "utf8");
const workMarkdown = await readFile(path.join(work, "audit_v001.md"), "utf8");
await writeFile(
  path.join(exact, "solution_family_audit.md"),
  workMarkdown.replace("# revision_007 v001 完整解族审计", `# ${exactVersion} 完整解族审计`),
  "utf8",
);
console.log(JSON.stringify({ exact_version: exactVersion, layout_sha256: layoutSha256, replay_steps: replay.steps.length, graph: analysis.graph }, null, 2));

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const repoRoot = path.resolve(".");
const exactRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/CANDLE_CURRICULUM_L13_001_exact_001",
);
const evidenceRoot = path.join(exactRoot, "evidence");
const exactVersion = "CANDLE_CURRICULUM_L13_001_exact_001";
const expectedHash = "9cbc87a1177c5168f65d42fe5a0a6cb23efad0c2b7993b747c517f3b271e15eb";
const failures: string[] = [];
const check = (condition: unknown, message: string) => {
  if (!condition) failures.push(message);
};
const readJson = (relative: string) =>
  JSON.parse(fs.readFileSync(path.join(exactRoot, relative), "utf8"));
const readYaml = (relative: string) =>
  YAML.parse(fs.readFileSync(path.join(exactRoot, relative), "utf8"));

function walk(root: string): string[] {
  const result: string[] = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...walk(full));
    else result.push(full);
  }
  return result;
}

const files = walk(exactRoot);
for (const file of files.filter((candidate) => candidate.endsWith(".yml"))) {
  try {
    YAML.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    failures.push(`YAML parse failed: ${path.relative(exactRoot, file)}: ${String(error)}`);
  }
}
for (const file of files.filter((candidate) => candidate.endsWith(".json"))) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    failures.push(`JSON parse failed: ${path.relative(exactRoot, file)}: ${String(error)}`);
  }
}

const layout = fs.readFileSync(path.join(exactRoot, "layout.txt"));
const layoutHash = crypto.createHash("sha256").update(layout).digest("hex");
check(layoutHash === expectedHash, `layout hash mismatch: ${layoutHash}`);

const manifest = readYaml("manifest.yml");
const level = readYaml("level.yml");
const solve = readYaml("solve_instance.yml");
const submission = readYaml("submission_packet.yml");
const replay = readJson("evidence/canonical_replay.json");
const exposure = readJson("evidence/exposure_audit.json");
const graph = readJson("evidence/complete_graph.json");
const equivalence = readYaml("evidence/solution_equivalence_all_wins.yml");
const baseline = readJson("evidence/baseline_event_queries.json");

check(manifest.exact_version === exactVersion, "manifest exact version mismatch");
check(manifest.status === "frozen", "manifest is not frozen");
check(manifest.layout_sha256 === expectedHash, "manifest layout hash mismatch");
check(level.exact_version === exactVersion, "level exact version mismatch");
check(level.metadata?.publication_status === "frozen_exact", "level is not frozen_exact");
check(level.win?.type === "all_braziers_lit", "level win type mismatch");
check(level.layout.trimEnd() === layout.toString("utf8").trimEnd(), "level embedded layout mismatch");
check(solve.exact_version === exactVersion, "solve exact version mismatch");
check(solve.solver_result?.shortest_cost === 6, "solve shortest cost mismatch");
check(JSON.stringify(solve.canonical_inputs) === JSON.stringify(replay.inputs), "solve/replay inputs mismatch");
check(submission.exact_version === exactVersion, "submission exact version mismatch");
check(
  submission.hard_evidence?.solution_uniqueness?.result === "equivalent_variants_only",
  "submission uniqueness result mismatch",
);
check(submission.designer_self_verdict === "submit_for_independent_review", "designer verdict mismatch");

check(replay.replay?.completed === true, "canonical replay incomplete");
check(replay.replay?.executedSteps === 6, "canonical replay step count mismatch");
check(replay.steps?.every((step: { legal: boolean }) => step.legal), "canonical replay has illegal step");
check(replay.final?.isWin === true, "canonical replay does not win");
const replayEvents = replay.steps.flatMap((step: { events: string[] }) => step.events);
for (const required of [
  "roll_candle:candle#single2:d2",
  "extinguish_by_candle_body:candle#single2",
  "shrink:candle#1:len1",
  "shrink_ignite:candle#single3",
  "push_axis:candle#single3",
  "light_brazier:6,1",
  "win_all_braziers_lit",
]) {
  check(replayEvents.includes(required), `canonical replay missing ${required}`);
}

check(exposure.level?.layout_sha256 === expectedHash, "exposure layout hash mismatch");
check(exposure.graph?.status === "complete", "exposure graph incomplete");
check(exposure.graph?.reachable_state_count === 3619, "exposure state count mismatch");
check(exposure.graph?.legal_transition_count === 9424, "exposure edge count mismatch");
check(exposure.graph?.win_state_count === 3, "exposure win count mismatch");
check(exposure.verdict === "pass", "exposure verdict is not pass");
check(exposure.forbidden_hits?.length === 0, "exposure has forbidden hits");

check(graph.exact_version === exactVersion, "complete graph exact version mismatch");
check(graph.layout_sha256 === expectedHash, "complete graph hash mismatch");
check(graph.status === "complete", "complete graph status mismatch");
check(graph.reachable_state_count === 3619, "complete graph state count mismatch");
check(graph.legal_transition_count === 9424, "complete graph edge count mismatch");
check(graph.winning_state_count === 3, "complete graph win count mismatch");

check(equivalence.exact_version === exactVersion, "equivalence exact version mismatch");
check(equivalence.status === "supported_productive_causal_equivalence", "equivalence unsupported");
check(equivalence.checks?.all_terminal_wins_accept === true, "not all terminal wins accept");
check(equivalence.checks?.bad_winning_product_state_count === 0, "bad winning product exists");
check(equivalence.checks?.significant_non_milestone_edge_count === 0, "extra significant win edge exists");
check(equivalence.checks?.unexpected_milestone_companion_count === 0, "unexpected milestone companion exists");
check(equivalence.checks?.win_coaccessible_cyclic_component_count === 0, "winning SCC cycle exists");
check(
  baseline.required_event_cut_checks?.every(
    (item: { avoiding_win_exists: boolean }) => item.avoiding_win_exists === false,
  ),
  "required event avoidance win exists",
);
check(
  baseline.support_lock_after_preparation?.later_significant_support_edge_count_on_some_winning_path === 0,
  "support has later winning-path event",
);
check(baseline.early_move_a_counterfactual?.endpoint_can_reach_win === false, "early A branch can win");
check(
  baseline.missed_receiver_window_counterfactual?.endpoint_can_reach_win === false,
  "missed B window can recover",
);
check(
  baseline.post_transfer_other_object_counterfactual?.endpoint_can_reach_win === false,
  "post-transfer other object branch can recover",
);

const mutationExpectations: Array<[string, number, number, number, string]> = [
  ["cf_support_removed_graph.json", 550, 1444, 3, "pass"],
  ["cf_source_burnout_graph.json", 555, 1469, 0, "pass"],
  ["cf_source_unlit_graph.json", 241, 591, 0, "pass"],
  ["cf_source_long_graph.json", 4359, 11320, 6, "fail"],
  ["cf_consumer_shifted_graph.json", 10936, 28475, 0, "pass"],
];
for (const [name, states, edges, wins, verdict] of mutationExpectations) {
  const mutation = JSON.parse(
    fs.readFileSync(path.join(evidenceRoot, "counterfactuals", name), "utf8"),
  );
  check(mutation.graph?.status === "complete", `${name}: graph incomplete`);
  check(mutation.graph?.reachable_state_count === states, `${name}: state count mismatch`);
  check(mutation.graph?.legal_transition_count === edges, `${name}: edge count mismatch`);
  check(mutation.graph?.win_state_count === wins, `${name}: win count mismatch`);
  check(mutation.verdict === verdict, `${name}: exposure verdict mismatch`);
}

for (const ref of [
  manifest.layout_ref,
  manifest.level_ref,
  manifest.solve_instance_ref,
  manifest.submission_packet_ref,
  ...manifest.evidence_refs,
  submission.hard_evidence.solve_instance_ref,
  submission.hard_evidence.canonical_replay_ref,
  ...submission.hard_evidence.solution_uniqueness.evidence_refs,
  ...submission.hard_evidence.bypass_refs,
  ...submission.hard_evidence.identity_counterfactual_refs,
]) {
  check(typeof ref === "string" && fs.existsSync(path.join(repoRoot, ref)), `missing ref: ${ref}`);
}

const gatePath = path.resolve(
  "prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/designer/candidate_design_001/pre_exact_gate.yml",
);
const gateText = fs.readFileSync(gatePath, "utf8");
check(!gateText.includes("status: pending"), "pre-exact gate still contains pending status");
check(gateText.includes(`exact_version: ${exactVersion}`), "pre-exact gate exact mismatch");

const report = {
  schema_version: 1,
  exact_version: exactVersion,
  verified_at: "2026-07-26",
  status: failures.length === 0 ? "pass" : "fail",
  checks: {
    yaml_files_parsed: files.filter((file) => file.endsWith(".yml")).length,
    json_files_parsed: files.filter((file) => file.endsWith(".json")).length,
    layout_sha256: layoutHash,
    canonical_steps: replay.replay.executedSteps,
    graph: { states: 3619, edges: 9424, winning_states: 3 },
    exposure: { verdict: exposure.verdict, forbidden_hits: exposure.forbidden_hits.length },
    all_required_events_are_win_cuts: true,
    all_winning_paths_productively_causally_equivalent: true,
    counterfactual_complete_graphs_checked: mutationExpectations.length,
  },
  failures,
};
fs.writeFileSync(
  path.join(evidenceRoot, "verification.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (failures.length > 0) process.exitCode = 1;

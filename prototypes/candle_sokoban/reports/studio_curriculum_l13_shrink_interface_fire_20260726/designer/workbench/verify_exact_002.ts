import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const repoRoot = path.resolve(".");
const candidateId = "CANDLE_CURRICULUM_L13_001";
const exactVersion = "CANDLE_CURRICULUM_L13_001_exact_002";
const expectedHash = "9cbc87a1177c5168f65d42fe5a0a6cb23efad0c2b7993b747c517f3b271e15eb";
const solveInstanceRef =
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/solve_instance.yml`;
const exactRoot = path.resolve(
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}`,
);
const evidenceRoot = path.join(exactRoot, "evidence");
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

const filesBeforeVerification = walk(exactRoot).filter(
  (file) => path.basename(file) !== "verification.json",
);
for (const file of filesBeforeVerification.filter((candidate) => candidate.endsWith(".yml"))) {
  try {
    YAML.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    failures.push(`YAML parse failed: ${path.relative(exactRoot, file)}: ${String(error)}`);
  }
}
for (const file of filesBeforeVerification.filter((candidate) => candidate.endsWith(".json"))) {
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
const exposureRaw = readJson("evidence/exposure_audit_raw.json");
const graph = readJson("evidence/complete_graph.json");
const family = readJson("evidence/solution_family.json");
const equivalenceRaw = readJson("evidence/solution_equivalence_all_wins.json");
const equivalence = readYaml("evidence/solution_equivalence_all_wins.yml");
const scc = readJson("evidence/scc_raw.json");
const baseline = readJson("evidence/baseline_event_queries.json");
const mutationSummary = readJson("evidence/mutation_graph_summary.json");
const objectParticipation = readYaml("evidence/object_participation.yml");
const counterfactuals = readYaml("evidence/counterfactuals.yml");
const playerReread = readYaml("evidence/player_reread.yml");
const provenanceIndex = readYaml("evidence/provenance_index.yml");

check(manifest.candidate_id === candidateId, "manifest candidate mismatch");
check(manifest.exact_version === exactVersion, "manifest exact mismatch");
check(manifest.revision_basis === "CANDLE_CURRICULUM_L13_001_exact_001", "revision basis mismatch");
check(manifest.status === "frozen", "manifest is not frozen");
check(manifest.layout_sha256 === expectedHash, "manifest layout hash mismatch");
check(level.exact_version === exactVersion, "level exact mismatch");
check(level.metadata?.candidate_id === candidateId, "level candidate mismatch");
check(level.metadata?.publication_status === "frozen_exact", "level is not frozen_exact");
check(level.win?.type === "all_braziers_lit", "level win type mismatch");
check(level.layout.trimEnd() === layout.toString("utf8").trimEnd(), "embedded layout mismatch");
check(solve.candidate_id === candidateId, "solve candidate mismatch");
check(solve.exact_version === exactVersion, "solve exact mismatch");
check(solve.layout_sha256 === expectedHash, "solve layout hash mismatch");
check(solve.solver_result?.shortest_cost === 6, "solve shortest cost mismatch");
check(submission.candidate_id === candidateId, "submission candidate mismatch");
check(submission.exact_version === exactVersion, "submission exact mismatch");
check(submission.designer_self_verdict === "submit_for_independent_review", "designer verdict mismatch");

function checkMainProvenance(value: any, name: string) {
  check(value.candidate_id === candidateId, `${name}: candidate mismatch`);
  check(value.exact_version === exactVersion, `${name}: exact mismatch`);
  check(
    value.layout_sha256 === expectedHash ||
      value.source_layout_sha256 === expectedHash ||
      value.source_exact_layout_sha256 === expectedHash,
    `${name}: layout digest mismatch`,
  );
  check(value.solve_instance_ref === solveInstanceRef, `${name}: solve ref mismatch`);
  if (value.provenance) {
    check(value.provenance.candidate_id === candidateId, `${name}: provenance candidate mismatch`);
    check(value.provenance.exact_version === exactVersion, `${name}: provenance exact mismatch`);
    check(value.provenance.solve_instance_ref === solveInstanceRef, `${name}: provenance solve mismatch`);
  }
}
for (const [name, value] of [
  ["canonical_replay", replay],
  ["exposure_audit", exposure],
  ["complete_graph", graph],
  ["solution_family", family],
  ["solution_equivalence_raw", equivalenceRaw],
  ["solution_equivalence_summary", equivalence],
  ["scc_raw", scc],
  ["baseline_event_queries", baseline],
  ["mutation_graph_summary", mutationSummary],
  ["object_participation", objectParticipation],
  ["counterfactuals", counterfactuals],
  ["player_reread", playerReread],
  ["provenance_index", provenanceIndex],
] as Array<[string, any]>) {
  checkMainProvenance(value, name);
}

check(JSON.stringify(solve.canonical_inputs) === JSON.stringify(replay.inputs), "solve/replay input mismatch");
check(replay.replay?.completed === true, "canonical replay incomplete");
check(replay.replay?.executedSteps === 6, "canonical step count mismatch");
check(replay.steps?.every((step: { legal: boolean }) => step.legal), "canonical has illegal step");
check(replay.final?.isWin === true, "canonical does not win");
const replayEvents = replay.steps.flatMap((step: { events: string[] }) => step.events);
for (const event of [
  "roll_candle:candle#single2:d2",
  "extinguish_by_candle_body:candle#single2",
  "shrink:candle#1:len1",
  "shrink_ignite:candle#single3",
  "push_axis:candle#single3",
  "light_brazier:6,1",
  "win_all_braziers_lit",
]) {
  check(replayEvents.includes(event), `canonical missing ${event}`);
}

check(exposure.exact_version === exactVersion, "enriched exposure exact is null/mismatch");
check(exposureRaw.exact_version === exactVersion, "raw exposure exact is null/mismatch");
check(exposure.graph?.status === "complete", "exposure graph incomplete");
check(exposure.graph?.reachable_state_count === 3619, "exposure state count mismatch");
check(exposure.graph?.legal_transition_count === 9424, "exposure edge count mismatch");
check(exposure.graph?.win_state_count === 3, "exposure win count mismatch");
check(exposure.verdict === "pass", "exposure does not pass");
check(exposure.forbidden_hits?.length === 0, "exposure forbidden hits exist");

check(graph.status === "complete", "complete graph status mismatch");
check(graph.reachable_state_count === 3619, "complete graph state count mismatch");
check(graph.legal_transition_count === 9424, "complete graph edge count mismatch");
check(graph.winning_state_count === 3, "complete graph win count mismatch");
check(equivalence.status === "supported_productive_causal_equivalence", "equivalence unsupported");
check(equivalence.checks?.all_terminal_wins_accept === true, "not all terminal wins accept");
check(equivalence.checks?.bad_winning_product_state_count === 0, "bad winning product exists");
check(equivalence.checks?.significant_non_milestone_edge_count === 0, "extra significant win edge exists");
check(equivalence.checks?.unexpected_milestone_companion_count === 0, "unexpected milestone companion exists");
check(equivalence.checks?.win_coaccessible_cyclic_component_count === 0, "winning SCC cycle exists");
check(scc.node_component?.length === 28, "SCC node count mismatch");
check(scc.components?.length === 28, "SCC component count mismatch");
check(
  baseline.required_event_cut_checks?.every(
    (item: { avoiding_win_exists: boolean }) => item.avoiding_win_exists === false,
  ),
  "required event avoidance win exists",
);
check(!JSON.stringify(baseline).includes("WORK_13"), "baseline still carries WORK_13 provenance");
check(baseline.early_move_a_counterfactual?.endpoint_can_reach_win === false, "early A can win");
check(
  baseline.missed_receiver_window_counterfactual?.endpoint_can_reach_win === false,
  "missed receiver window can recover",
);
check(
  baseline.post_transfer_other_object_counterfactual?.endpoint_can_reach_win === false,
  "post-transfer other operation can recover",
);

const mutationExpectations: Array<[string, string, number, number, number, string]> = [
  ["cf_support_removed_graph.json", "support_removed", 550, 1444, 3, "pass"],
  ["cf_source_burnout_graph.json", "source_burnout", 555, 1469, 0, "pass"],
  ["cf_source_unlit_graph.json", "source_unlit", 241, 591, 0, "pass"],
  ["cf_source_long_graph.json", "source_long", 4359, 11320, 6, "fail"],
  ["cf_consumer_shifted_graph.json", "consumer_shifted", 10936, 28475, 0, "pass"],
];
for (const [name, id, states, edges, wins, verdict] of mutationExpectations) {
  const mutation = readJson(`evidence/counterfactuals/${name}`);
  check(mutation.candidate_id === candidateId, `${name}: candidate mismatch`);
  check(mutation.exact_version === exactVersion, `${name}: exact mismatch`);
  check(mutation.source_exact_layout_sha256 === expectedHash, `${name}: source digest mismatch`);
  check(mutation.solve_instance_ref === solveInstanceRef, `${name}: solve mismatch`);
  check(mutation.counterfactual_id === id, `${name}: counterfactual id mismatch`);
  check(mutation.graph?.status === "complete", `${name}: graph incomplete`);
  check(mutation.graph?.reachable_state_count === states, `${name}: state mismatch`);
  check(mutation.graph?.legal_transition_count === edges, `${name}: edge mismatch`);
  check(mutation.graph?.win_state_count === wins, `${name}: win mismatch`);
  check(mutation.verdict === verdict, `${name}: verdict mismatch`);
}

const gapReplay = readJson("evidence/counterfactuals/receiver_one_cell_gap/replay.json");
const gapGraph = readJson("evidence/counterfactuals/receiver_one_cell_gap/complete_graph.json");
const gapIdentity = readJson("evidence/counterfactuals/receiver_one_cell_gap/identity_analysis.json");
for (const [name, value] of [
  ["gap replay", gapReplay],
  ["gap graph", gapGraph],
  ["gap identity", gapIdentity],
] as Array<[string, any]>) {
  check(value.candidate_id === candidateId, `${name}: candidate mismatch`);
  check(value.exact_version === exactVersion, `${name}: exact mismatch`);
  check(value.source_exact_layout_sha256 === expectedHash, `${name}: source digest mismatch`);
  check(value.solve_instance_ref === solveInstanceRef, `${name}: solve mismatch`);
  check(value.counterfactual_id === "receiver_one_cell_gap", `${name}: id mismatch`);
  check(
    value.counterfactual_layout_sha256 ===
      "8c2dbc00cbc48814d70ccba2e38103a620ab8ffec48df83374fa1eac7bca0abd",
    `${name}: counterfactual digest mismatch`,
  );
}
check(gapReplay.steps[4]?.events.includes("shrink:candle#1:len2"), "gap replay lacks source shrink");
check(!gapReplay.steps[4]?.events.some((event: string) => event.startsWith("shrink_ignite:")), "gap replay has shrink_ignite");
check(gapReplay.steps[5]?.events.includes("ignite_from_wick:candle#2:4,2"), "gap replay lacks ordinary ignition");
check(gapGraph.graph?.status === "complete", "gap graph incomplete");
check(gapGraph.graph?.reachable_state_count === 39007, "gap graph state mismatch");
check(gapGraph.graph?.legal_transition_count === 120795, "gap graph edge mismatch");
check(gapGraph.graph?.win_state_count === 22, "gap graph win mismatch");
check(gapIdentity.identity_test?.avoiding_winning_path_exists === true, "gap avoiding win missing");
check(gapIdentity.identity_test?.required_ordinary_event === "ignite_from_wick:candle#2:4,2", "gap ordinary event mismatch");
check(gapIdentity.identity_test?.cost === 7, "gap identity witness cost mismatch");

for (const rawPath of filesBeforeVerification.filter((file) => file.endsWith("_audit_raw.json"))) {
  const raw = JSON.parse(fs.readFileSync(rawPath, "utf8"));
  check(raw.exact_version === exactVersion, `${path.relative(exactRoot, rawPath)}: raw exact null/mismatch`);
  check(raw.graph?.status === "complete", `${path.relative(exactRoot, rawPath)}: raw graph incomplete`);
}

for (const ref of [
  manifest.layout_ref,
  manifest.level_ref,
  manifest.solve_instance_ref,
  manifest.submission_packet_ref,
  manifest.provenance_index_ref,
  ...manifest.evidence_refs,
  submission.hard_evidence.solve_instance_ref,
  submission.hard_evidence.canonical_replay_ref,
  submission.hard_evidence.provenance.provenance_index_ref,
  ...submission.hard_evidence.solution_uniqueness.evidence_refs,
  ...submission.hard_evidence.bypass_refs,
  ...submission.hard_evidence.identity_counterfactual_refs,
]) {
  check(typeof ref === "string" && fs.existsSync(path.join(repoRoot, ref)), `missing ref: ${String(ref)}`);
}
for (const ref of provenanceIndex.major_artifacts.map((item: { ref: string }) => item.ref)) {
  check(fs.existsSync(path.join(evidenceRoot, ref)), `missing provenance-index artifact: ${ref}`);
}
for (const ref of provenanceIndex.receiver_one_cell_gap_whitelist_artifacts.refs) {
  check(fs.existsSync(path.join(evidenceRoot, ref)), `missing gap whitelist artifact: ${ref}`);
}

for (const file of filesBeforeVerification.filter(
  (candidate) =>
    candidate.endsWith(".json") || candidate.endsWith(".yml") || candidate.endsWith(".md"),
)) {
  if (path.basename(file) === "manifest.yml") continue;
  const text = fs.readFileSync(file, "utf8");
  check(!text.includes("CANDLE_CURRICULUM_L13_001_WORK_13"), `${path.relative(exactRoot, file)}: contains WORK_13`);
}

const report = {
  schema_version: "candle_exact_verification.v2",
  candidate_id: candidateId,
  exact_version: exactVersion,
  layout_sha256: layoutHash,
  solve_instance_ref: solveInstanceRef,
  provenance: {
    candidate_id: candidateId,
    exact_version: exactVersion,
    layout_sha256: layoutHash,
    solve_instance_ref: solveInstanceRef,
  },
  verified_at: "2026-07-26",
  status: failures.length === 0 ? "pass" : "fail",
  checks: {
    yaml_files_parsed: filesBeforeVerification.filter((file) => file.endsWith(".yml")).length,
    json_files_parsed: filesBeforeVerification.filter((file) => file.endsWith(".json")).length,
    main_provenance_artifacts_checked: provenanceIndex.major_artifacts.length,
    raw_audits_exact_bound: filesBeforeVerification.filter((file) => file.endsWith("_audit_raw.json")).length,
    canonical_steps: replay.replay.executedSteps,
    graph: { states: 3619, edges: 9424, winning_states: 3 },
    exposure: { verdict: exposure.verdict, forbidden_hits: exposure.forbidden_hits.length },
    scc: { nodes: scc.node_component.length, components: scc.components.length },
    all_required_events_are_win_cuts: true,
    all_winning_paths_productively_causally_equivalent: true,
    complete_mutation_graphs_checked: mutationExpectations.length,
    receiver_one_cell_gap: {
      raw_replay_checked: true,
      complete_graph: { states: 39007, edges: 120795, winning_states: 22 },
      ordinary_ignition_avoiding_win_checked: true,
    },
  },
  failures,
};
fs.writeFileSync(
  path.join(evidenceRoot, "verification.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (failures.length > 0) process.exitCode = 1;

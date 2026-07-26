import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { parse as parseYaml } from "yaml";

const [exactRoot] = process.argv.slice(2);
if (!exactRoot) throw new Error("usage: node validate_exact_001.mjs <exact-root>");

const failures = [];
const checks = [];
function check(name, condition, observed) {
  checks.push({ name, pass: Boolean(condition), observed });
  if (!condition) failures.push(name);
}
function filesUnder(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(root, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  });
}
function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const files = filesUnder(exactRoot).filter((file) => !file.endsWith("self_check_report.json"));
for (const file of files.filter((file) => /\.ya?ml$/i.test(file))) {
  try {
    parseYaml(fs.readFileSync(file, "utf8"));
    check(`yaml_parse:${path.relative(exactRoot, file)}`, true, "parsed");
  } catch (error) {
    check(`yaml_parse:${path.relative(exactRoot, file)}`, false, error.message);
  }
}
for (const file of files.filter((file) => /\.json$/i.test(file))) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
    check(`json_parse:${path.relative(exactRoot, file)}`, true, "parsed");
  } catch (error) {
    check(`json_parse:${path.relative(exactRoot, file)}`, false, error.message);
  }
}

const layoutPath = path.join(exactRoot, "layout.txt");
const manifest = parseYaml(fs.readFileSync(path.join(exactRoot, "exact_manifest.yml"), "utf8"));
const solve = parseYaml(fs.readFileSync(path.join(exactRoot, "solve_instance.yml"), "utf8"));
const familyAccount = parseYaml(fs.readFileSync(path.join(exactRoot, "solution_family_account.yml"), "utf8"));
const submission = parseYaml(fs.readFileSync(path.join(exactRoot, "submission_packet.yml"), "utf8"));
const exposure = JSON.parse(fs.readFileSync(path.join(exactRoot, "complete_graph_exposure.json"), "utf8"));
const family = JSON.parse(fs.readFileSync(path.join(exactRoot, "solution_family_report.json"), "utf8"));
const canonical = fs.readFileSync(path.join(exactRoot, "canonical_replay.md"), "utf8");
const reverse = fs.readFileSync(path.join(exactRoot, "reverse_order_replay.md"), "utf8");
const conformance = fs.readFileSync(path.join(exactRoot, "runtime_conformance.md"), "utf8");

check("layout_sha256_manifest", sha256(layoutPath) === manifest.digests.layout_sha256, sha256(layoutPath));
check("layout_sha256_exposure", sha256(layoutPath) === exposure.level.layout_sha256, exposure.level.layout_sha256);
check("canonical_sha256", sha256(path.join(exactRoot, "canonical_replay.md")) === manifest.digests.canonical_replay_sha256, sha256(path.join(exactRoot, "canonical_replay.md")));
check("exposure_sha256", sha256(path.join(exactRoot, "complete_graph_exposure.json")) === manifest.digests.complete_graph_exposure_sha256, sha256(path.join(exactRoot, "complete_graph_exposure.json")));
check("family_sha256", sha256(path.join(exactRoot, "solution_family_report.json")) === manifest.digests.solution_family_report_sha256, sha256(path.join(exactRoot, "solution_family_report.json")));
check("exact_version", exposure.exact_version === "exact_001" && family.version_ref === "exact_001", { exposure: exposure.exact_version, family: family.version_ref });
check("normal_win", exposure.level.win_condition.type === "all_braziers_lit", exposure.level.win_condition.type);
check("exposure_complete_pass", exposure.graph.status === "complete" && exposure.verdict === "pass" && exposure.forbidden_hits.length === 0, { graph: exposure.graph.status, verdict: exposure.verdict, forbidden: exposure.forbidden_hits.length });
check("graph_counts", exposure.graph.reachable_state_count === 45446 && exposure.graph.legal_transition_count === 157249 && exposure.graph.win_state_count === 5, exposure.graph);
check("canonical_solver", solve.solver_result.found === true && solve.solver_result.search_scope === "complete" && solve.solver_result.shortest_cost === 14 && solve.canonical_inputs.length === 14, solve.solver_result);
check("canonical_replay", canonical.includes("- Completed: yes") && canonical.includes("- Legal through step: 14") && canonical.includes("- Win: yes") && canonical.includes("roll_reignite_after_extinguish:candle#1:d2->d6") && canonical.includes("win_all_braziers_lit"), "completed/legal/core/win markers");
check("reverse_replay", reverse.includes("- Completed: yes") && reverse.includes("- Legal through step: 14") && reverse.includes("- Win: no") && reverse.includes("roll_intermediate_extinguish:candle#1:d6") && !reverse.includes("ignite:candle#1"), "completed/legal/reverse-unlit markers");
check("runtime_conformance_core", ["adapter_registered", "parse_render_smoke", "expected_trace_replay", "global_countdown_semantics", "mechanic_exposure_hard_gate", "solver_smoke", "graph_smoke", "layout_analyzer_smoke"].every((name) => conformance.includes(`| ${name} | pass |`)), "core checks pass; unavailable generation/export tools only warn");
check("family_identity", family.baseline_win_reachable === true && family.all_identity_events_mandatory === true && family.all_order_checks_pass === true, { baseline: family.baseline_win_reachable, mandatory: family.all_identity_events_mandatory, order: family.all_order_checks_pass });
check("family_occurrences", family.winning_path_occurrence_counts.filter((entry) => entry.name !== "axis_push").every((entry) => JSON.stringify(entry.winning_path_occurrence_counts) === JSON.stringify(entry.name === "bottom_stage_d4" ? [0] : [1])), family.winning_path_occurrence_counts);
check("family_account", familyAccount.result === "equivalent_variants_only" && familyAccount.search_scope === "complete", { result: familyAccount.result, scope: familyAccount.search_scope });
check("submission_verdict", submission.designer_self_verdict === "submit_for_independent_review", submission.designer_self_verdict);
check("submission_uniqueness", submission.hard_evidence.solution_uniqueness.result === "equivalent_variants_only" && submission.hard_evidence.solution_uniqueness.search_scope === "complete", submission.hard_evidence.solution_uniqueness);

const cfRoot = path.join(exactRoot, "counterfactuals");
const cf = Object.fromEntries(["remove_wall", "remove_source", "move_bottom_consumer_off_socket", "prelight_bottom_consumer", "remove_top_consumer", "remove_bottom_consumer", "remove_x2_stoppers", "remove_x8_stoppers"].map((name) => [name, fs.readFileSync(path.join(cfRoot, `${name}_analysis.md`), "utf8")]));
check("cf_remove_wall", cf.remove_wall.includes("- Found: yes") && cf.remove_wall.includes("- Cost: 14") && !cf.remove_wall.match(/^- Events:.*extinguish/m), "reverse constant-fire win");
check("cf_remove_source", cf.remove_source.includes("- Found: no") && cf.remove_source.includes("- Winning states: 0"), "complete no-win");
check("cf_move_consumer", cf.move_bottom_consumer_off_socket.includes("- Found: no") && cf.move_bottom_consumer_off_socket.includes("- Winning states: 0"), "complete no-win");
check("cf_prelight_bottom", cf.prelight_bottom_consumer.includes("- Cost: 10") && !cf.prelight_bottom_consumer.match(/^- Events:.*roll_candle:candle#1:d8/m), "win before core");
check("cf_remove_top", cf.remove_top_consumer.includes("- Cost: 4"), "near-output bypass");
check("cf_remove_bottom", cf.remove_bottom_consumer.includes("- Cost: 10") && !cf.remove_bottom_consumer.match(/^- Events:.*roll_candle:candle#1:d8/m), "win before core");
check("cf_remove_x2", cf.remove_x2_stoppers.includes("- Found: no") && cf.remove_x2_stoppers.includes("- Winning states: 0"), "complete no-win");
check("cf_remove_x8", cf.remove_x8_stoppers.includes("- Cost: 14") && cf.remove_x8_stoppers.match(/^- Events:.*roll_candle:candle#1:d9/m) && cf.remove_x8_stoppers.match(/^- Events:.*roll_last_brazier_before_endpoint:candle#1:d8/m), "consumer becomes pre-endpoint d8 of d9");

const exactRefPrefix = "prototypes/candle_sokoban/reports/studio_curriculum_l17_ordered_douse_reignite_20260726/candidate/versions/exact_001/";
const textArtifacts = files.filter((file) => /\.(?:md|json|ya?ml|txt)$/i.test(file));
const refs = new Set();
for (const file of textArtifacts) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(/prototypes\/candle_sokoban\/reports\/studio_curriculum_l17_ordered_douse_reignite_20260726\/candidate\/versions\/exact_001\/[A-Za-z0-9_./-]+/g)) {
    refs.add(match[0].replace(/[.,;:]$/, ""));
  }
}
const repoRoot = path.resolve(exactRoot, "../../../../../../..");
const missingRefs = [...refs].filter((ref) => !fs.existsSync(path.join(repoRoot, ref)));
check("internal_exact_refs_resolve", missingRefs.length === 0, missingRefs);
check("all_layout_rows_width_11", files.filter((file) => file.endsWith(".txt")).every((file) => fs.readFileSync(file, "utf8").trimEnd().split(/\r?\n/).every((line) => line.length === 11)), "all exact layouts rectangular 11 columns");

const result = {
  schema_version: 1,
  candidate_id: "CANDLE_CURRICULUM_L17_ORDERED_DOUSE_REIGNITE_001",
  exact_version: "exact_001",
  verdict: failures.length === 0 ? "pass" : "fail",
  checks,
  failures,
};
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (failures.length > 0) process.exit(1);

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { parse as parseYaml } from "yaml";

const [stagingRoot, finalRefRoot] = process.argv.slice(2);
if (!stagingRoot || !finalRefRoot) {
  throw new Error("usage: node validate_exact_staging.mjs <staging-root> <final-ref-root>");
}

const failures = [];
const checks = [];
function check(name, condition, observed) {
  checks.push({ name, pass: Boolean(condition), observed });
  if (!condition) failures.push(name);
}

function filesUnder(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(root, entry.name);
    return entry.isDirectory() ? filesUnder(fullPath) : [fullPath];
  });
}

const files = filesUnder(stagingRoot);
for (const file of files.filter((file) => /\.(?:yml|yaml)$/i.test(file))) {
  try {
    parseYaml(fs.readFileSync(file, "utf8"));
    check(`yaml_parse:${path.relative(stagingRoot, file)}`, true, "parsed");
  } catch (error) {
    check(`yaml_parse:${path.relative(stagingRoot, file)}`, false, error.message);
  }
}
for (const file of files.filter((file) => /\.json$/i.test(file))) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
    check(`json_parse:${path.relative(stagingRoot, file)}`, true, "parsed");
  } catch (error) {
    check(`json_parse:${path.relative(stagingRoot, file)}`, false, error.message);
  }
}

const layout = fs.readFileSync(path.join(stagingRoot, "layout.txt"), "utf8");
const exposure = JSON.parse(fs.readFileSync(path.join(stagingRoot, "complete_graph_exposure.json"), "utf8"));
const family = JSON.parse(fs.readFileSync(path.join(stagingRoot, "solution_family_report.json"), "utf8"));
const solve = parseYaml(fs.readFileSync(path.join(stagingRoot, "solve_instance.yml"), "utf8"));
const submission = parseYaml(fs.readFileSync(path.join(stagingRoot, "submission_packet.yml"), "utf8"));
const replay = fs.readFileSync(path.join(stagingRoot, "canonical_replay.md"), "utf8");
const prelit = fs.readFileSync(path.join(stagingRoot, "counterfactuals", "prelit_path_analysis.md"), "utf8");
const deleteQ = fs.readFileSync(path.join(stagingRoot, "counterfactuals", "delete_q_analysis.md"), "utf8");
const unaligned = fs.readFileSync(path.join(stagingRoot, "counterfactuals", "unaligned_a_replay.md"), "utf8");
const wrongQ = fs.readFileSync(path.join(stagingRoot, "counterfactuals", "q_wrong_direction_replay.md"), "utf8");

check("layout_sha256", crypto.createHash("sha256").update(layout).digest("hex") === exposure.level.layout_sha256, exposure.level.layout_sha256);
check("exact_version", exposure.exact_version === "exact_001", exposure.exact_version);
check("normal_win", exposure.level.win_condition.type === "all_braziers_lit", exposure.level.win_condition.type);
check("exposure_complete", exposure.graph.status === "complete", exposure.graph.status);
check("exposure_pass", exposure.verdict === "pass", exposure.verdict);
check("forbidden_hits_zero", exposure.forbidden_hits.length === 0, exposure.forbidden_hits.length);
check("graph_counts", exposure.graph.reachable_state_count === 17337 && exposure.graph.legal_transition_count === 54606 && exposure.graph.win_state_count === 13, exposure.graph);
check("canonical_input_count", solve.canonical_inputs.length === 23, solve.canonical_inputs.length);
check("canonical_replay_complete", replay.includes("- Completed: yes") && replay.includes("- Legal through step: 23") && replay.includes("win_all_braziers_lit"), "completed/legal/win markers");
check("family_baseline", family.baseline_win_reachable === true, family.baseline_win_reachable);
check("family_mandatory", family.all_mandatory_checks_pass === true, family.all_mandatory_checks_pass);
check("family_order", family.all_order_checks_pass === true, family.all_order_checks_pass);
check("family_endpoint_tail", family.all_q_endpoint_rolls_use_a_tail_6_6 === true && family.all_q_endpoint_rolls_use_only_expected_a_tail_forms === true, family.q_endpoint_tail_forms);
check("submission_verdict", submission.designer_self_verdict === "submit_for_independent_review", submission.designer_self_verdict);
check("uniqueness_claim", submission.hard_evidence.solution_uniqueness.result === "equivalent_variants_only" && submission.hard_evidence.solution_uniqueness.search_scope === "complete", submission.hard_evidence.solution_uniqueness);
check("prelit_identity_counterfactual", prelit.includes("- Found: yes") && prelit.includes("- Reachable states: 16107") && !prelit.includes("light_brazier:2,4"), "solvable complete; path-light event absent");
check("delete_q_counterfactual", deleteQ.includes("- Found: no") && deleteQ.includes("- Winning states: 0"), "complete no-win");
check("unaligned_counterfactual", unaligned.includes("- Status: illegal (roll_blocked)"), "roll_blocked");
check("wrong_q_counterfactual", wrongQ.includes("roll_candle:candle#2:d1") && wrongQ.includes("- Completed: yes") && wrongQ.includes("- Legal through step: 13") && wrongQ.includes("- Win: no") && !wrongQ.includes("ignite:candle#2"), "legal right roll; no Q ignite; nonwinning");

const textArtifacts = files.filter((file) => /\.(?:md|json|ya?ml|txt)$/i.test(file));
check("no_staging_refs", textArtifacts.every((file) => !fs.readFileSync(file, "utf8").includes("/designer/staging/exact_001")), "all artifact refs normalized");

const finalRefs = new Set();
for (const file of textArtifacts) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(/prototypes\/candle_sokoban\/reports\/studio_curriculum_l16_path_output_endpoint_20260726\/candidate\/versions\/exact_001\/[A-Za-z0-9_./-]+/g)) {
    finalRefs.add(match[0].replace(/[.,;:]$/, ""));
  }
}
const missingRefs = [...finalRefs].filter((ref) => {
  const relative = ref.slice(finalRefRoot.length + 1);
  return !fs.existsSync(path.join(stagingRoot, relative));
});
check("internal_exact_refs_resolve", missingRefs.length === 0, missingRefs);

const result = {
  schema_version: 1,
  candidate_id: "CANDLE_CURRICULUM_L16_PATH_OUTPUT_ENDPOINT_001",
  exact_version: "exact_001",
  verdict: failures.length === 0 ? "pass" : "fail",
  checks,
  failures,
};
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (failures.length > 0) process.exit(1);

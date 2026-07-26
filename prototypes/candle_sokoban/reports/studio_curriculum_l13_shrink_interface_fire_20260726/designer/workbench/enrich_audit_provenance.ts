import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2];
const outputPath = process.argv[3];
const candidateId = process.argv[4];
const exactVersion = process.argv[5];
const solveInstanceRef = process.argv[6];
const sourceExactLayoutSha256 = process.argv[7];
const artifactRole = process.argv[8];
const counterfactualId = process.argv[9] ?? null;
if (
  !inputPath ||
  !outputPath ||
  !candidateId ||
  !exactVersion ||
  !solveInstanceRef ||
  !sourceExactLayoutSha256 ||
  !artifactRole
) {
  throw new Error(
    "usage: npx tsx enrich_audit_provenance.ts <input.json> <output.json> <candidate-id> <exact-version> <solve-instance-ref> <source-exact-layout-sha256> <artifact-role> [counterfactual-id]",
  );
}

const audit = JSON.parse(fs.readFileSync(inputPath, "utf8"));
if (audit.exact_version !== exactVersion) {
  throw new Error(
    `raw audit exact mismatch: expected ${exactVersion}, got ${String(audit.exact_version)}`,
  );
}
if (audit.graph?.status !== "complete") {
  throw new Error(`raw audit graph is not complete: ${String(audit.graph?.status)}`);
}
if (
  audit.raw_graph?.nodes?.length !== audit.graph.reachable_state_count ||
  audit.raw_graph?.edges?.length !== audit.graph.legal_transition_count
) {
  throw new Error("raw audit graph counts do not match arrays");
}
if (artifactRole === "exact_exposure_audit" && audit.level?.layout_sha256 !== sourceExactLayoutSha256) {
  throw new Error("exact exposure audit layout digest does not match source exact");
}

const enriched = {
  ...audit,
  candidate_id: candidateId,
  exact_version: exactVersion,
  solve_instance_ref: solveInstanceRef,
  source_exact_layout_sha256: sourceExactLayoutSha256,
  layout_sha256: audit.level?.layout_sha256,
  counterfactual_layout_sha256:
    artifactRole === "exact_exposure_audit" ? null : audit.level?.layout_sha256,
  artifact_role: artifactRole,
  counterfactual_id: counterfactualId,
  provenance: {
    candidate_id: candidateId,
    exact_version: exactVersion,
    layout_sha256:
      artifactRole === "exact_exposure_audit"
        ? sourceExactLayoutSha256
        : audit.level?.layout_sha256,
    source_exact_layout_sha256: sourceExactLayoutSha256,
    counterfactual_layout_sha256:
      artifactRole === "exact_exposure_audit" ? null : audit.level?.layout_sha256,
    solve_instance_ref: solveInstanceRef,
    raw_artifact_ref: path.resolve(inputPath),
  },
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(enriched, null, 2)}\n`);
process.stdout.write(
  `${JSON.stringify(
    {
      candidate_id: candidateId,
      exact_version: exactVersion,
      artifact_role: artifactRole,
      counterfactual_id: counterfactualId,
      source_exact_layout_sha256: sourceExactLayoutSha256,
      artifact_layout_sha256: audit.level?.layout_sha256,
      graph_status: audit.graph.status,
      states: audit.graph.reachable_state_count,
      edges: audit.graph.legal_transition_count,
      wins: audit.graph.win_state_count,
      verdict: audit.verdict,
      forbidden_hits: audit.forbidden_hits?.length,
    },
    null,
    2,
  )}\n`,
);

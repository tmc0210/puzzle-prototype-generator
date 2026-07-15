import { readFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

const studioRoot = import.meta.dirname;
const draft = YAML.parse(await readFile(path.join(studioRoot, "delivery_integration_draft.yml"), "utf8"));
const reviewRef = "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/review/independent_level_review_attempt_2.yml";
const actionRef = "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/review/designer_action_2.yml";
const workflowRef = "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/pre_submission_workflow_record.yml";
const verificationRef = "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/delivery_verification.json";
const versions = new Map([
  ["RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL", "v5"],
  ["RA_FRESH_2026_07_15_FORGED_C_SYNC", "v6"],
  ["RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK", "v1"],
]);

const aggregate = structuredClone(draft.pre_submission_workflow_aggregate);
for (const entry of aggregate.entries) {
  entry.reviewed_exact_version = versions.get(entry.candidate_id);
}
const workflow = {
  schema_version: 1,
  document_kind: "reality_anchor_pre_submission_workflow_record",
  portfolio_id: aggregate.portfolio_id,
  latest_full_batch_review_ref: reviewRef,
  latest_full_batch_review_status: "survive_to_pre_submission_checks",
  designer_action_ref: actionRef,
  tool_maturity_ref: aggregate.tool_maturity_ref,
  entries: aggregate.entries,
  delivery_verification_ref: verificationRef,
  overall_status: "completed",
  return_to_design_required: false,
};

const handoff = structuredClone(draft.human_handoff_draft);
for (const entry of handoff.entries) {
  entry.reviewed_exact_version = versions.get(entry.candidate_id);
  entry.independent_level_review_ref = reviewRef;
  entry.pre_submission_workflow_record_ref = workflowRef;
}
handoff.playable_delivery.level_source = "prototypes/reality_anchor/levels.yml";
handoff.playable_delivery.playable_queue = "prototypes/reality_anchor/playable_queue.yml";
handoff.playable_delivery.playable_build_status = "built";
handoff.playable_delivery.playable_ref = "prototypes/reality_anchor/playable/data.json";
handoff.delivery_verification_ref = verificationRef;

const files = [
  [path.join(studioRoot, "pre_submission_workflow_record.yml"), workflow],
  [path.join(studioRoot, "human_playtest_handoff.yml"), handoff],
] as const;

const patch = ["*** Begin Patch"];
for (const [filePath, value] of files) {
  patch.push(`*** Add File: ${filePath}`);
  for (const line of YAML.stringify(value, { lineWidth: 0 }).trimEnd().split("\n")) {
    patch.push(`+${line}`);
  }
}
patch.push("*** End Patch");
process.stdout.write(patch.join("\n"));

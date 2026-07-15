import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const candidateRef = path.join(
  repoRoot,
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/candidates/baseline/RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL_v5.txt",
);
const candidateText = await readFile(candidateRef, "utf8");
const cases = JSON.parse(await readFile(path.join(import.meta.dirname, "cases.json"), "utf8"));
const results = JSON.parse(await readFile(path.join(import.meta.dirname, "results.json"), "utf8"));
const baseCase = cases.cases.find((item: { id: string }) => item.id === "base_three_tip_sync_win");
if (!baseCase) throw new Error("missing base case");

const byId = new Map<string, any>(results.cases.map((item: any) => [item.id, item]));
const ids = [
  "base_three_tip_sync_win",
  "single_top_lock_retracts",
  "cf_missing_lower_tip",
  "cf_cut_lower_bridge",
  "cf_open_all_side_exits",
];
for (const id of ids) {
  if (!byId.has(id)) throw new Error(`missing result ${id}`);
}

const summary = {
  candidate_id: "RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL",
  exact_version: "v5",
  candidate_layout_ref: "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/candidates/baseline/RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL_v5.txt",
  candidate_layout_sha256: hash(candidateText),
  candidate_normalized_sha256: hash(candidateText.trimEnd()),
  base_case_normalized_sha256: hash(baseCase.layout),
  base_case_exact_normalized_match: candidateText.trimEnd() === baseCase.layout,
  all_case_dimensions: Object.fromEntries(cases.cases.map((item: any) => [
    item.id,
    {
      width: item.layout.split("\n")[0].length,
      height: item.layout.split("\n").length,
      rectangular: new Set(item.layout.split("\n").map((row: string) => row.length)).size === 1,
    },
  ])),
  extracted_outcomes: Object.fromEntries(ids.map((id) => {
    const item = byId.get(id)!;
    return [id, {
      stopped_at_illegal_action: item.stoppedAtIllegalAction,
      final_win: item.final.isWin,
      step_events: item.steps.map((step: any) => step.events),
      local_graph_status_as_reported: item.reachableFromInitial.status,
      local_graph_states: item.reachableFromInitial.reachableStates,
      local_graph_max_observed_depth: item.reachableFromInitial.maxObservedDepth,
      declared_max_explore_depth: item.budgets.maxExploreDepth,
    }];
  })),
  evidence_limits: [
    "mechanism-lab 的 local graph 使用 maxExploreDepth=20；本 manifest 不把它提升为无深度上限的全局图。",
    "cf_missing_lower_tip 与 cf_cut_lower_bridge 仅用于相同 canonical stroke 的窄反事实，不声明反事实版本全局无解。",
  ],
};

if (!summary.base_case_exact_normalized_match) throw new Error("base identity case does not match v5");
if (summary.candidate_layout_sha256 !== "79dcb407d4464dc53e839129afb4e511a7785166d99a8fa58ad093509c9bdee4") {
  throw new Error("candidate hash mismatch");
}
await writeFile(path.join(import.meta.dirname, "verification.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
console.log(JSON.stringify(summary, null, 2));

function hash(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

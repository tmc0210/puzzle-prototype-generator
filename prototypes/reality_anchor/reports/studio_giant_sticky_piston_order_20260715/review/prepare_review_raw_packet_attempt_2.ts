import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

const repoRoot = path.resolve(import.meta.dirname, "../../../../..");
const studioRel = "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715";
const studioRoot = path.join(repoRoot, studioRel);
const priorPath = path.join(studioRoot, "review/review_raw_packet_attempt_1.yml");
const outputPath = path.join(studioRoot, "review/review_raw_packet_attempt_2.yml");

const packet = YAML.parse(await readFile(priorPath, "utf8"));
packet.review_attempt_id = "RA_GIANT_STICKY_PISTON_ORDER_REVIEW_2";

const revisions = new Map([
  ["baseline", {
    candidateId: "RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL",
    version: "v5",
    layoutRel: `${studioRel}/candidates/baseline/RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL_v5.txt`,
    replayRel: "prototypes/reality_anchor/reports/input_replay_RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL_v5.json",
  }],
  ["application", {
    candidateId: "RA_FRESH_2026_07_15_FORGED_C_SYNC",
    version: "v6",
    layoutRel: `${studioRel}/candidates/application/RA_FRESH_2026_07_15_FORGED_C_SYNC_v6.txt`,
    replayRel: "prototypes/reality_anchor/reports/input_replay_RA_FRESH_2026_07_15_FORGED_C_SYNC_v6.json",
  }],
]);

for (const entry of packet.portfolio) {
  const revision = revisions.get(entry.slot);
  if (!revision) continue;
  const rawLayout = await readFile(path.join(repoRoot, revision.layoutRel), "utf8");
  const hash = createHash("sha256").update(rawLayout).digest("hex");
  entry.candidate_id = revision.candidateId;
  entry.exact_version = `${revision.version}_sha256_${hash}`;
  entry.solve_instance.layout = rawLayout.trimEnd();
  entry.canonical_solution.mechanically_derived_trace_ref = `${revision.replayRel}#/steps`;
}

packet.artifact_refs = packet.portfolio.flatMap((entry: any) => {
  const revision = revisions.get(entry.slot);
  if (revision) return [revision.layoutRel, revision.replayRel];
  return [
    `${studioRel}/candidates/challenge/RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK_v1.txt`,
    "prototypes/reality_anchor/reports/input_replay_RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK_v1.json",
  ];
});

await writeFile(outputPath, YAML.stringify(packet, { lineWidth: 0 }), "utf8");
console.log(path.relative(repoRoot, outputPath).replaceAll("\\", "/"));

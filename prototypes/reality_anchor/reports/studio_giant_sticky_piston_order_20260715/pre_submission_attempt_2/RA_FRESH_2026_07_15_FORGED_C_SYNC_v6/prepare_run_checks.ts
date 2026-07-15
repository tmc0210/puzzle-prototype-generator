import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const sourcePath = path.join(
  repoRoot,
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/pre_submission_attempt_1/RA_FRESH_2026_07_15_FORGED_C_SYNC_v5/run_checks.ts",
);
const outputPath = path.join(import.meta.dirname, "run_checks.ts");
const expectedSourceSha256 = "cfce3b53a913ff9dd536e4841a2e20b340c5e6e3458e27cd6eece1508b0a206e";
const source = await readFile(sourcePath, "utf8");
const sourceSha256 = createHash("sha256").update(source, "utf8").digest("hex");
if (sourceSha256 !== expectedSourceSha256) {
  throw new Error(`attempt_1 check source changed: ${sourceSha256}`);
}

const replacements: Array<[string, string]> = [
  ["RA_FRESH_2026_07_15_FORGED_C_SYNC_v5", "RA_FRESH_2026_07_15_FORGED_C_SYNC_v6"],
  ["9bfae9c5c1160d4088fc59c317c2bfef33bd77b7066bca23e19850fd867cb590", "31debfe814fda7a58cc198234445f2b0d58d8aba063fc8b473e3364bded03879"],
  ["pre_submission_attempt_1", "pre_submission_attempt_2"],
  ["exact_v5", "exact_v6"],
  ["reviewed v5", "successor v6"],
];
let migrated = source;
for (const [from, to] of replacements) {
  if (!migrated.includes(from)) throw new Error(`expected migration token missing: ${from}`);
  migrated = migrated.replaceAll(from, to);
}
if (migrated.includes("FORGED_C_SYNC_v5") || migrated.includes("attempt_1") || migrated.includes("exact_v5")) {
  throw new Error("stale v5/attempt_1 token remains in migrated check script");
}

await mkdir(import.meta.dirname, { recursive: true });
await writeFile(outputPath, migrated, "utf8");
const manifest = {
  sourcePath: path.relative(repoRoot, sourcePath).replaceAll("\\", "/"),
  sourceSha256,
  outputPath: path.relative(repoRoot, outputPath).replaceAll("\\", "/"),
  outputSha256: createHash("sha256").update(migrated, "utf8").digest("hex"),
  replacements: replacements.map(([from, to]) => ({ from, to })),
  scope: "same Reality Anchor pre-submission checks rebound to exact v6; no generic process/runtime changes",
};
await writeFile(path.join(import.meta.dirname, "script_migration_manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(JSON.stringify(manifest, null, 2));

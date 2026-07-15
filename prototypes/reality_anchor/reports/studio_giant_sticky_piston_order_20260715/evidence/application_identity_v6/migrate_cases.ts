import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

type LabCase = {
  id: string;
  variant: string;
  layout: string;
  [key: string]: unknown;
};

type LabDoc = {
  runId: string;
  title: string;
  notes: string;
  cases: LabCase[];
  [key: string]: unknown;
};

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const sourcePath = path.join(
  repoRoot,
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/evidence/application_identity/cases.yml",
);
const candidatePath = path.join(
  repoRoot,
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/candidates/application/RA_FRESH_2026_07_15_FORGED_C_SYNC_v6.txt",
);
const outputPath = path.join(import.meta.dirname, "cases.yml");
const expectedCandidateSha256 = "31debfe814fda7a58cc198234445f2b0d58d8aba063fc8b473e3364bded03879";

const trimRightTwoWallColumns = (layout: string): string => {
  const trailingNewline = layout.endsWith("\n");
  const rows = layout.trimEnd().split(/\r?\n/);
  for (const [index, row] of rows.entries()) {
    if (row.length !== 13 || !row.endsWith("##")) {
      throw new Error(`case row ${index} is not a 13-cell row ending in two walls: ${JSON.stringify(row)}`);
    }
  }
  const trimmed = rows.map((row) => row.slice(0, -2)).join("\n");
  return trailingNewline ? `${trimmed}\n` : trimmed;
};

const sourceText = await readFile(sourcePath, "utf8");
const source = YAML.parse(sourceText) as LabDoc;
const migrated: LabDoc = structuredClone(source);
migrated.runId = "application_forged_c_sync_v6";
migrated.title = "RA_FRESH_2026_07_15_FORGED_C_SYNC_v6 构造责任与双锁终局反事实";
migrated.notes =
  "由 v5 六个 case 机械删除每行末尾两格纯墙得到；内部坐标、对象、目标、起点和 actions 全部不变。";
migrated.cases = source.cases.map((entry) => ({
  ...entry,
  variant: entry.id === "base_three_sweeps_then_double_lock_win" ? "exact_v6" : entry.variant,
  layout: trimRightTwoWallColumns(entry.layout),
}));

const candidateText = await readFile(candidatePath, "utf8");
const candidateSha256 = createHash("sha256").update(candidateText, "utf8").digest("hex");
if (candidateSha256 !== expectedCandidateSha256) {
  throw new Error(`candidate hash mismatch: expected ${expectedCandidateSha256}, got ${candidateSha256}`);
}
const baseLayout = migrated.cases.find((entry) => entry.id === "base_three_sweeps_then_double_lock_win")?.layout;
if (baseLayout?.trimEnd() !== candidateText.trimEnd()) {
  throw new Error("migrated base case does not match the exact v6 candidate layout");
}

const manifest = {
  sourcePath: path.relative(repoRoot, sourcePath).replaceAll("\\", "/"),
  outputPath: path.relative(repoRoot, outputPath).replaceAll("\\", "/"),
  candidatePath: path.relative(repoRoot, candidatePath).replaceAll("\\", "/"),
  candidateSha256,
  transform: "for every case row: assert width=13 and suffix=##, then remove the final two wall cells",
  caseCount: migrated.cases.length,
  allActionListsUnchanged: migrated.cases.every((entry, index) =>
    JSON.stringify(entry.actions) === JSON.stringify(source.cases[index]?.actions)),
  allInternalRowsWidth11: migrated.cases.every((entry) =>
    entry.layout.trimEnd().split(/\r?\n/).every((row) => row.length === 11)),
  baseCaseMatchesExactV6: true,
};

await mkdir(import.meta.dirname, { recursive: true });
await writeFile(outputPath, YAML.stringify(migrated, { lineWidth: 0 }), "utf8");
await writeFile(path.join(import.meta.dirname, "migration_manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(JSON.stringify(manifest, null, 2));

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726/pre_submission/redundancy_checks";
const layoutRef = "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726/candidate/versions/CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_002/layout.txt";
const candidatesRef = "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726/pre_submission/redundancy_candidates.json";
const layout = (await readFile(layoutRef, "utf8")).trimEnd();
const report = JSON.parse(await readFile(candidatesRef, "utf8"));
const rows = layout.split(/\r?\n/);

const variants = [];
for (const candidate of report.candidates) {
  const operation = candidate.operations[0];
  const variantRows = rows.map((row) => [...row]);
  if (operation === "remove") {
    for (const { x, y } of candidate.cells) variantRows[y][x] = ".";
  } else if (operation === "wallify") {
    for (const { x, y } of candidate.cells) variantRows[y][x] = "#";
  } else if (operation === "trim") {
    if (!candidate.id.startsWith("outer_outline_band:left:")) {
      throw new Error(`unsupported trim candidate: ${candidate.id}`);
    }
    for (const row of variantRows) row.shift();
  } else {
    throw new Error(`unsupported operation: ${operation}`);
  }
  const slug = candidate.id.replace(/[^a-zA-Z0-9_-]+/g, "_");
  const outDir = `${root}/${slug}`;
  await mkdir(outDir, { recursive: true });
  const output = variantRows.map((row) => row.join("")).join("\n");
  await writeFile(`${outDir}/layout.txt`, `${output}\n`, "utf8");
  variants.push({
    candidate_id: candidate.id,
    kind: candidate.kind,
    operation,
    cells: candidate.cells,
    out_dir: outDir,
    layout_ref: `${outDir}/layout.txt`,
    coordinate_projection: operation === "trim" ? "trim_left_x_plus_1_to_reviewed" : "identity",
  });
}

await mkdir(path.dirname(`${root}/variants.json`), { recursive: true });
await writeFile(`${root}/variants.json`, `${JSON.stringify({ source_layout_ref: layoutRef, variants }, null, 2)}\n`, "utf8");

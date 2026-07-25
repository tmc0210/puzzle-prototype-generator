import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import {
  auditCandleExposure,
  loadCandleExposureSequence,
} from "../../../../../../src/prototypes/candle_sokoban/exposureAudit.js";

const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_wall_douse_reignite_timing_capstone_20260725",
);
const revisionRoot = path.join(taskRoot, "designer/workbench/revision_001");
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const sequencePath = path.resolve(
  "prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml",
);
const { sequence, raw: sequenceRaw } = loadCandleExposureSequence(sequencePath);
const index = JSON.parse(
  await readFile(path.join(revisionRoot, "counterfactual_index.json"), "utf8"),
) as {
  baseline_layout_ref: string;
  variants: Array<{
    id: string;
    layout_ref: string;
    settled_surrogate?: { layout_ref: string };
  }>;
};

await runAudit(
  "cropped_baseline",
  path.resolve(index.baseline_layout_ref),
  path.join(revisionRoot, "cropped_baseline_exposure_audit.json"),
  "revision_001_cropped_baseline",
);

for (const variant of index.variants) {
  const variantRoot = path.dirname(path.resolve(variant.layout_ref));
  await runAudit(
    variant.id,
    path.resolve(variant.layout_ref),
    path.join(variantRoot, "exposure_audit.json"),
    `revision_001_${variant.id}`,
  );
  if (variant.settled_surrogate) {
    const surrogateLayoutPath = path.resolve(variant.settled_surrogate.layout_ref);
    await runAudit(
      `${variant.id}_settled_surrogate`,
      surrogateLayoutPath,
      path.join(path.dirname(surrogateLayoutPath), "exposure_audit.json"),
      `revision_001_${variant.id}_settled_surrogate`,
    );
  }
}

async function runAudit(
  id: string,
  layoutPath: string,
  outputPath: string,
  exactVersion: string,
): Promise<void> {
  const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
  const level: LevelDoc = {
    id: `CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001_${id}`,
    title: id,
    global_burn_cycle: 5,
    layout,
    win: { type: "all_braziers_lit" },
  };
  try {
    const report = auditCandleExposure(pkg, level, sequence, sequenceRaw, {
      allowedExposureThrough: "shared_fire_and_reignition",
      exactVersion,
      maxStates: 500000,
      maxTransitions: 2000000,
    });
    await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    process.stdout.write(
      `${id} exposure=${report.verdict} graph=${report.graph.status} states=${report.graph.reachable_state_count} edges=${report.graph.legal_transition_count} wins=${report.graph.win_state_count} forbidden=${report.forbidden_hits.length}\n`,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const errorPath = outputPath.replace(/\.json$/u, "_error.json");
    await writeFile(
      errorPath,
      `${JSON.stringify(
        {
          schema_version: 1,
          candidate_id: "CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001",
          exact_version_basis: "v2",
          counterfactual_id: id,
          layout_ref: path.relative(path.resolve(), layoutPath).replaceAll("\\", "/"),
          exposure_status: "invalid_initial_contact",
          allowed_exposure_through: "shared_fire_and_reignition",
          error: message,
          interpretation:
            "官方 exposure audit 在 parseLevel 阶段拒绝该 literal counterfactual，因而没有可枚举的合法 exact 初态。",
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    process.stdout.write(`${id} exposure=invalid_initial_contact error=${message}\n`);
  }
}

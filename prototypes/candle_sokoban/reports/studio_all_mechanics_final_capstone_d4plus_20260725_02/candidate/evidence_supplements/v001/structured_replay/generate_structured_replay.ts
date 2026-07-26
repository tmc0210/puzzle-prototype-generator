import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { loadPrototypePackage } from "../../../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../../../src/workflows/inputSequenceReplay.js";

const repoRoot = path.resolve(process.cwd());
const taskRoot =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02";
const exactRoot = `${taskRoot}/candidate/versions/v001`;
const outputRoot = `${taskRoot}/candidate/evidence_supplements/v001/structured_replay`;
const assignmentRef = `${taskRoot}/assignments/designer_revision_002_structured_replay.yml`;
const candidateId = "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002";
const exactVersion = "v001";

const refs = {
  exactManifest: `${exactRoot}/artifact_manifest.yml`,
  layout: `${exactRoot}/layout.txt`,
  level: `${exactRoot}/level.yml`,
  solve: `${exactRoot}/solve_instance.yml`,
  canonicalMarkdown: `${exactRoot}/canonical_replay.md`,
  evidenceReview: `${taskRoot}/evidence/v001/recheck/evidence_review.yml`,
  generator: `${outputRoot}/generate_structured_replay.ts`,
  canonicalJson: `${outputRoot}/canonical_replay.json`,
  reproduction: `${outputRoot}/reproduction.json`,
  report: `${outputRoot}/structured_replay_report.yml`,
  supplementManifest: `${outputRoot}/supplement_manifest.yml`,
};

const resolveRef = (ref: string): string => path.resolve(repoRoot, ref);
const sha256 = (bytes: Uint8Array | string): string =>
  createHash("sha256").update(bytes).digest("hex");
const readBytes = (ref: string): Promise<Buffer> => readFile(resolveRef(ref));
const writeJson = async (ref: string, value: unknown): Promise<void> => {
  await writeFile(resolveRef(ref), `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const exactManifestBytes = await readBytes(refs.exactManifest);
const exactManifest = YAML.parse(exactManifestBytes.toString("utf8")) as {
  candidate_id: string;
  exact_version: string;
  artifacts: Array<{ file: string; bytes: number; sha256: string; role: string }>;
};
if (
  exactManifest.candidate_id !== candidateId ||
  exactManifest.exact_version !== exactVersion
) {
  throw new Error("v001 manifest identity mismatch");
}

const frozenArtifactVerification = [];
for (const artifact of exactManifest.artifacts) {
  const ref = `${exactRoot}/${artifact.file}`;
  const bytes = await readBytes(ref);
  const actualSha256 = sha256(bytes);
  const matches =
    bytes.length === artifact.bytes && actualSha256 === artifact.sha256;
  frozenArtifactVerification.push({
    ref,
    role: artifact.role,
    expected_bytes: artifact.bytes,
    actual_bytes: bytes.length,
    expected_sha256: artifact.sha256,
    actual_sha256: actualSha256,
    matches,
  });
  if (!matches) {
    throw new Error(`frozen v001 artifact mismatch: ${artifact.file}`);
  }
}

const layoutBytes = await readBytes(refs.layout);
const levelBytes = await readBytes(refs.level);
const solveBytes = await readBytes(refs.solve);
const canonicalMarkdownBytes = await readBytes(refs.canonicalMarkdown);
const evidenceReviewBytes = await readBytes(refs.evidenceReview);
const layout = layoutBytes.toString("utf8");
const levelSpec = YAML.parse(levelBytes.toString("utf8")) as {
  id: string;
  title: string;
  candidate_id: string;
  exact_version: string;
  layout_ref: string;
  layout_sha256: string;
  global_burn_cycle: number;
  win: LevelDoc["win"];
};
const solveSpec = YAML.parse(solveBytes.toString("utf8")) as {
  candidate_id: string;
  exact_version: string;
  canonical_solution: { cost: number; depth: number; inputs: string[] };
};

if (
  levelSpec.candidate_id !== candidateId ||
  levelSpec.exact_version !== exactVersion ||
  solveSpec.candidate_id !== candidateId ||
  solveSpec.exact_version !== exactVersion
) {
  throw new Error("level/solve candidate or exact mismatch");
}
if (levelSpec.layout_ref !== refs.layout) {
  throw new Error("level layout_ref does not bind the frozen layout");
}
const layoutSha256 = sha256(layoutBytes);
if (layoutSha256 !== levelSpec.layout_sha256) {
  throw new Error("layout digest mismatch");
}

const canonicalInputs = [...solveSpec.canonical_solution.inputs];
if (
  canonicalInputs.length !== solveSpec.canonical_solution.cost ||
  canonicalInputs.length !== solveSpec.canonical_solution.depth
) {
  throw new Error("canonical input count does not match frozen solve cost/depth");
}
const canonicalMarkdown = canonicalMarkdownBytes.toString("utf8");
const markdownInputLine = canonicalMarkdown
  .split(/\r?\n/)
  .find((line) => line.startsWith("- Inputs: "));
if (markdownInputLine !== `- Inputs: ${canonicalInputs.join(" ")}`) {
  throw new Error("canonical inputs differ from frozen canonical_replay.md");
}

const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = levelSpec.win ?? pkg.mechanic.win;
if (winCondition?.type !== "all_braziers_lit") {
  throw new Error("structured replay must use the frozen normal win condition");
}
const level: LevelDoc = {
  id: levelSpec.id,
  title: levelSpec.title,
  layout,
  global_burn_cycle: levelSpec.global_burn_cycle,
  win: winCondition,
};
const initial = adapter.parseLevel(level);
const execution = replayInputSequence(
  adapter,
  runtime,
  initial,
  canonicalInputs,
  { winCondition },
  winCondition,
);
const replayReport = buildInputSequenceReplayReport(
  {
    id: `${candidateId}_v001_canonical`,
    prototype: "candle_sokoban",
    layoutSource: refs.layout,
    layout,
    winCondition,
  },
  execution,
);

if (
  !replayReport.replay.completed ||
  replayReport.replay.executedSteps !== canonicalInputs.length ||
  replayReport.replay.legalThroughStep !== canonicalInputs.length ||
  replayReport.steps.some((step) => !step.legal) ||
  !replayReport.final.isWin
) {
  throw new Error("actual runtime replay is not a complete legal win");
}
if (
  !replayReport.steps.at(-1)?.events.includes("win_all_braziers_lit")
) {
  throw new Error("final runtime step lacks the normal win event");
}
if (replayReport.layout !== layout) {
  throw new Error("structured replay layout is not byte-equivalent after decoding");
}
if (JSON.stringify(replayReport.inputs) !== JSON.stringify(canonicalInputs)) {
  throw new Error("structured replay input sequence changed");
}
for (const step of replayReport.steps) {
  if (
    typeof step.before.render !== "string" ||
    typeof step.after.render !== "string" ||
    !Array.isArray(step.events)
  ) {
    throw new Error(`step ${step.step} lacks required structured replay fields`);
  }
}

const regeneratedMarkdown = formatInputSequenceReplayMarkdown(replayReport);
const frozenTerminalNewlines = canonicalMarkdown.match(/\n+$/)?.[0] ?? "";
const regeneratedMarkdownWithFrozenEof = `${regeneratedMarkdown.replace(
  /\n+$/,
  "",
)}${frozenTerminalNewlines}`;
if (
  !Buffer.from(regeneratedMarkdownWithFrozenEof, "utf8").equals(
    canonicalMarkdownBytes,
  )
) {
  const expectedLines = canonicalMarkdown.split(/\r?\n/);
  const actualLines = regeneratedMarkdown.split(/\r?\n/);
  const mismatchIndex = Array.from(
    { length: Math.max(expectedLines.length, actualLines.length) },
    (_, index) => index,
  ).find((index) => expectedLines[index] !== actualLines[index]);
  throw new Error(
    `runtime-regenerated Markdown differs from frozen canonical_replay.md at line ${
      (mismatchIndex ?? -1) + 1
    }: expected=${JSON.stringify(expectedLines[mismatchIndex ?? 0])} actual=${JSON.stringify(
      actualLines[mismatchIndex ?? 0],
    )}`,
  );
}

await writeJson(refs.canonicalJson, replayReport);
const canonicalJsonBytes = await readBytes(refs.canonicalJson);
const canonicalInputsSerialization = JSON.stringify(canonicalInputs);
const canonicalInputsSha256 = sha256(canonicalInputsSerialization);

const authorityRefs = [
  "prototypes/candle_sokoban/docs/designer_contract.md",
  "prototypes/candle_sokoban/mechanic.yml",
  "src/prototypes/candle_sokoban/mechanics.ts",
  "src/prototypes/runtimeAdapter.ts",
  "src/workflows/inputSequenceReplay.ts",
  refs.exactManifest,
  refs.layout,
  refs.level,
  refs.solve,
  refs.canonicalMarkdown,
  refs.evidenceReview,
];
const authorityDigests: Record<
  string,
  { bytes: number; sha256: string }
> = {};
for (const ref of authorityRefs) {
  const bytes = await readBytes(ref);
  authorityDigests[ref] = { bytes: bytes.length, sha256: sha256(bytes) };
}

const reproduction = {
  schema_version: 1,
  artifact_kind: "canonical_structured_replay_reproduction",
  assignment_ref: assignmentRef,
  candidate_id: candidateId,
  exact_version_basis: exactVersion,
  command:
    `npx tsx '${outputRoot}/generate_structured_replay.ts'`,
  runtime: {
    node: process.version,
    platform: process.platform,
    architecture: process.arch,
    working_directory: repoRoot,
    prototype: "candle_sokoban",
    win_condition: winCondition,
    global_burn_cycle: levelSpec.global_burn_cycle,
  },
  frozen_sources: {
    layout_ref: refs.layout,
    layout_bytes: layoutBytes.length,
    layout_sha256: layoutSha256,
    solve_instance_ref: refs.solve,
    canonical_markdown_ref: refs.canonicalMarkdown,
    canonical_markdown_sha256: sha256(canonicalMarkdownBytes),
    exact_manifest_ref: refs.exactManifest,
    exact_manifest_sha256: sha256(exactManifestBytes),
  },
  canonical_inputs: {
    source: `${refs.solve}#canonical_solution.inputs`,
    markdown_crosscheck: `${refs.canonicalMarkdown}#Inputs`,
    count: canonicalInputs.length,
    serialization: "UTF-8 JSON.stringify(inputs), without trailing newline",
    serialized_value: canonicalInputsSerialization,
    sha256: canonicalInputsSha256,
  },
  output: {
    canonical_replay_ref: refs.canonicalJson,
    bytes: canonicalJsonBytes.length,
    sha256: sha256(canonicalJsonBytes),
  },
  authority_digests: authorityDigests,
  verification: {
    generated_by_actual_runtime: true,
    layout_decodes_to_exact_source_text: replayReport.layout === layout,
    inputs_equal_frozen_solve: true,
    inputs_equal_frozen_markdown: true,
    regenerated_markdown_byte_matches_after_frozen_eof_normalization: true,
    completed: replayReport.replay.completed,
    executed_steps: replayReport.replay.executedSteps,
    every_step_legal: replayReport.steps.every((step) => step.legal),
    final_is_win: replayReport.final.isWin,
    final_state_key: replayReport.final.key,
    final_events: replayReport.steps.at(-1)?.events ?? [],
    all_frozen_exact_artifact_hashes_match: frozenArtifactVerification.every(
      (item) => item.matches,
    ),
  },
};
await writeJson(refs.reproduction, reproduction);
const reproductionBytes = await readBytes(refs.reproduction);

const structuredReplayReport = {
  schema_version: 1,
  artifact_kind: "designer_structured_replay_revision_report",
  assignment_ref: assignmentRef,
  designer_instance_id: "designer_candle_all_mechanics_002_20260725",
  candidate_id: candidateId,
  exact_version_basis: exactVersion,
  status: "completed",
  scope: {
    kind: "evidence_supplement_only",
    output_root: outputRoot,
    new_exact_published: false,
    layout_changed: false,
    inputs_changed: false,
    design_changed: false,
    controller_state_written: false,
  },
  canonical_structured_replay: {
    ref: refs.canonicalJson,
    bytes: canonicalJsonBytes.length,
    sha256: sha256(canonicalJsonBytes),
    prototype: replayReport.prototype,
    layout_source: replayReport.layoutSource,
    layout_sha256: layoutSha256,
    layout_exact_text_match: replayReport.layout === layout,
    win_condition: replayReport.winCondition,
    input_count: replayReport.inputs.length,
    input_sha256: canonicalInputsSha256,
    completed: replayReport.replay.completed,
    executed_steps: replayReport.replay.executedSteps,
    legal_through_step: replayReport.replay.legalThroughStep,
    every_step_legal: replayReport.steps.every((step) => step.legal),
    every_step_has_before_render: replayReport.steps.every(
      (step) => typeof step.before.render === "string",
    ),
    every_step_has_after_render: replayReport.steps.every(
      (step) => typeof step.after.render === "string",
    ),
    every_step_has_runtime_events: replayReport.steps.every((step) =>
      Array.isArray(step.events),
    ),
    final_is_win: replayReport.final.isWin,
    final_state_key: replayReport.final.key,
    final_events: replayReport.steps.at(-1)?.events ?? [],
    regenerated_markdown_byte_matches_after_frozen_eof_normalization: true,
  },
  frozen_v001_verification: {
    exact_manifest_ref: refs.exactManifest,
    exact_manifest_bytes: exactManifestBytes.length,
    exact_manifest_sha256: sha256(exactManifestBytes),
    declared_artifact_count: exactManifest.artifacts.length,
    all_declared_artifact_hashes_match: frozenArtifactVerification.every(
      (item) => item.matches,
    ),
    artifacts: frozenArtifactVerification,
    exact_unchanged: true,
  },
  reproduction_ref: refs.reproduction,
  evidence_boundary: [
    "canonical_replay.json 是从冻结 v001 layout 与输入经当前 Candle runtime 重新执行得到的机器可读投影。",
    "它与既有 canonical_replay.md 同轨且可重新生成，但不是新的 exact，也不改变任何设计或审查声明。",
    "本 supplement 只为 Critic review-artifact builder 提供逐步 before/events/after 结构，不写 Controller 状态。",
  ],
  designer_revision_verdict: "structured_replay_added_without_exact_change",
};
await writeFile(
  resolveRef(refs.report),
  YAML.stringify(structuredReplayReport),
  "utf8",
);
const reportBytes = await readBytes(refs.report);
const generatorBytes = await readBytes(refs.generator);

const supplementManifest = {
  schema_version: 1,
  artifact_kind: "canonical_structured_replay_supplement_manifest",
  assignment_ref: assignmentRef,
  design_task_id: "studio_all_mechanics_final_capstone_d4plus_20260725_02",
  candidate_id: candidateId,
  exact_version_basis: exactVersion,
  prototype: "candle_sokoban",
  status: "evidence_supplement_for_frozen_exact",
  created_date: "2026-07-25",
  frozen_exact_identity: {
    layout_ref: refs.layout,
    layout_bytes: layoutBytes.length,
    layout_sha256: layoutSha256,
    exact_manifest_ref: refs.exactManifest,
    exact_manifest_sha256: sha256(exactManifestBytes),
    all_declared_artifact_hashes_match: true,
    new_exact_published: false,
  },
  canonical_input_identity: {
    source_ref: `${refs.solve}#canonical_solution.inputs`,
    count: canonicalInputs.length,
    serialization: "UTF-8 JSON.stringify(inputs), without trailing newline",
    sha256: canonicalInputsSha256,
  },
  artifacts: [
    {
      file: "generate_structured_replay.ts",
      bytes: generatorBytes.length,
      sha256: sha256(generatorBytes),
      role: "task-local actual-runtime replay generator and frozen-exact verifier",
    },
    {
      file: "canonical_replay.json",
      bytes: canonicalJsonBytes.length,
      sha256: sha256(canonicalJsonBytes),
      role: "machine-readable 28-step actual runtime replay",
    },
    {
      file: "reproduction.json",
      bytes: reproductionBytes.length,
      sha256: sha256(reproductionBytes),
      role: "tool command, input/layout identity and runtime authority metadata",
    },
    {
      file: "structured_replay_report.yml",
      bytes: reportBytes.length,
      sha256: sha256(reportBytes),
      role: "Designer evidence-only revision result and frozen exact verification",
    },
  ],
  hard_results: {
    completed: replayReport.replay.completed,
    executed_steps: replayReport.replay.executedSteps,
    every_step_legal: replayReport.steps.every((step) => step.legal),
    final_is_win: replayReport.final.isWin,
    markdown_track_exact_match: true,
    frozen_exact_unchanged: true,
  },
  manifest_self_hash: "intentionally_omitted",
};
await writeFile(
  resolveRef(refs.supplementManifest),
  YAML.stringify(supplementManifest),
  "utf8",
);

console.log(
  JSON.stringify(
    {
      status: "generated_and_verified",
      canonical_replay_ref: refs.canonicalJson,
      canonical_replay_sha256: sha256(canonicalJsonBytes),
      canonical_inputs_sha256: canonicalInputsSha256,
      steps: replayReport.steps.length,
      final_is_win: replayReport.final.isWin,
      frozen_exact_artifacts_verified: frozenArtifactVerification.length,
      frozen_exact_unchanged: true,
    },
    null,
    2,
  ),
);

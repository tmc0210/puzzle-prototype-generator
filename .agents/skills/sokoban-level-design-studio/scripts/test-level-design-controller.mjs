#!/usr/bin/env node

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

import YAML from "yaml";

const repoRoot = path.resolve(import.meta.dirname, "../../../..");
const controller = path.join(import.meta.dirname, "level-design-controller.mjs");
const fixtureRel = `.tmp/level-design-controller-${process.pid}`;
const fixtureRoot = path.resolve(repoRoot, fixtureRel);
const relativeFixture = path.relative(repoRoot, fixtureRoot).replaceAll("\\", "/");

if (!relativeFixture.startsWith(".tmp/level-design-controller-")) {
  throw new Error(`拒绝使用意外测试目录：${fixtureRoot}`);
}

const ref = (name) => `${relativeFixture}/${name}`;
const yaml = (value) => YAML.stringify(value, { lineWidth: 0 });

async function write(name, content) {
  const target = path.join(fixtureRoot, name);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

function run(args, expectedStatus = 0) {
  const result = spawnSync(process.execPath, [controller, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  if (result.status !== expectedStatus) {
    throw new Error(
      `命令退出码异常：node ${path.basename(controller)} ${args.join(" ")}\n`
      + `expected=${expectedStatus} actual=${result.status}\n${result.stdout}\n${result.stderr}`,
    );
  }
  return `${result.stdout}\n${result.stderr}`;
}

let passed = false;
try {
  await mkdir(fixtureRoot, { recursive: true });

  const beforeLayout = "#####\n#@$.#\n#####";
  const afterLayout = "#####\n# @*#\n#####";
  await write("layout.txt", `${beforeLayout}\n`);
  await write("replay.json", JSON.stringify({
    prototype: "fixture",
    layout: beforeLayout,
    winCondition: { kind: "all_goals_covered" },
    inputs: ["right"],
    steps: [{
      step: 1,
      action: "right",
      legal: true,
      events: ["push", "win"],
      before: { render: beforeLayout },
      after: { render: afterLayout },
    }],
    replay: { completed: true },
    final: { isWin: true },
  }, null, 2));
  await write("submission.yml", "candidate_id: candidate-1\nexact_version: exact-1\n");
  await write("prior-0001.md", "# 前序 0001\n\n一个已知教学关。\n");
  await write("stage-source.md", "# 阶段内人类归档原件\n");
  await write("aesthetic-source.md", "# 跨阶段人类归档原件\n");
  await write("stage-calibration.md", [
    "---",
    yaml({
      critic_calibration_kind: "stage_local_difficulty",
      covered_prior_course_refs: [ref("prior-0001.md")],
      difficulty_metadata: "stage_local",
    }).trimEnd(),
    "---",
    "",
    "- 审美分：2",
    "- 难度分：1",
    "- 人类原评语：基础教学关。",
    "",
  ].join("\n"));
  await write("aesthetic-calibration.md", [
    "---",
    yaml({
      critic_calibration_kind: "cross_stage_aesthetic",
      difficulty_metadata: "omitted",
    }).trimEnd(),
    "---",
    "",
    "- 审美分：4",
    "- 人类原评语：关系紧凑。",
    "",
  ].join("\n"));
  await write("lexicon.md", "# fixture lexicon\n");
  await write("index.md", "# fixture index\n");
  await write("request.yml", "request_id: fixture\n");
  await write("material.md", "# material\n");
  await write("raw.json", "{}\n");

  await write("dispatch.yml", yaml({
    required_skill: "sokoban-mechanism-lab",
    intent: "mechanism_explore",
    publication_scope: "task_local",
    exploration_id: "fixture-exploration",
    prototype_id: "fixture",
    workspace: relativeFixture,
    experience_seed: "fixture seed",
    player_prior: ["basic"],
    allowed_mechanisms: ["push"],
    allowed_tools: ["fixture"],
    source_boundary: { allowed: ["fixture"], forbidden: ["unrelated"] },
    task_lexicon_ref: ref("lexicon.md"),
    task_index_ref: ref("index.md"),
    dispatch_prompt: "请使用 $sokoban-mechanism-lab 执行 mechanism_explore，并只发布 task_local 材料。",
  }));
  await write("batch.yml", yaml({
    required_skill: "sokoban-mechanism-lab",
    intent: "mechanism_explore",
    publication_scope: "task_local",
    exploration_id: "fixture-exploration",
    status: "published",
    request_ref: ref("request.yml"),
    sampled_axes: ["fixture"],
    new_material_refs: [ref("material.md")],
    merged_material_refs: [],
    next_sampling_axes: [],
    raw_artifact_refs: [ref("raw.json")],
  }));

  await write("brief.yml", yaml({
    design_task_id: "task-1",
    prototype_context: {
      confirmed_rules: ["玩家向右推动箱子"],
      win_condition: "箱子覆盖目标",
      object_and_event_semantics: ["$ 是箱子，. 是目标"],
    },
    player_context: {
      player_prior: ["基础推箱"],
      known_prior_level_refs: [ref("prior-0001.md")],
    },
    task_exploration: {
      required_skill: "sokoban-mechanism-lab",
      intent: "mechanism_explore",
      publication_scope: "task_local",
      dispatch_ref: ref("dispatch.yml"),
      task_lexicon_ref: ref("lexicon.md"),
      task_index_ref: ref("index.md"),
      first_material_batch_ref: ref("batch.yml"),
      selected_material_refs: [ref("material.md")],
    },
    level_brief: { expected_difficulty: 3 },
  }));

  const designingCandidate = {
    candidate_id: "candidate-1",
    exact_version: null,
    candidate_state: "designing",
    designer_assignment_ref: ref("candidate-design-assignment.yml"),
    layout_ref: null,
    canonical_trace_ref: null,
    submission_packet_ref: null,
    evidence_review_refs: [],
    critic_instance_id: null,
    critic_base_ref: null,
    critic_review_ref: null,
    reviewed_exact_version: null,
    delivery_exact_version: null,
    pre_submission_check_ref: null,
    pre_submission_state: "not_started",
    playtest_status: "not_queued",
  };
  await write("design-ledger.yml", yaml({
    design_task_id: "task-1",
    experience_brief_ref: ref("brief.yml"),
    task_state: "designing",
    candidate: designingCandidate,
    review_cycles: [],
    attempts: [],
  }));
  await write("candidate-design-assignment.yml", yaml({
    assignment_id: "candidate-design-1",
    required_skill: "sokoban-level-designer",
    assignment_kind: "candidate_design",
    controller_instance_id: "controller-1",
    task_root: relativeFixture,
    candidate_ledger_ref: ref("design-ledger.yml"),
    candidate_id: "candidate-1",
    exact_version_basis: null,
    design_brief: "在连续工作台中完成唯一候选，并在自查通过后发布首个 exact。",
    input_refs: [ref("brief.yml")],
    allowed_output_refs: [ref("designer-workbench")],
    exploration_request_root: null,
    required_outputs: ["一个完成自查的已发布 exact，或本阶段无法发布的自然语言结论"],
  }));
  run(["validate-assignment", "--assignment", ref("candidate-design-assignment.yml")]);
  run(["validate", "--ledger", ref("design-ledger.yml")]);

  await write("revision-ledger.yml", yaml({
    design_task_id: "task-1",
    experience_brief_ref: ref("brief.yml"),
    task_state: "designing",
    candidate: {
      ...designingCandidate,
      exact_version: "exact-1",
      designer_assignment_ref: ref("revision-assignment.yml"),
    },
    review_cycles: [],
    attempts: [],
  }));
  await write("revision-assignment.yml", yaml({
    assignment_id: "revision-1",
    required_skill: "sokoban-level-designer",
    assignment_kind: "revision",
    controller_instance_id: "controller-1",
    task_root: relativeFixture,
    candidate_ledger_ref: ref("revision-ledger.yml"),
    candidate_id: "candidate-1",
    exact_version_basis: "exact-1",
    design_brief: "以已发布 exact 为依据恢复连续工作台，完成修订后再发布下一 exact。",
    input_refs: [ref("layout.txt")],
    allowed_output_refs: [ref("designer-workbench")],
    exploration_request_root: null,
    required_outputs: ["一个完成自查的新 exact，或本阶段无法发布的自然语言结论"],
  }));
  run(["validate-assignment", "--assignment", ref("revision-assignment.yml")]);
  run(["validate", "--ledger", ref("revision-ledger.yml")]);

  await write("evidence.yml", yaml({
    reviewer_instance_id: "evidence-reviewer-1",
    review_integrity: "independent",
    overall_hard_status: "supported",
    candidate_id: "candidate-1",
    exact_version: "exact-1",
  }));

  const hardValidatedCandidate = {
    candidate_id: "candidate-1",
    exact_version: "exact-1",
    candidate_state: "hard_validated",
    designer_assignment_ref: null,
    designer_intent_in_one_sentence: "不应进入 Critic base",
    layout_ref: ref("layout.txt"),
    canonical_trace_ref: ref("replay.json"),
    submission_packet_ref: ref("submission.yml"),
    evidence_review_refs: [ref("evidence.yml")],
    critic_instance_id: null,
    critic_base_ref: null,
    critic_review_ref: null,
    reviewed_exact_version: null,
    delivery_exact_version: null,
    pre_submission_check_ref: null,
    pre_submission_state: "not_started",
    playtest_status: "not_queued",
  };
  const criticCalibration = {
    critic_stage_difficulty_calibration: {
      view_refs: [ref("stage-calibration.md")],
      source_archive_refs: [ref("stage-source.md")],
    },
    critic_cross_stage_aesthetic_calibration: {
      view_refs: [ref("aesthetic-calibration.md")],
      source_archive_refs: [ref("aesthetic-source.md")],
    },
  };

  await write("ledger.yml", yaml({
    design_task_id: "task-1",
    experience_brief_ref: ref("brief.yml"),
    ...criticCalibration,
    task_state: "reviewing",
    candidate: hardValidatedCandidate,
    review_cycles: [],
    attempts: [],
  }));

  run([
    "prepare-critic",
    "--ledger", ref("ledger.yml"),
    "--attempt", "review-1",
    "--out", ref("critic-base.yml"),
  ]);
  const baseText = await readFile(path.join(fixtureRoot, "critic-base.yml"), "utf8");
  const base = YAML.parse(baseText);
  if (base.candidate.canonical_solution.mechanically_derived_trace[0].before_layout !== beforeLayout) {
    throw new Error("Critic base 未携带 canonical step 的实际 before layout");
  }
  if (base.mechanical_evidence_status !== "supported") {
    throw new Error("Critic packet 未将机械证据压缩为 supported 事实");
  }
  if (base.stage_difficulty_calibration_refs?.[0] !== ref("stage-calibration.md")) {
    throw new Error("Critic packet 未携带阶段内难度校准 view");
  }
  if (base.cross_stage_aesthetic_calibration_refs?.[0] !== ref("aesthetic-calibration.md")) {
    throw new Error("Critic packet 未携带跨阶段审美校准 view");
  }
  for (const forbidden of [
    "experience_core",
    "designer_intent",
    "submission_packet_ref",
    "scc_count",
    "before_state_ref",
    "after_state_ref",
    "visible_board_change",
    "human_archive_refs",
    "source_archive_refs",
  ]) {
    if (baseText.includes(forbidden)) throw new Error(`Critic base 泄漏禁止字段：${forbidden}`);
  }

  await write("aesthetic-calibration-invalid.md", [
    "---",
    yaml({
      critic_calibration_kind: "cross_stage_aesthetic",
      difficulty_metadata: "omitted",
    }).trimEnd(),
    "---",
    "",
    "- 审美分：4",
    "- 难度分：4",
    "",
  ].join("\n"));
  await write("ledger-invalid-calibration.yml", yaml({
    design_task_id: "task-1",
    experience_brief_ref: ref("brief.yml"),
    critic_stage_difficulty_calibration: criticCalibration.critic_stage_difficulty_calibration,
    critic_cross_stage_aesthetic_calibration: {
      view_refs: [ref("aesthetic-calibration-invalid.md")],
      source_archive_refs: [ref("aesthetic-source.md")],
    },
    task_state: "reviewing",
    candidate: hardValidatedCandidate,
    review_cycles: [],
    attempts: [],
  }));
  const invalidCalibrationOutput = run([
    "prepare-critic",
    "--ledger", ref("ledger-invalid-calibration.yml"),
    "--attempt", "review-invalid",
    "--out", ref("critic-invalid.yml"),
  ], 1);
  if (!invalidCalibrationOutput.includes("跨阶段审美 view 含结构化难度元数据")) {
    throw new Error("Controller 未拒绝跨阶段审美 view 中的难度元数据");
  }

  await write("critic-review.md", "当前 exact 值得进入待玩。\n\nstep 1 的箱子目标关系构成了实际剪枝；相对前序，它是同一关系的组合使用。无法确认难度低于目标。\n");
  const acceptedCandidate = {
    ...hardValidatedCandidate,
    candidate_state: "accepted",
    critic_instance_id: "critic-1",
    critic_base_ref: ref("critic-base.yml"),
    critic_review_ref: ref("critic-review.md"),
    reviewed_exact_version: "exact-1",
  };
  await write("ledger.yml", yaml({
    design_task_id: "task-1",
    experience_brief_ref: ref("brief.yml"),
    ...criticCalibration,
    task_state: "pre_submission",
    candidate: acceptedCandidate,
    review_cycles: [{
      cycle_id: "cycle-1",
      exact_version: "exact-1",
      review_attempt_id: "review-1",
      critic_instance_id: "critic-1",
      critic_base_ref: ref("critic-base.yml"),
      critic_review_ref: ref("critic-review.md"),
      evidence_review_refs: [ref("evidence.yml")],
      designer_action_ref: null,
      controller_recorded_outcome: "accept_candidate",
    }],
    attempts: [{
      attempt_id: "attempt-1",
      exact_version: "exact-1",
      status: "accepted",
      artifact_refs: [ref("critic-review.md")],
    }],
  }));
  run(["validate", "--ledger", ref("ledger.yml")]);

  await write("pre-submission.yml", yaml({
    design_task_id: "task-1",
    candidate_id: "candidate-1",
    reviewed_exact_version: "exact-1",
    delivery_exact_version: "exact-2",
    workflow_results: [{
      workflow_id: "fixture-structural-normalization",
      applicability: "applicable",
      applicability_basis: "固定结构算法发现一个可裁剪外框单元。",
      authority_docs: [ref("material.md")],
      candidate_discovery: {
        method: "fixture-maximal-outer-band",
        candidate_units: ["outer-band-1"],
      },
      operations_performed: ["裁剪已证明无行为影响的外框。"],
      artifact_refs: [ref("raw.json")],
      version_effect: "review_preserving_change",
      acceptance_preserved: true,
      preservation_basis: "规范解、完整图和玩家关系保持。",
      status: "completed",
    }],
    overall_status: "completed",
  }));
  const readyCandidate = {
    ...acceptedCandidate,
    exact_version: "exact-2",
    delivery_exact_version: "exact-2",
    pre_submission_check_ref: ref("pre-submission.yml"),
    pre_submission_state: "completed",
    playtest_status: "pending_playtest",
  };
  await write("ready-ledger.yml", yaml({
    design_task_id: "task-1",
    experience_brief_ref: ref("brief.yml"),
    ...criticCalibration,
    task_state: "ready_for_playtest",
    candidate: readyCandidate,
    review_cycles: [{
      cycle_id: "cycle-1",
      exact_version: "exact-1",
      review_attempt_id: "review-1",
      critic_instance_id: "critic-1",
      critic_base_ref: ref("critic-base.yml"),
      critic_review_ref: ref("critic-review.md"),
      evidence_review_refs: [ref("evidence.yml")],
      designer_action_ref: null,
      controller_recorded_outcome: "accept_candidate",
    }],
    attempts: [],
  }));
  run(["validate", "--ledger", ref("ready-ledger.yml")]);

  await write("pre-submission-invalid.yml", yaml({
    design_task_id: "task-1",
    candidate_id: "candidate-1",
    reviewed_exact_version: "exact-1",
    delivery_exact_version: "exact-2",
    workflow_results: [{
      workflow_id: "unpreserved-change",
      applicability: "applicable",
      applicability_basis: "测试不满足保持条件的变换。",
      authority_docs: [ref("material.md")],
      candidate_discovery: {
        method: "fixture-maximal-outer-band",
        candidate_units: ["outer-band-1"],
      },
      operations_performed: ["未保持 acceptance 的变换"],
      artifact_refs: [ref("raw.json")],
      version_effect: "review_preserving_change",
      acceptance_preserved: false,
      preservation_basis: "保持条件失败。",
      status: "completed",
    }],
    overall_status: "completed",
  }));
  await write("ready-ledger-invalid.yml", yaml({
    design_task_id: "task-1",
    experience_brief_ref: ref("brief.yml"),
    ...criticCalibration,
    task_state: "ready_for_playtest",
    candidate: {
      ...readyCandidate,
      pre_submission_check_ref: ref("pre-submission-invalid.yml"),
    },
    review_cycles: [{
      cycle_id: "cycle-1",
      exact_version: "exact-1",
      review_attempt_id: "review-1",
      critic_instance_id: "critic-1",
      critic_base_ref: ref("critic-base.yml"),
      critic_review_ref: ref("critic-review.md"),
      evidence_review_refs: [ref("evidence.yml")],
      designer_action_ref: null,
      controller_recorded_outcome: "accept_candidate",
    }],
    attempts: [],
  }));
  const invalidPreSubmissionOutput = run([
    "validate", "--ledger", ref("ready-ledger-invalid.yml"),
  ], 1);
  if (!invalidPreSubmissionOutput.includes("acceptance_preserved=true")) {
    throw new Error("Controller 未拒绝不保持 acceptance 的提交前变换");
  }

  await write("critic-review-return.md", "当前 exact 应退回同一候选继续设计。\n\nstep 1 没有形成高于前序的计划关系，且能够确认低于目标难度。\n");
  await write("review-response-assignment.yml", yaml({
    assignment_id: "review-response-1",
    required_skill: "sokoban-level-designer",
    assignment_kind: "review_response",
    controller_instance_id: "controller-1",
    task_root: relativeFixture,
    candidate_ledger_ref: ref("ledger.yml"),
    candidate_id: "candidate-1",
    exact_version_basis: "exact-1",
    design_brief: "响应当前 Critic 的自然语言退回意见。",
    input_refs: [ref("critic-review-return.md")],
    allowed_output_refs: [ref("designer-action.yml")],
    exploration_request_root: null,
    required_outputs: ["designer_action"],
  }));
  await write("designer-action.yml", yaml({
    assignment_ref: ref("review-response-assignment.yml"),
    designer_instance_id: "designer-1",
    review_round_answered: 1,
    candidate_id: "candidate-1",
    exact_version_answered: "exact-1",
    evidence_review_refs: [ref("evidence.yml")],
    critic_review_ref: ref("critic-review-return.md"),
    response: "revise_candidate",
    design_response_and_refs: ["回到同一候选制作新 exact。"],
  }));
  const returnedCandidate = {
    ...hardValidatedCandidate,
    critic_instance_id: "critic-1",
    critic_base_ref: ref("critic-base.yml"),
    critic_review_ref: ref("critic-review-return.md"),
  };
  await write("ledger.yml", yaml({
    design_task_id: "task-1",
    experience_brief_ref: ref("brief.yml"),
    ...criticCalibration,
    task_state: "reviewing",
    candidate: returnedCandidate,
    review_cycles: [{
      cycle_id: "cycle-return-1",
      exact_version: "exact-1",
      review_attempt_id: "review-1",
      critic_instance_id: "critic-1",
      critic_base_ref: ref("critic-base.yml"),
      critic_review_ref: ref("critic-review-return.md"),
      evidence_review_refs: [ref("evidence.yml")],
      designer_action_ref: ref("designer-action.yml"),
      controller_recorded_outcome: "return_to_design",
    }],
    attempts: [],
  }));
  run(["validate", "--ledger", ref("ledger.yml")]);
  run([
    "validate-designer-action",
    "--ledger", ref("ledger.yml"),
    "--action", ref("designer-action.yml"),
  ]);

  passed = true;
} finally {
  const resolved = path.resolve(fixtureRoot);
  if (resolved === fixtureRoot && relativeFixture.startsWith(".tmp/level-design-controller-")) {
    await rm(resolved, { recursive: true, force: true });
  }
}

if (passed) console.log("level-design-controller tests passed");

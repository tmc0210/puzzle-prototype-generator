#!/usr/bin/env node

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

const repoRoot = path.resolve(import.meta.dirname, "../../../..");
const VALID_TASK_STATES = new Set([
  "briefing",
  "designing",
  "reviewing",
  "pre_submission",
  "ready_for_playtest",
]);
const VALID_CANDIDATE_STATES = new Set([
  "designing",
  "hard_validated",
  "accepted",
]);
const CRITIC_ACCEPT_LINE = "当前 exact 值得进入待玩。";
const CRITIC_RETURN_LINE = "当前 exact 应退回同一候选继续设计。";
const VALID_CYCLE_OUTCOMES = new Set([
  "accept_candidate",
  "return_to_design",
  "change_structure_family",
  "withdraw_exact",
  "dispute_packet",
]);
const VALID_ASSIGNMENT_KINDS = new Set([
  "experience_brief",
  "candidate_design",
  "revision",
  "review_response",
  "pre_submission_design_check",
]);
const VALID_DESIGNER_RESPONSES = new Set([
  "revise_candidate",
  "change_structure_family",
  "withdraw_exact",
  "dispute_raw_packet",
]);
const VALID_ATTEMPT_STATUSES = new Set([
  "revised",
  "withdrawn",
  "rejected_mechanical",
  "rejected_identity",
  "rejected_no_experience",
  "returned_by_critic",
  "accepted",
]);
const REQUIRED_DESIGNER_SKILL = "sokoban-level-designer";
const REQUIRED_EXPLORATION_SKILL = "sokoban-mechanism-lab";
const REQUIRED_EXPLORATION_INTENT = "mechanism_explore";
const REQUIRED_PUBLICATION_SCOPE = "task_local";
const DESIGNER_FORBIDDEN_CONTROL_FIELDS = new Set([
  "task_state",
  "candidate_state",
  "controller_recorded_outcome",
  "review_cycles",
  "reviewed_exact_version",
  "delivery_exact_version",
  "pre_submission_state",
  "playtest_status",
  "next_review_round",
  "next_step",
]);
const DESIGNER_FORBIDDEN_OUTPUT_BASENAMES = new Set([
  "dispatch.yml",
  "candidate_ledger.yml",
  "levels.yml",
  "playable_queue.yml",
]);

const [command, ...argv] = process.argv.slice(2);
const args = parseArgs(argv);

try {
  switch (command) {
    case "prepare-critic":
      await prepareCriticBasePacket(args);
      break;
    case "validate":
      await validateCandidateLedger(args);
      break;
    case "validate-exploration":
      await validateExploration(args);
      break;
    case "validate-assignment":
      await validateDesignerAssignmentCommand(args);
      break;
    case "validate-designer-action":
      await validateDesignerAction(args);
      break;
    default:
      printUsage();
      process.exitCode = 2;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

async function prepareCriticBasePacket(options) {
  const ledgerRef = requireArg(options, "ledger");
  const reviewAttemptId = requireArg(options, "attempt");
  const outRef = requireArg(options, "out");
  const ledger = await readYamlRef(ledgerRef);
  const brief = await readYamlRef(requireString(ledger.experience_brief_ref, "experience_brief_ref"));
  await assertValidTaskExploration(brief);
  const candidate = asObject(ledger.candidate, "candidate");

  if (candidate.candidate_state !== "hard_validated") {
    throw new Error("只有 hard_validated 的当前候选才能生成 Critic base packet");
  }
  await assertSupportedEvidence(candidate, candidate.candidate_id);

  const artifact = await buildReviewArtifact(candidate);
  const prototypeContext = asObject(brief.prototype_context, "prototype_context");
  const playerContext = asObject(brief.player_context, "player_context");
  const levelBrief = asObject(brief.level_brief, "level_brief");
  const priorCourseRefs = requireStringArray(
    playerContext.known_prior_level_refs,
    "player_context.known_prior_level_refs",
  );
  for (const [index, ref] of priorCourseRefs.entries()) {
    await assertRefExists(ref, `prior_course_refs[${index}]`);
  }
  const calibration = await loadCriticCalibration(ledger, priorCourseRefs);
  const targetDifficulty = Number(levelBrief.expected_difficulty);
  if (!Number.isInteger(targetDifficulty) || targetDifficulty < 1 || targetDifficulty > 5) {
    throw new Error("level_brief.expected_difficulty 必须是 1—5 的整数");
  }
  const packet = {
    review_attempt_id: reviewAttemptId,
    prototype_id: artifact.prototype_id,
    prototype_rules: {
      confirmed_rules: requireStringArray(
        prototypeContext.confirmed_rules,
        "prototype_context.confirmed_rules",
      ),
      win_condition: requireString(prototypeContext.win_condition, "prototype_context.win_condition"),
      object_and_event_semantics: requireStringArray(
        prototypeContext.object_and_event_semantics,
        "prototype_context.object_and_event_semantics",
      ),
      player_prior: requireStringArray(playerContext.player_prior, "player_context.player_prior"),
    },
    prior_course_refs: priorCourseRefs.map(normalizeRef),
    target_difficulty: targetDifficulty,
    stage_difficulty_calibration_refs: calibration.stageViewRefs,
    cross_stage_aesthetic_calibration_refs: calibration.aestheticViewRefs,
    candidate: artifact.packet_entry,
    mechanical_evidence_status: "supported",
  };

  await writeYamlRef(outRef, packet);
  console.log(normalizeRef(outRef));
}

async function loadCriticCalibration(ledger, priorCourseRefs) {
  const stage = asObject(
    ledger.critic_stage_difficulty_calibration,
    "critic_stage_difficulty_calibration",
  );
  const aesthetic = asObject(
    ledger.critic_cross_stage_aesthetic_calibration,
    "critic_cross_stage_aesthetic_calibration",
  );
  const stageViewRefs = requireNonEmptyUniqueRefs(stage.view_refs, "critic_stage_difficulty_calibration.view_refs");
  const stageSourceRefs = requireNonEmptyUniqueRefs(
    stage.source_archive_refs,
    "critic_stage_difficulty_calibration.source_archive_refs",
  );
  const aestheticViewRefs = requireNonEmptyUniqueRefs(
    aesthetic.view_refs,
    "critic_cross_stage_aesthetic_calibration.view_refs",
  );
  const aestheticSourceRefs = requireNonEmptyUniqueRefs(
    aesthetic.source_archive_refs,
    "critic_cross_stage_aesthetic_calibration.source_archive_refs",
  );

  const overlappingViews = stageViewRefs.filter((ref) => aestheticViewRefs.includes(ref));
  if (overlappingViews.length > 0) {
    throw new Error(`两类 Critic 校准不能复用同一 view：${overlappingViews.join(", ")}`);
  }
  const overlappingSources = stageSourceRefs.filter((ref) => aestheticSourceRefs.includes(ref));
  if (overlappingSources.length > 0) {
    throw new Error(`阶段内与跨阶段校准不能复用同一 archive 来源：${overlappingSources.join(", ")}`);
  }

  for (const [index, ref] of stageSourceRefs.entries()) {
    await assertRefExists(ref, `critic_stage_difficulty_calibration.source_archive_refs[${index}]`);
  }
  for (const [index, ref] of aestheticSourceRefs.entries()) {
    await assertRefExists(ref, `critic_cross_stage_aesthetic_calibration.source_archive_refs[${index}]`);
  }
  for (const [index, ref] of stageViewRefs.entries()) {
    await assertCriticCalibrationView(
      ref,
      "stage_local_difficulty",
      priorCourseRefs,
      `critic_stage_difficulty_calibration.view_refs[${index}]`,
    );
  }
  for (const [index, ref] of aestheticViewRefs.entries()) {
    await assertCriticCalibrationView(
      ref,
      "cross_stage_aesthetic",
      priorCourseRefs,
      `critic_cross_stage_aesthetic_calibration.view_refs[${index}]`,
    );
  }

  return { stageViewRefs, aestheticViewRefs };
}

async function assertCriticCalibrationView(ref, expectedKind, priorCourseRefs, label) {
  await assertRefExists(ref, label);
  const text = await readTextRef(ref);
  const match = text.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!match) throw new Error(`${label} 缺少校准 view frontmatter`);
  const metadata = asObject(YAML.parse(match[1]), `${label}.frontmatter`);
  if (metadata.critic_calibration_kind !== expectedKind) {
    throw new Error(`${label}.critic_calibration_kind 必须为 ${expectedKind}`);
  }
  const body = text.slice(match[0].length);
  if (expectedKind === "stage_local_difficulty") {
    const coveredPriorRefs = requireStringArray(
      metadata.covered_prior_course_refs,
      `${label}.covered_prior_course_refs`,
    );
    if (!sameNormalizedStringSet(coveredPriorRefs, priorCourseRefs)) {
      throw new Error(`${label}.covered_prior_course_refs 必须与完整有序前序引用一致`);
    }
    if (metadata.difficulty_metadata !== "stage_local") {
      throw new Error(`${label}.difficulty_metadata 必须为 stage_local`);
    }
    if (!/(?:^|\n)\s*(?:difficulty_score\s*:|[-*]\s*难度分\s*[:：])/i.test(body)) {
      throw new Error(`${label} 未携带阶段内难度分`);
    }
    return;
  }

  if (metadata.difficulty_metadata !== "omitted") {
    throw new Error(`${label}.difficulty_metadata 必须为 omitted`);
  }
  const structuredDifficulty = /(?:^|\n)\s*(?:difficulty_(?:score|label)\s*:|[-*]\s*难度(?:分|标签)\s*[:：])/i;
  if (structuredDifficulty.test(body)) {
    throw new Error(`${label} 的跨阶段审美 view 含结构化难度元数据`);
  }
}

async function validateCandidateLedger(options) {
  const ledgerRef = requireArg(options, "ledger");
  const ledger = await readYamlRef(ledgerRef);
  const errors = [];
  const taskId = stringOrEmpty(ledger.design_task_id);
  if (!taskId) errors.push("design_task_id 缺失");
  if (!VALID_TASK_STATES.has(ledger.task_state)) {
    errors.push(`非法 task_state：${String(ledger.task_state)}`);
  }

  await checkRef(ledger.experience_brief_ref, "experience_brief_ref", errors);
  let priorCourseRefs = [];
  try {
    const brief = await readYamlRef(ledger.experience_brief_ref);
    if (brief.design_task_id !== taskId) errors.push("experience brief 的 design_task_id 与账本不一致");
    await assertValidTaskExploration(brief);
    const playerContext = asObject(brief.player_context, "player_context");
    priorCourseRefs = requireStringArray(
      playerContext.known_prior_level_refs,
      "player_context.known_prior_level_refs",
    );
  } catch (error) {
    errors.push(`experience brief 或 task exploration 无效：${errorMessage(error)}`);
  }

  const candidate = safeObject(ledger.candidate, "candidate", errors);
  if (Array.isArray(ledger.candidate)) errors.push("candidate 必须是唯一对象，不能是列表");
  if (candidate) await validateCurrentCandidate(candidate, ledger, ledgerRef, errors);
  const requiresCriticCalibration = candidate && ["hard_validated", "accepted"].includes(candidate.candidate_state);
  if (requiresCriticCalibration) {
    try {
      await loadCriticCalibration(ledger, priorCourseRefs);
    } catch (error) {
      errors.push(`Critic 校准输入无效：${errorMessage(error)}`);
    }
  }

  const cycles = Array.isArray(ledger.review_cycles) ? ledger.review_cycles : [];
  const cycleIds = new Set();
  const reviewAttemptIds = new Set();
  const criticVersions = new Map();
  const criticByExact = new Map();
  const evidenceReviewerVersions = new Map();
  for (const [index, rawCycle] of cycles.entries()) {
    const cycle = safeObject(rawCycle, `review_cycles[${index}]`, errors);
    if (!cycle) continue;
    const cycleId = stringOrEmpty(cycle.cycle_id);
    if (!cycleId) errors.push(`review_cycles[${index}].cycle_id 缺失`);
    else if (cycleIds.has(cycleId)) errors.push(`重复 cycle_id：${cycleId}`);
    else cycleIds.add(cycleId);
    const reviewAttemptId = stringOrEmpty(cycle.review_attempt_id);
    if (reviewAttemptId && reviewAttemptIds.has(reviewAttemptId)) {
      errors.push(`重复 review_attempt_id：${reviewAttemptId}`);
    } else if (reviewAttemptId) {
      reviewAttemptIds.add(reviewAttemptId);
    }
    recordReviewerVersion(
      criticVersions,
      cycle.critic_instance_id,
      cycle.exact_version,
      `${cycleId || `review_cycles[${index}]`}.critic_instance_id`,
      errors,
    );
    recordCriticForExact(
      criticByExact,
      cycle.exact_version,
      cycle.critic_instance_id,
      cycleId || `review_cycles[${index}]`,
      errors,
    );
    if (!VALID_CYCLE_OUTCOMES.has(cycle.controller_recorded_outcome)) {
      errors.push(`${cycleId || `review_cycles[${index}]`} 的 controller_recorded_outcome 非法`);
    }
    await validateReviewCycle(
      cycle,
      cycleId || `review_cycles[${index}]`,
      candidate?.candidate_id,
      errors,
    );
    await recordCycleEvidenceReviewerVersions(cycle, evidenceReviewerVersions, errors);
  }

  if (candidate) {
    const criticExactVersion = candidate.candidate_state === "accepted"
      ? candidate.reviewed_exact_version
      : candidate.exact_version;
    if (candidate.critic_review_ref) {
      recordReviewerVersion(
        criticVersions,
        candidate.critic_instance_id,
        criticExactVersion,
        "candidate.critic_instance_id",
        errors,
      );
    }
    await recordEvidenceReviewerVersions(
      candidate.evidence_review_refs,
      candidate.exact_version,
      evidenceReviewerVersions,
      "candidate.evidence_review_refs",
      errors,
    );
  }

  const attempts = Array.isArray(ledger.attempts) ? ledger.attempts : [];
  for (const [index, rawAttempt] of attempts.entries()) {
    const attempt = safeObject(rawAttempt, `attempts[${index}]`, errors);
    if (!attempt) continue;
    if (!stringOrEmpty(attempt.attempt_id)) errors.push(`attempts[${index}].attempt_id 缺失`);
    if (!stringOrEmpty(attempt.exact_version)) errors.push(`attempts[${index}].exact_version 缺失`);
    if (!VALID_ATTEMPT_STATUSES.has(attempt.status)) {
      errors.push(`attempts[${index}].status 非法：${String(attempt.status)}`);
    }
    const refs = Array.isArray(attempt.artifact_refs) ? attempt.artifact_refs : [];
    for (const [refIndex, ref] of refs.entries()) {
      await checkRef(ref, `attempts[${index}].artifact_refs[${refIndex}]`, errors);
    }
  }

  if (candidate?.candidate_state === "accepted") {
    const matchingAccept = cycles.some(
      (cycle) => cycle?.controller_recorded_outcome === "accept_candidate"
        && cycle?.exact_version === candidate.reviewed_exact_version
        && cycle?.critic_instance_id === candidate.critic_instance_id
        && normalizeRef(cycle?.critic_base_ref) === normalizeRef(candidate.critic_base_ref)
        && normalizeRef(cycle?.critic_review_ref) === normalizeRef(candidate.critic_review_ref),
    );
    if (!matchingAccept) errors.push("accepted 候选缺少与 Critic 身份及 review 一致的 accept_candidate cycle");
  }

  if (errors.length > 0) {
    for (const error of errors) console.error(`ERROR ${error}`);
    throw new Error(`单候选账本校验失败：${errors.length} 项错误`);
  }

  console.log(`单候选账本校验通过：${normalizeRef(ledgerRef)}`);
  console.log(`candidate=${candidate.candidate_id}，exact=${candidate.exact_version}，cycles=${cycles.length}`);
}

async function validateCurrentCandidate(candidate, ledger, ledgerRef, errors) {
  const candidateId = stringOrEmpty(candidate.candidate_id);
  const exactVersion = stringOrEmpty(candidate.exact_version);
  if (!candidateId) errors.push("candidate.candidate_id 缺失");
  const pendingFirstExact = candidate.candidate_state === "designing"
    && ["briefing", "designing"].includes(ledger.task_state);
  if (!exactVersion && !pendingFirstExact) errors.push("candidate.exact_version 缺失");
  if (!VALID_CANDIDATE_STATES.has(candidate.candidate_state)) {
    errors.push(`非法 candidate_state：${String(candidate.candidate_state)}`);
  }

  if (candidate.designer_assignment_ref) {
    await checkRef(candidate.designer_assignment_ref, "candidate.designer_assignment_ref", errors);
    try {
      const assignment = await readYamlRef(candidate.designer_assignment_ref);
      if (assignment.required_skill !== REQUIRED_DESIGNER_SKILL) {
        errors.push("当前 Designer assignment 的 required_skill 不一致");
      }
      if (assignment.candidate_id !== candidateId) errors.push("当前 Designer assignment 的 candidate_id 不一致");
      if (normalizeRef(assignment.candidate_ledger_ref) !== normalizeRef(ledgerRef)) {
        errors.push("当前 Designer assignment 未引用本账本");
      }
    } catch (error) {
      errors.push(`当前 Designer assignment 无效：${errorMessage(error)}`);
    }
  }

  const requiresSubmittedArtifacts = [
    "hard_validated",
    "accepted",
  ].includes(candidate.candidate_state);
  if (requiresSubmittedArtifacts) {
    for (const field of ["layout_ref", "canonical_trace_ref", "submission_packet_ref"]) {
      await checkRef(candidate[field], `candidate.${field}`, errors);
    }
    try {
      await assertSupportedEvidence(candidate, candidateId);
    } catch (error) {
      errors.push(errorMessage(error));
    }
  }

  if (candidate.candidate_state === "accepted") {
    for (const field of ["critic_base_ref", "critic_review_ref"]) {
      await checkRef(candidate[field], `candidate.${field}`, errors);
    }
    try {
      const verdict = await readCriticVerdict(candidate.critic_review_ref);
      if (verdict !== "worth_playtesting") errors.push("accepted 候选的 Critic 未判定值得进入待玩");
    } catch (error) {
      errors.push(`当前 Critic review 无法验证：${errorMessage(error)}`);
    }
    if (!stringOrEmpty(candidate.critic_instance_id)) errors.push("accepted 候选缺少 critic_instance_id");
    if (!stringOrEmpty(candidate.reviewed_exact_version)) {
      errors.push("accepted 候选缺少 reviewed_exact_version");
    }
    if (
      candidate.reviewed_exact_version !== exactVersion
      && !["pre_submission", "ready_for_playtest"].includes(ledger.task_state)
    ) {
      errors.push("提交前流程之外，accepted 候选的 reviewed_exact_version 必须等于当前 exact_version");
    }
    if (!["pre_submission", "ready_for_playtest"].includes(ledger.task_state)) {
      errors.push("accepted 候选必须进入提交前或待玩交付状态");
    }
  } else if (["pre_submission", "ready_for_playtest"].includes(ledger.task_state)) {
    errors.push(`${ledger.task_state} 只能用于 accepted 候选`);
  }

  if (candidate.pre_submission_state !== "not_started") {
    await checkRef(
      candidate.pre_submission_check_ref,
      "candidate.pre_submission_check_ref",
      errors,
    );
  }

  if (ledger.task_state === "ready_for_playtest") {
    if (candidate.candidate_state !== "accepted") errors.push("ready_for_playtest 要求 accepted 候选");
    if (candidate.pre_submission_state !== "completed") {
      errors.push("ready_for_playtest 要求 pre_submission_state=completed");
    }
    if (!stringOrEmpty(candidate.delivery_exact_version)) {
      errors.push("ready_for_playtest 缺少 delivery_exact_version");
    } else if (candidate.delivery_exact_version !== exactVersion) {
      errors.push("ready_for_playtest 的 delivery_exact_version 必须等于当前 exact_version");
    }
    if (candidate.playtest_status === "not_queued") {
      errors.push("ready_for_playtest 候选必须已进入待玩流程");
    }
    try {
      const record = await readYamlRef(candidate.pre_submission_check_ref);
      if (record.candidate_id !== candidateId) errors.push("提交前记录的 candidate_id 不一致");
      if (record.reviewed_exact_version !== candidate.reviewed_exact_version) {
        errors.push("提交前记录的 reviewed_exact_version 不一致");
      }
      if (record.delivery_exact_version !== candidate.delivery_exact_version) {
        errors.push("提交前记录的 delivery_exact_version 不一致");
      }
      if (record.overall_status !== "completed" || record.return_to_design_required !== false) {
        errors.push("ready_for_playtest 要求提交前记录完整且无需回到设计");
      }
      const workflowResults = requireArray(record.workflow_results, "pre_submission.workflow_results");
      const changedResults = workflowResults.filter((result) => result?.version_effect === "changed");
      for (const [index, result] of workflowResults.entries()) {
        if (!result || !["completed", "not_applicable"].includes(result.status)) {
          errors.push(`提交前 workflow_results[${index}] 未完成`);
        }
        if (result?.version_effect === "changed" && result.review_effect !== "preserved") {
          errors.push(`提交前 workflow_results[${index}] 改变版本但未保留 review`);
        }
      }
      if (
        candidate.reviewed_exact_version !== candidate.delivery_exact_version
        && changedResults.length === 0
      ) {
        errors.push("reviewed 与 delivery 版本不同，但提交前记录没有版本变化项");
      }
    } catch (error) {
      errors.push(`提交前记录无法验证：${errorMessage(error)}`);
    }
  }
}

async function validateDesignerAssignmentCommand(options) {
  const assignmentRef = requireArg(options, "assignment");
  await assertValidDesignerAssignment(assignmentRef);
  console.log(`Designer assignment 校验通过：${normalizeRef(assignmentRef)}`);
}

async function assertValidDesignerAssignment(assignmentRef) {
  const assignment = await readYamlRef(assignmentRef);
  if (assignment.required_skill !== REQUIRED_DESIGNER_SKILL) {
    throw new Error(`required_skill 必须为 ${REQUIRED_DESIGNER_SKILL}：${assignmentRef}`);
  }

  const assignmentId = requireString(assignment.assignment_id, `${assignmentRef}.assignment_id`);
  const assignmentKind = requireString(assignment.assignment_kind, `${assignmentRef}.assignment_kind`);
  if (!VALID_ASSIGNMENT_KINDS.has(assignmentKind)) {
    throw new Error(`${assignmentRef}.assignment_kind 非法：${assignmentKind}`);
  }
  requireString(assignment.controller_instance_id, `${assignmentRef}.controller_instance_id`);
  requireString(assignment.design_brief, `${assignmentRef}.design_brief`);

  const taskRootRef = requireString(assignment.task_root, `${assignmentRef}.task_root`);
  const taskRootPath = resolveRepoRef(taskRootRef);
  await access(taskRootPath);
  assertPathWithin(resolveRepoRef(assignmentRef), taskRootPath, `${assignmentRef} 必须位于 task_root 内`);

  const ledgerRef = requireString(assignment.candidate_ledger_ref, `${assignmentRef}.candidate_ledger_ref`);
  const ledgerPath = resolveRepoRef(ledgerRef);
  assertPathWithin(ledgerPath, taskRootPath, `${assignmentRef}.candidate_ledger_ref 必须位于 task_root 内`);
  await access(ledgerPath);
  const ledger = await readYamlRef(ledgerRef);
  const candidate = asObject(ledger.candidate, `${ledgerRef}.candidate`);

  const inputRefs = requireStringArray(assignment.input_refs, `${assignmentRef}.input_refs`);
  for (const [index, ref] of inputRefs.entries()) {
    await assertRefExists(ref, `${assignmentRef}.input_refs[${index}]`);
  }

  const allowedOutputRefs = requireStringArray(
    assignment.allowed_output_refs,
    `${assignmentRef}.allowed_output_refs`,
  );
  if (allowedOutputRefs.length === 0) throw new Error(`${assignmentRef}.allowed_output_refs 不能为空`);
  for (const [index, ref] of allowedOutputRefs.entries()) {
    const outputPath = resolveRepoRef(ref);
    assertPathWithin(
      outputPath,
      taskRootPath,
      `${assignmentRef}.allowed_output_refs[${index}] 必须位于 task_root 内`,
    );
    if (DESIGNER_FORBIDDEN_OUTPUT_BASENAMES.has(path.basename(outputPath).toLowerCase())) {
      throw new Error(`${assignmentRef}.allowed_output_refs[${index}] 指向 Controller 专属文件：${ref}`);
    }
  }

  const requiredOutputs = requireStringArray(assignment.required_outputs, `${assignmentRef}.required_outputs`);
  if (requiredOutputs.length === 0) throw new Error(`${assignmentRef}.required_outputs 不能为空`);

  if (assignment.exploration_request_root !== null && assignment.exploration_request_root !== undefined) {
    const requestRootRef = requireString(
      assignment.exploration_request_root,
      `${assignmentRef}.exploration_request_root`,
    );
    const requestRootPath = resolveRepoRef(requestRootRef);
    assertPathWithin(
      requestRootPath,
      taskRootPath,
      `${assignmentRef}.exploration_request_root 必须位于 task_root 内`,
    );
    const expectedRequestRoot = path.join(taskRootPath, "exploration", "requests");
    if (path.normalize(requestRootPath) !== path.normalize(expectedRequestRoot)) {
      throw new Error(`${assignmentRef}.exploration_request_root 必须是 task_root/exploration/requests`);
    }
  }

  if (assignmentKind === "experience_brief") {
    if (assignment.candidate_id !== null || assignment.exact_version_basis !== null) {
      throw new Error(`${assignmentId} 的 experience_brief assignment 不得绑定候选或版本`);
    }
  } else {
    const assignmentCandidateId = requireString(assignment.candidate_id, `${assignmentId}.candidate_id`);
    if (assignmentCandidateId !== candidate.candidate_id) {
      throw new Error(`${assignmentId}.candidate_id 与单候选账本不一致`);
    }
    if (["revision", "review_response", "pre_submission_design_check"].includes(assignmentKind)) {
      const basis = requireString(assignment.exact_version_basis, `${assignmentId}.exact_version_basis`);
      if (basis !== candidate.exact_version) {
        throw new Error(`${assignmentId}.exact_version_basis 与当前候选不一致`);
      }
    }
    if (assignmentKind === "pre_submission_design_check" && candidate.candidate_state !== "accepted") {
      throw new Error(`${assignmentId} 只能分配给 accepted 候选`);
    }
  }

  return assignment;
}

async function validateDesignerAction(options) {
  const ledgerRef = requireArg(options, "ledger");
  const actionRef = requireArg(options, "action");
  const ledger = await readYamlRef(ledgerRef);
  const candidate = asObject(ledger.candidate, "candidate");
  const action = await readYamlRef(actionRef);

  const forbiddenPaths = findForbiddenControlFields(action);
  if (forbiddenPaths.length > 0) {
    throw new Error(`Designer action 含 Controller 专属字段：${forbiddenPaths.join(", ")}`);
  }

  const assignmentRef = requireString(action.assignment_ref, `${actionRef}.assignment_ref`);
  const assignment = await assertValidDesignerAssignment(assignmentRef);
  if (assignment.assignment_kind !== "review_response") {
    throw new Error(`${assignmentRef}.assignment_kind 必须为 review_response`);
  }
  if (normalizeRef(assignment.candidate_ledger_ref) !== normalizeRef(ledgerRef)) {
    throw new Error(`${assignmentRef} 未引用 --ledger 指定的账本`);
  }
  if (!assignment.allowed_output_refs.map(normalizeRef).includes(normalizeRef(actionRef))) {
    throw new Error(`${actionRef} 不在 assignment.allowed_output_refs 内`);
  }
  requireString(action.designer_instance_id, `${actionRef}.designer_instance_id`);
  if (!Number.isInteger(action.review_round_answered) || action.review_round_answered < 0) {
    throw new Error(`${actionRef}.review_round_answered 必须是非负整数`);
  }

  const candidateId = requireString(action.candidate_id, `${actionRef}.candidate_id`);
  if (candidateId !== candidate.candidate_id || assignment.candidate_id !== candidateId) {
    throw new Error(`${actionRef}.candidate_id 与 assignment / 账本不一致`);
  }
  const exactVersion = requireString(action.exact_version_answered, `${actionRef}.exact_version_answered`);
  if (exactVersion !== candidate.exact_version || assignment.exact_version_basis !== exactVersion) {
    throw new Error(`${actionRef}.exact_version_answered 与 assignment / 账本不一致`);
  }

  const response = requireString(action.response, `${actionRef}.response`);
  if (!VALID_DESIGNER_RESPONSES.has(response)) {
    throw new Error(`${actionRef}.response 非法：${response}`);
  }
  const responseItems = requireStringArray(action.design_response_and_refs, `${actionRef}.design_response_and_refs`);
  if (responseItems.length === 0) throw new Error(`${actionRef}.design_response_and_refs 不能为空`);

  const evidenceRefs = requireStringArray(action.evidence_review_refs, `${actionRef}.evidence_review_refs`);
  if (!sameNormalizedStringSet(evidenceRefs, candidate.evidence_review_refs)) {
    throw new Error(`${actionRef}.evidence_review_refs 与当前候选不一致`);
  }
  for (const [index, ref] of evidenceRefs.entries()) {
    await assertRefExists(ref, `${actionRef}.evidence_review_refs[${index}]`);
  }

  const criticRef = requireString(action.critic_review_ref, `${actionRef}.critic_review_ref`);
  if (normalizeRef(criticRef) !== normalizeRef(candidate.critic_review_ref)) {
    throw new Error(`${actionRef}.critic_review_ref 与当前候选不一致`);
  }
  await assertRefExists(criticRef, `${actionRef}.critic_review_ref`);

  const assignmentInputs = new Set(assignment.input_refs.map(normalizeRef));
  if (!assignmentInputs.has(normalizeRef(criticRef))) {
    throw new Error(`${assignmentRef}.input_refs 缺少 Critic review：${criticRef}`);
  }

  const verdict = await readCriticVerdict(criticRef);
  if (verdict !== "return_to_design") {
    throw new Error(`${actionRef} 只能响应退回同一候选的 Critic review`);
  }

  console.log(`Designer action 校验通过：${normalizeRef(actionRef)}`);
}

async function validateExploration(options) {
  const briefRef = requireArg(options, "brief");
  const brief = await readYamlRef(briefRef);
  await assertValidTaskExploration(brief);
  console.log(`task exploration 校验通过：${normalizeRef(briefRef)}`);
}

async function assertValidTaskExploration(brief) {
  const task = asObject(brief.task_exploration, "task_exploration");
  assertTaskExplorationIdentity(task, "task_exploration");

  const dispatchRef = requireString(task.dispatch_ref, "task_exploration.dispatch_ref");
  const lexiconRef = requireString(task.task_lexicon_ref, "task_exploration.task_lexicon_ref");
  const indexRef = requireString(task.task_index_ref, "task_exploration.task_index_ref");
  const firstMaterialBatchRef = requireString(
    task.first_material_batch_ref,
    "task_exploration.first_material_batch_ref",
  );
  const selectedMaterialRefs = requireStringArray(
    task.selected_material_refs,
    "task_exploration.selected_material_refs",
  );
  if (selectedMaterialRefs.length === 0) {
    throw new Error("task_exploration.selected_material_refs 不能为空");
  }

  await assertRefExists(dispatchRef, "task_exploration.dispatch_ref");
  await assertRefExists(lexiconRef, "task_exploration.task_lexicon_ref");
  await assertRefExists(indexRef, "task_exploration.task_index_ref");
  await assertRefExists(firstMaterialBatchRef, "task_exploration.first_material_batch_ref");
  for (const [index, ref] of selectedMaterialRefs.entries()) {
    await assertRefExists(ref, `task_exploration.selected_material_refs[${index}]`);
  }

  const dispatch = await readYamlRef(dispatchRef);
  assertTaskExplorationIdentity(dispatch, dispatchRef);
  const explorationId = requireString(dispatch.exploration_id, `${dispatchRef}.exploration_id`);
  requireString(dispatch.prototype_id, `${dispatchRef}.prototype_id`);
  requireString(dispatch.workspace, `${dispatchRef}.workspace`);
  requireString(dispatch.experience_seed, `${dispatchRef}.experience_seed`);
  requireStringArray(dispatch.player_prior, `${dispatchRef}.player_prior`);
  requireStringArray(dispatch.allowed_mechanisms, `${dispatchRef}.allowed_mechanisms`);
  requireStringArray(dispatch.allowed_tools, `${dispatchRef}.allowed_tools`);
  const sourceBoundary = asObject(dispatch.source_boundary, `${dispatchRef}.source_boundary`);
  requireStringArray(sourceBoundary.allowed, `${dispatchRef}.source_boundary.allowed`);
  requireStringArray(sourceBoundary.forbidden, `${dispatchRef}.source_boundary.forbidden`);

  const dispatchPrompt = requireString(dispatch.dispatch_prompt, `${dispatchRef}.dispatch_prompt`);
  for (const token of ["$sokoban-mechanism-lab", REQUIRED_EXPLORATION_INTENT, REQUIRED_PUBLICATION_SCOPE]) {
    if (!dispatchPrompt.includes(token)) {
      throw new Error(`${dispatchRef}.dispatch_prompt 缺少显式调用标识：${token}`);
    }
  }
  if (normalizeRef(dispatch.task_lexicon_ref) !== normalizeRef(lexiconRef)) {
    throw new Error(`${dispatchRef}.task_lexicon_ref 与体验简报不一致`);
  }
  if (normalizeRef(dispatch.task_index_ref) !== normalizeRef(indexRef)) {
    throw new Error(`${dispatchRef}.task_index_ref 与体验简报不一致`);
  }

  const batch = await readYamlRef(firstMaterialBatchRef);
  assertTaskExplorationIdentity(batch, firstMaterialBatchRef);
  if (batch.status !== "published") throw new Error(`${firstMaterialBatchRef}.status 必须为 published`);
  if (batch.exploration_id !== explorationId) {
    throw new Error(`${firstMaterialBatchRef}.exploration_id 与 dispatch 不一致`);
  }
  await assertRefExists(
    requireString(batch.request_ref, `${firstMaterialBatchRef}.request_ref`),
    `${firstMaterialBatchRef}.request_ref`,
  );
  requireStringArray(batch.sampled_axes, `${firstMaterialBatchRef}.sampled_axes`);
  const newMaterialRefs = requireStringArray(batch.new_material_refs, `${firstMaterialBatchRef}.new_material_refs`);
  const mergedMaterialRefs = requireStringArray(
    batch.merged_material_refs,
    `${firstMaterialBatchRef}.merged_material_refs`,
  );
  const publishedMaterialRefs = [...newMaterialRefs, ...mergedMaterialRefs];
  if (publishedMaterialRefs.length === 0) {
    throw new Error(`${firstMaterialBatchRef} 必须发布或合并至少一项正向材料`);
  }
  requireStringArray(batch.next_sampling_axes, `${firstMaterialBatchRef}.next_sampling_axes`);
  const rawArtifactRefs = requireStringArray(
    batch.raw_artifact_refs,
    `${firstMaterialBatchRef}.raw_artifact_refs`,
  );
  if (rawArtifactRefs.length === 0) throw new Error(`${firstMaterialBatchRef}.raw_artifact_refs 不能为空`);
  for (const [index, ref] of [...publishedMaterialRefs, ...rawArtifactRefs].entries()) {
    await assertRefExists(ref, `${firstMaterialBatchRef}.artifact_refs[${index}]`);
  }
}

function assertTaskExplorationIdentity(value, label) {
  if (value.required_skill !== REQUIRED_EXPLORATION_SKILL) {
    throw new Error(`${label}.required_skill 必须为 ${REQUIRED_EXPLORATION_SKILL}`);
  }
  if (value.intent !== REQUIRED_EXPLORATION_INTENT) {
    throw new Error(`${label}.intent 必须为 ${REQUIRED_EXPLORATION_INTENT}`);
  }
  if (value.publication_scope !== REQUIRED_PUBLICATION_SCOPE) {
    throw new Error(`${label}.publication_scope 必须为 ${REQUIRED_PUBLICATION_SCOPE}`);
  }
}

async function buildReviewArtifact(candidate) {
  const candidateId = requireString(candidate.candidate_id, "candidate.candidate_id");
  const exactVersion = requireString(candidate.exact_version, "candidate.exact_version");
  const layoutRef = requireString(candidate.layout_ref, "candidate.layout_ref");
  const replayRef = requireString(candidate.canonical_trace_ref, "candidate.canonical_trace_ref");
  const layout = (await readTextRef(layoutRef)).trimEnd();
  const replay = await readJsonRef(replayRef);
  const replayLayout = requireString(replay.layout, `${replayRef}.layout`).trimEnd();
  if (layout !== replayLayout) throw new Error(`layout 与 replay 不一致：${candidateId}`);

  const inputs = requireStringArray(replay.inputs, `${replayRef}.inputs`);
  const steps = requireArray(replay.steps, `${replayRef}.steps`);
  if (inputs.length === 0 || steps.length === 0) {
    throw new Error(`canonical replay 必须包含非空 inputs 和 steps：${candidateId}`);
  }
  if (steps.some((step) => !step || step.legal !== true)) {
    throw new Error(`canonical replay 含非法步骤：${candidateId}`);
  }
  if (replay.replay?.completed !== true || replay.final?.isWin !== true) {
    throw new Error(`canonical replay 未完成胜利：${candidateId}`);
  }

  const packetEntry = {
    candidate_id: candidateId,
    exact_version: exactVersion,
    solve_instance: {
      layout,
      player_start: findPlayerStart(layout),
      win_condition: replay.winCondition,
    },
    canonical_solution: {
      exact_inputs: inputs,
      mechanically_derived_trace: steps.map((rawStep, index) => {
        const step = asObject(rawStep, `${replayRef}.steps[${index}]`);
        return {
          step: step.step,
          input: step.action,
          before_layout: requireString(step.before?.render, `${replayRef}.steps[${index}].before.render`),
          event: requireStringArray(step.events, `${replayRef}.steps[${index}].events`).join(", "),
          after_layout: requireString(step.after?.render, `${replayRef}.steps[${index}].after.render`),
        };
      }),
    },
  };

  return {
    prototype_id: requireString(replay.prototype, `${replayRef}.prototype`),
    packet_entry: packetEntry,
  };
}

async function validateReviewCycle(cycle, label, candidateId, errors) {
  for (const field of [
    "exact_version",
    "review_attempt_id",
    "critic_instance_id",
    "critic_base_ref",
    "critic_review_ref",
  ]) {
    if (!stringOrEmpty(cycle[field])) errors.push(`${label}.${field} 缺失`);
  }
  for (const field of ["critic_base_ref", "critic_review_ref"]) {
    await checkRef(cycle[field], `${label}.${field}`, errors);
  }
  const evidenceRefs = Array.isArray(cycle.evidence_review_refs) ? cycle.evidence_review_refs : [];
  if (evidenceRefs.length === 0) errors.push(`${label}.evidence_review_refs 不能为空`);
  for (const [index, ref] of evidenceRefs.entries()) {
    await checkRef(ref, `${label}.evidence_review_refs[${index}]`, errors);
  }

  try {
    const base = await readYamlRef(cycle.critic_base_ref);
    const baseCandidate = asObject(base.candidate, `${cycle.critic_base_ref}.candidate`);
    if (base.review_attempt_id !== cycle.review_attempt_id) {
      errors.push(`${label}.review_attempt_id 与 Critic base 不一致`);
    }
    if (baseCandidate.candidate_id !== candidateId || baseCandidate.exact_version !== cycle.exact_version) {
      errors.push(`${label} 的 Critic base 与候选版本不一致`);
    }
    if (base.mechanical_evidence_status !== "supported") {
      errors.push(`${label} 的 Critic packet 未确认机械证据 supported`);
    }

    const verdict = await readCriticVerdict(cycle.critic_review_ref);
    const accepts = cycle.controller_recorded_outcome === "accept_candidate";
    if (accepts && verdict !== "worth_playtesting") {
      errors.push(`${label} 的 Critic 未判定值得进入待玩，不能接受候选`);
    }
    if (!accepts && verdict !== "return_to_design") {
      errors.push(`${label} 的 Critic 未退回候选，不能记录设计动作`);
    }

    const responseByOutcome = {
      return_to_design: "revise_candidate",
      change_structure_family: "change_structure_family",
      withdraw_exact: "withdraw_exact",
      dispute_packet: "dispute_raw_packet",
    };
    const expectedResponse = responseByOutcome[cycle.controller_recorded_outcome];
    if (accepts) {
      if (stringOrEmpty(cycle.designer_action_ref)) {
        errors.push(`${label} 接受候选时不应伪造 Designer acceptance action`);
      }
    } else {
      if (!stringOrEmpty(cycle.designer_action_ref)) {
        errors.push(`${label}.designer_action_ref 缺失`);
      } else {
        await checkRef(cycle.designer_action_ref, `${label}.designer_action_ref`, errors);
        const action = await readYamlRef(cycle.designer_action_ref);
        if (action.candidate_id !== candidateId || action.exact_version_answered !== cycle.exact_version) {
          errors.push(`${label} 的 Designer action 与候选版本不一致`);
        }
        if (normalizeRef(action.critic_review_ref) !== normalizeRef(cycle.critic_review_ref)) {
          errors.push(`${label} 的 Designer action 未引用本轮 Critic review`);
        }
        if (expectedResponse && action.response !== expectedResponse) {
          errors.push(`${label} 的 Controller outcome 与 Designer response 不一致`);
        }
      }
    }
  } catch (error) {
    errors.push(`${label} 的 review chain 无法读取：${errorMessage(error)}`);
  }
}

async function recordCycleEvidenceReviewerVersions(cycle, versions, errors) {
  await recordEvidenceReviewerVersions(
    cycle.evidence_review_refs,
    cycle.exact_version,
    versions,
    `${cycle.cycle_id}.evidence_review_refs`,
    errors,
  );
}

async function recordEvidenceReviewerVersions(refs, exactVersion, versions, label, errors) {
  if (!Array.isArray(refs)) return;
  for (const [index, ref] of [...new Set(refs.map(normalizeRef))].entries()) {
    try {
      const review = await readYamlRef(ref);
      recordReviewerVersion(
        versions,
        review.reviewer_instance_id,
        exactVersion,
        `${label}[${index}].reviewer_instance_id`,
        errors,
      );
    } catch (error) {
      errors.push(`${label}[${index}] 无法读取 reviewer 身份：${errorMessage(error)}`);
    }
  }
}

function recordReviewerVersion(versions, reviewerId, exactVersion, label, errors) {
  if (!stringOrEmpty(reviewerId) || !stringOrEmpty(exactVersion)) return;
  const priorVersion = versions.get(reviewerId);
  if (priorVersion && priorVersion !== exactVersion) {
    errors.push(`${label} 复用了其它 exact version 的 reviewer_instance_id：${reviewerId}`);
    return;
  }
  versions.set(reviewerId, exactVersion);
}

function recordCriticForExact(criticsByExact, exactVersion, criticId, label, errors) {
  if (!stringOrEmpty(exactVersion) || !stringOrEmpty(criticId)) return;
  const priorCritic = criticsByExact.get(exactVersion);
  if (priorCritic && priorCritic !== criticId) {
    errors.push(`${label} 为同一 exact version 更换了 Critic：${priorCritic} → ${criticId}`);
    return;
  }
  criticsByExact.set(exactVersion, criticId);
}

async function assertSupportedEvidence(candidate, label) {
  const refs = requireStringArray(candidate.evidence_review_refs, `${label}.evidence_review_refs`);
  if (refs.length === 0) throw new Error(`${label}.evidence_review_refs 不能为空`);
  for (const ref of refs) {
    const review = await readYamlRef(ref);
    requireString(review.reviewer_instance_id, `${ref}.reviewer_instance_id`);
    if (review.review_integrity !== "independent" || review.overall_hard_status !== "supported") {
      throw new Error(`${label} 的硬证据未独立 supported：${ref}`);
    }
    if (review.candidate_id !== candidate.candidate_id) {
      throw new Error(`${label} 的硬证据 candidate_id 不一致：${ref}`);
    }
    if (review.exact_version !== candidate.exact_version) {
      throw new Error(`${label} 的硬证据 exact_version 不一致：${ref}`);
    }
  }
}

async function checkRef(ref, label, errors) {
  if (typeof ref !== "string" || ref.length === 0) {
    errors.push(`${label} 缺失`);
    return;
  }
  try {
    await access(resolveRepoRef(ref));
  } catch {
    errors.push(`${label} 不存在：${ref}`);
  }
}

async function assertRefExists(ref, label) {
  requireString(ref, label);
  try {
    await access(resolveRepoRef(ref));
  } catch {
    throw new Error(`${label} 不存在：${ref}`);
  }
}

async function readCriticVerdict(ref) {
  const text = await readTextRef(ref);
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines[0] === CRITIC_ACCEPT_LINE) {
    if (lines.length < 2) throw new Error(`${ref} 缺少自然语言批评正文`);
    return "worth_playtesting";
  }
  if (lines[0] === CRITIC_RETURN_LINE) {
    if (lines.length < 2) throw new Error(`${ref} 缺少自然语言批评正文`);
    return "return_to_design";
  }
  throw new Error(`${ref} 第一行不是规定的 Critic verdict`);
}

function findPlayerStart(layout) {
  const rows = layout.split("\n");
  for (let y = 0; y < rows.length; y += 1) {
    const x = rows[y].indexOf("@");
    if (x >= 0) return [x, y];
  }
  throw new Error("layout 缺少玩家 @");
}

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    const token = values[index];
    if (!token?.startsWith("--")) throw new Error(`无法解析参数：${String(token)}`);
    const key = token.slice(2);
    const value = values[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`参数 --${key} 缺少值`);
    parsed[key] = value;
    index += 1;
  }
  return parsed;
}

function requireArg(options, name) {
  const value = options[name];
  if (!value) throw new Error(`缺少 --${name}`);
  return value;
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) throw new Error(`${label} 必须是非空字符串`);
  return value;
}

function requireStringArray(value, label) {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) {
    throw new Error(`${label} 必须是字符串数组`);
  }
  return value;
}

function requireNonEmptyUniqueRefs(value, label) {
  const refs = requireStringArray(value, label).map(normalizeRef);
  if (refs.length === 0) throw new Error(`${label} 不能为空`);
  if (new Set(refs).size !== refs.length) throw new Error(`${label} 含重复引用`);
  return refs;
}

function requireArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} 必须是数组`);
  return value;
}

function asObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} 必须是对象`);
  return value;
}

function safeObject(value, label, errors) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    errors.push(`${label} 必须是对象`);
    return null;
  }
  return value;
}

function assertPathWithin(candidatePath, parentPath, label) {
  const relative = path.relative(parentPath, candidatePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error(label);
}

function findForbiddenControlFields(value, prefix = "") {
  if (!value || typeof value !== "object") return [];
  const found = [];
  for (const [key, child] of Object.entries(value)) {
    const fieldPath = prefix ? `${prefix}.${key}` : key;
    if (DESIGNER_FORBIDDEN_CONTROL_FIELDS.has(key)) found.push(fieldPath);
    found.push(...findForbiddenControlFields(child, fieldPath));
  }
  return found;
}

function sameNormalizedStringSet(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) return false;
  const leftSet = new Set(left.map(normalizeRef));
  const rightSet = new Set(right.map(normalizeRef));
  if (leftSet.size !== rightSet.size) return false;
  return [...leftSet].every((entry) => rightSet.has(entry));
}

function stringOrEmpty(value) {
  return typeof value === "string" ? value : "";
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

async function readYamlRef(ref) {
  return asObject(YAML.parse(await readTextRef(ref)), normalizeRef(ref));
}

async function readJsonRef(ref) {
  return asObject(JSON.parse(await readTextRef(ref)), normalizeRef(ref));
}

async function readTextRef(ref) {
  return readFile(resolveRepoRef(ref), "utf8");
}

async function writeYamlRef(ref, value) {
  const outputPath = resolveRepoRef(ref);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, YAML.stringify(value, { lineWidth: 0 }), "utf8");
}

function resolveRepoRef(ref) {
  const withoutFragment = normalizeRef(ref).split("#", 1)[0];
  const resolved = path.resolve(repoRoot, withoutFragment);
  const relative = path.relative(repoRoot, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`引用越出仓库：${ref}`);
  }
  return resolved;
}

function normalizeRef(ref) {
  return String(ref).replaceAll("\\", "/");
}

function printUsage() {
  console.error("用法：");
  console.error("  node level-design-controller.mjs validate-assignment --assignment <designer_assignment.yml>");
  console.error("  node level-design-controller.mjs prepare-critic --ledger <candidate_ledger.yml> --attempt <id> --out <base.yml>");
  console.error("  node level-design-controller.mjs validate-designer-action --ledger <candidate_ledger.yml> --action <designer_action.yml>");
  console.error("  node level-design-controller.mjs validate-exploration --brief <experience_brief.yml>");
  console.error("  node level-design-controller.mjs validate --ledger <candidate_ledger.yml>");
}

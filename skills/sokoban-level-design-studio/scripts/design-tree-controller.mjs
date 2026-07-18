#!/usr/bin/env node

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
const VALID_GROWTH_RELATIONS = new Set(["baseline", "construct_prefix", "apply_suffix"]);
const VALID_TREE_STATES = new Set(["building_baseline", "growing", "sufficient"]);
const VALID_DECISION_OUTCOMES = new Set(["freeze_root", "freeze_child", "return_to_design", "tree_sufficient"]);
const VALID_QUALITY_VERDICTS = new Set(["survive_quality_gate", "revise_and_rereview", "reject_candidate"]);
const REQUIRED_EXPLORATION_SKILL = "sokoban-mechanism-lab";
const REQUIRED_EXPLORATION_INTENT = "mechanism_explore";
const REQUIRED_PUBLICATION_SCOPE = "task_local";
const VALID_ATTEMPT_STATUSES = new Set([
  "revised",
  "rejected_mechanical",
  "rejected_identity",
  "rejected_no_experience",
  "rejected_quality_gate",
  "rejected_splicing",
  "frozen",
]);

const [command, ...argv] = process.argv.slice(2);
const args = parseArgs(argv);

try {
  switch (command) {
    case "prepare-review":
      await prepareReviewPacket(args);
      break;
    case "prepare-coach":
      await prepareCoachContext(args);
      break;
    case "validate":
      await validateDesignTree(args);
      break;
    case "validate-exploration":
      await validateExploration(args);
      break;
    default:
      printUsage();
      process.exitCode = 2;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

async function prepareReviewPacket(options) {
  const treeRef = requireArg(options, "tree");
  const nodeId = requireArg(options, "node");
  const reviewAttemptId = requireArg(options, "attempt");
  const outRef = requireArg(options, "out");
  const tree = await readYamlRef(treeRef);
  const brief = await readYamlRef(requireString(tree.experience_brief_ref, "experience_brief_ref"));
  await assertValidTaskExploration(brief);
  const node = findNode(tree, nodeId);
  const parent = node.parent_node_id ? findFrozenNode(tree, node.parent_node_id) : null;

  if (node.node_state !== "hard_validated") {
    throw new Error(`只有 hard_validated 节点才能生成阶段 A packet：${nodeId}`);
  }
  await assertSupportedEvidence(node, nodeId);

  if (node.growth_relation === "baseline" && parent) {
    throw new Error(`baseline 节点不能有父节点：${nodeId}`);
  }
  if (node.growth_relation !== "baseline" && !parent) {
    throw new Error(`生长子节点的父节点必须已冻结：${nodeId}`);
  }

  const candidate = await buildReviewArtifact(node);
  const frozenParent = parent ? await buildReviewArtifact(parent) : null;
  const prototypeContext = asObject(brief.prototype_context, "prototype_context");
  const playerContext = asObject(brief.player_context, "player_context");
  const packet = {
    review_attempt_id: reviewAttemptId,
    prototype_id: candidate.prototype_id,
    review_target: parent ? "growth_child" : "baseline_root",
    prototype_rules: {
      confirmed_rules: requireStringArray(prototypeContext.confirmed_rules, "prototype_context.confirmed_rules"),
      win_condition: requireString(prototypeContext.win_condition, "prototype_context.win_condition"),
      object_and_event_semantics: requireStringArray(
        prototypeContext.object_and_event_semantics,
        "prototype_context.object_and_event_semantics",
      ),
      player_prior: requireStringArray(playerContext.player_prior, "player_context.player_prior"),
    },
    human_review_constraints: Array.isArray(brief.human_review_constraints)
      ? brief.human_review_constraints
      : [],
    frozen_parent: frozenParent?.packet_entry ?? null,
    candidate: candidate.packet_entry,
    artifact_refs: [
      ...(frozenParent?.artifact_refs ?? []),
      ...candidate.artifact_refs,
    ],
  };

  await writeYamlRef(outRef, packet);
  console.log(normalizeRef(outRef));
}

async function prepareCoachContext(options) {
  const treeRef = requireArg(options, "tree");
  const nodeId = requireArg(options, "node");
  const qualityRef = requireArg(options, "quality");
  const outRef = requireArg(options, "out");
  const tree = await readYamlRef(treeRef);
  const brief = await readYamlRef(requireString(tree.experience_brief_ref, "experience_brief_ref"));
  const quality = await readYamlRef(qualityRef);
  const node = findNode(tree, nodeId);

  if (normalizeRef(node.quality_review_ref) !== normalizeRef(qualityRef)) {
    throw new Error(`节点登记的阶段 A 与 --quality 不一致：${nodeId}`);
  }

  if (quality.review_integrity !== "independent") {
    throw new Error(`阶段 A review_integrity 必须为 independent：${qualityRef}`);
  }
  const qualityOutcome = requireString(quality.overall_verdict, "quality.overall_verdict");
  if (!VALID_QUALITY_VERDICTS.has(qualityOutcome)) {
    throw new Error(`阶段 A overall_verdict 非法：${qualityRef}`);
  }
  const coachAuthority = qualityOutcome === "survive_quality_gate" ? "tree_decision" : "direction_guard_only";
  const expectedNodeState = qualityOutcome === "survive_quality_gate" ? "quality_survived" : "hard_validated";
  if (node.node_state !== expectedNodeState) {
    throw new Error(`阶段 A verdict=${qualityOutcome} 时节点必须为 ${expectedNodeState}：${nodeId}`);
  }
  assertQualityMatchesNode(quality, node, qualityRef);

  const experienceCore = asObject(brief.experience_core, "experience_core");
  const workIdentity = asObject(brief.work_identity, "work_identity");
  const prototypeContext = asObject(brief.prototype_context, "prototype_context");
  const frozenNodes = requireArray(tree.frozen_nodes, "frozen_nodes");
  const parent = node.parent_node_id ? findFrozenNode(tree, node.parent_node_id) : null;
  const sourceCoachNoteRef = parent
    ? requireString(node.source_coach_note_ref, "node.source_coach_note_ref")
    : null;
  const context = {
    review_attempt_id: requireString(quality.review_attempt_id, "quality.review_attempt_id"),
    quality_gate_ref: normalizeRef(qualityRef),
    quality_gate_outcome: qualityOutcome,
    coach_authority: coachAuthority,
    experience_core: {
      experience_statement: requireString(experienceCore.experience_statement, "experience_core.experience_statement"),
      player_action: requireString(experienceCore.player_action, "experience_core.player_action"),
      visible_payoff: requireString(experienceCore.visible_payoff, "experience_core.visible_payoff"),
      identity_conditions: requireStringArray(workIdentity.conditions, "work_identity.conditions"),
    },
    design_tree: {
      root_node_id: tree.root_node_id ?? null,
      active_node_id: node.node_id,
      frozen_nodes: frozenNodes.map((entry, index) => {
        const frozen = asObject(entry, `frozen_nodes[${index}]`);
        return {
          node_id: requireString(frozen.node_id, `frozen_nodes[${index}].node_id`),
          parent_node_id: frozen.parent_node_id ?? null,
          exact_version: requireString(
            frozen.reviewed_exact_version,
            `frozen_nodes[${index}].reviewed_exact_version`,
          ),
          growth_relation: requireString(
            frozen.growth_relation,
            `frozen_nodes[${index}].growth_relation`,
          ),
          layout_ref: requireString(frozen.layout_ref, `frozen_nodes[${index}].layout_ref`),
          replay_ref: requireString(
            frozen.canonical_trace_ref,
            `frozen_nodes[${index}].canonical_trace_ref`,
          ),
          coach_note_ref: requireString(frozen.coach_note_ref, `frozen_nodes[${index}].coach_note_ref`),
        };
      }),
    },
    current_review: {
      node_role: parent ? "growth_child" : "baseline_root",
      parent_node_id: node.parent_node_id ?? null,
      intended_growth_relation: requireString(node.growth_relation, "node.growth_relation"),
      designer_intent_in_one_sentence: requireString(
        node.designer_intent_in_one_sentence,
        "node.designer_intent_in_one_sentence",
      ),
      source_coach_note_ref: sourceCoachNoteRef ? normalizeRef(sourceCoachNoteRef) : null,
    },
    allowed_mechanisms: requireStringArray(
      prototypeContext.allowed_mechanisms,
      "prototype_context.allowed_mechanisms",
    ),
    artifact_refs: uniqueStrings([
      ...(parent ? [parent.layout_ref, parent.canonical_trace_ref] : []),
      ...(sourceCoachNoteRef ? [sourceCoachNoteRef] : []),
      node.layout_ref,
      node.canonical_trace_ref,
    ]),
  };

  await writeYamlRef(outRef, context);
  console.log(normalizeRef(outRef));
}

async function validateDesignTree(options) {
  const treeRef = requireArg(options, "tree");
  const tree = await readYamlRef(treeRef);
  const errors = [];
  const warnings = [];
  const frozenNodes = Array.isArray(tree.frozen_nodes) ? tree.frozen_nodes : [];
  const decisions = Array.isArray(tree.tree_decisions) ? tree.tree_decisions : [];
  const attempts = Array.isArray(tree.attempts) ? tree.attempts : [];
  const frozenById = new Map();
  const decisionIds = new Set();

  if (!VALID_TREE_STATES.has(tree.tree_state)) {
    errors.push(`非法 tree_state：${String(tree.tree_state)}`);
  }
  await checkRef(tree.experience_brief_ref, "experience_brief_ref", errors);
  try {
    const brief = await readYamlRef(tree.experience_brief_ref);
    await assertValidTaskExploration(brief);
  } catch (error) {
    errors.push(`task exploration 无效：${error instanceof Error ? error.message : String(error)}`);
  }

  for (const [index, rawNode] of frozenNodes.entries()) {
    const node = safeObject(rawNode, `frozen_nodes[${index}]`, errors);
    if (!node) continue;
    const nodeId = stringOrEmpty(node.node_id);
    if (!nodeId) {
      errors.push(`frozen_nodes[${index}] 缺少 node_id`);
      continue;
    }
    if (frozenById.has(nodeId)) errors.push(`重复 frozen node_id：${nodeId}`);
    frozenById.set(nodeId, node);
    if (node.node_state !== "frozen") errors.push(`${nodeId} 的 node_state 必须为 frozen`);
    if (!VALID_GROWTH_RELATIONS.has(node.growth_relation)) {
      errors.push(`${nodeId} 的 growth_relation 非法：${String(node.growth_relation)}`);
    }
    await checkNodeArtifactRefs(node, nodeId, errors);
    await validateEvidenceReviews(node, nodeId, errors);
  }

  if (frozenNodes.length > 0) {
    const rootId = stringOrEmpty(tree.root_node_id);
    const root = frozenById.get(rootId);
    if (!root) {
      errors.push(`root_node_id 未指向冻结节点：${rootId || "null"}`);
    } else {
      if (root.parent_node_id !== null) errors.push(`根节点 ${rootId} 的 parent_node_id 必须为 null`);
      if (root.growth_relation !== "baseline") errors.push(`根节点 ${rootId} 必须为 baseline`);
    }
  } else if (tree.root_node_id !== null) {
    errors.push("没有冻结节点时 root_node_id 必须为 null");
  }

  for (const [index, rawDecision] of decisions.entries()) {
    const decision = safeObject(rawDecision, `tree_decisions[${index}]`, errors);
    if (!decision) continue;
    const decisionId = stringOrEmpty(decision.decision_id);
    if (!decisionId) {
      errors.push(`tree_decisions[${index}] 缺少 decision_id`);
    } else if (decisionIds.has(decisionId)) {
      errors.push(`重复 decision_id：${decisionId}`);
    } else {
      decisionIds.add(decisionId);
    }
    if (!VALID_DECISION_OUTCOMES.has(decision.controller_recorded_outcome)) {
      errors.push(`${decisionId || `tree_decisions[${index}]`} 的 controller_recorded_outcome 非法`);
    }
    if (
      decision.next_parent_node_id !== null
      && decision.next_parent_node_id !== undefined
      && !frozenById.has(decision.next_parent_node_id)
    ) {
      errors.push(`${decisionId || `tree_decisions[${index}]`} 的 next_parent_node_id 未指向冻结节点`);
    }
    await validateDecisionRecord(decision, decisionId || `tree_decisions[${index}]`, errors);
  }

  for (const [nodeId, node] of frozenById.entries()) {
    if (node.growth_relation !== "baseline" && !frozenById.has(node.parent_node_id)) {
      errors.push(`${nodeId} 的父节点尚未冻结：${String(node.parent_node_id)}`);
    }
    const matchingDecision = decisions.find((entry) => entry?.reviewed_node_id === nodeId);
    if (!matchingDecision) {
      errors.push(`${nodeId} 缺少 tree_decision`);
      continue;
    }
    const expectedOutcome = node.growth_relation === "baseline" ? "freeze_root" : "freeze_child";
    if (matchingDecision.controller_recorded_outcome !== expectedOutcome) {
      errors.push(`${nodeId} 的 tree_decision 必须为 ${expectedOutcome}`);
    }
    await validateReviewChain(node, matchingDecision, nodeId, errors);
  }

  if (tree.working_node !== null && tree.working_node !== undefined) {
    const working = safeObject(tree.working_node, "working_node", errors);
    if (working) {
      const workingId = stringOrEmpty(working.node_id) || "working_node";
      if (!VALID_GROWTH_RELATIONS.has(working.growth_relation)) {
        errors.push(`${workingId} 的 growth_relation 非法：${String(working.growth_relation)}`);
      }
      if (working.growth_relation === "baseline") {
        if (working.parent_node_id !== null) errors.push(`${workingId} baseline 的 parent_node_id 必须为 null`);
      } else if (!frozenById.has(working.parent_node_id)) {
        errors.push(`${workingId} 的父节点尚未冻结：${String(working.parent_node_id)}`);
      }
      await checkRef(working.layout_ref, `${workingId}.layout_ref`, errors);
      await checkRef(working.canonical_trace_ref, `${workingId}.canonical_trace_ref`, errors);
      await checkRef(working.submission_packet_ref, `${workingId}.submission_packet_ref`, errors);
      if (working.node_state === "rejected") errors.push(`${workingId} 被拒后必须移入 attempts，不得保留为 working_node`);
      if (["hard_validated", "quality_survived"].includes(working.node_state)) {
        if (!Array.isArray(working.evidence_review_refs) || working.evidence_review_refs.length === 0) {
          errors.push(`${workingId} 已进入 ${working.node_state}，但 evidence_review_refs 为空`);
        }
        await validateEvidenceReviews(working, workingId, errors);
      }
      if (working.node_state === "quality_survived") {
        try {
          const quality = await readYamlRef(working.quality_review_ref);
          if (quality.review_integrity !== "independent" || quality.overall_verdict !== "survive_quality_gate") {
            errors.push(`${workingId} 登记为 quality_survived，但阶段 A 未独立存活`);
          }
          assertQualityMatchesNode(quality, working, working.quality_review_ref);
        } catch (error) {
          errors.push(`${workingId} 的阶段 A 无法验证：${error instanceof Error ? error.message : String(error)}`);
        }
      }
      if (frozenById.has(workingId)) errors.push(`${workingId} 不能同时是 working_node 和 frozen_node`);
    }
  }

  for (const [index, attempt] of attempts.entries()) {
    if (!attempt || typeof attempt !== "object") {
      errors.push(`attempts[${index}] 不是对象`);
      continue;
    }
    if (!VALID_GROWTH_RELATIONS.has(attempt.intended_growth_relation)) {
      errors.push(`attempts[${index}] 的 intended_growth_relation 非法`);
    }
    if (!VALID_ATTEMPT_STATUSES.has(attempt.status)) {
      errors.push(`attempts[${index}] 的 status 非法：${String(attempt.status)}`);
    }
    if (attempt.parent_node_id !== null && !frozenById.has(attempt.parent_node_id)) {
      errors.push(`attempts[${index}] 的 parent_node_id 未指向冻结节点`);
    }
    const artifactRefs = Array.isArray(attempt.artifact_refs) ? attempt.artifact_refs : [];
    for (const [artifactIndex, ref] of artifactRefs.entries()) {
      await checkRef(ref, `attempts[${index}].artifact_refs[${artifactIndex}]`, errors);
    }
    if (attempt.status === "frozen" && !frozenById.has(attempt.parent_node_id) && attempt.parent_node_id !== null) {
      warnings.push(`attempts[${index}] 标记 frozen，但 parent_node_id 未指向当前冻结节点`);
    }
  }

  if (tree.tree_state === "sufficient") {
    if (tree.working_node) errors.push("tree_state=sufficient 时 working_node 必须为 null");
    if (!decisions.some((entry) => entry?.controller_recorded_outcome === "tree_sufficient")) {
      errors.push("tree_state=sufficient 缺少 tree_sufficient 决定");
    }
  } else {
    for (const node of frozenById.values()) {
      if (node.pre_submission_state && node.pre_submission_state !== "not_started") {
        errors.push(`设计树尚未 sufficient，${node.node_id} 不得进入提交前工作流`);
      }
      if (node.playtest_status && node.playtest_status !== "not_queued") {
        errors.push(`设计树尚未 sufficient，${node.node_id} 不得进入待玩队列`);
      }
    }
  }

  if (warnings.length > 0) {
    for (const warning of warnings) console.warn(`WARN ${warning}`);
  }
  if (errors.length > 0) {
    for (const error of errors) console.error(`ERROR ${error}`);
    throw new Error(`设计树校验失败：${errors.length} 项错误`);
  }

  console.log(`设计树校验通过：${normalizeRef(treeRef)}`);
  console.log(`冻结节点=${frozenNodes.length}，尝试=${attempts.length}，决定=${decisions.length}`);
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
  for (const requiredToken of ["$sokoban-mechanism-lab", REQUIRED_EXPLORATION_INTENT, REQUIRED_PUBLICATION_SCOPE]) {
    if (!dispatchPrompt.includes(requiredToken)) {
      throw new Error(`${dispatchRef}.dispatch_prompt 缺少显式调用标识：${requiredToken}`);
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
  const newMaterialRefs = requireStringArray(
    batch.new_material_refs,
    `${firstMaterialBatchRef}.new_material_refs`,
  );
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

async function buildReviewArtifact(node) {
  const layoutRef = requireString(node.layout_ref, `${node.node_id}.layout_ref`);
  const replayRef = requireString(node.canonical_trace_ref, `${node.node_id}.canonical_trace_ref`);
  const layout = (await readTextRef(layoutRef)).trimEnd();
  const replay = await readJsonRef(replayRef);
  const replayLayout = requireString(replay.layout, `${replayRef}.layout`).trimEnd();
  if (layout !== replayLayout) {
    throw new Error(`layout 与 replay 不一致：${node.node_id}`);
  }
  const inputs = requireStringArray(replay.inputs, `${replayRef}.inputs`);
  const steps = requireArray(replay.steps, `${replayRef}.steps`);
  if (inputs.length === 0 || steps.length === 0) {
    throw new Error(`canonical replay 必须包含非空 inputs 和 steps：${node.node_id}`);
  }
  if (steps.some((step) => !step || step.legal !== true)) {
    throw new Error(`canonical replay 含非法步骤：${node.node_id}`);
  }
  if (replay.replay?.completed !== true || replay.final?.isWin !== true) {
    throw new Error(`canonical replay 未完成胜利：${node.node_id}`);
  }

  const packetEntry = {
    node_id: requireString(node.node_id, "node.node_id"),
    candidate_id: requireString(node.candidate_id, `${node.node_id}.candidate_id`),
    exact_version: requireString(
      node.exact_version ?? node.reviewed_exact_version,
      `${node.node_id}.exact_version`,
    ),
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
          before_state_ref: `${normalizeRef(replayRef)}#/steps/${index}/before`,
          event: requireStringArray(step.events, `${replayRef}.steps[${index}].events`).join(", "),
          after_state_ref: `${normalizeRef(replayRef)}#/steps/${index}/after`,
          visible_board_change: summarizeBoardChange(step.before?.render, step.after?.render),
        };
      }),
    },
    artifact_refs: [normalizeRef(layoutRef), normalizeRef(replayRef)],
  };

  return {
    prototype_id: requireString(replay.prototype, `${replayRef}.prototype`),
    packet_entry: packetEntry,
    artifact_refs: packetEntry.artifact_refs,
  };
}

async function checkNodeArtifactRefs(node, nodeId, errors) {
  const singleRefs = [
    "layout_ref",
    "canonical_trace_ref",
    "submission_packet_ref",
    "quality_review_ref",
    "coach_context_ref",
    "coach_note_ref",
  ];
  for (const field of singleRefs) await checkRef(node[field], `${nodeId}.${field}`, errors);
  const evidenceRefs = Array.isArray(node.evidence_review_refs) ? node.evidence_review_refs : [];
  if (evidenceRefs.length === 0) errors.push(`${nodeId}.evidence_review_refs 不能为空`);
  for (const [index, ref] of evidenceRefs.entries()) {
    await checkRef(ref, `${nodeId}.evidence_review_refs[${index}]`, errors);
  }
}

async function validateReviewChain(node, decision, nodeId, errors) {
  try {
    const quality = await readYamlRef(node.quality_review_ref);
    if (quality.review_integrity !== "independent") errors.push(`${nodeId} 的阶段 A 不独立`);
    if (quality.overall_verdict !== "survive_quality_gate") errors.push(`${nodeId} 的阶段 A 未存活`);
    const coachContext = await readYamlRef(node.coach_context_ref);
    if (coachContext.review_attempt_id !== quality.review_attempt_id) {
      errors.push(`${nodeId} 的阶段 A 与阶段 B review_attempt_id 不一致`);
    }
    if (normalizeRef(coachContext.quality_gate_ref) !== normalizeRef(node.quality_review_ref)) {
      errors.push(`${nodeId} 的 coach context 未引用当前阶段 A`);
    }
    if (coachContext.quality_gate_outcome !== quality.overall_verdict) {
      errors.push(`${nodeId} 的 coach context 与阶段 A outcome 不一致`);
    }
    if (coachContext.coach_authority !== "tree_decision") {
      errors.push(`${nodeId} 已冻结，但 coach context 没有 tree_decision 权限`);
    }
    if (decision.review_attempt_id !== quality.review_attempt_id) {
      errors.push(`${nodeId} 的 tree_decision review_attempt_id 不一致`);
    }
    if (decision.reviewer_instance_id !== quality.reviewer_instance_id) {
      errors.push(`${nodeId} 的阶段 A 与 tree_decision reviewer_instance_id 不一致`);
    }
    if (normalizeRef(decision.quality_review_ref) !== normalizeRef(node.quality_review_ref)) {
      errors.push(`${nodeId} 的 tree_decision 未引用当前阶段 A`);
    }
    if (normalizeRef(decision.coach_context_ref) !== normalizeRef(node.coach_context_ref)) {
      errors.push(`${nodeId} 的 tree_decision 未引用当前 coach context`);
    }
    if (normalizeRef(decision.reviewer_note_ref) !== normalizeRef(node.coach_note_ref)) {
      errors.push(`${nodeId} 的 tree_decision 未引用当前 coach note`);
    }
  } catch (error) {
    errors.push(`${nodeId} 的 review chain 无法读取：${error instanceof Error ? error.message : String(error)}`);
  }
}

async function validateDecisionRecord(decision, label, errors) {
  const requiredStrings = [
    "reviewed_node_id",
    "review_attempt_id",
    "reviewer_instance_id",
    "quality_review_ref",
    "coach_context_ref",
    "reviewer_note_ref",
  ];
  for (const field of requiredStrings) {
    if (!stringOrEmpty(decision[field])) errors.push(`${label}.${field} 缺失`);
  }
  await checkRef(decision.quality_review_ref, `${label}.quality_review_ref`, errors);
  await checkRef(decision.coach_context_ref, `${label}.coach_context_ref`, errors);
  await checkRef(decision.reviewer_note_ref, `${label}.reviewer_note_ref`, errors);

  try {
    const quality = await readYamlRef(decision.quality_review_ref);
    const coachContext = await readYamlRef(decision.coach_context_ref);
    if (quality.review_integrity !== "independent") errors.push(`${label} 的阶段 A 不独立`);
    if (quality.overall_verdict !== "survive_quality_gate") errors.push(`${label} 的阶段 A 未存活却登记了阶段 B 决定`);
    if (decision.review_attempt_id !== quality.review_attempt_id) {
      errors.push(`${label} 的 review_attempt_id 与阶段 A 不一致`);
    }
    if (decision.reviewer_instance_id !== quality.reviewer_instance_id) {
      errors.push(`${label} 的 reviewer_instance_id 与阶段 A 不一致`);
    }
    if (coachContext.review_attempt_id !== quality.review_attempt_id) {
      errors.push(`${label} 的阶段 A 与阶段 B review_attempt_id 不一致`);
    }
    if (quality.independent_reading?.node_id !== decision.reviewed_node_id) {
      errors.push(`${label} 的阶段 A 审查节点与 reviewed_node_id 不一致`);
    }
    if (coachContext.design_tree?.active_node_id !== decision.reviewed_node_id) {
      errors.push(`${label} 的阶段 B active_node_id 与 reviewed_node_id 不一致`);
    }
    if (normalizeRef(coachContext.quality_gate_ref) !== normalizeRef(decision.quality_review_ref)) {
      errors.push(`${label} 的 coach context 未引用当前阶段 A`);
    }
    if (coachContext.quality_gate_outcome !== quality.overall_verdict) {
      errors.push(`${label} 的 coach context 与阶段 A outcome 不一致`);
    }
    if (coachContext.coach_authority !== "tree_decision") {
      errors.push(`${label} 登记树决定，但 coach context 没有 tree_decision 权限`);
    }
  } catch (error) {
    errors.push(`${label} 的 decision review chain 无法读取：${error instanceof Error ? error.message : String(error)}`);
  }
}

async function assertSupportedEvidence(node, label) {
  const refs = requireStringArray(node.evidence_review_refs, `${label}.evidence_review_refs`);
  if (refs.length === 0) throw new Error(`${label}.evidence_review_refs 不能为空`);
  for (const ref of refs) {
    const review = await readYamlRef(ref);
    if (review.review_integrity !== "independent" || review.overall_hard_status !== "supported") {
      throw new Error(`${label} 的硬证据未独立 supported：${ref}`);
    }
    if (review.candidate_id !== node.candidate_id) {
      throw new Error(`${label} 的硬证据 candidate_id 不一致：${ref}`);
    }
    if (review.exact_version !== nodeExactVersion(node, label)) {
      throw new Error(`${label} 的硬证据 exact_version 不一致：${ref}`);
    }
  }
}

async function validateEvidenceReviews(node, label, errors) {
  try {
    await assertSupportedEvidence(node, label);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
}

function assertQualityMatchesNode(quality, node, qualityRef) {
  const reading = asObject(quality.independent_reading, `${qualityRef}.independent_reading`);
  if (reading.node_id !== node.node_id) {
    throw new Error(`阶段 A node_id 与当前节点不一致：${qualityRef}`);
  }
  if (reading.candidate_id !== node.candidate_id) {
    throw new Error(`阶段 A candidate_id 与当前节点不一致：${qualityRef}`);
  }
  if (reading.exact_version !== nodeExactVersion(node, node.node_id)) {
    throw new Error(`阶段 A exact_version 与当前节点不一致：${qualityRef}`);
  }
}

function nodeExactVersion(node, label) {
  return requireString(node.exact_version ?? node.reviewed_exact_version, `${label}.exact_version`);
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

function findNode(tree, nodeId) {
  if (tree.working_node?.node_id === nodeId) return tree.working_node;
  const frozen = Array.isArray(tree.frozen_nodes)
    ? tree.frozen_nodes.find((entry) => entry?.node_id === nodeId)
    : undefined;
  if (frozen) return frozen;
  throw new Error(`设计树中找不到节点：${nodeId}`);
}

function findFrozenNode(tree, nodeId) {
  const frozen = Array.isArray(tree.frozen_nodes)
    ? tree.frozen_nodes.find((entry) => entry?.node_id === nodeId)
    : undefined;
  if (!frozen) throw new Error(`找不到冻结父节点：${nodeId}`);
  return frozen;
}

function summarizeBoardChange(before, after) {
  if (typeof before !== "string" || typeof after !== "string") return "state render unavailable";
  const beforeRows = before.split("\n");
  const afterRows = after.split("\n");
  const changes = [];
  const height = Math.max(beforeRows.length, afterRows.length);
  for (let y = 0; y < height; y += 1) {
    const beforeRow = beforeRows[y] ?? "";
    const afterRow = afterRows[y] ?? "";
    const width = Math.max(beforeRow.length, afterRow.length);
    for (let x = 0; x < width; x += 1) {
      const from = beforeRow[x] ?? "∅";
      const to = afterRow[x] ?? "∅";
      if (from !== to) changes.push(`(${x},${y}) ${from}→${to}`);
    }
  }
  if (changes.length === 0) return "no visible cell change";
  const sample = changes.slice(0, 16).join("; ");
  return changes.length > 16 ? `${sample}; … total=${changes.length}` : sample;
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

function stringOrEmpty(value) {
  return typeof value === "string" ? value : "";
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string" && value.length > 0).map(normalizeRef))];
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
  console.error("  node design-tree-controller.mjs prepare-review --tree <design_tree.yml> --node <node_id> --attempt <id> --out <packet.yml>");
  console.error("  node design-tree-controller.mjs prepare-coach --tree <design_tree.yml> --node <node_id> --quality <review.yml> --out <context.yml>");
  console.error("  node design-tree-controller.mjs validate-exploration --brief <experience_brief.yml>");
  console.error("  node design-tree-controller.mjs validate --tree <design_tree.yml>");
}

# 关卡设计工作室模板

状态：[关卡设计工作室执行标准](21-level-design-studio-standard.md)的当前执行模板。

这些模板服务于玩家体验核心驱动的基线与分支作品集。审美选择由人类试玩完成，模板只保存创作承诺、相对探索意图和硬证据边界。

## 体验简报

```yaml
prototype_context:
  confirmed_rules: []
  win_condition: ""
  object_and_event_semantics: []
  tool_boundary: []

curriculum_context:
  player_prior: []
  intended_game_position: unknown
  duplicate_boundary: []

experience_core:
  experience_statement: ""
  visible_setup: ""
  player_action: ""
  visible_payoff: ""
  why_level_exists: ""
  core_boundary:
    central_objects: []
    supporting_objects: []

work_identity:
  conditions: []
  counterfactuals: []

baseline_brief:
  packaging_intent: direct_complete_realization
  expected_scale: ""
  expected_player_load: ""
  non_goals: []

allowed_design_sources: []
prototype_specific_routing: []
```

## 基线记录

```yaml
kind: baseline
portfolio_id: ""
version: ""
design_state: working | hard_validated | frozen
playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject

layout_ref: ""
canonical_trace_ref: ""

identity_reading:
  player_visible_sequence: []
  payoff_state_ref: ""
  identity_conditions_checked: []

hard_evidence:
  solvability: ""
  solution_uniqueness: ""
  graph_status: ""
  bypass_checks: []
  identity_counterfactuals: []
  evidence_limits: []
  artifact_refs: []

packaging_reading:
  opening: ""
  preparation: ""
  reveal_or_use: ""
  ending: ""
  known_same_work_defects: []

attempt_log_ref: ""
```

## 分支计划

在确定布局或运行搜索前填写。

```yaml
kind: branch_plan
portfolio_id: ""
branch_id: ""
baseline_ref: ""
search_intent: application | combination | challenge

delta_from_baseline:
  player_authorship: ""
  supporting_mechanism: ""
  payoff_change: ""
  ambition_dimensions: []

reduction_test:
  remove_or_presatisfy_delta: ""
  expected_relation_to_baseline: returns_to_baseline | returns_to_another_branch | becomes_different_core

identity_commitment:
  preserved_conditions: []
  new_risks: []
```

## 分支记录

```yaml
kind: branch
portfolio_id: ""
branch_id: ""
baseline_ref: ""
search_intent: application | combination | challenge
design_state: working | rejected_branch | hard_validated
playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject

delta_realized:
  player_authorship: ""
  supporting_mechanism: ""
  payoff_change: ""
  ambition_dimensions: []

relation_to_baseline:
  concrete_difference: ""
  reduction_test_result: ""
  non_equivalence_to_other_survivors: ""

layout_ref: ""
canonical_trace_ref: ""
identity_reading: {}
hard_evidence: {}
packaging_reading: {}
rejection_reason: ""
artifact_refs: []
```

## 尝试日志

```yaml
portfolio_id: ""
attempts:
  - attempt_id: ""
    search_intent: baseline | application | combination | challenge
    family: ""
    structural_hypothesis: ""
    result: ""
    status: revised | rejected_mechanical | rejected_identity | rejected_no_delta | survivor
    artifact_refs: []
```

## 人类待玩作品集交接

```yaml
portfolio_id: ""
experience_core_summary: ""
work_identity_summary: ""

baseline:
  version: ""
  player_experience: ""
  evidence_status: ""
  known_risks: []
  playtest_status: pending_playtest

branches:
  application: []
  combination: []
  challenge: []

playable_delivery:
  level_source: studio/levels.yml | levels.yml
  playable_queue: playable_queue.yml
  queue_entries:
    - source: studio | package
      level_id: ""
      title: ""
      added_at: ""
      status: pending_playtest
      notes: ""
  playable_build_status: built | failed
  playable_ref: ""

handoff_policy:
  llm_ranking: forbidden
  llm_aesthetic_scores: forbidden
  max_survivors_per_search_intent: 2
  human_playtest_statuses: [defer, needs_revision, ready_for_archive, reject]

prototype_specific_checks: []
archive_status: not_archived_waiting_for_playtest
```

## 可选硬证据核验请求

独立 evidence reviewer 只在需要核对复杂硬声明、用户明确要求或交付契约要求时调用。它不评价包装、审美、角色或版本优先级。

```yaml
review_scope: hard_evidence_only
candidate_id: ""
candidate_version: ""
claims: []
allowed_evidence_sources: []
graph_completeness: complete | budget_limited | not_applicable | unknown
required_output:
  - per_claim_status
  - hard_failures
  - evidence_gaps
  - overall_hard_status
```

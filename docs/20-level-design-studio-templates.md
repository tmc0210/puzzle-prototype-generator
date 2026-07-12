# 关卡设计工作室模板

状态：[关卡设计工作室执行标准](21-level-design-studio-standard.md)的当前材料合同。

## Experience brief

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

archive_calibration:
  full_index_read: false
  all_aesthetic_1_records_read: []
  positive_or_high_anchors_read: []
  lower_bound_or_negative_anchors_read: []
  human_comment_ids_read: []

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
```

## Designer 送审包

每个 exact version 强制填写，但永远不提供给 independent level reviewer。

```yaml
submission_id: ""
portfolio_id: ""
candidate_id: ""
exact_version: ""
slot: baseline | application | combination | challenge
designer_claim:
  player_experience_core: ""
  player_action: ""
  visible_payoff: ""
  why_this_level_exists: ""
  work_identity_conditions: []
packaging_account:
  opening: ""
  preparation: ""
  reveal_or_use: ""
  ending: ""
  every_major_element_role: []
  known_perceptible_defects: []
slot_account:
  concrete_delta_from_baseline: ""
  application_added_authorship: ""
  combination_supporting_mechanism: ""
  combination_not_base_rule_or_prerequisite: ""
  combination_consumption_relation: ""
  challenge_ceiling_dimension: ""
  non_equivalence_to_other_submissions: []
hard_evidence:
  solve_instance_ref: ""
  canonical_replay_ref: ""
  graph_or_uniqueness_ref: ""
  bypass_refs: []
  identity_counterfactual_refs: []
  evidence_limits: []
designer_self_verdict: submit_for_independent_review | withdraw
```

## Independent reviewer raw packet

只从实际产物重新组装。

```yaml
review_attempt_id: ""
prototype_id: ""
prototype_rules:
  confirmed_rules: []
  win_condition: ""
  object_and_event_semantics: []
  player_prior: []
portfolio:
  - slot: baseline | application | combination | challenge
    candidate_id: ""
    exact_version: ""
    solve_instance:
      layout: ""
      player_start: null
      win_condition: {}
    canonical_solution:
      exact_inputs: []
      mechanically_derived_trace: []
artifact_refs: []
```

禁止加入 designer claim、experience brief、branch plan、submission packet、指标、旧审查或修改说明。

## Independent level review

```yaml
review_attempt_id: ""
reviewer_instance_id: ""
review_integrity: independent | contaminated | incomplete
archive_calibration:
  full_index_read: true | false
  all_aesthetic_1_records_read: []
  positive_or_high_anchors_read: []
  lower_bound_or_negative_anchors_read: []
  human_comment_ids_read: []
independent_readings:
  - candidate_id: ""
    exact_version: ""
    slot: baseline | application | combination | challenge
    opening_read: ""
    player_actually_does: ""
    visible_payoff: ""
    ending_read: ""
    exact_basis: []
    perceptible_defects: []
    verdict: survive_to_pre_submission_checks | revise_and_rereview | reject_branch
portfolio_comparison:
  baseline_complete_direct_read: ""
  application_real_delta: ""
  combination_non_prerequisite_mechanism: ""
  combination_consumption_relation: ""
  challenge_real_ceiling_attempt: ""
  pairwise_player_experience_differences: []
  slot_or_redundancy_blockers: []
overall_verdict: survive_to_pre_submission_checks | revise_and_rereview | reject_portfolio
required_action: none | structural_revision | remove_survivor | rebuild_portfolio
```

## Submission admission audit

```yaml
audit_mode: submission_admission
candidate_id: ""
exact_version: ""
review_gate:
  latest_review_ref: ""
  status: survived | missing | stale | contradicted
hard_evidence: []
prototype_workflows:
  - workflow_id: ""
    triggered: true | false
    authority_docs_read: []
    required_operations: []
    artifact_refs: []
    exact_version_match: true | false
    status: supported | contradicted | incomplete | not_applicable
queue_admission: eligible_for_queue | blocked
blocking_reasons: []
```

## 人类待玩交接

```yaml
portfolio_id: ""
entries:
  - slot: baseline | application | combination | challenge
    candidate_id: ""
    exact_version: ""
    player_experience: ""
    known_risks: []
    submission_packet_ref: ""
    independent_review_ref: ""
    pre_submission_check_refs: []
    admission_audit_ref: ""
    admission_state: eligible
    playtest_status: pending_playtest
playable_delivery:
  level_source: studio/levels.yml | levels.yml
  playable_queue: playable_queue.yml
  queue_entries: []
  playable_build_status: built | failed
  playable_ref: ""
empty_slots: []
archive_status: not_archived_waiting_for_playtest
```

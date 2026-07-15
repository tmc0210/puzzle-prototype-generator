# 连续作品工作记录模板

## 当前关卡声明

每个候选在正式布局前填写，只约束 designer，不发送给 reviewer。一次只声明并推进当前关卡。

```yaml
portfolio_id: ""
candidate_id: ""
slot: baseline | application | combination | challenge
baseline_ref: ""
material_board_snapshot_ref: ""
selected_material_refs: []

current_batch_works_consulted:
  - candidate_id: ""
    layout_ref: ""
    replay_ref: ""
    player_experience_read_from_actual_work: ""

new_work_intent:
  player_experience_to_add: ""
  concrete_difference_from_each_current_batch_work: []
  experience_lost_if_this_work_is_removed: ""

slot_commitment:
  baseline_complete_realization: ""
  application_added_player_responsibility: ""
  combination_other_non_prerequisite_mechanism: ""
  combination_player_visible_relation: ""
  challenge_dimension: ""

reduction_test: ""
```

`current_batch_works_consulted` 在 baseline 阶段可以为空。后续候选不能用多几步走位、更大地图或不同几何外形充当 `player_experience_to_add`。这些字段是创作导向，不是成品成立的证据。

## 候选状态

```yaml
candidate_id: ""
exact_version: ""
slot: baseline | application | combination | challenge
slot_state: designing | review_survived | delivered | human_closed
candidate_state: designing | hard_validated | review_survived | candidate_rejected
review_round: 0
review_state: not_submitted | evidence_review_required | level_review_required | revise_required | candidate_rejected | survived
pre_submission_state: not_started | incomplete | completed
playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject
submission_packet_ref: ""
evidence_review_refs: []
independent_level_review_refs: []
designer_action_refs: []
pre_submission_check_refs: []
reviewed_exact_version: ""
delivery_exact_version: ""
pre_submission_workflow_record_ref: ""
layout_ref: ""
canonical_trace_ref: ""
```

只有人类可以把 `slot_state` 改为 `human_closed`。

## 尝试日志

```yaml
portfolio_id: ""
attempts:
  - attempt_id: ""
    slot: baseline | application | combination | challenge
    material_refs: []
    structural_hypothesis: ""
    actual_result: ""
    status: revised | rejected_mechanical | rejected_identity | rejected_no_experience_delta | rejected_by_level_review | submitted
    artifact_refs: []
```

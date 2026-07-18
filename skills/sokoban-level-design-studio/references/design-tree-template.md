# 体验核心设计树账本

本文件只记录版本、亲缘关系和流程状态。教练的宏观建议保存在独立自然语言 note 中，不拆成字段复制到这里。

## 树状态

```yaml
tree_id: ""
experience_brief_ref: ""
tree_state: building_baseline | growing | sufficient
root_node_id: null
active_parent_node_id: null
working_node_id: null

frozen_nodes:
  - node_id: ""
    parent_node_id: null
    growth_relation: baseline | construct_prefix | apply_suffix
    candidate_id: ""
    reviewed_exact_version: ""
    delivery_exact_version: ""
    node_state: frozen
    layout_ref: ""
    canonical_trace_ref: ""
    submission_packet_ref: ""
    evidence_review_refs: []
    quality_review_ref: ""
    coach_context_ref: ""
    coach_note_ref: ""
    pre_submission_check_refs: []
    pre_submission_state: not_started | incomplete | completed
    playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject

working_node: null
# 有工作节点时改为：
# working_node:
#   node_id: ""
#   parent_node_id: null
#   growth_relation: baseline | construct_prefix | apply_suffix
#   candidate_id: ""
#   exact_version: ""
#   node_state: designing | hard_validated | quality_survived | rejected
#   designer_intent_in_one_sentence: ""
#   source_coach_note_ref: ""
#   layout_ref: ""
#   canonical_trace_ref: ""
#   submission_packet_ref: ""
#   evidence_review_refs: []
#   quality_review_ref: ""
#   coach_context_ref: ""
#   coach_note_ref: ""

tree_decisions:
  - decision_id: ""
    reviewed_node_id: ""
    review_attempt_id: ""
    reviewer_instance_id: ""
    quality_review_ref: ""
    coach_context_ref: ""
    reviewer_note_ref: ""
    controller_recorded_outcome: freeze_root | freeze_child | return_to_design | tree_sufficient
    next_parent_node_id: null
```

`controller_recorded_outcome` 只是把教练自然语言中的明确决定登记为流程状态，不得反向生成或改写教练意见。

## 尝试日志

```yaml
attempts:
  - attempt_id: ""
    parent_node_id: null
    intended_growth_relation: baseline | construct_prefix | apply_suffix
    material_refs: []
    structural_hypothesis: ""
    actual_result: ""
    status: revised | rejected_mechanical | rejected_identity | rejected_no_experience | rejected_quality_gate | rejected_splicing | frozen
    artifact_refs: []
```

只有通过硬证据、阶段 A 质量门和阶段 B 树判断的 exact version 才能进入 `frozen_nodes`。修订、撤回和失败版本只留在尝试日志中。

任何已经进入阶段 A 的版本，都必须在 designer action 前完成阶段 B。阶段 A 未存活的尝试把 quality review、`direction_guard_only` context、教练自然语言 note 与 designer action 一同列入 `artifact_refs`，不能只记录阶段 A 缺点后直接开始下一版。

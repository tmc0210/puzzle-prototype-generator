# 作品集工作记录模板

## 分支计划

在布局前填写，只约束 designer，不发送给 reviewer。

```yaml
portfolio_id: ""
branch_id: ""
baseline_ref: ""
search_intent: baseline | application | combination | challenge
designer_commitment:
  intended_player_relation: ""
  delta_from_baseline: ""
  supporting_mechanism: ""
  supporting_mechanism_is_not_prerequisite: ""
  ambition_dimensions: []
reduction_test: ""
```

## 版本状态

```yaml
candidate_id: ""
exact_version: ""
slot: baseline | application | combination | challenge
design_state: working | hard_validated | frozen | rejected_branch
review_state: not_submitted | awaiting_independent_review | revise_required | rejected | survived
admission_state: not_started | checks_incomplete | audit_required | blocked | eligible
playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject
submission_packet_ref: ""
independent_review_ref: ""
pre_submission_check_refs: []
admission_audit_ref: ""
layout_ref: ""
canonical_trace_ref: ""
```

## 尝试日志

```yaml
portfolio_id: ""
attempts:
  - attempt_id: ""
    search_intent: baseline | application | combination | challenge
    structural_hypothesis: ""
    result: ""
    status: revised | rejected_mechanical | rejected_identity | rejected_no_delta | submitted
    artifact_refs: []
```

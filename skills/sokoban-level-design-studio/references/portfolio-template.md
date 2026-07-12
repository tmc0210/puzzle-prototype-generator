# 作品集模板

## 基线

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

在布局前填写，不允许事后改写 `search_intent`。

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

## 分支结果

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

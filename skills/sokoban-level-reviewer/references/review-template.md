# 独立单关审查模板

```yaml
review_attempt_id: ""
reviewer_instance_id: ""
review_integrity: independent | contaminated | incomplete

archive_calibration:
  index_or_summary_ref: ""
  selected_anchors:
    - candidate_id: ""
      calibration_role: positive | negative_or_boundary
      human_comment_refs: []
      selection_reason: ""
  missing_anchor_note: none | ""

independent_reading:
  review_target: baseline_root | growth_child
  node_id: ""
  candidate_id: ""
  exact_version: ""
  opening_read: ""
  player_actually_does: ""
  key_visible_changes: []
  visible_payoff: ""
  ending_read: ""
  parent_delta_read: "baseline_root 时写 not_applicable"
  exact_basis: []
  perceptible_defects:
    - defect: ""
      exact_basis: ""
      player_effect: ""
      same_work_improvement_direction: ""
      blocking: true
  verdict: survive_quality_gate | revise_and_rereview | reject_candidate

overall_verdict: survive_quality_gate | revise_and_rereview | reject_candidate
required_actions: []
```

规则：

- `review_integrity` 不是 `independent` 时，本次审查无效。
- 任一 blocking defect 都阻止当前关卡 survive。
- `reject_candidate` 只关闭当前候选。
- 本文件只固定阶段 A 质量门；不输出设计树覆盖、前序/后继判断、教练建议、审美分、难度分、排名或工具质量结论。

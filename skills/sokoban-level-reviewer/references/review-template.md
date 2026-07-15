# 独立整批关卡审查模板

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

independent_readings:
  - slot: baseline | application | combination | challenge
    candidate_id: ""
    exact_version: ""
    opening_read: ""
    player_actually_does: ""
    key_visible_changes: []
    visible_payoff: ""
    ending_read: ""
    exact_basis: []
    perceptible_defects:
      - defect: ""
        exact_basis: ""
        player_effect: ""
        same_work_improvement_direction: ""
        blocking: true
    verdict: survive_to_pre_submission_checks | revise_and_rereview | reject_candidate

slot_and_portfolio_reading:
  baseline_complete_not_minimal_witness: ""
  application_real_delta_from_baseline: ""
  combination_other_non_prerequisite_mechanism: ""
  combination_player_visible_relation: ""
  challenge_real_ceiling_attempt: ""
  common_core_still_recognizable: ""
  pairwise_player_experience_differences: []
  blockers:
    - candidate_id: ""
      blocker_type: single_level_defect | slot_not_established | redundant_with_candidate | common_core_lost
      exact_basis: ""
      required_action: revise_candidate | replace_candidate

overall_verdict: survive_to_pre_submission_checks | revise_and_rereview
required_actions: []
```

规则：

- `review_integrity` 不是 `independent` 时，本次审查无效。
- 任一 blocking defect 或 `slot_and_portfolio_reading.blockers` 都阻止整批 survive。
- `reject_candidate` 只关闭当前候选，不关闭 slot。
- 不输出设计空间覆盖、段落完成度、审美分、难度分、排名或工具质量结论。

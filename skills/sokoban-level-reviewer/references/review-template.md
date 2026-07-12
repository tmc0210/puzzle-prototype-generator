# 独立关卡审查模板

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
    perceptible_defects:
      - defect: ""
        exact_basis: ""
        player_effect: ""
        same_work_improvement_direction: ""
        blocking: true
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

规则：

- `review_integrity` 不是 `independent` 时，本次审查无效。
- 任一版本存在 blocking defect 时，该版本不得 survive。
- 档位不成立、版本没有实质差异或为填档保留弱版本时，必须形成 blocker。
- 不输出审美分、难度分、推荐排序或工具质量结论。
- 不提出把当前完整保守作品另作成更复杂作品，来冒充同题缺点。

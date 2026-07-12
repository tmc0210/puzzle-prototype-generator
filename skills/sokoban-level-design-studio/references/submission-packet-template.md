# Designer 送审包模板

每个拟送审 exact version 强制填写。该文件只记录 designer 的正式承诺和自查，不得发送给独立 level reviewer，也不得复制到 reviewer raw packet。

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

Designer 必须明确写出缺点；不知道就写 `none_identified`，不得留空。`designer_self_verdict` 不能产生 review survive、admission eligible 或 pending_playtest。

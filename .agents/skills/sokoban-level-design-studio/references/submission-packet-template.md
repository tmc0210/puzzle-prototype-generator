# Designer 送审包模板

每个拟送审 exact version 强制填写。该文件只记录 Designer 的正式承诺和自查，不得发送给独立 Critic，也不得复制到 Critic base packet。

```yaml
submission_id: ""
design_task_id: ""
candidate_id: ""
exact_version: ""

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

hard_evidence:
  solve_instance_ref: ""
  canonical_replay_ref: ""
  solution_uniqueness:
    result: unique_complete | unique_within_budget | equivalent_variants_only
    search_scope: complete | budget_limited
    search_budget: ""
    known_raw_winning_variants: []
    equivalence_account: ""
    evidence_refs: []
    evidence_limits: []
  bypass_refs: []
  identity_counterfactual_refs: []
  evidence_limits: []

designer_self_verdict: submit_for_independent_review | withdraw
```

Designer 必须明确写出缺点；不知道就写 `none_identified`，不得留空。`solution_uniqueness` 必须使用 docs/21 定义的三个合法结果并引用当前 exact version 的实际证据；存在已知非等价胜解时必须 withdraw。Designer 自报不能产生独立 review 或待玩状态。

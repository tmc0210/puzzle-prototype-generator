# Designer 送审包模板

每个拟送审 exact version 强制填写。该文件只记录 designer 的正式承诺和自查，不得发送给独立 level reviewer，也不得复制到 reviewer raw packet。

```yaml
submission_id: ""
tree_id: ""
node_id: ""
parent_node_id: null
growth_relation: baseline | construct_prefix | apply_suffix
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

Designer 必须明确写出缺点；不知道就写 `none_identified`，不得留空。`solution_uniqueness` 必须使用 docs/21 定义的三个合法结果并引用当前 exact version 的实际证据；存在已知非等价胜解时必须 withdraw。`designer_self_verdict` 不能产生 review survive 或 pending_playtest。

送审包不得发送给 independent level reviewer，也不得作为其 raw packet 的摘要来源。

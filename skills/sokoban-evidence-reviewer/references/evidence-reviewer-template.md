# 独立硬证据审查模板

```yaml
review_attempt_id: ""
reviewer_instance_id: ""
candidate_id: ""
exact_version: ""
review_integrity: independent | contaminated | incomplete

evidence_scope:
  allowed_sources: []
  graph_completeness: complete | budget_limited | not_applicable | unknown

solution_uniqueness_review:
  declared_result: unique_complete | unique_within_budget | equivalent_variants_only | invalid_or_missing
  search_scope: complete | budget_limited | unknown
  exact_version_match: true | false
  known_raw_winning_variants: []
  equivalence_evidence_basis: []
  known_non_equivalent_win_refs: []
  status: supported | contradicted | unknown
  limits: []

claims:
  - claim_id: ""
    claim: ""
    status: supported | contradicted | unknown | not_applicable
    evidence_basis: []
    limits: []

hard_failures: []
evidence_gaps: []
overall_hard_status: supported | contradicted | incomplete
required_action: none | revise_candidate | rerun_or_supply_evidence | narrow_claim
```

判定规则：

- `supported`：所需证据种类和完备性足够。
- `contradicted`：存在直接冲突的 exact trace、reachable state、bypass 或版本事实。
- `unknown` / `incomplete`：证据缺失、实际搜索未覆盖所声明的范围、工具不可用或只给结论。对 `unique_within_budget`，完成预先声明的搜索并达到记录预算不是证据缺口。
- `solution_uniqueness_review.status` 不是 `supported` 时，`overall_hard_status` 必须为 `contradicted` 或 `incomplete`。
- 任一 `known_non_equivalent_win_refs` 都使唯一性声明 `contradicted`；不因路线长度、自然发现难度或审美影响较小而降级。
- 不读取 designer 送审叙事，不输出审美、档位、段落或待玩准入结论。

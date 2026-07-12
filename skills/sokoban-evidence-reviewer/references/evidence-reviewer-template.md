# 硬证据核验模板

## 任务

逐条判断 exact candidate 的机械声明是否被允许的证据支持。不要评价玩家体验、审美、难度、排名或 campaign 位置。

## 输出

```yaml
candidate_id:
candidate_version:
evidence_scope:
  allowed_sources: []
  graph_completeness: complete | budget_limited | not_applicable | unknown
claims:
  - claim_id:
    claim:
    status: supported | contradicted | unknown | not_applicable
    evidence_basis: []
    limits:
hard_failures:
  - claim_id:
    reason:
evidence_gaps:
  - claim_id:
    needed:
overall_hard_status: supported | contradicted | incomplete
```

## 判定规则

- `supported`：证据种类和完备性足以支持该声明。
- `contradicted`：存在与声明直接冲突的 exact trace、reachable state 或 bypass。
- `unknown`：证据缺失、预算不足或声明不可由当前工具判定。
- `not_applicable`：该声明不需要或不能进行机械核验。
- `overall_hard_status` 只汇总硬事实：有任一 `contradicted` 为 `contradicted`；无冲突但有关键 `unknown` 为 `incomplete`；其余为 `supported`。

不要把 `supported` 写成 quality pass，也不要给出设计修改、审美裁决或版本选择。

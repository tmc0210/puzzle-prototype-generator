# Redundant Element Prune: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1

```yaml
candidate_version: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1
status: clean_with_limited_scope
```

## Checks

- P/L 锚点仓收紧后，`fixed_anchor_probe...pl_fixed_scan` 的 reachable scan complete，`anchor_boundary_shift:push_pull` forbidden hits 为 none。
- 两个 crate 都参与返回解：第一步必须 `force_chain:n2` 推整链，之后所有胜路至少需要两次 `pull_object`。
- 主图与目标删除图均 complete；删除任一目标会删除一个端点抽取消费职责。
- 没有 B/S anchor、sticky、材料转换或额外对象；本候选不把无关机制作为装饰。

## Remaining Scope

没有逐格墙体删除穷举；本报告的 clean 只覆盖目标、对象、P/L 固定性和明显空间 shortcut。候选包中不把小图强制性包装成高开放搜索优点。

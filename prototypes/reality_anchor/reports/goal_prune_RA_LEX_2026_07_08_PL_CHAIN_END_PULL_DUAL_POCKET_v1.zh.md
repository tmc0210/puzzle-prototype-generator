# Goal Prune: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1

```yaml
candidate_version: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1
status: clean
targets:
  - name: upper_pull_pocket
    coord_xy: [4, 2]
    retained: true
  - name: right_end_pull_pocket
    coord_xy: [6, 3]
    retained: true
```

## Main

- 主图 complete，30 reachable states / 52 transitions / 1 winning state。
- 最短解 cost 16。
- 返回 trace 事件：`push_object:crate#1`, `force_chain:n2`, `pull_object:crate#2`, `pull_object:crate#1`，其余为 walk。

## Target Deletions

- 删除上目标 `[4,2]`：complete，cost 从 16 降到 7；解法只需整链推送和右端横向 pull，丢失最后的上方抽取责任。
- 删除右目标 `[6,3]`：complete，cost 从 16 降到 4；解法只需整链推送和上方 pull，丢失右端横向抽取责任。

## Interpretation

两个目标分别消费同一箱链拆解后的两个端点。删除任一目标都会显著缩短解法，并移除一段核心 pull 职责，因此没有目标冗余。

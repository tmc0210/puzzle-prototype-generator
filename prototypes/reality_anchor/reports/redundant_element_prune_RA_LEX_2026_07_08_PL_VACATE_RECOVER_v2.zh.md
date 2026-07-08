# Redundant Element Prune: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2

```yaml
candidate_version: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2
status: clean_with_limited_scope
```

## Checks

- `fixed_anchor_probe...pl_fixed_scan` reachable scan complete，`anchor_boundary_shift:push_pull` forbidden hits 为 none。
- `event_probe...core` complete/no bypass：所有胜路需要 chain force、push、pull。
- `event_count_probe...pull_count` complete/no bypass：所有胜路至少两次 pull。
- `target_vacate_probe...lower_target_vacate` complete/no bypass：下目标必须经历 covered -> uncovered -> covered。
- 没有 B/S、sticky 或材料转换，避免把 0019 风格刷子逻辑混进来。

## Remaining Scope

没有做逐墙穷举；当前 clean 覆盖目标、对象职责、P/L 固定性和关键状态债。候选包不以图小或强制前缀作为审美优点。

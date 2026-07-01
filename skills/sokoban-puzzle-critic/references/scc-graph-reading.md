# SCC / Graph Reading Reference

SCC / graph diagnostic 是证据，不是审美结论。

```yaml
graph_fact:
neutral_meaning:
player_facing_interpretation:
verdict_effect: none | merit | caveat | core_attack
```

缺少玩家侧解释时，`verdict_effect` 必须是 `none`。
如果 packet / handoff 声明了 ignored pair classes，匹配这些类别的 graph fact
也必须是 `verdict_effect: none`，即使它们有 cost、距离或可达性数据。

不要把 `winning_states=1`、`forcedWinPrefix`、`deadOut`、`branching_win_dag`、`scripted`、`has_reposition_room` 或 irreversible step count 直接当 pass/fail。

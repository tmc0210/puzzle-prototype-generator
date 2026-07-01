# SCC / Graph Reading Reference

SCC / graph diagnostic 是证据，不是审美结论。

```yaml
graph_fact:
neutral_meaning:
player_facing_interpretation:
verdict_effect: none | merit | caveat | core_attack
```

缺少玩家侧解释时，`verdict_effect` 必须是 `none`。

不要把 `winning_states=1`、`forcedWinPrefix`、`deadOut`、`branching_win_dag`、`scripted`、`has_reposition_room` 或 irreversible step count 直接当 pass/fail。

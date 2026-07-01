# SCC / Graph Reading Reference

Graph fact 只有在转写为玩家侧解释后，才可以影响 verdict。

```yaml
graph_fact:
neutral_meaning:
player_facing_interpretation:
verdict_effect: none | merit | caveat | core_attack
```

如果 `player_facing_interpretation` 缺失，`verdict_effect` 必须是 `none`。Graph exhausted 时，完整图依赖结论必须为 `unknown`。

# SCC / Graph Reading Reference

SCC / graph diagnostic 是 evidence，不是 taste。

任何使用 graph fact 的设计攻击或设计背书都必须写：

```yaml
scc_graph_interpretation:
  graph_fact:
  neutral_meaning:
  player_facing_interpretation:
  verdict_effect: none | merit | caveat | core_attack
```

如果 `player_facing_interpretation` 为空，`verdict_effect` 必须是 `none`。

## 常见中性读法

- `graph status: exhausted`：完整图预算耗尽；依赖完整图的结论为 `unknown`。
- `winning states` 多个：不自动代表坏多解，可能是胜利后可逆移动、等价尾部或真实多计划结构。
- `branching_win_dag`：存在可到胜利的分支、汇合或顺序差异；不能直接推出多解坏或高质量。
- `forcedWinPrefix`：胜利承诺顺序固定；不要把 forced 直接读成差评。
- `deadOut` / `dead commitments`：不可逆错误出口；必须继续判断它是否玩家可见、自然、反馈及时、是否教会核心读法。
- `trivialSourceScc` / `entryEqualsExitSource` / scripted handoff：提交前缺少明显可逆 reposition；它是拓扑提示，不是质量判决。
- `solutionIrreversibleStepCount`：不可逆提交数量，不是谜题深度评分。

## Critic 使用纪律

有效攻击必须引用具体玩家侧后果。无效形式：

```yaml
graph_fact: forcedWinPrefix=3/3
neutral_meaning: win-continuing order is fixed
player_facing_interpretation: ""
verdict_effect: core_attack
```

这必须改为 `verdict_effect: none`。

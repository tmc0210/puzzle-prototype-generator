# 全边界 Goal 扫描：ICE_EXP_META_2026_07_02_round19_v7_ABCD

- 布局：prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt
- 方法：对 A/B/C/D 四个起点枚举全部外圈 edge cell 作为 `player_goal`；包含墙、冰和空地。
- 外圈 goal 数量：30
- 接口：A=[1,0]，B=[0,2]，C=[7,7]，D=[8,5]。

| 起点 | 可解 edge goals | 非接口 goal 命中 | 跨组命中 | 可解墙 goal |
| --- | --- | --- | --- | --- |
| A [1,0] | [1,0] '.' cost=6 pushes=1; [0,2] '.' cost=5 pushes=1 | 无 | 无 | 无 |
| B [0,2] | [1,0] '.' cost=5 pushes=1; [0,2] '.' cost=4 pushes=1 | 无 | 无 | 无 |
| C [7,7] | [1,0] '.' cost=17 pushes=2; [0,2] '.' cost=16 pushes=2; [8,5] '.' cost=31 pushes=5; [7,7] '.' cost=30 pushes=4 | 无 | [1,0] '.' cost=17 pushes=2; [0,2] '.' cost=16 pushes=2 | 无 |
| D [8,5] | 无 | 无 | 无 | 无 |

```yaml
all_edge_goals_checked: 30
all_pair_solves_complete_under_budget: true
interface_points:
  A: [1, 0]
  B: [0, 2]
  C: [7, 7]
  D: [8, 5]
AB_to_CD_solved: []
interface_to_non_interface_solved: []
wall_edge_goals_solved: []
ignored_internal_reverse_pairs:
  - C->A
  - C->B
selected_interface_return_pairs_disclosed:
  - A->A
  - B->A
  - B->B
  - C->C
risky_internal_non_target_pairs_requiring_revision: []
```

指定接口对最短解：

| 接口对 | 可解 | Cost | 推冰数 | 事件摘要 |
| --- | --- | ---: | ---: | --- |
| A->B | 是 | 5 | 1 | push_ice, ice_rebound_d4 |
| A->C | 否 | n/a | n/a | 无 |
| A->D | 否 | n/a | n/a | 无 |
| B->A | 是 | 5 | 1 | push_ice, ice_rebound_d4 |
| B->C | 否 | n/a | n/a | 无 |
| B->D | 否 | n/a | n/a | 无 |
| C->A | 是 | 17 | 2 | push_ice, ice_destroyed_d3, ice_rebound_d4 |
| C->B | 是 | 16 | 2 | push_ice, ice_destroyed_d3, ice_rebound_d4 |
| C->D | 是 | 31 | 5 | push_ice, ice_destroyed_d3, ice_rebound_d4, ice_stop_short:d1 |
| D->A | 否 | n/a | n/a | 无 |
| D->B | 否 | n/a | n/a | 无 |
| D->C | 否 | n/a | n/a | 无 |

结论：

```text
全边界 goal 扫描未发现 A/B/C/D 起点通向接口外 edge goal 的可解路径；
没有可解墙 goal；A/B->C/D 仍为空。C->A/B 仍只按本轮人工修正记录为
ignored reverse pair。

A->A、B->B、C->C 和 B->A 是选定接口集合内的返回/自目标变体，作为事实披露，
不属于本轮要求打回的 A/B->C/D 类问题，也不是接口外 edge escape。
```

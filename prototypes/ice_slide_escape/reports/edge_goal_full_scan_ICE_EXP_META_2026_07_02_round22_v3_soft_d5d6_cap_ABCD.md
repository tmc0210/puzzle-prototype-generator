# 全边界 Goal 扫描：ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_ABCD

- 布局：`prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_layout.txt`
- 方法：对合法 A/B/C 接口起点枚举全部外圈 edge cell 作为 `player_goal`；包含墙、冰和空地。D=[10,4] 初始是墙，按 `solver_contract.md` 不是合法 `player_start`，只作为显式 walled edge goal 检查。
- 外圈 goal 数量：30
- 已检查合法起点/goal instance：60
- 图完整性：60/60 complete under `maxStates=80000`
- 接口：A=[1,5]，B=[7,5]，C=[7,5]，D=[10,4]

| 起点 | 可解 edge goals | 非接口 goal 命中 | 跨组命中 | 可解墙 goal |
| --- | --- | --- | --- | --- |
| A [1,5] | [1,5] '.' cost=14 pushes=3 events=ice_destroyed_d3, ice_rebound_d4; [7,5] '.' cost=12 pushes=4 events=ice_destroyed_d3, ice_rebound_d4, ice_stop_short:d1 | 无 | 无 | 无 |
| B/C [7,5] | [10,4] '#' cost=22 pushes=4 events=ice_blocks_ice_no_chain_push, ice_stop_short:d2, ice_boundary_disappear:d1, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group, ice_rebound_d4; [1,5] '.' cost=14 pushes=2 events=ice_rebound_d4, ice_boundary_disappear:d1; [7,5] '.' cost=8 pushes=1 events=ice_rebound_d4 | 无 | [1,5] '.' cost=14 pushes=2 | [10,4] '#' cost=22 pushes=4 events=ice_blocks_ice_no_chain_push, ice_stop_short:d2, ice_boundary_disappear:d1, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group, ice_rebound_d4 |
| D [10,4] | 非法起点：初始为墙 | 不适用 | 不适用 | 不适用 |

```yaml
{
  "all_edge_goals_checked": 30,
  "legal_interface_start_goal_instances_checked": 60,
  "all_pair_solves_complete_under_budget": true,
  "interface_points": {
    "A": [
      1,
      5
    ],
    "B": [
      7,
      5
    ],
    "C": [
      7,
      5
    ],
    "D": [
      10,
      4
    ]
  },
  "same_cell_interfaces": [
    "B_equals_C"
  ],
  "target_pairs": [
    "A->B",
    "C->D"
  ],
  "target_pair_results": {
    "A->B": {
      "solved": true,
      "cost": 12,
      "pushes": 4
    },
    "C->D": {
      "solved": true,
      "cost": 22,
      "pushes": 4
    }
  },
  "interface_to_non_interface_solved": [],
  "wall_edge_goals_solved": [
    "B/C->[10,4]"
  ],
  "ignored_internal_reverse_pairs": [
    "C->A"
  ],
  "selected_interface_return_pairs_disclosed": [
    "A->A",
    "B/C->B/C"
  ]
}
```

指定接口对最短解：

| 接口对 | 可解 | Cost | 推冰数 | 事件摘要 | 归类 |
| --- | --- | ---: | ---: | --- | --- |
| A->B | 是 | 12 | 4 | ice_destroyed_d3, ice_rebound_d4, ice_stop_short:d1 | target |
| A->D | 否 | n/a | 0 | 无 | no_win |
| C->D | 是 | 22 | 4 | ice_blocks_ice_no_chain_push, ice_stop_short:d2, ice_boundary_disappear:d1, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group, ice_rebound_d4 | target |
| C->A | 是 | 14 | 2 | ice_rebound_d4, ice_boundary_disappear:d1 | ignored reverse |
| C->B | 是 | 8 | 1 | ice_rebound_d4 | ignored same-cell return |
| D->A/B/C | 否 | n/a | n/a | D 非法起点，初始墙 | invalid start |

结论：

```text
全边界 goal 扫描未发现 A/B/C/D 起点通向接口外 edge goal 的可解路径。
D 是合法显式 edge goal 且初始为墙；C->D 可解并通过 meta required-event gate。
B=C same-cell re-entry 是本候选的声明结构，因此同坐标 B/C 到 D 的解按目标
C->D 归类，不视为额外 external escape。C->A 与 C->B 仅按本轮
interface_pair_policy 记录为 ignored reverse / same-cell return。
```

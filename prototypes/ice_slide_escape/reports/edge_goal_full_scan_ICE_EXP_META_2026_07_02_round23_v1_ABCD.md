# 全边界 Goal 扫描：ICE_EXP_META_2026_07_02_round23_v1_ABCD

- 布局：`prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round23_v1_layout.txt`
- 方法：对合法接口起点 A/C 枚举全部外圈 edge cell 作为 `player_goal`；包含墙、冰和空地。
- 外圈 goal 数量：50
- 已检查合法起点/goal instance：100
- 图完整性：100/100 complete under `maxStates=80000`
- 接口：A=[17,7]，B=[0,3]，C=[17,1]，D=[0,1]

| 起点 | 可解 edge goals | 非接口 goal 命中 | 跨组命中 | 可解墙 goal |
| --- | --- | --- | --- | --- |
| A [17,7] | B [0,3] `#` cost=25 pushes=3 events=ice_rebound_d4, ice_stop_short:d1, ice_destroy_group_d6_plus:len1; A [17,7] `.` cost=16 pushes=3 events=ice_rebound_d4, ice_stop_short:d1 | 无 | 无 | B [0,3] |
| C [17,1] | D [0,1] `#` cost=23 pushes=2 events=ice_destroy_group_d6_plus:len1, ice_stop_short:d1; A [17,7] `.` cost=14 pushes=3 events=ice_destroy_group_d6_plus:len1, ice_stop_short:d1 | 无 | C->A ignored reverse | D [0,1] |

```yaml
all_edge_goals_checked: 50
legal_interface_start_goal_instances_checked: 100
all_pair_solves_complete_under_budget: true
interface_points:
  A: [17, 7]
  B: [0, 3]
  C: [17, 1]
  D: [0, 1]
target_pairs:
  - A->B
  - C->D
target_pair_results:
  A->B:
    solved: true
    cost: 25
    pushes: 3
  C->D:
    solved: true
    cost: 23
    pushes: 2
interface_to_non_interface_solved: []
wall_edge_goals_solved:
  - A->B
  - C->D
ignored_internal_reverse_pairs:
  - C->A
selected_interface_return_pairs_disclosed:
  - A->A
risky_internal_non_target_pairs_requiring_revision: []
notes:
  - "未发现 A/C 起点通向 A/B/C/D 之外 edge goal 的可解路径。"
  - "A->A 是选定接口返回，记录为 disclosed selected interface return，verdict_effect: none。"
  - "C->A 属于 interface_pair_policy 的 C/D->A/B ignored reverse pair，verdict_effect: none。"
  - "B 与 D 初始为墙，不作为合法 player_start；它们只作为 walled edge goal 检查。"
```

结论：

```text
全边界 goal 扫描未发现接口外 edge-goal escape。A->B 与 C->D 两个目标 pair
分别可解且都打开初始墙 goal；A->A 与 C->A 只作为接口政策记录项，不构成
绕过目标出口的风险。
```

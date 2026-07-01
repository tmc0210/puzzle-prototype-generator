# 全边界 Goal 扫描：ICE_EXP_META_2026_07_02_round25_v1_midSwitch_ABCD

- 布局：`prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round25_v1_midSwitch_layout.txt`
- 方法：对目标流程起点 A/C 枚举全部外圈 edge cell 作为 `player_goal`；包含墙、冰和空地。
- 外圈 goal 数量：46
- 已检查合法起点/goal instance：92
- 图完整性：92/92 complete under `maxStates=80000`
- 接口：A=[0,8]，B=[0,3]，C=[14,1]，D=[14,8]
- 设计意图：中轴 lower ice 作为双向 switch；base 从下侧上推后向左开 B，meta 从上侧下推后向右开 D。

| 起点 | 可解 edge goals | 非接口 goal 命中 | 跨组/非目标接口命中 | 可解墙 goal |
| --- | --- | --- | --- | --- |
| A [0,8] | B [0,3] `#` cost=33 pushes=4 events=ice_rebound_d4, ice_stop_short:d1, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group; A [0,8] `.` cost=38 pushes=3 events=ice_rebound_d4, ice_stop_short:d1 | 无 | A->A selected self/entry record | B [0,3] |
| C [14,1] | A [0,8] `.` cost=27 pushes=3 events=ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4, ice_stop_short:d1; D [14,8] `#` cost=29 pushes=4 events=ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4, ice_stop_short:d1, ice_boundary_disappear_after_group | 无 | C->A optional interface return remains reachable; C->D is target pair | D [14,8] |

```yaml
all_edge_goals_checked: 46
legal_interface_start_goal_instances_checked: 92
all_pair_solves_complete_under_budget: true
interface_points:
  A: [0, 8]
  B: [0, 3]
  C: [14, 1]
  D: [14, 8]
same_cell_interfaces: []
target_pairs:
  - A->B
  - C->D
target_pair_results:
  A->B:
    solved: true
    cost: 33
    pushes: 4
  C->D:
    solved: true
    cost: 29
    pushes: 4
interface_to_non_interface_solved: []
wall_edge_goals_solved:
  - A->B
  - C->D
ignored_or_disclosed_internal_interface_pairs:
  - A->A
  - C->A
rejected_bypass:
  - pair: A->D
    result: complete_no_solution
risky_internal_non_target_pairs_requiring_revision:
  - pair: C->A
    severity: caveat
    reason: "C 完成上层与中轴操作后仍可走到 A；不是接口外逃逸，但大地图包装需接受 harmless back edge 或另行约束。"
notes:
  - "未发现 A/C 起点通向 A/B/C/D 之外 edge goal 的可解路径。"
  - "A->D 完整搜索不可解；A 无法从上侧下推中轴 lower ice 开 D。"
  - "D 不再等于 A；C->D 是右下边界墙出口。"
```

结论：

```text
全边界 goal 扫描未发现接口外 edge-goal escape。A->B 与 C->D 两个目标 pair
分别可解；D 是独立右下墙出口。保留的非目标接口命中是 C->A，需作为
大地图 back edge caveat 明示，但它不是 D->A 或 D=A 回访目标。
```

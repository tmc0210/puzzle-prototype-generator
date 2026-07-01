# 全边界 Goal 扫描：ICE_EXP_META_2026_07_02_round24_v1_verticalD_ABCD

- 布局：`prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round24_v1_verticalD_layout.txt`
- 方法：对目标流程起点 A/C 枚举全部外圈 edge cell 作为 `player_goal`；包含墙、冰和空地。
- 外圈 goal 数量：56
- 已检查合法起点/goal instance：112
- 图完整性：112/112 complete under `maxStates=80000`
- 接口：A=[14,8]，B=[0,3]，C=[14,1]，D=[12,14]
- 设计意图：D 是下边界初始墙出口，不再与 A 同格；C->D 通过从上侧向下推 lower ice 打开竖井出口。

| 起点 | 可解 edge goals | 非接口 goal 命中 | 跨组/非目标接口命中 | 可解墙 goal |
| --- | --- | --- | --- | --- |
| A [14,8] | B [0,3] `#` cost=23 pushes=4 events=ice_rebound_d4, ice_stop_short:d1, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group; A [14,8] `.` cost=18 pushes=3 events=ice_rebound_d4, ice_stop_short:d1 | 无 | A->A selected self/entry record | B [0,3] |
| C [14,1] | A [14,8] `.` cost=17 pushes=3 events=ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4, ice_stop_short:d1, ice_boundary_disappear_after_group; D [12,14] `#` cost=21 pushes=3 events=ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4, ice_stop_short:d1, ice_boundary_disappear_after_group | 无 | C->A optional interface return remains reachable; C->D is target pair | D [12,14] |

```yaml
all_edge_goals_checked: 56
legal_interface_start_goal_instances_checked: 112
all_pair_solves_complete_under_budget: true
interface_points:
  A: [14, 8]
  B: [0, 3]
  C: [14, 1]
  D: [12, 14]
same_cell_interfaces: []
target_pairs:
  - A->B
  - C->D
target_pair_results:
  A->B:
    solved: true
    cost: 23
    pushes: 4
  C->D:
    solved: true
    cost: 21
    pushes: 3
interface_to_non_interface_solved: []
wall_edge_goals_solved:
  - A->B
  - C->D
ignored_or_disclosed_internal_interface_pairs:
  - A->A
  - C->A
risky_internal_non_target_pairs_requiring_revision:
  - pair: C->A
    severity: caveat
    reason: "D 已独立到下边界，但 C 完成 D opener 后仍可走到 A 入口点；不是接口外逃逸，仍需 critic 判断大地图包装是否接受。"
notes:
  - "未发现 A/C 起点通向 A/B/C/D 之外 edge goal 的可解路径。"
  - "A->D 完整搜索不可解；第一版 verticalD 的 A->D 偷路已由下移 lower ice 与阻断 x12,y2 修复。"
  - "D 不再等于 A；C->D 的出口语义是下方竖井 wall-goal。"
```

结论：

```text
全边界 goal 扫描未发现接口外 edge-goal escape。A->B 与 C->D 两个目标 pair
分别可解；D 是独立下边界墙出口。保留的非目标接口命中是 C->A，需作为
大地图连通 caveat 明示，但它不是 D->A 或 D=A 回访目标。
```

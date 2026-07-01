# 全边界 Goal 扫描：ICE_EXP_META_2026_07_02_round23_v3_tight_ABCD

- 布局：`prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round23_v3_tight_layout.txt`
- 方法：对目标流程起点 A/C 枚举全部外圈 edge cell 作为 `player_goal`；包含墙、冰和空地。
- 外圈 goal 数量：44
- 已检查合法起点/goal instance：88
- 图完整性：88/88 complete under `maxStates=80000`
- 接口：A=[14,7]，B=[0,3]，C=[14,1]，D=[14,7]
- 同格接口声明：D 与 A 共用物理格 [14,7]；C->[14,7] 是声明目标 pair C->D。

| 起点 | 可解 edge goals | 非接口 goal 命中 | 跨组命中 | 可解墙 goal |
| --- | --- | --- | --- | --- |
| A [14,7] | B [0,3] `#` cost=22 pushes=3 events=ice_blocks_ice_no_chain_push, ice_rebound_d4, ice_stop_short:d1, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group; A/D [14,7] `.` cost=16 pushes=3 events=ice_blocks_ice_no_chain_push, ice_rebound_d4, ice_blocks_ice_no_chain_push, ice_stop_short:d1, ice_stop_short:d1 | 无 | 无 | B [0,3] |
| C [14,1] | D/A [14,7] `.` cost=14 pushes=3 events=ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4, ice_stop_short:d1, ice_stop_short:d1 | 无 | C->D target pair, D shares A coordinate | 无 |

```yaml
all_edge_goals_checked: 44
legal_interface_start_goal_instances_checked: 88
all_pair_solves_complete_under_budget: true
interface_points:
  A: [14, 7]
  B: [0, 3]
  C: [14, 1]
  D: [14, 7]
same_cell_interfaces:
  - D_equals_A
target_pairs:
  - A->B
  - C->D
target_pair_results:
  A->B:
    solved: true
    cost: 22
    pushes: 3
  C->D:
    solved: true
    goal_coordinate: [14, 7]
    shares_coordinate_with: A
    cost: 14
    pushes: 3
interface_to_non_interface_solved: []
wall_edge_goals_solved:
  - A->B
ignored_internal_reverse_pairs: []
selected_interface_return_pairs_disclosed:
  - A->A_or_D
risky_internal_non_target_pairs_requiring_revision: []
notes:
  - "未发现 A/C 起点通向 A/B/C/D 之外 edge goal 的可解路径。"
  - "A->A_or_D 是选定接口返回记录，verdict_effect: none；同一物理格作为 D 时，C->D 是本候选目标 pair。"
```

结论：

```text
全边界 goal 扫描未发现接口外 edge-goal escape。A->B 与 C->D 两个目标 pair
分别可解；C->D 仍是 D=A 同格回访目标，不是未声明绕返。
```

# Patch Report: ICE_EXP_META_2026_07_02_round22_v2_patch

```yaml
prototype: ice_slide_escape
patch_target: ICE_EXP_META_2026_07_02_round22_v1
archive_candidate: ICE_CAND_0035
patch_status: machine_verified_not_adopted
reason: >
  v1 的 A=[1,5] base 可达图可以触发 boundary / d5 / d6 等晚期事件。
  这会让后续设计误读为 early/base 知识外溢可以被接受。v2 保持 A/B/C/D
  坐标与 B=C 单关回读结构，只补墙封住外溢游走。
```

## Layout Delta

v1:

```text
###########
#.........#
#....#....#
#.G..I.####
#I..I....##
#.#####.###
```

v2 patch:

```text
###########
#....#....#
#.####....#
#.G..I.####
#I..I....##
#.#####.###
```

Wall additions:

```yaml
added_walls:
  - [5, 1]   # 切断顶层长直道，移除 A 起点搬冰上顶层后的 d5/d6 外溢
  - [2, 2]   # 阻止 base 从 target 正上方拆 target 形成 d5 发射冰
  - [3, 2]   # 阻断拆 target 后绕回 [1,2] 的上层通路
  - [4, 2]   # 同上，封住剩余上绕入口
unchanged_interfaces:
  A: [1, 5]
  B: [7, 5]
  C: [7, 5]
  D: [10, 4]
```

## Evidence Summary

```yaml
base_A_to_B:
  report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v2_patch_base_required_full.md
  solved: true
  cost: 12
  pushes: 4
  graph: "complete, states=388, wins=1"
  all_winning_required:
    - ice_destroyed_d3
    - ice_rebound_d4
    - ice_stop_short
  status: pass
base_no_late_exposure:
  report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v2_patch_base_no_late_exposure.md
  forbidden_reachable:
    - ice_boundary_disappear
    - ice_pass_through_d5
    - slide_restart_after_group
    - ice_destroy_group_d6_plus
  forbidden_reachable_hits: []
  graph: "complete, states=388"
  status: pass
meta_C_to_D:
  report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v2_patch_meta_required_full.md
  solved: true
  cost: 22
  pushes: 4
  graph: "complete, states=772, wins=1"
  all_winning_required:
    - ice_rebound_d4
    - ice_stop_short
    - ice_boundary_disappear
    - ice_destroy_group_d6_plus
  status: pass
full_edge_scan:
  report: prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v2_patch_ABCD.md
  edge_goals_checked: 30
  legal_start_goal_instances_checked: 60
  complete: "60/60"
  interface_to_non_interface_solved: []
  status: pass
```

## Design Note

v2 不是全新候选，而是对 `ICE_CAND_0035` 的知识外溢补丁。它保留 B=C：
首访从 B 离开后，在外部 return pressure 下原路返回，会从同一格 C 重新读这关。

需要注明的行为变化：v1 的 meta 返回解先用 d4 填 target，再组织 boundary + d6
开 D；v2 为了封堵 base 外溢，meta 返回解变为先用左下冰组 short/boundary/d6
开 D，再回头用 d4 填 target，最后走到 D。机器证明仍支持 C->D 所有胜利路径
必含 d4、short、boundary、d6，但归档文字不应暗示 v2 完全复刻 v1 的局部顺序。

审美取舍也需要保留：v2 通过压缩上层空间消除外溢，meta 图更紧、更线性；
`layout_analysis_ICE_EXP_META_2026_07_02_round22_v2_patch_meta.md` 显示
forced viable commitments 为 4/4，较 v1 的游走余地更少。这不是机器风险，
但如果严格继承人类 5 分，需要把它理解为“外溢修正版保留抽象亮点，但局部
观感更脚本化”。

## Archive Policy

```yaml
not_adopted_strict_patch: ICE_EXP_META_2026_07_02_round22_v2_patch
archive_adoption_status: not_adopted_more_linear_than_v3
v1_status: historical_pre_patch
v1_warning: >
  v1 base A 起点可达图命中 d5/d6/boundary；不应作为 early/base 知识外溢可接受的正例。
v2_status: machine_verified_patch_candidate
linearity_tradeoff: "meta 更紧、更线性；forced viable commitments=4/4。"
human_aesthetic_note: >
  人类 5 分评语主要针对 B=C 单关回读与 return pressure wrapper 的抽象价值。
  v2 保留此抽象结构，但 meta 局部顺序改变；若要严格重新标定审美，可要求人类复核。
```

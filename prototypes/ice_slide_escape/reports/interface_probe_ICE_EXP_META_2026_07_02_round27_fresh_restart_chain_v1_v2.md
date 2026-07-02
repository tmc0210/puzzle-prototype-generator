# 接口探针 v2：ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1

这个探针用于替代早先不完整的 edge probe。早先版本只扫了初始可站的 edge goal，遗漏了“初始为墙但可作为显式 goal”的 B/D 类目标。本版扫描两个初始可站的声明入口 A、C，并把所有 72 个边缘格都作为显式 goal 检查。坐标为 0-based。

```yaml
candidate_id: ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1
layout_size: [21, 17]
edge_goal_count_checked_per_start: 72
max_states: 120000
max_depth: 170
interfaces:
  A: [0, 8]
  B: [20, 11]
  C: [10, 0]
  D: [3, 16]
initially_standable_edge_starts:
  - A: [0, 8]
  - C: [10, 0]
declared_goals_initially_walled:
  - B: [20, 11]
  - D: [3, 16]
search_status:
  A:
    found: 2
    complete_unsolved: 70
    exhausted_or_incomplete: 0
  C:
    found: 4
    complete_unsolved: 68
    exhausted_or_incomplete: 0
```

## 可解边缘 Pair

| start | goal | 分类 | cost | push 数 | 事件族 |
| --- | --- | --- | ---: | ---: | --- |
| A [0,8] | A [0,8] | self_zero_step | 0 | 0 | none |
| A [0,8] | B [20,11] | target_pair | 23 | 2 | walk, push_ice, ice_stop_short, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear_after_group |
| C [10,0] | C [10,0] | self_zero_step | 0 | 0 | none |
| C [10,0] | A [0,8] | ignored_internal_reverse_pair | 18 | 2 | walk, push_ice, ice_destroyed_d3, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear_after_group |
| C [10,0] | B [20,11] | ignored_internal_reverse_pair | 35 | 4 | walk, push_ice, ice_destroyed_d3, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear_after_group, ice_stop_short |
| C [10,0] | D [3,16] | target_pair | 23 | 2 | walk, push_ice, ice_destroyed_d3, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear_after_group |

## 分类摘要

```yaml
A:
  target_pairs_solved: [A->B]
  self_zero_step: [A->A]
  ignored_internal_reverse_pairs_solved: []
  internal_non_target_risks_solved: []
  external_edge_goal_escape_solved: []
C:
  target_pairs_solved: [C->D]
  self_zero_step: [C->C]
  ignored_internal_reverse_pairs_solved: [C->A, C->B]
  internal_non_target_risks_solved: []
  external_edge_goal_escape_solved: []
```

按 `prototypes/ice_slide_escape/docs/meta_interfaces.md`，`C/D -> A/B` 属于 ignored reverse/internal pair。除非 brief 明确改写该政策，这类事实只能记录为 `verdict_effect: none`，不能生成 caveat 或 core attack。本轮 brief 没有改写该政策。

结论：A/C 两个可站入口均没有通向 A/B/C/D 之外的外部边缘逃逸，也没有未被忽略的内部非目标 pair。所有不可解目标均为完整搜索结束，没有预算耗尽项。

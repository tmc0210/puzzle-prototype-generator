# Edge Pair Scan: ICE_CAND_0022_v1_ABCD

该报告记录 `ICE_CAND_0022_v1_double_debt_meta_layout` 的四个声明接口点 `A/B/C/D` 到全部边缘 goal 的显式 solve-instance 扫描摘要。

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0022_v1_double_debt_meta_layout.txt
width: 17
height: 9
edge_goals_checked: 48
starts_checked:
  A: [0, 2]
  B: [0, 7]
  C: [16, 7]
  D: [16, 2]
max_states: 100000
graph_max_states: 100000
errors: 0
```

## Solved Pairs

```yaml
solved:
  - pair: A->A
    start: [0, 2]
    goal: [0, 2]
    cost: 4
    events:
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
  - pair: A->B
    start: [0, 2]
    goal: [0, 7]
    cost: 9
    events:
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
  - pair: B->A
    start: [0, 7]
    goal: [0, 2]
    cost: 9
    events:
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
  - pair: B->B
    start: [0, 7]
    goal: [0, 7]
    cost: 14
    events:
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
  - pair: C->D
    start: [16, 7]
    goal: [16, 2]
    cost: 51
    events:
      - ice_destroyed_d3
      - ice_pass_through_d5:len2
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
      - ice_stop_short:d1
      - ice_destroy_group_d6_plus:len2
  - pair: C->C
    start: [16, 7]
    goal: [16, 7]
    cost: 56
    events:
      - ice_destroyed_d3
      - ice_pass_through_d5:len2
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
      - ice_destroy_group_d6_plus:len2
      - ice_stop_short:d1
  - pair: D->D
    start: [16, 2]
    goal: [16, 2]
    cost: 56
    events:
      - ice_destroyed_d3
      - ice_pass_through_d5:len2
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
      - ice_stop_short:d1
      - ice_destroy_group_d6_plus:len2
  - pair: D->C
    start: [16, 2]
    goal: [16, 7]
    cost: 61
    events:
      - ice_destroyed_d3
      - ice_pass_through_d5:len2
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
      - ice_destroy_group_d6_plus:len2
      - ice_stop_short:d1
```

## Required Reject Checks

```yaml
ABCD_to_non_ABCD_edge:
  solved_count: 0
  result: none_solved
  verdict_effect: pass_required_reachability_gate
A_or_B_to_C_or_D:
  A_to_C: unsolved
  A_to_D: unsolved
  B_to_C: unsolved
  B_to_D: unsolved
  verdict_effect: pass_required_reachability_gate
```

## Non-Target Selected Pairs

- `A->A`、`B->A`、`B->B` 是 base 侧 selected-interface 自环/返程。
- `D->D`、`D->C` 是右侧 selected-interface 变体；当前不触发硬 reject，但需披露。
- 未发现任一 ABCD 起点到非 ABCD 边缘 goal 的胜路。

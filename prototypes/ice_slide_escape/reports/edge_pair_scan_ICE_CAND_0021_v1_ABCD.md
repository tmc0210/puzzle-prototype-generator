# Edge Pair Scan: ICE_CAND_0021_v1_ABCD

该报告记录 `ICE_CAND_0021_v1_stopper_relay_layout` 的四个声明接口点 `A/B/C/D` 到全部边缘 goal 的显式 solve-instance 扫描摘要。

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0021_v1_stopper_relay_layout.txt
width: 15
height: 8
edge_goals_checked: 42
starts_checked:
  A: [0, 2]
  B: [0, 6]
  C: [14, 2]
  D: [14, 6]
max_states: 100000
graph_max_states: 100000
errors: 0
```

## Solved Pairs

```yaml
solved:
  - pair: A->[0,2]
    start: [0, 2]
    goal: [0, 2]
    cost: 4
    events:
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
  - pair: A->[0,6]
    start: [0, 2]
    goal: [0, 6]
    cost: 8
    events:
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
  - pair: B->[0,2]
    start: [0, 6]
    goal: [0, 2]
    cost: 8
    events:
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
  - pair: B->[0,6]
    start: [0, 6]
    goal: [0, 6]
    cost: 12
    events:
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
  - pair: C->[14,2]
    start: [14, 2]
    goal: [14, 2]
    cost: 14
    events:
      - ice_pass_through_d5:len2
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
      - ice_stop_short:d1
  - pair: C->[14,6]
    start: [14, 2]
    goal: [14, 6]
    cost: 18
    events:
      - ice_pass_through_d5:len2
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
      - ice_stop_short:d1
  - pair: D->[14,2]
    start: [14, 6]
    goal: [14, 2]
    cost: 18
    events:
      - ice_pass_through_d5:len2
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
      - ice_stop_short:d1
  - pair: D->[14,6]
    start: [14, 6]
    goal: [14, 6]
    cost: 22
    events:
      - ice_pass_through_d5:len2
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
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

## Notes

- `B->B` 使用 base 一推后返回 B；这是 selected-interface 自环，不触发硬 reject。
- `D->C`、`D->D` 使用与 `C->D` 同类 meta 链；它们是右侧 selected-interface 变体，应披露为路由语义 caveat。
- 未发现任一 ABCD 起点到非 ABCD 边缘 goal 的胜路。

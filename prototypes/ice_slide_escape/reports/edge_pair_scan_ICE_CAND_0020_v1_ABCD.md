# Edge Pair Scan: ICE_CAND_0020_v1_ABCD

该报告记录 `ICE_CAND_0020_meta_gate_v1_layout` 的四个声明接口点
`A/B/C/D` 到全部边缘 goal 的显式 solve-instance 扫描摘要。

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0020_meta_gate_v1_layout.txt
width: 14
height: 7
edge_goals_checked: 38
starts_checked:
  A: [0, 2]
  B: [0, 4]
  C: [13, 2]
  D: [13, 4]
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
    cost: 10
    events:
      - ice_stop_short:d1
      - ice_stop_short:d1
  - pair: A->B
    start: [0, 2]
    goal: [0, 4]
    cost: 8
    events:
      - ice_stop_short:d1
      - ice_stop_short:d1
  - pair: B->A
    start: [0, 4]
    goal: [0, 2]
    cost: 8
    events:
      - ice_stop_short:d1
      - ice_stop_short:d1
  - pair: B->B
    start: [0, 4]
    goal: [0, 4]
    cost: 10
    events:
      - ice_stop_short:d1
      - ice_stop_short:d1
  - pair: C->C
    start: [13, 2]
    goal: [13, 2]
    cost: 16
    events:
      - ice_pass_through_d5:len1
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d1
      - ice_destroy_group_d6_plus:len1
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d1
  - pair: C->D
    start: [13, 2]
    goal: [13, 4]
    cost: 12
    events:
      - ice_pass_through_d5:len1
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d1
      - ice_destroy_group_d6_plus:len1
      - slide_restart_after_group
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d1
```

## Required Reject Checks

```yaml
ABCD_to_non_ABCD_edge:
  result: none_solved
  verdict_effect: pass_required_reachability_gate
A_or_B_to_C_or_D:
  A_to_C: unsolved
  A_to_D: unsolved
  B_to_C: unsolved
  B_to_D: unsolved
  verdict_effect: pass_required_reachability_gate
D_start_to_any_edge:
  result: none_solved
  verdict_effect: note_only
```

## Non-Target Selected Pairs

`A->A`、`B->A`、`B->B`、`C->C` 均只到达声明的四个接口点之一，
不触发本轮 `ABCD -> 非 ABCD edge` reject 条件。

`C->C` 使用与 `C->D` 相同的 d5 -> d6 meta 链，但终点回到入口侧，cost 更长。
它应记录为 selected-interface 同链路变体风险；当前不抢走 `C->D`，因为 `C->D`
是更短、更自然的右侧下出口。

# ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2 Interface Edge Scan

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2
layout: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_layout.txt
scan_tool: prototypes/ice_slide_escape/reports/worker_meta_first_search.ts
max_states: 120000
max_depth: 180
```

## Declared Interfaces

```yaml
A: [0, 5]
B: [10, 10]
C: [22, 5]
D: [10, 10]
note: B and D are the same physical bottom-edge exit.
```

## Solved Edge Instances

The edge scan found two complete solved edge instances:

```yaml
solved_pairs:
  - start: [22, 5]
    goal: [10, 10]
    cost: 23
    events:
      - ice_destroy_group_d6_plus
      - slide_restart_after_group
      - ice_destroyed_d3
      - ice_rebound_d4
    graph_states: 1725
    wins: 3
  - start: [0, 5]
    goal: [10, 10]
    cost: 29
    events:
      - ice_destroyed_d3
      - ice_rebound_d4
    graph_states: 922
    wins: 1
```

No additional solved edge-goal pairs were found by this scan.

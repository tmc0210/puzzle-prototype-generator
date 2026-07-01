# Edge Goal Scan: ICE_EXP_META_2026_07_02_round21_v1

```yaml
prototype: ice_slide_escape
candidate_id: ICE_EXP_META_2026_07_02_round21_v1
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round21_v1_layout.txt
scan_scope:
  starts_checked:
    - [0, 4]
    - [6, 8]
  goals_checked: all perimeter cells
  max_states: 120000
  max_depth: 120
  graph_max_states: 120000
status: controller_script_scan
```

## Solved Edge Goals

```yaml
from_A_0_4:
  - goal: [6, 8]
    relation: target_pair_A_to_B
    cost: 10
    pushes: 2
    events:
      - ice_rebound_d4
      - ice_stop_short
from_C_6_8:
  - goal: [6, 0]
    relation: target_pair_C_to_D
    cost: 20
    pushes: 2
    events:
      - ice_destroy_group_d6_plus
      - ice_boundary_disappear_after_group
      - ice_rebound_d4
  - goal: [0, 4]
    relation: ignored_reverse_C_to_A
    cost: 12
    pushes: 3
    events:
      - ice_destroy_group_d6_plus
      - ice_boundary_disappear_after_group
      - ice_rebound_d4
      - ice_stop_short
  - goal: [6, 8]
    relation: same_cell_C_to_B_return_after_target
    cost: 16
    pushes: 2
    events:
      - ice_destroy_group_d6_plus
      - ice_boundary_disappear_after_group
      - ice_rebound_d4
```

## Controller Reading

```yaml
external_edge_escape:
  status: none_found
  reason: >
    No solved edge goals outside declared interface cells [0,4], [6,8], [6,0]
    were found for the two standable starts.
internal_non_target_pairs:
  A_to_D: unsolved
  C_to_A: ignored_reverse_pair
  C_to_B: same_cell_return_due_to_B_equals_C
```

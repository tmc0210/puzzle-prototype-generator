# Interface And Static Seal: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1

## Layout

```text
###############.##
###############.##
#...###########.##
..#.*....*....*.##
####I....I....####
##################
##################
##################
```

## Declared Interfaces

```yaml
A: [0, 3]
B: [15, 0]
C: [15, 0]
D: [0, 3]
target_pairs:
  base: A -> B
  meta: C -> D
edge_floor_cells:
  - [15, 0]
  - [0, 3]
```

Static edge scan found no other in-grid edge floor cells.

## Initial Object Check

```yaml
targets_initially_with_ice:
  - [4, 3]
  - [9, 3]
  - [14, 3]
extra_off_target_ice:
  - [4, 4]
  - [9, 4]
```

Every target initially has ice. Extra off-target ice is present and is treated as support/refill material; this relies on the rules file allowing extra ice outside target cells.

## Static Walk Seal

Pure walk BFS treats ice as blockers and targets without ice as floor.

```yaml
initial_state:
  A_to_B: { found: false, visited: 6 }
  B_to_A: { found: false, visited: 4 }
remove_extra_off_target_ice_only:
  A_to_B: { found: false, visited: 6 }
  B_to_A: { found: false, visited: 4 }
remove_target_ice_only:
  A_to_B: { found: true, length: 20 }
  B_to_A: { found: true, length: 20 }
remove_all_ice:
  A_to_B: { found: true, length: 20 }
  B_to_A: { found: true, length: 20 }
```

Interpretation: the target ice at `[4,3]`, `[9,3]`, and `[14,3]` is sufficient to seal the start-to-goal corridor in both directions. Removing only the two extra ice pieces does not open a pure walking path. Removing target ice opens the 20-step corridor.

## Dynamic Interface Scan Refs

```yaml
goal_B_report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_B.md
goal_A_report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_goal_A.md
goal_B_results:
  start_A_to_B: { start: [0, 3], goal: [15, 0], found: true, cost: 44 }
  start_B_to_B: { start: [15, 0], goal: [15, 0], found: true, cost: 0, verdict_effect: none }
goal_A_results:
  start_A_to_A: { start: [0, 3], goal: [0, 3], found: true, cost: 0, verdict_effect: none }
  start_B_to_A: { start: [15, 0], goal: [0, 3], found: true, cost: 42 }
```

Self-pairs are zero-step only because `A=D` and `B=C` share physical edge cells. They are ignored for quality; the claimed pairs are `A->B` and `C->D`.

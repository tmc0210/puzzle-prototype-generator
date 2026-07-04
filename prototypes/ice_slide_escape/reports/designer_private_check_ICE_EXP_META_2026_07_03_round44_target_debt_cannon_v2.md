# Designer Private Check: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2

This file is designer-side only. Do not include it as reviewer-facing aesthetic
evidence.

## Static Checks

```yaml
layout: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_layout.txt
stars:
  - [5, 5]
  - [9, 5]
ice:
  - [5, 5]
  - [9, 5]
  - [21, 5]
  - [5, 8]
  - [9, 8]
base_A_to_B:
  start: [0, 5]
  goal: [10, 10]
  static_path_ignoring_targets: true
  static_path_blocking_star_cells: false
  static_path_blocking_all_initial_ice: false
meta_C_to_D:
  start: [22, 5]
  goal: [10, 10]
  static_path_ignoring_targets: false
  static_path_blocking_star_cells: false
  static_path_blocking_all_initial_ice: false
```

## Notes

- Base A->B is statically cut by the target-ice cells.
- Meta C->D is also blocked initially, but not solely by target ice: the short
  wall pair at row 5 is part of the intended late d6 gate.
- This distinction should stay out of reviewer-facing aesthetic claims.

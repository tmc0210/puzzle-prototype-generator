# Fixed Anchor Probe: RA_LEX_2026_07_08_PULL_BRUSH_CM_TOOTH_v2_fixed_PL_scan

- Fixed kind: push_pull
- Profile: default
- Budget: maxStates=500000, maxDepth=80
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
############
#PL#......##
####..G#..##
####..MMG.##
###BS@...###
############
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: exhausted
- Explored states: 3785
- Reason: depth budget exceeded (80)

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: exhausted
- Explored states: 3763
- Reason: depth budget exceeded (80)

### fixed_push_pull_effect

- Found bypass: false
- Status: exhausted
- Explored states: 3782
- Reason: depth budget exceeded (80)

### material_normalization

- Found bypass: false
- Status: exhausted
- Explored states: 3766
- Reason: depth budget exceeded (80)

## Reachable Event Scan

- Status: complete
- Reachable states: 3860
- Legal transitions: 8413
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 319
  - box_to_sticky:n1: 100
  - box_to_sticky:n2: 3
  - force_chain:n2: 37
  - force_chain:n3: 1
  - move_sticky_rigid: 309
  - pull_object:box_sticky_anchor: 318
  - pull_object:crate#1: 189
  - pull_object:crate#2: 79
  - pull_object:sticky#1: 237
  - pull_object:sticky#2: 54
  - sticky_merge:n1: 24
  - sticky_to_box:n1: 90
  - sticky_to_box:n2: 8
  - walk: 7536

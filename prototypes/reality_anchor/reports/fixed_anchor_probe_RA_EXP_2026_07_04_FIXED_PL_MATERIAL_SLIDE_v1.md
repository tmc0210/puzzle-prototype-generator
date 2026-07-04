# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1

- Fixed kind: push_pull
- Budget: maxStates=300000, maxDepth=60
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
#########
####LP###
#########
#M....@.#
#.GS..M.#
#..B#G..#
#########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 377
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 352
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 377
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 352
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 352
- Legal transitions: 791
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 23
  - force_chain:n2: 3
  - move_sticky_rigid: 89
  - pull_object:box_sticky_anchor: 20
  - pull_object:sticky#1: 45
  - pull_object:sticky#2: 4
  - push_object:crate#1: 4
  - push_object:sticky#1: 14
  - push_object:sticky#2: 26
  - sticky_merge:n1: 6
  - sticky_to_box:n1: 6
  - walk: 678

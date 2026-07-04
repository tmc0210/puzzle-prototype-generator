# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v3

- Fixed kind: push_pull
- Profile: default
- Budget: maxStates=400000, maxDepth=100
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
###########
#P#....@..#
#L#.G.#B#.#
####.##S#.#
####m##.#.#
####M####.#
###########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 116
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 87
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 61
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 59
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 45
- Legal transitions: 93
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 6
  - box_to_sticky:n1: 3
  - force_chain:n2: 1
  - move_sticky_rigid: 3
  - pull_object:box_sticky_anchor: 3
  - pull_object:sticky#1: 2
  - push_object:box_sticky_anchor: 3
  - push_object:crate#1: 1
  - sticky_merge:n1: 2
  - sticky_to_box:n1: 3
  - walk: 84

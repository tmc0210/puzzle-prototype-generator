# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v2

- Fixed kind: push_pull
- Profile: default
- Budget: maxStates=400000, maxDepth=100
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
###########
#P#....@..#
#L#...#B#.#
####G##S#.#
####m##.#.#
####M####.#
###########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 32
- Depth: 6
- Missing groups: movable_box_sticky_shift, material_normalization
- Inputs: left left down left down up
- Events: walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 31
- Depth: 6
- Missing groups: movable_box_sticky_shift
- Inputs: left left down left down up
- Events: walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 61
- Reason: no winning bypass found

### material_normalization

- Found bypass: true
- Status: found
- Explored states: 17
- Depth: 6
- Missing groups: material_normalization
- Inputs: left left down left down up
- Events: walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid

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

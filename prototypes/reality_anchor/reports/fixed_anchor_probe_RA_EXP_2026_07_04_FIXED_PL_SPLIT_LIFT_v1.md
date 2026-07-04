# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v1

- Fixed kind: push_pull
- Profile: default
- Budget: maxStates=400000, maxDepth=100
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
###########
##.....@..#
#P#....B..#
#L#.G..S..#
####m#....#
####M#....#
###########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 195
- Depth: 5
- Missing groups: fixed_push_pull_effect, material_normalization
- Inputs: right down left left left
- Events: walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 195
- Depth: 6
- Missing groups: movable_box_sticky_shift
- Inputs: left down left down left up
- Events: walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid

### fixed_push_pull_effect

- Found bypass: true
- Status: found
- Explored states: 193
- Depth: 5
- Missing groups: fixed_push_pull_effect
- Inputs: right down left left left
- Events: walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

### material_normalization

- Found bypass: true
- Status: found
- Explored states: 172
- Depth: 5
- Missing groups: material_normalization
- Inputs: right down left left left
- Events: walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

## Reachable Event Scan

- Status: complete
- Reachable states: 16869
- Legal transitions: 46903
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 1504
  - box_to_sticky:n1: 473
  - box_to_sticky:n2: 24
  - force_chain:n2: 170
  - force_chain:n3: 5
  - move_sticky_rigid: 674
  - pull_object:box_sticky_anchor: 1201
  - pull_object:crate#1: 743
  - pull_object:crate#2: 248
  - pull_object:sticky#1: 484
  - pull_object:sticky#2: 106
  - push_object:box_sticky_anchor: 300
  - push_object:crate#1: 315
  - push_object:crate#2: 78
  - push_object:sticky#1: 6
  - sticky_merge:n1: 102
  - sticky_to_box:n1: 430
  - sticky_to_box:n2: 36
  - walk: 43422

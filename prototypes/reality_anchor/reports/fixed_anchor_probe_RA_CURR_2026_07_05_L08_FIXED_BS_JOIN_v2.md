# Fixed Anchor Probe: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2

- Fixed kind: box_sticky
- Profile: strong_material_no_pull
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
########
#......#
#B.C#..#
#S...@.#
###M.G.#
########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 69
- Depth: 9
- Missing groups: movable_push_pull_shift
- Inputs: up up left left down left down right right
- Events: walk walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 69
- Depth: 9
- Missing groups: movable_push_pull_shift
- Inputs: up up left left down left down right right
- Events: walk walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 186
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 186
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 186
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 203
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 186
- Legal transitions: 488
- Forbidden hits: none
- Event counts:
  - box_to_sticky:n1: 1
  - move_sticky_rigid: 9
  - push_object:crate#1: 9
  - push_object:sticky#1: 9
  - sticky_merge:n1: 1
  - walk: 470

# Fixed Anchor Probe: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2_anchor_scan

- Fixed kind: box_sticky
- Profile: strong_material_no_pull
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
########
#..GG###
#@CC...#
###....#
###BS###
########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 464
- Depth: 14
- Missing groups: movable_push_pull_shift
- Inputs: right right down right right right up left down left up down left up
- Events: push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:crate#1

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 368
- Depth: 14
- Missing groups: movable_push_pull_shift
- Inputs: right right down right right right up left down left up down left up
- Events: push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:crate#1

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 1035
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 1035
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 1468
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 1060
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 910
- Legal transitions: 2293
- Forbidden hits: none
- Event counts:
  - box_to_sticky:n1: 18
  - force_chain:n2: 6
  - move_sticky_rigid: 79
  - push_object:crate#1: 68
  - push_object:crate#2: 17
  - push_object:sticky#1: 71
  - push_object:sticky#2: 7
  - sticky_merge:n1: 9
  - sticky_to_box:n1: 16
  - sticky_to_box:n2: 1
  - walk: 2130

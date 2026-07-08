# Fixed Anchor Probe: RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1_anchor_scan

- Fixed kind: box_sticky
- Profile: strong_material_no_pull
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
########
#..G####
#@CC.G.#
###....#
###BS###
########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 140
- Depth: 13
- Missing groups: movable_push_pull_shift
- Inputs: right right down right right right up left down left left up right
- Events: push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 131
- Depth: 13
- Missing groups: movable_push_pull_shift
- Inputs: right right down right right right up left down left left up right
- Events: push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 207
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 207
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 180
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 213
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 180
- Legal transitions: 428
- Forbidden hits: none
- Event counts:
  - box_to_sticky:n1: 3
  - force_chain:n2: 4
  - move_sticky_rigid: 12
  - push_object:crate#1: 8
  - push_object:crate#2: 5
  - push_object:sticky#1: 11
  - sticky_merge:n1: 1
  - sticky_to_box:n1: 4
  - walk: 404

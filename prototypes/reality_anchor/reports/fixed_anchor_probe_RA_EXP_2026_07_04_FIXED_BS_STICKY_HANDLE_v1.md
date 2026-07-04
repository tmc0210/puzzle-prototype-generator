# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1

- Fixed kind: box_sticky
- Profile: strong_material_no_pull
- Budget: maxStates=300000, maxDepth=60
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
#########
####BS###
#########
#@PLG...#
#...C.MG#
#########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 309
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: false
- Status: complete
- Explored states: 217
- Reason: no winning bypass found

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 217
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 217
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 217
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 309
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 217
- Legal transitions: 534
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:push_pull: 16
  - box_to_sticky:n1: 9
  - force_chain:n2: 4
  - move_sticky_rigid: 20
  - pull_object:crate#1: 1
  - pull_object:sticky#1: 5
  - push_object:crate#1: 26
  - push_object:push_pull_anchor: 16
  - push_object:sticky#1: 11
  - sticky_merge:n1: 9
  - sticky_to_box:n1: 1
  - walk: 475

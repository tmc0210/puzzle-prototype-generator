# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2

- Fixed kind: box_sticky
- Profile: strong_material_no_pull
- Budget: maxStates=400000, maxDepth=200
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#....@PL..#
###########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 2249
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: false
- Status: complete
- Explored states: 1941
- Reason: no winning bypass found

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 2107
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 2107
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 1898
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 2206
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 1898
- Legal transitions: 4784
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:push_pull: 142
  - box_to_sticky:n1: 11
  - force_chain:n2: 7
  - move_sticky_rigid: 36
  - pull_object:crate#1: 28
  - pull_object:push_pull_anchor: 60
  - push_object:crate#1: 68
  - push_object:push_pull_anchor: 81
  - push_object:sticky#1: 18
  - push_object:sticky#2: 18
  - sticky_merge:n1: 8
  - sticky_to_box:n1: 3
  - walk: 4511

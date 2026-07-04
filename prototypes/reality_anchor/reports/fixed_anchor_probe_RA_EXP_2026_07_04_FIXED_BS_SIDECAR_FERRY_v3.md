# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3

- Fixed kind: box_sticky
- Profile: strong_material_no_pull
- Budget: maxStates=400000, maxDepth=200
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
##########
#####SB###
####GG####
####M.C.##
#...#...##
#....@PL.#
##########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 92
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: false
- Status: complete
- Explored states: 92
- Reason: no winning bypass found

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 92
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 92
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 92
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 92
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 92
- Legal transitions: 219
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:push_pull: 3
  - box_to_sticky:n1: 1
  - move_sticky_rigid: 1
  - pull_object:push_pull_anchor: 1
  - push_object:crate#1: 3
  - push_object:push_pull_anchor: 2
  - push_object:sticky#1: 1
  - sticky_merge:n1: 1
  - walk: 212

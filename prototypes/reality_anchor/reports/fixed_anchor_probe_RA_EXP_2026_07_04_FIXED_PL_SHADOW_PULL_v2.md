# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2

- Fixed kind: push_pull
- Profile: strong_material
- Budget: maxStates=400000, maxDepth=80
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
##########
#...#....#
#.#.GG#@.#
##..MC...#
#L#.######
#P#.SB.###
##########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 550
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 393
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 393
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 435
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 550
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 393
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 432
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 393
- Legal transitions: 803
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 9
  - box_to_sticky:n1: 6
  - move_sticky_rigid: 18
  - pull_object:crate#1: 7
  - pull_object:crate#2: 12
  - pull_object:sticky#1: 18
  - push_object:box_sticky_anchor: 9
  - sticky_merge:n1: 1
  - sticky_to_box:n1: 4
  - walk: 757

# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2

- Fixed kind: push_pull
- Profile: strong_material
- Budget: maxStates=800000, maxDepth=140
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
###########
####PL#####
###########
###BS@....#
######.####
#...M..G..#
#....M.G..#
#.........#
###########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 604
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 544
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 544
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 544
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 544
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 544
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 604
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 544
- Legal transitions: 1437
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 40
  - box_to_sticky:n1: 8
  - move_sticky_rigid: 63
  - pull_object:box_sticky_anchor: 40
  - pull_object:crate#1: 4
  - pull_object:sticky#1: 43
  - pull_object:sticky#2: 11
  - push_object:crate#1: 4
  - push_object:sticky#1: 9
  - sticky_merge:n1: 12
  - sticky_to_box:n1: 12
  - sticky_to_box:n2: 2
  - walk: 1326

# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2

- Fixed kind: push_pull
- Profile: strong_material
- Budget: maxStates=400000, maxDepth=200
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
###########
###@SB....#
#P#..#....#
#L#.M.C#..#
####GG#...#
###########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 996
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 783
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 996
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 783
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 783
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 783
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 882
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 783
- Legal transitions: 1917
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 53
  - box_to_sticky:n1: 7
  - move_sticky_rigid: 49
  - pull_object:crate#1: 6
  - pull_object:sticky#1: 27
  - pull_object:sticky#2: 7
  - push_object:box_sticky_anchor: 53
  - push_object:crate#1: 1
  - push_object:sticky#1: 15
  - sticky_merge:n1: 19
  - sticky_to_box:n1: 11
  - sticky_to_box:n2: 3
  - walk: 1808

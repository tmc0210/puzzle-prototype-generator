# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3

- Fixed kind: push_pull
- Profile: strong_material
- Budget: maxStates=400000, maxDepth=200
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
#########
###@SB.##
#P#..####
#L#.M.C##
####.G###
#########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 76
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 52
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 76
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 52
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 52
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 52
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 61
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 52
- Legal transitions: 110
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 4
  - box_to_sticky:n1: 3
  - move_sticky_rigid: 10
  - pull_object:crate#1: 3
  - pull_object:sticky#1: 5
  - pull_object:sticky#2: 1
  - push_object:box_sticky_anchor: 4
  - push_object:sticky#1: 4
  - sticky_merge:n1: 4
  - walk: 93

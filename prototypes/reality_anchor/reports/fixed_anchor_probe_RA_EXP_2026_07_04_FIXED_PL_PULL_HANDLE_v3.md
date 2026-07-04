# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v3

- Fixed kind: push_pull
- Profile: strong_material
- Budget: maxStates=600000, maxDepth=120
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
###########
####PL#####
###########
###BS@....#
#########.#
#...M.MGG.#
#.........#
###########
```

## Combined Winning-Path Probe

- Found bypass: false
- Status: complete
- Explored states: 292
- Reason: no winning bypass found

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 148
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 148
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 148
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 238
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 148
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 292
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 148
- Legal transitions: 350
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 4
  - box_to_sticky:n1: 3
  - force_chain:n2: 1
  - move_sticky_rigid: 2
  - pull_object:box_sticky_anchor: 4
  - pull_object:crate#1: 5
  - pull_object:crate#2: 6
  - pull_object:sticky#1: 2
  - push_object:crate#1: 6
  - sticky_to_box:n1: 4
  - walk: 327

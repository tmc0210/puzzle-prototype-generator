# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v1

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
######....#
#...M..G..#
#....M.G..#
#.........#
###########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 496
- Depth: 10
- Missing groups: sticky_merge, sticky_rigid_move
- Inputs: right right right down left down down left right right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 63361
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 63361
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 63361
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 1088
- Depth: 12
- Missing groups: box_to_sticky
- Inputs: right right right right down left down down left left right right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:crate#2 pull_object:crate#2

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 490
- Depth: 10
- Missing groups: sticky_merge
- Inputs: right right right down left down down left right right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1

### sticky_rigid_move

- Found bypass: true
- Status: found
- Explored states: 484
- Depth: 10
- Missing groups: sticky_rigid_move
- Inputs: right right right down left down down left right right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1

## Reachable Event Scan

- Status: complete
- Reachable states: 63361
- Legal transitions: 174766
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 5646
  - box_to_sticky:n1: 1071
  - box_to_sticky:n2: 32
  - force_chain:n2: 543
  - force_chain:n3: 15
  - move_sticky_rigid: 4255
  - pull_object:box_sticky_anchor: 5008
  - pull_object:crate#1: 2122
  - pull_object:crate#2: 928
  - pull_object:sticky#1: 3031
  - pull_object:sticky#2: 958
  - push_object:box_sticky_anchor: 560
  - push_object:crate#1: 673
  - push_object:crate#2: 164
  - push_object:sticky#1: 30
  - sticky_merge:n1: 435
  - sticky_to_box:n1: 1035
  - sticky_to_box:n2: 97
  - walk: 161292

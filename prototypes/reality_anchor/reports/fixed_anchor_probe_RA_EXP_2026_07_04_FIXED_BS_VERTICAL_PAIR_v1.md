# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_BS_VERTICAL_PAIR_v1

- Fixed kind: box_sticky
- Profile: strong_material_no_pull
- Budget: maxStates=800000, maxDepth=140
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
###########
####BS#####
###########
#@PLG.....#
#...C..G..#
#....M.G..#
#.........#
###########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 30081
- Depth: 16
- Missing groups: fixed_box_sticky_effect, box_to_sticky, sticky_merge
- Inputs: right right right left down down right up right right down right right up left right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: false
- Status: complete
- Explored states: 369643
- Reason: no winning bypass found

### fixed_box_sticky_effect

- Found bypass: true
- Status: found
- Explored states: 25624
- Depth: 16
- Missing groups: fixed_box_sticky_effect
- Inputs: right right right left down down right up right right down right right up left right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 27146
- Depth: 16
- Missing groups: box_to_sticky
- Inputs: right right right left down down right up right right down right right up left right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 27114
- Depth: 16
- Missing groups: sticky_merge
- Inputs: right right right left down down right up right right down right right up left right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 380831
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 367744
- Legal transitions: 1131974
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:push_pull: 35576
  - box_to_sticky:n1: 3554
  - force_chain:n2: 3214
  - force_chain:n3: 36
  - move_sticky_rigid: 29090
  - pull_object:crate#1: 1736
  - pull_object:crate#2: 328
  - pull_object:push_pull_anchor: 16046
  - pull_object:sticky#1: 11838
  - pull_object:sticky#2: 3848
  - push_object:crate#1: 17810
  - push_object:crate#2: 5340
  - push_object:push_pull_anchor: 18680
  - push_object:sticky#1: 10558
  - push_object:sticky#2: 1370
  - sticky_merge:n1: 1960
  - sticky_to_box:n1: 1726
  - sticky_to_box:n2: 102
  - walk: 1044420

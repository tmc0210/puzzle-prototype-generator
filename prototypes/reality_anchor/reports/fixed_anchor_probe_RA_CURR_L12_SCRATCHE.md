# Fixed Anchor Probe: RA_CURR_L12_SCRATCHE

- Fixed kind: box_sticky
- Profile: strong_material_no_pull
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
###########
##..@..####
#P#.C..#B##
#L#...G.S##
##..M.G.###
###########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 65
- Depth: 5
- Missing groups: movable_push_pull_shift
- Inputs: down right down right right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 65
- Depth: 5
- Missing groups: movable_push_pull_shift
- Inputs: down right down right right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 887
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 887
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 887
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 1022
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 887
- Legal transitions: 2256
- Forbidden hits: none
- Event counts:
  - box_to_sticky:n1: 42
  - force_chain:n2: 3
  - move_sticky_rigid: 158
  - pull_object:crate#1: 18
  - pull_object:sticky#1: 94
  - pull_object:sticky#2: 29
  - push_object:crate#1: 48
  - push_object:sticky#1: 24
  - push_object:sticky#2: 8
  - sticky_merge:n1: 37
  - walk: 2035

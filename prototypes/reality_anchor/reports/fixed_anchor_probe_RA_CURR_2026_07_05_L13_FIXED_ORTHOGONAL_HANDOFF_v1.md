# Fixed Anchor Probe: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_HANDOFF_v1

- Fixed kind: box_sticky
- Profile: strong_material
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, pull_event, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
###########
####BS#####
#P#.C.G..##
#L#..MG..##
###.@....##
###########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 56
- Depth: 5
- Missing groups: movable_push_pull_shift, pull_event
- Inputs: left up up right right
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: true
- Status: found
- Explored states: 55
- Depth: 5
- Missing groups: movable_push_pull_shift
- Inputs: left up up right right
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### fixed_box_sticky_effect

- Found bypass: false
- Status: complete
- Explored states: 2142
- Reason: no winning bypass found

### pull_event

- Found bypass: true
- Status: found
- Explored states: 55
- Depth: 5
- Missing groups: pull_event
- Inputs: left up up right right
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 2241
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 3014
- Reason: no winning bypass found

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 1725
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 1611
- Legal transitions: 4316
- Forbidden hits: none
- Event counts:
  - box_to_sticky:n1: 35
  - move_sticky_rigid: 326
  - pull_object:crate#1: 64
  - pull_object:crate#2: 9
  - pull_object:sticky#1: 182
  - pull_object:sticky#2: 49
  - push_object:crate#1: 35
  - push_object:crate#2: 2
  - push_object:sticky#1: 74
  - push_object:sticky#2: 21
  - sticky_merge:n1: 30
  - sticky_to_box:n1: 32
  - sticky_to_box:n2: 4
  - walk: 3880

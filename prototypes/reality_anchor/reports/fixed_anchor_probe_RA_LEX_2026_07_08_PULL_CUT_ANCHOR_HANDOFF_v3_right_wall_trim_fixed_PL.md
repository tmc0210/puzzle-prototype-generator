# Fixed Anchor Probe: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim_fixed_PL

- Fixed kind: push_pull
- Profile: strong_material
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
#########
#..G#...#
#...MM@P#
#.....#L#
###BS####
#########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 485
- Depth: 12
- Missing groups: box_to_sticky, sticky_merge
- Inputs: left left left up left left down right down right right up
- Events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#2 force_chain:n2 walk walk walk push_object:crate#1 push_object:crate#1 walk pull_object:crate#2 pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 1820
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 1662
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 1399
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 406
- Depth: 12
- Missing groups: box_to_sticky
- Inputs: left left left up left left down right down right right up
- Events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#2 force_chain:n2 walk walk walk push_object:crate#1 push_object:crate#1 walk pull_object:crate#2 pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 383
- Depth: 12
- Missing groups: sticky_merge
- Inputs: left left left up left left down right down right right up
- Events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#2 force_chain:n2 walk walk walk push_object:crate#1 push_object:crate#1 walk pull_object:crate#2 pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 1340
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 1340
- Legal transitions: 3219
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 162
  - box_to_sticky:n1: 34
  - force_chain:n2: 25
  - force_chain:n3: 1
  - move_sticky_rigid: 68
  - pull_object:box_sticky_anchor: 99
  - pull_object:crate#1: 14
  - pull_object:crate#2: 19
  - pull_object:sticky#1: 9
  - push_object:box_sticky_anchor: 58
  - push_object:crate#1: 90
  - push_object:crate#2: 18
  - push_object:sticky#1: 48
  - push_object:sticky#2: 2
  - sticky_merge:n1: 12
  - sticky_to_box:n1: 16
  - sticky_to_box:n2: 2
  - walk: 2862

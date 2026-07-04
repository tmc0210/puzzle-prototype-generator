# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_STICKY_PULL_v1

- Fixed kind: push_pull
- Profile: strong_material
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
#########
####PL###
#########
#@BSG..##
#..M.MG.#
#.......#
#########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 45
- Depth: 4
- Missing groups: fixed_push_pull_effect
- Inputs: right down right right
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 1988
- Depth: 16
- Missing groups: movable_box_sticky_shift
- Inputs: down down right right right up right down left left left up right down right up
- Events: walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

### fixed_push_pull_effect

- Found bypass: true
- Status: found
- Explored states: 45
- Depth: 4
- Missing groups: fixed_push_pull_effect
- Inputs: right down right right
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### material_normalization

- Found bypass: true
- Status: found
- Explored states: 447
- Depth: 9
- Missing groups: material_normalization
- Inputs: down right right right left left left up right
- Events: walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 93
- Depth: 5
- Missing groups: box_to_sticky
- Inputs: right right down right right
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 93
- Depth: 5
- Missing groups: sticky_merge
- Inputs: right right down right right
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid

### sticky_rigid_move

- Found bypass: true
- Status: found
- Explored states: 1185
- Depth: 11
- Missing groups: sticky_rigid_move
- Inputs: right right right left left down right down right up right
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:crate#1 walk walk push_object:crate#1 push_object:crate#2 box_to_sticky:n1

## Reachable Event Scan

- Status: complete
- Reachable states: 5107
- Legal transitions: 13185
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 458
  - box_to_sticky:n1: 140
  - box_to_sticky:n2: 1
  - force_chain:n2: 103
  - force_chain:n3: 1
  - move_sticky_rigid: 436
  - pull_object:box_sticky_anchor: 196
  - pull_object:crate#1: 35
  - pull_object:crate#2: 63
  - pull_object:sticky#1: 221
  - pull_object:sticky#2: 28
  - push_object:box_sticky_anchor: 244
  - push_object:crate#1: 353
  - push_object:crate#2: 84
  - push_object:sticky#1: 121
  - push_object:sticky#2: 11
  - sticky_merge:n1: 58
  - sticky_to_box:n1: 133
  - sticky_to_box:n2: 7
  - walk: 11829

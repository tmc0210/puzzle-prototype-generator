# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_BS_VERTICAL_LOCK_v2

- Fixed kind: box_sticky
- Profile: strong_material_no_pull
- Budget: maxStates=300000, maxDepth=100
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
#########
####BS###
#########
#@PLG.#.#
#...C.G.#
#....MG.#
#########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 4438
- Depth: 25
- Missing groups: fixed_box_sticky_effect, box_to_sticky, sticky_merge
- Inputs: down right right down left left up up right right right right down up left left left down left down right right right up right
- Events: walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 push_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: false
- Status: complete
- Explored states: 9701
- Reason: no winning bypass found

### fixed_box_sticky_effect

- Found bypass: true
- Status: found
- Explored states: 3125
- Depth: 25
- Missing groups: fixed_box_sticky_effect
- Inputs: down right right down left left up up right right right right down up left left left down left down right right right up right
- Events: walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 push_object:sticky#1 move_sticky_rigid

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 3267
- Depth: 25
- Missing groups: box_to_sticky
- Inputs: down right right down left left up up right right right right down up left left left down left down right right right up right
- Events: walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 push_object:sticky#1 move_sticky_rigid

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 3785
- Depth: 25
- Missing groups: sticky_merge
- Inputs: down right right down left left up up right right right right down up left left left down left down right right right up right
- Events: walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 push_object:sticky#1 move_sticky_rigid

### sticky_rigid_move

- Found bypass: false
- Status: complete
- Explored states: 9998
- Reason: no winning bypass found

## Reachable Event Scan

- Status: complete
- Reachable states: 9657
- Legal transitions: 25005
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:push_pull: 751
  - box_to_sticky:n1: 255
  - force_chain:n2: 142
  - force_chain:n3: 4
  - move_sticky_rigid: 513
  - pull_object:crate#1: 99
  - pull_object:crate#2: 27
  - pull_object:push_pull_anchor: 269
  - pull_object:sticky#1: 256
  - pull_object:sticky#2: 16
  - push_object:crate#1: 938
  - push_object:crate#2: 276
  - push_object:push_pull_anchor: 448
  - push_object:sticky#1: 180
  - push_object:sticky#2: 9
  - sticky_merge:n1: 99
  - sticky_to_box:n1: 29
  - sticky_to_box:n2: 8
  - walk: 22487

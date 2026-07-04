# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_BS_VERTICAL_LOCK_v1

- Fixed kind: box_sticky
- Profile: strong_material_no_pull
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:box_sticky

## Layout

```text
#########
####BS###
#########
#@PLG...#
#...C.G.#
#....MG.#
#########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 1118
- Depth: 12
- Missing groups: fixed_box_sticky_effect, box_to_sticky, sticky_merge
- Inputs: right right right left down down right up right right down right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_push_pull_shift

- Found bypass: false
- Status: exhausted
- Explored states: 23545
- Reason: depth budget exceeded (80)

### fixed_box_sticky_effect

- Found bypass: true
- Status: found
- Explored states: 922
- Depth: 12
- Missing groups: fixed_box_sticky_effect
- Inputs: right right right left down down right up right right down right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 991
- Depth: 12
- Missing groups: box_to_sticky
- Inputs: right right right left down down right up right right down right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 1016
- Depth: 12
- Missing groups: sticky_merge
- Inputs: right right right left down down right up right right down right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid

### sticky_rigid_move

- Found bypass: false
- Status: exhausted
- Explored states: 24586
- Reason: depth budget exceeded (80)

## Reachable Event Scan

- Status: complete
- Reachable states: 23432
- Legal transitions: 63406
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:push_pull: 2399
  - box_to_sticky:n1: 514
  - force_chain:n2: 338
  - force_chain:n3: 7
  - move_sticky_rigid: 1604
  - pull_object:crate#1: 151
  - pull_object:crate#2: 29
  - pull_object:push_pull_anchor: 922
  - pull_object:sticky#1: 736
  - pull_object:sticky#2: 75
  - push_object:crate#1: 2107
  - push_object:crate#2: 753
  - push_object:push_pull_anchor: 1393
  - push_object:sticky#1: 622
  - push_object:sticky#2: 26
  - sticky_merge:n1: 228
  - sticky_to_box:n1: 124
  - sticky_to_box:n2: 18
  - walk: 56592

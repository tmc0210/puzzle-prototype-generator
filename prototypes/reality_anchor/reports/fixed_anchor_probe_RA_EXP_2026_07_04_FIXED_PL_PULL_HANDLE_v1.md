# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v1

- Fixed kind: push_pull
- Profile: strong_material
- Budget: maxStates=300000, maxDepth=80
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
##########
####PL####
##########
###BS@...#
#...M.MG.#
#........#
##########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 20
- Depth: 4
- Missing groups: box_to_sticky, sticky_merge
- Inputs: right right down right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 43
- Depth: 6
- Missing groups: movable_box_sticky_shift
- Inputs: down down right right up right
- Events: walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid

### fixed_push_pull_effect

- Found bypass: true
- Status: found
- Explored states: 56
- Depth: 7
- Missing groups: fixed_push_pull_effect
- Inputs: down down left left up right right
- Events: walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### material_normalization

- Found bypass: true
- Status: found
- Explored states: 43
- Depth: 6
- Missing groups: material_normalization
- Inputs: down down right right up right
- Events: walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 20
- Depth: 4
- Missing groups: box_to_sticky
- Inputs: right right down right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 20
- Depth: 4
- Missing groups: sticky_merge
- Inputs: right right down right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid

### sticky_rigid_move

- Found bypass: true
- Status: found
- Explored states: 51
- Depth: 6
- Missing groups: sticky_rigid_move
- Inputs: right right right down left down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

## Reachable Event Scan

- Status: complete
- Reachable states: 3425
- Legal transitions: 8544
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 340
  - box_to_sticky:n1: 100
  - box_to_sticky:n2: 3
  - force_chain:n2: 83
  - force_chain:n3: 2
  - move_sticky_rigid: 228
  - pull_object:box_sticky_anchor: 188
  - pull_object:crate#1: 94
  - pull_object:crate#2: 68
  - pull_object:sticky#1: 164
  - pull_object:sticky#2: 11
  - push_object:box_sticky_anchor: 119
  - push_object:crate#1: 130
  - push_object:crate#2: 34
  - push_object:sticky#1: 21
  - sticky_merge:n1: 34
  - sticky_to_box:n1: 88
  - sticky_to_box:n2: 16
  - walk: 7715

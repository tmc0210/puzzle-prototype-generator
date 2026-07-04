# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v2

- Fixed kind: push_pull
- Profile: strong_material
- Budget: maxStates=500000, maxDepth=100
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
###########
####PL#####
###########
###BS@....#
#...M.MGG.#
#.........#
###########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 110
- Depth: 7
- Missing groups: box_to_sticky, sticky_merge, sticky_rigid_move
- Inputs: right right right right down left down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: true
- Status: found
- Explored states: 479
- Depth: 13
- Missing groups: movable_box_sticky_shift
- Inputs: down down left left up right down right right right up right right
- Events: walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 8195
- Reason: no winning bypass found

### material_normalization

- Found bypass: true
- Status: found
- Explored states: 479
- Depth: 13
- Missing groups: material_normalization
- Inputs: down down left left up right down right right right up right right
- Events: walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 109
- Depth: 7
- Missing groups: box_to_sticky
- Inputs: right right right right down left down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 106
- Depth: 7
- Missing groups: sticky_merge
- Inputs: right right right right down left down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

### sticky_rigid_move

- Found bypass: true
- Status: found
- Explored states: 109
- Depth: 7
- Missing groups: sticky_rigid_move
- Inputs: right right right right down left down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

## Reachable Event Scan

- Status: complete
- Reachable states: 8132
- Legal transitions: 20653
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 831
  - box_to_sticky:n1: 216
  - box_to_sticky:n2: 3
  - force_chain:n2: 142
  - force_chain:n3: 4
  - move_sticky_rigid: 621
  - pull_object:box_sticky_anchor: 585
  - pull_object:crate#1: 284
  - pull_object:crate#2: 162
  - pull_object:sticky#1: 476
  - pull_object:sticky#2: 58
  - push_object:box_sticky_anchor: 203
  - push_object:crate#1: 257
  - push_object:crate#2: 47
  - push_object:sticky#1: 28
  - sticky_merge:n1: 82
  - sticky_to_box:n1: 206
  - sticky_to_box:n2: 19
  - walk: 18553

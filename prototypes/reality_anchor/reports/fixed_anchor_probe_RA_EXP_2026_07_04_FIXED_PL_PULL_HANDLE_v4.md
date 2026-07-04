# Fixed Anchor Probe: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v4

- Fixed kind: push_pull
- Profile: strong_material
- Budget: maxStates=600000, maxDepth=120
- Required groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- Forbidden reachable events: anchor_boundary_shift:push_pull

## Layout

```text
###########
####PL#####
###########
###BS@....#
######....#
#...M.MGG.#
#.........#
###########
```

## Combined Winning-Path Probe

- Found bypass: true
- Status: found
- Explored states: 214
- Depth: 8
- Missing groups: box_to_sticky, sticky_merge, sticky_rigid_move
- Inputs: right right right right down left down down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

## Individual Winning-Path Probes

### movable_box_sticky_shift

- Found bypass: false
- Status: complete
- Explored states: 9022
- Reason: no winning bypass found

### fixed_push_pull_effect

- Found bypass: false
- Status: complete
- Explored states: 9022
- Reason: no winning bypass found

### material_normalization

- Found bypass: false
- Status: complete
- Explored states: 9022
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 208
- Depth: 8
- Missing groups: box_to_sticky
- Inputs: right right right right down left down down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 206
- Depth: 8
- Missing groups: sticky_merge
- Inputs: right right right right down left down down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

### sticky_rigid_move

- Found bypass: true
- Status: found
- Explored states: 213
- Depth: 8
- Missing groups: sticky_rigid_move
- Inputs: right right right right down left down down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

## Reachable Event Scan

- Status: complete
- Reachable states: 9022
- Legal transitions: 21981
- Forbidden hits: none
- Event counts:
  - anchor_boundary_shift:box_sticky: 783
  - box_to_sticky:n1: 223
  - box_to_sticky:n2: 7
  - force_chain:n2: 122
  - force_chain:n3: 5
  - move_sticky_rigid: 594
  - pull_object:box_sticky_anchor: 680
  - pull_object:crate#1: 362
  - pull_object:crate#2: 164
  - pull_object:sticky#1: 440
  - pull_object:sticky#2: 94
  - push_object:box_sticky_anchor: 84
  - push_object:crate#1: 166
  - push_object:crate#2: 41
  - push_object:sticky#1: 6
  - sticky_merge:n1: 96
  - sticky_to_box:n1: 209
  - sticky_to_box:n2: 20
  - walk: 19944

# Directional Event Probe: RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v2_core

- Budget: maxStates=400000, maxDepth=120
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, rigid, crate_push

## Layout

```text
###########
###########
###.@######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 278094
- Depth: 60
- Missing groups: crate_push
- Inputs: left down down down right right right right right down left left left up up left left up up right down left down down left down right right up right right up down right down left up left left left up up right right down right down down left left up right down right up left up up left down
- Events: walk walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid

## Individual Probes

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 285141
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 285540
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 285992
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: false
- Status: complete
- Explored states: 289082
- Reason: no winning bypass found

### rigid

- Found bypass: false
- Status: complete
- Explored states: 287156
- Reason: no winning bypass found

### crate_push

- Found bypass: true
- Status: found
- Explored states: 268215
- Depth: 60
- Missing groups: crate_push
- Inputs: left down down down right right right right right down left left left up up left left up up right down left down down left down right right up right right up down right down left up left left left up up right right down right down down left left up right down right up left up up left down
- Events: walk walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid

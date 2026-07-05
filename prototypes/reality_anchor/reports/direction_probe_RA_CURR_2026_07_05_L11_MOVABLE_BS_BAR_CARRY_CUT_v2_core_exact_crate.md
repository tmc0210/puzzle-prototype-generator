# Directional Event Probe: RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_core_exact_crate

- Budget: maxStates=400000, maxDepth=120
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, rigid, crate_push

## Layout

```text
###########
###########
###..######
###.CCC####
###...G####
#...G.#####
#.....BS@##
###########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 2210
- Depth: 28
- Missing groups: crate_push
- Inputs: left left left up up left left up up right down left down down left down right right up right up down left left up up right down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#2 walk walk walk walk walk walk push_object:crate#2

## Individual Probes

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 5170
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 5170
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 5170
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: false
- Status: complete
- Explored states: 5170
- Reason: no winning bypass found

### rigid

- Found bypass: false
- Status: complete
- Explored states: 6334
- Reason: no winning bypass found

### crate_push

- Found bypass: true
- Status: found
- Explored states: 1939
- Depth: 28
- Missing groups: crate_push
- Inputs: left left left up up left left up up right down left down down left down right right up right up down left left up up right down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#2 walk walk walk walk walk walk push_object:crate#2

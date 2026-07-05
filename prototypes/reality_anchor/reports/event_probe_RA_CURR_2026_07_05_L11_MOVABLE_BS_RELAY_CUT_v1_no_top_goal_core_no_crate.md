# Event Probe: RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_no_top_goal_core_no_crate

- Budget: maxStates=300000, maxDepth=40
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, sticky_rigid

## Layout

```text
#########
#..C.#..#
##@BS..M#
#.G.M..M#
#########
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 537
- Depth: 14
- Missing groups: sticky_merge, sticky_to_box
- Inputs: down right right left left up up right down right right right down left
- Events: walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

## Individual Probes

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 429
- Reason: no winning bypass found

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 564
- Reason: no winning bypass found

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 333
- Depth: 14
- Missing groups: sticky_merge
- Inputs: down right right left left up up right down right right right down left
- Events: walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 388
- Depth: 14
- Missing groups: sticky_to_box
- Inputs: down right right left left up up right down right right right down left
- Events: walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 528
- Reason: no winning bypass found

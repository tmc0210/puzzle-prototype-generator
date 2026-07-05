# Directional Event Probe: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_remove_goal_lower_core

- Budget: maxStates=500000, maxDepth=120
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, rigid, crate_push

## Layout

```text
############
#......@##.#
#.....C.MM.#
#..##....G##
#..##...####
#.....BS...#
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 420
- Depth: 7
- Missing groups: bs_shift, sticky_to_box
- Inputs: left down left down right right right
- Events: walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

## Individual Probes

### bs_shift

- Found bypass: true
- Status: found
- Explored states: 411
- Depth: 7
- Missing groups: bs_shift
- Inputs: left down left down right right right
- Events: walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 5576
- Depth: 17
- Missing groups: box_to_sticky
- Inputs: left down down left down down right right right left left up left up right right right
- Events: walk push_object:crate#1 push_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#3 walk walk push_object:crate#3 push_object:crate#3 push_object:crate#3

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 5109
- Depth: 17
- Missing groups: sticky_merge
- Inputs: left down down left down down right right right left left up left up right right right
- Events: walk push_object:crate#1 push_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#3 walk walk push_object:crate#3 push_object:crate#3 push_object:crate#3

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 411
- Depth: 7
- Missing groups: sticky_to_box
- Inputs: left down left down right right right
- Events: walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### rigid

- Found bypass: true
- Status: found
- Explored states: 3591
- Depth: 15
- Missing groups: rigid
- Inputs: left down down left down down right right left up left up right right right
- Events: walk push_object:crate#1 push_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#2 walk walk push_object:crate#2 push_object:crate#2 push_object:crate#2 box_to_sticky:n1 sticky_merge:n1

### crate_push

- Found bypass: false
- Status: complete
- Explored states: 9360
- Reason: no winning bypass found

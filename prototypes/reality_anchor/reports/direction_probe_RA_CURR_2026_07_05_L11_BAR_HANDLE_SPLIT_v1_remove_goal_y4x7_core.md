# Directional Event Probe: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_remove_goal_y4x7_core

- Budget: maxStates=500000, maxDepth=120
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, rigid, crate_push

## Layout

```text
############
#......@##.#
#.....C.MM.#
#..##...GG##
#..##...####
#.....BS...#
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 431
- Depth: 7
- Missing groups: bs_shift, sticky_to_box
- Inputs: left left down right up right down
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid

## Individual Probes

### bs_shift

- Found bypass: true
- Status: found
- Explored states: 422
- Depth: 7
- Missing groups: bs_shift
- Inputs: left left down right up right down
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 13686
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 12942
- Reason: no winning bypass found

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 422
- Depth: 7
- Missing groups: sticky_to_box
- Inputs: left left down right up right down
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid

### rigid

- Found bypass: false
- Status: complete
- Explored states: 10985
- Reason: no winning bypass found

### crate_push

- Found bypass: false
- Status: complete
- Explored states: 9360
- Reason: no winning bypass found

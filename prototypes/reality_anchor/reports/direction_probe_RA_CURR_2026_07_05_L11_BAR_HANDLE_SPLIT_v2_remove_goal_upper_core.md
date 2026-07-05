# Directional Event Probe: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_remove_goal_upper_core

- Budget: maxStates=500000, maxDepth=120
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, rigid, crate_push

## Layout

```text
############
#......@##.#
#.....C.MM.#
#..##.....##
#..##..G####
#.....BS...#
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 254
- Depth: 6
- Missing groups: bs_shift, sticky_merge, sticky_to_box, rigid
- Inputs: left down down left down right
- Events: walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

## Individual Probes

### bs_shift

- Found bypass: true
- Status: found
- Explored states: 253
- Depth: 6
- Missing groups: bs_shift
- Inputs: left down down left down right
- Events: walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 1095
- Depth: 10
- Missing groups: box_to_sticky
- Inputs: left down down left down down right left up right
- Events: walk push_object:crate#1 push_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:crate#1

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 253
- Depth: 6
- Missing groups: sticky_merge
- Inputs: left down down left down right
- Events: walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 253
- Depth: 6
- Missing groups: sticky_to_box
- Inputs: left down down left down right
- Events: walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

### rigid

- Found bypass: true
- Status: found
- Explored states: 253
- Depth: 6
- Missing groups: rigid
- Inputs: left down down left down right
- Events: walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

### crate_push

- Found bypass: false
- Status: complete
- Explored states: 9360
- Reason: no winning bypass found

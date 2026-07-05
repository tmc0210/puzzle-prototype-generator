# Directional Event Probe: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_lower_core

- Budget: maxStates=500000, maxDepth=120
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, rigid, crate_push

## Layout

```text
############
#......G##.#
#....@C.MM.#
#..##.....##
#..##....###
#.....BS...#
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 212
- Depth: 6
- Missing groups: bs_shift, sticky_merge, sticky_to_box, rigid
- Inputs: down right up left up right
- Events: walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

## Individual Probes

### bs_shift

- Found bypass: true
- Status: found
- Explored states: 212
- Depth: 6
- Missing groups: bs_shift
- Inputs: down right up left up right
- Events: walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 1040
- Depth: 10
- Missing groups: box_to_sticky
- Inputs: down down down right up up up left up right
- Events: walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:crate#1 walk walk push_object:crate#1

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 212
- Depth: 6
- Missing groups: sticky_merge
- Inputs: down right up left up right
- Events: walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 212
- Depth: 6
- Missing groups: sticky_to_box
- Inputs: down right up left up right
- Events: walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

### rigid

- Found bypass: true
- Status: found
- Explored states: 212
- Depth: 6
- Missing groups: rigid
- Inputs: down right up left up right
- Events: walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

### crate_push

- Found bypass: true
- Status: found
- Explored states: 4516
- Depth: 14
- Missing groups: crate_push
- Inputs: down down right right right down left up up left up left up right
- Events: walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

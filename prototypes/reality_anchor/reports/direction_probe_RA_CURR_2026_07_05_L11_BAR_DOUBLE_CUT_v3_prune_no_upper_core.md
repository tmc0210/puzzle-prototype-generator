# Directional Event Probe: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_upper_core

- Budget: maxStates=500000, maxDepth=120
- Required groups: bs_shift, box_to_sticky, sticky_merge, sticky_to_box, rigid, crate_push

## Layout

```text
############
#.......##.#
#....@C.MM.#
#..##.....##
#..##...G###
#.....BS...#
############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 386
- Depth: 8
- Missing groups: bs_shift, sticky_merge, sticky_to_box
- Inputs: up right down down left down right right
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid

## Individual Probes

### bs_shift

- Found bypass: true
- Status: found
- Explored states: 385
- Depth: 8
- Missing groups: bs_shift
- Inputs: up right down down left down right right
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid

### box_to_sticky

- Found bypass: true
- Status: found
- Explored states: 3660
- Depth: 14
- Missing groups: box_to_sticky
- Inputs: up right down down left down down right right left left up right right
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:crate#2 push_object:crate#2

### sticky_merge

- Found bypass: true
- Status: found
- Explored states: 385
- Depth: 8
- Missing groups: sticky_merge
- Inputs: up right down down left down right right
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid

### sticky_to_box

- Found bypass: true
- Status: found
- Explored states: 385
- Depth: 8
- Missing groups: sticky_to_box
- Inputs: up right down down left down right right
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid

### rigid

- Found bypass: true
- Status: found
- Explored states: 1833
- Depth: 12
- Missing groups: rigid
- Inputs: up right down down left down down right left up right right
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:crate#1 push_object:crate#1 box_to_sticky:n1

### crate_push

- Found bypass: true
- Status: found
- Explored states: 11471
- Depth: 18
- Missing groups: crate_push
- Inputs: down down right right right down left up up up up left down down left down right right
- Events: walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

# Event Probe: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v1_core6

- Budget: maxStates=300000, maxDepth=120
- Required groups: box_to_sticky, sticky_merge, sticky_rigid, bs_shift, sticky_cut, force_chain

## Layout

```text
#############
#......G#####
#....@C.MM###
#..##.....G##
#..##...G####
#.....BS..###
#############
```

## Combined Probe

- Found bypass: true
- Status: found
- Explored states: 6498
- Depth: 17
- Missing groups: force_chain
- Inputs: right up right down left down down left down right right up up up right down right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 push_object:crate#1 walk push_object:crate#2 push_object:sticky#1 move_sticky_rigid

## Individual Probes

### box_to_sticky

- Found bypass: false
- Status: complete
- Explored states: 40388
- Reason: no winning bypass found

### sticky_merge

- Found bypass: false
- Status: complete
- Explored states: 37536
- Reason: no winning bypass found

### sticky_rigid

- Found bypass: false
- Status: complete
- Explored states: 43001
- Reason: no winning bypass found

### bs_shift

- Found bypass: false
- Status: complete
- Explored states: 36543
- Reason: no winning bypass found

### sticky_cut

- Found bypass: false
- Status: complete
- Explored states: 43619
- Reason: no winning bypass found

### force_chain

- Found bypass: true
- Status: found
- Explored states: 4538
- Depth: 17
- Missing groups: force_chain
- Inputs: right up right down left down down left down right right up up up right down right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 push_object:crate#1 walk push_object:crate#2 push_object:sticky#1 move_sticky_rigid

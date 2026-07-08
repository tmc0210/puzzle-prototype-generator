# Event Order Probe: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_cut_before_merge

- Early pattern: sticky_to_box
- Must be preceded by: sticky_merge
- Budget: maxStates=300000, maxDepth=120

## Layout

```text
#############
######.G#####
#####@C.MM###
#####.....G##
#####...G####
#####.BS..###
#############
```

## Order Violation Winning Probe

- Found violation win: true
- Status: found
- Explored states: 6887
- Depth: 37
- Inputs: down right right up up left down left down right down right right up left down left up left up right up right down left down down left down right right up up up right down right
- Events: walk walk walk walk walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 push_object:crate#1 walk push_object:crate#2 push_object:sticky#1 move_sticky_rigid

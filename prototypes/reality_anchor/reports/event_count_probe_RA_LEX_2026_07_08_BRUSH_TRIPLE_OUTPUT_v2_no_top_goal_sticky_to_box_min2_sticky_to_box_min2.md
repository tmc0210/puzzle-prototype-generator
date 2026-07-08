# Event Count Probe: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_top_goal_sticky_to_box_min2

- Event pattern: sticky_to_box
- Required minimum count: 2
- Budget: maxStates=300000, maxDepth=120

## Layout

```text
#############
######..#####
#####@C.MM###
#####.....G##
#####...G####
#####.BS..###
#############
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 1793
- Matched count: 1
- Depth: 18
- Inputs: right up right down left down right down left left down right right up up up right down
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1

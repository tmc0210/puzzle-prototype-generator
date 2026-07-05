# Event Order Probe: RA_CURR_L11_CARRY_CUT_TEMPLATE_I_cut_before_merge_order

- Early pattern: sticky_to_box
- Must be preceded by: sticky_merge
- Budget: maxStates=600000, maxDepth=80

## Layout

```text
###########
#.........#
#.........#
#..#......#
#.B#.G.C..#
#.S##MG...#
#.@########
###########
```

## Order Violation Winning Probe

- Found violation win: true
- Status: found
- Explored states: 41907
- Depth: 40
- Inputs: up left up up up right right right down down right right down right up right up left left up left down left down right up up left left left down up right right down right right right down left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk push_object:crate#1

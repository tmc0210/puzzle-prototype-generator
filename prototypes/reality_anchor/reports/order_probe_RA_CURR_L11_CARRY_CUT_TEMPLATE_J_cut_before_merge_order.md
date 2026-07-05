# Event Order Probe: RA_CURR_L11_CARRY_CUT_TEMPLATE_J_cut_before_merge_order

- Early pattern: sticky_to_box
- Must be preceded by: sticky_merge
- Budget: maxStates=300000, maxDepth=80

## Layout

```text
###########
#.........#
#.........#
#..#......#
#.B#.G.C..#
#.S##MG####
#.@########
###########
```

## Order Violation Winning Probe

- Found violation win: true
- Status: found
- Explored states: 11055
- Depth: 48
- Inputs: up left up up up right down left down down down right up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down right right right down left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk push_object:crate#1

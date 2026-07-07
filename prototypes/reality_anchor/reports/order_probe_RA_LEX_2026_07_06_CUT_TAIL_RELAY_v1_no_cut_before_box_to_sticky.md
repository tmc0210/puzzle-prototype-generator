# Event Order Probe: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_cut_before_box_to_sticky

- Early pattern: sticky_to_box
- Must be preceded by: box_to_sticky
- Budget: maxStates=500000, maxDepth=140

## Layout

```text
#########
#.......#
#B#C...G#
#S#..G.##
##.M.G.##
##.M...##
#..@...##
#########
```

## Order Violation Winning Probe

- Found violation win: true
- Status: found
- Explored states: 116221
- Depth: 27
- Inputs: up left up right right down right up left up up up left down down right down down left left up right right up up right right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk push_object:crate#1 push_object:crate#1

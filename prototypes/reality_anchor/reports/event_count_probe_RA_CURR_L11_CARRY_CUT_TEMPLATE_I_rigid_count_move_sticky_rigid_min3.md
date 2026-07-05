# Event Count Probe: RA_CURR_L11_CARRY_CUT_TEMPLATE_I_rigid_count

- Event pattern: move_sticky_rigid
- Required minimum count: 3
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

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 59625
- Matched count: 2
- Depth: 40
- Inputs: up left up up up right right right down down right right down right up right up left left up left down left down right up up left left left down up right right down right right right down left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk push_object:crate#1

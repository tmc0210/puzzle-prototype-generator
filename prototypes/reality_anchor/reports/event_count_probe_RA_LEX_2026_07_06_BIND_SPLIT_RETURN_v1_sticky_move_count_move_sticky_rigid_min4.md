# Event Count Probe: RA_LEX_2026_07_06_BIND_SPLIT_RETURN_v1_sticky_move_count

- Event pattern: move_sticky_rigid
- Required minimum count: 4
- Budget: maxStates=500000, maxDepth=120

## Layout

```text
##########
#........#
#B#C...G.#
#S#..G...#
##.M.....#
#..@.....#
##########
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 18707
- Matched count: 3
- Depth: 24
- Inputs: right up up up up left down right down down down left left up right right down right up left up up right right
- Events: walk walk walk walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:crate#1

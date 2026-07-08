# Event At-Least Probe: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_two_bs_shifts

- Event pattern: anchor_boundary_shift:box_sticky
- Required minimum count: 2
- Budget: maxStates=500000, maxDepth=200

## Layout

```text
###########
#.PLBS..###
#@.###...##
#...#MMmG.#
#....G###.#
#.........#
###########
```

## Winning Count Probe

- Found win at or above count: true
- Status: found
- Explored states: 329
- Matched count: 2
- Depth: 31
- Inputs: up right down down down right right right down right right right right up up left right down down left left left left left left up up left up up right
- Events: walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk pull_object:crate#1 walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

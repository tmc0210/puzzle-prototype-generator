# Event At-Least First-Win Probe: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_two_bs_shifts_first_win

- Event pattern: anchor_boundary_shift:box_sticky
- Required minimum count before first win: 2
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

## First-Win Count Probe

- Found first-win path at or above count: true
- Status: found
- Explored states: 386
- Matched count: 2
- Depth: 39
- Inputs: up right down down down down right right right right right right right up up left right down down left left left left up left left up left up up right left down down down right right right down
- Events: walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk pull_object:crate#1

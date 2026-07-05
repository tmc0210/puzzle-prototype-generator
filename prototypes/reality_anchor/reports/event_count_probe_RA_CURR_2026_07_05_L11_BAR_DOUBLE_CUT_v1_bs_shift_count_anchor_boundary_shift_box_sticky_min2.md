# Event Count Probe: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v1_bs_shift_count

- Event pattern: anchor_boundary_shift:box_sticky
- Required minimum count: 2
- Budget: maxStates=500000, maxDepth=120

## Layout

```text
############
#.......##.#
#....@C.MM.#
#..##....G##
#..##...G###
#.....BS...#
############
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 10268
- Matched count: 1
- Depth: 18
- Inputs: right up right down left down down left down right up up up right down left down right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1

# Event Order Probe: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v2_no_cut_before_rigid

- Early pattern: sticky_to_box
- Must be preceded by: move_sticky_rigid
- Budget: maxStates=500000, maxDepth=120

## Layout

```text
############
#......G##.#
#....@C.MM.#
#..##....G##
#..##...G###
#.....BS...#
############
```

## Order Violation Winning Probe

- Found violation win: true
- Status: found
- Explored states: 55809
- Depth: 40
- Inputs: down down right right right down left up up left left up left left left down down down right right right up up up right up right down left down down left down right right up up up right down
- Events: walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 push_object:crate#1 walk push_object:crate#2

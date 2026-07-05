# Event Order Probe: RA_SCRATCH_RESIDUE_MOVE_A_no_bs_before_merge

- Early pattern: anchor_boundary_shift:box_sticky
- Must be preceded by: sticky_merge
- Budget: maxStates=500000, maxDepth=120

## Layout

```text
############
#......G##.#
#....@C.MM.#
#..##.....##
#..##...GG##
#####.BS...#
############
```

## Order Violation Winning Probe

- Found violation win: true
- Status: found
- Explored states: 139666
- Depth: 30
- Inputs: down down down right up right right right down left up up left left left up right up right down down left down left down right right up up up
- Events: walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#1 push_object:crate#1 push_object:crate#1

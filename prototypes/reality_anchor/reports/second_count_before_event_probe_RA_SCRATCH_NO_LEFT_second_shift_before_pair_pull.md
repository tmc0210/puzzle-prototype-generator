# Second Count Before Event Probe: RA_SCRATCH_NO_LEFT_second_shift_before_pair_pull

- Counted pattern: anchor_boundary_shift:box_sticky
- Required before second count: pull_object:sticky#1
- Budget: maxStates=500000, maxDepth=200

## Layout

```text
###########
#.PLBS..###
#@.###...##
#...#MMMG.#
#....G###.#
#.........#
###########
```

## Violation Winning Probe

- Found winning violation: true
- Status: found
- Explored states: 175
- Depth: 19
- Inputs: up right right left down down down right right right down right right right right up up left right
- Events: walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk pull_object:crate#1 walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid

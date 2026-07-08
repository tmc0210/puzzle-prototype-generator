# Event Count Probe: RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_sticky_pull_min3

- Event pattern: pull_object:sticky
- Required minimum count: 3
- Budget: maxStates=300000, maxDepth=60

## Layout

```text
############
#PL##...####
#####G#G####
#####MMM...#
####BS@.#..#
####.....#.#
########...#
############
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 54
- Matched count: 0
- Depth: 18
- Inputs: right down right down right right up up up left left left up up left left down up
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:crate#1

# Event Count Probe: RA_CURR_L11_APP_SCRATCHC_no_lower_goal_crate1_push_count3

- Event pattern: push_object:crate#1
- Required minimum count: 3
- Budget: maxStates=300000, maxDepth=80

## Layout

```text
#########
##....###
##.BS#G.#
##.C.MM.#
#.@#...##
#########
#########
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 163
- Matched count: 2
- Depth: 13
- Inputs: up right up left up right down right down right down right up
- Events: walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

# Event Count Probe: RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_crate1_push_count

- Event pattern: push_object:crate#1
- Required minimum count: 1
- Budget: maxStates=400000, maxDepth=120

## Layout

```text
###########
###########
###..######
###.CCC####
###...G####
#...G.#####
#.....BS@##
###########
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 1939
- Matched count: 0
- Depth: 28
- Inputs: left left left up up left left up up right down left down down left down right right up right up down left left up up right down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#2 walk walk walk walk walk walk push_object:crate#2

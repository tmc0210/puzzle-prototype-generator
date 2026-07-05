# Event Count Probe: RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v1_sticky_merge_count

- Event pattern: sticky_merge
- Required minimum count: 2
- Budget: maxStates=400000, maxDepth=120

## Layout

```text
###########
###########
###@.######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 14114
- Matched count: 1
- Depth: 32
- Inputs: right down left down right down right right right right down left left up up left down left left down right up left up up up right down left down right right
- Events: walk push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#2 push_object:crate#2 box_to_sticky:n1

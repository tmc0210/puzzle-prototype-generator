# L11 Hard Probe: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_REMOVE_Y3X8_TMP_HARD

- Budget: maxStates=1000000, maxDepth=none
- Required: anchor_boundary_shift:box_sticky, box_to_sticky, sticky_merge, sticky_to_box, move_sticky_rigid, push_object:crate, post_sticky_to_box_push_object:crate

## Layout

```text
############
#......@##.#
#.....C.MM.#
#..##....G##
#..##..G####
#.....BS...#
############
```

## Shortest Solver Path

- Found: true
- Cost: 18
- Depth: 18
- Explored states: 4787
- Inputs: left left down right up right down left down down left down right up up up right down
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1

### Event Steps

- 4. right: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1
- 7. down: push_object:sticky#1 move_sticky_rigid
- 13. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
- 18. down: push_object:crate#1

## Hard Probe

- Found bypass: false
- Status: complete
- Explored states: 26154
- Reason: no winning bypass found

# Event Count Probe: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_upper_cut_count

- Event pattern: sticky_to_box
- Required minimum count: 2
- Budget: maxStates=500000, maxDepth=120

## Layout

```text
############
#.......##.#
#....@C.MM.#
#..##.....##
#..##...G###
#.....BS...#
############
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 385
- Matched count: 0
- Depth: 8
- Inputs: up right down down left down right right
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid

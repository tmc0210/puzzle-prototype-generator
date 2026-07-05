# Event Count Probe: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_lower_cut_count

- Event pattern: sticky_to_box
- Required minimum count: 2
- Budget: maxStates=500000, maxDepth=120

## Layout

```text
############
#......G##.#
#....@C.MM.#
#..##.....##
#..##....###
#.....BS...#
############
```

## Bypass Probe

- Found bypass below count: true
- Status: found
- Explored states: 212
- Matched count: 0
- Depth: 6
- Inputs: down right up left up right
- Events: walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1

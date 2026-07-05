# Event Order Probe: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_no_bs_before_merge

- Early pattern: anchor_boundary_shift:box_sticky
- Must be preceded by: sticky_merge
- Budget: maxStates=500000, maxDepth=120

## Layout

```text
############
#......@##.#
#.....C.MM.#
#..##...GG##
#..##..G####
#.....BS...#
############
```

## Order Violation Winning Probe

- Found violation win: false
- Status: complete
- Explored states: 15473
- Reason: no winning order violation found

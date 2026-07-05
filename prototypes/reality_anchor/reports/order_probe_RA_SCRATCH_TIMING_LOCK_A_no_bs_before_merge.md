# Event Order Probe: RA_SCRATCH_TIMING_LOCK_A_no_bs_before_merge

- Early pattern: anchor_boundary_shift:box_sticky
- Must be preceded by: sticky_merge
- Budget: maxStates=300000, maxDepth=120

## Layout

```text
############
#......G##.#
#....@C.MM.#
#..##.....##
#..##...G###
#####.BS...#
############
```

## Order Violation Winning Probe

- Found violation win: false
- Status: complete
- Explored states: 24981
- Reason: no winning order violation found

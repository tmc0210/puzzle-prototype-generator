# Event Order Probe: RA_CURR_L11_APP_SCRATCHC_bs_after_merge_order

- Early pattern: anchor_boundary_shift:box_sticky
- Must be preceded by: sticky_merge
- Budget: maxStates=300000, maxDepth=80

## Layout

```text
#########
##....###
##.BS#G.#
##.C.MM.#
#.@#...##
####G####
#########
```

## Order Violation Winning Probe

- Found violation win: false
- Status: complete
- Explored states: 284
- Reason: no winning order violation found

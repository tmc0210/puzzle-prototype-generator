# Event Order Probe: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_bind_before_merge

- Early pattern: box_to_sticky
- Must be preceded by: sticky_merge
- Budget: maxStates=500000, maxDepth=120

## Layout

```text
########
#PLB.C.#
#@MS..G#
#.G..#.#
#M....##
########
```

## Order Violation Winning Probe

- Found violation win: false
- Status: complete
- Explored states: 528
- Reason: no winning order violation found

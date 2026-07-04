# Event Probe: RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v1

- Budget: maxStates=300000, maxDepth=40
- Required groups: material_normalization, sticky_merge, sticky_rigid_move

## Layout

```text
##########
#........#
#.#.G.#@.#
#...MC...#
#...#....#
#...SB...#
##########
```

## Combined Probe

- Found bypass: false
- Status: exhausted
- Explored states: 300001
- Reason: state budget exceeded (300000)

## Individual Probes

### material_normalization

- Found bypass: false
- Status: exhausted
- Explored states: 160944
- Reason: depth budget exceeded (40)

### sticky_merge

- Found bypass: false
- Status: exhausted
- Explored states: 222139
- Reason: depth budget exceeded (40)

### sticky_rigid_move

- Found bypass: false
- Status: exhausted
- Explored states: 185858
- Reason: depth budget exceeded (40)

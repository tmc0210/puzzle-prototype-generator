# Target Vacate Probe: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2_lower_target_vacate

- Target: 5,3
- Initial covered: false
- Required pattern: covered -> uncovered -> covered before win
- Budget: maxStates=300000, maxDepth=80

## Layout

```text
#########
##PL#..##
###..G.##
#.@CCG..#
#########
```

## Result

- Found bypass: false
- Status: complete
- Explored states: 24
- Reason: no winning bypass found

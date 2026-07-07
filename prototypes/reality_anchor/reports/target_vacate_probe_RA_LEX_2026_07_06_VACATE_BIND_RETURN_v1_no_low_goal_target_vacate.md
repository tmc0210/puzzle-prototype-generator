# Target Vacate Probe: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_low_goal_target_vacate

- Target: 3,1
- Initial covered: false
- Required pattern: covered -> uncovered -> covered before win
- Budget: maxStates=1000000, maxDepth=160

## Layout

```text
#########
##MG.M@.#
#.M.M..M#
#BSLP#.##
#....#..#
#########
```

## Result

- Found bypass: true
- Status: found
- Explored states: 13
- Depth: 2
- Final phase: 1
- Inputs: left left
- Events: push_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1

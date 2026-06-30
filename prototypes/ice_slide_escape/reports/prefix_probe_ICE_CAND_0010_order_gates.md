# Prefix Probe: ICE_CAND_0010 Group Assembly Gates

Prototype: ice_slide_escape  
Candidate: ICE_CAND_0010  
Date: 2026-06-29  
Purpose: test whether d3, d4, and d5 are all consumed by the final d6 group-destruction commitment.

## Layout

```text
###............
###I.#########.
###..#########.
###..#########.
###..#########.
###.I##.######.
###..##.######.
####.##.######.
#G#..##I.....I@
...#...........
...####........
##############.
##############.
##############.
##############.
```

- player_start: [14,8]
- player_goal: [0,9]
- solver budget: maxStates=200000, maxDepth=240

## Probe Results

| Probe | Intent | Prefix result | Continuation |
| --- | --- | --- | --- |
| P1_immediate_final | Push the final ice at the start before assembling the group. | Legal; triggers pass-through d5 against the unprepared group. | No solution; complete search, explored=1020. |
| P2_d3_then_final_missing_d4_d5 | Remove the d3 front ice, then push final without d4/d5 group members. | Legal; final push destroys only len2 and stops wrong. | No solution; complete search, explored=542. |
| P3_d3_d4_then_final_missing_d5 | Remove d3 and place the d4 group member, but omit d5. | Legal; final push destroys len3 and stops wrong. | No solution; complete search, explored=137. |
| P4_d3_d5_then_final_missing_d4 | Remove d3 and place the d5 group member, but omit d4. | Legal; final push destroys len2 and collides with the d5 member incorrectly. | No solution; complete search, explored=473. |
| P5_d4_d5_then_final_missing_d3 | Place d4/d5 group members but leave the d3 front ice. | Legal; final push resolves as d5 pass-through over the still-blocking group. | No solution; complete search, explored=386. |
| P6_all_setup | Complete d3, d4, and d5 setup before final. | Legal; prefix has d3, d4, d5, restart, and short-stop evidence. | Solution found; remaining solution is final d6 plus route to edge goal. |

## Interpretation Boundary

- The final commitment only works when all three setup state changes are present:
  - d3 removes the front ice at [7,8], changing final collision from d5 pass-through to d6 group destruction.
  - d4 places an ice at [4,8], extending the group that final d6 must destroy.
  - d5 places an ice at [3,8], extending the same group.
- If any one of those state changes is missing, the final push is legal but complete continuation search finds no win.
- This report supports the group-assembly claim. It does not by itself prove final-game taste quality or object-level all-solution identity.

## Evidence Notes

- Intended final group, pushed from right to left: `[6,8]`, `[5,8]`, `[4,8]`, `[3,8]`, `[2,8]`.
- `[6,8]`, `[5,8]`, and `[2,8]` are fixed walls; `[4,8]` is created by d4 and `[3,8]` is created by d5.
- Destroying the len5 group both lets the final ice short-stop onto target [1,8] and opens the corridor from the right side to edge goal [0,9].
- Leaving [7,8] in place makes the same final-looking push resolve as d5 pass-through, so the target can be covered in the wrong topology but the corridor remains blocked.

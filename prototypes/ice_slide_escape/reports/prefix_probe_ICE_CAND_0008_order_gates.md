# Prefix Probe: ICE_CAND_0008 Order Gates

Prototype: ice_slide_escape  
Candidate: ICE_CAND_0008  
Date: 2026-06-29  
Purpose: test whether wrong mechanism orders remain solvable after an explicit prefix.

## Layout

```text
##############
##############
.I......##.G##
@.....I..G.G##
#####.########
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####I##
#####.........
```

- player_start: [0,3]
- player_goal: [13,11]
- solver budget: maxStates=200000, maxDepth=220

## Probe Results

| Probe | Intent | Prefix result | Continuation |
| --- | --- | --- | --- |
| P1_d5_before_d6 | Push bottom vertical ice before the d6 product/route exists. | Legal prefix; triggers push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2. | No solution; complete search, explored=255. |
| P2_d4_before_d6_d5 | Push middle horizontal ice before the d5-created obstacle exists. | Legal prefix; triggers push_ice, ice_pass_through_d5:len2, ice_boundary_disappear_after_group. | No solution; complete search, explored=287. |
| P3_d6_then_d4_before_d5 | Complete d6 first, then skip d5 and push the middle ice. | Legal prefix; d6 succeeds, then middle ice triggers pass-through and boundary disappearance instead of intended rebound. | No solution; complete search, explored=83. |
| P4_first_d6_only | Do only the first d6 commitment. | Legal prefix; triggers push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_stop_short:d2. | Solution found; remaining events include d5, d1 stop, and d4. |
| P5_d6_then_d5 | Do d6 and d5 commitments. | Legal prefix; triggers d6, d5, two restarts, d2/d1 short stops, and one ice obstacle block. | Solution found; remaining events include one d4 rebound. |

## Interpretation Boundary

- P1/P2/P3 are order falsification probes: they show that three natural wrong orders are terminal under complete continuation search.
- P4/P5 are positive continuation probes: they show the intended prefix still leaves the expected later responsibilities.
- This report supports a mechanism-order claim only when combined with full solver/graph evidence. It does not by itself prove player-facing difficulty or taste fit.

## Evidence Notes

- P1 consumes the target at [11,2] with the wrong ice before d6 can create the intended route/product; continuation is complete-no-solution.
- P2 removes the middle ice via d5/boundary behavior before a later d4 rebound can cover [9,3]; continuation is complete-no-solution.
- P3 proves that even after d6 has created [11,2], skipping the d5-created [11,3] obstacle makes the middle ice leave the puzzle; continuation is complete-no-solution.
- P4/P5 show that d6 is not a terminal trap and that d6+d5 leaves the intended final d4 responsibility.

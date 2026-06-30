# Prefix Probe: ICE_CAND_0009 Order Gates

Prototype: ice_slide_escape  
Candidate: ICE_CAND_0009  
Date: 2026-06-29  
Purpose: test the cross-coupled d5/d6 temporary-group claim and route-gate responsibilities.

## Layout

```text
###############
#.#############
#G#########G###
#.##########...
#..I.....##.###
#I..###########
@.#.###########
#.#.#######.###
#...I...###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######I###
####........###
```

- player_start: [0,6]
- player_goal: [14,3]
- solver budget: maxStates=200000, maxDepth=220

## Probe Results

| Probe | Intent | Prefix result | Continuation |
| --- | --- | --- | --- |
| P1_d4_only | Do only the d4 gate/target placement. | Legal; triggers push_ice, ice_rebound_d4. | Solution found; remaining solution uses d5, d3, d6, restart, and short stop. |
| P2_d4_then_d3_before_d5 | After d4, clear the d3 shaft before the d5 temporary ice. | Legal; triggers d4 and ice_destroyed_d3. | Solution found; d3 and d5 are partly commutable before final d6. |
| P3_d4_then_d3_then_d6_without_d5 | Clear the shaft and execute d6 before the d5 temporary ice exists. | Legal; d6 destroys only len2 fixed wall group and stops at the wrong lower cell. | No solution; complete search, explored=174. |
| P4_d4_then_d5_only | Do d4 and d5, leaving d3 and d6 unresolved. | Legal; d5 places the temporary ice at [11,4]. | Solution found; remaining solution uses d3 and d6. |
| P5_d4_then_d5_then_d3 | Do d4, d5, and d3. | Legal; all setup commitments are complete. | Solution found; remaining solution is final d6 plus route to edge goal. |

## Interpretation Boundary

- P3 is the critical falsification probe: without the d5-created ice at [11,4], final d6 does not destroy the len4 group and cannot cover [11,2] or open the same top route.
- P2/P4/P5 show route-order flexibility. d3 route clearing can happen before or after d5, but d5 must precede the final d6 commitment.
- This report supports the temporary-group / state-consumption claim. It does not by itself prove final-game taste quality.

## Evidence Notes

- In the intended sequence, d5 creates an ice at [11,4]. Final d6 then destroys the group [11,6], [11,5], [11,4], [11,3], where [11,4] is the temporary ice and [11,3] is the exit wall.
- If d6 is attempted before [11,4] exists, it destroys only [11,6] and [11,5], stops at [11,4], and complete continuation search finds no win.
- d4's state change is consumed twice: it covers [1,2] and clears the left gate needed to reach the d5/d3 work area.
- d3's state change is route consumption: the removed ice clears the shaft required to reach the bottom d6 push position.

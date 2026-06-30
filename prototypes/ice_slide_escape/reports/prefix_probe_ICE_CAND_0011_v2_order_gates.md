# Prefix Probe: ICE_CAND_0011 v2 Temporary Stopper Lifecycle

Prototype: ice_slide_escape  
Candidate: ICE_CAND_0011_v2  
Date: 2026-06-30  
Purpose: test whether the compact goal-gate revision preserves the d4-created
temporary stopper order gate.

## Layout

```text
############
############
############
############
############
############
############
##########G#
#.I.....#G..
#..........#
#..........#
#.........I#
#..........#
#..........#
#..........#
#.........I#
##########@#
```

- player_start: [10,16]
- player_goal: [11,8]
- solver budget: maxStates=200000, maxDepth=160

## Probe Results

| Probe | Intent | Prefix result | Continuation |
| --- | --- | --- | --- |
| P1_d3_then_B_before_A | After the forced d3 opening, push the left ice before creating the d4 stopper. | Legal; the left ice passes through the wall and disappears at the far boundary. | No solution; complete search, explored=323. |
| P2_d3_A_then_move_stopper_before_B | Create the d4 stopper, then immediately push it upward onto the upper target before using it as the d5 stopper. | Legal; the upper target is covered early, but the lower target can no longer be covered. | No solution; complete search, explored=241. |
| P3_d3_A_B_setup_state | Do the forced d3 opening, create the d4 stopper, then use it as the d5 stopper for the left ice. | Legal; d5/restart stops the left ice on the lower target. | Solution found; remaining solution moves the same stopper ice upward and reaches the edge goal. |
| P4_d3_A_B_then_move_stopper | After P3, push the same d4-created stopper upward. | Legal; the stopper becomes upper target coverage and directly releases the compact edge goal route. | Solution found; only one walk remains. |

## Interpretation Boundary

- v2 preserves the central lifecycle: [10,8] is first a d5/restart stopper, then
  target coverage at [10,7], and moving it opens direct access to [11,8].
- Compared with v1, the edge-goal tail is reduced from seven walks to one walk.
  The edge goal is therefore more directly coupled to the stopper's final move.
- P2 remains the key wrong-order probe: the locally tempting target cover
  consumes the stopper too early.
- The d3 opener is required for the declared start but remains support, not a
  deep central mechanism.

## Evidence Notes

- P1 prefix inputs:
  `up left left left left left left left left left up up up up up up up right`
- P2 prefix inputs:
  `up up up up up up up up`
- P3 prefix inputs:
  `up up up up up up up left left left left left left left left left up right`
- P4 prefix inputs:
  `up up up up up up up left left left left left left left left left up right down right right right right right right right right up`

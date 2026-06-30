# Prefix Probe: ICE_CAND_0011 Temporary Stopper Lifecycle

Prototype: ice_slide_escape  
Candidate: ICE_CAND_0011  
Date: 2026-06-30  
Purpose: test whether the d4-created temporary stopper must be consumed by d5
before it is moved onto the upper target.

## Layout

```text
##################
##################
##################
##################
##################
##################
##################
##########G#######
#.I.....#G........
#..........#######
#..........#######
#.........I#######
#..........#######
#..........#######
#..........#######
#.........I#######
##########@#######
```

- player_start: [10,16]
- player_goal: [17,8]
- solver budget: maxStates=200000, maxDepth=160

## Probe Results

| Probe | Intent | Prefix result | Continuation |
| --- | --- | --- | --- |
| P1_d3_then_B_before_A | After the forced d3 opening, push the left ice before creating the d4 stopper. | Legal; the left ice passes through the wall and disappears at the far boundary instead of stopping on target. | No solution; complete search, explored=341. |
| P2_d3_A_then_move_stopper_before_B | Create the d4 stopper, then immediately push it upward onto the upper target before using it as a stopper. | Legal; the upper target is covered early. | No solution; complete search, explored=173. |
| P3_d3_A_B_setup_state | Do the forced d3 opening, create the d4 stopper, then use it as the d5 stopper for the left ice. | Legal; d5/restart stops the left ice on the lower target. | Solution found; remaining solution moves the same stopper ice upward and walks to the edge goal. |
| P4_d3_A_B_then_move_stopper | After P3, push the same d4-created stopper upward. | Legal; the stopper becomes upper target coverage and opens the corridor to the explicit edge goal. | Solution found; only route-to-goal walk remains. |

## Interpretation Boundary

- The d4-created ice at [10,8] has a lifecycle rather than a single target role:
  first it is a stopper for the d5/restart left-ice push, then it is moved to
  cover the upper target at [10,7], and moving it opens the route to [17,8].
- P2 is the key wrong-order probe: covering the upper target early looks locally
  plausible, but it consumes the stopper before the d5 target placement can use
  it.
- The opening d3 removal is required for the declared start instance, but its
  role is route access. This report does not claim d3 as a deep central
  mechanism.
- The report supports order pressure around the d4-created stopper lifecycle.
  It does not by itself prove final-game taste quality.

## Evidence Notes

- P1 prefix inputs:
  `up left left left left left left left left left up up up up up up up right`
- P2 prefix inputs:
  `up up up up up up up up`
- P3 prefix inputs:
  `up up up up up up up left left left left left left left left left up right`
- P4 prefix inputs:
  `up up up up up up up left left left left left left left left left up right down right right right right right right right right up`

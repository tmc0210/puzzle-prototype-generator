# Prefix Probe: ICE_CAND_0011 v3 Double Consumption Gates

Prototype: ice_slide_escape  
Candidate: ICE_CAND_0011_v3  
Date: 2026-06-30  
Purpose: test whether the added third ice creates a second consumed-state
obligation rather than padding.

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
#........G.#
#.........I#
#..........#
#........I.#
#..........#
#.........I#
##########@#
```

- player_start: [10,16]
- player_goal: [11,8]
- solver budget: maxStates=300000, maxDepth=200

## Probe Results

| Probe | Intent | Prefix result | Continuation |
| --- | --- | --- | --- |
| P1_d3_then_left_before_A | Push the left ice before creating the [10,8] stopper. | Legal; the left ice d5s through the wall and disappears at the far boundary. | No solution; complete search, explored=2975. |
| P2_d3_A_then_final_before_B_C | Create [10,8], then immediately push it upward onto [10,7]. | Legal; the upper target is covered and the edge-goal route is open, but the lower stopper role is consumed too early. | No solution; complete search, explored=1678. |
| P3_d3_A_then_C_before_B | Try the third ice before [9,8] exists. | Legal; the third ice resolves as d5/boundary disappearance rather than d4 rebound. | No solution; complete search, explored=799. |
| P4_d3_A_B_then_final_before_C | After A+B, push [10,8] upward before using [9,8] as the third-ice stopper. | Legal; upper target and edge route are prepared. | Solution found; C can still be done afterward, so final-up and C are order-flexible after B. |
| P5_d3_A_B_C | Do A+B+C, where C uses [9,8] as rebound obstacle and covers [9,10]. | Legal; all target obligations except [10,7] are complete. | Solution found; remaining solution moves [10,8] upward and reaches the edge goal. |
| P6_full | Solver-returned full sequence. | Legal; covers all three targets and reaches [11,8]. | Already winning after prefix. |

## Interpretation Boundary

- The strict order obligation is a partial order, not a total order:
  - A: d4 creates [10,8].
  - B depends on A: left ice d5/restart uses [10,8] to stop on [9,8].
  - C depends on B: third ice uses [9,8] as a d4 rebound obstacle to cover [9,10].
  - Final-up depends on A and must happen after B if [10,8] is still needed as
    a lower stopper; after B, final-up and C can commute.
- The added third ice is not merely an extra target chore. P3 shows it fails
  before [9,8] exists; P5 shows it succeeds after [9,8] exists.
- P4 prevents overclaiming: v3 has meaningful order flexibility after B. The
  design claim must not say the entire solution is a fixed total order.

## Evidence Notes

- P1 prefix inputs:
  `up left left left left left left left left left up up up up up up up right`
- P2 prefix inputs:
  `up up up up up up up up`
- P3 prefix inputs:
  `up up up up up up up down down down down down left up`
- P4 prefix inputs:
  `up up up up up up up left left left left left left left left left up right down right right right right right right right right up`
- P5 prefix inputs:
  `up up up up up up up left left left left left left left left left up right down down down down down down right right right right right right right up`
- P6 prefix inputs:
  `up up up up up up up left left left left left left left left left up right down down down down down down right right right right right right right up up up right up up up right`

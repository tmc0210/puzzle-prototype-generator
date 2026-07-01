# Level Analysis: ICE_EXP_META_2026_07_02_round24_v1_verticalD_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round24_v1_verticalD_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
#....#......IG.
###########.#I#
#.............#
############..#
############.##
############.##
############I.#
############..@
############.##
############.##
############.##
############.##
############.##
###############
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 178
- Inputs: left left up up up up right up up down left left left left left left left left left left left left left
- Events: walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk walk push_ice ice_stop_short:d1 walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=19, push_ice=4, ice_rebound_d4=1, ice_stop_short:d1=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###############
#....#......IG.
###########.#I#
#.............#
############..#
############.##
############.##
############I.#
############@..
############.##
############.##
############.##
############.##
############.##
###############
```

After:

```text
###############
#....#......IG.
###########.#I#
#.............#
############I.#
############.##
############.##
############@.#
############...
############.##
############.##
############.##
############.##
############.##
###############
```

### Step 6: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
###############
#....#......IG.
###########.#I#
#.............#
############I.#
############@##
############.##
############..#
############...
############.##
############.##
############.##
############.##
############.##
###############
```

After:

```text
###############
#....#......IG.
###########.#I#
#...........I.#
############@.#
############.##
############.##
############..#
############...
############.##
############.##
############.##
############.##
############.##
###############
```

### Step 9: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
###############
#....#......IG.
###########.#I#
#...........I@#
############..#
############.##
############.##
############..#
############...
############.##
############.##
############.##
############.##
############.##
###############
```

After:

```text
###############
#....#......I*.
###########.#@#
#...........I.#
############..#
############.##
############.##
############..#
############...
############.##
############.##
############.##
############.##
############.##
###############
```

### Step 11: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
###############
#....#......I*.
###########.#.#
#...........I@#
############..#
############.##
############.##
############..#
############...
############.##
############.##
############.##
############.##
############.##
###############
```

After:

```text
###############
#....#......I*.
###########.#.#
............@.#
############..#
############.##
############.##
############..#
############...
############.##
############.##
############.##
############.##
############.##
###############
```


## Graph Facts

- Status: complete
- Reachable states: 275
- Legal transitions: 572
- Event-only illegal transitions: 9
- Winning states: 2
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 275
- Legal transitions: 572
- Budget: maxStates=100000
- Compressed regions: 10
- Bidirectional transitions: 562
- Commitment transitions: 10
- Winning regions: 2
- Initial region: r0, states=9, dist=4, internalBidirectional=16, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@3 -> r2@6 -> r3@9 -> r5@11
- Forced commitment prefix length: 2
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=10, edges=10, winReachable=8, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=2, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=9, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@3 -> s2@6 -> s8@9 -> s9@11

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 9 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 3 | 3 | 12 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 6 | 2 | 15 | 2 | 2 | 0 | 1 | 1 | s8 | no |
| s8 | 9 | 1 | 16 | 1 | 1 | 0 | 1 | 1 | s9 | yes |
| s9 | 11 | 0 | 36 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 9 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 3 | 6 | s2 | 12 | no | yes | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s2 | 6 | 9 | s8 | 15 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s8 | 9 | 11 | s9 | 16 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=275, regions=10, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=2/4, forced viable commitments=3/4
- Endgame tail: 12 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; 12 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 5 | r1 | r2 | 3 | 1 | 0 | 1 | forced optimal |
| 8 | r2 | r3 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 10 | r3 | r5 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 9 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 3 | 3 | 12 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 6 | 2 | 15 | 2 | 2 | 0 | 2 | 2 | r3 | no | no | no |
| r3 | 9 | 1 | 16 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 11 | 0 | 36 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 3 | up | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 4 | up | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 6 | up | r2 | yes | 2 | 2 | 2 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 7 | right | r2 | no | 2 | 2 | 2 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r2 | no | 2 | 2 | 2 | 0 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 9 | up | r3 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 10 | down | r3 | no | 1 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 11 | left | r5 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 12 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

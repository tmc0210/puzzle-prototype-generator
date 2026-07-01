# Level Analysis: ICE_EXP_META_2026_07_02_round24_v1_verticalD_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round24_v1_verticalD_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
#....#......IG@
###########.#I#
#.............#
############..#
############.##
############.##
############I.#
############...
############.##
############.##
############.##
############.##
############.##
###############
```

## Shortest Solution

- Found: yes
- Cost: 21
- Depth: 21
- Explored states: 325
- Inputs: left left left down down right right up down down left down down down down down down down down down down
- Events: walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk
- Event counts: walk=18, push_ice=3, ice_destroy_group_d6_plus:len1=2, slide_restart_after_group=1, ice_rebound_d4=1, ice_stop_short:d1=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4

Before:

```text
###############
#....#......I+.
###########.#I#
#.............#
############..#
############.##
############.##
############I.#
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
#.I.........@G.
###########.#I#
#.............#
############..#
############.##
############.##
############I.#
############...
############.##
############.##
############.##
############.##
############.##
###############
```

### Step 8: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
###############
#.I..........G.
###########.#I#
#............@#
############..#
############.##
############.##
############I.#
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
#.I..........*.
###########.#@#
#.............#
############..#
############.##
############.##
############I.#
############...
############.##
############.##
############.##
############.##
############.##
###############
```

### Step 14: down

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
###############
#.I..........*.
###########.#.#
#.............#
############..#
############.##
############@##
############I.#
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
#.I..........*.
###########.#.#
#.............#
############..#
############.##
############.##
############@.#
############...
############.##
############.##
############.##
############.##
############.##
############.##
```


## Graph Facts

- Status: complete
- Reachable states: 706
- Legal transitions: 1470
- Event-only illegal transitions: 28
- Winning states: 2
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 706
- Legal transitions: 1470
- Budget: maxStates=100000
- Compressed regions: 21
- Bidirectional transitions: 1434
- Commitment transitions: 36
- Winning regions: 2
- Initial region: r0, states=2, dist=3, internalBidirectional=2, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@2 -> r6@8 -> r11@14
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=21, edges=36, winReachable=9, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=4, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2, dist=3, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@2 -> s3@8 -> s8@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 2 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 2 | 2 | 30 | 4 | 3 | 1 | 1 | 1 | s3 | no |
| s3 | 8 | 1 | 29 | 3 | 2 | 1 | 1 | 1 | s8 | no |
| s8 | 14 | 0 | 40 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 2 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4 | has_reposition_room |
| s1 | 2 | 8 | s3 | 30 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s3 | 8 | 14 | s8 | 29 | no | no | down | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=706, regions=21, solution commitments=3
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=1/3, forced viable commitments=1/3
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r2 | 3 | 1 | 1 | 1 | forced optimal |
| 7 | r2 | r6 | 2 | 3 | 1 | 2 | multiple optimal choices |
| 13 | r6 | r11 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 2 | 2 | 30 | 4 | 3 | 1 | 2 | 2 | r6 | no | no | no |
| r6 | 8 | 1 | 29 | 3 | 2 | 1 | 1 | 1 | r11 | no | no | yes |
| r11 | 14 | 0 | 40 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 2 | left | r2 | yes | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4 |
| 3 | left | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 8 | up | r6 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 9 | down | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r11 | yes | yes | yes | yes | no | yes | walk |
| 14 | down | r11 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 15 | down | r11 | no | 0 | 2 | 1 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r11 | no | 0 | 2 | 1 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r11 | no | 0 | 2 | 1 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r11 | no | 0 | 2 | 1 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r11 | no | 0 | 2 | 1 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r11 | no | 0 | 2 | 1 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r11 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

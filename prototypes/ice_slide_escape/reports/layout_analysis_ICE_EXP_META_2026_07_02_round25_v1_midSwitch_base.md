# Level Analysis: ICE_EXP_META_2026_07_02_round25_v1_midSwitch_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round25_v1_midSwitch_base
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
#######..###..#
#######.####.##
#######.####.##
######.I#######
@.............#
###############
```

## Shortest Solution

- Found: yes
- Cost: 33
- Depth: 33
- Explored states: 352
- Inputs: right right right right right right right up up up up right up right right right right right up down left left left left left left left left left left left left left
- Events: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk
- Event counts: walk=29, push_ice=4, ice_rebound_d4=1, ice_stop_short:d1=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###############
#....#......IG.
###########.#I#
#.............#
#######..###..#
#######.####.##
#######.####.##
######.I#######
.......@......#
###############
```

After:

```text
###############
#....#......IG.
###########.#I#
#.............#
#######I.###..#
#######.####.##
#######.####.##
######.@#######
..............#
###############
```

### Step 11: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
###############
#....#......IG.
###########.#I#
#.............#
#######I.###..#
#######@####.##
#######.####.##
######..#######
..............#
###############
```

After:

```text
###############
#....#......IG.
###########.#I#
#......I......#
#######@.###..#
#######.####.##
#######.####.##
######..#######
..............#
###############
```

### Step 19: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
###############
#....#......IG.
###########.#I#
#......I.....@#
#######..###..#
#######.####.##
#######.####.##
######..#######
..............#
###############
```

After:

```text
###############
#....#......I*.
###########.#@#
#......I......#
#######..###..#
#######.####.##
#######.####.##
######..#######
..............#
###############
```

### Step 26: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
###############
#....#......I*.
###########.#.#
#......I@.....#
#######..###..#
#######.####.##
#######.####.##
######..#######
..............#
###############
```

After:

```text
###############
#....#......I*.
###########.#.#
.......@......#
#######..###..#
#######.####.##
#######.####.##
######..#######
..............#
###############
```


## Graph Facts

- Status: complete
- Reachable states: 551
- Legal transitions: 1158
- Event-only illegal transitions: 17
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 551
- Legal transitions: 1158
- Budget: maxStates=120000
- Compressed regions: 14
- Bidirectional transitions: 1140
- Commitment transitions: 18
- Winning regions: 2
- Initial region: r0, states=15, dist=4, internalBidirectional=28, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@8 -> r2@11 -> r5@19 -> r7@26
- Forced commitment prefix length: 2
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=14, edges=18, winReachable=10, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=15, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@8 -> s2@11 -> s3@19 -> s9@26

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 15 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 8 | 3 | 18 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 11 | 2 | 37 | 3 | 3 | 0 | 1 | 1 | s3 | no |
| s3 | 19 | 1 | 38 | 1 | 1 | 0 | 1 | 1 | s9 | yes |
| s9 | 26 | 0 | 46 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s1 | 15 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 8 | 11 | s2 | 18 | no | yes | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s2 | 11 | 19 | s3 | 37 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s3 | 19 | 26 | s9 | 38 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=551, regions=14, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=2/4, forced viable commitments=3/4
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 10 | r1 | r2 | 3 | 1 | 0 | 1 | forced optimal |
| 18 | r2 | r5 | 2 | 3 | 0 | 2 | multiple optimal choices |
| 25 | r5 | r7 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 15 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 8 | 3 | 18 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 11 | 2 | 37 | 3 | 3 | 0 | 2 | 2 | r5 | no | no | no |
| r5 | 19 | 1 | 38 | 1 | 1 | 0 | 1 | 1 | r7 | yes | yes | yes |
| r7 | 26 | 0 | 46 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 8 | up | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 9 | up | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 11 | up | r2 | yes | 2 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 12 | right | r2 | no | 2 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r2 | no | 2 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r2 | no | 2 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r2 | no | 2 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r2 | no | 2 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r2 | no | 2 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r2 | no | 2 | 3 | 3 | 0 | 2 | 2 | r5 | yes | yes | yes | yes | no | no | walk |
| 19 | up | r5 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 20 | down | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 26 | left | r7 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 27 | left | r7 | no | 0 | 0 | 0 | 0 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r7 | no | 0 | 0 | 0 | 0 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r7 | no | 0 | 0 | 0 | 0 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r7 | no | 0 | 0 | 0 | 0 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r7 | no | 0 | 0 | 0 | 0 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r7 | no | 0 | 0 | 0 | 0 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r7 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

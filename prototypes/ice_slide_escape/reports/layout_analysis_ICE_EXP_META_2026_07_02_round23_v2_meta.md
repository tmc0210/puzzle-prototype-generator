# Level Analysis: ICE_EXP_META_2026_07_02_round23_v2_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round23_v2_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
#....#.........IG@
#.............#.I#
#................#
#...........#....#
#...............##
#.............#I.#
#.............#...
##################
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 354
- Inputs: left left down down right up down down left down down right down right
- Events: walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_rebound_d4 walk walk walk push_ice ice_stop_short:d1 walk walk walk walk push_ice ice_stop_short:d1 walk walk walk
- Event counts: walk=11, push_ice=3, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_rebound_d4=1, ice_stop_short:d1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4

Before:

```text
##################
#....#.........I+.
#.............#.I#
#................#
#...........#....#
#...............##
#.............#I.#
#.............#...
##################
```

After:

```text
##################
#.I............@G.
#.............#.I#
#................#
#...........#....#
#...............##
#.............#I.#
#.............#...
##################
```

### Step 6: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##################
#.I.............G.
#.............#.I#
#...............@#
#...........#....#
#...............##
#.............#I.#
#.............#...
##################
```

After:

```text
##################
#.I.............*.
#.............#.@#
#................#
#...........#....#
#...............##
#.............#I.#
#.............#...
##################
```

### Step 11: down

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##################
#.I.............*.
#.............#..#
#................#
#...........#....#
#..............@##
#.............#I.#
#.............#...
##################
```

After:

```text
##################
#.I.............*.
#.............#..#
#................#
#...........#....#
#...............##
#.............#@.#
#.............#I..
##################
```


## Graph Facts

- Status: complete
- Reachable states: 2920
- Legal transitions: 10020
- Event-only illegal transitions: 86
- Winning states: 3
- Budget: maxStates=80000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2920
- Legal transitions: 10020
- Budget: maxStates=80000
- Compressed regions: 29
- Bidirectional transitions: 9966
- Commitment transitions: 54
- Winning regions: 3
- Initial region: r0, states=2, dist=3, internalBidirectional=2, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@2 -> r4@6 -> r10@11
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=29, edges=54, winReachable=13, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=5, mergingWinSccs=6
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2, dist=3, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@2 -> s2@6 -> s11@11

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 2 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 2 | 2 | 102 | 5 | 4 | 1 | 1 | 1 | s2 | no |
| s2 | 6 | 1 | 101 | 4 | 2 | 2 | 1 | 1 | s11 | no |
| s11 | 11 | 0 | 105 | 3 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 2 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4 | has_reposition_room |
| s1 | 2 | 6 | s2 | 102 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s2 | 6 | 11 | s11 | 101 | no | no | down | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2920, regions=29, solution commitments=3
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=1/3, forced viable commitments=1/3
- Endgame tail: 3 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; 3 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r2 | 3 | 1 | 1 | 1 | forced optimal |
| 5 | r2 | r4 | 2 | 4 | 1 | 2 | multiple optimal choices |
| 10 | r4 | r10 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 2 | 2 | 102 | 5 | 4 | 1 | 2 | 2 | r4 | no | no | no |
| r4 | 6 | 1 | 101 | 4 | 2 | 2 | 1 | 1 | r10 | no | no | yes |
| r10 | 11 | 0 | 105 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 2 | left | r2 | yes | 2 | 5 | 4 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_rebound_d4 |
| 3 | down | r2 | no | 2 | 5 | 4 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r2 | no | 2 | 5 | 4 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r2 | no | 2 | 5 | 4 | 1 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 6 | up | r4 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 7 | down | r4 | no | 1 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r4 | no | 1 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r4 | no | 1 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r4 | no | 1 | 4 | 2 | 2 | 1 | 1 | r10 | yes | yes | yes | yes | no | yes | walk |
| 11 | down | r10 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 12 | right | r10 | no | 0 | 3 | 1 | 2 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r10 | no | 0 | 3 | 1 | 2 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r10 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: ICE_EXP_META_2026_07_02_round23_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round23_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
#..............IG@
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
- Cost: 23
- Depth: 23
- Explored states: 1011
- Inputs: left left down down right up left up left left left left left left left left left left left left left left left
- Events: walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=21, push_ice=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
##################
#..............I+.
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
...............@G.
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
................G.
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
................*.
#.............#.@#
#................#
#...........#....#
#...............##
#.............#I.#
#.............#...
##################
```


## Graph Facts

- Status: complete
- Reachable states: 1268
- Legal transitions: 4344
- Event-only illegal transitions: 30
- Winning states: 2
- Budget: maxStates=80000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1268
- Legal transitions: 4344
- Budget: maxStates=80000
- Compressed regions: 13
- Bidirectional transitions: 4326
- Commitment transitions: 18
- Winning regions: 2
- Initial region: r0, states=2, dist=2, internalBidirectional=2, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@2 -> r4@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=13, edges=18, winReachable=5, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=1/2, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2, dist=2, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@2 -> s2@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 2 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 2 | 1 | 104 | 3 | 2 | 1 | 1 | 1 | s2 | no |
| s2 | 6 | 0 | 103 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 2 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |
| s1 | 2 | 6 | s2 | 104 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1268, regions=13, solution commitments=2
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 17 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 17 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r2 | 2 | 1 | 1 | 1 | forced optimal |
| 5 | r2 | r4 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 2 | 1 | 104 | 3 | 2 | 1 | 1 | 1 | r4 | no | no | yes |
| r4 | 6 | 0 | 103 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 2 | left | r2 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 3 | down | r2 | no | 1 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r2 | no | 1 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r2 | no | 1 | 3 | 2 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | walk |
| 6 | up | r4 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 7 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: ICE_CAND_0022_v1_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0022_v1_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#################
#################
..I.G*#.....I.I..
#.###..######.#.#
#.###I.######.#.#
#.###..######*I.#
#.###########.#.#
..###########...@
#################
```

## Shortest Solution

- Found: yes
- Cost: 51
- Depth: 51
- Explored states: 867
- Inputs: left left left up up up up up left right down down down down down right right up up left right up up up left left left left left left left left left down down down left up up right up right right right right right right right right right right
- Events: walk walk walk walk push_ice ice_destroyed_d3 walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=46, push_ice=5, ice_destroyed_d3=1, ice_pass_through_d5:len2=1, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=2, ice_stop_short:d2=2, ice_stop_short:d1=2, ice_destroy_group_d6_plus:len2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: up

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
#################
#################
..I.G*#.....I.I..
#.###..######.#.#
#.###I.######.#.#
#.###..######*I.#
#.###########@#.#
..###########....
#################
```

After:

```text
#################
#################
..I.G*#.....I.I..
#.###..######.#.#
#.###I.######.#.#
#.###..######+I.#
#.###########.#.#
..###########....
#################
```

### Step 9: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
#################
#################
..I.G*#.....I@I..
#.###..######.#.#
#.###I.######.#.#
#.###..######GI.#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..IIG*#.....@.I..
#.###..######.#.#
#.###I.######.#.#
#.###..######GI.#
#.###########.#.#
..###########....
#################
```

### Step 20: left

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
#################
#################
..IIG*#.......I..
#.###..######.#.#
#.###I.######.#.#
#.###..######GI@#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..IIG*#.......I..
#.###..######.#.#
#.###I.######.#.#
#.###..######*@.#
#.###########.#.#
..###########....
#################
```

### Step 25: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
#################
#################
..IIG*#.......I@.
#.###..######.#.#
#.###I.######.#.#
#.###..######*..#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..II*G........@..
#.###..######.#.#
#.###I.######.#.#
#.###..######*..#
#.###########.#.#
..###########....
#################
```

### Step 38: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#################
#################
..II*G...........
#.###..######.#.#
#.###I.######.#.#
#.###@.######*..#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..II**...........
#.###..######.#.#
#.###@.######.#.#
#.###..######*..#
#.###########.#.#
..###########....
#################
```


## Graph Facts

- Status: complete
- Reachable states: 1018
- Legal transitions: 2145
- Event-only illegal transitions: 92
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1018
- Legal transitions: 2145
- Budget: maxStates=100000
- Compressed regions: 49
- Bidirectional transitions: 2058
- Commitment transitions: 87
- Winning regions: 1
- Initial region: r0, states=11, dist=5, internalBidirectional=20, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r4@9 -> r23@20 -> r29@25 -> r41@38
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=49, edges=87, winReachable=8, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=2/5, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=11, dist=5, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@5 -> s15@9 -> s22@20 -> s34@25 -> s38@38

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 11 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 5 | 4 | 15 | 5 | 1 | 4 | 1 | 1 | s15 | yes |
| s15 | 9 | 3 | 21 | 4 | 2 | 2 | 1 | 1 | s22 | no |
| s22 | 20 | 2 | 12 | 2 | 1 | 1 | 1 | 1 | s34 | yes |
| s34 | 25 | 1 | 29 | 4 | 1 | 3 | 2 | 2 | s38 | yes |
| s38 | 38 | 0 | 29 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 11 | no | yes | up | push_ice, ice_destroyed_d3 | has_reposition_room |
| s1 | 5 | 9 | s15 | 15 | no | yes | left | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s15 | 9 | 20 | s22 | 21 | no | no | left | push_ice, ice_stop_short:d1 | has_reposition_room |
| s22 | 20 | 25 | s34 | 12 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s34 | 25 | 38 | s38 | 29 | no | yes | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1018, regions=49, solution commitments=5
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=2/5, optimal prefix=2/5, forced viable commitments=4/5
- Endgame tail: 13 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress; 13 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 5 | 1 | 1 | 1 | forced optimal |
| 8 | r1 | r4 | 4 | 1 | 4 | 1 | forced optimal |
| 19 | r4 | r23 | 3 | 2 | 2 | 2 | multiple optimal choices |
| 24 | r23 | r29 | 2 | 1 | 1 | 1 | forced optimal |
| 37 | r29 | r41 | 1 | 1 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 11 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 5 | 4 | 15 | 5 | 1 | 4 | 1 | 1 | r4 | no | yes | yes |
| r4 | 9 | 3 | 21 | 4 | 2 | 2 | 2 | 2 | r23 | no | no | no |
| r23 | 20 | 2 | 12 | 2 | 1 | 1 | 1 | 1 | r29 | no | yes | yes |
| r29 | 25 | 1 | 29 | 4 | 1 | 3 | 1 | 1 | r41 | no | yes | yes |
| r41 | 38 | 0 | 29 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 5 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 5 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 5 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 5 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | up | r1 | yes | 4 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 6 | up | r1 | no | 4 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r1 | no | 4 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 4 | 5 | 1 | 4 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 9 | left | r4 | yes | 3 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 10 | right | r4 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r4 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r4 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r4 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r4 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r4 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r4 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r4 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r4 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r4 | no | 3 | 4 | 2 | 2 | 2 | 2 | r23 | yes | yes | yes | yes | no | no | walk |
| 20 | left | r23 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r23 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 21 | right | r23 | no | 2 | 2 | 1 | 1 | 1 | 1 | r23 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r23 | no | 2 | 2 | 1 | 1 | 1 | 1 | r23 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r23 | no | 2 | 2 | 1 | 1 | 1 | 1 | r23 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r23 | no | 2 | 2 | 1 | 1 | 1 | 1 | r29 | yes | yes | yes | yes | yes | yes | walk |
| 25 | left | r29 | yes | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 26 | left | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | down | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | down | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | left | r29 | no | 1 | 4 | 1 | 3 | 1 | 1 | r41 | yes | yes | yes | yes | yes | yes | walk |
| 38 | up | r41 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 39 | up | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | up | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 49 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 50 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | r41 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | right | r41 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

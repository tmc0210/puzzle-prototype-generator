# Level Analysis: ICE_CAND_0013_v4_d3_gated

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0013_v4_d3_gated
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
.......##..#.
.I...I..#.GG#
.....#.######
.............
.............
.............
.............
.............
...........I.
.....@.......
```

## Shortest Solution

- Found: yes
- Cost: 37
- Depth: 37
- Explored states: 2284
- Inputs: right right right right right right up up up up up up left left left left left up up left up left left left left left down right right right right right right right right right up
- Events: walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- Event counts: walk=34, push_ice=3, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d1=1, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=1, ice_destroy_group_d6_plus:len1=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 7: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
.......##..#.
.I...I..#.GG#
.....#.######
.............
.............
.............
.............
.............
...........I.
...........@.
```

After:

```text
.......##..#.
.I...I..#.G*#
.....#.######
.............
.............
.............
.............
.............
...........@.
.............
```

### Step 20: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
.......##..#.
.I...I@.#.G*#
.....#.######
.............
.............
.............
.............
.............
.............
.............
```

After:

```text
.......##..#.
.I...@..#.G*#
.....#.######
.............
.............
.............
.............
.............
.............
.............
```

### Step 28: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
.......##..#.
@I......#.G*#
.....#.######
.............
.............
.............
.............
.............
.............
.............
```

After:

```text
.......##..#.
.@........**#
.....#.######
.............
.............
.............
.............
.............
.............
.............
```


## Graph Facts

- Status: complete
- Reachable states: 2568
- Legal transitions: 9054
- Event-only illegal transitions: 16
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2568
- Legal transitions: 9054
- Budget: maxStates=100000
- Compressed regions: 23
- Bidirectional transitions: 8978
- Commitment transitions: 76
- Winning regions: 1
- Initial region: r0, states=109, dist=3, internalBidirectional=374, commitments=5, viableCommitments=2, deadCommitments=3, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@7 -> r10@20 -> r20@28
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=23, edges=39, winReachable=5, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=109, dist=3, out=5, winOut=2, deadOut=3
- SCC path: s0@0 -> s9@7 -> s10@20 -> s11@28

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 109 | 5 | 2 | 3 | 0 | 0 | s9 | no |
| s9 | 7 | 2 | 110 | 3 | 1 | 2 | 1 | 1 | s10 | yes |
| s10 | 20 | 1 | 111 | 2 | 1 | 1 | 2 | 2 | s11 | yes |
| s11 | 28 | 0 | 116 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 7 | s9 | 109 | no | no | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s9 | 7 | 20 | s10 | 110 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s10 | 20 | 28 | s11 | 111 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2568, regions=23, solution commitments=3
- Opening: commitments=5, viable=2, dead=3, optimal=2
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=2/3
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 6 | r0 | r2 | 3 | 2 | 3 | 2 | multiple optimal choices |
| 19 | r2 | r10 | 2 | 1 | 2 | 1 | forced optimal |
| 27 | r10 | r20 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 109 | 5 | 2 | 3 | 2 | 2 | r2 | no | no | no |
| r2 | 7 | 2 | 110 | 3 | 1 | 2 | 1 | 1 | r10 | no | yes | yes |
| r10 | 20 | 1 | 111 | 2 | 1 | 1 | 1 | 1 | r20 | no | yes | yes |
| r20 | 28 | 0 | 116 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 7 | up | r2 | yes | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 8 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | walk |
| 20 | left | r10 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 21 | up | r10 | no | 1 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r10 | no | 1 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r10 | no | 1 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r10 | no | 1 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r10 | no | 1 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r10 | no | 1 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r10 | no | 1 | 2 | 1 | 1 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | walk |
| 28 | right | r20 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 29 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | up | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

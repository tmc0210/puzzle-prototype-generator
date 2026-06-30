# Level Analysis: ICE_CAND_0013_v6_isolated_goal8

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0013_v6_isolated_goal8
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
.......#.#.#.
.I...I..#.GG#
.....#.######
.............
.............
.............
.............
.............
...........I@
.............
```

## Shortest Solution

- Found: yes
- Cost: 32
- Depth: 32
- Explored states: 2003
- Inputs: down left up up up up up up left left left left left up up left up left left left left left down right right right right right right right right up
- Events: walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk
- Event counts: walk=29, push_ice=3, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d1=1, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=1, ice_destroy_group_d6_plus:len1=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
.......#.#.#.
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
.......#.#.#.
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

### Step 16: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
.......#.#.#.
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
.......#.#.#.
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

### Step 24: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
.......#.#.#.
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
.......#.#.#.
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
- Reachable states: 2567
- Legal transitions: 9046
- Event-only illegal transitions: 15
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2567
- Legal transitions: 9046
- Budget: maxStates=100000
- Compressed regions: 23
- Bidirectional transitions: 8970
- Commitment transitions: 76
- Winning regions: 1
- Initial region: r0, states=109, dist=3, internalBidirectional=374, commitments=5, viableCommitments=2, deadCommitments=3, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@3 -> r6@16 -> r20@24
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=23, edges=39, winReachable=5, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=109, dist=3, out=5, winOut=2, deadOut=3
- SCC path: s0@0 -> s1@3 -> s3@16 -> s4@24

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 109 | 5 | 2 | 3 | 0 | 0 | s1 | no |
| s1 | 3 | 2 | 110 | 3 | 1 | 2 | 1 | 1 | s3 | yes |
| s3 | 16 | 1 | 111 | 2 | 1 | 1 | 2 | 2 | s4 | yes |
| s4 | 24 | 0 | 115 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 109 | no | no | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s1 | 3 | 16 | s3 | 110 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s3 | 16 | 24 | s4 | 111 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2567, regions=23, solution commitments=3
- Opening: commitments=5, viable=2, dead=3, optimal=2
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=2/3
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r2 | 3 | 2 | 3 | 2 | multiple optimal choices |
| 15 | r2 | r6 | 2 | 1 | 2 | 1 | forced optimal |
| 23 | r6 | r20 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 109 | 5 | 2 | 3 | 2 | 2 | r2 | no | no | no |
| r2 | 3 | 2 | 110 | 3 | 1 | 2 | 1 | 1 | r6 | no | yes | yes |
| r6 | 16 | 1 | 111 | 2 | 1 | 1 | 1 | 1 | r20 | no | yes | yes |
| r20 | 24 | 0 | 115 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 3 | up | r2 | yes | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 4 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r2 | no | 2 | 3 | 1 | 2 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 16 | left | r6 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 17 | up | r6 | no | 1 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r6 | no | 1 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r6 | no | 1 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r6 | no | 1 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r6 | no | 1 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r6 | no | 1 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r6 | no | 1 | 2 | 1 | 1 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | walk |
| 24 | right | r20 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 25 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | up | r20 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

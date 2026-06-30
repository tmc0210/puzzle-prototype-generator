# Level Analysis: ICE_CAND_0015_v1_target_eject_group

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0015_v1_target_eject_group
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
@.*G.#..I...I..
###..#..###...#
#.............#
#.............#
#.............#
#.............#
#.............#
#.I...........#
#.............#
###############
```

## Shortest Solution

- Found: yes
- Cost: 36
- Depth: 36
- Explored states: 2862
- Inputs: right right right down down down down down down down down left up up up up up up right right right right up up right right right right right down right right up left right right
- Events: walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk
- Event counts: walk=32, push_ice=4, ice_stop_short:d2=1, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d1=2, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=1, ice_destroy_group_d6_plus:len2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
###############
.@*G.#..I...I..
###..#..###...#
#.............#
#.............#
#.............#
#.............#
#.............#
#.I...........#
#.............#
###############
```

After:

```text
###############
..+GI#..I...I..
###..#..###...#
#.............#
#.............#
#.............#
#.............#
#.............#
#.I...........#
#.............#
###############
```

### Step 13: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
###############
..GGI#..I...I..
###..#..###...#
#.............#
#.............#
#.............#
#.............#
#.............#
#.I...........#
#.@...........#
###############
```

After:

```text
###############
..*GI#..I...I..
###..#..###...#
#.............#
#.............#
#.............#
#.............#
#.............#
#.@...........#
#.............#
###############
```

### Step 26: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
###############
..*GI#.@I...I..
###..#..###...#
#.............#
#.............#
#.............#
#.............#
#.............#
#.............#
#.............#
###############
```

After:

```text
###############
..*GI#..@...I..
###..#..###...#
#.............#
#.............#
#.............#
#.............#
#.............#
#.............#
#.............#
###############
```

### Step 34: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
###############
..*GI#......I@.
###..#..###...#
#.............#
#.............#
#.............#
#.............#
#.............#
#.............#
#.............#
###############
```

After:

```text
###############
..**........@..
###..#..###...#
#.............#
#.............#
#.............#
#.............#
#.............#
#.............#
#.............#
###############
```


## Graph Facts

- Status: complete
- Reachable states: 7333
- Legal transitions: 25157
- Event-only illegal transitions: 211
- Winning states: 2
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 7333
- Legal transitions: 25157
- Budget: maxStates=100000
- Compressed regions: 68
- Bidirectional transitions: 24996
- Commitment transitions: 161
- Winning regions: 2
- Initial region: r0, states=2, dist=4, internalBidirectional=2, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r5@13 -> r18@26 -> r46@34
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=68, edges=145, winReachable=9, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=1/4, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s53@13 -> s54@26 -> s55@34

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 2 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 3 | 108 | 7 | 3 | 4 | 1 | 1 | s53 | no |
| s53 | 13 | 2 | 106 | 4 | 2 | 2 | 1 | 1 | s54 | no |
| s54 | 26 | 1 | 107 | 3 | 1 | 2 | 2 | 2 | s55 | yes |
| s55 | 34 | 0 | 109 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 2 | no | yes | right | push_ice, ice_stop_short:d2 | has_reposition_room |
| s1 | 2 | 13 | s53 | 108 | no | no | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s53 | 13 | 26 | s54 | 106 | no | no | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s54 | 26 | 34 | s55 | 107 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=7333, regions=68, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=2/4
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 12 | r1 | r5 | 3 | 3 | 4 | 3 | multiple optimal choices |
| 25 | r5 | r18 | 2 | 2 | 2 | 2 | multiple optimal choices |
| 33 | r18 | r46 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 3 | 108 | 7 | 3 | 4 | 3 | 3 | r5 | no | no | no |
| r5 | 13 | 2 | 106 | 4 | 2 | 2 | 2 | 2 | r18 | no | no | no |
| r18 | 26 | 1 | 107 | 3 | 1 | 2 | 1 | 1 | r46 | no | yes | yes |
| r46 | 34 | 0 | 109 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 3 | 7 | 3 | 4 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 3 | right | r1 | no | 3 | 7 | 3 | 4 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 3 | 7 | 3 | 4 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 3 | 7 | 3 | 4 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 3 | 7 | 3 | 4 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r1 | no | 3 | 7 | 3 | 4 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | 3 | 7 | 3 | 4 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r1 | no | 3 | 7 | 3 | 4 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r1 | no | 3 | 7 | 3 | 4 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r1 | no | 3 | 7 | 3 | 4 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r1 | no | 3 | 7 | 3 | 4 | 3 | 3 | r5 | yes | yes | yes | yes | no | no | walk |
| 13 | up | r5 | yes | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 14 | up | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r5 | no | 2 | 4 | 2 | 2 | 2 | 2 | r18 | yes | yes | yes | yes | no | no | walk |
| 26 | right | r18 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 27 | right | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | down | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | up | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r46 | yes | yes | yes | yes | yes | yes | walk |
| 34 | left | r46 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 35 | right | r46 | no | 0 | 0 | 0 | 0 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r46 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

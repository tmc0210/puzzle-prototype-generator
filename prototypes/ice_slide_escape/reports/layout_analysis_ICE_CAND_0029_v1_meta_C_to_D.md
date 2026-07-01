# Level Analysis: ICE_CAND_0029_v1_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0029_v1_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#################
......###########
#...#.###########
#..#G.*.....*.###
#...*.######..###
#.....######*.I.#
#...I.######.....
......#########.@
#################
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 425
- Inputs: up left left left up up up left down right down down left up down right right right up left down right right
- Events: walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk
- Event counts: walk=20, push_ice=3, ice_blocks_ice_no_chain_push=1, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_stop_short:d2=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2

Before:

```text
#################
......###########
#...#.###########
#..#G.*.....*@###
#...*.######..###
#.....######*.I.#
#...I.######.....
......#########..
#################
```

After:

```text
#################
......###########
#...#.###########
#..#*.*.....+.###
#...*.######..###
#.....######*.I.#
#...I.######.....
......#########..
#################
```

### Step 14: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#################
......###########
#...#.###########
#..#*.*.....G.###
#...*.######..###
#.....######*.I.#
#...I.######@....
......#########..
#################
```

After:

```text
#################
......###########
#...#.###########
#..#*.*.....*.###
#...*.######..###
#.....######+.I.#
#...I.######.....
......#########..
#################
```

### Step 20: left

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#################
......###########
#...#.###########
#..#*.*.....*.###
#...*.######..###
#.....######G.I@#
#...I.######.....
......#########..
#################
```

After:

```text
#################
......###########
#...#.###########
#..#*.*.....*.###
#...*.######..###
#.....######*.@.#
#...I.######.....
......#########..
#################
```


## Graph Facts

- Status: complete
- Reachable states: 621618
- Legal transitions: 1770965
- Event-only illegal transitions: 40245
- Winning states: 1
- Budget: maxStates=1000000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 621618
- Legal transitions: 1770965
- Budget: maxStates=1000000
- Compressed regions: 12599
- Bidirectional transitions: 1704718
- Commitment transitions: 66247
- Winning regions: 1
- Initial region: r0, states=12, dist=3, internalBidirectional=24, commitments=5, viableCommitments=2, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r6@8 -> r18@14 -> r33@20
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=12262, edges=60642, winReachable=8, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=12, dist=3, out=5, winOut=2, deadOut=3
- SCC path: s0@0 -> s8@8 -> s11096@14 -> s11097@20

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 12 | 5 | 2 | 3 | 0 | 0 | s8 | no |
| s8 | 8 | 2 | 18 | 5 | 2 | 3 | 1 | 1 | s11096 | no |
| s11096 | 14 | 1 | 13 | 3 | 1 | 2 | 2 | 2 | s11097 | yes |
| s11097 | 20 | 0 | 13 | 3 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s8 | 12 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 | has_reposition_room |
| s8 | 8 | 14 | s11096 | 18 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s11096 | 14 | 20 | s11097 | 13 | no | yes | left | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=621618, regions=12599, solution commitments=3
- Opening: commitments=5, viable=2, dead=3, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=1/3
- Endgame tail: 3 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress; 3 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r6 | 3 | 2 | 3 | 1 | forced optimal |
| 13 | r6 | r18 | 2 | 2 | 3 | 1 | forced optimal |
| 19 | r18 | r33 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 12 | 5 | 2 | 3 | 1 | 1 | r6 | no | no | yes |
| r6 | 8 | 2 | 18 | 5 | 2 | 3 | 1 | 1 | r18 | no | no | yes |
| r18 | 14 | 1 | 13 | 3 | 1 | 2 | 1 | 1 | r33 | no | yes | yes |
| r33 | 20 | 0 | 13 | 3 | 0 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 3 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 3 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 3 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 3 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r0 | no | 3 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r0 | no | 3 | 5 | 2 | 3 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 8 | left | r6 | yes | 2 | 5 | 2 | 3 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 |
| 9 | down | r6 | no | 2 | 5 | 2 | 3 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r6 | no | 2 | 5 | 2 | 3 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r6 | no | 2 | 5 | 2 | 3 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r6 | no | 2 | 5 | 2 | 3 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r6 | no | 2 | 5 | 2 | 3 | 1 | 1 | r18 | yes | yes | yes | yes | no | yes | walk |
| 14 | up | r18 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 15 | down | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r18 | no | 1 | 3 | 1 | 2 | 1 | 1 | r33 | yes | yes | yes | yes | yes | yes | walk |
| 20 | left | r33 | yes | 0 | 3 | 0 | 3 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 21 | down | r33 | no | 0 | 3 | 0 | 3 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r33 | no | 0 | 3 | 0 | 3 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r33 | no | 0 | 3 | 0 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

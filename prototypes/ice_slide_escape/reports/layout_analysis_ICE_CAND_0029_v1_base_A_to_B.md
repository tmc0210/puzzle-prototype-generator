# Level Analysis: ICE_CAND_0029_v1_base_A_to_B

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0029_v1_base_A_to_B
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
@.....#########..
#################
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 2834
- Inputs: right up up right right right up down left down down right up up left up left up up up left left
- Events: walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- Event counts: walk=20, push_ice=2, ice_stop_short:d1=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 7: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
#################
......###########
#...#.###########
#..#G.*.....*.###
#...*.######..###
#...@.######*.I.#
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
#...+.######..###
#.....######*.I.#
#...I.######.....
......#########..
#################
```

### Step 13: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
#################
......###########
#...#.###########
#..#*.*.....*.###
#...G.######..###
#.....######*.I.#
#...I.######.....
....@.#########..
#################
```

After:

```text
#################
......###########
#...#.###########
#..#*.*.....*.###
#...*.######..###
#.....######*.I.#
#...@.######.....
......#########..
#################
```


## Graph Facts

- Status: complete
- Reachable states: 18522
- Legal transitions: 52259
- Event-only illegal transitions: 983
- Winning states: 1
- Budget: maxStates=1000000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 18522
- Legal transitions: 52259
- Budget: maxStates=1000000
- Compressed regions: 414
- Bidirectional transitions: 50976
- Commitment transitions: 1283
- Winning regions: 1
- Initial region: r0, states=33, dist=2, internalBidirectional=88, commitments=9, viableCommitments=1, deadCommitments=8, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r4@7 -> r47@13
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=412, edges=1186, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=33, dist=2, out=9, winOut=1, deadOut=8
- SCC path: s0@0 -> s372@7 -> s376@13

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 33 | 9 | 1 | 8 | 0 | 0 | s372 | yes |
| s372 | 7 | 1 | 33 | 5 | 1 | 4 | 1 | 1 | s376 | yes |
| s376 | 13 | 0 | 33 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 7 | s372 | 33 | no | yes | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s372 | 7 | 13 | s376 | 33 | no | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=18522, regions=414, solution commitments=2
- Opening: commitments=9, viable=1, dead=8, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 6 | r0 | r4 | 2 | 1 | 8 | 1 | forced optimal |
| 12 | r4 | r47 | 1 | 1 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 33 | 9 | 1 | 8 | 1 | 1 | r4 | no | yes | yes |
| r4 | 7 | 1 | 33 | 5 | 1 | 4 | 1 | 1 | r47 | no | yes | yes |
| r47 | 13 | 0 | 33 | 3 | 0 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 9 | 1 | 8 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 9 | 1 | 8 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 2 | 9 | 1 | 8 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 2 | 9 | 1 | 8 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 2 | 9 | 1 | 8 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 2 | 9 | 1 | 8 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 2 | 9 | 1 | 8 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 7 | up | r4 | yes | 1 | 5 | 1 | 4 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 8 | down | r4 | no | 1 | 5 | 1 | 4 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r4 | no | 1 | 5 | 1 | 4 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r4 | no | 1 | 5 | 1 | 4 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r4 | no | 1 | 5 | 1 | 4 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r4 | no | 1 | 5 | 1 | 4 | 1 | 1 | r47 | yes | yes | yes | yes | yes | yes | walk |
| 13 | up | r47 | yes | 0 | 3 | 0 | 3 | 0 | 0 | r47 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 14 | up | r47 | no | 0 | 3 | 0 | 3 | 0 | 0 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r47 | no | 0 | 3 | 0 | 3 | 0 | 0 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r47 | no | 0 | 3 | 0 | 3 | 0 | 0 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r47 | no | 0 | 3 | 0 | 3 | 0 | 0 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r47 | no | 0 | 3 | 0 | 3 | 0 | 0 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r47 | no | 0 | 3 | 0 | 3 | 0 | 0 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r47 | no | 0 | 3 | 0 | 3 | 0 | 0 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r47 | no | 0 | 3 | 0 | 3 | 0 | 0 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r47 | no | 0 | 3 | 0 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

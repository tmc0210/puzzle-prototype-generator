# Level Analysis: ICE_CAND_0023_v4_base_A_to_B_high

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0023_v4_base_A_to_B_high
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##############
#....#########
@.IGI#.....I..
#....#######.#
..IGG#.....I..
#....######..#
#....######I.#
#...I######..#
#....#########
##############
```

## Shortest Solution

- Found: yes
- Cost: 20
- Depth: 20
- Explored states: 20429
- Inputs: right right down right down down down down down right up up up left left left up right left left
- Events: walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk
- Event counts: walk=17, push_ice=3, ice_blocks_ice_no_chain_push=3, ice_stop_short:d1=2, ice_rebound_d4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
#....#########
.@IGI#.....I..
#....#######.#
..IGG#.....I..
#....######..#
#....######I.#
#...I######..#
#....#########
##############
```

After:

```text
##############
#....#########
..@*I#.....I..
#....#######.#
..IGG#.....I..
#....######..#
#....######I.#
#...I######..#
#....#########
##############
```

### Step 11: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
##############
#....#########
...*I#.....I..
#....#######.#
..IGG#.....I..
#....######..#
#....######I.#
#...I######..#
#...@#########
##############
```

After:

```text
##############
#....#########
...*I#.....I..
#....#######.#
..IG*#.....I..
#....######..#
#....######I.#
#...@######..#
#....#########
##############
```

### Step 18: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
#....#########
...*I#.....I..
#....#######.#
.@IG*#.....I..
#....######..#
#....######I.#
#....######..#
#....#########
##############
```

After:

```text
##############
#....#########
...*I#.....I..
#....#######.#
..@**#.....I..
#....######..#
#....######I.#
#....######..#
#....#########
##############
```


## Graph Facts

- Status: complete
- Reachable states: 173931
- Legal transitions: 531445
- Event-only illegal transitions: 24578
- Winning states: 3
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 173931
- Legal transitions: 531445
- Budget: maxStates=500000
- Compressed regions: 5659
- Bidirectional transitions: 506994
- Commitment transitions: 24451
- Winning regions: 3
- Initial region: r0, states=30, dist=3, internalBidirectional=80, commitments=12, viableCommitments=4, deadCommitments=8, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@2 -> r148@11 -> r474@18
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=5041, edges=21389, winReachable=12, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=5, mergingWinSccs=5
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=270, dist=2, out=34, winOut=6, deadOut=28
- SCC path: s0@0 -> s60@2 -> s473@18

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 270 | 34 | 6 | 28 | 0 | 0 | s60 | no |
| s60 | 2 | 1 | 90 | 18 | 4 | 14 | 1 | 1 | s473 | no |
| s473 | 18 | 0 | 270 | 36 | 0 | 0 | 6 | 6 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s60 | 270 | no | no | right | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s60 | 2 | 18 | s473 | 90 | no | no | right | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=173931, regions=5659, solution commitments=3
- Opening: commitments=12, viable=4, dead=8, optimal=2
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=0/3
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 3 | 4 | 8 | 2 | multiple optimal choices |
| 10 | r1 | r148 | 2 | 3 | 6 | 1 | forced optimal |
| 17 | r148 | r474 | 1 | 5 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 30 | 12 | 4 | 8 | 2 | 2 | r1 | no | no | no |
| r1 | 2 | 2 | 30 | 9 | 3 | 6 | 1 | 1 | r148 | no | no | yes |
| r148 | 11 | 1 | 30 | 9 | 5 | 4 | 1 | 1 | r474 | no | no | yes |
| r474 | 18 | 0 | 30 | 8 | 4 | 4 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 12 | 4 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 3 | 12 | 4 | 8 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | walk |
| 2 | right | r1 | yes | 2 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 3 | down | r1 | no | 2 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 2 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 2 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 2 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r1 | no | 2 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | 2 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r1 | no | 2 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 2 | 9 | 3 | 6 | 1 | 1 | r148 | yes | yes | yes | yes | no | yes | walk |
| 11 | up | r148 | yes | 1 | 9 | 5 | 4 | 1 | 1 | r148 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 12 | up | r148 | no | 1 | 9 | 5 | 4 | 1 | 1 | r148 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r148 | no | 1 | 9 | 5 | 4 | 1 | 1 | r148 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r148 | no | 1 | 9 | 5 | 4 | 1 | 1 | r148 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r148 | no | 1 | 9 | 5 | 4 | 1 | 1 | r148 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r148 | no | 1 | 9 | 5 | 4 | 1 | 1 | r148 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r148 | no | 1 | 9 | 5 | 4 | 1 | 1 | r474 | yes | yes | yes | yes | no | yes | walk |
| 18 | right | r474 | yes | 0 | 8 | 4 | 4 | 0 | 0 | r474 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 19 | left | r474 | no | 0 | 8 | 4 | 4 | 0 | 0 | r474 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r474 | no | 0 | 8 | 4 | 4 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

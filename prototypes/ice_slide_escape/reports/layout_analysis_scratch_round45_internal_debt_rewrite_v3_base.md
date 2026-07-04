# Level Analysis: scratch_round45_internal_debt_rewrite_v3_base

## Summary

- Prototype: ice_slide_escape
- Title: scratch_round45_internal_debt_rewrite_v3_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_destroyed_d3, ice_rebound_d4

## Initial State

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
@....*...*...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

## Shortest Solution

- Found: yes
- Cost: 29
- Depth: 29
- Explored states: 1469
- Inputs: right right right right right up right right right right right down down down down down left left left left left up down right right right right right down
- Events: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk
- Event counts: walk=27, push_ice=2, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=1, ice_rebound_d4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
....@*...*...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
.....+...*...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

### Step 22: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
.....G...*...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####@.......#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
.....*...*...#....
#####.###....#####
#####.###....#####
#####@###I...#####
#####........#####
##########.#######
```


## Graph Facts

- Status: complete
- Reachable states: 10453
- Legal transitions: 28839
- Event-only illegal transitions: 467
- Winning states: 9
- Budget: maxStates=200000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 10453
- Legal transitions: 28839
- Budget: maxStates=200000
- Compressed regions: 224
- Bidirectional transitions: 28206
- Commitment transitions: 633
- Winning regions: 9
- Initial region: r0, states=5, dist=2, internalBidirectional=8, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r26@22
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=185, edges=443, winReachable=12, winning=9, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=1/1, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=5, dist=1, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 5 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 0 | 87 | 9 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 5 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=10453, regions=224, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 21 | r1 | r26 | 1 | 4 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 1 | 46 | 7 | 4 | 3 | 1 | 1 | r26 | no | no | yes |
| r26 | 22 | 0 | 41 | 8 | 5 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r1 | yes | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 6 | up | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r1 | no | 1 | 7 | 4 | 3 | 1 | 1 | r26 | yes | yes | yes | yes | no | yes | walk |
| 22 | up | r26 | yes | 0 | 8 | 5 | 3 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 23 | down | r26 | no | 0 | 8 | 5 | 3 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r26 | no | 0 | 8 | 5 | 3 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r26 | no | 0 | 8 | 5 | 3 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r26 | no | 0 | 8 | 5 | 3 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r26 | no | 0 | 8 | 5 | 3 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r26 | no | 0 | 8 | 5 | 3 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r26 | no | 0 | 8 | 5 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### ice_destroyed_d3

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)

### ice_rebound_d4

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

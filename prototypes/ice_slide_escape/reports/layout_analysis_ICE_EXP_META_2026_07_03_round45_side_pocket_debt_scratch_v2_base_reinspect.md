# Level Analysis: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v2_base_reinspect

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v2_base_reinspect
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#######################
#######################
#######################
####.##################
####..###.#############
@....*...*...##........
####..###.#############
####..###...###########
####*I###I..###########
####.......############
##########.############
```

## Shortest Solution

- Found: yes
- Cost: 29
- Depth: 29
- Explored states: 2154
- Inputs: right right right right right right right right right down down right down down left up down left left left left up down right right right right right down
- Events: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk
- Event counts: walk=25, push_ice=4, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=2, ice_rebound_d4=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
####..###.#############
....@*...*...##........
####..###.#############
####..###...###########
####*I###I..###########
####.......############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####..###.#############
.....+...*...##........
####..###.#############
####..###...###########
####*I###I..###########
####.......############
##########.############
```

### Step 9: right

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
####..###.#############
.....G..@*...##........
####..###.#############
####..###...###########
####*I###I..###########
####.......############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####..###.#############
.....G...+...##........
####..###.#############
####..###...###########
####*I###I..###########
####.......############
##########.############
```

### Step 16: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######################
#######################
#######################
####.##################
####..###.#############
.....G...G...##........
####..###.#############
####..###...###########
####*I###I..###########
####.....@.############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####..###.#############
.....G...*...##........
####..###.#############
####..###...###########
####*I###@..###########
####.......############
##########.############
```

### Step 22: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######################
#######################
#######################
####.##################
####..###.#############
.....G...*...##........
####..###.#############
####..###...###########
####*I###...###########
####.@.....############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####..###.#############
.....*...*...##........
####..###.#############
####..###...###########
####*@###...###########
####.......############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 6597
- Legal transitions: 15372
- Event-only illegal transitions: 571
- Winning states: 1
- Budget: maxStates=80000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 6597
- Legal transitions: 15372
- Budget: maxStates=80000
- Compressed regions: 207
- Bidirectional transitions: 14918
- Commitment transitions: 454
- Winning regions: 1
- Initial region: r0, states=12, dist=4, internalBidirectional=24, commitments=5, viableCommitments=1, deadCommitments=4, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r8@9 -> r25@16 -> r57@22
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=188, edges=404, winReachable=5, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=12, dist=3, out=5, winOut=1, deadOut=4
- SCC path: s0@0 -> s1@5 -> s2@9 -> s28@16 -> s29@22

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 12 | 5 | 1 | 4 | 0 | 0 | s1 | yes |
| s1 | 5 | 2 | 16 | 3 | 1 | 2 | 1 | 1 | s2 | yes |
| s2 | 9 | 1 | 70 | 10 | 2 | 8 | 1 | 1 | s28 | no |
| s28 | 16 | 1 | 15 | 3 | 1 | 2 | 1 | 1 | s29 | yes |
| s29 | 22 | 0 | 28 | 6 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 12 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s1 | 5 | 9 | s2 | 16 | no | yes | right | push_ice, ice_destroyed_d3 | has_reposition_room |
| s2 | 9 | 16 | s28 | 70 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s28 | 16 | 22 | s29 | 15 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=6597, regions=207, solution commitments=4
- Opening: commitments=5, viable=1, dead=4, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=2/4, forced viable commitments=3/4
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 4 | 1 | 4 | 1 | forced optimal |
| 8 | r1 | r8 | 3 | 1 | 2 | 1 | forced optimal |
| 15 | r8 | r25 | 2 | 2 | 4 | 2 | multiple optimal choices |
| 21 | r25 | r57 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 12 | 5 | 1 | 4 | 1 | 1 | r1 | no | yes | yes |
| r1 | 5 | 3 | 16 | 3 | 1 | 2 | 1 | 1 | r8 | no | yes | yes |
| r8 | 9 | 2 | 35 | 6 | 2 | 4 | 2 | 2 | r25 | no | no | no |
| r25 | 16 | 1 | 15 | 3 | 1 | 2 | 1 | 1 | r57 | no | yes | yes |
| r57 | 22 | 0 | 28 | 6 | 0 | 6 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 5 | 1 | 4 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r1 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 6 | right | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | walk |
| 9 | right | r8 | yes | 2 | 6 | 2 | 4 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 10 | down | r8 | no | 2 | 6 | 2 | 4 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r8 | no | 2 | 6 | 2 | 4 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r8 | no | 2 | 6 | 2 | 4 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r8 | no | 2 | 6 | 2 | 4 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r8 | no | 2 | 6 | 2 | 4 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r8 | no | 2 | 6 | 2 | 4 | 2 | 2 | r25 | yes | yes | yes | yes | no | no | walk |
| 16 | up | r25 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 17 | down | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r57 | yes | yes | yes | yes | yes | yes | walk |
| 22 | up | r57 | yes | 0 | 6 | 0 | 6 | 0 | 0 | r57 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 23 | down | r57 | no | 0 | 6 | 0 | 6 | 0 | 0 | r57 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r57 | no | 0 | 6 | 0 | 6 | 0 | 0 | r57 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r57 | no | 0 | 6 | 0 | 6 | 0 | 0 | r57 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r57 | no | 0 | 6 | 0 | 6 | 0 | 0 | r57 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r57 | no | 0 | 6 | 0 | 6 | 0 | 0 | r57 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r57 | no | 0 | 6 | 0 | 6 | 0 | 0 | r57 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r57 | no | 0 | 6 | 0 | 6 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

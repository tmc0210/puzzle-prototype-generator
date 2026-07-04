# Level Analysis: ICE_EXP_META_2026_07_03_round47_non_BC_internal_d6_v14_left_refill_no_repush_probe_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round47_non_BC_internal_d6_v14_left_refill_no_repush_probe_base
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
####.##################
@....*...*...##........
#####.###..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

## Shortest Solution

- Found: yes
- Cost: 30
- Depth: 30
- Explored states: 441
- Inputs: right right right right right right right right right down right down down left up down left left left left up down right right right right down right down right
- Events: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- Event counts: walk=26, push_ice=4, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=2, ice_stop_short:d2=2

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
####.##################
....@*...*...##........
#####.###..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....+...*...##........
#####.###..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
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
####.##################
.....G..@*...##........
#####.###..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....G...+...##........
#####.###..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

### Step 15: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....G...G...##........
#####.###..############
####II#.#I..###########
####.....@.############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....G...*...##........
#####.###..############
####II#.#@..###########
####.......############
####**.##..############
##########..###########
```

### Step 21: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....G...*...##........
#####.###..############
####II#.#...###########
####.@.....############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
#####.###..############
####I@#.#...###########
####.......############
####**.##..############
##########..###########
```


## Graph Facts

- Status: complete
- Reachable states: 641
- Legal transitions: 1403
- Event-only illegal transitions: 108
- Winning states: 1
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 641
- Legal transitions: 1403
- Budget: maxStates=120000
- Compressed regions: 23
- Bidirectional transitions: 1368
- Commitment transitions: 35
- Winning regions: 1
- Initial region: r0, states=7, dist=4, internalBidirectional=12, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r3@9 -> r7@15 -> r13@21
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=23, edges=33, winReachable=6, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=7, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5 -> s2@9 -> s6@15 -> s7@21

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 7 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 3 | 12 | 2 | 1 | 1 | 1 | 1 | s2 | yes |
| s2 | 9 | 2 | 33 | 4 | 2 | 2 | 1 | 1 | s6 | no |
| s6 | 15 | 1 | 21 | 2 | 1 | 1 | 1 | 1 | s7 | yes |
| s7 | 21 | 0 | 23 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 7 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s1 | 5 | 9 | s2 | 12 | no | yes | right | push_ice, ice_destroyed_d3 | has_reposition_room |
| s2 | 9 | 15 | s6 | 33 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s6 | 15 | 21 | s7 | 21 | no | yes | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=641, regions=23, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=2/4, forced viable commitments=3/4
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 8 | r1 | r3 | 3 | 1 | 1 | 1 | forced optimal |
| 14 | r3 | r7 | 2 | 2 | 2 | 2 | multiple optimal choices |
| 20 | r7 | r13 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 7 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 3 | 12 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 9 | 2 | 33 | 4 | 2 | 2 | 2 | 2 | r7 | no | no | no |
| r7 | 15 | 1 | 21 | 2 | 1 | 1 | 1 | 1 | r13 | no | yes | yes |
| r13 | 21 | 0 | 23 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r1 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 6 | right | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 9 | right | r3 | yes | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 10 | down | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r7 | yes | yes | yes | yes | no | no | walk |
| 15 | up | r7 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 16 | down | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r13 | yes | yes | yes | yes | yes | yes | walk |
| 21 | up | r13 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 22 | down | r13 | no | 0 | 1 | 0 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r13 | no | 0 | 1 | 0 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r13 | no | 0 | 1 | 0 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r13 | no | 0 | 1 | 0 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r13 | no | 0 | 1 | 0 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r13 | no | 0 | 1 | 0 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r13 | no | 0 | 1 | 0 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r13 | no | 0 | 1 | 0 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r13 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_base
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
#######################
#####.###.#############
@....*...*...##......I.
#####.###.#############
#####.###...###########
#####I###I..###########
#####......############
##########.############
```

## Shortest Solution

- Found: yes
- Cost: 29
- Depth: 29
- Explored states: 357
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
#######################
#####.###.#############
....@*...*...##......I.
#####.###.#############
#####.###...###########
#####I###I..###########
#####......############
##########.############
```

After:

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....+...*...##......I.
#####.###.#############
#####.###...###########
#####I###I..###########
#####......############
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
#######################
#####.###.#############
.....G..@*...##......I.
#####.###.#############
#####.###...###########
#####I###I..###########
#####......############
##########.############
```

After:

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....G...+...##......I.
#####.###.#############
#####.###...###########
#####I###I..###########
#####......############
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
#######################
#####.###.#############
.....G...G...##......I.
#####.###.#############
#####.###...###########
#####I###I..###########
#####....@.############
##########.############
```

After:

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....G...*...##......I.
#####.###.#############
#####.###...###########
#####I###@..###########
#####......############
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
#######################
#####.###.#############
.....G...*...##......I.
#####.###.#############
#####.###...###########
#####I###...###########
#####@.....############
##########.############
```

After:

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....*...*...##......I.
#####.###.#############
#####.###...###########
#####@###...###########
#####......############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 922
- Legal transitions: 2003
- Event-only illegal transitions: 41
- Winning states: 1
- Budget: maxStates=160000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 922
- Legal transitions: 2003
- Budget: maxStates=160000
- Compressed regions: 36
- Bidirectional transitions: 1952
- Commitment transitions: 51
- Winning regions: 1
- Initial region: r0, states=5, dist=4, internalBidirectional=8, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r3@9 -> r7@16 -> r14@22
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=34, edges=47, winReachable=6, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=5, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5 -> s2@9 -> s16@16 -> s17@22

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 5 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 3 | 12 | 2 | 1 | 1 | 1 | 1 | s2 | yes |
| s2 | 9 | 2 | 30 | 4 | 2 | 2 | 1 | 1 | s16 | no |
| s16 | 16 | 1 | 14 | 2 | 1 | 1 | 1 | 1 | s17 | yes |
| s17 | 22 | 0 | 17 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 5 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s1 | 5 | 9 | s2 | 12 | no | yes | right | push_ice, ice_destroyed_d3 | has_reposition_room |
| s2 | 9 | 16 | s16 | 30 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s16 | 16 | 22 | s17 | 14 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=922, regions=36, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=2/4, forced viable commitments=3/4
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 8 | r1 | r3 | 3 | 1 | 1 | 1 | forced optimal |
| 15 | r3 | r7 | 2 | 2 | 2 | 2 | multiple optimal choices |
| 21 | r7 | r14 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 3 | 12 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 9 | 2 | 30 | 4 | 2 | 2 | 2 | 2 | r7 | no | no | no |
| r7 | 16 | 1 | 14 | 2 | 1 | 1 | 1 | 1 | r14 | no | yes | yes |
| r14 | 22 | 0 | 17 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

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
| 11 | down | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r7 | yes | yes | yes | yes | no | no | walk |
| 16 | up | r7 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 17 | down | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r14 | yes | yes | yes | yes | yes | yes | walk |
| 22 | up | r14 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 23 | down | r14 | no | 0 | 2 | 0 | 2 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r14 | no | 0 | 2 | 0 | 2 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r14 | no | 0 | 2 | 0 | 2 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r14 | no | 0 | 2 | 0 | 2 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r14 | no | 0 | 2 | 0 | 2 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r14 | no | 0 | 2 | 0 | 2 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r14 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

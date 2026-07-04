# Level Analysis: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base
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
####..###..############
####II###I..###########
####.......############
####**...#.############
##########.############
```

## Shortest Solution

- Found: yes
- Cost: 29
- Depth: 29
- Explored states: 1241
- Inputs: right right right right right right right right right down right down down left up down left left left left up down right right right right right down down
- Events: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk
- Event counts: walk=25, push_ice=4, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=2, ice_stop_short:d2=2

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
####..###..############
####II###I..###########
####.......############
####**...#.############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....+...*...##........
####..###..############
####II###I..###########
####.......############
####**...#.############
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
####.##################
.....G..@*...##........
####..###..############
####II###I..###########
####.......############
####**...#.############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....G...+...##........
####..###..############
####II###I..###########
####.......############
####**...#.############
##########.############
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
####..###..############
####II###I..###########
####.....@.############
####**...#.############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....G...*...##........
####..###..############
####II###@..###########
####.......############
####**...#.############
##########.############
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
####..###..############
####II###...###########
####.@.....############
####**...#.############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####I@###...###########
####.......############
####**...#.############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 4393
- Legal transitions: 10379
- Event-only illegal transitions: 614
- Winning states: 4
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 4393
- Legal transitions: 10379
- Budget: maxStates=120000
- Compressed regions: 141
- Bidirectional transitions: 10044
- Commitment transitions: 335
- Winning regions: 4
- Initial region: r0, states=9, dist=4, internalBidirectional=16, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r7@9 -> r15@15 -> r27@21
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=134, edges=306, winReachable=20, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=10, mergingWinSccs=11
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=9, dist=4, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s1@5 -> s2@9 -> s62@15 -> s67@21

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 9 | 3 | 2 | 1 | 0 | 0 | s1 | no |
| s1 | 5 | 3 | 13 | 3 | 2 | 1 | 1 | 1 | s2 | no |
| s2 | 9 | 2 | 33 | 6 | 4 | 2 | 1 | 1 | s62 | no |
| s62 | 15 | 1 | 20 | 3 | 2 | 1 | 1 | 1 | s67 | no |
| s67 | 21 | 0 | 30 | 4 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 9 | no | no | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s1 | 5 | 9 | s2 | 13 | no | no | right | push_ice, ice_destroyed_d3 | has_reposition_room |
| s2 | 9 | 15 | s62 | 33 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s62 | 15 | 21 | s67 | 20 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=4393, regions=141, solution commitments=4
- Opening: commitments=3, viable=2, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=2/4, forced viable commitments=0/4
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 4 | 2 | 1 | 1 | forced optimal |
| 8 | r1 | r7 | 3 | 2 | 1 | 1 | forced optimal |
| 14 | r7 | r15 | 2 | 4 | 2 | 2 | multiple optimal choices |
| 20 | r15 | r27 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 9 | 3 | 2 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 5 | 3 | 13 | 3 | 2 | 1 | 1 | 1 | r7 | no | no | yes |
| r7 | 9 | 2 | 33 | 6 | 4 | 2 | 2 | 2 | r15 | no | no | no |
| r15 | 15 | 1 | 20 | 3 | 2 | 1 | 1 | 1 | r27 | no | no | yes |
| r27 | 21 | 0 | 30 | 4 | 2 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 3 | 2 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | walk |
| 5 | right | r1 | yes | 3 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 6 | right | r1 | no | 3 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 3 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 3 | 3 | 2 | 1 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | walk |
| 9 | right | r7 | yes | 2 | 6 | 4 | 2 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 10 | down | r7 | no | 2 | 6 | 4 | 2 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r7 | no | 2 | 6 | 4 | 2 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r7 | no | 2 | 6 | 4 | 2 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r7 | no | 2 | 6 | 4 | 2 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r7 | no | 2 | 6 | 4 | 2 | 2 | 2 | r15 | yes | yes | yes | yes | no | no | walk |
| 15 | up | r15 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 16 | down | r15 | no | 1 | 3 | 2 | 1 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r15 | no | 1 | 3 | 2 | 1 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r15 | no | 1 | 3 | 2 | 1 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r15 | no | 1 | 3 | 2 | 1 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r15 | no | 1 | 3 | 2 | 1 | 1 | 1 | r27 | yes | yes | yes | yes | no | yes | walk |
| 21 | up | r27 | yes | 0 | 4 | 2 | 2 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 22 | down | r27 | no | 0 | 4 | 2 | 2 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r27 | no | 0 | 4 | 2 | 2 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r27 | no | 0 | 4 | 2 | 2 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r27 | no | 0 | 4 | 2 | 2 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r27 | no | 0 | 4 | 2 | 2 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r27 | no | 0 | 4 | 2 | 2 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r27 | no | 0 | 4 | 2 | 2 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r27 | no | 0 | 4 | 2 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

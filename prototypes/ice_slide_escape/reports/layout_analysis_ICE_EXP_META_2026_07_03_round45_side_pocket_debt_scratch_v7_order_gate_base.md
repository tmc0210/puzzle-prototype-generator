# Level Analysis: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v7_order_gate_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v7_order_gate_base
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
####II...I..###########
####...##..############
####**.##..############
##########.############
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 274
- Inputs: right right right right down down right right right right right down down right down
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_stop_short:d2 walk walk walk walk
- Event counts: walk=12, push_ice=3, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=1, ice_destroyed_d3=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: down

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####@.###..############
####II...I..###########
####...##..############
####**.##..############
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
####@I...I..###########
####I..##..############
####**.##..############
##########.############
```

### Step 7: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####@I...I..###########
####I..##..############
####**.##..############
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
####.@...I..###########
####I..##..############
####**.##..############
##########.############
```

### Step 11: right

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####....@I..###########
####I..##..############
####**.##..############
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
####.....@.I###########
####I..##..############
####**.##..############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 4795
- Legal transitions: 11314
- Event-only illegal transitions: 700
- Winning states: 8
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 4795
- Legal transitions: 11314
- Budget: maxStates=120000
- Compressed regions: 147
- Bidirectional transitions: 10998
- Commitment transitions: 316
- Winning regions: 8
- Initial region: r0, states=9, dist=2, internalBidirectional=16, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@6 -> r3@7 -> r13@11
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=147, edges=291, winReachable=22, winning=8, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=7, mergingWinSccs=8
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=9, dist=2, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s109@6 -> s110@7 -> s111@11

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 9 | 3 | 3 | 0 | 0 | 0 | s109 | no |
| s109 | 6 | 2 | 10 | 3 | 3 | 0 | 1 | 1 | s110 | no |
| s110 | 7 | 1 | 17 | 2 | 1 | 1 | 1 | 1 | s111 | yes |
| s111 | 11 | 0 | 29 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s109 | 9 | no | no | down | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s109 | 6 | 7 | s110 | 10 | yes | no | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | scripted_same_state_handoff |
| s110 | 7 | 11 | s111 | 17 | no | yes | right | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=4795, regions=147, solution commitments=3
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=1/3
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r2 | 2 | 3 | 0 | 1 | multiple viable choices |
| 6 | r2 | r3 | 2 | 3 | 0 | 2 | multiple optimal choices |
| 10 | r3 | r13 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 9 | 3 | 3 | 0 | 1 | 1 | r2 | no | no | no |
| r2 | 6 | 2 | 10 | 3 | 3 | 0 | 2 | 2 | r3 | no | no | no |
| r3 | 7 | 1 | 17 | 2 | 1 | 1 | 1 | 1 | r13 | no | yes | yes |
| r13 | 11 | 0 | 29 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 2 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 2 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 2 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 2 | 3 | 3 | 0 | 1 | 1 | r2 | yes | yes | no | no | no | no | walk |
| 6 | down | r2 | yes | 2 | 3 | 3 | 0 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 7 | right | r3 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 8 | right | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r13 | yes | yes | yes | yes | yes | yes | walk |
| 11 | right | r13 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 12 | down | r13 | no | 0 | 2 | 0 | 2 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r13 | no | 0 | 2 | 0 | 2 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r13 | no | 0 | 2 | 0 | 2 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r13 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v16_probe_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v16_probe_base
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
####...#...############
####**.##..############
##########..###########
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 430
- Inputs: right right right right down down right right right right down right down right down right
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk
- Event counts: walk=14, push_ice=2, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=1, ice_destroyed_d3=1

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
####...#...############
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
####..###..############
####@I...I..###########
####I..#...############
####**.##..############
##########..###########
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
####I..#...############
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
####..###..############
####.@...I..###########
####I..#...############
####**.##..############
##########..###########
```


## Graph Facts

- Status: complete
- Reachable states: 12825
- Legal transitions: 30570
- Event-only illegal transitions: 1684
- Winning states: 28
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 12825
- Legal transitions: 30570
- Budget: maxStates=120000
- Compressed regions: 355
- Bidirectional transitions: 29618
- Commitment transitions: 952
- Winning regions: 28
- Initial region: r0, states=9, dist=1, internalBidirectional=16, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@6 -> r3@7
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=355, edges=903, winReachable=57, winning=28, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=14, mergingWinSccs=29
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=9, dist=1, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s284@6 -> s285@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 9 | 3 | 3 | 0 | 0 | 0 | s284 | no |
| s284 | 6 | 1 | 10 | 3 | 3 | 0 | 1 | 1 | s285 | no |
| s285 | 7 | 0 | 31 | 6 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s284 | 9 | no | no | down | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s284 | 6 | 7 | s285 | 10 | yes | no | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=12825, regions=355, solution commitments=2
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=0/2
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r2 | 1 | 3 | 0 | 1 | multiple viable choices |
| 6 | r2 | r3 | 1 | 3 | 0 | 2 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 9 | 3 | 3 | 0 | 1 | 1 | r2 | no | no | no |
| r2 | 6 | 1 | 10 | 3 | 3 | 0 | 2 | 2 | r3 | no | no | no |
| r3 | 7 | 0 | 31 | 6 | 5 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r2 | yes | yes | no | no | no | no | walk |
| 6 | down | r2 | yes | 1 | 3 | 3 | 0 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 7 | right | r3 | yes | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 8 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: worker_round46_order_gate_scratch_v3_base

## Summary

- Prototype: ice_slide_escape
- Title: worker_round46_order_gate_scratch_v3_base
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
####II..#I..###########
####.......############
####**.##..############
##########.############
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 257
- Inputs: right right right right down down right down right right right right down right down
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk
- Event counts: walk=13, push_ice=2, ice_blocks_ice_no_chain_push=1, ice_stop_short:d1=1, ice_stop_short:d2=1

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
####II..#I..###########
####.......############
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
####@I..#I..###########
####I......############
####**.##..############
##########.############
```

### Step 7: right

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
####@I..#I..###########
####I......############
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
####.@.I#I..###########
####I......############
####**.##..############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 6682
- Legal transitions: 15857
- Event-only illegal transitions: 1066
- Winning states: 20
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 6682
- Legal transitions: 15857
- Budget: maxStates=120000
- Compressed regions: 193
- Bidirectional transitions: 15352
- Commitment transitions: 505
- Winning regions: 20
- Initial region: r0, states=9, dist=1, internalBidirectional=16, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@6 -> r3@7
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=193, edges=467, winReachable=44, winning=20, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=13, mergingWinSccs=24
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=9, dist=1, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s129@6 -> s130@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 9 | 3 | 3 | 0 | 0 | 0 | s129 | no |
| s129 | 6 | 1 | 10 | 3 | 3 | 0 | 1 | 1 | s130 | no |
| s130 | 7 | 0 | 29 | 4 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s129 | 9 | no | no | down | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s129 | 6 | 7 | s130 | 10 | yes | no | right | push_ice, ice_stop_short:d2 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=6682, regions=193, solution commitments=2
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=0/2
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: 8 trailing step(s) after entering a winning region

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
| r3 | 7 | 0 | 29 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

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
| 7 | right | r3 | yes | 0 | 4 | 3 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 8 | down | r3 | no | 0 | 4 | 3 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r3 | no | 0 | 4 | 3 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r3 | no | 0 | 4 | 3 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r3 | no | 0 | 4 | 3 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r3 | no | 0 | 4 | 3 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r3 | no | 0 | 4 | 3 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r3 | no | 0 | 4 | 3 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r3 | no | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

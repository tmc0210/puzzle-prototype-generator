# Level Analysis: ICE_EXP_META_2026_07_03_round46_side_pocket_debt_v11_ice_wrong_push_gate_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round46_side_pocket_debt_v11_ice_wrong_push_gate_meta
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
#######################
.....*...*...##........
####..###..############
####.I###I..###########
####I......############
####.*...#.############
##########@############
```

## Shortest Solution

- Found: yes
- Cost: 47
- Depth: 47
- Explored states: 9497
- Inputs: up up up up up left down right down down left left left left left up left up up right left down down right up down down right right right right up up right up right right right right right right right right right right right right
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=42, push_ice=5, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=1, ice_stop_short:d1=2, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_boundary_disappear:d8=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
#######################
.....*...*@..##........
####..###..############
####.I###I..###########
####I......############
####.*...#.############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
#######################
.....*...+...##........
####..###..############
####.I###I..###########
####I......############
####.*...#.############
##########.############
```

### Step 16: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
#######################
#######################
#######################
####.##################
#######################
.....*...G...##........
####..###..############
####.I###I..###########
####I@.....############
####.*...#.############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
#######################
.....*...G...##........
####.I###..############
####.@###I..###########
####I......############
####.*...#.############
##########.############
```

### Step 20: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8

Before:

```text
#######################
#######################
#######################
####.##################
#######################
....@*...G...##........
####.I###..############
####..###I..###########
####I......############
####.*...#.############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
#######################
.....+...G.............
####.I###..############
####..###I..###########
####I......############
####.*...#.############
##########.############
```

### Step 25: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
#######################
#######################
#######################
####.##################
#######################
.....G...G.............
####.I###..############
####.@###I..###########
####I......############
####.*...#.############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
#######################
.....*...G.............
####.@###..############
####..###I..###########
####I......############
####.*...#.############
##########.############
```

### Step 32: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#######################
#######################
#######################
####.##################
#######################
.....*...G.............
####..###..############
####..###I..###########
####I....@.############
####.*...#.############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
#######################
.....*...*.............
####..###..############
####..###@..###########
####I......############
####.*...#.############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 10936
- Legal transitions: 25735
- Event-only illegal transitions: 1403
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 10936
- Legal transitions: 25735
- Budget: maxStates=120000
- Compressed regions: 369
- Bidirectional transitions: 24660
- Commitment transitions: 1075
- Winning regions: 2
- Initial region: r0, states=18, dist=5, internalBidirectional=38, commitments=5, viableCommitments=3, deadCommitments=2, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@6 -> r42@16 -> r89@20 -> r172@25 -> r271@32
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=357, edges=999, winReachable=24, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=14, mergingWinSccs=14
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=18, dist=5, out=5, winOut=3, deadOut=2
- SCC path: s0@0 -> s110@6 -> s115@16 -> s118@20 -> s141@25 -> s145@32

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 18 | 5 | 3 | 2 | 0 | 0 | s110 | no |
| s110 | 6 | 4 | 22 | 5 | 1 | 4 | 1 | 1 | s115 | yes |
| s115 | 16 | 3 | 30 | 6 | 2 | 4 | 2 | 2 | s118 | no |
| s118 | 20 | 2 | 41 | 6 | 3 | 3 | 1 | 1 | s141 | no |
| s141 | 25 | 1 | 41 | 5 | 2 | 3 | 1 | 1 | s145 | no |
| s145 | 32 | 0 | 38 | 4 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s110 | 18 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s110 | 6 | 16 | s115 | 22 | no | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s115 | 16 | 20 | s118 | 30 | no | no | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 | has_reposition_room |
| s118 | 20 | 25 | s141 | 41 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s141 | 25 | 32 | s145 | 41 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=10936, regions=369, solution commitments=5
- Opening: commitments=5, viable=3, dead=2, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 15 step(s) after first entering a winning region
- Reading hints: 15 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r2 | 5 | 3 | 2 | 2 | multiple optimal choices |
| 15 | r2 | r42 | 4 | 1 | 4 | 1 | forced optimal |
| 19 | r42 | r89 | 3 | 2 | 4 | 1 | forced optimal |
| 24 | r89 | r172 | 2 | 3 | 3 | 2 | multiple optimal choices |
| 31 | r172 | r271 | 1 | 2 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 18 | 5 | 3 | 2 | 2 | 2 | r2 | no | no | no |
| r2 | 6 | 4 | 22 | 5 | 1 | 4 | 1 | 1 | r42 | no | yes | yes |
| r42 | 16 | 3 | 30 | 6 | 2 | 4 | 1 | 1 | r89 | no | no | yes |
| r89 | 20 | 2 | 41 | 6 | 3 | 3 | 2 | 2 | r172 | no | no | no |
| r172 | 25 | 1 | 41 | 5 | 2 | 3 | 1 | 1 | r271 | no | no | yes |
| r271 | 32 | 0 | 38 | 4 | 1 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 6 | left | r2 | yes | 4 | 5 | 1 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 7 | down | r2 | no | 4 | 5 | 1 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r2 | no | 4 | 5 | 1 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 4 | 5 | 1 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r2 | no | 4 | 5 | 1 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r2 | no | 4 | 5 | 1 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 4 | 5 | 1 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 4 | 5 | 1 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r2 | no | 4 | 5 | 1 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r2 | no | 4 | 5 | 1 | 4 | 1 | 1 | r42 | yes | yes | yes | yes | yes | yes | walk |
| 16 | up | r42 | yes | 3 | 6 | 2 | 4 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 17 | left | r42 | no | 3 | 6 | 2 | 4 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r42 | no | 3 | 6 | 2 | 4 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r42 | no | 3 | 6 | 2 | 4 | 1 | 1 | r89 | yes | yes | yes | yes | no | yes | walk |
| 20 | right | r89 | yes | 2 | 6 | 3 | 3 | 2 | 2 | r89 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 |
| 21 | left | r89 | no | 2 | 6 | 3 | 3 | 2 | 2 | r89 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r89 | no | 2 | 6 | 3 | 3 | 2 | 2 | r89 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r89 | no | 2 | 6 | 3 | 3 | 2 | 2 | r89 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r89 | no | 2 | 6 | 3 | 3 | 2 | 2 | r172 | yes | yes | yes | yes | no | no | walk |
| 25 | up | r172 | yes | 1 | 5 | 2 | 3 | 1 | 1 | r172 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 26 | down | r172 | no | 1 | 5 | 2 | 3 | 1 | 1 | r172 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r172 | no | 1 | 5 | 2 | 3 | 1 | 1 | r172 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r172 | no | 1 | 5 | 2 | 3 | 1 | 1 | r172 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r172 | no | 1 | 5 | 2 | 3 | 1 | 1 | r172 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r172 | no | 1 | 5 | 2 | 3 | 1 | 1 | r172 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r172 | no | 1 | 5 | 2 | 3 | 1 | 1 | r271 | yes | yes | yes | yes | no | yes | walk |
| 32 | up | r271 | yes | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 33 | up | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | r271 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r271 | no | 0 | 4 | 1 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

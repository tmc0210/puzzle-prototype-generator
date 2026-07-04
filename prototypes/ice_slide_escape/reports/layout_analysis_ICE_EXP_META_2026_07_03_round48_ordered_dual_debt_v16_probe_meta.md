# Level Analysis: ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v16_probe_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v16_probe_meta
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
.....*...*...##........
####..###..############
####II...I..###########
####...#...############
####**.##..############
##########@.###########
```

## Shortest Solution

- Found: yes
- Cost: 47
- Depth: 47
- Explored states: 25209
- Inputs: up up left up right up up left right down down left left left left down left left up up up right down left down down right up right right right right up right up right right right right right right right right right right right right
- Events: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=41, push_ice=6, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=2, ice_destroyed_d3=1, ice_rebound_d4=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_boundary_disappear:d8=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: up

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
####..###..############
####II...I..###########
####...#.@.############
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
####..###I.############
####II...@..###########
####...#...############
####**.##..############
##########..###########
```

### Step 8: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*@..##........
####..###I.############
####II......###########
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
.....*...+...##........
####..###I.############
####II......###########
####...#...############
####**.##..############
##########..###########
```

### Step 19: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...G...##........
####..###I.############
####II......###########
####@..#...############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.....*...G...##........
####..###I.############
####@I......###########
####...#...############
####**.##..############
##########..###########
```

### Step 22: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8

Before:

```text
#######################
#######################
#######################
####.##################
####I##################
....@*...G...##........
####..###I.############
####.I......###########
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
####I##################
.....+...G.............
####..###I.############
####.I......###########
####...#...############
####**.##..############
##########..###########
```

### Step 28: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#######################
#######################
#######################
####.##################
####I##################
.....G...G.............
####..###I.############
####.I......###########
####.@.#...############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.....*...G.............
####..###I.############
####.@......###########
####...#...############
####**.##..############
##########..###########
```

### Step 33: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
#######################
#######################
#######################
####.##################
####I##################
.....*...G.............
####..###I.############
####.....@..###########
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
####I##################
.....*...*.............
####..###@.############
####........###########
####...#...############
####**.##..############
##########..###########
```


## Graph Facts

- Status: complete
- Reachable states: 30503
- Legal transitions: 72958
- Event-only illegal transitions: 4395
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 30503
- Legal transitions: 72958
- Budget: maxStates=120000
- Compressed regions: 843
- Bidirectional transitions: 70130
- Commitment transitions: 2828
- Winning regions: 2
- Initial region: r0, states=21, dist=5, internalBidirectional=42, commitments=7, viableCommitments=4, deadCommitments=3, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@4 -> r8@8 -> r155@19 -> r276@22 -> r491@28 -> r605@33
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=843, edges=2680, winReachable=42, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=0/6, branchingWinSccs=31, mergingWinSccs=31
- Handoff scriptiness: scope=returned_solution, scripted=0/6, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=21, dist=5, out=7, winOut=4, deadOut=3
- SCC path: s0@0 -> s158@4 -> s210@8 -> s211@19 -> s219@22 -> s239@28 -> s597@33

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 21 | 7 | 4 | 3 | 0 | 0 | s158 | no |
| s158 | 4 | 5 | 21 | 3 | 3 | 0 | 1 | 1 | s210 | no |
| s210 | 8 | 4 | 25 | 5 | 2 | 3 | 1 | 1 | s211 | no |
| s211 | 19 | 3 | 33 | 9 | 3 | 6 | 2 | 2 | s219 | no |
| s219 | 22 | 2 | 44 | 7 | 3 | 4 | 1 | 1 | s239 | no |
| s239 | 28 | 1 | 44 | 4 | 2 | 2 | 2 | 2 | s597 | no |
| s597 | 33 | 0 | 41 | 3 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s158 | 21 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s158 | 4 | 8 | s210 | 21 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s210 | 8 | 19 | s211 | 25 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s211 | 19 | 22 | s219 | 33 | no | no | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 | has_reposition_room |
| s219 | 22 | 28 | s239 | 44 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s239 | 28 | 33 | s597 | 44 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=30503, regions=843, solution commitments=6
- Opening: commitments=7, viable=4, dead=3, optimal=2
- Win-continuation prefix: viable prefix=0/6, optimal prefix=0/6, forced viable commitments=0/6
- Endgame tail: 14 step(s) after first entering a winning region
- Reading hints: 14 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r2 | 5 | 4 | 3 | 2 | multiple optimal choices |
| 7 | r2 | r8 | 5 | 3 | 0 | 2 | multiple optimal choices |
| 18 | r8 | r155 | 4 | 2 | 3 | 1 | forced optimal |
| 21 | r155 | r276 | 3 | 3 | 6 | 1 | forced optimal |
| 27 | r276 | r491 | 2 | 3 | 4 | 2 | multiple optimal choices |
| 32 | r491 | r605 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 21 | 7 | 4 | 3 | 2 | 2 | r2 | no | no | no |
| r2 | 4 | 5 | 21 | 3 | 3 | 0 | 2 | 2 | r8 | no | no | no |
| r8 | 8 | 4 | 25 | 5 | 2 | 3 | 1 | 1 | r155 | no | no | yes |
| r155 | 19 | 3 | 33 | 9 | 3 | 6 | 1 | 1 | r276 | no | no | yes |
| r276 | 22 | 2 | 44 | 7 | 3 | 4 | 2 | 2 | r491 | no | no | no |
| r491 | 28 | 1 | 44 | 4 | 2 | 2 | 1 | 1 | r605 | no | no | yes |
| r605 | 33 | 0 | 41 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 7 | 4 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 5 | 7 | 4 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 5 | 7 | 4 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 5 | 7 | 4 | 3 | 2 | 2 | r2 | yes | yes | no | no | no | no | walk |
| 4 | up | r2 | yes | 5 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 5 | right | r2 | no | 5 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r2 | no | 5 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 5 | 3 | 3 | 0 | 2 | 2 | r8 | yes | yes | yes | yes | no | no | walk |
| 8 | left | r8 | yes | 4 | 5 | 2 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 9 | right | r8 | no | 4 | 5 | 2 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r8 | no | 4 | 5 | 2 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r8 | no | 4 | 5 | 2 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r8 | no | 4 | 5 | 2 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r8 | no | 4 | 5 | 2 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r8 | no | 4 | 5 | 2 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r8 | no | 4 | 5 | 2 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r8 | no | 4 | 5 | 2 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r8 | no | 4 | 5 | 2 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r8 | no | 4 | 5 | 2 | 3 | 1 | 1 | r155 | yes | yes | yes | yes | no | yes | walk |
| 19 | up | r155 | yes | 3 | 9 | 3 | 6 | 1 | 1 | r155 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 20 | up | r155 | no | 3 | 9 | 3 | 6 | 1 | 1 | r155 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r155 | no | 3 | 9 | 3 | 6 | 1 | 1 | r276 | yes | yes | yes | yes | no | yes | walk |
| 22 | right | r276 | yes | 2 | 7 | 3 | 4 | 2 | 2 | r276 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 |
| 23 | down | r276 | no | 2 | 7 | 3 | 4 | 2 | 2 | r276 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r276 | no | 2 | 7 | 3 | 4 | 2 | 2 | r276 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r276 | no | 2 | 7 | 3 | 4 | 2 | 2 | r276 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r276 | no | 2 | 7 | 3 | 4 | 2 | 2 | r276 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r276 | no | 2 | 7 | 3 | 4 | 2 | 2 | r491 | yes | yes | yes | yes | no | no | walk |
| 28 | up | r491 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r491 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 29 | right | r491 | no | 1 | 4 | 2 | 2 | 1 | 1 | r491 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r491 | no | 1 | 4 | 2 | 2 | 1 | 1 | r491 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r491 | no | 1 | 4 | 2 | 2 | 1 | 1 | r491 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r491 | no | 1 | 4 | 2 | 2 | 1 | 1 | r605 | yes | yes | yes | yes | no | yes | walk |
| 33 | up | r605 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 34 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | r605 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r605 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v4_meta_recheck

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v4_meta_recheck
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
####II###I..###########
####.......############
####.......############
##########@############
```

## Shortest Solution

- Found: yes
- Cost: 47
- Depth: 47
- Explored states: 16126
- Inputs: up up up up up left down right down down left left left left left left up up up right down left down down right up down right right right right up up right up right right right right right right right right right right right right
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=42, push_ice=5, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=1, ice_rebound_d4=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_boundary_disappear:d8=1, ice_stop_short:d2=2

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
####.##################
.....*...*@..##........
####..###..############
####II###I..###########
####.......############
####.......############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...+...##........
####..###..############
####II###I..###########
####.......############
####.......############
##########.############
```

### Step 17: up

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
####..###..############
####II###I..###########
####@......############
####.......############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.....*...G...##........
####..###..############
####@I###I..###########
####.......############
####.......############
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
####I##################
....@*...G...##........
####..###..############
####.I###I..###########
####.......############
####.......############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.....+...G.............
####..###..############
####.I###I..###########
####.......############
####.......############
##########.############
```

### Step 26: up

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
####..###..############
####.I###I..###########
####.@.....############
####.......############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.....*...G.............
####..###..############
####.@###I..###########
####.......############
####.......############
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
####I##################
.....*...G.............
####..###..############
####..###I..###########
####.....@.############
####.......############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.....*...*.............
####..###..############
####..###@..###########
####.......############
####.......############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 16271
- Legal transitions: 41287
- Event-only illegal transitions: 1373
- Winning states: 2
- Budget: maxStates=80000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 16271
- Legal transitions: 41287
- Budget: maxStates=80000
- Compressed regions: 447
- Bidirectional transitions: 39638
- Commitment transitions: 1649
- Winning regions: 2
- Initial region: r0, states=22, dist=5, internalBidirectional=54, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@6 -> r66@17 -> r123@20 -> r303@26 -> r404@32
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=419, edges=1465, winReachable=42, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=31, mergingWinSccs=31
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=22, dist=5, out=5, winOut=4, deadOut=1
- SCC path: s0@0 -> s148@6 -> s161@17 -> s167@20 -> s208@26 -> s209@32

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 22 | 5 | 4 | 1 | 0 | 0 | s148 | no |
| s148 | 6 | 4 | 26 | 5 | 2 | 3 | 1 | 1 | s161 | no |
| s161 | 17 | 3 | 34 | 7 | 3 | 4 | 2 | 2 | s167 | no |
| s167 | 20 | 2 | 45 | 5 | 3 | 2 | 1 | 1 | s208 | no |
| s208 | 26 | 1 | 45 | 4 | 2 | 2 | 2 | 2 | s209 | no |
| s209 | 32 | 0 | 42 | 3 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s148 | 22 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s148 | 6 | 17 | s161 | 26 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s161 | 17 | 20 | s167 | 34 | no | no | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 | has_reposition_room |
| s167 | 20 | 26 | s208 | 45 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s208 | 26 | 32 | s209 | 45 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=16271, regions=447, solution commitments=5
- Opening: commitments=5, viable=4, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=0/5
- Endgame tail: 15 step(s) after first entering a winning region
- Reading hints: 15 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r2 | 5 | 4 | 1 | 2 | multiple optimal choices |
| 16 | r2 | r66 | 4 | 2 | 3 | 1 | forced optimal |
| 19 | r66 | r123 | 3 | 3 | 4 | 1 | forced optimal |
| 25 | r123 | r303 | 2 | 3 | 2 | 2 | multiple optimal choices |
| 31 | r303 | r404 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 22 | 5 | 4 | 1 | 2 | 2 | r2 | no | no | no |
| r2 | 6 | 4 | 26 | 5 | 2 | 3 | 1 | 1 | r66 | no | no | yes |
| r66 | 17 | 3 | 34 | 7 | 3 | 4 | 1 | 1 | r123 | no | no | yes |
| r123 | 20 | 2 | 45 | 5 | 3 | 2 | 2 | 2 | r303 | no | no | no |
| r303 | 26 | 1 | 45 | 4 | 2 | 2 | 1 | 1 | r404 | no | no | yes |
| r404 | 32 | 0 | 42 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 5 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 5 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 5 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 5 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 5 | 5 | 4 | 1 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 6 | left | r2 | yes | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 7 | down | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r66 | yes | yes | yes | yes | no | yes | walk |
| 17 | up | r66 | yes | 3 | 7 | 3 | 4 | 1 | 1 | r66 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 18 | up | r66 | no | 3 | 7 | 3 | 4 | 1 | 1 | r66 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r66 | no | 3 | 7 | 3 | 4 | 1 | 1 | r123 | yes | yes | yes | yes | no | yes | walk |
| 20 | right | r123 | yes | 2 | 5 | 3 | 2 | 2 | 2 | r123 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 |
| 21 | down | r123 | no | 2 | 5 | 3 | 2 | 2 | 2 | r123 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r123 | no | 2 | 5 | 3 | 2 | 2 | 2 | r123 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r123 | no | 2 | 5 | 3 | 2 | 2 | 2 | r123 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r123 | no | 2 | 5 | 3 | 2 | 2 | 2 | r123 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r123 | no | 2 | 5 | 3 | 2 | 2 | 2 | r303 | yes | yes | yes | yes | no | no | walk |
| 26 | up | r303 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r303 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 27 | down | r303 | no | 1 | 4 | 2 | 2 | 1 | 1 | r303 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r303 | no | 1 | 4 | 2 | 2 | 1 | 1 | r303 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r303 | no | 1 | 4 | 2 | 2 | 1 | 1 | r303 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r303 | no | 1 | 4 | 2 | 2 | 1 | 1 | r303 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r303 | no | 1 | 4 | 2 | 2 | 1 | 1 | r404 | yes | yes | yes | yes | no | yes | walk |
| 32 | up | r404 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 33 | up | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | r404 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r404 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

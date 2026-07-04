# Level Analysis: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v6_double_anchor_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v6_double_anchor_meta
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
####**.....############
##########@############
```

## Shortest Solution

- Found: yes
- Cost: 47
- Depth: 47
- Explored states: 11041
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
####**.....############
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
####**.....############
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
####**.....############
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
####**.....############
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
####**.....############
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
####**.....############
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
####**.....############
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
####**.....############
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
####**.....############
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
####**.....############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 11299
- Legal transitions: 27657
- Event-only illegal transitions: 1784
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 11299
- Legal transitions: 27657
- Budget: maxStates=120000
- Compressed regions: 347
- Bidirectional transitions: 26454
- Commitment transitions: 1203
- Winning regions: 2
- Initial region: r0, states=20, dist=5, internalBidirectional=46, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@6 -> r60@17 -> r103@20 -> r226@26 -> r308@32
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=347, edges=1147, winReachable=42, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=31, mergingWinSccs=31
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=20, dist=5, out=5, winOut=4, deadOut=1
- SCC path: s0@0 -> s117@6 -> s122@17 -> s125@20 -> s167@26 -> s168@32

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 20 | 5 | 4 | 1 | 0 | 0 | s117 | no |
| s117 | 6 | 4 | 24 | 5 | 2 | 3 | 1 | 1 | s122 | no |
| s122 | 17 | 3 | 32 | 7 | 3 | 4 | 2 | 2 | s125 | no |
| s125 | 20 | 2 | 43 | 5 | 3 | 2 | 1 | 1 | s167 | no |
| s167 | 26 | 1 | 43 | 4 | 2 | 2 | 2 | 2 | s168 | no |
| s168 | 32 | 0 | 40 | 3 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s117 | 20 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s117 | 6 | 17 | s122 | 24 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s122 | 17 | 20 | s125 | 32 | no | no | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 | has_reposition_room |
| s125 | 20 | 26 | s167 | 43 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s167 | 26 | 32 | s168 | 43 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=11299, regions=347, solution commitments=5
- Opening: commitments=5, viable=4, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=0/5
- Endgame tail: 15 step(s) after first entering a winning region
- Reading hints: 15 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r2 | 5 | 4 | 1 | 2 | multiple optimal choices |
| 16 | r2 | r60 | 4 | 2 | 3 | 1 | forced optimal |
| 19 | r60 | r103 | 3 | 3 | 4 | 1 | forced optimal |
| 25 | r103 | r226 | 2 | 3 | 2 | 2 | multiple optimal choices |
| 31 | r226 | r308 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 20 | 5 | 4 | 1 | 2 | 2 | r2 | no | no | no |
| r2 | 6 | 4 | 24 | 5 | 2 | 3 | 1 | 1 | r60 | no | no | yes |
| r60 | 17 | 3 | 32 | 7 | 3 | 4 | 1 | 1 | r103 | no | no | yes |
| r103 | 20 | 2 | 43 | 5 | 3 | 2 | 2 | 2 | r226 | no | no | no |
| r226 | 26 | 1 | 43 | 4 | 2 | 2 | 1 | 1 | r308 | no | no | yes |
| r308 | 32 | 0 | 40 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

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
| 16 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r60 | yes | yes | yes | yes | no | yes | walk |
| 17 | up | r60 | yes | 3 | 7 | 3 | 4 | 1 | 1 | r60 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 18 | up | r60 | no | 3 | 7 | 3 | 4 | 1 | 1 | r60 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r60 | no | 3 | 7 | 3 | 4 | 1 | 1 | r103 | yes | yes | yes | yes | no | yes | walk |
| 20 | right | r103 | yes | 2 | 5 | 3 | 2 | 2 | 2 | r103 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 |
| 21 | down | r103 | no | 2 | 5 | 3 | 2 | 2 | 2 | r103 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r103 | no | 2 | 5 | 3 | 2 | 2 | 2 | r103 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r103 | no | 2 | 5 | 3 | 2 | 2 | 2 | r103 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r103 | no | 2 | 5 | 3 | 2 | 2 | 2 | r103 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r103 | no | 2 | 5 | 3 | 2 | 2 | 2 | r226 | yes | yes | yes | yes | no | no | walk |
| 26 | up | r226 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r226 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 27 | down | r226 | no | 1 | 4 | 2 | 2 | 1 | 1 | r226 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r226 | no | 1 | 4 | 2 | 2 | 1 | 1 | r226 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r226 | no | 1 | 4 | 2 | 2 | 1 | 1 | r226 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r226 | no | 1 | 4 | 2 | 2 | 1 | 1 | r226 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r226 | no | 1 | 4 | 2 | 2 | 1 | 1 | r308 | yes | yes | yes | yes | no | yes | walk |
| 32 | up | r308 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 33 | up | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | r308 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r308 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

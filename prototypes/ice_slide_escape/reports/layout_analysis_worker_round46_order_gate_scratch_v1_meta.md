# Level Analysis: worker_round46_order_gate_scratch_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: worker_round46_order_gate_scratch_v1_meta
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
####II#..I..###########
####.......############
####**.##..############
##########@############
```

## Shortest Solution

- Found: yes
- Cost: 47
- Depth: 47
- Explored states: 13117
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
####II#..I..###########
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
.....*...+...##........
####..###..############
####II#..I..###########
####.......############
####**.##..############
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
####II#..I..###########
####@......############
####**.##..############
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
####@I#..I..###########
####.......############
####**.##..############
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
####.I#..I..###########
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
####I##################
.....+...G.............
####..###..############
####.I#..I..###########
####.......############
####**.##..############
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
####.I#..I..###########
####.@.....############
####**.##..############
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
####.@#..I..###########
####.......############
####**.##..############
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
####..#..I..###########
####.....@.############
####**.##..############
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
####..#..@..###########
####.......############
####**.##..############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 13410
- Legal transitions: 32083
- Event-only illegal transitions: 2181
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 13410
- Legal transitions: 32083
- Budget: maxStates=120000
- Compressed regions: 410
- Bidirectional transitions: 30788
- Commitment transitions: 1295
- Winning regions: 2
- Initial region: r0, states=20, dist=5, internalBidirectional=42, commitments=7, viableCommitments=4, deadCommitments=3, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r3@6 -> r82@17 -> r138@20 -> r274@26 -> r369@32
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=410, edges=1231, winReachable=42, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=31, mergingWinSccs=31
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=20, dist=5, out=7, winOut=4, deadOut=3
- SCC path: s0@0 -> s135@6 -> s146@17 -> s155@20 -> s245@26 -> s248@32

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 20 | 7 | 4 | 3 | 0 | 0 | s135 | no |
| s135 | 6 | 4 | 24 | 7 | 2 | 5 | 1 | 1 | s146 | no |
| s146 | 17 | 3 | 32 | 9 | 3 | 6 | 2 | 2 | s155 | no |
| s155 | 20 | 2 | 43 | 7 | 3 | 4 | 1 | 1 | s245 | no |
| s245 | 26 | 1 | 43 | 6 | 2 | 4 | 2 | 2 | s248 | no |
| s248 | 32 | 0 | 40 | 3 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s135 | 20 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s135 | 6 | 17 | s146 | 24 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s146 | 17 | 20 | s155 | 32 | no | no | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 | has_reposition_room |
| s155 | 20 | 26 | s245 | 43 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s245 | 26 | 32 | s248 | 43 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=13410, regions=410, solution commitments=5
- Opening: commitments=7, viable=4, dead=3, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=0/5
- Endgame tail: 15 step(s) after first entering a winning region
- Reading hints: 15 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r3 | 5 | 4 | 3 | 2 | multiple optimal choices |
| 16 | r3 | r82 | 4 | 2 | 5 | 1 | forced optimal |
| 19 | r82 | r138 | 3 | 3 | 6 | 1 | forced optimal |
| 25 | r138 | r274 | 2 | 3 | 4 | 2 | multiple optimal choices |
| 31 | r274 | r369 | 1 | 2 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 20 | 7 | 4 | 3 | 2 | 2 | r3 | no | no | no |
| r3 | 6 | 4 | 24 | 7 | 2 | 5 | 1 | 1 | r82 | no | no | yes |
| r82 | 17 | 3 | 32 | 9 | 3 | 6 | 1 | 1 | r138 | no | no | yes |
| r138 | 20 | 2 | 43 | 7 | 3 | 4 | 2 | 2 | r274 | no | no | no |
| r274 | 26 | 1 | 43 | 6 | 2 | 4 | 1 | 1 | r369 | no | no | yes |
| r369 | 32 | 0 | 40 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 7 | 4 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 5 | 7 | 4 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 5 | 7 | 4 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 5 | 7 | 4 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 5 | 7 | 4 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 5 | 7 | 4 | 3 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 6 | left | r3 | yes | 4 | 7 | 2 | 5 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 7 | down | r3 | no | 4 | 7 | 2 | 5 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r3 | no | 4 | 7 | 2 | 5 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r3 | no | 4 | 7 | 2 | 5 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r3 | no | 4 | 7 | 2 | 5 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r3 | no | 4 | 7 | 2 | 5 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r3 | no | 4 | 7 | 2 | 5 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r3 | no | 4 | 7 | 2 | 5 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r3 | no | 4 | 7 | 2 | 5 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r3 | no | 4 | 7 | 2 | 5 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r3 | no | 4 | 7 | 2 | 5 | 1 | 1 | r82 | yes | yes | yes | yes | no | yes | walk |
| 17 | up | r82 | yes | 3 | 9 | 3 | 6 | 1 | 1 | r82 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 18 | up | r82 | no | 3 | 9 | 3 | 6 | 1 | 1 | r82 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r82 | no | 3 | 9 | 3 | 6 | 1 | 1 | r138 | yes | yes | yes | yes | no | yes | walk |
| 20 | right | r138 | yes | 2 | 7 | 3 | 4 | 2 | 2 | r138 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 |
| 21 | down | r138 | no | 2 | 7 | 3 | 4 | 2 | 2 | r138 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r138 | no | 2 | 7 | 3 | 4 | 2 | 2 | r138 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r138 | no | 2 | 7 | 3 | 4 | 2 | 2 | r138 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r138 | no | 2 | 7 | 3 | 4 | 2 | 2 | r138 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r138 | no | 2 | 7 | 3 | 4 | 2 | 2 | r274 | yes | yes | yes | yes | no | no | walk |
| 26 | up | r274 | yes | 1 | 6 | 2 | 4 | 1 | 1 | r274 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 27 | down | r274 | no | 1 | 6 | 2 | 4 | 1 | 1 | r274 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r274 | no | 1 | 6 | 2 | 4 | 1 | 1 | r274 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r274 | no | 1 | 6 | 2 | 4 | 1 | 1 | r274 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r274 | no | 1 | 6 | 2 | 4 | 1 | 1 | r274 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r274 | no | 1 | 6 | 2 | 4 | 1 | 1 | r369 | yes | yes | yes | yes | no | yes | walk |
| 32 | up | r369 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 33 | up | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | r369 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r369 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

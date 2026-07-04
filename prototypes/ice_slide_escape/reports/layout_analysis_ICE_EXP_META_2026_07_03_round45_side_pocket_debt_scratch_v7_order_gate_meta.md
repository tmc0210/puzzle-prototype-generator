# Level Analysis: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v7_order_gate_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v7_order_gate_meta
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
####...##..############
####**.##..############
##########@############
```

## Shortest Solution

- Found: yes
- Cost: 47
- Depth: 47
- Explored states: 13958
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
####...##@.############
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
####..###I.############
####II...@..###########
####...##..############
####**.##..############
##########.############
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
.....*...+...##........
####..###I.############
####II......###########
####...##..############
####**.##..############
##########.############
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
####@..##..############
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
####..###I.############
####@I......###########
####...##..############
####**.##..############
##########.############
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
####I##################
.....+...G.............
####..###I.############
####.I......###########
####...##..############
####**.##..############
##########.############
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
####.@.##..############
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
####..###I.############
####.@......###########
####...##..############
####**.##..############
##########.############
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
####I##################
.....*...*.............
####..###@.############
####........###########
####...##..############
####**.##..############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 14607
- Legal transitions: 34327
- Event-only illegal transitions: 2303
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 14607
- Legal transitions: 34327
- Budget: maxStates=120000
- Compressed regions: 424
- Bidirectional transitions: 33052
- Commitment transitions: 1275
- Winning regions: 2
- Initial region: r0, states=12, dist=6, internalBidirectional=24, commitments=4, viableCommitments=1, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@4 -> r7@8 -> r111@19 -> r197@22 -> r326@28 -> r379@33
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=424, edges=1186, winReachable=25, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=1/6, branchingWinSccs=16, mergingWinSccs=15
- Handoff scriptiness: scope=returned_solution, scripted=0/6, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=12, dist=6, out=4, winOut=1, deadOut=3
- SCC path: s0@0 -> s1@4 -> s53@8 -> s54@19 -> s62@22 -> s96@28 -> s97@33

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 12 | 4 | 1 | 3 | 0 | 0 | s1 | yes |
| s1 | 4 | 5 | 19 | 3 | 3 | 0 | 1 | 1 | s53 | no |
| s53 | 8 | 4 | 23 | 5 | 2 | 3 | 1 | 1 | s54 | no |
| s54 | 19 | 3 | 31 | 9 | 3 | 6 | 2 | 2 | s62 | no |
| s62 | 22 | 2 | 42 | 7 | 3 | 4 | 1 | 1 | s96 | no |
| s96 | 28 | 1 | 42 | 4 | 2 | 2 | 2 | 2 | s97 | no |
| s97 | 33 | 0 | 39 | 3 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s1 | 12 | no | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s1 | 4 | 8 | s53 | 19 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s53 | 8 | 19 | s54 | 23 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s54 | 19 | 22 | s62 | 31 | no | no | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 | has_reposition_room |
| s62 | 22 | 28 | s96 | 42 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s96 | 28 | 33 | s97 | 42 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=14607, regions=424, solution commitments=6
- Opening: commitments=4, viable=1, dead=3, optimal=1
- Win-continuation prefix: viable prefix=1/6, optimal prefix=1/6, forced viable commitments=1/6
- Endgame tail: 14 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; 14 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r2 | 6 | 1 | 3 | 1 | forced optimal |
| 7 | r2 | r7 | 5 | 3 | 0 | 2 | multiple optimal choices |
| 18 | r7 | r111 | 4 | 2 | 3 | 1 | forced optimal |
| 21 | r111 | r197 | 3 | 3 | 6 | 1 | forced optimal |
| 27 | r197 | r326 | 2 | 3 | 4 | 2 | multiple optimal choices |
| 32 | r326 | r379 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 12 | 4 | 1 | 3 | 1 | 1 | r2 | no | yes | yes |
| r2 | 4 | 5 | 19 | 3 | 3 | 0 | 2 | 2 | r7 | no | no | no |
| r7 | 8 | 4 | 23 | 5 | 2 | 3 | 1 | 1 | r111 | no | no | yes |
| r111 | 19 | 3 | 31 | 9 | 3 | 6 | 1 | 1 | r197 | no | no | yes |
| r197 | 22 | 2 | 42 | 7 | 3 | 4 | 2 | 2 | r326 | no | no | no |
| r326 | 28 | 1 | 42 | 4 | 2 | 2 | 1 | 1 | r379 | no | no | yes |
| r379 | 33 | 0 | 39 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 6 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 6 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 6 | 4 | 1 | 3 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 4 | up | r2 | yes | 5 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 5 | right | r2 | no | 5 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r2 | no | 5 | 3 | 3 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 5 | 3 | 3 | 0 | 2 | 2 | r7 | yes | yes | yes | yes | no | no | walk |
| 8 | left | r7 | yes | 4 | 5 | 2 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 9 | right | r7 | no | 4 | 5 | 2 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r7 | no | 4 | 5 | 2 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r7 | no | 4 | 5 | 2 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r7 | no | 4 | 5 | 2 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r7 | no | 4 | 5 | 2 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r7 | no | 4 | 5 | 2 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r7 | no | 4 | 5 | 2 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r7 | no | 4 | 5 | 2 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r7 | no | 4 | 5 | 2 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r7 | no | 4 | 5 | 2 | 3 | 1 | 1 | r111 | yes | yes | yes | yes | no | yes | walk |
| 19 | up | r111 | yes | 3 | 9 | 3 | 6 | 1 | 1 | r111 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 20 | up | r111 | no | 3 | 9 | 3 | 6 | 1 | 1 | r111 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r111 | no | 3 | 9 | 3 | 6 | 1 | 1 | r197 | yes | yes | yes | yes | no | yes | walk |
| 22 | right | r197 | yes | 2 | 7 | 3 | 4 | 2 | 2 | r197 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 |
| 23 | down | r197 | no | 2 | 7 | 3 | 4 | 2 | 2 | r197 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r197 | no | 2 | 7 | 3 | 4 | 2 | 2 | r197 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r197 | no | 2 | 7 | 3 | 4 | 2 | 2 | r197 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r197 | no | 2 | 7 | 3 | 4 | 2 | 2 | r197 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r197 | no | 2 | 7 | 3 | 4 | 2 | 2 | r326 | yes | yes | yes | yes | no | no | walk |
| 28 | up | r326 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r326 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 29 | right | r326 | no | 1 | 4 | 2 | 2 | 1 | 1 | r326 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r326 | no | 1 | 4 | 2 | 2 | 1 | 1 | r326 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r326 | no | 1 | 4 | 2 | 2 | 1 | 1 | r326 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r326 | no | 1 | 4 | 2 | 2 | 1 | 1 | r379 | yes | yes | yes | yes | no | yes | walk |
| 33 | up | r379 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 34 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | r379 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r379 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

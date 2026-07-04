# Level Analysis: ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v19_lower_key_connected_probe_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v19_lower_key_connected_probe_meta
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
####II#.#I..###########
####....#..############
####**.....############
##########@.###########
```

## Shortest Solution

- Found: yes
- Cost: 51
- Depth: 51
- Explored states: 12157
- Inputs: up up up up up left down right down down down left left left up left left left up up up right down left down down right up down right down right right right up up up right up right right right right right right right right right right right right
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=46, push_ice=5, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=1, ice_rebound_d4=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_boundary_disappear:d8=1, ice_stop_short:d2=2

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
####II#.#I..###########
####....#..############
####**.....############
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
####..###..############
####II#.#I..###########
####....#..############
####**.....############
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
####..###..############
####II#.#I..###########
####@...#..############
####**.....############
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
####..###..############
####@I#.#I..###########
####....#..############
####**.....############
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
####..###..############
####.I#.#I..###########
####....#..############
####**.....############
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
####..###..############
####.I#.#I..###########
####....#..############
####**.....############
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
####..###..############
####.I#.#I..###########
####.@..#..############
####**.....############
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
####..###..############
####.@#.#I..###########
####....#..############
####**.....############
##########..###########
```

### Step 36: up

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
####..#.#I..###########
####....#@.############
####**.....############
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
####..###..############
####..#.#@..###########
####....#..############
####**.....############
##########..###########
```


## Graph Facts

- Status: complete
- Reachable states: 13328
- Legal transitions: 31153
- Event-only illegal transitions: 1964
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 13328
- Legal transitions: 31153
- Budget: maxStates=120000
- Compressed regions: 407
- Bidirectional transitions: 29904
- Commitment transitions: 1249
- Winning regions: 2
- Initial region: r0, states=21, dist=5, internalBidirectional=44, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@6 -> r58@19 -> r90@22 -> r181@28 -> r320@36
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=407, edges=1191, winReachable=42, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=31, mergingWinSccs=31
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=21, dist=5, out=5, winOut=4, deadOut=1
- SCC path: s0@0 -> s131@6 -> s136@19 -> s146@22 -> s241@28 -> s243@36

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 21 | 5 | 4 | 1 | 0 | 0 | s131 | no |
| s131 | 6 | 4 | 25 | 5 | 2 | 3 | 1 | 1 | s136 | no |
| s136 | 19 | 3 | 33 | 7 | 3 | 4 | 2 | 2 | s146 | no |
| s146 | 22 | 2 | 44 | 5 | 3 | 2 | 1 | 1 | s241 | no |
| s241 | 28 | 1 | 44 | 4 | 2 | 2 | 2 | 2 | s243 | no |
| s243 | 36 | 0 | 41 | 3 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s131 | 21 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s131 | 6 | 19 | s136 | 25 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s136 | 19 | 22 | s146 | 33 | no | no | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 | has_reposition_room |
| s146 | 22 | 28 | s241 | 44 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s241 | 28 | 36 | s243 | 44 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=13328, regions=407, solution commitments=5
- Opening: commitments=5, viable=4, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=0/5
- Endgame tail: 15 step(s) after first entering a winning region
- Reading hints: 15 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r2 | 5 | 4 | 1 | 2 | multiple optimal choices |
| 18 | r2 | r58 | 4 | 2 | 3 | 1 | forced optimal |
| 21 | r58 | r90 | 3 | 3 | 4 | 1 | forced optimal |
| 27 | r90 | r181 | 2 | 3 | 2 | 2 | multiple optimal choices |
| 35 | r181 | r320 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 21 | 5 | 4 | 1 | 2 | 2 | r2 | no | no | no |
| r2 | 6 | 4 | 25 | 5 | 2 | 3 | 1 | 1 | r58 | no | no | yes |
| r58 | 19 | 3 | 33 | 7 | 3 | 4 | 1 | 1 | r90 | no | no | yes |
| r90 | 22 | 2 | 44 | 5 | 3 | 2 | 2 | 2 | r181 | no | no | no |
| r181 | 28 | 1 | 44 | 4 | 2 | 2 | 1 | 1 | r320 | no | no | yes |
| r320 | 36 | 0 | 41 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

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
| 11 | down | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r2 | no | 4 | 5 | 2 | 3 | 1 | 1 | r58 | yes | yes | yes | yes | no | yes | walk |
| 19 | up | r58 | yes | 3 | 7 | 3 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 20 | up | r58 | no | 3 | 7 | 3 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r58 | no | 3 | 7 | 3 | 4 | 1 | 1 | r90 | yes | yes | yes | yes | no | yes | walk |
| 22 | right | r90 | yes | 2 | 5 | 3 | 2 | 2 | 2 | r90 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 |
| 23 | down | r90 | no | 2 | 5 | 3 | 2 | 2 | 2 | r90 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r90 | no | 2 | 5 | 3 | 2 | 2 | 2 | r90 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r90 | no | 2 | 5 | 3 | 2 | 2 | 2 | r90 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r90 | no | 2 | 5 | 3 | 2 | 2 | 2 | r90 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r90 | no | 2 | 5 | 3 | 2 | 2 | 2 | r181 | yes | yes | yes | yes | no | no | walk |
| 28 | up | r181 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r181 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 29 | down | r181 | no | 1 | 4 | 2 | 2 | 1 | 1 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r181 | no | 1 | 4 | 2 | 2 | 1 | 1 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | down | r181 | no | 1 | 4 | 2 | 2 | 1 | 1 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r181 | no | 1 | 4 | 2 | 2 | 1 | 1 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r181 | no | 1 | 4 | 2 | 2 | 1 | 1 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r181 | no | 1 | 4 | 2 | 2 | 1 | 1 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r181 | no | 1 | 4 | 2 | 2 | 1 | 1 | r320 | yes | yes | yes | yes | no | yes | walk |
| 36 | up | r320 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 37 | up | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | up | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 49 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 50 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | r320 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | right | r320 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

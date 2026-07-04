# Level Analysis: worker_round47_non_BC_internal_d6_v2_meta

## Summary

- Prototype: ice_slide_escape
- Title: worker_round47_non_BC_internal_d6_v2_meta
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
.....I...*...##........
####.####..############
####II#.#I..###########
####.......############
####**.##..############
#########@.############
```

## Shortest Solution

- Found: yes
- Cost: 44
- Depth: 44
- Explored states: 1457
- Inputs: up up up right up up left right down down down left left left left left left up up up right right right right right right down down left up right up right right right right right right right right right right right right
- Events: walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=39, push_ice=5, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=2, ice_destroyed_d3=1, ice_rebound_d4=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_boundary_disappear:d8=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....I...*...##........
####.####..############
####II#.#I..###########
####.....@.############
####**.##..############
#########..############
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....I...*...##........
####.####I.############
####II#.#@..###########
####.......############
####**.##..############
#########..############
```

### Step 7: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....I...*@..##........
####.####I.############
####II#.#...###########
####.......############
####**.##..############
#########..############
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....I...+...##........
####.####I.############
####II#.#...###########
####.......############
####**.##..############
#########..############
```

### Step 18: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....I...G...##........
####.####I.############
####II#.#...###########
####@......############
####**.##..############
#########..############
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.....I...G...##........
####.####I.############
####@I#.#...###########
####.......############
####**.##..############
#########..############
```

### Step 21: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8

Before:

```text
#######################
#######################
#######################
####.##################
####I##################
....@I...G...##........
####.####I.############
####.I#.#...###########
####.......############
####**.##..############
#########..############
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.....@...G.............
####.####I.############
####.I#.#...###########
####.......############
####**.##..############
#########..############
```

### Step 30: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
#######################
#######################
#######################
####.##################
####I##################
.........G.............
####.####I.############
####.I#.#@..###########
####.......############
####**.##..############
#########..############
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.........*.............
####.####@.############
####.I#.#...###########
####.......############
####**.##..############
#########..############
```


## Graph Facts

- Status: complete
- Reachable states: 1463
- Legal transitions: 3301
- Event-only illegal transitions: 285
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1463
- Legal transitions: 3301
- Budget: maxStates=120000
- Compressed regions: 46
- Bidirectional transitions: 3178
- Commitment transitions: 123
- Winning regions: 2
- Initial region: r0, states=20, dist=4, internalBidirectional=42, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@3 -> r2@7 -> r28@18 -> r38@21 -> r44@30
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=46, edges=115, winReachable=18, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=9, mergingWinSccs=10
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=20, dist=4, out=4, winOut=3, deadOut=1
- SCC path: s0@0 -> s14@3 -> s19@7 -> s20@18 -> s21@21 -> s22@30

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 20 | 4 | 3 | 1 | 0 | 0 | s14 | no |
| s14 | 3 | 4 | 20 | 2 | 2 | 0 | 1 | 1 | s19 | no |
| s19 | 7 | 3 | 24 | 4 | 1 | 3 | 1 | 1 | s20 | yes |
| s20 | 18 | 2 | 31 | 5 | 2 | 3 | 2 | 2 | s21 | no |
| s21 | 21 | 1 | 42 | 3 | 2 | 1 | 1 | 1 | s22 | no |
| s22 | 30 | 0 | 42 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s14 | 20 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s14 | 3 | 7 | s19 | 20 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s19 | 7 | 18 | s20 | 24 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s20 | 18 | 21 | s21 | 31 | no | no | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 | has_reposition_room |
| s21 | 21 | 30 | s22 | 42 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1463, regions=46, solution commitments=5
- Opening: commitments=4, viable=3, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 14 step(s) after first entering a winning region
- Reading hints: 14 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 4 | 3 | 1 | 2 | multiple optimal choices |
| 6 | r1 | r2 | 4 | 2 | 0 | 2 | multiple optimal choices |
| 17 | r2 | r28 | 3 | 1 | 3 | 1 | forced optimal |
| 20 | r28 | r38 | 2 | 2 | 3 | 1 | forced optimal |
| 29 | r38 | r44 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 20 | 4 | 3 | 1 | 2 | 2 | r1 | no | no | no |
| r1 | 3 | 4 | 20 | 2 | 2 | 0 | 2 | 2 | r2 | no | no | no |
| r2 | 7 | 3 | 24 | 4 | 1 | 3 | 1 | 1 | r28 | no | yes | yes |
| r28 | 18 | 2 | 31 | 5 | 2 | 3 | 1 | 1 | r38 | no | no | yes |
| r38 | 21 | 1 | 42 | 3 | 2 | 1 | 1 | 1 | r44 | no | no | yes |
| r44 | 30 | 0 | 42 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r1 | yes | yes | no | no | no | no | walk |
| 3 | up | r1 | yes | 4 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 4 | right | r1 | no | 4 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r1 | no | 4 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r1 | no | 4 | 2 | 2 | 0 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 7 | left | r2 | yes | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 8 | right | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r28 | yes | yes | yes | yes | yes | yes | walk |
| 18 | up | r28 | yes | 2 | 5 | 2 | 3 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 19 | up | r28 | no | 2 | 5 | 2 | 3 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r28 | no | 2 | 5 | 2 | 3 | 1 | 1 | r38 | yes | yes | yes | yes | no | yes | walk |
| 21 | right | r38 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 |
| 22 | right | r38 | no | 1 | 3 | 2 | 1 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r38 | no | 1 | 3 | 2 | 1 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r38 | no | 1 | 3 | 2 | 1 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r38 | no | 1 | 3 | 2 | 1 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r38 | no | 1 | 3 | 2 | 1 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r38 | no | 1 | 3 | 2 | 1 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r38 | no | 1 | 3 | 2 | 1 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r38 | no | 1 | 3 | 2 | 1 | 1 | 1 | r44 | yes | yes | yes | yes | no | yes | walk |
| 30 | up | r44 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 31 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | up | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | r44 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r44 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

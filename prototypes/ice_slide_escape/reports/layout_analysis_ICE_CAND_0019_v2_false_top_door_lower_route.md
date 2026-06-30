# Level Analysis: ICE_CAND_0019_v2_false_top_door_lower_route

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0019_v2_false_top_door_lower_route
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
################
#...GG.I.....I.#
#.#.#..I######.#
#..#...*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#...I..#########
@.......########
################
```

## Shortest Solution

- Found: yes
- Cost: 43
- Depth: 43
- Explored states: 21839
- Inputs: right right right right up up right right right up up left up up right right right right right right right right up up left left left left left left left down up right right right right right right right down down right
- Events: walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=37, push_ice=6, ice_pass_through_d5:len1=2, slide_restart_after_group=2, ice_stop_short:d1=3, ice_blocks_ice_no_chain_push=5, ice_stop_short:d2=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
################
#...GG.I.....I.#
#.#.#..I######.#
#..#...*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#...I..#########
....@...########
################
```

After:

```text
################
#...*G.I.....I.#
#.#.#..I######.#
#..#...*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#...@..#########
........########
################
```

### Step 10: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
################
#...*G.I.....I.#
#.#.#..I######.#
#..#...*.......#
#..#....########
#..#....########
#..#...I########
#..#...@########
#......#########
........########
################
```

After:

```text
################
#...*G.I.....I.#
#.#.#..I######.#
#..#...*.......#
#..#...I########
#..#....########
#..#...@########
#..#....########
#......#########
........########
################
```

### Step 15: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
################
#...*G.I.....I.#
#.#.#..I######.#
#..#..@*.......#
#..#...I########
#..#....########
#..#....########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...*G.I.....I.#
#.#.#..I######.#
#..#...+........
#..#...I########
#..#....########
#..#....########
#..#....########
#......#########
........########
################
```

### Step 25: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
################
#...*G.I.....I@#
#.#.#..I######.#
#..#...G........
#..#...I########
#..#....########
#..#....########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...**.I.....@.#
#.#.#..I######.#
#..#...G........
#..#...I########
#..#....########
#..#....########
#..#....########
#......#########
........########
################
```

### Step 31: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
################
#...**.I@......#
#.#.#..I######.#
#..#...G........
#..#...I########
#..#....########
#..#....########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...**I@.......#
#.#.#..I######.#
#..#...G........
#..#...I########
#..#....########
#..#....########
#..#....########
#......#########
........########
################
```

### Step 32: down

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
################
#...**I@.......#
#.#.#..I######.#
#..#...G........
#..#...I########
#..#....########
#..#....########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...**I........#
#.#.#..@######.#
#..#...*........
#..#...I########
#..#....########
#..#....########
#..#....########
#......#########
........########
################
```


## Graph Facts

- Status: complete
- Reachable states: 50528
- Legal transitions: 140744
- Event-only illegal transitions: 2502
- Winning states: 7
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 50528
- Legal transitions: 140744
- Budget: maxStates=100000
- Compressed regions: 757
- Bidirectional transitions: 138362
- Commitment transitions: 2382
- Winning regions: 7
- Initial region: r0, states=51, dist=6, internalBidirectional=142, commitments=8, viableCommitments=3, deadCommitments=5, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@5 -> r8@10 -> r30@15 -> r187@25 -> r277@31 -> r285@32
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=696, edges=1997, winReachable=29, winning=7, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=0/6, branchingWinSccs=8, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=1/6, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=51, dist=6, out=8, winOut=3, deadOut=5
- SCC path: s0@0 -> s488@5 -> s543@10 -> s544@15 -> s545@25 -> s557@31 -> s561@32

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 51 | 8 | 3 | 5 | 0 | 0 | s488 | no |
| s488 | 5 | 5 | 51 | 6 | 2 | 4 | 1 | 1 | s543 | no |
| s543 | 10 | 4 | 51 | 4 | 1 | 3 | 2 | 2 | s544 | yes |
| s544 | 15 | 3 | 62 | 6 | 1 | 5 | 2 | 2 | s545 | yes |
| s545 | 25 | 2 | 67 | 4 | 3 | 1 | 1 | 1 | s557 | no |
| s557 | 31 | 1 | 67 | 4 | 1 | 3 | 1 | 1 | s561 | yes |
| s561 | 32 | 0 | 67 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s488 | 51 | no | no | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s488 | 5 | 10 | s543 | 51 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s543 | 10 | 15 | s544 | 51 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |
| s544 | 15 | 25 | s545 | 62 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s545 | 25 | 31 | s557 | 67 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s557 | 31 | 32 | s561 | 67 | yes | yes | down | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=50528, regions=757, solution commitments=6
- Opening: commitments=8, viable=3, dead=5, optimal=2
- Win-continuation prefix: viable prefix=0/6, optimal prefix=0/6, forced viable commitments=3/6
- Endgame tail: 11 step(s) after first entering a winning region
- Reading hints: 11 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r2 | 6 | 3 | 5 | 2 | multiple optimal choices |
| 9 | r2 | r8 | 5 | 2 | 4 | 1 | forced optimal |
| 14 | r8 | r30 | 4 | 1 | 3 | 1 | forced optimal |
| 24 | r30 | r187 | 3 | 1 | 5 | 1 | forced optimal |
| 30 | r187 | r277 | 2 | 3 | 1 | 3 | multiple optimal choices |
| 31 | r277 | r285 | 1 | 1 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 51 | 8 | 3 | 5 | 2 | 2 | r2 | no | no | no |
| r2 | 5 | 5 | 51 | 6 | 2 | 4 | 1 | 1 | r8 | no | no | yes |
| r8 | 10 | 4 | 51 | 4 | 1 | 3 | 1 | 1 | r30 | no | yes | yes |
| r30 | 15 | 3 | 62 | 6 | 1 | 5 | 1 | 1 | r187 | no | yes | yes |
| r187 | 25 | 2 | 67 | 4 | 3 | 1 | 3 | 3 | r277 | no | no | no |
| r277 | 31 | 1 | 67 | 4 | 1 | 3 | 1 | 1 | r285 | no | yes | yes |
| r285 | 32 | 0 | 67 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 8 | 3 | 5 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 6 | 8 | 3 | 5 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 6 | 8 | 3 | 5 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 6 | 8 | 3 | 5 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 6 | 8 | 3 | 5 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 5 | up | r2 | yes | 5 | 6 | 2 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 6 | up | r2 | no | 5 | 6 | 2 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r2 | no | 5 | 6 | 2 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r2 | no | 5 | 6 | 2 | 4 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r2 | no | 5 | 6 | 2 | 4 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | walk |
| 10 | up | r8 | yes | 4 | 4 | 1 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 11 | up | r8 | no | 4 | 4 | 1 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r8 | no | 4 | 4 | 1 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r8 | no | 4 | 4 | 1 | 3 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r8 | no | 4 | 4 | 1 | 3 | 1 | 1 | r30 | yes | yes | yes | yes | yes | yes | walk |
| 15 | right | r30 | yes | 3 | 6 | 1 | 5 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 16 | right | r30 | no | 3 | 6 | 1 | 5 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r30 | no | 3 | 6 | 1 | 5 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r30 | no | 3 | 6 | 1 | 5 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r30 | no | 3 | 6 | 1 | 5 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r30 | no | 3 | 6 | 1 | 5 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r30 | no | 3 | 6 | 1 | 5 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r30 | no | 3 | 6 | 1 | 5 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r30 | no | 3 | 6 | 1 | 5 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r30 | no | 3 | 6 | 1 | 5 | 1 | 1 | r187 | yes | yes | yes | yes | yes | yes | walk |
| 25 | left | r187 | yes | 2 | 4 | 3 | 1 | 3 | 3 | r187 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 26 | left | r187 | no | 2 | 4 | 3 | 1 | 3 | 3 | r187 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r187 | no | 2 | 4 | 3 | 1 | 3 | 3 | r187 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r187 | no | 2 | 4 | 3 | 1 | 3 | 3 | r187 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r187 | no | 2 | 4 | 3 | 1 | 3 | 3 | r187 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r187 | no | 2 | 4 | 3 | 1 | 3 | 3 | r277 | yes | yes | yes | yes | no | no | walk |
| 31 | left | r277 | yes | 1 | 4 | 1 | 3 | 1 | 1 | r285 | yes | yes | yes | yes | yes | yes | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 32 | down | r285 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 33 | up | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | down | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | down | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | r285 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r285 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

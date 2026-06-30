# Level Analysis: ICE_CAND_0019_probe_remove_d_target

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0019_probe_remove_d_target
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
################
#...GGGI.....I.#
#.#.#..I######.#
#..#...I.......#
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
- Cost: 39
- Depth: 39
- Explored states: 17355
- Inputs: right right right right up up up up up up right right right right right right right right right right up up left left left left left left left down down right right right right right right right right
- Events: walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk
- Event counts: walk=34, push_ice=5, ice_pass_through_d5:len1=2, slide_restart_after_group=2, ice_stop_short:d1=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_blocks_ice_no_chain_push=4, ice_stop_short:d2=1, ice_destroyed_d3=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
################
#...GGGI.....I.#
#.#.#..I######.#
#..#...I.......#
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
#...*GGI.....I.#
#.#.#..I######.#
#..#...I.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#...@..#########
........########
################
```

### Step 13: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
################
#...*GGI.....I.#
#.#.#..I######.#
#..#..@I.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...*GGI.....I.#
#.#.#..I######.#
#..#...@........
#..#....########
#..#....########
#..#...I########
#..#....########
#......#########
........########
################
```

### Step 23: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
################
#...*GGI.....I@#
#.#.#..I######.#
#..#............
#..#....########
#..#....########
#..#...I########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...**GI.....@.#
#.#.#..I######.#
#..#............
#..#....########
#..#....########
#..#...I########
#..#....########
#......#########
........########
################
```

### Step 29: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
################
#...**GI@......#
#.#.#..I######.#
#..#............
#..#....########
#..#....########
#..#...I########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...***@.......#
#.#.#..I######.#
#..#............
#..#....########
#..#....########
#..#...I########
#..#....########
#......#########
........########
################
```

### Step 30: down

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
################
#...***@.......#
#.#.#..I######.#
#..#............
#..#....########
#..#....########
#..#...I########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...***........#
#.#.#..@######.#
#..#............
#..#....########
#..#....########
#..#...I########
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
- Winning states: 32
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
- Winning regions: 32
- Initial region: r0, states=51, dist=4, internalBidirectional=142, commitments=8, viableCommitments=4, deadCommitments=4, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@5 -> r18@13 -> r142@23 -> r252@29 -> r267@30
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=696, edges=1997, winReachable=105, winning=31, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=39, mergingWinSccs=47
- Handoff scriptiness: scope=returned_solution, scripted=1/5, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=51, dist=4, out=8, winOut=4, deadOut=4
- SCC path: s0@0 -> s488@5 -> s496@13 -> s497@23 -> s503@29 -> s505@30

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 51 | 8 | 4 | 4 | 0 | 0 | s488 | no |
| s488 | 5 | 3 | 51 | 6 | 3 | 3 | 1 | 1 | s496 | no |
| s496 | 13 | 2 | 62 | 6 | 3 | 3 | 2 | 2 | s497 | no |
| s497 | 23 | 1 | 67 | 4 | 4 | 0 | 1 | 1 | s503 | no |
| s503 | 29 | 0 | 67 | 4 | 0 | 0 | 1 | 1 | s505 | no |
| s505 | 30 | 0 | 68 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s488 | 51 | no | no | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s488 | 5 | 13 | s496 | 51 | no | no | right | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |
| s496 | 13 | 23 | s497 | 62 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s497 | 23 | 29 | s503 | 67 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s503 | 29 | 30 | s505 | 67 | yes | no | down | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=50528, regions=757, solution commitments=5
- Opening: commitments=8, viable=4, dead=4, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=0/5
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r2 | 4 | 4 | 4 | 2 | multiple optimal choices |
| 12 | r2 | r18 | 3 | 3 | 3 | 1 | forced optimal |
| 22 | r18 | r142 | 2 | 3 | 3 | 1 | forced optimal |
| 28 | r142 | r252 | 1 | 4 | 0 | 1 | forced optimal |
| 29 | r252 | r267 | 0 | 4 | 0 | 0 | multiple viable choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 51 | 8 | 4 | 4 | 2 | 2 | r2 | no | no | no |
| r2 | 5 | 3 | 51 | 6 | 3 | 3 | 1 | 1 | r18 | no | no | yes |
| r18 | 13 | 2 | 62 | 6 | 3 | 3 | 1 | 1 | r142 | no | no | yes |
| r142 | 23 | 1 | 67 | 4 | 4 | 0 | 1 | 1 | r252 | no | no | yes |
| r252 | 29 | 0 | 67 | 4 | 4 | 0 | 0 | 0 | r267 | no | no | no |
| r267 | 30 | 0 | 68 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 8 | 4 | 4 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 8 | 4 | 4 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 8 | 4 | 4 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 8 | 4 | 4 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 8 | 4 | 4 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 5 | up | r2 | yes | 3 | 6 | 3 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 6 | up | r2 | no | 3 | 6 | 3 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 3 | 6 | 3 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r2 | no | 3 | 6 | 3 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r2 | no | 3 | 6 | 3 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r2 | no | 3 | 6 | 3 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r2 | no | 3 | 6 | 3 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r2 | no | 3 | 6 | 3 | 3 | 1 | 1 | r18 | yes | yes | yes | yes | no | yes | walk |
| 13 | right | r18 | yes | 2 | 6 | 3 | 3 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 14 | right | r18 | no | 2 | 6 | 3 | 3 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r18 | no | 2 | 6 | 3 | 3 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r18 | no | 2 | 6 | 3 | 3 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r18 | no | 2 | 6 | 3 | 3 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r18 | no | 2 | 6 | 3 | 3 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r18 | no | 2 | 6 | 3 | 3 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r18 | no | 2 | 6 | 3 | 3 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r18 | no | 2 | 6 | 3 | 3 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r18 | no | 2 | 6 | 3 | 3 | 1 | 1 | r142 | yes | yes | yes | yes | no | yes | walk |
| 23 | left | r142 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r142 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 24 | left | r142 | no | 1 | 4 | 4 | 0 | 1 | 1 | r142 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r142 | no | 1 | 4 | 4 | 0 | 1 | 1 | r142 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r142 | no | 1 | 4 | 4 | 0 | 1 | 1 | r142 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r142 | no | 1 | 4 | 4 | 0 | 1 | 1 | r142 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r142 | no | 1 | 4 | 4 | 0 | 1 | 1 | r252 | yes | yes | yes | yes | no | yes | walk |
| 29 | left | r252 | yes | 0 | 4 | 4 | 0 | 0 | 0 | r267 | yes | yes | no | no | no | no | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 30 | down | r267 | yes | 0 | 2 | 2 | 0 | 0 | 0 | r267 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 31 | down | r267 | no | 0 | 2 | 2 | 0 | 0 | 0 | r267 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r267 | no | 0 | 2 | 2 | 0 | 0 | 0 | r267 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r267 | no | 0 | 2 | 2 | 0 | 0 | 0 | r267 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r267 | no | 0 | 2 | 2 | 0 | 0 | 0 | r267 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r267 | no | 0 | 2 | 2 | 0 | 0 | 0 | r267 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r267 | no | 0 | 2 | 2 | 0 | 0 | 0 | r267 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r267 | no | 0 | 2 | 2 | 0 | 0 | 0 | r267 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r267 | no | 0 | 2 | 2 | 0 | 0 | 0 | r267 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r267 | no | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

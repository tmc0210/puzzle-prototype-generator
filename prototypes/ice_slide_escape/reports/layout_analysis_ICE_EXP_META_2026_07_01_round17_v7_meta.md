# Level Analysis: ICE_EXP_META_2026_07_01_round17_v7_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round17_v7_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#################
#################
..I.GG#.....I.I.#
#.###..######.#.#
#....I.######.#.#
#......######*I.#
#.###########.#.#
..###########...@
#################
```

## Shortest Solution

- Found: yes
- Cost: 47
- Depth: 47
- Explored states: 2099
- Inputs: left left left up up up up up left right down down down down down right right up up left right up up up left left left left left left left left left down down down left up left left left left up up right left left
- Events: walk walk walk walk push_ice ice_destroyed_d3 walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk
- Event counts: walk=41, push_ice=6, ice_destroyed_d3=3, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=3, ice_stop_short:d1=1, ice_destroy_group_d6_plus:len1=1, ice_stop_short:d2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: up

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
#################
#################
..I.GG#.....I.I.#
#.###..######.#.#
#....I.######.#.#
#......######*I.#
#.###########@#.#
..###########....
#################
```

After:

```text
#################
#################
..I.GG#.....I.I.#
#.###..######.#.#
#....I.######.#.#
#......######+I.#
#.###########.#.#
..###########....
#################
```

### Step 9: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#################
#################
..I.GG#.....I@I.#
#.###..######.#.#
#....I.######.#.#
#......######GI.#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..I.GG#.....@.I.#
#.###..######.#.#
#....I.######.#.#
#......######GI.#
#.###########.#.#
..###########....
#################
```

### Step 20: left

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
#################
#################
..I.GG#.......I.#
#.###..######.#.#
#....I.######.#.#
#......######GI@#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..I.GG#.......I.#
#.###..######.#.#
#....I.######.#.#
#......######*@.#
#.###########.#.#
..###########....
#################
```

### Step 25: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#################
#################
..I.GG#.......I@#
#.###..######.#.#
#....I.######.#.#
#......######*..#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..I.GG........@.#
#.###..######.#.#
#....I.######.#.#
#......######*..#
#.###########.#.#
..###########....
#################
```

### Step 38: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#################
#################
..I.GG..........#
#.###..######.#.#
#....I.######.#.#
#....@.######*..#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..I.G*..........#
#.###..######.#.#
#....@.######.#.#
#......######*..#
#.###########.#.#
..###########....
#################
```

### Step 45: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
#################
#################
.@I.G*..........#
#.###..######.#.#
#......######.#.#
#......######*..#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..@.**..........#
#.###..######.#.#
#......######.#.#
#......######*..#
#.###########.#.#
..###########....
#################
```


## Graph Facts

- Status: complete
- Reachable states: 10985
- Legal transitions: 25682
- Event-only illegal transitions: 487
- Winning states: 1
- Budget: maxStates=200000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 10985
- Legal transitions: 25682
- Budget: maxStates=200000
- Compressed regions: 275
- Bidirectional transitions: 24914
- Commitment transitions: 768
- Winning regions: 1
- Initial region: r0, states=10, dist=6, internalBidirectional=18, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r4@9 -> r19@20 -> r28@25 -> r49@38 -> r111@45
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=239, edges=612, winReachable=10, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=2/6, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=0/6, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=10, dist=6, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@5 -> s14@9 -> s20@20 -> s128@25 -> s192@38 -> s193@45

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 10 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 5 | 5 | 14 | 5 | 1 | 4 | 1 | 1 | s14 | yes |
| s14 | 9 | 4 | 20 | 4 | 2 | 2 | 1 | 1 | s20 | no |
| s20 | 20 | 3 | 11 | 2 | 1 | 1 | 1 | 1 | s128 | yes |
| s128 | 25 | 2 | 88 | 8 | 1 | 7 | 2 | 2 | s192 | yes |
| s192 | 38 | 1 | 42 | 4 | 1 | 3 | 2 | 2 | s193 | yes |
| s193 | 45 | 0 | 44 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 10 | no | yes | up | push_ice, ice_destroyed_d3 | has_reposition_room |
| s1 | 5 | 9 | s14 | 14 | no | yes | left | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s14 | 9 | 20 | s20 | 20 | no | no | left | push_ice, ice_stop_short:d1 | has_reposition_room |
| s20 | 20 | 25 | s128 | 11 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s128 | 25 | 38 | s192 | 88 | no | yes | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s192 | 38 | 45 | s193 | 42 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=10985, regions=275, solution commitments=6
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=2/6, optimal prefix=2/6, forced viable commitments=4/6
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 6 | 1 | 1 | 1 | forced optimal |
| 8 | r1 | r4 | 5 | 1 | 4 | 1 | forced optimal |
| 19 | r4 | r19 | 4 | 2 | 2 | 2 | multiple optimal choices |
| 24 | r19 | r28 | 3 | 1 | 1 | 1 | forced optimal |
| 37 | r28 | r49 | 2 | 2 | 6 | 1 | forced optimal |
| 44 | r49 | r111 | 1 | 1 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 10 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 5 | 5 | 14 | 5 | 1 | 4 | 1 | 1 | r4 | no | yes | yes |
| r4 | 9 | 4 | 20 | 4 | 2 | 2 | 2 | 2 | r19 | no | no | no |
| r19 | 20 | 3 | 11 | 2 | 1 | 1 | 1 | 1 | r28 | no | yes | yes |
| r28 | 25 | 2 | 44 | 8 | 2 | 6 | 1 | 1 | r49 | no | no | yes |
| r49 | 38 | 1 | 42 | 4 | 1 | 3 | 1 | 1 | r111 | no | yes | yes |
| r111 | 45 | 0 | 44 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | up | r1 | yes | 5 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 6 | up | r1 | no | 5 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r1 | no | 5 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 5 | 5 | 1 | 4 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 9 | left | r4 | yes | 4 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 10 | right | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r19 | yes | yes | yes | yes | no | no | walk |
| 20 | left | r19 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 21 | right | r19 | no | 3 | 2 | 1 | 1 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r19 | no | 3 | 2 | 1 | 1 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r19 | no | 3 | 2 | 1 | 1 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r19 | no | 3 | 2 | 1 | 1 | 1 | 1 | r28 | yes | yes | yes | yes | yes | yes | walk |
| 25 | left | r28 | yes | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 26 | left | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | down | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | down | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | left | r28 | no | 2 | 8 | 2 | 6 | 1 | 1 | r49 | yes | yes | yes | yes | no | yes | walk |
| 38 | up | r49 | yes | 1 | 4 | 1 | 3 | 1 | 1 | r49 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 39 | left | r49 | no | 1 | 4 | 1 | 3 | 1 | 1 | r49 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | left | r49 | no | 1 | 4 | 1 | 3 | 1 | 1 | r49 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | left | r49 | no | 1 | 4 | 1 | 3 | 1 | 1 | r49 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | left | r49 | no | 1 | 4 | 1 | 3 | 1 | 1 | r49 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | up | r49 | no | 1 | 4 | 1 | 3 | 1 | 1 | r49 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | up | r49 | no | 1 | 4 | 1 | 3 | 1 | 1 | r111 | yes | yes | yes | yes | yes | yes | walk |
| 45 | right | r111 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r111 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 46 | left | r111 | no | 0 | 2 | 0 | 2 | 0 | 0 | r111 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | left | r111 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

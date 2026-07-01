# Level Analysis: ICE_EXP_META_2026_07_01_round17_v5_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round17_v5_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#################
#################
..I.GG#.....I.I..
#.###..######.#.#
#....I.######.#.#
#......######*I.#
#.###########.#.#
..###########...@
#################
```

## Shortest Solution

- Found: yes
- Cost: 65
- Depth: 65
- Explored states: 7007
- Inputs: left left left up up up up up left right down down down down down right right up up left right up up up left left left left left left left left left down down down left up left left left left up up right left down down right right right right up right up right right right right right right right right right right
- Events: walk walk walk walk push_ice ice_destroyed_d3 walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=59, push_ice=6, ice_destroyed_d3=3, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=3, ice_stop_short:d1=1, ice_destroy_group_d6_plus:len1=1, ice_stop_short:d2=2

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
..I.GG#.....I.I..
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
..I.GG#.....I.I..
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
..I.GG#.....I@I..
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
..I.GG#.....@.I..
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
..I.GG#.......I..
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
..I.GG#.......I..
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
..I.GG#.......I@.
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
..I.GG........@..
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
..I.GG...........
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
..I.G*...........
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
.@I.G*...........
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
..@.**...........
#.###..######.#.#
#......######.#.#
#......######*..#
#.###########.#.#
..###########....
#################
```


## Graph Facts

- Status: complete
- Reachable states: 7792
- Legal transitions: 18130
- Event-only illegal transitions: 345
- Winning states: 1
- Budget: maxStates=200000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 7792
- Legal transitions: 18130
- Budget: maxStates=200000
- Compressed regions: 199
- Bidirectional transitions: 17552
- Commitment transitions: 578
- Winning regions: 1
- Initial region: r0, states=11, dist=6, internalBidirectional=20, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r4@9 -> r23@20 -> r29@25 -> r51@38 -> r105@45
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=175, edges=424, winReachable=10, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=2/6, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=0/6, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=11, dist=6, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@5 -> s15@9 -> s22@20 -> s97@25 -> s139@38 -> s140@45

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 11 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 5 | 5 | 15 | 5 | 1 | 4 | 1 | 1 | s15 | yes |
| s15 | 9 | 4 | 21 | 4 | 2 | 2 | 1 | 1 | s22 | no |
| s22 | 20 | 3 | 12 | 2 | 1 | 1 | 1 | 1 | s97 | yes |
| s97 | 25 | 2 | 90 | 7 | 1 | 6 | 2 | 2 | s139 | yes |
| s139 | 38 | 1 | 43 | 4 | 1 | 3 | 2 | 2 | s140 | yes |
| s140 | 45 | 0 | 45 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 11 | no | yes | up | push_ice, ice_destroyed_d3 | has_reposition_room |
| s1 | 5 | 9 | s15 | 15 | no | yes | left | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s15 | 9 | 20 | s22 | 21 | no | no | left | push_ice, ice_stop_short:d1 | has_reposition_room |
| s22 | 20 | 25 | s97 | 12 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s97 | 25 | 38 | s139 | 90 | no | yes | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s139 | 38 | 45 | s140 | 43 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=7792, regions=199, solution commitments=6
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=2/6, optimal prefix=2/6, forced viable commitments=4/6
- Endgame tail: 20 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress; 20 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 6 | 1 | 1 | 1 | forced optimal |
| 8 | r1 | r4 | 5 | 1 | 4 | 1 | forced optimal |
| 19 | r4 | r23 | 4 | 2 | 2 | 2 | multiple optimal choices |
| 24 | r23 | r29 | 3 | 1 | 1 | 1 | forced optimal |
| 37 | r29 | r51 | 2 | 2 | 5 | 1 | forced optimal |
| 44 | r51 | r105 | 1 | 1 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 11 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 5 | 5 | 15 | 5 | 1 | 4 | 1 | 1 | r4 | no | yes | yes |
| r4 | 9 | 4 | 21 | 4 | 2 | 2 | 2 | 2 | r23 | no | no | no |
| r23 | 20 | 3 | 12 | 2 | 1 | 1 | 1 | 1 | r29 | no | yes | yes |
| r29 | 25 | 2 | 45 | 7 | 2 | 5 | 1 | 1 | r51 | no | no | yes |
| r51 | 38 | 1 | 43 | 4 | 1 | 3 | 1 | 1 | r105 | no | yes | yes |
| r105 | 45 | 0 | 45 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

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
| 19 | up | r4 | no | 4 | 4 | 2 | 2 | 2 | 2 | r23 | yes | yes | yes | yes | no | no | walk |
| 20 | left | r23 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r23 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 21 | right | r23 | no | 3 | 2 | 1 | 1 | 1 | 1 | r23 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r23 | no | 3 | 2 | 1 | 1 | 1 | 1 | r23 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r23 | no | 3 | 2 | 1 | 1 | 1 | 1 | r23 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r23 | no | 3 | 2 | 1 | 1 | 1 | 1 | r29 | yes | yes | yes | yes | yes | yes | walk |
| 25 | left | r29 | yes | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 26 | left | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | down | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | down | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | left | r29 | no | 2 | 7 | 2 | 5 | 1 | 1 | r51 | yes | yes | yes | yes | no | yes | walk |
| 38 | up | r51 | yes | 1 | 4 | 1 | 3 | 1 | 1 | r51 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 39 | left | r51 | no | 1 | 4 | 1 | 3 | 1 | 1 | r51 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | left | r51 | no | 1 | 4 | 1 | 3 | 1 | 1 | r51 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | left | r51 | no | 1 | 4 | 1 | 3 | 1 | 1 | r51 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | left | r51 | no | 1 | 4 | 1 | 3 | 1 | 1 | r51 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | up | r51 | no | 1 | 4 | 1 | 3 | 1 | 1 | r51 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | up | r51 | no | 1 | 4 | 1 | 3 | 1 | 1 | r105 | yes | yes | yes | yes | yes | yes | walk |
| 45 | right | r105 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 46 | left | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | down | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | down | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 49 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 50 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 52 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 53 | up | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 54 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 55 | up | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 56 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 57 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 58 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 59 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 60 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 61 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 62 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 63 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 64 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | r105 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 65 | right | r105 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

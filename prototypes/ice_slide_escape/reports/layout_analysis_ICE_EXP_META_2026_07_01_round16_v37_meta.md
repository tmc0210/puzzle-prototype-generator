# Level Analysis: ICE_EXP_META_2026_07_01_round16_v37_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round16_v37_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
.......#########..
#.*.....#..G.##..#
#....####..*...#.#
#....IG##......I.#
##*.I.#####..I...#
#.....#####.###..#
.....######......@
##################
```

## Shortest Solution

- Found: yes
- Cost: 36
- Depth: 36
- Explored states: 9272
- Inputs: left up up up left down left left up left left up down right down right right right down down left left left left up up up right right right right right up up up right
- Events: walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=32, push_ice=4, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=2, ice_stop_short:d2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##################
.......#########..
#.*.....#..G.##..#
#....####..*...#.#
#....IG##......I@#
##*.I.#####..I...#
#.....#####.###..#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*.....#..G.##..#
#....####..*...#.#
#....I*........@.#
##*.I.#####..I...#
#.....#####.###..#
.....######.......
##################
```

### Step 8: left

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##################
.......#########..
#.*.....#..G.##..#
#....####..*...#.#
#....I*..........#
##*.I.#####..I@..#
#.....#####.###..#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*.....#..G.##..#
#....####..*...#.#
#....I*..........#
##*.I.#####I.@...#
#.....#####.###..#
.....######.......
##################
```

### Step 12: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##################
.......#########..
#.*.....#..G.##..#
#....####..*...#.#
#....I*....@.....#
##*.I.#####I.....#
#.....#####.###..#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*.....#..*.##..#
#....####..+...#.#
#....I*..........#
##*.I.#####I.....#
#.....#####.###..#
.....######.......
##################
```

### Step 26: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
##################
.......#########..
#.*.....#..*.##..#
#....####..G...#.#
#....I*..........#
##*.I.#####I.....#
#.....#####@###..#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*.....#..*.##..#
#....####..*...#.#
#....I*..........#
##*.I.#####@.....#
#.....#####.###..#
.....######.......
##################
```


## Graph Facts

- Status: complete
- Reachable states: 15515
- Legal transitions: 42529
- Event-only illegal transitions: 1168
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 15515
- Legal transitions: 42529
- Budget: maxStates=300000
- Compressed regions: 438
- Bidirectional transitions: 41352
- Commitment transitions: 1177
- Winning regions: 1
- Initial region: r0, states=36, dist=4, internalBidirectional=88, commitments=8, viableCommitments=4, deadCommitments=4, progressCommitments=3, optimalCommitments=3
- Solution region path: r0@0 -> r1@5 -> r4@8 -> r17@12 -> r185@26
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=395, edges=1031, winReachable=10, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=5, mergingWinSccs=5
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=72, dist=4, out=9, winOut=3, deadOut=6
- SCC path: s0@0 -> s322@5 -> s327@8 -> s369@12 -> s370@26

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 72 | 9 | 3 | 6 | 0 | 0 | s322 | no |
| s322 | 5 | 3 | 78 | 7 | 2 | 5 | 1 | 1 | s327 | no |
| s327 | 8 | 2 | 39 | 6 | 1 | 5 | 2 | 2 | s369 | yes |
| s369 | 12 | 1 | 39 | 4 | 1 | 3 | 3 | 3 | s370 | yes |
| s370 | 26 | 0 | 39 | 4 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s322 | 72 | no | no | left | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s322 | 5 | 8 | s327 | 78 | no | no | left | push_ice, ice_stop_short:d2 | has_reposition_room |
| s327 | 8 | 12 | s369 | 39 | no | yes | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s369 | 12 | 26 | s370 | 39 | no | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=15515, regions=438, solution commitments=4
- Opening: commitments=8, viable=4, dead=4, optimal=3
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=2/4
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 4 | 4 | 4 | 3 | multiple optimal choices |
| 7 | r1 | r4 | 3 | 3 | 3 | 2 | multiple optimal choices |
| 11 | r4 | r17 | 2 | 1 | 5 | 1 | forced optimal |
| 25 | r17 | r185 | 1 | 1 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 36 | 8 | 4 | 4 | 3 | 3 | r1 | no | no | no |
| r1 | 5 | 3 | 39 | 6 | 3 | 3 | 2 | 2 | r4 | no | no | no |
| r4 | 8 | 2 | 39 | 6 | 1 | 5 | 1 | 1 | r17 | no | yes | yes |
| r17 | 12 | 1 | 39 | 4 | 1 | 3 | 1 | 1 | r185 | no | yes | yes |
| r185 | 26 | 0 | 39 | 4 | 0 | 4 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 4 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 4 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 4 | 8 | 4 | 4 | 3 | 3 | r1 | yes | yes | yes | yes | no | no | walk |
| 5 | left | r1 | yes | 3 | 6 | 3 | 3 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 6 | down | r1 | no | 3 | 6 | 3 | 3 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 3 | 6 | 3 | 3 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 8 | left | r4 | yes | 2 | 6 | 1 | 5 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 9 | up | r4 | no | 2 | 6 | 1 | 5 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r4 | no | 2 | 6 | 1 | 5 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r4 | no | 2 | 6 | 1 | 5 | 1 | 1 | r17 | yes | yes | yes | yes | yes | yes | walk |
| 12 | up | r17 | yes | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 13 | down | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r17 | no | 1 | 4 | 1 | 3 | 1 | 1 | r185 | yes | yes | yes | yes | yes | yes | walk |
| 26 | up | r185 | yes | 0 | 4 | 0 | 4 | 0 | 0 | r185 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 27 | up | r185 | no | 0 | 4 | 0 | 4 | 0 | 0 | r185 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r185 | no | 0 | 4 | 0 | 4 | 0 | 0 | r185 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r185 | no | 0 | 4 | 0 | 4 | 0 | 0 | r185 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r185 | no | 0 | 4 | 0 | 4 | 0 | 0 | r185 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r185 | no | 0 | 4 | 0 | 4 | 0 | 0 | r185 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r185 | no | 0 | 4 | 0 | 4 | 0 | 0 | r185 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | up | r185 | no | 0 | 4 | 0 | 4 | 0 | 0 | r185 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | up | r185 | no | 0 | 4 | 0 | 4 | 0 | 0 | r185 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r185 | no | 0 | 4 | 0 | 4 | 0 | 0 | r185 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r185 | no | 0 | 4 | 0 | 4 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

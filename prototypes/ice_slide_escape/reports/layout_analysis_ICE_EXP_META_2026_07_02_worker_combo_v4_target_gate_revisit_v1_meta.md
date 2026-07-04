# Level Analysis: ICE_EXP_META_2026_07_02_worker_combo_v4_target_gate_revisit_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_worker_combo_v4_target_gate_revisit_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_destroy_group_d6_plus

## Initial State

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
#I......I..#
###....I.#.@
#......I...#
#...*......#
############
```

## Shortest Solution

- Found: yes
- Cost: 31
- Depth: 31
- Explored states: 39789
- Inputs: left up left left down left down left down left left up right right right right down left up up up left left left down down left down left left left
- Events: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroy_group_d6_plus:len2 ice_boundary_disappear_after_group walk push_ice ice_rebound_d4 push_ice ice_stop_short:d1 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk
- Event counts: walk=25, push_ice=6, ice_blocks_ice_no_chain_push=1, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear_after_group=2, ice_rebound_d4=1, ice_stop_short:d1=1, ice_destroyed_d3=1, ice_destroy_group_d6_plus:len1=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group

Before:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
#I......I@.#
###....I.#..
#......I...#
#...*......#
############
```

After:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
........@..#
###....I.#..
#......I...#
#...*......#
############
```

### Step 6: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
...........#
###....I@#..
#......I...#
#...*......#
############
```

After:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
...........#
###.I..@.#..
#......I...#
#...*......#
############
```

### Step 7: down

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
...........#
###.I..@.#..
#......I...#
#...*......#
############
```

After:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
...........#
###.I....#..
#......@...#
#...*..I...#
############
```

### Step 11: left

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
...........#
###.I....#..
#..........#
#...*@.I...#
############
```

After:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
...........#
###.I....#..
#..........#
#...+..I...#
############
```

### Step 18: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
...........#
###.I....#..
#..........#
#...G..I@..#
############
```

After:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
...........#
###.I....#..
#..........#
....G..@...#
############
```

### Step 25: down

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
....@......#
###.I....#..
#..........#
....G......#
############
```

After:

```text
##.####.####
#.I.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
...........#
###.@....#..
#..........#
....*......#
############
```


## Graph Facts

- Status: complete
- Reachable states: 70225
- Legal transitions: 204535
- Event-only illegal transitions: 6855
- Winning states: 6
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 70225
- Legal transitions: 204535
- Budget: maxStates=120000
- Compressed regions: 1924
- Bidirectional transitions: 198446
- Commitment transitions: 6089
- Winning regions: 6
- Initial region: r0, states=34, dist=5, internalBidirectional=88, commitments=8, viableCommitments=5, deadCommitments=3, progressCommitments=3, optimalCommitments=3
- Solution region path: r0@0 -> r1@4 -> r3@6 -> r7@7 -> r40@11 -> r347@18 -> r924@25
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=1851, edges=5565, winReachable=54, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=22, mergingWinSccs=39
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=68, dist=4, out=12, winOut=6, deadOut=6
- SCC path: s0@0 -> s1341@4 -> s1342@7 -> s1756@11 -> s1761@18 -> s1767@25

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 68 | 12 | 6 | 6 | 0 | 0 | s1341 | no |
| s1341 | 4 | 4 | 74 | 10 | 4 | 6 | 1 | 1 | s1342 | no |
| s1342 | 7 | 3 | 74 | 10 | 2 | 8 | 2 | 2 | s1756 | no |
| s1756 | 11 | 2 | 76 | 8 | 1 | 7 | 3 | 3 | s1761 | yes |
| s1761 | 18 | 1 | 80 | 6 | 1 | 5 | 2 | 2 | s1767 | yes |
| s1767 | 25 | 0 | 40 | 2 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s1341 | 68 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group | has_reposition_room |
| s1341 | 4 | 7 | s1342 | 74 | no | no | down | push_ice, ice_stop_short:d1 | has_reposition_room |
| s1342 | 7 | 11 | s1756 | 74 | no | no | left | push_ice, ice_destroyed_d3 | has_reposition_room |
| s1756 | 11 | 18 | s1761 | 76 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |
| s1761 | 18 | 25 | s1767 | 80 | no | yes | down | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=70225, regions=1924, solution commitments=6
- Opening: commitments=8, viable=5, dead=3, optimal=3
- Win-continuation prefix: viable prefix=0/6, optimal prefix=0/6, forced viable commitments=0/6
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 5 | 5 | 3 | 3 | multiple optimal choices |
| 5 | r1 | r3 | 5 | 3 | 3 | 3 | multiple optimal choices |
| 6 | r3 | r7 | 4 | 5 | 5 | 3 | multiple optimal choices |
| 10 | r7 | r40 | 3 | 3 | 5 | 1 | forced optimal |
| 17 | r40 | r347 | 2 | 2 | 4 | 1 | forced optimal |
| 24 | r347 | r924 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 34 | 8 | 5 | 3 | 3 | 3 | r1 | no | no | no |
| r1 | 4 | 5 | 37 | 6 | 3 | 3 | 3 | 3 | r3 | no | no | no |
| r3 | 6 | 4 | 37 | 10 | 5 | 5 | 3 | 3 | r7 | no | no | no |
| r7 | 7 | 3 | 37 | 8 | 3 | 5 | 1 | 1 | r40 | no | no | yes |
| r40 | 11 | 2 | 38 | 6 | 2 | 4 | 1 | 1 | r347 | no | no | yes |
| r347 | 18 | 1 | 40 | 4 | 2 | 2 | 1 | 1 | r924 | no | no | yes |
| r924 | 25 | 0 | 40 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 8 | 5 | 3 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 5 | 8 | 5 | 3 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 5 | 8 | 5 | 3 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 5 | 8 | 5 | 3 | 3 | 3 | r1 | yes | yes | no | no | no | no | walk |
| 4 | left | r1 | yes | 5 | 6 | 3 | 3 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group |
| 5 | down | r1 | no | 5 | 6 | 3 | 3 | 3 | 3 | r3 | yes | yes | yes | yes | no | no | walk |
| 6 | left | r3 | yes | 4 | 10 | 5 | 5 | 3 | 3 | r7 | yes | yes | yes | yes | no | no | push_ice, ice_rebound_d4 |
| 7 | down | r7 | yes | 3 | 8 | 3 | 5 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 8 | left | r7 | no | 3 | 8 | 3 | 5 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r7 | no | 3 | 8 | 3 | 5 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r7 | no | 3 | 8 | 3 | 5 | 1 | 1 | r40 | yes | yes | yes | yes | no | yes | walk |
| 11 | left | r40 | yes | 2 | 6 | 2 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 12 | up | r40 | no | 2 | 6 | 2 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r40 | no | 2 | 6 | 2 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r40 | no | 2 | 6 | 2 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r40 | no | 2 | 6 | 2 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r40 | no | 2 | 6 | 2 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r40 | no | 2 | 6 | 2 | 4 | 1 | 1 | r347 | yes | yes | yes | yes | no | yes | walk |
| 18 | left | r347 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r347 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 19 | up | r347 | no | 1 | 4 | 2 | 2 | 1 | 1 | r347 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r347 | no | 1 | 4 | 2 | 2 | 1 | 1 | r347 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r347 | no | 1 | 4 | 2 | 2 | 1 | 1 | r347 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r347 | no | 1 | 4 | 2 | 2 | 1 | 1 | r347 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r347 | no | 1 | 4 | 2 | 2 | 1 | 1 | r347 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r347 | no | 1 | 4 | 2 | 2 | 1 | 1 | r924 | yes | yes | yes | yes | no | yes | walk |
| 25 | down | r924 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r924 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 26 | down | r924 | no | 0 | 2 | 0 | 2 | 0 | 0 | r924 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r924 | no | 0 | 2 | 0 | 2 | 0 | 0 | r924 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r924 | no | 0 | 2 | 0 | 2 | 0 | 0 | r924 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r924 | no | 0 | 2 | 0 | 2 | 0 | 0 | r924 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r924 | no | 0 | 2 | 0 | 2 | 0 | 0 | r924 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r924 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### ice_destroy_group_d6_plus

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

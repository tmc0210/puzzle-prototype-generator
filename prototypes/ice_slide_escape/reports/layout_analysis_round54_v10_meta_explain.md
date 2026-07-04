# Level Analysis: round54_v10_meta_explain

## Summary

- Prototype: ice_slide_escape
- Title: round54_v10_meta_explain
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#######.##@##
#######.##I##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*....*.##
#...#.....###
######.##.###
######.##...#
.#..........#
#############
#############
```

## Shortest Solution

- Found: yes
- Cost: 34
- Depth: 34
- Explored states: 2346
- Inputs: down down down down down down left down down down right right down left up left up up left left left left up right down down down down left left left left left left
- Events: push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_boundary_disappear:d1 walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk
- Event counts: push_ice=4, ice_pass_through_d5:len2=1, slide_restart_after_group=2, ice_stop_short:d2=1, walk=30, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_stop_short:d2

Before:

```text
#######.##@##
#######.##I##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*....*.##
#...#.....###
######.##.###
######.##...#
.#..........#
#############
#############
```

After:

```text
#######.##.##
#######.##@##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*....*.##
#...#.....###
######.##.###
######.##...#
.#........I.#
#############
#############
```

### Step 7: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*....*@##
#...#.....###
######.##.###
######.##...#
.#........I.#
#############
#############
```

After:

```text
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*.I..+.##
#...#.....###
######.##.###
######.##...#
.#........I.#
#############
#############
```

### Step 14: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_boundary_disappear:d1

Before:

```text
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*.I..G.##
#...#.....###
######.##.###
######.##...#
.#........I@#
#############
#############
```

After:

```text
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*.I..G.##
#...#.....###
######.##.###
######.##...#
..........@.#
#############
#############
```

### Step 24: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*@I..G.##
#...#.....###
######.##.###
######.##...#
............#
#############
#############
```

After:

```text
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*.@..*.##
#...#.....###
######.##.###
######.##...#
............#
#############
#############
```


## Graph Facts

- Status: complete
- Reachable states: 3040
- Legal transitions: 7311
- Event-only illegal transitions: 181
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 3040
- Legal transitions: 7311
- Budget: maxStates=300000
- Compressed regions: 78
- Bidirectional transitions: 7152
- Commitment transitions: 159
- Winning regions: 1
- Initial region: r0, states=1, dist=4, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@7 -> r9@14 -> r43@24
- Forced commitment prefix length: 2
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=72, edges=140, winReachable=6, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@7 -> s12@14 -> s13@24

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 3 | 7 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 7 | 2 | 80 | 7 | 2 | 5 | 1 | 1 | s12 | no |
| s12 | 14 | 1 | 86 | 5 | 1 | 4 | 1 | 1 | s13 | yes |
| s13 | 24 | 0 | 36 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | down | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_stop_short:d2 | scripted_trivial_scc |
| s1 | 1 | 7 | s2 | 7 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s2 | 7 | 14 | s12 | 80 | no | no | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_boundary_disappear:d1 | has_reposition_room |
| s12 | 14 | 24 | s13 | 86 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=3040, regions=78, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=2/4, forced viable commitments=2/4
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 6 | r1 | r2 | 3 | 1 | 0 | 1 | forced optimal |
| 13 | r2 | r9 | 2 | 3 | 4 | 2 | multiple optimal choices |
| 23 | r9 | r43 | 1 | 2 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 7 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 7 | 2 | 40 | 7 | 3 | 4 | 2 | 2 | r9 | no | no | no |
| r9 | 14 | 1 | 43 | 5 | 2 | 3 | 1 | 1 | r43 | no | no | yes |
| r43 | 24 | 0 | 36 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | down | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_stop_short:d2 |
| 2 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 7 | left | r2 | yes | 2 | 7 | 3 | 4 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 8 | down | r2 | no | 2 | 7 | 3 | 4 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 2 | 7 | 3 | 4 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r2 | no | 2 | 7 | 3 | 4 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r2 | no | 2 | 7 | 3 | 4 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r2 | no | 2 | 7 | 3 | 4 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r2 | no | 2 | 7 | 3 | 4 | 2 | 2 | r9 | yes | yes | yes | yes | no | no | walk |
| 14 | left | r9 | yes | 1 | 5 | 2 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_boundary_disappear:d1 |
| 15 | up | r9 | no | 1 | 5 | 2 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r9 | no | 1 | 5 | 2 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r9 | no | 1 | 5 | 2 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r9 | no | 1 | 5 | 2 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r9 | no | 1 | 5 | 2 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r9 | no | 1 | 5 | 2 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r9 | no | 1 | 5 | 2 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r9 | no | 1 | 5 | 2 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r9 | no | 1 | 5 | 2 | 3 | 1 | 1 | r43 | yes | yes | yes | yes | no | yes | walk |
| 24 | right | r43 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r43 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 25 | down | r43 | no | 0 | 2 | 0 | 2 | 0 | 0 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r43 | no | 0 | 2 | 0 | 2 | 0 | 0 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r43 | no | 0 | 2 | 0 | 2 | 0 | 0 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r43 | no | 0 | 2 | 0 | 2 | 0 | 0 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r43 | no | 0 | 2 | 0 | 2 | 0 | 0 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r43 | no | 0 | 2 | 0 | 2 | 0 | 0 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r43 | no | 0 | 2 | 0 | 2 | 0 | 0 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r43 | no | 0 | 2 | 0 | 2 | 0 | 0 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r43 | no | 0 | 2 | 0 | 2 | 0 | 0 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r43 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

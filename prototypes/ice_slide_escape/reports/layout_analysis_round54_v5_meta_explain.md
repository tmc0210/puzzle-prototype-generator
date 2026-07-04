# Level Analysis: round54_v5_meta_explain

## Summary

- Prototype: ice_slide_escape
- Title: round54_v5_meta_explain
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#######@####
#######I####
#######.####
#######.####
#######.####
#...#......#
..#.*....*.#
#...#...#.##
######.##.##
######..#.##
#.........##
######.#####
######.#####
```

## Shortest Solution

- Found: yes
- Cost: 33
- Depth: 33
- Explored states: 2400
- Inputs: down down down down down right right right down left down down down down left left up up up left left up right down down down down left left left left left left
- Events: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk
- Event counts: push_ice=4, ice_destroy_group_d6_plus:len1=2, slide_restart_after_group=1, ice_stop_short:d2=1, walk=29, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=2, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_stop_short:d2

Before:

```text
#######@####
#######I####
#######.####
#######.####
#######.####
#...#......#
..#.*....*.#
#...#...#.##
######.##.##
######..#.##
#.........##
######.#####
######.#####
```

After:

```text
#######.####
#######@####
#######.####
#######.####
#######.####
#...#......#
..#.*....*.#
#...#...#.##
######..#.##
######..#.##
#......I..##
######.#####
######.#####
```

### Step 10: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
#######.####
#######.####
#######.####
#######.####
#######.####
#...#......#
..#.*....*@#
#...#...#.##
######..#.##
######..#.##
#......I..##
######.#####
######.#####
```

After:

```text
#######.####
#######.####
#######.####
#######.####
#######.####
#...#......#
..#.*.I..+.#
#...#...#.##
######..#.##
######..#.##
#......I..##
######.#####
######.#####
```

### Step 16: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
#######.####
#######.####
#######.####
#######.####
#######.####
#...#......#
..#.*.I..G.#
#...#...#.##
######..#.##
######..#.##
#......I@.##
######.#####
######.#####
```

After:

```text
#######.####
#######.####
#######.####
#######.####
#######.####
#...#......#
..#.*.I..G.#
#...#...#.##
######..#.##
######..#.##
.......@..##
######.#####
######.#####
```

### Step 23: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######.####
#######.####
#######.####
#######.####
#######.####
#...#......#
..#.*@I..G.#
#...#...#.##
######..#.##
######..#.##
..........##
######.#####
######.#####
```

After:

```text
#######.####
#######.####
#######.####
#######.####
#######.####
#...#......#
..#.*.@..*.#
#...#...#.##
######..#.##
######..#.##
..........##
######.#####
######.#####
```


## Graph Facts

- Status: complete
- Reachable states: 2661
- Legal transitions: 6592
- Event-only illegal transitions: 175
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2661
- Legal transitions: 6592
- Budget: maxStates=300000
- Compressed regions: 73
- Bidirectional transitions: 6436
- Commitment transitions: 156
- Winning regions: 1
- Initial region: r0, states=1, dist=4, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r5@10 -> r17@16 -> r45@23
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=62, edges=122, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s3@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 1 | 67 | 9 | 1 | 8 | 1 | 1 | s3 | yes |
| s3 | 16 | 0 | 114 | 7 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | down | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_stop_short:d2 | scripted_trivial_scc |
| s1 | 1 | 16 | s3 | 67 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2661, regions=73, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=4/4, forced viable commitments=3/4
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 9 | r1 | r5 | 3 | 1 | 4 | 1 | forced optimal |
| 15 | r5 | r17 | 2 | 2 | 5 | 1 | forced optimal |
| 22 | r17 | r45 | 1 | 1 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 31 | 5 | 1 | 4 | 1 | 1 | r5 | no | yes | yes |
| r5 | 10 | 2 | 36 | 7 | 2 | 5 | 1 | 1 | r17 | no | no | yes |
| r17 | 16 | 1 | 38 | 5 | 1 | 4 | 1 | 1 | r45 | no | yes | yes |
| r45 | 23 | 0 | 38 | 5 | 2 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | down | r1 | yes | 3 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_stop_short:d2 |
| 2 | down | r1 | no | 3 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 3 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 3 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 3 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 3 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 3 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 3 | 5 | 1 | 4 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r1 | no | 3 | 5 | 1 | 4 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 10 | left | r5 | yes | 2 | 7 | 2 | 5 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 11 | down | r5 | no | 2 | 7 | 2 | 5 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r5 | no | 2 | 7 | 2 | 5 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r5 | no | 2 | 7 | 2 | 5 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r5 | no | 2 | 7 | 2 | 5 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r5 | no | 2 | 7 | 2 | 5 | 1 | 1 | r17 | yes | yes | yes | yes | no | yes | walk |
| 16 | left | r17 | yes | 1 | 5 | 1 | 4 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 17 | up | r17 | no | 1 | 5 | 1 | 4 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r17 | no | 1 | 5 | 1 | 4 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r17 | no | 1 | 5 | 1 | 4 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r17 | no | 1 | 5 | 1 | 4 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r17 | no | 1 | 5 | 1 | 4 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r17 | no | 1 | 5 | 1 | 4 | 1 | 1 | r45 | yes | yes | yes | yes | yes | yes | walk |
| 23 | right | r45 | yes | 0 | 5 | 2 | 3 | 0 | 0 | r45 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 24 | down | r45 | no | 0 | 5 | 2 | 3 | 0 | 0 | r45 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r45 | no | 0 | 5 | 2 | 3 | 0 | 0 | r45 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r45 | no | 0 | 5 | 2 | 3 | 0 | 0 | r45 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r45 | no | 0 | 5 | 2 | 3 | 0 | 0 | r45 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r45 | no | 0 | 5 | 2 | 3 | 0 | 0 | r45 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r45 | no | 0 | 5 | 2 | 3 | 0 | 0 | r45 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r45 | no | 0 | 5 | 2 | 3 | 0 | 0 | r45 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r45 | no | 0 | 5 | 2 | 3 | 0 | 0 | r45 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r45 | no | 0 | 5 | 2 | 3 | 0 | 0 | r45 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r45 | no | 0 | 5 | 2 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

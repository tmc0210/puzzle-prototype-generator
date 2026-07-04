# Level Analysis: round54_v4_meta_explain

## Summary

- Prototype: ice_slide_escape
- Title: round54_v4_meta_explain
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
#...#.....##
######.##.##
######..#.##
#.........##
######.#####
######.#####
```

## Shortest Solution

- Found: yes
- Cost: 21
- Depth: 21
- Explored states: 834
- Inputs: down down down down down down down right right down down down left left left left left left left left left
- Events: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk
- Event counts: push_ice=2, ice_destroy_group_d6_plus:len1=2, slide_restart_after_group=1, ice_stop_short:d2=1, walk=19, ice_boundary_disappear_after_group=1

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
#...#.....##
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
#...#.....##
######..#.##
######..#.##
#......I..##
######.#####
######.#####
```

### Step 14: left

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
..#.*....*.#
#...#.....##
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
..#.*....*.#
#...#.....##
######..#.##
######..#.##
.......@..##
######.#####
######.#####
```


## Graph Facts

- Status: complete
- Reachable states: 2749
- Legal transitions: 7054
- Event-only illegal transitions: 177
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2749
- Legal transitions: 7054
- Budget: maxStates=300000
- Compressed regions: 73
- Bidirectional transitions: 6892
- Commitment transitions: 162
- Winning regions: 1
- Initial region: r0, states=1, dist=2, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r14@14
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=62, edges=125, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s3@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 1 | 74 | 9 | 1 | 8 | 1 | 1 | s3 | yes |
| s3 | 14 | 0 | 117 | 7 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | down | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_stop_short:d2 | scripted_trivial_scc |
| s1 | 1 | 14 | s3 | 74 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2749, regions=73, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 13 | r1 | r14 | 1 | 2 | 5 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 1 | 37 | 7 | 2 | 5 | 1 | 1 | r14 | no | no | yes |
| r14 | 14 | 0 | 39 | 5 | 2 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | down | r1 | yes | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_stop_short:d2 |
| 2 | down | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r1 | no | 1 | 7 | 2 | 5 | 1 | 1 | r14 | yes | yes | yes | yes | no | yes | walk |
| 14 | left | r14 | yes | 0 | 5 | 2 | 3 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 15 | left | r14 | no | 0 | 5 | 2 | 3 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r14 | no | 0 | 5 | 2 | 3 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r14 | no | 0 | 5 | 2 | 3 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r14 | no | 0 | 5 | 2 | 3 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r14 | no | 0 | 5 | 2 | 3 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r14 | no | 0 | 5 | 2 | 3 | 0 | 0 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r14 | no | 0 | 5 | 2 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

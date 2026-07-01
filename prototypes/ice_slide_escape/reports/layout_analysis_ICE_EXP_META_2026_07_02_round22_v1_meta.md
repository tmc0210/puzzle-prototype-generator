# Level Analysis: ICE_EXP_META_2026_07_02_round22_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round22_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########
#.........#
#....#....#
#.G..I.####
#I..I....##
#.#####@###
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 2070
- Inputs: up left up left down left up up left left left down down right right right right right right right right right
- Events: walk walk walk push_ice ice_rebound_d4 walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_boundary_disappear:d1 push_ice ice_destroy_group_d6_plus:len2 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk
- Event counts: walk=18, push_ice=4, ice_rebound_d4=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1, ice_boundary_disappear:d1=1, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########
#.........#
#....#....#
#.G..I@####
#I..I....##
#.#####.###
```

After:

```text
###########
#.........#
#....#....#
#.*..@.####
#I..I....##
#.#####.###
```

### Step 6: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
###########
#.........#
#....#....#
#.*....####
#I..I@...##
#.#####.###
```

After:

```text
###########
#.........#
#....#....#
#.*....####
#II.@....##
#.#####.###
```

### Step 13: down

- Legal: true
- Events: push_ice, ice_boundary_disappear:d1

Before:

```text
###########
#.........#
#....#....#
#@*....####
#II......##
#.#####.###
```

After:

```text
###########
#.........#
#....#....#
#.*....####
#@I......##
#.#####.###
```

### Step 14: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group

Before:

```text
###########
#.........#
#....#....#
#.*....####
#@I......##
#.#####.###
```

After:

```text
###########
#.........#
#....#....#
#.*....####
#.@........
#.#####.###
```


## Graph Facts

- Status: complete
- Reachable states: 3890
- Legal transitions: 11053
- Event-only illegal transitions: 247
- Winning states: 1
- Budget: maxStates=80000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 3890
- Legal transitions: 11053
- Budget: maxStates=80000
- Compressed regions: 129
- Bidirectional transitions: 10752
- Commitment transitions: 301
- Winning regions: 1
- Initial region: r0, states=29, dist=4, internalBidirectional=76, commitments=5, viableCommitments=2, deadCommitments=3, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@4 -> r3@6 -> r27@13 -> r35@14
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=117, edges=252, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=58, dist=3, out=7, winOut=1, deadOut=6
- SCC path: s0@0 -> s13@6 -> s14@13 -> s15@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 58 | 7 | 1 | 6 | 0 | 0 | s13 | yes |
| s13 | 6 | 2 | 58 | 3 | 1 | 2 | 1 | 1 | s14 | yes |
| s14 | 13 | 1 | 62 | 4 | 1 | 3 | 1 | 1 | s15 | yes |
| s15 | 14 | 0 | 68 | 4 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s13 | 58 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s13 | 6 | 13 | s14 | 58 | no | yes | down | push_ice, ice_boundary_disappear:d1 | has_reposition_room |
| s14 | 13 | 14 | s15 | 62 | yes | yes | right | push_ice, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=3890, regions=129, solution commitments=4
- Opening: commitments=5, viable=2, dead=3, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=0/4
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 4 | 2 | 3 | 2 | multiple optimal choices |
| 5 | r1 | r3 | 3 | 2 | 5 | 1 | forced optimal |
| 12 | r3 | r27 | 2 | 2 | 1 | 1 | forced optimal |
| 13 | r27 | r35 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 29 | 5 | 2 | 3 | 2 | 2 | r1 | no | no | no |
| r1 | 4 | 3 | 29 | 7 | 2 | 5 | 1 | 1 | r3 | no | no | yes |
| r3 | 6 | 2 | 29 | 3 | 2 | 1 | 1 | 1 | r27 | no | no | yes |
| r27 | 13 | 1 | 31 | 4 | 2 | 2 | 1 | 1 | r35 | no | no | yes |
| r35 | 14 | 0 | 34 | 4 | 1 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 4 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 4 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 4 | 5 | 2 | 3 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | walk |
| 4 | left | r1 | yes | 3 | 7 | 2 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 5 | down | r1 | no | 3 | 7 | 2 | 5 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 6 | left | r3 | yes | 2 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 7 | up | r3 | no | 2 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r3 | no | 2 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r3 | no | 2 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r3 | no | 2 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r3 | no | 2 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r3 | no | 2 | 3 | 2 | 1 | 1 | 1 | r27 | yes | yes | yes | yes | no | yes | walk |
| 13 | down | r27 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r35 | yes | yes | yes | yes | no | yes | push_ice, ice_boundary_disappear:d1 |
| 14 | right | r35 | yes | 0 | 4 | 1 | 3 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group |
| 15 | right | r35 | no | 0 | 4 | 1 | 3 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r35 | no | 0 | 4 | 1 | 3 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r35 | no | 0 | 4 | 1 | 3 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r35 | no | 0 | 4 | 1 | 3 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r35 | no | 0 | 4 | 1 | 3 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r35 | no | 0 | 4 | 1 | 3 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r35 | no | 0 | 4 | 1 | 3 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r35 | no | 0 | 4 | 1 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

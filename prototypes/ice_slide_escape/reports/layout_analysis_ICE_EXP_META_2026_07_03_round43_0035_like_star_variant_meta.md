# Level Analysis: ICE_EXP_META_2026_07_03_round43_0035_like_star_variant_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round43_0035_like_star_variant_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########
#....#....#
#.#..#....#
#.*..I.####
#I..I....##
#.#####@###
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 1125
- Inputs: up left left left up up up left left left down down down right right right right right right right right right
- Events: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk push_ice ice_boundary_disappear:d1 push_ice ice_destroy_group_d6_plus:len2 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk
- Event counts: walk=19, push_ice=3, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1, ice_boundary_disappear:d1=1, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
###########
#....#....#
#.#..#....#
#.*..I.####
#I..I@...##
#.#####.###
```

After:

```text
###########
#....#....#
#.#..#....#
#.*..I.####
#II.@....##
#.#####.###
```

### Step 13: down

- Legal: true
- Events: push_ice, ice_boundary_disappear:d1

Before:

```text
###########
#....#....#
#.#..#....#
#@*..I.####
#II......##
#.#####.###
```

After:

```text
###########
#....#....#
#.#..#....#
#.*..I.####
#@I......##
#.#####.###
```

### Step 14: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group

Before:

```text
###########
#....#....#
#.#..#....#
#.*..I.####
#@I......##
#.#####.###
```

After:

```text
###########
#....#....#
#.#..#....#
#.*..I.####
#.@........
#.#####.###
```


## Graph Facts

- Status: complete
- Reachable states: 9948
- Legal transitions: 25614
- Event-only illegal transitions: 1099
- Winning states: 10
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 9948
- Legal transitions: 25614
- Budget: maxStates=120000
- Compressed regions: 386
- Bidirectional transitions: 24776
- Commitment transitions: 838
- Winning regions: 10
- Initial region: r0, states=14, dist=3, internalBidirectional=32, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@4 -> r16@13 -> r20@14
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=340, edges=697, winReachable=33, winning=10, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=10, mergingWinSccs=15
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=14, dist=3, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@4 -> s22@13 -> s23@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 14 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 4 | 2 | 26 | 5 | 4 | 1 | 1 | 1 | s22 | no |
| s22 | 13 | 1 | 28 | 6 | 6 | 0 | 1 | 1 | s23 | no |
| s23 | 14 | 0 | 31 | 4 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s1 | 14 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s1 | 4 | 13 | s22 | 26 | no | no | down | push_ice, ice_boundary_disappear:d1 | has_reposition_room |
| s22 | 13 | 14 | s23 | 28 | yes | no | right | push_ice, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=9948, regions=386, solution commitments=3
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=0/3
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r2 | 3 | 2 | 0 | 1 | forced optimal |
| 12 | r2 | r16 | 2 | 4 | 1 | 1 | forced optimal |
| 13 | r16 | r20 | 1 | 6 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 14 | 2 | 2 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 4 | 2 | 26 | 5 | 4 | 1 | 1 | 1 | r16 | no | no | yes |
| r16 | 13 | 1 | 28 | 6 | 6 | 0 | 1 | 1 | r20 | no | no | yes |
| r20 | 14 | 0 | 31 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | walk |
| 4 | left | r2 | yes | 2 | 5 | 4 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 5 | up | r2 | no | 2 | 5 | 4 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r2 | no | 2 | 5 | 4 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 2 | 5 | 4 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 2 | 5 | 4 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r2 | no | 2 | 5 | 4 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 2 | 5 | 4 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r2 | no | 2 | 5 | 4 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r2 | no | 2 | 5 | 4 | 1 | 1 | 1 | r16 | yes | yes | yes | yes | no | yes | walk |
| 13 | down | r16 | yes | 1 | 6 | 6 | 0 | 1 | 1 | r20 | yes | yes | yes | yes | no | yes | push_ice, ice_boundary_disappear:d1 |
| 14 | right | r20 | yes | 0 | 4 | 4 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group |
| 15 | right | r20 | no | 0 | 4 | 4 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r20 | no | 0 | 4 | 4 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r20 | no | 0 | 4 | 4 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r20 | no | 0 | 4 | 4 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r20 | no | 0 | 4 | 4 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r20 | no | 0 | 4 | 4 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r20 | no | 0 | 4 | 4 | 0 | 0 | 0 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r20 | no | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

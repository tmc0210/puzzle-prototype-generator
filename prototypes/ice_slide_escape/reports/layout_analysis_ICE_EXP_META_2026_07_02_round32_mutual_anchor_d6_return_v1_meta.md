# Level Analysis: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_rebound_d4, ice_destroy_group_d6_plus

## Initial State

```text
###############@##
###############.##
#...###########.##
..#.*....*....*.##
####I....I....####
##################
##################
##################
```

## Shortest Solution

- Found: yes
- Cost: 42
- Depth: 42
- Explored states: 5582
- Inputs: down down down left left down left left left up left left down left left left up right down right right right right up right right right down left left left left left left left left left left left left up left
- Events: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroy_group_d6_plus:len5 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=36, push_ice=6, ice_blocks_ice_no_chain_push=4, ice_rebound_d4=5, ice_destroy_group_d6_plus:len5=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
###############.##
###############.##
#...###########.##
..#.*....*....*@##
####I....I....####
##################
##################
##################
```

After:

```text
###############.##
###############.##
#...###########.##
..#.*....*.I..+.##
####I....I....####
##################
##################
##################
```

### Step 11: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
###############.##
###############.##
#...###########.##
..#.*....*@I..G.##
####I....I....####
##################
##################
##################
```

After:

```text
###############.##
###############.##
#...###########.##
..#.*.I..+.I..G.##
####I....I....####
##################
##################
##################
```

### Step 18: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
###############.##
###############.##
#...###########.##
..#.*@I..G.I..G.##
####I....I....####
##################
##################
##################
```

After:

```text
###############.##
###############.##
#...###########.##
..#.*.@..*.I..G.##
####I....I....####
##################
##################
##################
```

### Step 22: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###############.##
###############.##
#...###########.##
..#.*....*.I..G.##
####I...@I....####
##################
##################
##################
```

After:

```text
###############.##
###############.##
#...###########.##
..#.*....*.I..G.##
####I....@..I.####
##################
##################
##################
```

### Step 25: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###############.##
###############.##
#...###########.##
..#.*....*@I..G.##
####I.......I.####
##################
##################
##################
```

After:

```text
###############.##
###############.##
#...###########.##
..#.*....*.@..*.##
####I.......I.####
##################
##################
##################
```

### Step 29: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len5, ice_boundary_disappear_after_group

Before:

```text
###############.##
###############.##
#...###########.##
..#.*....*....*.##
####I.......I@####
##################
##################
##################
```

After:

```text
###############.##
###############.##
#...###########.##
..#.*....*....*.##
............@.####
##################
##################
##################
```


## Graph Facts

- Status: complete
- Reachable states: 10296
- Legal transitions: 26851
- Event-only illegal transitions: 1494
- Winning states: 1
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 10296
- Legal transitions: 26851
- Budget: maxStates=500000
- Compressed regions: 429
- Bidirectional transitions: 25914
- Commitment transitions: 937
- Winning regions: 1
- Initial region: r0, states=4, dist=6, internalBidirectional=6, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@4 -> r5@11 -> r35@18 -> r51@22 -> r100@25 -> r166@29
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=420, edges=904, winReachable=7, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=2/6, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/6, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=4, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@4 -> s92@11 -> s127@18 -> s129@22 -> s130@25 -> s132@29

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 4 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 4 | 4 | 12 | 4 | 1 | 3 | 1 | 1 | s92 | yes |
| s92 | 11 | 3 | 20 | 7 | 2 | 5 | 1 | 1 | s127 | no |
| s127 | 18 | 3 | 8 | 3 | 1 | 2 | 1 | 1 | s129 | yes |
| s129 | 22 | 2 | 24 | 7 | 1 | 6 | 2 | 2 | s130 | yes |
| s130 | 25 | 1 | 16 | 6 | 1 | 5 | 1 | 1 | s132 | yes |
| s132 | 29 | 0 | 84 | 9 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s1 | 4 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s1 | 4 | 11 | s92 | 12 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s92 | 11 | 18 | s127 | 20 | no | no | right | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s127 | 18 | 22 | s129 | 8 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s129 | 22 | 25 | s130 | 24 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s130 | 25 | 29 | s132 | 16 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len5, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=10296, regions=429, solution commitments=6
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/6, optimal prefix=2/6, forced viable commitments=4/6
- Endgame tail: 13 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; 13 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 6 | 1 | 0 | 1 | forced optimal |
| 10 | r1 | r5 | 5 | 1 | 3 | 1 | forced optimal |
| 17 | r5 | r35 | 4 | 2 | 5 | 2 | multiple optimal choices |
| 21 | r35 | r51 | 3 | 1 | 2 | 1 | forced optimal |
| 24 | r51 | r100 | 2 | 2 | 3 | 1 | forced optimal |
| 28 | r100 | r166 | 1 | 1 | 5 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 4 | 5 | 12 | 4 | 1 | 3 | 1 | 1 | r5 | no | yes | yes |
| r5 | 11 | 4 | 20 | 7 | 2 | 5 | 2 | 2 | r35 | no | no | no |
| r35 | 18 | 3 | 8 | 3 | 1 | 2 | 1 | 1 | r51 | no | yes | yes |
| r51 | 22 | 2 | 12 | 5 | 2 | 3 | 1 | 1 | r100 | no | no | yes |
| r100 | 25 | 1 | 16 | 6 | 1 | 5 | 1 | 1 | r166 | no | yes | yes |
| r166 | 29 | 0 | 28 | 5 | 1 | 4 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 4 | left | r1 | yes | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 5 | left | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 11 | left | r5 | yes | 4 | 7 | 2 | 5 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 12 | left | r5 | no | 4 | 7 | 2 | 5 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r5 | no | 4 | 7 | 2 | 5 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r5 | no | 4 | 7 | 2 | 5 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r5 | no | 4 | 7 | 2 | 5 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r5 | no | 4 | 7 | 2 | 5 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r5 | no | 4 | 7 | 2 | 5 | 2 | 2 | r35 | yes | yes | yes | yes | no | no | walk |
| 18 | right | r35 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 19 | down | r35 | no | 3 | 3 | 1 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r35 | no | 3 | 3 | 1 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r35 | no | 3 | 3 | 1 | 2 | 1 | 1 | r51 | yes | yes | yes | yes | yes | yes | walk |
| 22 | right | r51 | yes | 2 | 5 | 2 | 3 | 1 | 1 | r51 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 23 | right | r51 | no | 2 | 5 | 2 | 3 | 1 | 1 | r51 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r51 | no | 2 | 5 | 2 | 3 | 1 | 1 | r100 | yes | yes | yes | yes | no | yes | walk |
| 25 | right | r100 | yes | 1 | 6 | 1 | 5 | 1 | 1 | r100 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 26 | right | r100 | no | 1 | 6 | 1 | 5 | 1 | 1 | r100 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r100 | no | 1 | 6 | 1 | 5 | 1 | 1 | r100 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r100 | no | 1 | 6 | 1 | 5 | 1 | 1 | r166 | yes | yes | yes | yes | yes | yes | walk |
| 29 | left | r166 | yes | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len5, ice_boundary_disappear_after_group |
| 30 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | up | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | left | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### ice_rebound_d4

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)

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

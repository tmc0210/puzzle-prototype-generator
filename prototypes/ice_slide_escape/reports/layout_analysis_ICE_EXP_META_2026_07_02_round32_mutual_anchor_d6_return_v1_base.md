# Level Analysis: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_rebound_d4, ice_destroy_group_d6_plus

## Initial State

```text
###############.##
###############.##
#...###########.##
@.#.*....*....*.##
####I....I....####
##################
##################
##################
```

## Shortest Solution

- Found: yes
- Cost: 44
- Depth: 44
- Explored states: 5939
- Inputs: right up right right down right right down right right right up right right down right right right up left down left left left left up left left left down right right right right right right right right right right up up up up
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_destroy_group_d6_plus:len4 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=38, push_ice=6, ice_blocks_ice_no_chain_push=4, ice_rebound_d4=5, ice_destroy_group_d6_plus:len4=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
###############.##
###############.##
#...###########.##
..#@*....*....*.##
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
..#.+..I.*....*.##
####I....I....####
##################
##################
##################
```

### Step 13: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
###############.##
###############.##
#...###########.##
..#.G..I@*....*.##
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
..#.G..I.+..I.*.##
####I....I....####
##################
##################
##################
```

### Step 20: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
###############.##
###############.##
#...###########.##
..#.G..I.G..I@*.##
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
..#.G..I.*..@.*.##
####I....I....####
##################
##################
##################
```

### Step 24: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
###############.##
###############.##
#...###########.##
..#.G..I.*....*.##
####I....I@...####
##################
##################
##################
```

After:

```text
###############.##
###############.##
#...###########.##
..#.G..I.*....*.##
####I.I..@....####
##################
##################
##################
```

### Step 27: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###############.##
###############.##
#...###########.##
..#.G..I@*....*.##
####I.I.......####
##################
##################
##################
```

After:

```text
###############.##
###############.##
#...###########.##
..#.*..@.*....*.##
####I.I.......####
##################
##################
##################
```

### Step 31: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len4, ice_boundary_disappear_after_group

Before:

```text
###############.##
###############.##
#...###########.##
..#.*....*....*.##
####I@I.......####
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
####I.@...........
##################
##################
##################
```


## Graph Facts

- Status: complete
- Reachable states: 10315
- Legal transitions: 26846
- Event-only illegal transitions: 1570
- Winning states: 1
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 10315
- Legal transitions: 26846
- Budget: maxStates=500000
- Compressed regions: 424
- Bidirectional transitions: 25914
- Commitment transitions: 932
- Winning regions: 1
- Initial region: r0, states=6, dist=6, internalBidirectional=10, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@6 -> r6@13 -> r35@20 -> r56@24 -> r103@27 -> r166@31
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=415, edges=899, winReachable=7, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=2/6, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/6, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=6, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@6 -> s12@13 -> s35@20 -> s44@24 -> s51@27 -> s53@31

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 6 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 6 | 4 | 14 | 4 | 1 | 3 | 1 | 1 | s12 | yes |
| s12 | 13 | 3 | 22 | 7 | 2 | 5 | 1 | 1 | s35 | no |
| s35 | 20 | 3 | 8 | 3 | 1 | 2 | 1 | 1 | s44 | yes |
| s44 | 24 | 2 | 24 | 7 | 1 | 6 | 2 | 2 | s51 | yes |
| s51 | 27 | 1 | 16 | 6 | 1 | 5 | 1 | 1 | s53 | yes |
| s53 | 31 | 0 | 75 | 9 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s1 | 6 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s1 | 6 | 13 | s12 | 14 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s12 | 13 | 20 | s35 | 22 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s35 | 20 | 24 | s44 | 8 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s44 | 24 | 27 | s51 | 24 | no | yes | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s51 | 27 | 31 | s53 | 16 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len4, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=10315, regions=424, solution commitments=6
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/6, optimal prefix=2/6, forced viable commitments=4/6
- Endgame tail: 13 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; 13 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r1 | 6 | 1 | 0 | 1 | forced optimal |
| 12 | r1 | r6 | 5 | 1 | 3 | 1 | forced optimal |
| 19 | r6 | r35 | 4 | 2 | 5 | 2 | multiple optimal choices |
| 23 | r35 | r56 | 3 | 1 | 2 | 1 | forced optimal |
| 26 | r56 | r103 | 2 | 2 | 3 | 1 | forced optimal |
| 30 | r103 | r166 | 1 | 1 | 5 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 6 | 5 | 14 | 4 | 1 | 3 | 1 | 1 | r6 | no | yes | yes |
| r6 | 13 | 4 | 22 | 7 | 2 | 5 | 2 | 2 | r35 | no | no | no |
| r35 | 20 | 3 | 8 | 3 | 1 | 2 | 1 | 1 | r56 | no | yes | yes |
| r56 | 24 | 2 | 12 | 5 | 2 | 3 | 1 | 1 | r103 | no | no | yes |
| r103 | 27 | 1 | 16 | 6 | 1 | 5 | 1 | 1 | r166 | no | yes | yes |
| r166 | 31 | 0 | 25 | 5 | 1 | 4 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r1 | yes | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 7 | right | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r1 | no | 5 | 4 | 1 | 3 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 13 | right | r6 | yes | 4 | 7 | 2 | 5 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 14 | right | r6 | no | 4 | 7 | 2 | 5 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r6 | no | 4 | 7 | 2 | 5 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r6 | no | 4 | 7 | 2 | 5 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r6 | no | 4 | 7 | 2 | 5 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r6 | no | 4 | 7 | 2 | 5 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r6 | no | 4 | 7 | 2 | 5 | 2 | 2 | r35 | yes | yes | yes | yes | no | no | walk |
| 20 | left | r35 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 21 | down | r35 | no | 3 | 3 | 1 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r35 | no | 3 | 3 | 1 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r35 | no | 3 | 3 | 1 | 2 | 1 | 1 | r56 | yes | yes | yes | yes | yes | yes | walk |
| 24 | left | r56 | yes | 2 | 5 | 2 | 3 | 1 | 1 | r56 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 25 | left | r56 | no | 2 | 5 | 2 | 3 | 1 | 1 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | up | r56 | no | 2 | 5 | 2 | 3 | 1 | 1 | r103 | yes | yes | yes | yes | no | yes | walk |
| 27 | left | r103 | yes | 1 | 6 | 1 | 5 | 1 | 1 | r103 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 28 | left | r103 | no | 1 | 6 | 1 | 5 | 1 | 1 | r103 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r103 | no | 1 | 6 | 1 | 5 | 1 | 1 | r103 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | down | r103 | no | 1 | 6 | 1 | 5 | 1 | 1 | r166 | yes | yes | yes | yes | yes | yes | walk |
| 31 | right | r166 | yes | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len4, ice_boundary_disappear_after_group |
| 32 | right | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | up | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | up | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | up | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | r166 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | up | r166 | no | 0 | 5 | 1 | 4 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

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

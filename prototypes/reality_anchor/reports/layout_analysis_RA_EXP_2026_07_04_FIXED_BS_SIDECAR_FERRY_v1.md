# Level Analysis: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed B/S sidecar ferry v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#.@PL.....#
###########
```

## Shortest Solution

- Found: yes
- Cost: 11
- Depth: 11
- Explored states: 167
- Inputs: right right right right up right up left down left up
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:push_pull_anchor=4, anchor_boundary_shift:push_pull=4, walk=5, push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#.@PL.....#
###########
```

After:

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#..@PL....#
###########
```

### Step 2: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#..@PL....#
###########
```

After:

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#...@PL...#
###########
```

### Step 3: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#...@PL...#
###########
```

After:

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#....@PL..#
###########
```

### Step 4: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#....@PL..#
###########
```

After:

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#.....@PL.#
###########
```

### Step 8: left

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
#####SB####
####GG#####
####M.C@..#
#...#.....#
#......PL.#
###########
```

After:

```text
###########
#####SB####
####GG#####
####MM@...#
#...#.....#
#......PL.#
###########
```

### Step 11: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#####SB####
####GG#####
####MM....#
#...#@....#
#......PL.#
###########
```

After:

```text
###########
#####SB####
####mm#####
####.@....#
#...#.....#
#......PL.#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 1916
- Legal transitions: 4827
- Event-only illegal transitions: 0
- Winning states: 126
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1916
- Legal transitions: 4827
- Budget: maxStates=400000
- Compressed regions: 123
- Bidirectional transitions: 4490
- Commitment transitions: 290
- Winning regions: 6
- Initial region: r0, states=5, dist=6, internalBidirectional=10, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r3@3 -> r4@4 -> r11@8 -> r25@11
- Forced commitment prefix length: 3
- Forced viable prefix length: 3
- Forced optimal prefix length: 6

### SCC Irreversible Progress

- Shape: sccs=53, edges=98, winReachable=19, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=3/6, branchingWinSccs=6, mergingWinSccs=7
- Handoff scriptiness: scope=returned_solution, scripted=4/6, trivial=0, sameEntryExit=4, forcedScripted=3, maxRun=4
- Initial SCC: s0, states=5, dist=6, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@3 -> s4@4 -> s5@8 -> s6@11

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 5 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 5 | 6 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 4 | 7 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 3 | 3 | 21 | 3 | 3 | 0 | 1 | 1 | s4 | no |
| s4 | 4 | 2 | 63 | 5 | 3 | 2 | 1 | 1 | s5 | no |
| s5 | 8 | 1 | 57 | 2 | 2 | 0 | 1 | 1 | s6 | no |
| s6 | 11 | 0 | 63 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 5 | yes | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 6 | yes | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s2 | 2 | 3 | s3 | 7 | yes | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s3 | 3 | 4 | s4 | 21 | yes | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s4 | 4 | 8 | s5 | 63 | no | no | left | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s5 | 8 | 11 | s6 | 57 | no | no | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1916, regions=123, solution commitments=6
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/6, optimal prefix=6/6, forced viable commitments=3/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 3 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 1 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 5 | 1 | 0 | 1 | forced optimal |
| 2 | r2 | r3 | 4 | 1 | 0 | 1 | forced optimal |
| 3 | r3 | r4 | 3 | 4 | 0 | 1 | forced optimal |
| 7 | r4 | r11 | 2 | 4 | 0 | 1 | forced optimal |
| 10 | r11 | r25 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 5 | 6 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 4 | 7 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 3 | 3 | 20 | 4 | 4 | 0 | 1 | 1 | r4 | no | no | yes |
| r4 | 4 | 2 | 21 | 4 | 4 | 0 | 1 | 1 | r11 | no | no | yes |
| r11 | 8 | 1 | 19 | 3 | 3 | 0 | 1 | 1 | r25 | no | no | yes |
| r25 | 11 | 0 | 21 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | right | r2 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | right | r3 | yes | 3 | 4 | 4 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 4 | right | r4 | yes | 2 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 5 | up | r4 | no | 2 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r4 | no | 2 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r4 | no | 2 | 4 | 4 | 0 | 1 | 1 | r11 | yes | yes | yes | yes | no | yes | walk |
| 8 | left | r11 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 9 | down | r11 | no | 1 | 3 | 3 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r11 | no | 1 | 3 | 3 | 0 | 1 | 1 | r25 | yes | yes | yes | yes | no | yes | walk |
| 11 | up | r25 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### K_runtime_smoke

Reality Anchor v0 runtime smoke behavior is executable through the registered adapter.

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

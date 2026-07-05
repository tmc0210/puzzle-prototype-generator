# Level Analysis: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v2_prune_no_lower

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v2_prune_no_lower
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#......G##.#
#....@C.MM.#
#..##....G##
#..##....###
#.....BS...#
############
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 3271
- Inputs: right up right down left down down left down right up right up up
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1
- Event counts: push_object:crate#1=3, box_to_sticky:n1=1, sticky_merge:n1=1, walk=9, push_object:sticky#1=1, move_sticky_rigid=1, push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
############
#......G##.#
#....@C.MM.#
#..##....G##
#..##....###
#.....BS...#
############
```

After:

```text
############
#......G##.#
#.....@MMM.#
#..##....G##
#..##....###
#.....BS...#
############
```

### Step 4: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
############
#......+##.#
#......MMM.#
#..##....G##
#..##....###
#.....BS...#
############
```

After:

```text
############
#......G##.#
#......@...#
#..##..MMm##
#..##....###
#.....BS...#
############
```

### Step 10: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
############
#......G##.#
#..........#
#..##..MMm##
#..##....###
#....@BS...#
############
```

After:

```text
############
#......G##.#
#..........#
#..##..CMm##
#..##....###
#.....@BS..#
############
```

### Step 13: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#......G##.#
#..........#
#..##..CMm##
#..##..@.###
#......BS..#
############
```

After:

```text
############
#......G##.#
#......C...#
#..##..@Mm##
#..##....###
#......BS..#
############
```

### Step 14: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#......G##.#
#......C...#
#..##..@Mm##
#..##....###
#......BS..#
############
```

After:

```text
############
#......*##.#
#......@...#
#..##...Mm##
#..##....###
#......BS..#
############
```


## Graph Facts

- Status: complete
- Reachable states: 32329
- Legal transitions: 94850
- Event-only illegal transitions: 0
- Winning states: 379
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 32329
- Legal transitions: 94850
- Budget: maxStates=500000
- Compressed regions: 946
- Bidirectional transitions: 91484
- Commitment transitions: 3366
- Winning regions: 11
- Initial region: r0, states=34, dist=5, internalBidirectional=90, commitments=7, viableCommitments=4, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r7@4 -> r91@10 -> r225@13 -> r271@14
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=240, edges=620, winReachable=31, winning=10, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=2/3, branchingWinSccs=16, mergingWinSccs=19
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=2210, dist=3, out=17, winOut=1, deadOut=16
- SCC path: s0@0 -> s8@1 -> s9@10 -> s11@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 2210 | 17 | 1 | 16 | 0 | 0 | s8 | yes |
| s8 | 1 | 2 | 350 | 4 | 1 | 3 | 1 | 1 | s9 | yes |
| s9 | 10 | 1 | 64 | 5 | 3 | 2 | 1 | 1 | s11 | no |
| s11 | 14 | 0 | 34 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s8 | 2210 | yes | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s8 | 1 | 10 | s9 | 350 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s9 | 10 | 14 | s11 | 64 | no | no | up | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=32329, regions=946, solution commitments=5
- Opening: commitments=7, viable=4, dead=3, optimal=1
- Win-continuation prefix: viable prefix=0/5, optimal prefix=5/5, forced viable commitments=0/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 4 | 3 | 1 | forced optimal |
| 3 | r1 | r7 | 4 | 2 | 2 | 1 | forced optimal |
| 9 | r7 | r91 | 3 | 3 | 0 | 1 | forced optimal |
| 12 | r91 | r225 | 2 | 3 | 1 | 1 | forced optimal |
| 13 | r225 | r271 | 1 | 3 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 34 | 7 | 4 | 3 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 4 | 34 | 4 | 2 | 2 | 1 | 1 | r7 | no | no | yes |
| r7 | 4 | 3 | 36 | 3 | 3 | 0 | 1 | 1 | r91 | no | no | yes |
| r91 | 10 | 2 | 34 | 4 | 3 | 1 | 1 | 1 | r225 | no | no | yes |
| r225 | 13 | 1 | 30 | 5 | 3 | 2 | 1 | 1 | r271 | no | no | yes |
| r271 | 14 | 0 | 34 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 7 | 4 | 3 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 4 | 4 | 2 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 2 | up | r1 | no | 4 | 4 | 2 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 4 | 4 | 2 | 2 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | walk |
| 4 | down | r7 | yes | 3 | 3 | 3 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | left | r7 | no | 3 | 3 | 3 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r7 | no | 3 | 3 | 3 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r7 | no | 3 | 3 | 3 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r7 | no | 3 | 3 | 3 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r7 | no | 3 | 3 | 3 | 0 | 1 | 1 | r91 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r91 | yes | 2 | 4 | 3 | 1 | 1 | 1 | r91 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 11 | up | r91 | no | 2 | 4 | 3 | 1 | 1 | 1 | r91 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r91 | no | 2 | 4 | 3 | 1 | 1 | 1 | r225 | yes | yes | yes | yes | no | yes | walk |
| 13 | up | r225 | yes | 1 | 5 | 3 | 2 | 1 | 1 | r271 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 14 | up | r271 | yes | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

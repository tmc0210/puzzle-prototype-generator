# Level Analysis: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v1_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: Brush triple output v1 no top goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#############
#.......#####
#....@C.MM###
#..##.....G##
#..##...G####
#.....BS..###
#############
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 3780
- Inputs: right up right down left down down left down right right up up up right down right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 push_object:crate#1 walk push_object:crate#2 push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:crate#1=3, box_to_sticky:n1=1, sticky_merge:n1=1, walk=9, push_object:sticky#1=2, move_sticky_rigid=2, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=2, push_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#############
#.......#####
#....@C.MM###
#..##.....G##
#..##...G####
#.....BS..###
#############
```

After:

```text
#############
#.......#####
#.....@MMM###
#..##.....G##
#..##...G####
#.....BS..###
#############
```

### Step 4: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#############
#......@#####
#......MMM###
#..##.....G##
#..##...G####
#.....BS..###
#############
```

After:

```text
#############
#.......#####
#......@..###
#..##..MMMG##
#..##...G####
#.....BS..###
#############
```

### Step 10: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#############
#.......#####
#.........###
#..##..MMMG##
#..##...G####
#....@BS..###
#############
```

After:

```text
#############
#.......#####
#.........###
#..##..CMMG##
#..##...G####
#.....@BS.###
#############
```

### Step 11: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#############
#.......#####
#.........###
#..##..CMMG##
#..##...G####
#.....@BS.###
#############
```

After:

```text
#############
#.......#####
#.........###
#..##..CCMG##
#..##...G####
#......@BS###
#############
```

### Step 13: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
#############
#.......#####
#.........###
#..##..CCMG##
#..##..@G####
#.......BS###
#############
```

After:

```text
#############
#.......#####
#......C..###
#..##..@CMG##
#..##...G####
#.......BS###
#############
```

### Step 14: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
#############
#.......#####
#......C..###
#..##..@CMG##
#..##...G####
#.......BS###
#############
```

After:

```text
#############
#......C#####
#......@..###
#..##...CMG##
#..##...G####
#.......BS###
#############
```

### Step 16: down

- Legal: true
- Events: push_object:crate#2

Before:

```text
#############
#......C#####
#.......@.###
#..##...CMG##
#..##...G####
#.......BS###
#############
```

After:

```text
#############
#......C#####
#.........###
#..##...@MG##
#..##...*####
#.......BS###
#############
```

### Step 17: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#############
#......C#####
#.........###
#..##...@MG##
#..##...*####
#.......BS###
#############
```

After:

```text
#############
#......C#####
#.........###
#..##....@m##
#..##...*####
#.......BS###
#############
```


## Graph Facts

- Status: complete
- Reachable states: 34298
- Legal transitions: 100234
- Event-only illegal transitions: 0
- Winning states: 99
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 34298
- Legal transitions: 100234
- Budget: maxStates=300000
- Compressed regions: 1113
- Bidirectional transitions: 96428
- Commitment transitions: 3806
- Winning regions: 99
- Initial region: r0, states=34, dist=6, internalBidirectional=90, commitments=6, viableCommitments=4, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r6@4 -> r57@10 -> r78@11 -> r127@13 -> r149@14 -> r203@16 -> r231@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=278, edges=518, winReachable=142, winning=99, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=1/6, branchingWinSccs=25, mergingWinSccs=25
- Handoff scriptiness: scope=returned_solution, scripted=3/6, trivial=0, sameEntryExit=3, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=2210, dist=4, out=16, winOut=1, deadOut=15
- SCC path: s0@0 -> s6@1 -> s7@10 -> s23@11 -> s200@14 -> s201@16 -> s202@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 2210 | 16 | 1 | 15 | 0 | 0 | s6 | yes |
| s6 | 1 | 3 | 335 | 4 | 2 | 2 | 1 | 1 | s7 | no |
| s7 | 10 | 2 | 62 | 7 | 5 | 2 | 1 | 1 | s23 | no |
| s23 | 11 | 2 | 96 | 8 | 7 | 1 | 2 | 2 | s200 | no |
| s200 | 14 | 2 | 33 | 3 | 2 | 1 | 2 | 2 | s201 | no |
| s201 | 16 | 1 | 33 | 1 | 1 | 0 | 3 | 3 | s202 | yes |
| s202 | 17 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s6 | 2210 | yes | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s6 | 1 | 10 | s7 | 335 | no | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s7 | 10 | 11 | s23 | 62 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s23 | 11 | 14 | s200 | 96 | no | no | up | push_object:crate#1 | has_reposition_room |
| s200 | 14 | 16 | s201 | 33 | no | no | down | push_object:crate#2 | has_reposition_room |
| s201 | 16 | 17 | s202 | 33 | yes | yes | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=34298, regions=1113, solution commitments=8
- Opening: commitments=6, viable=4, dead=2, optimal=1
- Win-continuation prefix: viable prefix=0/8, optimal prefix=2/8, forced viable commitments=1/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 4 | 2 | 1 | forced optimal |
| 3 | r1 | r6 | 5 | 2 | 1 | 1 | forced optimal |
| 9 | r6 | r57 | 4 | 4 | 0 | 2 | multiple optimal choices |
| 10 | r57 | r78 | 3 | 4 | 1 | 3 | multiple optimal choices |
| 12 | r78 | r127 | 2 | 5 | 0 | 2 | multiple optimal choices |
| 13 | r127 | r149 | 3 | 4 | 1 | 2 | multiple optimal choices |
| 15 | r149 | r203 | 2 | 2 | 1 | 1 | forced optimal |
| 16 | r203 | r231 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 34 | 6 | 4 | 2 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 5 | 34 | 3 | 2 | 1 | 1 | 1 | r6 | no | no | yes |
| r6 | 4 | 4 | 33 | 4 | 4 | 0 | 2 | 2 | r57 | no | no | no |
| r57 | 10 | 3 | 32 | 5 | 4 | 1 | 3 | 3 | r78 | no | no | no |
| r78 | 11 | 2 | 33 | 5 | 5 | 0 | 2 | 2 | r127 | no | no | no |
| r127 | 13 | 3 | 31 | 5 | 4 | 1 | 2 | 2 | r149 | no | no | no |
| r149 | 14 | 2 | 33 | 3 | 2 | 1 | 1 | 1 | r203 | no | no | yes |
| r203 | 16 | 1 | 33 | 1 | 1 | 0 | 1 | 1 | r231 | yes | yes | yes |
| r231 | 17 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 6 | 4 | 2 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 5 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 2 | up | r1 | no | 5 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 5 | 3 | 2 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 4 | down | r6 | yes | 4 | 4 | 4 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | left | r6 | no | 4 | 4 | 4 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r6 | no | 4 | 4 | 4 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r6 | no | 4 | 4 | 4 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r6 | no | 4 | 4 | 4 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r6 | no | 4 | 4 | 4 | 0 | 2 | 2 | r57 | yes | yes | yes | yes | no | no | walk |
| 10 | right | r57 | yes | 3 | 5 | 4 | 1 | 3 | 3 | r78 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 11 | right | r78 | yes | 2 | 5 | 5 | 0 | 2 | 2 | r78 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 12 | up | r78 | no | 2 | 5 | 5 | 0 | 2 | 2 | r127 | yes | yes | no | no | no | no | walk |
| 13 | up | r127 | yes | 3 | 5 | 4 | 1 | 2 | 2 | r149 | yes | yes | yes | yes | no | no | push_object:crate#1 |
| 14 | up | r149 | yes | 2 | 3 | 2 | 1 | 1 | 1 | r149 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 15 | right | r149 | no | 2 | 3 | 2 | 1 | 1 | 1 | r203 | yes | yes | yes | yes | no | yes | walk |
| 16 | down | r203 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r231 | yes | yes | yes | yes | yes | yes | push_object:crate#2 |
| 17 | right | r231 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

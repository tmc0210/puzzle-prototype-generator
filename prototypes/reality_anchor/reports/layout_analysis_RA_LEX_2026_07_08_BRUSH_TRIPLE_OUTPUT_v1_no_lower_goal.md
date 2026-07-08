# Level Analysis: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v1_no_lower_goal

## Summary

- Prototype: reality_anchor
- Title: Brush triple output v1 no lower goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#############
#......G#####
#....@C.MM###
#..##.....G##
#..##....####
#.....BS..###
#############
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 3074
- Inputs: right up right down left down down left down right up right up up down right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:crate#1=3, box_to_sticky:n1=1, sticky_merge:n1=1, walk=10, push_object:sticky#1=2, move_sticky_rigid=2, push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#############
#......G#####
#....@C.MM###
#..##.....G##
#..##....####
#.....BS..###
#############
```

After:

```text
#############
#......G#####
#.....@MMM###
#..##.....G##
#..##....####
#.....BS..###
#############
```

### Step 4: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#############
#......+#####
#......MMM###
#..##.....G##
#..##....####
#.....BS..###
#############
```

After:

```text
#############
#......G#####
#......@..###
#..##..MMMG##
#..##....####
#.....BS..###
#############
```

### Step 10: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#############
#......G#####
#.........###
#..##..MMMG##
#..##....####
#....@BS..###
#############
```

After:

```text
#############
#......G#####
#.........###
#..##..CMMG##
#..##....####
#.....@BS.###
#############
```

### Step 13: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
#############
#......G#####
#.........###
#..##..CMMG##
#..##..@.####
#......BS.###
#############
```

After:

```text
#############
#......G#####
#......C..###
#..##..@MMG##
#..##....####
#......BS.###
#############
```

### Step 14: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
#############
#......G#####
#......C..###
#..##..@MMG##
#..##....####
#......BS.###
#############
```

After:

```text
#############
#......*#####
#......@..###
#..##...MMG##
#..##....####
#......BS.###
#############
```

### Step 16: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#############
#......*#####
#.........###
#..##..@MMG##
#..##....####
#......BS.###
#############
```

After:

```text
#############
#......*#####
#.........###
#..##...@Mm##
#..##....####
#......BS.###
#############
```


## Graph Facts

- Status: complete
- Reachable states: 34273
- Legal transitions: 100234
- Event-only illegal transitions: 0
- Winning states: 74
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 34273
- Legal transitions: 100234
- Budget: maxStates=300000
- Compressed regions: 1088
- Bidirectional transitions: 96428
- Commitment transitions: 3806
- Winning regions: 74
- Initial region: r0, states=34, dist=6, internalBidirectional=90, commitments=6, viableCommitments=4, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r6@4 -> r57@10 -> r126@13 -> r147@14 -> r199@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=252, edges=486, winReachable=116, winning=74, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=26, mergingWinSccs=26
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=2210, dist=4, out=16, winOut=1, deadOut=15
- SCC path: s0@0 -> s6@1 -> s7@10 -> s9@14 -> s10@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 2210 | 16 | 1 | 15 | 0 | 0 | s6 | yes |
| s6 | 1 | 3 | 335 | 4 | 1 | 3 | 1 | 1 | s7 | yes |
| s7 | 10 | 2 | 62 | 7 | 4 | 3 | 1 | 1 | s9 | no |
| s9 | 14 | 1 | 32 | 3 | 2 | 1 | 1 | 1 | s10 | no |
| s10 | 16 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s6 | 2210 | yes | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s6 | 1 | 10 | s7 | 335 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s7 | 10 | 14 | s9 | 62 | no | no | up | push_object:crate#1 | has_reposition_room |
| s9 | 14 | 16 | s10 | 32 | no | no | right | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=34273, regions=1088, solution commitments=6
- Opening: commitments=6, viable=4, dead=2, optimal=1
- Win-continuation prefix: viable prefix=0/6, optimal prefix=4/6, forced viable commitments=0/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 4 | 2 | 1 | forced optimal |
| 3 | r1 | r6 | 5 | 2 | 1 | 1 | forced optimal |
| 9 | r6 | r57 | 4 | 3 | 1 | 1 | forced optimal |
| 12 | r57 | r126 | 3 | 3 | 2 | 1 | forced optimal |
| 13 | r126 | r147 | 2 | 4 | 2 | 2 | multiple optimal choices |
| 15 | r147 | r199 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 34 | 6 | 4 | 2 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 5 | 34 | 3 | 2 | 1 | 1 | 1 | r6 | no | no | yes |
| r6 | 4 | 4 | 33 | 4 | 3 | 1 | 1 | 1 | r57 | no | no | yes |
| r57 | 10 | 3 | 32 | 5 | 3 | 2 | 1 | 1 | r126 | no | no | yes |
| r126 | 13 | 2 | 30 | 6 | 4 | 2 | 2 | 2 | r147 | no | no | no |
| r147 | 14 | 1 | 32 | 3 | 2 | 1 | 1 | 1 | r199 | no | no | yes |
| r199 | 16 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 6 | 4 | 2 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 5 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 2 | up | r1 | no | 5 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 5 | 3 | 2 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 4 | down | r6 | yes | 4 | 4 | 3 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | left | r6 | no | 4 | 4 | 3 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r6 | no | 4 | 4 | 3 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r6 | no | 4 | 4 | 3 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r6 | no | 4 | 4 | 3 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r6 | no | 4 | 4 | 3 | 1 | 1 | 1 | r57 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r57 | yes | 3 | 5 | 3 | 2 | 1 | 1 | r57 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 11 | up | r57 | no | 3 | 5 | 3 | 2 | 1 | 1 | r57 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r57 | no | 3 | 5 | 3 | 2 | 1 | 1 | r126 | yes | yes | yes | yes | no | yes | walk |
| 13 | up | r126 | yes | 2 | 6 | 4 | 2 | 2 | 2 | r147 | yes | yes | yes | yes | no | no | push_object:crate#1 |
| 14 | up | r147 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r147 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 15 | down | r147 | no | 1 | 3 | 2 | 1 | 1 | 1 | r199 | yes | yes | yes | yes | no | yes | walk |
| 16 | right | r199 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

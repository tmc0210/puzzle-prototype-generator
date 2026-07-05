# Level Analysis: RA_SCRATCH_TIMING_LOCK_A

## Summary

- Prototype: reality_anchor
- Title: RA_SCRATCH_TIMING_LOCK_A
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
#..##.....##
#..##...G###
#####.BS...#
############
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 4081
- Inputs: right up right down left down down left down right right up up up right down
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 push_object:crate#1 walk push_object:crate#2
- Event counts: push_object:crate#1=3, box_to_sticky:n1=1, sticky_merge:n1=1, walk=9, push_object:sticky#1=1, move_sticky_rigid=1, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=2, push_object:crate#2=1

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
#..##.....##
#..##...G###
#####.BS...#
############
```

After:

```text
############
#......G##.#
#.....@MMM.#
#..##.....##
#..##...G###
#####.BS...#
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
#..##.....##
#..##...G###
#####.BS...#
############
```

After:

```text
############
#......G##.#
#......@...#
#..##..MMM##
#..##...G###
#####.BS...#
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
#..##..MMM##
#..##...G###
#####@BS...#
############
```

After:

```text
############
#......G##.#
#..........#
#..##..CMM##
#..##...G###
#####.@BS..#
############
```

### Step 11: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
############
#......G##.#
#..........#
#..##..CMM##
#..##...G###
#####.@BS..#
############
```

After:

```text
############
#......G##.#
#..........#
#..##..CCM##
#..##...G###
#####..@BS.#
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
#..##..CCM##
#..##..@G###
#####...BS.#
############
```

After:

```text
############
#......G##.#
#......C...#
#..##..@CM##
#..##...G###
#####...BS.#
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
#..##..@CM##
#..##...G###
#####...BS.#
############
```

After:

```text
############
#......*##.#
#......@...#
#..##...CM##
#..##...G###
#####...BS.#
############
```

### Step 16: down

- Legal: true
- Events: push_object:crate#2

Before:

```text
############
#......*##.#
#.......@..#
#..##...CM##
#..##...G###
#####...BS.#
############
```

After:

```text
############
#......*##.#
#..........#
#..##...@M##
#..##...*###
#####...BS.#
############
```


## Graph Facts

- Status: complete
- Reachable states: 17450
- Legal transitions: 51067
- Event-only illegal transitions: 0
- Winning states: 63
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 17450
- Legal transitions: 51067
- Budget: maxStates=300000
- Compressed regions: 580
- Bidirectional transitions: 49260
- Commitment transitions: 1807
- Winning regions: 2
- Initial region: r0, states=30, dist=7, internalBidirectional=78, commitments=7, viableCommitments=3, deadCommitments=4, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r7@4 -> r78@10 -> r110@11 -> r171@13 -> r196@14 -> r258@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=241, edges=586, winReachable=13, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=2/5, branchingWinSccs=6, mergingWinSccs=6
- Handoff scriptiness: scope=returned_solution, scripted=2/5, trivial=0, sameEntryExit=2, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=270, dist=5, out=10, winOut=1, deadOut=9
- SCC path: s0@0 -> s7@1 -> s8@10 -> s13@11 -> s100@14 -> s101@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 270 | 10 | 1 | 9 | 0 | 0 | s7 | yes |
| s7 | 1 | 4 | 62 | 4 | 1 | 3 | 1 | 1 | s8 | yes |
| s8 | 10 | 3 | 56 | 5 | 3 | 2 | 1 | 1 | s13 | no |
| s13 | 11 | 2 | 88 | 7 | 3 | 4 | 2 | 2 | s100 | no |
| s100 | 14 | 1 | 31 | 3 | 2 | 1 | 2 | 2 | s101 | no |
| s101 | 16 | 0 | 31 | 1 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s7 | 270 | yes | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s7 | 1 | 10 | s8 | 62 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s8 | 10 | 11 | s13 | 56 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s13 | 11 | 14 | s100 | 88 | no | no | up | push_object:crate#1 | has_reposition_room |
| s100 | 14 | 16 | s101 | 31 | no | no | down | push_object:crate#2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=17450, regions=580, solution commitments=7
- Opening: commitments=7, viable=3, dead=4, optimal=1
- Win-continuation prefix: viable prefix=0/7, optimal prefix=3/7, forced viable commitments=1/7
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 7 | 3 | 4 | 1 | forced optimal |
| 3 | r1 | r7 | 6 | 1 | 3 | 1 | forced optimal |
| 9 | r7 | r78 | 5 | 2 | 1 | 1 | forced optimal |
| 10 | r78 | r110 | 4 | 3 | 1 | 2 | multiple optimal choices |
| 12 | r110 | r171 | 3 | 4 | 1 | 2 | multiple optimal choices |
| 13 | r171 | r196 | 2 | 3 | 2 | 1 | forced optimal |
| 15 | r196 | r258 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 7 | 30 | 7 | 3 | 4 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 6 | 30 | 4 | 1 | 3 | 1 | 1 | r7 | no | yes | yes |
| r7 | 4 | 5 | 32 | 3 | 2 | 1 | 1 | 1 | r78 | no | no | yes |
| r78 | 10 | 4 | 30 | 4 | 3 | 1 | 2 | 2 | r110 | no | no | no |
| r110 | 11 | 3 | 31 | 5 | 4 | 1 | 2 | 2 | r171 | no | no | no |
| r171 | 13 | 2 | 27 | 5 | 3 | 2 | 1 | 1 | r196 | no | no | yes |
| r196 | 14 | 1 | 31 | 3 | 2 | 1 | 1 | 1 | r258 | no | no | yes |
| r258 | 16 | 0 | 31 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 7 | 7 | 3 | 4 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 6 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 2 | up | r1 | no | 6 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 6 | 4 | 1 | 3 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 4 | down | r7 | yes | 5 | 3 | 2 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | left | r7 | no | 5 | 3 | 2 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r7 | no | 5 | 3 | 2 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r7 | no | 5 | 3 | 2 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r7 | no | 5 | 3 | 2 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r7 | no | 5 | 3 | 2 | 1 | 1 | 1 | r78 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r78 | yes | 4 | 4 | 3 | 1 | 2 | 2 | r110 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 11 | right | r110 | yes | 3 | 5 | 4 | 1 | 2 | 2 | r110 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 12 | up | r110 | no | 3 | 5 | 4 | 1 | 2 | 2 | r171 | yes | yes | yes | yes | no | no | walk |
| 13 | up | r171 | yes | 2 | 5 | 3 | 2 | 1 | 1 | r196 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 14 | up | r196 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r196 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 15 | right | r196 | no | 1 | 3 | 2 | 1 | 1 | 1 | r258 | yes | yes | yes | yes | no | yes | walk |
| 16 | down | r258 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |

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

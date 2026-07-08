# Level Analysis: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2

## Summary

- Prototype: reality_anchor
- Title: Brush triple output v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#############
######.G#####
#####@C.MM###
#####.....G##
#####...G####
#####.BS..###
#############
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 1004
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
######.G#####
#####@C.MM###
#####.....G##
#####...G####
#####.BS..###
#############
```

After:

```text
#############
######.G#####
#####.@MMM###
#####.....G##
#####...G####
#####.BS..###
#############
```

### Step 4: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#############
######.+#####
#####..MMM###
#####.....G##
#####...G####
#####.BS..###
#############
```

After:

```text
#############
######.G#####
#####..@..###
#####..MMMG##
#####...G####
#####.BS..###
#############
```

### Step 10: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#############
######.G#####
#####.....###
#####..MMMG##
#####...G####
#####@BS..###
#############
```

After:

```text
#############
######.G#####
#####.....###
#####..CMMG##
#####...G####
#####.@BS.###
#############
```

### Step 11: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#############
######.G#####
#####.....###
#####..CMMG##
#####...G####
#####.@BS.###
#############
```

After:

```text
#############
######.G#####
#####.....###
#####..CCMG##
#####...G####
#####..@BS###
#############
```

### Step 13: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
#############
######.G#####
#####.....###
#####..CCMG##
#####..@G####
#####...BS###
#############
```

After:

```text
#############
######.G#####
#####..C..###
#####..@CMG##
#####...G####
#####...BS###
#############
```

### Step 14: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
#############
######.G#####
#####..C..###
#####..@CMG##
#####...G####
#####...BS###
#############
```

After:

```text
#############
######.*#####
#####..@..###
#####...CMG##
#####...G####
#####...BS###
#############
```

### Step 16: down

- Legal: true
- Events: push_object:crate#2

Before:

```text
#############
######.*#####
#####...@.###
#####...CMG##
#####...G####
#####...BS###
#############
```

After:

```text
#############
######.*#####
#####.....###
#####...@MG##
#####...*####
#####...BS###
#############
```

### Step 17: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#############
######.*#####
#####.....###
#####...@MG##
#####...*####
#####...BS###
#############
```

After:

```text
#############
######.*#####
#####.....###
#####....@m##
#####...*####
#####...BS###
#############
```


## Graph Facts

- Status: complete
- Reachable states: 5140
- Legal transitions: 14372
- Event-only illegal transitions: 0
- Winning states: 4
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5140
- Legal transitions: 14372
- Budget: maxStates=100000
- Compressed regions: 315
- Bidirectional transitions: 13428
- Commitment transitions: 944
- Winning regions: 4
- Initial region: r0, states=17, dist=8, internalBidirectional=38, commitments=6, viableCommitments=2, deadCommitments=4, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@4 -> r21@10 -> r30@11 -> r44@13 -> r52@14 -> r78@16 -> r87@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=164, edges=358, winReachable=18, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=2/6, branchingWinSccs=6, mergingWinSccs=5
- Handoff scriptiness: scope=returned_solution, scripted=3/6, trivial=0, sameEntryExit=3, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=51, dist=6, out=8, winOut=1, deadOut=7
- SCC path: s0@0 -> s4@1 -> s6@10 -> s22@11 -> s115@14 -> s116@16 -> s117@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 51 | 8 | 1 | 7 | 0 | 0 | s4 | yes |
| s4 | 1 | 5 | 33 | 4 | 1 | 3 | 1 | 1 | s6 | yes |
| s6 | 10 | 4 | 28 | 7 | 3 | 4 | 1 | 1 | s22 | no |
| s22 | 11 | 3 | 45 | 8 | 3 | 5 | 2 | 2 | s115 | no |
| s115 | 14 | 2 | 16 | 3 | 1 | 2 | 2 | 2 | s116 | yes |
| s116 | 16 | 1 | 16 | 1 | 1 | 0 | 2 | 2 | s117 | yes |
| s117 | 17 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s4 | 51 | yes | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s4 | 1 | 10 | s6 | 33 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s6 | 10 | 11 | s22 | 28 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s22 | 11 | 14 | s115 | 45 | no | no | up | push_object:crate#1 | has_reposition_room |
| s115 | 14 | 16 | s116 | 16 | no | yes | down | push_object:crate#2 | has_reposition_room |
| s116 | 16 | 17 | s117 | 16 | yes | yes | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=5140, regions=315, solution commitments=8
- Opening: commitments=6, viable=2, dead=4, optimal=1
- Win-continuation prefix: viable prefix=0/8, optimal prefix=3/8, forced viable commitments=3/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 8 | 2 | 4 | 1 | forced optimal |
| 3 | r1 | r4 | 7 | 1 | 2 | 1 | forced optimal |
| 9 | r4 | r21 | 6 | 2 | 2 | 1 | forced optimal |
| 10 | r21 | r30 | 5 | 3 | 2 | 2 | multiple optimal choices |
| 12 | r30 | r44 | 4 | 4 | 1 | 2 | multiple optimal choices |
| 13 | r44 | r52 | 3 | 3 | 2 | 1 | forced optimal |
| 15 | r52 | r78 | 2 | 1 | 2 | 1 | forced optimal |
| 16 | r78 | r87 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 8 | 17 | 6 | 2 | 4 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 7 | 17 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 4 | 6 | 16 | 4 | 2 | 2 | 1 | 1 | r21 | no | no | yes |
| r21 | 10 | 5 | 15 | 5 | 3 | 2 | 2 | 2 | r30 | no | no | no |
| r30 | 11 | 4 | 16 | 5 | 4 | 1 | 2 | 2 | r44 | no | no | no |
| r44 | 13 | 3 | 14 | 5 | 3 | 2 | 1 | 1 | r52 | no | no | yes |
| r52 | 14 | 2 | 16 | 3 | 1 | 2 | 1 | 1 | r78 | no | yes | yes |
| r78 | 16 | 1 | 16 | 1 | 1 | 0 | 1 | 1 | r87 | yes | yes | yes |
| r87 | 17 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 8 | 6 | 2 | 4 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 7 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 2 | up | r1 | no | 7 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 7 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 4 | down | r4 | yes | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | left | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r21 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r21 | yes | 5 | 5 | 3 | 2 | 2 | 2 | r30 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 11 | right | r30 | yes | 4 | 5 | 4 | 1 | 2 | 2 | r30 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 12 | up | r30 | no | 4 | 5 | 4 | 1 | 2 | 2 | r44 | yes | yes | yes | yes | no | no | walk |
| 13 | up | r44 | yes | 3 | 5 | 3 | 2 | 1 | 1 | r52 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 14 | up | r52 | yes | 2 | 3 | 1 | 2 | 1 | 1 | r52 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 15 | right | r52 | no | 2 | 3 | 1 | 2 | 1 | 1 | r78 | yes | yes | yes | yes | yes | yes | walk |
| 16 | down | r78 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r87 | yes | yes | yes | yes | yes | yes | push_object:crate#2 |
| 17 | right | r87 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

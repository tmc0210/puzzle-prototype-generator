# Level Analysis: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_right_goal

## Summary

- Prototype: reality_anchor
- Title: Brush triple output v2 no right goal
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
#####......##
#####...G####
#####.BS..###
#############
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 847
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
#############
######.G#####
#####@C.MM###
#####......##
#####...G####
#####.BS..###
#############
```

After:

```text
#############
######.G#####
#####.@MMM###
#####......##
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
#####......##
#####...G####
#####.BS..###
#############
```

After:

```text
#############
######.G#####
#####..@..###
#####..MMM.##
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
#####..MMM.##
#####...G####
#####@BS..###
#############
```

After:

```text
#############
######.G#####
#####.....###
#####..CMM.##
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
#####..CMM.##
#####...G####
#####.@BS.###
#############
```

After:

```text
#############
######.G#####
#####.....###
#####..CCM.##
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
#####..CCM.##
#####..@G####
#####...BS###
#############
```

After:

```text
#############
######.G#####
#####..C..###
#####..@CM.##
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
#####..@CM.##
#####...G####
#####...BS###
#############
```

After:

```text
#############
######.*#####
#####..@..###
#####...CM.##
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
#####...CM.##
#####...G####
#####...BS###
#############
```

After:

```text
#############
######.*#####
#####.....###
#####...@M.##
#####...*####
#####...BS###
#############
```


## Graph Facts

- Status: complete
- Reachable states: 5125
- Legal transitions: 14327
- Event-only illegal transitions: 0
- Winning states: 5
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5125
- Legal transitions: 14327
- Budget: maxStates=300000
- Compressed regions: 315
- Bidirectional transitions: 13384
- Commitment transitions: 943
- Winning regions: 5
- Initial region: r0, states=17, dist=7, internalBidirectional=38, commitments=6, viableCommitments=2, deadCommitments=4, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@4 -> r21@10 -> r30@11 -> r44@13 -> r52@14 -> r78@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=164, edges=357, winReachable=18, winning=5, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=2/5, branchingWinSccs=6, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=2/5, trivial=0, sameEntryExit=2, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=51, dist=5, out=8, winOut=1, deadOut=7
- SCC path: s0@0 -> s4@1 -> s6@10 -> s22@11 -> s116@14 -> s117@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 51 | 8 | 1 | 7 | 0 | 0 | s4 | yes |
| s4 | 1 | 4 | 33 | 4 | 1 | 3 | 1 | 1 | s6 | yes |
| s6 | 10 | 3 | 28 | 7 | 3 | 4 | 1 | 1 | s22 | no |
| s22 | 11 | 2 | 45 | 8 | 3 | 5 | 2 | 2 | s116 | no |
| s116 | 14 | 1 | 16 | 3 | 1 | 2 | 2 | 2 | s117 | yes |
| s117 | 16 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s4 | 51 | yes | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s4 | 1 | 10 | s6 | 33 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s6 | 10 | 11 | s22 | 28 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s22 | 11 | 14 | s116 | 45 | no | no | up | push_object:crate#1 | has_reposition_room |
| s116 | 14 | 16 | s117 | 16 | no | yes | down | push_object:crate#2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=5125, regions=315, solution commitments=7
- Opening: commitments=6, viable=2, dead=4, optimal=1
- Win-continuation prefix: viable prefix=0/7, optimal prefix=3/7, forced viable commitments=2/7
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 7 | 2 | 4 | 1 | forced optimal |
| 3 | r1 | r4 | 6 | 1 | 2 | 1 | forced optimal |
| 9 | r4 | r21 | 5 | 2 | 2 | 1 | forced optimal |
| 10 | r21 | r30 | 4 | 3 | 2 | 2 | multiple optimal choices |
| 12 | r30 | r44 | 3 | 4 | 1 | 2 | multiple optimal choices |
| 13 | r44 | r52 | 2 | 3 | 2 | 1 | forced optimal |
| 15 | r52 | r78 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 7 | 17 | 6 | 2 | 4 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 6 | 17 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 4 | 5 | 16 | 4 | 2 | 2 | 1 | 1 | r21 | no | no | yes |
| r21 | 10 | 4 | 15 | 5 | 3 | 2 | 2 | 2 | r30 | no | no | no |
| r30 | 11 | 3 | 16 | 5 | 4 | 1 | 2 | 2 | r44 | no | no | no |
| r44 | 13 | 2 | 14 | 5 | 3 | 2 | 1 | 1 | r52 | no | no | yes |
| r52 | 14 | 1 | 16 | 3 | 1 | 2 | 1 | 1 | r78 | no | yes | yes |
| r78 | 16 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 7 | 6 | 2 | 4 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 6 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 2 | up | r1 | no | 6 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 6 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 4 | down | r4 | yes | 5 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | left | r4 | no | 5 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r4 | no | 5 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r4 | no | 5 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r4 | no | 5 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r4 | no | 5 | 4 | 2 | 2 | 1 | 1 | r21 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r21 | yes | 4 | 5 | 3 | 2 | 2 | 2 | r30 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 11 | right | r30 | yes | 3 | 5 | 4 | 1 | 2 | 2 | r30 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 12 | up | r30 | no | 3 | 5 | 4 | 1 | 2 | 2 | r44 | yes | yes | yes | yes | no | no | walk |
| 13 | up | r44 | yes | 2 | 5 | 3 | 2 | 1 | 1 | r52 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 14 | up | r52 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r52 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 15 | right | r52 | no | 1 | 3 | 1 | 2 | 1 | 1 | r78 | yes | yes | yes | yes | yes | yes | walk |
| 16 | down | r78 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |

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

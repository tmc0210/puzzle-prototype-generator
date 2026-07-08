# Level Analysis: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: Brush triple output v2 no top goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#############
######..#####
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
######..#####
#####@C.MM###
#####.....G##
#####...G####
#####.BS..###
#############
```

After:

```text
#############
######..#####
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
######.@#####
#####..MMM###
#####.....G##
#####...G####
#####.BS..###
#############
```

After:

```text
#############
######..#####
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
######..#####
#####.....###
#####..MMMG##
#####...G####
#####@BS..###
#############
```

After:

```text
#############
######..#####
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
######..#####
#####.....###
#####..CMMG##
#####...G####
#####.@BS.###
#############
```

After:

```text
#############
######..#####
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
######..#####
#####.....###
#####..CCMG##
#####..@G####
#####...BS###
#############
```

After:

```text
#############
######..#####
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
######..#####
#####..C..###
#####..@CMG##
#####...G####
#####...BS###
#############
```

After:

```text
#############
######.C#####
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
######.C#####
#####...@.###
#####...CMG##
#####...G####
#####...BS###
#############
```

After:

```text
#############
######.C#####
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
######.C#####
#####.....###
#####...@MG##
#####...*####
#####...BS###
#############
```

After:

```text
#############
######.C#####
#####.....###
#####....@m##
#####...*####
#####...BS###
#############
```


## Graph Facts

- Status: complete
- Reachable states: 4879
- Legal transitions: 13511
- Event-only illegal transitions: 0
- Winning states: 48
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 4879
- Legal transitions: 13511
- Budget: maxStates=300000
- Compressed regions: 341
- Bidirectional transitions: 12600
- Commitment transitions: 911
- Winning regions: 48
- Initial region: r0, states=17, dist=6, internalBidirectional=38, commitments=6, viableCommitments=2, deadCommitments=4, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@4 -> r21@10 -> r30@11 -> r44@13 -> r52@14 -> r78@16 -> r87@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=198, edges=369, winReachable=90, winning=48, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=1/6, branchingWinSccs=23, mergingWinSccs=23
- Handoff scriptiness: scope=returned_solution, scripted=3/6, trivial=0, sameEntryExit=3, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=51, dist=4, out=8, winOut=1, deadOut=7
- SCC path: s0@0 -> s4@1 -> s6@10 -> s22@11 -> s149@14 -> s150@16 -> s151@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 51 | 8 | 1 | 7 | 0 | 0 | s4 | yes |
| s4 | 1 | 3 | 33 | 4 | 2 | 2 | 1 | 1 | s6 | no |
| s6 | 10 | 2 | 28 | 7 | 5 | 2 | 1 | 1 | s22 | no |
| s22 | 11 | 2 | 45 | 8 | 7 | 1 | 2 | 2 | s149 | no |
| s149 | 14 | 2 | 16 | 3 | 1 | 2 | 2 | 2 | s150 | yes |
| s150 | 16 | 1 | 16 | 1 | 1 | 0 | 2 | 2 | s151 | yes |
| s151 | 17 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s4 | 51 | yes | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s4 | 1 | 10 | s6 | 33 | no | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s6 | 10 | 11 | s22 | 28 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s22 | 11 | 14 | s149 | 45 | no | no | up | push_object:crate#1 | has_reposition_room |
| s149 | 14 | 16 | s150 | 16 | no | yes | down | push_object:crate#2 | has_reposition_room |
| s150 | 16 | 17 | s151 | 16 | yes | yes | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=4879, regions=341, solution commitments=8
- Opening: commitments=6, viable=2, dead=4, optimal=1
- Win-continuation prefix: viable prefix=0/8, optimal prefix=2/8, forced viable commitments=3/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 2 | 4 | 1 | forced optimal |
| 3 | r1 | r4 | 5 | 1 | 2 | 1 | forced optimal |
| 9 | r4 | r21 | 4 | 3 | 1 | 2 | multiple optimal choices |
| 10 | r21 | r30 | 3 | 4 | 1 | 3 | multiple optimal choices |
| 12 | r30 | r44 | 2 | 5 | 0 | 2 | multiple optimal choices |
| 13 | r44 | r52 | 3 | 4 | 1 | 2 | multiple optimal choices |
| 15 | r52 | r78 | 2 | 1 | 2 | 1 | forced optimal |
| 16 | r78 | r87 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 17 | 6 | 2 | 4 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 5 | 17 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 4 | 4 | 16 | 4 | 3 | 1 | 2 | 2 | r21 | no | no | no |
| r21 | 10 | 3 | 15 | 5 | 4 | 1 | 3 | 3 | r30 | no | no | no |
| r30 | 11 | 2 | 16 | 5 | 5 | 0 | 2 | 2 | r44 | no | no | no |
| r44 | 13 | 3 | 14 | 5 | 4 | 1 | 2 | 2 | r52 | no | no | no |
| r52 | 14 | 2 | 16 | 3 | 1 | 2 | 1 | 1 | r78 | no | yes | yes |
| r78 | 16 | 1 | 16 | 1 | 1 | 0 | 1 | 1 | r87 | yes | yes | yes |
| r87 | 17 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 6 | 2 | 4 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 5 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 2 | up | r1 | no | 5 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 5 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 4 | down | r4 | yes | 4 | 4 | 3 | 1 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | left | r4 | no | 4 | 4 | 3 | 1 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r4 | no | 4 | 4 | 3 | 1 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r4 | no | 4 | 4 | 3 | 1 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r4 | no | 4 | 4 | 3 | 1 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r4 | no | 4 | 4 | 3 | 1 | 2 | 2 | r21 | yes | yes | yes | yes | no | no | walk |
| 10 | right | r21 | yes | 3 | 5 | 4 | 1 | 3 | 3 | r30 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 11 | right | r30 | yes | 2 | 5 | 5 | 0 | 2 | 2 | r30 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 12 | up | r30 | no | 2 | 5 | 5 | 0 | 2 | 2 | r44 | yes | yes | no | no | no | no | walk |
| 13 | up | r44 | yes | 3 | 5 | 4 | 1 | 2 | 2 | r52 | yes | yes | yes | yes | no | no | push_object:crate#1 |
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

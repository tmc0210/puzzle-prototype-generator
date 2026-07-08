# Level Analysis: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_lower_goal

## Summary

- Prototype: reality_anchor
- Title: Brush triple output v2 no lower goal
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
#####....####
#####.BS..###
#############
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 827
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
######.G#####
#####@C.MM###
#####.....G##
#####....####
#####.BS..###
#############
```

After:

```text
#############
######.G#####
#####.@MMM###
#####.....G##
#####....####
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
#####....####
#####.BS..###
#############
```

After:

```text
#############
######.G#####
#####..@..###
#####..MMMG##
#####....####
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
#####....####
#####@BS..###
#############
```

After:

```text
#############
######.G#####
#####.....###
#####..CMMG##
#####....####
#####.@BS.###
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
#####..CMMG##
#####..@.####
#####..BS.###
#############
```

After:

```text
#############
######.G#####
#####..C..###
#####..@MMG##
#####....####
#####..BS.###
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
#####..@MMG##
#####....####
#####..BS.###
#############
```

After:

```text
#############
######.*#####
#####..@..###
#####...MMG##
#####....####
#####..BS.###
#############
```

### Step 16: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#############
######.*#####
#####.....###
#####..@MMG##
#####....####
#####..BS.###
#############
```

After:

```text
#############
######.*#####
#####.....###
#####...@Mm##
#####....####
#####..BS.###
#############
```


## Graph Facts

- Status: complete
- Reachable states: 4854
- Legal transitions: 13510
- Event-only illegal transitions: 0
- Winning states: 22
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 4854
- Legal transitions: 13510
- Budget: maxStates=300000
- Compressed regions: 315
- Bidirectional transitions: 12600
- Commitment transitions: 910
- Winning regions: 22
- Initial region: r0, states=17, dist=6, internalBidirectional=38, commitments=6, viableCommitments=2, deadCommitments=4, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@4 -> r21@10 -> r43@13 -> r50@14 -> r74@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=171, edges=349, winReachable=54, winning=22, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=14, mergingWinSccs=18
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=51, dist=4, out=8, winOut=1, deadOut=7
- SCC path: s0@0 -> s4@1 -> s6@10 -> s8@14 -> s9@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 51 | 8 | 1 | 7 | 0 | 0 | s4 | yes |
| s4 | 1 | 3 | 33 | 4 | 1 | 3 | 1 | 1 | s6 | yes |
| s6 | 10 | 2 | 28 | 7 | 4 | 3 | 1 | 1 | s8 | no |
| s8 | 14 | 1 | 15 | 3 | 2 | 1 | 1 | 1 | s9 | no |
| s9 | 16 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s4 | 51 | yes | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s4 | 1 | 10 | s6 | 33 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s6 | 10 | 14 | s8 | 28 | no | no | up | push_object:crate#1 | has_reposition_room |
| s8 | 14 | 16 | s9 | 15 | no | no | right | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=4854, regions=315, solution commitments=6
- Opening: commitments=6, viable=2, dead=4, optimal=1
- Win-continuation prefix: viable prefix=0/6, optimal prefix=4/6, forced viable commitments=1/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 2 | 4 | 1 | forced optimal |
| 3 | r1 | r4 | 5 | 1 | 2 | 1 | forced optimal |
| 9 | r4 | r21 | 4 | 2 | 2 | 1 | forced optimal |
| 12 | r21 | r43 | 3 | 3 | 2 | 1 | forced optimal |
| 13 | r43 | r50 | 2 | 4 | 2 | 2 | multiple optimal choices |
| 15 | r50 | r74 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 17 | 6 | 2 | 4 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 5 | 17 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 4 | 4 | 16 | 4 | 2 | 2 | 1 | 1 | r21 | no | no | yes |
| r21 | 10 | 3 | 15 | 5 | 3 | 2 | 1 | 1 | r43 | no | no | yes |
| r43 | 13 | 2 | 13 | 6 | 4 | 2 | 2 | 2 | r50 | no | no | no |
| r50 | 14 | 1 | 15 | 3 | 2 | 1 | 1 | 1 | r74 | no | no | yes |
| r74 | 16 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 6 | 2 | 4 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 5 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 2 | up | r1 | no | 5 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 5 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 4 | down | r4 | yes | 4 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | left | r4 | no | 4 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r4 | no | 4 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r4 | no | 4 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r4 | no | 4 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r4 | no | 4 | 4 | 2 | 2 | 1 | 1 | r21 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r21 | yes | 3 | 5 | 3 | 2 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 11 | up | r21 | no | 3 | 5 | 3 | 2 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r21 | no | 3 | 5 | 3 | 2 | 1 | 1 | r43 | yes | yes | yes | yes | no | yes | walk |
| 13 | up | r43 | yes | 2 | 6 | 4 | 2 | 2 | 2 | r50 | yes | yes | yes | yes | no | no | push_object:crate#1 |
| 14 | up | r50 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r50 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 15 | down | r50 | no | 1 | 3 | 2 | 1 | 1 | 1 | r74 | yes | yes | yes | yes | no | yes | walk |
| 16 | right | r74 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

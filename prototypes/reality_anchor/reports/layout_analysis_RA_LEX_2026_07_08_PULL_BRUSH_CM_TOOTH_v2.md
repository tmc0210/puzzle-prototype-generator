# Level Analysis: RA_LEX_2026_07_08_PULL_BRUSH_CM_TOOTH_v2

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_PULL_BRUSH_CM_TOOTH_v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#PL#......##
####..G#..##
####..MMG.##
###BS@...###
############
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 69
- Inputs: right right right up right up up left left left down up
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:crate#1
- Event counts: pull_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=3, sticky_to_box:n1=1, walk=7, pull_object:sticky#1=1, move_sticky_rigid=1, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
############
#PL#......##
####..G#..##
####..MMG.##
###BS@...###
############
```

After:

```text
############
#PL#......##
####..G#..##
####..MMG.##
###.BS@..###
############
```

### Step 2: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
############
#PL#......##
####..G#..##
####..MMG.##
###.BS@..###
############
```

After:

```text
############
#PL#......##
####..G#..##
####..MMG.##
###..BS@.###
############
```

### Step 3: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
############
#PL#......##
####..G#..##
####..MMG.##
###..BS@.###
############
```

After:

```text
############
#PL#......##
####..G#..##
####..CMG.##
###...BS@###
############
```

### Step 5: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
############
#PL#......##
####..G#..##
####..CM+.##
###...BS.###
############
```

After:

```text
############
#PL#......##
####..G#..##
####..C.m@##
###...BS.###
############
```

### Step 12: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
############
#PL#......##
####..+#..##
####..C.m.##
###...BS.###
############
```

After:

```text
############
#PL#..@...##
####..*#..##
####....m.##
###...BS.###
############
```


## Graph Facts

- Status: complete
- Reachable states: 2885
- Legal transitions: 6190
- Event-only illegal transitions: 0
- Winning states: 29
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2885
- Legal transitions: 6190
- Budget: maxStates=500000
- Compressed regions: 565
- Bidirectional transitions: 4938
- Commitment transitions: 1010
- Winning regions: 29
- Initial region: r0, states=18, dist=5, internalBidirectional=38, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r4@3 -> r6@5 -> r11@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=230, edges=318, winReachable=110, winning=29, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=40, mergingWinSccs=37
- Handoff scriptiness: scope=returned_solution, scripted=2/4, trivial=1, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=38, dist=4, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@5 -> s9@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 38 | 3 | 1 | 2 | 0 | 0 | s1 | yes |
| s1 | 1 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 2 | 36 | 5 | 4 | 1 | 1 | 1 | s3 | no |
| s3 | 5 | 1 | 17 | 3 | 3 | 0 | 1 | 1 | s9 | no |
| s9 | 12 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 38 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s2 | 2 | 5 | s3 | 36 | no | no | right | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s3 | 5 | 12 | s9 | 17 | no | no | up | pull_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2885, regions=565, solution commitments=5
- Opening: commitments=4, viable=3, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/5, optimal prefix=3/5, forced viable commitments=2/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 3 | 1 | 1 | forced optimal |
| 1 | r1 | r3 | 4 | 1 | 0 | 1 | forced optimal |
| 2 | r3 | r4 | 3 | 1 | 0 | 1 | forced optimal |
| 4 | r4 | r6 | 2 | 4 | 0 | 2 | multiple optimal choices |
| 11 | r6 | r11 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 18 | 4 | 3 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 2 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 3 | 2 | 19 | 4 | 4 | 0 | 2 | 2 | r6 | no | no | no |
| r6 | 5 | 1 | 17 | 4 | 4 | 0 | 1 | 1 | r11 | no | no | yes |
| r11 | 12 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 4 | 3 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 2 | right | r3 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 3 | right | r4 | yes | 2 | 4 | 4 | 0 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 4 | up | r4 | no | 2 | 4 | 4 | 0 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 5 | right | r6 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |
| 6 | up | r6 | no | 1 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r6 | no | 1 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r6 | no | 1 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r6 | no | 1 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r6 | no | 1 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r6 | no | 1 | 4 | 4 | 0 | 1 | 1 | r11 | yes | yes | yes | yes | no | yes | walk |
| 12 | up | r11 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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

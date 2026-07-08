# Level Analysis: RA_LEX_2026_07_08_PULL_BRUSH_CM_TAIL_v1

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_PULL_BRUSH_CM_TAIL_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#PL#......##
####.GMMG.##
###BS@...###
############
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 61
- Inputs: right right right up right up left left left left down left
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
####.GMMG.##
###BS@...###
############
```

After:

```text
############
#PL#......##
####.GMMG.##
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
####.GMMG.##
###.BS@..###
############
```

After:

```text
############
#PL#......##
####.GMMG.##
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
####.GMMG.##
###..BS@.###
############
```

After:

```text
############
#PL#......##
####.GCMG.##
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
####.GCM+.##
###...BS.###
############
```

After:

```text
############
#PL#......##
####.GC.m@##
###...BS.###
############
```

### Step 12: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
############
#PL#......##
####.+C.m.##
###...BS.###
############
```

After:

```text
############
#PL#......##
####@*..m.##
###...BS.###
############
```


## Graph Facts

- Status: complete
- Reachable states: 367
- Legal transitions: 695
- Event-only illegal transitions: 0
- Winning states: 21
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 367
- Legal transitions: 695
- Budget: maxStates=500000
- Compressed regions: 99
- Bidirectional transitions: 542
- Commitment transitions: 129
- Winning regions: 21
- Initial region: r0, states=13, dist=4, internalBidirectional=24, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r4@3 -> r6@5 -> r16@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=78, edges=88, winReachable=55, winning=21, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=20, mergingWinSccs=6
- Handoff scriptiness: scope=returned_solution, scripted=2/4, trivial=1, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=28, dist=2, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@5 -> s4@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 28 | 3 | 2 | 1 | 0 | 0 | s1 | no |
| s1 | 1 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 2 | 26 | 5 | 4 | 1 | 1 | 1 | s3 | no |
| s3 | 5 | 1 | 12 | 3 | 2 | 1 | 1 | 1 | s4 | no |
| s4 | 12 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 28 | yes | no | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s2 | 2 | 5 | s3 | 26 | no | no | right | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s3 | 5 | 12 | s4 | 12 | no | no | left | pull_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=367, regions=99, solution commitments=5
- Opening: commitments=4, viable=3, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=2/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 3 | 1 | 1 | multiple viable choices |
| 1 | r1 | r3 | 4 | 1 | 0 | 1 | forced optimal |
| 2 | r3 | r4 | 3 | 1 | 0 | 1 | forced optimal |
| 4 | r4 | r6 | 2 | 3 | 0 | 2 | multiple optimal choices |
| 11 | r6 | r16 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 13 | 4 | 3 | 1 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 2 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 3 | 2 | 14 | 3 | 3 | 0 | 2 | 2 | r6 | no | no | no |
| r6 | 5 | 1 | 12 | 3 | 2 | 1 | 1 | 1 | r16 | no | no | yes |
| r16 | 12 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 4 | 3 | 1 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 2 | right | r3 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 3 | right | r4 | yes | 2 | 3 | 3 | 0 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 4 | up | r4 | no | 2 | 3 | 3 | 0 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 5 | right | r6 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |
| 6 | up | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r16 | yes | yes | yes | yes | no | yes | walk |
| 12 | left | r16 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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

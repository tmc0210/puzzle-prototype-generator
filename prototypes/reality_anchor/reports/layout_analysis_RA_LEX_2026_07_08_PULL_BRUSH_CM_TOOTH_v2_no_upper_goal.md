# Level Analysis: RA_LEX_2026_07_08_PULL_BRUSH_CM_TOOTH_v2_no_upper_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_PULL_BRUSH_CM_TOOTH_v2_no_upper_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#PL#......##
####...#..##
####..MMG.##
###BS@...###
############
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 17
- Inputs: right right right up right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:sticky#1 move_sticky_rigid
- Event counts: pull_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=3, sticky_to_box:n1=1, walk=1, pull_object:sticky#1=1, move_sticky_rigid=1

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
####...#..##
####..MMG.##
###BS@...###
############
```

After:

```text
############
#PL#......##
####...#..##
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
####...#..##
####..MMG.##
###.BS@..###
############
```

After:

```text
############
#PL#......##
####...#..##
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
####...#..##
####..MMG.##
###..BS@.###
############
```

After:

```text
############
#PL#......##
####...#..##
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
####...#..##
####..CM+.##
###...BS.###
############
```

After:

```text
############
#PL#......##
####...#..##
####..C.m@##
###...BS.###
############
```


## Graph Facts

- Status: complete
- Reachable states: 1666
- Legal transitions: 3508
- Event-only illegal transitions: 0
- Winning states: 61
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1666
- Legal transitions: 3508
- Budget: maxStates=500000
- Compressed regions: 390
- Bidirectional transitions: 2740
- Commitment transitions: 646
- Winning regions: 61
- Initial region: r0, states=18, dist=1, internalBidirectional=38, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r4@3 -> r6@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=148, edges=169, winReachable=108, winning=61, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=28, mergingWinSccs=17
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=1, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=19, dist=1, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 19 | 3 | 2 | 1 | 0 | 0 | s1 | no |
| s1 | 1 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 1 | 36 | 5 | 4 | 1 | 1 | 1 | s3 | no |
| s3 | 5 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 19 | yes | no | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s2 | 2 | 5 | s3 | 36 | no | no | right | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1666, regions=390, solution commitments=4
- Opening: commitments=4, viable=3, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=2/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 1 | 3 | 1 | 1 | multiple viable choices |
| 1 | r1 | r3 | 3 | 1 | 0 | 1 | forced optimal |
| 2 | r3 | r4 | 2 | 1 | 0 | 1 | forced optimal |
| 4 | r4 | r6 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 18 | 4 | 3 | 1 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 2 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 3 | 1 | 19 | 4 | 4 | 0 | 1 | 1 | r6 | no | no | yes |
| r6 | 5 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 4 | 3 | 1 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 2 | right | r3 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 3 | right | r4 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 4 | up | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 5 | right | r6 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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

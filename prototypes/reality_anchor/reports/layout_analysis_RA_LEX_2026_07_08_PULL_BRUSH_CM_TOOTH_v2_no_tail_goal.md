# Level Analysis: RA_LEX_2026_07_08_PULL_BRUSH_CM_TOOTH_v2_no_tail_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_PULL_BRUSH_CM_TOOTH_v2_no_tail_goal
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
####..MM..##
###BS@...###
############
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 44
- Inputs: right right right up up up left left down up
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk pull_object:crate#1
- Event counts: pull_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=3, sticky_to_box:n1=1, walk=6, pull_object:crate#1=1

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
####..MM..##
###BS@...###
############
```

After:

```text
############
#PL#......##
####..G#..##
####..MM..##
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
####..MM..##
###.BS@..###
############
```

After:

```text
############
#PL#......##
####..G#..##
####..MM..##
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
####..MM..##
###..BS@.###
############
```

After:

```text
############
#PL#......##
####..G#..##
####..CM..##
###...BS@###
############
```

### Step 10: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
############
#PL#......##
####..+#..##
####..CM..##
###...BS.###
############
```

After:

```text
############
#PL#..@...##
####..*#..##
####...M..##
###...BS.###
############
```


## Graph Facts

- Status: complete
- Reachable states: 879
- Legal transitions: 1890
- Event-only illegal transitions: 0
- Winning states: 19
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 879
- Legal transitions: 1890
- Budget: maxStates=500000
- Compressed regions: 161
- Bidirectional transitions: 1540
- Commitment transitions: 272
- Winning regions: 19
- Initial region: r0, states=18, dist=4, internalBidirectional=38, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r4@3 -> r9@10
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=89, edges=111, winReachable=52, winning=19, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=13, mergingWinSccs=11
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=1, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=38, dist=3, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s1@1 -> s2@2 -> s76@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 38 | 3 | 2 | 1 | 0 | 0 | s1 | no |
| s1 | 1 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 1 | 36 | 6 | 5 | 1 | 1 | 1 | s76 | no |
| s76 | 10 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 38 | yes | no | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s2 | 2 | 10 | s76 | 36 | no | no | up | pull_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=879, regions=161, solution commitments=4
- Opening: commitments=4, viable=3, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=4/4, forced viable commitments=2/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 3 | 1 | 1 | forced optimal |
| 1 | r1 | r3 | 3 | 1 | 0 | 1 | forced optimal |
| 2 | r3 | r4 | 2 | 1 | 0 | 1 | forced optimal |
| 9 | r4 | r9 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 18 | 4 | 3 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 2 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 3 | 1 | 19 | 4 | 4 | 0 | 1 | 1 | r9 | no | no | yes |
| r9 | 10 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 4 | 3 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 2 | right | r3 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 3 | right | r4 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 4 | up | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r9 | yes | yes | yes | yes | no | yes | walk |
| 10 | up | r9 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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

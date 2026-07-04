# Level Analysis: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3

## Summary

- Prototype: reality_anchor
- Title: Dual-axis anchor lock v3
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#.##MG.###
#.....P###
#@CBSMLG##
###..M..##
#####G####
##########
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 900
- Inputs: up right right down right up right up right down left down right up left left down left left up right right
- Events: walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: walk=13, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=3, pull_object:crate#1=1, pull_object:box_sticky_anchor=1, force_chain:n2=1, push_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=2, push_object:sticky#2=1, move_sticky_rigid=2, push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#.##MG.###
#..@..P###
#.CBSMLG##
###..M..##
#####G####
##########
```

After:

```text
##########
#.##MG.###
#.....P###
#.C@.MLG##
###BSM..##
#####G####
##########
```

### Step 5: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
##########
#.##MG.###
#.....P###
#.C@.MLG##
###BSM..##
#####G####
##########
```

After:

```text
##########
#.##MG.###
#.....P###
#..C@MLG##
###BSM..##
#####G####
##########
```

### Step 6: up

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
##########
#.##MG.###
#.....P###
#..C@MLG##
###BSM..##
#####G####
##########
```

After:

```text
##########
#.##MG.###
#..C@.P###
#..BSMLG##
###..M..##
#####G####
##########
```

### Step 10: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#.##MG@###
#..C..P###
#..BSMLG##
###..M..##
#####G####
##########
```

After:

```text
##########
#.##MG.###
#..C..@###
#..BSMPG##
###..ML.##
#####G####
##########
```

### Step 12: down

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid

Before:

```text
##########
#.##MG.###
#..C.@.###
#..BSMPG##
###..ML.##
#####G####
##########
```

After:

```text
##########
#.##MG.###
#..C...###
#..BS@PG##
###..ML.##
#####m####
##########
```

### Step 13: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#.##MG.###
#..C...###
#..BS@PG##
###..ML.##
#####m####
##########
```

After:

```text
##########
#.##MG.###
#..C...###
#..BS.@P##
###..M.L##
#####m####
##########
```

### Step 17: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#.##MG.###
#..C@..###
#..BS..P##
###..M.L##
#####m####
##########
```

After:

```text
##########
#.##MG.###
#..C...###
#...@..P##
###BSM.L##
#####m####
##########
```

### Step 21: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#.##MG.###
#.@C...###
#......P##
###BSM.L##
#####m####
##########
```

After:

```text
##########
#.##MG.###
#..@M..###
#......P##
###BSM.L##
#####m####
##########
```

### Step 22: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#.##MG.###
#..@M..###
#......P##
###BSM.L##
#####m####
##########
```

After:

```text
##########
#.##.m.###
#...@M.###
#......P##
###BSM.L##
#####m####
##########
```


## Graph Facts

- Status: complete
- Reachable states: 1668
- Legal transitions: 4109
- Event-only illegal transitions: 0
- Winning states: 15
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1668
- Legal transitions: 4109
- Budget: maxStates=300000
- Compressed regions: 153
- Bidirectional transitions: 3798
- Commitment transitions: 286
- Winning regions: 1
- Initial region: r0, states=12, dist=8, internalBidirectional=22, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r2@6 -> r7@10 -> r14@12 -> r18@13 -> r49@17 -> r104@21 -> r116@22
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=122, edges=188, winReachable=15, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=7, forcedWinPrefix=2/7, branchingWinSccs=8, mergingWinSccs=7
- Handoff scriptiness: scope=returned_solution, scripted=2/7, trivial=1, sameEntryExit=2, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=12, dist=7, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s37@5 -> s38@6 -> s39@10 -> s40@12 -> s41@13 -> s111@17 -> s114@21

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 7 | 12 | 2 | 1 | 1 | 0 | 0 | s37 | yes |
| s37 | 5 | 6 | 1 | 1 | 1 | 0 | 1 | 1 | s38 | yes |
| s38 | 6 | 5 | 24 | 4 | 2 | 2 | 1 | 1 | s39 | no |
| s39 | 10 | 4 | 5 | 3 | 3 | 0 | 1 | 1 | s40 | no |
| s40 | 12 | 3 | 6 | 4 | 3 | 1 | 1 | 1 | s41 | no |
| s41 | 13 | 2 | 8 | 3 | 2 | 1 | 1 | 1 | s111 | no |
| s111 | 17 | 1 | 30 | 2 | 1 | 1 | 3 | 3 | s114 | yes |
| s114 | 21 | 0 | 30 | 1 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s37 | 12 | no | yes | right | pull_object:crate#1 | has_reposition_room |
| s37 | 5 | 6 | s38 | 1 | yes | yes | up | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s38 | 6 | 10 | s39 | 24 | no | no | down | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s39 | 10 | 12 | s40 | 5 | no | no | down | push_object:sticky#2, move_sticky_rigid | has_reposition_room |
| s40 | 12 | 13 | s41 | 6 | yes | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s41 | 13 | 17 | s111 | 8 | no | no | down | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s111 | 17 | 21 | s114 | 30 | no | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1668, regions=153, solution commitments=8
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=2/8, optimal prefix=3/8, forced viable commitments=3/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 8 | 1 | 1 | 1 | forced optimal |
| 5 | r1 | r2 | 7 | 1 | 0 | 1 | forced optimal |
| 9 | r2 | r7 | 6 | 2 | 0 | 1 | forced optimal |
| 11 | r7 | r14 | 5 | 3 | 0 | 2 | multiple optimal choices |
| 12 | r14 | r18 | 4 | 3 | 1 | 2 | multiple optimal choices |
| 16 | r18 | r49 | 3 | 2 | 1 | 1 | forced optimal |
| 20 | r49 | r104 | 2 | 2 | 0 | 1 | forced optimal |
| 21 | r104 | r116 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 8 | 12 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 5 | 7 | 1 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 6 | 6 | 6 | 2 | 2 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 10 | 5 | 5 | 3 | 3 | 0 | 2 | 2 | r14 | no | no | no |
| r14 | 12 | 4 | 6 | 4 | 3 | 1 | 2 | 2 | r18 | no | no | no |
| r18 | 13 | 3 | 8 | 3 | 2 | 1 | 1 | 1 | r49 | no | no | yes |
| r49 | 17 | 2 | 15 | 2 | 2 | 0 | 1 | 1 | r104 | no | no | yes |
| r104 | 21 | 1 | 15 | 1 | 1 | 0 | 1 | 1 | r116 | yes | yes | yes |
| r116 | 22 | 0 | 15 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 8 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 8 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 8 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 8 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 8 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 5 | right | r1 | yes | 7 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 6 | up | r2 | yes | 6 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky |
| 7 | right | r2 | no | 6 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r2 | no | 6 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r2 | no | 6 | 2 | 2 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | walk |
| 10 | down | r7 | yes | 5 | 3 | 3 | 0 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 11 | left | r7 | no | 5 | 3 | 3 | 0 | 2 | 2 | r14 | yes | yes | yes | yes | no | no | walk |
| 12 | down | r14 | yes | 4 | 4 | 3 | 1 | 2 | 2 | r18 | yes | yes | yes | yes | no | no | push_object:sticky#2, move_sticky_rigid |
| 13 | right | r18 | yes | 3 | 3 | 2 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 14 | up | r18 | no | 3 | 3 | 2 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r18 | no | 3 | 3 | 2 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r18 | no | 3 | 3 | 2 | 1 | 1 | 1 | r49 | yes | yes | yes | yes | no | yes | walk |
| 17 | down | r49 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r49 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 18 | left | r49 | no | 2 | 2 | 2 | 0 | 1 | 1 | r49 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r49 | no | 2 | 2 | 2 | 0 | 1 | 1 | r49 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r49 | no | 2 | 2 | 2 | 0 | 1 | 1 | r104 | yes | yes | yes | yes | no | yes | walk |
| 21 | right | r104 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r116 | yes | yes | yes | yes | yes | yes | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 22 | right | r116 | yes | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

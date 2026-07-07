# Level Analysis: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
##MG.M@.#
#.M.M..M#
#BSLP#.##
#.G..#..#
#########
```

## Shortest Solution

- Found: yes
- Cost: 27
- Depth: 27
- Explored states: 654
- Inputs: down left left down left right up up left right down right right up left left down down left up right down up left down right up
- Events: walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- Event counts: walk=13, push_object:sticky#2=2, move_sticky_rigid=8, sticky_merge:n1=4, push_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=3, pull_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=3, sticky_to_box:n2=2, pull_object:crate#1=1, box_to_sticky:n1=1, push_object:sticky#1=3, force_chain:n2=2, push_object:box_sticky_anchor=1, box_to_sticky:n2=1, pull_object:push_pull_anchor=1, pull_object:sticky#1=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
##MG.M..#
#.M.M@.M#
#BSLP#.##
#.G..#..#
#########
```

After:

```text
#########
##MG.M..#
#.MM@..M#
#BSLP#.##
#.G..#..#
#########
```

### Step 4: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
##MG.M..#
#.MM@..M#
#BSLP#.##
#.G..#..#
#########
```

After:

```text
#########
##MG.M..#
#.MM...M#
#BS.@#.##
#.GLP#..#
#########
```

### Step 6: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
#########
##MG.M..#
#.MM...M#
#BS@.#.##
#.GLP#..#
#########
```

After:

```text
#########
##CG.M..#
#.CM...M#
#.BS@#.##
#.GLP#..#
#########
```

### Step 10: right

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
##C+.M..#
#.CM...M#
#.BS.#.##
#.GLP#..#
#########
```

After:

```text
#########
##.m@M..#
#.CM...M#
#.BS.#.##
#.GLP#..#
#########
```

### Step 15: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
##.m.M@.#
#.CM...M#
#.BS.#.##
#.GLP#..#
#########
```

After:

```text
#########
##.mM@..#
#.CM...M#
#.BS.#.##
#.GLP#..#
#########
```

### Step 16: left

- Legal: true
- Events: push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2

Before:

```text
#########
##.mM@..#
#.CM...M#
#.BS.#.##
#.GLP#..#
#########
```

After:

```text
#########
##Cm@...#
#CC....M#
#.BS.#.##
#.GLP#..#
#########
```

### Step 19: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1

Before:

```text
#########
##Cm....#
#CC....M#
#.BS@#.##
#.GLP#..#
#########
```

After:

```text
#########
##Mm....#
#CM....M#
#BS@.#.##
#.GLP#..#
#########
```

### Step 20: up

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
##Mm....#
#CM....M#
#BS@.#.##
#.GLP#..#
#########
```

After:

```text
#########
##Mm....#
#CM@...M#
#BSLP#.##
#.G..#..#
#########
```

### Step 21: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
#########
##Mm....#
#CM@...M#
#BSLP#.##
#.G..#..#
#########
```

After:

```text
#########
##.mM...#
#C.M@..M#
#BSLP#.##
#.G..#..#
#########
```

### Step 22: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
##.mM...#
#C.M@..M#
#BSLP#.##
#.G..#..#
#########
```

After:

```text
#########
##.mM...#
#C.M...M#
#BS.@#.##
#.GLP#..#
#########
```

### Step 24: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
##.mM...#
#C.M@..M#
#BS..#.##
#.GLP#..#
#########
```

After:

```text
#########
##Mm....#
#CM@...M#
#BS..#.##
#.GLP#..#
#########
```

### Step 25: down

- Legal: true
- Events: pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
#########
##Mm....#
#CM@...M#
#BS..#.##
#.GLP#..#
#########
```

After:

```text
#########
##.G....#
#CMM...M#
#.M@.#.##
#BSLP#..#
#########
```

### Step 26: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
#########
##.G....#
#CMM...M#
#.M@.#.##
#BSLP#..#
#########
```

After:

```text
#########
##.G....#
#C.MM..M#
#..M@#.##
#BSLP#..#
#########
```

### Step 27: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
##.G....#
#C.MM..M#
#..M@#.##
#BSLP#..#
#########
```

After:

```text
#########
##.mM...#
#C.M@..M#
#....#.##
#BSLP#..#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 691
- Legal transitions: 1517
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=900000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 691
- Legal transitions: 1517
- Budget: maxStates=900000
- Compressed regions: 95
- Bidirectional transitions: 1336
- Commitment transitions: 178
- Winning regions: 1
- Initial region: r0, states=7, dist=11, internalBidirectional=12, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@3 -> r4@4 -> r8@5 -> r23@9 -> r26@10 -> r53@15 -> r56@16 -> r70@20 -> r78@22 -> r88@25 -> r91@27
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 11

### SCC Irreversible Progress

- Shape: sccs=62, edges=96, winReachable=16, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=9, forcedWinPrefix=3/9, branchingWinSccs=5, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=4/9, trivial=1, sameEntryExit=4, forcedScripted=4, maxRun=2
- Initial SCC: s0, states=7, dist=7, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s2@3 -> s5@4 -> s6@5 -> s7@9 -> s8@10 -> s9@15 -> s19@16 -> s20@25 -> s21@27

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 7 | 7 | 2 | 1 | 1 | 0 | 0 | s2 | yes |
| s2 | 3 | 6 | 9 | 4 | 1 | 3 | 1 | 1 | s5 | yes |
| s5 | 4 | 5 | 10 | 4 | 1 | 3 | 1 | 1 | s6 | yes |
| s6 | 5 | 4 | 11 | 4 | 2 | 2 | 1 | 1 | s7 | no |
| s7 | 9 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | s8 | yes |
| s8 | 10 | 4 | 11 | 3 | 2 | 1 | 1 | 1 | s9 | no |
| s9 | 15 | 3 | 11 | 2 | 1 | 1 | 1 | 1 | s19 | yes |
| s19 | 16 | 2 | 65 | 2 | 1 | 1 | 7 | 7 | s20 | yes |
| s20 | 25 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | s21 | yes |
| s21 | 27 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s2 | 7 | no | yes | left | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |
| s2 | 3 | 4 | s5 | 9 | yes | yes | down | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s5 | 4 | 5 | s6 | 10 | yes | yes | left | walk | scripted_same_state_handoff |
| s6 | 5 | 9 | s7 | 11 | no | no | left | walk | has_reposition_room |
| s7 | 9 | 10 | s8 | 1 | yes | yes | right | pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_trivial_scc |
| s8 | 10 | 15 | s9 | 11 | no | no | left | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |
| s9 | 15 | 16 | s19 | 11 | yes | yes | left | push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2 | scripted_same_state_handoff |
| s19 | 16 | 25 | s20 | 65 | no | yes | down | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | has_reposition_room |
| s20 | 25 | 27 | s21 | 2 | no | yes | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=691, regions=95, solution commitments=11
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=3/11, optimal prefix=11/11, forced viable commitments=7/11
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 3 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r3 | 11 | 1 | 1 | 1 | forced optimal |
| 3 | r3 | r4 | 10 | 1 | 3 | 1 | forced optimal |
| 4 | r4 | r8 | 9 | 1 | 3 | 1 | forced optimal |
| 8 | r8 | r23 | 8 | 2 | 2 | 1 | forced optimal |
| 9 | r23 | r26 | 7 | 1 | 0 | 1 | forced optimal |
| 14 | r26 | r53 | 6 | 3 | 1 | 1 | forced optimal |
| 15 | r53 | r56 | 5 | 1 | 1 | 1 | forced optimal |
| 19 | r56 | r70 | 4 | 1 | 1 | 1 | forced optimal |
| 21 | r70 | r78 | 3 | 2 | 0 | 1 | forced optimal |
| 24 | r78 | r88 | 2 | 3 | 0 | 1 | forced optimal |
| 26 | r88 | r91 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 11 | 7 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 3 | 10 | 9 | 4 | 1 | 3 | 1 | 1 | r4 | no | yes | yes |
| r4 | 4 | 9 | 10 | 4 | 1 | 3 | 1 | 1 | r8 | no | yes | yes |
| r8 | 5 | 8 | 11 | 4 | 2 | 2 | 1 | 1 | r23 | no | no | yes |
| r23 | 9 | 7 | 1 | 1 | 1 | 0 | 1 | 1 | r26 | yes | yes | yes |
| r26 | 10 | 6 | 11 | 4 | 3 | 1 | 1 | 1 | r53 | no | no | yes |
| r53 | 15 | 5 | 11 | 2 | 1 | 1 | 1 | 1 | r56 | no | yes | yes |
| r56 | 16 | 4 | 12 | 2 | 1 | 1 | 1 | 1 | r70 | no | yes | yes |
| r70 | 20 | 3 | 10 | 2 | 2 | 0 | 1 | 1 | r78 | no | no | yes |
| r78 | 22 | 2 | 11 | 3 | 3 | 0 | 1 | 1 | r88 | no | no | yes |
| r88 | 25 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | r91 | yes | yes | yes |
| r91 | 27 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 11 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 11 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 11 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 3 | left | r3 | yes | 10 | 4 | 1 | 3 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 4 | down | r4 | yes | 9 | 4 | 1 | 3 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 5 | left | r8 | yes | 8 | 4 | 2 | 2 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r8 | no | 8 | 4 | 2 | 2 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2 |
| 7 | up | r8 | no | 8 | 4 | 2 | 2 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r8 | no | 8 | 4 | 2 | 2 | 1 | 1 | r23 | yes | yes | yes | yes | no | yes | walk |
| 9 | left | r23 | yes | 7 | 1 | 1 | 0 | 1 | 1 | r26 | yes | yes | yes | yes | yes | yes | walk |
| 10 | right | r26 | yes | 6 | 4 | 3 | 1 | 1 | 1 | r26 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 11 | down | r26 | no | 6 | 4 | 3 | 1 | 1 | 1 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r26 | no | 6 | 4 | 3 | 1 | 1 | 1 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r26 | no | 6 | 4 | 3 | 1 | 1 | 1 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r26 | no | 6 | 4 | 3 | 1 | 1 | 1 | r53 | yes | yes | yes | yes | no | yes | walk |
| 15 | left | r53 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r56 | yes | yes | yes | yes | yes | yes | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 16 | left | r56 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r56 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2 |
| 17 | down | r56 | no | 4 | 2 | 1 | 1 | 1 | 1 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r56 | no | 4 | 2 | 1 | 1 | 1 | 1 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r56 | no | 4 | 2 | 1 | 1 | 1 | 1 | r70 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1 |
| 20 | up | r70 | yes | 3 | 2 | 2 | 0 | 1 | 1 | r70 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 21 | right | r70 | no | 3 | 2 | 2 | 0 | 1 | 1 | r78 | yes | yes | yes | yes | no | yes | pull_object:sticky#1, move_sticky_rigid |
| 22 | down | r78 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r78 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 23 | up | r78 | no | 2 | 3 | 3 | 0 | 1 | 1 | r78 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r78 | no | 2 | 3 | 3 | 0 | 1 | 1 | r88 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 25 | down | r88 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r88 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 26 | right | r88 | no | 1 | 1 | 1 | 0 | 1 | 1 | r91 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, move_sticky_rigid |
| 27 | up | r91 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

# Level Analysis: RA_CURR_L11_TIMED_BAR_SPLIT_hit760201_563

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_TIMED_BAR_SPLIT_hit760201_563
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#..G.BSGM#
#..#..MM.#
##..##@..#
##########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 204
- Inputs: right right up left up left left left right right right down down left up left left up right
- Events: walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1
- Event counts: walk=13, push_object:sticky#1=3, move_sticky_rigid=3, sticky_to_box:n1=1, push_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=3, box_to_sticky:n1=1, sticky_merge:n1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
##########
#..G.BSGM#
#..#..MM@#
##..##...#
##########
```

After:

```text
##########
#..G.BSGM#
#..#.CM@.#
##..##...#
##########
```

### Step 6: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#..G.BS+M#
#..#.CM..#
##..##...#
##########
```

After:

```text
##########
#..GBS@GM#
#..#.MM..#
##..##...#
##########
```

### Step 7: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#..GBS@GM#
#..#.MM..#
##..##...#
##########
```

After:

```text
##########
#..BS@.GM#
#..#.MM..#
##..##...#
##########
```

### Step 8: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#..BS@.GM#
#..#.MM..#
##..##...#
##########
```

After:

```text
##########
#.BS@..GM#
#..#.MM..#
##..##...#
##########
```

### Step 15: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#.BS...GM#
#..#.MM..#
##..##@..#
##########
```

After:

```text
##########
#.BS.MMGM#
#..#..@..#
##..##...#
##########
```

### Step 19: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
##########
#.BS@MMGM#
#..#.....#
##..##...#
##########
```

After:

```text
##########
#.BS.@MmM#
#..#.....#
##..##...#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 249
- Legal transitions: 602
- Event-only illegal transitions: 0
- Winning states: 10
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 249
- Legal transitions: 602
- Budget: maxStates=300000
- Compressed regions: 27
- Bidirectional transitions: 562
- Commitment transitions: 40
- Winning regions: 1
- Initial region: r0, states=4, dist=6, internalBidirectional=6, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@4 -> r3@6 -> r4@7 -> r5@8 -> r19@15 -> r24@19
- Forced commitment prefix length: 1
- Forced viable prefix length: 6
- Forced optimal prefix length: 6

### SCC Irreversible Progress

- Shape: sccs=27, edges=38, winReachable=7, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=6, forcedWinPrefix=6/6, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=2/6, trivial=0, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=4, dist=6, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@4 -> s3@6 -> s5@7 -> s8@8 -> s10@15 -> s11@19

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 4 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 4 | 5 | 6 | 2 | 1 | 1 | 1 | 1 | s3 | yes |
| s3 | 6 | 4 | 7 | 2 | 1 | 1 | 1 | 1 | s5 | yes |
| s5 | 7 | 3 | 8 | 3 | 1 | 2 | 1 | 1 | s8 | yes |
| s8 | 8 | 2 | 10 | 4 | 1 | 3 | 1 | 1 | s10 | yes |
| s10 | 15 | 1 | 10 | 3 | 1 | 2 | 1 | 1 | s11 | yes |
| s11 | 19 | 0 | 10 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s1 | 4 | no | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | has_reposition_room |
| s1 | 4 | 6 | s3 | 6 | no | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s3 | 6 | 7 | s5 | 7 | yes | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s5 | 7 | 8 | s8 | 8 | yes | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s8 | 8 | 15 | s10 | 10 | no | yes | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s10 | 15 | 19 | s11 | 10 | no | yes | right | push_object:sticky#1, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=249, regions=27, solution commitments=6
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=6/6, optimal prefix=6/6, forced viable commitments=6/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 6 | 1 | 0 | 1 | forced optimal |
| 5 | r1 | r3 | 5 | 1 | 1 | 1 | forced optimal |
| 6 | r3 | r4 | 4 | 1 | 1 | 1 | forced optimal |
| 7 | r4 | r5 | 3 | 1 | 2 | 1 | forced optimal |
| 14 | r5 | r19 | 2 | 1 | 3 | 1 | forced optimal |
| 18 | r19 | r24 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 4 | 5 | 6 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 6 | 4 | 7 | 2 | 1 | 1 | 1 | 1 | r4 | no | yes | yes |
| r4 | 7 | 3 | 8 | 3 | 1 | 2 | 1 | 1 | r5 | no | yes | yes |
| r5 | 8 | 2 | 10 | 4 | 1 | 3 | 1 | 1 | r19 | no | yes | yes |
| r19 | 15 | 1 | 10 | 3 | 1 | 2 | 1 | 1 | r24 | no | yes | yes |
| r24 | 19 | 0 | 10 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 4 | left | r1 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 5 | up | r1 | no | 5 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 6 | left | r3 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 |
| 7 | left | r4 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 8 | left | r5 | yes | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 9 | right | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r19 | yes | yes | yes | yes | yes | yes | walk |
| 15 | up | r19 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 16 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r24 | yes | yes | yes | yes | yes | yes | walk |
| 19 | right | r24 | yes | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |

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

# Level Analysis: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2_no_left_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2_no_left_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#...G###
#@CC...#
###....#
###BS###
########
```

## Shortest Solution

- Found: yes
- Cost: 11
- Depth: 11
- Explored states: 209
- Inputs: up right right right down down left up left up right
- Events: walk walk walk walk walk walk walk push_object:crate#2 push_object:crate#2 walk push_object:crate#1 box_to_sticky:n1
- Event counts: walk=8, push_object:crate#2=2, push_object:crate#1=1, box_to_sticky:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: up

- Legal: true
- Events: push_object:crate#2

Before:

```text
########
#...G###
#.CC...#
###@...#
###BS###
########
```

After:

```text
########
#..CG###
#.C@...#
###....#
###BS###
########
```

### Step 9: left

- Legal: true
- Events: push_object:crate#2

Before:

```text
########
#..CG###
#.C@...#
###....#
###BS###
########
```

After:

```text
########
#..CG###
#C@....#
###....#
###BS###
########
```

### Step 11: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1

Before:

```text
########
#.@CG###
#C.....#
###....#
###BS###
########
```

After:

```text
########
#..@m###
#C.....#
###....#
###BS###
########
```


## Graph Facts

- Status: complete
- Reachable states: 771
- Legal transitions: 1904
- Event-only illegal transitions: 0
- Winning states: 17
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 771
- Legal transitions: 1904
- Budget: maxStates=300000
- Compressed regions: 84
- Bidirectional transitions: 1756
- Commitment transitions: 148
- Winning regions: 17
- Initial region: r0, states=12, dist=3, internalBidirectional=26, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r15@8 -> r20@9 -> r25@11
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=59, edges=87, winReachable=34, winning=17, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=9, mergingWinSccs=8
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=36, dist=1, out=8, winOut=5, deadOut=3
- SCC path: s0@0 -> s47@8 -> s48@9 -> s49@11

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 36 | 8 | 5 | 3 | 0 | 0 | s47 | no |
| s47 | 8 | 2 | 9 | 2 | 1 | 1 | 2 | 2 | s48 | yes |
| s48 | 9 | 1 | 12 | 2 | 1 | 1 | 1 | 1 | s49 | yes |
| s49 | 11 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s47 | 36 | no | no | up | push_object:crate#2 | has_reposition_room |
| s47 | 8 | 9 | s48 | 9 | yes | yes | left | push_object:crate#2 | scripted_same_state_handoff |
| s48 | 9 | 11 | s49 | 12 | no | yes | right | push_object:crate#1, box_to_sticky:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=771, regions=84, solution commitments=3
- Opening: commitments=4, viable=3, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=2/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r15 | 3 | 3 | 1 | 1 | forced optimal |
| 8 | r15 | r20 | 2 | 1 | 1 | 1 | forced optimal |
| 10 | r20 | r25 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 12 | 4 | 3 | 1 | 1 | 1 | r15 | no | no | yes |
| r15 | 8 | 2 | 9 | 2 | 1 | 1 | 1 | 1 | r20 | no | yes | yes |
| r20 | 9 | 1 | 12 | 2 | 1 | 1 | 1 | 1 | r25 | no | yes | yes |
| r25 | 11 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 3 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 3 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 3 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 3 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r0 | no | 3 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r0 | no | 3 | 4 | 3 | 1 | 1 | 1 | r15 | yes | yes | yes | yes | no | yes | walk |
| 8 | up | r15 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | push_object:crate#2 |
| 9 | left | r20 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |
| 10 | up | r20 | no | 1 | 2 | 1 | 1 | 1 | 1 | r25 | yes | yes | yes | yes | yes | yes | walk |
| 11 | right | r25 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1 |

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

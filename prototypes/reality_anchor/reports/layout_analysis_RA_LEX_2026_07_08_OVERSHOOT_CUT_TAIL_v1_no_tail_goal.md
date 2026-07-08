# Level Analysis: RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1_no_tail_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1_no_tail_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#..G####
#@CC...#
###....#
###BS###
########
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 111
- Inputs: right right down right right right up left down left left up
- Events: push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1
- Event counts: push_object:crate#1=3, force_chain:n2=2, box_to_sticky:n1=2, move_sticky_rigid=2, sticky_merge:n1=1, walk=8, push_object:sticky#1=1, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, box_to_sticky:n1

Before:

```text
########
#..G####
#@CC...#
###....#
###BS###
########
```

After:

```text
########
#..G####
#.@CM..#
###....#
###BS###
########
```

### Step 2: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
########
#..G####
#.@CM..#
###....#
###BS###
########
```

After:

```text
########
#..G####
#..@MM.#
###....#
###BS###
########
```

### Step 8: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
########
#..G####
#...MM@#
###....#
###BS###
########
```

After:

```text
########
#..G####
#..CM@.#
###....#
###BS###
########
```

### Step 12: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
########
#..G####
#..CM..#
###@...#
###BS###
########
```

After:

```text
########
#..*####
#..@M..#
###....#
###BS###
########
```


## Graph Facts

- Status: complete
- Reachable states: 123
- Legal transitions: 286
- Event-only illegal transitions: 0
- Winning states: 2
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 123
- Legal transitions: 286
- Budget: maxStates=300000
- Compressed regions: 17
- Bidirectional transitions: 268
- Commitment transitions: 18
- Winning regions: 2
- Initial region: r0, states=4, dist=4, internalBidirectional=6, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r9@8 -> r15@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=12, edges=12, winReachable=7, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=3/4, branchingWinSccs=1, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=2/4, trivial=0, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=4, dist=4, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@1 -> s2@2 -> s4@8 -> s8@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 4 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 1 | 3 | 5 | 2 | 1 | 1 | 1 | 1 | s2 | yes |
| s2 | 2 | 2 | 11 | 2 | 1 | 1 | 1 | 1 | s4 | yes |
| s4 | 8 | 1 | 6 | 2 | 2 | 0 | 1 | 1 | s8 | no |
| s8 | 12 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 4 | yes | yes | right | push_object:crate#1, force_chain:n2, box_to_sticky:n1 | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 5 | yes | yes | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s2 | 2 | 8 | s4 | 11 | no | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | has_reposition_room |
| s4 | 8 | 12 | s8 | 6 | no | no | up | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=123, regions=17, solution commitments=4
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=3/4, optimal prefix=4/4, forced viable commitments=3/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 3 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 1 | 1 | forced optimal |
| 1 | r1 | r2 | 3 | 1 | 1 | 1 | forced optimal |
| 7 | r2 | r9 | 2 | 1 | 1 | 1 | forced optimal |
| 11 | r9 | r15 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 4 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 3 | 5 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 2 | 2 | 11 | 2 | 1 | 1 | 1 | 1 | r9 | no | yes | yes |
| r9 | 8 | 1 | 6 | 2 | 2 | 0 | 1 | 1 | r15 | no | no | yes |
| r15 | 12 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2, box_to_sticky:n1 |
| 2 | right | r2 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 3 | down | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | walk |
| 8 | left | r9 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 9 | down | r9 | no | 1 | 2 | 2 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r9 | no | 1 | 2 | 2 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r9 | no | 1 | 2 | 2 | 0 | 1 | 1 | r15 | yes | yes | yes | yes | no | yes | walk |
| 12 | up | r15 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

# Level Analysis: RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_tail_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_tail_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#@.#G#...#
#.CC.....#
####....##
#...BS...#
##########
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 244
- Inputs: down right right right down right right right up left down left left up
- Events: walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1
- Event counts: walk=9, push_object:crate#1=4, force_chain:n2=3, box_to_sticky:n1=2, move_sticky_rigid=2, sticky_merge:n1=1, push_object:sticky#1=1, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2

Before:

```text
##########
#..#G#...#
#@CC.....#
####....##
#...BS...#
##########
```

After:

```text
##########
#..#G#...#
#.@CC....#
####....##
#...BS...#
##########
```

### Step 3: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, box_to_sticky:n1

Before:

```text
##########
#..#G#...#
#.@CC....#
####....##
#...BS...#
##########
```

After:

```text
##########
#..#G#...#
#..@CM...#
####....##
#...BS...#
##########
```

### Step 4: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#..#G#...#
#..@CM...#
####....##
#...BS...#
##########
```

After:

```text
##########
#..#G#...#
#...@MM..#
####....##
#...BS...#
##########
```

### Step 10: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
##########
#..#G#...#
#....MM@.#
####....##
#...BS...#
##########
```

After:

```text
##########
#..#G#...#
#...CM@..#
####....##
#...BS...#
##########
```

### Step 14: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#..#G#...#
#...CM...#
####@...##
#...BS...#
##########
```

After:

```text
##########
#..#*#...#
#...@M...#
####....##
#...BS...#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 1184
- Legal transitions: 3078
- Event-only illegal transitions: 0
- Winning states: 3
- Budget: maxStates=800000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1184
- Legal transitions: 3078
- Budget: maxStates=800000
- Compressed regions: 67
- Bidirectional transitions: 2938
- Commitment transitions: 140
- Winning regions: 3
- Initial region: r0, states=3, dist=5, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@3 -> r3@4 -> r12@10 -> r28@14
- Forced commitment prefix length: 3
- Forced viable prefix length: 3
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=63, edges=108, winReachable=14, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=3/5, branchingWinSccs=4, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=2/5, trivial=0, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=3, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s2@3 -> s3@4 -> s8@10 -> s13@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 3 | 3 | 5 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 4 | 2 | 38 | 5 | 3 | 2 | 1 | 1 | s8 | no |
| s8 | 10 | 1 | 13 | 3 | 3 | 0 | 1 | 1 | s13 | no |
| s13 | 14 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 3 | no | yes | right | push_object:crate#1, force_chain:n2 | has_reposition_room |
| s1 | 2 | 3 | s2 | 4 | yes | yes | right | push_object:crate#1, force_chain:n2, box_to_sticky:n1 | scripted_same_state_handoff |
| s2 | 3 | 4 | s3 | 5 | yes | yes | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s3 | 4 | 10 | s8 | 38 | no | no | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | has_reposition_room |
| s8 | 10 | 14 | s13 | 13 | no | no | up | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1184, regions=67, solution commitments=5
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/5, optimal prefix=5/5, forced viable commitments=3/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 3 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 5 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r2 | 4 | 1 | 0 | 1 | forced optimal |
| 3 | r2 | r3 | 3 | 1 | 0 | 1 | forced optimal |
| 9 | r3 | r12 | 2 | 3 | 1 | 1 | forced optimal |
| 13 | r12 | r28 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 3 | 3 | 5 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 2 | 19 | 4 | 3 | 1 | 1 | 1 | r12 | no | no | yes |
| r12 | 10 | 1 | 13 | 3 | 3 | 0 | 1 | 1 | r28 | no | no | yes |
| r28 | 14 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2 |
| 3 | right | r2 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2, box_to_sticky:n1 |
| 4 | right | r3 | yes | 2 | 4 | 3 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 5 | down | r3 | no | 2 | 4 | 3 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r3 | no | 2 | 4 | 3 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r3 | no | 2 | 4 | 3 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r3 | no | 2 | 4 | 3 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r3 | no | 2 | 4 | 3 | 1 | 1 | 1 | r12 | yes | yes | yes | yes | no | yes | walk |
| 10 | left | r12 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 11 | down | r12 | no | 1 | 3 | 3 | 0 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r12 | no | 1 | 3 | 3 | 0 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r12 | no | 1 | 3 | 3 | 0 | 1 | 1 | r28 | yes | yes | yes | yes | no | yes | walk |
| 14 | up | r28 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

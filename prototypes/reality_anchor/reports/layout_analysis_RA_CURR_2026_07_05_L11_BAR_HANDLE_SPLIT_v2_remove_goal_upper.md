# Level Analysis: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_remove_goal_upper

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_remove_goal_upper
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#......@##.#
#.....C.MM.#
#..##.....##
#..##..G####
#.....BS...#
############
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 154
- Inputs: left down down left down right
- Events: walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1
- Event counts: walk=3, push_object:crate#1=3, box_to_sticky:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#.....@.##.#
#.....C.MM.#
#..##.....##
#..##..G####
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.....@.MM.#
#..##.C...##
#..##..G####
#.....BS...#
############
```

### Step 3: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#.......##.#
#.....@.MM.#
#..##.C...##
#..##..G####
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.......MM.#
#..##.@...##
#..##.CG####
#.....BS...#
############
```

### Step 6: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1

Before:

```text
############
#.......##.#
#.......MM.#
#..##.....##
#..##@CG####
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.......MM.#
#..##.....##
#..##.@m####
#.....BS...#
############
```


## Graph Facts

- Status: complete
- Reachable states: 9104
- Legal transitions: 26460
- Event-only illegal transitions: 0
- Winning states: 358
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 9104
- Legal transitions: 26460
- Budget: maxStates=500000
- Compressed regions: 284
- Bidirectional transitions: 25586
- Commitment transitions: 874
- Winning regions: 11
- Initial region: r0, states=30, dist=3, internalBidirectional=80, commitments=6, viableCommitments=5, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@2 -> r5@3 -> r22@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=109, edges=259, winReachable=21, winning=11, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=10, mergingWinSccs=13
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=330, dist=1, out=9, winOut=5, deadOut=4
- SCC path: s0@0 -> s3@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 330 | 9 | 5 | 4 | 0 | 0 | s3 | no |
| s3 | 6 | 0 | 30 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s3 | 330 | no | no | right | push_object:crate#1, box_to_sticky:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=9104, regions=284, solution commitments=3
- Opening: commitments=6, viable=5, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=1/3, forced viable commitments=0/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r3 | 3 | 5 | 1 | 1 | forced optimal |
| 2 | r3 | r5 | 2 | 6 | 0 | 2 | multiple optimal choices |
| 5 | r5 | r22 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 30 | 6 | 5 | 1 | 1 | 1 | r3 | no | no | yes |
| r3 | 2 | 2 | 30 | 6 | 6 | 0 | 2 | 2 | r5 | no | no | no |
| r5 | 3 | 1 | 30 | 4 | 4 | 0 | 1 | 1 | r22 | no | no | yes |
| r22 | 6 | 0 | 30 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 6 | 5 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 3 | 6 | 5 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 2 | down | r3 | yes | 2 | 6 | 6 | 0 | 2 | 2 | r5 | yes | yes | yes | yes | no | no | push_object:crate#1 |
| 3 | down | r5 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 4 | left | r5 | no | 1 | 4 | 4 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r5 | no | 1 | 4 | 4 | 0 | 1 | 1 | r22 | yes | yes | yes | yes | no | yes | walk |
| 6 | right | r22 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1 |

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

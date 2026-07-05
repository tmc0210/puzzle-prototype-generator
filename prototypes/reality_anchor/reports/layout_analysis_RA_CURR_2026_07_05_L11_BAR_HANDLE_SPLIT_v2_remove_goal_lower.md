# Level Analysis: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_remove_goal_lower

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_remove_goal_lower
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
#..##....G##
#..##...####
#.....BS...#
############
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 267
- Inputs: left down left down right right right
- Events: walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: walk=3, push_object:crate#1=2, box_to_sticky:n1=1, push_object:sticky#1=2, move_sticky_rigid=2, sticky_merge:n1=1

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
#..##....G##
#..##...####
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.....@.MM.#
#..##.C..G##
#..##...####
#.....BS...#
############
```

### Step 5: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1

Before:

```text
############
#.......##.#
#.......MM.#
#..##@C..G##
#..##...####
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.......MM.#
#..##.@M.G##
#..##...####
#.....BS...#
############
```

### Step 6: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
############
#.......##.#
#.......MM.#
#..##.@M.G##
#..##...####
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.......MM.#
#..##..@MG##
#..##...####
#.....BS...#
############
```

### Step 7: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
############
#.......##.#
#.......MM.#
#..##..@MG##
#..##...####
#.....BS...#
############
```

After:

```text
############
#.......##.#
#........MM#
#..##...@m##
#..##...####
#.....BS...#
############
```


## Graph Facts

- Status: complete
- Reachable states: 9104
- Legal transitions: 26460
- Event-only illegal transitions: 0
- Winning states: 918
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
- Winning regions: 28
- Initial region: r0, states=30, dist=2, internalBidirectional=80, commitments=6, viableCommitments=5, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@2 -> r15@5 -> r23@6 -> r34@7
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=109, edges=259, winReachable=47, winning=23, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=20, mergingWinSccs=30
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=2
- Initial SCC: s0, states=330, dist=1, out=9, winOut=5, deadOut=4
- SCC path: s0@0 -> s1@5 -> s2@6 -> s28@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 330 | 9 | 5 | 4 | 0 | 0 | s1 | no |
| s1 | 5 | 1 | 28 | 5 | 5 | 0 | 1 | 1 | s2 | no |
| s2 | 6 | 1 | 29 | 2 | 2 | 0 | 1 | 1 | s28 | no |
| s28 | 7 | 0 | 31 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 330 | no | no | right | push_object:crate#1, box_to_sticky:n1 | has_reposition_room |
| s1 | 5 | 6 | s2 | 28 | yes | no | right | push_object:sticky#1, move_sticky_rigid, sticky_merge:n1 | scripted_same_state_handoff |
| s2 | 6 | 7 | s28 | 29 | yes | no | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=9104, regions=284, solution commitments=4
- Opening: commitments=6, viable=5, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=0/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r3 | 2 | 5 | 1 | 1 | multiple viable choices |
| 4 | r3 | r15 | 3 | 6 | 0 | 2 | multiple optimal choices |
| 5 | r15 | r23 | 2 | 5 | 0 | 2 | multiple optimal choices |
| 6 | r23 | r34 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 30 | 6 | 5 | 1 | 1 | 1 | r3 | no | no | no |
| r3 | 2 | 3 | 30 | 6 | 6 | 0 | 2 | 2 | r15 | no | no | no |
| r15 | 5 | 2 | 28 | 5 | 5 | 0 | 2 | 2 | r23 | no | no | no |
| r23 | 6 | 1 | 29 | 2 | 2 | 0 | 1 | 1 | r34 | no | no | yes |
| r34 | 7 | 0 | 31 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 6 | 5 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 2 | 6 | 5 | 1 | 1 | 1 | r3 | yes | yes | no | no | no | no | walk |
| 2 | down | r3 | yes | 3 | 6 | 6 | 0 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 3 | left | r3 | no | 3 | 6 | 6 | 0 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r3 | no | 3 | 6 | 6 | 0 | 2 | 2 | r15 | yes | yes | yes | yes | no | no | walk |
| 5 | right | r15 | yes | 2 | 5 | 5 | 0 | 2 | 2 | r23 | yes | yes | yes | yes | no | no | push_object:crate#1, box_to_sticky:n1 |
| 6 | right | r23 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r34 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |
| 7 | right | r34 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

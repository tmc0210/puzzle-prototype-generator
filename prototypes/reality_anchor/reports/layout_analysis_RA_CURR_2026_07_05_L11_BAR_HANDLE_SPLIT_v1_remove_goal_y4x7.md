# Level Analysis: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_remove_goal_y4x7

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_remove_goal_y4x7
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
#..##...GG##
#..##...####
#.....BS...#
############
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 278
- Inputs: left left down right up right down
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid
- Event counts: walk=5, push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
############
#.......##.#
#....@C.MM.#
#..##...GG##
#..##...####
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.....@MMM.#
#..##...GG##
#..##...####
#.....BS...#
############
```

### Step 7: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
############
#......@##.#
#......MMM.#
#..##...GG##
#..##...####
#.....BS...#
############
```

After:

```text
############
#.......##.#
#......@...#
#..##..Mmm##
#..##...####
#.....BS...#
############
```


## Graph Facts

- Status: complete
- Reachable states: 9104
- Legal transitions: 26460
- Event-only illegal transitions: 0
- Winning states: 723
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
- Winning regions: 22
- Initial region: r0, states=30, dist=2, internalBidirectional=80, commitments=6, viableCommitments=3, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r10@4 -> r35@7
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=109, edges=259, winReachable=19, winning=17, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=1, mergingWinSccs=8
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=330, dist=1, out=9, winOut=2, deadOut=7
- SCC path: s0@0 -> s4@4

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 330 | 9 | 2 | 7 | 0 | 0 | s4 | no |
| s4 | 4 | 0 | 62 | 3 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s4 | 330 | no | no | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=9104, regions=284, solution commitments=2
- Opening: commitments=6, viable=3, dead=3, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r10 | 2 | 3 | 3 | 1 | forced optimal |
| 6 | r10 | r35 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 30 | 6 | 3 | 3 | 1 | 1 | r10 | no | no | yes |
| r10 | 4 | 1 | 30 | 3 | 1 | 2 | 1 | 1 | r35 | no | yes | yes |
| r35 | 7 | 0 | 32 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 6 | 3 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 2 | 6 | 3 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 2 | 6 | 3 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 2 | 6 | 3 | 3 | 1 | 1 | r10 | yes | yes | yes | yes | no | yes | walk |
| 4 | right | r10 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 5 | up | r10 | no | 1 | 3 | 1 | 2 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r10 | no | 1 | 3 | 1 | 2 | 1 | 1 | r35 | yes | yes | yes | yes | yes | yes | walk |
| 7 | down | r35 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

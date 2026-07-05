# Level Analysis: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_upper

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_upper
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#.......##.#
#....@C.MM.#
#..##.....##
#..##...G###
#.....BS...#
############
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 252
- Inputs: up right down down left down right right
- Events: walk walk push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: walk=4, push_object:crate#1=3, box_to_sticky:n1=1, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#.....@.##.#
#.....C.MM.#
#..##.....##
#..##...G###
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.....@.MM.#
#..##.C...##
#..##...G###
#.....BS...#
############
```

### Step 4: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#.......##.#
#.....@.MM.#
#..##.C...##
#..##...G###
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.......MM.#
#..##.@...##
#..##.C.G###
#.....BS...#
############
```

### Step 7: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1

Before:

```text
############
#.......##.#
#.......MM.#
#..##.....##
#..##@C.G###
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.......MM.#
#..##.....##
#..##.@MG###
#.....BS...#
############
```

### Step 8: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
############
#.......##.#
#.......MM.#
#..##.....##
#..##.@MG###
#.....BS...#
############
```

After:

```text
############
#.......##.#
#.......MM.#
#..##.....##
#..##..@m###
#.....BS...#
############
```


## Graph Facts

- Status: complete
- Reachable states: 32329
- Legal transitions: 94850
- Event-only illegal transitions: 0
- Winning states: 3117
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 32329
- Legal transitions: 94850
- Budget: maxStates=500000
- Compressed regions: 946
- Bidirectional transitions: 91484
- Commitment transitions: 3366
- Winning regions: 89
- Initial region: r0, states=34, dist=4, internalBidirectional=90, commitments=7, viableCommitments=6, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@3 -> r5@4 -> r21@7 -> r33@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=240, edges=620, winReachable=71, winning=37, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=24, mergingWinSccs=50
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2210, dist=1, out=17, winOut=7, deadOut=10
- SCC path: s0@0 -> s94@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 2210 | 17 | 7 | 10 | 0 | 0 | s94 | no |
| s94 | 8 | 0 | 31 | 3 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s94 | 2210 | no | no | right | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=32329, regions=946, solution commitments=4
- Opening: commitments=7, viable=6, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=1/4, forced viable commitments=0/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r3 | 4 | 6 | 1 | 1 | forced optimal |
| 3 | r3 | r5 | 3 | 7 | 0 | 2 | multiple optimal choices |
| 6 | r5 | r21 | 2 | 5 | 0 | 1 | forced optimal |
| 7 | r21 | r33 | 1 | 5 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 34 | 7 | 6 | 1 | 1 | 1 | r3 | no | no | yes |
| r3 | 3 | 3 | 34 | 7 | 7 | 0 | 2 | 2 | r5 | no | no | no |
| r5 | 4 | 2 | 34 | 5 | 5 | 0 | 1 | 1 | r21 | no | no | yes |
| r21 | 7 | 1 | 34 | 5 | 5 | 0 | 1 | 1 | r33 | no | no | yes |
| r33 | 8 | 0 | 31 | 3 | 2 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 7 | 6 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 4 | 7 | 6 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 7 | 6 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 3 | down | r3 | yes | 3 | 7 | 7 | 0 | 2 | 2 | r5 | yes | yes | yes | yes | no | no | push_object:crate#1 |
| 4 | down | r5 | yes | 2 | 5 | 5 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 5 | left | r5 | no | 2 | 5 | 5 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r5 | no | 2 | 5 | 5 | 0 | 1 | 1 | r21 | yes | yes | yes | yes | no | yes | walk |
| 7 | right | r21 | yes | 1 | 5 | 5 | 0 | 1 | 1 | r33 | yes | yes | yes | yes | no | yes | push_object:crate#1, box_to_sticky:n1 |
| 8 | right | r33 | yes | 0 | 3 | 2 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

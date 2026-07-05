# Level Analysis: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_right_goal

## Summary

- Prototype: reality_anchor
- Title: Multi-axis P/L relay v1 no top right goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#PL@.#####
#..G.#...#
#.CG#.CG.#
#........#
##########
```

## Shortest Solution

- Found: yes
- Cost: 29
- Depth: 29
- Explored states: 1726
- Inputs: down left left down right up down left down right right up up right up left left left down down right down right right right right right up right
- Events: walk walk walk walk push_object:crate#1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:crate#1 walk walk walk walk walk walk walk pull_object:crate#2
- Event counts: walk=23, push_object:crate#1=2, pull_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=2, pull_object:crate#1=1, pull_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#PL..#####
#..G.#...#
#@CG#.CG.#
#........#
##########
```

After:

```text
##########
#PL..#####
#..G.#...#
#.@*#.CG.#
#........#
##########
```

### Step 7: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#PL..#####
#.@G.#...#
#..*#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#PLG.#...#
#.@*#.CG.#
#........#
##########
```

### Step 8: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
##########
#....#####
#PLG.#...#
#.@*#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#PLG.#...#
#@CG#.CG.#
#........#
##########
```

### Step 14: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#....#####
#PL+.#...#
#.CG#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#.PL@#...#
#.CG#.CG.#
#........#
##########
```

### Step 21: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#....#####
#.PL.#...#
#@CG#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#.PL.#...#
#.@*#.CG.#
#........#
##########
```

### Step 29: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#....#####
#.PL.#...#
#..*#.C+.#
#........#
##########
```

After:

```text
##########
#....#####
#.PL.#...#
#..*#..*@#
#........#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 9028
- Legal transitions: 22844
- Event-only illegal transitions: 0
- Winning states: 66
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 9028
- Legal transitions: 22844
- Budget: maxStates=300000
- Compressed regions: 736
- Bidirectional transitions: 20940
- Commitment transitions: 1641
- Winning regions: 3
- Initial region: r0, states=43, dist=4, internalBidirectional=90, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r6@7 -> r46@14 -> r90@21 -> r179@29
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=412, edges=702, winReachable=8, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=2, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=1020, dist=1, out=32, winOut=3, deadOut=29
- SCC path: s0@0 -> s1@14 -> s12@21

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 1020 | 32 | 3 | 29 | 0 | 0 | s1 | no |
| s1 | 14 | 1 | 42 | 7 | 3 | 4 | 1 | 1 | s12 | no |
| s12 | 21 | 0 | 44 | 4 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 14 | s1 | 1020 | no | no | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s1 | 14 | 21 | s12 | 42 | no | no | right | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=9028, regions=736, solution commitments=4
- Opening: commitments=5, viable=4, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=0/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 6 | r0 | r6 | 4 | 4 | 1 | 2 | multiple optimal choices |
| 13 | r6 | r46 | 3 | 5 | 0 | 2 | multiple optimal choices |
| 20 | r46 | r90 | 2 | 4 | 2 | 2 | multiple optimal choices |
| 28 | r90 | r179 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 43 | 5 | 4 | 1 | 2 | 2 | r6 | no | no | no |
| r6 | 7 | 3 | 23 | 5 | 5 | 0 | 2 | 2 | r46 | no | no | no |
| r46 | 14 | 2 | 21 | 6 | 4 | 2 | 2 | 2 | r90 | no | no | no |
| r90 | 21 | 1 | 22 | 4 | 2 | 2 | 1 | 1 | r179 | no | no | yes |
| r179 | 29 | 0 | 22 | 4 | 2 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 4 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 4 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 4 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 4 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 4 | 5 | 4 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 6 | up | r0 | no | 4 | 5 | 4 | 1 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 7 | down | r6 | yes | 3 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | left | r6 | no | 3 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 9 | down | r6 | no | 3 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r6 | no | 3 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r6 | no | 3 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r6 | no | 3 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r6 | no | 3 | 5 | 5 | 0 | 2 | 2 | r46 | yes | yes | yes | yes | no | no | walk |
| 14 | right | r46 | yes | 2 | 6 | 4 | 2 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 15 | up | r46 | no | 2 | 6 | 4 | 2 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r46 | no | 2 | 6 | 4 | 2 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r46 | no | 2 | 6 | 4 | 2 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r46 | no | 2 | 6 | 4 | 2 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r46 | no | 2 | 6 | 4 | 2 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r46 | no | 2 | 6 | 4 | 2 | 2 | 2 | r90 | yes | yes | yes | yes | no | no | walk |
| 21 | right | r90 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r90 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 22 | down | r90 | no | 1 | 4 | 2 | 2 | 1 | 1 | r90 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r90 | no | 1 | 4 | 2 | 2 | 1 | 1 | r90 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r90 | no | 1 | 4 | 2 | 2 | 1 | 1 | r90 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r90 | no | 1 | 4 | 2 | 2 | 1 | 1 | r90 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r90 | no | 1 | 4 | 2 | 2 | 1 | 1 | r90 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r90 | no | 1 | 4 | 2 | 2 | 1 | 1 | r90 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | up | r90 | no | 1 | 4 | 2 | 2 | 1 | 1 | r179 | yes | yes | yes | yes | no | yes | walk |
| 29 | right | r179 | yes | 0 | 4 | 2 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |

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

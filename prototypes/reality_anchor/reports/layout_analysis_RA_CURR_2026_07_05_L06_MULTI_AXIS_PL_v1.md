# Level Analysis: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1

## Summary

- Prototype: reality_anchor
- Title: Multi-axis P/L relay v1
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#PL@.#####
#..GG#...#
#.CG#.CG.#
#........#
##########
```

## Shortest Solution

- Found: yes
- Cost: 31
- Depth: 31
- Explored states: 2040
- Inputs: down left left down right up down left down right right up up right up left left left down right left down right down right right right right right up right
- Events: walk walk walk walk push_object:crate#1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 walk walk walk walk walk walk walk pull_object:crate#2
- Event counts: walk=24, push_object:crate#1=2, pull_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=3, pull_object:crate#1=1, push_object:push_pull_anchor=1, pull_object:crate#2=1

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
#..GG#...#
#@CG#.CG.#
#........#
##########
```

After:

```text
##########
#PL..#####
#..GG#...#
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
#.@GG#...#
#..*#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#PLGG#...#
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
#PLGG#...#
#.@*#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#PLGG#...#
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
#PL+G#...#
#.CG#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#.PL+#...#
#.CG#.CG.#
#........#
##########
```

### Step 20: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#....#####
#@PLG#...#
#.CG#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#.@PL#...#
#.CG#.CG.#
#........#
##########
```

### Step 23: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#....#####
#..PL#...#
#@CG#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#..PL#...#
#.@*#.CG.#
#........#
##########
```

### Step 31: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#....#####
#..PL#...#
#..*#.C+.#
#........#
##########
```

After:

```text
##########
#....#####
#..PL#...#
#..*#..*@#
#........#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 9028
- Legal transitions: 22844
- Event-only illegal transitions: 0
- Winning states: 22
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
- Winning regions: 1
- Initial region: r0, states=43, dist=5, internalBidirectional=90, commitments=5, viableCommitments=3, deadCommitments=2, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r6@7 -> r46@14 -> r85@20 -> r110@23 -> r210@31
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=412, edges=702, winReachable=5, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=1020, dist=2, out=32, winOut=2, deadOut=30
- SCC path: s0@0 -> s1@14 -> s2@20 -> s13@23

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1020 | 32 | 2 | 30 | 0 | 0 | s1 | no |
| s1 | 14 | 2 | 42 | 7 | 2 | 5 | 1 | 1 | s2 | no |
| s2 | 20 | 1 | 88 | 5 | 1 | 4 | 1 | 1 | s13 | yes |
| s13 | 23 | 0 | 44 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 14 | s1 | 1020 | no | no | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s1 | 14 | 20 | s2 | 42 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s2 | 20 | 23 | s13 | 88 | no | yes | right | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=9028, regions=736, solution commitments=5
- Opening: commitments=5, viable=3, dead=2, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 6 | r0 | r6 | 5 | 3 | 2 | 2 | multiple optimal choices |
| 13 | r6 | r46 | 4 | 5 | 0 | 2 | multiple optimal choices |
| 19 | r46 | r85 | 3 | 3 | 3 | 3 | multiple optimal choices |
| 22 | r85 | r110 | 2 | 3 | 3 | 2 | multiple optimal choices |
| 30 | r110 | r210 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 43 | 5 | 3 | 2 | 2 | 2 | r6 | no | no | no |
| r6 | 7 | 4 | 23 | 5 | 5 | 0 | 2 | 2 | r46 | no | no | no |
| r46 | 14 | 3 | 21 | 6 | 3 | 3 | 3 | 3 | r85 | no | no | no |
| r85 | 20 | 2 | 22 | 6 | 3 | 3 | 2 | 2 | r110 | no | no | no |
| r110 | 23 | 1 | 22 | 2 | 1 | 1 | 1 | 1 | r210 | no | yes | yes |
| r210 | 31 | 0 | 22 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 6 | up | r0 | no | 5 | 5 | 3 | 2 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 7 | down | r6 | yes | 4 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | left | r6 | no | 4 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 9 | down | r6 | no | 4 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r6 | no | 4 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r6 | no | 4 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r6 | no | 4 | 5 | 5 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r6 | no | 4 | 5 | 5 | 0 | 2 | 2 | r46 | yes | yes | yes | yes | no | no | walk |
| 14 | right | r46 | yes | 3 | 6 | 3 | 3 | 3 | 3 | r46 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 15 | up | r46 | no | 3 | 6 | 3 | 3 | 3 | 3 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r46 | no | 3 | 6 | 3 | 3 | 3 | 3 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r46 | no | 3 | 6 | 3 | 3 | 3 | 3 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r46 | no | 3 | 6 | 3 | 3 | 3 | 3 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r46 | no | 3 | 6 | 3 | 3 | 3 | 3 | r85 | yes | yes | yes | yes | no | no | walk |
| 20 | right | r85 | yes | 2 | 6 | 3 | 3 | 2 | 2 | r85 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 21 | left | r85 | no | 2 | 6 | 3 | 3 | 2 | 2 | r85 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r85 | no | 2 | 6 | 3 | 3 | 2 | 2 | r110 | yes | yes | yes | yes | no | no | walk |
| 23 | right | r110 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r110 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 24 | down | r110 | no | 1 | 2 | 1 | 1 | 1 | 1 | r110 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r110 | no | 1 | 2 | 1 | 1 | 1 | 1 | r110 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r110 | no | 1 | 2 | 1 | 1 | 1 | 1 | r110 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r110 | no | 1 | 2 | 1 | 1 | 1 | 1 | r110 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r110 | no | 1 | 2 | 1 | 1 | 1 | 1 | r110 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r110 | no | 1 | 2 | 1 | 1 | 1 | 1 | r110 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | up | r110 | no | 1 | 2 | 1 | 1 | 1 | 1 | r210 | yes | yes | yes | yes | yes | yes | walk |
| 31 | right | r210 | yes | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |

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

# Level Analysis: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_left_goal

## Summary

- Prototype: reality_anchor
- Title: Multi-axis P/L relay v1 no top left goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#PL@.#####
#...G#...#
#.CG#.CG.#
#........#
##########
```

## Shortest Solution

- Found: yes
- Cost: 21
- Depth: 21
- Explored states: 889
- Inputs: right down left left left down down right up left up right right down down right right right right up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1 walk walk push_object:crate#1 push_object:crate#1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:crate#2
- Event counts: pull_object:push_pull_anchor=3, anchor_boundary_shift:push_pull=3, walk=14, push_object:crate#1=3, pull_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#PL@.#####
#...G#...#
#.CG#.CG.#
#........#
##########
```

After:

```text
##########
#.PL@#####
#...G#...#
#.CG#.CG.#
#........#
##########
```

### Step 9: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#.PL.#####
#...G#...#
#.CG#.CG.#
#.@......#
##########
```

After:

```text
##########
#.PL.#####
#.C.G#...#
#.@G#.CG.#
#........#
##########
```

### Step 12: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#.PL.#####
#@C.G#...#
#..G#.CG.#
#........#
##########
```

After:

```text
##########
#.PL.#####
#.@CG#...#
#..G#.CG.#
#........#
##########
```

### Step 13: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#.PL.#####
#.@CG#...#
#..G#.CG.#
#........#
##########
```

After:

```text
##########
#.PL.#####
#..@*#...#
#..G#.CG.#
#........#
##########
```

### Step 14: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#.PL.#####
#..@*#...#
#..G#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#.PL*#...#
#..+#.CG.#
#........#
##########
```

### Step 15: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#....#####
#.PL*#...#
#..+#.CG.#
#........#
##########
```

After:

```text
##########
#....#####
#...*#...#
#.PL#.CG.#
#..@.....#
##########
```

### Step 21: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#....#####
#...*#...#
#.PL#.C+.#
#........#
##########
```

After:

```text
##########
#....#####
#...*#...#
#.PL#..*@#
#........#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 9028
- Legal transitions: 22844
- Event-only illegal transitions: 0
- Winning states: 44
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
- Initial region: r0, states=43, dist=5, internalBidirectional=90, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r21@9 -> r38@12 -> r52@14 -> r59@15 -> r99@21
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=412, edges=702, winReachable=8, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=2, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=1020, dist=2, out=32, winOut=3, deadOut=29
- SCC path: s0@0 -> s155@1 -> s158@9 -> s166@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1020 | 32 | 3 | 29 | 0 | 0 | s155 | no |
| s155 | 1 | 2 | 44 | 7 | 1 | 6 | 1 | 1 | s158 | yes |
| s158 | 9 | 1 | 38 | 4 | 1 | 3 | 2 | 2 | s166 | yes |
| s166 | 12 | 0 | 516 | 13 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s155 | 1020 | yes | no | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s155 | 1 | 9 | s158 | 44 | no | yes | up | push_object:crate#1 | has_reposition_room |
| s158 | 9 | 12 | s166 | 38 | no | yes | right | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=9028, regions=736, solution commitments=6
- Opening: commitments=5, viable=4, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/6, optimal prefix=0/6, forced viable commitments=0/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 4 | 1 | 2 | multiple optimal choices |
| 8 | r1 | r21 | 5 | 2 | 4 | 2 | multiple optimal choices |
| 11 | r21 | r38 | 4 | 2 | 2 | 2 | multiple optimal choices |
| 13 | r38 | r52 | 3 | 2 | 2 | 2 | multiple optimal choices |
| 14 | r52 | r59 | 2 | 3 | 0 | 2 | multiple optimal choices |
| 20 | r59 | r99 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 43 | 5 | 4 | 1 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 5 | 22 | 6 | 2 | 4 | 2 | 2 | r21 | no | no | no |
| r21 | 9 | 4 | 19 | 4 | 2 | 2 | 2 | 2 | r38 | no | no | no |
| r38 | 12 | 3 | 21 | 4 | 2 | 2 | 2 | 2 | r52 | no | no | no |
| r52 | 14 | 2 | 22 | 3 | 3 | 0 | 2 | 2 | r59 | no | no | no |
| r59 | 15 | 1 | 21 | 4 | 4 | 0 | 1 | 1 | r99 | no | no | yes |
| r99 | 21 | 0 | 21 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 5 | 4 | 1 | 2 | 2 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | down | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r21 | yes | yes | yes | yes | no | no | walk |
| 9 | up | r21 | yes | 4 | 4 | 2 | 2 | 2 | 2 | r21 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 10 | left | r21 | no | 4 | 4 | 2 | 2 | 2 | 2 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r21 | no | 4 | 4 | 2 | 2 | 2 | 2 | r38 | yes | yes | yes | yes | no | no | walk |
| 12 | right | r38 | yes | 3 | 4 | 2 | 2 | 2 | 2 | r38 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 13 | right | r38 | no | 3 | 4 | 2 | 2 | 2 | 2 | r52 | yes | yes | yes | yes | no | no | push_object:crate#1 |
| 14 | down | r52 | yes | 2 | 3 | 3 | 0 | 2 | 2 | r59 | yes | yes | yes | yes | no | no | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 15 | down | r59 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 16 | right | r59 | no | 1 | 4 | 4 | 0 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r59 | no | 1 | 4 | 4 | 0 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r59 | no | 1 | 4 | 4 | 0 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r59 | no | 1 | 4 | 4 | 0 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r59 | no | 1 | 4 | 4 | 0 | 1 | 1 | r99 | yes | yes | yes | yes | no | yes | walk |
| 21 | right | r99 | yes | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |

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

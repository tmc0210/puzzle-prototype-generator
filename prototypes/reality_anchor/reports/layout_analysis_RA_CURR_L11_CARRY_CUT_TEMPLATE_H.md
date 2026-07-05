# Level Analysis: RA_CURR_L11_CARRY_CUT_TEMPLATE_H

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_CARRY_CUT_TEMPLATE_H
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#.........#
#.........#
#..#......#
#.B#.G.C..#
#.S##M..G.#
#.@########
###########
```

## Shortest Solution

- Found: yes
- Cost: 38
- Depth: 38
- Explored states: 24603
- Inputs: up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down down right down right right up left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk push_object:crate#1
- Event counts: push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, box_to_sticky:n1=1, walk=30, push_object:sticky#2=2, move_sticky_rigid=5, sticky_merge:n1=1, push_object:sticky#1=3, sticky_to_box:n1=1, push_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1

Before:

```text
###########
#.........#
#.........#
#..#......#
#.B#.G.C..#
#.S##M..G.#
#.@########
###########
```

After:

```text
###########
#.........#
#.........#
#.B#......#
#.S#.G.M..#
#.@##M..G.#
#..########
###########
```

### Step 15: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid

Before:

```text
###########
#.........#
#.........#
#.B#......#
#.S#.G.M@.#
#..##M..G.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#.B#......#
#.S#.GM@..#
#..##M..G.#
#..########
###########
```

### Step 16: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
###########
#.........#
#.........#
#.B#......#
#.S#.GM@..#
#..##M..G.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#.B#......#
#.S#.m@...#
#..##M..G.#
#..########
###########
```

### Step 21: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#.........#
#.........#
#.B#......#
#.S#@m....#
#..##M..G.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#.B#......#
#.S#.+M...#
#..##.M.G.#
#..########
###########
```

### Step 27: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
#.........#
#.@.......#
#.B#......#
#.S#.GM...#
#..##.M.G.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#.@#......#
#.B#.GC...#
#.S##.M.G.#
#..########
###########
```

### Step 35: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#.........#
#.........#
#..#......#
#.B#.GC...#
#.S##@M.G.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#..#......#
#.B#.GC...#
#.S##.@MG.#
#..########
###########
```

### Step 36: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#.........#
#.........#
#..#......#
#.B#.GC...#
#.S##.@MG.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#..#......#
#.B#.GC...#
#.S##..@m.#
#..########
###########
```

### Step 38: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
###########
#.........#
#.........#
#..#......#
#.B#.GC@..#
#.S##...m.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#..#......#
#.B#.*@...#
#.S##...m.#
#..########
###########
```


## Graph Facts

- Status: complete
- Reachable states: 121516
- Legal transitions: 375149
- Event-only illegal transitions: 0
- Winning states: 663
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 121516
- Legal transitions: 375149
- Budget: maxStates=300000
- Compressed regions: 3655
- Bidirectional transitions: 357624
- Commitment transitions: 17525
- Winning regions: 20
- Initial region: r0, states=39, dist=8, internalBidirectional=114, commitments=6, viableCommitments=4, deadCommitments=2, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r49@15 -> r78@16 -> r266@21 -> r525@27 -> r758@35 -> r782@36 -> r818@38
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=1043, edges=2221, winReachable=131, winning=13, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=1, mergingWinSccs=15
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=7485, dist=0, out=82, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 7485 | 82 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=121516, regions=3655, solution commitments=8
- Opening: commitments=6, viable=4, dead=2, optimal=2
- Win-continuation prefix: viable prefix=0/8, optimal prefix=0/8, forced viable commitments=0/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 8 | 4 | 2 | 2 | multiple optimal choices |
| 14 | r1 | r49 | 7 | 5 | 1 | 1 | forced optimal |
| 15 | r49 | r78 | 6 | 5 | 1 | 1 | forced optimal |
| 20 | r78 | r266 | 5 | 3 | 0 | 1 | forced optimal |
| 26 | r266 | r525 | 4 | 4 | 0 | 1 | forced optimal |
| 34 | r525 | r758 | 3 | 6 | 0 | 1 | forced optimal |
| 35 | r758 | r782 | 2 | 7 | 1 | 2 | multiple optimal choices |
| 37 | r782 | r818 | 1 | 6 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 8 | 39 | 6 | 4 | 2 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 7 | 39 | 6 | 5 | 1 | 1 | 1 | r49 | no | no | yes |
| r49 | 15 | 6 | 39 | 6 | 5 | 1 | 1 | 1 | r78 | no | no | yes |
| r78 | 16 | 5 | 39 | 3 | 3 | 0 | 1 | 1 | r266 | no | no | yes |
| r266 | 21 | 4 | 39 | 4 | 4 | 0 | 1 | 1 | r525 | no | no | yes |
| r525 | 27 | 3 | 39 | 6 | 6 | 0 | 1 | 1 | r758 | no | no | yes |
| r758 | 35 | 2 | 39 | 8 | 7 | 1 | 2 | 2 | r782 | no | no | no |
| r782 | 36 | 1 | 39 | 8 | 6 | 2 | 1 | 1 | r818 | no | no | yes |
| r818 | 38 | 0 | 39 | 8 | 5 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 8 | 6 | 4 | 2 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | up | r1 | yes | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 2 | left | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r49 | yes | yes | yes | yes | no | yes | walk |
| 15 | left | r49 | yes | 6 | 6 | 5 | 1 | 1 | 1 | r78 | yes | yes | yes | yes | no | yes | push_object:sticky#2, move_sticky_rigid |
| 16 | left | r78 | yes | 5 | 3 | 3 | 0 | 1 | 1 | r78 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 17 | up | r78 | no | 5 | 3 | 3 | 0 | 1 | 1 | r78 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r78 | no | 5 | 3 | 3 | 0 | 1 | 1 | r78 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r78 | no | 5 | 3 | 3 | 0 | 1 | 1 | r78 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r78 | no | 5 | 3 | 3 | 0 | 1 | 1 | r266 | yes | yes | yes | yes | no | yes | walk |
| 21 | right | r266 | yes | 4 | 4 | 4 | 0 | 1 | 1 | r266 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 22 | up | r266 | no | 4 | 4 | 4 | 0 | 1 | 1 | r266 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r266 | no | 4 | 4 | 4 | 0 | 1 | 1 | r266 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r266 | no | 4 | 4 | 4 | 0 | 1 | 1 | r266 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r266 | no | 4 | 4 | 4 | 0 | 1 | 1 | r266 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r266 | no | 4 | 4 | 4 | 0 | 1 | 1 | r525 | yes | yes | yes | yes | no | yes | walk |
| 27 | down | r525 | yes | 3 | 6 | 6 | 0 | 1 | 1 | r525 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 28 | up | r525 | no | 3 | 6 | 6 | 0 | 1 | 1 | r525 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r525 | no | 3 | 6 | 6 | 0 | 1 | 1 | r525 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r525 | no | 3 | 6 | 6 | 0 | 1 | 1 | r525 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | down | r525 | no | 3 | 6 | 6 | 0 | 1 | 1 | r525 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | down | r525 | no | 3 | 6 | 6 | 0 | 1 | 1 | r525 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r525 | no | 3 | 6 | 6 | 0 | 1 | 1 | r525 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | down | r525 | no | 3 | 6 | 6 | 0 | 1 | 1 | r758 | yes | yes | yes | yes | no | yes | walk |
| 35 | right | r758 | yes | 2 | 8 | 7 | 1 | 2 | 2 | r782 | yes | yes | yes | yes | no | no | push_object:sticky#1, move_sticky_rigid |
| 36 | right | r782 | yes | 1 | 8 | 6 | 2 | 1 | 1 | r782 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 37 | up | r782 | no | 1 | 8 | 6 | 2 | 1 | 1 | r818 | yes | yes | yes | yes | no | yes | walk |
| 38 | left | r818 | yes | 0 | 8 | 5 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

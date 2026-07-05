# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_no_lower_goal

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_no_lower_goal
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
#.S##M.####
#.@########
###########
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 444
- Inputs: up up up left up right right right down right right right right down left left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1
- Event counts: push_object:box_sticky_anchor=6, anchor_boundary_shift:box_sticky=6, box_to_sticky:n1=1, walk=8, push_object:sticky#2=2, move_sticky_rigid=2, sticky_merge:n1=1

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
#.S##M.####
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
#.@##M.####
#..########
###########
```

### Step 2: up

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#.........#
#.........#
#.B#......#
#.S#.G.M..#
#.@##M.####
#..########
###########
```

After:

```text
###########
#.........#
#.B.......#
#.S#......#
#.@#.G.M..#
#..##M.####
#..########
###########
```

### Step 3: up

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#.........#
#.B.......#
#.S#......#
#.@#.G.M..#
#..##M.####
#..########
###########
```

After:

```text
###########
#.B.......#
#.S.......#
#.@#......#
#..#.G.M..#
#..##M.####
#..########
###########
```

### Step 6: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#.B.......#
#@S.......#
#..#......#
#..#.G.M..#
#..##M.####
#..########
###########
```

After:

```text
###########
#..B......#
#.@S......#
#..#......#
#..#.G.M..#
#..##M.####
#..########
###########
```

### Step 7: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#..B......#
#.@S......#
#..#......#
#..#.G.M..#
#..##M.####
#..########
###########
```

After:

```text
###########
#...B.....#
#..@S.....#
#..#......#
#..#.G.M..#
#..##M.####
#..########
###########
```

### Step 8: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#...B.....#
#..@S.....#
#..#......#
#..#.G.M..#
#..##M.####
#..########
###########
```

After:

```text
###########
#....B....#
#...@S....#
#..#......#
#..#.G.M..#
#..##M.####
#..########
###########
```

### Step 15: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid

Before:

```text
###########
#....B....#
#....S....#
#..#......#
#..#.G.M@.#
#..##M.####
#..########
###########
```

After:

```text
###########
#....B....#
#....S....#
#..#......#
#..#.GM@..#
#..##M.####
#..########
###########
```

### Step 16: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
###########
#....B....#
#....S....#
#..#......#
#..#.GM@..#
#..##M.####
#..########
###########
```

After:

```text
###########
#....B....#
#....S....#
#..#......#
#..#.m@...#
#..##M.####
#..########
###########
```


## Graph Facts

- Status: complete
- Reachable states: 7922
- Legal transitions: 23855
- Event-only illegal transitions: 0
- Winning states: 1207
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 7922
- Legal transitions: 23855
- Budget: maxStates=300000
- Compressed regions: 260
- Bidirectional transitions: 23042
- Commitment transitions: 813
- Winning regions: 40
- Initial region: r0, states=36, dist=2, internalBidirectional=104, commitments=4, viableCommitments=4, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r3@3 -> r4@6 -> r6@7 -> r7@8 -> r29@15 -> r40@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=119, edges=196, winReachable=54, winning=24, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=8, mergingWinSccs=11
- Handoff scriptiness: scope=returned_solution, scripted=2/5, trivial=0, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=858, dist=0, out=16, winOut=0, deadOut=0
- SCC path: s0@0 -> s92@3 -> s93@6 -> s94@7 -> s95@8 -> s97@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 858 | 16 | 0 | 0 | 0 | 0 | s92 | no |
| s92 | 3 | 4 | 10 | 1 | 1 | 0 | 1 | 1 | s93 | yes |
| s93 | 6 | 3 | 12 | 1 | 1 | 0 | 1 | 1 | s94 | yes |
| s94 | 7 | 2 | 14 | 1 | 1 | 0 | 1 | 1 | s95 | yes |
| s95 | 8 | 1 | 428 | 5 | 3 | 2 | 3 | 3 | s97 | no |
| s97 | 16 | 0 | 288 | 2 | 0 | 0 | 5 | 5 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s92 | 858 | no | no | up | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s92 | 3 | 6 | s93 | 10 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s93 | 6 | 7 | s94 | 12 | yes | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s94 | 7 | 8 | s95 | 14 | yes | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s95 | 8 | 16 | s97 | 428 | no | no | left | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=7922, regions=260, solution commitments=8
- Opening: commitments=4, viable=4, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/8, optimal prefix=0/8, forced viable commitments=3/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 4 | 0 | 1 | multiple viable choices |
| 1 | r1 | r2 | 2 | 4 | 0 | 1 | multiple viable choices |
| 2 | r2 | r3 | 2 | 5 | 0 | 1 | multiple viable choices |
| 5 | r3 | r4 | 5 | 1 | 0 | 1 | forced optimal |
| 6 | r4 | r6 | 4 | 1 | 0 | 1 | forced optimal |
| 7 | r6 | r7 | 3 | 1 | 0 | 1 | forced optimal |
| 14 | r7 | r29 | 2 | 4 | 0 | 1 | forced optimal |
| 15 | r29 | r40 | 1 | 4 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 36 | 4 | 4 | 0 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 2 | 36 | 4 | 4 | 0 | 1 | 1 | r2 | no | no | no |
| r2 | 2 | 2 | 36 | 5 | 5 | 0 | 1 | 1 | r3 | no | no | no |
| r3 | 3 | 5 | 10 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 6 | 4 | 12 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes |
| r6 | 7 | 3 | 14 | 1 | 1 | 0 | 1 | 1 | r7 | yes | yes | yes |
| r7 | 8 | 2 | 36 | 4 | 4 | 0 | 1 | 1 | r29 | no | no | yes |
| r29 | 15 | 1 | 35 | 5 | 4 | 1 | 1 | 1 | r40 | no | no | yes |
| r40 | 16 | 0 | 36 | 3 | 3 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 4 | 4 | 0 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | up | r1 | yes | 2 | 4 | 4 | 0 | 1 | 1 | r2 | yes | yes | no | no | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 2 | up | r2 | yes | 2 | 5 | 5 | 0 | 1 | 1 | r3 | yes | yes | no | no | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 3 | up | r3 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 4 | left | r3 | no | 5 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r3 | no | 5 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r4 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 7 | right | r6 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 8 | right | r7 | yes | 2 | 4 | 4 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 9 | down | r7 | no | 2 | 4 | 4 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r7 | no | 2 | 4 | 4 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r7 | no | 2 | 4 | 4 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r7 | no | 2 | 4 | 4 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r7 | no | 2 | 4 | 4 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r7 | no | 2 | 4 | 4 | 0 | 1 | 1 | r29 | yes | yes | yes | yes | no | yes | walk |
| 15 | left | r29 | yes | 1 | 5 | 4 | 1 | 1 | 1 | r40 | yes | yes | yes | yes | no | yes | push_object:sticky#2, move_sticky_rigid |
| 16 | left | r40 | yes | 0 | 3 | 3 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |

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

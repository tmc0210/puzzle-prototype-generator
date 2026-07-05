# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1
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
#.S##MG####
#.@########
###########
```

## Shortest Solution

- Found: yes
- Cost: 36
- Depth: 36
- Explored states: 4325
- Inputs: up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down right right right down left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk push_object:crate#1
- Event counts: push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, box_to_sticky:n1=1, walk=30, push_object:sticky#2=2, move_sticky_rigid=3, sticky_merge:n1=1, push_object:sticky#1=1, sticky_to_box:n1=1, push_object:crate#1=1

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
#.S##MG####
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
#.@##MG####
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
#..##MG####
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
#..##MG####
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
#..##MG####
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
#..##MG####
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
#..##MG####
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
#..##.m####
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
#..##.m####
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
#.S##.m####
#..########
###########
```

### Step 36: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
###########
#.........#
#.........#
#..#......#
#.B#.GC@..#
#.S##.m####
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
#.S##.m####
#..########
###########
```


## Graph Facts

- Status: complete
- Reachable states: 7922
- Legal transitions: 23855
- Event-only illegal transitions: 0
- Winning states: 595
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
- Winning regions: 20
- Initial region: r0, states=36, dist=6, internalBidirectional=104, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r37@15 -> r47@16 -> r91@21 -> r118@27 -> r150@36
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=119, edges=196, winReachable=13, winning=13, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=858, dist=0, out=16, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 858 | 16 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=7922, regions=260, solution commitments=6
- Opening: commitments=4, viable=3, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/6, optimal prefix=0/6, forced viable commitments=0/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 3 | 1 | 2 | multiple optimal choices |
| 14 | r1 | r37 | 5 | 4 | 0 | 1 | forced optimal |
| 15 | r37 | r47 | 4 | 4 | 1 | 1 | forced optimal |
| 20 | r47 | r91 | 3 | 3 | 0 | 1 | forced optimal |
| 26 | r91 | r118 | 2 | 3 | 0 | 1 | forced optimal |
| 35 | r118 | r150 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 36 | 4 | 3 | 1 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 5 | 36 | 4 | 4 | 0 | 1 | 1 | r37 | no | no | yes |
| r37 | 15 | 4 | 35 | 5 | 4 | 1 | 1 | 1 | r47 | no | no | yes |
| r47 | 16 | 3 | 36 | 3 | 3 | 0 | 1 | 1 | r91 | no | no | yes |
| r91 | 21 | 2 | 36 | 3 | 3 | 0 | 1 | 1 | r118 | no | no | yes |
| r118 | 27 | 1 | 36 | 4 | 4 | 0 | 1 | 1 | r150 | no | no | yes |
| r150 | 36 | 0 | 35 | 5 | 3 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 4 | 3 | 1 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | up | r1 | yes | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 2 | left | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r1 | no | 5 | 4 | 4 | 0 | 1 | 1 | r37 | yes | yes | yes | yes | no | yes | walk |
| 15 | left | r37 | yes | 4 | 5 | 4 | 1 | 1 | 1 | r47 | yes | yes | yes | yes | no | yes | push_object:sticky#2, move_sticky_rigid |
| 16 | left | r47 | yes | 3 | 3 | 3 | 0 | 1 | 1 | r47 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 17 | up | r47 | no | 3 | 3 | 3 | 0 | 1 | 1 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r47 | no | 3 | 3 | 3 | 0 | 1 | 1 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r47 | no | 3 | 3 | 3 | 0 | 1 | 1 | r47 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r47 | no | 3 | 3 | 3 | 0 | 1 | 1 | r91 | yes | yes | yes | yes | no | yes | walk |
| 21 | right | r91 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r91 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 22 | up | r91 | no | 2 | 3 | 3 | 0 | 1 | 1 | r91 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r91 | no | 2 | 3 | 3 | 0 | 1 | 1 | r91 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r91 | no | 2 | 3 | 3 | 0 | 1 | 1 | r91 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r91 | no | 2 | 3 | 3 | 0 | 1 | 1 | r91 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r91 | no | 2 | 3 | 3 | 0 | 1 | 1 | r118 | yes | yes | yes | yes | no | yes | walk |
| 27 | down | r118 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r118 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 28 | up | r118 | no | 1 | 4 | 4 | 0 | 1 | 1 | r118 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r118 | no | 1 | 4 | 4 | 0 | 1 | 1 | r118 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r118 | no | 1 | 4 | 4 | 0 | 1 | 1 | r118 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | down | r118 | no | 1 | 4 | 4 | 0 | 1 | 1 | r118 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r118 | no | 1 | 4 | 4 | 0 | 1 | 1 | r118 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r118 | no | 1 | 4 | 4 | 0 | 1 | 1 | r118 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r118 | no | 1 | 4 | 4 | 0 | 1 | 1 | r118 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r118 | no | 1 | 4 | 4 | 0 | 1 | 1 | r150 | yes | yes | yes | yes | no | yes | walk |
| 36 | left | r150 | yes | 0 | 5 | 3 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

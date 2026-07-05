# Level Analysis: RA_CURR_L11_CORRIDOR_CARRY_CUT_TEMPLATE_K

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_CORRIDOR_CARRY_CUT_TEMPLATE_K
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#..........#
#..........#
#..#.......#
#.B#.G.C...#
#.S##M..G###
#.@#########
############
```

## Shortest Solution

- Found: yes
- Cost: 38
- Depth: 38
- Explored states: 29617
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
############
#..........#
#..........#
#..#.......#
#.B#.G.C...#
#.S##M..G###
#.@#########
############
```

After:

```text
############
#..........#
#..........#
#.B#.......#
#.S#.G.M...#
#.@##M..G###
#..#########
############
```

### Step 15: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid

Before:

```text
############
#..........#
#..........#
#.B#.......#
#.S#.G.M@..#
#..##M..G###
#..#########
############
```

After:

```text
############
#..........#
#..........#
#.B#.......#
#.S#.GM@...#
#..##M..G###
#..#########
############
```

### Step 16: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
############
#..........#
#..........#
#.B#.......#
#.S#.GM@...#
#..##M..G###
#..#########
############
```

After:

```text
############
#..........#
#..........#
#.B#.......#
#.S#.m@....#
#..##M..G###
#..#########
############
```

### Step 21: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
############
#..........#
#..........#
#.B#.......#
#.S#@m.....#
#..##M..G###
#..#########
############
```

After:

```text
############
#..........#
#..........#
#.B#.......#
#.S#.+M....#
#..##.M.G###
#..#########
############
```

### Step 27: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
############
#..........#
#.@........#
#.B#.......#
#.S#.GM....#
#..##.M.G###
#..#########
############
```

After:

```text
############
#..........#
#..........#
#.@#.......#
#.B#.GC....#
#.S##.M.G###
#..#########
############
```

### Step 35: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
############
#..........#
#..........#
#..#.......#
#.B#.GC....#
#.S##@M.G###
#..#########
############
```

After:

```text
############
#..........#
#..........#
#..#.......#
#.B#.GC....#
#.S##.@MG###
#..#########
############
```

### Step 36: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
############
#..........#
#..........#
#..#.......#
#.B#.GC....#
#.S##.@MG###
#..#########
############
```

After:

```text
############
#..........#
#..........#
#..#.......#
#.B#.GC....#
#.S##..@m###
#..#########
############
```

### Step 38: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#..........#
#..........#
#..#.......#
#.B#.GC@...#
#.S##...m###
#..#########
############
```

After:

```text
############
#..........#
#..........#
#..#.......#
#.B#.*@....#
#.S##...m###
#..#########
############
```


## Graph Facts

- Status: complete
- Reachable states: 121768
- Legal transitions: 377938
- Event-only illegal transitions: 0
- Winning states: 756
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 121768
- Legal transitions: 377938
- Budget: maxStates=300000
- Compressed regions: 3370
- Bidirectional transitions: 361848
- Commitment transitions: 16090
- Winning regions: 21
- Initial region: r0, states=42, dist=8, internalBidirectional=124, commitments=6, viableCommitments=4, deadCommitments=2, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r54@15 -> r84@16 -> r279@21 -> r587@27 -> r844@35 -> r866@36 -> r903@38
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=993, edges=2143, winReachable=170, winning=13, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=12, mergingWinSccs=30
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=9570, dist=0, out=103, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 9570 | 103 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=121768, regions=3370, solution commitments=8
- Opening: commitments=6, viable=4, dead=2, optimal=2
- Win-continuation prefix: viable prefix=0/8, optimal prefix=0/8, forced viable commitments=0/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 8 | 4 | 2 | 2 | multiple optimal choices |
| 14 | r1 | r54 | 7 | 5 | 1 | 1 | forced optimal |
| 15 | r54 | r84 | 6 | 5 | 1 | 1 | forced optimal |
| 20 | r84 | r279 | 5 | 3 | 0 | 1 | forced optimal |
| 26 | r279 | r587 | 4 | 4 | 0 | 1 | forced optimal |
| 34 | r587 | r844 | 3 | 6 | 0 | 1 | forced optimal |
| 35 | r844 | r866 | 2 | 7 | 1 | 2 | multiple optimal choices |
| 37 | r866 | r903 | 1 | 5 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 8 | 42 | 6 | 4 | 2 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 7 | 42 | 6 | 5 | 1 | 1 | 1 | r54 | no | no | yes |
| r54 | 15 | 6 | 42 | 6 | 5 | 1 | 1 | 1 | r84 | no | no | yes |
| r84 | 16 | 5 | 42 | 3 | 3 | 0 | 1 | 1 | r279 | no | no | yes |
| r279 | 21 | 4 | 42 | 4 | 4 | 0 | 1 | 1 | r587 | no | no | yes |
| r587 | 27 | 3 | 42 | 6 | 6 | 0 | 1 | 1 | r844 | no | no | yes |
| r844 | 35 | 2 | 42 | 8 | 7 | 1 | 2 | 2 | r866 | no | no | no |
| r866 | 36 | 1 | 42 | 6 | 5 | 1 | 1 | 1 | r903 | no | no | yes |
| r903 | 38 | 0 | 42 | 6 | 4 | 2 | 0 | 0 | win/end | no | no | no |

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
| 14 | down | r1 | no | 7 | 6 | 5 | 1 | 1 | 1 | r54 | yes | yes | yes | yes | no | yes | walk |
| 15 | left | r54 | yes | 6 | 6 | 5 | 1 | 1 | 1 | r84 | yes | yes | yes | yes | no | yes | push_object:sticky#2, move_sticky_rigid |
| 16 | left | r84 | yes | 5 | 3 | 3 | 0 | 1 | 1 | r84 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 17 | up | r84 | no | 5 | 3 | 3 | 0 | 1 | 1 | r84 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r84 | no | 5 | 3 | 3 | 0 | 1 | 1 | r84 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r84 | no | 5 | 3 | 3 | 0 | 1 | 1 | r84 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r84 | no | 5 | 3 | 3 | 0 | 1 | 1 | r279 | yes | yes | yes | yes | no | yes | walk |
| 21 | right | r279 | yes | 4 | 4 | 4 | 0 | 1 | 1 | r279 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 22 | up | r279 | no | 4 | 4 | 4 | 0 | 1 | 1 | r279 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r279 | no | 4 | 4 | 4 | 0 | 1 | 1 | r279 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r279 | no | 4 | 4 | 4 | 0 | 1 | 1 | r279 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r279 | no | 4 | 4 | 4 | 0 | 1 | 1 | r279 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r279 | no | 4 | 4 | 4 | 0 | 1 | 1 | r587 | yes | yes | yes | yes | no | yes | walk |
| 27 | down | r587 | yes | 3 | 6 | 6 | 0 | 1 | 1 | r587 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 28 | up | r587 | no | 3 | 6 | 6 | 0 | 1 | 1 | r587 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r587 | no | 3 | 6 | 6 | 0 | 1 | 1 | r587 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r587 | no | 3 | 6 | 6 | 0 | 1 | 1 | r587 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | down | r587 | no | 3 | 6 | 6 | 0 | 1 | 1 | r587 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | down | r587 | no | 3 | 6 | 6 | 0 | 1 | 1 | r587 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r587 | no | 3 | 6 | 6 | 0 | 1 | 1 | r587 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | down | r587 | no | 3 | 6 | 6 | 0 | 1 | 1 | r844 | yes | yes | yes | yes | no | yes | walk |
| 35 | right | r844 | yes | 2 | 8 | 7 | 1 | 2 | 2 | r866 | yes | yes | yes | yes | no | no | push_object:sticky#1, move_sticky_rigid |
| 36 | right | r866 | yes | 1 | 6 | 5 | 1 | 1 | 1 | r866 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 37 | up | r866 | no | 1 | 6 | 5 | 1 | 1 | 1 | r903 | yes | yes | yes | yes | no | yes | walk |
| 38 | left | r903 | yes | 0 | 6 | 4 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

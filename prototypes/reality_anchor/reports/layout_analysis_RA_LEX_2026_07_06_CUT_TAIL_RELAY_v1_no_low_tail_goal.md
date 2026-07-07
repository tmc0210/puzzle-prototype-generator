# Level Analysis: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_low_tail_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_low_tail_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#.......#
#B#C...G#
#S#..G.##
##.M...##
##.M...##
#..@...##
#########
```

## Shortest Solution

- Found: yes
- Cost: 13
- Depth: 13
- Explored states: 1204
- Inputs: up left up right right down right up left up up right right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#2 push_object:crate#2
- Event counts: push_object:sticky#1=4, move_sticky_rigid=4, walk=7, sticky_to_box:n1=1, push_object:crate#2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#.......#
#B#C...G#
#S#..G.##
##.M...##
##.M...##
#..@...##
#########
```

After:

```text
#########
#.......#
#B#C...G#
#S#M.G.##
##.M...##
##.@...##
#......##
#########
```

### Step 4: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#.......#
#B#C...G#
#S#M.G.##
##@M...##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C...G#
#S#.MG.##
##.@M..##
##.....##
#......##
#########
```

### Step 5: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#.......#
#B#C...G#
#S#.MG.##
##.@M..##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C...G#
#S#..m.##
##..@M.##
##.....##
#......##
#########
```

### Step 8: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
#########
#.......#
#B#C...G#
#S#..m.##
##...M.##
##...@.##
#......##
#########
```

After:

```text
#########
#.......#
#B#C.C.G#
#S#..m.##
##...@.##
##.....##
#......##
#########
```

### Step 12: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
#.......#
#B#C@C.G#
#S#..m.##
##.....##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C.@CG#
#S#..m.##
##.....##
##.....##
#......##
#########
```

### Step 13: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
#.......#
#B#C.@CG#
#S#..m.##
##.....##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C..@*#
#S#..m.##
##.....##
##.....##
#......##
#########
```


## Graph Facts

- Status: complete
- Reachable states: 141651
- Legal transitions: 426226
- Event-only illegal transitions: 0
- Winning states: 865
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 141651
- Legal transitions: 426226
- Budget: maxStates=500000
- Compressed regions: 4961
- Bidirectional transitions: 396626
- Commitment transitions: 29600
- Winning regions: 30
- Initial region: r0, states=29, dist=6, internalBidirectional=78, commitments=6, viableCommitments=5, deadCommitments=1, progressCommitments=3, optimalCommitments=3
- Solution region path: r0@0 -> r1@1 -> r5@4 -> r7@5 -> r22@8 -> r83@12 -> r118@13
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=610, edges=2268, winReachable=42, winning=14, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=13, mergingWinSccs=33
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=36490, dist=1, out=128, winOut=23, deadOut=105
- SCC path: s0@0 -> s7@13

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 36490 | 128 | 23 | 105 | 0 | 0 | s7 | no |
| s7 | 13 | 0 | 1914 | 15 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 13 | s7 | 36490 | no | no | right | push_object:crate#2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=141651, regions=4961, solution commitments=6
- Opening: commitments=6, viable=5, dead=1, optimal=3
- Win-continuation prefix: viable prefix=0/6, optimal prefix=0/6, forced viable commitments=0/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 5 | 1 | 3 | multiple optimal choices |
| 3 | r1 | r5 | 5 | 3 | 0 | 1 | forced optimal |
| 4 | r5 | r7 | 4 | 6 | 0 | 1 | forced optimal |
| 7 | r7 | r22 | 3 | 6 | 0 | 1 | forced optimal |
| 11 | r22 | r83 | 2 | 8 | 0 | 1 | forced optimal |
| 12 | r83 | r118 | 1 | 10 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 29 | 6 | 5 | 1 | 3 | 3 | r1 | no | no | no |
| r1 | 1 | 5 | 29 | 3 | 3 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 4 | 4 | 29 | 6 | 6 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 5 | 3 | 29 | 6 | 6 | 0 | 1 | 1 | r22 | no | no | yes |
| r22 | 8 | 2 | 29 | 8 | 8 | 0 | 1 | 1 | r83 | no | no | yes |
| r83 | 12 | 1 | 29 | 10 | 10 | 0 | 1 | 1 | r118 | no | no | yes |
| r118 | 13 | 0 | 29 | 6 | 6 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 6 | 5 | 1 | 3 | 3 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | up | r1 | yes | 5 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 2 | left | r1 | no | 5 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r1 | no | 5 | 3 | 3 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | walk |
| 4 | right | r5 | yes | 4 | 6 | 6 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 5 | right | r7 | yes | 3 | 6 | 6 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 6 | down | r7 | no | 3 | 6 | 6 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r7 | no | 3 | 6 | 6 | 0 | 1 | 1 | r22 | yes | yes | yes | yes | no | yes | walk |
| 8 | up | r22 | yes | 2 | 8 | 8 | 0 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 9 | left | r22 | no | 2 | 8 | 8 | 0 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r22 | no | 2 | 8 | 8 | 0 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r22 | no | 2 | 8 | 8 | 0 | 1 | 1 | r83 | yes | yes | yes | yes | no | yes | walk |
| 12 | right | r83 | yes | 1 | 10 | 10 | 0 | 1 | 1 | r118 | yes | yes | yes | yes | no | yes | push_object:crate#2 |
| 13 | right | r118 | yes | 0 | 6 | 6 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |

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

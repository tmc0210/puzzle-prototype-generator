# Level Analysis: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_mid_tail_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_mid_tail_goal
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
#S#....##
##.M.G.##
##.M...##
#..@...##
#########
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 2292
- Inputs: up left up right right down right up left up up right down up right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#2 push_object:sticky#1 move_sticky_rigid walk push_object:crate#2
- Event counts: push_object:sticky#1=5, move_sticky_rigid=5, walk=8, sticky_to_box:n1=1, push_object:crate#2=2

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
#S#....##
##.M.G.##
##.M...##
#..@...##
#########
```

After:

```text
#########
#.......#
#B#C...G#
#S#M...##
##.M.G.##
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
#S#M...##
##@M.G.##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C...G#
#S#.M..##
##.@MG.##
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
#S#.M..##
##.@MG.##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C...G#
#S#..M.##
##..@m.##
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
#S#..M.##
##...m.##
##...@.##
#......##
#########
```

After:

```text
#########
#.......#
#B#C.C.G#
#S#..M.##
##...+.##
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
#S#..M.##
##...G.##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C.@CG#
#S#..M.##
##...G.##
##.....##
#......##
#########
```

### Step 13: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#.......#
#B#C.@CG#
#S#..M.##
##...G.##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C..CG#
#S#..@.##
##...m.##
##.....##
#......##
#########
```

### Step 15: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
#.......#
#B#C.@CG#
#S#....##
##...m.##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C..@*#
#S#....##
##...m.##
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
- Initial region: r0, states=29, dist=6, internalBidirectional=78, commitments=6, viableCommitments=5, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r5@4 -> r7@5 -> r22@8 -> r83@12 -> r117@13 -> r223@15
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=610, edges=2268, winReachable=42, winning=14, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=13, mergingWinSccs=33
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=36490, dist=1, out=128, winOut=23, deadOut=105
- SCC path: s0@0 -> s7@15

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 36490 | 128 | 23 | 105 | 0 | 0 | s7 | no |
| s7 | 15 | 0 | 1914 | 15 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 15 | s7 | 36490 | no | no | right | push_object:crate#2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=141651, regions=4961, solution commitments=7
- Opening: commitments=6, viable=5, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/7, optimal prefix=0/7, forced viable commitments=0/7
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 5 | 1 | 1 | multiple viable choices |
| 3 | r1 | r5 | 6 | 3 | 0 | 2 | multiple optimal choices |
| 4 | r5 | r7 | 5 | 6 | 0 | 1 | forced optimal |
| 7 | r7 | r22 | 4 | 6 | 0 | 1 | forced optimal |
| 11 | r22 | r83 | 3 | 8 | 0 | 1 | forced optimal |
| 12 | r83 | r117 | 2 | 10 | 0 | 2 | multiple optimal choices |
| 14 | r117 | r223 | 1 | 10 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 29 | 6 | 5 | 1 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 6 | 29 | 3 | 3 | 0 | 2 | 2 | r5 | no | no | no |
| r5 | 4 | 5 | 29 | 6 | 6 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 5 | 4 | 29 | 6 | 6 | 0 | 1 | 1 | r22 | no | no | yes |
| r22 | 8 | 3 | 29 | 8 | 8 | 0 | 1 | 1 | r83 | no | no | yes |
| r83 | 12 | 2 | 29 | 10 | 10 | 0 | 2 | 2 | r117 | no | no | no |
| r117 | 13 | 1 | 29 | 10 | 10 | 0 | 1 | 1 | r223 | no | no | yes |
| r223 | 15 | 0 | 29 | 6 | 6 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 6 | 5 | 1 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | up | r1 | yes | 6 | 3 | 3 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 2 | left | r1 | no | 6 | 3 | 3 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r1 | no | 6 | 3 | 3 | 0 | 2 | 2 | r5 | yes | yes | yes | yes | no | no | walk |
| 4 | right | r5 | yes | 5 | 6 | 6 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 5 | right | r7 | yes | 4 | 6 | 6 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 6 | down | r7 | no | 4 | 6 | 6 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r7 | no | 4 | 6 | 6 | 0 | 1 | 1 | r22 | yes | yes | yes | yes | no | yes | walk |
| 8 | up | r22 | yes | 3 | 8 | 8 | 0 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 9 | left | r22 | no | 3 | 8 | 8 | 0 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r22 | no | 3 | 8 | 8 | 0 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r22 | no | 3 | 8 | 8 | 0 | 1 | 1 | r83 | yes | yes | yes | yes | no | yes | walk |
| 12 | right | r83 | yes | 2 | 10 | 10 | 0 | 2 | 2 | r117 | yes | yes | yes | yes | no | no | push_object:crate#2 |
| 13 | down | r117 | yes | 1 | 10 | 10 | 0 | 1 | 1 | r117 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 14 | up | r117 | no | 1 | 10 | 10 | 0 | 1 | 1 | r223 | yes | yes | yes | yes | no | yes | walk |
| 15 | right | r223 | yes | 0 | 6 | 6 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |

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

# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v2

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
###########
###.@######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```

## Shortest Solution

- Found: yes
- Cost: 27
- Depth: 27
- Explored states: 4576
- Inputs: down left down right down right right right right down left left up up left down left left up up up right down left down right right
- Events: push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:crate#1=3, walk=19, push_object:crate#3=1, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, box_to_sticky:n1=2, box_to_sticky:n2=1, sticky_merge:n1=2, push_object:sticky#1=2, move_sticky_rigid=2, sticky_to_box:n2=1, force_chain:n2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
###########
###########
###.@######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```

After:

```text
###########
###########
###..######
###.@CC####
###.C.G####
#...G....##
#.....BS.##
###########
```

### Step 4: right

- Legal: true
- Events: push_object:crate#3

Before:

```text
###########
###########
###..######
###..CC####
###@C.G####
#...G....##
#.....BS.##
###########
```

After:

```text
###########
###########
###..######
###..CC####
###.@CG####
#...G....##
#.....BS.##
###########
```

### Step 11: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1

Before:

```text
###########
###########
###..######
###..CC####
###..CG####
#...G....##
#.....BS@##
###########
```

After:

```text
###########
###########
###..######
###..CM####
###..CG####
#...G....##
#....BS@.##
###########
```

### Step 12: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1

Before:

```text
###########
###########
###..######
###..CM####
###..CG####
#...G....##
#....BS@.##
###########
```

After:

```text
###########
###########
###..######
###..MM####
###..MG####
#...G....##
#...BS@..##
###########
```

### Step 15: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n2

Before:

```text
###########
###########
###..######
###..MM####
###..M+####
#...G....##
#...BS...##
###########
```

After:

```text
###########
###########
###..######
###.CM.####
###.C@G####
#...G....##
#...BS...##
###########
```

### Step 23: down

- Legal: true
- Events: push_object:crate#1, force_chain:n2

Before:

```text
###########
###########
###.@######
###.CM.####
###.C.G####
#...G....##
#...BS...##
###########
```

After:

```text
###########
###########
###..######
###.@M.####
###.C.G####
#...*....##
#...BS...##
###########
```

### Step 26: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
###########
###..######
###..M.####
###@C.G####
#...*....##
#...BS...##
###########
```

After:

```text
###########
###########
###..######
###..M.####
###.@MG####
#...*....##
#...BS...##
###########
```

### Step 27: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
###########
###..######
###..M.####
###.@MG####
#...*....##
#...BS...##
###########
```

After:

```text
###########
###########
###..######
###...M####
###..@m####
#...*....##
#...BS...##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 284706
- Legal transitions: 799815
- Event-only illegal transitions: 0
- Winning states: 3129
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 284706
- Legal transitions: 799815
- Budget: maxStates=400000
- Compressed regions: 14671
- Bidirectional transitions: 723312
- Commitment transitions: 76503
- Winning regions: 161
- Initial region: r0, states=21, dist=6, internalBidirectional=54, commitments=4, viableCommitments=2, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@4 -> r46@11 -> r56@12 -> r89@15 -> r202@23 -> r285@26 -> r326@27
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=2922, edges=11990, winReachable=180, winning=51, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=73, mergingWinSccs=147
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=35502, dist=0, out=475, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 35502 | 475 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=284706, regions=14671, solution commitments=8
- Opening: commitments=4, viable=2, dead=2, optimal=1
- Win-continuation prefix: viable prefix=0/8, optimal prefix=0/8, forced viable commitments=0/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 2 | 2 | 1 | multiple viable choices |
| 3 | r1 | r4 | 7 | 5 | 1 | 3 | multiple optimal choices |
| 10 | r4 | r46 | 6 | 2 | 2 | 1 | forced optimal |
| 11 | r46 | r56 | 5 | 3 | 1 | 1 | forced optimal |
| 14 | r56 | r89 | 4 | 3 | 0 | 1 | forced optimal |
| 22 | r89 | r202 | 3 | 6 | 2 | 1 | forced optimal |
| 25 | r202 | r285 | 2 | 4 | 0 | 1 | forced optimal |
| 26 | r285 | r326 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 21 | 4 | 2 | 2 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 7 | 21 | 6 | 5 | 1 | 3 | 3 | r4 | no | no | no |
| r4 | 4 | 6 | 21 | 4 | 2 | 2 | 1 | 1 | r46 | no | no | yes |
| r46 | 11 | 5 | 21 | 4 | 3 | 1 | 1 | 1 | r56 | no | no | yes |
| r56 | 12 | 4 | 21 | 3 | 3 | 0 | 1 | 1 | r89 | no | no | yes |
| r89 | 15 | 3 | 21 | 8 | 6 | 2 | 1 | 1 | r202 | no | no | yes |
| r202 | 23 | 2 | 11 | 4 | 4 | 0 | 1 | 1 | r285 | no | no | yes |
| r285 | 26 | 1 | 12 | 3 | 3 | 0 | 1 | 1 | r326 | no | no | yes |
| r326 | 27 | 0 | 21 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 4 | 2 | 2 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | down | r1 | yes | 7 | 6 | 5 | 1 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 2 | left | r1 | no | 7 | 6 | 5 | 1 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 7 | 6 | 5 | 1 | 3 | 3 | r4 | yes | yes | yes | yes | no | no | walk |
| 4 | right | r4 | yes | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#3 |
| 5 | down | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r4 | no | 6 | 4 | 2 | 2 | 1 | 1 | r46 | yes | yes | yes | yes | no | yes | walk |
| 11 | left | r46 | yes | 5 | 4 | 3 | 1 | 1 | 1 | r56 | yes | yes | yes | yes | no | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 12 | left | r56 | yes | 4 | 3 | 3 | 0 | 1 | 1 | r56 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1 |
| 13 | up | r56 | no | 4 | 3 | 3 | 0 | 1 | 1 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r56 | no | 4 | 3 | 3 | 0 | 1 | 1 | r89 | yes | yes | yes | yes | no | yes | walk |
| 15 | left | r89 | yes | 3 | 8 | 6 | 2 | 1 | 1 | r89 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n2 |
| 16 | down | r89 | no | 3 | 8 | 6 | 2 | 1 | 1 | r89 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r89 | no | 3 | 8 | 6 | 2 | 1 | 1 | r89 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r89 | no | 3 | 8 | 6 | 2 | 1 | 1 | r89 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r89 | no | 3 | 8 | 6 | 2 | 1 | 1 | r89 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r89 | no | 3 | 8 | 6 | 2 | 1 | 1 | r89 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r89 | no | 3 | 8 | 6 | 2 | 1 | 1 | r89 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r89 | no | 3 | 8 | 6 | 2 | 1 | 1 | r202 | yes | yes | yes | yes | no | yes | walk |
| 23 | down | r202 | yes | 2 | 4 | 4 | 0 | 1 | 1 | r202 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2 |
| 24 | left | r202 | no | 2 | 4 | 4 | 0 | 1 | 1 | r202 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r202 | no | 2 | 4 | 4 | 0 | 1 | 1 | r285 | yes | yes | yes | yes | no | yes | walk |
| 26 | right | r285 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r326 | yes | yes | yes | yes | no | yes | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 27 | right | r326 | yes | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

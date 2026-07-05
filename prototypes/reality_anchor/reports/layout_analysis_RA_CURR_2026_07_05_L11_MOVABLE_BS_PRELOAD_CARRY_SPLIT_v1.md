# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v1

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
###########
###@.######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```

## Shortest Solution

- Found: yes
- Cost: 28
- Depth: 28
- Explored states: 4666
- Inputs: right down left down right down right right right right down left left up up left down left left up up up right down left down right right
- Events: walk push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: walk=20, push_object:crate#1=3, push_object:crate#3=1, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, box_to_sticky:n1=2, box_to_sticky:n2=1, sticky_merge:n1=2, push_object:sticky#1=2, move_sticky_rigid=2, sticky_to_box:n2=1, force_chain:n2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: down

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

### Step 5: right

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

### Step 12: left

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

### Step 13: left

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

### Step 16: left

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

### Step 24: down

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

### Step 27: right

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

### Step 28: right

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
- Solution region path: r0@0 -> r1@2 -> r5@5 -> r50@12 -> r61@13 -> r93@16 -> r204@24 -> r290@27 -> r333@28
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
| 1 | r0 | r1 | 6 | 2 | 2 | 1 | multiple viable choices |
| 4 | r1 | r5 | 7 | 5 | 1 | 3 | multiple optimal choices |
| 11 | r5 | r50 | 6 | 2 | 2 | 1 | forced optimal |
| 12 | r50 | r61 | 5 | 3 | 1 | 1 | forced optimal |
| 15 | r61 | r93 | 4 | 3 | 0 | 1 | forced optimal |
| 23 | r93 | r204 | 3 | 6 | 2 | 1 | forced optimal |
| 26 | r204 | r290 | 2 | 4 | 0 | 1 | forced optimal |
| 27 | r290 | r333 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 21 | 4 | 2 | 2 | 1 | 1 | r1 | no | no | no |
| r1 | 2 | 7 | 21 | 6 | 5 | 1 | 3 | 3 | r5 | no | no | no |
| r5 | 5 | 6 | 21 | 4 | 2 | 2 | 1 | 1 | r50 | no | no | yes |
| r50 | 12 | 5 | 21 | 4 | 3 | 1 | 1 | 1 | r61 | no | no | yes |
| r61 | 13 | 4 | 21 | 3 | 3 | 0 | 1 | 1 | r93 | no | no | yes |
| r93 | 16 | 3 | 21 | 8 | 6 | 2 | 1 | 1 | r204 | no | no | yes |
| r204 | 24 | 2 | 11 | 4 | 4 | 0 | 1 | 1 | r290 | no | no | yes |
| r290 | 27 | 1 | 12 | 3 | 3 | 0 | 1 | 1 | r333 | no | no | yes |
| r333 | 28 | 0 | 21 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 6 | 4 | 2 | 2 | 1 | 1 | r1 | yes | yes | no | no | no | no | walk |
| 2 | down | r1 | yes | 7 | 6 | 5 | 1 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 3 | left | r1 | no | 7 | 6 | 5 | 1 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 7 | 6 | 5 | 1 | 3 | 3 | r5 | yes | yes | yes | yes | no | no | walk |
| 5 | right | r5 | yes | 6 | 4 | 2 | 2 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#3 |
| 6 | down | r5 | no | 6 | 4 | 2 | 2 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r5 | no | 6 | 4 | 2 | 2 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r5 | no | 6 | 4 | 2 | 2 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r5 | no | 6 | 4 | 2 | 2 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r5 | no | 6 | 4 | 2 | 2 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r5 | no | 6 | 4 | 2 | 2 | 1 | 1 | r50 | yes | yes | yes | yes | no | yes | walk |
| 12 | left | r50 | yes | 5 | 4 | 3 | 1 | 1 | 1 | r61 | yes | yes | yes | yes | no | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 13 | left | r61 | yes | 4 | 3 | 3 | 0 | 1 | 1 | r61 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1 |
| 14 | up | r61 | no | 4 | 3 | 3 | 0 | 1 | 1 | r61 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r61 | no | 4 | 3 | 3 | 0 | 1 | 1 | r93 | yes | yes | yes | yes | no | yes | walk |
| 16 | left | r93 | yes | 3 | 8 | 6 | 2 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n2 |
| 17 | down | r93 | no | 3 | 8 | 6 | 2 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r93 | no | 3 | 8 | 6 | 2 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r93 | no | 3 | 8 | 6 | 2 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r93 | no | 3 | 8 | 6 | 2 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r93 | no | 3 | 8 | 6 | 2 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r93 | no | 3 | 8 | 6 | 2 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r93 | no | 3 | 8 | 6 | 2 | 1 | 1 | r204 | yes | yes | yes | yes | no | yes | walk |
| 24 | down | r204 | yes | 2 | 4 | 4 | 0 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2 |
| 25 | left | r204 | no | 2 | 4 | 4 | 0 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r204 | no | 2 | 4 | 4 | 0 | 1 | 1 | r290 | yes | yes | yes | yes | no | yes | walk |
| 27 | right | r290 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r333 | yes | yes | yes | yes | no | yes | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 28 | right | r333 | yes | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

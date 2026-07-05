# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1

## Summary

- Prototype: reality_anchor
- Title: Movable B/S relay-cut v1
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#G.C.#..#
##@BS..M#
#.G.M..M#
#########
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 174
- Inputs: down right right right up left up left left down
- Events: walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- Event counts: walk=4, push_object:sticky#1=3, move_sticky_rigid=3, sticky_merge:n1=1, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, box_to_sticky:n1=1, sticky_to_box:n1=1, push_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#G.C.#..#
##.BS..M#
#.G@M..M#
#########
```

After:

```text
#########
#G.C.#..#
##.BS..M#
#.G.@M.M#
#########
```

### Step 4: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
#G.C.#..#
##.BS..M#
#.G.@M.M#
#########
```

After:

```text
#########
#G.C.#..#
##.BS..M#
#.G..@MM#
#########
```

### Step 6: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1

Before:

```text
#########
#G.C.#..#
##.BS@.M#
#.G...MM#
#########
```

After:

```text
#########
#G.M.#..#
##BS@..M#
#.G...MM#
#########
```

### Step 8: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
#########
#G.M@#..#
##BS...M#
#.G...MM#
#########
```

After:

```text
#########
#GC@.#..#
##BS...M#
#.G...MM#
#########
```

### Step 9: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#GC@.#..#
##BS...M#
#.G...MM#
#########
```

After:

```text
#########
#*@..#..#
##BS...M#
#.G...MM#
#########
```

### Step 10: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#*@..#..#
##BS...M#
#.G...MM#
#########
```

After:

```text
#########
#*...#..#
##@....M#
#.BS..MM#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 429
- Legal transitions: 996
- Event-only illegal transitions: 0
- Winning states: 25
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 429
- Legal transitions: 996
- Budget: maxStates=300000
- Compressed regions: 41
- Bidirectional transitions: 930
- Commitment transitions: 66
- Winning regions: 2
- Initial region: r0, states=6, dist=6, internalBidirectional=10, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r4@3 -> r6@4 -> r13@6 -> r20@8 -> r25@9 -> r29@10
- Forced commitment prefix length: 0
- Forced viable prefix length: 4
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=41, edges=63, winReachable=10, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=4/6, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=3/6, trivial=0, sameEntryExit=3, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=6, dist=6, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s5@3 -> s6@4 -> s7@6 -> s8@8 -> s9@9 -> s13@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 6 | 3 | 1 | 2 | 0 | 0 | s5 | yes |
| s5 | 3 | 5 | 7 | 3 | 1 | 2 | 1 | 1 | s6 | yes |
| s6 | 4 | 4 | 12 | 3 | 1 | 2 | 1 | 1 | s7 | yes |
| s7 | 6 | 3 | 11 | 1 | 1 | 0 | 1 | 1 | s8 | yes |
| s8 | 8 | 2 | 12 | 2 | 2 | 0 | 1 | 1 | s9 | no |
| s9 | 9 | 1 | 13 | 2 | 1 | 1 | 1 | 1 | s13 | yes |
| s13 | 10 | 0 | 12 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s5 | 6 | no | yes | right | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s5 | 3 | 4 | s6 | 7 | yes | yes | right | push_object:sticky#1, move_sticky_rigid, sticky_merge:n1 | scripted_same_state_handoff |
| s6 | 4 | 6 | s7 | 12 | no | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 | has_reposition_room |
| s7 | 6 | 8 | s8 | 11 | no | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | has_reposition_room |
| s8 | 8 | 9 | s9 | 12 | yes | no | left | push_object:crate#1 | scripted_same_state_handoff |
| s9 | 9 | 10 | s13 | 13 | yes | yes | down | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=429, regions=41, solution commitments=6
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=4/6, optimal prefix=4/6, forced viable commitments=5/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 4 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r4 | 6 | 1 | 2 | 1 | forced optimal |
| 3 | r4 | r6 | 5 | 1 | 2 | 1 | forced optimal |
| 5 | r6 | r13 | 4 | 1 | 2 | 1 | forced optimal |
| 7 | r13 | r20 | 3 | 1 | 0 | 1 | forced optimal |
| 8 | r20 | r25 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 9 | r25 | r29 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 6 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 3 | 5 | 7 | 3 | 1 | 2 | 1 | 1 | r6 | no | yes | yes |
| r6 | 4 | 4 | 12 | 3 | 1 | 2 | 1 | 1 | r13 | no | yes | yes |
| r13 | 6 | 3 | 11 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes |
| r20 | 8 | 2 | 12 | 2 | 2 | 0 | 2 | 2 | r25 | no | no | no |
| r25 | 9 | 1 | 13 | 2 | 1 | 1 | 1 | 1 | r29 | no | yes | yes |
| r29 | 10 | 0 | 12 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 6 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 6 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 3 | right | r4 | yes | 5 | 3 | 1 | 2 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | push_object:sticky#1, move_sticky_rigid |
| 4 | right | r6 | yes | 4 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |
| 5 | up | r6 | no | 4 | 3 | 1 | 2 | 1 | 1 | r13 | yes | yes | yes | yes | yes | yes | walk |
| 6 | left | r13 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 7 | up | r13 | no | 3 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | walk |
| 8 | left | r20 | yes | 2 | 2 | 2 | 0 | 2 | 2 | r25 | yes | yes | yes | yes | no | no | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 9 | left | r25 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r29 | yes | yes | yes | yes | yes | yes | push_object:crate#1 |
| 10 | down | r29 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |

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

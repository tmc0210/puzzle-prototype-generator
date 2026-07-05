# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: L11 relay no top goal
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#..C.#..#
##@BS..M#
#.G.M..M#
#########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 137
- Inputs: down right right right up left up left down
- Events: walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- Event counts: walk=4, push_object:sticky#1=3, move_sticky_rigid=3, sticky_merge:n1=1, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, box_to_sticky:n1=1, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#..C.#..#
##.BS..M#
#.G@M..M#
#########
```

After:

```text
#########
#..C.#..#
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
#..C.#..#
##.BS..M#
#.G.@M.M#
#########
```

After:

```text
#########
#..C.#..#
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
#..C.#..#
##.BS@.M#
#.G...MM#
#########
```

After:

```text
#########
#..M.#..#
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
#..M@#..#
##BS...M#
#.G...MM#
#########
```

After:

```text
#########
#.C@.#..#
##BS...M#
#.G...MM#
#########
```

### Step 9: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#.C@.#..#
##BS...M#
#.G...MM#
#########
```

After:

```text
#########
#.C..#..#
##.@...M#
#.BS..MM#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 429
- Legal transitions: 996
- Event-only illegal transitions: 0
- Winning states: 98
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
- Winning regions: 8
- Initial region: r0, states=6, dist=4, internalBidirectional=10, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r4@3 -> r6@4 -> r13@6 -> r20@8 -> r24@9
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=41, edges=63, winReachable=19, winning=8, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=5, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=2/5, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=6, dist=4, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s5@3 -> s6@4 -> s7@6 -> s8@8 -> s11@9

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 6 | 3 | 2 | 1 | 0 | 0 | s5 | no |
| s5 | 3 | 3 | 7 | 3 | 2 | 1 | 1 | 1 | s6 | no |
| s6 | 4 | 3 | 12 | 3 | 2 | 1 | 1 | 1 | s7 | no |
| s7 | 6 | 2 | 11 | 1 | 1 | 0 | 1 | 1 | s8 | yes |
| s8 | 8 | 1 | 12 | 2 | 2 | 0 | 1 | 1 | s11 | no |
| s11 | 9 | 0 | 11 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s5 | 6 | no | no | right | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s5 | 3 | 4 | s6 | 7 | yes | no | right | push_object:sticky#1, move_sticky_rigid, sticky_merge:n1 | scripted_same_state_handoff |
| s6 | 4 | 6 | s7 | 12 | no | no | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 | has_reposition_room |
| s7 | 6 | 8 | s8 | 11 | no | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | has_reposition_room |
| s8 | 8 | 9 | s11 | 12 | yes | no | down | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=429, regions=41, solution commitments=5
- Opening: commitments=3, viable=2, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r4 | 4 | 2 | 1 | 2 | multiple optimal choices |
| 3 | r4 | r6 | 3 | 2 | 1 | 1 | multiple viable choices |
| 5 | r6 | r13 | 3 | 2 | 1 | 2 | multiple optimal choices |
| 7 | r13 | r20 | 2 | 1 | 0 | 1 | forced optimal |
| 8 | r20 | r24 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 6 | 3 | 2 | 1 | 2 | 2 | r4 | no | no | no |
| r4 | 3 | 3 | 7 | 3 | 2 | 1 | 1 | 1 | r6 | no | no | no |
| r6 | 4 | 3 | 12 | 3 | 2 | 1 | 2 | 2 | r13 | no | no | no |
| r13 | 6 | 2 | 11 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes |
| r20 | 8 | 1 | 12 | 2 | 2 | 0 | 1 | 1 | r24 | no | no | yes |
| r24 | 9 | 0 | 11 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 3 | 2 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 4 | 3 | 2 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 3 | 2 | 1 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 3 | right | r4 | yes | 3 | 3 | 2 | 1 | 1 | 1 | r6 | yes | yes | no | no | no | no | push_object:sticky#1, move_sticky_rigid |
| 4 | right | r6 | yes | 3 | 3 | 2 | 1 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |
| 5 | up | r6 | no | 3 | 3 | 2 | 1 | 2 | 2 | r13 | yes | yes | yes | yes | no | no | walk |
| 6 | left | r13 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 7 | up | r13 | no | 2 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | walk |
| 8 | left | r20 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r24 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 9 | down | r24 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |

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

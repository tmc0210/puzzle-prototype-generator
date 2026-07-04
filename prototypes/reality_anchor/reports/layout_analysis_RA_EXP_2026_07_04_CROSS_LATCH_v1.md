# Level Analysis: RA_EXP_2026_07_04_CROSS_LATCH_v1

## Summary

- Prototype: reality_anchor
- Title: Cross latch v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#.MSB@P.#
#MGMC.L.#
#..G#..C#
#########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 136
- Inputs: right left down right up left down left right right up left left down left left down
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 walk walk push_object:crate#1 walk pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk pull_object:crate#1 pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
- Event counts: push_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=1, walk=8, pull_object:crate#1=4, push_object:crate#1=1, pull_object:sticky#3=1, move_sticky_rigid=2, sticky_to_box:n1=1, push_object:box_sticky_anchor=1, force_chain:n2=2, anchor_boundary_shift:box_sticky=2, sticky_merge:n1=1, pull_object:box_sticky_anchor=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#.MSB@P.#
#MGMC.L.#
#..G#..C#
#########
```

After:

```text
#########
#.MSB.@P#
#MGMC..L#
#..G#..C#
#########
```

### Step 4: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#.MSB..P#
#MGMC@.L#
#..G#..C#
#########
```

After:

```text
#########
#.MSB..P#
#MGM.C@L#
#..G#..C#
#########
```

### Step 7: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#.MSB@.P#
#MGM.C.L#
#..G#..C#
#########
```

After:

```text
#########
#.MSB..P#
#MGM.@.L#
#..G#C.C#
#########
```

### Step 9: right

- Legal: true
- Events: pull_object:sticky#3, move_sticky_rigid, sticky_to_box:n1

Before:

```text
#########
#.MSB..P#
#MGM@..L#
#..G#C.C#
#########
```

After:

```text
#########
#.MSB..P#
#MG.C@.L#
#..G#C.C#
#########
```

### Step 10: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#.MSB..P#
#MG.C@.L#
#..G#C.C#
#########
```

After:

```text
#########
#.MSB..P#
#MG..C@L#
#..G#C.C#
#########
```

### Step 13: left

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
#.MSB@.P#
#MG..C.L#
#..G#C.C#
#########
```

After:

```text
#########
#MSB@..P#
#MG..C.L#
#..G#C.C#
#########
```

### Step 15: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#MSB...P#
#MG.@C.L#
#..G#C.C#
#########
```

After:

```text
#########
#MSB...P#
#MG@C..L#
#..G#C.C#
#########
```

### Step 16: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#MSB...P#
#MG@C..L#
#..G#C.C#
#########
```

After:

```text
#########
#MSB...P#
#M+C...L#
#..G#C.C#
#########
```

### Step 17: down

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
#########
#MSB...P#
#M+C...L#
#..G#C.C#
#########
```

After:

```text
#########
#M.....P#
#MSB...L#
#.@*#C.C#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 141
- Legal transitions: 266
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 141
- Legal transitions: 266
- Budget: maxStates=300000
- Compressed regions: 41
- Bidirectional transitions: 200
- Commitment transitions: 64
- Winning regions: 1
- Initial region: r0, states=3, dist=9, internalBidirectional=4, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@1 -> r7@4 -> r17@8 -> r19@9 -> r24@10 -> r29@13 -> r33@15 -> r36@16 -> r38@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=29, edges=36, winReachable=13, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=8, forcedWinPrefix=0/8, branchingWinSccs=4, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=4/8, trivial=3, sameEntryExit=4, forcedScripted=3, maxRun=2
- Initial SCC: s0, states=9, dist=7, out=4, winOut=2, deadOut=2
- SCC path: s0@0 -> s1@4 -> s4@8 -> s5@9 -> s6@10 -> s13@13 -> s14@15 -> s15@16 -> s16@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 7 | 9 | 4 | 2 | 2 | 0 | 0 | s1 | no |
| s1 | 4 | 6 | 11 | 4 | 2 | 2 | 1 | 1 | s4 | no |
| s4 | 8 | 6 | 1 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 9 | 5 | 5 | 3 | 2 | 1 | 1 | 1 | s6 | no |
| s6 | 10 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | s13 | yes |
| s13 | 13 | 3 | 6 | 1 | 1 | 0 | 2 | 2 | s14 | yes |
| s14 | 15 | 2 | 1 | 2 | 1 | 1 | 1 | 1 | s15 | yes |
| s15 | 16 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s16 | yes |
| s16 | 17 | 0 | 1 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s1 | 9 | no | no | right | pull_object:crate#1 | has_reposition_room |
| s1 | 4 | 8 | s4 | 11 | no | no | left | walk | has_reposition_room |
| s4 | 8 | 9 | s5 | 1 | yes | yes | right | pull_object:sticky#3, move_sticky_rigid, sticky_to_box:n1 | scripted_trivial_scc |
| s5 | 9 | 10 | s6 | 5 | yes | no | right | pull_object:crate#1 | scripted_same_state_handoff |
| s6 | 10 | 13 | s13 | 4 | no | yes | left | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |
| s13 | 13 | 15 | s14 | 6 | no | yes | left | pull_object:crate#1 | has_reposition_room |
| s14 | 15 | 16 | s15 | 1 | yes | yes | left | pull_object:crate#1 | scripted_trivial_scc |
| s15 | 16 | 17 | s16 | 1 | yes | yes | down | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=141, regions=41, solution commitments=9
- Opening: commitments=3, viable=2, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/9, optimal prefix=0/9, forced viable commitments=5/9
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r2 | 9 | 2 | 1 | 2 | multiple optimal choices |
| 3 | r2 | r7 | 8 | 3 | 1 | 2 | multiple optimal choices |
| 7 | r7 | r17 | 7 | 3 | 1 | 3 | multiple optimal choices |
| 8 | r17 | r19 | 6 | 1 | 0 | 1 | forced optimal |
| 9 | r19 | r24 | 5 | 2 | 1 | 2 | multiple optimal choices |
| 12 | r24 | r29 | 4 | 1 | 0 | 1 | forced optimal |
| 14 | r29 | r33 | 3 | 1 | 0 | 1 | forced optimal |
| 15 | r33 | r36 | 2 | 1 | 1 | 1 | forced optimal |
| 16 | r36 | r38 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 9 | 3 | 3 | 2 | 1 | 2 | 2 | r2 | no | no | no |
| r2 | 1 | 8 | 6 | 4 | 3 | 1 | 2 | 2 | r7 | no | no | no |
| r7 | 4 | 7 | 5 | 4 | 3 | 1 | 3 | 3 | r17 | no | no | no |
| r17 | 8 | 6 | 1 | 1 | 1 | 0 | 1 | 1 | r19 | yes | yes | yes |
| r19 | 9 | 5 | 5 | 3 | 2 | 1 | 2 | 2 | r24 | no | no | no |
| r24 | 10 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | r29 | yes | yes | yes |
| r29 | 13 | 3 | 6 | 1 | 1 | 0 | 1 | 1 | r33 | yes | yes | yes |
| r33 | 15 | 2 | 1 | 2 | 1 | 1 | 1 | 1 | r36 | no | yes | yes |
| r36 | 16 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r38 | yes | yes | yes |
| r38 | 17 | 0 | 1 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 9 | 3 | 2 | 1 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | none |
| 1 | right | r2 | yes | 8 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | left | r2 | no | 8 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r2 | no | 8 | 4 | 3 | 1 | 2 | 2 | r7 | yes | yes | yes | yes | no | no | walk |
| 4 | right | r7 | yes | 7 | 4 | 3 | 1 | 3 | 3 | r7 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 5 | up | r7 | no | 7 | 4 | 3 | 1 | 3 | 3 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r7 | no | 7 | 4 | 3 | 1 | 3 | 3 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r7 | no | 7 | 4 | 3 | 1 | 3 | 3 | r17 | yes | yes | yes | yes | no | no | push_object:crate#1 |
| 8 | left | r17 | yes | 6 | 1 | 1 | 0 | 1 | 1 | r19 | yes | yes | yes | yes | yes | yes | walk |
| 9 | right | r19 | yes | 5 | 3 | 2 | 1 | 2 | 2 | r24 | yes | yes | yes | yes | no | no | pull_object:sticky#3, move_sticky_rigid, sticky_to_box:n1 |
| 10 | right | r24 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 11 | up | r24 | no | 4 | 1 | 1 | 0 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r24 | no | 4 | 1 | 1 | 0 | 1 | 1 | r29 | yes | yes | yes | yes | yes | yes | walk |
| 13 | left | r29 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid, sticky_merge:n1 |
| 14 | down | r29 | no | 3 | 1 | 1 | 0 | 1 | 1 | r33 | yes | yes | yes | yes | yes | yes | walk |
| 15 | left | r33 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r36 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 16 | left | r36 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r38 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 17 | down | r38 | yes | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky |

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

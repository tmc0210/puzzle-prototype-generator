# Level Analysis: RA_EXP_2026_07_04_CROSS_LATCH_v2

## Summary

- Prototype: reality_anchor
- Title: Cross latch v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#..P.BS@#
#..LG#..#
#...#C..#
#C..GC.##
#########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 231
- Inputs: left down down right up up left left left down left left right down left down right right right
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1
- Event counts: push_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=5, box_to_sticky:n2=1, sticky_merge:n1=1, walk=9, pull_object:sticky#1=1, move_sticky_rigid=1, force_chain:n2=3, anchor_boundary_shift:push_pull=4, pull_object:push_pull_anchor=2, pull_object:box_sticky_anchor=1, pull_object:crate#1=3, box_to_sticky:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1

Before:

```text
#########
#..P.BS@#
#..LG#..#
#...#C..#
#C..GC.##
#########
```

After:

```text
#########
#..PBS@.#
#..LG#..#
#...#M..#
#C..GM.##
#########
```

### Step 4: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#..PBS..#
#..LG#..#
#...#M@.#
#C..GM.##
#########
```

After:

```text
#########
#..PBS..#
#..LG#..#
#...#.M@#
#C..G.M##
#########
```

### Step 8: left

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky

Before:

```text
#########
#..PBS@.#
#..LG#..#
#...#.M.#
#C..G.M##
#########
```

After:

```text
#########
#.PBS@..#
#.L.G#..#
#...#.M.#
#C..G.M##
#########
```

### Step 9: left

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky

Before:

```text
#########
#.PBS@..#
#.L.G#..#
#...#.M.#
#C..G.M##
#########
```

After:

```text
#########
#PBS@...#
#L..G#..#
#...#.M.#
#C..G.M##
#########
```

### Step 13: right

- Legal: true
- Events: pull_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky

Before:

```text
#########
#PBS....#
#L@.G#..#
#...#.M.#
#C..G.M##
#########
```

After:

```text
#########
#.PBS...#
#.L@G#..#
#...#.M.#
#C..G.M##
#########
```

### Step 14: down

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#.PBS...#
#.L@G#..#
#...#.M.#
#C..G.M##
#########
```

After:

```text
#########
#.P.....#
#.LBS#..#
#..@#.M.#
#C..G.M##
#########
```

### Step 16: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#.P.....#
#.LBS#..#
#.@.#.M.#
#C..G.M##
#########
```

After:

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#C@.G.M##
#########
```

### Step 17: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#C@.G.M##
#########
```

After:

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#.C@G.M##
#########
```

### Step 18: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#.C@G.M##
#########
```

After:

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#..C+.M##
#########
```

### Step 19: right

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1

Before:

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#..C+.M##
#########
```

After:

```text
#########
#.......#
#.PBS#..#
#.L.#.M.#
#...m@M##
#########
```


## Graph Facts

- Status: complete
- Reachable states: 238
- Legal transitions: 409
- Event-only illegal transitions: 0
- Winning states: 4
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 238
- Legal transitions: 409
- Budget: maxStates=300000
- Compressed regions: 99
- Bidirectional transitions: 284
- Commitment transitions: 116
- Winning regions: 2
- Initial region: r0, states=4, dist=11, internalBidirectional=6, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r6@4 -> r9@8 -> r18@9 -> r28@12 -> r36@13 -> r47@14 -> r68@16 -> r76@17 -> r88@18 -> r94@19
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=98, edges=110, winReachable=21, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=11, forcedWinPrefix=1/11, branchingWinSccs=3, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=7/11, trivial=5, sameEntryExit=7, forcedScripted=7, maxRun=3
- Initial SCC: s0, states=6, dist=11, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@1 -> s18@4 -> s19@8 -> s20@9 -> s21@12 -> s22@13 -> s24@14 -> s26@16 -> s27@17 -> s28@18 -> s29@19

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 11 | 6 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 1 | 10 | 7 | 2 | 2 | 0 | 1 | 1 | s18 | no |
| s18 | 4 | 9 | 9 | 1 | 1 | 0 | 1 | 1 | s19 | yes |
| s19 | 8 | 8 | 11 | 1 | 1 | 0 | 2 | 2 | s20 | yes |
| s20 | 9 | 7 | 17 | 4 | 2 | 2 | 2 | 2 | s21 | no |
| s21 | 12 | 6 | 1 | 2 | 1 | 1 | 1 | 1 | s22 | yes |
| s22 | 13 | 5 | 1 | 2 | 1 | 1 | 1 | 1 | s24 | yes |
| s24 | 14 | 4 | 3 | 2 | 1 | 1 | 1 | 1 | s26 | yes |
| s26 | 16 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s27 | yes |
| s27 | 17 | 2 | 1 | 2 | 1 | 1 | 1 | 1 | s28 | yes |
| s28 | 18 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s29 | yes |
| s29 | 19 | 0 | 2 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 6 | yes | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1 | scripted_same_state_handoff |
| s1 | 1 | 4 | s18 | 7 | no | no | right | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s18 | 4 | 8 | s19 | 9 | no | yes | left | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky | has_reposition_room |
| s19 | 8 | 9 | s20 | 11 | yes | yes | left | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s20 | 9 | 12 | s21 | 17 | no | no | left | walk | has_reposition_room |
| s21 | 12 | 13 | s22 | 1 | yes | yes | right | pull_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s22 | 13 | 14 | s24 | 1 | yes | yes | down | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s24 | 14 | 16 | s26 | 3 | no | yes | down | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s26 | 16 | 17 | s27 | 1 | yes | yes | right | pull_object:crate#1 | scripted_trivial_scc |
| s27 | 17 | 18 | s28 | 1 | yes | yes | right | pull_object:crate#1 | scripted_trivial_scc |
| s28 | 18 | 19 | s29 | 1 | yes | yes | right | pull_object:crate#1, box_to_sticky:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=238, regions=99, solution commitments=11
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/11, optimal prefix=1/11, forced viable commitments=8/11
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 11 | 2 | 0 | 1 | forced optimal |
| 3 | r1 | r6 | 10 | 2 | 0 | 2 | multiple optimal choices |
| 7 | r6 | r9 | 9 | 1 | 0 | 1 | forced optimal |
| 8 | r9 | r18 | 8 | 1 | 0 | 1 | forced optimal |
| 11 | r18 | r28 | 7 | 2 | 2 | 2 | multiple optimal choices |
| 12 | r28 | r36 | 6 | 1 | 1 | 1 | forced optimal |
| 13 | r36 | r47 | 5 | 1 | 1 | 1 | forced optimal |
| 15 | r47 | r68 | 4 | 1 | 1 | 1 | forced optimal |
| 16 | r68 | r76 | 3 | 1 | 0 | 1 | forced optimal |
| 17 | r76 | r88 | 2 | 1 | 1 | 1 | forced optimal |
| 18 | r88 | r94 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 11 | 4 | 2 | 2 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 10 | 7 | 2 | 2 | 0 | 2 | 2 | r6 | no | no | no |
| r6 | 4 | 9 | 9 | 1 | 1 | 0 | 1 | 1 | r9 | yes | yes | yes |
| r9 | 8 | 8 | 11 | 1 | 1 | 0 | 1 | 1 | r18 | yes | yes | yes |
| r18 | 9 | 7 | 17 | 4 | 2 | 2 | 2 | 2 | r28 | no | no | no |
| r28 | 12 | 6 | 1 | 2 | 1 | 1 | 1 | 1 | r36 | no | yes | yes |
| r36 | 13 | 5 | 1 | 2 | 1 | 1 | 1 | 1 | r47 | no | yes | yes |
| r47 | 14 | 4 | 3 | 2 | 1 | 1 | 1 | 1 | r68 | no | yes | yes |
| r68 | 16 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r76 | yes | yes | yes |
| r76 | 17 | 2 | 1 | 2 | 1 | 1 | 1 | 1 | r88 | no | yes | yes |
| r88 | 18 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r94 | yes | yes | yes |
| r94 | 19 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 11 | 2 | 2 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | left | r1 | yes | 10 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1 |
| 2 | down | r1 | no | 10 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 10 | 2 | 2 | 0 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 4 | right | r6 | yes | 9 | 1 | 1 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |
| 5 | up | r6 | no | 9 | 1 | 1 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r6 | no | 9 | 1 | 1 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r6 | no | 9 | 1 | 1 | 0 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | walk |
| 8 | left | r9 | yes | 8 | 1 | 1 | 0 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky |
| 9 | left | r18 | yes | 7 | 4 | 2 | 2 | 2 | 2 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky |
| 10 | down | r18 | no | 7 | 4 | 2 | 2 | 2 | 2 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r18 | no | 7 | 4 | 2 | 2 | 2 | 2 | r28 | yes | yes | yes | yes | no | no | walk |
| 12 | left | r28 | yes | 6 | 2 | 1 | 1 | 1 | 1 | r36 | yes | yes | yes | yes | yes | yes | walk |
| 13 | right | r36 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r47 | yes | yes | yes | yes | yes | yes | pull_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky |
| 14 | down | r47 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r47 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 15 | left | r47 | no | 4 | 2 | 1 | 1 | 1 | 1 | r68 | yes | yes | yes | yes | yes | yes | walk |
| 16 | down | r68 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r76 | yes | yes | yes | yes | yes | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 17 | right | r76 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r88 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 18 | right | r88 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r94 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 19 | right | r94 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1, box_to_sticky:n1 |

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

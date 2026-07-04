# Level Analysis: RA_EXP_2026_07_04_CROSS_LATCH_v2c

## Summary

- Prototype: reality_anchor
- Title: Cross latch v2c
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
#..C.GM##
#########
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 252
- Inputs: left left left down left left right down left down left up up up right right right right right down down up down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 walk walk walk walk walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=5, box_to_sticky:n1=2, force_chain:n2=3, anchor_boundary_shift:push_pull=4, walk=14, pull_object:push_pull_anchor=2, sticky_to_box:n1=1, pull_object:box_sticky_anchor=1, pull_object:crate#1=1, pull_object:sticky#2=1, move_sticky_rigid=2, sticky_merge:n1=1, push_object:sticky#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1

Before:

```text
#########
#..P.BS@#
#..LG#..#
#...#C..#
#..C.GM##
#########
```

After:

```text
#########
#..PBS@.#
#..LG#..#
#...#M..#
#..C.GM##
#########
```

### Step 2: left

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky

Before:

```text
#########
#..PBS@.#
#..LG#..#
#...#M..#
#..C.GM##
#########
```

After:

```text
#########
#.PBS@..#
#.L.G#..#
#...#M..#
#..C.GM##
#########
```

### Step 3: left

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, box_to_sticky:n1

Before:

```text
#########
#.PBS@..#
#.L.G#..#
#...#M..#
#..C.GM##
#########
```

After:

```text
#########
#PBS@...#
#L..G#..#
#...#M..#
#..M.GM##
#########
```

### Step 7: right

- Legal: true
- Events: pull_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#########
#PBS....#
#L@.G#..#
#...#M..#
#..M.GM##
#########
```

After:

```text
#########
#.PBS...#
#.L@G#..#
#...#M..#
#..C.GM##
#########
```

### Step 8: down

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#.PBS...#
#.L@G#..#
#...#M..#
#..C.GM##
#########
```

After:

```text
#########
#.P.....#
#.LBS#..#
#..@#M..#
#..C.GM##
#########
```

### Step 10: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#.P.....#
#.LBS#..#
#.@.#M..#
#..C.GM##
#########
```

After:

```text
#########
#.......#
#.PBS#..#
#.L.#M..#
#.@C.GM##
#########
```

### Step 11: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#.......#
#.PBS#..#
#.L.#M..#
#.@C.GM##
#########
```

After:

```text
#########
#.......#
#.PBS#..#
#.L.#M..#
#@C..GM##
#########
```

### Step 22: up

- Legal: true
- Events: pull_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
#.......#
#.PBS#..#
#.L.#M@.#
#.C..GM##
#########
```

After:

```text
#########
#.......#
#.PBS#@.#
#.L.#MM.#
#.C..G.##
#########
```

### Step 23: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#.......#
#.PBS#@.#
#.L.#MM.#
#.C..G.##
#########
```

After:

```text
#########
#.......#
#.PBS#..#
#.L.#.@.#
#.C..mM##
#########
```


## Graph Facts

- Status: complete
- Reachable states: 280
- Legal transitions: 514
- Event-only illegal transitions: 0
- Winning states: 15
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 280
- Legal transitions: 514
- Budget: maxStates=300000
- Compressed regions: 93
- Bidirectional transitions: 388
- Commitment transitions: 119
- Winning regions: 1
- Initial region: r0, states=4, dist=10, internalBidirectional=6, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r5@3 -> r12@6 -> r15@7 -> r18@8 -> r26@10 -> r30@11 -> r92@21 -> r71@22
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=89, edges=105, winReachable=23, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=10, forcedWinPrefix=0/10, branchingWinSccs=4, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=7/10, trivial=4, sameEntryExit=7, forcedScripted=4, maxRun=3
- Initial SCC: s0, states=4, dist=10, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2 -> s4@3 -> s6@6 -> s7@7 -> s9@8 -> s11@10 -> s12@11 -> s13@21 -> s77@22

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 10 | 4 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 1 | 9 | 5 | 2 | 2 | 0 | 1 | 1 | s2 | no |
| s2 | 2 | 8 | 6 | 2 | 2 | 0 | 1 | 1 | s4 | no |
| s4 | 3 | 7 | 9 | 3 | 2 | 1 | 1 | 1 | s6 | no |
| s6 | 6 | 6 | 1 | 2 | 1 | 1 | 1 | 1 | s7 | yes |
| s7 | 7 | 5 | 1 | 2 | 1 | 1 | 1 | 1 | s9 | yes |
| s9 | 8 | 4 | 7 | 2 | 1 | 1 | 1 | 1 | s11 | yes |
| s11 | 10 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s12 | yes |
| s12 | 11 | 2 | 13 | 1 | 1 | 0 | 1 | 1 | s13 | yes |
| s13 | 21 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | s77 | yes |
| s77 | 22 | 0 | 28 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 4 | yes | no | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 5 | yes | no | left | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s2 | 2 | 3 | s4 | 6 | yes | no | left | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, box_to_sticky:n1 | scripted_same_state_handoff |
| s4 | 3 | 6 | s6 | 9 | no | no | left | walk | has_reposition_room |
| s6 | 6 | 7 | s7 | 1 | yes | yes | right | pull_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s7 | 7 | 8 | s9 | 1 | yes | yes | down | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s9 | 8 | 10 | s11 | 7 | no | yes | down | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s11 | 10 | 11 | s12 | 1 | yes | yes | left | pull_object:crate#1 | scripted_trivial_scc |
| s12 | 11 | 21 | s13 | 13 | no | yes | down | walk | has_reposition_room |
| s13 | 21 | 22 | s77 | 1 | yes | yes | up | pull_object:sticky#2, move_sticky_rigid, sticky_merge:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=280, regions=93, solution commitments=10
- Opening: commitments=2, viable=2, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/10, optimal prefix=0/10, forced viable commitments=5/10
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 10 | 2 | 0 | 2 | multiple optimal choices |
| 1 | r1 | r2 | 9 | 2 | 0 | 2 | multiple optimal choices |
| 2 | r2 | r5 | 8 | 2 | 0 | 2 | multiple optimal choices |
| 5 | r5 | r12 | 7 | 2 | 1 | 2 | multiple optimal choices |
| 6 | r12 | r15 | 6 | 1 | 1 | 1 | forced optimal |
| 7 | r15 | r18 | 5 | 1 | 1 | 1 | forced optimal |
| 9 | r18 | r26 | 4 | 2 | 0 | 1 | forced optimal |
| 10 | r26 | r30 | 3 | 1 | 0 | 1 | forced optimal |
| 20 | r30 | r92 | 2 | 1 | 0 | 1 | forced optimal |
| 21 | r92 | r71 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 10 | 4 | 2 | 2 | 0 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 9 | 5 | 2 | 2 | 0 | 2 | 2 | r2 | no | no | no |
| r2 | 2 | 8 | 6 | 2 | 2 | 0 | 2 | 2 | r5 | no | no | no |
| r5 | 3 | 7 | 9 | 3 | 2 | 1 | 2 | 2 | r12 | no | no | no |
| r12 | 6 | 6 | 1 | 2 | 1 | 1 | 1 | 1 | r15 | no | yes | yes |
| r15 | 7 | 5 | 1 | 2 | 1 | 1 | 1 | 1 | r18 | no | yes | yes |
| r18 | 8 | 4 | 6 | 2 | 2 | 0 | 1 | 1 | r26 | no | no | yes |
| r26 | 10 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r30 | yes | yes | yes |
| r30 | 11 | 2 | 13 | 1 | 1 | 0 | 1 | 1 | r92 | yes | yes | yes |
| r92 | 21 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | r71 | no | yes | yes |
| r71 | 22 | 0 | 28 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 10 | 2 | 2 | 0 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | left | r1 | yes | 9 | 2 | 2 | 0 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 2 | left | r2 | yes | 8 | 2 | 2 | 0 | 2 | 2 | r5 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky |
| 3 | left | r5 | yes | 7 | 3 | 2 | 1 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 4 | down | r5 | no | 7 | 3 | 2 | 1 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r5 | no | 7 | 3 | 2 | 1 | 2 | 2 | r12 | yes | yes | yes | yes | no | no | walk |
| 6 | left | r12 | yes | 6 | 2 | 1 | 1 | 1 | 1 | r15 | yes | yes | yes | yes | yes | yes | walk |
| 7 | right | r15 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | pull_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 8 | down | r18 | yes | 4 | 2 | 2 | 0 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 9 | left | r18 | no | 4 | 2 | 2 | 0 | 1 | 1 | r26 | yes | yes | yes | yes | no | yes | walk |
| 10 | down | r26 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r30 | yes | yes | yes | yes | yes | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 11 | left | r30 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 12 | up | r30 | no | 2 | 1 | 1 | 0 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r30 | no | 2 | 1 | 1 | 0 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r30 | no | 2 | 1 | 1 | 0 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r30 | no | 2 | 1 | 1 | 0 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r30 | no | 2 | 1 | 1 | 0 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r30 | no | 2 | 1 | 1 | 0 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r30 | no | 2 | 1 | 1 | 0 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r30 | no | 2 | 1 | 1 | 0 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r30 | no | 2 | 1 | 1 | 0 | 1 | 1 | r92 | yes | yes | yes | yes | yes | yes | walk |
| 21 | down | r92 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r71 | yes | yes | yes | yes | yes | yes | walk |
| 22 | up | r71 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r71 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 23 | down | r71 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

# Level Analysis: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3

## Summary

- Prototype: reality_anchor
- Title: Long-edge P/L relay v3
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#PL.G######
#.##C....##
#.#..#...##
#...CG#..##
#....#.@.##
###########
```

## Shortest Solution

- Found: yes
- Cost: 34
- Depth: 34
- Explored states: 426
- Inputs: up up up left left right right right down left left up left left up left right down down left down left left up up up right left down down down right right right
- Events: walk walk walk walk walk pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 walk walk walk walk pull_object:crate#1 pull_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#2 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:crate#2 push_object:crate#2
- Event counts: walk=24, pull_object:crate#1=5, pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=2, pull_object:crate#2=1, push_object:push_pull_anchor=1, push_object:crate#2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#PL.G######
#.##C@...##
#.#..#...##
#...CG#..##
#....#...##
###########
```

After:

```text
###########
#PL.G######
#.##.C@..##
#.#..#...##
#...CG#..##
#....#...##
###########
```

### Step 7: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#PL.G######
#.##.C@..##
#.#..#...##
#...CG#..##
#....#...##
###########
```

After:

```text
###########
#PL.G######
#.##..C@.##
#.#..#...##
#...CG#..##
#....#...##
###########
```

### Step 8: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#PL.G######
#.##..C@.##
#.#..#...##
#...CG#..##
#....#...##
###########
```

After:

```text
###########
#PL.G######
#.##...C@##
#.#..#...##
#...CG#..##
#....#...##
###########
```

### Step 13: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#PL.G######
#.##..@C.##
#.#..#...##
#...CG#..##
#....#...##
###########
```

After:

```text
###########
#PL.G######
#.##.@C..##
#.#..#...##
#...CG#..##
#....#...##
###########
```

### Step 14: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#PL.G######
#.##.@C..##
#.#..#...##
#...CG#..##
#....#...##
###########
```

After:

```text
###########
#PL.G######
#.##@C...##
#.#..#...##
#...CG#..##
#....#...##
###########
```

### Step 17: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#PL@G######
#.##.C...##
#.#..#...##
#...CG#..##
#....#...##
###########
```

After:

```text
###########
#.PL+######
#.##.C...##
#.#..#...##
#...CG#..##
#....#...##
###########
```

### Step 22: left

- Legal: true
- Events: pull_object:crate#2

Before:

```text
###########
#.PLG######
#.##.C...##
#.#..#...##
#..@CG#..##
#....#...##
###########
```

After:

```text
###########
#.PLG######
#.##.C...##
#.#..#...##
#.@C.G#..##
#....#...##
###########
```

### Step 27: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#@PLG######
#.##.C...##
#.#..#...##
#..C.G#..##
#....#...##
###########
```

After:

```text
###########
#.@PL######
#.##.C...##
#.#..#...##
#..C.G#..##
#....#...##
###########
```

### Step 33: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
###########
#..PL######
#.##.C...##
#.#..#...##
#.@C.G#..##
#....#...##
###########
```

After:

```text
###########
#..PL######
#.##.C...##
#.#..#...##
#..@CG#..##
#....#...##
###########
```

### Step 34: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
###########
#..PL######
#.##.C...##
#.#..#...##
#..@CG#..##
#....#...##
###########
```

After:

```text
###########
#..PL######
#.##.C...##
#.#..#...##
#...@*#..##
#....#...##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 1203
- Legal transitions: 2676
- Event-only illegal transitions: 0
- Winning states: 67
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1203
- Legal transitions: 2676
- Budget: maxStates=300000
- Compressed regions: 120
- Bidirectional transitions: 2434
- Commitment transitions: 177
- Winning regions: 6
- Initial region: r0, states=11, dist=9, internalBidirectional=28, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r2@6 -> r3@7 -> r4@8 -> r7@13 -> r8@14 -> r10@16 -> r12@17 -> r17@19 -> r43@27 -> r46@33
- Forced commitment prefix length: 4
- Forced viable prefix length: 4
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=102, edges=133, winReachable=45, winning=5, winSubgraph=branching_win_dag
- Solution irreversible path: steps=11, forcedWinPrefix=4/11, branchingWinSccs=12, mergingWinSccs=12
- Handoff scriptiness: scope=returned_solution, scripted=5/11, trivial=3, sameEntryExit=5, forcedScripted=5, maxRun=3
- Initial SCC: s0, states=11, dist=9, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5 -> s2@6 -> s3@7 -> s4@8 -> s5@13 -> s6@14 -> s26@16 -> s27@17 -> s28@19 -> s30@27 -> s39@33

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 9 | 11 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 8 | 1 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 6 | 7 | 11 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 7 | 6 | 10 | 1 | 1 | 0 | 1 | 1 | s4 | yes |
| s4 | 8 | 5 | 10 | 2 | 2 | 0 | 1 | 1 | s5 | no |
| s5 | 13 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | s6 | yes |
| s6 | 14 | 4 | 2 | 2 | 2 | 0 | 1 | 1 | s26 | no |
| s26 | 16 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s27 | yes |
| s27 | 17 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | s28 | yes |
| s28 | 19 | 1 | 26 | 4 | 2 | 2 | 3 | 3 | s30 | no |
| s30 | 27 | 1 | 13 | 5 | 2 | 3 | 2 | 2 | s39 | no |
| s39 | 33 | 0 | 27 | 2 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 11 | no | yes | left | walk | has_reposition_room |
| s1 | 5 | 6 | s2 | 1 | yes | yes | right | pull_object:crate#1 | scripted_trivial_scc |
| s2 | 6 | 7 | s3 | 11 | yes | yes | right | pull_object:crate#1 | scripted_same_state_handoff |
| s3 | 7 | 8 | s4 | 10 | yes | yes | right | pull_object:crate#1 | scripted_same_state_handoff |
| s4 | 8 | 13 | s5 | 10 | no | no | left | pull_object:crate#1 | has_reposition_room |
| s5 | 13 | 14 | s6 | 1 | yes | yes | left | pull_object:crate#1 | scripted_trivial_scc |
| s6 | 14 | 16 | s26 | 2 | no | no | left | walk | has_reposition_room |
| s26 | 16 | 17 | s27 | 1 | yes | yes | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_trivial_scc |
| s27 | 17 | 19 | s28 | 2 | no | yes | down | walk | has_reposition_room |
| s28 | 19 | 27 | s30 | 26 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s30 | 27 | 33 | s39 | 13 | no | no | right | push_object:crate#2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1203, regions=120, solution commitments=11
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=4/11, optimal prefix=4/11, forced viable commitments=7/11
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: first 4 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 9 | 1 | 0 | 1 | forced optimal |
| 5 | r1 | r2 | 8 | 1 | 0 | 1 | forced optimal |
| 6 | r2 | r3 | 7 | 1 | 0 | 1 | forced optimal |
| 7 | r3 | r4 | 6 | 1 | 0 | 1 | forced optimal |
| 12 | r4 | r7 | 5 | 2 | 0 | 1 | multiple viable choices |
| 13 | r7 | r8 | 5 | 1 | 0 | 1 | forced optimal |
| 15 | r8 | r10 | 4 | 2 | 0 | 1 | forced optimal |
| 16 | r10 | r12 | 3 | 1 | 0 | 1 | forced optimal |
| 18 | r12 | r17 | 2 | 1 | 0 | 1 | forced optimal |
| 26 | r17 | r43 | 1 | 2 | 2 | 1 | multiple viable choices |
| 32 | r43 | r46 | 1 | 2 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 9 | 11 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 8 | 1 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 6 | 7 | 11 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 7 | 6 | 10 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 8 | 5 | 10 | 2 | 2 | 0 | 1 | 1 | r7 | no | no | no |
| r7 | 13 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes |
| r8 | 14 | 4 | 2 | 2 | 2 | 0 | 1 | 1 | r10 | no | no | yes |
| r10 | 16 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r12 | yes | yes | yes |
| r12 | 17 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | r17 | yes | yes | yes |
| r17 | 19 | 1 | 26 | 4 | 2 | 2 | 1 | 1 | r43 | no | no | no |
| r43 | 27 | 1 | 13 | 5 | 2 | 3 | 1 | 1 | r46 | no | no | yes |
| r46 | 33 | 0 | 27 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 9 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 9 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 9 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 9 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 9 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | left | r1 | yes | 8 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r2 | yes | 7 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 7 | right | r3 | yes | 6 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 8 | right | r4 | yes | 5 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 9 | down | r4 | no | 5 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r4 | no | 5 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r4 | no | 5 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r4 | no | 5 | 2 | 2 | 0 | 1 | 1 | r7 | yes | yes | no | no | no | no | walk |
| 13 | left | r7 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 14 | left | r8 | yes | 4 | 2 | 2 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 15 | up | r8 | no | 4 | 2 | 2 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | no | yes | walk |
| 16 | left | r10 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r12 | yes | yes | yes | yes | yes | yes | walk |
| 17 | right | r12 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 18 | down | r12 | no | 2 | 1 | 1 | 0 | 1 | 1 | r17 | yes | yes | yes | yes | yes | yes | walk |
| 19 | down | r17 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r17 | no | 1 | 4 | 2 | 2 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r17 | no | 1 | 4 | 2 | 2 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r17 | no | 1 | 4 | 2 | 2 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 23 | left | r17 | no | 1 | 4 | 2 | 2 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r17 | no | 1 | 4 | 2 | 2 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r17 | no | 1 | 4 | 2 | 2 | 1 | 1 | r17 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | up | r17 | no | 1 | 4 | 2 | 2 | 1 | 1 | r43 | yes | yes | no | no | no | no | walk |
| 27 | right | r43 | yes | 1 | 5 | 2 | 3 | 1 | 1 | r43 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 28 | left | r43 | no | 1 | 5 | 2 | 3 | 1 | 1 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r43 | no | 1 | 5 | 2 | 3 | 1 | 1 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | down | r43 | no | 1 | 5 | 2 | 3 | 1 | 1 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | down | r43 | no | 1 | 5 | 2 | 3 | 1 | 1 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r43 | no | 1 | 5 | 2 | 3 | 1 | 1 | r46 | yes | yes | yes | yes | no | yes | walk |
| 33 | right | r46 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |
| 34 | right | r46 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |

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

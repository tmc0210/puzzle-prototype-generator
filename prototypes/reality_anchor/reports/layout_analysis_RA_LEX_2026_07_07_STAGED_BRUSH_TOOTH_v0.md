# Level Analysis: RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0

## Summary

- Prototype: reality_anchor
- Title: Staged brush tooth v0
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#PL##...####
#####G#G####
#####MMM...#
####BS@.#..#
####.....#.#
########...#
############
```

## Shortest Solution

- Found: yes
- Cost: 18
- Depth: 18
- Explored states: 51
- Inputs: right down right down right right up up up left left left up up left left down up
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:crate#1
- Event counts: pull_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=3, sticky_to_box:n1=2, pull_object:sticky#1=3, force_chain:n2=1, move_sticky_rigid=3, walk=12, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
############
#PL##...####
#####G#G####
#####MMM...#
####BS@.#..#
####.....#.#
########...#
############
```

After:

```text
############
#PL##...####
#####G#G####
#####CMM...#
####.BS@#..#
####.....#.#
########...#
############
```

### Step 2: down

- Legal: true
- Events: pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
############
#PL##...####
#####G#G####
#####CMM...#
####.BS@#..#
####.....#.#
########...#
############
```

After:

```text
############
#PL##...####
#####G#G####
#####C.....#
####..MM#..#
####.BS@.#.#
########...#
############
```

### Step 3: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
############
#PL##...####
#####G#G####
#####C.....#
####..MM#..#
####.BS@.#.#
########...#
############
```

After:

```text
############
#PL##...####
#####G#G####
#####C.....#
####..CM#..#
####..BS@#.#
########...#
############
```

### Step 13: up

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
############
#PL##...####
#####G#G####
#####C.@...#
####..CM#..#
####..BS.#.#
########...#
############
```

After:

```text
############
#PL##...####
#####G#+####
#####C.M...#
####..C.#..#
####..BS.#.#
########...#
############
```

### Step 14: up

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
############
#PL##...####
#####G#+####
#####C.M...#
####..C.#..#
####..BS.#.#
########...#
############
```

After:

```text
############
#PL##..@####
#####G#m####
#####C.....#
####..C.#..#
####..BS.#.#
########...#
############
```

### Step 18: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
############
#PL##...####
#####+#m####
#####C.....#
####..C.#..#
####..BS.#.#
########...#
############
```

After:

```text
############
#PL##@..####
#####*#m####
#####......#
####..C.#..#
####..BS.#.#
########...#
############
```


## Graph Facts

- Status: complete
- Reachable states: 104
- Legal transitions: 179
- Event-only illegal transitions: 0
- Winning states: 2
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 104
- Legal transitions: 179
- Budget: maxStates=300000
- Compressed regions: 37
- Bidirectional transitions: 142
- Commitment transitions: 37
- Winning regions: 2
- Initial region: r0, states=1, dist=7, internalBidirectional=0, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@1 -> r4@2 -> r6@3 -> r8@13 -> r11@14 -> r18@17 -> r20@18
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 7

### SCC Irreversible Progress

- Shape: sccs=37, edges=37, winReachable=19, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=7, forcedWinPrefix=0/7, branchingWinSccs=2, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=5/7, trivial=5, sameEntryExit=5, forcedScripted=4, maxRun=3
- Initial SCC: s0, states=1, dist=7, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@3 -> s15@13 -> s16@14 -> s35@17 -> s36@18

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 7 | 1 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 1 | 6 | 1 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 3 | 4 | 11 | 2 | 1 | 1 | 1 | 1 | s15 | yes |
| s15 | 13 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s16 | yes |
| s16 | 14 | 2 | 3 | 1 | 1 | 0 | 1 | 1 | s35 | yes |
| s35 | 17 | 1 | 1 | 1 | 1 | 0 | 2 | 2 | s36 | yes |
| s36 | 18 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | no | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s1 | 1 | 2 | s2 | 1 | yes | yes | down | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_trivial_scc |
| s2 | 2 | 3 | s3 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s3 | 3 | 13 | s15 | 11 | no | yes | up | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s15 | 13 | 14 | s16 | 1 | yes | yes | up | pull_object:sticky#1, move_sticky_rigid | scripted_trivial_scc |
| s16 | 14 | 17 | s35 | 3 | no | yes | down | walk | has_reposition_room |
| s35 | 17 | 18 | s36 | 1 | yes | yes | up | pull_object:crate#1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=104, regions=37, solution commitments=7
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/7, optimal prefix=7/7, forced viable commitments=6/7
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r2 | 7 | 2 | 0 | 1 | forced optimal |
| 1 | r2 | r4 | 6 | 1 | 0 | 1 | forced optimal |
| 2 | r4 | r6 | 5 | 1 | 0 | 1 | forced optimal |
| 12 | r6 | r8 | 4 | 1 | 1 | 1 | forced optimal |
| 13 | r8 | r11 | 3 | 1 | 0 | 1 | forced optimal |
| 16 | r11 | r18 | 2 | 1 | 0 | 1 | forced optimal |
| 17 | r18 | r20 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 7 | 1 | 2 | 2 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 1 | 6 | 1 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 2 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes |
| r6 | 3 | 4 | 11 | 2 | 1 | 1 | 1 | 1 | r8 | no | yes | yes |
| r8 | 13 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r11 | yes | yes | yes |
| r11 | 14 | 2 | 3 | 1 | 1 | 0 | 1 | 1 | r18 | yes | yes | yes |
| r18 | 17 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes |
| r20 | 18 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 7 | 2 | 2 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r2 | yes | 6 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | down | r4 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 3 | right | r6 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 4 | down | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | walk |
| 13 | up | r8 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r11 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, move_sticky_rigid |
| 14 | up | r11 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |
| 15 | left | r11 | no | 2 | 1 | 1 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r11 | no | 2 | 1 | 1 | 0 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | walk |
| 17 | down | r18 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | walk |
| 18 | up | r20 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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

# Level Analysis: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#.PLBS..###
#@.###...##
#...#MMmG.#
#....G###.#
#.........#
###########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 138
- Inputs: up right down down down right right right down right right right right up up left right
- Events: walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk pull_object:crate#1 walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid
- Event counts: walk=14, push_object:push_pull_anchor=1, force_chain:n2=1, anchor_boundary_shift:push_pull=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n1=1, pull_object:crate#1=1, pull_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
#@PLBS..###
#..###...##
#...#MMmG.#
#....G###.#
#.........#
###########
```

After:

```text
###########
#.@PLBS.###
#..###...##
#...#CMmG.#
#....G###.#
#.........#
###########
```

### Step 9: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#..PLBS.###
#..###...##
#...#CMmG.#
#....+###.#
#.........#
###########
```

After:

```text
###########
#..PLBS.###
#..###...##
#...#.MmG.#
#....*###.#
#....@....#
###########
```

### Step 17: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#..PLBS.###
#..###...##
#...#.Mm+.#
#....*###.#
#.........#
###########
```

After:

```text
###########
#..PLBS.###
#..###...##
#...#..mm@#
#....*###.#
#.........#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 3384
- Legal transitions: 8502
- Event-only illegal transitions: 0
- Winning states: 6
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 3384
- Legal transitions: 8502
- Budget: maxStates=300000
- Compressed regions: 192
- Bidirectional transitions: 8100
- Commitment transitions: 395
- Winning regions: 6
- Initial region: r0, states=22, dist=4, internalBidirectional=54, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r3@9 -> r8@16 -> r11@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=123, edges=204, winReachable=29, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=1/4, branchingWinSccs=7, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=22, dist=3, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s5@2 -> s15@9 -> s16@16 -> s17@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 22 | 2 | 1 | 1 | 0 | 0 | s5 | yes |
| s5 | 2 | 2 | 23 | 3 | 2 | 1 | 1 | 1 | s15 | no |
| s15 | 9 | 1 | 73 | 7 | 3 | 4 | 1 | 1 | s16 | no |
| s16 | 16 | 1 | 4 | 2 | 1 | 1 | 1 | 1 | s17 | yes |
| s17 | 17 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s5 | 22 | no | yes | right | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s5 | 2 | 9 | s15 | 23 | no | no | down | pull_object:crate#1 | has_reposition_room |
| s15 | 9 | 16 | s16 | 73 | no | no | left | walk | has_reposition_room |
| s16 | 16 | 17 | s17 | 4 | yes | yes | right | pull_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=3384, regions=192, solution commitments=4
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=2/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 4 | 1 | 1 | 1 | forced optimal |
| 8 | r1 | r3 | 3 | 2 | 1 | 2 | multiple optimal choices |
| 15 | r3 | r8 | 2 | 2 | 2 | 1 | forced optimal |
| 16 | r8 | r11 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 22 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 2 | 3 | 23 | 3 | 2 | 1 | 2 | 2 | r3 | no | no | no |
| r3 | 9 | 2 | 45 | 4 | 2 | 2 | 1 | 1 | r8 | no | no | yes |
| r8 | 16 | 1 | 4 | 2 | 1 | 1 | 1 | 1 | r11 | no | yes | yes |
| r11 | 17 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 3 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 3 | down | r1 | no | 3 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 3 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 3 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 3 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 3 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 3 | 3 | 2 | 1 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 9 | down | r3 | yes | 2 | 4 | 2 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 10 | right | r3 | no | 2 | 4 | 2 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r3 | no | 2 | 4 | 2 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r3 | no | 2 | 4 | 2 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r3 | no | 2 | 4 | 2 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r3 | no | 2 | 4 | 2 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r3 | no | 2 | 4 | 2 | 2 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | walk |
| 16 | left | r8 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r11 | yes | yes | yes | yes | yes | yes | walk |
| 17 | right | r11 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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

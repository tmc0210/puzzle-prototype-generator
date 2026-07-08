# Level Analysis: RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#.PLBS.###
#@.###..##
#...#MMG.#
#....G#..#
#........#
##########
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 80
- Inputs: up right down down down right right right down right right up up right
- Events: walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk pull_object:crate#1 walk walk walk walk pull_object:sticky#1 move_sticky_rigid
- Event counts: walk=11, push_object:push_pull_anchor=1, force_chain:n2=1, anchor_boundary_shift:push_pull=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n1=1, pull_object:crate#1=1, pull_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
##########
#@PLBS.###
#..###..##
#...#MMG.#
#....G#..#
#........#
##########
```

After:

```text
##########
#.@PLBS###
#..###..##
#...#CMG.#
#....G#..#
#........#
##########
```

### Step 9: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
##########
#..PLBS###
#..###..##
#...#CMG.#
#....+#..#
#........#
##########
```

After:

```text
##########
#..PLBS###
#..###..##
#...#.MG.#
#....*#..#
#....@...#
##########
```

### Step 14: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#..PLBS###
#..###..##
#...#.M+.#
#....*#..#
#........#
##########
```

After:

```text
##########
#..PLBS###
#..###..##
#...#..m@#
#....*#..#
#........#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 311
- Legal transitions: 786
- Event-only illegal transitions: 0
- Winning states: 4
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 311
- Legal transitions: 786
- Budget: maxStates=300000
- Compressed regions: 25
- Bidirectional transitions: 742
- Commitment transitions: 30
- Winning regions: 4
- Initial region: r0, states=25, dist=3, internalBidirectional=62, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@9 -> r5@14
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=19, edges=20, winReachable=10, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=3, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=25, dist=3, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s3@2 -> s13@9 -> s14@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 25 | 2 | 1 | 1 | 0 | 0 | s3 | yes |
| s3 | 2 | 2 | 26 | 2 | 2 | 0 | 1 | 1 | s13 | no |
| s13 | 9 | 1 | 75 | 4 | 3 | 1 | 1 | 1 | s14 | no |
| s14 | 14 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s3 | 25 | no | yes | right | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s3 | 2 | 9 | s13 | 26 | no | no | down | pull_object:crate#1 | has_reposition_room |
| s13 | 9 | 14 | s14 | 75 | no | no | right | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=311, regions=25, solution commitments=3
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=1/3, forced viable commitments=1/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 3 | 1 | 1 | 1 | forced optimal |
| 8 | r1 | r2 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 13 | r2 | r5 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 25 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 2 | 2 | 26 | 2 | 2 | 0 | 2 | 2 | r2 | no | no | no |
| r2 | 9 | 1 | 51 | 2 | 2 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 14 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 3 | down | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 9 | down | r2 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 10 | right | r2 | no | 1 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r2 | no | 1 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r2 | no | 1 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r2 | no | 1 | 2 | 2 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | walk |
| 14 | right | r5 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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

# Level Analysis: RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v1

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v1
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
#....MMG.#
#....G#..#
#........#
##########
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 231
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
#....MMG.#
#....G#..#
#........#
##########
```

After:

```text
##########
#.@PLBS###
#..###..##
#....CMG.#
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
#....CMG.#
#....+#..#
#........#
##########
```

After:

```text
##########
#..PLBS###
#..###..##
#.....MG.#
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
#.....M+.#
#....*#..#
#........#
##########
```

After:

```text
##########
#..PLBS###
#..###..##
#......m@#
#....*#..#
#........#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 2558
- Legal transitions: 6724
- Event-only illegal transitions: 0
- Winning states: 6
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2558
- Legal transitions: 6724
- Budget: maxStates=300000
- Compressed regions: 168
- Bidirectional transitions: 6124
- Commitment transitions: 413
- Winning regions: 6
- Initial region: r0, states=26, dist=3, internalBidirectional=64, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r4@9 -> r19@14
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=82, edges=162, winReachable=45, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=24, mergingWinSccs=22
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=50, dist=3, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s62@2 -> s74@9 -> s81@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 50 | 3 | 3 | 0 | 0 | 0 | s62 | no |
| s62 | 2 | 2 | 54 | 2 | 2 | 0 | 5 | 5 | s74 | no |
| s74 | 9 | 1 | 186 | 6 | 3 | 3 | 11 | 11 | s81 | no |
| s81 | 14 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s62 | 50 | no | no | right | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s62 | 2 | 9 | s74 | 54 | no | no | down | pull_object:crate#1 | has_reposition_room |
| s74 | 9 | 14 | s81 | 186 | no | no | right | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2558, regions=168, solution commitments=3
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=1/3, forced viable commitments=0/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 3 | 3 | 0 | 1 | forced optimal |
| 8 | r1 | r4 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 13 | r4 | r19 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 26 | 3 | 3 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 2 | 2 | 54 | 2 | 2 | 0 | 2 | 2 | r4 | no | no | no |
| r4 | 9 | 1 | 53 | 4 | 4 | 0 | 1 | 1 | r19 | no | no | yes |
| r19 | 14 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 3 | 3 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | walk |
| 2 | right | r1 | yes | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 3 | down | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 9 | down | r4 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 10 | right | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r4 | no | 1 | 4 | 4 | 0 | 1 | 1 | r19 | yes | yes | yes | yes | no | yes | walk |
| 14 | right | r19 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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

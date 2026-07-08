# Level Analysis: RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_left_goal

## Summary

- Prototype: reality_anchor
- Title: Staged brush tooth v0 no left goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#PL##...####
#####.#G####
#####MMM...#
####BS@.#..#
####.....#.#
########...#
############
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 32
- Inputs: down right right down right right up up up left left left up up
- Events: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid
- Event counts: pull_object:sticky#1=3, force_chain:n2=1, anchor_boundary_shift:box_sticky=3, move_sticky_rigid=3, pull_object:box_sticky_anchor=2, sticky_to_box:n1=2, walk=9

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
############
#PL##...####
#####.#G####
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
#####.#G####
#####......#
####.MMM#..#
####BS@..#.#
########...#
############
```

### Step 2: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
############
#PL##...####
#####.#G####
#####......#
####.MMM#..#
####BS@..#.#
########...#
############
```

After:

```text
############
#PL##...####
#####.#G####
#####......#
####.CMM#..#
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
#####.#G####
#####......#
####.CMM#..#
####.BS@.#.#
########...#
############
```

After:

```text
############
#PL##...####
#####.#G####
#####......#
####.CCM#..#
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
#####.#G####
#####..@...#
####.CCM#..#
####..BS.#.#
########...#
############
```

After:

```text
############
#PL##...####
#####.#+####
#####..M...#
####.CC.#..#
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
#####.#+####
#####..M...#
####.CC.#..#
####..BS.#.#
########...#
############
```

After:

```text
############
#PL##..@####
#####.#m####
#####......#
####.CC.#..#
####..BS.#.#
########...#
############
```


## Graph Facts

- Status: complete
- Reachable states: 67
- Legal transitions: 112
- Event-only illegal transitions: 0
- Winning states: 4
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 67
- Legal transitions: 112
- Budget: maxStates=300000
- Compressed regions: 27
- Bidirectional transitions: 86
- Commitment transitions: 26
- Winning regions: 4
- Initial region: r0, states=1, dist=5, internalBidirectional=0, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r5@3 -> r7@13 -> r10@14
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=27, edges=26, winReachable=20, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=3, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=4/5, trivial=4, sameEntryExit=4, forcedScripted=3, maxRun=3
- Initial SCC: s0, states=1, dist=5, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s11@1 -> s12@2 -> s13@3 -> s25@13 -> s26@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 1 | 2 | 2 | 0 | 0 | 0 | s11 | no |
| s11 | 1 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | s12 | yes |
| s12 | 2 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s13 | yes |
| s13 | 3 | 2 | 13 | 2 | 2 | 0 | 1 | 1 | s25 | no |
| s25 | 13 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s26 | yes |
| s26 | 14 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s11 | 1 | yes | no | down | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_trivial_scc |
| s11 | 1 | 2 | s12 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s12 | 2 | 3 | s13 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s13 | 3 | 13 | s25 | 13 | no | no | up | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s25 | 13 | 14 | s26 | 1 | yes | yes | up | pull_object:sticky#1, move_sticky_rigid | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=67, regions=27, solution commitments=5
- Opening: commitments=2, viable=2, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=3/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 2 | 0 | 2 | multiple optimal choices |
| 1 | r1 | r3 | 4 | 1 | 0 | 1 | forced optimal |
| 2 | r3 | r5 | 3 | 1 | 0 | 1 | forced optimal |
| 12 | r5 | r7 | 2 | 2 | 0 | 1 | forced optimal |
| 13 | r7 | r10 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 1 | 2 | 2 | 0 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 2 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 3 | 2 | 13 | 2 | 2 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 13 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r10 | yes | yes | yes |
| r10 | 14 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 2 | 2 | 0 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | down | r1 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 2 | right | r3 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 3 | right | r5 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 4 | down | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | walk |
| 13 | up | r7 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, move_sticky_rigid |
| 14 | up | r10 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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

# Level Analysis: RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_right_goal

## Summary

- Prototype: reality_anchor
- Title: Staged brush tooth v0 no right goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#PL##...####
#####G#.####
#####MMM...#
####BS@.#..#
####.....#.#
########...#
############
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 42
- Inputs: down right right down right right up up up left left left left left up up
- Events: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk walk walk walk pull_object:crate#1 pull_object:crate#1
- Event counts: pull_object:sticky#1=1, force_chain:n2=1, anchor_boundary_shift:box_sticky=3, move_sticky_rigid=1, pull_object:box_sticky_anchor=2, sticky_to_box:n1=2, walk=11, pull_object:crate#1=2

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
#####G#.####
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
#####G#.####
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
#####G#.####
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
#####G#.####
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
#####G#.####
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
#####G#.####
#####......#
####.CCM#..#
####..BS@#.#
########...#
############
```

### Step 15: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
############
#PL##...####
#####G#.####
#####@.....#
####.CCM#..#
####..BS.#.#
########...#
############
```

After:

```text
############
#PL##...####
#####+#.####
#####C.....#
####..CM#..#
####..BS.#.#
########...#
############
```

### Step 16: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
############
#PL##...####
#####+#.####
#####C.....#
####..CM#..#
####..BS.#.#
########...#
############
```

After:

```text
############
#PL##@..####
#####*#.####
#####......#
####..CM#..#
####..BS.#.#
########...#
############
```


## Graph Facts

- Status: complete
- Reachable states: 77
- Legal transitions: 132
- Event-only illegal transitions: 0
- Winning states: 2
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 77
- Legal transitions: 132
- Budget: maxStates=300000
- Compressed regions: 28
- Bidirectional transitions: 104
- Commitment transitions: 28
- Winning regions: 2
- Initial region: r0, states=1, dist=5, internalBidirectional=0, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r5@3 -> r13@15 -> r16@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=28, edges=28, winReachable=16, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=2, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=4/5, trivial=4, sameEntryExit=4, forcedScripted=3, maxRun=3
- Initial SCC: s0, states=1, dist=5, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s17@1 -> s18@2 -> s19@3 -> s20@15 -> s21@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 1 | 2 | 2 | 0 | 0 | 0 | s17 | no |
| s17 | 1 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | s18 | yes |
| s18 | 2 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s19 | yes |
| s19 | 3 | 2 | 13 | 2 | 2 | 0 | 1 | 1 | s20 | no |
| s20 | 15 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s21 | yes |
| s21 | 16 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s17 | 1 | yes | no | down | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_trivial_scc |
| s17 | 1 | 2 | s18 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s18 | 2 | 3 | s19 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s19 | 3 | 15 | s20 | 13 | no | no | up | pull_object:crate#1 | has_reposition_room |
| s20 | 15 | 16 | s21 | 1 | yes | yes | up | pull_object:crate#1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=77, regions=28, solution commitments=5
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/5, optimal prefix=5/5, forced viable commitments=3/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 2 | 0 | 1 | forced optimal |
| 1 | r1 | r3 | 4 | 1 | 0 | 1 | forced optimal |
| 2 | r3 | r5 | 3 | 1 | 0 | 1 | forced optimal |
| 14 | r5 | r13 | 2 | 2 | 0 | 1 | forced optimal |
| 15 | r13 | r16 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 1 | 2 | 2 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 2 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 3 | 2 | 13 | 2 | 2 | 0 | 1 | 1 | r13 | no | no | yes |
| r13 | 15 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes |
| r16 | 16 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 2 | 2 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
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
| 12 | left | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r5 | no | 2 | 2 | 2 | 0 | 1 | 1 | r13 | yes | yes | yes | yes | no | yes | walk |
| 15 | up | r13 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 16 | up | r16 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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

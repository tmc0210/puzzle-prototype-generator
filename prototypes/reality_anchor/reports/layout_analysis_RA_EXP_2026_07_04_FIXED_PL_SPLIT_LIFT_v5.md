# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L split lift v5
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#P#....@..#
#L##G#.B#.#
####.##S#.#
####m##.#.#
####M####.#
###########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 33
- Inputs: down left up left left down down up up
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1
- Event counts: push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, walk=6, pull_object:sticky#1=1, move_sticky_rigid=1, sticky_to_box:n1=1, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#P#....@..#
#L##G#.B#.#
####.##S#.#
####m##.#.#
####M####.#
###########
```

After:

```text
###########
#P#.......#
#L##G#.@#.#
####.##B#.#
####m##S#.#
####M####.#
###########
```

### Step 8: up

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
###########
#P#.......#
#L##G#..#.#
####@##B#.#
####m##S#.#
####M####.#
###########
```

After:

```text
###########
#P#.......#
#L##+#..#.#
####C##B#.#
####m##S#.#
####.####.#
###########
```

### Step 9: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#P#.......#
#L##+#..#.#
####C##B#.#
####m##S#.#
####.####.#
###########
```

After:

```text
###########
#P#.@.....#
#L##*#..#.#
####.##B#.#
####m##S#.#
####.####.#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 81
- Legal transitions: 161
- Event-only illegal transitions: 0
- Winning states: 25
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 81
- Legal transitions: 161
- Budget: maxStates=400000
- Compressed regions: 5
- Bidirectional transitions: 152
- Commitment transitions: 6
- Winning regions: 1
- Initial region: r0, states=27, dist=2, internalBidirectional=52, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@7 -> r4@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=4, edges=4, winReachable=4, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=27, dist=2, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s2@7 -> s3@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 27 | 2 | 2 | 0 | 0 | 0 | s2 | no |
| s2 | 7 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 8 | 0 | 52 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 7 | s2 | 27 | no | no | down | walk | has_reposition_room |
| s2 | 7 | 8 | s3 | 1 | yes | yes | up | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=81, regions=5, solution commitments=2
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 6 | r0 | r3 | 2 | 2 | 0 | 1 | forced optimal |
| 7 | r3 | r4 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 27 | 2 | 2 | 0 | 1 | 1 | r3 | no | no | yes |
| r3 | 7 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 8 | 0 | 26 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 2 | left | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 7 | down | r3 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 8 | up | r4 | yes | 0 | 1 | 1 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 9 | up | r4 | no | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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

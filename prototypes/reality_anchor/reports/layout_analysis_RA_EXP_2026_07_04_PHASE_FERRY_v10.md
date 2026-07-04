# Level Analysis: RA_EXP_2026_07_04_PHASE_FERRY_v10

## Summary

- Prototype: reality_anchor
- Title: Phase ferry v10
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#..#G..#
##GMLP.#
#.BS.M.#
##..@.##
########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 26
- Inputs: right up right up left left
- Events: walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- Event counts: walk=3, push_object:sticky#2=2, force_chain:n2=1, anchor_boundary_shift:push_pull=1, move_sticky_rigid=3, sticky_merge:n1=1, push_object:sticky#1=1, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: up

- Legal: true
- Events: push_object:sticky#2, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid

Before:

```text
########
#..#G..#
##GMLP.#
#.BS.M.#
##...@##
########
```

After:

```text
########
#..#LP.#
##GM.M.#
#.BS.@.#
##....##
########
```

### Step 5: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
########
#..#LP.#
##GM.M@#
#.BS...#
##....##
########
```

After:

```text
########
#..#LP.#
##GMM@.#
#.BS...#
##....##
########
```

### Step 6: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
########
#..#LP.#
##GMM@.#
#.BS...#
##....##
########
```

After:

```text
########
#..#LP.#
##*M@..#
#.BS...#
##....##
########
```


## Graph Facts

- Status: complete
- Reachable states: 4150
- Legal transitions: 9998
- Event-only illegal transitions: 0
- Winning states: 447
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 4150
- Legal transitions: 9998
- Budget: maxStates=300000
- Compressed regions: 586
- Bidirectional transitions: 8796
- Commitment transitions: 1150
- Winning regions: 71
- Initial region: r0, states=4, dist=3, internalBidirectional=6, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@2 -> r7@5 -> r8@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=356, edges=611, winReachable=136, winning=49, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=35, mergingWinSccs=52
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=4, dist=2, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@2 -> s2@5 -> s3@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 4 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 2 | 1 | 21 | 4 | 2 | 2 | 1 | 1 | s2 | no |
| s2 | 5 | 1 | 9 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 6 | 0 | 575 | 55 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 4 | no | yes | up | push_object:sticky#2, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid | has_reposition_room |
| s1 | 2 | 5 | s2 | 21 | no | no | left | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |
| s2 | 5 | 6 | s3 | 9 | yes | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=4150, regions=586, solution commitments=3
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=1/3, forced viable commitments=1/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r3 | 3 | 1 | 1 | 1 | forced optimal |
| 4 | r3 | r7 | 2 | 2 | 2 | 2 | multiple optimal choices |
| 5 | r7 | r8 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 4 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 2 | 2 | 21 | 4 | 2 | 2 | 2 | 2 | r7 | no | no | no |
| r7 | 5 | 1 | 9 | 2 | 2 | 0 | 1 | 1 | r8 | no | no | yes |
| r8 | 6 | 0 | 10 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 2 | up | r3 | yes | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid |
| 3 | right | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r3 | no | 2 | 4 | 2 | 2 | 2 | 2 | r7 | yes | yes | yes | yes | no | no | walk |
| 5 | left | r7 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 6 | left | r8 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |

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

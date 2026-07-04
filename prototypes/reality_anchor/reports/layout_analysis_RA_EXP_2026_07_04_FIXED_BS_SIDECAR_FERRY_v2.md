# Level Analysis: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2

## Summary

- Prototype: reality_anchor
- Title: Fixed B/S sidecar ferry v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#....@PL..#
###########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 149
- Inputs: right up right up left down left up
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=1, walk=5, push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#....@PL..#
###########
```

After:

```text
###########
#####SB####
####GG#####
####M.C...#
#...#.....#
#.....@PL.#
###########
```

### Step 5: left

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
#####SB####
####GG#####
####M.C@..#
#...#.....#
#......PL.#
###########
```

After:

```text
###########
#####SB####
####GG#####
####MM@...#
#...#.....#
#......PL.#
###########
```

### Step 8: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#####SB####
####GG#####
####MM....#
#...#@....#
#......PL.#
###########
```

After:

```text
###########
#####SB####
####mm#####
####.@....#
#...#.....#
#......PL.#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 1898
- Legal transitions: 4784
- Event-only illegal transitions: 0
- Winning states: 126
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1898
- Legal transitions: 4784
- Budget: maxStates=400000
- Compressed regions: 120
- Bidirectional transitions: 4450
- Commitment transitions: 287
- Winning regions: 6
- Initial region: r0, states=20, dist=3, internalBidirectional=44, commitments=4, viableCommitments=4, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r8@5 -> r22@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=50, edges=95, winReachable=16, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=6, mergingWinSccs=7
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=21, dist=3, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@5 -> s3@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 21 | 3 | 3 | 0 | 0 | 0 | s1 | no |
| s1 | 1 | 2 | 63 | 5 | 3 | 2 | 1 | 1 | s2 | no |
| s2 | 5 | 1 | 57 | 2 | 2 | 0 | 1 | 1 | s3 | no |
| s3 | 8 | 0 | 63 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 21 | yes | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s1 | 1 | 5 | s2 | 63 | no | no | left | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s2 | 5 | 8 | s3 | 57 | no | no | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1898, regions=120, solution commitments=3
- Opening: commitments=4, viable=4, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=0/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 4 | 0 | 1 | forced optimal |
| 4 | r1 | r8 | 2 | 4 | 0 | 1 | forced optimal |
| 7 | r8 | r22 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 20 | 4 | 4 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 2 | 21 | 4 | 4 | 0 | 1 | 1 | r8 | no | no | yes |
| r8 | 5 | 1 | 19 | 3 | 3 | 0 | 1 | 1 | r22 | no | no | yes |
| r22 | 8 | 0 | 21 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 4 | 4 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 2 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | up | r1 | no | 2 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 2 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 2 | 4 | 4 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | walk |
| 5 | left | r8 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 6 | down | r8 | no | 1 | 3 | 3 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r8 | no | 1 | 3 | 3 | 0 | 1 | 1 | r22 | yes | yes | yes | yes | no | yes | walk |
| 8 | up | r22 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

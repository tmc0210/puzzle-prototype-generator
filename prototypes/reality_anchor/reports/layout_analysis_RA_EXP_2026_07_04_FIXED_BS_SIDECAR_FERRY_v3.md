# Level Analysis: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3

## Summary

- Prototype: reality_anchor
- Title: Fixed B/S sidecar ferry v3
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#####SB###
####GG####
####M.C.##
#...#...##
#....@PL.#
##########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 58
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
##########
#####SB###
####GG####
####M.C.##
#...#...##
#....@PL.#
##########
```

After:

```text
##########
#####SB###
####GG####
####M.C.##
#...#...##
#.....@PL#
##########
```

### Step 5: left

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#####SB###
####GG####
####M.C@##
#...#...##
#......PL#
##########
```

After:

```text
##########
#####SB###
####GG####
####MM@.##
#...#...##
#......PL#
##########
```

### Step 8: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#####SB###
####GG####
####MM..##
#...#@..##
#......PL#
##########
```

After:

```text
##########
#####SB###
####mm####
####.@..##
#...#...##
#......PL#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 92
- Legal transitions: 219
- Event-only illegal transitions: 0
- Winning states: 16
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 92
- Legal transitions: 219
- Budget: maxStates=400000
- Compressed regions: 7
- Bidirectional transitions: 212
- Commitment transitions: 7
- Winning regions: 1
- Initial region: r0, states=14, dist=3, internalBidirectional=30, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r5@5 -> r6@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=7, edges=7, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=14, dist=3, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s1@1 -> s2@5 -> s3@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 14 | 3 | 1 | 2 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 16 | 2 | 1 | 1 | 1 | 1 | s2 | yes |
| s2 | 5 | 1 | 14 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 8 | 0 | 16 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 14 | yes | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s1 | 1 | 5 | s2 | 16 | no | yes | left | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s2 | 5 | 8 | s3 | 14 | no | yes | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=92, regions=7, solution commitments=3
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 1 | 2 | 1 | forced optimal |
| 4 | r1 | r5 | 2 | 1 | 1 | 1 | forced optimal |
| 7 | r5 | r6 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 14 | 3 | 1 | 2 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 2 | 16 | 2 | 1 | 1 | 1 | 1 | r5 | no | yes | yes |
| r5 | 5 | 1 | 14 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes |
| r6 | 8 | 0 | 16 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 3 | 1 | 2 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | up | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 5 | left | r5 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 6 | down | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 8 | up | r6 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L shadow pull v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#...#....#
#.#.GG#@.#
##..MC...#
#L#.######
#P#.SB.###
##########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 127
- Inputs: up left left down left left down down down right left up up up right right up
- Events: walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid
- Event counts: walk=15, push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, box_to_sticky:n1=1, sticky_merge:n1=1, pull_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 10: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#...#....#
#.#.GG#..#
##..MC...#
#L#.######
#P#@SB.###
##########
```

After:

```text
##########
#...#....#
#.#.GG#..#
##..MM...#
#L#.######
#P#.@SB###
##########
```

### Step 17: up

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#...#....#
#.#.G+#..#
##..MM...#
#L#.######
#P#..SB###
##########
```

After:

```text
##########
#...#@...#
#.#.mm#..#
##.......#
#L#.######
#P#..SB###
##########
```


## Graph Facts

- Status: complete
- Reachable states: 393
- Legal transitions: 803
- Event-only illegal transitions: 0
- Winning states: 21
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 393
- Legal transitions: 803
- Budget: maxStates=400000
- Compressed regions: 42
- Bidirectional transitions: 736
- Commitment transitions: 53
- Winning regions: 1
- Initial region: r0, states=8, dist=3, internalBidirectional=18, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@4 -> r8@10 -> r25@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=30, edges=34, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=8, dist=3, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s16@4 -> s18@10 -> s20@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 8 | 2 | 1 | 1 | 0 | 0 | s16 | yes |
| s16 | 4 | 2 | 10 | 3 | 1 | 2 | 1 | 1 | s18 | yes |
| s18 | 10 | 1 | 11 | 2 | 1 | 1 | 1 | 1 | s20 | yes |
| s20 | 17 | 0 | 21 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s16 | 8 | no | yes | down | walk | has_reposition_room |
| s16 | 4 | 10 | s18 | 10 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s18 | 10 | 17 | s20 | 11 | no | yes | up | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=393, regions=42, solution commitments=3
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r3 | 3 | 1 | 1 | 1 | forced optimal |
| 9 | r3 | r8 | 2 | 1 | 2 | 1 | forced optimal |
| 16 | r8 | r25 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 8 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 4 | 2 | 10 | 3 | 1 | 2 | 1 | 1 | r8 | no | yes | yes |
| r8 | 10 | 1 | 11 | 2 | 1 | 1 | 1 | 1 | r25 | no | yes | yes |
| r25 | 17 | 0 | 21 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 4 | down | r3 | yes | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | walk |
| 10 | right | r8 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 |
| 11 | left | r8 | no | 1 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r8 | no | 1 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r8 | no | 1 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r8 | no | 1 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r8 | no | 1 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r8 | no | 1 | 2 | 1 | 1 | 1 | 1 | r25 | yes | yes | yes | yes | yes | yes | walk |
| 17 | up | r25 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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

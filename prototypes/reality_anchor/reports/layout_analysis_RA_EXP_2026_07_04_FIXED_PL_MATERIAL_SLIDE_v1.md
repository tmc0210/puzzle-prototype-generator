# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L material slide v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
####LP###
#########
#M....@.#
#.GS..M.#
#..B#G..#
#########
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 243
- Inputs: down right down left up up left left left left down left
- Events: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- Event counts: push_object:sticky#2=1, move_sticky_rigid=1, sticky_to_box:n1=1, walk=9, push_object:crate#1=1, pull_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_to_box:n1

Before:

```text
#########
####LP###
#########
#M....@.#
#.GS..M.#
#..B#G..#
#########
```

After:

```text
#########
####LP###
#########
#M......#
#.GS..@.#
#..B#GC.#
#########
```

### Step 4: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
####LP###
#########
#M......#
#.GS....#
#..B#GC@#
#########
```

After:

```text
#########
####LP###
#########
#M......#
#.GS....#
#..B#*@.#
#########
```

### Step 12: left

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
####LP###
#########
#M......#
#.+S....#
#..B#*..#
#########
```

After:

```text
#########
####LP###
#########
#M......#
#@S.....#
#.B.#*..#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 352
- Legal transitions: 791
- Event-only illegal transitions: 0
- Winning states: 3
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 352
- Legal transitions: 791
- Budget: maxStates=300000
- Compressed regions: 91
- Bidirectional transitions: 664
- Commitment transitions: 119
- Winning regions: 3
- Initial region: r0, states=11, dist=4, internalBidirectional=22, commitments=5, viableCommitments=2, deadCommitments=3, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r5@4 -> r37@10 -> r64@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=91, edges=118, winReachable=8, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=11, dist=4, out=5, winOut=2, deadOut=3
- SCC path: s0@0 -> s67@1 -> s68@4 -> s69@10 -> s72@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 11 | 5 | 2 | 3 | 0 | 0 | s67 | no |
| s67 | 1 | 3 | 11 | 3 | 1 | 2 | 1 | 1 | s68 | yes |
| s68 | 4 | 2 | 11 | 1 | 1 | 0 | 2 | 2 | s69 | yes |
| s69 | 10 | 1 | 3 | 3 | 2 | 1 | 1 | 1 | s72 | no |
| s72 | 12 | 0 | 1 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s67 | 11 | yes | no | down | push_object:sticky#2, move_sticky_rigid, sticky_to_box:n1 | scripted_same_state_handoff |
| s67 | 1 | 4 | s68 | 11 | no | yes | left | push_object:crate#1 | has_reposition_room |
| s68 | 4 | 10 | s69 | 11 | no | yes | left | walk | has_reposition_room |
| s69 | 10 | 12 | s72 | 3 | no | no | left | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=352, regions=91, solution commitments=4
- Opening: commitments=5, viable=2, dead=3, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=2/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 2 | 3 | 2 | multiple optimal choices |
| 3 | r1 | r5 | 3 | 1 | 2 | 1 | forced optimal |
| 9 | r5 | r37 | 2 | 1 | 0 | 1 | forced optimal |
| 11 | r37 | r64 | 1 | 2 | 1 | 2 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 11 | 5 | 2 | 3 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 3 | 11 | 3 | 1 | 2 | 1 | 1 | r5 | no | yes | yes |
| r5 | 4 | 2 | 11 | 1 | 1 | 0 | 1 | 1 | r37 | yes | yes | yes |
| r37 | 10 | 1 | 3 | 3 | 2 | 1 | 2 | 2 | r64 | no | no | no |
| r64 | 12 | 0 | 1 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 5 | 2 | 3 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | down | r1 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, move_sticky_rigid, sticky_to_box:n1 |
| 2 | right | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 4 | left | r5 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 5 | up | r5 | no | 2 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r5 | no | 2 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r5 | no | 2 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r5 | no | 2 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r5 | no | 2 | 1 | 1 | 0 | 1 | 1 | r37 | yes | yes | yes | yes | yes | yes | walk |
| 10 | left | r37 | yes | 1 | 3 | 2 | 1 | 2 | 2 | r37 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r37 | no | 1 | 3 | 2 | 1 | 2 | 2 | r64 | yes | yes | yes | yes | no | no | walk |
| 12 | left | r64 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |

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

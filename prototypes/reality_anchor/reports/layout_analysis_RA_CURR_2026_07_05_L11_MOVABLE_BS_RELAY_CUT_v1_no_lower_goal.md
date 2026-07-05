# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_no_lower_goal

## Summary

- Prototype: reality_anchor
- Title: L11 relay no lower goal
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#G.C.#..#
##@BS..M#
#...M..M#
#########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 41
- Inputs: right right up left left
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:crate#1
- Event counts: push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=1, walk=1, push_object:crate#1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#########
#G.C.#..#
##@BS..M#
#...M..M#
#########
```

After:

```text
#########
#G.C.#..#
##.@BS.M#
#...C..M#
#########
```

### Step 2: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#G.C.#..#
##.@BS.M#
#...C..M#
#########
```

After:

```text
#########
#G.C.#..#
##..@BSM#
#...C..M#
#########
```

### Step 4: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#G.C@#..#
##...BSM#
#...C..M#
#########
```

After:

```text
#########
#GC@.#..#
##...BSM#
#...C..M#
#########
```

### Step 5: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#GC@.#..#
##...BSM#
#...C..M#
#########
```

After:

```text
#########
#*@..#..#
##...BSM#
#...C..M#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 429
- Legal transitions: 996
- Event-only illegal transitions: 0
- Winning states: 81
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 429
- Legal transitions: 996
- Budget: maxStates=300000
- Compressed regions: 41
- Bidirectional transitions: 930
- Commitment transitions: 66
- Winning regions: 7
- Initial region: r0, states=6, dist=4, internalBidirectional=10, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r9@4 -> r10@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=41, edges=63, winReachable=23, winning=7, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=11, mergingWinSccs=10
- Handoff scriptiness: scope=returned_solution, scripted=3/4, trivial=0, sameEntryExit=3, forcedScripted=0, maxRun=2
- Initial SCC: s0, states=6, dist=4, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@4 -> s4@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 6 | 3 | 2 | 1 | 0 | 0 | s1 | no |
| s1 | 1 | 3 | 7 | 3 | 2 | 1 | 1 | 1 | s2 | no |
| s2 | 2 | 2 | 9 | 3 | 2 | 1 | 1 | 1 | s3 | no |
| s3 | 4 | 1 | 8 | 2 | 2 | 0 | 1 | 1 | s4 | no |
| s4 | 5 | 0 | 9 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 6 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 7 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s2 | 2 | 4 | s3 | 9 | no | no | left | push_object:crate#1 | has_reposition_room |
| s3 | 4 | 5 | s4 | 8 | yes | no | left | push_object:crate#1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=429, regions=41, solution commitments=4
- Opening: commitments=3, viable=2, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=4/4, forced viable commitments=0/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 2 | 1 | 1 | forced optimal |
| 1 | r1 | r3 | 3 | 2 | 1 | 1 | forced optimal |
| 3 | r3 | r9 | 2 | 2 | 1 | 1 | forced optimal |
| 4 | r9 | r10 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 6 | 3 | 2 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 3 | 7 | 3 | 2 | 1 | 1 | 1 | r3 | no | no | yes |
| r3 | 2 | 2 | 9 | 3 | 2 | 1 | 1 | 1 | r9 | no | no | yes |
| r9 | 4 | 1 | 8 | 2 | 2 | 0 | 1 | 1 | r10 | no | no | yes |
| r10 | 5 | 0 | 9 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 3 | 2 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 3 | 3 | 2 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | right | r3 | yes | 2 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 3 | up | r3 | no | 2 | 3 | 2 | 1 | 1 | 1 | r9 | yes | yes | yes | yes | no | yes | walk |
| 4 | left | r9 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 5 | left | r10 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

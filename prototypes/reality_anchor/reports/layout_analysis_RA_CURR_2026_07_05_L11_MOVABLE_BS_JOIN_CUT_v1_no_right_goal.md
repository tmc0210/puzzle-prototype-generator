# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_JOIN_CUT_v1_no_right_goal

## Summary

- Prototype: reality_anchor
- Title: L11 no right goal
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#....G#.#
#..BS#..#
##.C.MM.#
#C@#....#
#########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 36
- Inputs: up right up left up right
- Events: walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
- Event counts: walk=3, push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
#....G#.#
#..BS#..#
##@C.MM.#
#C.#....#
#########
```

After:

```text
#########
#....G#.#
#..BS#..#
##.@MMM.#
#C.#....#
#########
```

### Step 3: up

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#....G#.#
#..BS#..#
##.@MMM.#
#C.#....#
#########
```

After:

```text
#########
#..BSG#.#
#..@.#..#
##..MMM.#
#C.#....#
#########
```

### Step 6: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#########
#.@BSG#.#
#....#..#
##..MMM.#
#C.#....#
#########
```

After:

```text
#########
#..@BS#.#
#....#..#
##..CMM.#
#C.#....#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 221
- Legal transitions: 546
- Event-only illegal transitions: 0
- Winning states: 86
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 221
- Legal transitions: 546
- Budget: maxStates=300000
- Compressed regions: 17
- Bidirectional transitions: 524
- Commitment transitions: 22
- Winning regions: 6
- Initial region: r0, states=9, dist=3, internalBidirectional=18, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@3 -> r6@6
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=17, edges=18, winReachable=12, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=9, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s8@3 -> s12@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 9 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 2 | 10 | 3 | 2 | 1 | 1 | 1 | s8 | no |
| s8 | 3 | 1 | 9 | 3 | 3 | 0 | 1 | 1 | s12 | no |
| s12 | 6 | 0 | 10 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 9 | no | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s1 | 2 | 3 | s8 | 10 | yes | no | up | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s8 | 3 | 6 | s12 | 9 | no | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=221, regions=17, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=3/3, forced viable commitments=1/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r2 | 2 | 2 | 1 | 1 | forced optimal |
| 5 | r2 | r6 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 9 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 2 | 10 | 3 | 2 | 1 | 1 | 1 | r2 | no | no | yes |
| r2 | 3 | 1 | 9 | 3 | 3 | 0 | 1 | 1 | r6 | no | no | yes |
| r6 | 6 | 0 | 10 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 2 | 3 | 2 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 3 | up | r2 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 4 | left | r2 | no | 1 | 3 | 3 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r2 | no | 1 | 3 | 3 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 6 | right | r6 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |

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

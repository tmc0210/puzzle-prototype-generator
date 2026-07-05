# Level Analysis: RA_CURR_L11_SPLIT_TEMPLATE_D

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_SPLIT_TEMPLATE_D
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#.#.BS.##
#.@C.MG##
#....M###
#....MMG#
#########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 147
- Inputs: right up right left down right down down right
- Events: push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n3 walk walk push_object:crate#1 force_chain:n2 box_to_sticky:n1 walk walk push_object:crate#3 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
- Event counts: push_object:crate#1=2, walk=5, push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n3=1, force_chain:n2=2, box_to_sticky:n1=2, push_object:crate#3=1, move_sticky_rigid=1, sticky_merge:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#.#.BS.##
#.@C.MG##
#....M###
#....MMG#
#########
```

After:

```text
#########
#.#.BS.##
#..@CMG##
#....M###
#....MMG#
#########
```

### Step 3: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n3

Before:

```text
#########
#.#@BS.##
#...CMG##
#....M###
#....MMG#
#########
```

After:

```text
#########
#.#.@BS##
#...CCG##
#....C###
#....CMG#
#########
```

### Step 6: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, box_to_sticky:n1

Before:

```text
#########
#.#..BS##
#..@CCG##
#....C###
#....CMG#
#########
```

After:

```text
#########
#.#..BS##
#...@Cm##
#....C###
#....CMG#
#########
```

### Step 9: right

- Legal: true
- Events: push_object:crate#3, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
#.#..BS##
#....Cm##
#....C###
#...@CMG#
#########
```

After:

```text
#########
#.#..BS##
#....Cm##
#....C###
#....@Mm#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 1524
- Legal transitions: 4238
- Event-only illegal transitions: 0
- Winning states: 763
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1524
- Legal transitions: 4238
- Budget: maxStates=300000
- Compressed regions: 101
- Bidirectional transitions: 3976
- Commitment transitions: 262
- Winning regions: 48
- Initial region: r0, states=12, dist=4, internalBidirectional=30, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r3@3 -> r9@6 -> r20@9
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=67, edges=147, winReachable=66, winning=30, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=23, mergingWinSccs=55
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=25, dist=3, out=4, winOut=3, deadOut=1
- SCC path: s0@0 -> s1@1 -> s20@3 -> s38@6 -> s39@9

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 25 | 4 | 3 | 1 | 0 | 0 | s1 | no |
| s1 | 1 | 3 | 13 | 1 | 1 | 0 | 1 | 1 | s20 | yes |
| s20 | 3 | 2 | 28 | 5 | 5 | 0 | 2 | 2 | s38 | no |
| s38 | 6 | 1 | 15 | 1 | 1 | 0 | 2 | 2 | s39 | yes |
| s39 | 9 | 0 | 16 | 0 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 25 | yes | no | right | push_object:crate#1 | scripted_same_state_handoff |
| s1 | 1 | 3 | s20 | 13 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n3 | has_reposition_room |
| s20 | 3 | 6 | s38 | 28 | no | no | right | push_object:crate#1, force_chain:n2, box_to_sticky:n1 | has_reposition_room |
| s38 | 6 | 9 | s39 | 15 | no | yes | right | push_object:crate#3, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1524, regions=101, solution commitments=4
- Opening: commitments=3, viable=2, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=2/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 2 | 1 | 2 | multiple optimal choices |
| 2 | r1 | r3 | 3 | 1 | 0 | 1 | forced optimal |
| 5 | r3 | r9 | 2 | 4 | 0 | 2 | multiple optimal choices |
| 8 | r9 | r20 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 12 | 3 | 2 | 1 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 3 | 13 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 3 | 2 | 14 | 4 | 4 | 0 | 2 | 2 | r9 | no | no | no |
| r9 | 6 | 1 | 15 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes |
| r20 | 9 | 0 | 16 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 3 | 2 | 1 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | right | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 2 | up | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 3 | right | r3 | yes | 2 | 4 | 4 | 0 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n3 |
| 4 | left | r3 | no | 2 | 4 | 4 | 0 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r3 | no | 2 | 4 | 4 | 0 | 2 | 2 | r9 | yes | yes | yes | yes | no | no | walk |
| 6 | right | r9 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, box_to_sticky:n1 |
| 7 | down | r9 | no | 1 | 1 | 1 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r9 | no | 1 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | walk |
| 9 | right | r20 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#3, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |

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

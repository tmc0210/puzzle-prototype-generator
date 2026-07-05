# Level Analysis: RA_CURR_L11_SPLIT_TEMPLATE_A

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_SPLIT_TEMPLATE_A
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#..BS...#
#.@C.MG#.
#...M#.#.
#...MMG#.
#########
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 319
- Inputs: up right left down right right left down down right
- Events: walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk push_object:crate#1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
- Event counts: walk=6, push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n2=1, push_object:crate#1=2, force_chain:n2=2, move_sticky_rigid=2, box_to_sticky:n1=2, sticky_merge:n1=2, push_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
#########
#.@BS...#
#..C.MG#.
#...M#.#.
#...MMG#.
#########
```

After:

```text
#########
#..@BS..#
#..C.MG#.
#...C#.#.
#...CMG#.
#########
```

### Step 5: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#...BS..#
#.@C.MG#.
#...C#.#.
#...CMG#.
#########
```

After:

```text
#########
#...BS..#
#..@CMG#.
#...C#.#.
#...CMG#.
#########
```

### Step 6: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
#...BS..#
#..@CMG#.
#...C#.#.
#...CMG#.
#########
```

After:

```text
#########
#...BS..#
#...@Mm#.
#...C#.#.
#...CMG#.
#########
```

### Step 10: right

- Legal: true
- Events: push_object:crate#2, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
#...BS..#
#....Mm#.
#...C#.#.
#..@CMG#.
#########
```

After:

```text
#########
#...BS..#
#....Mm#.
#...C#.#.
#...@Mm#.
#########
```


## Graph Facts

- Status: complete
- Reachable states: 7280
- Legal transitions: 21190
- Event-only illegal transitions: 0
- Winning states: 4098
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 7280
- Legal transitions: 21190
- Budget: maxStates=300000
- Compressed regions: 497
- Bidirectional transitions: 19312
- Commitment transitions: 1878
- Winning regions: 269
- Initial region: r0, states=10, dist=4, internalBidirectional=26, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@2 -> r7@5 -> r14@6 -> r51@10
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=259, edges=824, winReachable=259, winning=124, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=121, mergingWinSccs=228
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=10, dist=3, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s2@2 -> s210@5 -> s211@6 -> s217@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 10 | 2 | 2 | 0 | 0 | 0 | s2 | no |
| s2 | 2 | 2 | 23 | 6 | 6 | 0 | 1 | 1 | s210 | no |
| s210 | 5 | 2 | 12 | 3 | 3 | 0 | 2 | 2 | s211 | no |
| s211 | 6 | 1 | 13 | 2 | 2 | 0 | 2 | 2 | s217 | no |
| s217 | 10 | 0 | 14 | 3 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s2 | 10 | no | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2 | has_reposition_room |
| s2 | 2 | 5 | s210 | 23 | no | no | right | push_object:crate#1 | has_reposition_room |
| s210 | 5 | 6 | s211 | 12 | yes | no | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s211 | 6 | 10 | s217 | 13 | no | no | right | push_object:crate#2, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=7280, regions=497, solution commitments=4
- Opening: commitments=2, viable=2, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=0/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r2 | 4 | 2 | 0 | 2 | multiple optimal choices |
| 4 | r2 | r7 | 3 | 5 | 0 | 5 | multiple optimal choices |
| 5 | r7 | r14 | 2 | 3 | 0 | 2 | multiple optimal choices |
| 9 | r14 | r51 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 10 | 2 | 2 | 0 | 2 | 2 | r2 | no | no | no |
| r2 | 2 | 3 | 11 | 5 | 5 | 0 | 5 | 5 | r7 | no | no | no |
| r7 | 5 | 2 | 12 | 3 | 3 | 0 | 2 | 2 | r14 | no | no | no |
| r14 | 6 | 1 | 13 | 2 | 2 | 0 | 1 | 1 | r51 | no | no | yes |
| r51 | 10 | 0 | 14 | 3 | 3 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 2 | 2 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 4 | 2 | 2 | 0 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 2 | right | r2 | yes | 3 | 5 | 5 | 0 | 5 | 5 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2 |
| 3 | left | r2 | no | 3 | 5 | 5 | 0 | 5 | 5 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r2 | no | 3 | 5 | 5 | 0 | 5 | 5 | r7 | yes | yes | yes | yes | no | no | walk |
| 5 | right | r7 | yes | 2 | 3 | 3 | 0 | 2 | 2 | r14 | yes | yes | yes | yes | no | no | push_object:crate#1 |
| 6 | right | r14 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 7 | left | r14 | no | 1 | 2 | 2 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r14 | no | 1 | 2 | 2 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r14 | no | 1 | 2 | 2 | 0 | 1 | 1 | r51 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r51 | yes | 0 | 3 | 3 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |

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

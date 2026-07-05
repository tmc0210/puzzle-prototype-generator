# Level Analysis: RA_CURR_L11_SPLIT_TEMPLATE_F

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_SPLIT_TEMPLATE_F
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#.#.BS.###
#.@C..MG##
#....M#.##
#....MMG##
##########
```

## Shortest Solution

- Found: yes
- Cost: 11
- Depth: 11
- Explored states: 288
- Inputs: right up right left down right right left down down right
- Events: push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk push_object:crate#1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
- Event counts: push_object:crate#1=3, walk=6, push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n2=1, force_chain:n2=2, move_sticky_rigid=2, box_to_sticky:n1=2, sticky_merge:n1=2, push_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#.#.BS.###
#.@C..MG##
#....M#.##
#....MMG##
##########
```

After:

```text
##########
#.#.BS.###
#..@C.MG##
#....M#.##
#....MMG##
##########
```

### Step 3: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
##########
#.#@BS.###
#...C.MG##
#....M#.##
#....MMG##
##########
```

After:

```text
##########
#.#.@BS###
#...C.MG##
#....C#.##
#....CMG##
##########
```

### Step 6: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#.#..BS###
#..@C.MG##
#....C#.##
#....CMG##
##########
```

After:

```text
##########
#.#..BS###
#...@CMG##
#....C#.##
#....CMG##
##########
```

### Step 7: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#.#..BS###
#...@CMG##
#....C#.##
#....CMG##
##########
```

After:

```text
##########
#.#..BS###
#....@Mm##
#....C#.##
#....CMG##
##########
```

### Step 11: right

- Legal: true
- Events: push_object:crate#2, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#.#..BS###
#.....Mm##
#....C#.##
#...@CMG##
##########
```

After:

```text
##########
#.#..BS###
#.....Mm##
#....C#.##
#....@Mm##
##########
```


## Graph Facts

- Status: complete
- Reachable states: 2655
- Legal transitions: 7403
- Event-only illegal transitions: 0
- Winning states: 1098
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2655
- Legal transitions: 7403
- Budget: maxStates=300000
- Compressed regions: 167
- Bidirectional transitions: 6940
- Commitment transitions: 463
- Winning regions: 66
- Initial region: r0, states=13, dist=4, internalBidirectional=32, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r4@3 -> r8@6 -> r14@7 -> r34@11
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=111, edges=262, winReachable=104, winning=41, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=42, mergingWinSccs=90
- Handoff scriptiness: scope=returned_solution, scripted=2/5, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=27, dist=3, out=5, winOut=4, deadOut=1
- SCC path: s0@0 -> s1@1 -> s31@3 -> s44@6 -> s68@7 -> s70@11

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 27 | 5 | 4 | 1 | 0 | 0 | s1 | no |
| s1 | 1 | 3 | 13 | 2 | 2 | 0 | 1 | 1 | s31 | no |
| s31 | 3 | 2 | 29 | 5 | 5 | 0 | 2 | 2 | s44 | no |
| s44 | 6 | 2 | 15 | 2 | 2 | 0 | 2 | 2 | s68 | no |
| s68 | 7 | 1 | 16 | 1 | 1 | 0 | 2 | 2 | s70 | yes |
| s70 | 11 | 0 | 17 | 2 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 27 | yes | no | right | push_object:crate#1 | scripted_same_state_handoff |
| s1 | 1 | 3 | s31 | 13 | no | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2 | has_reposition_room |
| s31 | 3 | 6 | s44 | 29 | no | no | right | push_object:crate#1 | has_reposition_room |
| s44 | 6 | 7 | s68 | 15 | yes | no | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s68 | 7 | 11 | s70 | 16 | no | yes | right | push_object:crate#2, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2655, regions=167, solution commitments=5
- Opening: commitments=4, viable=3, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 3 | 1 | 2 | multiple optimal choices |
| 2 | r1 | r4 | 4 | 2 | 0 | 2 | multiple optimal choices |
| 5 | r4 | r8 | 3 | 4 | 0 | 4 | multiple optimal choices |
| 6 | r8 | r14 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 10 | r14 | r34 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 13 | 4 | 3 | 1 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 4 | 13 | 2 | 2 | 0 | 2 | 2 | r4 | no | no | no |
| r4 | 3 | 3 | 14 | 4 | 4 | 0 | 4 | 4 | r8 | no | no | no |
| r8 | 6 | 2 | 15 | 2 | 2 | 0 | 2 | 2 | r14 | no | no | no |
| r14 | 7 | 1 | 16 | 1 | 1 | 0 | 1 | 1 | r34 | yes | yes | yes |
| r34 | 11 | 0 | 17 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 4 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 2 | up | r1 | no | 4 | 2 | 2 | 0 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 3 | right | r4 | yes | 3 | 4 | 4 | 0 | 4 | 4 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2 |
| 4 | left | r4 | no | 3 | 4 | 4 | 0 | 4 | 4 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r4 | no | 3 | 4 | 4 | 0 | 4 | 4 | r8 | yes | yes | yes | yes | no | no | walk |
| 6 | right | r8 | yes | 2 | 2 | 2 | 0 | 2 | 2 | r14 | yes | yes | yes | yes | no | no | push_object:crate#1 |
| 7 | right | r14 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 8 | left | r14 | no | 1 | 1 | 1 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r14 | no | 1 | 1 | 1 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r14 | no | 1 | 1 | 1 | 0 | 1 | 1 | r34 | yes | yes | yes | yes | yes | yes | walk |
| 11 | right | r34 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |

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

# Level Analysis: RA_CURR_L11_APP_SCRATCHC_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: no_top
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
##....###
##.BS#..#
##.C.MM.#
#.@#...##
####G####
#########
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 91
- Inputs: up right up left up right down right down down
- Events: walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1
- Event counts: walk=5, push_object:crate#1=3, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
##....###
##.BS#..#
##@C.MM.#
#..#...##
####G####
#########
```

After:

```text
#########
##....###
##.BS#..#
##.@MMM.#
#..#...##
####G####
#########
```

### Step 3: up

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
##....###
##.BS#..#
##.@MMM.#
#..#...##
####G####
#########
```

After:

```text
#########
##.BS.###
##.@.#..#
##..MMM.#
#..#...##
####G####
#########
```

### Step 6: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#########
##@BS.###
##...#..#
##..MMM.#
#..#...##
####G####
#########
```

After:

```text
#########
##.@BS###
##...#..#
##..CMM.#
#..#...##
####G####
#########
```

### Step 9: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
##..BS###
##..@#..#
##..CMM.#
#..#...##
####G####
#########
```

After:

```text
#########
##..BS###
##...#..#
##..@MM.#
#..#C..##
####G####
#########
```

### Step 10: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
##..BS###
##...#..#
##..@MM.#
#..#C..##
####G####
#########
```

After:

```text
#########
##..BS###
##...#..#
##...MM.#
#..#@..##
####*####
#########
```


## Graph Facts

- Status: complete
- Reachable states: 284
- Legal transitions: 680
- Event-only illegal transitions: 0
- Winning states: 86
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 284
- Legal transitions: 680
- Budget: maxStates=300000
- Compressed regions: 23
- Bidirectional transitions: 650
- Commitment transitions: 30
- Winning regions: 6
- Initial region: r0, states=8, dist=5, internalBidirectional=14, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@3 -> r6@6 -> r9@9 -> r11@10
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=23, edges=27, winReachable=19, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=1/5, branchingWinSccs=5, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=2/5, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=8, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s10@3 -> s15@6 -> s16@9 -> s19@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 8 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 4 | 9 | 3 | 2 | 1 | 1 | 1 | s10 | no |
| s10 | 3 | 3 | 8 | 3 | 2 | 1 | 1 | 1 | s15 | no |
| s15 | 6 | 2 | 9 | 2 | 1 | 1 | 1 | 1 | s16 | yes |
| s16 | 9 | 1 | 10 | 2 | 2 | 0 | 1 | 1 | s19 | no |
| s19 | 10 | 0 | 13 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 8 | no | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s1 | 2 | 3 | s10 | 9 | yes | no | up | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s10 | 3 | 6 | s15 | 8 | no | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s15 | 6 | 9 | s16 | 9 | no | yes | down | push_object:crate#1 | has_reposition_room |
| s16 | 9 | 10 | s19 | 10 | yes | no | down | push_object:crate#1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=284, regions=23, solution commitments=5
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/5, optimal prefix=1/5, forced viable commitments=2/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 5 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r2 | 4 | 2 | 1 | 2 | multiple optimal choices |
| 5 | r2 | r6 | 3 | 2 | 1 | 2 | multiple optimal choices |
| 8 | r6 | r9 | 2 | 1 | 1 | 1 | forced optimal |
| 9 | r9 | r11 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 8 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 4 | 9 | 3 | 2 | 1 | 2 | 2 | r2 | no | no | no |
| r2 | 3 | 3 | 8 | 3 | 2 | 1 | 2 | 2 | r6 | no | no | no |
| r6 | 6 | 2 | 9 | 2 | 1 | 1 | 1 | 1 | r9 | no | yes | yes |
| r9 | 9 | 1 | 10 | 2 | 2 | 0 | 1 | 1 | r11 | no | no | yes |
| r11 | 10 | 0 | 13 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 4 | 3 | 2 | 1 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 3 | up | r2 | yes | 3 | 3 | 2 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 4 | left | r2 | no | 3 | 3 | 2 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r2 | no | 3 | 3 | 2 | 1 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 6 | right | r6 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 7 | down | r6 | no | 2 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r6 | no | 2 | 2 | 1 | 1 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | walk |
| 9 | down | r9 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r11 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 10 | down | r11 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

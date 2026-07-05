# Level Analysis: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
##....###
##.BS#G.#
##.C.MM.#
##@#...##
#########
```

## Shortest Solution

- Found: yes
- Cost: 13
- Depth: 13
- Explored states: 129
- Inputs: up right up left up right down right down right down right up
- Events: walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid
- Event counts: walk=7, push_object:crate#1=2, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=1, push_object:sticky#1=2, move_sticky_rigid=2

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
##.BS#G.#
##@C.MM.#
##.#...##
#########
```

After:

```text
#########
##....###
##.BS#G.#
##.@MMM.#
##.#...##
#########
```

### Step 3: up

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
##....###
##.BS#G.#
##.@MMM.#
##.#...##
#########
```

After:

```text
#########
##.BS.###
##.@.#G.#
##..MMM.#
##.#...##
#########
```

### Step 6: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#########
##@BS.###
##...#G.#
##..MMM.#
##.#...##
#########
```

After:

```text
#########
##.@BS###
##...#G.#
##..CMM.#
##.#...##
#########
```

### Step 9: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
##..BS###
##..@#G.#
##..CMM.#
##.#...##
#########
```

After:

```text
#########
##..BS###
##...#G.#
##..@MM.#
##.#C..##
#########
```

### Step 10: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
##..BS###
##...#G.#
##..@MM.#
##.#C..##
#########
```

After:

```text
#########
##..BS###
##...#G.#
##...@MM#
##.#C..##
#########
```

### Step 13: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
##..BS###
##...#G.#
##....MM#
##.#C.@##
#########
```

After:

```text
#########
##..BS###
##...#mM#
##....@.#
##.#C..##
#########
```


## Graph Facts

- Status: complete
- Reachable states: 178
- Legal transitions: 423
- Event-only illegal transitions: 0
- Winning states: 14
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 178
- Legal transitions: 423
- Budget: maxStates=300000
- Compressed regions: 17
- Bidirectional transitions: 402
- Commitment transitions: 21
- Winning regions: 1
- Initial region: r0, states=7, dist=6, internalBidirectional=12, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@3 -> r6@6 -> r9@9 -> r11@10 -> r16@13
- Forced commitment prefix length: 1
- Forced viable prefix length: 6
- Forced optimal prefix length: 6

### SCC Irreversible Progress

- Shape: sccs=17, edges=18, winReachable=7, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=6, forcedWinPrefix=6/6, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=2/6, trivial=0, sameEntryExit=2, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=7, dist=6, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s8@3 -> s12@6 -> s13@9 -> s14@10 -> s15@13

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 7 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 5 | 8 | 3 | 1 | 2 | 1 | 1 | s8 | yes |
| s8 | 3 | 4 | 7 | 3 | 1 | 2 | 1 | 1 | s12 | yes |
| s12 | 6 | 3 | 8 | 2 | 1 | 1 | 1 | 1 | s13 | yes |
| s13 | 9 | 2 | 9 | 1 | 1 | 0 | 1 | 1 | s14 | yes |
| s14 | 10 | 1 | 12 | 1 | 1 | 0 | 1 | 1 | s15 | yes |
| s15 | 13 | 0 | 14 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 7 | no | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s1 | 2 | 3 | s8 | 8 | yes | yes | up | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s8 | 3 | 6 | s12 | 7 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s12 | 6 | 9 | s13 | 8 | no | yes | down | push_object:crate#1 | has_reposition_room |
| s13 | 9 | 10 | s14 | 9 | yes | yes | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |
| s14 | 10 | 13 | s15 | 12 | no | yes | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=178, regions=17, solution commitments=6
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=6/6, optimal prefix=6/6, forced viable commitments=6/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 6 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r2 | 5 | 1 | 2 | 1 | forced optimal |
| 5 | r2 | r6 | 4 | 1 | 2 | 1 | forced optimal |
| 8 | r6 | r9 | 3 | 1 | 1 | 1 | forced optimal |
| 9 | r9 | r11 | 2 | 1 | 0 | 1 | forced optimal |
| 12 | r11 | r16 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 7 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 5 | 8 | 3 | 1 | 2 | 1 | 1 | r2 | no | yes | yes |
| r2 | 3 | 4 | 7 | 3 | 1 | 2 | 1 | 1 | r6 | no | yes | yes |
| r6 | 6 | 3 | 8 | 2 | 1 | 1 | 1 | 1 | r9 | no | yes | yes |
| r9 | 9 | 2 | 9 | 1 | 1 | 0 | 1 | 1 | r11 | yes | yes | yes |
| r11 | 10 | 1 | 12 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes |
| r16 | 13 | 0 | 14 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 5 | 3 | 1 | 2 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 3 | up | r2 | yes | 4 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 4 | left | r2 | no | 4 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r2 | no | 4 | 3 | 1 | 2 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r6 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 7 | down | r6 | no | 3 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r6 | no | 3 | 2 | 1 | 1 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | walk |
| 9 | down | r9 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r11 | yes | yes | yes | yes | yes | yes | push_object:crate#1 |
| 10 | right | r11 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 11 | down | r11 | no | 1 | 1 | 1 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r11 | no | 1 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes | yes | yes | yes | walk |
| 13 | up | r16 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

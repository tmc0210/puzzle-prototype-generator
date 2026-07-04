# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L phase nudge v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
####PL##
########
#.#M..M#
#GC...G#
#@BS...#
########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 155
- Inputs: right right up left right right right right down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#2 walk walk walk walk pull_object:sticky#1 move_sticky_rigid
- Event counts: push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=1, walk=5, push_object:crate#2=1, pull_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
########
####PL##
########
#.#M..M#
#GC...G#
#@BS...#
########
```

After:

```text
########
####PL##
########
#.#C..M#
#GC...G#
#.@BS..#
########
```

### Step 2: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
########
####PL##
########
#.#C..M#
#GC...G#
#.@BS..#
########
```

After:

```text
########
####PL##
########
#.#C..M#
#GC...G#
#..@BS.#
########
```

### Step 4: left

- Legal: true
- Events: push_object:crate#2

Before:

```text
########
####PL##
########
#.#C..M#
#GC@..G#
#...BS.#
########
```

After:

```text
########
####PL##
########
#.#C..M#
#*@...G#
#...BS.#
########
```

### Step 9: down

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
########
####PL##
########
#.#C..M#
#*....+#
#...BS.#
########
```

After:

```text
########
####PL##
########
#.#C...#
#*....m#
#...BS@#
########
```


## Graph Facts

- Status: complete
- Reachable states: 620
- Legal transitions: 1438
- Event-only illegal transitions: 0
- Winning states: 13
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 620
- Legal transitions: 1438
- Budget: maxStates=300000
- Compressed regions: 87
- Bidirectional transitions: 1292
- Commitment transitions: 145
- Winning regions: 3
- Initial region: r0, states=3, dist=4, internalBidirectional=4, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r8@4 -> r35@9
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=66, edges=95, winReachable=14, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=6, mergingWinSccs=5
- Handoff scriptiness: scope=returned_solution, scripted=2/4, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=2
- Initial SCC: s0, states=3, dist=4, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2 -> s6@4 -> s7@9

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 3 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 1 | 3 | 4 | 2 | 2 | 0 | 1 | 1 | s2 | no |
| s2 | 2 | 2 | 25 | 5 | 4 | 1 | 1 | 1 | s6 | no |
| s6 | 4 | 1 | 23 | 3 | 2 | 1 | 1 | 1 | s7 | no |
| s7 | 9 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 3 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 4 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s2 | 2 | 4 | s6 | 25 | no | no | left | push_object:crate#2 | has_reposition_room |
| s6 | 4 | 9 | s7 | 23 | no | no | down | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=620, regions=87, solution commitments=4
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=4/4, forced viable commitments=0/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 2 | 0 | 1 | forced optimal |
| 1 | r1 | r3 | 3 | 2 | 0 | 1 | forced optimal |
| 3 | r3 | r8 | 2 | 5 | 1 | 1 | forced optimal |
| 8 | r8 | r35 | 1 | 4 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 3 | 2 | 2 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 3 | 4 | 2 | 2 | 0 | 1 | 1 | r3 | no | no | yes |
| r3 | 2 | 2 | 10 | 6 | 5 | 1 | 1 | 1 | r8 | no | no | yes |
| r8 | 4 | 1 | 9 | 5 | 4 | 1 | 1 | 1 | r35 | no | no | yes |
| r35 | 9 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 2 | 2 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 3 | 2 | 2 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | right | r3 | yes | 2 | 6 | 5 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 3 | up | r3 | no | 2 | 6 | 5 | 1 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | walk |
| 4 | left | r8 | yes | 1 | 5 | 4 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |
| 5 | right | r8 | no | 1 | 5 | 4 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r8 | no | 1 | 5 | 4 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r8 | no | 1 | 5 | 4 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r8 | no | 1 | 5 | 4 | 1 | 1 | 1 | r35 | yes | yes | yes | yes | no | yes | walk |
| 9 | down | r35 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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

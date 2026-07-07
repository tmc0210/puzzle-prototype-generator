# Level Analysis: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_mid_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_mid_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#PLB.C.#
#@MS..G#
#....#.#
#M....##
########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 94
- Inputs: down right right right up right right down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1
- Event counts: walk=5, pull_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, force_chain:n2=1, pull_object:crate#1=1, box_to_sticky:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
########
#PLB.C.#
#.MS@.G#
#....#.#
#M....##
########
```

After:

```text
########
#PL.BC.#
#.M.S@G#
#....#.#
#M....##
########
```

### Step 7: right

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
########
#PL.BC.#
#.M.S@G#
#....#.#
#M....##
########
```

After:

```text
########
#PL..BC#
#.M..S+#
#....#.#
#M....##
########
```

### Step 8: down

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1

Before:

```text
########
#PL..BC#
#.M..S+#
#....#.#
#M....##
########
```

After:

```text
########
#PL..B.#
#.M..Sm#
#....#@#
#M....##
########
```


## Graph Facts

- Status: complete
- Reachable states: 482
- Legal transitions: 866
- Event-only illegal transitions: 0
- Winning states: 5
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 482
- Legal transitions: 866
- Budget: maxStates=500000
- Compressed regions: 207
- Bidirectional transitions: 554
- Commitment transitions: 303
- Winning regions: 5
- Initial region: r0, states=10, dist=3, internalBidirectional=18, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r22@6 -> r35@7 -> r52@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=172, edges=226, winReachable=32, winning=5, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=5, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=2, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=11, dist=3, out=5, winOut=4, deadOut=1
- SCC path: s0@0 -> s140@6 -> s141@7 -> s142@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 11 | 5 | 4 | 1 | 0 | 0 | s140 | no |
| s140 | 6 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | s141 | yes |
| s141 | 7 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s142 | yes |
| s142 | 8 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s140 | 11 | no | no | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s140 | 6 | 7 | s141 | 1 | yes | yes | right | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s141 | 7 | 8 | s142 | 1 | yes | yes | down | pull_object:crate#1, box_to_sticky:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=482, regions=207, solution commitments=3
- Opening: commitments=5, viable=4, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=2/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r22 | 3 | 4 | 1 | 1 | forced optimal |
| 6 | r22 | r35 | 2 | 1 | 0 | 1 | forced optimal |
| 7 | r35 | r52 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 10 | 5 | 4 | 1 | 1 | 1 | r22 | no | no | yes |
| r22 | 6 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r35 | yes | yes | yes |
| r35 | 7 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r52 | yes | yes | yes |
| r52 | 8 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 5 | 4 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 3 | 5 | 4 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 3 | 5 | 4 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 3 | 5 | 4 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 3 | 5 | 4 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 3 | 5 | 4 | 1 | 1 | 1 | r22 | yes | yes | yes | yes | no | yes | walk |
| 6 | right | r22 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r35 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 7 | right | r35 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r52 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky |
| 8 | down | r52 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1, box_to_sticky:n1 |

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

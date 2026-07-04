# Level Analysis: RA_EXP_2026_07_04_SOFT_HANDOFF_v2

## Summary

- Prototype: reality_anchor
- Title: Soft handoff v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#...G.@.#
#C.GLP.##
#BS#.#..#
#########
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 67
- Inputs: left left left left down up right right right right down left
- Events: walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: walk=7, pull_object:box_sticky_anchor=1, force_chain:n2=1, anchor_boundary_shift:box_sticky=1, pull_object:crate#1=1, box_to_sticky:n1=1, pull_object:sticky#1=2, move_sticky_rigid=2, push_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: up

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
#########
#...G...#
#C@GLP.##
#BS#.#..#
#########
```

After:

```text
#########
#C@.G...#
#BSGLP.##
#..#.#..#
#########
```

### Step 7: right

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1

Before:

```text
#########
#C@.G...#
#BSGLP.##
#..#.#..#
#########
```

After:

```text
#########
#.M@G...#
#BSGLP.##
#..#.#..#
#########
```

### Step 8: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#.M@G...#
#BSGLP.##
#..#.#..#
#########
```

After:

```text
#########
#..M+...#
#BSGLP.##
#..#.#..#
#########
```

### Step 9: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#..M+...#
#BSGLP.##
#..#.#..#
#########
```

After:

```text
#########
#...m@..#
#BSGLP.##
#..#.#..#
#########
```

### Step 12: left

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#...m...#
#BSGLP@##
#..#.#..#
#########
```

After:

```text
#########
#...m...#
#BSLP@.##
#..#.#..#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 90
- Legal transitions: 177
- Event-only illegal transitions: 0
- Winning states: 7
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 90
- Legal transitions: 177
- Budget: maxStates=300000
- Compressed regions: 17
- Bidirectional transitions: 158
- Commitment transitions: 19
- Winning regions: 1
- Initial region: r0, states=11, dist=5, internalBidirectional=20, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r4@5 -> r6@6 -> r9@7 -> r10@8 -> r13@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 5
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=17, edges=19, winReachable=6, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=5, forcedWinPrefix=5/5, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=3/5, trivial=2, sameEntryExit=3, forcedScripted=3, maxRun=3
- Initial SCC: s0, states=11, dist=5, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s1@5 -> s8@6 -> s9@7 -> s10@8 -> s11@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 11 | 3 | 1 | 2 | 0 | 0 | s1 | yes |
| s1 | 5 | 4 | 1 | 2 | 1 | 1 | 1 | 1 | s8 | yes |
| s8 | 6 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s9 | yes |
| s9 | 7 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | s10 | yes |
| s10 | 8 | 1 | 7 | 1 | 1 | 0 | 1 | 1 | s11 | yes |
| s11 | 12 | 0 | 7 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 11 | no | yes | down | walk | has_reposition_room |
| s1 | 5 | 6 | s8 | 1 | yes | yes | up | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s8 | 6 | 7 | s9 | 1 | yes | yes | right | pull_object:crate#1, box_to_sticky:n1 | scripted_trivial_scc |
| s9 | 7 | 8 | s10 | 2 | yes | yes | right | pull_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |
| s10 | 8 | 12 | s11 | 7 | no | yes | left | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=90, regions=17, solution commitments=5
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=5/5, optimal prefix=5/5, forced viable commitments=5/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r4 | 5 | 1 | 2 | 1 | forced optimal |
| 5 | r4 | r6 | 4 | 1 | 1 | 1 | forced optimal |
| 6 | r6 | r9 | 3 | 1 | 0 | 1 | forced optimal |
| 7 | r9 | r10 | 2 | 1 | 0 | 1 | forced optimal |
| 11 | r10 | r13 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 11 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 5 | 4 | 1 | 2 | 1 | 1 | 1 | 1 | r6 | no | yes | yes |
| r6 | 6 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r9 | yes | yes | yes |
| r9 | 7 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | r10 | yes | yes | yes |
| r10 | 8 | 1 | 7 | 1 | 1 | 0 | 1 | 1 | r13 | yes | yes | yes |
| r13 | 12 | 0 | 7 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 5 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 5 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 5 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 5 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 5 | down | r4 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 6 | up | r6 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky |
| 7 | right | r9 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | pull_object:crate#1, box_to_sticky:n1 |
| 8 | right | r10 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |
| 9 | right | r10 | no | 1 | 1 | 1 | 0 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |
| 10 | right | r10 | no | 1 | 1 | 1 | 0 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r10 | no | 1 | 1 | 1 | 0 | 1 | 1 | r13 | yes | yes | yes | yes | yes | yes | walk |
| 12 | left | r13 | yes | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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

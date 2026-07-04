# Level Analysis: RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed B/S sticky handle v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
####BS###
#########
#@PLG...#
#...C.MG#
#########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 25
- Inputs: right right down right right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=2, walk=1, push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####BS###
#########
#@PLG...#
#...C.MG#
#########
```

After:

```text
#########
####BS###
#########
#.@PL...#
#...C.MG#
#########
```

### Step 2: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####BS###
#########
#.@PL...#
#...C.MG#
#########
```

After:

```text
#########
####BS###
#########
#..@PL..#
#...C.MG#
#########
```

### Step 4: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
####BS###
#########
#...PL..#
#..@C.MG#
#########
```

After:

```text
#########
####BS###
#########
#...PL..#
#...@MMG#
#########
```

### Step 5: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
####BS###
#########
#...PL..#
#...@MMG#
#########
```

After:

```text
#########
####BS###
#########
#...PL..#
#....@Mm#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 217
- Legal transitions: 534
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 217
- Legal transitions: 534
- Budget: maxStates=300000
- Compressed regions: 28
- Bidirectional transitions: 486
- Commitment transitions: 48
- Winning regions: 1
- Initial region: r0, states=3, dist=3, internalBidirectional=4, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r6@4
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=23, edges=35, winReachable=9, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=2
- Initial SCC: s0, states=3, dist=3, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s6@1 -> s11@2 -> s18@4

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 3 | 2 | 2 | 0 | 0 | 0 | s6 | no |
| s6 | 1 | 2 | 5 | 2 | 2 | 0 | 2 | 2 | s11 | no |
| s11 | 2 | 1 | 6 | 2 | 1 | 1 | 2 | 2 | s18 | yes |
| s18 | 4 | 0 | 8 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s6 | 3 | yes | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s6 | 1 | 2 | s11 | 5 | yes | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s11 | 2 | 4 | s18 | 6 | no | yes | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=217, regions=28, solution commitments=3
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=1/3
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 2 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 2 | 2 | 0 | 1 | forced optimal |
| 3 | r2 | r6 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 3 | 2 | 2 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 2 | 5 | 2 | 2 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 2 | 1 | 6 | 2 | 1 | 1 | 1 | 1 | r6 | no | yes | yes |
| r6 | 4 | 0 | 8 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | right | r2 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | down | r2 | no | 1 | 2 | 1 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 4 | right | r6 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 5 | right | r6 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

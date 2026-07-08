# Level Analysis: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#..GG###
#@CC...#
###....#
###BS###
########
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 335
- Inputs: right right down right right right up left down left up down left up
- Events: push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:crate#1
- Event counts: push_object:crate#1=3, force_chain:n2=2, box_to_sticky:n1=2, move_sticky_rigid=3, sticky_merge:n1=1, walk=9, push_object:sticky#1=2, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, box_to_sticky:n1

Before:

```text
########
#..GG###
#@CC...#
###....#
###BS###
########
```

After:

```text
########
#..GG###
#.@CM..#
###....#
###BS###
########
```

### Step 2: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
########
#..GG###
#.@CM..#
###....#
###BS###
########
```

After:

```text
########
#..GG###
#..@MM.#
###....#
###BS###
########
```

### Step 8: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
########
#..GG###
#...MM@#
###....#
###BS###
########
```

After:

```text
########
#..GG###
#..CM@.#
###....#
###BS###
########
```

### Step 11: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
#..GG###
#..CM..#
###.@..#
###BS###
########
```

After:

```text
########
#..Gm###
#..C@..#
###....#
###BS###
########
```

### Step 14: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
########
#..Gm###
#..C...#
###@...#
###BS###
########
```

After:

```text
########
#..*m###
#..@...#
###....#
###BS###
########
```


## Graph Facts

- Status: complete
- Reachable states: 901
- Legal transitions: 2263
- Event-only illegal transitions: 0
- Winning states: 3
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 901
- Legal transitions: 2263
- Budget: maxStates=300000
- Compressed regions: 83
- Bidirectional transitions: 2100
- Commitment transitions: 163
- Winning regions: 3
- Initial region: r0, states=12, dist=5, internalBidirectional=26, commitments=4, viableCommitments=1, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r19@8 -> r29@11 -> r38@14
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=57, edges=99, winReachable=14, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=3, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=36, dist=2, out=8, winOut=2, deadOut=6
- SCC path: s0@0 -> s8@11 -> s21@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 36 | 8 | 2 | 6 | 0 | 0 | s8 | no |
| s8 | 11 | 1 | 7 | 2 | 2 | 0 | 1 | 1 | s21 | no |
| s21 | 14 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 11 | s8 | 36 | no | no | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s8 | 11 | 14 | s21 | 7 | no | no | up | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=901, regions=83, solution commitments=5
- Opening: commitments=4, viable=1, dead=3, optimal=1
- Win-continuation prefix: viable prefix=3/5, optimal prefix=3/5, forced viable commitments=3/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 3 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 1 | 3 | 1 | forced optimal |
| 1 | r1 | r2 | 4 | 1 | 2 | 1 | forced optimal |
| 7 | r2 | r19 | 3 | 1 | 2 | 1 | forced optimal |
| 10 | r19 | r29 | 2 | 3 | 0 | 2 | multiple optimal choices |
| 13 | r29 | r38 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 12 | 4 | 1 | 3 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 4 | 6 | 3 | 1 | 2 | 1 | 1 | r2 | no | yes | yes |
| r2 | 2 | 3 | 12 | 3 | 1 | 2 | 1 | 1 | r19 | no | yes | yes |
| r19 | 8 | 2 | 6 | 3 | 3 | 0 | 2 | 2 | r29 | no | no | no |
| r29 | 11 | 1 | 7 | 2 | 2 | 0 | 1 | 1 | r38 | no | no | yes |
| r38 | 14 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 4 | 1 | 3 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 4 | 3 | 1 | 2 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2, box_to_sticky:n1 |
| 2 | right | r2 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 3 | down | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r19 | yes | yes | yes | yes | yes | yes | walk |
| 8 | left | r19 | yes | 2 | 3 | 3 | 0 | 2 | 2 | r19 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 9 | down | r19 | no | 2 | 3 | 3 | 0 | 2 | 2 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r19 | no | 2 | 3 | 3 | 0 | 2 | 2 | r29 | yes | yes | yes | yes | no | no | walk |
| 11 | up | r29 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 12 | down | r29 | no | 1 | 2 | 2 | 0 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r29 | no | 1 | 2 | 2 | 0 | 1 | 1 | r38 | yes | yes | yes | yes | no | yes | walk |
| 14 | up | r38 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

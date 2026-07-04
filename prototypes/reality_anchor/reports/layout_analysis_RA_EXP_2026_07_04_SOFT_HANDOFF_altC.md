# Level Analysis: RA_EXP_2026_07_04_SOFT_HANDOFF_altC

## Summary

- Prototype: reality_anchor
- Title: Soft handoff altC
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#.MGG..##
#.@SB...#
#..LPC..#
#########
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 62
- Inputs: down left up up right right right right down right down left left up
- Events: pull_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:crate#1 push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- Event counts: pull_object:sticky#1=1, move_sticky_rigid=1, pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=2, walk=9, push_object:crate#1=2, force_chain:n2=1, box_to_sticky:n1=1, push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#.MGG..##
#.@SB...#
#..LPC..#
#########
```

After:

```text
#########
#..GG..##
#.MSB...#
#.@LPC..#
#########
```

### Step 2: left

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#..GG..##
#.MSB...#
#.@LPC..#
#########
```

After:

```text
#########
#..GG..##
#.MSB...#
#@LP.C..#
#########
```

### Step 12: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#..GG..##
#.MSB...#
#.LP.C@.#
#########
```

After:

```text
#########
#..GG..##
#.MSB...#
#.LPC@..#
#########
```

### Step 13: left

- Legal: true
- Events: push_object:crate#1, force_chain:n2, anchor_boundary_shift:push_pull, box_to_sticky:n1

Before:

```text
#########
#..GG..##
#.MSB...#
#.LPC@..#
#########
```

After:

```text
#########
#..GG..##
#.MSB...#
#LPM@...#
#########
```

### Step 14: up

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#..GG..##
#.MSB...#
#LPM@...#
#########
```

After:

```text
#########
#..SB..##
#.M.@...#
#LPM....#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 385
- Legal transitions: 991
- Event-only illegal transitions: 0
- Winning states: 25
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 385
- Legal transitions: 991
- Budget: maxStates=300000
- Compressed regions: 35
- Bidirectional transitions: 936
- Commitment transitions: 55
- Winning regions: 2
- Initial region: r0, states=1, dist=5, internalBidirectional=0, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r9@12 -> r12@13 -> r15@14
- Forced commitment prefix length: 0
- Forced viable prefix length: 5
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=28, edges=37, winReachable=7, winning=2, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=5, forcedWinPrefix=5/5, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=4/5, trivial=2, sameEntryExit=4, forcedScripted=4, maxRun=2
- Initial SCC: s0, states=1, dist=5, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s4@1 -> s5@2 -> s6@12 -> s7@13 -> s10@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 1 | 2 | 1 | 1 | 0 | 0 | s4 | yes |
| s4 | 1 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 2 | 3 | 13 | 2 | 1 | 1 | 1 | 1 | s6 | yes |
| s6 | 12 | 2 | 14 | 2 | 1 | 1 | 1 | 1 | s7 | yes |
| s7 | 13 | 1 | 13 | 3 | 1 | 2 | 1 | 1 | s10 | yes |
| s10 | 14 | 0 | 11 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s4 | 1 | yes | yes | down | pull_object:sticky#1, move_sticky_rigid | scripted_trivial_scc |
| s4 | 1 | 2 | s5 | 1 | yes | yes | left | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_trivial_scc |
| s5 | 2 | 12 | s6 | 13 | no | yes | left | push_object:crate#1 | has_reposition_room |
| s6 | 12 | 13 | s7 | 14 | yes | yes | left | push_object:crate#1, force_chain:n2, anchor_boundary_shift:push_pull, box_to_sticky:n1 | scripted_same_state_handoff |
| s7 | 13 | 14 | s10 | 13 | yes | yes | up | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=385, regions=35, solution commitments=5
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=5/5, optimal prefix=5/5, forced viable commitments=5/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 1 | 1 | 1 | forced optimal |
| 1 | r1 | r3 | 4 | 1 | 0 | 1 | forced optimal |
| 11 | r3 | r9 | 3 | 1 | 1 | 1 | forced optimal |
| 12 | r9 | r12 | 2 | 1 | 1 | 1 | forced optimal |
| 13 | r12 | r15 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 2 | 3 | 13 | 2 | 1 | 1 | 1 | 1 | r9 | no | yes | yes |
| r9 | 12 | 2 | 14 | 2 | 1 | 1 | 1 | 1 | r12 | no | yes | yes |
| r12 | 13 | 1 | 13 | 3 | 1 | 2 | 1 | 1 | r15 | no | yes | yes |
| r15 | 14 | 0 | 11 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | down | r1 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, move_sticky_rigid |
| 2 | left | r3 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | up | r3 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r3 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r3 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r3 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r3 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r3 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r3 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r3 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r3 | no | 3 | 2 | 1 | 1 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | walk |
| 12 | left | r9 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r12 | yes | yes | yes | yes | yes | yes | push_object:crate#1 |
| 13 | left | r12 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r15 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2, anchor_boundary_shift:push_pull, box_to_sticky:n1 |
| 14 | up | r15 | yes | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |

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

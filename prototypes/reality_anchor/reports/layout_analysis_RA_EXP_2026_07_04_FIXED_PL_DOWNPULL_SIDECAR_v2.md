# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L downpull sidecar v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
###@SB....#
#P#..#....#
#L#.M.C#..#
####GG#...#
###########
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 57
- Inputs: right down down right left up down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, walk=2, push_object:sticky#1=2, move_sticky_rigid=3, pull_object:crate#1=1, box_to_sticky:n1=1, pull_object:sticky#1=1, sticky_merge:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
###@SB....#
#P#..#....#
#L#.M.C#..#
####GG#...#
###########
```

After:

```text
###########
###.@SB...#
#P#..#....#
#L#.M.C#..#
####GG#...#
###########
```

### Step 3: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
###..SB...#
#P#.@#....#
#L#.M.C#..#
####GG#...#
###########
```

After:

```text
###########
###..SB...#
#P#..#....#
#L#.@.C#..#
####mG#...#
###########
```

### Step 5: left

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1

Before:

```text
###########
###..SB...#
#P#..#....#
#L#..@C#..#
####mG#...#
###########
```

After:

```text
###########
###..SB...#
#P#..#....#
#L#.@M.#..#
####mG#...#
###########
```

### Step 6: up

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
###########
###..SB...#
#P#..#....#
#L#.@M.#..#
####mG#...#
###########
```

After:

```text
###########
###..SB...#
#P#.@#....#
#L#.MM.#..#
####GG#...#
###########
```

### Step 7: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
###..SB...#
#P#.@#....#
#L#.MM.#..#
####GG#...#
###########
```

After:

```text
###########
###..SB...#
#P#..#....#
#L#.@..#..#
####mm#...#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 783
- Legal transitions: 1917
- Event-only illegal transitions: 0
- Winning states: 120
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 783
- Legal transitions: 1917
- Budget: maxStates=400000
- Compressed regions: 69
- Bidirectional transitions: 1802
- Commitment transitions: 102
- Winning regions: 6
- Initial region: r0, states=9, dist=3, internalBidirectional=16, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r5@4 -> r8@5 -> r10@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=59, edges=76, winReachable=19, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=4, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=3/4, trivial=1, sameEntryExit=3, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=9, dist=3, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s4@1 -> s5@4 -> s6@5 -> s15@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 9 | 2 | 2 | 0 | 0 | 0 | s4 | no |
| s4 | 1 | 3 | 11 | 2 | 2 | 0 | 1 | 1 | s5 | no |
| s5 | 4 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | s6 | yes |
| s6 | 5 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | s15 | yes |
| s15 | 6 | 0 | 142 | 6 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s4 | 9 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s4 | 1 | 4 | s5 | 11 | no | no | right | walk | has_reposition_room |
| s5 | 4 | 5 | s6 | 2 | yes | yes | left | pull_object:crate#1, box_to_sticky:n1 | scripted_same_state_handoff |
| s6 | 5 | 6 | s15 | 1 | yes | yes | up | pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=783, regions=69, solution commitments=4
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=2/4
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 2 | 0 | 1 | multiple viable choices |
| 3 | r1 | r5 | 3 | 2 | 0 | 1 | forced optimal |
| 4 | r5 | r8 | 2 | 1 | 0 | 1 | forced optimal |
| 5 | r8 | r10 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 9 | 2 | 2 | 0 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 3 | 11 | 2 | 2 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 4 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes |
| r8 | 5 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | r10 | no | yes | yes |
| r10 | 6 | 0 | 25 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 3 | 2 | 2 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 2 | down | r1 | no | 3 | 2 | 2 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 3 | 2 | 2 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 4 | right | r5 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | walk |
| 5 | left | r8 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | pull_object:crate#1, box_to_sticky:n1 |
| 6 | up | r10 | yes | 0 | 2 | 2 | 0 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |
| 7 | down | r10 | no | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L downpull sidecar v3
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
###@SB.##
#P#..####
#L#.M.C##
####.G###
#########
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 34
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
#########
###@SB.##
#P#..####
#L#.M.C##
####.G###
#########
```

After:

```text
#########
###.@SB##
#P#..####
#L#.M.C##
####.G###
#########
```

### Step 3: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
###..SB##
#P#.@####
#L#.M.C##
####.G###
#########
```

After:

```text
#########
###..SB##
#P#..####
#L#.@.C##
####MG###
#########
```

### Step 5: left

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1

Before:

```text
#########
###..SB##
#P#..####
#L#..@C##
####MG###
#########
```

After:

```text
#########
###..SB##
#P#..####
#L#.@M.##
####MG###
#########
```

### Step 6: up

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
###..SB##
#P#..####
#L#.@M.##
####MG###
#########
```

After:

```text
#########
###..SB##
#P#.@####
#L#.MM.##
####.G###
#########
```

### Step 7: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
###..SB##
#P#.@####
#L#.MM.##
####.G###
#########
```

After:

```text
#########
###..SB##
#P#..####
#L#.@..##
####Mm###
#########
```


## Graph Facts

- Status: complete
- Reachable states: 52
- Legal transitions: 110
- Event-only illegal transitions: 0
- Winning states: 8
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 52
- Legal transitions: 110
- Budget: maxStates=300000
- Compressed regions: 9
- Bidirectional transitions: 96
- Commitment transitions: 11
- Winning regions: 1
- Initial region: r0, states=9, dist=3, internalBidirectional=16, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@4 -> r5@5 -> r7@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=9, edges=10, winReachable=7, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=3/4, trivial=1, sameEntryExit=3, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=9, dist=3, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s4@1 -> s5@4 -> s6@5 -> s8@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 9 | 2 | 2 | 0 | 0 | 0 | s4 | no |
| s4 | 1 | 3 | 11 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 4 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | s6 | yes |
| s6 | 5 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | s8 | yes |
| s8 | 6 | 0 | 13 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s4 | 9 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s4 | 1 | 4 | s5 | 11 | no | yes | right | walk | has_reposition_room |
| s5 | 4 | 5 | s6 | 2 | yes | yes | left | pull_object:crate#1, box_to_sticky:n1 | scripted_same_state_handoff |
| s6 | 5 | 6 | s8 | 1 | yes | yes | up | pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=52, regions=9, solution commitments=4
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=3/4
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 2 | 0 | 1 | multiple viable choices |
| 3 | r1 | r3 | 3 | 1 | 0 | 1 | forced optimal |
| 4 | r3 | r5 | 2 | 1 | 0 | 1 | forced optimal |
| 5 | r5 | r7 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 9 | 2 | 2 | 0 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 3 | 11 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 5 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | yes | yes |
| r7 | 6 | 0 | 13 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 2 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | push_object:sticky#1, move_sticky_rigid |
| 4 | right | r3 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 5 | left | r5 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | pull_object:crate#1, box_to_sticky:n1 |
| 6 | up | r7 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |
| 7 | down | r7 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

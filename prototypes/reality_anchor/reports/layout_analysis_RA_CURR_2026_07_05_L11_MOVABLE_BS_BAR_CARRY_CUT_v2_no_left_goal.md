# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_left_goal

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_left_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
###########
###..######
###.CCC####
###...G####
#.....#####
#.....BS@##
###########
```

## Shortest Solution

- Found: yes
- Cost: 11
- Depth: 11
- Explored states: 65
- Inputs: left left left up up left left up up right down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=3, box_to_sticky:n1=3, sticky_merge:n1=2, walk=7, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1

Before:

```text
###########
###########
###..######
###.CCC####
###...G####
#.....#####
#.....BS@##
###########
```

After:

```text
###########
###########
###..######
###.CCM####
###...G####
#.....#####
#....BS@.##
###########
```

### Step 2: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
###########
###..######
###.CCM####
###...G####
#.....#####
#....BS@.##
###########
```

After:

```text
###########
###########
###..######
###.CMM####
###...G####
#.....#####
#...BS@..##
###########
```

### Step 3: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
###########
###..######
###.CMM####
###...G####
#.....#####
#...BS@..##
###########
```

After:

```text
###########
###########
###..######
###.MMM####
###...G####
#.....#####
#..BS@...##
###########
```

### Step 11: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
###########
###.@######
###.MMM####
###...G####
#.....#####
#..BS....##
###########
```

After:

```text
###########
###########
###..######
###.@..####
###.MMm####
#.....#####
#..BS....##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 5170
- Legal transitions: 14188
- Event-only illegal transitions: 0
- Winning states: 4051
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5170
- Legal transitions: 14188
- Budget: maxStates=300000
- Compressed regions: 312
- Bidirectional transitions: 13292
- Commitment transitions: 896
- Winning regions: 241
- Initial region: r0, states=1, dist=4, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r3@3 -> r8@11
- Forced commitment prefix length: 3
- Forced viable prefix length: 3
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=156, edges=357, winReachable=133, winning=117, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=8, mergingWinSccs=103
- Handoff scriptiness: scope=returned_solution, scripted=3/3, trivial=1, sameEntryExit=3, forcedScripted=3, maxRun=3
- Initial SCC: s0, states=1, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@3

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 1 | 3 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 3 | 0 | 72 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 | scripted_trivial_scc |
| s1 | 1 | 2 | s2 | 2 | yes | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s2 | 2 | 3 | s3 | 3 | yes | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=5170, regions=312, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/4, optimal prefix=4/4, forced viable commitments=3/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 3 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 3 | 1 | 0 | 1 | forced optimal |
| 2 | r2 | r3 | 2 | 1 | 0 | 1 | forced optimal |
| 10 | r3 | r8 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 2 | 3 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 3 | 1 | 18 | 3 | 3 | 0 | 1 | 1 | r8 | no | no | yes |
| r8 | 11 | 0 | 18 | 3 | 3 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | left | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 2 | left | r2 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 |
| 3 | left | r3 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 |
| 4 | up | r3 | no | 1 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r3 | no | 1 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r3 | no | 1 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r3 | no | 1 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r3 | no | 1 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r3 | no | 1 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r3 | no | 1 | 3 | 3 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | walk |
| 11 | down | r8 | yes | 0 | 3 | 3 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

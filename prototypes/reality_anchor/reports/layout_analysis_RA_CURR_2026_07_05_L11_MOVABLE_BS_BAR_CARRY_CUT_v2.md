# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2
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
#...G.#####
#.....BS@##
###########
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 394
- Inputs: left left left up up left left up up right down left down down left down right up up up right down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1
- Event counts: push_object:box_sticky_anchor=4, anchor_boundary_shift:box_sticky=4, box_to_sticky:n1=3, sticky_merge:n1=2, walk=16, push_object:sticky#1=1, move_sticky_rigid=1, sticky_to_box:n1=1, push_object:crate#1=1

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
#...G.#####
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
#...G.#####
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
#...G.#####
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
#...G.#####
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
#...G.#####
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
#...G.#####
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
#...G.#####
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
#...G.#####
#..BS....##
###########
```

### Step 17: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
###########
###..######
###....####
###.MMm####
#...G.#####
#.@BS....##
###########
```

After:

```text
###########
###########
###..######
###....####
###.CMm####
#...G.#####
#..@BS...##
###########
```

### Step 22: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
###########
###########
###..######
###.@..####
###.CMm####
#...G.#####
#...BS...##
###########
```

After:

```text
###########
###########
###..######
###....####
###.@Mm####
#...*.#####
#...BS...##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 5170
- Legal transitions: 14188
- Event-only illegal transitions: 0
- Winning states: 266
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
- Winning regions: 16
- Initial region: r0, states=1, dist=6, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r3@3 -> r8@11 -> r18@17 -> r45@22
- Forced commitment prefix length: 3
- Forced viable prefix length: 3
- Forced optimal prefix length: 6

### SCC Irreversible Progress

- Shape: sccs=156, edges=357, winReachable=19, winning=14, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=4/5, branchingWinSccs=1, mergingWinSccs=7
- Handoff scriptiness: scope=returned_solution, scripted=3/5, trivial=1, sameEntryExit=3, forcedScripted=3, maxRun=3
- Initial SCC: s0, states=1, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@3 -> s5@17 -> s44@22

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 4 | 2 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 3 | 3 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 3 | 2 | 72 | 3 | 1 | 2 | 1 | 1 | s5 | yes |
| s5 | 17 | 1 | 28 | 5 | 2 | 3 | 1 | 1 | s44 | no |
| s44 | 22 | 0 | 14 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 | scripted_trivial_scc |
| s1 | 1 | 2 | s2 | 2 | yes | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s2 | 2 | 3 | s3 | 3 | yes | yes | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s3 | 3 | 17 | s5 | 72 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s5 | 17 | 22 | s44 | 28 | no | no | down | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=5170, regions=312, solution commitments=6
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/6, optimal prefix=6/6, forced viable commitments=3/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 3 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 1 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 5 | 1 | 0 | 1 | forced optimal |
| 2 | r2 | r3 | 4 | 1 | 0 | 1 | forced optimal |
| 10 | r3 | r8 | 3 | 2 | 1 | 1 | forced optimal |
| 16 | r8 | r18 | 2 | 3 | 0 | 1 | forced optimal |
| 21 | r18 | r45 | 1 | 3 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 5 | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 4 | 3 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 3 | 3 | 18 | 3 | 2 | 1 | 1 | 1 | r8 | no | no | yes |
| r8 | 11 | 2 | 18 | 3 | 3 | 0 | 1 | 1 | r18 | no | no | yes |
| r18 | 17 | 1 | 15 | 4 | 3 | 1 | 1 | 1 | r45 | no | no | yes |
| r45 | 22 | 0 | 14 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | left | r1 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 2 | left | r2 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 |
| 3 | left | r3 | yes | 3 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 |
| 4 | up | r3 | no | 3 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r3 | no | 3 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r3 | no | 3 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r3 | no | 3 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r3 | no | 3 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r3 | no | 3 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r3 | no | 3 | 3 | 2 | 1 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | walk |
| 11 | down | r8 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 12 | left | r8 | no | 2 | 3 | 3 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r8 | no | 2 | 3 | 3 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r8 | no | 2 | 3 | 3 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r8 | no | 2 | 3 | 3 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r8 | no | 2 | 3 | 3 | 0 | 1 | 1 | r18 | yes | yes | yes | yes | no | yes | walk |
| 17 | right | r18 | yes | 1 | 4 | 3 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 18 | up | r18 | no | 1 | 4 | 3 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r18 | no | 1 | 4 | 3 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r18 | no | 1 | 4 | 3 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r18 | no | 1 | 4 | 3 | 1 | 1 | 1 | r45 | yes | yes | yes | yes | no | yes | walk |
| 22 | down | r45 | yes | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

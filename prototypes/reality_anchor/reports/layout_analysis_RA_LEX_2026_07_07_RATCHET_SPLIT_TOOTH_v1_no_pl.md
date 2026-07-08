# Level Analysis: RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_no_pl

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_no_pl
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
###G##...#
##..MM..@#
#...M....#
#...MM####
#.BS######
##########
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 29
- Inputs: down left left left left left up
- Events: walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 sticky_split:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: walk=4, push_object:sticky#1=3, move_sticky_rigid=3, sticky_to_box:n3=1, sticky_split:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
###G##...#
##..MM...#
#...M@...#
#...MM####
#.BS######
##########
```

After:

```text
##########
###G##...#
##.MM....#
#..M@....#
#..MM.####
#.BS######
##########
```

### Step 6: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1

Before:

```text
##########
###G##...#
##.MM....#
#..M@....#
#..MM.####
#.BS######
##########
```

After:

```text
##########
###G##...#
##CM.....#
#.C@.....#
#.CM..####
#.BS######
##########
```

### Step 7: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
###G##...#
##CM.....#
#.C@.....#
#.CM..####
#.BS######
##########
```

After:

```text
##########
###m##...#
##C@.....#
#.C......#
#.CM..####
#.BS######
##########
```


## Graph Facts

- Status: complete
- Reachable states: 95
- Legal transitions: 261
- Event-only illegal transitions: 0
- Winning states: 4
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 95
- Legal transitions: 261
- Budget: maxStates=300000
- Compressed regions: 10
- Bidirectional transitions: 248
- Commitment transitions: 13
- Winning regions: 4
- Initial region: r0, states=10, dist=3, internalBidirectional=26, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r2@6 -> r3@7
- Forced commitment prefix length: 2
- Forced viable prefix length: 2
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=10, edges=10, winReachable=10, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=2/3, branchingWinSccs=3, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=0, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=10, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5 -> s2@6 -> s9@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 10 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 2 | 13 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 6 | 1 | 16 | 3 | 3 | 0 | 1 | 1 | s9 | no |
| s9 | 7 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 10 | no | yes | left | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s1 | 5 | 6 | s2 | 13 | yes | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 | scripted_same_state_handoff |
| s2 | 6 | 7 | s9 | 16 | yes | no | up | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=95, regions=10, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/3, optimal prefix=3/3, forced viable commitments=2/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 5 | r1 | r2 | 2 | 1 | 0 | 1 | forced optimal |
| 6 | r2 | r3 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 10 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 2 | 13 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 6 | 1 | 16 | 3 | 3 | 0 | 1 | 1 | r3 | no | no | yes |
| r3 | 7 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | left | r1 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:sticky#1, move_sticky_rigid |
| 6 | left | r2 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 |
| 7 | up | r3 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

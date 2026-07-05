# Level Analysis: RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v1_no_left_goal

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v1_no_left_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
###########
###@.######
###.CCC####
###...G####
#........##
#.....BS.##
###########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 66
- Inputs: right down left down right right
- Events: walk push_object:crate#1 walk walk push_object:crate#3 push_object:crate#3
- Event counts: walk=3, push_object:crate#1=1, push_object:crate#3=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
###########
###########
###.@######
###.CCC####
###...G####
#........##
#.....BS.##
###########
```

After:

```text
###########
###########
###..######
###.@CC####
###.C.G####
#........##
#.....BS.##
###########
```

### Step 5: right

- Legal: true
- Events: push_object:crate#3

Before:

```text
###########
###########
###..######
###..CC####
###@C.G####
#........##
#.....BS.##
###########
```

After:

```text
###########
###########
###..######
###..CC####
###.@CG####
#........##
#.....BS.##
###########
```

### Step 6: right

- Legal: true
- Events: push_object:crate#3

Before:

```text
###########
###########
###..######
###..CC####
###.@CG####
#........##
#.....BS.##
###########
```

After:

```text
###########
###########
###..######
###..CC####
###..@*####
#........##
#.....BS.##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 284706
- Legal transitions: 799815
- Event-only illegal transitions: 0
- Winning states: 35621
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 284706
- Legal transitions: 799815
- Budget: maxStates=400000
- Compressed regions: 14671
- Bidirectional transitions: 723312
- Commitment transitions: 76503
- Winning regions: 1817
- Initial region: r0, states=21, dist=3, internalBidirectional=54, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r5@5 -> r8@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=2922, edges=11990, winReachable=1064, winning=521, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=362, mergingWinSccs=986
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=35502, dist=0, out=475, winOut=0, deadOut=0
- SCC path: s0@0 -> s2891@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 35502 | 475 | 0 | 0 | 0 | 0 | s2891 | no |
| s2891 | 6 | 0 | 105 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s2891 | 35502 | no | no | right | push_object:crate#3 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=284706, regions=14671, solution commitments=3
- Opening: commitments=4, viable=3, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=0/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 3 | 3 | 1 | 1 | forced optimal |
| 4 | r1 | r5 | 2 | 6 | 0 | 1 | forced optimal |
| 5 | r5 | r8 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 21 | 4 | 3 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 2 | 2 | 21 | 6 | 6 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 5 | 1 | 21 | 4 | 4 | 0 | 1 | 1 | r8 | no | no | yes |
| r8 | 6 | 0 | 21 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 3 | 4 | 3 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | walk |
| 2 | down | r1 | yes | 2 | 6 | 6 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 3 | left | r1 | no | 2 | 6 | 6 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 2 | 6 | 6 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | walk |
| 5 | right | r5 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | push_object:crate#3 |
| 6 | right | r8 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#3 |

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

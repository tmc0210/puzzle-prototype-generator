# Level Analysis: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2_no_right_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_OVERSHOOT_CUT_DUAL_POCKET_v2_no_right_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#..G.###
#@CC...#
###....#
###BS###
########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 104
- Inputs: up right right right down down left up
- Events: walk walk walk walk walk walk walk push_object:crate#2
- Event counts: walk=7, push_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: up

- Legal: true
- Events: push_object:crate#2

Before:

```text
########
#..G.###
#.CC...#
###@...#
###BS###
########
```

After:

```text
########
#..*.###
#.C@...#
###....#
###BS###
########
```


## Graph Facts

- Status: complete
- Reachable states: 475
- Legal transitions: 1179
- Event-only illegal transitions: 0
- Winning states: 6
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 475
- Legal transitions: 1179
- Budget: maxStates=300000
- Compressed regions: 49
- Bidirectional transitions: 1098
- Commitment transitions: 81
- Winning regions: 6
- Initial region: r0, states=12, dist=1, internalBidirectional=26, commitments=4, viableCommitments=2, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r15@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=35, edges=50, winReachable=14, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=3, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=36, dist=1, out=8, winOut=4, deadOut=4
- SCC path: s0@0 -> s29@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 36 | 8 | 4 | 4 | 0 | 0 | s29 | no |
| s29 | 8 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s29 | 36 | no | no | up | push_object:crate#2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=475, regions=49, solution commitments=1
- Opening: commitments=4, viable=2, dead=2, optimal=1
- Win-continuation prefix: viable prefix=0/1, optimal prefix=1/1, forced viable commitments=0/1
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r15 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 12 | 4 | 2 | 2 | 1 | 1 | r15 | no | no | yes |
| r15 | 8 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 1 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 1 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 1 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 1 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 1 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r0 | no | 1 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r0 | no | 1 | 4 | 2 | 2 | 1 | 1 | r15 | yes | yes | yes | yes | no | yes | walk |
| 8 | up | r15 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |

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

# Level Analysis: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_right_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_right_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#PLB.C.#
#@MS...#
#.G..#.#
#M....##
########
```

## Shortest Solution

- Found: yes
- Cost: 3
- Depth: 3
- Explored states: 7
- Inputs: down right down
- Events: walk walk pull_object:sticky#2 move_sticky_rigid
- Event counts: walk=2, pull_object:sticky#2=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: down

- Legal: true
- Events: pull_object:sticky#2, move_sticky_rigid

Before:

```text
########
#PLB.C.#
#.MS...#
#.+..#.#
#M....##
########
```

After:

```text
########
#PLB.C.#
#..S...#
#.m..#.#
#M@...##
########
```


## Graph Facts

- Status: complete
- Reachable states: 482
- Legal transitions: 866
- Event-only illegal transitions: 0
- Winning states: 171
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 482
- Legal transitions: 866
- Budget: maxStates=500000
- Compressed regions: 207
- Bidirectional transitions: 554
- Commitment transitions: 303
- Winning regions: 86
- Initial region: r0, states=10, dist=1, internalBidirectional=18, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@3
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=172, edges=226, winReachable=109, winning=76, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=11, mergingWinSccs=31
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=11, dist=1, out=5, winOut=4, deadOut=1
- SCC path: s0@0 -> s162@3

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 11 | 5 | 4 | 1 | 0 | 0 | s162 | no |
| s162 | 3 | 0 | 1 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s162 | 11 | no | no | down | pull_object:sticky#2, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=482, regions=207, solution commitments=1
- Opening: commitments=5, viable=4, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/1, optimal prefix=1/1, forced viable commitments=0/1
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r3 | 1 | 4 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 10 | 5 | 4 | 1 | 1 | 1 | r3 | no | no | yes |
| r3 | 3 | 0 | 1 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 5 | 4 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 1 | 5 | 4 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 1 | 5 | 4 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 3 | down | r3 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#2, move_sticky_rigid |

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

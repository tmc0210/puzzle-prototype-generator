# Level Analysis: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: Long-edge P/L relay v1 no top goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#PL@.#####
#........#
#.CG#.CG.#
##########
```

## Shortest Solution

- Found: yes
- Cost: 13
- Depth: 13
- Explored states: 100
- Inputs: down left left down right up right right right right right down right
- Events: walk walk walk walk push_object:crate#1 walk walk walk walk walk walk walk pull_object:crate#2
- Event counts: walk=11, push_object:crate#1=1, pull_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#PL..#####
#........#
#@CG#.CG.#
##########
```

After:

```text
##########
#PL..#####
#........#
#.@*#.CG.#
##########
```

### Step 13: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#PL..#####
#........#
#..*#.C+.#
##########
```

After:

```text
##########
#PL..#####
#........#
#..*#..*@#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 243
- Legal transitions: 516
- Event-only illegal transitions: 0
- Winning states: 46
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 243
- Legal transitions: 516
- Budget: maxStates=300000
- Compressed regions: 36
- Bidirectional transitions: 438
- Commitment transitions: 62
- Winning regions: 6
- Initial region: r0, states=16, dist=1, internalBidirectional=30, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@6 -> r17@13
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=23, edges=27, winReachable=5, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=1, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=64, dist=0, out=4, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 64 | 4 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=243, regions=36, solution commitments=2
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=0/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r3 | 1 | 3 | 0 | 1 | multiple viable choices |
| 12 | r3 | r17 | 1 | 4 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 16 | 3 | 3 | 0 | 1 | 1 | r3 | no | no | no |
| r3 | 6 | 1 | 13 | 5 | 4 | 1 | 1 | 1 | r17 | no | no | yes |
| r17 | 13 | 0 | 13 | 5 | 4 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r3 | yes | yes | no | no | no | no | push_object:crate#1 |
| 6 | up | r3 | yes | 1 | 5 | 4 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r3 | no | 1 | 5 | 4 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r3 | no | 1 | 5 | 4 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r3 | no | 1 | 5 | 4 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r3 | no | 1 | 5 | 4 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r3 | no | 1 | 5 | 4 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r3 | no | 1 | 5 | 4 | 1 | 1 | 1 | r17 | yes | yes | yes | yes | no | yes | walk |
| 13 | right | r17 | yes | 0 | 5 | 4 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |

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

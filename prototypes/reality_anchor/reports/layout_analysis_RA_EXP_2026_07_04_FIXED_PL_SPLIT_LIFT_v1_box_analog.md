# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v1_box_analog

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L split lift v1 box analog
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
##.....@..#
#P#.......#
#L#.G.....#
####C#....#
####C#....#
###########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 30
- Inputs: down down left left left up
- Events: walk walk walk walk walk pull_object:crate#1
- Event counts: walk=5, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
##........#
#P#.......#
#L#.+.....#
####C#....#
####C#....#
###########
```

After:

```text
###########
##........#
#P#.@.....#
#L#.*.....#
####.#....#
####C#....#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 2127
- Legal transitions: 6180
- Event-only illegal transitions: 0
- Winning states: 338
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2127
- Legal transitions: 6180
- Budget: maxStates=400000
- Compressed regions: 64
- Bidirectional transitions: 5742
- Commitment transitions: 235
- Winning regions: 9
- Initial region: r0, states=59, dist=0, internalBidirectional=180, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=2, edges=1, winReachable=1, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2126, dist=0, out=1, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 2126 | 1 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=2127, regions=64, solution commitments=0
- Opening: commitments=1, viable=1, dead=0, optimal=0
- Win-continuation prefix: viable prefix=0/0, optimal prefix=0/0, forced viable commitments=0/0
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: near-discovery shape; 6 trailing step(s) after entering a winning region

### Commitment Digest

No commitment steps were found on the returned solution.

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 0 | 59 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 0 | 1 | 1 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 0 | 1 | 1 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 0 | 1 | 1 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 0 | 1 | 1 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 0 | 1 | 1 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 0 | 1 | 1 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r0 | no | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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

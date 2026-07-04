# Level Analysis: worker_round53_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: worker_round53_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##########
.#......I.
#...#.#..#
@...*...##
#........#
#...I....#
#.........
#........#
##########
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 360
- Inputs: right down down down right right right right right right right right
- Events: walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=12

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

No non-walk events were found on the returned solution.

## Graph Facts

- Status: complete
- Reachable states: 3176
- Legal transitions: 10024
- Event-only illegal transitions: 94
- Winning states: 30
- Budget: maxStates=50000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 3176
- Legal transitions: 10024
- Budget: maxStates=50000
- Compressed regions: 60
- Bidirectional transitions: 9840
- Commitment transitions: 184
- Winning regions: 30
- Initial region: r0, states=51, dist=0, internalBidirectional=154, commitments=6, viableCommitments=6, deadCommitments=0, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=60, edges=146, winReachable=34, winning=30, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=2, mergingWinSccs=19
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=51, dist=0, out=6, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 51 | 6 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=3176, regions=60, solution commitments=0
- Opening: commitments=6, viable=6, dead=0, optimal=0
- Win-continuation prefix: viable prefix=0/0, optimal prefix=0/0, forced viable commitments=0/0
- Endgame tail: 12 step(s) after first entering a winning region
- Reading hints: near-discovery shape; 12 trailing step(s) after entering a winning region

### Commitment Digest

No commitment steps were found on the returned solution.

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 0 | 51 | 6 | 6 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r0 | no | 0 | 6 | 6 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

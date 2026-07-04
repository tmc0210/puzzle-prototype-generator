# Level Analysis: worker_round53_v2_base

## Summary

- Prototype: ice_slide_escape
- Title: worker_round53_v2_base
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
####.....#
####I....#
####......
####.....#
##########
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 204
- Inputs: right up right up right right right down down down down down right right right right
- Events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=16

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

No non-walk events were found on the returned solution.

## Graph Facts

- Status: complete
- Reachable states: 652
- Legal transitions: 1896
- Event-only illegal transitions: 32
- Winning states: 8
- Budget: maxStates=50000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 652
- Legal transitions: 1896
- Budget: maxStates=50000
- Compressed regions: 16
- Bidirectional transitions: 1860
- Commitment transitions: 36
- Winning regions: 8
- Initial region: r0, states=39, dist=0, internalBidirectional=108, commitments=4, viableCommitments=4, deadCommitments=0, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=16, edges=28, winReachable=12, winning=8, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=2, mergingWinSccs=6
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=39, dist=0, out=4, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 39 | 4 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=652, regions=16, solution commitments=0
- Opening: commitments=4, viable=4, dead=0, optimal=0
- Win-continuation prefix: viable prefix=0/0, optimal prefix=0/0, forced viable commitments=0/0
- Endgame tail: 16 step(s) after first entering a winning region
- Reading hints: near-discovery shape; 16 trailing step(s) after entering a winning region

### Commitment Digest

No commitment steps were found on the returned solution.

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 0 | 39 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r0 | no | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

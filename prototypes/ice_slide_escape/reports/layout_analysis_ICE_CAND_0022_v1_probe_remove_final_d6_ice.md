# Level Analysis: ICE_CAND_0022_v1_probe_remove_final_d6_ice

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0022_v1_probe_remove_final_d6_ice
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#################
#################
..I.G*#.....I....
#.###..######.#.#
#.###I.######.#.#
#.###..######*I.#
#.###########.#.#
..###########...@
#################
```

## Shortest Solution

- Found: no
- Explored states: 430
- Search status: complete
- Reason: search complete

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

No non-walk events were found on the returned solution.

## Graph Facts

- Status: complete
- Reachable states: 430
- Legal transitions: 878
- Event-only illegal transitions: 32
- Winning states: 0
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 430
- Legal transitions: 878
- Budget: maxStates=100000
- Compressed regions: 24
- Bidirectional transitions: 840
- Commitment transitions: 38
- Winning regions: 0
- Initial region: r0, states=15, dist=n/a, internalBidirectional=28, commitments=3, viableCommitments=0, deadCommitments=3, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=24, edges=38, winReachable=0, winning=0, winSubgraph=no_win_path
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=15, dist=n/a, out=3, winOut=0, deadOut=3
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | n/a | 15 | 3 | 0 | 3 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=430, regions=24, solution commitments=0
- Opening: commitments=3, viable=0, dead=3, optimal=0
- Win-continuation prefix: viable prefix=0/0, optimal prefix=0/0, forced viable commitments=0/0
- Endgame tail: n/a
- Reading hints: near-discovery shape

### Commitment Digest

No commitment steps were found on the returned solution.

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | n/a | 15 | 3 | 0 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | n/a | 3 | 0 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | none |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

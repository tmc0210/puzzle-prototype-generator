# Level Analysis: ls20_fresh_single_crate_long_rail_v4_short_stop

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_single_crate_long_rail_v4_short_stop
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_use_crate_to_block_portal_exit, K_blocked_portal_pushes_entrance, K_portal_teleports_player

## Initial State

```text
########
####   #
####@ A#
####C  #
#####  #
#G###  #
#   B# #
########
```

## Shortest Solution

- Found: no
- Explored states: 342
- Search status: complete
- Reason: search complete

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

No non-walk events were found on the returned solution.

## Graph Facts

- Status: complete
- Reachable states: 342
- Legal transitions: 812
- Event-only illegal transitions: 123
- Winning states: 0
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 342
- Legal transitions: 812
- Budget: maxStates=100000
- Compressed regions: 36
- Bidirectional transitions: 704
- Commitment transitions: 72
- Winning regions: 0
- Initial region: r0, states=12, dist=n/a, internalBidirectional=24, commitments=4, viableCommitments=0, deadCommitments=4, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=14, edges=25, winReachable=0, winning=0, winSubgraph=no_win_path
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Initial SCC: s0, states=36, dist=n/a, out=4, winOut=0, deadOut=4
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | n/a | 36 | 4 | 0 | 4 | 0 | 0 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=342, regions=36, solution commitments=0
- Opening: commitments=4, viable=0, dead=4, optimal=0
- Forced chain: viable prefix=0/0, optimal prefix=0/0, forced viable commitments=0/0
- Endgame tail: n/a
- Reading hints: near-discovery shape

### Commitment Digest

No commitment steps were found on the returned solution.

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | n/a | 12 | 4 | 0 | 4 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | n/a | 4 | 0 | 4 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | none |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 71 | complete | search complete |
| without_blocked_portal_push | no | n/a | 60 | complete | search complete |
| without_portal_teleport | no | n/a | 342 | complete | search complete |

## Target Event Checks

### K_use_crate_to_block_portal_exit

玩家可以故意把箱子拉到传送门出口，从而触发堵塞出口行为。

- Required events: pull_crate, portal_exit_blocked
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: unknown
- Shortest bypass: not checked (No returned winning solution; shortest bypass was not checked.)
- Winning bypass: not checked (No returned winning solution; winning bypass was not checked.)

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: unknown
- Shortest bypass: not checked (No returned winning solution; shortest bypass was not checked.)
- Winning bypass: not checked (No returned winning solution; winning bypass was not checked.)

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: unknown
- Shortest bypass: not checked (No returned winning solution; shortest bypass was not checked.)
- Winning bypass: not checked (No returned winning solution; winning bypass was not checked.)


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: ls20_fresh_single_crate_rail_v2_no_wall_prep

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_single_crate_rail_v2_no_wall_prep
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_use_crate_to_block_portal_exit, K_blocked_portal_pushes_entrance, K_portal_teleports_player

## Initial State

```text
#######
###   #
### @ #
### C #
####A #
#G##  #
#   B #
#######
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 37
- Inputs: right down down left left left up
- Events: walk walk walk portal_enter:A portal_teleport:A->B walk walk walk
- Event counts: walk=6, portal_enter:A=1, portal_teleport:A->B=1

## Object Participation

- portal/entered via portal_enter: distinct=1, instances=A, events=1, evidence=trace_lineage

## Key Event Snapshots

### Step 4: left

- Legal: true
- Events: portal_enter:A, portal_teleport:A->B

Before:

```text
#######
###   #
###   #
### C #
####A@#
#G##  #
#   B #
#######
```

After:

```text
#######
###   #
###   #
### C #
####A #
#G##  #
#  @B #
#######
```


## Graph Facts

- Status: complete
- Reachable states: 536
- Legal transitions: 1253
- Event-only illegal transitions: 154
- Winning states: 24
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 536
- Legal transitions: 1253
- Budget: maxStates=100000
- Compressed regions: 35
- Bidirectional transitions: 1146
- Commitment transitions: 71
- Winning regions: 24
- Initial region: r0, states=16, dist=0, internalBidirectional=34, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=15, edges=18, winReachable=12, winning=12, winSubgraph=single_win_chain
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=3
- Initial SCC: s0, states=16, dist=0, out=2, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 16 | 2 | 0 | 0 | 0 | 0 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=536, regions=35, solution commitments=0
- Opening: commitments=2, viable=2, dead=0, optimal=0
- Forced chain: viable prefix=0/0, optimal prefix=0/0, forced viable commitments=0/0
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: near-discovery shape; 7 trailing step(s) after entering a winning region

### Commitment Digest

No commitment steps were found on the returned solution.

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 0 | 16 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 0 | 2 | 2 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 0 | 2 | 2 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 0 | 2 | 2 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 0 | 2 | 2 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 0 | 2 | 2 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_teleport:A->B |
| 5 | left | r0 | no | 0 | 2 | 2 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r0 | no | 0 | 2 | 2 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r0 | no | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 7 | 19 | found |  |
| without_blocked_portal_push | yes | 7 | 30 | found |  |
| without_portal_teleport | no | n/a | 476 | complete | search complete |

## Target Event Checks

### K_use_crate_to_block_portal_exit

玩家可以故意把箱子拉到传送门出口，从而触发堵塞出口行为。

- Required events: pull_crate, portal_exit_blocked
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=7, inputs=right down down left left left up
- Winning bypass: found cost=7, inputs=right down down left left left up

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=7, inputs=right down down left left left up
- Winning bypass: found cost=7, inputs=right down down left left left up

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=43
- Winning bypass: none found; complete search, explored=988


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

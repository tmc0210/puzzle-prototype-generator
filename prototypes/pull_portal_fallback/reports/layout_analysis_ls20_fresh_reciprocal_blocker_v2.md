# Level Analysis: ls20_fresh_reciprocal_blocker_v2

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_reciprocal_blocker_v2
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
###########
#         #
##AE###   #
## G###   #
#####     #
##### B#  #
#      D@##
###########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 37
- Inputs: up up left left down right
- Events: walk walk walk walk portal_enter:B portal_teleport:B->A walk
- Event counts: walk=5, portal_enter:B=1, portal_teleport:B->A=1

## Object Participation

- portal/entered via portal_enter: distinct=1, instances=B, events=1, evidence=trace_lineage

## Key Event Snapshots

### Step 5: down

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
###########
#         #
##AE###   #
## G###   #
##### @   #
##### B#  #
#      D ##
###########
```

After:

```text
###########
#         #
##AE###   #
##@G###   #
#####     #
##### B#  #
#      D ##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 2294
- Legal transitions: 5967
- Event-only illegal transitions: 180
- Winning states: 32
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2294
- Legal transitions: 5967
- Budget: maxStates=100000
- Compressed regions: 74
- Bidirectional transitions: 5868
- Commitment transitions: 99
- Winning regions: 32
- Initial region: r0, states=32, dist=0, internalBidirectional=78, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=68, edges=84, winReachable=31, winning=31, winSubgraph=single_win_chain
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=4
- Initial SCC: s0, states=64, dist=0, out=7, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 64 | 7 | 0 | 0 | 0 | 0 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=2294, regions=74, solution commitments=0
- Opening: commitments=4, viable=3, dead=1, optimal=0
- Forced chain: viable prefix=0/0, optimal prefix=0/0, forced viable commitments=0/0
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: near-discovery shape; 6 trailing step(s) after entering a winning region

### Commitment Digest

No commitment steps were found on the returned solution.

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 0 | 32 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 0 | 4 | 3 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 0 | 4 | 3 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 0 | 4 | 3 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 0 | 4 | 3 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 0 | 4 | 3 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 0 | 4 | 3 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |
| 6 | right | r0 | no | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 6 | 37 | found |  |
| without_blocked_portal_push | yes | 6 | 19 | found |  |
| without_portal_teleport | no | n/a | 1657 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=6, inputs=up up left left down right
- Winning bypass: found cost=6, inputs=up up left left down right

### K_portal_as_dynamic_blocker

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)

### K_multi_instance_same_kind

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

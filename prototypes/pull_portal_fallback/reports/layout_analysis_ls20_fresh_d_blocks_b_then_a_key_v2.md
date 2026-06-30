# Level Analysis: ls20_fresh_d_blocks_b_then_a_key_v2

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_d_blocks_b_then_a_key_v2
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
##########
#  A  ####
#  ##G####
#    #   #
#   B  D@#
#        #
#     #E##
##########
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 225
- Inputs: down left left left left left up right right down
- Events: walk walk walk walk walk walk walk portal_enter:B portal_teleport:B->A walk walk
- Event counts: walk=9, portal_enter:B=1, portal_teleport:B->A=1

## Object Participation

- portal/entered via portal_enter: distinct=1, instances=B, events=1, evidence=trace_lineage

## Key Event Snapshots

### Step 8: right

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
##########
#  A  ####
#  ##G####
#    #   #
#  @B  D #
#        #
#     #E##
##########
```

After:

```text
##########
#  A@ ####
#  ##G####
#    #   #
#   B  D #
#        #
#     #E##
##########
```


## Graph Facts

- Status: complete
- Reachable states: 9646
- Legal transitions: 28380
- Event-only illegal transitions: 622
- Winning states: 216
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 9646
- Legal transitions: 28380
- Budget: maxStates=100000
- Compressed regions: 295
- Bidirectional transitions: 27550
- Commitment transitions: 830
- Winning regions: 216
- Initial region: r0, states=33, dist=0, internalBidirectional=92, commitments=5, viableCommitments=5, deadCommitments=0, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=122, edges=266, winReachable=93, winning=87, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=3, mergingWinSccs=65
- Initial SCC: s0, states=360, dist=0, out=6, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 360 | 6 | 0 | 0 | 0 | 0 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=9646, regions=295, solution commitments=0
- Opening: commitments=5, viable=5, dead=0, optimal=0
- Win-continuation prefix: viable prefix=0/0, optimal prefix=0/0, forced viable commitments=0/0
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: near-discovery shape; 10 trailing step(s) after entering a winning region

### Commitment Digest

No commitment steps were found on the returned solution.

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 0 | 33 | 5 | 5 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |
| 9 | right | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 10 | 225 | found |  |
| without_blocked_portal_push | yes | 10 | 33 | found |  |
| without_portal_teleport | no | n/a | 9173 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=10, inputs=down left left left left left up right right down
- Winning bypass: found cost=10, inputs=down left left left left left up right right down

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

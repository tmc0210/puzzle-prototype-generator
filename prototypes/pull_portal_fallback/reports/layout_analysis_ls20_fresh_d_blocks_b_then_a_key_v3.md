# Level Analysis: ls20_fresh_d_blocks_b_then_a_key_v3

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_d_blocks_b_then_a_key_v3
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
#  #B  D@#
#        #
#     #E##
##########
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 471
- Inputs: down left left left left up left left up up right right right down
- Events: walk walk walk walk walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_wall portal_fallback_push:B walk walk walk walk walk portal_enter:B portal_teleport:B->A walk walk
- Event counts: walk=12, portal_enter:B=2, portal_exit_blocked:B->A=1, portal_exit_blocked_by_wall=1, portal_fallback_push:B=1, portal_teleport:B->A=1

## Object Participation

- portal/entered via portal_enter: distinct=1, instances=B, events=2, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=1, instances=B, events=1, evidence=trace_lineage

## Key Event Snapshots

### Step 6: up

- Legal: true
- Events: portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_wall, portal_fallback_push:B

Before:

```text
##########
#  A  ####
#  ##G####
#    #   #
#  #B  D #
#   @    #
#     #E##
##########
```

After:

```text
##########
#  A  ####
#  ##G####
#   B#   #
#  #   D #
#   @    #
#     #E##
##########
```

### Step 12: right

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
##########
#  A  ####
#  ##G####
#  @B#   #
#  #   D #
#        #
#     #E##
##########
```

After:

```text
##########
#  A@ ####
#  ##G####
#   B#   #
#  #   D #
#        #
#     #E##
##########
```


## Graph Facts

- Status: complete
- Reachable states: 5551
- Legal transitions: 15570
- Event-only illegal transitions: 363
- Winning states: 121
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5551
- Legal transitions: 15570
- Budget: maxStates=100000
- Compressed regions: 177
- Bidirectional transitions: 15112
- Commitment transitions: 458
- Winning regions: 121
- Initial region: r0, states=29, dist=1, internalBidirectional=80, commitments=5, viableCommitments=5, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r6@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=79, edges=158, winReachable=68, winning=68, winSubgraph=single_win_chain
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=0, mergingWinSccs=39
- Initial SCC: s0, states=183, dist=0, out=6, winOut=0, deadOut=0
- SCC path: s0@0 -> s13@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 183 | 6 | 0 | 0 | 0 | 0 | s13 | no |
| s13 | 6 | 0 | 96 | 4 | 0 | 0 | 1 | 1 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=5551, regions=177, solution commitments=1
- Opening: commitments=5, viable=5, dead=0, optimal=2
- Forced chain: viable prefix=0/1, optimal prefix=0/1, forced viable commitments=0/1
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: near-discovery shape; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r6 | 1 | 5 | 0 | 2 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 29 | 5 | 5 | 0 | 2 | 2 | r6 | no | no | no |
| r6 | 6 | 0 | 32 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 5 | 5 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 1 | 5 | 5 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 1 | 5 | 5 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 1 | 5 | 5 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 1 | 5 | 5 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 1 | 5 | 5 | 0 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 6 | up | r6 | yes | 0 | 4 | 4 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_wall, portal_fallback_push:B |
| 7 | left | r6 | no | 0 | 4 | 4 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r6 | no | 0 | 4 | 4 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r6 | no | 0 | 4 | 4 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r6 | no | 0 | 4 | 4 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r6 | no | 0 | 4 | 4 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r6 | no | 0 | 4 | 4 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |
| 13 | right | r6 | no | 0 | 4 | 4 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r6 | no | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 14 | 471 | found |  |
| without_blocked_portal_push | no | n/a | 29 | complete | search complete |
| without_portal_teleport | no | n/a | 5278 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=524
- Winning bypass: none found; complete search, explored=5459

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

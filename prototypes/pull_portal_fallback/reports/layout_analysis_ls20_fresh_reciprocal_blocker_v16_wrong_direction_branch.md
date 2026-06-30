# Level Analysis: ls20_fresh_reciprocal_blocker_v16_wrong_direction_branch

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_reciprocal_blocker_v16_wrong_direction_branch
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
###########
#   #######
#     #####
#  #  #####
##AE B # ##
## #  D @##
##G#     ##
###########
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 131
- Inputs: down left left left up right up right down down
- Events: walk walk walk walk walk portal_enter:D portal_teleport:D->E walk walk portal_enter:B portal_teleport:B->A walk
- Event counts: walk=8, portal_enter:D=1, portal_teleport:D->E=1, portal_enter:B=1, portal_teleport:B->A=1

## Object Participation

- portal/entered via portal_enter: distinct=2, instances=B, D, events=2, evidence=trace_lineage

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: portal_enter:D, portal_teleport:D->E

Before:

```text
###########
#   #######
#     #####
#  #  #####
##AE B # ##
## # @D  ##
##G#     ##
###########
```

After:

```text
###########
#   #######
#     #####
#  #  #####
##AE@B # ##
## #  D  ##
##G#     ##
###########
```

### Step 9: down

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
###########
#   #######
#     #####
#  # @#####
##AE B # ##
## #  D  ##
##G#     ##
###########
```

After:

```text
###########
#   #######
#     #####
#  #  #####
##AE B # ##
##@#  D  ##
##G#     ##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 6121
- Legal transitions: 16524
- Event-only illegal transitions: 617
- Winning states: 59
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 6121
- Legal transitions: 16524
- Budget: maxStates=100000
- Compressed regions: 238
- Bidirectional transitions: 16168
- Commitment transitions: 356
- Winning regions: 59
- Initial region: r0, states=25, dist=0, internalBidirectional=64, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=199, edges=271, winReachable=46, winning=46, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=11
- Initial SCC: s0, states=25, dist=0, out=3, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 25 | 3 | 0 | 0 | 0 | 0 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=6121, regions=238, solution commitments=0
- Opening: commitments=3, viable=2, dead=1, optimal=0
- Win-continuation prefix: viable prefix=0/0, optimal prefix=0/0, forced viable commitments=0/0
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: near-discovery shape; 10 trailing step(s) after entering a winning region

### Commitment Digest

No commitment steps were found on the returned solution.

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 0 | 25 | 3 | 2 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_teleport:D->E |
| 7 | up | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |
| 10 | down | r0 | no | 0 | 3 | 2 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 10 | 131 | found |  |
| without_blocked_portal_push | yes | 10 | 25 | found |  |
| without_portal_teleport | no | n/a | 5255 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=10, inputs=down left left left up right up right down down
- Winning bypass: found cost=10, inputs=down left left left up right up right down down

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

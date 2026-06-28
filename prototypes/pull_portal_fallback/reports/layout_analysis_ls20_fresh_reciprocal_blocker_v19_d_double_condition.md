# Level Analysis: ls20_fresh_reciprocal_blocker_v19_d_double_condition

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_reciprocal_blocker_v19_d_double_condition
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
##########
##########
##########
# A  H   #
# EG#B I #
#  ###D  #
######@###
##########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 61
- Inputs: up up right right up left left down
- Events: portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_portal:A portal_fallback_push:D walk walk walk walk portal_enter:I portal_teleport:I->H walk walk
- Event counts: portal_enter:D=1, portal_exit_blocked:D->E=1, portal_exit_blocked_by_portal:A=1, portal_fallback_push:D=1, walk=6, portal_enter:I=1, portal_teleport:I->H=1

## Object Participation

- portal/entered via portal_enter: distinct=2, instances=D, I, events=2, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=1, instances=D, events=1, evidence=trace_lineage

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D

Before:

```text
##########
##########
##########
# A  H   #
# EG#B I #
#  ###D  #
######@###
##########
```

After:

```text
##########
##########
##########
# A  H   #
# EG#BDI #
#  ###   #
######@###
##########
```

### Step 6: left

- Legal: true
- Events: portal_enter:I, portal_teleport:I->H

Before:

```text
##########
##########
##########
# A  H   #
# EG#BDI@#
#  ###   #
###### ###
##########
```

After:

```text
##########
##########
##########
# A @H   #
# EG#BDI #
#  ###   #
###### ###
##########
```


## Graph Facts

- Status: complete
- Reachable states: 5267
- Legal transitions: 12792
- Event-only illegal transitions: 1343
- Winning states: 161
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5267
- Legal transitions: 12792
- Budget: maxStates=100000
- Compressed regions: 387
- Bidirectional transitions: 12208
- Commitment transitions: 584
- Winning regions: 161
- Initial region: r0, states=1, dist=1, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=381, edges=568, winReachable=168, winning=158, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=1/1, branchingWinSccs=1, mergingWinSccs=70
- Initial SCC: s0, states=1, dist=1, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 0 | 29 | 10 | 0 | 0 | 1 | 1 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=5267, regions=387, solution commitments=1
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Forced chain: viable prefix=1/1, optimal prefix=1/1, forced viable commitments=1/1
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 0 | 15 | 8 | 7 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | up | r1 | yes | 0 | 8 | 7 | 1 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D |
| 2 | up | r1 | no | 0 | 8 | 7 | 1 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 0 | 8 | 7 | 1 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 0 | 8 | 7 | 1 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r1 | no | 0 | 8 | 7 | 1 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r1 | no | 0 | 8 | 7 | 1 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:I, portal_teleport:I->H |
| 7 | left | r1 | no | 0 | 8 | 7 | 1 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | 0 | 8 | 7 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 8 | 61 | found |  |
| without_blocked_portal_push | no | n/a | 1 | complete | search complete |
| without_portal_teleport | no | n/a | 203 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=61
- Winning bypass: none found; complete search, explored=3559

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

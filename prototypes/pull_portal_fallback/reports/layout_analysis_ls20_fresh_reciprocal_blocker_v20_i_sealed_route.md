# Level Analysis: ls20_fresh_reciprocal_blocker_v20_i_sealed_route

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_reciprocal_blocker_v20_i_sealed_route
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
###########
###########
###########
# A  H    #
# EG#B I# #
#  ###D   #
######@####
###########
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 102
- Inputs: up up right up up left up right right right right down
- Events: portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_portal:A portal_fallback_push:D walk walk portal_enter:I portal_exit_blocked:I->H portal_exit_blocked_by_wall portal_fallback_push:I walk portal_enter:D portal_teleport:D->E walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk walk
- Event counts: portal_enter:D=2, portal_exit_blocked:D->E=1, portal_exit_blocked_by_portal:A=1, portal_fallback_push:D=1, walk=7, portal_enter:I=1, portal_exit_blocked:I->H=1, portal_exit_blocked_by_wall=1, portal_fallback_push:I=1, portal_teleport:D->E=1, portal_enter:A=2, portal_exit_blocked:A->B=2, portal_exit_blocked_by_portal:D=2, portal_fallback_push:A=2

## Object Participation

- portal/entered via portal_enter: distinct=3, instances=A, D, I, events=5, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=3, instances=A, D, I, events=4, evidence=trace_lineage

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D

Before:

```text
###########
###########
###########
# A  H    #
# EG#B I# #
#  ###D   #
######@####
###########
```

After:

```text
###########
###########
###########
# A  H    #
# EG#BDI# #
#  ###    #
######@####
###########
```

### Step 4: up

- Legal: true
- Events: portal_enter:I, portal_exit_blocked:I->H, portal_exit_blocked_by_wall, portal_fallback_push:I

Before:

```text
###########
###########
###########
# A  H    #
# EG#BDI# #
#  ### @  #
###### ####
###########
```

After:

```text
###########
###########
###########
# A  H I  #
# EG#BD # #
#  ### @  #
###### ####
###########
```

### Step 6: left

- Legal: true
- Events: portal_enter:D, portal_teleport:D->E

Before:

```text
###########
###########
###########
# A  H I  #
# EG#BD@# #
#  ###    #
###### ####
###########
```

After:

```text
###########
###########
###########
# A  H I  #
#@EG#BD # #
#  ###    #
###### ####
###########
```

### Step 8: right

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
###########
###########
###########
#@A  H I  #
# EG#BD # #
#  ###    #
###### ####
###########
```

After:

```text
###########
###########
###########
#@ A H I  #
# EG#BD # #
#  ###    #
###### ####
###########
```

### Step 10: right

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
###########
###########
###########
# @A H I  #
# EG#BD # #
#  ###    #
###### ####
###########
```

After:

```text
###########
###########
###########
# @ AH I  #
# EG#BD # #
#  ###    #
###### ####
###########
```


## Graph Facts

- Status: complete
- Reachable states: 8162
- Legal transitions: 19008
- Event-only illegal transitions: 1661
- Winning states: 102
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 8162
- Legal transitions: 19008
- Budget: maxStates=100000
- Compressed regions: 513
- Bidirectional transitions: 18176
- Commitment transitions: 832
- Winning regions: 102
- Initial region: r0, states=1, dist=2, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@4 -> r6@8 -> r8@10
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=478, edges=760, winReachable=109, winning=100, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=5, mergingWinSccs=41
- Initial SCC: s0, states=1, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s440@4 -> s444@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 1 | 14 | 6 | 5 | 1 | 1 | 1 | s440 | no |
| s440 | 4 | 0 | 33 | 4 | 0 | 0 | 2 | 2 | s444 | no |
| s444 | 10 | 0 | 17 | 2 | 0 | 0 | 2 | 2 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=8162, regions=513, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Forced chain: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=1/4
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 3 | r1 | r3 | 1 | 5 | 1 | 2 | multiple optimal choices |
| 7 | r3 | r6 | 0 | 4 | 0 | 0 | multiple viable choices |
| 9 | r6 | r8 | 1 | 2 | 0 | 2 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 1 | 14 | 6 | 5 | 1 | 2 | 2 | r3 | no | no | no |
| r3 | 4 | 0 | 17 | 4 | 4 | 0 | 0 | 0 | r6 | no | no | no |
| r6 | 8 | 1 | 16 | 2 | 2 | 0 | 2 | 2 | r8 | no | no | no |
| r8 | 10 | 0 | 17 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | up | r1 | yes | 1 | 6 | 5 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D |
| 2 | up | r1 | no | 1 | 6 | 5 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 1 | 6 | 5 | 1 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 4 | up | r3 | yes | 0 | 4 | 4 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:I, portal_exit_blocked:I->H, portal_exit_blocked_by_wall, portal_fallback_push:I |
| 5 | up | r3 | no | 0 | 4 | 4 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r3 | no | 0 | 4 | 4 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_teleport:D->E |
| 7 | up | r3 | no | 0 | 4 | 4 | 0 | 0 | 0 | r6 | yes | yes | no | no | no | no | walk |
| 8 | right | r6 | yes | 1 | 2 | 2 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 9 | right | r6 | no | 1 | 2 | 2 | 0 | 2 | 2 | r8 | yes | yes | yes | yes | no | no | walk |
| 10 | right | r8 | yes | 0 | 2 | 2 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 11 | right | r8 | no | 0 | 2 | 2 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r8 | no | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 12 | 102 | found |  |
| without_blocked_portal_push | no | n/a | 1 | complete | search complete |
| without_portal_teleport | no | n/a | 233 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=110
- Winning bypass: none found; complete search, explored=7133

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

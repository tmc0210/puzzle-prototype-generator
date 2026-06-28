# Level Analysis: ls20_iter4_require_initial_teleport

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_iter4_require_initial_teleport
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance

## Initial State

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
# D@   I####
# #     ####
# E#########
############
```

## Shortest Solution

- Found: yes
- Cost: 20
- Depth: 20
- Explored states: 518
- Inputs: left up up right right right right right right right up up up up left left left down down left
- Events: portal_enter:D portal_teleport:D->E walk walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk walk walk walk walk portal_enter:H portal_exit_blocked:H->I portal_exit_blocked_by_portal:D portal_fallback_push:H walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk walk
- Event counts: portal_enter:D=5, portal_teleport:D->E=1, walk=13, portal_exit_blocked:D->E=4, portal_exit_blocked_by_wall=4, portal_fallback_push:D=4, portal_enter:H=1, portal_exit_blocked:H->I=1, portal_exit_blocked_by_portal:D=2, portal_fallback_push:H=1, portal_enter:A=1, portal_exit_blocked:A->B=1, portal_fallback_push:A=1

## Object Participation

- portal/entered via portal_enter: distinct=3, instances=A, D, H, events=7, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=3, instances=A, D, H, events=6, evidence=trace_lineage

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: portal_enter:D, portal_teleport:D->E

Before:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
# D@   I####
# #     ####
# E#########
############
```

After:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
# D    I####
# #     ####
#@E#########
############
```

### Step 4: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
#@D    I####
# #     ####
# E#########
############
```

After:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
#@ D   I####
# #     ####
# E#########
############
```

### Step 6: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
# @D   I####
# #     ####
# E#########
############
```

After:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
# @ D  I####
# #     ####
# E#########
############
```

### Step 8: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
#  @D  I####
# #     ####
# E#########
############
```

After:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
#  @ D I####
# #     ####
# E#########
############
```

### Step 10: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
#   @D I####
# #     ####
# E#########
############
```

After:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
#   @ DI####
# #     ####
# E#########
############
```

### Step 16: left

- Legal: true
- Events: portal_enter:H, portal_exit_blocked:H->I, portal_exit_blocked_by_portal:D, portal_fallback_push:H

Before:

```text
############
# H@   #####
#GA    #####
## # #######
#### #B#####
#     DI####
# #     ####
# E#########
############
```

After:

```text
############
#H @   #####
#GA    #####
## # #######
#### #B#####
#     DI####
# #     ####
# E#########
############
```

### Step 18: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
############
#H@    #####
#GA    #####
## # #######
#### #B#####
#     DI####
# #     ####
# E#########
############
```

After:

```text
############
#H@    #####
#G     #####
##A# #######
#### #B#####
#     DI####
# #     ####
# E#########
############
```


## Graph Facts

- Status: complete
- Reachable states: 2496
- Legal transitions: 6189
- Event-only illegal transitions: 451
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2496
- Legal transitions: 6189
- Budget: maxStates=100000
- Compressed regions: 102
- Bidirectional transitions: 5998
- Commitment transitions: 191
- Winning regions: 1
- Initial region: r0, states=22, dist=6, internalBidirectional=56, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@4 -> r2@6 -> r4@8 -> r6@10 -> r19@16 -> r28@18
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 6

### SCC Irreversible Progress

- Shape: sccs=83, edges=140, winReachable=7, winning=1, winSubgraph=single_win_chain
- Solution irreversible path: steps=6, forcedWinPrefix=6/6, branchingWinSccs=0, mergingWinSccs=0
- Initial SCC: s0, states=22, dist=6, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@4 -> s2@6 -> s3@8 -> s4@10 -> s5@16 -> s6@18

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 22 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 4 | 5 | 22 | 2 | 1 | 1 | 1 | 1 | s2 | yes |
| s2 | 6 | 4 | 88 | 5 | 1 | 4 | 1 | 1 | s3 | yes |
| s3 | 8 | 3 | 22 | 2 | 1 | 1 | 1 | 1 | s4 | yes |
| s4 | 10 | 2 | 22 | 2 | 1 | 1 | 1 | 1 | s5 | yes |
| s5 | 16 | 1 | 23 | 2 | 1 | 1 | 1 | 1 | s6 | yes |
| s6 | 18 | 0 | 25 | 0 | 0 | 0 | 1 | 1 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=2496, regions=102, solution commitments=6
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Forced chain: viable prefix=2/6, optimal prefix=6/6, forced viable commitments=5/6
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 6 | 1 | 1 | 1 | forced optimal |
| 5 | r1 | r2 | 5 | 1 | 1 | 1 | forced optimal |
| 7 | r2 | r4 | 4 | 2 | 2 | 1 | forced optimal |
| 9 | r4 | r6 | 3 | 1 | 1 | 1 | forced optimal |
| 15 | r6 | r19 | 2 | 1 | 1 | 1 | forced optimal |
| 17 | r19 | r28 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 22 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 4 | 5 | 22 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 6 | 4 | 22 | 4 | 2 | 2 | 1 | 1 | r4 | no | no | yes |
| r4 | 8 | 3 | 22 | 2 | 1 | 1 | 1 | 1 | r6 | no | yes | yes |
| r6 | 10 | 2 | 22 | 2 | 1 | 1 | 1 | 1 | r19 | no | yes | yes |
| r19 | 16 | 1 | 23 | 2 | 1 | 1 | 1 | 1 | r28 | no | yes | yes |
| r28 | 18 | 0 | 25 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_teleport:D->E |
| 2 | up | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 4 | right | r1 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 5 | right | r1 | no | 5 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r2 | yes | 4 | 4 | 2 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 7 | right | r2 | no | 4 | 4 | 2 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | walk |
| 8 | right | r4 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 9 | right | r4 | no | 3 | 2 | 1 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 10 | right | r6 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 11 | up | r6 | no | 2 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r6 | no | 2 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r6 | no | 2 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r6 | no | 2 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r6 | no | 2 | 2 | 1 | 1 | 1 | 1 | r19 | yes | yes | yes | yes | yes | yes | walk |
| 16 | left | r19 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:H, portal_exit_blocked:H->I, portal_exit_blocked_by_portal:D, portal_fallback_push:H |
| 17 | left | r19 | no | 1 | 2 | 1 | 1 | 1 | 1 | r28 | yes | yes | yes | yes | yes | yes | walk |
| 18 | down | r28 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r28 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 19 | down | r28 | no | 0 | 0 | 0 | 0 | 0 | 0 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r28 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 20 | 518 | found |  |
| without_blocked_portal_push | no | n/a | 22 | complete | search complete |
| without_portal_teleport | no | n/a | 40 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=527
- Winning bypass: none found; complete search, explored=2495


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: ls20_iter3b_coupled_jam_h_lock

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_iter3b_coupled_jam_h_lock
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
#       ####
# E#########
############
```

## Shortest Solution

- Found: yes
- Cost: 20
- Depth: 20
- Explored states: 408
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
#       ####
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
#       ####
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
#       ####
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
#       ####
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
#       ####
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
#       ####
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
#       ####
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
#       ####
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
#       ####
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
#       ####
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
#       ####
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
#       ####
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
#       ####
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
#       ####
# E#########
############
```


## Graph Facts

- Status: complete
- Reachable states: 1452
- Legal transitions: 3847
- Event-only illegal transitions: 248
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1452
- Legal transitions: 3847
- Budget: maxStates=100000
- Compressed regions: 57
- Bidirectional transitions: 3748
- Commitment transitions: 99
- Winning regions: 1
- Initial region: r0, states=23, dist=6, internalBidirectional=62, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@4 -> r2@6 -> r4@8 -> r5@10 -> r14@16 -> r22@18
- Forced commitment prefix length: 0
- Forced viable prefix length: 6
- Forced optimal prefix length: 6

### SCC Irreversible Progress

- Shape: sccs=55, edges=95, winReachable=7, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=6, forcedWinPrefix=6/6, branchingWinSccs=0, mergingWinSccs=0
- Initial SCC: s0, states=23, dist=6, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s6@4 -> s7@6 -> s12@8 -> s13@10 -> s14@16 -> s15@18

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 23 | 2 | 1 | 1 | 0 | 0 | s6 | yes |
| s6 | 4 | 5 | 23 | 2 | 1 | 1 | 1 | 1 | s7 | yes |
| s7 | 6 | 4 | 23 | 3 | 1 | 2 | 1 | 1 | s12 | yes |
| s12 | 8 | 3 | 23 | 2 | 1 | 1 | 1 | 1 | s13 | yes |
| s13 | 10 | 2 | 23 | 2 | 1 | 1 | 1 | 1 | s14 | yes |
| s14 | 16 | 1 | 24 | 2 | 1 | 1 | 1 | 1 | s15 | yes |
| s15 | 18 | 0 | 26 | 0 | 0 | 0 | 1 | 1 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=1452, regions=57, solution commitments=6
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=6/6, optimal prefix=6/6, forced viable commitments=6/6
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 6 | 1 | 1 | 1 | forced optimal |
| 5 | r1 | r2 | 5 | 1 | 1 | 1 | forced optimal |
| 7 | r2 | r4 | 4 | 1 | 2 | 1 | forced optimal |
| 9 | r4 | r5 | 3 | 1 | 1 | 1 | forced optimal |
| 15 | r5 | r14 | 2 | 1 | 1 | 1 | forced optimal |
| 17 | r14 | r22 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 23 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 4 | 5 | 23 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 6 | 4 | 23 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 8 | 3 | 23 | 2 | 1 | 1 | 1 | 1 | r5 | no | yes | yes |
| r5 | 10 | 2 | 23 | 2 | 1 | 1 | 1 | 1 | r14 | no | yes | yes |
| r14 | 16 | 1 | 24 | 2 | 1 | 1 | 1 | 1 | r22 | no | yes | yes |
| r22 | 18 | 0 | 26 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_teleport:D->E |
| 2 | up | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 4 | right | r1 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 5 | right | r1 | no | 5 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r2 | yes | 4 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 7 | right | r2 | no | 4 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 8 | right | r4 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 9 | right | r4 | no | 3 | 2 | 1 | 1 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 10 | right | r5 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 11 | up | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r14 | yes | yes | yes | yes | yes | yes | walk |
| 16 | left | r14 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:H, portal_exit_blocked:H->I, portal_exit_blocked_by_portal:D, portal_fallback_push:H |
| 17 | left | r14 | no | 1 | 2 | 1 | 1 | 1 | 1 | r22 | yes | yes | yes | yes | yes | yes | walk |
| 18 | down | r22 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r22 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 19 | down | r22 | no | 0 | 0 | 0 | 0 | 0 | 0 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r22 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 20 | 408 | found |  |
| without_blocked_portal_push | no | n/a | 23 | complete | search complete |
| without_portal_teleport | yes | 21 | 218 | found |  |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=418
- Winning bypass: none found; complete search, explored=1451


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

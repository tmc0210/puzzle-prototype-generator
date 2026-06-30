# Level Analysis: ls20_iter5b_shorter_midgame_b_to_a

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_iter5b_shorter_midgame_b_to_a
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance

## Initial State

```text
############
# H ########
#GA ########
## #########
#### B######
# D@  I#####
# #    #####
# E#########
############
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 90
- Inputs: left up up right right right right right right up right up left left down down left
- Events: portal_enter:D portal_teleport:D->E walk walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk walk portal_enter:B portal_teleport:B->A walk portal_enter:H portal_exit_blocked:H->I portal_exit_blocked_by_portal:D portal_fallback_push:H walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk walk
- Event counts: portal_enter:D=4, portal_teleport:D->E=1, walk=10, portal_exit_blocked:D->E=3, portal_exit_blocked_by_wall=3, portal_fallback_push:D=3, portal_enter:B=1, portal_teleport:B->A=1, portal_enter:H=1, portal_exit_blocked:H->I=1, portal_exit_blocked_by_portal:D=2, portal_fallback_push:H=1, portal_enter:A=1, portal_exit_blocked:A->B=1, portal_fallback_push:A=1

## Object Participation

- portal/entered via portal_enter: distinct=4, instances=A, B, D, H, events=7, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=3, instances=A, D, H, events=5, evidence=trace_lineage

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: portal_enter:D, portal_teleport:D->E

Before:

```text
############
# H ########
#GA ########
## #########
#### B######
# D@  I#####
# #    #####
# E#########
############
```

After:

```text
############
# H ########
#GA ########
## #########
#### B######
# D   I#####
# #    #####
#@E#########
############
```

### Step 4: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
############
# H ########
#GA ########
## #########
#### B######
#@D   I#####
# #    #####
# E#########
############
```

After:

```text
############
# H ########
#GA ########
## #########
#### B######
#@ D  I#####
# #    #####
# E#########
############
```

### Step 6: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
############
# H ########
#GA ########
## #########
#### B######
# @D  I#####
# #    #####
# E#########
############
```

After:

```text
############
# H ########
#GA ########
## #########
#### B######
# @ D I#####
# #    #####
# E#########
############
```

### Step 8: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
############
# H ########
#GA ########
## #########
#### B######
#  @D I#####
# #    #####
# E#########
############
```

After:

```text
############
# H ########
#GA ########
## #########
#### B######
#  @ DI#####
# #    #####
# E#########
############
```

### Step 11: right

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
############
# H ########
#GA ########
## #########
####@B######
#    DI#####
# #    #####
# E#########
############
```

After:

```text
############
# H ########
#GA@########
## #########
#### B######
#    DI#####
# #    #####
# E#########
############
```

### Step 13: left

- Legal: true
- Events: portal_enter:H, portal_exit_blocked:H->I, portal_exit_blocked_by_portal:D, portal_fallback_push:H

Before:

```text
############
# H@########
#GA ########
## #########
#### B######
#    DI#####
# #    #####
# E#########
############
```

After:

```text
############
#H @########
#GA ########
## #########
#### B######
#    DI#####
# #    #####
# E#########
############
```

### Step 15: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
############
#H@ ########
#GA ########
## #########
#### B######
#    DI#####
# #    #####
# E#########
############
```

After:

```text
############
#H@ ########
#G  ########
##A#########
#### B######
#    DI#####
# #    #####
# E#########
############
```


## Graph Facts

- Status: complete
- Reachable states: 155
- Legal transitions: 341
- Event-only illegal transitions: 44
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 155
- Legal transitions: 341
- Budget: maxStates=100000
- Compressed regions: 12
- Bidirectional transitions: 330
- Commitment transitions: 11
- Winning regions: 1
- Initial region: r0, states=13, dist=5, internalBidirectional=30, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@4 -> r2@6 -> r3@8 -> r5@13 -> r8@15
- Forced commitment prefix length: 2
- Forced viable prefix length: 5
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=12, edges=11, winReachable=6, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=5, forcedWinPrefix=5/5, branchingWinSccs=0, mergingWinSccs=0
- Initial SCC: s0, states=13, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@4 -> s2@6 -> s6@8 -> s7@13 -> s8@15

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 13 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 4 | 4 | 13 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 6 | 3 | 13 | 3 | 1 | 2 | 1 | 1 | s6 | yes |
| s6 | 8 | 2 | 13 | 1 | 1 | 0 | 1 | 1 | s7 | yes |
| s7 | 13 | 1 | 14 | 1 | 1 | 0 | 1 | 1 | s8 | yes |
| s8 | 15 | 0 | 5 | 0 | 0 | 0 | 1 | 1 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=155, regions=12, solution commitments=5
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=5/5, optimal prefix=5/5, forced viable commitments=5/5
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 5 | 1 | 0 | 1 | forced optimal |
| 5 | r1 | r2 | 4 | 1 | 0 | 1 | forced optimal |
| 7 | r2 | r3 | 3 | 1 | 2 | 1 | forced optimal |
| 12 | r3 | r5 | 2 | 1 | 0 | 1 | forced optimal |
| 14 | r5 | r8 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 13 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 4 | 4 | 13 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 6 | 3 | 13 | 3 | 1 | 2 | 1 | 1 | r3 | no | yes | yes |
| r3 | 8 | 2 | 13 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 13 | 1 | 14 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes |
| r8 | 15 | 0 | 5 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_teleport:D->E |
| 2 | up | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 4 | right | r1 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 5 | right | r1 | no | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r2 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 7 | right | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 8 | right | r3 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 9 | right | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |
| 12 | up | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 13 | left | r5 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:H, portal_exit_blocked:H->I, portal_exit_blocked_by_portal:D, portal_fallback_push:H |
| 14 | left | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | walk |
| 15 | down | r8 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 16 | down | r8 | no | 0 | 0 | 0 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r8 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 17 | 90 | found |  |
| without_blocked_portal_push | no | n/a | 13 | complete | search complete |
| without_portal_teleport | no | n/a | 8 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=90
- Winning bypass: none found; complete search, explored=154


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

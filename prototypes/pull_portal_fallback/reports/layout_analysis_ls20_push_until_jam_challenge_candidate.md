# Level Analysis: ls20_push_until_jam_challenge_candidate

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_push_until_jam_challenge_candidate
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance

## Initial State

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
# D@   ####
#      ####
# E########
###########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 236
- Inputs: left up up right right right right right right right up up up up left left down down left
- Events: portal_enter:D portal_teleport:D->E walk walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk walk walk walk walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk walk
- Event counts: portal_enter:D=5, portal_teleport:D->E=1, walk=13, portal_exit_blocked:D->E=4, portal_exit_blocked_by_wall=4, portal_fallback_push:D=4, portal_enter:A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_portal:D=1, portal_fallback_push:A=1

## Object Participation

- portal/entered via portal_enter: distinct=2, instances=A, D, events=6, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=2, instances=A, D, events=5, evidence=trace_lineage

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: portal_enter:D, portal_teleport:D->E

Before:

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
# D@   ####
#      ####
# E########
###########
```

After:

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
# D    ####
#      ####
#@E########
###########
```

### Step 4: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
#@D    ####
#      ####
# E########
###########
```

After:

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
#@ D   ####
#      ####
# E########
###########
```

### Step 6: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
# @D   ####
#      ####
# E########
###########
```

After:

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
# @ D  ####
#      ####
# E########
###########
```

### Step 8: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
#  @D  ####
#      ####
# E########
###########
```

After:

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
#  @ D ####
#      ####
# E########
###########
```

### Step 10: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
#   @D ####
#      ####
# E########
###########
```

After:

```text
###########
##      ###
#GA     ###
## # ######
#### #B####
#   @ D####
#      ####
# E########
###########
```

### Step 17: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
###########
##@     ###
#GA     ###
## # ######
#### #B####
#     D####
#      ####
# E########
###########
```

After:

```text
###########
##@     ###
#G      ###
##A# ######
#### #B####
#     D####
#      ####
# E########
###########
```


## Graph Facts

- Status: complete
- Reachable states: 443
- Legal transitions: 1197
- Event-only illegal transitions: 38
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 443
- Legal transitions: 1197
- Budget: maxStates=100000
- Compressed regions: 18
- Bidirectional transitions: 1174
- Commitment transitions: 23
- Winning regions: 1
- Initial region: r0, states=25, dist=5, internalBidirectional=68, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@4 -> r2@6 -> r4@8 -> r5@10 -> r10@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 5
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=18, edges=23, winReachable=6, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=5, forcedWinPrefix=5/5, branchingWinSccs=0, mergingWinSccs=0
- Initial SCC: s0, states=25, dist=5, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s2@4 -> s3@6 -> s11@8 -> s12@10 -> s13@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 25 | 2 | 1 | 1 | 0 | 0 | s2 | yes |
| s2 | 4 | 4 | 25 | 2 | 1 | 1 | 1 | 1 | s3 | yes |
| s3 | 6 | 3 | 25 | 3 | 1 | 2 | 1 | 1 | s11 | yes |
| s11 | 8 | 2 | 25 | 2 | 1 | 1 | 1 | 1 | s12 | yes |
| s12 | 10 | 1 | 25 | 2 | 1 | 1 | 1 | 1 | s13 | yes |
| s13 | 17 | 0 | 27 | 0 | 0 | 0 | 1 | 1 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=443, regions=18, solution commitments=5
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=5/5, optimal prefix=5/5, forced viable commitments=5/5
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 5 | 1 | 1 | 1 | forced optimal |
| 5 | r1 | r2 | 4 | 1 | 1 | 1 | forced optimal |
| 7 | r2 | r4 | 3 | 1 | 2 | 1 | forced optimal |
| 9 | r4 | r5 | 2 | 1 | 1 | 1 | forced optimal |
| 16 | r5 | r10 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 25 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 4 | 4 | 25 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 6 | 3 | 25 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 8 | 2 | 25 | 2 | 1 | 1 | 1 | 1 | r5 | no | yes | yes |
| r5 | 10 | 1 | 25 | 2 | 1 | 1 | 1 | 1 | r10 | no | yes | yes |
| r10 | 17 | 0 | 27 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 5 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_teleport:D->E |
| 2 | up | r0 | no | 5 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 5 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 4 | right | r1 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 5 | right | r1 | no | 4 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r2 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 7 | right | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 8 | right | r4 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 9 | right | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 10 | right | r5 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 11 | up | r5 | no | 1 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r5 | no | 1 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r5 | no | 1 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r5 | no | 1 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r5 | no | 1 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r5 | no | 1 | 2 | 1 | 1 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | walk |
| 17 | down | r10 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 18 | down | r10 | no | 0 | 0 | 0 | 0 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r10 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 19 | 236 | found |  |
| without_blocked_portal_push | no | n/a | 25 | complete | search complete |
| without_portal_teleport | yes | 20 | 202 | found |  |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=242
- Winning bypass: none found; complete search, explored=442


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

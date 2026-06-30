# Level Analysis: ls20_fresh_reciprocal_blocker_v18_h_gate

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_reciprocal_blocker_v18_h_gate
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
###########
##  #######
##   ## ###
##AE##BHI #
#G ### D@ #
######   ##
###########
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 147
- Inputs: left down left left up left down down right up up left
- Events: portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_portal:A portal_fallback_push:D walk walk walk portal_enter:D portal_teleport:D->E walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk portal_enter:E portal_teleport:E->D portal_enter:H portal_exit_blocked:H->I portal_exit_blocked_by_wall portal_fallback_push:H walk portal_enter:B portal_teleport:B->A
- Event counts: portal_enter:D=2, portal_exit_blocked:D->E=1, portal_exit_blocked_by_portal:A=1, portal_fallback_push:D=1, walk=6, portal_teleport:D->E=1, portal_enter:A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_portal:D=1, portal_fallback_push:A=1, portal_enter:E=1, portal_teleport:E->D=1, portal_enter:H=1, portal_exit_blocked:H->I=1, portal_exit_blocked_by_wall=1, portal_fallback_push:H=1, portal_enter:B=1, portal_teleport:B->A=1

## Object Participation

- portal/entered via portal_enter: distinct=5, instances=A, B, D, E, H, events=6, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=3, instances=A, D, H, events=3, evidence=trace_lineage

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D

Before:

```text
###########
##  #######
##   ## ###
##AE##BHI #
#G ### D@ #
######   ##
###########
```

After:

```text
###########
##  #######
##   ## ###
##AE##BHI #
#G ###D @ #
######   ##
###########
```

### Step 5: up

- Legal: true
- Events: portal_enter:D, portal_teleport:D->E

Before:

```text
###########
##  #######
##   ## ###
##AE##BHI #
#G ###D   #
######@  ##
###########
```

After:

```text
###########
##  #######
## @ ## ###
##AE##BHI #
#G ###D   #
######   ##
###########
```

### Step 7: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
###########
##  #######
##@  ## ###
##AE##BHI #
#G ###D   #
######   ##
###########
```

After:

```text
###########
##  #######
##@  ## ###
## E##BHI #
#GA###D   #
######   ##
###########
```

### Step 9: right

- Legal: true
- Events: portal_enter:E, portal_teleport:E->D

Before:

```text
###########
##  #######
##   ## ###
##@E##BHI #
#GA###D   #
######   ##
###########
```

After:

```text
###########
##  #######
##   ## ###
## E##BHI #
#GA###D@  #
######   ##
###########
```

### Step 10: up

- Legal: true
- Events: portal_enter:H, portal_exit_blocked:H->I, portal_exit_blocked_by_wall, portal_fallback_push:H

Before:

```text
###########
##  #######
##   ## ###
## E##BHI #
#GA###D@  #
######   ##
###########
```

After:

```text
###########
##  #######
##   ##H###
## E##B I #
#GA###D@  #
######   ##
###########
```

### Step 12: left

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
###########
##  #######
##   ##H###
## E##B@I #
#GA###D   #
######   ##
###########
```

After:

```text
###########
##  #######
##   ##H###
## E##B I #
#@A###D   #
######   ##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 206
- Legal transitions: 496
- Event-only illegal transitions: 51
- Winning states: 2
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 206
- Legal transitions: 496
- Budget: maxStates=100000
- Compressed regions: 16
- Bidirectional transitions: 476
- Commitment transitions: 20
- Winning regions: 2
- Initial region: r0, states=13, dist=3, internalBidirectional=28, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r7@7 -> r10@10
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=16, edges=20, winReachable=7, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=2, mergingWinSccs=2
- Initial SCC: s0, states=13, dist=3, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@1 -> s2@7 -> s5@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 13 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 13 | 2 | 2 | 0 | 1 | 1 | s2 | no |
| s2 | 7 | 1 | 14 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 10 | 0 | 15 | 2 | 0 | 0 | 2 | 2 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=206, regions=16, solution commitments=3
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=1/3, forced viable commitments=2/3
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 1 | 1 | 1 | forced optimal |
| 6 | r1 | r7 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 9 | r7 | r10 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 13 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 2 | 13 | 2 | 2 | 0 | 2 | 2 | r7 | no | no | no |
| r7 | 7 | 1 | 14 | 1 | 1 | 0 | 1 | 1 | r10 | yes | yes | yes |
| r10 | 10 | 0 | 15 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | left | r1 | yes | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D |
| 2 | down | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_teleport:D->E |
| 6 | left | r1 | no | 2 | 2 | 2 | 0 | 2 | 2 | r7 | yes | yes | yes | yes | no | no | walk |
| 7 | down | r7 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 8 | down | r7 | no | 1 | 1 | 1 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r7 | no | 1 | 1 | 1 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | portal_enter:E, portal_teleport:E->D |
| 10 | up | r10 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:H, portal_exit_blocked:H->I, portal_exit_blocked_by_wall, portal_fallback_push:H |
| 11 | up | r10 | no | 0 | 2 | 1 | 1 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r10 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 12 | 147 | found |  |
| without_blocked_portal_push | no | n/a | 13 | complete | search complete |
| without_portal_teleport | no | n/a | 85 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=154
- Winning bypass: none found; complete search, explored=204

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

# Level Analysis: ls20_fresh_reciprocal_blocker_v17_wrong_d_down_branch

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_reciprocal_blocker_v17_wrong_d_down_branch
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
##########
##  ######
##  ######
##AE##B @#
#G ### D #
######  ##
##########
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 34
- Inputs: down left left down left up left down down right up left
- Events: walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_portal:A portal_fallback_push:D walk walk walk portal_enter:D portal_teleport:D->E walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk portal_enter:E portal_teleport:E->D walk portal_enter:B portal_teleport:B->A
- Event counts: walk=7, portal_enter:D=2, portal_exit_blocked:D->E=1, portal_exit_blocked_by_portal:A=1, portal_fallback_push:D=1, portal_teleport:D->E=1, portal_enter:A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_portal:D=1, portal_fallback_push:A=1, portal_enter:E=1, portal_teleport:E->D=1, portal_enter:B=1, portal_teleport:B->A=1

## Object Participation

- portal/entered via portal_enter: distinct=4, instances=A, B, D, E, events=5, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=2, instances=A, D, events=2, evidence=trace_lineage

## Key Event Snapshots

### Step 2: left

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D

Before:

```text
##########
##  ######
##  ######
##AE##B  #
#G ### D@#
######  ##
##########
```

After:

```text
##########
##  ######
##  ######
##AE##B  #
#G ###D @#
######  ##
##########
```

### Step 6: up

- Legal: true
- Events: portal_enter:D, portal_teleport:D->E

Before:

```text
##########
##  ######
##  ######
##AE##B  #
#G ###D  #
######@ ##
##########
```

After:

```text
##########
##  ######
## @######
##AE##B  #
#G ###D  #
######  ##
##########
```

### Step 8: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
##########
##  ######
##@ ######
##AE##B  #
#G ###D  #
######  ##
##########
```

After:

```text
##########
##  ######
##@ ######
## E##B  #
#GA###D  #
######  ##
##########
```

### Step 10: right

- Legal: true
- Events: portal_enter:E, portal_teleport:E->D

Before:

```text
##########
##  ######
##  ######
##@E##B  #
#GA###D  #
######  ##
##########
```

After:

```text
##########
##  ######
##  ######
## E##B  #
#GA###D@ #
######  ##
##########
```

### Step 12: left

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
##########
##  ######
##  ######
## E##B@ #
#GA###D  #
######  ##
##########
```

After:

```text
##########
##  ######
##  ######
## E##B  #
#@A###D  #
######  ##
##########
```


## Graph Facts

- Status: complete
- Reachable states: 35
- Legal transitions: 79
- Event-only illegal transitions: 8
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 35
- Legal transitions: 79
- Budget: maxStates=100000
- Compressed regions: 4
- Bidirectional transitions: 76
- Commitment transitions: 3
- Winning regions: 1
- Initial region: r0, states=3, dist=2, internalBidirectional=4, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r3@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=4, edges=3, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Initial SCC: s0, states=3, dist=2, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s2@2 -> s3@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 3 | 2 | 1 | 1 | 0 | 0 | s2 | yes |
| s2 | 2 | 1 | 10 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 8 | 0 | 12 | 0 | 0 | 0 | 1 | 1 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=35, regions=4, solution commitments=2
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 2 | 1 | 1 | 1 | forced optimal |
| 7 | r1 | r3 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 2 | 1 | 10 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 8 | 0 | 12 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | left | r1 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D |
| 3 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_teleport:D->E |
| 7 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 8 | down | r3 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 9 | down | r3 | no | 0 | 0 | 0 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r3 | no | 0 | 0 | 0 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:E, portal_teleport:E->D |
| 11 | up | r3 | no | 0 | 0 | 0 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r3 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 12 | 34 | found |  |
| without_blocked_portal_push | no | n/a | 3 | complete | search complete |
| without_portal_teleport | no | n/a | 15 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=34
- Winning bypass: none found; complete search, explored=34

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

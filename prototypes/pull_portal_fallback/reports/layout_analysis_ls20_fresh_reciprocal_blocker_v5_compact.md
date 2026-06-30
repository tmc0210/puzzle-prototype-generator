# Level Analysis: ls20_fresh_reciprocal_blocker_v5_compact

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_reciprocal_blocker_v5_compact
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
##########
#        #
##AE#    #
## G#    #
##### #  #
##### B# #
#    # D@#
##########
```

## Shortest Solution

- Found: yes
- Cost: 21
- Depth: 21
- Explored states: 173
- Inputs: left up up up up up left left left left left left down right right right down down down down right
- Events: portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_portal:A portal_fallback_push:D walk walk walk walk walk walk walk walk walk walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk walk walk walk walk walk walk portal_enter:B portal_teleport:B->A
- Event counts: portal_enter:D=1, portal_exit_blocked:D->E=1, portal_exit_blocked_by_portal:A=1, portal_fallback_push:D=1, walk=18, portal_enter:A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_portal:D=1, portal_fallback_push:A=1, portal_enter:B=1, portal_teleport:B->A=1

## Object Participation

- portal/entered via portal_enter: distinct=3, instances=A, B, D, events=3, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=2, instances=A, D, events=2, evidence=trace_lineage

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D

Before:

```text
##########
#        #
##AE#    #
## G#    #
##### #  #
##### B# #
#    # D@#
##########
```

After:

```text
##########
#        #
##AE#    #
## G#    #
##### #  #
##### B# #
#    #D @#
##########
```

### Step 13: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
##########
# @      #
##AE#    #
## G#    #
##### #  #
##### B# #
#    #D  #
##########
```

After:

```text
##########
# @      #
## E#    #
##AG#    #
##### #  #
##### B# #
#    #D  #
##########
```

### Step 21: right

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
##########
#        #
## E#    #
##AG#    #
##### #  #
#####@B# #
#    #D  #
##########
```

After:

```text
##########
#        #
## E#    #
##A@#    #
##### #  #
##### B# #
#    #D  #
##########
```


## Graph Facts

- Status: complete
- Reachable states: 361
- Legal transitions: 948
- Event-only illegal transitions: 32
- Winning states: 6
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 361
- Legal transitions: 948
- Budget: maxStates=100000
- Compressed regions: 15
- Bidirectional transitions: 932
- Commitment transitions: 16
- Winning regions: 6
- Initial region: r0, states=23, dist=1, internalBidirectional=58, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r5@13
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=15, edges=16, winReachable=8, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=1, mergingWinSccs=0
- Initial SCC: s0, states=23, dist=1, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s1@1 -> s2@13

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 23 | 3 | 2 | 1 | 0 | 0 | s1 | no |
| s1 | 1 | 1 | 23 | 2 | 1 | 1 | 1 | 1 | s2 | yes |
| s2 | 13 | 0 | 25 | 2 | 0 | 0 | 1 | 1 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=361, regions=15, solution commitments=2
- Opening: commitments=3, viable=2, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=1/2
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 1 | 2 | 1 | 1 | multiple viable choices |
| 12 | r1 | r5 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 23 | 3 | 2 | 1 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 1 | 23 | 2 | 1 | 1 | 1 | 1 | r5 | no | yes | yes |
| r5 | 13 | 0 | 25 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 3 | 2 | 1 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | left | r1 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D |
| 2 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 13 | down | r5 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 14 | right | r5 | no | 0 | 2 | 1 | 1 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r5 | no | 0 | 2 | 1 | 1 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r5 | no | 0 | 2 | 1 | 1 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r5 | no | 0 | 2 | 1 | 1 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r5 | no | 0 | 2 | 1 | 1 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r5 | no | 0 | 2 | 1 | 1 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r5 | no | 0 | 2 | 1 | 1 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r5 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 21 | 173 | found |  |
| without_blocked_portal_push | no | n/a | 23 | complete | search complete |
| without_portal_teleport | no | n/a | 141 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=172
- Winning bypass: none found; complete search, explored=239

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

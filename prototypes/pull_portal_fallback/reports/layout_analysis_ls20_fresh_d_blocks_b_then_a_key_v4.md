# Level Analysis: ls20_fresh_d_blocks_b_then_a_key_v4

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_d_blocks_b_then_a_key_v4
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
##########
#  A  ####
#  ##G####
#    #   #
#  #B  D@#
#   #    #
#     #E##
##########
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 288
- Inputs: left left left down down down left left up left up up up up right right right left down down right right down
- Events: portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_push:D walk portal_enter:E portal_teleport:E->D walk walk walk walk walk walk walk walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk walk walk walk walk portal_enter:B portal_teleport:B->A
- Event counts: portal_enter:D=2, portal_exit_blocked:D->E=2, portal_exit_blocked_by_wall=2, portal_fallback_push:D=2, walk=17, portal_enter:E=1, portal_teleport:E->D=1, portal_enter:A=2, portal_exit_blocked:A->B=2, portal_exit_blocked_by_portal:D=2, portal_fallback_push:A=2, portal_enter:B=1, portal_teleport:B->A=1

## Object Participation

- portal/entered via portal_enter: distinct=4, instances=A, B, D, E, events=6, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=2, instances=A, D, events=4, evidence=trace_lineage

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
##########
#  A  ####
#  ##G####
#    #   #
#  #B  D@#
#   #    #
#     #E##
##########
```

After:

```text
##########
#  A  ####
#  ##G####
#    #   #
#  #B D @#
#   #    #
#     #E##
##########
```

### Step 3: left

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D

Before:

```text
##########
#  A  ####
#  ##G####
#    #   #
#  #B D@ #
#   #    #
#     #E##
##########
```

After:

```text
##########
#  A  ####
#  ##G####
#    #   #
#  #BD @ #
#   #    #
#     #E##
##########
```

### Step 5: down

- Legal: true
- Events: portal_enter:E, portal_teleport:E->D

Before:

```text
##########
#  A  ####
#  ##G####
#    #   #
#  #BD   #
#   #  @ #
#     #E##
##########
```

After:

```text
##########
#  A  ####
#  ##G####
#    #   #
#  #BD   #
#   #@   #
#     #E##
##########
```

### Step 15: right

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
##########
# @A  ####
#  ##G####
#    #   #
#  #BD   #
#   #    #
#     #E##
##########
```

After:

```text
##########
# @ A ####
#  ##G####
#    #   #
#  #BD   #
#   #    #
#     #E##
##########
```

### Step 17: right

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
##########
#  @A ####
#  ##G####
#    #   #
#  #BD   #
#   #    #
#     #E##
##########
```

After:

```text
##########
#  @ A####
#  ##G####
#    #   #
#  #BD   #
#   #    #
#     #E##
##########
```

### Step 23: down

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
##########
#    A####
#  ##G####
#   @#   #
#  #BD   #
#   #    #
#     #E##
##########
```

After:

```text
##########
#    A####
#  ##@####
#    #   #
#  #BD   #
#   #    #
#     #E##
##########
```


## Graph Facts

- Status: complete
- Reachable states: 312
- Legal transitions: 850
- Event-only illegal transitions: 25
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 312
- Legal transitions: 850
- Budget: maxStates=100000
- Compressed regions: 11
- Bidirectional transitions: 836
- Commitment transitions: 14
- Winning regions: 1
- Initial region: r0, states=28, dist=4, internalBidirectional=74, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@3 -> r9@15 -> r10@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=9, edges=9, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Initial SCC: s0, states=56, dist=3, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s1@3 -> s2@15 -> s3@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 56 | 3 | 1 | 2 | 0 | 0 | s1 | yes |
| s1 | 3 | 2 | 28 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 15 | 1 | 29 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 17 | 0 | 31 | 0 | 0 | 0 | 1 | 1 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=312, regions=11, solution commitments=4
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=4/4, forced viable commitments=3/4
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 2 | 1 | forced optimal |
| 2 | r1 | r3 | 3 | 2 | 1 | 1 | forced optimal |
| 14 | r3 | r9 | 2 | 1 | 0 | 1 | forced optimal |
| 16 | r9 | r10 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 28 | 3 | 1 | 2 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 3 | 28 | 3 | 2 | 1 | 1 | 1 | r3 | no | no | yes |
| r3 | 3 | 2 | 28 | 1 | 1 | 0 | 1 | 1 | r9 | yes | yes | yes |
| r9 | 15 | 1 | 29 | 1 | 1 | 0 | 1 | 1 | r10 | yes | yes | yes |
| r10 | 17 | 0 | 31 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 3 | 1 | 2 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | left | r1 | yes | 3 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 2 | left | r1 | no | 3 | 3 | 2 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 3 | left | r3 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_wall, portal_fallback_push:D |
| 4 | down | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:E, portal_teleport:E->D |
| 6 | down | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | walk |
| 15 | right | r9 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 16 | right | r9 | no | 1 | 1 | 1 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | walk |
| 17 | right | r10 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A |
| 18 | left | r10 | no | 0 | 0 | 0 | 0 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r10 | no | 0 | 0 | 0 | 0 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r10 | no | 0 | 0 | 0 | 0 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r10 | no | 0 | 0 | 0 | 0 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r10 | no | 0 | 0 | 0 | 0 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r10 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 23 | 288 | found |  |
| without_blocked_portal_push | no | n/a | 28 | complete | search complete |
| without_portal_teleport | no | n/a | 276 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=315
- Winning bypass: none found; complete search, explored=339

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

# Level Analysis: ls20_fresh_reciprocal_blocker_v6_tight

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_reciprocal_blocker_v6_tight
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
########
#      #
# AE#  #
#  G#  #
#   B# #
#    D@#
########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 54
- Inputs: left left left left left left up up
- Events: portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_portal:A portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_portal:A portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_portal:A portal_fallback_push:D walk walk walk
- Event counts: portal_enter:D=3, portal_exit_blocked:D->E=3, portal_exit_blocked_by_portal:A=3, portal_fallback_push:D=3, walk=5

## Object Participation

- portal/entered via portal_enter: distinct=1, instances=D, events=3, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=1, instances=D, events=3, evidence=trace_lineage

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D

Before:

```text
########
#      #
# AE#  #
#  G#  #
#   B# #
#    D@#
########
```

After:

```text
########
#      #
# AE#  #
#  G#  #
#   B# #
#   D @#
########
```

### Step 3: left

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D

Before:

```text
########
#      #
# AE#  #
#  G#  #
#   B# #
#   D@ #
########
```

After:

```text
########
#      #
# AE#  #
#  G#  #
#   B# #
#  D @ #
########
```

### Step 5: left

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D

Before:

```text
########
#      #
# AE#  #
#  G#  #
#   B# #
#  D@  #
########
```

After:

```text
########
#      #
# AE#  #
#  G#  #
#   B# #
# D @  #
########
```


## Graph Facts

- Status: complete
- Reachable states: 9984
- Legal transitions: 27457
- Event-only illegal transitions: 964
- Winning states: 332
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 9984
- Legal transitions: 27457
- Budget: maxStates=100000
- Compressed regions: 436
- Bidirectional transitions: 26472
- Commitment transitions: 985
- Winning regions: 332
- Initial region: r0, states=23, dist=0, internalBidirectional=58, commitments=5, viableCommitments=5, deadCommitments=0, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0 -> r1@1 -> r2@3 -> r3@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=319, edges=635, winReachable=297, winning=255, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=31, mergingWinSccs=205
- Initial SCC: s0, states=804, dist=0, out=64, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 804 | 64 | 0 | 0 | 0 | 0 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=9984, regions=436, solution commitments=3
- Opening: commitments=5, viable=5, dead=0, optimal=0
- Forced chain: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=0/3
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 0 | 5 | 0 | 0 | multiple viable choices |
| 2 | r1 | r2 | 0 | 6 | 0 | 0 | multiple viable choices |
| 4 | r2 | r3 | 0 | 4 | 0 | 0 | multiple viable choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 0 | 23 | 5 | 5 | 0 | 0 | 0 | r1 | no | no | no |
| r1 | 1 | 0 | 23 | 6 | 6 | 0 | 0 | 0 | r2 | no | no | no |
| r2 | 3 | 0 | 23 | 4 | 4 | 0 | 0 | 0 | r3 | no | no | no |
| r3 | 5 | 0 | 23 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 0 | 5 | 5 | 0 | 0 | 0 | r1 | yes | yes | no | no | no | no | none |
| 1 | left | r1 | yes | 0 | 6 | 6 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D |
| 2 | left | r1 | no | 0 | 6 | 6 | 0 | 0 | 0 | r2 | yes | yes | no | no | no | no | walk |
| 3 | left | r2 | yes | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D |
| 4 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r3 | yes | yes | no | no | no | no | walk |
| 5 | left | r3 | yes | 0 | 4 | 4 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D |
| 6 | left | r3 | no | 0 | 4 | 4 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r3 | no | 0 | 4 | 4 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r3 | no | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 8 | 54 | found |  |
| without_blocked_portal_push | yes | 12 | 19 | found |  |
| without_portal_teleport | yes | 8 | 37 | found |  |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=60
- Winning bypass: found cost=12, inputs=up up up up left left left left down left up up

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

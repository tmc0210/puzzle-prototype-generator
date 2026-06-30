# Level Analysis: ls20_fresh_reciprocal_blocker_v3

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_reciprocal_blocker_v3
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_as_dynamic_blocker, K_multi_instance_same_kind

## Initial State

```text
###########
#         #
##AE##    #
## G#     #
##### #   #
##### B#  #
#      D@##
###########
```

## Shortest Solution

- Found: yes
- Cost: 13
- Depth: 13
- Explored states: 242
- Inputs: left left left right up up up left left left down down down
- Events: portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_portal:A portal_fallback_push:D walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_portal:A portal_fallback_push:D walk walk walk walk walk walk walk walk walk portal_enter:D portal_teleport:D->E
- Event counts: portal_enter:D=3, portal_exit_blocked:D->E=2, portal_exit_blocked_by_portal:A=2, portal_fallback_push:D=2, walk=10, portal_teleport:D->E=1

## Object Participation

- portal/entered via portal_enter: distinct=1, instances=D, events=3, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=1, instances=D, events=2, evidence=trace_lineage

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D

Before:

```text
###########
#         #
##AE##    #
## G#     #
##### #   #
##### B#  #
#      D@##
###########
```

After:

```text
###########
#         #
##AE##    #
## G#     #
##### #   #
##### B#  #
#     D @##
###########
```

### Step 3: left

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D

Before:

```text
###########
#         #
##AE##    #
## G#     #
##### #   #
##### B#  #
#     D@ ##
###########
```

After:

```text
###########
#         #
##AE##    #
## G#     #
##### #   #
##### B#  #
#    D @ ##
###########
```

### Step 13: down

- Legal: true
- Events: portal_enter:D, portal_teleport:D->E

Before:

```text
###########
#         #
##AE##    #
## G#     #
##### #   #
#####@B#  #
#    D   ##
###########
```

After:

```text
###########
#         #
##AE##    #
## @#     #
##### #   #
##### B#  #
#    D   ##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 1259
- Legal transitions: 3352
- Event-only illegal transitions: 81
- Winning states: 9
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1259
- Legal transitions: 3352
- Budget: maxStates=100000
- Compressed regions: 39
- Bidirectional transitions: 3304
- Commitment transitions: 48
- Winning regions: 9
- Initial region: r0, states=32, dist=1, internalBidirectional=82, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@3
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=37, edges=44, winReachable=10, winning=9, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=1, mergingWinSccs=0
- Initial SCC: s0, states=64, dist=1, out=5, winOut=3, deadOut=2
- SCC path: s0@0 -> s1@3

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 64 | 5 | 3 | 2 | 0 | 0 | s1 | no |
| s1 | 3 | 0 | 30 | 3 | 0 | 0 | 1 | 1 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=1259, regions=39, solution commitments=2
- Opening: commitments=3, viable=2, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=0/2
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 1 | 2 | 1 | 1 | multiple viable choices |
| 2 | r1 | r2 | 1 | 3 | 1 | 2 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 32 | 3 | 2 | 1 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 1 | 32 | 4 | 3 | 1 | 2 | 2 | r2 | no | no | no |
| r2 | 3 | 0 | 30 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 3 | 2 | 1 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | left | r1 | yes | 1 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D |
| 2 | left | r1 | no | 1 | 4 | 3 | 1 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 3 | left | r2 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_portal:A, portal_fallback_push:D |
| 4 | right | r2 | no | 0 | 3 | 1 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r2 | no | 0 | 3 | 1 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r2 | no | 0 | 3 | 1 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 0 | 3 | 1 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 0 | 3 | 1 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r2 | no | 0 | 3 | 1 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 0 | 3 | 1 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r2 | no | 0 | 3 | 1 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r2 | no | 0 | 3 | 1 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r2 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | portal_enter:D, portal_teleport:D->E |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 13 | 242 | found |  |
| without_blocked_portal_push | no | n/a | 32 | complete | search complete |
| without_portal_teleport | no | n/a | 861 | complete | search complete |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=248
- Winning bypass: none found; complete search, explored=1154

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

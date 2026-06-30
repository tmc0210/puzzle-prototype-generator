# Level Analysis: ls20_hard_chain_jam_candidate

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_hard_chain_jam_candidate
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_use_crate_to_block_portal_exit, K_blocked_portal_pushes_entrance

## Initial State

```text
########
# A  @ #
#     B#
#  C## #
###### #
#####G #
########
```

## Shortest Solution

- Found: yes
- Cost: 26
- Depth: 26
- Explored states: 467
- Inputs: right down down left up up right down right up right right down right right up right down down down down down up up left left
- Events: walk portal_enter:B portal_teleport:B->A walk pull_crate:crate#1 walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk walk pull_crate:crate#1 portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk walk pull_crate:crate#1 pull_crate:crate#1 walk walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk walk walk portal_enter:A portal_teleport:A->B
- Event counts: walk=15, portal_enter:B=4, portal_teleport:B->A=1, pull_crate:crate#1=4, portal_enter:A=3, portal_exit_blocked:A->B=2, portal_exit_blocked_by_wall=2, portal_fallback_push:A=2, portal_exit_blocked:B->A=3, portal_exit_blocked_by_crate:crate#1=3, portal_fallback_push:B=3, portal_teleport:A->B=1

## Object Participation

- crate/blocked_portal_exit via portal_exit_blocked_by_crate: distinct=1, instances=crate#1, events=3, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- crate/moved via pull_crate: distinct=1, instances=crate#1, events=4, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- portal/entered via portal_enter: distinct=2, instances=A, B, events=7, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=2, instances=A, B, events=5, evidence=trace_lineage

## Key Event Snapshots

### Step 2: down

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
########
# A   @#
#     B#
#  C## #
###### #
#####G #
########
```

After:

```text
########
# A    #
# @   B#
#  C## #
###### #
#####G #
########
```

### Step 4: left

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
# A    #
#     B#
# @C## #
###### #
#####G #
########
```

After:

```text
########
# A    #
#     B#
#@C ## #
###### #
#####G #
########
```

### Step 7: right

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A

Before:

```text
########
#@A    #
#     B#
# C ## #
###### #
#####G #
########
```

After:

```text
########
#@ A   #
#     B#
# C ## #
###### #
#####G #
########
```

### Step 10: up

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
#  A   #
# @   B#
# C ## #
###### #
#####G #
########
```

After:

```text
########
# @A   #
# C   B#
#   ## #
###### #
#####G #
########
```

### Step 11: right

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A

Before:

```text
########
# @A   #
# C   B#
#   ## #
###### #
#####G #
########
```

After:

```text
########
# @ A  #
# C   B#
#   ## #
###### #
#####G #
########
```

### Step 14: right

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
#   A  #
# C@  B#
#   ## #
###### #
#####G #
########
```

After:

```text
########
#   A  #
#  C@ B#
#   ## #
###### #
#####G #
########
```

### Step 15: right

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
#   A  #
#  C@ B#
#   ## #
###### #
#####G #
########
```

After:

```text
########
#   A  #
#   C@B#
#   ## #
###### #
#####G #
########
```

### Step 18: down

- Legal: true
- Events: portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B

Before:

```text
########
#   A @#
#   C B#
#   ## #
###### #
#####G #
########
```

After:

```text
########
#   A @#
#   C  #
#   ##B#
###### #
#####G #
########
```

### Step 20: down

- Legal: true
- Events: portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B

Before:

```text
########
#   A  #
#   C @#
#   ##B#
###### #
#####G #
########
```

After:

```text
########
#   A  #
#   C @#
#   ## #
######B#
#####G #
########
```

### Step 22: down

- Legal: true
- Events: portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B

Before:

```text
########
#   A  #
#   C  #
#   ##@#
######B#
#####G #
########
```

After:

```text
########
#   A  #
#   C  #
#   ##@#
###### #
#####GB#
########
```

### Step 26: left

- Legal: true
- Events: portal_enter:A, portal_teleport:A->B

Before:

```text
########
#   A@ #
#   C  #
#   ## #
###### #
#####GB#
########
```

After:

```text
########
#   A  #
#   C  #
#   ## #
###### #
#####@B#
########
```


## Graph Facts

- Status: complete
- Reachable states: 1231
- Legal transitions: 3078
- Event-only illegal transitions: 337
- Winning states: 14
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1231
- Legal transitions: 3078
- Budget: maxStates=100000
- Compressed regions: 120
- Bidirectional transitions: 2709
- Commitment transitions: 249
- Winning regions: 14
- Initial region: r0, states=12, dist=5, internalBidirectional=28, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@4 -> r5@7 -> r10@10 -> r12@11 -> r21@14 -> r24@15 -> r30@18 -> r32@20 -> r38@22
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=43, edges=70, winReachable=24, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=9, forcedWinPrefix=0/9, branchingWinSccs=8, mergingWinSccs=11
- Initial SCC: s0, states=12, dist=4, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s5@4 -> s6@7 -> s11@10 -> s14@11 -> s15@14 -> s16@15 -> s17@18 -> s22@20 -> s28@22

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 12 | 3 | 3 | 0 | 0 | 0 | s5 | no |
| s5 | 4 | 5 | 12 | 1 | 1 | 0 | 1 | 1 | s6 | yes |
| s6 | 7 | 4 | 12 | 2 | 2 | 0 | 2 | 2 | s11 | no |
| s11 | 10 | 3 | 36 | 4 | 4 | 0 | 2 | 2 | s14 | no |
| s14 | 11 | 5 | 8 | 2 | 1 | 1 | 3 | 3 | s15 | yes |
| s15 | 14 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | s16 | yes |
| s16 | 15 | 3 | 3 | 1 | 1 | 0 | 1 | 1 | s17 | yes |
| s17 | 18 | 2 | 205 | 4 | 1 | 3 | 3 | 3 | s22 | yes |
| s22 | 20 | 1 | 220 | 7 | 4 | 3 | 1 | 1 | s28 | no |
| s28 | 22 | 0 | 47 | 2 | 0 | 0 | 3 | 3 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=1231, regions=120, solution commitments=9
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/9, optimal prefix=0/9, forced viable commitments=4/9
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r2 | 5 | 3 | 0 | 1 | multiple viable choices |
| 6 | r2 | r5 | 6 | 1 | 0 | 1 | forced optimal |
| 9 | r5 | r10 | 5 | 2 | 0 | 1 | forced optimal |
| 10 | r10 | r12 | 4 | 2 | 0 | 1 | multiple viable choices |
| 13 | r12 | r21 | 5 | 1 | 1 | 1 | forced optimal |
| 14 | r21 | r24 | 4 | 1 | 0 | 1 | forced optimal |
| 17 | r24 | r30 | 3 | 1 | 0 | 1 | forced optimal |
| 19 | r30 | r32 | 2 | 3 | 0 | 1 | forced optimal |
| 21 | r32 | r38 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 12 | 3 | 3 | 0 | 1 | 1 | r2 | no | no | no |
| r2 | 4 | 6 | 12 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 7 | 5 | 12 | 2 | 2 | 0 | 1 | 1 | r10 | no | no | yes |
| r10 | 10 | 4 | 12 | 2 | 2 | 0 | 1 | 1 | r12 | no | no | no |
| r12 | 11 | 5 | 8 | 2 | 1 | 1 | 1 | 1 | r21 | no | yes | yes |
| r21 | 14 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | r24 | yes | yes | yes |
| r24 | 15 | 3 | 3 | 1 | 1 | 0 | 1 | 1 | r30 | yes | yes | yes |
| r30 | 18 | 2 | 4 | 3 | 3 | 0 | 1 | 1 | r32 | no | no | yes |
| r32 | 20 | 1 | 5 | 3 | 3 | 0 | 1 | 1 | r38 | no | no | yes |
| r38 | 22 | 0 | 7 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 5 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 5 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |
| 3 | down | r0 | no | 5 | 3 | 3 | 0 | 1 | 1 | r2 | yes | yes | no | no | no | no | walk |
| 4 | left | r2 | yes | 6 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 5 | up | r2 | no | 6 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r2 | no | 6 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 7 | right | r5 | yes | 5 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A |
| 8 | down | r5 | no | 5 | 2 | 2 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r5 | no | 5 | 2 | 2 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | no | yes | walk |
| 10 | up | r10 | yes | 4 | 2 | 2 | 0 | 1 | 1 | r12 | yes | yes | no | no | no | no | pull_crate:crate#1 |
| 11 | right | r12 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A |
| 12 | right | r12 | no | 5 | 2 | 1 | 1 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r12 | no | 5 | 2 | 1 | 1 | 1 | 1 | r21 | yes | yes | yes | yes | yes | yes | walk |
| 14 | right | r21 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r24 | yes | yes | yes | yes | yes | yes | pull_crate:crate#1 |
| 15 | right | r24 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 16 | up | r24 | no | 3 | 1 | 1 | 0 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r24 | no | 3 | 1 | 1 | 0 | 1 | 1 | r30 | yes | yes | yes | yes | yes | yes | walk |
| 18 | down | r30 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 19 | down | r30 | no | 2 | 3 | 3 | 0 | 1 | 1 | r32 | yes | yes | yes | yes | no | yes | walk |
| 20 | down | r32 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 21 | down | r32 | no | 1 | 3 | 3 | 0 | 1 | 1 | r38 | yes | yes | yes | yes | no | yes | walk |
| 22 | down | r38 | yes | 0 | 1 | 1 | 0 | 0 | 0 | r38 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 23 | up | r38 | no | 0 | 1 | 1 | 0 | 0 | 0 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r38 | no | 0 | 1 | 1 | 0 | 0 | 0 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r38 | no | 0 | 1 | 1 | 0 | 0 | 0 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r38 | no | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_teleport:A->B |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 60 | complete | search complete |
| without_blocked_portal_push | no | n/a | 60 | complete | search complete |
| without_portal_teleport | no | n/a | 1173 | complete | search complete |

## Target Event Checks

### K_use_crate_to_block_portal_exit

玩家可以故意把箱子拉到传送门出口，从而触发堵塞出口行为。

- Required events: pull_crate, portal_exit_blocked
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=502
- Winning bypass: none found; complete search, explored=1217

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=502
- Winning bypass: none found; complete search, explored=1217


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

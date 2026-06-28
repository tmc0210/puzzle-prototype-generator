# Level Analysis: ls20_fresh_single_crate_rail_v6_b_left

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_single_crate_rail_v6_b_left
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_use_crate_to_block_portal_exit, K_blocked_portal_pushes_entrance, K_portal_teleports_player

## Initial State

```text
########
####   #
####@ A#
####C  #
#####  #
#G###  #
#   B  #
########
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 552
- Inputs: up right right down down down left right down down left down down down left left left left left right right right up
- Events: pull_crate:crate#1 walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk pull_crate:crate#1 walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk pull_crate:crate#1 pull_crate:crate#1 pull_crate:crate#1 portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk walk walk portal_enter:A portal_teleport:A->B
- Event counts: pull_crate:crate#1=5, walk=11, portal_enter:A=4, portal_exit_blocked:A->B=3, portal_exit_blocked_by_wall=3, portal_fallback_push:A=3, portal_enter:B=3, portal_exit_blocked:B->A=3, portal_exit_blocked_by_crate:crate#1=3, portal_fallback_push:B=3, portal_teleport:A->B=1

## Object Participation

- crate/blocked_portal_exit via portal_exit_blocked_by_crate: distinct=1, instances=crate#1, events=3, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- crate/moved via pull_crate: distinct=1, instances=crate#1, events=5, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- portal/entered via portal_enter: distinct=2, instances=A, B, events=7, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=2, instances=A, B, events=6, evidence=trace_lineage

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
####   #
####@ A#
####C  #
#####  #
#G###  #
#   B  #
########
```

After:

```text
########
####@  #
####C A#
####   #
#####  #
#G###  #
#   B  #
########
```

### Step 4: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A

Before:

```text
########
####  @#
####C A#
####   #
#####  #
#G###  #
#   B  #
########
```

After:

```text
########
####  @#
####C  #
####  A#
#####  #
#G###  #
#   B  #
########
```

### Step 6: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A

Before:

```text
########
####   #
####C @#
####  A#
#####  #
#G###  #
#   B  #
########
```

After:

```text
########
####   #
####C @#
####   #
##### A#
#G###  #
#   B  #
########
```

### Step 8: right

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
####   #
####C@ #
####   #
##### A#
#G###  #
#   B  #
########
```

After:

```text
########
####   #
#### C@#
####   #
##### A#
#G###  #
#   B  #
########
```

### Step 10: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A

Before:

```text
########
####   #
#### C #
####  @#
##### A#
#G###  #
#   B  #
########
```

After:

```text
########
####   #
#### C #
####  @#
#####  #
#G### A#
#   B  #
########
```

### Step 12: down

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
####   #
#### C #
#### @ #
#####  #
#G### A#
#   B  #
########
```

After:

```text
########
####   #
####   #
#### C #
#####@ #
#G### A#
#   B  #
########
```

### Step 13: down

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
####   #
####   #
#### C #
#####@ #
#G### A#
#   B  #
########
```

After:

```text
########
####   #
####   #
####   #
#####C #
#G###@A#
#   B  #
########
```

### Step 14: down

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
####   #
####   #
####   #
#####C #
#G###@A#
#   B  #
########
```

After:

```text
########
####   #
####   #
####   #
#####  #
#G###CA#
#   B@ #
########
```

### Step 15: left

- Legal: true
- Events: portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B

Before:

```text
########
####   #
####   #
####   #
#####  #
#G###CA#
#   B@ #
########
```

After:

```text
########
####   #
####   #
####   #
#####  #
#G###CA#
#  B @ #
########
```

### Step 17: left

- Legal: true
- Events: portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B

Before:

```text
########
####   #
####   #
####   #
#####  #
#G###CA#
#  B@  #
########
```

After:

```text
########
####   #
####   #
####   #
#####  #
#G###CA#
# B @  #
########
```

### Step 19: left

- Legal: true
- Events: portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B

Before:

```text
########
####   #
####   #
####   #
#####  #
#G###CA#
# B@   #
########
```

After:

```text
########
####   #
####   #
####   #
#####  #
#G###CA#
#B @   #
########
```

### Step 23: up

- Legal: true
- Events: portal_enter:A, portal_teleport:A->B

Before:

```text
########
####   #
####   #
####   #
#####  #
#G###CA#
#B    @#
########
```

After:

```text
########
####   #
####   #
####   #
#####  #
#@###CA#
#B     #
########
```


## Graph Facts

- Status: complete
- Reachable states: 1462
- Legal transitions: 3658
- Event-only illegal transitions: 372
- Winning states: 14
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1462
- Legal transitions: 3658
- Budget: maxStates=100000
- Compressed regions: 135
- Bidirectional transitions: 3223
- Commitment transitions: 298
- Winning regions: 14
- Initial region: r0, states=13, dist=5, internalBidirectional=30, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@4 -> r7@6 -> r16@8 -> r22@10 -> r24@12 -> r30@13 -> r35@14 -> r38@15 -> r44@17 -> r50@19
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=33, edges=50, winReachable=14, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=3, mergingWinSccs=6
- Initial SCC: s0, states=52, dist=4, out=4, winOut=2, deadOut=2
- SCC path: s0@0 -> s3@1 -> s5@8 -> s9@15 -> s14@17 -> s30@19

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 52 | 4 | 2 | 2 | 0 | 0 | s3 | no |
| s3 | 1 | 4 | 52 | 3 | 1 | 2 | 1 | 1 | s5 | yes |
| s5 | 8 | 3 | 205 | 4 | 1 | 3 | 2 | 2 | s9 | yes |
| s9 | 15 | 2 | 220 | 4 | 1 | 3 | 1 | 1 | s14 | yes |
| s14 | 17 | 1 | 235 | 7 | 4 | 3 | 1 | 1 | s30 | no |
| s30 | 19 | 0 | 6 | 0 | 0 | 0 | 2 | 2 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=1462, regions=135, solution commitments=11
- Opening: commitments=4, viable=3, dead=1, optimal=1
- Forced chain: viable prefix=0/11, optimal prefix=0/11, forced viable commitments=1/11
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 3 | 1 | 1 | multiple viable choices |
| 3 | r1 | r3 | 6 | 1 | 1 | 1 | forced optimal |
| 5 | r3 | r7 | 5 | 3 | 0 | 1 | multiple viable choices |
| 7 | r7 | r16 | 6 | 3 | 0 | 2 | multiple optimal choices |
| 9 | r16 | r22 | 5 | 2 | 0 | 1 | multiple viable choices |
| 11 | r22 | r24 | 6 | 2 | 1 | 2 | multiple optimal choices |
| 12 | r24 | r30 | 5 | 2 | 1 | 1 | forced optimal |
| 13 | r30 | r35 | 4 | 2 | 0 | 2 | multiple optimal choices |
| 14 | r35 | r38 | 3 | 2 | 0 | 1 | forced optimal |
| 16 | r38 | r44 | 2 | 2 | 0 | 1 | forced optimal |
| 18 | r44 | r50 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 13 | 4 | 3 | 1 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 6 | 13 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 4 | 5 | 13 | 3 | 3 | 0 | 1 | 1 | r7 | no | no | no |
| r7 | 6 | 6 | 13 | 3 | 3 | 0 | 2 | 2 | r16 | no | no | no |
| r16 | 8 | 5 | 8 | 2 | 2 | 0 | 1 | 1 | r22 | no | no | no |
| r22 | 10 | 6 | 13 | 3 | 2 | 1 | 2 | 2 | r24 | no | no | no |
| r24 | 12 | 5 | 10 | 3 | 2 | 1 | 1 | 1 | r30 | no | no | yes |
| r30 | 13 | 4 | 3 | 2 | 2 | 0 | 2 | 2 | r35 | no | no | no |
| r35 | 14 | 3 | 2 | 2 | 2 | 0 | 1 | 1 | r38 | no | no | yes |
| r38 | 15 | 2 | 3 | 2 | 2 | 0 | 1 | 1 | r44 | no | no | yes |
| r44 | 17 | 1 | 4 | 2 | 2 | 0 | 1 | 1 | r50 | no | no | yes |
| r50 | 19 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 4 | 3 | 1 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | up | r1 | yes | 6 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 2 | right | r1 | no | 6 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 6 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 4 | down | r3 | yes | 5 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A |
| 5 | down | r3 | no | 5 | 3 | 3 | 0 | 1 | 1 | r7 | yes | yes | no | no | no | no | walk |
| 6 | down | r7 | yes | 6 | 3 | 3 | 0 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A |
| 7 | left | r7 | no | 6 | 3 | 3 | 0 | 2 | 2 | r16 | yes | yes | yes | yes | no | no | walk |
| 8 | right | r16 | yes | 5 | 2 | 2 | 0 | 1 | 1 | r16 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 9 | down | r16 | no | 5 | 2 | 2 | 0 | 1 | 1 | r22 | yes | yes | no | no | no | no | walk |
| 10 | down | r22 | yes | 6 | 3 | 2 | 1 | 2 | 2 | r22 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A |
| 11 | left | r22 | no | 6 | 3 | 2 | 1 | 2 | 2 | r24 | yes | yes | yes | yes | no | no | walk |
| 12 | down | r24 | yes | 5 | 3 | 2 | 1 | 1 | 1 | r30 | yes | yes | yes | yes | no | yes | pull_crate:crate#1 |
| 13 | down | r30 | yes | 4 | 2 | 2 | 0 | 2 | 2 | r35 | yes | yes | yes | yes | no | no | pull_crate:crate#1 |
| 14 | down | r35 | yes | 3 | 2 | 2 | 0 | 1 | 1 | r38 | yes | yes | yes | yes | no | yes | pull_crate:crate#1 |
| 15 | left | r38 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 16 | left | r38 | no | 2 | 2 | 2 | 0 | 1 | 1 | r44 | yes | yes | yes | yes | no | yes | walk |
| 17 | left | r44 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r44 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 18 | left | r44 | no | 1 | 2 | 2 | 0 | 1 | 1 | r50 | yes | yes | yes | yes | no | yes | walk |
| 19 | left | r50 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 20 | right | r50 | no | 0 | 0 | 0 | 0 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r50 | no | 0 | 0 | 0 | 0 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r50 | no | 0 | 0 | 0 | 0 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r50 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_teleport:A->B |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 78 | complete | search complete |
| without_blocked_portal_push | no | n/a | 78 | complete | search complete |
| without_portal_teleport | no | n/a | 1403 | complete | search complete |

## Target Event Checks

### K_use_crate_to_block_portal_exit

玩家可以故意把箱子拉到传送门出口，从而触发堵塞出口行为。

- Required events: pull_crate, portal_exit_blocked
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=665
- Winning bypass: none found; complete search, explored=1526

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=665
- Winning bypass: none found; complete search, explored=1526

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=1178
- Winning bypass: none found; complete search, explored=2929


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

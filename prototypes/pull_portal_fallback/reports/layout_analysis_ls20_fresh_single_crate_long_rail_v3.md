# Level Analysis: ls20_fresh_single_crate_long_rail_v3

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_single_crate_long_rail_v3
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
#    B #
########
```

## Shortest Solution

- Found: yes
- Cost: 26
- Depth: 26
- Explored states: 690
- Inputs: up right right down down down left right down left down down down down left left left left left left left right right up right up
- Events: pull_crate:crate#1 walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk pull_crate:crate#1 walk walk pull_crate:crate#1 pull_crate:crate#1 portal_enter:B portal_teleport:B->A walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk walk walk walk portal_enter:A portal_teleport:A->B
- Event counts: pull_crate:crate#1=4, walk=14, portal_enter:A=3, portal_exit_blocked:A->B=2, portal_exit_blocked_by_wall=2, portal_fallback_push:A=2, portal_enter:B=5, portal_teleport:B->A=1, portal_exit_blocked:B->A=4, portal_exit_blocked_by_crate:crate#1=4, portal_fallback_push:B=4, portal_teleport:A->B=1

## Object Participation

- crate/blocked_portal_exit via portal_exit_blocked_by_crate: distinct=1, instances=crate#1, events=4, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- crate/moved via pull_crate: distinct=1, instances=crate#1, events=4, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- portal/entered via portal_enter: distinct=2, instances=A, B, events=8, evidence=trace_lineage
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
#    B #
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
#    B #
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
#    B #
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
#    B #
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
#    B #
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
#    B #
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
#    B #
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
#    B #
########
```

### Step 11: down

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
####   #
#### C #
#### @ #
##### A#
#G###  #
#    B #
########
```

After:

```text
########
####   #
####   #
#### C #
#####@A#
#G###  #
#    B #
########
```

### Step 12: down

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
####   #
####   #
#### C #
#####@A#
#G###  #
#    B #
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#G###@ #
#    B #
########
```

### Step 13: down

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
########
####   #
####   #
####   #
#####CA#
#G###@ #
#    B #
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#G### @#
#    B #
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
#####CA#
#G###  #
#    B@#
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#G###  #
#   B @#
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
#####CA#
#G###  #
#   B@ #
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#G###  #
#  B @ #
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
#####CA#
#G###  #
#  B@  #
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#G###  #
# B @  #
########
```

### Step 21: left

- Legal: true
- Events: portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B

Before:

```text
########
####   #
####   #
####   #
#####CA#
#G###  #
# B@   #
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#G###  #
#B @   #
########
```

### Step 26: up

- Legal: true
- Events: portal_enter:A, portal_teleport:A->B

Before:

```text
########
####   #
####   #
####   #
#####CA#
#G### @#
#B     #
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#@###  #
#B     #
########
```


## Graph Facts

- Status: complete
- Reachable states: 1600
- Legal transitions: 3985
- Event-only illegal transitions: 425
- Winning states: 14
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1600
- Legal transitions: 3985
- Budget: maxStates=100000
- Compressed regions: 152
- Bidirectional transitions: 3511
- Commitment transitions: 322
- Winning regions: 14
- Initial region: r0, states=12, dist=6, internalBidirectional=28, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@4 -> r5@6 -> r10@8 -> r18@11 -> r20@12 -> r28@15 -> r31@17 -> r38@19 -> r46@21
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=48, edges=76, winReachable=25, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=10, forcedWinPrefix=0/10, branchingWinSccs=8, mergingWinSccs=11
- Initial SCC: s0, states=12, dist=5, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s6@1 -> s7@4 -> s12@6 -> s13@8 -> s14@11 -> s15@12 -> s16@15 -> s20@17 -> s24@19 -> s33@21

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 12 | 3 | 3 | 0 | 0 | 0 | s6 | no |
| s6 | 1 | 6 | 12 | 1 | 1 | 0 | 1 | 1 | s7 | yes |
| s7 | 4 | 5 | 12 | 2 | 2 | 0 | 2 | 2 | s12 | no |
| s12 | 6 | 7 | 12 | 2 | 1 | 1 | 2 | 2 | s13 | yes |
| s13 | 8 | 6 | 8 | 2 | 1 | 1 | 3 | 3 | s14 | yes |
| s14 | 11 | 5 | 4 | 1 | 1 | 0 | 1 | 1 | s15 | yes |
| s15 | 12 | 4 | 3 | 1 | 1 | 0 | 1 | 1 | s16 | yes |
| s16 | 15 | 3 | 205 | 4 | 1 | 3 | 3 | 3 | s20 | yes |
| s20 | 17 | 2 | 220 | 4 | 1 | 3 | 1 | 1 | s24 | yes |
| s24 | 19 | 1 | 235 | 7 | 4 | 3 | 1 | 1 | s33 | no |
| s33 | 21 | 0 | 50 | 2 | 0 | 0 | 3 | 3 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=1600, regions=152, solution commitments=10
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Forced chain: viable prefix=0/10, optimal prefix=0/10, forced viable commitments=5/10
- Endgame tail: 5 step(s) after first entering a winning region
- Reading hints: 5 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 3 | 0 | 1 | multiple viable choices |
| 3 | r1 | r3 | 7 | 1 | 0 | 1 | forced optimal |
| 5 | r3 | r5 | 6 | 2 | 0 | 1 | multiple viable choices |
| 7 | r5 | r10 | 7 | 1 | 1 | 1 | forced optimal |
| 10 | r10 | r18 | 6 | 1 | 1 | 1 | forced optimal |
| 11 | r18 | r20 | 5 | 1 | 0 | 1 | forced optimal |
| 14 | r20 | r28 | 4 | 1 | 0 | 1 | forced optimal |
| 16 | r28 | r31 | 3 | 3 | 0 | 1 | forced optimal |
| 18 | r31 | r38 | 2 | 3 | 0 | 1 | forced optimal |
| 20 | r38 | r46 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 12 | 3 | 3 | 0 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 7 | 12 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 6 | 12 | 2 | 2 | 0 | 1 | 1 | r5 | no | no | no |
| r5 | 6 | 7 | 12 | 2 | 1 | 1 | 1 | 1 | r10 | no | yes | yes |
| r10 | 8 | 6 | 8 | 2 | 1 | 1 | 1 | 1 | r18 | no | yes | yes |
| r18 | 11 | 5 | 4 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes |
| r20 | 12 | 4 | 3 | 1 | 1 | 0 | 1 | 1 | r28 | yes | yes | yes |
| r28 | 15 | 3 | 4 | 3 | 3 | 0 | 1 | 1 | r31 | no | no | yes |
| r31 | 17 | 2 | 5 | 3 | 3 | 0 | 1 | 1 | r38 | no | no | yes |
| r38 | 19 | 1 | 6 | 3 | 3 | 0 | 1 | 1 | r46 | no | no | yes |
| r46 | 21 | 0 | 8 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 3 | 3 | 0 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | up | r1 | yes | 7 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 2 | right | r1 | no | 7 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 7 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 4 | down | r3 | yes | 6 | 2 | 2 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A |
| 5 | down | r3 | no | 6 | 2 | 2 | 0 | 1 | 1 | r5 | yes | yes | no | no | no | no | walk |
| 6 | down | r5 | yes | 7 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A |
| 7 | left | r5 | no | 7 | 2 | 1 | 1 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | walk |
| 8 | right | r10 | yes | 6 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 9 | down | r10 | no | 6 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r10 | no | 6 | 2 | 1 | 1 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | walk |
| 11 | down | r18 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | pull_crate:crate#1 |
| 12 | down | r20 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 13 | down | r20 | no | 4 | 1 | 1 | 0 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |
| 14 | down | r20 | no | 4 | 1 | 1 | 0 | 1 | 1 | r28 | yes | yes | yes | yes | yes | yes | walk |
| 15 | left | r28 | yes | 3 | 3 | 3 | 0 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 16 | left | r28 | no | 3 | 3 | 3 | 0 | 1 | 1 | r31 | yes | yes | yes | yes | no | yes | walk |
| 17 | left | r31 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r31 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 18 | left | r31 | no | 2 | 3 | 3 | 0 | 1 | 1 | r38 | yes | yes | yes | yes | no | yes | walk |
| 19 | left | r38 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 20 | left | r38 | no | 1 | 3 | 3 | 0 | 1 | 1 | r46 | yes | yes | yes | yes | no | yes | walk |
| 21 | left | r46 | yes | 0 | 1 | 1 | 0 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 22 | right | r46 | no | 0 | 1 | 1 | 0 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r46 | no | 0 | 1 | 1 | 0 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r46 | no | 0 | 1 | 1 | 0 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r46 | no | 0 | 1 | 1 | 0 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | up | r46 | no | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_teleport:A->B |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 60 | complete | search complete |
| without_blocked_portal_push | no | n/a | 60 | complete | search complete |
| without_portal_teleport | no | n/a | 1529 | complete | search complete |

## Target Event Checks

### K_use_crate_to_block_portal_exit

玩家可以故意把箱子拉到传送门出口，从而触发堵塞出口行为。

- Required events: pull_crate, portal_exit_blocked
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=712
- Winning bypass: none found; complete search, explored=1586

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=712
- Winning bypass: none found; complete search, explored=1586

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=1236
- Winning bypass: none found; complete search, explored=3115


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

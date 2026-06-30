# Level Analysis: ls20_fresh_single_crate_rail_v7_goal_shift

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_single_crate_rail_v7_goal_shift
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
##G##  #
#    B #
########
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 463
- Inputs: up right right down down down left right down left down down down down left left left left left left left left up
- Events: pull_crate:crate#1 walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk pull_crate:crate#1 walk walk pull_crate:crate#1 pull_crate:crate#1 portal_enter:B portal_teleport:B->A walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk walk
- Event counts: pull_crate:crate#1=4, walk=12, portal_enter:A=2, portal_exit_blocked:A->B=2, portal_exit_blocked_by_wall=2, portal_fallback_push:A=2, portal_enter:B=5, portal_teleport:B->A=1, portal_exit_blocked:B->A=4, portal_exit_blocked_by_crate:crate#1=4, portal_fallback_push:B=4

## Object Participation

- crate/blocked_portal_exit via portal_exit_blocked_by_crate: distinct=1, instances=crate#1, events=4, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- crate/moved via pull_crate: distinct=1, instances=crate#1, events=4, evidence=trace_lineage
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##@ #
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
##G##@ #
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
##G## @#
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
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
##G##  #
#B @   #
########
```


## Graph Facts

- Status: complete
- Reachable states: 1627
- Legal transitions: 4039
- Event-only illegal transitions: 425
- Winning states: 36
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1627
- Legal transitions: 4039
- Budget: maxStates=100000
- Compressed regions: 152
- Bidirectional transitions: 3565
- Commitment transitions: 322
- Winning regions: 36
- Initial region: r0, states=12, dist=5, internalBidirectional=28, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@4 -> r5@6 -> r10@8 -> r18@11 -> r20@12 -> r28@15 -> r31@17 -> r38@19 -> r46@21
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=48, edges=79, winReachable=29, winning=10, winSubgraph=branching_win_dag
- Solution irreversible path: steps=10, forcedWinPrefix=0/10, branchingWinSccs=8, mergingWinSccs=13
- Initial SCC: s0, states=12, dist=4, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s6@1 -> s7@4 -> s12@6 -> s13@8 -> s14@11 -> s15@12 -> s16@15 -> s20@17 -> s29@19 -> s36@21

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 12 | 3 | 3 | 0 | 0 | 0 | s6 | no |
| s6 | 1 | 5 | 12 | 1 | 1 | 0 | 1 | 1 | s7 | yes |
| s7 | 4 | 4 | 12 | 2 | 2 | 0 | 2 | 2 | s12 | no |
| s12 | 6 | 6 | 12 | 2 | 1 | 1 | 2 | 2 | s13 | yes |
| s13 | 8 | 5 | 8 | 2 | 1 | 1 | 3 | 3 | s14 | yes |
| s14 | 11 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | s15 | yes |
| s15 | 12 | 3 | 3 | 1 | 1 | 0 | 1 | 1 | s16 | yes |
| s16 | 15 | 2 | 205 | 4 | 1 | 3 | 3 | 3 | s20 | yes |
| s20 | 17 | 1 | 220 | 7 | 4 | 3 | 1 | 1 | s29 | no |
| s29 | 19 | 0 | 47 | 3 | 0 | 0 | 3 | 3 | s36 | no |
| s36 | 21 | 0 | 265 | 3 | 0 | 0 | 4 | 4 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=1627, regions=152, solution commitments=10
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/10, optimal prefix=0/10, forced viable commitments=5/10
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 3 | 0 | 1 | multiple viable choices |
| 3 | r1 | r3 | 6 | 1 | 0 | 1 | forced optimal |
| 5 | r3 | r5 | 5 | 2 | 0 | 1 | multiple viable choices |
| 7 | r5 | r10 | 6 | 1 | 1 | 1 | forced optimal |
| 10 | r10 | r18 | 5 | 1 | 1 | 1 | forced optimal |
| 11 | r18 | r20 | 4 | 1 | 0 | 1 | forced optimal |
| 14 | r20 | r28 | 3 | 1 | 0 | 1 | forced optimal |
| 16 | r28 | r31 | 2 | 3 | 0 | 1 | forced optimal |
| 18 | r31 | r38 | 1 | 3 | 0 | 1 | forced optimal |
| 20 | r38 | r46 | 0 | 2 | 0 | 0 | multiple viable choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 12 | 3 | 3 | 0 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 6 | 12 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 5 | 12 | 2 | 2 | 0 | 1 | 1 | r5 | no | no | no |
| r5 | 6 | 6 | 12 | 2 | 1 | 1 | 1 | 1 | r10 | no | yes | yes |
| r10 | 8 | 5 | 8 | 2 | 1 | 1 | 1 | 1 | r18 | no | yes | yes |
| r18 | 11 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes |
| r20 | 12 | 3 | 3 | 1 | 1 | 0 | 1 | 1 | r28 | yes | yes | yes |
| r28 | 15 | 2 | 4 | 3 | 3 | 0 | 1 | 1 | r31 | no | no | yes |
| r31 | 17 | 1 | 5 | 3 | 3 | 0 | 1 | 1 | r38 | no | no | yes |
| r38 | 19 | 0 | 7 | 2 | 2 | 0 | 0 | 0 | r46 | no | no | no |
| r46 | 21 | 0 | 8 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 3 | 3 | 0 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | up | r1 | yes | 6 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 2 | right | r1 | no | 6 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 6 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 4 | down | r3 | yes | 5 | 2 | 2 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A |
| 5 | down | r3 | no | 5 | 2 | 2 | 0 | 1 | 1 | r5 | yes | yes | no | no | no | no | walk |
| 6 | down | r5 | yes | 6 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_wall, portal_fallback_push:A |
| 7 | left | r5 | no | 6 | 2 | 1 | 1 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | walk |
| 8 | right | r10 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 9 | down | r10 | no | 5 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r10 | no | 5 | 2 | 1 | 1 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | walk |
| 11 | down | r18 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | pull_crate:crate#1 |
| 12 | down | r20 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 13 | down | r20 | no | 3 | 1 | 1 | 0 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_teleport:B->A |
| 14 | down | r20 | no | 3 | 1 | 1 | 0 | 1 | 1 | r28 | yes | yes | yes | yes | yes | yes | walk |
| 15 | left | r28 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 16 | left | r28 | no | 2 | 3 | 3 | 0 | 1 | 1 | r31 | yes | yes | yes | yes | no | yes | walk |
| 17 | left | r31 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r31 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 18 | left | r31 | no | 1 | 3 | 3 | 0 | 1 | 1 | r38 | yes | yes | yes | yes | no | yes | walk |
| 19 | left | r38 | yes | 0 | 2 | 2 | 0 | 0 | 0 | r38 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 20 | left | r38 | no | 0 | 2 | 2 | 0 | 0 | 0 | r46 | yes | yes | no | no | no | no | walk |
| 21 | left | r46 | yes | 0 | 2 | 2 | 0 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 22 | left | r46 | no | 0 | 2 | 2 | 0 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r46 | no | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 60 | complete | search complete |
| without_blocked_portal_push | no | n/a | 60 | complete | search complete |
| without_portal_teleport | yes | 23 | 373 | found |  |

## Target Event Checks

### K_use_crate_to_block_portal_exit

玩家可以故意把箱子拉到传送门出口，从而触发堵塞出口行为。

- Required events: pull_crate, portal_exit_blocked
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=482
- Winning bypass: none found; complete search, explored=1591

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=482
- Winning bypass: none found; complete search, explored=1591

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: found cost=23, inputs=up right right down down down left right down left down down right down left left left left left left left left up
- Winning bypass: found cost=23, inputs=up right right down down down left right down left down down right down left left left left left left left left up


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

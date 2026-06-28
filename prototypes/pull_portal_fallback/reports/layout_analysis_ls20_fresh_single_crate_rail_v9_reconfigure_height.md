# Level Analysis: ls20_fresh_single_crate_rail_v9_reconfigure_height

## Summary

- Prototype: pull_portal_fallback
- Title: ls20_fresh_single_crate_rail_v9_reconfigure_height
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
#####  #
##   B #
##G#####
########
```

## Shortest Solution

- Found: yes
- Cost: 28
- Depth: 28
- Explored states: 838
- Inputs: up right right down down down left right down left down down down down left left left left left right up down left left left up right down
- Events: pull_crate:crate#1 walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_wall portal_fallback_push:A walk pull_crate:crate#1 walk walk pull_crate:crate#1 pull_crate:crate#1 portal_enter:B portal_teleport:B->A walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_push:B walk walk pull_crate:crate#1 walk walk portal_enter:B portal_teleport:B->A pull_crate:crate#1 walk portal_enter:A portal_teleport:A->B
- Event counts: pull_crate:crate#1=6, walk=14, portal_enter:A=3, portal_exit_blocked:A->B=2, portal_exit_blocked_by_wall=2, portal_fallback_push:A=2, portal_enter:B=5, portal_teleport:B->A=2, portal_exit_blocked:B->A=3, portal_exit_blocked_by_crate:crate#1=3, portal_fallback_push:B=3, portal_teleport:A->B=1

## Object Participation

- crate/blocked_portal_exit via portal_exit_blocked_by_crate: distinct=1, instances=crate#1, events=3, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- crate/moved via pull_crate: distinct=1, instances=crate#1, events=6, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- portal/entered via portal_enter: distinct=2, instances=A, B, events=8, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=2, instances=A, B, events=5, evidence=trace_lineage

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
#####  #
##   B #
##G#####
########
```

After:

```text
########
####@  #
####C A#
####   #
#####  #
#####  #
##   B #
##G#####
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
#####  #
##   B #
##G#####
########
```

After:

```text
########
####  @#
####C  #
####  A#
#####  #
#####  #
##   B #
##G#####
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
#####  #
##   B #
##G#####
########
```

After:

```text
########
####   #
####C @#
####   #
##### A#
#####  #
##   B #
##G#####
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
#####  #
##   B #
##G#####
########
```

After:

```text
########
####   #
#### C@#
####   #
##### A#
#####  #
##   B #
##G#####
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
#####  #
##   B #
##G#####
########
```

After:

```text
########
####   #
####   #
#### C #
#####@A#
#####  #
##   B #
##G#####
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
#####  #
##   B #
##G#####
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#####@ #
##   B #
##G#####
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
#####@ #
##   B #
##G#####
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
##### @#
##   B #
##G#####
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
#####  #
##   B@#
##G#####
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#####  #
##  B @#
##G#####
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
#####  #
##  B@ #
##G#####
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#####  #
## B @ #
##G#####
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
#####  #
## B@  #
##G#####
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#####  #
##B @  #
##G#####
########
```

### Step 22: down

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
####   #
####   #
####   #
#####CA#
#####@ #
##B    #
##G#####
########
```

After:

```text
########
####   #
####   #
####   #
##### A#
#####C #
##B  @ #
##G#####
########
```

### Step 25: left

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
########
####   #
####   #
####   #
##### A#
#####C #
##B@   #
##G#####
########
```

After:

```text
########
####   #
####   #
####   #
#####@A#
#####C #
##B    #
##G#####
########
```

### Step 26: up

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
########
####   #
####   #
####   #
#####@A#
#####C #
##B    #
##G#####
########
```

After:

```text
########
####   #
####   #
#### @ #
#####CA#
#####  #
##B    #
##G#####
########
```

### Step 28: down

- Legal: true
- Events: portal_enter:A, portal_teleport:A->B

Before:

```text
########
####   #
####   #
####  @#
#####CA#
#####  #
##B    #
##G#####
########
```

After:

```text
########
####   #
####   #
####   #
#####CA#
#####  #
##B    #
##@#####
########
```


## Graph Facts

- Status: complete
- Reachable states: 1171
- Legal transitions: 2927
- Event-only illegal transitions: 325
- Winning states: 11
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1171
- Legal transitions: 2927
- Budget: maxStates=100000
- Compressed regions: 113
- Bidirectional transitions: 2573
- Commitment transitions: 238
- Winning regions: 11
- Initial region: r0, states=12, dist=5, internalBidirectional=28, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@4 -> r5@6 -> r10@8 -> r18@11 -> r20@12 -> r28@15 -> r31@17 -> r38@19 -> r56@22 -> r82@26
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=36, edges=58, winReachable=19, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=9, forcedWinPrefix=0/9, branchingWinSccs=7, mergingWinSccs=9
- Initial SCC: s0, states=12, dist=4, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s6@1 -> s7@4 -> s12@6 -> s13@8 -> s14@11 -> s15@12 -> s16@15 -> s20@17 -> s25@19

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
| s20 | 17 | 1 | 220 | 7 | 4 | 3 | 1 | 1 | s25 | no |
| s25 | 19 | 0 | 47 | 1 | 0 | 0 | 2 | 2 | win/end | no |

### Bidirectional Compression Digest

- Shape: states=1171, regions=113, solution commitments=11
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Forced chain: viable prefix=0/11, optimal prefix=0/11, forced viable commitments=5/11
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 3 | 0 | 1 | multiple viable choices |
| 3 | r1 | r3 | 7 | 1 | 0 | 1 | forced optimal |
| 5 | r3 | r5 | 6 | 2 | 0 | 1 | multiple viable choices |
| 7 | r5 | r10 | 7 | 1 | 1 | 1 | forced optimal |
| 10 | r10 | r18 | 6 | 1 | 1 | 1 | forced optimal |
| 11 | r18 | r20 | 5 | 1 | 0 | 1 | forced optimal |
| 14 | r20 | r28 | 4 | 1 | 0 | 1 | forced optimal |
| 16 | r28 | r31 | 3 | 3 | 0 | 1 | forced optimal |
| 18 | r31 | r38 | 2 | 3 | 0 | 1 | forced optimal |
| 21 | r38 | r56 | 1 | 2 | 0 | 1 | multiple viable choices |
| 25 | r56 | r82 | 1 | 2 | 0 | 2 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 12 | 3 | 3 | 0 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 7 | 12 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 6 | 12 | 2 | 2 | 0 | 1 | 1 | r5 | no | no | no |
| r5 | 6 | 7 | 12 | 2 | 1 | 1 | 1 | 1 | r10 | no | yes | yes |
| r10 | 8 | 6 | 8 | 2 | 1 | 1 | 1 | 1 | r18 | no | yes | yes |
| r18 | 11 | 5 | 4 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes |
| r20 | 12 | 4 | 3 | 1 | 1 | 0 | 1 | 1 | r28 | yes | yes | yes |
| r28 | 15 | 3 | 4 | 3 | 3 | 0 | 1 | 1 | r31 | no | no | yes |
| r31 | 17 | 2 | 5 | 3 | 3 | 0 | 1 | 1 | r38 | no | no | yes |
| r38 | 19 | 1 | 6 | 2 | 2 | 0 | 1 | 1 | r56 | no | no | no |
| r56 | 22 | 1 | 6 | 2 | 2 | 0 | 2 | 2 | r82 | no | no | no |
| r82 | 26 | 0 | 10 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 3 | 3 | 0 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
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
| 19 | left | r38 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | portal_enter:B, portal_exit_blocked:B->A, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:B |
| 20 | right | r38 | no | 1 | 2 | 2 | 0 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r38 | no | 1 | 2 | 2 | 0 | 1 | 1 | r56 | yes | yes | no | no | no | no | walk |
| 22 | down | r56 | yes | 1 | 2 | 2 | 0 | 2 | 2 | r56 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 23 | left | r56 | no | 1 | 2 | 2 | 0 | 2 | 2 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r56 | no | 1 | 2 | 2 | 0 | 2 | 2 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r56 | no | 1 | 2 | 2 | 0 | 2 | 2 | r82 | yes | yes | yes | yes | no | no | portal_enter:B, portal_teleport:B->A |
| 26 | up | r82 | yes | 0 | 1 | 1 | 0 | 0 | 0 | r82 | no | n/a | n/a | n/a | n/a | n/a | pull_crate:crate#1 |
| 27 | right | r82 | no | 0 | 1 | 1 | 0 | 0 | 0 | r82 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r82 | no | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | portal_enter:A, portal_teleport:A->B |

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 60 | complete | search complete |
| without_blocked_portal_push | no | n/a | 60 | complete | search complete |
| without_portal_teleport | no | n/a | 1085 | complete | search complete |

## Target Event Checks

### K_use_crate_to_block_portal_exit

玩家可以故意把箱子拉到传送门出口，从而触发堵塞出口行为。

- Required events: pull_crate, portal_exit_blocked
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=857
- Winning bypass: none found; complete search, explored=1160

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=857
- Winning bypass: none found; complete search, explored=1160

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=1483
- Winning bypass: none found; complete search, explored=2245


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: coupled_pull_d_blocks_b_trim1

## Summary

- Prototype: pull_portal_fallback
- Title: Coupled pull sets portal blocker
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_portal_teleports_player, K_pull_single_crate, K_blocked_portal_pushes_entrance

## Initial State

```text
############
###  #######
#G A #######
### ########
#  B###  ###
# D ###E@###
#  #####C###
############
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 85
- Inputs: up left down left up right up right right up left down down left left
- Events: pull_crate:crate#1 walk portal_enter:E portal_teleport:E->D walk walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_crate:crate#1 portal_fallback_push:D walk walk portal_enter:B portal_teleport:B->A walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_portal:D portal_fallback_push:A walk walk walk
- Event counts: pull_crate:crate#1=1, walk=10, portal_enter:E=1, portal_teleport:E->D=1, portal_enter:D=1, portal_exit_blocked:D->E=1, portal_exit_blocked_by_crate:crate#1=1, portal_fallback_push:D=1, portal_enter:B=1, portal_teleport:B->A=1, portal_enter:A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_portal:D=1, portal_fallback_push:A=1

## Object Participation

- crate/blocked_portal_exit via portal_exit_blocked_by_crate: distinct=1, instances=crate#1, events=1, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- crate/moved via pull_crate: distinct=1, instances=crate#1, events=1, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- portal/entered via portal_enter: distinct=4, instances=A, B, D, E, events=4, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=2, instances=A, D, events=2, evidence=trace_lineage

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
############
###  #######
#G A #######
### ########
#  B###  ###
# D ###E@###
#  #####C###
############
```

After:

```text
############
###  #######
#G A #######
### ########
#  B### @###
# D ###EC###
#  ##### ###
############
```

### Step 3: down

- Legal: true
- Events: portal_enter:E, portal_teleport:E->D

Before:

```text
############
###  #######
#G A #######
### ########
#  B###@ ###
# D ###EC###
#  ##### ###
############
```

After:

```text
############
###  #######
#G A #######
### ########
#  B###  ###
# D ###EC###
# @##### ###
############
```

### Step 6: right

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:D

Before:

```text
############
###  #######
#G A #######
### ########
#  B###  ###
#@D ###EC###
#  ##### ###
############
```

After:

```text
############
###  #######
#G A #######
### ########
#  B###  ###
#@ D###EC###
#  ##### ###
############
```

### Step 9: right

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
############
###  #######
#G A #######
### ########
# @B###  ###
#  D###EC###
#  ##### ###
############
```

After:

```text
############
###  #######
#G A@#######
### ########
#  B###  ###
#  D###EC###
#  ##### ###
############
```

### Step 12: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_portal:D, portal_fallback_push:A

Before:

```text
############
###@ #######
#G A #######
### ########
#  B###  ###
#  D###EC###
#  ##### ###
############
```

After:

```text
############
###@ #######
#G   #######
###A########
#  B###  ###
#  D###EC###
#  ##### ###
############
```


## Graph Facts

- Status: complete
- Reachable states: 100
- Legal transitions: 215
- Event-only illegal transitions: 19
- Winning states: 1
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 45 | complete | search complete |
| without_blocked_portal_push | no | n/a | 23 | complete | search complete |
| without_portal_teleport | no | n/a | 3 | complete | search complete |

## Target Event Checks

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=91
- Winning bypass: none found; complete search, explored=102

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=88
- Winning bypass: none found; complete search, explored=99

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=88
- Winning bypass: none found; complete search, explored=99


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

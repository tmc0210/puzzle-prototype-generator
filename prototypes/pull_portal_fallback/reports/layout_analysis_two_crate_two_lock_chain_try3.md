# Level Analysis: two_crate_two_lock_chain_try3

## Summary

- Prototype: pull_portal_fallback
- Title: Two-crate two-lock chain
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_portal_teleports_player, K_pull_single_crate, K_blocked_portal_pushes_entrance

## Initial State

```text
###########
###  ##  ##
#G A   D@##
### ### ###
#  B## E###
#   C#  C #
###########
```

## Shortest Solution

- Found: yes
- Cost: 25
- Depth: 25
- Explored states: 54
- Inputs: up left down left up right up left down down left left left up left down left up right up left down down left left
- Events: walk walk portal_enter:D portal_teleport:D->E pull_crate:crate#2 walk portal_enter:E portal_teleport:E->D walk walk portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_crate:crate#2 portal_fallback_push:D walk walk walk walk walk walk portal_enter:A portal_teleport:A->B pull_crate:crate#1 walk portal_enter:B portal_teleport:B->A walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_crate:crate#1 portal_fallback_push:A walk walk walk
- Event counts: walk=17, portal_enter:D=2, portal_teleport:D->E=1, pull_crate:crate#2=1, portal_enter:E=1, portal_teleport:E->D=1, portal_exit_blocked:D->E=1, portal_exit_blocked_by_crate:crate#2=1, portal_fallback_push:D=1, portal_enter:A=2, portal_teleport:A->B=1, pull_crate:crate#1=1, portal_enter:B=1, portal_teleport:B->A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_crate:crate#1=1, portal_fallback_push:A=1

## Object Participation

- crate/blocked_portal_exit via portal_exit_blocked_by_crate: distinct=2, instances=crate#1, crate#2, events=2, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- crate/moved via pull_crate: distinct=2, instances=crate#1, crate#2, events=2, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- portal/entered via portal_enter: distinct=4, instances=A, B, D, E, events=6, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=2, instances=A, D, events=2, evidence=trace_lineage

## Key Event Snapshots

### Step 3: down

- Legal: true
- Events: portal_enter:D, portal_teleport:D->E

Before:

```text
###########
###  ##@ ##
#G A   D ##
### ### ###
#  B## E###
#   C#  C #
###########
```

After:

```text
###########
###  ##  ##
#G A   D ##
### ### ###
#  B## E###
#   C# @C #
###########
```

### Step 4: left

- Legal: true
- Events: pull_crate:crate#2

Before:

```text
###########
###  ##  ##
#G A   D ##
### ### ###
#  B## E###
#   C# @C #
###########
```

After:

```text
###########
###  ##  ##
#G A   D ##
### ### ###
#  B## E###
#   C#@C  #
###########
```

### Step 6: right

- Legal: true
- Events: portal_enter:E, portal_teleport:E->D

Before:

```text
###########
###  ##  ##
#G A   D ##
### ### ###
#  B##@E###
#   C# C  #
###########
```

After:

```text
###########
###  ##  ##
#G A   D@##
### ### ###
#  B## E###
#   C# C  #
###########
```

### Step 9: down

- Legal: true
- Events: portal_enter:D, portal_exit_blocked:D->E, portal_exit_blocked_by_crate:crate#2, portal_fallback_push:D

Before:

```text
###########
###  ##@ ##
#G A   D ##
### ### ###
#  B## E###
#   C# C  #
###########
```

After:

```text
###########
###  ##@ ##
#G A     ##
### ###D###
#  B## E###
#   C# C  #
###########
```

### Step 16: down

- Legal: true
- Events: portal_enter:A, portal_teleport:A->B

Before:

```text
###########
###@ ##  ##
#G A     ##
### ###D###
#  B## E###
#   C# C  #
###########
```

After:

```text
###########
###  ##  ##
#G A     ##
### ###D###
#  B## E###
#  @C# C  #
###########
```

### Step 17: left

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
###########
###  ##  ##
#G A     ##
### ###D###
#  B## E###
#  @C# C  #
###########
```

After:

```text
###########
###  ##  ##
#G A     ##
### ###D###
#  B## E###
# @C # C  #
###########
```

### Step 19: right

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
###########
###  ##  ##
#G A     ##
### ###D###
# @B## E###
#  C # C  #
###########
```

After:

```text
###########
###  ##  ##
#G A@    ##
### ###D###
#  B## E###
#  C # C  #
###########
```

### Step 22: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_crate:crate#1, portal_fallback_push:A

Before:

```text
###########
###@ ##  ##
#G A     ##
### ###D###
#  B## E###
#  C # C  #
###########
```

After:

```text
###########
###@ ##  ##
#G       ##
###A###D###
#  B## E###
#  C # C  #
###########
```


## Graph Facts

- Status: complete
- Reachable states: 64
- Legal transitions: 135
- Event-only illegal transitions: 13
- Winning states: 1
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 6 | complete | search complete |
| without_blocked_portal_push | no | n/a | 11 | complete | search complete |
| without_portal_teleport | no | n/a | 3 | complete | search complete |

## Target Event Checks

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=60
- Winning bypass: none found; complete search, explored=66

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=57
- Winning bypass: none found; complete search, explored=63

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=57
- Winning bypass: none found; complete search, explored=63


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

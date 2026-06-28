# Level Analysis: dry_v2_s06_reuse_combination

## Summary

- Prototype: pull_portal_fallback
- Title: dry_v2_s06_reuse_combination
- Role: combination
- Status: candidate
- Support: low
- Win: player_on_goal
- Targets: K_portal_teleports_player, K_pull_single_crate, K_blocked_portal_pushes_entrance

## Initial State

```text
#####   ##
# G C  A #
#### ## ##
##B# #####
#@ #######
##########
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 37
- Inputs: right up left down left right right right up left left down left left left
- Events: walk portal_enter portal_teleport walk walk walk pull_crate portal_enter portal_exit_blocked portal_fallback_push pull_crate walk walk walk walk pull_crate pull_crate pull_crate
- Event counts: walk=8, portal_enter=2, portal_teleport=1, pull_crate=5, portal_exit_blocked=1, portal_fallback_push=1

## Key Event Snapshots

### Step 2: up

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
#####   ##
# G C  A #
#### ## ##
##B# #####
# @#######
##########
```

After:

```text
#####  @##
# G C  A #
#### ## ##
##B# #####
#  #######
##########
```

### Step 6: right

- Legal: true
- Events: pull_crate

Before:

```text
#####   ##
# G C@ A #
#### ## ##
##B# #####
#  #######
##########
```

After:

```text
#####   ##
# G  C@A #
#### ## ##
##B# #####
#  #######
##########
```

### Step 7: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
#####   ##
# G  C@A #
#### ## ##
##B# #####
#  #######
##########
```

After:

```text
#####   ##
# G  C@ A#
#### ## ##
##B# #####
#  #######
##########
```

### Step 8: right

- Legal: true
- Events: pull_crate

Before:

```text
#####   ##
# G  C@ A#
#### ## ##
##B# #####
#  #######
##########
```

After:

```text
#####   ##
# G   C@A#
#### ## ##
##B# #####
#  #######
##########
```

### Step 13: left

- Legal: true
- Events: pull_crate

Before:

```text
#####   ##
# G  @C A#
#### ## ##
##B# #####
#  #######
##########
```

After:

```text
#####   ##
# G @C  A#
#### ## ##
##B# #####
#  #######
##########
```

### Step 14: left

- Legal: true
- Events: pull_crate

Before:

```text
#####   ##
# G @C  A#
#### ## ##
##B# #####
#  #######
##########
```

After:

```text
#####   ##
# G@C   A#
#### ## ##
##B# #####
#  #######
##########
```

### Step 15: left

- Legal: true
- Events: pull_crate

Before:

```text
#####   ##
# G@C   A#
#### ## ##
##B# #####
#  #######
##########
```

After:

```text
#####   ##
# @C    A#
#### ## ##
##B# #####
#  #######
##########
```


## Graph Facts

- Status: complete
- Reachable states: 38
- Legal transitions: 72
- Event-only illegal transitions: 16
- Winning states: 1
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 14 | complete | search complete |
| without_blocked_portal_push | no | n/a | 13 | complete | search complete |
| without_portal_teleport | no | n/a | 2 | complete | search complete |

## Target Event Checks

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=38
- Winning bypass: none found; complete search, explored=38

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=36
- Winning bypass: none found; complete search, explored=36

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=36
- Winning bypass: none found; complete search, explored=36


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

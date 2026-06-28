# Level Analysis: stress_v3_advanced_variant_hard_chain

## Summary

- Prototype: pull_portal_fallback
- Title: stress_v3_advanced_variant_hard_chain
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_portal_teleports_player, K_pull_single_crate, K_blocked_portal_pushes_entrance

## Initial State

```text
########
# A    #
#     B#
# @C## #
###### #
#####G #
########
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 438
- Inputs: left up up right down right up right right down right right up right down down down down down up up left left
- Events: pull_crate walk walk portal_enter portal_exit_blocked portal_fallback_push walk walk pull_crate portal_enter portal_exit_blocked portal_fallback_push walk walk pull_crate pull_crate walk walk portal_enter portal_exit_blocked portal_fallback_push walk portal_enter portal_exit_blocked portal_fallback_push walk portal_enter portal_exit_blocked portal_fallback_push walk walk walk portal_enter portal_teleport
- Event counts: pull_crate=4, walk=13, portal_enter=6, portal_exit_blocked=5, portal_fallback_push=5, portal_teleport=1

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: pull_crate

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

### Step 4: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

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

### Step 7: up

- Legal: true
- Events: pull_crate

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

### Step 8: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

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

### Step 11: right

- Legal: true
- Events: pull_crate

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

### Step 12: right

- Legal: true
- Events: pull_crate

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

### Step 15: down

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

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

### Step 17: down

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

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

### Step 19: down

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

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

### Step 23: left

- Legal: true
- Events: portal_enter, portal_teleport

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

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 60 | complete | search complete |
| without_blocked_portal_push | no | n/a | 60 | complete | search complete |
| without_portal_teleport | no | n/a | 1173 | complete | search complete |

## Target Event Checks

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=853
- Winning bypass: none found; complete search, explored=2390

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=477
- Winning bypass: none found; complete search, explored=1217

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=477
- Winning bypass: none found; complete search, explored=1217


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

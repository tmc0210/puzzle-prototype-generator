# Level Analysis: stress_v3_distinct_medium_combination_try3

## Summary

- Prototype: pull_portal_fallback
- Title: stress_v3_distinct_medium_combination_try3
- Role: combination
- Status: candidate
- Support: low
- Win: player_on_goal
- Targets: K_portal_teleports_player, K_pull_single_crate, K_blocked_portal_pushes_entrance

## Initial State

```text
#########
###  ####
#G A@####
### #####
#  B#  ##
#    C ##
#########
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 37
- Inputs: up left down right left left up right up left down down left left
- Events: walk walk portal_enter portal_teleport walk pull_crate pull_crate walk portal_enter portal_teleport walk walk portal_enter portal_exit_blocked portal_fallback_push walk walk walk
- Event counts: walk=9, portal_enter=3, portal_teleport=2, pull_crate=2, portal_exit_blocked=1, portal_fallback_push=1

## Key Event Snapshots

### Step 3: down

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
#########
###@ ####
#G A ####
### #####
#  B#  ##
#    C ##
#########
```

After:

```text
#########
###  ####
#G A ####
### #####
#  B#  ##
#  @ C ##
#########
```

### Step 5: left

- Legal: true
- Events: pull_crate

Before:

```text
#########
###  ####
#G A ####
### #####
#  B#  ##
#   @C ##
#########
```

After:

```text
#########
###  ####
#G A ####
### #####
#  B#  ##
#  @C  ##
#########
```

### Step 6: left

- Legal: true
- Events: pull_crate

Before:

```text
#########
###  ####
#G A ####
### #####
#  B#  ##
#  @C  ##
#########
```

After:

```text
#########
###  ####
#G A ####
### #####
#  B#  ##
# @C   ##
#########
```

### Step 8: right

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
#########
###  ####
#G A ####
### #####
# @B#  ##
#  C   ##
#########
```

After:

```text
#########
###  ####
#G A@####
### #####
#  B#  ##
#  C   ##
#########
```

### Step 11: down

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
#########
###@ ####
#G A ####
### #####
#  B#  ##
#  C   ##
#########
```

After:

```text
#########
###@ ####
#G   ####
###A#####
#  B#  ##
#  C   ##
#########
```


## Graph Facts

- Status: complete
- Reachable states: 45
- Legal transitions: 91
- Event-only illegal transitions: 11
- Winning states: 1
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 9 | complete | search complete |
| without_blocked_portal_push | no | n/a | 39 | complete | search complete |
| without_portal_teleport | no | n/a | 3 | complete | search complete |

## Target Event Checks

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=40
- Winning bypass: none found; complete search, explored=47

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=37
- Winning bypass: none found; complete search, explored=44

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=37
- Winning bypass: none found; complete search, explored=44


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

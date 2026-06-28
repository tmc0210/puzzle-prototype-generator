# Level Analysis: stress_v3_distinct_medium_combination_try2

## Summary

- Prototype: pull_portal_fallback
- Title: stress_v3_distinct_medium_combination_try2
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
#  B   ##
#    C ##
#########
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 16
- Inputs: up left down right up left left
- Events: walk walk portal_enter portal_teleport walk walk portal_enter portal_teleport walk
- Event counts: walk=5, portal_enter=2, portal_teleport=2

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
#  B   ##
#    C ##
#########
```

After:

```text
#########
###  ####
#G A ####
### #####
#  B   ##
#  @ C ##
#########
```

### Step 6: left

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
#########
###  ####
#G A ####
### #####
#  B@  ##
#    C ##
#########
```

After:

```text
#########
###  ####
#G@A ####
### #####
#  B   ##
#    C ##
#########
```


## Graph Facts

- Status: complete
- Reachable states: 58
- Legal transitions: 122
- Event-only illegal transitions: 12
- Winning states: 4
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 7 | 13 | found |  |
| without_blocked_portal_push | yes | 7 | 16 | found |  |
| without_portal_teleport | no | n/a | 3 | complete | search complete |

## Target Event Checks

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=22
- Winning bypass: none found; complete search, explored=57

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=7, inputs=up left down right up left left
- Winning bypass: found cost=7, inputs=up left down right up left left

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=7, inputs=up left down right up left left
- Winning bypass: found cost=7, inputs=up left down right up left left


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

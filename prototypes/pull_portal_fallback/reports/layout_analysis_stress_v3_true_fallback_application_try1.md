# Level Analysis: stress_v3_true_fallback_application_try1

## Summary

- Prototype: pull_portal_fallback
- Title: stress_v3_true_fallback_application_try1
- Role: guided_application
- Status: candidate
- Support: medium
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_move_portal_to_open_path

## Initial State

```text
#########
#@  #####
### ### #
#  A G ##
### ### #
#  B ####
#########
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 13
- Inputs: right right down down down right right
- Events: walk walk walk portal_enter portal_exit_blocked portal_fallback_push walk walk walk
- Event counts: walk=6, portal_enter=1, portal_exit_blocked=1, portal_fallback_push=1

## Key Event Snapshots

### Step 4: down

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
#########
#   #####
###@### #
#  A G ##
### ### #
#  B ####
#########
```

After:

```text
#########
#   #####
###@### #
#    G ##
###A### #
#  B ####
#########
```


## Graph Facts

- Status: complete
- Reachable states: 14
- Legal transitions: 25
- Event-only illegal transitions: 1
- Winning states: 1
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 7 | 13 | found |  |
| without_blocked_portal_push | no | n/a | 4 | complete | search complete |
| without_portal_teleport | yes | 7 | 13 | found |  |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=12
- Winning bypass: none found; complete search, explored=12

### K_move_portal_to_open_path

玩家可以利用堵塞出口的 fallback 推动入口传送门，从而改变可达区域。

- Required events: portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=12
- Winning bypass: none found; complete search, explored=12


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: dry_v2_s04_fallback_door_application

## Summary

- Prototype: pull_portal_fallback
- Title: dry_v2_s04_fallback_door_application
- Role: guided_application
- Status: candidate
- Support: high
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_move_portal_to_open_path

## Initial State

```text
#######
##@####
##A G##
##  B##
#######
```

## Shortest Solution

- Found: yes
- Cost: 4
- Depth: 4
- Explored states: 6
- Inputs: down down right right
- Events: portal_enter portal_exit_blocked portal_fallback_push walk walk walk
- Event counts: portal_enter=1, portal_exit_blocked=1, portal_fallback_push=1, walk=3

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
#######
##@####
##A G##
##  B##
#######
```

After:

```text
#######
##@####
##  G##
##A B##
#######
```


## Graph Facts

- Status: complete
- Reachable states: 6
- Legal transitions: 11
- Event-only illegal transitions: 2
- Winning states: 1
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 4 | 6 | found |  |
| without_blocked_portal_push | no | n/a | 1 | complete | search complete |
| without_portal_teleport | yes | 4 | 6 | found |  |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=5
- Winning bypass: none found; complete search, explored=5

### K_move_portal_to_open_path

玩家可以利用堵塞出口的 fallback 推动入口传送门，从而改变可达区域。

- Required events: portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=5
- Winning bypass: none found; complete search, explored=5


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

# Level Analysis: stress_v3_distinct_medium_combination_try1

## Summary

- Prototype: pull_portal_fallback
- Title: stress_v3_distinct_medium_combination_try1
- Role: combination
- Status: candidate
- Support: low
- Win: player_on_goal
- Targets: K_portal_teleports_player, K_pull_single_crate, K_blocked_portal_pushes_entrance

## Initial State

```text
#########
#       #
#G A@  #
### #####
#  B   #
#    C  #
#########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 20
- Inputs: up left left down left
- Events: walk walk walk walk walk
- Event counts: walk=5

## Key Event Snapshots

No non-walk events were found on the returned solution.

## Graph Facts

- Status: complete
- Reachable states: 105
- Legal transitions: 258
- Event-only illegal transitions: 13
- Winning states: 5
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 5 | 19 | found |  |
| without_blocked_portal_push | yes | 5 | 20 | found |  |
| without_portal_teleport | yes | 5 | 12 | found |  |

## Target Event Checks

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=5, inputs=up left left down left
- Winning bypass: found cost=5, inputs=up left left down left

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=5, inputs=up left left down left
- Winning bypass: found cost=5, inputs=up left left down left

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=5, inputs=up left left down left
- Winning bypass: found cost=5, inputs=up left left down left


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

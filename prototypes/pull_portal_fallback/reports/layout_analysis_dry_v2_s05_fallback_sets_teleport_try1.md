# Level Analysis: dry_v2_s05_fallback_sets_teleport_try1

## Summary

- Prototype: pull_portal_fallback
- Title: dry_v2_s05_fallback_sets_teleport_try1
- Role: guided_application
- Status: candidate
- Support: medium
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_portal_teleports_player

## Initial State

```text
########
####G###
# @A  ##
#      #
###B####
###  ###
########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 20
- Inputs: down right right up up
- Events: walk walk walk walk walk
- Event counts: walk=5

## Key Event Snapshots

No non-walk events were found on the returned solution.

## Graph Facts

- Status: complete
- Reachable states: 54
- Legal transitions: 138
- Event-only illegal transitions: 2
- Winning states: 4
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 5 | 20 | found |  |
| without_blocked_portal_push | yes | 5 | 9 | found |  |
| without_portal_teleport | yes | 5 | 20 | found |  |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=5, inputs=down right right up up
- Winning bypass: found cost=5, inputs=down right right up up

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: false
- Shortest bypass: found cost=5, inputs=down right right up up
- Winning bypass: found cost=5, inputs=down right right up up


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

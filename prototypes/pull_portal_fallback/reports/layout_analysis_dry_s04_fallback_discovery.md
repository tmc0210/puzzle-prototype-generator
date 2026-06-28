# Level Analysis: dry_s04_fallback_discovery

## Summary

- Prototype: pull_portal_fallback
- Title: dry_s04_fallback_discovery
- Role: discovery
- Status: candidate
- Support: high
- Win: player_on_goal
- Targets: K_blocked_portal_stops_teleport, K_blocked_portal_pushes_entrance

## Initial State

```text
#########
#@ A G  #
###BC####
#########
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 12
- Inputs: right right right right right right right
- Events: walk portal_enter portal_exit_blocked portal_fallback_push walk portal_enter portal_exit_blocked portal_fallback_push walk portal_enter portal_exit_blocked portal_fallback_push walk
- Event counts: walk=4, portal_enter=3, portal_exit_blocked=3, portal_fallback_push=3

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
#########
# @A G  #
###BC####
#########
```

After:

```text
#########
# @ AG  #
###BC####
#########
```

### Step 4: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
#########
#  @AG  #
###BC####
#########
```

After:

```text
#########
#  @ A  #
###BC####
#########
```

### Step 6: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
#########
#   @A  #
###BC####
#########
```

After:

```text
#########
#   @GA #
###BC####
#########
```


## Graph Facts

- Status: complete
- Reachable states: 20
- Legal transitions: 34
- Event-only illegal transitions: 8
- Winning states: 2
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 7 | 12 | found |  |
| without_blocked_portal_push | no | n/a | 2 | complete | search complete |
| without_portal_teleport | yes | 7 | 12 | found |  |

## Target Event Checks

### K_blocked_portal_stops_teleport

传送门出口被堵住时，玩家不会正常传送。

- Required events: portal_enter, portal_exit_blocked
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=11
- Winning bypass: none found; complete search, explored=13

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=11
- Winning bypass: none found; complete search, explored=13


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

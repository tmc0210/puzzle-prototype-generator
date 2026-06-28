# Level Analysis: dry_s05_repeated_fallback_application

## Summary

- Prototype: pull_portal_fallback
- Title: dry_s05_repeated_fallback_application
- Role: guided_application
- Status: candidate
- Support: medium
- Win: player_on_goal
- Targets: K_blocked_portal_pushes_entrance, K_move_portal_to_open_path

## Initial State

```text
###########
#@ A  G  #
###BC#####
###########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 17
- Inputs: right right right right right right right right right
- Events: walk portal_enter portal_exit_blocked portal_fallback_push walk portal_enter portal_exit_blocked portal_fallback_push walk portal_enter portal_exit_blocked portal_fallback_push walk portal_enter portal_exit_blocked portal_fallback_push walk
- Event counts: walk=5, portal_enter=4, portal_exit_blocked=4, portal_fallback_push=4

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
###########
# @A  G  #
###BC#####
###########
```

After:

```text
###########
# @ A G  #
###BC#####
###########
```

### Step 4: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
###########
#  @A G  #
###BC#####
###########
```

After:

```text
###########
#  @ AG  #
###BC#####
###########
```

### Step 6: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
###########
#   @AG  #
###BC#####
###########
```

After:

```text
###########
#   @ A  #
###BC#####
###########
```

### Step 8: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
###########
#    @A  #
###BC#####
###########
```

After:

```text
###########
#    @GA #
###BC#####
###########
```


## Graph Facts

- Status: complete
- Reachable states: 27
- Legal transitions: 47
- Event-only illegal transitions: 10
- Winning states: 2
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 9 | 17 | found |  |
| without_blocked_portal_push | no | n/a | 2 | complete | search complete |
| without_portal_teleport | yes | 9 | 17 | found |  |

## Target Event Checks

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=16
- Winning bypass: none found; complete search, explored=19

### K_move_portal_to_open_path

玩家可以利用堵塞出口的 fallback 推动入口传送门，从而改变可达区域。

- Required events: portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=16
- Winning bypass: none found; complete search, explored=19


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

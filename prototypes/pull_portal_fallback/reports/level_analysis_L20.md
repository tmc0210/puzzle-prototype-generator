# Level Analysis: L20

## Summary

- Prototype: pull_portal_fallback
- Title: Wide Build
- Role: challenge
- Status: candidate
- Support: low
- Win: event_occurs
- Targets: K_use_crate_to_block_portal_exit, K_blocked_portal_pushes_entrance

## Initial State

```text
##############
#            #
#  @ A       #
#     C      #
#    B       #
#            #
##############
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 171
- Inputs: right right down left up left down right
- Events: walk portal_enter portal_teleport pull_crate walk portal_enter portal_teleport walk walk portal_enter portal_exit_blocked portal_fallback_push
- Event counts: walk=4, portal_enter=3, portal_teleport=2, pull_crate=1, portal_exit_blocked=1, portal_fallback_push=1

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
##############
#            #
#   @A       #
#     C      #
#    B       #
#            #
##############
```

After:

```text
##############
#            #
#    A       #
#     C      #
#    B@      #
#            #
##############
```

### Step 3: down

- Legal: true
- Events: pull_crate

Before:

```text
##############
#            #
#    A       #
#     C      #
#    B@      #
#            #
##############
```

After:

```text
##############
#            #
#    A       #
#            #
#    BC      #
#     @      #
##############
```

### Step 5: up

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
##############
#            #
#    A       #
#            #
#    BC      #
#    @       #
##############
```

After:

```text
##############
#    @       #
#    A       #
#            #
#    BC      #
#            #
##############
```

### Step 8: right

- Legal: true
- Events: portal_enter, portal_exit_blocked, portal_fallback_push

Before:

```text
##############
#            #
#   @A       #
#            #
#    BC      #
#            #
##############
```

After:

```text
##############
#            #
#   @ A      #
#            #
#    BC      #
#            #
##############
```


## Graph Facts

- Status: exhausted
- Reachable states: 100001
- Legal transitions: 282718
- Event-only illegal transitions: 8644
- Winning states: 0 (state-win count only; event wins are checked by solver and bypass probes)
- Budget: maxStates=100000
- Reason: state budget exceeded

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 57 | complete | search complete |
| without_blocked_portal_push | no | n/a | 1596 | complete | search complete |
| without_portal_teleport | yes | 12 | 287 | found |  |

## Target Event Checks

### K_use_crate_to_block_portal_exit

玩家可以故意把箱子拉到传送门出口，从而触发堵塞出口行为。

- Required events: pull_crate, portal_exit_blocked
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=212
- Winning bypass: none found; complete search, explored=1653

### K_blocked_portal_pushes_entrance

传送门出口被堵住且入口传送门前方可移动时，进入入口会改为推动入口传送门。

- Required events: portal_exit_blocked, portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=210
- Winning bypass: none found; complete search, explored=1596


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

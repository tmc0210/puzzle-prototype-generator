# Level Analysis: dry_s02_portal_discovery

## Summary

- Prototype: pull_portal_fallback
- Title: dry_s02_portal_discovery
- Role: discovery
- Status: candidate
- Support: high
- Win: player_on_goal
- Targets: K_portal_teleports_player

## Initial State

```text
#########
#@ A#####
### B G #
#########
```

## Shortest Solution

- Found: yes
- Cost: 3
- Depth: 3
- Explored states: 4
- Inputs: right right right
- Events: walk portal_enter portal_teleport walk
- Event counts: walk=2, portal_enter=1, portal_teleport=1

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
#########
# @A#####
### B G #
#########
```

After:

```text
#########
#  A#####
### B@G #
#########
```


## Graph Facts

- Status: complete
- Reachable states: 5
- Legal transitions: 8
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 3 | 4 | found |  |
| without_blocked_portal_push | yes | 3 | 4 | found |  |
| without_portal_teleport | no | n/a | 2 | complete | search complete |

## Target Event Checks

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=4
- Winning bypass: none found; complete search, explored=5


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

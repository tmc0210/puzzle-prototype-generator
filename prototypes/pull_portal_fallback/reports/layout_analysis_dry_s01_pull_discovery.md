# Level Analysis: dry_s01_pull_discovery

## Summary

- Prototype: pull_portal_fallback
- Title: dry_s01_pull_discovery
- Role: discovery
- Status: candidate
- Support: high
- Win: player_on_goal
- Targets: K_pull_single_crate

## Initial State

```text
#####
#C@G#
#####
```

## Shortest Solution

- Found: yes
- Cost: 1
- Depth: 1
- Explored states: 2
- Inputs: right
- Events: pull_crate
- Event counts: pull_crate=1

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_crate

Before:

```text
#####
#C@G#
#####
```

After:

```text
#####
# C@#
#####
```


## Graph Facts

- Status: complete
- Reachable states: 2
- Legal transitions: 1
- Event-only illegal transitions: 2
- Winning states: 1
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | yes | 1 | 2 | found |  |
| without_blocked_portal_push | yes | 1 | 2 | found |  |
| without_portal_teleport | yes | 1 | 2 | found |  |

## Target Event Checks

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found; complete search, explored=1
- Winning bypass: none found; complete search, explored=1


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

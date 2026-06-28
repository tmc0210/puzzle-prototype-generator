# Level Analysis: dry_v2_s01_pull_path_discovery

## Summary

- Prototype: pull_portal_fallback
- Title: dry_v2_s01_pull_path_discovery
- Role: discovery
- Status: candidate
- Support: high
- Win: player_on_goal
- Targets: K_pull_single_crate

## Initial State

```text
#######
#G C@ #
###   #
#     #
#######
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 41
- Inputs: right down left left up left left
- Events: pull_crate walk walk walk walk pull_crate pull_crate
- Event counts: pull_crate=3, walk=4

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_crate

Before:

```text
#######
#G C@ #
###   #
#     #
#######
```

After:

```text
#######
#G  C@#
###   #
#     #
#######
```

### Step 6: left

- Legal: true
- Events: pull_crate

Before:

```text
#######
#G @C #
###   #
#     #
#######
```

After:

```text
#######
#G@C  #
###   #
#     #
#######
```

### Step 7: left

- Legal: true
- Events: pull_crate

Before:

```text
#######
#G@C  #
###   #
#     #
#######
```

After:

```text
#######
#@C   #
###   #
#     #
#######
```


## Graph Facts

- Status: complete
- Reachable states: 46
- Legal transitions: 98
- Event-only illegal transitions: 14
- Winning states: 3
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 10 | complete | search complete |
| without_blocked_portal_push | yes | 7 | 41 | found |  |
| without_portal_teleport | yes | 7 | 41 | found |  |

## Target Event Checks

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=40
- Winning bypass: none found; complete search, explored=43


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

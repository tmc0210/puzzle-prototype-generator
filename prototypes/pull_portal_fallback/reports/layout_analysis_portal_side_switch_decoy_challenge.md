# Level Analysis: portal_side_switch_decoy_challenge

## Summary

- Prototype: pull_portal_fallback
- Title: portal_side_switch_decoy_challenge
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_portal_teleports_player, K_pull_single_crate

## Initial State

```text
######  #
#G C   A#
####  # #
# B  ####
#@ ######
#########
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 51
- Inputs: right up left down left left right right right right up up left left left
- Events: walk portal_enter portal_teleport walk walk walk walk pull_crate pull_crate portal_enter portal_teleport walk walk walk pull_crate pull_crate pull_crate
- Event counts: walk=8, portal_enter=2, portal_teleport=2, pull_crate=5

## Key Event Snapshots

### Step 2: up

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
######  #
#G C   A#
####  # #
# B  ####
# @######
#########
```

After:

```text
###### @#
#G C   A#
####  # #
# B  ####
#  ######
#########
```

### Step 7: right

- Legal: true
- Events: pull_crate

Before:

```text
######  #
#G C@  A#
####  # #
# B  ####
#  ######
#########
```

After:

```text
######  #
#G  C@ A#
####  # #
# B  ####
#  ######
#########
```

### Step 8: right

- Legal: true
- Events: pull_crate

Before:

```text
######  #
#G  C@ A#
####  # #
# B  ####
#  ######
#########
```

After:

```text
######  #
#G   C@A#
####  # #
# B  ####
#  ######
#########
```

### Step 9: right

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
######  #
#G   C@A#
####  # #
# B  ####
#  ######
#########
```

After:

```text
######  #
#G   C A#
####  # #
# B@ ####
#  ######
#########
```

### Step 13: left

- Legal: true
- Events: pull_crate

Before:

```text
######  #
#G  @C A#
####  # #
# B  ####
#  ######
#########
```

After:

```text
######  #
#G @C  A#
####  # #
# B  ####
#  ######
#########
```

### Step 14: left

- Legal: true
- Events: pull_crate

Before:

```text
######  #
#G @C  A#
####  # #
# B  ####
#  ######
#########
```

After:

```text
######  #
#G@C   A#
####  # #
# B  ####
#  ######
#########
```

### Step 15: left

- Legal: true
- Events: pull_crate

Before:

```text
######  #
#G@C   A#
####  # #
# B  ####
#  ######
#########
```

After:

```text
######  #
#@C    A#
####  # #
# B  ####
#  ######
#########
```


## Graph Facts

- Status: complete
- Reachable states: 70
- Legal transitions: 141
- Event-only illegal transitions: 15
- Winning states: 2
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 21 | complete | search complete |
| without_blocked_portal_push | yes | 15 | 39 | found |  |
| without_portal_teleport | no | n/a | 12 | complete | search complete |

## Target Event Checks

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=62
- Winning bypass: none found; complete search, explored=80

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=50
- Winning bypass: none found; complete search, explored=68


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

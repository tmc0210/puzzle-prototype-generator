# Level Analysis: dry_variant_directional_pull_challenge

## Summary

- Prototype: pull_portal_fallback
- Title: dry_variant_directional_pull_challenge
- Role: challenge
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_portal_teleports_player, K_pull_single_crate

## Initial State

```text
###########
####  #####
####  #####
####  #  ##
##@ AC# B #
#### ###  #
####G######
###########
```

## Shortest Solution

- Found: yes
- Cost: 18
- Depth: 18
- Explored states: 37
- Inputs: right right down left up right up up left down down right down left up right down down
- Events: walk portal_enter portal_teleport walk walk portal_enter portal_teleport walk pull_crate pull_crate walk walk walk walk pull_crate portal_enter portal_teleport walk walk portal_enter portal_teleport walk
- Event counts: walk=11, portal_enter=4, portal_teleport=4, pull_crate=3

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
###########
####  #####
####  #####
####  #  ##
## @AC# B #
#### ###  #
####G######
###########
```

After:

```text
###########
####  #####
####  #####
####  #  ##
##  AC# B@#
#### ###  #
####G######
###########
```

### Step 5: up

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
###########
####  #####
####  #####
####  #  ##
##  AC# B #
#### ###@ #
####G######
###########
```

After:

```text
###########
####  #####
####  #####
####@ #  ##
##  AC# B #
#### ###  #
####G######
###########
```

### Step 7: up

- Legal: true
- Events: pull_crate

Before:

```text
###########
####  #####
####  #####
#### @#  ##
##  AC# B #
#### ###  #
####G######
###########
```

After:

```text
###########
####  #####
#### @#####
#### C#  ##
##  A # B #
#### ###  #
####G######
###########
```

### Step 8: up

- Legal: true
- Events: pull_crate

Before:

```text
###########
####  #####
#### @#####
#### C#  ##
##  A # B #
#### ###  #
####G######
###########
```

After:

```text
###########
#### @#####
#### C#####
####  #  ##
##  A # B #
#### ###  #
####G######
###########
```

### Step 13: down

- Legal: true
- Events: pull_crate

Before:

```text
###########
####  #####
#### C#####
#### @#  ##
##  A # B #
#### ###  #
####G######
###########
```

After:

```text
###########
####  #####
####  #####
#### C#  ##
##  A@# B #
#### ###  #
####G######
###########
```

### Step 14: left

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
###########
####  #####
####  #####
#### C#  ##
##  A@# B #
#### ###  #
####G######
###########
```

After:

```text
###########
####  #####
####  #####
#### C#  ##
##  A #@B #
#### ###  #
####G######
###########
```

### Step 17: down

- Legal: true
- Events: portal_enter, portal_teleport

Before:

```text
###########
####  #####
####  #####
#### C# @##
##  A # B #
#### ###  #
####G######
###########
```

After:

```text
###########
####  #####
####  #####
#### C#  ##
##  A # B #
####@###  #
####G######
###########
```


## Graph Facts

- Status: complete
- Reachable states: 37
- Legal transitions: 73
- Event-only illegal transitions: 7
- Winning states: 1
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 11 | complete | search complete |
| without_blocked_portal_push | yes | 18 | 37 | found |  |
| without_portal_teleport | no | n/a | 2 | complete | search complete |

## Target Event Checks

### K_portal_teleports_player

玩家进入出口未堵塞的传送门时会被传送到配对传送门出口。

- Required events: portal_enter, portal_teleport
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found; complete search, explored=38
- Winning bypass: none found; complete search, explored=38

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found; complete search, explored=36
- Winning bypass: none found; complete search, explored=36


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

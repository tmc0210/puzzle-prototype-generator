# Level Analysis: two_crate_participation_candidate

## Summary

- Prototype: pull_portal_fallback
- Title: two_crate_participation_candidate
- Role: combination
- Status: candidate
- Support: none
- Win: player_on_goal
- Targets: K_pull_single_crate, K_use_crate_to_block_portal_exit, K_move_portal_to_open_path

## Initial State

```text
#########
###    ##
#G AC@ ##
### #####
#  B#  ##
#    C ##
#########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 75
- Inputs: right up left left left down right left left up right up left down down left left
- Events: pull_crate:crate#1 walk walk walk walk portal_enter:A portal_teleport:A->B walk pull_crate:crate#2 pull_crate:crate#2 walk portal_enter:B portal_teleport:B->A walk walk portal_enter:A portal_exit_blocked:A->B portal_exit_blocked_by_crate:crate#2 portal_fallback_push:A walk walk walk
- Event counts: pull_crate:crate#1=1, walk=11, portal_enter:A=2, portal_teleport:A->B=1, pull_crate:crate#2=2, portal_enter:B=1, portal_teleport:B->A=1, portal_exit_blocked:A->B=1, portal_exit_blocked_by_crate:crate#2=1, portal_fallback_push:A=1

## Object Participation

- crate/blocked_portal_exit via portal_exit_blocked_by_crate: distinct=1, instances=crate#2, events=1, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- crate/moved via pull_crate: distinct=2, instances=crate#1, crate#2, events=3, evidence=trace_lineage
  Crate ids are trace lineage labels for indistinguishable crates, not player-facing identities.
- portal/entered via portal_enter: distinct=2, instances=A, B, events=3, evidence=trace_lineage
- portal/moved via portal_fallback_push: distinct=1, instances=A, events=1, evidence=trace_lineage

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_crate:crate#1

Before:

```text
#########
###    ##
#G AC@ ##
### #####
#  B#  ##
#    C ##
#########
```

After:

```text
#########
###    ##
#G A C@##
### #####
#  B#  ##
#    C ##
#########
```

### Step 6: down

- Legal: true
- Events: portal_enter:A, portal_teleport:A->B

Before:

```text
#########
###@   ##
#G A C ##
### #####
#  B#  ##
#    C ##
#########
```

After:

```text
#########
###    ##
#G A C ##
### #####
#  B#  ##
#  @ C ##
#########
```

### Step 8: left

- Legal: true
- Events: pull_crate:crate#2

Before:

```text
#########
###    ##
#G A C ##
### #####
#  B#  ##
#   @C ##
#########
```

After:

```text
#########
###    ##
#G A C ##
### #####
#  B#  ##
#  @C  ##
#########
```

### Step 9: left

- Legal: true
- Events: pull_crate:crate#2

Before:

```text
#########
###    ##
#G A C ##
### #####
#  B#  ##
#  @C  ##
#########
```

After:

```text
#########
###    ##
#G A C ##
### #####
#  B#  ##
# @C   ##
#########
```

### Step 11: right

- Legal: true
- Events: portal_enter:B, portal_teleport:B->A

Before:

```text
#########
###    ##
#G A C ##
### #####
# @B#  ##
#  C   ##
#########
```

After:

```text
#########
###    ##
#G A@C ##
### #####
#  B#  ##
#  C   ##
#########
```

### Step 14: down

- Legal: true
- Events: portal_enter:A, portal_exit_blocked:A->B, portal_exit_blocked_by_crate:crate#2, portal_fallback_push:A

Before:

```text
#########
###@   ##
#G A C ##
### #####
#  B#  ##
#  C   ##
#########
```

After:

```text
#########
###@   ##
#G   C ##
###A#####
#  B#  ##
#  C   ##
#########
```


## Graph Facts

- Status: complete
- Reachable states: 95
- Legal transitions: 190
- Event-only illegal transitions: 44
- Winning states: 2
- Budget: maxStates=100000

## Counterfactuals

| Model | Solvable | Cost | Explored | Status | Reason |
| --- | --- | ---: | ---: | --- | --- |
| without_pull | no | n/a | 12 | complete | search complete |
| without_blocked_portal_push | no | n/a | 77 | complete | search complete |
| without_portal_teleport | no | n/a | 12 | complete | search complete |

## Target Event Checks

### K_pull_single_crate

玩家可以把身后相邻的单个箱子向自己的移动方向拉动。

- Required events: pull_crate
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=78
- Winning bypass: none found; complete search, explored=93

### K_use_crate_to_block_portal_exit

玩家可以故意把箱子拉到传送门出口，从而触发堵塞出口行为。

- Required events: pull_crate, portal_exit_blocked
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=78
- Winning bypass: none found; complete search, explored=93

### K_move_portal_to_open_path

玩家可以利用堵塞出口的 fallback 推动入口传送门，从而改变可达区域。

- Required events: portal_fallback_push
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=78
- Winning bypass: none found; complete search, explored=93


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

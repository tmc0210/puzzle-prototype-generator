# Level Analysis: ICE_CAND_0018_v2_e_two_stage_stoppers

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0018_v2_e_two_stage_stoppers
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
#.GG##.I....I.#
#.#..#.*......#
#..###...######
#..###..#######
#..###.I#######
#..###..#######
#..###.########
#.I....########
@..############
###############
```

## Shortest Solution

- Found: yes
- Cost: 37
- Depth: 37
- Explored states: 20510
- Inputs: right right up right right right right up up right up up left up up right left down down right up right up up left right down right right right right right up left down right right
- Events: walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len3 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk
- Event counts: walk=31, push_ice=6, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d1=4, ice_blocks_ice_no_chain_push=4, ice_stop_short:d2=1, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_pass_through_d5:len3=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
###############
#.GG##.I....I.#
#.#..#.*......#
#..###...######
#..###..#######
#..###.I#######
#..###..#######
#..###.########
#.I....########
..@############
###############
```

After:

```text
###############
#.*G##.I....I.#
#.#..#.*......#
#..###...######
#..###..#######
#..###.I#######
#..###..#######
#..###.########
#.@....########
...############
###############
```

### Step 11: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
###############
#.*G##.I....I.#
#.#..#.*......#
#..###...######
#..###..#######
#..###.I#######
#..###.@#######
#..###.########
#......########
...############
###############
```

After:

```text
###############
#.*G##.I....I.#
#.#..#.*......#
#..###.I.######
#..###..#######
#..###.@#######
#..###..#######
#..###.########
#......########
...############
###############
```

### Step 16: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
###############
#.*G##.I....I.#
#.#..#@*......#
#..###.I.######
#..###..#######
#..###..#######
#..###..#######
#..###.########
#......########
...############
###############
```

After:

```text
###############
#.*G##.I....I.#
#.#..#.+.......
#..###.I.######
#..###..#######
#..###..#######
#..###..#######
#..###.########
#......########
...############
###############
```

### Step 21: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
###############
#.*G##.I....I.#
#.#..#.G.......
#..###.I.######
#..###.@#######
#..###..#######
#..###..#######
#..###.########
#......########
...############
###############
```

After:

```text
###############
#.*G##.I....I.#
#.#..#.*.......
#..###.@.######
#..###..#######
#..###..#######
#..###..#######
#..###.########
#......########
...############
###############
```

### Step 25: left

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
###############
#.*G##.I@...I.#
#.#..#.*.......
#..###...######
#..###..#######
#..###..#######
#..###..#######
#..###.########
#......########
...############
###############
```

After:

```text
###############
#.*G##I@....I.#
#.#..#.*.......
#..###...######
#..###..#######
#..###..#######
#..###..#######
#..###.########
#......########
...############
###############
```

### Step 34: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len3, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
###############
#.*G##I.....I@#
#.#..#.*.......
#..###...######
#..###..#######
#..###..#######
#..###..#######
#..###.########
#......########
...############
###############
```

After:

```text
###############
#.**##I.....@.#
#.#..#.*.......
#..###...######
#..###..#######
#..###..#######
#..###..#######
#..###.########
#......########
...############
###############
```


## Graph Facts

- Status: exhausted
- Reachable states: 100001
- Legal transitions: 253374
- Event-only illegal transitions: 13488
- Winning states: 1
- Budget: maxStates=100000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 100001
- Legal transitions: 253373
- Budget: maxStates=100000
- Reason: state budget exceeded
- Metrics: unavailable because the reachable graph was not fully enumerated.

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

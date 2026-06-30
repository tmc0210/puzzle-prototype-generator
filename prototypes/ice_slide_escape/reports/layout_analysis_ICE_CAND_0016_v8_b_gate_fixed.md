# Level Analysis: ICE_CAND_0016_v8_b_gate_fixed

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0016_v8_b_gate_fixed
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
#.*GG#.I...I..#
#.#..#.*......#
#..###...######
#..###.I#######
#..###..#######
#..###.########
#..###.########
#.I....########
@..############
###############
```

## Shortest Solution

- Found: yes
- Cost: 55
- Depth: 55
- Explored states: 66448
- Inputs: right up up up up up up up up right left down down down down down down down down right up right right right right up up up up up up right down left down down right up up left up up right right down right right right right up left down right right right
- Events: walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk
- Event counts: walk=49, push_ice=6, ice_stop_short:d2=2, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d1=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_blocks_ice_no_chain_push=3, ice_destroyed_d3=1, ice_pass_through_d5:len2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 10: right

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
###############
#@*GG#.I...I..#
#.#..#.*......#
#..###...######
#..###.I#######
#..###..#######
#..###.########
#..###.########
#.I....########
...############
###############
```

After:

```text
###############
#.+G*#.I...I..#
#.#..#.*......#
#..###...######
#..###.I#######
#..###..#######
#..###.########
#..###.########
#.I....########
...############
###############
```

### Step 21: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
###############
#.GG*#.I...I..#
#.#..#.*......#
#..###...######
#..###.I#######
#..###..#######
#..###.########
#..###.########
#.I....########
..@############
###############
```

After:

```text
###############
#.*G*#.I...I..#
#.#..#.*......#
#..###...######
#..###.I#######
#..###..#######
#..###.########
#..###.########
#.@....########
...############
###############
```

### Step 32: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
###############
#.*G*#.I...I..#
#.#..#@*......#
#..###...######
#..###.I#######
#..###..#######
#..###.########
#..###.########
#......########
...############
###############
```

After:

```text
###############
#.*G*#.I...I..#
#.#..#.+.......
#..###...######
#..###.I#######
#..###..#######
#..###.########
#..###.########
#......########
...############
###############
```

### Step 38: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
###############
#.*G*#.I...I..#
#.#..#.G.......
#..###...######
#..###.I#######
#..###.@#######
#..###.########
#..###.########
#......########
...############
###############
```

After:

```text
###############
#.*G*#.I...I..#
#.#..#.*.......
#..###...######
#..###.@#######
#..###..#######
#..###.########
#..###.########
#......########
...############
###############
```

### Step 43: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
###############
#.*G*#@I...I..#
#.#..#.*.......
#..###...######
#..###..#######
#..###..#######
#..###.########
#..###.########
#......########
...############
###############
```

After:

```text
###############
#.*G*#.@...I..#
#.#..#.*.......
#..###...######
#..###..#######
#..###..#######
#..###.########
#..###.########
#......########
...############
###############
```

### Step 51: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
###############
#.*G*#.....I@.#
#.#..#.*.......
#..###...######
#..###..#######
#..###..#######
#..###.########
#..###.########
#......########
...############
###############
```

After:

```text
###############
#.***#.....@..#
#.#..#.*.......
#..###...######
#..###..#######
#..###..#######
#..###.########
#..###.########
#......########
...############
###############
```


## Graph Facts

- Status: exhausted
- Reachable states: 100001
- Legal transitions: 256021
- Event-only illegal transitions: 11182
- Winning states: 1
- Budget: maxStates=100000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 100001
- Legal transitions: 256020
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

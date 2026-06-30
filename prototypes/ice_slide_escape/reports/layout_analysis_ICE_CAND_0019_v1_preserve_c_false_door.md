# Level Analysis: ICE_CAND_0019_v1_preserve_c_false_door

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0019_v1_preserve_c_false_door
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
################
#...GG.I.....I.#
#.#.#..*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#..#....########
#...I..#########
@.......########
################
```

## Shortest Solution

- Found: yes
- Cost: 40
- Depth: 40
- Explored states: 45830
- Inputs: right right right right up up up up up up right up right right right up left down down down left down down right up up up left up up right right down right right right right right right right
- Events: walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=36, push_ice=4, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_stop_short:d1=1, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1, ice_rebound_d4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
################
#...GG.I.....I.#
#.#.#..*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#..#....########
#...I..#########
....@...########
################
```

After:

```text
################
#...*G.I.....I.#
#.#.#..*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#..#....########
#...@..#########
........########
################
```

### Step 14: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
################
#...*G.I.....I.#
#.#.#.@*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...*G.I.....I.#
#.#.#..+........
#..#....########
#..#....########
#..#...I########
#..#....########
#..#....########
#......#########
........########
################
```

### Step 17: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
################
#...*G.I@....I.#
#.#.#..G........
#..#....########
#..#....########
#..#...I########
#..#....########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...**.@.....I.#
#.#.#..G........
#..#....########
#..#....########
#..#...I########
#..#....########
#..#....########
#......#########
........########
################
```

### Step 25: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
################
#...**.......I.#
#.#.#..G........
#..#....########
#..#....########
#..#...I########
#..#...@########
#..#....########
#......#########
........########
################
```

After:

```text
################
#...**.......I.#
#.#.#..*........
#..#....########
#..#....########
#..#...@########
#..#....########
#..#....########
#......#########
........########
################
```


## Graph Facts

- Status: exhausted
- Reachable states: 100001
- Legal transitions: 290739
- Event-only illegal transitions: 5582
- Winning states: 3
- Budget: maxStates=100000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 100001
- Legal transitions: 290738
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

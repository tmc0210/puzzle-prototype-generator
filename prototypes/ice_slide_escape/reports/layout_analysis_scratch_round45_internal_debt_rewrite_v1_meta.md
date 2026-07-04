# Level Analysis: scratch_round45_internal_debt_rewrite_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: scratch_round45_internal_debt_rewrite_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_destroy_group_d6_plus, ice_rebound_d4

## Initial State

```text
########@#########
########.#########
########.#########
########.#########
#####........#####
.....*...*...#....
####.........#####
####.........#####
####.I...I...#####
####.........#####
##########.#######
```

## Shortest Solution

- Found: yes
- Cost: 30
- Depth: 30
- Explored states: 55614
- Inputs: down down down down down down down down down left left left up up left up right right right right right right right right right right up right right right
- Events: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk push_ice ice_destroy_group_d6_plus:len5 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=28, push_ice=2, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1, ice_destroy_group_d6_plus:len5=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 13: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
.....*...*...#....
####.........#####
####.........#####
####.I...I...#####
####.@.......#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
.....*...*...#....
####.I.......#####
####.........#####
####.@...I...#####
####.........#####
##########.#######
```

### Step 17: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len5, ice_boundary_disappear_after_group

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
.....*...*...#....
####@I.......#####
####.........#####
####.....I...#####
####.........#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
.....*...*...#....
####.@............
####.........#####
####.....I...#####
####.........#####
##########.#######
```


## Graph Facts

- Status: exhausted
- Reachable states: 120001
- Legal transitions: 350187
- Event-only illegal transitions: 5182
- Winning states: 4
- Budget: maxStates=120000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 120001
- Legal transitions: 350186
- Budget: maxStates=120000
- Reason: state budget exceeded
- Metrics: unavailable because the reachable graph was not fully enumerated.

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### ice_destroy_group_d6_plus

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)

### ice_rebound_d4

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

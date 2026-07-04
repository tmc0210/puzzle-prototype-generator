# Level Analysis: scratch_round45_internal_debt_rewrite_v2_base

## Summary

- Prototype: ice_slide_escape
- Title: scratch_round45_internal_debt_rewrite_v2_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_destroyed_d3, ice_rebound_d4

## Initial State

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
@....*...*...#....
#####........#####
#####........#####
#####I...I...#####
#####........#####
##########.#######
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 1079
- Inputs: right right right right right down down right down down left up down right right right right right down
- Events: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk
- Event counts: walk=17, push_ice=2, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=1, ice_rebound_d4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
....@*...*...#....
#####........#####
#####........#####
#####I...I...#####
#####........#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
.....+...*...#....
#####........#####
#####........#####
#####I...I...#####
#####........#####
##########.#######
```

### Step 12: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
.....G...*...#....
#####........#####
#####........#####
#####I...I...#####
#####@.......#####
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
#####........#####
#####........#####
#####@...I...#####
#####........#####
##########.#######
```


## Graph Facts

- Status: exhausted
- Reachable states: 200001
- Legal transitions: 626011
- Event-only illegal transitions: 7177
- Winning states: 42
- Budget: maxStates=200000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 200001
- Legal transitions: 626010
- Budget: maxStates=200000
- Reason: state budget exceeded
- Metrics: unavailable because the reachable graph was not fully enumerated.

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### ice_destroyed_d3

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

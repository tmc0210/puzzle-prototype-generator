# Level Analysis: scratch_round45_internal_debt_rewrite_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: scratch_round45_internal_debt_rewrite_v1_base
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
####.........#####
####.........#####
####.I...I...#####
####.........#####
##########.#######
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 769
- Inputs: right right right right down down down down right right right right right right down
- Events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=15

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

No non-walk events were found on the returned solution.

## Graph Facts

- Status: exhausted
- Reachable states: 120001
- Legal transitions: 349458
- Event-only illegal transitions: 5062
- Winning states: 97
- Budget: maxStates=120000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 120001
- Legal transitions: 349457
- Budget: maxStates=120000
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

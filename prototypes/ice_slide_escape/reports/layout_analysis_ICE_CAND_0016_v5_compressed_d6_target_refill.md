# Level Analysis: ICE_CAND_0016_v5_compressed_d6_target_refill

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0016_v5_compressed_d6_target_refill
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
#........######
#......I#######
#.......#######
#......########
#......########
#.I....########
@......########
###############
```

## Shortest Solution

- Found: no
- Explored states: 100001
- Search status: exhausted
- Reason: state budget exceeded (100000)

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

No non-walk events were found on the returned solution.

## Graph Facts

- Status: exhausted
- Reachable states: 100001
- Legal transitions: 257224
- Event-only illegal transitions: 9467
- Winning states: 0
- Budget: maxStates=100000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 100001
- Legal transitions: 257223
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

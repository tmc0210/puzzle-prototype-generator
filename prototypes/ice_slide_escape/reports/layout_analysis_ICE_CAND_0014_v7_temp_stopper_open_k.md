# Level Analysis: ICE_CAND_0014_v7_temp_stopper_open_k

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0014_v7_temp_stopper_open_k
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: K_ice_pass_through_d5, K_ice_destroy_group_d6_plus

## Initial State

```text
###############
#.GGG#......I.#
###GG.#.....I.#
##....I.......#
##.I.########.#
##.G..........#
##...########.#
##...########.#
##III########.#
@.............#
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
- Legal transitions: 233187
- Event-only illegal transitions: 6815
- Winning states: 0
- Budget: maxStates=100000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 100001
- Legal transitions: 233186
- Budget: maxStates=100000
- Reason: state budget exceeded
- Metrics: unavailable because the reachable graph was not fully enumerated.

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### K_ice_pass_through_d5

At distance 5, moving ice passes through a contiguous obstacle group and restarts counting.

- Required events: ice_pass_through_d5, slide_restart_after_group
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: unknown
- Shortest bypass: not checked (No returned winning solution; shortest bypass was not checked.)
- Winning bypass: not checked (No returned winning solution; winning bypass was not checked.)

### K_ice_destroy_group_d6_plus

At distance 6 or more, moving ice destroys the contiguous obstacle group and restarts counting.

- Required events: ice_destroy_group_d6_plus, slide_restart_after_group
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: unknown
- Shortest bypass: not checked (No returned winning solution; shortest bypass was not checked.)
- Winning bypass: not checked (No returned winning solution; winning bypass was not checked.)


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.

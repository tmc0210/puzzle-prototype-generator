# Level Analysis: RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2

## Summary

- Prototype: reality_anchor
- Title: Sticky shadow handle v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#........#
#.#.GG#@.#
#...MC...#
#...#....#
#...SB...#
##########
```

## Shortest Solution

- Found: yes
- Cost: 13
- Depth: 13
- Explored states: 1019
- Inputs: up left left down left left down down down right right up up
- Events: walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid
- Event counts: walk=10, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 10: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#........#
#.#.GG#..#
#...MC...#
#...#....#
#..@SB...#
##########
```

After:

```text
##########
#........#
#.#.GG#..#
#...MM...#
#...#....#
#...@SB..#
##########
```

### Step 11: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#........#
#.#.GG#..#
#...MM...#
#...#....#
#...@SB..#
##########
```

After:

```text
##########
#........#
#.#.GG#..#
#...MM...#
#...#....#
#....@SB.#
##########
```

### Step 13: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#........#
#.#.GG#..#
#...MM...#
#...#@...#
#.....SB.#
##########
```

After:

```text
##########
#........#
#.#.mm#..#
#....@...#
#...#....#
#.....SB.#
##########
```


## Graph Facts

- Status: exhausted
- Reachable states: 100001
- Legal transitions: 271943
- Event-only illegal transitions: 0
- Winning states: 231
- Budget: maxStates=100000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 100001
- Legal transitions: 271942
- Budget: maxStates=100000
- Reason: state budget exceeded
- Metrics: unavailable because the reachable graph was not fully enumerated.

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### K_runtime_smoke

Reality Anchor v0 runtime smoke behavior is executable through the registered adapter.

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

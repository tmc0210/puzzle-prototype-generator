# Level Analysis: RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_L

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_L
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#....@....#
#....##...#
#...CMM...#
#....GG...#
#...G.....#
#...BS....#
###########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 14727
- Inputs: left down down down up right down right right right up up left down right down left
- Events: walk walk push_object:crate#1 push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid
- Event counts: walk=12, push_object:crate#1=2, push_object:sticky#1=3, move_sticky_rigid=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
###########
#.........#
#...@##...#
#...CMM...#
#....GG...#
#...G.....#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#...@MM...#
#...CGG...#
#...G.....#
#...BS....#
###########
```

### Step 4: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
###########
#.........#
#....##...#
#...@MM...#
#...CGG...#
#...G.....#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#....MM...#
#...@GG...#
#...*.....#
#...BS....#
###########
```

### Step 6: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#.........#
#....##...#
#...@MM...#
#....GG...#
#...*.....#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#....@MM..#
#....GG...#
#...*.....#
#...BS....#
###########
```

### Step 14: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#.........#
#....##@..#
#.....MM..#
#....GG...#
#...*.....#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#......@..#
#....GmM..#
#...*.....#
#...BS....#
###########
```

### Step 17: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#.........#
#....##...#
#.........#
#....GmM@.#
#...*.....#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#.........#
#....mm@..#
#...*.....#
#...BS....#
###########
```


## Graph Facts

- Status: exhausted
- Reachable states: 300001
- Legal transitions: 701046
- Event-only illegal transitions: 0
- Winning states: 61
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 701045
- Budget: maxStates=300000
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

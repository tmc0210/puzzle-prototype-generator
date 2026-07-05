# Level Analysis: RA_CURR_L11_APP_SCRATCHA

## Summary

- Prototype: reality_anchor
- Title: scratchA
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#...G...#
#########
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 738
- Inputs: up right up left up right down right down down up right down right up
- Events: walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#2 walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid
- Event counts: walk=8, push_object:crate#1=2, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=1, push_object:crate#2=1, push_object:sticky#1=2, move_sticky_rigid=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
#.....#.#
#..BS#G.#
##@C.MM.#
#C.#....#
#...G...#
#########
```

After:

```text
#########
#.....#.#
#..BS#G.#
##.@MMM.#
#C.#....#
#...G...#
#########
```

### Step 3: up

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#.....#.#
#..BS#G.#
##.@MMM.#
#C.#....#
#...G...#
#########
```

After:

```text
#########
#..BS.#.#
#..@.#G.#
##..MMM.#
#C.#....#
#...G...#
#########
```

### Step 6: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#########
#.@BS.#.#
#....#G.#
##..MMM.#
#C.#....#
#...G...#
#########
```

After:

```text
#########
#..@BS#.#
#....#G.#
##..CMM.#
#C.#....#
#...G...#
#########
```

### Step 9: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#...BS#.#
#...@#G.#
##..CMM.#
#C.#....#
#...G...#
#########
```

After:

```text
#########
#...BS#.#
#....#G.#
##..@MM.#
#C.#C...#
#...G...#
#########
```

### Step 10: down

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
#...BS#.#
#....#G.#
##..@MM.#
#C.#C...#
#...G...#
#########
```

After:

```text
#########
#...BS#.#
#....#G.#
##...MM.#
#C.#@...#
#...*...#
#########
```

### Step 12: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#...BS#.#
#....#G.#
##..@MM.#
#C.#....#
#...*...#
#########
```

After:

```text
#########
#...BS#.#
#....#G.#
##...@MM#
#C.#....#
#...*...#
#########
```

### Step 15: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#...BS#.#
#....#G.#
##....MM#
#C.#..@.#
#...*...#
#########
```

After:

```text
#########
#...BS#.#
#....#mM#
##....@.#
#C.#....#
#...*...#
#########
```


## Graph Facts

- Status: exhausted
- Reachable states: 300001
- Legal transitions: 754906
- Event-only illegal transitions: 0
- Winning states: 9378
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 754905
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

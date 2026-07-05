# Level Analysis: RA_SCRATCH_RESIDUE_MOVE_A

## Summary

- Prototype: reality_anchor
- Title: RA_SCRATCH_RESIDUE_MOVE_A
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#......G##.#
#....@C.MM.#
#..##.....##
#..##...GG##
#####.BS...#
############
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 2834
- Inputs: right up right down down left down left down right right up up up
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#1 push_object:crate#1 push_object:crate#1
- Event counts: push_object:crate#1=4, box_to_sticky:n1=1, sticky_merge:n1=1, walk=6, push_object:sticky#1=2, move_sticky_rigid=2, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
############
#......G##.#
#....@C.MM.#
#..##.....##
#..##...GG##
#####.BS...#
############
```

After:

```text
############
#......G##.#
#.....@MMM.#
#..##.....##
#..##...GG##
#####.BS...#
############
```

### Step 4: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
############
#......+##.#
#......MMM.#
#..##.....##
#..##...GG##
#####.BS...#
############
```

After:

```text
############
#......G##.#
#......@...#
#..##..MMM##
#..##...GG##
#####.BS...#
############
```

### Step 5: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
############
#......G##.#
#......@...#
#..##..MMM##
#..##...GG##
#####.BS...#
############
```

After:

```text
############
#......G##.#
#..........#
#..##..@..##
#..##..Mmm##
#####.BS...#
############
```

### Step 10: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
############
#......G##.#
#..........#
#..##.....##
#..##..Mmm##
#####@BS...#
############
```

After:

```text
############
#......G##.#
#..........#
#..##.....##
#..##..Cmm##
#####.@BS..#
############
```

### Step 11: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
############
#......G##.#
#..........#
#..##.....##
#..##..Cmm##
#####.@BS..#
############
```

After:

```text
############
#......G##.#
#..........#
#..##.....##
#..##..C*m##
#####..@BS.#
############
```

### Step 12: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#......G##.#
#..........#
#..##.....##
#..##..C*m##
#####..@BS.#
############
```

After:

```text
############
#......G##.#
#..........#
#..##..C..##
#..##..@*m##
#####...BS.#
############
```

### Step 13: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#......G##.#
#..........#
#..##..C..##
#..##..@*m##
#####...BS.#
############
```

After:

```text
############
#......G##.#
#......C...#
#..##..@..##
#..##...*m##
#####...BS.#
############
```

### Step 14: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#......G##.#
#......C...#
#..##..@..##
#..##...*m##
#####...BS.#
############
```

After:

```text
############
#......*##.#
#......@...#
#..##.....##
#..##...*m##
#####...BS.#
############
```


## Graph Facts

- Status: exhausted
- Reachable states: 500001
- Legal transitions: 1288492
- Event-only illegal transitions: 0
- Winning states: 159
- Budget: maxStates=500000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 500001
- Legal transitions: 1288491
- Budget: maxStates=500000
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

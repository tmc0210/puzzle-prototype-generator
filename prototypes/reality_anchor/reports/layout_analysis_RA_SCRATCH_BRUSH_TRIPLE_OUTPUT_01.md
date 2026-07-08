# Level Analysis: RA_SCRATCH_BRUSH_TRIPLE_OUTPUT_01

## Summary

- Prototype: reality_anchor
- Title: Brush triple output scratch 01
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#############
#......G##..#
#....@C.MM..#
#..##.....G##
#..##...G####
#.....BS....#
#############
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 12389
- Inputs: right up right down left down down left down right right up up up right down right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 push_object:crate#1 walk push_object:crate#2 push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:crate#1=3, box_to_sticky:n1=1, sticky_merge:n1=1, walk=9, push_object:sticky#1=2, move_sticky_rigid=2, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=2, push_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#############
#......G##..#
#....@C.MM..#
#..##.....G##
#..##...G####
#.....BS....#
#############
```

After:

```text
#############
#......G##..#
#.....@MMM..#
#..##.....G##
#..##...G####
#.....BS....#
#############
```

### Step 4: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#############
#......+##..#
#......MMM..#
#..##.....G##
#..##...G####
#.....BS....#
#############
```

After:

```text
#############
#......G##..#
#......@....#
#..##..MMMG##
#..##...G####
#.....BS....#
#############
```

### Step 10: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#############
#......G##..#
#...........#
#..##..MMMG##
#..##...G####
#....@BS....#
#############
```

After:

```text
#############
#......G##..#
#...........#
#..##..CMMG##
#..##...G####
#.....@BS...#
#############
```

### Step 11: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#############
#......G##..#
#...........#
#..##..CMMG##
#..##...G####
#.....@BS...#
#############
```

After:

```text
#############
#......G##..#
#...........#
#..##..CCMG##
#..##...G####
#......@BS..#
#############
```

### Step 13: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
#############
#......G##..#
#...........#
#..##..CCMG##
#..##..@G####
#.......BS..#
#############
```

After:

```text
#############
#......G##..#
#......C....#
#..##..@CMG##
#..##...G####
#.......BS..#
#############
```

### Step 14: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
#############
#......G##..#
#......C....#
#..##..@CMG##
#..##...G####
#.......BS..#
#############
```

After:

```text
#############
#......*##..#
#......@....#
#..##...CMG##
#..##...G####
#.......BS..#
#############
```

### Step 16: down

- Legal: true
- Events: push_object:crate#2

Before:

```text
#############
#......*##..#
#.......@...#
#..##...CMG##
#..##...G####
#.......BS..#
#############
```

After:

```text
#############
#......*##..#
#...........#
#..##...@MG##
#..##...*####
#.......BS..#
#############
```

### Step 17: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#############
#......*##..#
#...........#
#..##...@MG##
#..##...*####
#.......BS..#
#############
```

After:

```text
#############
#......*##..#
#...........#
#..##....@m##
#..##...*####
#.......BS..#
#############
```


## Graph Facts

- Status: exhausted
- Reachable states: 300001
- Legal transitions: 687635
- Event-only illegal transitions: 0
- Winning states: 11
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 687634
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

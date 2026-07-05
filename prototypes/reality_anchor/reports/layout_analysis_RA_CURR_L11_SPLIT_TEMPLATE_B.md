# Level Analysis: RA_CURR_L11_SPLIT_TEMPLATE_B

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_SPLIT_TEMPLATE_B
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#.#.BS...#
#.@C..MG.#
#....M#..#
#....MMG.#
##########
```

## Shortest Solution

- Found: yes
- Cost: 11
- Depth: 11
- Explored states: 669
- Inputs: right up right left down right right left down down right
- Events: push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk push_object:crate#1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
- Event counts: push_object:crate#1=3, walk=6, push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n2=1, force_chain:n2=2, move_sticky_rigid=2, box_to_sticky:n1=2, sticky_merge:n1=2, push_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#.#.BS...#
#.@C..MG.#
#....M#..#
#....MMG.#
##########
```

After:

```text
##########
#.#.BS...#
#..@C.MG.#
#....M#..#
#....MMG.#
##########
```

### Step 3: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
##########
#.#@BS...#
#...C.MG.#
#....M#..#
#....MMG.#
##########
```

After:

```text
##########
#.#.@BS..#
#...C.MG.#
#....C#..#
#....CMG.#
##########
```

### Step 6: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#.#..BS..#
#..@C.MG.#
#....C#..#
#....CMG.#
##########
```

After:

```text
##########
#.#..BS..#
#...@CMG.#
#....C#..#
#....CMG.#
##########
```

### Step 7: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#.#..BS..#
#...@CMG.#
#....C#..#
#....CMG.#
##########
```

After:

```text
##########
#.#..BS..#
#....@Mm.#
#....C#..#
#....CMG.#
##########
```

### Step 11: right

- Legal: true
- Events: push_object:crate#2, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#.#..BS..#
#.....Mm.#
#....C#..#
#...@CMG.#
##########
```

After:

```text
##########
#.#..BS..#
#.....Mm.#
#....C#..#
#....@Mm.#
##########
```


## Graph Facts

- Status: exhausted
- Reachable states: 300001
- Legal transitions: 694898
- Event-only illegal transitions: 0
- Winning states: 17417
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 694897
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

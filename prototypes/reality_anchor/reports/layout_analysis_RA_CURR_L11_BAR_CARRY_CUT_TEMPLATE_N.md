# Level Analysis: RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_N

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_N
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#.........#
#....##...#
#...CCC#..#
#....GG#..#
#...G..#..#
#.....BS@.#
###########
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 3427
- Inputs: left left left up up left left up up right down left down down left down right up up up right down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1
- Event counts: push_object:box_sticky_anchor=4, anchor_boundary_shift:box_sticky=4, box_to_sticky:n1=3, sticky_merge:n1=2, walk=16, push_object:sticky#1=1, move_sticky_rigid=1, sticky_to_box:n1=1, push_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1

Before:

```text
###########
#.........#
#....##...#
#...CCC#..#
#....GG#..#
#...G..#..#
#.....BS@.#
###########
```

After:

```text
###########
#.........#
#....##...#
#...CCM#..#
#....GG#..#
#...G..#..#
#....BS@..#
###########
```

### Step 2: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
#.........#
#....##...#
#...CCM#..#
#....GG#..#
#...G..#..#
#....BS@..#
###########
```

After:

```text
###########
#.........#
#....##...#
#...CMM#..#
#....GG#..#
#...G..#..#
#...BS@...#
###########
```

### Step 3: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
#.........#
#....##...#
#...CMM#..#
#....GG#..#
#...G..#..#
#...BS@...#
###########
```

After:

```text
###########
#.........#
#....##...#
#...MMM#..#
#....GG#..#
#...G..#..#
#..BS@....#
###########
```

### Step 11: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#.........#
#...@##...#
#...MMM#..#
#....GG#..#
#...G..#..#
#..BS.....#
###########
```

After:

```text
###########
#.........#
#....##...#
#...@..#..#
#...Mmm#..#
#...G..#..#
#..BS.....#
###########
```

### Step 17: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
#.........#
#....##...#
#......#..#
#...Mmm#..#
#...G..#..#
#.@BS.....#
###########
```

After:

```text
###########
#.........#
#....##...#
#......#..#
#...Cmm#..#
#...G..#..#
#..@BS....#
###########
```

### Step 22: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
###########
#.........#
#....##...#
#...@..#..#
#...Cmm#..#
#...G..#..#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#......#..#
#...@mm#..#
#...*..#..#
#...BS....#
###########
```


## Graph Facts

- Status: exhausted
- Reachable states: 300001
- Legal transitions: 735364
- Event-only illegal transitions: 0
- Winning states: 201
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 735363
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

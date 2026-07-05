# Level Analysis: RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_M

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_M
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
#...CMM#..#
#....GG#..#
#...G..#..#
#...BS....#
###########
```

## Shortest Solution

- Found: yes
- Cost: 28
- Depth: 28
- Explored states: 90091
- Inputs: left down down left down right down right right up left right up left left up left down up left down left down right right up right down
- Events: walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#2 force_chain:n2 walk walk push_object:crate#2 walk walk push_object:crate#1 walk walk push_object:crate#1 force_chain:n3 box_to_sticky:n1 push_object:crate#1 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk push_object:crate#1
- Event counts: walk=18, push_object:crate#1=6, box_to_sticky:n1=3, sticky_merge:n1=2, push_object:sticky#1=2, move_sticky_rigid=3, sticky_to_box:n2=1, force_chain:n2=2, sticky_to_box:n1=1, push_object:crate#2=2, force_chain:n3=2

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
#...CMM#..#
#....GG#..#
#...G..#..#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#...@MM#..#
#...CGG#..#
#...G..#..#
#...BS....#
###########
```

### Step 6: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
#.........#
#....##...#
#....MM#..#
#..@CGG#..#
#...G..#..#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#....MM#..#
#...@mG#..#
#...G..#..#
#...BS....#
###########
```

### Step 11: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n2

Before:

```text
###########
#.........#
#....##...#
#....MM#..#
#....m+#..#
#...G..#..#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#...CM.#..#
#...C+G#..#
#...G..#..#
#...BS....#
###########
```

### Step 14: left

- Legal: true
- Events: push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n1

Before:

```text
###########
#.........#
#....##...#
#...CM@#..#
#...CGG#..#
#...G..#..#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#..CC@.#..#
#...CGG#..#
#...G..#..#
#...BS....#
###########
```

### Step 15: left

- Legal: true
- Events: push_object:crate#2, force_chain:n2

Before:

```text
###########
#.........#
#....##...#
#..CC@.#..#
#...CGG#..#
#...G..#..#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#.CC@..#..#
#...CGG#..#
#...G..#..#
#...BS....#
###########
```

### Step 18: down

- Legal: true
- Events: push_object:crate#2

Before:

```text
###########
#.........#
#..@.##...#
#.CC...#..#
#...CGG#..#
#...G..#..#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#.C@...#..#
#..CCGG#..#
#...G..#..#
#...BS....#
###########
```

### Step 21: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
###########
#.........#
#.@..##...#
#.C....#..#
#..CCGG#..#
#...G..#..#
#...BS....#
###########
```

After:

```text
###########
#.........#
#....##...#
#.@....#..#
#.CCCGG#..#
#...G..#..#
#...BS....#
###########
```

### Step 24: right

- Legal: true
- Events: push_object:crate#1, force_chain:n3, box_to_sticky:n1

Before:

```text
###########
#.........#
#....##...#
#......#..#
#@CCCGG#..#
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
#.@CCmG#..#
#...G..#..#
#...BS....#
###########
```

### Step 25: right

- Legal: true
- Events: push_object:crate#1, force_chain:n3, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
#.........#
#....##...#
#......#..#
#.@CCmG#..#
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
#..@Cmm#..#
#...G..#..#
#...BS....#
###########
```

### Step 28: down

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
- Legal transitions: 706485
- Event-only illegal transitions: 0
- Winning states: 19
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 706484
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

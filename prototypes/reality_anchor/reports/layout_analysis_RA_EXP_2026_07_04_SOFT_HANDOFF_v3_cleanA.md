# Level Analysis: RA_EXP_2026_07_04_SOFT_HANDOFF_v3_cleanA

## Summary

- Prototype: reality_anchor
- Title: Soft handoff v3 cleanA
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#...C@..#
#..G.G..#
#...PL.M#
#.....BS#
#########
```

## Shortest Solution

- Found: yes
- Cost: 13
- Depth: 13
- Explored states: 1031
- Inputs: down up right right down left down left down left up right left
- Events: walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 pull_object:crate#1 walk walk pull_object:crate#1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
- Event counts: walk=4, pull_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=4, pull_object:crate#1=3, pull_object:sticky#1=2, move_sticky_rigid=2, sticky_to_box:n1=1, pull_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, box_to_sticky:n2=1, sticky_merge:n1=1, push_object:push_pull_anchor=1, force_chain:n2=1, sticky_to_box:n2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: up

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#...C...#
#..G.+..#
#...PL.M#
#.....BS#
#########
```

After:

```text
#########
#...C@..#
#..GPL..#
#......M#
#.....BS#
#########
```

### Step 3: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#...C@..#
#..GPL..#
#......M#
#.....BS#
#########
```

After:

```text
#########
#....C@.#
#..GPL..#
#......M#
#.....BS#
#########
```

### Step 4: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#....C@.#
#..GPL..#
#......M#
#.....BS#
#########
```

After:

```text
#########
#.....C@#
#..GPL..#
#......M#
#.....BS#
#########
```

### Step 7: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#.....C.#
#..GPL@.#
#......M#
#.....BS#
#########
```

After:

```text
#########
#.......#
#..GPLC.#
#.....@M#
#.....BS#
#########
```

### Step 8: left

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
#########
#.......#
#..GPLC.#
#.....@M#
#.....BS#
#########
```

After:

```text
#########
#.......#
#..GPLC.#
#....@C.#
#.....BS#
#########
```

### Step 9: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#.......#
#..GPLC.#
#....@C.#
#.....BS#
#########
```

After:

```text
#########
#.......#
#..G.GC.#
#...PLC.#
#....@BS#
#########
```

### Step 10: left

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1

Before:

```text
#########
#.......#
#..G.GC.#
#...PLC.#
#....@BS#
#########
```

After:

```text
#########
#.......#
#..G.GM.#
#...PLM.#
#...@BS.#
#########
```

### Step 11: up

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#.......#
#..G.GM.#
#...PLM.#
#...@BS.#
#########
```

After:

```text
#########
#.......#
#..GPLM.#
#...@.M.#
#....BS.#
#########
```

### Step 13: left

- Legal: true
- Events: pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n2

Before:

```text
#########
#.......#
#..GPLM.#
#....@M.#
#....BS.#
#########
```

After:

```text
#########
#.......#
#..PL*..#
#...@C..#
#....BS.#
#########
```


## Graph Facts

- Status: exhausted
- Reachable states: 300001
- Legal transitions: 750809
- Event-only illegal transitions: 0
- Winning states: 10771
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 750808
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

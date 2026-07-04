# Level Analysis: RA_EXP_2026_07_04_PHASE_FERRY_v5

## Summary

- Prototype: reality_anchor
- Title: Phase ferry v5
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#C.....##
###.LP.G#
##..B.#.#
#..MS#M.#
#.G@M...#
#########
```

## Shortest Solution

- Found: yes
- Cost: 42
- Depth: 42
- Explored states: 1033
- Inputs: left up up right up up right right down left up right right down right down down down left left left up up right up left right right up left left right down down left down left up up right right right
- Events: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#2 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk push_object:crate#2 push_object:crate#2 push_object:crate#2
- Event counts: pull_object:sticky#2=1, move_sticky_rigid=2, sticky_merge:n1=1, walk=28, pull_object:sticky#1=1, sticky_to_box:n1=1, pull_object:crate#2=2, push_object:push_pull_anchor=4, force_chain:n2=3, anchor_boundary_shift:push_pull=5, anchor_boundary_shift:box_sticky=3, sticky_to_box:n2=1, pull_object:push_pull_anchor=1, push_object:box_sticky_anchor=2, push_object:crate#2=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: pull_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
#C.....##
###.LP.G#
##..B.#.#
#..MS#M.#
#.G@M...#
#########
```

After:

```text
#########
#C.....##
###.LP.G#
##..B.#.#
#..MS#M.#
#.+M....#
#########
```

### Step 5: up

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
#########
#C.....##
###.LP.G#
##.@B.#.#
#..MS#M.#
#.GM....#
#########
```

After:

```text
#########
#C.....##
###@LP.G#
##.CB.#.#
#..MS#M.#
#.G.....#
#########
```

### Step 6: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
#########
#C.....##
###@LP.G#
##.CB.#.#
#..MS#M.#
#.G.....#
#########
```

After:

```text
#########
#C.@...##
###CLP.G#
##..B.#.#
#..MS#M.#
#.G.....#
#########
```

### Step 9: down

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
#########
#C...@.##
###CLP.G#
##..B.#.#
#..MS#M.#
#.G.....#
#########
```

After:

```text
#########
#C.....##
###C.@.G#
##..LP#.#
#..CB#C.#
#.G.S...#
#########
```

### Step 11: up

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#C.....##
###C@..G#
##..LP#.#
#..CB#C.#
#.G.S...#
#########
```

After:

```text
#########
#C..@..##
###CLP.G#
##....#.#
#..CB#C.#
#.G.S...#
#########
```

### Step 21: left

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
#########
#C.....##
###CLP.G#
##....#.#
#..CB#C.#
#.G.S@..#
#########
```

After:

```text
#########
#C.....##
###CLP.G#
##....#.#
#.CB.#C.#
#.GS@...#
#########
```

### Step 25: up

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#C.....##
###CLP.G#
##...@#.#
#.CB.#C.#
#.GS....#
#########
```

After:

```text
#########
#C..LP.##
###C.@.G#
##....#.#
#.CB.#C.#
#.GS....#
#########
```

### Step 27: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
#########
#C..LP.##
###C@..G#
##....#.#
#.CB.#C.#
#.GS....#
#########
```

After:

```text
#########
#C..LP.##
###.C@.G#
##....#.#
#.CB.#C.#
#.GS....#
#########
```

### Step 30: left

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#C..LP@##
###.C..G#
##....#.#
#.CB.#C.#
#.GS....#
#########
```

After:

```text
#########
#C.LP@.##
###.C..G#
##....#.#
#.CB.#C.#
#.GS....#
#########
```

### Step 31: left

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#C.LP@.##
###.C..G#
##....#.#
#.CB.#C.#
#.GS....#
#########
```

After:

```text
#########
#CLP@..##
###.C..G#
##....#.#
#.CB.#C.#
#.GS....#
#########
```

### Step 37: left

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
#########
#CLP...##
###.C..G#
##....#.#
#.CB@#C.#
#.GS....#
#########
```

After:

```text
#########
#CLP...##
###.C..G#
##....#.#
#CB@.#C.#
#.S.....#
#########
```

### Step 40: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
#CLP...##
###@C..G#
##....#.#
#CB..#C.#
#.S.....#
#########
```

After:

```text
#########
#CLP...##
###.@C.G#
##....#.#
#CB..#C.#
#.S.....#
#########
```

### Step 41: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
#CLP...##
###.@C.G#
##....#.#
#CB..#C.#
#.S.....#
#########
```

After:

```text
#########
#CLP...##
###..@CG#
##....#.#
#CB..#C.#
#.S.....#
#########
```

### Step 42: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
#CLP...##
###..@CG#
##....#.#
#CB..#C.#
#.S.....#
#########
```

After:

```text
#########
#CLP...##
###...@*#
##....#.#
#CB..#C.#
#.S.....#
#########
```


## Graph Facts

- Status: exhausted
- Reachable states: 300001
- Legal transitions: 681788
- Event-only illegal transitions: 0
- Winning states: 16491
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 681787
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

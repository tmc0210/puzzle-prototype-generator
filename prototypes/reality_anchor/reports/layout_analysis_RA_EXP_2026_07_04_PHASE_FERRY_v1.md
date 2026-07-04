# Level Analysis: RA_EXP_2026_07_04_PHASE_FERRY_v1

## Summary

- Prototype: reality_anchor
- Title: Phase ferry v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#....#.G#
#@#.M..M#
#.G..M.M#
#G.SLP..#
##.B..C.#
#########
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 706
- Inputs: down right right up up left left down down down right right down right right up right right up left left left
- Events: walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk walk push_object:sticky#2 move_sticky_rigid walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- Event counts: walk=15, pull_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=5, sticky_to_box:n2=1, box_to_sticky:n2=1, sticky_merge:n1=2, push_object:push_pull_anchor=3, force_chain:n2=3, anchor_boundary_shift:push_pull=3, move_sticky_rigid=2, push_object:sticky#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: up

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#....#.G#
#.#.M..M#
#.G@.M.M#
#G.SLP..#
##.B..C.#
#########
```

After:

```text
#########
#....#.G#
#.#@M..M#
#.GS.M.M#
#G.BLP..#
##....C.#
#########
```

### Step 5: up

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
#########
#....#.G#
#.#@M..M#
#.GS.M.M#
#G.BLP..#
##....C.#
#########
```

After:

```text
#########
#..@.#.G#
#.#SM..M#
#.GB.C.C#
#G..LP..#
##....C.#
#########
```

### Step 13: down

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1

Before:

```text
#########
#....#.G#
#.#SM..M#
#.GB.C.C#
#G.@LP..#
##....C.#
#########
```

After:

```text
#########
#....#.G#
#.#.M..M#
#.GS.M.M#
#G.BLP..#
##.@..C.#
#########
```

### Step 16: up

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
#....#.G#
#.#.M..M#
#.GS.M.M#
#G.BLP..#
##...@C.#
#########
```

After:

```text
#########
#....#.G#
#.#.MM.M#
#.GSLP.M#
#G.B.@..#
##....C.#
#########
```

### Step 19: up

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid

Before:

```text
#########
#....#.G#
#.#.MM.M#
#.GSLP.M#
#G.B...@#
##....C.#
#########
```

After:

```text
#########
#....#.m#
#.#.MM.M#
#.GSLP.@#
#G.B....#
##....C.#
#########
```

### Step 21: left

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky

Before:

```text
#########
#....#.m#
#.#.MM.M#
#.GSLP@.#
#G.B....#
##....C.#
#########
```

After:

```text
#########
#....#.m#
#.#.MM.M#
#.SLP@..#
#GB.....#
##....C.#
#########
```

### Step 22: left

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky

Before:

```text
#########
#....#.m#
#.#.MM.M#
#.SLP@..#
#GB.....#
##....C.#
#########
```

After:

```text
#########
#....#.m#
#.#.MM.M#
#SLP@...#
#B......#
##....C.#
#########
```


## Graph Facts

- Status: exhausted
- Reachable states: 300001
- Legal transitions: 678693
- Event-only illegal transitions: 0
- Winning states: 3696
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 678692
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

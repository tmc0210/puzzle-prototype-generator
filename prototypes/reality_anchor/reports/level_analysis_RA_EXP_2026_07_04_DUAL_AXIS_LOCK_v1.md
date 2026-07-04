# Level Analysis: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v1

## Summary

- Prototype: reality_anchor
- Title: Dual-axis anchor lock
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#....G.###
#.....P###
#@CBSMLG##
###..M..##
#####G####
##########
```

## Shortest Solution

- Found: yes
- Cost: 21
- Depth: 21
- Explored states: 1917
- Inputs: up right right down right up up right right down left down right left left left up left up right right
- Events: walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- Event counts: walk=10, push_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=4, pull_object:crate#1=1, pull_object:box_sticky_anchor=1, force_chain:n2=1, push_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=2, push_object:sticky#1=4, move_sticky_rigid=4, box_to_sticky:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#....G.###
#..@..P###
#.CBSMLG##
###..M..##
#####G####
##########
```

After:

```text
##########
#....G.###
#.....P###
#.C@.MLG##
###BSM..##
#####G####
##########
```

### Step 5: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
##########
#....G.###
#.....P###
#.C@.MLG##
###BSM..##
#####G####
##########
```

After:

```text
##########
#....G.###
#.....P###
#..C@MLG##
###BSM..##
#####G####
##########
```

### Step 6: up

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
##########
#....G.###
#.....P###
#..C@MLG##
###BSM..##
#####G####
##########
```

After:

```text
##########
#....G.###
#..C@.P###
#..BSMLG##
###..M..##
#####G####
##########
```

### Step 10: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#....G@###
#..C..P###
#..BSMLG##
###..M..##
#####G####
##########
```

After:

```text
##########
#....G.###
#..C..@###
#..BSMPG##
###..ML.##
#####G####
##########
```

### Step 12: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#....G.###
#..C.@.###
#..BSMPG##
###..ML.##
#####G####
##########
```

After:

```text
##########
#....G.###
#..C...###
#..BS@PG##
###..ML.##
#####m####
##########
```

### Step 13: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#....G.###
#..C...###
#..BS@PG##
###..ML.##
#####m####
##########
```

After:

```text
##########
#....G.###
#..C...###
#..BS.@P##
###..M.L##
#####m####
##########
```

### Step 15: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1

Before:

```text
##########
#....G.###
#..C...###
#..BS@.P##
###..M.L##
#####m####
##########
```

After:

```text
##########
#....G.###
#..M...###
#.BS@..P##
###..M.L##
#####m####
##########
```

### Step 16: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#....G.###
#..M...###
#.BS@..P##
###..M.L##
#####m####
##########
```

After:

```text
##########
#....G.###
#..M...###
#BS@...P##
###..M.L##
#####m####
##########
```

### Step 17: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#....G.###
#..M...###
#BS@...P##
###..M.L##
#####m####
##########
```

After:

```text
##########
#..M.G.###
#..@...###
#BS....P##
###..M.L##
#####m####
##########
```

### Step 20: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#.@M.G.###
#......###
#BS....P##
###..M.L##
#####m####
##########
```

After:

```text
##########
#..@MG.###
#......###
#BS....P##
###..M.L##
#####m####
##########
```

### Step 21: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#..@MG.###
#......###
#BS....P##
###..M.L##
#####m####
##########
```

After:

```text
##########
#...@m.###
#......###
#BS....P##
###..M.L##
#####m####
##########
```


## Graph Facts

- Status: exhausted
- Reachable states: 1000001
- Legal transitions: 2424403
- Event-only illegal transitions: 0
- Winning states: 10923
- Budget: maxStates=1000000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 1000001
- Legal transitions: 2424402
- Budget: maxStates=1000000
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

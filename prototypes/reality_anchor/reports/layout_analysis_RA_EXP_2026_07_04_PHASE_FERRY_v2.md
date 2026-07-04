# Level Analysis: RA_EXP_2026_07_04_PHASE_FERRY_v2

## Summary

- Prototype: reality_anchor
- Title: Phase ferry v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#G#...BG.#
#MPLM.S..#
#..G.M#G.#
##.M...@.#
##########
```

## Shortest Solution

- Found: yes
- Cost: 30
- Depth: 30
- Explored states: 1047
- Inputs: up up right down left down left left left up left left left up right right right down right up left up right down down down right right up down
- Events: walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk push_object:crate#1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:crate#2 box_to_sticky:n1
- Event counts: walk=19, pull_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=3, sticky_to_box:n2=1, pull_object:sticky#2=2, move_sticky_rigid=2, sticky_merge:n1=1, push_object:crate#1=1, push_object:push_pull_anchor=5, force_chain:n2=2, anchor_boundary_shift:push_pull=5, force_chain:n3=1, pull_object:crate#2=1, box_to_sticky:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#G#...BG.#
#MPLM.S@.#
#..G.M#G.#
##.M.....#
##########
```

After:

```text
##########
#G#....B.#
#MPLM..S@#
#..G.M#G.#
##.M.....#
##########
```

### Step 6: down

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
##########
#G#....B.#
#MPLM..S.#
#..G.M#+.#
##.M.....#
##########
```

After:

```text
##########
#G#....G.#
#CPLC..B.#
#..G.M#S.#
##.M...@.#
##########
```

### Step 11: left

- Legal: true
- Events: pull_object:sticky#2, move_sticky_rigid

Before:

```text
##########
#G#....G.#
#CPLC..B.#
#..G@M#S.#
##.M.....#
##########
```

After:

```text
##########
#G#....G.#
#CPLC..B.#
#..+M.#S.#
##.M.....#
##########
```

### Step 12: left

- Legal: true
- Events: pull_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
##########
#G#....G.#
#CPLC..B.#
#..+M.#S.#
##.M.....#
##########
```

After:

```text
##########
#G#....G.#
#CPLC..B.#
#.@m..#S.#
##.M.....#
##########
```

### Step 14: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#G#....G.#
#CPLC..B.#
#@.m..#S.#
##.M.....#
##########
```

After:

```text
##########
#*#....G.#
#@PLC..B.#
#..m..#S.#
##.M.....#
##########
```

### Step 15: right

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull

Before:

```text
##########
#*#....G.#
#@PLC..B.#
#..m..#S.#
##.M.....#
##########
```

After:

```text
##########
#*#....G.#
#.@PLC.B.#
#..m..#S.#
##.M.....#
##########
```

### Step 16: right

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull

Before:

```text
##########
#*#....G.#
#.@PLC.B.#
#..m..#S.#
##.M.....#
##########
```

After:

```text
##########
#*#....G.#
#..@PLCB.#
#..m..#S.#
##.M.....#
##########
```

### Step 17: right

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n3, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky

Before:

```text
##########
#*#....G.#
#..@PLCB.#
#..m..#S.#
##.M.....#
##########
```

After:

```text
##########
#*#....G.#
#...@PLCB#
#..m..#GS#
##.M.....#
##########
```

### Step 20: up

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#*#....G.#
#....PLCB#
#..m.@#GS#
##.M.....#
##########
```

After:

```text
##########
#*#..PLG.#
#....@.CB#
#..m..#GS#
##.M.....#
##########
```

### Step 23: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#*#.@PLG.#
#......CB#
#..m..#GS#
##.M.....#
##########
```

After:

```text
##########
#*#..@PL.#
#......CB#
#..m..#GS#
##.M.....#
##########
```

### Step 30: down

- Legal: true
- Events: pull_object:crate#2, box_to_sticky:n1

Before:

```text
##########
#*#...PL.#
#......CB#
#..m..#+S#
##.M.....#
##########
```

After:

```text
##########
#*#...PL.#
#.......B#
#..m..#mS#
##.M...@.#
##########
```


## Graph Facts

- Status: exhausted
- Reachable states: 300001
- Legal transitions: 796613
- Event-only illegal transitions: 0
- Winning states: 9684
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 796612
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

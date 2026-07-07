# Level Analysis: RA_LEX_2026_07_06_WALLGATE_BIND_RELEASE_v1

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_WALLGATE_BIND_RELEASE_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#CG#...P#
#..C..GL#
#...@M..#
##.BS.M.#
#########
```

## Shortest Solution

- Found: yes
- Cost: 30
- Depth: 30
- Explored states: 10665
- Inputs: up right right down up up left right down down right down left left up right up up right down left left left down left left up right right right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#4 force_chain:n2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:crate#3 push_object:crate#4 push_object:crate#4 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: pull_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=3, pull_object:crate#2=1, box_to_sticky:n1=2, pull_object:sticky#1=2, move_sticky_rigid=6, sticky_merge:n1=2, walk=14, pull_object:sticky#2=1, push_object:sticky#1=3, pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=2, sticky_to_box:n2=1, push_object:push_pull_anchor=1, force_chain:n2=2, sticky_to_box:n1=1, push_object:crate#4=3, push_object:box_sticky_anchor=1, push_object:crate#3=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#CG#...P#
#..C..GL#
#...@M..#
##.BS.M.#
#########
```

After:

```text
#########
#CG#...P#
#..C@.GL#
#..BSM..#
##....M.#
#########
```

### Step 2: right

- Legal: true
- Events: pull_object:crate#2, box_to_sticky:n1

Before:

```text
#########
#CG#...P#
#..C@.GL#
#..BSM..#
##....M.#
#########
```

After:

```text
#########
#CG#...P#
#...M@GL#
#..BSM..#
##....M.#
#########
```

### Step 3: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
#CG#...P#
#...M@GL#
#..BSM..#
##....M.#
#########
```

After:

```text
#########
#CG#...P#
#....M+L#
#..BSM..#
##....M.#
#########
```

### Step 5: up

- Legal: true
- Events: pull_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
#CG#...P#
#....MGL#
#..BSM@.#
##....M.#
#########
```

After:

```text
#########
#CG#...P#
#....M+L#
#..BSMM.#
##......#
#########
```

### Step 6: up

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#CG#...P#
#....M+L#
#..BSMM.#
##......#
#########
```

After:

```text
#########
#CG#.M@P#
#....MmL#
#..BS...#
##......#
#########
```

### Step 7: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#CG#.M@P#
#....MmL#
#..BS...#
##......#
#########
```

After:

```text
#########
#CG#M@.P#
#...MMGL#
#..BS...#
##......#
#########
```

### Step 12: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#CG#M..P#
#...MMGL#
#..BS..@#
##......#
#########
```

After:

```text
#########
#CG#M...#
#...MMGP#
#..BS..L#
##.....@#
#########
```

### Step 16: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
#########
#CG#M...#
#...MMGP#
#..BS@.L#
##......#
#########
```

After:

```text
#########
#CG#C...#
#...CMGP#
#...BS@L#
##......#
#########
```

### Step 20: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#CG#C..@#
#...CMGP#
#...BS.L#
##......#
#########
```

After:

```text
#########
#CG#C...#
#...CMG@#
#...BS.P#
##.....L#
#########
```

### Step 22: left

- Legal: true
- Events: push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n1

Before:

```text
#########
#CG#C...#
#...CM+.#
#...BS.P#
##.....L#
#########
```

After:

```text
#########
#CG#C...#
#..CC@G.#
#...BS.P#
##.....L#
#########
```

### Step 23: left

- Legal: true
- Events: push_object:crate#4, force_chain:n2

Before:

```text
#########
#CG#C...#
#..CC@G.#
#...BS.P#
##.....L#
#########
```

After:

```text
#########
#CG#C...#
#.CC@.G.#
#...BS.P#
##.....L#
#########
```

### Step 24: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
#CG#C...#
#.CC@.G.#
#...BS.P#
##.....L#
#########
```

After:

```text
#########
#CG#C...#
#.CC..G.#
#...@..P#
##..BS.L#
#########
```

### Step 27: up

- Legal: true
- Events: push_object:crate#3

Before:

```text
#########
#CG#C...#
#.CC..G.#
#.@....P#
##..BS.L#
#########
```

After:

```text
#########
#C*#C...#
#.@C..G.#
#......P#
##..BS.L#
#########
```

### Step 28: right

- Legal: true
- Events: push_object:crate#4

Before:

```text
#########
#C*#C...#
#.@C..G.#
#......P#
##..BS.L#
#########
```

After:

```text
#########
#C*#C...#
#..@C.G.#
#......P#
##..BS.L#
#########
```

### Step 29: right

- Legal: true
- Events: push_object:crate#4, box_to_sticky:n1

Before:

```text
#########
#C*#C...#
#..@C.G.#
#......P#
##..BS.L#
#########
```

After:

```text
#########
#C*#C...#
#...@MG.#
#......P#
##..BS.L#
#########
```

### Step 30: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#C*#C...#
#...@MG.#
#......P#
##..BS.L#
#########
```

After:

```text
#########
#C*#C...#
#....@m.#
#......P#
##..BS.L#
#########
```


## Graph Facts

- Status: exhausted
- Reachable states: 700001
- Legal transitions: 1542208
- Event-only illegal transitions: 0
- Winning states: 7022
- Budget: maxStates=700000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 700001
- Legal transitions: 1542207
- Budget: maxStates=700000
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

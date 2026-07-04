# Level Analysis: RA_EXP_2026_07_04_PHASE_FERRY_v3

## Summary

- Prototype: reality_anchor
- Title: Phase ferry v3
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#..GS.MMM#
#...BLP.C#
#G@....#.#
#..#CGC..#
##########
```

## Shortest Solution

- Found: yes
- Cost: 31
- Depth: 31
- Explored states: 670
- Inputs: up right left left down right right right up up right left left down down right right down left up left left down left up up up right right left left
- Events: walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:crate#2 pull_object:crate#2 walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#3 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- Event counts: walk=18, pull_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=4, pull_object:crate#2=2, pull_object:sticky#1=4, move_sticky_rigid=4, pull_object:push_pull_anchor=3, anchor_boundary_shift:push_pull=3, pull_object:crate#3=1, box_to_sticky:n2=1, sticky_merge:n1=1, force_chain:n2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: left

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#..GS.MMM#
#..@BLP.C#
#G.....#.#
#..#CGC..#
##########
```

After:

```text
##########
#..S..MMM#
#.@B.LP.C#
#G.....#.#
#..#CGC..#
##########
```

### Step 4: left

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#..S..MMM#
#.@B.LP.C#
#G.....#.#
#..#CGC..#
##########
```

After:

```text
##########
#.SG..MMM#
#@B..LP.C#
#G.....#.#
#..#CGC..#
##########
```

### Step 9: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#.SG..MMM#
#.B..LP.C#
#G..@..#.#
#..#CGC..#
##########
```

After:

```text
##########
#.SG..MMM#
#.B.@LP.C#
#G..C..#.#
#..#.GC..#
##########
```

### Step 10: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#.SG..MMM#
#.B.@LP.C#
#G..C..#.#
#..#.GC..#
##########
```

After:

```text
##########
#.SG@.MMM#
#.B.CLP.C#
#G.....#.#
#..#.GC..#
##########
```

### Step 12: left

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#.SG.@MMM#
#.B.CLP.C#
#G.....#.#
#..#.GC..#
##########
```

After:

```text
##########
#.SG@MMM.#
#.B.CLP.C#
#G.....#.#
#..#.GC..#
##########
```

### Step 13: left

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#.SG@MMM.#
#.B.CLP.C#
#G.....#.#
#..#.GC..#
##########
```

After:

```text
##########
#.S+MMM..#
#.B.CLP.C#
#G.....#.#
#..#.GC..#
##########
```

### Step 18: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#.SGMMM..#
#.B.CLP.C#
#G...@.#.#
#..#.GC..#
##########
```

After:

```text
##########
#.SGMMM..#
#.B.C...C#
#G...LP#.#
#..#.+C..#
##########
```

### Step 19: left

- Legal: true
- Events: pull_object:crate#3

Before:

```text
##########
#.SGMMM..#
#.B.C...C#
#G...LP#.#
#..#.+C..#
##########
```

After:

```text
##########
#.SGMMM..#
#.B.C...C#
#G...LP#.#
#..#@*...#
##########
```

### Step 21: left

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#.SGMMM..#
#.B.C...C#
#G..@LP#.#
#..#.*...#
##########
```

After:

```text
##########
#.SGMMM..#
#.B.C...C#
#G.@LP.#.#
#..#.*...#
##########
```

### Step 22: left

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#.SGMMM..#
#.B.C...C#
#G.@LP.#.#
#..#.*...#
##########
```

After:

```text
##########
#.SGMMM..#
#.B.C...C#
#G@LP..#.#
#..#.*...#
##########
```

### Step 23: down

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1

Before:

```text
##########
#.SGMMM..#
#.B.C...C#
#G@LP..#.#
#..#.*...#
##########
```

After:

```text
##########
#..GMMM..#
#.S.M...M#
#GBLP..#.#
#.@#.*...#
##########
```

### Step 30: left

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#..+MMM..#
#.S.M...M#
#GBLP..#.#
#..#.*...#
##########
```

After:

```text
##########
#.@mMM...#
#.SM....M#
#GBLP..#.#
#..#.*...#
##########
```

### Step 31: left

- Legal: true
- Events: pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
##########
#.@mMM...#
#.SM....M#
#GBLP..#.#
#..#.*...#
##########
```

After:

```text
##########
#@MmM....#
#SM.....M#
#B.LP..#.#
#..#.*...#
##########
```


## Graph Facts

- Status: exhausted
- Reachable states: 300001
- Legal transitions: 712992
- Event-only illegal transitions: 0
- Winning states: 16490
- Budget: maxStates=300000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 300001
- Legal transitions: 712991
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

# Level Analysis: RA_CURR_L04_CAND1

## Summary

- Prototype: reality_anchor
- Title: cand1
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#..PL...#
#.G..@C.#
#..#....#
#.......#
#..##...#
#########
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 394
- Inputs: left left left up right right right down left left
- Events: pull_object:crate#1 pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 push_object:crate#1
- Event counts: pull_object:crate#1=2, walk=3, push_object:push_pull_anchor=3, anchor_boundary_shift:push_pull=3, push_object:crate#1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#..PL...#
#.G..@C.#
#..#....#
#.......#
#..##...#
#########
```

After:

```text
#########
#..PL...#
#.G.@C..#
#..#....#
#.......#
#..##...#
#########
```

### Step 2: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#..PL...#
#.G.@C..#
#..#....#
#.......#
#..##...#
#########
```

After:

```text
#########
#..PL...#
#.G@C...#
#..#....#
#.......#
#..##...#
#########
```

### Step 5: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#.@PL...#
#.G.C...#
#..#....#
#.......#
#..##...#
#########
```

After:

```text
#########
#..@PL..#
#.G.C...#
#..#....#
#.......#
#..##...#
#########
```

### Step 6: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#..@PL..#
#.G.C...#
#..#....#
#.......#
#..##...#
#########
```

After:

```text
#########
#...@PL.#
#.G.C...#
#..#....#
#.......#
#..##...#
#########
```

### Step 7: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#...@PL.#
#.G.C...#
#..#....#
#.......#
#..##...#
#########
```

After:

```text
#########
#....@PL#
#.G.C...#
#..#....#
#.......#
#..##...#
#########
```

### Step 9: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#.....PL#
#.G.C@..#
#..#....#
#.......#
#..##...#
#########
```

After:

```text
#########
#.....PL#
#.GC@...#
#..#....#
#.......#
#..##...#
#########
```

### Step 10: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#.....PL#
#.GC@...#
#..#....#
#.......#
#..##...#
#########
```

After:

```text
#########
#.....PL#
#.*@....#
#..#....#
#.......#
#..##...#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 10347
- Legal transitions: 29885
- Event-only illegal transitions: 0
- Winning states: 290
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 10347
- Legal transitions: 29885
- Budget: maxStates=300000
- Compressed regions: 392
- Bidirectional transitions: 27676
- Commitment transitions: 1689
- Winning regions: 10
- Initial region: r0, states=29, dist=5, internalBidirectional=72, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r10@5 -> r13@6 -> r20@7 -> r34@9 -> r41@10
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=63, edges=145, winReachable=15, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=9, mergingWinSccs=10
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=2
- Initial SCC: s0, states=260, dist=2, out=8, winOut=6, deadOut=2
- SCC path: s0@0 -> s2@5 -> s9@6 -> s29@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 260 | 8 | 6 | 2 | 0 | 0 | s2 | no |
| s2 | 5 | 1 | 28 | 3 | 3 | 0 | 2 | 2 | s9 | no |
| s9 | 6 | 0 | 1160 | 8 | 0 | 0 | 3 | 3 | s29 | no |
| s29 | 7 | 0 | 1594 | 8 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s2 | 260 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s2 | 5 | 6 | s9 | 28 | yes | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s9 | 6 | 7 | s29 | 1160 | yes | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=10347, regions=392, solution commitments=6
- Opening: commitments=5, viable=4, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/6, optimal prefix=3/6, forced viable commitments=0/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 4 | 1 | 1 | forced optimal |
| 4 | r1 | r10 | 4 | 4 | 0 | 1 | forced optimal |
| 5 | r10 | r13 | 3 | 3 | 0 | 1 | forced optimal |
| 6 | r13 | r20 | 2 | 5 | 1 | 1 | multiple viable choices |
| 8 | r20 | r34 | 2 | 4 | 1 | 1 | forced optimal |
| 9 | r34 | r41 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 29 | 5 | 4 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 4 | 30 | 4 | 4 | 0 | 1 | 1 | r10 | no | no | yes |
| r10 | 5 | 3 | 28 | 3 | 3 | 0 | 1 | 1 | r13 | no | no | yes |
| r13 | 6 | 2 | 29 | 6 | 5 | 1 | 1 | 1 | r20 | no | no | no |
| r20 | 7 | 2 | 29 | 5 | 4 | 1 | 1 | 1 | r34 | no | no | yes |
| r34 | 9 | 1 | 29 | 3 | 3 | 0 | 1 | 1 | r41 | no | no | yes |
| r41 | 10 | 0 | 29 | 5 | 3 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 5 | 4 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | left | r1 | yes | 4 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 2 | left | r1 | no | 4 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 3 | left | r1 | no | 4 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 4 | 4 | 4 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | no | yes | walk |
| 5 | right | r10 | yes | 3 | 3 | 3 | 0 | 1 | 1 | r13 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 6 | right | r13 | yes | 2 | 6 | 5 | 1 | 1 | 1 | r20 | yes | yes | no | no | no | no | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 7 | right | r20 | yes | 2 | 5 | 4 | 1 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | down | r20 | no | 2 | 5 | 4 | 1 | 1 | 1 | r34 | yes | yes | yes | yes | no | yes | walk |
| 9 | left | r34 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r41 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 10 | left | r41 | yes | 0 | 5 | 3 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

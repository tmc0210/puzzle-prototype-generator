# Level Analysis: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v1_no_right_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v1_no_right_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#PLB.C.#
#@MS...#
#.G..#.#
#M.G..##
########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 28
- Inputs: right down down right right
- Events: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid
- Event counts: push_object:sticky#2=1, force_chain:n2=1, anchor_boundary_shift:box_sticky=1, move_sticky_rigid=3, pull_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=2, pull_object:sticky#1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:sticky#2, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
########
#PLB.C.#
#@MS...#
#.G..#.#
#M.G..##
########
```

After:

```text
########
#PL.BC.#
#.@MS..#
#.G..#.#
#M.G..##
########
```

### Step 2: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
#PL.BC.#
#.@MS..#
#.G..#.#
#M.G..##
########
```

After:

```text
########
#...BC.#
#PLMS..#
#.+..#.#
#M.G..##
########
```

### Step 3: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
#...BC.#
#PLMS..#
#.+..#.#
#M.G..##
########
```

After:

```text
########
#...BC.#
#..MS..#
#PL..#.#
#M@G..##
########
```

### Step 4: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
########
#...BC.#
#..MS..#
#PL..#.#
#M@G..##
########
```

After:

```text
########
#...BC.#
#..MS..#
#PL..#.#
#.M+..##
########
```

### Step 5: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
########
#...BC.#
#..MS..#
#PL..#.#
#.M+..##
########
```

After:

```text
########
#...BC.#
#..MS..#
#PL..#.#
#..m@.##
########
```


## Graph Facts

- Status: complete
- Reachable states: 482
- Legal transitions: 866
- Event-only illegal transitions: 0
- Winning states: 22
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 482
- Legal transitions: 866
- Budget: maxStates=500000
- Compressed regions: 207
- Bidirectional transitions: 554
- Commitment transitions: 303
- Winning regions: 19
- Initial region: r0, states=10, dist=4, internalBidirectional=18, commitments=5, viableCommitments=2, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r4@3 -> r7@4 -> r14@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=172, edges=226, winReachable=67, winning=19, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=14, mergingWinSccs=18
- Handoff scriptiness: scope=returned_solution, scripted=3/4, trivial=2, sameEntryExit=3, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=11, dist=2, out=5, winOut=2, deadOut=3
- SCC path: s0@0 -> s1@1 -> s53@3 -> s54@4 -> s55@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 11 | 5 | 2 | 3 | 0 | 0 | s1 | no |
| s1 | 1 | 1 | 22 | 9 | 8 | 1 | 1 | 1 | s53 | no |
| s53 | 3 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | s54 | yes |
| s54 | 4 | 1 | 1 | 2 | 2 | 0 | 1 | 1 | s55 | no |
| s55 | 5 | 0 | 1 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 11 | yes | no | right | push_object:sticky#2, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_same_state_handoff |
| s1 | 1 | 3 | s53 | 22 | no | no | down | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s53 | 3 | 4 | s54 | 1 | yes | yes | right | pull_object:sticky#1, move_sticky_rigid | scripted_trivial_scc |
| s54 | 4 | 5 | s55 | 1 | yes | no | right | pull_object:sticky#1, move_sticky_rigid | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=482, regions=207, solution commitments=5
- Opening: commitments=5, viable=2, dead=3, optimal=1
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 2 | 3 | 1 | multiple viable choices |
| 1 | r1 | r2 | 4 | 3 | 1 | 2 | multiple optimal choices |
| 2 | r2 | r4 | 3 | 4 | 0 | 1 | forced optimal |
| 3 | r4 | r7 | 2 | 1 | 0 | 1 | forced optimal |
| 4 | r7 | r14 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 10 | 5 | 2 | 3 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 4 | 11 | 4 | 3 | 1 | 2 | 2 | r2 | no | no | no |
| r2 | 2 | 3 | 4 | 4 | 4 | 0 | 1 | 1 | r4 | no | no | yes |
| r4 | 3 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r7 | yes | yes | yes |
| r7 | 4 | 1 | 1 | 2 | 2 | 0 | 1 | 1 | r14 | no | no | yes |
| r14 | 5 | 0 | 1 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 5 | 2 | 3 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 4 | 4 | 3 | 1 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | push_object:sticky#2, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 2 | down | r2 | yes | 3 | 4 | 4 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | down | r4 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 4 | right | r7 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r14 | yes | yes | yes | yes | no | yes | pull_object:sticky#1, move_sticky_rigid |
| 5 | right | r14 | yes | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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

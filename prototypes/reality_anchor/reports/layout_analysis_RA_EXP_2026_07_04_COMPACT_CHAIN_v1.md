# Level Analysis: RA_EXP_2026_07_04_COMPACT_CHAIN_v1

## Summary

- Prototype: reality_anchor
- Title: Compact dual material chain v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#G.#MPL..#
#.@BSG.M.#
#..C.....#
##########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 365
- Inputs: down right right right up left left down left up down right right right right up down
- Events: walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: walk=9, push_object:crate#1=1, box_to_sticky:n1=1, push_object:sticky#2=3, move_sticky_rigid=3, push_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=3, sticky_merge:n1=1, pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1

Before:

```text
##########
#G.#MPL..#
#..BSG.M.#
#.@C.....#
##########
```

After:

```text
##########
#G.#MPL..#
#..BSG.M.#
#..@M....#
##########
```

### Step 3: right

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid

Before:

```text
##########
#G.#MPL..#
#..BSG.M.#
#..@M....#
##########
```

After:

```text
##########
#G.#MPL..#
#..BSG.M.#
#...@M...#
##########
```

### Step 4: right

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid

Before:

```text
##########
#G.#MPL..#
#..BSG.M.#
#...@M...#
##########
```

After:

```text
##########
#G.#MPL..#
#..BSG.M.#
#....@M..#
##########
```

### Step 6: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#G.#MPL..#
#..BS+.M.#
#.....M..#
##########
```

After:

```text
##########
#G.#MPL..#
#.BS@G.M.#
#.....M..#
##########
```

### Step 7: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#G.#MPL..#
#.BS@G.M.#
#.....M..#
##########
```

After:

```text
##########
#G.#MPL..#
#BS@.G.M.#
#.....M..#
##########
```

### Step 10: up

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#G.#MPL..#
#BS..G.M.#
#.@...M..#
##########
```

After:

```text
##########
#BS#MPL..#
#.@..G.M.#
#.....M..#
##########
```

### Step 15: right

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
##########
#BS#MPL..#
#....G.M.#
#....@M..#
##########
```

After:

```text
##########
#BS#MPL..#
#....G.M.#
#.....@M.#
##########
```

### Step 17: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#BS#MPL..#
#....G@M.#
#......M.#
##########
```

After:

```text
##########
#BS#M....#
#....PLM.#
#.....@M.#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 991
- Legal transitions: 2474
- Event-only illegal transitions: 0
- Winning states: 3
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 991
- Legal transitions: 2474
- Budget: maxStates=300000
- Compressed regions: 116
- Bidirectional transitions: 2274
- Commitment transitions: 193
- Winning regions: 3
- Initial region: r0, states=6, dist=8, internalBidirectional=14, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@2 -> r4@3 -> r6@4 -> r13@6 -> r18@7 -> r33@10 -> r39@15 -> r53@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=89, edges=132, winReachable=16, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=7, forcedWinPrefix=3/7, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=2/7, trivial=0, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=6, dist=7, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s33@2 -> s34@3 -> s35@4 -> s37@7 -> s39@10 -> s50@15 -> s51@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 7 | 6 | 2 | 1 | 1 | 0 | 0 | s33 | yes |
| s33 | 2 | 6 | 7 | 2 | 1 | 1 | 1 | 1 | s34 | yes |
| s34 | 3 | 5 | 8 | 2 | 1 | 1 | 1 | 1 | s35 | yes |
| s35 | 4 | 4 | 20 | 6 | 4 | 2 | 1 | 1 | s37 | no |
| s37 | 7 | 3 | 8 | 3 | 3 | 0 | 1 | 1 | s39 | no |
| s39 | 10 | 2 | 10 | 2 | 2 | 0 | 1 | 1 | s50 | no |
| s50 | 15 | 1 | 12 | 1 | 1 | 0 | 3 | 3 | s51 | yes |
| s51 | 17 | 0 | 1 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s33 | 6 | no | yes | right | push_object:crate#1, box_to_sticky:n1 | has_reposition_room |
| s33 | 2 | 3 | s34 | 7 | yes | yes | right | push_object:sticky#2, move_sticky_rigid | scripted_same_state_handoff |
| s34 | 3 | 4 | s35 | 8 | yes | yes | right | push_object:sticky#2, move_sticky_rigid | scripted_same_state_handoff |
| s35 | 4 | 7 | s37 | 20 | no | no | left | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s37 | 7 | 10 | s39 | 8 | no | no | up | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s39 | 10 | 15 | s50 | 10 | no | no | right | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |
| s50 | 15 | 17 | s51 | 12 | no | yes | down | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=991, regions=116, solution commitments=8
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=3/8, optimal prefix=3/8, forced viable commitments=4/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 3 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r2 | 8 | 1 | 1 | 1 | forced optimal |
| 2 | r2 | r4 | 7 | 1 | 1 | 1 | forced optimal |
| 3 | r4 | r6 | 6 | 1 | 1 | 1 | forced optimal |
| 5 | r6 | r13 | 5 | 3 | 1 | 2 | multiple optimal choices |
| 6 | r13 | r18 | 4 | 4 | 1 | 2 | multiple optimal choices |
| 9 | r18 | r33 | 3 | 3 | 0 | 2 | multiple optimal choices |
| 14 | r33 | r39 | 2 | 2 | 0 | 1 | forced optimal |
| 16 | r39 | r53 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 8 | 6 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 2 | 7 | 7 | 2 | 1 | 1 | 1 | 1 | r4 | no | yes | yes |
| r4 | 3 | 6 | 8 | 2 | 1 | 1 | 1 | 1 | r6 | no | yes | yes |
| r6 | 4 | 5 | 10 | 4 | 3 | 1 | 2 | 2 | r13 | no | no | no |
| r13 | 6 | 4 | 10 | 5 | 4 | 1 | 2 | 2 | r18 | no | no | no |
| r18 | 7 | 3 | 8 | 3 | 3 | 0 | 2 | 2 | r33 | no | no | no |
| r33 | 10 | 2 | 10 | 2 | 2 | 0 | 1 | 1 | r39 | no | no | yes |
| r39 | 15 | 1 | 12 | 1 | 1 | 0 | 1 | 1 | r53 | yes | yes | yes |
| r53 | 17 | 0 | 1 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 8 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 8 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r2 | yes | 7 | 2 | 1 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | push_object:crate#1, box_to_sticky:n1 |
| 3 | right | r4 | yes | 6 | 2 | 1 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | push_object:sticky#2, move_sticky_rigid |
| 4 | right | r6 | yes | 5 | 4 | 3 | 1 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, move_sticky_rigid |
| 5 | up | r6 | no | 5 | 4 | 3 | 1 | 2 | 2 | r13 | yes | yes | yes | yes | no | no | walk |
| 6 | left | r13 | yes | 4 | 5 | 4 | 1 | 2 | 2 | r18 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 7 | left | r18 | yes | 3 | 3 | 3 | 0 | 2 | 2 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 8 | down | r18 | no | 3 | 3 | 3 | 0 | 2 | 2 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r18 | no | 3 | 3 | 3 | 0 | 2 | 2 | r33 | yes | yes | yes | yes | no | no | walk |
| 10 | up | r33 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r33 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 11 | down | r33 | no | 2 | 2 | 2 | 0 | 1 | 1 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r33 | no | 2 | 2 | 2 | 0 | 1 | 1 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r33 | no | 2 | 2 | 2 | 0 | 1 | 1 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r33 | no | 2 | 2 | 2 | 0 | 1 | 1 | r39 | yes | yes | yes | yes | no | yes | walk |
| 15 | right | r39 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r39 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 16 | up | r39 | no | 1 | 1 | 1 | 0 | 1 | 1 | r53 | yes | yes | yes | yes | yes | yes | walk |
| 17 | down | r53 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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

# Level Analysis: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v1_no_mid_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v1_no_mid_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#PLB.C.#
#@MS..G#
#....#.#
#M.G..##
########
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 147
- Inputs: down right down right up right up right right down
- Events: walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#1 move_sticky_rigid walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1
- Event counts: walk=4, pull_object:sticky#2=1, move_sticky_rigid=3, pull_object:sticky#1=2, sticky_merge:n1=1, pull_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, force_chain:n2=1, pull_object:crate#1=1, box_to_sticky:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: down

- Legal: true
- Events: pull_object:sticky#2, move_sticky_rigid

Before:

```text
########
#PLB.C.#
#.MS..G#
#.@..#.#
#M.G..##
########
```

After:

```text
########
#PLB.C.#
#..S..G#
#.M..#.#
#M@G..##
########
```

### Step 4: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
########
#PLB.C.#
#..S..G#
#.M..#.#
#M@G..##
########
```

After:

```text
########
#PLB.C.#
#..S..G#
#.M..#.#
#.M+..##
########
```

### Step 6: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
########
#PLB.C.#
#..S..G#
#.M@.#.#
#.MG..##
########
```

After:

```text
########
#PLB.C.#
#..S..G#
#..M@#.#
#..m..##
########
```

### Step 8: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
########
#PLB.C.#
#..S@.G#
#..M.#.#
#..m..##
########
```

After:

```text
########
#PL.BC.#
#...S@G#
#..M.#.#
#..m..##
########
```

### Step 9: right

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
########
#PL.BC.#
#...S@G#
#..M.#.#
#..m..##
########
```

After:

```text
########
#PL..BC#
#....S+#
#..M.#.#
#..m..##
########
```

### Step 10: down

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1

Before:

```text
########
#PL..BC#
#....S+#
#..M.#.#
#..m..##
########
```

After:

```text
########
#PL..B.#
#....Sm#
#..M.#@#
#..m..##
########
```


## Graph Facts

- Status: complete
- Reachable states: 482
- Legal transitions: 866
- Event-only illegal transitions: 0
- Winning states: 3
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
- Winning regions: 3
- Initial region: r0, states=10, dist=6, internalBidirectional=18, commitments=5, viableCommitments=3, deadCommitments=2, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r3@3 -> r5@4 -> r10@5 -> r11@6 -> r49@8 -> r69@9 -> r87@10
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=172, edges=226, winReachable=26, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=7, forcedWinPrefix=0/7, branchingWinSccs=4, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=5/7, trivial=5, sameEntryExit=5, forcedScripted=4, maxRun=3
- Initial SCC: s0, states=11, dist=4, out=5, winOut=3, deadOut=2
- SCC path: s0@0 -> s162@3 -> s163@4 -> s164@5 -> s165@6 -> s167@8 -> s168@9 -> s169@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 11 | 5 | 3 | 2 | 0 | 0 | s162 | no |
| s162 | 3 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | s163 | yes |
| s163 | 4 | 4 | 1 | 2 | 2 | 0 | 1 | 1 | s164 | no |
| s164 | 5 | 4 | 1 | 2 | 1 | 1 | 1 | 1 | s165 | yes |
| s165 | 6 | 3 | 4 | 2 | 1 | 1 | 3 | 3 | s167 | yes |
| s167 | 8 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | s168 | yes |
| s168 | 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s169 | yes |
| s169 | 10 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s162 | 11 | no | no | down | pull_object:sticky#2, move_sticky_rigid | has_reposition_room |
| s162 | 3 | 4 | s163 | 1 | yes | yes | right | pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1 | scripted_trivial_scc |
| s163 | 4 | 5 | s164 | 1 | yes | no | up | walk | scripted_trivial_scc |
| s164 | 5 | 6 | s165 | 1 | yes | yes | right | pull_object:sticky#1, move_sticky_rigid | scripted_trivial_scc |
| s165 | 6 | 8 | s167 | 4 | no | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s167 | 8 | 9 | s168 | 1 | yes | yes | right | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s168 | 9 | 10 | s169 | 1 | yes | yes | down | pull_object:crate#1, box_to_sticky:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=482, regions=207, solution commitments=7
- Opening: commitments=5, viable=3, dead=2, optimal=2
- Win-continuation prefix: viable prefix=0/7, optimal prefix=0/7, forced viable commitments=5/7
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r3 | 6 | 3 | 2 | 2 | multiple optimal choices |
| 3 | r3 | r5 | 5 | 1 | 0 | 1 | forced optimal |
| 4 | r5 | r10 | 4 | 2 | 0 | 1 | multiple viable choices |
| 5 | r10 | r11 | 4 | 1 | 1 | 1 | forced optimal |
| 7 | r11 | r49 | 3 | 1 | 1 | 1 | forced optimal |
| 8 | r49 | r69 | 2 | 1 | 0 | 1 | forced optimal |
| 9 | r69 | r87 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 10 | 5 | 3 | 2 | 2 | 2 | r3 | no | no | no |
| r3 | 3 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 4 | 4 | 1 | 2 | 2 | 0 | 1 | 1 | r10 | no | no | no |
| r10 | 5 | 4 | 1 | 2 | 1 | 1 | 1 | 1 | r11 | no | yes | yes |
| r11 | 6 | 3 | 4 | 2 | 1 | 1 | 1 | 1 | r49 | no | yes | yes |
| r49 | 8 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r69 | yes | yes | yes |
| r69 | 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r87 | yes | yes | yes |
| r87 | 10 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 6 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 6 | 5 | 3 | 2 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 3 | down | r3 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | pull_object:sticky#2, move_sticky_rigid |
| 4 | right | r5 | yes | 4 | 2 | 2 | 0 | 1 | 1 | r10 | yes | yes | no | no | no | no | pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |
| 5 | up | r10 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r11 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r11 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |
| 7 | up | r11 | no | 3 | 2 | 1 | 1 | 1 | 1 | r49 | yes | yes | yes | yes | yes | yes | walk |
| 8 | right | r49 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r69 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 9 | right | r69 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r87 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky |
| 10 | down | r87 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1, box_to_sticky:n1 |

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

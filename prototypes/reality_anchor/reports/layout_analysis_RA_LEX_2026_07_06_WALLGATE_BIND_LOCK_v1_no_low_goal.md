# Level Analysis: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v1_no_low_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v1_no_low_goal
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
#.G..#.#
#M....##
########
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 426
- Inputs: right down left up down right right down left up up right left down down right right up up right right down
- Events: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1
- Event counts: push_object:sticky#2=1, force_chain:n2=2, anchor_boundary_shift:box_sticky=4, move_sticky_rigid=4, pull_object:push_pull_anchor=3, anchor_boundary_shift:push_pull=4, walk=10, push_object:push_pull_anchor=1, pull_object:sticky#2=1, pull_object:box_sticky_anchor=3, pull_object:sticky#1=2, sticky_merge:n1=1, pull_object:crate#1=1, box_to_sticky:n1=1

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
#@MS..G#
#.G..#.#
#M....##
########
```

After:

```text
########
#PL.BC.#
#.@MS.G#
#.G..#.#
#M....##
########
```

### Step 2: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
#PL.BC.#
#.@MS.G#
#.G..#.#
#M....##
########
```

After:

```text
########
#...BC.#
#PLMS.G#
#.+..#.#
#M....##
########
```

### Step 4: up

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
#...BC.#
#PLMS.G#
#@G..#.#
#M....##
########
```

After:

```text
########
#PL.BC.#
#@.MS.G#
#.G..#.#
#M....##
########
```

### Step 8: down

- Legal: true
- Events: pull_object:sticky#2, move_sticky_rigid

Before:

```text
########
#PL.BC.#
#..MS.G#
#.G@.#.#
#M....##
########
```

After:

```text
########
#PL.BC.#
#...S.G#
#.GM.#.#
#M.@..##
########
```

### Step 13: left

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
########
#PL.BC.#
#..@S.G#
#.GM.#.#
#M....##
########
```

After:

```text
########
#PLB.C.#
#.@S..G#
#.GM.#.#
#M....##
########
```

### Step 14: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
#PLB.C.#
#.@S..G#
#.GM.#.#
#M....##
########
```

After:

```text
########
#..B.C.#
#PLS..G#
#.+M.#.#
#M....##
########
```

### Step 15: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
#..B.C.#
#PLS..G#
#.+M.#.#
#M....##
########
```

After:

```text
########
#..B.C.#
#..S..G#
#PLM.#.#
#M@...##
########
```

### Step 16: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
########
#..B.C.#
#..S..G#
#PLM.#.#
#M@...##
########
```

After:

```text
########
#..B.C.#
#..S..G#
#PLM.#.#
#.M@..##
########
```

### Step 17: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
########
#..B.C.#
#..S..G#
#PLM.#.#
#.M@..##
########
```

After:

```text
########
#..B.C.#
#..S..G#
#PLM.#.#
#..M@.##
########
```

### Step 20: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
########
#..B.C.#
#..S@.G#
#PLM.#.#
#..M..##
########
```

After:

```text
########
#...BC.#
#...S@G#
#PLM.#.#
#..M..##
########
```

### Step 21: right

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
########
#...BC.#
#...S@G#
#PLM.#.#
#..M..##
########
```

After:

```text
########
#....BC#
#....S+#
#PLM.#.#
#..M..##
########
```

### Step 22: down

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1

Before:

```text
########
#....BC#
#....S+#
#PLM.#.#
#..M..##
########
```

After:

```text
########
#....B.#
#....Sm#
#PLM.#@#
#..M..##
########
```


## Graph Facts

- Status: complete
- Reachable states: 482
- Legal transitions: 866
- Event-only illegal transitions: 0
- Winning states: 1
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
- Winning regions: 1
- Initial region: r0, states=10, dist=15, internalBidirectional=18, commitments=5, viableCommitments=2, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r8@4 -> r60@8 -> r61@9 -> r111@11 -> r126@12 -> r139@13 -> r151@14 -> r159@15 -> r164@16 -> r173@17 -> r190@20 -> r192@21 -> r194@22
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 15

### SCC Irreversible Progress

- Shape: sccs=172, edges=226, winReachable=14, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=11, forcedWinPrefix=1/11, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=7/11, trivial=5, sameEntryExit=7, forcedScripted=7, maxRun=2
- Initial SCC: s0, states=11, dist=11, out=5, winOut=1, deadOut=4
- SCC path: s0@0 -> s1@1 -> s17@8 -> s18@9 -> s19@12 -> s20@13 -> s22@15 -> s23@16 -> s24@17 -> s26@20 -> s27@21 -> s28@22

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 11 | 11 | 5 | 1 | 4 | 0 | 0 | s1 | yes |
| s1 | 1 | 10 | 22 | 9 | 2 | 7 | 1 | 1 | s17 | no |
| s17 | 8 | 9 | 3 | 2 | 1 | 1 | 1 | 1 | s18 | yes |
| s18 | 9 | 8 | 10 | 4 | 1 | 3 | 2 | 2 | s19 | yes |
| s19 | 12 | 7 | 1 | 2 | 1 | 1 | 1 | 1 | s20 | yes |
| s20 | 13 | 6 | 7 | 3 | 1 | 2 | 1 | 1 | s22 | yes |
| s22 | 15 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | s23 | yes |
| s23 | 16 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | s24 | yes |
| s24 | 17 | 3 | 4 | 2 | 1 | 1 | 1 | 1 | s26 | yes |
| s26 | 20 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | s27 | yes |
| s27 | 21 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s28 | yes |
| s28 | 22 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 11 | yes | yes | right | push_object:sticky#2, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_same_state_handoff |
| s1 | 1 | 8 | s17 | 22 | no | no | down | pull_object:sticky#2, move_sticky_rigid | has_reposition_room |
| s17 | 8 | 9 | s18 | 3 | yes | yes | left | walk | scripted_same_state_handoff |
| s18 | 9 | 12 | s19 | 10 | no | yes | right | walk | has_reposition_room |
| s19 | 12 | 13 | s20 | 1 | yes | yes | left | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s20 | 13 | 15 | s22 | 7 | no | yes | down | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s22 | 15 | 16 | s23 | 1 | yes | yes | right | pull_object:sticky#1, move_sticky_rigid | scripted_trivial_scc |
| s23 | 16 | 17 | s24 | 1 | yes | yes | right | pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1 | scripted_trivial_scc |
| s24 | 17 | 20 | s26 | 4 | no | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s26 | 20 | 21 | s27 | 1 | yes | yes | right | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s27 | 21 | 22 | s28 | 1 | yes | yes | down | pull_object:crate#1, box_to_sticky:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=482, regions=207, solution commitments=15
- Opening: commitments=5, viable=2, dead=3, optimal=1
- Win-continuation prefix: viable prefix=0/15, optimal prefix=15/15, forced viable commitments=9/15
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 15 | 2 | 3 | 1 | forced optimal |
| 1 | r1 | r2 | 14 | 2 | 2 | 1 | forced optimal |
| 3 | r2 | r8 | 13 | 2 | 2 | 1 | forced optimal |
| 7 | r8 | r60 | 12 | 2 | 2 | 1 | forced optimal |
| 8 | r60 | r61 | 11 | 1 | 1 | 1 | forced optimal |
| 10 | r61 | r111 | 10 | 1 | 2 | 1 | forced optimal |
| 11 | r111 | r126 | 9 | 3 | 0 | 1 | forced optimal |
| 12 | r126 | r139 | 8 | 1 | 1 | 1 | forced optimal |
| 13 | r139 | r151 | 7 | 1 | 0 | 1 | forced optimal |
| 14 | r151 | r159 | 6 | 2 | 0 | 1 | forced optimal |
| 15 | r159 | r164 | 5 | 1 | 0 | 1 | forced optimal |
| 16 | r164 | r173 | 4 | 1 | 0 | 1 | forced optimal |
| 19 | r173 | r190 | 3 | 1 | 1 | 1 | forced optimal |
| 20 | r190 | r192 | 2 | 1 | 0 | 1 | forced optimal |
| 21 | r192 | r194 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 15 | 10 | 5 | 2 | 3 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 14 | 11 | 4 | 2 | 2 | 1 | 1 | r2 | no | no | yes |
| r2 | 2 | 13 | 4 | 4 | 2 | 2 | 1 | 1 | r8 | no | no | yes |
| r8 | 4 | 12 | 6 | 4 | 2 | 2 | 1 | 1 | r60 | no | no | yes |
| r60 | 8 | 11 | 3 | 2 | 1 | 1 | 1 | 1 | r61 | no | yes | yes |
| r61 | 9 | 10 | 5 | 3 | 1 | 2 | 1 | 1 | r111 | no | yes | yes |
| r111 | 11 | 9 | 3 | 3 | 3 | 0 | 1 | 1 | r126 | no | no | yes |
| r126 | 12 | 8 | 1 | 2 | 1 | 1 | 1 | 1 | r139 | no | yes | yes |
| r139 | 13 | 7 | 1 | 1 | 1 | 0 | 1 | 1 | r151 | yes | yes | yes |
| r151 | 14 | 6 | 2 | 2 | 2 | 0 | 1 | 1 | r159 | no | no | yes |
| r159 | 15 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | r164 | yes | yes | yes |
| r164 | 16 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r173 | yes | yes | yes |
| r173 | 17 | 3 | 4 | 2 | 1 | 1 | 1 | 1 | r190 | no | yes | yes |
| r190 | 20 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r192 | yes | yes | yes |
| r192 | 21 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r194 | yes | yes | yes |
| r194 | 22 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 15 | 5 | 2 | 3 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 14 | 4 | 2 | 2 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:sticky#2, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 2 | down | r2 | yes | 13 | 4 | 2 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | left | r2 | no | 13 | 4 | 2 | 2 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | walk |
| 4 | up | r8 | yes | 12 | 4 | 2 | 2 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 5 | down | r8 | no | 12 | 4 | 2 | 2 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r8 | no | 12 | 4 | 2 | 2 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r8 | no | 12 | 4 | 2 | 2 | 1 | 1 | r60 | yes | yes | yes | yes | no | yes | walk |
| 8 | down | r60 | yes | 11 | 2 | 1 | 1 | 1 | 1 | r61 | yes | yes | yes | yes | yes | yes | pull_object:sticky#2, move_sticky_rigid |
| 9 | left | r61 | yes | 10 | 3 | 1 | 2 | 1 | 1 | r61 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r61 | no | 10 | 3 | 1 | 2 | 1 | 1 | r111 | yes | yes | yes | yes | yes | yes | walk |
| 11 | up | r111 | yes | 9 | 3 | 3 | 0 | 1 | 1 | r126 | yes | yes | yes | yes | no | yes | walk |
| 12 | right | r126 | yes | 8 | 2 | 1 | 1 | 1 | 1 | r139 | yes | yes | yes | yes | yes | yes | walk |
| 13 | left | r139 | yes | 7 | 1 | 1 | 0 | 1 | 1 | r151 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 14 | down | r151 | yes | 6 | 2 | 2 | 0 | 1 | 1 | r159 | yes | yes | yes | yes | no | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 15 | down | r159 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r164 | yes | yes | yes | yes | yes | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 16 | right | r164 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r173 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, move_sticky_rigid |
| 17 | right | r173 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r173 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |
| 18 | up | r173 | no | 3 | 2 | 1 | 1 | 1 | 1 | r173 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r173 | no | 3 | 2 | 1 | 1 | 1 | 1 | r190 | yes | yes | yes | yes | yes | yes | walk |
| 20 | right | r190 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r192 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 21 | right | r192 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r194 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky |
| 22 | down | r194 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1, box_to_sticky:n1 |

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

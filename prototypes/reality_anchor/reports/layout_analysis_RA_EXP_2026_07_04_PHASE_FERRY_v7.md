# Level Analysis: RA_EXP_2026_07_04_PHASE_FERRY_v7

## Summary

- Prototype: reality_anchor
- Title: Phase ferry v7
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#..#..G#
##GMLP.#
#.BS.M.#
#...@.##
########
```

## Shortest Solution

- Found: yes
- Cost: 26
- Depth: 26
- Explored states: 1007
- Inputs: right up right up left left down right right up up left down left right right down left left left up right right down right up
- Events: walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk pull_object:crate#2 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid
- Event counts: walk=13, push_object:sticky#2=2, force_chain:n2=2, anchor_boundary_shift:push_pull=6, move_sticky_rigid=6, sticky_merge:n1=1, push_object:sticky#1=4, sticky_to_box:n1=2, pull_object:push_pull_anchor=1, pull_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=2, push_object:push_pull_anchor=4, pull_object:crate#2=1, box_to_sticky:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: up

- Legal: true
- Events: push_object:sticky#2, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid

Before:

```text
########
#..#..G#
##GMLP.#
#.BS.M.#
#....@##
########
```

After:

```text
########
#..#LPG#
##GM.M.#
#.BS.@.#
#.....##
########
```

### Step 5: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
########
#..#LPG#
##GM.M@#
#.BS...#
#.....##
########
```

After:

```text
########
#..#LPG#
##GMM@.#
#.BS...#
#.....##
########
```

### Step 6: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
########
#..#LPG#
##GMM@.#
#.BS...#
#.....##
########
```

After:

```text
########
#..#LPG#
##*M@..#
#.BS...#
#.....##
########
```

### Step 7: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
#..#LPG#
##*M@..#
#.BS...#
#.....##
########
```

After:

```text
########
#..#..G#
##*MLP.#
#.BS@..#
#.....##
########
```

### Step 8: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
########
#..#..G#
##*MLP.#
#.BS@..#
#.....##
########
```

After:

```text
########
#..#..G#
##*CLP.#
#..BS@.#
#.....##
########
```

### Step 13: down

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky

Before:

```text
########
#..#.@G#
##*CLP.#
#..BS..#
#.....##
########
```

After:

```text
########
#..#..G#
##*C.@.#
#...LP.#
#..BS.##
########
```

### Step 15: right

- Legal: true
- Events: pull_object:crate#2, box_to_sticky:n1

Before:

```text
########
#..#..G#
##*C@..#
#...LP.#
#..BS.##
########
```

After:

```text
########
#..#..G#
##*.M@.#
#...LP.#
#..BS.##
########
```

### Step 18: left

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
#..#..G#
##*.M..#
#...LP@#
#..BS.##
########
```

After:

```text
########
#..#..G#
##*.M..#
#..LP@.#
#..BS.##
########
```

### Step 19: left

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
#..#..G#
##*.M..#
#..LP@.#
#..BS.##
########
```

After:

```text
########
#..#..G#
##*.M..#
#.LP@..#
#..BS.##
########
```

### Step 20: left

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
#..#..G#
##*.M..#
#.LP@..#
#..BS.##
########
```

After:

```text
########
#..#..G#
##*.M..#
#LP@...#
#..BS.##
########
```

### Step 22: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
#..#..G#
##*@M..#
#LP....#
#..BS.##
########
```

After:

```text
########
#..#..G#
##*.@M.#
#LP....#
#..BS.##
########
```

### Step 23: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
#..#..G#
##*.@M.#
#LP....#
#..BS.##
########
```

After:

```text
########
#..#..G#
##*..@M#
#LP....#
#..BS.##
########
```

### Step 26: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
#..#..G#
##*...M#
#LP...@#
#..BS.##
########
```

After:

```text
########
#..#..m#
##*...@#
#LP....#
#..BS.##
########
```


## Graph Facts

- Status: complete
- Reachable states: 13472
- Legal transitions: 33017
- Event-only illegal transitions: 0
- Winning states: 125
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 13472
- Legal transitions: 33017
- Budget: maxStates=300000
- Compressed regions: 1837
- Bidirectional transitions: 29082
- Commitment transitions: 3760
- Winning regions: 10
- Initial region: r0, states=6, dist=12, internalBidirectional=10, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@2 -> r8@5 -> r9@6 -> r11@7 -> r21@13 -> r24@14 -> r53@18 -> r65@19 -> r74@20 -> r90@22 -> r101@23 -> r157@26
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 10

### SCC Irreversible Progress

- Shape: sccs=1123, edges=1989, winReachable=80, winning=10, winSubgraph=branching_win_dag
- Solution irreversible path: steps=7, forcedWinPrefix=2/7, branchingWinSccs=39, mergingWinSccs=40
- Handoff scriptiness: scope=returned_solution, scripted=2/7, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=2
- Initial SCC: s0, states=6, dist=6, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@2 -> s2@5 -> s742@18 -> s743@19 -> s745@20 -> s746@23 -> s748@26

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 6 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 2 | 5 | 25 | 2 | 1 | 1 | 1 | 1 | s2 | yes |
| s2 | 5 | 4 | 3932 | 336 | 15 | 321 | 1 | 1 | s742 | no |
| s742 | 18 | 4 | 8 | 3 | 2 | 1 | 1 | 1 | s743 | no |
| s743 | 19 | 3 | 9 | 5 | 3 | 2 | 1 | 1 | s745 | no |
| s745 | 20 | 2 | 22 | 6 | 4 | 2 | 1 | 1 | s746 | no |
| s746 | 23 | 1 | 11 | 3 | 2 | 1 | 1 | 1 | s748 | no |
| s748 | 26 | 0 | 11 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 6 | no | yes | up | push_object:sticky#2, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid | has_reposition_room |
| s1 | 2 | 5 | s2 | 25 | no | yes | left | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |
| s2 | 5 | 18 | s742 | 3932 | no | no | left | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s742 | 18 | 19 | s743 | 8 | yes | no | left | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s743 | 19 | 20 | s745 | 9 | yes | no | left | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s745 | 20 | 23 | s746 | 22 | no | no | right | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s746 | 23 | 26 | s748 | 11 | no | no | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=13472, regions=1837, solution commitments=12
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/12, optimal prefix=10/12, forced viable commitments=2/12
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r3 | 12 | 1 | 1 | 1 | forced optimal |
| 4 | r3 | r8 | 11 | 2 | 1 | 1 | forced optimal |
| 5 | r8 | r9 | 10 | 2 | 0 | 1 | forced optimal |
| 6 | r9 | r11 | 9 | 2 | 0 | 1 | forced optimal |
| 12 | r11 | r21 | 8 | 4 | 0 | 1 | forced optimal |
| 13 | r21 | r24 | 7 | 1 | 1 | 1 | forced optimal |
| 17 | r24 | r53 | 6 | 2 | 0 | 1 | forced optimal |
| 18 | r53 | r65 | 5 | 2 | 1 | 1 | forced optimal |
| 19 | r65 | r74 | 4 | 3 | 2 | 1 | forced optimal |
| 21 | r74 | r90 | 3 | 3 | 2 | 1 | forced optimal |
| 22 | r90 | r101 | 2 | 5 | 0 | 2 | multiple optimal choices |
| 25 | r101 | r157 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 12 | 6 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 2 | 11 | 25 | 3 | 2 | 1 | 1 | 1 | r8 | no | no | yes |
| r8 | 5 | 10 | 11 | 2 | 2 | 0 | 1 | 1 | r9 | no | no | yes |
| r9 | 6 | 9 | 12 | 2 | 2 | 0 | 1 | 1 | r11 | no | no | yes |
| r11 | 7 | 8 | 13 | 4 | 4 | 0 | 1 | 1 | r21 | no | no | yes |
| r21 | 13 | 7 | 6 | 2 | 1 | 1 | 1 | 1 | r24 | no | yes | yes |
| r24 | 14 | 6 | 7 | 2 | 2 | 0 | 1 | 1 | r53 | no | no | yes |
| r53 | 18 | 5 | 8 | 3 | 2 | 1 | 1 | 1 | r65 | no | no | yes |
| r65 | 19 | 4 | 9 | 5 | 3 | 2 | 1 | 1 | r74 | no | no | yes |
| r74 | 20 | 3 | 11 | 5 | 3 | 2 | 1 | 1 | r90 | no | no | yes |
| r90 | 22 | 2 | 11 | 5 | 5 | 0 | 2 | 2 | r101 | no | no | no |
| r101 | 23 | 1 | 11 | 3 | 2 | 1 | 1 | 1 | r157 | no | no | yes |
| r157 | 26 | 0 | 11 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 12 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 12 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 2 | up | r3 | yes | 11 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid |
| 3 | right | r3 | no | 11 | 3 | 2 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r3 | no | 11 | 3 | 2 | 1 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | walk |
| 5 | left | r8 | yes | 10 | 2 | 2 | 0 | 1 | 1 | r9 | yes | yes | yes | yes | no | yes | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 6 | left | r9 | yes | 9 | 2 | 2 | 0 | 1 | 1 | r11 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 7 | down | r11 | yes | 8 | 4 | 4 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | right | r11 | no | 8 | 4 | 4 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 9 | right | r11 | no | 8 | 4 | 4 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r11 | no | 8 | 4 | 4 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r11 | no | 8 | 4 | 4 | 0 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r11 | no | 8 | 4 | 4 | 0 | 1 | 1 | r21 | yes | yes | yes | yes | no | yes | walk |
| 13 | down | r21 | yes | 7 | 2 | 1 | 1 | 1 | 1 | r24 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky |
| 14 | left | r24 | yes | 6 | 2 | 2 | 0 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r24 | no | 6 | 2 | 2 | 0 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2, box_to_sticky:n1 |
| 16 | right | r24 | no | 6 | 2 | 2 | 0 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r24 | no | 6 | 2 | 2 | 0 | 1 | 1 | r53 | yes | yes | yes | yes | no | yes | walk |
| 18 | left | r53 | yes | 5 | 3 | 2 | 1 | 1 | 1 | r65 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 19 | left | r65 | yes | 4 | 5 | 3 | 2 | 1 | 1 | r74 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 20 | left | r74 | yes | 3 | 5 | 3 | 2 | 1 | 1 | r74 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 21 | up | r74 | no | 3 | 5 | 3 | 2 | 1 | 1 | r90 | yes | yes | yes | yes | no | yes | walk |
| 22 | right | r90 | yes | 2 | 5 | 5 | 0 | 2 | 2 | r101 | yes | yes | yes | yes | no | no | push_object:sticky#1, move_sticky_rigid |
| 23 | right | r101 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r101 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 24 | down | r101 | no | 1 | 3 | 2 | 1 | 1 | 1 | r101 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r101 | no | 1 | 3 | 2 | 1 | 1 | 1 | r157 | yes | yes | yes | yes | no | yes | walk |
| 26 | up | r157 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

# Level Analysis: RA_EXP_2026_07_04_PHASE_FERRY_v6

## Summary

- Prototype: reality_anchor
- Title: Phase ferry v6
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
#C..@.##
########
```

## Shortest Solution

- Found: yes
- Cost: 26
- Depth: 26
- Explored states: 1219
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
#C...@##
########
```

After:

```text
########
#..#LPG#
##GM.M.#
#.BS.@.#
#C....##
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
#C....##
########
```

After:

```text
########
#..#LPG#
##GMM@.#
#.BS...#
#C....##
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
#C....##
########
```

After:

```text
########
#..#LPG#
##*M@..#
#.BS...#
#C....##
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
#C....##
########
```

After:

```text
########
#..#..G#
##*MLP.#
#.BS@..#
#C....##
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
#C....##
########
```

After:

```text
########
#..#..G#
##*CLP.#
#..BS@.#
#C....##
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
#C....##
########
```

After:

```text
########
#..#..G#
##*C.@.#
#...LP.#
#C.BS.##
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
#C.BS.##
########
```

After:

```text
########
#..#..G#
##*.M@.#
#...LP.#
#C.BS.##
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
#C.BS.##
########
```

After:

```text
########
#..#..G#
##*.M..#
#..LP@.#
#C.BS.##
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
#C.BS.##
########
```

After:

```text
########
#..#..G#
##*.M..#
#.LP@..#
#C.BS.##
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
#C.BS.##
########
```

After:

```text
########
#..#..G#
##*.M..#
#LP@...#
#C.BS.##
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
#C.BS.##
########
```

After:

```text
########
#..#..G#
##*.@M.#
#LP....#
#C.BS.##
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
#C.BS.##
########
```

After:

```text
########
#..#..G#
##*..@M#
#LP....#
#C.BS.##
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
#C.BS.##
########
```

After:

```text
########
#..#..m#
##*...@#
#LP....#
#C.BS.##
########
```


## Graph Facts

- Status: complete
- Reachable states: 5376
- Legal transitions: 12762
- Event-only illegal transitions: 0
- Winning states: 46
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5376
- Legal transitions: 12762
- Budget: maxStates=300000
- Compressed regions: 882
- Bidirectional transitions: 11020
- Commitment transitions: 1664
- Winning regions: 4
- Initial region: r0, states=3, dist=12, internalBidirectional=4, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r4@2 -> r11@5 -> r15@6 -> r19@7 -> r52@13 -> r65@14 -> r117@18 -> r133@19 -> r149@20 -> r182@22 -> r204@23 -> r275@26
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 10

### SCC Irreversible Progress

- Shape: sccs=599, edges=988, winReachable=37, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=8, forcedWinPrefix=1/8, branchingWinSccs=16, mergingWinSccs=12
- Handoff scriptiness: scope=returned_solution, scripted=3/8, trivial=0, sameEntryExit=3, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=3, dist=7, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s1@2 -> s2@5 -> s7@6 -> s275@18 -> s276@19 -> s278@20 -> s279@23 -> s281@26

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 7 | 3 | 3 | 1 | 2 | 0 | 0 | s1 | yes |
| s1 | 2 | 6 | 15 | 5 | 2 | 3 | 1 | 1 | s2 | no |
| s2 | 5 | 6 | 8 | 2 | 1 | 1 | 1 | 1 | s7 | yes |
| s7 | 6 | 5 | 1053 | 129 | 5 | 124 | 2 | 2 | s275 | no |
| s275 | 18 | 4 | 8 | 3 | 2 | 1 | 1 | 1 | s276 | no |
| s276 | 19 | 3 | 9 | 5 | 3 | 2 | 1 | 1 | s278 | no |
| s278 | 20 | 2 | 22 | 6 | 4 | 2 | 1 | 1 | s279 | no |
| s279 | 23 | 1 | 11 | 3 | 2 | 1 | 1 | 1 | s281 | no |
| s281 | 26 | 0 | 11 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 3 | no | yes | up | push_object:sticky#2, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid | has_reposition_room |
| s1 | 2 | 5 | s2 | 15 | no | no | left | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |
| s2 | 5 | 6 | s7 | 8 | yes | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | scripted_same_state_handoff |
| s7 | 6 | 18 | s275 | 1053 | no | no | left | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s275 | 18 | 19 | s276 | 8 | yes | no | left | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s276 | 19 | 20 | s278 | 9 | yes | no | left | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s278 | 20 | 23 | s279 | 22 | no | no | right | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s279 | 23 | 26 | s281 | 11 | no | no | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=5376, regions=882, solution commitments=12
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=1/12, optimal prefix=10/12, forced viable commitments=2/12
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r4 | 12 | 1 | 2 | 1 | forced optimal |
| 4 | r4 | r11 | 11 | 2 | 3 | 1 | forced optimal |
| 5 | r11 | r15 | 10 | 2 | 1 | 1 | forced optimal |
| 6 | r15 | r19 | 9 | 2 | 1 | 1 | forced optimal |
| 12 | r19 | r52 | 8 | 3 | 1 | 1 | forced optimal |
| 13 | r52 | r65 | 7 | 1 | 1 | 1 | forced optimal |
| 17 | r65 | r117 | 6 | 2 | 0 | 1 | forced optimal |
| 18 | r117 | r133 | 5 | 2 | 1 | 1 | forced optimal |
| 19 | r133 | r149 | 4 | 3 | 2 | 1 | forced optimal |
| 21 | r149 | r182 | 3 | 3 | 2 | 1 | forced optimal |
| 22 | r182 | r204 | 2 | 5 | 0 | 2 | multiple optimal choices |
| 25 | r204 | r275 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 12 | 3 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 2 | 11 | 15 | 5 | 2 | 3 | 1 | 1 | r11 | no | no | yes |
| r11 | 5 | 10 | 8 | 3 | 2 | 1 | 1 | 1 | r15 | no | no | yes |
| r15 | 6 | 9 | 9 | 3 | 2 | 1 | 1 | 1 | r19 | no | no | yes |
| r19 | 7 | 8 | 10 | 4 | 3 | 1 | 1 | 1 | r52 | no | no | yes |
| r52 | 13 | 7 | 6 | 2 | 1 | 1 | 1 | 1 | r65 | no | yes | yes |
| r65 | 14 | 6 | 7 | 2 | 2 | 0 | 1 | 1 | r117 | no | no | yes |
| r117 | 18 | 5 | 8 | 3 | 2 | 1 | 1 | 1 | r133 | no | no | yes |
| r133 | 19 | 4 | 9 | 5 | 3 | 2 | 1 | 1 | r149 | no | no | yes |
| r149 | 20 | 3 | 11 | 5 | 3 | 2 | 1 | 1 | r182 | no | no | yes |
| r182 | 22 | 2 | 11 | 5 | 5 | 0 | 2 | 2 | r204 | no | no | no |
| r204 | 23 | 1 | 11 | 3 | 2 | 1 | 1 | 1 | r275 | no | no | yes |
| r275 | 26 | 0 | 11 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 12 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 12 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 2 | up | r4 | yes | 11 | 5 | 2 | 3 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid |
| 3 | right | r4 | no | 11 | 5 | 2 | 3 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r4 | no | 11 | 5 | 2 | 3 | 1 | 1 | r11 | yes | yes | yes | yes | no | yes | walk |
| 5 | left | r11 | yes | 10 | 3 | 2 | 1 | 1 | 1 | r15 | yes | yes | yes | yes | no | yes | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 6 | left | r15 | yes | 9 | 3 | 2 | 1 | 1 | 1 | r19 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 7 | down | r19 | yes | 8 | 4 | 3 | 1 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | right | r19 | no | 8 | 4 | 3 | 1 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 9 | right | r19 | no | 8 | 4 | 3 | 1 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r19 | no | 8 | 4 | 3 | 1 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r19 | no | 8 | 4 | 3 | 1 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r19 | no | 8 | 4 | 3 | 1 | 1 | 1 | r52 | yes | yes | yes | yes | no | yes | walk |
| 13 | down | r52 | yes | 7 | 2 | 1 | 1 | 1 | 1 | r65 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky |
| 14 | left | r65 | yes | 6 | 2 | 2 | 0 | 1 | 1 | r65 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r65 | no | 6 | 2 | 2 | 0 | 1 | 1 | r65 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2, box_to_sticky:n1 |
| 16 | right | r65 | no | 6 | 2 | 2 | 0 | 1 | 1 | r65 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r65 | no | 6 | 2 | 2 | 0 | 1 | 1 | r117 | yes | yes | yes | yes | no | yes | walk |
| 18 | left | r117 | yes | 5 | 3 | 2 | 1 | 1 | 1 | r133 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 19 | left | r133 | yes | 4 | 5 | 3 | 2 | 1 | 1 | r149 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 20 | left | r149 | yes | 3 | 5 | 3 | 2 | 1 | 1 | r149 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 21 | up | r149 | no | 3 | 5 | 3 | 2 | 1 | 1 | r182 | yes | yes | yes | yes | no | yes | walk |
| 22 | right | r182 | yes | 2 | 5 | 5 | 0 | 2 | 2 | r204 | yes | yes | yes | yes | no | no | push_object:sticky#1, move_sticky_rigid |
| 23 | right | r204 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 24 | down | r204 | no | 1 | 3 | 2 | 1 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r204 | no | 1 | 3 | 2 | 1 | 1 | 1 | r275 | yes | yes | yes | yes | no | yes | walk |
| 26 | up | r275 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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

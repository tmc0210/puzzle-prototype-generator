# Level Analysis: RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_LAYOUT

## Summary

- Prototype: reality_anchor
- Title: Soft handoff no-merge lock v1 layout
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
####C@.G#
###G....#
####PL.M#
####..BS#
#########
```

## Shortest Solution

- Found: yes
- Cost: 40
- Depth: 40
- Explored states: 1747
- Inputs: down up right right down left down left left up right left down right down left up up right right right up left right down left left left up right down left down down right up right up left left
- Events: walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 pull_object:crate#1 walk walk pull_object:crate#1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 walk push_object:crate#2 pull_object:crate#1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#1 push_object:crate#2 box_to_sticky:n1 walk push_object:crate#1 push_object:crate#1
- Event counts: walk=22, pull_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=4, pull_object:crate#1=5, pull_object:sticky#1=1, move_sticky_rigid=1, sticky_to_box:n1=2, pull_object:crate#2=1, push_object:push_pull_anchor=2, push_object:crate#2=2, pull_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=2, box_to_sticky:n1=2, push_object:box_sticky_anchor=1, push_object:crate#1=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: up

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####C..G#
###G.@..#
####PL.M#
####..BS#
#########
```

After:

```text
#########
####C@.G#
###GPL..#
####...M#
####..BS#
#########
```

### Step 3: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
####C@.G#
###GPL..#
####...M#
####..BS#
#########
```

After:

```text
#########
####.C@G#
###GPL..#
####...M#
####..BS#
#########
```

### Step 4: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
####.C@G#
###GPL..#
####...M#
####..BS#
#########
```

After:

```text
#########
####..C+#
###GPL..#
####...M#
####..BS#
#########
```

### Step 7: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
####..CG#
###GPL@.#
####...M#
####..BS#
#########
```

After:

```text
#########
####...G#
###GPLC.#
####..@M#
####..BS#
#########
```

### Step 8: left

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
#########
####...G#
###GPLC.#
####..@M#
####..BS#
#########
```

After:

```text
#########
####...G#
###GPLC.#
####.@C.#
####..BS#
#########
```

### Step 9: left

- Legal: true
- Events: pull_object:crate#2

Before:

```text
#########
####...G#
###GPLC.#
####.@C.#
####..BS#
#########
```

After:

```text
#########
####...G#
###GPLC.#
####@C..#
####..BS#
#########
```

### Step 10: up

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####...G#
###GPLC.#
####@C..#
####..BS#
#########
```

After:

```text
#########
####PL.G#
###G@.C.#
####.C..#
####..BS#
#########
```

### Step 12: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
####PL.G#
###G.@C.#
####.C..#
####..BS#
#########
```

After:

```text
#########
####PL.G#
###G@C..#
####.C..#
####..BS#
#########
```

### Step 14: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
####PL.G#
###G.C..#
####@C..#
####..BS#
#########
```

After:

```text
#########
####PL.G#
###G.C..#
####.@C.#
####..BS#
#########
```

### Step 15: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
####PL.G#
###G.C..#
####.@C.#
####..BS#
#########
```

After:

```text
#########
####PL.G#
###G....#
####.CC.#
####.@BS#
#########
```

### Step 16: left

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1

Before:

```text
#########
####PL.G#
###G....#
####.CC.#
####.@BS#
#########
```

After:

```text
#########
####PL.G#
###G....#
####.CM.#
####@BS.#
#########
```

### Step 24: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####PL@G#
###G....#
####.CM.#
####.BS.#
#########
```

After:

```text
#########
####.PL+#
###G....#
####.CM.#
####.BS.#
#########
```

### Step 30: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####@PLG#
###G....#
####.CM.#
####.BS.#
#########
```

After:

```text
#########
####.@PL#
###G....#
####.CM.#
####.BS.#
#########
```

### Step 35: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#########
####..PL#
###G....#
####.CM.#
####@BS.#
#########
```

After:

```text
#########
####..PL#
###G....#
####.CC.#
####.@BS#
#########
```

### Step 36: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
####..PL#
###G....#
####.CC.#
####.@BS#
#########
```

After:

```text
#########
####..PL#
###G.C..#
####.@C.#
####..BS#
#########
```

### Step 37: right

- Legal: true
- Events: push_object:crate#2, box_to_sticky:n1

Before:

```text
#########
####..PL#
###G.C..#
####.@C.#
####..BS#
#########
```

After:

```text
#########
####..PL#
###G.C..#
####..@M#
####..BS#
#########
```

### Step 39: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
####..PL#
###G.C@.#
####...M#
####..BS#
#########
```

After:

```text
#########
####..PL#
###GC@..#
####...M#
####..BS#
#########
```

### Step 40: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
####..PL#
###GC@..#
####...M#
####..BS#
#########
```

After:

```text
#########
####..PL#
###*@...#
####...M#
####..BS#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 2828
- Legal transitions: 6093
- Event-only illegal transitions: 0
- Winning states: 33
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2828
- Legal transitions: 6093
- Budget: maxStates=300000
- Compressed regions: 574
- Bidirectional transitions: 5078
- Commitment transitions: 989
- Winning regions: 3
- Initial region: r0, states=1, dist=17, internalBidirectional=0, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r5@3 -> r10@4 -> r18@5 -> r31@6 -> r41@7 -> r56@8 -> r90@10 -> r107@11 -> r204@15 -> r308@23 -> r316@24 -> r350@30 -> r389@35 -> r396@36 -> r405@37 -> r430@39 -> r443@40
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=459, edges=706, winReachable=85, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=15, forcedWinPrefix=0/15, branchingWinSccs=21, mergingWinSccs=19
- Handoff scriptiness: scope=returned_solution, scripted=7/15, trivial=5, sameEntryExit=7, forcedScripted=7, maxRun=6
- Initial SCC: s0, states=18, dist=14, out=5, winOut=4, deadOut=1
- SCC path: s0@0 -> s335@2 -> s336@3 -> s337@4 -> s338@5 -> s339@6 -> s341@7 -> s342@8 -> s351@11 -> s353@15 -> s401@24 -> s424@30 -> s427@35 -> s428@37 -> s429@39 -> s430@40

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 14 | 18 | 5 | 4 | 1 | 0 | 0 | s335 | no |
| s335 | 2 | 14 | 1 | 1 | 1 | 0 | 1 | 1 | s336 | yes |
| s336 | 3 | 13 | 2 | 3 | 1 | 2 | 1 | 1 | s337 | yes |
| s337 | 4 | 12 | 1 | 1 | 1 | 0 | 1 | 1 | s338 | yes |
| s338 | 5 | 11 | 1 | 2 | 1 | 1 | 1 | 1 | s339 | yes |
| s339 | 6 | 10 | 1 | 2 | 1 | 1 | 1 | 1 | s341 | yes |
| s341 | 7 | 9 | 1 | 1 | 1 | 0 | 1 | 1 | s342 | yes |
| s342 | 8 | 8 | 23 | 7 | 2 | 5 | 1 | 1 | s351 | no |
| s351 | 11 | 7 | 6 | 2 | 1 | 1 | 2 | 2 | s353 | yes |
| s353 | 15 | 6 | 13 | 3 | 2 | 1 | 1 | 1 | s401 | no |
| s401 | 24 | 5 | 11 | 3 | 2 | 1 | 1 | 1 | s424 | no |
| s424 | 30 | 4 | 9 | 3 | 1 | 2 | 1 | 1 | s427 | yes |
| s427 | 35 | 3 | 18 | 6 | 1 | 5 | 3 | 3 | s428 | yes |
| s428 | 37 | 2 | 22 | 5 | 1 | 4 | 1 | 1 | s429 | yes |
| s429 | 39 | 1 | 21 | 3 | 1 | 2 | 1 | 1 | s430 | yes |
| s430 | 40 | 0 | 11 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s335 | 18 | no | no | up | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s335 | 2 | 3 | s336 | 1 | yes | yes | right | pull_object:crate#1 | scripted_trivial_scc |
| s336 | 3 | 4 | s337 | 2 | yes | yes | right | pull_object:crate#1 | scripted_same_state_handoff |
| s337 | 4 | 5 | s338 | 1 | yes | yes | down | walk | scripted_trivial_scc |
| s338 | 5 | 6 | s339 | 1 | yes | yes | left | walk | scripted_trivial_scc |
| s339 | 6 | 7 | s341 | 1 | yes | yes | down | pull_object:crate#1 | scripted_trivial_scc |
| s341 | 7 | 8 | s342 | 1 | yes | yes | left | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | scripted_trivial_scc |
| s342 | 8 | 11 | s351 | 23 | no | no | right | walk | has_reposition_room |
| s351 | 11 | 15 | s353 | 6 | no | yes | down | pull_object:crate#1 | has_reposition_room |
| s353 | 15 | 24 | s401 | 13 | no | no | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s401 | 24 | 30 | s424 | 11 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s424 | 30 | 35 | s427 | 9 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s427 | 35 | 37 | s428 | 18 | no | yes | right | push_object:crate#2, box_to_sticky:n1 | has_reposition_room |
| s428 | 37 | 39 | s429 | 22 | no | yes | left | push_object:crate#1 | has_reposition_room |
| s429 | 39 | 40 | s430 | 21 | yes | yes | left | push_object:crate#1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=2828, regions=574, solution commitments=19
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/19, optimal prefix=0/19, forced viable commitments=9/19
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 17 | 2 | 0 | 1 | multiple viable choices |
| 1 | r1 | r3 | 17 | 4 | 1 | 1 | multiple viable choices |
| 2 | r3 | r5 | 17 | 1 | 0 | 1 | forced optimal |
| 3 | r5 | r10 | 16 | 1 | 2 | 1 | forced optimal |
| 4 | r10 | r18 | 15 | 1 | 0 | 1 | forced optimal |
| 5 | r18 | r31 | 14 | 1 | 1 | 1 | forced optimal |
| 6 | r31 | r41 | 13 | 1 | 1 | 1 | forced optimal |
| 7 | r41 | r56 | 12 | 1 | 0 | 1 | forced optimal |
| 9 | r56 | r90 | 11 | 2 | 1 | 1 | forced optimal |
| 10 | r90 | r107 | 10 | 2 | 3 | 1 | forced optimal |
| 14 | r107 | r204 | 9 | 1 | 1 | 1 | forced optimal |
| 22 | r204 | r308 | 8 | 2 | 1 | 1 | forced optimal |
| 23 | r308 | r316 | 7 | 2 | 0 | 1 | forced optimal |
| 29 | r316 | r350 | 6 | 2 | 1 | 2 | multiple optimal choices |
| 34 | r350 | r389 | 5 | 1 | 2 | 1 | forced optimal |
| 35 | r389 | r396 | 4 | 1 | 3 | 1 | forced optimal |
| 36 | r396 | r405 | 3 | 2 | 2 | 1 | forced optimal |
| 38 | r405 | r430 | 2 | 2 | 2 | 1 | forced optimal |
| 39 | r430 | r443 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 17 | 1 | 2 | 2 | 0 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 17 | 7 | 5 | 4 | 1 | 1 | 1 | r3 | no | no | no |
| r3 | 2 | 17 | 1 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 3 | 16 | 2 | 3 | 1 | 2 | 1 | 1 | r10 | no | yes | yes |
| r10 | 4 | 15 | 1 | 1 | 1 | 0 | 1 | 1 | r18 | yes | yes | yes |
| r18 | 5 | 14 | 1 | 2 | 1 | 1 | 1 | 1 | r31 | no | yes | yes |
| r31 | 6 | 13 | 1 | 2 | 1 | 1 | 1 | 1 | r41 | no | yes | yes |
| r41 | 7 | 12 | 1 | 1 | 1 | 0 | 1 | 1 | r56 | yes | yes | yes |
| r56 | 8 | 11 | 3 | 3 | 2 | 1 | 1 | 1 | r90 | no | no | yes |
| r90 | 10 | 10 | 10 | 5 | 2 | 3 | 1 | 1 | r107 | no | no | yes |
| r107 | 11 | 9 | 6 | 2 | 1 | 1 | 1 | 1 | r204 | no | yes | yes |
| r204 | 15 | 8 | 12 | 3 | 2 | 1 | 1 | 1 | r308 | no | no | yes |
| r308 | 23 | 7 | 1 | 2 | 2 | 0 | 1 | 1 | r316 | no | no | yes |
| r316 | 24 | 6 | 11 | 3 | 2 | 1 | 2 | 2 | r350 | no | no | no |
| r350 | 30 | 5 | 9 | 3 | 1 | 2 | 1 | 1 | r389 | no | yes | yes |
| r389 | 35 | 4 | 10 | 4 | 1 | 3 | 1 | 1 | r396 | no | yes | yes |
| r396 | 36 | 3 | 8 | 4 | 2 | 2 | 1 | 1 | r405 | no | no | yes |
| r405 | 37 | 2 | 11 | 4 | 2 | 2 | 1 | 1 | r430 | no | no | yes |
| r430 | 39 | 1 | 10 | 3 | 2 | 1 | 1 | 1 | r443 | no | no | yes |
| r443 | 40 | 0 | 11 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 17 | 2 | 2 | 0 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | down | r1 | yes | 17 | 5 | 4 | 1 | 1 | 1 | r3 | yes | yes | no | no | no | no | walk |
| 2 | up | r3 | yes | 17 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | right | r5 | yes | 16 | 3 | 1 | 2 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 4 | right | r10 | yes | 15 | 1 | 1 | 0 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 5 | down | r18 | yes | 14 | 2 | 1 | 1 | 1 | 1 | r31 | yes | yes | yes | yes | yes | yes | walk |
| 6 | left | r31 | yes | 13 | 2 | 1 | 1 | 1 | 1 | r41 | yes | yes | yes | yes | yes | yes | walk |
| 7 | down | r41 | yes | 12 | 1 | 1 | 0 | 1 | 1 | r56 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 8 | left | r56 | yes | 11 | 3 | 2 | 1 | 1 | 1 | r56 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 9 | left | r56 | no | 11 | 3 | 2 | 1 | 1 | 1 | r90 | yes | yes | yes | yes | no | yes | pull_object:crate#2 |
| 10 | up | r90 | yes | 10 | 5 | 2 | 3 | 1 | 1 | r107 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 11 | right | r107 | yes | 9 | 2 | 1 | 1 | 1 | 1 | r107 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r107 | no | 9 | 2 | 1 | 1 | 1 | 1 | r107 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 13 | down | r107 | no | 9 | 2 | 1 | 1 | 1 | 1 | r107 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r107 | no | 9 | 2 | 1 | 1 | 1 | 1 | r204 | yes | yes | yes | yes | yes | yes | push_object:crate#2 |
| 15 | down | r204 | yes | 8 | 3 | 2 | 1 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 16 | left | r204 | no | 8 | 3 | 2 | 1 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1 |
| 17 | up | r204 | no | 8 | 3 | 2 | 1 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r204 | no | 8 | 3 | 2 | 1 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r204 | no | 8 | 3 | 2 | 1 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r204 | no | 8 | 3 | 2 | 1 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r204 | no | 8 | 3 | 2 | 1 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r204 | no | 8 | 3 | 2 | 1 | 1 | 1 | r308 | yes | yes | yes | yes | no | yes | walk |
| 23 | left | r308 | yes | 7 | 2 | 2 | 0 | 1 | 1 | r316 | yes | yes | yes | yes | no | yes | walk |
| 24 | right | r316 | yes | 6 | 3 | 2 | 1 | 2 | 2 | r316 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 25 | down | r316 | no | 6 | 3 | 2 | 1 | 2 | 2 | r316 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r316 | no | 6 | 3 | 2 | 1 | 2 | 2 | r316 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r316 | no | 6 | 3 | 2 | 1 | 2 | 2 | r316 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r316 | no | 6 | 3 | 2 | 1 | 2 | 2 | r316 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | up | r316 | no | 6 | 3 | 2 | 1 | 2 | 2 | r350 | yes | yes | yes | yes | no | no | walk |
| 30 | right | r350 | yes | 5 | 3 | 1 | 2 | 1 | 1 | r350 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 31 | down | r350 | no | 5 | 3 | 1 | 2 | 1 | 1 | r350 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r350 | no | 5 | 3 | 1 | 2 | 1 | 1 | r350 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | down | r350 | no | 5 | 3 | 1 | 2 | 1 | 1 | r350 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | down | r350 | no | 5 | 3 | 1 | 2 | 1 | 1 | r389 | yes | yes | yes | yes | yes | yes | walk |
| 35 | right | r389 | yes | 4 | 4 | 1 | 3 | 1 | 1 | r396 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 36 | up | r396 | yes | 3 | 4 | 2 | 2 | 1 | 1 | r405 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 37 | right | r405 | yes | 2 | 4 | 2 | 2 | 1 | 1 | r405 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2, box_to_sticky:n1 |
| 38 | up | r405 | no | 2 | 4 | 2 | 2 | 1 | 1 | r430 | yes | yes | yes | yes | no | yes | walk |
| 39 | left | r430 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r443 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 40 | left | r443 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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

# Level Analysis: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v3

## Summary

- Prototype: reality_anchor
- Title: Fresh Pull Brush Return v3
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#####P#####
#####L#####
##...MM.G##
##@S.M...##
###B...G###
#####...###
###########
```

## Shortest Solution

- Found: yes
- Cost: 34
- Depth: 34
- Explored states: 1455
- Inputs: up right right down down right right right down left left up up left left left up right right right down right left down right down left up left up up right right right
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 pull_object:crate#3 walk pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: walk=18, pull_object:box_sticky_anchor=6, anchor_boundary_shift:box_sticky=6, force_chain:n2=3, move_sticky_rigid=5, pull_object:sticky#1=3, sticky_to_box:n1=1, pull_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=5, sticky_to_box:n2=1, pull_object:crate#3=1, pull_object:crate#1=1, push_object:push_pull_anchor=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#####P#####
#####L#####
##...MM.G##
##.S.M...##
###B@..G###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##...MM.G##
##..SM...##
###.B@.G###
#####...###
###########
```

### Step 7: right

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
###########
#####P#####
#####L#####
##...MM.G##
##..SM...##
###.B@.G###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##....MMG##
##...SM..##
###..B@G###
#####...###
###########
```

### Step 8: right

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
###########
#####P#####
#####L#####
##....MMG##
##...SM..##
###..B@G###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##.....Mm##
##....SM.##
###...B+###
#####...###
###########
```

### Step 9: down

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
###########
#####P#####
#####L#####
##.....Mm##
##....SM.##
###...B+###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##......G##
##....SMM##
###...B*###
#####..@###
###########
```

### Step 14: left

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#####P#####
#####L#####
##......G##
##...@SMM##
###...B*###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##......G##
##..@S.MM##
###..B.*###
#####...###
###########
```

### Step 15: left

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#####P#####
#####L#####
##......G##
##..@S.MM##
###..B.*###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##......G##
##.@S..MM##
###.B..*###
#####...###
###########
```

### Step 16: left

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#####P#####
#####L#####
##......G##
##.@S..MM##
###.B..*###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##......G##
##@S...MM##
###B...*###
#####...###
###########
```

### Step 21: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#####P#####
#####L#####
##...@..G##
##.S...MM##
###B...*###
#####...###
###########
```

After:

```text
###########
#####.#####
#####P#####
##...L..G##
##.S.@.MM##
###B...*###
#####...###
###########
```

### Step 23: left

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#####.#####
#####P#####
##...L..G##
##.S..@MM##
###B...*###
#####...###
###########
```

After:

```text
###########
#####.#####
#####P#####
##...L..G##
##.S.@MM.##
###B...*###
#####...###
###########
```

### Step 24: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#####.#####
#####P#####
##...L..G##
##.S.@MM.##
###B...*###
#####...###
###########
```

After:

```text
###########
#####.#####
#####.#####
##...P..G##
##.S.LMM.##
###B.@.*###
#####...###
###########
```

### Step 26: down

- Legal: true
- Events: pull_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2

Before:

```text
###########
#####.#####
#####.#####
##...P..G##
##.S.LMM.##
###B..@*###
#####...###
###########
```

After:

```text
###########
#####.#####
#####.#####
##...P..G##
##.S.L...##
###B..C*###
#####.@C###
###########
```

### Step 27: left

- Legal: true
- Events: pull_object:crate#3

Before:

```text
###########
#####.#####
#####.#####
##...P..G##
##.S.L...##
###B..C*###
#####.@C###
###########
```

After:

```text
###########
#####.#####
#####.#####
##...P..G##
##.S.L...##
###B..C*###
#####@C.###
###########
```

### Step 29: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#####.#####
#####.#####
##...P..G##
##.S.L...##
###B.@C*###
#####.C.###
###########
```

After:

```text
###########
#####.#####
#####.#####
##...P..G##
##.S.L...##
###B@C.*###
#####.C.###
###########
```

### Step 32: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#####.#####
#####.#####
##..@P..G##
##.S.L...##
###B.C.*###
#####.C.###
###########
```

After:

```text
###########
#####.#####
#####.#####
##...@P.G##
##.S..L..##
###B.C.*###
#####.C.###
###########
```

### Step 33: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#####.#####
#####.#####
##...@P.G##
##.S..L..##
###B.C.*###
#####.C.###
###########
```

After:

```text
###########
#####.#####
#####.#####
##....@PG##
##.S...L.##
###B.C.*###
#####.C.###
###########
```

### Step 34: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#####.#####
#####.#####
##....@PG##
##.S...L.##
###B.C.*###
#####.C.###
###########
```

After:

```text
###########
#####.#####
#####.#####
##.....@P##
##.S....L##
###B.C.*###
#####.C.###
###########
```


## Graph Facts

- Status: complete
- Reachable states: 104786
- Legal transitions: 247141
- Event-only illegal transitions: 0
- Winning states: 670
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 104786
- Legal transitions: 247141
- Budget: maxStates=300000
- Compressed regions: 11319
- Bidirectional transitions: 215710
- Commitment transitions: 29119
- Winning regions: 670
- Initial region: r0, states=3, dist=18, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@3 -> r3@6 -> r5@7 -> r7@8 -> r9@9 -> r17@14 -> r20@15 -> r29@16 -> r69@21 -> r77@22 -> r88@23 -> r104@24 -> r136@25 -> r163@26 -> r192@27 -> r214@28 -> r236@29 -> r308@32 -> r337@33 -> r370@34
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 8

### SCC Irreversible Progress

- Shape: sccs=5658, edges=10642, winReachable=1967, winning=670, winSubgraph=branching_win_dag
- Solution irreversible path: steps=15, forcedWinPrefix=2/15, branchingWinSccs=652, mergingWinSccs=604
- Handoff scriptiness: scope=returned_solution, scripted=9/15, trivial=9, sameEntryExit=9, forcedScripted=8, maxRun=6
- Initial SCC: s0, states=3, dist=8, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@3 -> s3@6 -> s4@7 -> s5@8 -> s6@9 -> s7@14 -> s17@21 -> s189@23 -> s196@24 -> s197@25 -> s203@26 -> s204@27 -> s233@28 -> s1800@29 -> s2322@34

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 8 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 3 | 7 | 3 | 2 | 1 | 1 | 1 | 1 | s3 | yes |
| s3 | 6 | 6 | 1 | 2 | 2 | 0 | 1 | 1 | s4 | no |
| s4 | 7 | 8 | 1 | 2 | 1 | 1 | 1 | 1 | s5 | yes |
| s5 | 8 | 7 | 1 | 1 | 1 | 0 | 1 | 1 | s6 | yes |
| s6 | 9 | 6 | 17 | 2 | 1 | 1 | 1 | 1 | s7 | yes |
| s7 | 14 | 5 | 51 | 6 | 5 | 1 | 1 | 1 | s17 | no |
| s17 | 21 | 4 | 8 | 4 | 2 | 2 | 1 | 1 | s189 | no |
| s189 | 23 | 7 | 1 | 2 | 1 | 1 | 2 | 2 | s196 | yes |
| s196 | 24 | 6 | 1 | 3 | 1 | 2 | 1 | 1 | s197 | yes |
| s197 | 25 | 5 | 1 | 2 | 1 | 1 | 1 | 1 | s203 | yes |
| s203 | 26 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | s204 | yes |
| s204 | 27 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s233 | yes |
| s233 | 28 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | s1800 | yes |
| s1800 | 29 | 1 | 14085 | 747 | 343 | 404 | 58 | 58 | s2322 | no |
| s2322 | 34 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 3 | no | yes | right | walk | has_reposition_room |
| s1 | 3 | 6 | s3 | 3 | no | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s3 | 6 | 7 | s4 | 1 | yes | no | right | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_trivial_scc |
| s4 | 7 | 8 | s5 | 1 | yes | yes | right | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_trivial_scc |
| s5 | 8 | 9 | s6 | 1 | yes | yes | down | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | scripted_trivial_scc |
| s6 | 9 | 14 | s7 | 17 | no | yes | left | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s7 | 14 | 21 | s17 | 51 | no | no | down | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s17 | 21 | 23 | s189 | 8 | no | no | left | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s189 | 23 | 24 | s196 | 1 | yes | yes | down | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_trivial_scc |
| s196 | 24 | 25 | s197 | 1 | yes | yes | right | walk | scripted_trivial_scc |
| s197 | 25 | 26 | s203 | 1 | yes | yes | down | pull_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2 | scripted_trivial_scc |
| s203 | 26 | 27 | s204 | 1 | yes | yes | left | pull_object:crate#3 | scripted_trivial_scc |
| s204 | 27 | 28 | s233 | 1 | yes | yes | up | walk | scripted_trivial_scc |
| s233 | 28 | 29 | s1800 | 1 | yes | yes | left | pull_object:crate#1 | scripted_trivial_scc |
| s1800 | 29 | 34 | s2322 | 14085 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=104786, regions=11319, solution commitments=20
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/20, optimal prefix=8/20, forced viable commitments=12/20
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 18 | 1 | 0 | 1 | forced optimal |
| 5 | r1 | r3 | 17 | 1 | 1 | 1 | forced optimal |
| 6 | r3 | r5 | 16 | 2 | 0 | 1 | forced optimal |
| 7 | r5 | r7 | 15 | 1 | 1 | 1 | forced optimal |
| 8 | r7 | r9 | 14 | 1 | 0 | 1 | forced optimal |
| 13 | r9 | r17 | 13 | 2 | 0 | 1 | forced optimal |
| 14 | r17 | r20 | 12 | 1 | 0 | 1 | forced optimal |
| 15 | r20 | r29 | 11 | 4 | 1 | 1 | forced optimal |
| 20 | r29 | r69 | 10 | 4 | 0 | 1 | multiple viable choices |
| 21 | r69 | r77 | 11 | 2 | 1 | 1 | forced optimal |
| 22 | r77 | r88 | 10 | 2 | 2 | 1 | forced optimal |
| 23 | r88 | r104 | 9 | 1 | 1 | 1 | forced optimal |
| 24 | r104 | r136 | 8 | 1 | 2 | 1 | forced optimal |
| 25 | r136 | r163 | 7 | 1 | 1 | 1 | forced optimal |
| 26 | r163 | r192 | 6 | 1 | 0 | 1 | forced optimal |
| 27 | r192 | r214 | 5 | 1 | 0 | 1 | forced optimal |
| 28 | r214 | r236 | 4 | 1 | 1 | 1 | forced optimal |
| 31 | r236 | r308 | 3 | 1 | 0 | 1 | forced optimal |
| 32 | r308 | r337 | 2 | 3 | 0 | 1 | forced optimal |
| 33 | r337 | r370 | 1 | 5 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 18 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 3 | 17 | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 6 | 16 | 1 | 2 | 2 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 7 | 15 | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | yes | yes |
| r7 | 8 | 14 | 1 | 1 | 1 | 0 | 1 | 1 | r9 | yes | yes | yes |
| r9 | 9 | 13 | 5 | 2 | 2 | 0 | 1 | 1 | r17 | no | no | yes |
| r17 | 14 | 12 | 17 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes |
| r20 | 15 | 11 | 17 | 5 | 4 | 1 | 1 | 1 | r29 | no | no | yes |
| r29 | 16 | 10 | 17 | 4 | 4 | 0 | 1 | 1 | r69 | no | no | no |
| r69 | 21 | 11 | 1 | 3 | 2 | 1 | 1 | 1 | r77 | no | no | yes |
| r77 | 22 | 10 | 7 | 4 | 2 | 2 | 1 | 1 | r88 | no | no | yes |
| r88 | 23 | 9 | 1 | 2 | 1 | 1 | 1 | 1 | r104 | no | yes | yes |
| r104 | 24 | 8 | 1 | 3 | 1 | 2 | 1 | 1 | r136 | no | yes | yes |
| r136 | 25 | 7 | 1 | 2 | 1 | 1 | 1 | 1 | r163 | no | yes | yes |
| r163 | 26 | 6 | 1 | 1 | 1 | 0 | 1 | 1 | r192 | yes | yes | yes |
| r192 | 27 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | r214 | yes | yes | yes |
| r214 | 28 | 4 | 1 | 2 | 1 | 1 | 1 | 1 | r236 | no | yes | yes |
| r236 | 29 | 3 | 6 | 1 | 1 | 0 | 1 | 1 | r308 | yes | yes | yes |
| r308 | 32 | 2 | 9 | 3 | 3 | 0 | 1 | 1 | r337 | no | no | yes |
| r337 | 33 | 1 | 11 | 5 | 5 | 0 | 1 | 1 | r370 | no | no | yes |
| r370 | 34 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 18 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 18 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 18 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 3 | right | r1 | yes | 17 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 17 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 17 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r3 | yes | 16 | 2 | 2 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 7 | right | r5 | yes | 15 | 2 | 1 | 1 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 8 | right | r7 | yes | 14 | 1 | 1 | 0 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 9 | down | r9 | yes | 13 | 2 | 2 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 10 | left | r9 | no | 13 | 2 | 2 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r9 | no | 13 | 2 | 2 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r9 | no | 13 | 2 | 2 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r9 | no | 13 | 2 | 2 | 0 | 1 | 1 | r17 | yes | yes | yes | yes | no | yes | walk |
| 14 | left | r17 | yes | 12 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 15 | left | r20 | yes | 11 | 5 | 4 | 1 | 1 | 1 | r29 | yes | yes | yes | yes | no | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 16 | left | r29 | yes | 10 | 4 | 4 | 0 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 17 | up | r29 | no | 10 | 4 | 4 | 0 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r29 | no | 10 | 4 | 4 | 0 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r29 | no | 10 | 4 | 4 | 0 | 1 | 1 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r29 | no | 10 | 4 | 4 | 0 | 1 | 1 | r69 | yes | yes | no | no | no | no | walk |
| 21 | down | r69 | yes | 11 | 3 | 2 | 1 | 1 | 1 | r77 | yes | yes | yes | yes | no | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 22 | right | r77 | yes | 10 | 4 | 2 | 2 | 1 | 1 | r88 | yes | yes | yes | yes | no | yes | walk |
| 23 | left | r88 | yes | 9 | 2 | 1 | 1 | 1 | 1 | r104 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, move_sticky_rigid |
| 24 | down | r104 | yes | 8 | 3 | 1 | 2 | 1 | 1 | r136 | yes | yes | yes | yes | yes | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 25 | right | r136 | yes | 7 | 2 | 1 | 1 | 1 | 1 | r163 | yes | yes | yes | yes | yes | yes | walk |
| 26 | down | r163 | yes | 6 | 1 | 1 | 0 | 1 | 1 | r192 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2 |
| 27 | left | r192 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r214 | yes | yes | yes | yes | yes | yes | pull_object:crate#3 |
| 28 | up | r214 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r236 | yes | yes | yes | yes | yes | yes | walk |
| 29 | left | r236 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r236 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 30 | up | r236 | no | 3 | 1 | 1 | 0 | 1 | 1 | r236 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | up | r236 | no | 3 | 1 | 1 | 0 | 1 | 1 | r308 | yes | yes | yes | yes | yes | yes | walk |
| 32 | right | r308 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r337 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 33 | right | r337 | yes | 1 | 5 | 5 | 0 | 1 | 1 | r370 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 34 | right | r370 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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

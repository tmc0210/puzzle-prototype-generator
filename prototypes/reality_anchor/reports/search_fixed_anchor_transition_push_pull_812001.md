# Fixed Anchor Transition Search

- fixedKind: push_pull
- seed: 812001
- iterations: 3500
- maxStates: 80000
- graphMaxStates: 120000
- maxDepth: 28
- costRange: 6-16
- wallRate: 0.1
- requiredGroups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization
- forbiddenReachable: anchor_boundary_shift:push_pull
- hits: 12

## 1. RA_FIXED_PUSH_PULL_SEARCH_812001_382

- score=346.1 cost=12 explored=243 graphStates=352 winStates=3 probeStates=377 scc=branching_win_dag scripted=1/4
- inputs=down right down left up up left left left left down left
- events=push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- forbiddenHits=none

```text
#########
####LP###
#########
#M....@.#
#.GS..M.#
#..B#G..#
#########
```

## 2. RA_FIXED_PUSH_PULL_SEARCH_812001_1468

- score=343.8 cost=12 explored=183 graphStates=352 winStates=10 probeStates=405 scc=branching_win_dag scripted=3/5
- inputs=up down right right up right right down left left up left
- events=walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk push_object:crate#2 push_object:crate#2 walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
- forbiddenHits=none

```text
#########
###LP####
#########
#.MS.#M.#
#GGB...##
#.@G.C.C#
#########
```

## 3. RA_FIXED_PUSH_PULL_SEARCH_812001_191

- score=340.4 cost=10 explored=49 graphStates=61 winStates=9 probeStates=61 scc=one_win_continuation_per_scc scripted=4/6
- inputs=up left down right right right up left left up
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 pull_object:crate#3 pull_object:crate#3 walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid
- forbiddenHits=none

```text
########
####LP##
########
##CC.#.#
#G..GBS#
#.C.@..#
########
```

## 4. RA_FIXED_PUSH_PULL_SEARCH_812001_88

- score=337.5 cost=11 explored=443 graphStates=960 winStates=20 probeStates=1663 scc=one_win_continuation_per_scc scripted=1/1
- inputs=left left left left up right right right up right right
- events=pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- forbiddenHits=none

```text
##########
#####LP###
##########
#.BS.G..##
#........#
#.G..@M..#
##########
```

## 5. RA_FIXED_PUSH_PULL_SEARCH_812001_1172

- score=329.8 cost=9 explored=155 graphStates=620 winStates=13 probeStates=770 scc=branching_win_dag scripted=2/4
- inputs=right right up left right right right right down
- events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#2 walk walk walk walk pull_object:sticky#1 move_sticky_rigid
- forbiddenHits=none

```text
########
####PL##
########
#.#M..M#
#GC...G#
#@BS...#
########
```

## 6. RA_FIXED_PUSH_PULL_SEARCH_812001_1823

- score=327.5 cost=15 explored=72 graphStates=127 winStates=8 probeStates=127 scc=one_win_continuation_per_scc scripted=2/5
- inputs=up left down right up up left left left left down down right up right
- events=walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:crate#1 force_chain:n2
- forbiddenHits=none

```text
########
###PL###
########
#.SG.M.#
#.BCC.G#
#...#.@#
########
```

## 7. RA_FIXED_PUSH_PULL_SEARCH_812001_3246

- score=313.1 cost=8 explored=45 graphStates=82 winStates=25 probeStates=90 scc=branching_win_dag scripted=4/5
- inputs=up down right right up right right down
- events=push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1
- forbiddenHits=none

```text
#########
##PL#####
#########
#GBCC...#
#MS..G.M#
#@..#...#
#########
```

## 8. RA_FIXED_PUSH_PULL_SEARCH_812001_1013

- score=305.4 cost=8 explored=61 graphStates=180 winStates=19 probeStates=240 scc=branching_win_dag scripted=1/3
- inputs=right right left left up left up right
- events=walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
- forbiddenHits=none

```text
#########
###PL####
#########
#..BSG..#
#....##M#
##.@G.M.#
#########
```

## 9. RA_FIXED_PUSH_PULL_SEARCH_812001_3474

- score=290.9 cost=7 explored=54 graphStates=413 winStates=31 probeStates=606 scc=branching_win_dag scripted=0/1
- inputs=up left down left down left up
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#2 move_sticky_rigid walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- forbiddenHits=none

```text
########
####PL##
########
#CG#.GB#
#.M.M@S#
#......#
########
```

## 10. RA_FIXED_PUSH_PULL_SEARCH_812001_1461

- score=280.4 cost=14 explored=306 graphStates=503 winStates=18 probeStates=626 scc=branching_win_dag scripted=1/4
- inputs=up up right right left left down right down left up left left left
- events=walk walk walk walk pull_object:crate#1 pull_object:crate#1 walk walk pull_object:crate#1 box_to_sticky:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- forbiddenHits=none

```text
##########
#####PL###
##########
#G..B...C#
#...S.G.M#
#....@.#M#
##########
```

## 11. RA_FIXED_PUSH_PULL_SEARCH_812001_2543

- score=244.1 cost=6 explored=32 graphStates=643 winStates=81 probeStates=678 scc=branching_win_dag scripted=0/2
- inputs=down left down left left up
- events=walk walk pull_object:crate#3 box_to_sticky:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- forbiddenHits=none

```text
########
##PL####
########
#G.C.C.#
#B.C@.##
#S#G...#
#....#.#
########
```

## 12. RA_FIXED_PUSH_PULL_SEARCH_812001_2960

- score=243.2 cost=16 explored=43 graphStates=48 winStates=5 probeStates=49 scc=one_win_continuation_per_scc scripted=2/5
- inputs=left left down left left up right right right right down left up left left left
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1
- forbiddenHits=none

```text
########
##PL####
########
#M.#.#C#
#..G..@#
#..G.SB#
########
```

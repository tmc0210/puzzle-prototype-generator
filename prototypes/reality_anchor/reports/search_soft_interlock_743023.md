# Soft Interlock Search

- seed: 743023
- iterations: 2500
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 44
- costRange: 12-20
- wallRate: 0.13
- hits: 1
- solverHits: 10

## 1. RA_SOFT_INTERLOCK_SEARCH_743023_200

- score=425.5 cost=13 walkSteps=7 explored=89 graphStates=159 winStates=14 probeStates=182 scc=branching_win_dag
- firstPushPullShift=2 firstBoxStickyShift=8 firstMaterial=8
- inputs=down left down left left down right right up left up left down
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. down: walk
  2. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. down: push_object:sticky#1 move_sticky_rigid
  4. left: walk
  5. left: walk
  6. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: walk
  8. right: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1
  9. up: walk
  10. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. up: walk
  12. left: walk
  13. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..#.@C##
##.LP.#.#
#...M#.C#
#G...SBG#
#########
```

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_743023_1430

- score=332.0 cost=16 walkSteps=8 explored=1014 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=8 firstBoxStickyShift=4 firstMaterial=2
- inputs=up left down up right up right down left down down left left left left left
- events=walk push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. left: push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
  3. down: walk
  4. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. right: walk
  6. up: walk
  7. right: walk
  8. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. left: walk
  10. down: walk
  11. down: walk
  12. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1
  14. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2
  15. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1
  16. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
##########
#.#MM.C..#
#....MC.P#
#G.G...@L#
#....SB..#
##########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_743023_1645

- score=326.0 cost=18 walkSteps=9 explored=578 probe=found bypass=true missing=material_normalization
- firstPushPullShift=10 firstBoxStickyShift=3 firstMaterial=17
- inputs=right down right down down left up down left left left right up up right down left down
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
- stepEvents=
  1. right: walk
  2. down: walk
  3. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  4. down: walk
  5. down: walk
  6. left: walk
  7. up: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky
  8. down: pull_object:crate#1
  9. left: walk
  10. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: walk
  13. up: walk
  14. up: walk
  15. right: pull_object:sticky#1 move_sticky_rigid
  16. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. left: pull_object:crate#1 box_to_sticky:n1
  18. down: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
########
#.M.@..#
#MMSB..#
#GGL.C.#
#G.P...#
########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_743023_977

- score=318.0 cost=13 walkSteps=6 explored=118 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=3 firstBoxStickyShift=3 firstMaterial=4
- inputs=down right left up left down down right down right up right right
- events=walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:crate#1 walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
- stepEvents=
  1. down: walk
  2. right: walk
  3. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  4. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  5. left: pull_object:crate#1
  6. down: walk
  7. down: walk
  8. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  9. down: walk
  10. right: walk
  11. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  13. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#.@CC#.##
#..GL...#
#..BPC.G#
#..S#...#
#########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_743023_1936

- score=316.0 cost=14 walkSteps=7 explored=751 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- firstPushPullShift=1 firstBoxStickyShift=5 firstMaterial=2
- inputs=left left up left left up right right right down down left left up
- events=push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 sticky_merge:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 push_object:crate#1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 sticky_merge:n1
  3. up: walk
  4. left: walk
  5. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  6. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: walk
  8. right: push_object:crate#1
  9. right: push_object:crate#1
  10. down: walk
  11. down: walk
  12. left: walk
  13. left: walk
  14. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##.G.C.G#
#.SB....#
#..C.LP@#
#.M#.#..#
#########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_743023_200

- score=312.0 cost=13 walkSteps=7 explored=89 probe=complete bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=8 firstMaterial=8
- inputs=down left down left left down right right up left up left down
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. down: walk
  2. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. down: push_object:sticky#1 move_sticky_rigid
  4. left: walk
  5. left: walk
  6. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: walk
  8. right: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1
  9. up: walk
  10. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. up: walk
  12. left: walk
  13. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..#.@C##
##.LP.#.#
#...M#.C#
#G...SBG#
#########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_743023_1021

- score=292.0 cost=14 walkSteps=7 explored=1292 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=5 firstBoxStickyShift=2 firstMaterial=2
- inputs=right down left up left down left up up down down left up left
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. right: walk
  2. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  3. left: walk
  4. up: walk
  5. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  6. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. left: walk
  8. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. down: walk
  11. down: walk
  12. left: walk
  13. up: push_object:sticky#1 move_sticky_rigid sticky_to_box:n2
  14. left: push_object:sticky#1 move_sticky_rigid

```text
#########
#...G.#B#
#M.G.PLS#
#GMM..@.#
#.M.....#
#########
```

### 7. RA_SOFT_INTERLOCK_SEARCH_743023_1986

- score=292.0 cost=18 walkSteps=9 explored=2605 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=6 firstMaterial=7
- inputs=up left right down right down left left up up right down up right down right up left
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk walk walk pull_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1
- stepEvents=
  1. up: walk
  2. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: walk
  4. down: walk
  5. right: walk
  6. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  7. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  8. left: pull_object:crate#1
  9. up: walk
  10. up: walk
  11. right: walk
  12. down: walk
  13. up: pull_object:crate#1
  14. right: walk
  15. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. right: pull_object:crate#1
  17. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  18. left: push_object:crate#1

```text
########
#GPGBSM#
#.L@.M.#
#......#
#..C#..#
########
```

### 8. RA_SOFT_INTERLOCK_SEARCH_743023_430

- score=290.0 cost=19 walkSteps=8 explored=5067 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=2 firstBoxStickyShift=15 firstMaterial=19
- inputs=right right down down right down left up up left left left left down right right right right up
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 push_object:crate#1 push_object:crate#1 push_object:crate#1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
- stepEvents=
  1. right: walk
  2. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. down: walk
  4. down: walk
  5. right: walk
  6. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. left: walk
  8. up: walk
  9. up: walk
  10. left: push_object:crate#1
  11. left: push_object:crate#1
  12. left: push_object:crate#1
  13. left: push_object:crate#1
  14. down: walk
  15. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  18. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  19. up: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2

```text
#########
####@.PG#
#G...CL.#
#B......#
#S..MM..#
#########
```

### 9. RA_SOFT_INTERLOCK_SEARCH_743023_361

- score=282.0 cost=14 walkSteps=5 explored=641 probe=found bypass=true missing=pull_event,material_normalization
- firstPushPullShift=7 firstBoxStickyShift=11 firstMaterial=9
- inputs=up up right right up right right down down right right down left right
- events=walk walk push_object:crate#2 push_object:crate#2 force_chain:n2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#3 push_object:crate#5 box_to_sticky:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#3 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. up: walk
  3. right: push_object:crate#2
  4. right: push_object:crate#2 force_chain:n2
  5. up: walk
  6. right: walk
  7. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. down: push_object:crate#3
  9. down: push_object:crate#5 box_to_sticky:n1
  10. right: walk
  11. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. down: pull_object:crate#3
  13. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  14. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
##C..PL.##
#.C.C..C.#
#.C#..GB.#
#@#....SG#
##########
```

### 10. RA_SOFT_INTERLOCK_SEARCH_743023_1157

- score=282.0 cost=14 walkSteps=5 explored=873 probe=found bypass=true missing=material_normalization
- firstPushPullShift=8 firstBoxStickyShift=10 firstMaterial=14
- inputs=down right down left left up up down left left up right right down
- events=pull_object:crate#2 pull_object:crate#6 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#6 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#4 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:crate#6 box_to_sticky:n1
- stepEvents=
  1. down: pull_object:crate#2
  2. right: pull_object:crate#6
  3. down: walk
  4. left: walk
  5. left: walk
  6. up: walk
  7. up: walk
  8. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. left: pull_object:crate#6
  10. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. up: push_object:crate#4
  12. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  13. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  14. down: push_object:crate#6 box_to_sticky:n1

```text
#########
#C.PLC#C#
#CC..@.G#
#.B.C...#
#.S.G..##
#########
```

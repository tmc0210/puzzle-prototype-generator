# Soft Interlock Search

- seed: 743021
- iterations: 2500
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 44
- costRange: 12-20
- wallRate: 0.09
- hits: 0
- solverHits: 13

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_743021_372

- score=376.0 cost=13 walkSteps=4 explored=1018 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=10 firstMaterial=8
- inputs=down up right right down left down left down left up right left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 pull_object:crate#1 walk walk pull_object:crate#1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
- stepEvents=
  1. down: walk
  2. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: pull_object:crate#1
  4. right: pull_object:crate#1
  5. down: walk
  6. left: walk
  7. down: pull_object:crate#1
  8. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  9. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  11. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: walk
  13. left: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2

```text
#########
#...C@..#
#..G.G..#
#C..PL.M#
#C.C..BS#
#########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_743021_1378

- score=354.0 cost=14 walkSteps=7 explored=2589 probe=found bypass=true missing=pull_event,material_normalization,sticky_rigid_move
- firstPushPullShift=1 firstBoxStickyShift=1 firstMaterial=8
- inputs=up right up up left down up left down right down left right right
- events=push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
- stepEvents=
  1. up: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  2. right: walk
  3. up: walk
  4. up: walk
  5. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  6. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. up: walk
  8. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  9. down: walk
  10. right: walk
  11. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. left: walk
  13. right: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  14. right: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
##########
#.G......#
#C..BS...#
#..CLP.#.#
#..C.@GG.#
##########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_743021_1827

- score=350.0 cost=12 walkSteps=5 explored=82 probe=found bypass=true missing=pull_event
- firstPushPullShift=1 firstBoxStickyShift=5 firstMaterial=3
- inputs=right up right right left left down right up right up left
- events=push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#2 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
- stepEvents=
  1. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. up: walk
  3. right: push_object:crate#2 box_to_sticky:n1
  4. right: push_object:sticky#1 move_sticky_rigid sticky_merge:n1
  5. left: pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:box_sticky move_sticky_rigid
  6. left: walk
  7. down: walk
  8. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. up: walk
  10. right: push_object:sticky#1 move_sticky_rigid
  11. up: walk
  12. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
#########
#G.CBSM.#
#.#.C...#
#C@PL.G.#
#########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_743021_1496

- score=348.0 cost=13 walkSteps=4 explored=331 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=2 firstBoxStickyShift=2 firstMaterial=2
- inputs=up down left left up right up right right down down left right
- events=walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. down: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1
  3. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  4. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  5. up: pull_object:crate#1 box_to_sticky:n1
  6. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  7. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  8. right: walk
  9. right: walk
  10. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. left: walk
  13. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#...LP#.#
#M..GS.M#
#...@BC##
#..CGG..#
#########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_743021_632

- score=344.0 cost=14 walkSteps=3 explored=1045 probe=found bypass=true missing=push_pull_anchor_shift,box_sticky_anchor_shift
- firstPushPullShift=3 firstBoxStickyShift=5 firstMaterial=6
- inputs=left down left left down right right up right up left left left left
- events=walk pull_object:crate#1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#3 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. down: pull_object:crate#1
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  6. right: pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  7. right: pull_object:crate#3
  8. up: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  9. right: walk
  10. up: walk
  11. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#.....C.C#
#G.SB..@##
#..M...LP#
#M...G.C##
##########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_743021_881

- score=334.0 cost=20 walkSteps=7 explored=4724 probe=found bypass=true missing=push_pull_anchor_shift,material_normalization
- firstPushPullShift=2 firstBoxStickyShift=3 firstMaterial=4
- inputs=right down right up right right down down left left left up up right down left down right right right
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 walk walk push_object:crate#1 force_chain:n3 push_object:crate#1 force_chain:n3 push_object:crate#1 force_chain:n3
- stepEvents=
  1. right: walk
  2. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  4. up: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  5. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. down: pull_object:sticky#2 move_sticky_rigid
  8. down: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  9. left: walk
  10. left: walk
  11. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. up: walk
  13. up: walk
  14. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. down: push_object:sticky#1 move_sticky_rigid sticky_to_box:n3
  16. left: walk
  17. down: walk
  18. right: push_object:crate#1 force_chain:n3
  19. right: push_object:crate#1 force_chain:n3
  20. right: push_object:crate#1 force_chain:n3

```text
##########
#PL..M...#
#@...G#M.#
#S..M....#
#BC.....G#
##########
```

### 7. RA_SOFT_INTERLOCK_SEARCH_743021_2281

- score=326.0 cost=14 walkSteps=6 explored=1150 probe=found bypass=true missing=material_normalization
- firstPushPullShift=4 firstBoxStickyShift=6 firstMaterial=11
- inputs=left left left right down right right down left left left up left left
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. left: walk
  2. left: walk
  3. left: walk
  4. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. down: walk
  6. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. down: walk
  9. left: pull_object:crate#2
  10. left: pull_object:crate#2
  11. left: pull_object:crate#2 box_to_sticky:n1
  12. up: walk
  13. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  14. left: push_object:sticky#1 move_sticky_rigid

```text
##########
#.PL...@.#
#GMSBG..C#
#....G..C#
##########
```

### 8. RA_SOFT_INTERLOCK_SEARCH_743021_2176

- score=320.0 cost=16 walkSteps=7 explored=804 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=12 firstBoxStickyShift=5 firstMaterial=13
- inputs=up up up left down left right up down left left right right right down down
- events=walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. up: walk
  2. up: walk
  3. up: walk
  4. left: walk
  5. down: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  6. left: walk
  7. right: pull_object:crate#1
  8. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  9. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. left: walk
  11. left: walk
  12. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1
  14. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  15. down: pull_object:sticky#1 move_sticky_rigid
  16. down: pull_object:sticky#1 move_sticky_rigid

```text
########
#.P..G.#
#.LCBS.#
#C..C.G#
#.....@#
########
```

### 9. RA_SOFT_INTERLOCK_SEARCH_743021_878

- score=314.0 cost=19 walkSteps=7 explored=480 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=16 firstBoxStickyShift=15 firstMaterial=7
- inputs=right right left up up right up down up left down up right right down left up down left
- events=walk walk pull_object:crate#3 walk walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:crate#3 box_to_sticky:n1 sticky_merge:n1 walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 box_to_sticky:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: walk
  2. right: walk
  3. left: pull_object:crate#3
  4. up: walk
  5. up: walk
  6. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  7. up: pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1
  8. down: push_object:sticky#1 move_sticky_rigid sticky_to_box:n2
  9. up: pull_object:crate#3 box_to_sticky:n1 sticky_merge:n1
  10. left: walk
  11. down: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2
  12. up: pull_object:crate#2 box_to_sticky:n1
  13. right: walk
  14. right: walk
  15. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2
  16. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. up: pull_object:sticky#3 move_sticky_rigid sticky_merge:n1
  18. down: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  19. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
#.MG.P#
#M..SL#
#C.CB##
#@GGC.#
#######
```

### 10. RA_SOFT_INTERLOCK_SEARCH_743021_1065

- score=312.0 cost=17 walkSteps=9 explored=3553 probe=found bypass=true missing=material_normalization
- firstPushPullShift=7 firstBoxStickyShift=4 firstMaterial=9
- inputs=left down down left left down right right up left up right right down right right up
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. left: walk
  2. down: walk
  3. down: walk
  4. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. left: walk
  6. down: walk
  7. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  8. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  9. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  10. left: walk
  11. up: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  12. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. down: walk
  15. right: walk
  16. right: walk
  17. up: pull_object:sticky#1 move_sticky_rigid

```text
##########
#..G.@G..#
##.C.B...#
#....S..G#
#..PLMM..#
##########
```

### 11. RA_SOFT_INTERLOCK_SEARCH_743021_48

- score=268.0 cost=13 walkSteps=6 explored=1609 probe=found bypass=true missing=material_normalization
- firstPushPullShift=5 firstBoxStickyShift=7 firstMaterial=8
- inputs=right up left left down left right down left left up left left
- events=walk walk push_object:crate#2 push_object:crate#2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. right: walk
  2. up: walk
  3. left: push_object:crate#2
  4. left: push_object:crate#2
  5. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. left: walk
  7. right: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  8. down: pull_object:crate#2 box_to_sticky:n1
  9. left: walk
  10. left: walk
  11. up: walk
  12. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.C..LP.#
#.GB..CG#
#..S.G@.#
#M.....M#
#########
```

### 12. RA_SOFT_INTERLOCK_SEARCH_743021_2174

- score=268.0 cost=13 walkSteps=6 explored=1048 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=1 firstBoxStickyShift=7 firstMaterial=7
- inputs=down right up right right down left left up up right down up
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. right: walk
  3. up: walk
  4. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. down: walk
  7. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. up: walk
  10. up: walk
  11. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. down: walk
  13. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#P#M.MC.#
#L..G...#
#@.GG...#
#....SB.#
#########
```

### 13. RA_SOFT_INTERLOCK_SEARCH_743021_1699

- score=258.0 cost=20 walkSteps=10 explored=1839 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=4 firstBoxStickyShift=8 firstMaterial=13
- inputs=right right down left right right down left left up up right down right right up left left left left
- events=walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. right: walk
  2. right: walk
  3. down: walk
  4. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: walk
  6. right: walk
  7. down: push_object:crate#1
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. up: pull_object:crate#1
  11. up: walk
  12. right: walk
  13. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  14. right: walk
  15. right: walk
  16. up: walk
  17. left: push_object:sticky#2 move_sticky_rigid
  18. left: push_object:sticky#2 move_sticky_rigid
  19. left: push_object:sticky#1 move_sticky_rigid
  20. left: push_object:sticky#1 move_sticky_rigid

```text
########
#G@..M.#
#.GP..S#
##.L.CB#
#..C.G.#
########
```

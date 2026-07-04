# Soft Interlock Search

- seed: 743011
- iterations: 3500
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 44
- costRange: 12-20
- wallRate: 0.1
- hits: 0
- solverHits: 24

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_743011_1463

- score=378.0 cost=14 walkSteps=5 explored=585 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=2 firstBoxStickyShift=6 firstMaterial=6
- inputs=up right right right down up right left left left left down right up
- events=pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:crate#1 pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2
- stepEvents=
  1. up: pull_object:crate#2
  2. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. down: walk
  6. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  7. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. left: walk
  9. left: walk
  10. left: walk
  11. left: walk
  12. down: push_object:crate#2 box_to_sticky:n1 sticky_merge:n1
  13. right: pull_object:crate#1
  14. up: pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2

```text
#########
#.GP...G#
#C@L....#
#.CC.BC.#
#..M.S..#
#########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_743011_1596

- score=370.0 cost=17 walkSteps=5 explored=1029 probe=found bypass=true missing=material_normalization
- firstPushPullShift=2 firstBoxStickyShift=6 firstMaterial=13
- inputs=right up left left left right down left left down up right right up right right right
- events=pull_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. right: pull_object:sticky#1 move_sticky_rigid
  2. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: walk
  4. left: walk
  5. left: walk
  6. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. down: walk
  8. left: pull_object:sticky#1 move_sticky_rigid
  9. left: pull_object:sticky#1 move_sticky_rigid
  10. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  11. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. right: pull_object:crate#1
  13. right: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  14. up: walk
  15. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  16. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#BS...G.#
#C..M@..#
#..G.#L.#
#C.##.P.#
#########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_743011_957

- score=366.0 cost=14 walkSteps=7 explored=78 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=1 firstBoxStickyShift=1 firstMaterial=2
- inputs=right down left left up up right up right down up right right down
- events=pull_object:push_pull_anchor force_chain:n5 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n1 pull_object:crate#1 pull_object:crate#1 walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3
- stepEvents=
  1. right: pull_object:push_pull_anchor force_chain:n5 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  2. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n1
  3. left: pull_object:crate#1
  4. left: pull_object:crate#1
  5. up: walk
  6. up: walk
  7. right: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  8. up: walk
  9. right: walk
  10. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. up: walk
  12. right: walk
  13. right: walk
  14. down: push_object:sticky#1 move_sticky_rigid sticky_to_box:n3

```text
##########
##S......#
#PBCCC..##
#L@.G.G..#
#..GC....#
##########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_743011_2671

- score=362.0 cost=15 walkSteps=7 explored=2024 probe=found bypass=true missing=material_normalization
- firstPushPullShift=4 firstBoxStickyShift=5 firstMaterial=10
- inputs=up right right left down left up up right right right down down left left
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 push_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
- stepEvents=
  1. up: walk
  2. right: walk
  3. right: walk
  4. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  6. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. up: walk
  8. up: walk
  9. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  10. right: pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  11. right: push_object:crate#2
  12. down: walk
  13. down: walk
  14. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
##########
#..MM....#
#.M.SBCG.#
#.....LP.#
#GM@.....#
##########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_743011_2257

- score=356.0 cost=15 walkSteps=8 explored=832 probe=found bypass=true missing=material_normalization
- firstPushPullShift=4 firstBoxStickyShift=4 firstMaterial=14
- inputs=up left down up right up left left left down right left down right right
- events=walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1
- stepEvents=
  1. up: walk
  2. left: walk
  3. down: walk
  4. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  5. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. up: walk
  7. left: pull_object:sticky#1 move_sticky_rigid
  8. left: pull_object:sticky#1 move_sticky_rigid
  9. left: walk
  10. down: walk
  11. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. left: walk
  13. down: walk
  14. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  15. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1

```text
##########
#....M...#
#..GG..M.#
#PL.@MMG.#
#.BS#....#
##########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_743011_2667

- score=356.0 cost=15 walkSteps=8 explored=88 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=1 firstBoxStickyShift=9 firstMaterial=9
- inputs=left down down right down left up up right right right up left left down
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. down: walk
  3. down: walk
  4. right: walk
  5. down: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  6. left: walk
  7. up: walk
  8. up: walk
  9. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  10. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. right: walk
  12. up: walk
  13. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  15. down: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
########
#GM.@LP#
#BS.M..#
#C#..M##
#....G.#
########
```

### 7. RA_SOFT_INTERLOCK_SEARCH_743011_1870

- score=354.0 cost=16 walkSteps=7 explored=313 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=5 firstMaterial=16
- inputs=up right right down up left left down left up down right right right up left
- events=pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
- stepEvents=
  1. up: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  2. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  3. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  4. down: walk
  5. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  6. left: walk
  7. left: walk
  8. down: push_object:sticky#1 move_sticky_rigid
  9. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. up: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  11. down: push_object:sticky#1 move_sticky_rigid
  12. right: walk
  13. right: walk
  14. right: walk
  15. up: walk
  16. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
#########
#G.PC...#
#M@L.G..#
#GMSBC.##
#########
```

### 8. RA_SOFT_INTERLOCK_SEARCH_743011_1531

- score=344.0 cost=18 walkSteps=8 explored=2195 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization,sticky_rigid_move
- firstPushPullShift=3 firstBoxStickyShift=10 firstMaterial=10
- inputs=up up left left down down left left left right right up up down left up right down
- events=walk push_object:crate#3 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. up: walk
  2. up: push_object:crate#3
  3. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. down: walk
  6. down: walk
  7. left: walk
  8. left: walk
  9. left: walk
  10. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  11. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  12. up: walk
  13. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. down: walk
  15. left: push_object:crate#2 box_to_sticky:n1 sticky_merge:n1
  16. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  17. right: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
  18. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
##..G..#.#
#.CC.GLPC#
##.GC..#.#
#SB.....@#
##########
```

### 9. RA_SOFT_INTERLOCK_SEARCH_743011_2768

- score=338.0 cost=18 walkSteps=7 explored=12635 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=5 firstMaterial=12
- inputs=down right down right left left left up up right down up left left down right left left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:crate#1 push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. down: walk
  2. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. down: pull_object:crate#2
  4. right: walk
  5. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  6. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. up: walk
  9. up: walk
  10. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  11. down: walk
  12. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  13. left: walk
  14. left: push_object:crate#1
  15. down: push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
  16. right: walk
  17. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  18. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#.CP@C..#
#.CL....#
#GC....B#
#G.#...S#
#########
```

### 10. RA_SOFT_INTERLOCK_SEARCH_743011_1371

- score=334.0 cost=12 walkSteps=2 explored=167 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- firstPushPullShift=2 firstBoxStickyShift=7 firstMaterial=9
- inputs=down up right down right right up up left left left left
- events=walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#3 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. down: walk
  2. up: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  3. right: pull_object:sticky#1 move_sticky_rigid
  4. down: walk
  5. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  8. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  9. left: pull_object:crate#1 box_to_sticky:n1
  10. left: pull_object:sticky#3 move_sticky_rigid
  11. left: push_object:sticky#1 move_sticky_rigid
  12. left: push_object:sticky#1 move_sticky_rigid

```text
#########
#G......#
#GM@.#..#
#.M.G..C#
#.PLMMSB#
#########
```

### 11. RA_SOFT_INTERLOCK_SEARCH_743011_2303

- score=334.0 cost=20 walkSteps=7 explored=3144 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=1 firstBoxStickyShift=5 firstMaterial=5
- inputs=right right down right up left up left left down down right left up right down right left left up
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#3 pull_object:crate#3 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
- stepEvents=
  1. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. down: walk
  4. right: walk
  5. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  6. left: walk
  7. up: walk
  8. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  9. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  10. down: pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2
  11. down: pull_object:crate#2
  12. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. left: walk
  14. up: push_object:crate#3
  15. right: pull_object:crate#3
  16. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  17. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. left: walk
  19. left: walk
  20. up: push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1

```text
########
#.GMM..#
#M...S.#
#L@..B.#
#P...G.#
########
```

### 12. RA_SOFT_INTERLOCK_SEARCH_743011_2904

- score=332.0 cost=16 walkSteps=5 explored=6340 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=2 firstBoxStickyShift=4 firstMaterial=8
- inputs=down right right right right up up left down left left down left up up right
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 walk walk walk pull_object:crate#1
- stepEvents=
  1. down: walk
  2. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  5. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  6. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  8. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  9. down: walk
  10. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  11. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. down: pull_object:crate#2
  13. left: walk
  14. up: walk
  15. up: walk
  16. right: pull_object:crate#1

```text
#########
#CGC#.G.#
#.@....M#
#L......#
#P..BS..#
#########
```

### 13. RA_SOFT_INTERLOCK_SEARCH_743011_295

- score=326.0 cost=18 walkSteps=9 explored=7830 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- firstPushPullShift=4 firstBoxStickyShift=8 firstMaterial=7
- inputs=down down left up right right right down left up left up left down down right down left
- events=walk walk push_object:sticky#3 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:sticky#6 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#5 force_chain:n3 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk walk walk push_object:sticky#2 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#3 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. down: walk
  2. down: walk
  3. left: push_object:sticky#3 move_sticky_rigid
  4. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: walk
  6. right: walk
  7. right: push_object:sticky#6 move_sticky_rigid sticky_to_box:n1
  8. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. left: push_object:sticky#5 force_chain:n3 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1
  10. up: walk
  11. left: walk
  12. up: walk
  13. left: push_object:sticky#2 move_sticky_rigid
  14. down: walk
  15. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. right: push_object:sticky#3 move_sticky_rigid
  17. down: walk
  18. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.GM@M..#
#M....M.#
#..M.MSB#
#G.LP#..#
#########
```

### 14. RA_SOFT_INTERLOCK_SEARCH_743011_357

- score=324.0 cost=13 walkSteps=5 explored=122 probe=found bypass=true missing=material_normalization
- firstPushPullShift=3 firstBoxStickyShift=4 firstMaterial=5
- inputs=right right left down right right up up left down right right down
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#3 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 move_sticky_rigid
- stepEvents=
  1. right: walk
  2. right: walk
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. right: pull_object:crate#3 box_to_sticky:n1
  6. right: pull_object:sticky#1 move_sticky_rigid
  7. up: walk
  8. up: walk
  9. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  10. down: walk
  11. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. down: pull_object:sticky#2 move_sticky_rigid

```text
##########
#C#CBS.PM#
#..G@..LG#
##..C.G..#
##########
```

### 15. RA_SOFT_INTERLOCK_SEARCH_743011_1798

- score=322.0 cost=15 walkSteps=8 explored=512 probe=found bypass=true missing=material_normalization
- firstPushPullShift=4 firstBoxStickyShift=10 firstMaterial=10
- inputs=down left down up left down down right right right up left up left down
- events=walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:crate#1 walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_to_box:n1 push_object:crate#3 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. down: walk
  2. left: walk
  3. down: walk
  4. up: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  5. left: pull_object:crate#1
  6. down: walk
  7. down: walk
  8. right: walk
  9. right: walk
  10. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_to_box:n1
  11. up: push_object:crate#3
  12. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. up: walk
  14. left: push_object:crate#1
  15. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..@.##.#
#....M.##
#..CC...#
#GLPBSMG#
#########
```

### 16. RA_SOFT_INTERLOCK_SEARCH_743011_3400

- score=316.0 cost=12 walkSteps=5 explored=911 probe=found bypass=true missing=pull_event,material_normalization
- firstPushPullShift=2 firstBoxStickyShift=7 firstMaterial=6
- inputs=up left left left right down left down left down left right
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk pull_object:crate#2
- stepEvents=
  1. up: walk
  2. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: walk
  6. down: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  7. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  8. down: walk
  9. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  10. down: walk
  11. left: walk
  12. right: pull_object:crate#2

```text
#########
#....LP.#
#..MSM.@#
#.G.B...#
#CG.C#..#
#########
```

### 17. RA_SOFT_INTERLOCK_SEARCH_743011_1931

- score=312.0 cost=17 walkSteps=9 explored=3409 probe=found bypass=true missing=material_normalization,sticky_rigid_move
- firstPushPullShift=3 firstBoxStickyShift=10 firstMaterial=13
- inputs=up right up down right up right down down left left up right up left down right
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#2 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#2 box_to_sticky:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. right: walk
  3. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. down: walk
  5. right: walk
  6. up: pull_object:crate#2
  7. right: walk
  8. down: walk
  9. down: walk
  10. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. up: walk
  13. right: push_object:crate#2 box_to_sticky:n1
  14. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  15. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  16. down: walk
  17. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.G.....#
#CPL...M#
#...GG#.#
#@.C.BS##
#########
```

### 18. RA_SOFT_INTERLOCK_SEARCH_743011_1474

- score=310.0 cost=12 walkSteps=2 explored=286 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=1 firstBoxStickyShift=6 firstMaterial=7
- inputs=right right up right right down left left up left left left
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 pull_object:crate#2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#3 walk pull_object:crate#2 pull_object:crate#2 pull_object:crate#2
- stepEvents=
  1. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. up: walk
  4. right: pull_object:crate#2
  5. right: pull_object:crate#2
  6. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  8. left: pull_object:crate#3
  9. up: walk
  10. left: pull_object:crate#2
  11. left: pull_object:crate#2
  12. left: pull_object:crate#2

```text
#########
#.#.C.BS#
#.GC....#
#L@..G.M#
#P..##..#
#########
```

### 19. RA_SOFT_INTERLOCK_SEARCH_743011_316

- score=308.0 cost=14 walkSteps=7 explored=893 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=1 firstBoxStickyShift=3 firstMaterial=8
- inputs=left down right right right up right down left down right left left left
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#2 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. down: walk
  3. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  4. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. right: push_object:sticky#2 move_sticky_rigid
  6. up: walk
  7. right: walk
  8. down: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  9. left: walk
  10. down: walk
  11. right: push_object:crate#2
  12. left: walk
  13. left: walk
  14. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#M..@LP..#
##SG..M.##
#CB.....G#
##########
```

### 20. RA_SOFT_INTERLOCK_SEARCH_743011_3102

- score=302.0 cost=16 walkSteps=8 explored=3879 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=2 firstBoxStickyShift=7 firstMaterial=12
- inputs=up right right left up up right down down up up right right down right down
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: walk
  5. up: walk
  6. up: walk
  7. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. down: push_object:sticky#2 move_sticky_rigid
  9. down: push_object:sticky#2 move_sticky_rigid
  10. up: walk
  11. up: walk
  12. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  13. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. down: walk
  15. right: walk
  16. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#...SB...#
#...M#..G#
#M.PLG...#
#.@.G.C.C#
##########
```

### 21. RA_SOFT_INTERLOCK_SEARCH_743011_2156

- score=292.0 cost=14 walkSteps=7 explored=314 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=10 firstBoxStickyShift=10 firstMaterial=10
- inputs=left left down left up right down left down right left up left up
- events=pull_object:crate#1 pull_object:crate#1 walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#2 move_sticky_rigid walk pull_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. left: pull_object:crate#1
  2. left: pull_object:crate#1
  3. down: walk
  4. left: walk
  5. up: walk
  6. right: pull_object:sticky#1 move_sticky_rigid
  7. down: walk
  8. left: walk
  9. down: pull_object:sticky#2 move_sticky_rigid
  10. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1
  11. left: walk
  12. up: push_object:sticky#2 move_sticky_rigid
  13. left: walk
  14. up: pull_object:sticky#1 move_sticky_rigid

```text
##########
#M...@C..#
#G...LG..#
#M.SBP...#
##########
```

### 22. RA_SOFT_INTERLOCK_SEARCH_743011_2645

- score=292.0 cost=14 walkSteps=7 explored=1156 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=9 firstBoxStickyShift=2 firstMaterial=3
- inputs=up right down right up right right up left left up left down down
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. up: walk
  2. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  3. down: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  4. right: walk
  5. up: walk
  6. right: pull_object:crate#1
  7. right: walk
  8. up: walk
  9. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  11. up: walk
  12. left: walk
  13. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#.....M..#
#S.MLP..M#
#B..G....#
#.@G.#..C#
##########
```

### 23. RA_SOFT_INTERLOCK_SEARCH_743011_345

- score=288.0 cost=20 walkSteps=9 explored=1694 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=4 firstBoxStickyShift=8 firstMaterial=5
- inputs=down right right right right up up left down right left left down right up right right left left left
- events=walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n3 walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
- stepEvents=
  1. down: walk
  2. right: push_object:sticky#2 move_sticky_rigid
  3. right: push_object:sticky#2 move_sticky_rigid
  4. right: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  5. right: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1
  6. up: walk
  7. up: walk
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n3
  9. down: walk
  10. right: walk
  11. left: pull_object:crate#1 box_to_sticky:n1
  12. left: pull_object:sticky#2 move_sticky_rigid
  13. down: walk
  14. right: walk
  15. up: push_object:sticky#2 move_sticky_rigid
  16. right: walk
  17. right: walk
  18. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1
  19. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  20. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
##########
#...#..SB#
#.@M..L..#
#M.MGGP..#
#..MM...G#
##########
```

### 24. RA_SOFT_INTERLOCK_SEARCH_743011_354

- score=270.0 cost=14 walkSteps=7 explored=321 probe=found bypass=true missing=material_normalization
- firstPushPullShift=1 firstBoxStickyShift=6 firstMaterial=10
- inputs=left left down right right right down right right up left up left down
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 force_chain:n3 anchor_boundary_shift:box_sticky walk walk push_object:crate#5 push_object:crate#2 box_to_sticky:n1 push_object:crate#1 walk walk push_object:crate#1
- stepEvents=
  1. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. down: walk
  4. right: walk
  5. right: walk
  6. right: push_object:crate#1 force_chain:n3 anchor_boundary_shift:box_sticky
  7. down: walk
  8. right: walk
  9. right: push_object:crate#5
  10. up: push_object:crate#2 box_to_sticky:n1
  11. left: push_object:crate#1
  12. up: walk
  13. left: walk
  14. down: push_object:crate#1

```text
#########
#..@LPSG#
#...CCB.#
#C.CG.CG#
#########
```

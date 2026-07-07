# Soft Interlock Search

- seed: 993104
- iterations: 12000
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 38
- costRange: 16-30
- wallRate: 0.18
- hits: 2
- solverHits: 20

## 1. RA_SOFT_INTERLOCK_SEARCH_993104_1887

- score=460.8 cost=18 walkSteps=7 explored=114 graphStates=115 winStates=1 probeStates=167 scc=branching_win_dag
- firstPushPullShift=3 firstBoxStickyShift=8 firstMaterial=18
- inputs=down right down up left left down right right left up up left left down down left down
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n3
- stepEvents=
  1. down: walk
  2. right: walk
  3. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: walk
  5. left: walk
  6. left: walk
  7. down: pull_object:sticky#2 move_sticky_rigid
  8. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  9. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  10. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. up: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  13. left: pull_object:sticky#2 move_sticky_rigid
  14. left: pull_object:sticky#2 move_sticky_rigid
  15. down: walk
  16. down: walk
  17. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  18. down: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n3

```text
#########
#..M.M@.#
#MMMS..G#
#G..B.LP#
##C.##..#
#########
```

## 2. RA_SOFT_INTERLOCK_SEARCH_993104_4361

- score=350.7 cost=20 walkSteps=10 explored=419 graphStates=653 winStates=38 probeStates=688 scc=branching_win_dag
- firstPushPullShift=5 firstBoxStickyShift=8 firstMaterial=8
- inputs=right down down down left right up left up down down right up right down up left left down right
- events=pull_object:crate#1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk pull_object:crate#1 pull_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#2 box_to_sticky:n1
- stepEvents=
  1. right: pull_object:crate#1
  2. down: walk
  3. down: walk
  4. down: walk
  5. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. right: walk
  7. up: walk
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  9. up: walk
  10. down: pull_object:crate#1
  11. down: pull_object:crate#1
  12. right: walk
  13. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. right: pull_object:crate#2
  15. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  16. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. left: walk
  18. left: walk
  19. down: walk
  20. right: push_object:crate#2 box_to_sticky:n1

```text
##########
#.##C@.CM#
##..#...##
#C.#GL.BS#
#....P.G.#
##########
```

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_993104_1887

- score=304.0 cost=18 walkSteps=7 explored=114 probe=complete bypass=false missing=n/a
- firstPushPullShift=3 firstBoxStickyShift=8 firstMaterial=18
- inputs=down right down up left left down right right left up up left left down down left down
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n3
- stepEvents=
  1. down: walk
  2. right: walk
  3. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: walk
  5. left: walk
  6. left: walk
  7. down: pull_object:sticky#2 move_sticky_rigid
  8. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  9. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  10. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. up: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  13. left: pull_object:sticky#2 move_sticky_rigid
  14. left: pull_object:sticky#2 move_sticky_rigid
  15. down: walk
  16. down: walk
  17. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  18. down: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n3

```text
#########
#..M.M@.#
#MMMS..G#
#G..B.LP#
##C.##..#
#########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_993104_9777

- score=300.0 cost=17 walkSteps=9 explored=2348 probe=found bypass=true missing=material_normalization
- firstPushPullShift=1 firstBoxStickyShift=2 firstMaterial=17
- inputs=left down right down right up left up right down left left up left left down right
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  3. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. down: walk
  5. right: push_object:crate#2
  6. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. left: walk
  8. up: walk
  9. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  10. down: walk
  11. left: walk
  12. left: walk
  13. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. left: walk
  15. left: walk
  16. down: walk
  17. right: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1

```text
##########
#..SB....#
##.M.@LCG#
#...G.P#.#
#M..#.CG.#
##########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_993104_5661

- score=298.0 cost=18 walkSteps=8 explored=221 probe=found bypass=true missing=material_normalization
- firstPushPullShift=9 firstBoxStickyShift=2 firstMaterial=18
- inputs=right down down left up left up left up right right right down down left up left right
- events=pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. right: pull_object:sticky#2 move_sticky_rigid
  2. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  3. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  4. left: push_object:sticky#2 move_sticky_rigid
  5. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  6. left: walk
  7. up: pull_object:sticky#2 move_sticky_rigid
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. right: walk
  11. right: walk
  12. right: walk
  13. down: walk
  14. down: walk
  15. left: walk
  16. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. left: walk
  18. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1

```text
#######
#..GSB#
#M.M@.#
#.L.G.#
##P...#
#######
```

### 4. RA_SOFT_INTERLOCK_SEARCH_993104_1128

- score=296.0 cost=19 walkSteps=7 explored=2623 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=6 firstBoxStickyShift=16 firstMaterial=9
- inputs=left left left up left right right up up left down left down down right right up up down
- events=push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk pull_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid walk walk pull_object:crate#1
- stepEvents=
  1. left: push_object:sticky#1 move_sticky_rigid
  2. left: push_object:sticky#1 move_sticky_rigid
  3. left: push_object:sticky#1 move_sticky_rigid
  4. up: walk
  5. left: walk
  6. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  7. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  8. up: pull_object:sticky#1 move_sticky_rigid
  9. up: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  10. left: pull_object:crate#1
  11. down: walk
  12. left: pull_object:crate#2
  13. down: walk
  14. down: walk
  15. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. right: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  17. up: walk
  18. up: walk
  19. down: pull_object:crate#1

```text
#########
#.#..C..#
#..GGB.C#
#L...SMG#
#P...M@##
#########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_993104_1110

- score=294.0 cost=20 walkSteps=9 explored=923 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- firstPushPullShift=15 firstBoxStickyShift=7 firstMaterial=3
- inputs=left right right up up left down left down left left up left up right right right up right down
- events=walk pull_object:sticky#3 move_sticky_rigid pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#3 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. left: walk
  2. right: pull_object:sticky#3 move_sticky_rigid
  3. right: pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1
  4. up: walk
  5. up: walk
  6. left: walk
  7. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. left: walk
  9. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. left: pull_object:crate#1 box_to_sticky:n1
  11. left: pull_object:sticky#3 move_sticky_rigid
  12. up: walk
  13. left: walk
  14. up: push_object:sticky#1 move_sticky_rigid sticky_merge:n1
  15. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. up: walk
  19. right: walk
  20. down: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
##.M.SB##
#.MPL...#
#...#..G#
##..MG@.#
#########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_993104_9954

- score=278.0 cost=22 walkSteps=9 explored=885 probe=found bypass=true missing=material_normalization,sticky_rigid_move
- firstPushPullShift=5 firstBoxStickyShift=10 firstMaterial=2
- inputs=right down left down up up left down down right down right right up left up up left left down right up
- events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:crate#1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid walk push_object:sticky#2 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:crate#1 push_object:crate#1 walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: walk
  2. down: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  3. left: walk
  4. down: walk
  5. up: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
  6. up: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  7. left: pull_object:crate#1
  8. down: walk
  9. down: walk
  10. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: pull_object:sticky#1 move_sticky_rigid
  13. right: walk
  14. up: push_object:sticky#2 force_chain:n2 move_sticky_rigid sticky_to_box:n1
  15. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  16. up: walk
  17. up: walk
  18. left: push_object:crate#1
  19. left: push_object:crate#1
  20. down: walk
  21. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  22. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
#G.@..#
#B.GC.#
#SG..M#
#.MLPM#
#######
```

### 7. RA_SOFT_INTERLOCK_SEARCH_993104_7840

- score=270.0 cost=16 walkSteps=7 explored=1030 probe=found bypass=true missing=material_normalization
- firstPushPullShift=2 firstBoxStickyShift=9 firstMaterial=16
- inputs=up right right left down left right right up left down left left up right right
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#1 pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 push_object:crate#1 box_to_sticky:n1
- stepEvents=
  1. up: walk
  2. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: walk
  5. down: walk
  6. left: walk
  7. right: pull_object:crate#1
  8. right: pull_object:crate#1
  9. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  10. left: push_object:crate#1
  11. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. left: walk
  13. left: walk
  14. up: walk
  15. right: push_object:crate#1
  16. right: push_object:crate#1 box_to_sticky:n1

```text
##########
#...PG..##
#.C@L.G.M#
#...BS...#
#C#.#..#.#
##########
```

### 8. RA_SOFT_INTERLOCK_SEARCH_993104_9932

- score=268.0 cost=23 walkSteps=12 explored=32491 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=11 firstBoxStickyShift=9 firstMaterial=19
- inputs=up up down down left up left left down left left up up up right right right left left left down left left
- events=walk walk pull_object:crate#2 pull_object:crate#2 walk walk pull_object:crate#2 pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid
- stepEvents=
  1. up: walk
  2. up: walk
  3. down: pull_object:crate#2
  4. down: pull_object:crate#2
  5. left: walk
  6. up: walk
  7. left: pull_object:crate#2
  8. left: pull_object:crate#2
  9. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  10. left: walk
  11. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. up: walk
  13. up: walk
  14. up: walk
  15. right: walk
  16. right: walk
  17. right: walk
  18. left: pull_object:crate#1
  19. left: pull_object:crate#1 box_to_sticky:n1
  20. left: pull_object:sticky#3 move_sticky_rigid sticky_merge:n1
  21. down: walk
  22. left: pull_object:sticky#2 move_sticky_rigid
  23. left: pull_object:sticky#2 move_sticky_rigid

```text
##########
##G....CC#
#...MSB..#
#M.L.....#
#.GP..G.@#
##########
```

### 9. RA_SOFT_INTERLOCK_SEARCH_993104_11904

- score=268.0 cost=19 walkSteps=9 explored=7274 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=7 firstBoxStickyShift=2 firstMaterial=2
- inputs=left down left left left up right right left left up right up right down down up right down
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:crate#2 push_object:crate#3 force_chain:n2 walk walk push_object:crate#3 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid walk push_object:crate#3 push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  3. left: walk
  4. left: walk
  5. left: walk
  6. up: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  7. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  8. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  9. left: walk
  10. left: walk
  11. up: push_object:crate#2
  12. right: push_object:crate#3 force_chain:n2
  13. up: walk
  14. right: walk
  15. down: push_object:crate#3 box_to_sticky:n1
  16. down: push_object:sticky#1 move_sticky_rigid
  17. up: walk
  18. right: push_object:crate#3
  19. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#...B#.C#
#.MMSG..#
#MPL.@..#
#..G.G.##
#########
```

### 10. RA_SOFT_INTERLOCK_SEARCH_993104_4361

- score=254.0 cost=20 walkSteps=10 explored=419 probe=complete bypass=false missing=n/a
- firstPushPullShift=5 firstBoxStickyShift=8 firstMaterial=8
- inputs=right down down down left right up left up down down right up right down up left left down right
- events=pull_object:crate#1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk pull_object:crate#1 pull_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#2 box_to_sticky:n1
- stepEvents=
  1. right: pull_object:crate#1
  2. down: walk
  3. down: walk
  4. down: walk
  5. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. right: walk
  7. up: walk
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  9. up: walk
  10. down: pull_object:crate#1
  11. down: pull_object:crate#1
  12. right: walk
  13. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. right: pull_object:crate#2
  15. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  16. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. left: walk
  18. left: walk
  19. down: walk
  20. right: push_object:crate#2 box_to_sticky:n1

```text
##########
#.##C@.CM#
##..#...##
#C.#GL.BS#
#....P.G.#
##########
```

### 11. RA_SOFT_INTERLOCK_SEARCH_993104_1108

- score=240.0 cost=17 walkSteps=6 explored=11198 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=13 firstBoxStickyShift=1 firstMaterial=1
- inputs=left up up right right up right right left down down right left left left up left
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:crate#2 walk push_object:crate#1 push_object:crate#1 walk push_object:crate#2 push_object:crate#2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  2. up: walk
  3. up: walk
  4. right: walk
  5. right: push_object:crate#2
  6. up: walk
  7. right: push_object:crate#1
  8. right: push_object:crate#1
  9. left: walk
  10. down: push_object:crate#2
  11. down: push_object:crate#2
  12. right: walk
  13. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  17. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..G.C.G#
##..M..P#
#..G...L#
#..@SBC.#
#########
```

### 12. RA_SOFT_INTERLOCK_SEARCH_993104_8023

- score=238.0 cost=22 walkSteps=10 explored=2304 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=6 firstBoxStickyShift=6 firstMaterial=2
- inputs=left left left down down right down right right up left right up left down down left left up right right right
- events=pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#3 move_sticky_rigid walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk push_object:sticky#4 move_sticky_rigid push_object:sticky#4 move_sticky_rigid sticky_to_box:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#2 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: pull_object:crate#1
  2. left: pull_object:crate#1 box_to_sticky:n1
  3. left: pull_object:sticky#3 move_sticky_rigid
  4. down: walk
  5. down: walk
  6. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  7. down: walk
  8. right: push_object:sticky#4 move_sticky_rigid
  9. right: push_object:sticky#4 move_sticky_rigid sticky_to_box:n1
  10. up: walk
  11. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: walk
  13. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. left: walk
  15. down: walk
  16. down: walk
  17. left: walk
  18. left: push_object:sticky#2 move_sticky_rigid
  19. up: walk
  20. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  21. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  22. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#...G.@C#
#M#.LSB.#
###.P..G#
#..M.M..#
#########
```

### 13. RA_SOFT_INTERLOCK_SEARCH_993104_8200

- score=232.0 cost=22 walkSteps=9 explored=716 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=7 firstBoxStickyShift=2 firstMaterial=2
- inputs=right up left down down left up left up right right down right right up left left down down left left down
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: walk
  2. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  3. left: walk
  4. down: walk
  5. down: walk
  6. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  9. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. right: pull_object:sticky#1 move_sticky_rigid
  11. right: pull_object:sticky#1 move_sticky_rigid
  12. down: walk
  13. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. up: pull_object:crate#1 box_to_sticky:n1
  16. left: walk
  17. left: walk
  18. down: walk
  19. down: walk
  20. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  21. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  22. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#M.G...##
#...@..##
#G...SMM#
#CPL#B..#
#########
```

### 14. RA_SOFT_INTERLOCK_SEARCH_993104_8267

- score=222.0 cost=22 walkSteps=7 explored=249 probe=found bypass=true missing=material_normalization
- firstPushPullShift=7 firstBoxStickyShift=11 firstMaterial=22
- inputs=up left left left down up left left down down up up right down left up right down right down right right
- events=pull_object:crate#3 walk walk walk walk pull_object:crate#3 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 force_chain:n2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
- stepEvents=
  1. up: pull_object:crate#3
  2. left: walk
  3. left: walk
  4. left: walk
  5. down: walk
  6. up: pull_object:crate#3
  7. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. down: walk
  10. down: walk
  11. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  12. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  13. right: push_object:crate#1
  14. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. left: pull_object:crate#2
  16. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  17. right: push_object:crate#1 force_chain:n2
  18. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  19. right: walk
  20. down: pull_object:crate#1
  21. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  22. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
#########
#..P.G..#
#G.L.##@#
##.CCG.C#
#.SB#C..#
#########
```

### 15. RA_SOFT_INTERLOCK_SEARCH_993104_3520

- score=210.0 cost=26 walkSteps=14 explored=400 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=4 firstBoxStickyShift=22 firstMaterial=11
- inputs=up right right right left down right down right right right up up left left left down down right left down left up right up up
- events=walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#2 walk walk pull_object:crate#3 pull_object:crate#3 pull_object:crate#3 box_to_sticky:n1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. up: walk
  2. right: walk
  3. right: walk
  4. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. left: walk
  6. down: push_object:crate#2
  7. right: walk
  8. down: walk
  9. right: pull_object:crate#3
  10. right: pull_object:crate#3
  11. right: pull_object:crate#3 box_to_sticky:n1
  12. up: walk
  13. up: walk
  14. left: walk
  15. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. down: walk
  18. down: walk
  19. right: walk
  20. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  21. down: walk
  22. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  23. up: walk
  24. right: pull_object:crate#2
  25. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  26. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#C..GPG..#
#.@#CL.#.#
#.#C.....#
#.##..BS.#
##########
```

### 16. RA_SOFT_INTERLOCK_SEARCH_993104_3475

- score=206.0 cost=19 walkSteps=9 explored=2394 probe=found bypass=true missing=material_normalization
- firstPushPullShift=16 firstBoxStickyShift=1 firstMaterial=1
- inputs=up right down right right right right right down left up left down left left up right right right
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:crate#1 walk walk push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  2. right: walk
  3. down: walk
  4. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  6. right: walk
  7. right: walk
  8. right: walk
  9. down: walk
  10. left: push_object:crate#1
  11. up: walk
  12. left: walk
  13. down: push_object:crate#1
  14. left: walk
  15. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  18. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  19. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#....#MM#
#@......#
#S....MG#
#B#LPG.C#
#########
```

### 17. RA_SOFT_INTERLOCK_SEARCH_993104_4803

- score=198.0 cost=26 walkSteps=14 explored=7314 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization,sticky_rigid_move
- firstPushPullShift=7 firstBoxStickyShift=23 firstMaterial=25
- inputs=down right right left left up right right down down up up right down right down right down right up left up left down right down
- events=walk walk walk pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 push_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#2 walk walk pull_object:crate#3 walk walk pull_object:crate#3 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#2 box_to_sticky:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. down: walk
  2. right: walk
  3. right: walk
  4. left: pull_object:crate#1
  5. left: walk
  6. up: walk
  7. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. down: push_object:crate#1
  10. down: push_object:crate#2
  11. up: walk
  12. up: walk
  13. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. down: walk
  15. right: walk
  16. down: push_object:crate#2
  17. right: walk
  18. down: walk
  19. right: pull_object:crate#3
  20. up: walk
  21. left: walk
  22. up: pull_object:crate#3
  23. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  24. down: walk
  25. right: push_object:crate#2 box_to_sticky:n1
  26. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#@PL....##
#...C..BS#
#C..#CG.##
##.G...G##
##########
```

### 18. RA_SOFT_INTERLOCK_SEARCH_993104_5883

- score=198.0 cost=26 walkSteps=14 explored=9628 probe=found bypass=true missing=material_normalization
- firstPushPullShift=7 firstBoxStickyShift=16 firstMaterial=19
- inputs=right up right right up right right left down right up left down left left down right up right up left down left up right down
- events=walk walk walk walk pull_object:sticky#2 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. right: walk
  2. up: walk
  3. right: walk
  4. right: walk
  5. up: pull_object:sticky#2 move_sticky_rigid
  6. right: walk
  7. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. left: walk
  9. down: walk
  10. right: pull_object:sticky#2 move_sticky_rigid
  11. up: walk
  12. left: walk
  13. down: push_object:sticky#2 move_sticky_rigid
  14. left: walk
  15. left: walk
  16. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. right: walk
  18. up: walk
  19. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  20. up: pull_object:sticky#1 move_sticky_rigid
  21. left: walk
  22. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  23. left: pull_object:sticky#1 move_sticky_rigid
  24. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  25. right: push_object:sticky#1 move_sticky_rigid
  26. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.BS.GPG#
##....L.#
#@.GM...#
#..M..###
#########
```

### 19. RA_SOFT_INTERLOCK_SEARCH_993104_8566

- score=198.0 cost=24 walkSteps=12 explored=3175 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=21 firstBoxStickyShift=1 firstMaterial=16
- inputs=down right right right up up left left right down right down left right right up left up left left down right right down
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky push_object:crate#1 push_object:crate#1 walk push_object:crate#2 walk push_object:crate#3 push_object:crate#1 box_to_sticky:n1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  2. right: walk
  3. right: walk
  4. right: walk
  5. up: walk
  6. up: walk
  7. left: walk
  8. left: walk
  9. right: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky
  10. down: push_object:crate#1
  11. right: push_object:crate#1
  12. down: walk
  13. left: push_object:crate#2
  14. right: walk
  15. right: push_object:crate#3
  16. up: push_object:crate#1 box_to_sticky:n1
  17. left: walk
  18. up: walk
  19. left: walk
  20. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  21. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  22. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  23. right: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  24. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#SLP.#.#
#B....G#
#@CC.G##
#.G..C.#
########
```

### 20. RA_SOFT_INTERLOCK_SEARCH_993104_8682

- score=136.0 cost=26 walkSteps=14 explored=1094 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- firstPushPullShift=12 firstBoxStickyShift=16 firstMaterial=18
- inputs=right right up right down down left left left up left up down right down right right right up up up left left right right right
- events=pull_object:crate#1 pull_object:crate#1 pull_object:crate#2 walk walk walk walk walk walk walk pull_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: pull_object:crate#1
  2. right: pull_object:crate#1
  3. up: pull_object:crate#2
  4. right: walk
  5. down: walk
  6. down: walk
  7. left: walk
  8. left: walk
  9. left: walk
  10. up: walk
  11. left: pull_object:crate#1
  12. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. down: walk
  14. right: push_object:crate#1
  15. down: walk
  16. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  18. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  19. up: walk
  20. up: walk
  21. up: walk
  22. left: walk
  23. left: walk
  24. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  25. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  26. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##...GG.#
#.PL#...#
#MC@...##
#SB..C..#
#########
```

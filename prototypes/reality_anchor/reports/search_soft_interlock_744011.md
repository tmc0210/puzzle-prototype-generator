# Soft Interlock Search

- seed: 744011
- iterations: 2500
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 50
- costRange: 11-22
- wallRate: 0.13
- hits: 2
- solverHits: 10

## 1. RA_SOFT_INTERLOCK_SEARCH_744011_1694

- score=469.7 cost=20 walkSteps=9 explored=195 graphStates=198 winStates=2 probeStates=242 scc=branching_win_dag
- firstPushPullShift=8 firstBoxStickyShift=7 firstMaterial=7
- inputs=down down left up right up left left left down left left right down left down right right right right
- events=walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
- stepEvents=
  1. down: walk
  2. down: walk
  3. left: walk
  4. up: pull_object:sticky#1 move_sticky_rigid
  5. right: walk
  6. up: walk
  7. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  8. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  9. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  10. down: walk
  11. left: walk
  12. left: walk
  13. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  14. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. left: walk
  16. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. right: pull_object:crate#1
  18. right: pull_object:crate#1
  19. right: pull_object:crate#1 box_to_sticky:n1
  20. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
#########
#..P.BS@#
#..LG#..#
#...#C..#
#C...GM##
#########
```

## 2. RA_SOFT_INTERLOCK_SEARCH_744011_1649

- score=419.9 cost=20 walkSteps=10 explored=151 graphStates=206 winStates=22 probeStates=251 scc=branching_win_dag
- firstPushPullShift=2 firstBoxStickyShift=7 firstMaterial=7
- inputs=left left left right down right left left up right right right down right right up left left left left
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#3 push_object:crate#3 push_object:crate#3
- stepEvents=
  1. left: walk
  2. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  4. right: walk
  5. down: walk
  6. right: walk
  7. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. up: walk
  10. right: walk
  11. right: walk
  12. right: walk
  13. down: walk
  14. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  16. up: walk
  17. left: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  18. left: push_object:crate#3
  19. left: push_object:crate#3
  20. left: push_object:crate#3

```text
##########
#..#..C#M#
#.CGP.@M.#
#.G.L.BS.#
##########
```

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_744011_2382

- score=366.0 cost=16 walkSteps=7 explored=4511 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=4 firstBoxStickyShift=11 firstMaterial=9
- inputs=up up up left down right right down left down left up left up left left
- events=walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. up: walk
  2. up: walk
  3. up: walk
  4. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1
  5. down: walk
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. down: walk
  9. left: pull_object:crate#1 box_to_sticky:n1
  10. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  12. up: walk
  13. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. up: walk
  15. left: push_object:sticky#3 move_sticky_rigid sticky_merge:n1
  16. left: push_object:sticky#1 move_sticky_rigid

```text
##########
#.M..P..##
#...ML..##
#..M.G.GC#
#GM...@SB#
##########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_744011_2276

- score=358.0 cost=13 walkSteps=7 explored=802 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=4 firstBoxStickyShift=10 firstMaterial=8
- inputs=right up right down right up up left up left down left left
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. right: walk
  2. up: walk
  3. right: walk
  4. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: walk
  6. up: walk
  7. up: walk
  8. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1
  9. up: walk
  10. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  11. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. left: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  13. left: push_object:sticky#1 move_sticky_rigid

```text
##########
#.GSBP...#
#G..CL.C.#
#.M#.....#
#..@.....#
##########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_744011_2328

- score=342.0 cost=16 walkSteps=7 explored=5571 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=3 firstBoxStickyShift=8 firstMaterial=8
- inputs=right right left left down down down right right up up left left right up left
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. right: walk
  2. right: walk
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. down: walk
  6. down: walk
  7. down: walk
  8. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  9. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  10. up: push_object:sticky#1 move_sticky_rigid
  11. up: push_object:sticky#1 move_sticky_rigid
  12. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. right: walk
  15. up: walk
  16. left: pull_object:sticky#1 move_sticky_rigid

```text
#########
#.@G.L..#
#G...P..#
#...CCC.#
#..SB...#
#########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_744011_426

- score=308.0 cost=21 walkSteps=8 explored=30836 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=11 firstBoxStickyShift=11 firstMaterial=17
- inputs=left down left down left up left down left left right right right down right up down right up down right
- events=push_object:crate#2 walk walk pull_object:crate#2 walk walk pull_object:crate#2 pull_object:crate#1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. left: push_object:crate#2
  2. down: walk
  3. left: walk
  4. down: pull_object:crate#2
  5. left: walk
  6. up: walk
  7. left: pull_object:crate#2
  8. down: pull_object:crate#1
  9. left: walk
  10. left: walk
  11. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  12. right: pull_object:box_sticky_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  13. right: pull_object:box_sticky_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  14. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. right: pull_object:sticky#1 move_sticky_rigid
  16. up: walk
  17. down: pull_object:crate#1 box_to_sticky:n1
  18. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  19. up: walk
  20. down: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  21. right: pull_object:sticky#1 move_sticky_rigid

```text
##########
#.P.C..C@#
#BL.....##
#S...G..G#
#...M..G.#
##########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_744011_1047

- score=308.0 cost=11 walkSteps=5 explored=95 probe=found bypass=true missing=material_normalization
- firstPushPullShift=4 firstBoxStickyShift=4 firstMaterial=6
- inputs=right right down left up right right down down left left
- events=walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. right: walk
  2. right: walk
  3. down: walk
  4. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  5. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  6. right: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  7. right: pull_object:crate#1
  8. down: walk
  9. down: walk
  10. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1
  11. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
##########
#..@.G.#.#
#GMM..L..#
#...SBP..#
##########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_744011_1400

- score=282.0 cost=20 walkSteps=11 explored=4396 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=9 firstBoxStickyShift=8 firstMaterial=8
- inputs=up left right up left left left down right up left right down left up right down up left down
- events=walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 box_to_sticky:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. left: walk
  3. right: pull_object:sticky#1 move_sticky_rigid
  4. up: walk
  5. left: walk
  6. left: walk
  7. left: walk
  8. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  9. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. up: walk
  11. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: walk
  13. down: walk
  14. left: pull_object:sticky#1 move_sticky_rigid
  15. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  16. right: walk
  17. down: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1
  18. up: pull_object:crate#1 box_to_sticky:n1
  19. left: walk
  20. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#P.......#
#LSM...M.#
#.B.C@#..#
#.GG.#...#
##########
```

### 7. RA_SOFT_INTERLOCK_SEARCH_744011_1649

- score=282.0 cost=20 walkSteps=10 explored=151 probe=complete bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=7 firstMaterial=7
- inputs=left left left right down right left left up right right right down right right up left left left left
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#3 push_object:crate#3 push_object:crate#3
- stepEvents=
  1. left: walk
  2. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  4. right: walk
  5. down: walk
  6. right: walk
  7. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. up: walk
  10. right: walk
  11. right: walk
  12. right: walk
  13. down: walk
  14. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  16. up: walk
  17. left: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  18. left: push_object:crate#3
  19. left: push_object:crate#3
  20. left: push_object:crate#3

```text
##########
#..#..C#M#
#.CGP.@M.#
#.G.L.BS.#
##########
```

### 8. RA_SOFT_INTERLOCK_SEARCH_744011_1694

- score=282.0 cost=20 walkSteps=9 explored=195 probe=complete bypass=false missing=n/a
- firstPushPullShift=8 firstBoxStickyShift=7 firstMaterial=7
- inputs=down down left up right up left left left down left left right down left down right right right right
- events=walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
- stepEvents=
  1. down: walk
  2. down: walk
  3. left: walk
  4. up: pull_object:sticky#1 move_sticky_rigid
  5. right: walk
  6. up: walk
  7. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  8. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  9. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  10. down: walk
  11. left: walk
  12. left: walk
  13. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  14. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. left: walk
  16. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. right: pull_object:crate#1
  18. right: pull_object:crate#1
  19. right: pull_object:crate#1 box_to_sticky:n1
  20. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
#########
#..P.BS@#
#..LG#..#
#...#C..#
#C...GM##
#########
```

### 9. RA_SOFT_INTERLOCK_SEARCH_744011_1082

- score=260.0 cost=12 walkSteps=4 explored=356 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=4 firstBoxStickyShift=1 firstMaterial=12
- inputs=up left left up left down right right up right right right
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#3 pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1
- stepEvents=
  1. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  2. left: walk
  3. left: walk
  4. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. left: pull_object:crate#2
  6. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: walk
  8. right: walk
  9. up: pull_object:crate#3
  10. right: pull_object:crate#2
  11. right: pull_object:crate#2
  12. right: pull_object:crate#2 box_to_sticky:n1

```text
##########
#C..C.G..#
#...G....#
#.PLC@.M.#
#....BS###
##########
```

### 10. RA_SOFT_INTERLOCK_SEARCH_744011_514

- score=234.0 cost=19 walkSteps=9 explored=36031 probe=found bypass=true missing=material_normalization
- firstPushPullShift=1 firstBoxStickyShift=6 firstMaterial=6
- inputs=right right down left left left down down left up left up right right right right down right down
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk walk push_object:crate#1 push_object:crate#1 push_object:crate#1 push_object:crate#1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1
- stepEvents=
  1. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. down: walk
  4. left: walk
  5. left: walk
  6. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  7. down: walk
  8. down: walk
  9. left: walk
  10. up: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky
  11. left: walk
  12. up: walk
  13. right: push_object:crate#1
  14. right: push_object:crate#1
  15. right: push_object:crate#1
  16. right: push_object:crate#1
  17. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. right: walk
  19. down: pull_object:crate#1

```text
##########
###GPL@..#
#...SBG..#
#...M...G#
#..M.....#
##########
```

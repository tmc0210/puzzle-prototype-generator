# Soft Interlock Search

- seed: 744013
- iterations: 2500
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 50
- costRange: 11-22
- wallRate: 0.13
- hits: 2
- solverHits: 10

## 1. RA_SOFT_INTERLOCK_SEARCH_744013_1288

- score=502.5 cost=17 walkSteps=8 explored=136 graphStates=141 winStates=1 probeStates=170 scc=branching_win_dag
- firstPushPullShift=1 firstBoxStickyShift=13 firstMaterial=9
- inputs=right left down right up left down left right right up left left down left left down
- events=push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 walk walk push_object:crate#1 walk pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk pull_object:crate#1 pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
- stepEvents=
  1. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. left: walk
  3. down: walk
  4. right: pull_object:crate#1
  5. up: walk
  6. left: walk
  7. down: push_object:crate#1
  8. left: walk
  9. right: pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1
  10. right: pull_object:crate#1
  11. up: walk
  12. left: walk
  13. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1
  14. down: walk
  15. left: pull_object:crate#1
  16. left: pull_object:crate#1
  17. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
#########
#.MSB@P.#
#MGMC.L.#
#..G#..C#
#########
```

## 2. RA_SOFT_INTERLOCK_SEARCH_744013_2361

- score=246.7 cost=20 walkSteps=11 explored=235 graphStates=863 winStates=394 probeStates=877 scc=branching_win_dag
- firstPushPullShift=6 firstBoxStickyShift=17 firstMaterial=20
- inputs=down down down left left right right up left left up right down up left left down right down left
- events=walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 push_object:crate#2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
- stepEvents=
  1. down: walk
  2. down: walk
  3. down: walk
  4. left: walk
  5. left: walk
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. up: walk
  9. left: walk
  10. left: walk
  11. up: push_object:crate#1
  12. right: push_object:crate#2
  13. down: walk
  14. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: pull_object:crate#2
  16. left: walk
  17. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  18. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. down: walk
  20. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
########
#...G#@#
#MM.CC.#
##SB...#
#GPL...#
########
```

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_744013_1288

- score=340.0 cost=17 walkSteps=8 explored=136 probe=complete bypass=false missing=n/a
- firstPushPullShift=1 firstBoxStickyShift=13 firstMaterial=9
- inputs=right left down right up left down left right right up left left down left left down
- events=push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 walk walk push_object:crate#1 walk pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk pull_object:crate#1 pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
- stepEvents=
  1. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. left: walk
  3. down: walk
  4. right: pull_object:crate#1
  5. up: walk
  6. left: walk
  7. down: push_object:crate#1
  8. left: walk
  9. right: pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1
  10. right: pull_object:crate#1
  11. up: walk
  12. left: walk
  13. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1
  14. down: walk
  15. left: pull_object:crate#1
  16. left: pull_object:crate#1
  17. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
#########
#.MSB@P.#
#MGMC.L.#
#..G#..C#
#########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_744013_859

- score=328.0 cost=20 walkSteps=8 explored=1450 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- firstPushPullShift=1 firstBoxStickyShift=4 firstMaterial=5
- inputs=left down left right up left left up right right right down left down left up down down right right
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 push_object:crate#1 force_chain:n3
- stepEvents=
  1. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. down: walk
  3. left: walk
  4. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  5. up: pull_object:crate#1 box_to_sticky:n1
  6. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. up: walk
  9. right: walk
  10. right: walk
  11. right: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  12. down: walk
  13. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. down: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  15. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. down: walk
  18. down: walk
  19. right: push_object:crate#1
  20. right: push_object:crate#1 force_chain:n3

```text
##########
#G..M.MM.#
#...@LP..#
#S..#....#
#BC..CCG##
##########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_744013_2114

- score=302.0 cost=11 walkSteps=6 explored=212 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=5 firstBoxStickyShift=1 firstMaterial=10
- inputs=right down down right left left down right right left left
- events=push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#4 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  2. down: walk
  3. down: walk
  4. right: walk
  5. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. down: walk
  8. right: walk
  9. right: walk
  10. left: pull_object:crate#4 box_to_sticky:n1
  11. left: pull_object:sticky#1 move_sticky_rigid

```text
########
#@SBCG.#
#.G.PCC#
#...L..#
#.G.C..#
########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_744013_786

- score=296.0 cost=21 walkSteps=10 explored=3273 probe=found bypass=true missing=material_normalization
- firstPushPullShift=2 firstBoxStickyShift=7 firstMaterial=10
- inputs=right left left down left left up left right right right down left up right left left left up right left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. right: walk
  2. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. down: walk
  5. left: walk
  6. left: walk
  7. up: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  8. left: walk
  9. right: pull_object:crate#1
  10. right: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  11. right: pull_object:sticky#1 move_sticky_rigid
  12. down: walk
  13. left: walk
  14. up: push_object:sticky#1 move_sticky_rigid
  15. right: walk
  16. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. up: walk
  20. right: walk
  21. left: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#G.......#
#.BS.#.#M#
#C.M..@.L#
#.#G....P#
##########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_744013_1193

- score=282.0 cost=14 walkSteps=5 explored=506 probe=found bypass=true missing=material_normalization
- firstPushPullShift=4 firstBoxStickyShift=4 firstMaterial=9
- inputs=down left left right up up right right down left left down left left
- events=walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#3 walk push_object:crate#5 force_chain:n2 box_to_sticky:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. down: walk
  2. left: walk
  3. left: walk
  4. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  5. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: pull_object:crate#3
  8. right: walk
  9. down: push_object:crate#5 force_chain:n2 box_to_sticky:n1
  10. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  11. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  12. down: walk
  13. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
##CCCG..#
#...C.@C#
##GB...C#
#..SLP..#
#########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_744013_1979

- score=262.0 cost=13 walkSteps=7 explored=410 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=4 firstBoxStickyShift=9 firstMaterial=10
- inputs=right down down right right up left left left left up left down
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#2 box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. right: walk
  2. down: walk
  3. down: walk
  4. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. up: walk
  7. left: walk
  8. left: walk
  9. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  11. up: walk
  12. left: push_object:crate#2 box_to_sticky:n1
  13. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#.#M#...##
#.GM.@...#
#...SB...#
#..GPLG..#
##########
```

### 7. RA_SOFT_INTERLOCK_SEARCH_744013_625

- score=256.0 cost=21 walkSteps=11 explored=4866 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=6 firstBoxStickyShift=6 firstMaterial=13
- inputs=up right up right right left left down right down left left left left up up right up right right down
- events=walk walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#1 force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. right: walk
  3. up: walk
  4. right: walk
  5. right: walk
  6. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  7. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  8. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. right: walk
  10. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. left: pull_object:crate#2
  12. left: pull_object:crate#2
  13. left: pull_object:crate#2 box_to_sticky:n1
  14. left: pull_object:sticky#2 move_sticky_rigid
  15. up: walk
  16. up: walk
  17. right: push_object:sticky#1 force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  18. up: walk
  19. right: walk
  20. right: walk
  21. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#....SBP#
#.MG...L#
#.#..GCG#
#..@..C##
#########
```

### 8. RA_SOFT_INTERLOCK_SEARCH_744013_1814

- score=252.0 cost=11 walkSteps=6 explored=796 probe=found bypass=true missing=pull_event
- firstPushPullShift=2 firstBoxStickyShift=3 firstMaterial=3
- inputs=right up left up left down right right right down down
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#2 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: walk
  2. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky sticky_to_box:n1
  4. up: walk
  5. left: walk
  6. down: push_object:crate#2
  7. right: walk
  8. right: walk
  9. right: walk
  10. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.M....#
#.SBCPL#
#..G@.G#
##.CC..#
########
```

### 9. RA_SOFT_INTERLOCK_SEARCH_744013_43

- score=224.0 cost=20 walkSteps=11 explored=1378 probe=found bypass=true missing=material_normalization
- firstPushPullShift=13 firstBoxStickyShift=4 firstMaterial=6
- inputs=up left left right right down left left left up up left down right up right down left left left
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. up: walk
  2. left: walk
  3. left: walk
  4. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  6. down: pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  7. left: walk
  8. left: walk
  9. left: walk
  10. up: walk
  11. up: walk
  12. left: walk
  13. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. right: walk
  15. up: walk
  16. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. down: pull_object:sticky#1 move_sticky_rigid
  18. left: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  19. left: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  20. left: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#..PL.M#.#
#G..GS.M.#
#C...B...#
##..C...@#
##########
```

### 10. RA_SOFT_INTERLOCK_SEARCH_744013_2361

- score=202.0 cost=20 walkSteps=11 explored=235 probe=complete bypass=false missing=n/a
- firstPushPullShift=6 firstBoxStickyShift=17 firstMaterial=20
- inputs=down down down left left right right up left left up right down up left left down right down left
- events=walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 push_object:crate#2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
- stepEvents=
  1. down: walk
  2. down: walk
  3. down: walk
  4. left: walk
  5. left: walk
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. up: walk
  9. left: walk
  10. left: walk
  11. up: push_object:crate#1
  12. right: push_object:crate#2
  13. down: walk
  14. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: pull_object:crate#2
  16. left: walk
  17. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  18. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. down: walk
  20. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
########
#...G#@#
#MM.CC.#
##SB...#
#GPL...#
########
```

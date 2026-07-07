# Soft Interlock Search

- seed: 993103
- iterations: 12000
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 38
- costRange: 16-30
- wallRate: 0.14
- hits: 0
- solverHits: 24

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_993103_4797

- score=364.0 cost=17 walkSteps=6 explored=1434 probe=found bypass=true missing=material_normalization
- firstPushPullShift=6 firstBoxStickyShift=7 firstMaterial=10
- inputs=down right left up up right down right up right up left left left left down right
- events=walk walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1 pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. down: walk
  2. right: walk
  3. left: pull_object:sticky#1 move_sticky_rigid
  4. up: walk
  5. up: walk
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  8. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. up: walk
  10. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  11. up: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  12. left: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1
  13. left: pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  14. left: pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  15. left: walk
  16. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. right: push_object:sticky#1 move_sticky_rigid

```text
#########
#..BSG.M#
#PL.....#
#G.@..MM#
#.#..M#.#
#########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_993103_2503

- score=332.0 cost=18 walkSteps=8 explored=4956 probe=found bypass=true missing=material_normalization
- firstPushPullShift=5 firstBoxStickyShift=3 firstMaterial=10
- inputs=down right up right left left down left left left up right left up right right down up
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:sticky#1 move_sticky_rigid walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. down: walk
  2. right: walk
  3. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  4. right: walk
  5. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. down: walk
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  11. up: pull_object:sticky#1 move_sticky_rigid
  12. right: walk
  13. left: pull_object:crate#1 box_to_sticky:n1
  14. up: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  15. right: walk
  16. right: walk
  17. down: walk
  18. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#G..#....#
#..M@.GLP#
#........#
#M#..SB.##
##########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_993103_7933

- score=326.0 cost=18 walkSteps=9 explored=1175 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=4 firstBoxStickyShift=4 firstMaterial=13
- inputs=right down right left up right right down down left down left up left right right up right
- events=pull_object:crate#2 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 pull_object:crate#2 walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
- stepEvents=
  1. right: pull_object:crate#2
  2. down: walk
  3. right: walk
  4. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  5. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. right: pull_object:crate#2
  7. right: pull_object:crate#2
  8. down: walk
  9. down: walk
  10. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  11. down: walk
  12. left: walk
  13. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2
  14. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1
  15. right: walk
  16. right: walk
  17. up: walk
  18. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
##########
#.C.C@..G#
#.C.C...B#
##.#G..LS#
#M...#.P##
##########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_993103_2942

- score=324.0 cost=17 walkSteps=6 explored=5360 probe=found bypass=true missing=material_normalization
- firstPushPullShift=12 firstBoxStickyShift=8 firstMaterial=8
- inputs=left left up up up left left right right right down left left down left left up
- events=push_object:crate#2 push_object:crate#2 walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
- stepEvents=
  1. left: push_object:crate#2
  2. left: push_object:crate#2
  3. up: walk
  4. up: walk
  5. up: walk
  6. left: walk
  7. left: walk
  8. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  9. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  11. down: walk
  12. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  15. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1
  16. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  17. up: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
##########
#.SB.....#
#.#.....L#
#MG.G...P#
##.C...C@#
##########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_993103_4198

- score=316.0 cost=20 walkSteps=10 explored=3003 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=3 firstBoxStickyShift=9 firstMaterial=5
- inputs=down right up right left left down down right up down down right up right up left right right down
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. down: walk
  2. right: walk
  3. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. right: walk
  5. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  6. left: pull_object:crate#1
  7. down: walk
  8. down: walk
  9. right: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  10. up: walk
  11. down: pull_object:crate#1
  12. down: walk
  13. right: walk
  14. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. right: push_object:crate#2 box_to_sticky:n1 sticky_merge:n1
  16. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  18. right: walk
  19. right: walk
  20. down: push_object:sticky#1 move_sticky_rigid

```text
#########
#@..M...#
#G.BS..##
#.LC..M.#
#CP...G.#
#########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_993103_10395

- score=316.0 cost=20 walkSteps=8 explored=1653 probe=found bypass=true missing=material_normalization
- firstPushPullShift=3 firstBoxStickyShift=9 firstMaterial=16
- inputs=left up left right right down down left right up up left down left down left left left left up
- events=walk pull_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 pull_object:crate#2 walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 walk pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#4 move_sticky_rigid pull_object:sticky#4 move_sticky_rigid sticky_merge:n1 pull_object:sticky#3 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
- stepEvents=
  1. left: walk
  2. up: pull_object:crate#1
  3. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. right: walk
  5. right: walk
  6. down: walk
  7. down: walk
  8. left: walk
  9. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. up: pull_object:crate#2
  11. up: pull_object:crate#2
  12. left: walk
  13. down: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky
  14. left: pull_object:crate#1
  15. down: walk
  16. left: pull_object:crate#2 box_to_sticky:n1
  17. left: pull_object:sticky#4 move_sticky_rigid
  18. left: pull_object:sticky#4 move_sticky_rigid sticky_merge:n1
  19. left: pull_object:sticky#3 move_sticky_rigid
  20. up: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
#M#..P..#
#..M.LG@#
#G..SBC.#
#M...G.C#
#########
```

### 7. RA_SOFT_INTERLOCK_SEARCH_993103_6564

- score=314.0 cost=16 walkSteps=8 explored=341 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=5 firstBoxStickyShift=11 firstMaterial=11
- inputs=down down up up right right left down down down left up right up up right
- events=walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull
- stepEvents=
  1. down: walk
  2. down: walk
  3. up: pull_object:sticky#1 move_sticky_rigid
  4. up: pull_object:sticky#1 move_sticky_rigid
  5. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. left: walk
  8. down: walk
  9. down: walk
  10. down: walk
  11. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  12. up: walk
  13. right: walk
  14. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  15. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  16. right: push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull

```text
########
##@P.GG#
#..L...#
##..M#.#
#.M.SB.#
########
```

### 8. RA_SOFT_INTERLOCK_SEARCH_993103_2034

- score=312.0 cost=19 walkSteps=10 explored=2116 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=8 firstBoxStickyShift=16 firstMaterial=10
- inputs=left up right up left left left down right up right right down down right left left left up
- events=walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
- stepEvents=
  1. left: walk
  2. up: walk
  3. right: pull_object:sticky#1 move_sticky_rigid
  4. up: walk
  5. left: walk
  6. left: walk
  7. left: walk
  8. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. right: walk
  10. up: pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1
  11. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. down: walk
  14. down: walk
  15. right: walk
  16. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1
  17. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  18. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  19. up: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#PLG..#.#
#GG...###
#..M..MS#
#C#C.@.B#
#########
```

### 9. RA_SOFT_INTERLOCK_SEARCH_993103_5979

- score=308.0 cost=21 walkSteps=8 explored=1515 probe=found bypass=true missing=material_normalization
- firstPushPullShift=5 firstBoxStickyShift=3 firstMaterial=8
- inputs=left up right right down right left down left up left left up right right up right down down left left
- events=walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 force_chain:n4 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. left: walk
  2. up: walk
  3. right: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky
  4. right: push_object:crate#1 force_chain:n4 anchor_boundary_shift:box_sticky move_sticky_rigid
  5. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. right: walk
  7. left: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  8. down: pull_object:crate#1 box_to_sticky:n1
  9. left: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  10. up: walk
  11. left: pull_object:sticky#1 move_sticky_rigid
  12. left: walk
  13. up: walk
  14. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  16. up: walk
  17. right: walk
  18. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  20. left: push_object:sticky#1 move_sticky_rigid
  21. left: push_object:sticky#1 move_sticky_rigid

```text
##########
#.#PL.##.#
#..CB.C..#
#..@S.M..#
#G..GM...#
##########
```

### 10. RA_SOFT_INTERLOCK_SEARCH_993103_8861

- score=302.0 cost=21 walkSteps=11 explored=2792 probe=found bypass=true missing=material_normalization
- firstPushPullShift=10 firstBoxStickyShift=14 firstMaterial=18
- inputs=left left down up left down down right down left left up up right right right down left up left up
- events=walk walk walk pull_object:sticky#2 move_sticky_rigid walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. left: walk
  2. left: walk
  3. down: walk
  4. up: pull_object:sticky#2 move_sticky_rigid
  5. left: walk
  6. down: walk
  7. down: walk
  8. right: pull_object:sticky#1 move_sticky_rigid
  9. down: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  10. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. up: walk
  13. up: walk
  14. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. right: walk
  17. down: walk
  18. left: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  19. up: walk
  20. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  21. up: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#.G....@#
#BS....M#
#C.M.M.##
#...G.LP#
#########
```

### 11. RA_SOFT_INTERLOCK_SEARCH_993103_11628

- score=296.0 cost=21 walkSteps=10 explored=2732 probe=found bypass=true missing=material_normalization
- firstPushPullShift=5 firstBoxStickyShift=5 firstMaterial=9
- inputs=up right up left left down left left down left left up up up right down up right right down left
- events=walk pull_object:crate#2 walk push_object:crate#1 push_object:crate#1 force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid walk pull_object:crate#2 pull_object:crate#2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. right: pull_object:crate#2
  3. up: walk
  4. left: push_object:crate#1
  5. left: push_object:crate#1 force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  6. down: walk
  7. left: pull_object:crate#2
  8. left: pull_object:crate#2
  9. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  10. left: walk
  11. left: walk
  12. up: walk
  13. up: walk
  14. up: walk
  15. right: push_object:sticky#1 move_sticky_rigid
  16. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. up: walk
  18. right: push_object:sticky#1 move_sticky_rigid sticky_merge:n1
  19. right: push_object:sticky#1 move_sticky_rigid
  20. down: walk
  21. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#..MSG###
#..PBGC.#
#..L.C..#
#G..#.@.#
#########
```

### 12. RA_SOFT_INTERLOCK_SEARCH_993103_2730

- score=290.0 cost=19 walkSteps=9 explored=985 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=12 firstBoxStickyShift=4 firstMaterial=6
- inputs=left down down left left up left left down left down right right right up right right up up
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:sticky#3 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. down: walk
  3. down: walk
  4. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  6. up: pull_object:crate#1 box_to_sticky:n1
  7. left: walk
  8. left: walk
  9. down: walk
  10. left: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  11. down: walk
  12. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  14. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  15. up: push_object:sticky#3 move_sticky_rigid
  16. right: walk
  17. right: walk
  18. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#M..M.#.@#
#M...G.G##
#.M.#...S#
#..PL.C.B#
##########
```

### 13. RA_SOFT_INTERLOCK_SEARCH_993103_9950

- score=290.0 cost=21 walkSteps=11 explored=534 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=1 firstBoxStickyShift=9 firstMaterial=15
- inputs=down right right right right up right left down right right up up left left left down right up right down
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:crate#2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:crate#1 push_object:crate#1 box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk push_object:crate#1
- stepEvents=
  1. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. right: walk
  3. right: walk
  4. right: walk
  5. right: walk
  6. up: walk
  7. right: walk
  8. left: pull_object:crate#2
  9. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. right: walk
  11. right: walk
  12. up: walk
  13. up: walk
  14. left: push_object:crate#1
  15. left: push_object:crate#1 box_to_sticky:n1
  16. left: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  17. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  18. right: pull_object:sticky#1 move_sticky_rigid
  19. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  20. right: walk
  21. down: push_object:crate#1

```text
##########
##P..G##.#
##L#.SBC.#
#.@#M...C#
#......G.#
##########
```

### 14. RA_SOFT_INTERLOCK_SEARCH_993103_2299

- score=286.0 cost=23 walkSteps=11 explored=880 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=4 firstBoxStickyShift=12 firstMaterial=13
- inputs=down down down left right up right left left up right left down down right right left up down right up down up
- events=walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2
- stepEvents=
  1. down: walk
  2. down: walk
  3. down: walk
  4. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: walk
  6. up: walk
  7. right: walk
  8. left: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  9. left: pull_object:sticky#1 move_sticky_rigid
  10. up: walk
  11. right: walk
  12. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. down: pull_object:crate#1 box_to_sticky:n1
  14. down: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  15. right: push_object:sticky#1 move_sticky_rigid
  16. right: push_object:sticky#1 move_sticky_rigid
  17. left: walk
  18. up: walk
  19. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  20. right: walk
  21. up: push_object:sticky#1 move_sticky_rigid sticky_to_box:n2
  22. down: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  23. up: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2

```text
#######
#.C@BG#
#...S.#
#.L..M#
#GP.M.#
#######
```

### 15. RA_SOFT_INTERLOCK_SEARCH_993103_5081

- score=284.0 cost=21 walkSteps=10 explored=16876 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=10 firstBoxStickyShift=15 firstMaterial=15
- inputs=left left left left right right right right down left left left up up right down down up left left down
- events=walk walk walk walk pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#2 push_object:crate#2 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. left: walk
  3. left: walk
  4. left: walk
  5. right: pull_object:crate#2
  6. right: pull_object:crate#2
  7. right: pull_object:crate#2
  8. right: walk
  9. down: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  10. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. up: walk
  14. up: walk
  15. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  16. down: push_object:crate#2
  17. down: push_object:crate#2
  18. up: walk
  19. left: walk
  20. left: walk
  21. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#.....BSG#
#.CC....@#
##....LPM#
#C..G#GM.#
##########
```

### 16. RA_SOFT_INTERLOCK_SEARCH_993103_8940

- score=284.0 cost=19 walkSteps=9 explored=371 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=6 firstBoxStickyShift=6 firstMaterial=9
- inputs=left left down down left right up up left left down down down right up down right right right
- events=walk walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. left: walk
  3. down: walk
  4. down: walk
  5. left: walk
  6. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  7. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  9. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  10. left: pull_object:crate#1
  11. down: walk
  12. down: walk
  13. down: walk
  14. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. up: walk
  16. down: pull_object:crate#2
  17. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..G..@.#
#..C.MM.#
##LG....#
#CPBS..G#
#########
```

### 17. RA_SOFT_INTERLOCK_SEARCH_993103_7266

- score=282.0 cost=20 walkSteps=8 explored=1289 probe=found bypass=true missing=material_normalization
- firstPushPullShift=1 firstBoxStickyShift=2 firstMaterial=2
- inputs=right up left down down left down right right right up left up up left left left down right right
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 walk walk pull_object:crate#2 walk walk walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  3. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. down: walk
  5. down: walk
  6. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. right: pull_object:crate#2
  9. right: pull_object:crate#2
  10. right: pull_object:crate#2
  11. up: walk
  12. left: walk
  13. up: pull_object:crate#2
  14. up: walk
  15. left: walk
  16. left: walk
  17. left: walk
  18. down: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1
  19. right: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  20. right: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#.P..#..#
#ML@GG..#
#M..S.G.#
#C..B..##
#########
```

### 18. RA_SOFT_INTERLOCK_SEARCH_993103_11801

- score=272.0 cost=19 walkSteps=10 explored=2056 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=14 firstBoxStickyShift=15 firstMaterial=7
- inputs=left up left up left right down up right down down right right up left up left right right
- events=walk walk walk push_object:sticky#2 move_sticky_rigid walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:crate#3 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. up: walk
  3. left: walk
  4. up: push_object:sticky#2 move_sticky_rigid
  5. left: walk
  6. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  7. down: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  8. up: push_object:sticky#1 move_sticky_rigid
  9. right: walk
  10. down: walk
  11. down: walk
  12. right: walk
  13. right: push_object:crate#3
  14. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. up: walk
  17. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  18. right: walk
  19. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#MG.#..G#
#M.M.SL.#
#C.G.BP.#
#..#.@C.#
#########
```

### 19. RA_SOFT_INTERLOCK_SEARCH_993103_107

- score=270.0 cost=20 walkSteps=11 explored=823 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=13 firstBoxStickyShift=6 firstMaterial=4
- inputs=left down down left left right left up right right up up left down down up left left down right
- events=walk walk walk push_object:crate#2 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. left: walk
  2. down: walk
  3. down: walk
  4. left: push_object:crate#2 force_chain:n2 box_to_sticky:n1
  5. left: push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
  6. right: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  7. left: push_object:sticky#1 move_sticky_rigid
  8. up: walk
  9. right: walk
  10. right: walk
  11. up: walk
  12. up: walk
  13. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. up: walk
  17. left: walk
  18. left: walk
  19. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  20. right: pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#...LP.##
#MMSBG.@#
#.M....##
#..GCCG##
#########
```

### 20. RA_SOFT_INTERLOCK_SEARCH_993103_3357

- score=266.0 cost=24 walkSteps=13 explored=4740 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=5 firstBoxStickyShift=8 firstMaterial=8
- inputs=down down right right up up right left left down left down down right right right up down left left left up right left
- events=walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1
- stepEvents=
  1. down: walk
  2. down: walk
  3. right: walk
  4. right: walk
  5. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: walk
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  9. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  10. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. left: walk
  12. down: walk
  13. down: walk
  14. right: walk
  15. right: walk
  16. right: walk
  17. up: walk
  18. down: pull_object:sticky#1 move_sticky_rigid
  19. left: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  20. left: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
  21. left: pull_object:crate#2
  22. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  23. right: walk
  24. left: pull_object:crate#1

```text
##########
#..@...BS#
#..G..C..#
###.G..#M#
#...PL.C.#
##########
```

### 21. RA_SOFT_INTERLOCK_SEARCH_993103_10310

- score=266.0 cost=24 walkSteps=11 explored=2900 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=2 firstBoxStickyShift=16 firstMaterial=3
- inputs=up left left up right right right down down left left up up left left down left right right right right down right up
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. up: walk
  2. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1
  4. up: walk
  5. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. down: walk
  9. down: walk
  10. left: walk
  11. left: walk
  12. up: walk
  13. up: walk
  14. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  17. left: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  18. right: walk
  19. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  20. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  21. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  22. down: walk
  23. right: walk
  24. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.SB.C#G#
#..C.L..#
#G...P..#
#M#.#.@.#
#########
```

### 22. RA_SOFT_INTERLOCK_SEARCH_993103_10824

- score=266.0 cost=24 walkSteps=13 explored=18438 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=1 firstBoxStickyShift=1 firstMaterial=7
- inputs=right down down right right right down left up up left left left left up left down right down left right right right right
- events=push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#2 push_object:crate#2 walk push_object:crate#1 push_object:crate#2 box_to_sticky:n1 walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  2. down: walk
  3. down: walk
  4. right: walk
  5. right: walk
  6. right: walk
  7. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  8. left: walk
  9. up: walk
  10. up: walk
  11. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. left: walk
  13. left: push_object:crate#2
  14. left: push_object:crate#2
  15. up: walk
  16. left: push_object:crate#1
  17. down: push_object:crate#2 box_to_sticky:n1
  18. right: walk
  19. down: walk
  20. left: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  21. right: walk
  22. right: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  23. right: push_object:sticky#2 move_sticky_rigid
  24. right: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#.C.@PLB.#
##..M..S.#
#G..M....#
#M..M.M.G#
##########
```

### 23. RA_SOFT_INTERLOCK_SEARCH_993103_6399

- score=264.0 cost=20 walkSteps=11 explored=307 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=6 firstBoxStickyShift=12 firstMaterial=7
- inputs=up up right right right left left left down right right up right up left right right right right down
- events=walk walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 push_object:crate#2
- stepEvents=
  1. up: walk
  2. up: walk
  3. right: walk
  4. right: walk
  5. right: walk
  6. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  7. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1
  8. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  9. down: pull_object:sticky#1 move_sticky_rigid
  10. right: walk
  11. right: walk
  12. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. up: walk
  15. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. right: walk
  17. right: walk
  18. right: walk
  19. right: push_object:crate#1
  20. down: push_object:crate#2

```text
##########
#...CP.CG#
#.G..L#C.#
#...##CG.#
#@SB....##
##########
```

### 24. RA_SOFT_INTERLOCK_SEARCH_993103_10962

- score=264.0 cost=20 walkSteps=11 explored=3095 probe=found bypass=true missing=material_normalization
- firstPushPullShift=5 firstBoxStickyShift=13 firstMaterial=20
- inputs=right up up down right down left left left up right right right up left left up left down down
- events=walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. right: walk
  2. up: walk
  3. up: walk
  4. down: pull_object:sticky#1 move_sticky_rigid
  5. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. down: walk
  7. left: walk
  8. left: walk
  9. left: walk
  10. up: walk
  11. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  14. up: walk
  15. left: push_object:sticky#1 move_sticky_rigid
  16. left: push_object:sticky#1 move_sticky_rigid
  17. up: walk
  18. left: walk
  19. down: push_object:sticky#1 move_sticky_rigid
  20. down: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#..M.#M.#
#.....###
#PL...SG#
#G@...B.#
#########
```

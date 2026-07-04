# Soft Interlock Search

- seed: 743013
- iterations: 3500
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 44
- costRange: 12-20
- wallRate: 0.16
- hits: 0
- solverHits: 6

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_743013_1610

- score=320.0 cost=16 walkSteps=7 explored=700 probe=found bypass=true missing=material_normalization
- firstPushPullShift=3 firstBoxStickyShift=4 firstMaterial=4
- inputs=left left left left up down down left left up right right right right up left
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1 walk pull_object:sticky#2 move_sticky_rigid walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. left: walk
  3. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1
  5. up: walk
  6. down: pull_object:sticky#2 move_sticky_rigid
  7. down: walk
  8. left: walk
  9. left: walk
  10. up: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  11. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  12. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  13. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  14. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  15. up: walk
  16. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#C..M.#.##
#.C..LG.G#
#.BS.P..@#
#C....##.#
##########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_743013_1655

- score=300.0 cost=17 walkSteps=9 explored=1836 probe=found bypass=true missing=material_normalization,sticky_rigid_move
- firstPushPullShift=8 firstBoxStickyShift=8 firstMaterial=11
- inputs=up right down right right up right left left down right down left left up down left
- events=walk walk pull_object:crate#1 walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. up: walk
  2. right: walk
  3. down: pull_object:crate#1
  4. right: walk
  5. right: walk
  6. up: walk
  7. right: walk
  8. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  9. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  10. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  11. right: pull_object:crate#1 box_to_sticky:n1
  12. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. left: walk
  14. left: walk
  15. up: walk
  16. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  17. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#.C.BSP.#
#...G.LM#
#@..G...#
#.G..#..#
#########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_743013_2955

- score=286.0 cost=18 walkSteps=8 explored=1710 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=5 firstBoxStickyShift=12 firstMaterial=18
- inputs=left left left up right right down up right down down right left left left up left down
- events=pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. left: pull_object:sticky#1 move_sticky_rigid
  2. left: pull_object:sticky#1 move_sticky_rigid
  3. left: walk
  4. up: walk
  5. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. down: push_object:sticky#1 move_sticky_rigid
  8. up: walk
  9. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. down: walk
  11. down: walk
  12. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. left: walk
  14. left: push_object:sticky#1 move_sticky_rigid
  15. left: push_object:sticky#1 move_sticky_rigid
  16. up: walk
  17. left: walk
  18. down: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#.PL....#
#...@M#.#
#....S.M#
#GC#.BG.#
#########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_743013_381

- score=284.0 cost=19 walkSteps=9 explored=909 probe=found bypass=true missing=material_normalization
- firstPushPullShift=5 firstBoxStickyShift=8 firstMaterial=9
- inputs=right right right right up up left right right down left right right down left left left up right
- events=walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. right: walk
  2. right: walk
  3. right: walk
  4. right: walk
  5. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. left: walk
  8. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  10. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. left: walk
  12. right: pull_object:crate#1 box_to_sticky:n1
  13. right: walk
  14. down: walk
  15. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. up: walk
  19. right: push_object:sticky#1 move_sticky_rigid

```text
#########
#.BS.G.##
#.#.M.G.#
#@G.....#
#CC#.LP##
#########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_743013_1756

- score=264.0 cost=20 walkSteps=11 explored=685 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=3 firstBoxStickyShift=10 firstMaterial=10
- inputs=left left up right right down right right down left left left up right up left left down left up
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. left: walk
  3. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. right: pull_object:crate#2
  5. right: walk
  6. down: walk
  7. right: walk
  8. right: walk
  9. down: walk
  10. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  11. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  13. up: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  14. right: walk
  15. up: walk
  16. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. down: walk
  19. left: walk
  20. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#G..#C..#
#.C...#.#
##...@..#
##GLPBS.#
#########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_743013_638

- score=246.0 cost=19 walkSteps=9 explored=4346 probe=found bypass=true missing=material_normalization
- firstPushPullShift=7 firstBoxStickyShift=5 firstMaterial=15
- inputs=up down right right up up left down down left down right up up right up right down down
- events=walk pull_object:crate#2 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#3 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#2 box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. down: pull_object:crate#2
  3. right: walk
  4. right: walk
  5. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  6. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  8. down: walk
  9. down: walk
  10. left: walk
  11. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: pull_object:crate#3
  13. up: walk
  14. up: walk
  15. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  16. up: walk
  17. right: push_object:crate#2 box_to_sticky:n1
  18. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  19. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
########
#CCP.M.#
#..L...#
#.@....#
#CG.BSG#
########
```

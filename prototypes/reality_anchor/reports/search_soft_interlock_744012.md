# Soft Interlock Search

- seed: 744012
- iterations: 2500
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 50
- costRange: 11-22
- wallRate: 0.13
- hits: 0
- solverHits: 7

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_744012_844

- score=360.0 cost=16 walkSteps=8 explored=494 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=1 firstBoxStickyShift=1 firstMaterial=12
- inputs=right up left up right right down down right right left up down right up down
- events=push_object:push_pull_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:crate#2 push_object:crate#2 walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. right: push_object:push_pull_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  2. up: walk
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: walk
  5. right: walk
  6. right: walk
  7. down: walk
  8. down: walk
  9. right: push_object:crate#2
  10. right: push_object:crate#2
  11. left: walk
  12. up: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  13. down: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  14. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  15. up: walk
  16. down: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#..#MM..#
#...S.#.#
#.LCB..##
#@PCG.GG#
#########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_744012_13

- score=350.0 cost=15 walkSteps=7 explored=484 probe=found bypass=true missing=material_normalization,sticky_rigid_move
- firstPushPullShift=6 firstBoxStickyShift=11 firstMaterial=11
- inputs=right down down left down right right up up right up left down left left
- events=pull_object:crate#2 walk walk pull_object:crate#6 pull_object:crate#4 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. right: pull_object:crate#2
  2. down: walk
  3. down: walk
  4. left: pull_object:crate#6
  5. down: pull_object:crate#4
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. up: walk
  9. up: walk
  10. right: walk
  11. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  12. left: walk
  13. down: walk
  14. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#CC@....#
#C.C...C#
#.G..CB.#
#PLG..S.#
#########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_744012_1705

- score=342.0 cost=14 walkSteps=7 explored=2063 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- firstPushPullShift=3 firstBoxStickyShift=10 firstMaterial=10
- inputs=down left right up up left down left left left down left down right
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#3 move_sticky_rigid pull_object:sticky#3 move_sticky_rigid walk walk pull_object:sticky#3 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1
- stepEvents=
  1. down: walk
  2. left: walk
  3. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: pull_object:sticky#3 move_sticky_rigid
  5. up: pull_object:sticky#3 move_sticky_rigid
  6. left: walk
  7. down: walk
  8. left: pull_object:sticky#3 move_sticky_rigid
  9. left: walk
  10. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  11. down: push_object:sticky#2 move_sticky_rigid
  12. left: walk
  13. down: walk
  14. right: push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
#CC.....#
#.BS..G@#
#..MPLG.#
#...GM.M#
#########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_744012_2460

- score=318.0 cost=13 walkSteps=7 explored=366 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=8 firstBoxStickyShift=9 firstMaterial=4
- inputs=right right right down left down left up right up right down down
- events=walk walk walk push_object:crate#2 box_to_sticky:n1 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: walk
  2. right: walk
  3. right: walk
  4. down: push_object:crate#2 box_to_sticky:n1
  5. left: walk
  6. down: walk
  7. left: walk
  8. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. right: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1
  10. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. right: walk
  12. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
#@...C#
#B..C.#
#SG..G#
##LPGM#
#######
```

### 5. RA_SOFT_INTERLOCK_SEARCH_744012_774

- score=300.0 cost=22 walkSteps=8 explored=609 probe=found bypass=true missing=material_normalization,sticky_rigid_move
- firstPushPullShift=4 firstBoxStickyShift=5 firstMaterial=5
- inputs=left left left down left up right right up right down down left left right down left up right up down down
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#3 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#1 move_sticky_rigid walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. left: walk
  2. left: walk
  3. left: walk
  4. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  6. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: walk
  8. right: walk
  9. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. down: walk
  12. down: walk
  13. left: pull_object:sticky#3 move_sticky_rigid
  14. left: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  15. right: push_object:sticky#1 move_sticky_rigid
  16. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. left: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  18. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  19. right: push_object:sticky#1 move_sticky_rigid
  20. up: walk
  21. down: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  22. down: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#..PL..M#
#.#....@#
#.#..BSM#
#..G.CG.#
#########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_744012_2013

- score=270.0 cost=20 walkSteps=10 explored=5254 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=2 firstBoxStickyShift=14 firstMaterial=19
- inputs=left right up up left left down right up left down up right down left left left up right right
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid push_object:crate#2 push_object:crate#2 walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky
- stepEvents=
  1. left: walk
  2. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. up: walk
  4. up: walk
  5. left: walk
  6. left: walk
  7. down: walk
  8. right: push_object:sticky#1 move_sticky_rigid
  9. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. left: walk
  11. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. up: walk
  13. right: walk
  14. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. left: pull_object:sticky#1 move_sticky_rigid
  16. left: push_object:crate#2
  17. left: push_object:crate#2
  18. up: walk
  19. right: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky sticky_to_box:n1
  20. right: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky

```text
#########
#..#BS..#
#..C.G.G#
#..C.M.##
#C.PL.@.#
#########
```

### 7. RA_SOFT_INTERLOCK_SEARCH_744012_879

- score=258.0 cost=14 walkSteps=7 explored=408 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=5 firstMaterial=5
- inputs=left down up left down left left left down down right right left left
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#3 push_object:crate#3 push_object:crate#3 walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. left: walk
  2. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. up: walk
  4. left: walk
  5. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  6. left: push_object:crate#3
  7. left: push_object:crate#3
  8. left: push_object:crate#3
  9. down: walk
  10. down: walk
  11. right: walk
  12. right: walk
  13. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.#CC..@#
#G..CBP##
#....SLM#
#..G..G##
#########
```

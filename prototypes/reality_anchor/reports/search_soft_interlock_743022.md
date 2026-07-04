# Soft Interlock Search

- seed: 743022
- iterations: 2500
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 44
- costRange: 12-20
- wallRate: 0.11
- hits: 1
- solverHits: 9

## 1. RA_SOFT_INTERLOCK_SEARCH_743022_2014

- score=442.8 cost=13 walkSteps=7 explored=265 graphStates=675 winStates=1 probeStates=807 scc=one_win_continuation_per_scc
- firstPushPullShift=6 firstBoxStickyShift=8 firstMaterial=8
- inputs=down left up left left right down right right up left left up
- events=walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. down: walk
  2. left: walk
  3. up: walk
  4. left: walk
  5. left: walk
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. down: walk
  8. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  9. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. up: walk
  11. left: pull_object:sticky#1 move_sticky_rigid
  12. left: pull_object:sticky#1 move_sticky_rigid
  13. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#..M.G###
#PLGG.@M#
##BS....#
#########
```

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_743022_446

- score=342.0 cost=19 walkSteps=7 explored=4586 probe=found bypass=true missing=material_normalization
- firstPushPullShift=6 firstBoxStickyShift=9 firstMaterial=9
- inputs=right right up left down up up right right down right down left left left down right right right
- events=walk walk walk push_object:sticky#1 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#3 force_chain:n2 move_sticky_rigid sticky_to_box:n1 walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
- stepEvents=
  1. right: walk
  2. right: walk
  3. up: walk
  4. left: push_object:sticky#1 move_sticky_rigid
  5. down: walk
  6. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. right: walk
  9. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  10. down: walk
  11. right: push_object:sticky#3 force_chain:n2 move_sticky_rigid sticky_to_box:n1
  12. down: walk
  13. left: push_object:sticky#2 move_sticky_rigid
  14. left: push_object:sticky#2 move_sticky_rigid
  15. left: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  16. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. right: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  18. right: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  19. right: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#...SB..#
#.M.GCCG#
#@..M.G##
#.LPM..C#
#########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_743022_1207

- score=322.0 cost=15 walkSteps=6 explored=1564 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=2 firstBoxStickyShift=1 firstMaterial=15
- inputs=down right right up up left up left left left down down right right right
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
- stepEvents=
  1. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  2. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: walk
  5. up: walk
  6. left: pull_object:crate#1
  7. up: walk
  8. left: walk
  9. left: walk
  10. left: walk
  11. down: push_object:sticky#1 move_sticky_rigid
  12. down: push_object:sticky#1 move_sticky_rigid
  13. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
########
#......#
#MSB.GC#
#..@..G#
#PL...##
########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_743022_1892

- score=318.0 cost=13 walkSteps=6 explored=1792 probe=found bypass=true missing=pull_event
- firstPushPullShift=2 firstBoxStickyShift=4 firstMaterial=9
- inputs=down left left up left left up right right right left up left
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:crate#1
- stepEvents=
  1. down: walk
  2. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  5. left: walk
  6. left: walk
  7. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. right: walk
  9. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  10. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. left: walk
  12. up: walk
  13. left: push_object:crate#1

```text
#########
#GC.....#
#...M.G.#
#.GBS@.##
#..LP..M#
#########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_743022_2014

- score=300.0 cost=13 walkSteps=7 explored=265 probe=complete bypass=false missing=n/a
- firstPushPullShift=6 firstBoxStickyShift=8 firstMaterial=8
- inputs=down left up left left right down right right up left left up
- events=walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. down: walk
  2. left: walk
  3. up: walk
  4. left: walk
  5. left: walk
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. down: walk
  8. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  9. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. up: walk
  11. left: pull_object:sticky#1 move_sticky_rigid
  12. left: pull_object:sticky#1 move_sticky_rigid
  13. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#..M.G###
#PLGG.@M#
##BS....#
#########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_743022_592

- score=292.0 cost=18 walkSteps=9 explored=2590 probe=found bypass=true missing=material_normalization
- firstPushPullShift=4 firstBoxStickyShift=8 firstMaterial=8
- inputs=left left up right up up right left down down right up down left left down right right
- events=walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. left: walk
  3. up: walk
  4. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  5. up: walk
  6. up: walk
  7. right: walk
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  9. down: walk
  10. down: walk
  11. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  12. up: walk
  13. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  14. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. down: pull_object:sticky#1 move_sticky_rigid
  17. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#...SB##
#ML...C#
#GPM..C#
#..@G.##
########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_743022_1192

- score=278.0 cost=19 walkSteps=10 explored=6312 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=1 firstBoxStickyShift=5 firstMaterial=5
- inputs=left right right down left left down left down right right left up up left left down left down
- events=push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 push_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. right: walk
  3. right: walk
  4. down: walk
  5. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  6. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. down: walk
  8. left: walk
  9. down: walk
  10. right: push_object:crate#1
  11. right: push_object:crate#1
  12. left: walk
  13. up: walk
  14. up: walk
  15. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. left: walk
  19. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#...LP@.##
#....SB..#
#M....#..#
#G.#.M.G.#
##########
```

### 7. RA_SOFT_INTERLOCK_SEARCH_743022_342

- score=274.0 cost=14 walkSteps=6 explored=39 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=10 firstBoxStickyShift=9 firstMaterial=2
- inputs=right right up up left left left down left up right right right right
- events=pull_object:sticky#3 move_sticky_rigid pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1
- stepEvents=
  1. right: pull_object:sticky#3 move_sticky_rigid
  2. right: pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1
  3. up: walk
  4. up: walk
  5. left: walk
  6. left: walk
  7. left: walk
  8. down: walk
  9. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. right: pull_object:sticky#2 move_sticky_rigid
  12. right: pull_object:sticky#2 move_sticky_rigid
  13. right: pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  14. right: pull_object:crate#1

```text
#########
#.M...G.#
#M..GSB.#
#.PLM@G.#
#########
```

### 8. RA_SOFT_INTERLOCK_SEARCH_743022_2310

- score=264.0 cost=20 walkSteps=11 explored=6186 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=5 firstBoxStickyShift=8 firstMaterial=8
- inputs=down down down left right up up left left left down down right up right up left up right right
- events=walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#1 walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. down: walk
  2. down: walk
  3. down: walk
  4. left: walk
  5. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. up: walk
  7. up: walk
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  9. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. left: walk
  11. down: walk
  12. down: walk
  13. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. up: push_object:crate#1
  15. right: walk
  16. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. left: push_object:crate#1
  18. up: walk
  19. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  20. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
##..@C.G#
#G...BS.#
#.C...#.#
#PL.....#
#########
```

### 9. RA_SOFT_INTERLOCK_SEARCH_743022_977

- score=202.0 cost=20 walkSteps=11 explored=1004 probe=found bypass=true missing=material_normalization
- firstPushPullShift=1 firstBoxStickyShift=5 firstMaterial=5
- inputs=down right up right down left left up up up right down up right down right right up left left
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#3 push_object:crate#3 walk push_object:crate#1 push_object:crate#1
- stepEvents=
  1. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. right: walk
  3. up: walk
  4. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  6. left: walk
  7. left: walk
  8. up: walk
  9. up: walk
  10. up: walk
  11. right: walk
  12. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. up: walk
  14. right: walk
  15. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. right: push_object:crate#3
  17. right: push_object:crate#3
  18. up: walk
  19. left: push_object:crate#1
  20. left: push_object:crate#1

```text
########
#PGBC.C#
#L.SM..#
#@...#.#
#.G.##.#
########
```

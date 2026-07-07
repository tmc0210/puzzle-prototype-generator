# Soft Interlock Search

- seed: 993101
- iterations: 12000
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 34
- costRange: 14-28
- wallRate: 0.12
- hits: 1
- solverHits: 24

## 1. RA_SOFT_INTERLOCK_SEARCH_993101_2048

- score=348.2 cost=14 walkSteps=7 explored=367 graphStates=742 winStates=62 probeStates=811 scc=branching_win_dag
- firstPushPullShift=6 firstBoxStickyShift=6 firstMaterial=6
- inputs=up up down down left left right up left down right up right left
- events=walk walk pull_object:crate#1 pull_object:crate#1 walk push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid sticky_to_box:n1 walk push_object:crate#2 pull_object:crate#3 walk walk push_object:crate#3 force_chain:n2 walk pull_object:crate#4
- stepEvents=
  1. up: walk
  2. up: walk
  3. down: pull_object:crate#1
  4. down: pull_object:crate#1
  5. left: walk
  6. left: push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid sticky_to_box:n1
  7. right: walk
  8. up: push_object:crate#2
  9. left: pull_object:crate#3
  10. down: walk
  11. right: walk
  12. up: push_object:crate#3 force_chain:n2
  13. right: walk
  14. left: pull_object:crate#4

```text
##########
#...M#GC.#
#...#....#
#.L##.CGC#
#.PMSB.@.#
##########
```

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_993101_11576

- score=360.0 cost=14 walkSteps=6 explored=651 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=8 firstBoxStickyShift=1 firstMaterial=10
- inputs=left right down down left left down right up up right up left left
- events=pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:sticky#5 move_sticky_rigid push_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1
- stepEvents=
  1. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  2. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  3. down: walk
  4. down: walk
  5. left: pull_object:sticky#5 move_sticky_rigid
  6. left: push_object:sticky#3 move_sticky_rigid sticky_merge:n1
  7. down: walk
  8. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. up: walk
  10. up: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  11. right: walk
  12. up: walk
  13. left: push_object:crate#1
  14. left: push_object:crate#1

```text
#######
#G..@B#
#M..MS#
#.M..M#
#M.PLG#
#######
```

### 2. RA_SOFT_INTERLOCK_SEARCH_993101_6228

- score=358.0 cost=17 walkSteps=7 explored=1080 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=7 firstBoxStickyShift=14 firstMaterial=11
- inputs=up left up right up right down left down right right left up left down right left
- events=walk walk walk push_object:crate#2 walk push_object:crate#1 push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull walk walk push_object:crate#2 push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
- stepEvents=
  1. up: walk
  2. left: walk
  3. up: walk
  4. right: push_object:crate#2
  5. up: walk
  6. right: push_object:crate#1
  7. down: push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull
  8. left: walk
  9. down: walk
  10. right: push_object:crate#2
  11. right: push_object:crate#2 box_to_sticky:n1 sticky_merge:n1
  12. left: pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
  13. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n2
  15. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. right: walk
  17. left: pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2

```text
#######
#..C.M#
#.CGBS#
#..PL.#
#G@..M#
#######
```

### 3. RA_SOFT_INTERLOCK_SEARCH_993101_4616

- score=342.0 cost=19 walkSteps=7 explored=601 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=6 firstBoxStickyShift=8 firstMaterial=8
- inputs=up right right right right down down left up right right left left down left up right left down
- events=walk walk walk walk push_object:crate#3 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n3 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n3 pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. up: walk
  2. right: walk
  3. right: walk
  4. right: walk
  5. right: push_object:crate#3
  6. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  9. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. right: walk
  11. right: walk
  12. left: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  13. left: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n3
  14. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n1
  16. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. right: walk
  18. left: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n3
  19. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.C#PLC.#
#....C..#
#@G.G..M#
#....GBS#
#########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_993101_851

- score=330.0 cost=17 walkSteps=4 explored=233 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=1 firstMaterial=17
- inputs=up right down up left down left up down left right up right down right left left
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1
- stepEvents=
  1. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  2. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. down: walk
  4. up: pull_object:crate#1
  5. left: walk
  6. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. left: pull_object:crate#1
  8. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  9. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. left: walk
  11. right: pull_object:sticky#1 move_sticky_rigid
  12. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. right: push_object:crate#1
  14. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. right: walk
  16. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  17. left: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1

```text
#########
#...GGP.#
#MM..@L.#
#.MGSBCC#
#########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_993101_9552

- score=326.0 cost=16 walkSteps=6 explored=5505 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=11 firstBoxStickyShift=13 firstMaterial=12
- inputs=right right right up down left left left up up right right right up left left
- events=push_object:crate#4 push_object:crate#4 push_object:crate#4 push_object:crate#3 walk walk walk walk walk push_object:crate#1 push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull box_to_sticky:n1 push_object:push_pull_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: push_object:crate#4
  2. right: push_object:crate#4
  3. right: push_object:crate#4
  4. up: push_object:crate#3
  5. down: walk
  6. left: walk
  7. left: walk
  8. left: walk
  9. up: walk
  10. up: push_object:crate#1
  11. right: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull
  12. right: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull box_to_sticky:n1
  13. right: push_object:push_pull_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  14. up: walk
  15. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.LG.BS.#
#CPC..GG#
#.#.C...#
#@C....##
#########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_993101_11034

- score=320.0 cost=16 walkSteps=7 explored=5231 probe=found bypass=true missing=push_pull_anchor_shift,box_sticky_anchor_shift,pull_event
- firstPushPullShift=2 firstBoxStickyShift=6 firstMaterial=12
- inputs=left down up left down right right up up right right down right down down left
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 move_sticky_rigid walk push_object:sticky#3 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1
- stepEvents=
  1. left: walk
  2. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. up: walk
  4. left: push_object:sticky#1 move_sticky_rigid
  5. down: walk
  6. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  7. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  8. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. right: pull_object:sticky#2 move_sticky_rigid
  11. right: walk
  12. down: push_object:sticky#3 move_sticky_rigid sticky_to_box:n1
  13. right: walk
  14. down: walk
  15. down: walk
  16. left: push_object:crate#1

```text
#########
#..M...##
#GM.@GM.#
#SLP..M.#
#B...G..#
#########
```

### 7. RA_SOFT_INTERLOCK_SEARCH_993101_5379

- score=314.0 cost=21 walkSteps=9 explored=843 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=3 firstBoxStickyShift=7 firstMaterial=5
- inputs=down right right left up left right right down left up left left down right up right right left left left
- events=walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. down: walk
  2. right: walk
  3. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  4. left: walk
  5. up: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  6. left: walk
  7. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. right: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky
  9. down: pull_object:crate#1 box_to_sticky:n1
  10. left: walk
  11. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  12. left: pull_object:sticky#1 move_sticky_rigid
  13. left: pull_object:sticky#1 move_sticky_rigid
  14. down: walk
  15. right: walk
  16. up: push_object:sticky#1 move_sticky_rigid
  17. right: walk
  18. right: walk
  19. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  20. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  21. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..#....#
#.BG.C.C#
#.S@MLM.#
##.G.P..#
#########
```

### 8. RA_SOFT_INTERLOCK_SEARCH_993101_4350

- score=312.0 cost=17 walkSteps=7 explored=417 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=7 firstBoxStickyShift=11 firstMaterial=17
- inputs=right left left left left down right right right down left up right up left left left
- events=walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. right: walk
  2. left: pull_object:sticky#2 move_sticky_rigid
  3. left: pull_object:sticky#2 move_sticky_rigid
  4. left: pull_object:sticky#2 move_sticky_rigid
  5. left: walk
  6. down: walk
  7. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. down: walk
  11. left: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  12. up: walk
  13. right: walk
  14. up: walk
  15. left: push_object:sticky#2 move_sticky_rigid
  16. left: push_object:sticky#1 move_sticky_rigid
  17. left: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
##########
#G...@.M.#
#..PL...M#
#GBSM.#.##
##########
```

### 9. RA_SOFT_INTERLOCK_SEARCH_993101_11642

- score=312.0 cost=15 walkSteps=7 explored=970 probe=found bypass=true missing=material_normalization
- firstPushPullShift=4 firstBoxStickyShift=6 firstMaterial=6
- inputs=down down left right up left up left down left down right down right up
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#4 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#2 walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 sticky_merge:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. down: walk
  2. down: walk
  3. left: walk
  4. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. up: pull_object:crate#4
  6. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  7. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. left: walk
  9. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. left: push_object:crate#2
  11. down: walk
  12. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 sticky_merge:n1
  13. down: walk
  14. right: walk
  15. up: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#C#..@G.#
#GC...BS#
#.PL...M#
#.C..CC.#
#########
```

### 10. RA_SOFT_INTERLOCK_SEARCH_993101_3881

- score=310.0 cost=20 walkSteps=9 explored=8412 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=11 firstBoxStickyShift=14 firstMaterial=14
- inputs=down left up left left up down right right down right right up left left left down right right up
- events=pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. down: pull_object:sticky#2 move_sticky_rigid
  2. left: walk
  3. up: walk
  4. left: pull_object:sticky#2 move_sticky_rigid
  5. left: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  6. up: push_object:sticky#1 move_sticky_rigid
  7. down: walk
  8. right: walk
  9. right: walk
  10. down: walk
  11. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. up: walk
  14. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  15. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. left: walk
  17. down: walk
  18. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  20. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#...M...#
#MG.MGM.#
#...@.SB#
#PL...MG#
#########
```

### 11. RA_SOFT_INTERLOCK_SEARCH_993101_3864

- score=304.0 cost=18 walkSteps=8 explored=3956 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=3 firstBoxStickyShift=10 firstMaterial=3
- inputs=left up down left down left up up left right right up left left left down right down
- events=walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. left: walk
  2. up: walk
  3. down: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1
  4. left: pull_object:sticky#1 move_sticky_rigid
  5. down: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  6. left: walk
  7. up: walk
  8. up: walk
  9. left: walk
  10. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. up: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
  13. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. down: walk
  17. right: walk
  18. down: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#....LP##
#B.GCGC.#
#S....@.#
##.G...M#
#########
```

### 12. RA_SOFT_INTERLOCK_SEARCH_993101_10177

- score=304.0 cost=18 walkSteps=7 explored=1969 probe=found bypass=true missing=material_normalization
- firstPushPullShift=6 firstBoxStickyShift=2 firstMaterial=10
- inputs=left down right up up left up left right right right down right down left left left left
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
- stepEvents=
  1. left: walk
  2. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  3. right: walk
  4. up: walk
  5. up: walk
  6. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. left: walk
  9. right: pull_object:sticky#2 move_sticky_rigid
  10. right: pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  11. right: pull_object:crate#1
  12. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. right: walk
  14. down: walk
  15. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
##########
#..M..G..#
#...SB.LP#
#.MG..@..#
#GM.#..C.#
##########
```

### 13. RA_SOFT_INTERLOCK_SEARCH_993101_6519

- score=302.0 cost=21 walkSteps=11 explored=1750 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=4 firstBoxStickyShift=12 firstMaterial=13
- inputs=down left up down right right up up left left left right right right down down left left right right up
- events=walk push_object:crate#2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 push_object:crate#3 walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. down: walk
  2. left: push_object:crate#2
  3. up: walk
  4. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: pull_object:crate#2
  6. right: push_object:crate#3
  7. up: walk
  8. up: walk
  9. left: walk
  10. left: walk
  11. left: walk
  12. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  14. right: walk
  15. down: walk
  16. down: walk
  17. left: walk
  18. left: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  19. right: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
  20. right: pull_object:crate#2
  21. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#....####
#SBGLPG.#
#..C.@..#
#...C.CG#
#########
```

### 14. RA_SOFT_INTERLOCK_SEARCH_993101_7974

- score=302.0 cost=16 walkSteps=8 explored=1844 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=2 firstBoxStickyShift=6 firstMaterial=6
- inputs=down right right up right left down down right up down right right up right up
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. down: walk
  2. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: walk
  5. right: walk
  6. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  7. down: walk
  8. down: walk
  9. right: walk
  10. up: walk
  11. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. right: push_object:sticky#1 move_sticky_rigid
  13. right: push_object:sticky#1 move_sticky_rigid
  14. up: walk
  15. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. up: pull_object:sticky#1 move_sticky_rigid

```text
##########
#C#C..#..#
#.@#..BS.#
#L.....GG#
#P.G..C..#
##########
```

### 15. RA_SOFT_INTERLOCK_SEARCH_993101_10057

- score=302.0 cost=17 walkSteps=6 explored=333 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=2 firstMaterial=1
- inputs=up right left down right up right right down left left down right right right up left
- events=pull_object:crate#1 box_to_sticky:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: pull_object:crate#1 box_to_sticky:n1
  2. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  3. left: walk
  4. down: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  5. right: walk
  6. up: walk
  7. right: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  8. right: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  9. down: walk
  10. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. down: walk
  13. right: pull_object:crate#1
  14. right: pull_object:crate#1
  15. right: pull_object:crate#1
  16. up: walk
  17. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.P.....#
#@LS.M..#
#C.BGG.C#
#########
```

### 16. RA_SOFT_INTERLOCK_SEARCH_993101_4541

- score=300.0 cost=22 walkSteps=10 explored=7100 probe=found bypass=true missing=box_sticky_anchor_shift,sticky_rigid_move
- firstPushPullShift=3 firstBoxStickyShift=14 firstMaterial=14
- inputs=left left down down right down left up up up left left down right down left right up right down left right
- events=walk push_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 push_object:crate#1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n1 walk walk pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
- stepEvents=
  1. left: walk
  2. left: push_object:crate#1
  3. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: walk
  6. down: walk
  7. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. up: walk
  9. up: walk
  10. up: walk
  11. left: push_object:crate#1
  12. left: push_object:crate#1
  13. down: walk
  14. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n1
  15. down: walk
  16. left: walk
  17. right: pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
  18. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  20. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  21. left: walk
  22. right: pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2

```text
#########
#.G..C.@#
#SB.LP#C#
#.C....C#
#.C...G.#
#########
```

### 17. RA_SOFT_INTERLOCK_SEARCH_993101_281

- score=298.0 cost=16 walkSteps=6 explored=130 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=7 firstBoxStickyShift=7 firstMaterial=1
- inputs=right right right up left up down right down left right up right right down left
- events=push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 push_object:crate#3 push_object:crate#3 walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#2 walk walk pull_object:crate#2 push_object:crate#3
- stepEvents=
  1. right: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  2. right: push_object:crate#3
  3. right: push_object:crate#3
  4. up: walk
  5. left: walk
  6. up: walk
  7. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  8. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. down: pull_object:crate#1
  10. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. right: walk
  12. up: push_object:crate#2
  13. right: walk
  14. right: walk
  15. down: pull_object:crate#2
  16. left: push_object:crate#3

```text
########
##SB#.##
##L.C.C#
#MP...G#
#@M.G..#
########
```

### 18. RA_SOFT_INTERLOCK_SEARCH_993101_6273

- score=298.0 cost=18 walkSteps=8 explored=657 probe=found bypass=true missing=material_normalization
- firstPushPullShift=5 firstBoxStickyShift=14 firstMaterial=18
- inputs=left left left left right right right right up up left left down left down right right up
- events=walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#2 pull_object:crate#2 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. left: walk
  2. left: walk
  3. left: walk
  4. left: walk
  5. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. up: walk
  10. up: walk
  11. left: pull_object:crate#2
  12. left: pull_object:crate#2
  13. down: walk
  14. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. down: walk
  16. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. up: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1

```text
##########
#....CG#.#
#.#.B...C#
##..S.M..#
#PL....@G#
##########
```

### 19. RA_SOFT_INTERLOCK_SEARCH_993101_6846

- score=298.0 cost=16 walkSteps=8 explored=2524 probe=found bypass=true missing=pull_event,material_normalization
- firstPushPullShift=7 firstBoxStickyShift=3 firstMaterial=12
- inputs=up left left up up left right down down down left left up right right right
- events=walk walk push_object:crate#2 force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#3 push_object:crate#3 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#2 push_object:crate#2 push_object:crate#2
- stepEvents=
  1. up: walk
  2. left: walk
  3. left: push_object:crate#2 force_chain:n2 anchor_boundary_shift:box_sticky
  4. up: walk
  5. up: walk
  6. left: walk
  7. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. down: walk
  9. down: walk
  10. down: walk
  11. left: push_object:crate#3
  12. left: push_object:crate#3 box_to_sticky:n1 sticky_merge:n1
  13. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. right: push_object:crate#2
  15. right: push_object:crate#2
  16. right: push_object:crate#2

```text
##########
#..L.....#
#..PG.#C.#
#..SBC.G.#
#M..C.#@.#
##########
```

### 20. RA_SOFT_INTERLOCK_SEARCH_993101_3693

- score=294.0 cost=17 walkSteps=8 explored=689 probe=found bypass=true missing=material_normalization
- firstPushPullShift=8 firstBoxStickyShift=2 firstMaterial=16
- inputs=up left down down right right right left left left up right right right up left left
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 pull_object:crate#1 push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  3. down: walk
  4. down: walk
  5. right: walk
  6. right: walk
  7. right: walk
  8. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. up: walk
  12. right: pull_object:crate#1
  13. right: pull_object:crate#1
  14. right: push_object:sticky#1 move_sticky_rigid
  15. up: walk
  16. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  17. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#G..BS#.#
#C.@.MG.#
#...G.LP#
#########
```

### 21. RA_SOFT_INTERLOCK_SEARCH_993101_2048

- score=292.0 cost=14 walkSteps=7 explored=367 probe=complete bypass=false missing=n/a
- firstPushPullShift=6 firstBoxStickyShift=6 firstMaterial=6
- inputs=up up down down left left right up left down right up right left
- events=walk walk pull_object:crate#1 pull_object:crate#1 walk push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid sticky_to_box:n1 walk push_object:crate#2 pull_object:crate#3 walk walk push_object:crate#3 force_chain:n2 walk pull_object:crate#4
- stepEvents=
  1. up: walk
  2. up: walk
  3. down: pull_object:crate#1
  4. down: pull_object:crate#1
  5. left: walk
  6. left: push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid sticky_to_box:n1
  7. right: walk
  8. up: push_object:crate#2
  9. left: pull_object:crate#3
  10. down: walk
  11. right: walk
  12. up: push_object:crate#3 force_chain:n2
  13. right: walk
  14. left: pull_object:crate#4

```text
##########
#...M#GC.#
#...#....#
#.L##.CGC#
#.PMSB.@.#
##########
```

### 22. RA_SOFT_INTERLOCK_SEARCH_993101_10222

- score=292.0 cost=23 walkSteps=10 explored=45648 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=9 firstMaterial=13
- inputs=down right up right right down down down right right up up left up left left left down right right right down left
- events=push_object:crate#1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 walk push_object:crate#1 push_object:crate#1 push_object:crate#1 walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. down: push_object:crate#1
  2. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1
  3. up: walk
  4. right: walk
  5. right: push_object:sticky#1 move_sticky_rigid
  6. down: walk
  7. down: walk
  8. down: walk
  9. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. up: walk
  12. up: walk
  13. left: push_object:sticky#1 move_sticky_rigid sticky_to_box:n3
  14. up: walk
  15. left: push_object:crate#1
  16. left: push_object:crate#1
  17. left: push_object:crate#1
  18. down: walk
  19. right: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull box_to_sticky:n2 sticky_merge:n1
  20. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  21. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  22. down: walk
  23. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#.@..M.#.#
#.CPM.G.G#
#..LM....#
#..BS....#
##########
```

### 23. RA_SOFT_INTERLOCK_SEARCH_993101_4141

- score=290.0 cost=21 walkSteps=11 explored=6936 probe=found bypass=true missing=material_normalization
- firstPushPullShift=9 firstBoxStickyShift=13 firstMaterial=19
- inputs=up left left right right up right right up left down left down down right up right up left left left
- events=walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. left: walk
  3. left: walk
  4. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  5. right: pull_object:sticky#1 move_sticky_rigid
  6. up: walk
  7. right: walk
  8. right: walk
  9. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. left: walk
  11. down: walk
  12. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. down: walk
  15. right: push_object:crate#1
  16. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. right: walk
  18. up: walk
  19. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2
  20. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  21. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#.#.SB..#
#G.G....#
##M.G..L#
##.M.@CP#
#########
```

### 24. RA_SOFT_INTERLOCK_SEARCH_993101_11625

- score=290.0 cost=19 walkSteps=8 explored=3741 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=3 firstBoxStickyShift=8 firstMaterial=18
- inputs=right right up left left up left down down right up up right left left left up left left
- events=pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1
- stepEvents=
  1. right: pull_object:sticky#1 move_sticky_rigid
  2. right: pull_object:sticky#1 move_sticky_rigid
  3. up: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  4. left: walk
  5. left: walk
  6. up: walk
  7. left: walk
  8. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. right: walk
  11. up: walk
  12. up: walk
  13. right: walk
  14. left: pull_object:sticky#2 move_sticky_rigid
  15. left: pull_object:sticky#1 move_sticky_rigid
  16. left: pull_object:sticky#1 move_sticky_rigid
  17. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  18. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  19. left: pull_object:crate#1

```text
#########
#.GBS.G.#
#.#...LP#
#.#....M#
#.C#M@..#
#########
```

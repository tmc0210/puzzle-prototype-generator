# Soft Interlock Search

- seed: 993102
- iterations: 12000
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 34
- costRange: 14-28
- wallRate: 0.16
- hits: 3
- solverHits: 24

## 1. RA_SOFT_INTERLOCK_SEARCH_993102_3165

- score=475.3 cost=22 walkSteps=10 explored=426 graphStates=482 winStates=1 probeStates=668 scc=branching_win_dag
- firstPushPullShift=2 firstBoxStickyShift=1 firstMaterial=22
- inputs=right down left up down right right down left up up right left down down right right up up right right down
- events=push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1
- stepEvents=
  1. right: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  2. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: walk
  4. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. down: walk
  6. right: walk
  7. right: walk
  8. down: pull_object:sticky#2 move_sticky_rigid
  9. left: walk
  10. up: walk
  11. up: walk
  12. right: walk
  13. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. right: pull_object:sticky#1 move_sticky_rigid
  17. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  18. up: walk
  19. up: walk
  20. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  21. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  22. down: pull_object:crate#1 box_to_sticky:n1

```text
########
#PLB.C.#
#@MS..G#
#.G..#.#
#M.G..##
########
```

## 2. RA_SOFT_INTERLOCK_SEARCH_993102_7119

- score=360.0 cost=17 walkSteps=7 explored=108 graphStates=141 winStates=2 probeStates=148 scc=branching_win_dag
- firstPushPullShift=1 firstBoxStickyShift=1 firstMaterial=1
- inputs=right up left up right right down down left up up down down right up right right
- events=push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#2 pull_object:crate#3 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 pull_object:crate#2 walk push_object:crate#4 pull_object:crate#4 pull_object:crate#4
- stepEvents=
  1. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2
  2. up: walk
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: walk
  5. right: walk
  6. right: walk
  7. down: pull_object:crate#2
  8. down: pull_object:crate#3
  9. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. up: walk
  11. up: walk
  12. down: pull_object:crate#1
  13. down: pull_object:crate#2
  14. right: walk
  15. up: push_object:crate#4
  16. right: pull_object:crate#4
  17. right: pull_object:crate#4

```text
#######
##CCM.#
#...M.#
#.L.G.#
#@PBSG#
#######
```

## 3. RA_SOFT_INTERLOCK_SEARCH_993102_135

- score=317.9 cost=15 walkSteps=6 explored=115 graphStates=555 winStates=161 probeStates=555 scc=branching_win_dag
- firstPushPullShift=1 firstBoxStickyShift=8 firstMaterial=8
- inputs=left left left down down right right right right right left up left up left
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#3 push_object:crate#3 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. down: walk
  5. down: walk
  6. right: walk
  7. right: walk
  8. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  9. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  11. left: walk
  12. up: push_object:crate#3
  13. left: push_object:crate#3
  14. up: walk
  15. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#G..@LPM##
#.#.CM#.##
#...BS..G#
##########
```

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_993102_5097

- score=368.0 cost=15 walkSteps=8 explored=200 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=1 firstBoxStickyShift=10 firstMaterial=5
- inputs=right up right down left up right right down up left down left right right
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#4 move_sticky_rigid sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
- stepEvents=
  1. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. up: walk
  3. right: walk
  4. down: walk
  5. left: pull_object:crate#1 box_to_sticky:n1
  6. up: walk
  7. right: walk
  8. right: walk
  9. down: walk
  10. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  11. left: push_object:sticky#4 move_sticky_rigid sticky_merge:n1
  12. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. left: walk
  14. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  15. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2

```text
########
#.M#M.G#
#MP....#
#.L@.GC#
#..#.SB#
########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_993102_6366

- score=310.0 cost=18 walkSteps=6 explored=15248 probe=found bypass=true missing=material_normalization
- firstPushPullShift=1 firstBoxStickyShift=3 firstMaterial=9
- inputs=left up left left up up right right down down left up down down right right up up
- events=push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#3 push_object:crate#3 push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. up: walk
  3. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  4. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: walk
  8. right: walk
  9. down: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  10. down: push_object:crate#1
  11. left: walk
  12. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. down: walk
  14. down: walk
  15. right: push_object:crate#3
  16. right: push_object:crate#3
  17. up: push_object:crate#1 box_to_sticky:n1
  18. up: push_object:sticky#1 move_sticky_rigid

```text
#########
#.G..G.##
#..SM...#
#..B.C..#
#C.LP@G##
#########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_993102_11474

- score=310.0 cost=18 walkSteps=7 explored=2051 probe=found bypass=true missing=push_pull_anchor_shift,box_sticky_anchor_shift,material_normalization
- firstPushPullShift=7 firstBoxStickyShift=7 firstMaterial=5
- inputs=left left right right right up left left down left up left left down right right up down
- events=walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk pull_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:crate#1 pull_object:crate#2 walk pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. left: walk
  2. left: walk
  3. right: pull_object:sticky#2 move_sticky_rigid
  4. right: pull_object:sticky#2 move_sticky_rigid
  5. right: pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  6. up: walk
  7. left: pull_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  8. left: pull_object:push_pull_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  9. down: pull_object:crate#1
  10. left: pull_object:crate#2
  11. up: walk
  12. left: pull_object:crate#1
  13. left: pull_object:crate#1 box_to_sticky:n1
  14. down: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  15. right: walk
  16. right: walk
  17. up: walk
  18. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#.M.SBCP#
#.G....L#
#GM..@.##
#########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_993102_59

- score=306.0 cost=17 walkSteps=8 explored=270 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization,sticky_rigid_move
- firstPushPullShift=4 firstBoxStickyShift=5 firstMaterial=5
- inputs=down right up down left left up up right right down up left up left down down
- events=pull_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 walk walk push_object:crate#1 push_object:crate#1
- stepEvents=
  1. down: pull_object:crate#1
  2. right: walk
  3. up: walk
  4. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  6. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. up: walk
  8. up: walk
  9. right: walk
  10. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  11. down: walk
  12. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  13. left: push_object:crate#1
  14. up: walk
  15. left: walk
  16. down: push_object:crate#1
  17. down: push_object:crate#1

```text
########
#..P#M.#
#.CLG#.#
#.@.C..#
#G..BS##
########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_993102_10426

- score=306.0 cost=17 walkSteps=8 explored=3972 probe=found bypass=true missing=material_normalization
- firstPushPullShift=3 firstBoxStickyShift=3 firstMaterial=12
- inputs=down right up left up left down right down left left left up right up right down
- events=walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#3 move_sticky_rigid walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- stepEvents=
  1. down: walk
  2. right: walk
  3. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  4. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. up: walk
  6. left: walk
  7. down: walk
  8. right: pull_object:sticky#3 move_sticky_rigid
  9. down: walk
  10. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  13. up: walk
  14. right: walk
  15. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  16. right: push_object:crate#1
  17. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#M#..GG.#
#..M.@.P#
#..G...L#
#M.#..SB#
#########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_993102_9905

- score=304.0 cost=16 walkSteps=7 explored=1753 probe=found bypass=true missing=material_normalization
- firstPushPullShift=8 firstBoxStickyShift=6 firstMaterial=3
- inputs=down left up right down left down up right up right down down left left up
- events=walk walk pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 walk walk push_object:crate#2 box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:crate#1
- stepEvents=
  1. down: walk
  2. left: walk
  3. up: pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  4. right: walk
  5. down: walk
  6. left: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky
  7. down: walk
  8. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. right: pull_object:crate#1
  10. up: walk
  11. right: walk
  12. down: push_object:crate#2 box_to_sticky:n1
  13. down: push_object:sticky#2 move_sticky_rigid
  14. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  16. up: push_object:crate#1

```text
#########
#..#G@..#
#..B..CC#
#G.SM..##
##.MLP..#
#########
```

### 7. RA_SOFT_INTERLOCK_SEARCH_993102_982

- score=302.0 cost=16 walkSteps=8 explored=402 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization,sticky_rigid_move
- firstPushPullShift=13 firstBoxStickyShift=5 firstMaterial=16
- inputs=up right right down left down right right right right right up up down right up
- events=walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. up: walk
  2. right: walk
  3. right: walk
  4. down: walk
  5. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  6. down: walk
  7. right: push_object:sticky#1 move_sticky_rigid
  8. right: push_object:sticky#1 move_sticky_rigid
  9. right: push_object:sticky#1 move_sticky_rigid
  10. right: push_object:sticky#1 move_sticky_rigid
  11. right: push_object:sticky#1 move_sticky_rigid
  12. up: walk
  13. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. down: walk
  15. right: walk
  16. up: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
##########
#..#CCCG.#
#.....CPL#
#@B...#.G#
#.SM.....#
##########
```

### 8. RA_SOFT_INTERLOCK_SEARCH_993102_8828

- score=302.0 cost=16 walkSteps=8 explored=698 probe=found bypass=true missing=material_normalization
- firstPushPullShift=2 firstBoxStickyShift=7 firstMaterial=7
- inputs=down left left up right right right down left right down left left up down left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. down: walk
  2. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: walk
  5. right: walk
  6. right: walk
  7. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  8. down: walk
  9. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. right: walk
  11. down: walk
  12. left: push_object:sticky#1 move_sticky_rigid
  13. left: push_object:sticky#1 move_sticky_rigid
  14. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. down: walk
  16. left: push_object:sticky#1 move_sticky_rigid

```text
##########
######C..#
#..G@SB.##
##...LPC.#
#G..M....#
##########
```

### 9. RA_SOFT_INTERLOCK_SEARCH_993102_3165

- score=288.0 cost=22 walkSteps=10 explored=426 probe=complete bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=1 firstMaterial=22
- inputs=right down left up down right right down left up up right left down down right right up up right right down
- events=push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1
- stepEvents=
  1. right: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  2. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: walk
  4. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. down: walk
  6. right: walk
  7. right: walk
  8. down: pull_object:sticky#2 move_sticky_rigid
  9. left: walk
  10. up: walk
  11. up: walk
  12. right: walk
  13. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. right: pull_object:sticky#1 move_sticky_rigid
  17. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  18. up: walk
  19. up: walk
  20. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  21. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  22. down: pull_object:crate#1 box_to_sticky:n1

```text
########
#PLB.C.#
#@MS..G#
#.G..#.#
#M.G..##
########
```

### 10. RA_SOFT_INTERLOCK_SEARCH_993102_3064

- score=280.0 cost=18 walkSteps=9 explored=573 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=11 firstBoxStickyShift=15 firstMaterial=14
- inputs=up left left left down right right right up right left left down down right right up left
- events=walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. up: walk
  2. left: pull_object:sticky#2 move_sticky_rigid
  3. left: pull_object:sticky#2 move_sticky_rigid
  4. left: pull_object:sticky#1 move_sticky_rigid
  5. down: walk
  6. right: walk
  7. right: walk
  8. right: walk
  9. up: walk
  10. right: walk
  11. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. down: walk
  14. down: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  15. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. up: walk
  18. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#..G.ML#
#..G@.P#
#.#MS..#
##..B..#
########
```

### 11. RA_SOFT_INTERLOCK_SEARCH_993102_4035

- score=278.0 cost=19 walkSteps=10 explored=1146 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=3 firstBoxStickyShift=3 firstMaterial=5
- inputs=right right down left up left left down down right right right up up left right down left left
- events=walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid
- stepEvents=
  1. right: walk
  2. right: walk
  3. down: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  4. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  5. up: pull_object:crate#1 box_to_sticky:n1
  6. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. down: walk
  9. down: walk
  10. right: walk
  11. right: walk
  12. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. up: walk
  14. up: walk
  15. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. right: walk
  17. down: walk
  18. left: push_object:sticky#2 move_sticky_rigid
  19. left: push_object:sticky#2 move_sticky_rigid

```text
#######
#.MMLP#
#G@..S#
#G...B#
#...C.#
#######
```

### 12. RA_SOFT_INTERLOCK_SEARCH_993102_11065

- score=276.0 cost=22 walkSteps=12 explored=854 probe=found bypass=true missing=material_normalization
- firstPushPullShift=2 firstBoxStickyShift=9 firstMaterial=10
- inputs=down up right down down left up down left left down left up right up up right down right down right up
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid
- stepEvents=
  1. down: walk
  2. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: pull_object:sticky#1 move_sticky_rigid
  4. down: walk
  5. down: walk
  6. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. up: walk
  8. down: pull_object:sticky#1 move_sticky_rigid
  9. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  10. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  11. down: walk
  12. left: walk
  13. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. right: walk
  15. up: walk
  16. up: walk
  17. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. down: walk
  19. right: push_object:sticky#2 move_sticky_rigid
  20. down: walk
  21. right: walk
  22. up: push_object:sticky#2 move_sticky_rigid

```text
#########
#.C..M@G#
#.C.G...#
#..BS.L.#
#....#P.#
#########
```

### 13. RA_SOFT_INTERLOCK_SEARCH_993102_135

- score=272.0 cost=15 walkSteps=6 explored=115 probe=complete bypass=false missing=n/a
- firstPushPullShift=1 firstBoxStickyShift=8 firstMaterial=8
- inputs=left left left down down right right right right right left up left up left
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#3 push_object:crate#3 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. down: walk
  5. down: walk
  6. right: walk
  7. right: walk
  8. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  9. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  11. left: walk
  12. up: push_object:crate#3
  13. left: push_object:crate#3
  14. up: walk
  15. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#G..@LPM##
#.#.CM#.##
#...BS..G#
##########
```

### 14. RA_SOFT_INTERLOCK_SEARCH_993102_7235

- score=270.0 cost=20 walkSteps=10 explored=1822 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=5 firstBoxStickyShift=11 firstMaterial=12
- inputs=down left up up left down down down left left right right right right up left left up up right
- events=walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. down: walk
  2. left: walk
  3. up: pull_object:sticky#2 move_sticky_rigid
  4. up: pull_object:sticky#2 move_sticky_rigid
  5. left: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  6. down: walk
  7. down: walk
  8. down: walk
  9. left: walk
  10. left: walk
  11. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  13. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  14. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. up: walk
  16. left: walk
  17. left: walk
  18. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  19. up: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  20. right: push_object:sticky#1 move_sticky_rigid

```text
#########
##GPMM.G#
#..L...@#
##.#....#
#BS...M.#
#########
```

### 15. RA_SOFT_INTERLOCK_SEARCH_993102_6932

- score=258.0 cost=25 walkSteps=13 explored=665 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=13 firstBoxStickyShift=4 firstMaterial=15
- inputs=left left left down right right up up left down up left down right right right up left right down left down right up left
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 walk push_object:crate#2 pull_object:crate#1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
- stepEvents=
  1. left: walk
  2. left: walk
  3. left: walk
  4. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. right: walk
  6. right: walk
  7. up: walk
  8. up: walk
  9. left: walk
  10. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. up: walk
  12. left: walk
  13. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. right: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  15. right: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
  16. right: pull_object:crate#2
  17. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. left: walk
  19. right: pull_object:crate#1
  20. down: walk
  21. left: push_object:crate#2
  22. down: pull_object:crate#1
  23. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  24. up: walk
  25. left: push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1

```text
#######
#.LP.G#
#MSB..#
#MG..@#
#..G..#
#######
```

### 16. RA_SOFT_INTERLOCK_SEARCH_993102_7906

- score=244.0 cost=26 walkSteps=14 explored=560 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=8 firstBoxStickyShift=12 firstMaterial=15
- inputs=down right right down right right up right left left up down up right right down left up down down left right up left left left
- events=walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky walk push_object:crate#2 walk walk push_object:crate#1 push_object:crate#1 push_object:crate#1
- stepEvents=
  1. down: walk
  2. right: walk
  3. right: walk
  4. down: walk
  5. right: walk
  6. right: walk
  7. up: push_object:sticky#1 move_sticky_rigid
  8. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. left: walk
  10. left: walk
  11. up: walk
  12. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  13. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. right: pull_object:crate#1
  15. right: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  16. down: walk
  17. left: push_object:sticky#1 move_sticky_rigid sticky_to_box:n2
  18. up: walk
  19. down: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky
  20. down: walk
  21. left: push_object:crate#2
  22. right: walk
  23. up: walk
  24. left: push_object:crate#1
  25. left: push_object:crate#1
  26. left: push_object:crate#1

```text
#########
#..#BS###
#@#C..L.#
#G...MP.#
#.#G..M##
#########
```

### 17. RA_SOFT_INTERLOCK_SEARCH_993102_2948

- score=238.0 cost=17 walkSteps=9 explored=709 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=5 firstBoxStickyShift=14 firstMaterial=13
- inputs=right up right right left left left down down right right right right up up left left
- events=walk pull_object:crate#3 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:crate#4 box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: walk
  2. up: pull_object:crate#3
  3. right: walk
  4. right: walk
  5. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. down: walk
  9. down: walk
  10. right: walk
  11. right: walk
  12. right: walk
  13. right: push_object:crate#4 box_to_sticky:n1
  14. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. left: walk
  17. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##.C....#
#.G...LP#
#.@.#CBS#
##.C..CG#
#########
```

### 18. RA_SOFT_INTERLOCK_SEARCH_993102_7119

- score=234.0 cost=17 walkSteps=7 explored=108 probe=complete bypass=false missing=n/a
- firstPushPullShift=1 firstBoxStickyShift=1 firstMaterial=1
- inputs=right up left up right right down down left up up down down right up right right
- events=push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#2 pull_object:crate#3 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 pull_object:crate#2 walk push_object:crate#4 pull_object:crate#4 pull_object:crate#4
- stepEvents=
  1. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2
  2. up: walk
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: walk
  5. right: walk
  6. right: walk
  7. down: pull_object:crate#2
  8. down: pull_object:crate#3
  9. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. up: walk
  11. up: walk
  12. down: pull_object:crate#1
  13. down: pull_object:crate#2
  14. right: walk
  15. up: push_object:crate#4
  16. right: pull_object:crate#4
  17. right: pull_object:crate#4

```text
#######
##CCM.#
#...M.#
#.L.G.#
#@PBSG#
#######
```

### 19. RA_SOFT_INTERLOCK_SEARCH_993102_11406

- score=232.0 cost=24 walkSteps=11 explored=6580 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- firstPushPullShift=4 firstBoxStickyShift=9 firstMaterial=9
- inputs=up up left up right down right down left left up right left left up right right right down left left down left up
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. up: walk
  2. up: walk
  3. left: walk
  4. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: walk
  6. down: walk
  7. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. down: pull_object:sticky#1 move_sticky_rigid
  9. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  10. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  11. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: walk
  13. left: pull_object:crate#1 box_to_sticky:n1
  14. left: walk
  15. up: walk
  16. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. down: walk
  20. left: push_object:sticky#1 move_sticky_rigid
  21. left: push_object:sticky#1 move_sticky_rigid
  22. down: walk
  23. left: walk
  24. up: push_object:sticky#1 move_sticky_rigid

```text
########
#G..M.G#
#......#
#PL..SB#
#..@#M.#
########
```

### 20. RA_SOFT_INTERLOCK_SEARCH_993102_9037

- score=230.0 cost=25 walkSteps=12 explored=17835 probe=found bypass=true missing=material_normalization,sticky_rigid_move
- firstPushPullShift=9 firstBoxStickyShift=2 firstMaterial=15
- inputs=left right right right down left down left left up up right right left left down down right up left up left left left down
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1
- stepEvents=
  1. left: walk
  2. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  3. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  4. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. down: pull_object:sticky#1 move_sticky_rigid
  6. left: walk
  7. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. left: walk
  9. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. up: walk
  11. up: walk
  12. right: walk
  13. right: walk
  14. left: pull_object:sticky#1 move_sticky_rigid
  15. left: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  16. down: walk
  17. down: walk
  18. right: walk
  19. up: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  20. left: walk
  21. up: walk
  22. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  23. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  24. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  25. down: pull_object:crate#1

```text
#########
#C..#G#M#
#GBS.@..#
#.C.L...#
#...P...#
#########
```

### 21. RA_SOFT_INTERLOCK_SEARCH_993102_9828

- score=212.0 cost=25 walkSteps=13 explored=13043 probe=found bypass=true missing=sticky_rigid_move
- firstPushPullShift=13 firstBoxStickyShift=9 firstMaterial=22
- inputs=left left left down right up right right down down right right up down left left left left left up right right up right down
- events=walk walk walk pull_object:crate#1 push_object:crate#2 walk pull_object:crate#1 pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#2 push_object:crate#2 push_object:crate#2 walk walk push_object:crate#1 box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. left: walk
  2. left: walk
  3. left: walk
  4. down: pull_object:crate#1
  5. right: push_object:crate#2
  6. up: walk
  7. right: pull_object:crate#1
  8. right: pull_object:crate#1
  9. down: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky
  10. down: walk
  11. right: walk
  12. right: walk
  13. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. down: walk
  15. left: walk
  16. left: walk
  17. left: push_object:crate#2
  18. left: push_object:crate#2
  19. left: push_object:crate#2
  20. up: walk
  21. right: walk
  22. right: push_object:crate#1 box_to_sticky:n1
  23. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  24. right: walk
  25. down: push_object:sticky#1 move_sticky_rigid

```text
##########
#.C.BS..M#
##...@#L##
#..C...P.#
#G...G...#
##########
```

### 22. RA_SOFT_INTERLOCK_SEARCH_993102_11475

- score=198.0 cost=22 walkSteps=11 explored=6912 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=3 firstBoxStickyShift=3 firstMaterial=22
- inputs=down right up left down down right right up right up left left left up right down down left down right right
- events=walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:crate#3 pull_object:crate#3 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:crate#3 push_object:crate#3 box_to_sticky:n1
- stepEvents=
  1. down: walk
  2. right: walk
  3. up: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  4. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. down: walk
  6. down: walk
  7. right: pull_object:crate#3
  8. right: pull_object:crate#3
  9. up: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  10. right: walk
  11. up: walk
  12. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. up: walk
  16. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  17. down: walk
  18. down: walk
  19. left: walk
  20. down: walk
  21. right: push_object:crate#3
  22. right: push_object:crate#3 box_to_sticky:n1

```text
#########
#..C...G#
#C..@...#
##.#..BS#
#..C.LPG#
#########
```

### 23. RA_SOFT_INTERLOCK_SEARCH_993102_7220

- score=192.0 cost=24 walkSteps=13 explored=480 probe=found bypass=true missing=material_normalization
- firstPushPullShift=21 firstBoxStickyShift=21 firstMaterial=20
- inputs=right down down right right left left left left up up right right down down right right right right up left down left up
- events=walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: walk
  2. down: walk
  3. down: walk
  4. right: walk
  5. right: walk
  6. left: pull_object:sticky#1 move_sticky_rigid
  7. left: pull_object:sticky#1 move_sticky_rigid
  8. left: pull_object:sticky#1 move_sticky_rigid
  9. left: pull_object:sticky#1 move_sticky_rigid
  10. up: walk
  11. up: walk
  12. right: walk
  13. right: walk
  14. down: walk
  15. down: walk
  16. right: pull_object:sticky#1 move_sticky_rigid
  17. right: pull_object:sticky#1 move_sticky_rigid
  18. right: pull_object:sticky#1 move_sticky_rigid
  19. right: walk
  20. up: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  21. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  22. down: walk
  23. left: push_object:sticky#1 move_sticky_rigid
  24. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.C....C#
#.@.BG.G#
#.#GSLPM#
#.....M.#
#########
```

### 24. RA_SOFT_INTERLOCK_SEARCH_993102_8292

- score=170.0 cost=24 walkSteps=13 explored=3308 probe=found bypass=true missing=material_normalization
- firstPushPullShift=6 firstBoxStickyShift=17 firstMaterial=21
- inputs=down down right right right left left left up up right down right right right up left left left left left down left down
- events=walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#1 box_to_sticky:n1 push_object:crate#1
- stepEvents=
  1. down: walk
  2. down: walk
  3. right: walk
  4. right: walk
  5. right: walk
  6. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  8. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. up: walk
  10. up: walk
  11. right: walk
  12. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. right: walk
  14. right: walk
  15. right: walk
  16. up: walk
  17. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  18. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  19. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  20. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  21. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  22. down: walk
  23. left: push_object:crate#1 box_to_sticky:n1
  24. down: push_object:crate#1

```text
##########
#.G.@.SB.#
#.M.....P#
#.M.....L#
##G...##.#
##########
```

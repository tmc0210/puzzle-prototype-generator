# Vacate Interlock Search

- seed: 994104
- iterations: 20000
- maxStates: 140000
- graphMaxStates: 180000
- maxDepth: 44
- costRange: 20-36
- wallRate: 0.22
- hits: 0
- solverHits: 11

## Solver-Only Material

### 1. RA_VACATE_INTERLOCK_SEARCH_994104_18136

- score=401.0 cost=27 walkSteps=13 explored=654 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=4 firstBoxStickyShift=6 firstMaterial=6
- vacateFacts=3,1:10->25->final
- inputs=down left left down left right up up left right down right right up left left down down left up right down up left down right up
- events=walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. down: walk
  2. left: walk
  3. left: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  4. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. left: walk
  6. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  7. up: walk
  8. up: walk
  9. left: walk
  10. right: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1
  11. down: walk
  12. right: walk
  13. right: walk
  14. up: walk
  15. left: push_object:sticky#2 move_sticky_rigid sticky_merge:n1
  16. left: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2
  17. down: walk
  18. down: walk
  19. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  20. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  21. right: pull_object:sticky#1 move_sticky_rigid
  22. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  23. up: walk
  24. left: push_object:sticky#1 move_sticky_rigid
  25. down: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  26. right: pull_object:sticky#1 move_sticky_rigid
  27. up: push_object:sticky#1 move_sticky_rigid

```text
#########
##MG.M@.#
#.M.M..M#
#BSLP#.##
#.G..#..#
#########
```

### 2. RA_VACATE_INTERLOCK_SEARCH_994104_1743

- score=400.0 cost=22 walkSteps=12 explored=8222 probe=found bypass=true missing=material_normalization,sticky_rigid_move,sticky_merge
- firstPushPullShift=2 firstBoxStickyShift=14 firstMaterial=14
- vacateFacts=5,4:20->21->final
- inputs=right down right right down right up up left left right right right up left left left down down right right left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. right: walk
  2. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. right: walk
  4. right: walk
  5. down: pull_object:crate#1
  6. right: pull_object:sticky#1 move_sticky_rigid
  7. up: walk
  8. up: walk
  9. left: walk
  10. left: walk
  11. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  15. left: walk
  16. left: walk
  17. left: walk
  18. down: walk
  19. down: walk
  20. right: push_object:sticky#1 move_sticky_rigid
  21. right: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1
  22. left: pull_object:sticky#1 move_sticky_rigid

```text
#########
#PL.....#
#@..C..G#
##....BG#
#.#M.GSM#
#########
```

### 3. RA_VACATE_INTERLOCK_SEARCH_994104_10709

- score=366.0 cost=26 walkSteps=12 explored=686 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=5 firstBoxStickyShift=8 firstMaterial=22
- vacateFacts=5,2:5->18->final
- inputs=right up up up right right down up left down left left up right down right right left down right right up up left left left
- events=walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: walk
  2. up: walk
  3. up: walk
  4. up: walk
  5. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  6. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  7. down: walk
  8. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. left: walk
  10. down: walk
  11. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. up: walk
  14. right: walk
  15. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  16. right: walk
  17. right: walk
  18. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. down: walk
  20. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  21. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  22. up: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  23. up: pull_object:crate#2
  24. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  25. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  26. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#..P..##
#G.LCG.#
##..B..#
#@..SM.#
########
```

### 4. RA_VACATE_INTERLOCK_SEARCH_994104_18267

- score=362.0 cost=20 walkSteps=11 explored=553 probe=found bypass=true missing=material_normalization
- firstPushPullShift=8 firstBoxStickyShift=10 firstMaterial=18
- vacateFacts=4,2:7->12->final
- inputs=up left down right down right up right up down left down left up up right left left up left
- events=push_object:sticky#2 move_sticky_rigid walk walk walk walk walk push_object:sticky#3 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#3 move_sticky_rigid walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:sticky#2 move_sticky_rigid
- stepEvents=
  1. up: push_object:sticky#2 move_sticky_rigid
  2. left: walk
  3. down: walk
  4. right: walk
  5. down: walk
  6. right: walk
  7. up: push_object:sticky#3 move_sticky_rigid
  8. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. up: walk
  10. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  11. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. down: pull_object:sticky#3 move_sticky_rigid
  13. left: walk
  14. up: walk
  15. up: walk
  16. right: walk
  17. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  18. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  19. up: walk
  20. left: pull_object:sticky#2 move_sticky_rigid

```text
########
#.G.#SB#
##.MGL.#
#M.@MP.#
#M#..G.#
########
```

### 5. RA_VACATE_INTERLOCK_SEARCH_994104_2972

- score=360.0 cost=22 walkSteps=13 explored=1012 probe=found bypass=true missing=material_normalization,sticky_rigid_move
- firstPushPullShift=17 firstBoxStickyShift=8 firstMaterial=19
- vacateFacts=4,3:4->7->final
- inputs=down down left right up left up right left down down left right right right down left up up left up right
- events=walk walk walk pull_object:crate#2 walk walk pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:crate#2 pull_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. down: walk
  2. down: walk
  3. left: walk
  4. right: pull_object:crate#2
  5. up: walk
  6. left: walk
  7. up: pull_object:crate#2
  8. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  9. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. down: walk
  11. down: walk
  12. left: walk
  13. right: pull_object:crate#2
  14. right: pull_object:crate#2
  15. right: walk
  16. down: walk
  17. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. up: walk
  19. up: push_object:crate#1 box_to_sticky:n1
  20. left: walk
  21. up: walk
  22. right: push_object:sticky#1 move_sticky_rigid

```text
########
###S.@G#
##.B...#
#.CCG..#
##..LP.#
########
```

### 6. RA_VACATE_INTERLOCK_SEARCH_994104_5659

- score=350.0 cost=28 walkSteps=15 explored=6812 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=3 firstBoxStickyShift=10 firstMaterial=8
- vacateFacts=4,4:15->16->final
- inputs=down left up left left down left right up right down left down down right right up right up left left left up left down right down left
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#2 box_to_sticky:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. down: walk
  2. left: walk
  3. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: walk
  5. left: walk
  6. down: walk
  7. left: walk
  8. right: pull_object:crate#2 box_to_sticky:n1
  9. up: walk
  10. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  11. down: walk
  12. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  14. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  15. right: pull_object:crate#2 box_to_sticky:n1
  16. right: pull_object:sticky#1 move_sticky_rigid
  17. up: walk
  18. right: walk
  19. up: walk
  20. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  21. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  22. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  23. up: walk
  24. left: walk
  25. down: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  26. right: walk
  27. down: walk
  28. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#CBS...@#
##C.....#
#G...#LP#
#.#.G...#
#########
```

### 7. RA_VACATE_INTERLOCK_SEARCH_994104_8066

- score=350.0 cost=28 walkSteps=13 explored=569 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=5 firstBoxStickyShift=10 firstMaterial=9
- vacateFacts=4,2:5->6->final
- inputs=left left up up down down right right up left down left up up down left up right right down down left up right up up left left
- events=push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid walk push_object:sticky#2 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: push_object:sticky#1 move_sticky_rigid
  2. left: push_object:sticky#1 move_sticky_rigid
  3. up: walk
  4. up: walk
  5. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. right: pull_object:sticky#1 move_sticky_rigid
  8. right: walk
  9. up: push_object:sticky#2 force_chain:n2 move_sticky_rigid sticky_to_box:n1
  10. left: push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  11. down: walk
  12. left: push_object:sticky#1 move_sticky_rigid
  13. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. down: walk
  16. left: walk
  17. up: pull_object:sticky#1 move_sticky_rigid
  18. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  19. right: walk
  20. down: walk
  21. down: walk
  22. left: walk
  23. up: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  24. right: walk
  25. up: walk
  26. up: walk
  27. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  28. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#G..LP.#
#.CBG.C#
##.S..M#
#.#..M@#
########
```

### 8. RA_VACATE_INTERLOCK_SEARCH_994104_6648

- score=322.0 cost=30 walkSteps=16 explored=20219 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=1 firstMaterial=10
- vacateFacts=5,4:2->6->final
- inputs=right down left left down left up up left down down right up right right right down left left up left up right up right down down left down right
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk pull_object:crate#2 pull_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#2 walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk walk push_object:crate#1 push_object:crate#2 walk walk push_object:crate#2
- stepEvents=
  1. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  2. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: walk
  4. left: walk
  5. down: walk
  6. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. up: walk
  8. up: walk
  9. left: walk
  10. down: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  11. down: pull_object:crate#1
  12. right: walk
  13. up: walk
  14. right: pull_object:crate#2
  15. right: pull_object:crate#2
  16. right: walk
  17. down: walk
  18. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  20. up: push_object:crate#2
  21. left: walk
  22. up: walk
  23. right: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky
  24. up: walk
  25. right: walk
  26. down: push_object:crate#1
  27. down: push_object:crate#2
  28. left: walk
  29. down: walk
  30. right: push_object:crate#2

```text
#########
#M.S.G..#
#..B@.#C#
#...LP..#
#.G..G#.#
#########
```

### 9. RA_VACATE_INTERLOCK_SEARCH_994104_4040

- score=320.0 cost=34 walkSteps=13 explored=5158 probe=found bypass=true missing=material_normalization
- firstPushPullShift=13 firstBoxStickyShift=1 firstMaterial=27
- vacateFacts=6,2:13->14->final
- inputs=up up right down left left left right right up right right left left left left down down right right up up down right right up right down left up left down right right
- events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 push_object:crate#1
- stepEvents=
  1. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  2. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  3. right: pull_object:sticky#2 move_sticky_rigid
  4. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  5. left: push_object:sticky#2 move_sticky_rigid
  6. left: push_object:sticky#2 move_sticky_rigid
  7. left: push_object:sticky#2 move_sticky_rigid
  8. right: walk
  9. right: walk
  10. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  11. right: walk
  12. right: walk
  13. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. down: pull_object:sticky#2 move_sticky_rigid
  18. down: walk
  19. right: walk
  20. right: walk
  21. up: walk
  22. up: walk
  23. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  24. right: walk
  25. right: walk
  26. up: walk
  27. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  28. down: pull_object:crate#1
  29. left: walk
  30. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  31. left: pull_object:crate#1
  32. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  33. right: push_object:crate#1
  34. right: push_object:crate#1

```text
##########
#.M#...C.#
##.M..GL##
#G..SB.PG#
#...@CC#.#
##########
```

### 10. RA_VACATE_INTERLOCK_SEARCH_994104_17268

- score=304.0 cost=28 walkSteps=16 explored=3144 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=4 firstBoxStickyShift=3 firstMaterial=1
- vacateFacts=6,3:3->7->final
- inputs=left up down left left up left up left up right right right down right down down left left left left up right right down right up up
- events=push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk walk push_object:crate#1 push_object:crate#1
- stepEvents=
  1. left: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  2. up: walk
  3. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  4. left: push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull
  5. left: push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull
  6. up: walk
  7. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. up: pull_object:crate#2
  9. left: walk
  10. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. right: walk
  12. right: walk
  13. right: walk
  14. down: walk
  15. right: walk
  16. down: walk
  17. down: walk
  18. left: walk
  19. left: walk
  20. left: walk
  21. left: walk
  22. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  23. right: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky
  24. right: push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky
  25. down: walk
  26. right: walk
  27. up: push_object:crate#1
  28. up: push_object:crate#1

```text
##########
#.G..G#..#
#...#BS.M#
##..L.G..#
#C..P.M@##
##########
```

### 11. RA_VACATE_INTERLOCK_SEARCH_994104_17766

- score=294.0 cost=32 walkSteps=19 explored=6928 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=3 firstBoxStickyShift=23 firstMaterial=9
- vacateFacts=5,2:3->4->final
- inputs=left left down down left left up up down down right right right right up up left left left left up left right right right right down right down down left left
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 walk walk walk walk walk walk walk walk walk walk pull_object:crate#3 walk pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull push_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. left: walk
  3. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. left: walk
  6. left: walk
  7. up: walk
  8. up: walk
  9. down: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2
  10. down: pull_object:crate#2
  11. right: walk
  12. right: walk
  13. right: walk
  14. right: walk
  15. up: walk
  16. up: walk
  17. left: walk
  18. left: walk
  19. left: walk
  20. left: walk
  21. up: pull_object:crate#3
  22. left: walk
  23. right: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky
  24. right: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky
  25. right: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky
  26. right: pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky
  27. down: push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull
  28. right: push_object:crate#1
  29. down: walk
  30. down: walk
  31. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  32. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#SMM.LP..#
#B...G.@G#
#C#.#....#
#.#G....##
##########
```

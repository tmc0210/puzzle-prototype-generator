# Soft Interlock Search

- seed: 743024
- iterations: 2500
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 44
- costRange: 12-20
- wallRate: 0.15
- hits: 1
- solverHits: 6

## 1. RA_SOFT_INTERLOCK_SEARCH_743024_2229

- score=346.3 cost=13 walkSteps=7 explored=139 graphStates=324 winStates=8 probeStates=348 scc=branching_win_dag
- firstPushPullShift=7 firstBoxStickyShift=7 firstMaterial=7
- inputs=up right left down right down right right up left up left left
- events=walk walk pull_object:crate#1 walk walk pull_object:crate#1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk pull_object:crate#1 pull_object:crate#1
- stepEvents=
  1. up: walk
  2. right: walk
  3. left: pull_object:crate#1
  4. down: walk
  5. right: walk
  6. down: pull_object:crate#1
  7. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1
  8. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  9. up: walk
  10. left: walk
  11. up: walk
  12. left: pull_object:crate#1
  13. left: pull_object:crate#1

```text
#########
#.GCM.###
#@G..L..#
##.BSP.G#
#########
```

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_743024_1084

- score=366.0 cost=14 walkSteps=5 explored=1149 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=2 firstBoxStickyShift=4 firstMaterial=5
- inputs=right left left up right right down right down down left left up right
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#3 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1
- stepEvents=
  1. right: walk
  2. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. right: pull_object:crate#1 box_to_sticky:n1
  6. right: pull_object:sticky#1 move_sticky_rigid
  7. down: walk
  8. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  9. down: pull_object:sticky#3 move_sticky_rigid
  10. down: walk
  11. left: walk
  12. left: push_object:sticky#2 move_sticky_rigid
  13. up: walk
  14. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1

```text
########
#C...M.#
#G.@.LG#
#BS..PM#
#.GM..M#
########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_743024_323

- score=322.0 cost=15 walkSteps=8 explored=141 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=3 firstBoxStickyShift=2 firstMaterial=6
- inputs=down right right up right up left down down right up left up up left
- events=walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#2 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#2 walk walk walk push_object:crate#3 force_chain:n2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:crate#1
- stepEvents=
  1. down: walk
  2. right: push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  3. right: push_object:sticky#2 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid
  4. up: walk
  5. right: walk
  6. up: pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  7. left: pull_object:crate#2
  8. down: walk
  9. down: walk
  10. right: walk
  11. up: push_object:crate#3 force_chain:n2
  12. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. up: walk
  14. up: walk
  15. left: pull_object:crate#1

```text
#########
#.#.G..##
##.C..C.#
#.@#BGLG#
#M.MS.P.#
#########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_743024_1883

- score=312.0 cost=13 walkSteps=5 explored=128 probe=found bypass=true missing=material_normalization
- firstPushPullShift=1 firstBoxStickyShift=9 firstMaterial=8
- inputs=right right up left left left down down right up left up right
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#3 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  2. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. up: pull_object:sticky#3 move_sticky_rigid
  4. left: walk
  5. left: walk
  6. left: push_object:sticky#1 move_sticky_rigid
  7. down: walk
  8. down: push_object:sticky#2 move_sticky_rigid sticky_to_box:n1
  9. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. left: walk
  12. up: walk
  13. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
#.M.GG#
#PL@..#
#.MS.M#
#C.B..#
#######
```

### 4. RA_SOFT_INTERLOCK_SEARCH_743024_2486

- score=306.0 cost=19 walkSteps=9 explored=5916 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=3 firstBoxStickyShift=10 firstMaterial=10
- inputs=up right up left down down right right right up left down left up up left left right right
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. up: walk
  2. right: walk
  3. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: walk
  5. down: walk
  6. down: walk
  7. right: pull_object:sticky#2 move_sticky_rigid
  8. right: pull_object:sticky#2 move_sticky_rigid
  9. right: walk
  10. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  11. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. down: walk
  13. left: push_object:sticky#2 move_sticky_rigid
  14. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. left: walk
  17. left: walk
  18. right: pull_object:sticky#1 move_sticky_rigid
  19. right: pull_object:sticky#1 move_sticky_rigid

```text
#########
#C..G..G#
#CC...#B#
#M.G...S#
#..M@LP.#
#########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_743024_718

- score=278.0 cost=15 walkSteps=7 explored=332 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=3 firstBoxStickyShift=5 firstMaterial=5
- inputs=up right left left up right right right down down left up left right down
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk push_object:crate#2 push_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1
- stepEvents=
  1. up: walk
  2. right: walk
  3. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  6. right: walk
  7. right: walk
  8. right: walk
  9. down: walk
  10. down: push_object:crate#2
  11. left: push_object:crate#1
  12. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. left: walk
  14. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  15. down: push_object:crate#1

```text
########
#.G..MM#
#...LP.#
#S@MM#.#
#B.G...#
########
```

### 6. RA_SOFT_INTERLOCK_SEARCH_743024_2229

- score=234.0 cost=13 walkSteps=7 explored=139 probe=complete bypass=false missing=n/a
- firstPushPullShift=7 firstBoxStickyShift=7 firstMaterial=7
- inputs=up right left down right down right right up left up left left
- events=walk walk pull_object:crate#1 walk walk pull_object:crate#1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk pull_object:crate#1 pull_object:crate#1
- stepEvents=
  1. up: walk
  2. right: walk
  3. left: pull_object:crate#1
  4. down: walk
  5. right: walk
  6. down: pull_object:crate#1
  7. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1
  8. right: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  9. up: walk
  10. left: walk
  11. up: walk
  12. left: pull_object:crate#1
  13. left: pull_object:crate#1

```text
#########
#.GCM.###
#@G..L..#
##.BSP.G#
#########
```

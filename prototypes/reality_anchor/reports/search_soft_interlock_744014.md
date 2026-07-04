# Soft Interlock Search

- seed: 744014
- iterations: 2500
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 50
- costRange: 11-22
- wallRate: 0.13
- hits: 0
- solverHits: 5

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_744014_1487

- score=354.0 cost=16 walkSteps=7 explored=3743 probe=found bypass=true missing=material_normalization,sticky_rigid_move
- firstPushPullShift=5 firstBoxStickyShift=1 firstMaterial=14
- inputs=down left left left right up left left left down right left down right right right
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#2 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#3 force_chain:n2 box_to_sticky:n1 push_object:crate#3 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  2. left: walk
  3. left: walk
  4. left: walk
  5. right: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. up: walk
  7. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. left: push_object:crate#2
  10. down: walk
  11. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  12. left: walk
  13. down: walk
  14. right: push_object:crate#3 force_chain:n2 box_to_sticky:n1
  15. right: push_object:crate#3 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
  16. right: push_object:sticky#1 move_sticky_rigid

```text
#########
#.#C..BS#
#.C....@#
#.PL....#
#..CC.GG#
#########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_744014_466

- score=288.0 cost=20 walkSteps=8 explored=6689 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=13 firstBoxStickyShift=3 firstMaterial=3
- inputs=left up right right up down down right up right up right left left down left down left right right
- events=walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. up: walk
  3. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  4. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  5. up: walk
  6. down: pull_object:sticky#1 move_sticky_rigid
  7. down: walk
  8. right: walk
  9. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  10. right: walk
  11. up: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  12. right: walk
  13. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  14. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  16. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. down: pull_object:sticky#1 move_sticky_rigid
  18. left: push_object:sticky#1 move_sticky_rigid
  19. right: walk
  20. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#..MC..C.#
#..M....L#
##.SB...P#
#.G@..G###
##########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_744014_442

- score=282.0 cost=20 walkSteps=10 explored=35653 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=2 firstBoxStickyShift=7 firstMaterial=9
- inputs=right left up left left right down down right up up right right down right down left left left left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
- stepEvents=
  1. right: walk
  2. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. up: walk
  4. left: walk
  5. left: walk
  6. right: pull_object:crate#1
  7. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  8. down: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky
  9. right: pull_object:crate#1 box_to_sticky:n1
  10. up: walk
  11. up: walk
  12. right: walk
  13. right: walk
  14. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. right: walk
  16. down: walk
  17. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1
  19. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  20. left: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull

```text
##########
#..BSM..M#
#.C.....M#
#....@.LP#
#G.G.....#
##########
```

### 4. RA_SOFT_INTERLOCK_SEARCH_744014_164

- score=270.0 cost=20 walkSteps=10 explored=4420 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=4 firstBoxStickyShift=8 firstMaterial=19
- inputs=left left left down right down left right up left left left up right right right right down left left
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. left: walk
  2. left: walk
  3. left: walk
  4. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. right: walk
  6. down: walk
  7. left: walk
  8. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. up: walk
  10. left: pull_object:sticky#2 move_sticky_rigid
  11. left: pull_object:sticky#1 move_sticky_rigid
  12. left: walk
  13. up: walk
  14. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. down: walk
  19. left: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  20. left: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1

```text
#########
#.PL.M..#
#.....@G#
#G...MM.#
#BSG..#.#
#########
```

### 5. RA_SOFT_INTERLOCK_SEARCH_744014_2269

- score=200.0 cost=21 walkSteps=10 explored=32399 probe=found bypass=true missing=material_normalization
- firstPushPullShift=5 firstBoxStickyShift=15 firstMaterial=15
- inputs=down right right right down down left left up right up right right down right down left left up left left
- events=walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 pull_object:crate#2 walk walk pull_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#2 push_object:crate#2
- stepEvents=
  1. down: walk
  2. right: walk
  3. right: walk
  4. right: walk
  5. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  6. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. left: pull_object:crate#2
  8. left: pull_object:crate#2
  9. up: walk
  10. right: walk
  11. up: pull_object:crate#2
  12. right: walk
  13. right: walk
  14. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  16. down: walk
  17. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  18. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  19. up: walk
  20. left: push_object:crate#2
  21. left: push_object:crate#2

```text
##########
#@..LP...#
#.....C..#
#G....BS.#
#.GG.C.M.#
##########
```

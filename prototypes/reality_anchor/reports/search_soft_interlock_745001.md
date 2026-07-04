# Soft Interlock Search

- seed: 745001
- iterations: 3000
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 42
- costRange: 12-18
- wallRate: 0.12
- hits: 0
- solverHits: 3

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_745001_305

- score=342.0 cost=14 walkSteps=7 explored=639 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- firstPushPullShift=2 firstBoxStickyShift=7 firstMaterial=7
- inputs=left up left left down left right right down right right up down left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. left: walk
  2. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. left: walk
  4. left: walk
  5. down: walk
  6. left: walk
  7. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1
  8. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  9. down: walk
  10. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  11. right: pull_object:sticky#1 move_sticky_rigid
  12. up: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. down: walk
  14. left: push_object:sticky#1 move_sticky_rigid

```text
#########
#.##...G#
#BS.G..@#
#.M#MGLP#
#.#.#M..#
#########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_745001_394

- score=314.0 cost=16 walkSteps=8 explored=996 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization,sticky_rigid_move
- firstPushPullShift=2 firstBoxStickyShift=2 firstMaterial=11
- inputs=left right up left left up left right down right up left down left left up
- events=walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#2 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:crate#3 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1
- stepEvents=
  1. left: walk
  2. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  3. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: walk
  5. left: walk
  6. up: walk
  7. left: walk
  8. right: pull_object:crate#2
  9. down: walk
  10. right: walk
  11. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
  12. left: pull_object:crate#3
  13. down: walk
  14. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  15. left: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  16. up: pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1

```text
#########
#CCG..C.#
##G.....#
#..CB.@.#
#M##SLP.#
#########
```

### 3. RA_SOFT_INTERLOCK_SEARCH_745001_1940

- score=310.0 cost=15 walkSteps=8 explored=5654 probe=found bypass=true missing=pull_event,material_normalization
- firstPushPullShift=2 firstBoxStickyShift=12 firstMaterial=11
- inputs=right left up right right down up right down right up right right down left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. right: walk
  2. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. up: walk
  4. right: walk
  5. right: walk
  6. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  7. up: walk
  8. right: push_object:sticky#1 move_sticky_rigid
  9. down: walk
  10. right: walk
  11. up: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  12. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. right: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  14. down: walk
  15. left: push_object:sticky#1 move_sticky_rigid

```text
##########
#....GB..#
#...M.S..#
#@.LPGM..#
#.G...M..#
##########
```

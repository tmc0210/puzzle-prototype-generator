# Wallgate Bind Release Search

- seed: 993214
- iterations: 16000
- maxStates: 180000
- graphMaxStates: 220000
- maxDepth: 42
- costRange: 18-34
- wallRate: 0.2
- hits: 0
- solverHits: 2

## Solver-Only Material

### 1. RA_WALLGATE_BIND_RELEASE_SEARCH_993214_9695

- score=521.0 cost=25 walkSteps=9 explored=3570 probe=found bypass=true missing=box_to_sticky
- firstPushPullShift=2 firstBoxStickyShift=12 firstBoxToSticky=2 firstMerge=6 firstStickyToBox=11 stickyRigidSteps=14
- inputs=left right right right down right up up left left left down right up right down right right down left left left up up right
- events=walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. left: walk
  2. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1
  3. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  4. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  5. down: pull_object:sticky#2 move_sticky_rigid
  6. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  7. up: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  8. up: pull_object:sticky#1 move_sticky_rigid
  9. left: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  10. left: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  11. left: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
  12. down: push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  13. right: pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1
  14. up: pull_object:sticky#1 move_sticky_rigid
  15. right: walk
  16. down: walk
  17. right: pull_object:sticky#1 move_sticky_rigid
  18. right: pull_object:sticky#1 move_sticky_rigid
  19. down: walk
  20. left: walk
  21. left: walk
  22. left: walk
  23. up: walk
  24. up: walk
  25. right: push_object:sticky#1 move_sticky_rigid

```text
#########
#PC...G##
#L.@....#
##BSM...#
#..G#.MM#
#########
```

### 2. RA_WALLGATE_BIND_RELEASE_SEARCH_993214_15439

- score=381.0 cost=30 walkSteps=14 explored=10665 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=12 firstBoxStickyShift=1 firstBoxToSticky=2 firstMerge=3 firstStickyToBox=16 stickyRigidSteps=6
- inputs=up right right down up up left right down down right down left left up right up up right down left left left down left left up right right right
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#4 force_chain:n2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:crate#3 push_object:crate#4 push_object:crate#4 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  2. right: pull_object:crate#2 box_to_sticky:n1
  3. right: pull_object:sticky#1 move_sticky_rigid sticky_merge:n1
  4. down: walk
  5. up: pull_object:sticky#2 move_sticky_rigid sticky_merge:n1
  6. up: pull_object:sticky#1 move_sticky_rigid
  7. left: push_object:sticky#1 move_sticky_rigid
  8. right: walk
  9. down: walk
  10. down: walk
  11. right: walk
  12. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  13. left: walk
  14. left: walk
  15. up: walk
  16. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2
  17. up: walk
  18. up: walk
  19. right: walk
  20. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  21. left: walk
  22. left: push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1
  23. left: push_object:crate#4 force_chain:n2
  24. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  25. left: walk
  26. left: walk
  27. up: push_object:crate#3
  28. right: push_object:crate#4
  29. right: push_object:crate#4 box_to_sticky:n1
  30. right: push_object:sticky#1 move_sticky_rigid

```text
#########
#CG#...P#
#..C..GL#
#...@M..#
##.BS.M.#
#########
```

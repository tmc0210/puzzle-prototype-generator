# Wallgate Bind Release Search

- seed: 993213
- iterations: 16000
- maxStates: 180000
- graphMaxStates: 220000
- maxDepth: 42
- costRange: 18-34
- wallRate: 0.16
- hits: 0
- solverHits: 1

## Solver-Only Material

### 1. RA_WALLGATE_BIND_RELEASE_SEARCH_993213_6876

- score=309.0 cost=34 walkSteps=17 explored=86860 probe=exhausted bypass=false missing=n/a
- firstPushPullShift=15 firstBoxStickyShift=18 firstBoxToSticky=11 firstMerge=21 firstStickyToBox=27 stickyRigidSteps=3
- inputs=left right down left up left right right down left up left left down left up up right down left down right up right right right down left left left up left right right
- events=walk pull_object:crate#3 walk push_object:crate#4 push_object:crate#3 walk pull_object:crate#3 pull_object:crate#3 walk walk push_object:crate#3 force_chain:n2 box_to_sticky:n1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk push_object:crate#3 push_object:crate#3 walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
- stepEvents=
  1. left: walk
  2. right: pull_object:crate#3
  3. down: walk
  4. left: push_object:crate#4
  5. up: push_object:crate#3
  6. left: walk
  7. right: pull_object:crate#3
  8. right: pull_object:crate#3
  9. down: walk
  10. left: walk
  11. up: push_object:crate#3 force_chain:n2 box_to_sticky:n1
  12. left: walk
  13. left: walk
  14. down: walk
  15. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. up: walk
  17. up: walk
  18. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  19. down: walk
  20. left: walk
  21. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  22. right: walk
  23. up: walk
  24. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  25. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  26. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
  27. down: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2
  28. left: walk
  29. left: push_object:crate#3
  30. left: push_object:crate#3
  31. up: walk
  32. left: walk
  33. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  34. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull

```text
#########
#S.#....#
#B..C..G#
#.LCC.@.#
#.PGGC..#
#########
```

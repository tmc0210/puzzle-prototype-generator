# Soft Interlock Search

- seed: 744001
- iterations: 900
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 44
- costRange: 11-18
- wallRate: 0.14
- hits: 0
- solverHits: 1

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_744001_643

- score=316.0 cost=14 walkSteps=5 explored=1138 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- firstPushPullShift=4 firstBoxStickyShift=4 firstMaterial=4
- inputs=left up up left up left left left down up left down left down
- events=walk push_object:crate#1 push_object:crate#1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid
- stepEvents=
  1. left: walk
  2. up: push_object:crate#1
  3. up: push_object:crate#1
  4. left: push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2
  5. up: walk
  6. left: push_object:crate#1 box_to_sticky:n1
  7. left: push_object:sticky#1 move_sticky_rigid
  8. left: push_object:sticky#1 move_sticky_rigid
  9. down: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  10. up: walk
  11. left: push_object:sticky#1 move_sticky_rigid
  12. down: walk
  13. left: walk
  14. down: pull_object:sticky#1 move_sticky_rigid

```text
##########
#....M...#
#G.LPSB..#
#.G..#.C##
#....M..@#
##########
```

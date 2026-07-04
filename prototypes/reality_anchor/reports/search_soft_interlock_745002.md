# Soft Interlock Search

- seed: 745002
- iterations: 3000
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 42
- costRange: 12-18
- wallRate: 0.15
- hits: 0
- solverHits: 2

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_745002_1865

- score=360.0 cost=14 walkSteps=6 explored=4341 probe=found bypass=true missing=box_sticky_anchor_shift,sticky_rigid_move
- firstPushPullShift=2 firstBoxStickyShift=6 firstMaterial=10
- inputs=left left up up left right right down left down right up right right
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk push_object:crate#1 box_to_sticky:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- stepEvents=
  1. left: walk
  2. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  3. up: walk
  4. up: walk
  5. left: walk
  6. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  7. right: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  8. down: walk
  9. left: pull_object:crate#2
  10. down: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  11. right: walk
  12. up: push_object:crate#1 box_to_sticky:n1
  13. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1
  14. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#S....MG#
#B...GC.#
#..L.C.C#
#..P.@..#
#########
```

### 2. RA_SOFT_INTERLOCK_SEARCH_745002_1397

- score=306.0 cost=17 walkSteps=8 explored=3112 probe=found bypass=true missing=pull_event
- firstPushPullShift=3 firstBoxStickyShift=5 firstMaterial=11
- inputs=up up left left down right right down down left left left left up up down down
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#1 push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
- stepEvents=
  1. up: walk
  2. up: walk
  3. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  4. left: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  5. down: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  6. right: walk
  7. right: walk
  8. down: walk
  9. down: walk
  10. left: push_object:sticky#1 move_sticky_rigid
  11. left: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  12. left: push_object:crate#1
  13. left: push_object:crate#1
  14. up: walk
  15. up: walk
  16. down: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  17. down: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
##########
#....LP.M#
#...BS..M#
#.....#@.#
#.G..GM.M#
##########
```

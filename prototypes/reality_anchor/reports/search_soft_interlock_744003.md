# Soft Interlock Search

- seed: 744003
- iterations: 900
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 44
- costRange: 11-18
- wallRate: 0.14
- hits: 0
- solverHits: 1

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_744003_831

- score=294.0 cost=15 walkSteps=6 explored=316 probe=found bypass=true missing=box_sticky_anchor_shift
- firstPushPullShift=9 firstBoxStickyShift=9 firstMaterial=1
- inputs=up up right right right down right down right up left up left left left
- events=pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#4 walk walk walk walk pull_object:crate#4 walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:crate#1 pull_object:crate#1
- stepEvents=
  1. up: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
  2. up: pull_object:crate#4
  3. right: walk
  4. right: walk
  5. right: walk
  6. down: walk
  7. right: pull_object:crate#4
  8. down: walk
  9. right: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky
  10. up: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. left: walk
  12. up: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
  13. left: pull_object:crate#1
  14. left: pull_object:crate#1
  15. left: pull_object:crate#1

```text
#########
#..G..C.#
#.CC....#
#@..BG..#
#M..SLP.#
#########
```

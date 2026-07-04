# Soft Interlock Search

- seed: 744002
- iterations: 900
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 44
- costRange: 11-18
- wallRate: 0.14
- hits: 0
- solverHits: 1

## Solver-Only Material

### 1. RA_SOFT_INTERLOCK_SEARCH_744002_371

- score=372.0 cost=16 walkSteps=4 explored=482 probe=found bypass=true missing=push_pull_anchor_shift
- firstPushPullShift=1 firstBoxStickyShift=5 firstMaterial=5
- inputs=right right down down left left up up up right right right down left left up
- events=pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:crate#1 pull_object:crate#1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2
- stepEvents=
  1. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  2. right: pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
  3. down: pull_object:crate#1
  4. down: pull_object:crate#1
  5. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
  6. left: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1
  7. up: walk
  8. up: walk
  9. up: walk
  10. right: push_object:push_pull_anchor anchor_boundary_shift:push_pull
  11. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  12. right: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
  13. down: walk
  14. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  15. left: pull_object:push_pull_anchor anchor_boundary_shift:push_pull
  16. up: pull_object:crate#2

```text
#########
#PC.G...#
#L@G.C.G#
#C.C.C..#
#....BS.#
#########
```

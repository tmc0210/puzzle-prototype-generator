# Phase Ferry Search

- seed: 741103
- iterations: 500
- maxStates: 70000
- graphMaxStates: 120000
- maxDepth: 90
- minCost: 10
- sampleMode: lean
- wallRate: 0.18
- hits: 0
- solverHits: 2

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_48

- score=430.0 cost=25 explored=33272 probe=exhausted bypass=false missing=n/a
- inputs=down up right down down down up left left up right right up right down left left left up right down down left down left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#3 box_to_sticky:n1 push_object:crate#2

```text
##########
#...@.G..#
#.#....C.#
#.#PL.B.##
#G..M.S..#
#..G.M...#
##########
```

### 2. RA_PHASE_FERRY_SEARCH_95

- score=410.0 cost=23 explored=25277 probe=exhausted bypass=false missing=n/a
- inputs=left left down down down left left down left up down down right up right right up up right down right down down
- events=walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid

```text
#########
#.#...@##
#....#.##
#G.C.BC.#
#M..GS.##
#.PL.#G##
#....#..#
#########
```

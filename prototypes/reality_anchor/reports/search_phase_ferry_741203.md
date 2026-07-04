# Phase Ferry Search

- seed: 741203
- iterations: 1200
- maxStates: 80000
- graphMaxStates: 120000
- maxDepth: 70
- minCost: 8
- sampleMode: micro
- wallRate: 0.22
- hits: 0
- solverHits: 3

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_475

- score=540.0 cost=38 explored=9162 probe=found bypass=true missing=sticky_merge
- inputs=left up right right down down down right right up down up down left left up up left up right down down down left up down right right right right up up left down right down left left
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:crate#1 box_to_sticky:n1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

```text
##########
#.G..#...#
#G@.#C.#C#
#BL.#.C..#
#SPG.....#
##########
```

### 2. RA_PHASE_FERRY_SEARCH_447

- score=490.0 cost=31 explored=4685 probe=found bypass=true missing=sticky_merge
- inputs=down right down left up right left left down left up left down right right right left up right down left left left up right down left up right left left
- events=walk pull_object:crate#3 walk walk push_object:crate#3 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 walk push_object:crate#1 box_to_sticky:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#2 box_to_sticky:n1 pull_object:crate#1 walk walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#G..S#.##
#C..B@#.#
#..CC..L#
##....GP#
#########
```

### 3. RA_PHASE_FERRY_SEARCH_1198

- score=440.0 cost=26 explored=1219 probe=exhausted bypass=false missing=n/a
- inputs=right up right up left left down right right up up left down left right right down left left left up right right down right up
- events=walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk pull_object:crate#2 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

```text
########
#..#..G#
##GMLP.#
#.BS.M.#
#C..@.##
########
```

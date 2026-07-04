# Phase Ferry Search

- seed: 741202
- iterations: 1200
- maxStates: 80000
- graphMaxStates: 120000
- maxDepth: 70
- minCost: 8
- sampleMode: micro
- wallRate: 0.22
- hits: 0
- solverHits: 4

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_134

- score=700.0 cost=54 explored=3109 probe=found bypass=true missing=sticky_merge
- inputs=left left down down left up right up up right down right right right right down left left up left left left down left down right up up right right right down right right up left down up left down down right right up up left left left left right right down down left
- events=walk walk walk walk pull_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:sticky#1 move_sticky_rigid walk pull_object:sticky#2 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:crate#1 push_object:crate#1 walk walk walk walk pull_object:sticky#1 move_sticky_rigid

```text
#########
#P.BSG###
#LG.@...#
#..##G..#
#..CM.M.#
#########
```

### 2. RA_PHASE_FERRY_SEARCH_782

- score=570.0 cost=39 explored=6274 probe=found bypass=true missing=sticky_merge
- inputs=left left down down right left down right right up down right up up up right right right down left left left down down left left left up down right right right up up left down up up right
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:crate#1 walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#3 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#..@BSG.#
#..CCLP.#
#G.C.#.M#
#..G..M##
#########
```

### 3. RA_PHASE_FERRY_SEARCH_478

- score=530.0 cost=37 explored=38678 probe=exhausted bypass=false missing=n/a
- inputs=left down right up right right down right left left left left up up right left left down right right up up right left left down down down right right right right right up up down down
- events=walk pull_object:crate#2 walk walk pull_object:crate#2 pull_object:crate#2 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#2 move_sticky_rigid

```text
##########
#...PG.C.#
#GC.L#..M#
#..@..#G.#
##.....BS#
##########
```

### 4. RA_PHASE_FERRY_SEARCH_844

- score=500.0 cost=34 explored=3467 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=right right right right down up left left left down down left down right up right up left up left left down left down right right right up right right down left left left
- events=walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid

```text
##########
#...@G...#
#...#.MC.#
#...M...L#
#.#G.MSBP#
##########
```

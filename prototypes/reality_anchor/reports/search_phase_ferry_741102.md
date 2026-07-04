# Phase Ferry Search

- seed: 741102
- iterations: 500
- maxStates: 70000
- graphMaxStates: 120000
- maxDepth: 90
- minCost: 10
- sampleMode: lean
- wallRate: 0.18
- hits: 0
- solverHits: 4

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_225

- score=580.0 cost=42 explored=1033 probe=exhausted bypass=false missing=n/a
- inputs=left up up right up up right right down left up right right down right down down down left left left up up right up left right right up left left right down down left down left up up right right right
- events=pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#2 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk push_object:crate#2 push_object:crate#2 push_object:crate#2

```text
#########
#C.....##
###.LP.G#
##..B.#.#
#..MS#M.#
#.G@M...#
#########
```

### 2. RA_PHASE_FERRY_SEARCH_362

- score=580.0 cost=40 explored=16554 probe=exhausted bypass=false missing=n/a
- inputs=down down left left up left up right right down right down left up up right left down left down right right left left up left down up right right up left left right down down right right right down
- events=walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2

```text
#########
#..CB@..#
#...S..M#
#.....G##
#M.GPLM.#
#########
```

### 3. RA_PHASE_FERRY_SEARCH_154

- score=480.0 cost=32 explored=59032 probe=exhausted bypass=false missing=n/a
- inputs=left down right up left up right down right up left left down down left left up down left up up left left left up right right down down right down left
- events=walk walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n3 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
#.PL.B.C..#
#....S....#
#.....#.@G#
#.G...M..M#
#.G.#.#.#.#
###########
```

### 4. RA_PHASE_FERRY_SEARCH_330

- score=370.0 cost=21 explored=1075 probe=found bypass=true missing=sticky_merge
- inputs=right up right down up right down left up up right left down right down right right right up down down
- events=push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid

```text
#########
#.#.CB#C#
##...SM.#
#@PL....#
#.#G..G.#
#########
```

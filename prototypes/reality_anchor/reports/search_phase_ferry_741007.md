# Phase Ferry Search

- seed: 741007
- iterations: 260
- maxStates: 50000
- graphMaxStates: 90000
- maxDepth: 85
- minCost: 12
- hits: 0
- solverHits: 3

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_66

- score=440.0 cost=28 explored=17656 probe=found bypass=true missing=sticky_merge
- inputs=up left left left right right right up left left down left left left down right down left up up right right right up left left right right
- events=pull_object:crate#1 box_to_sticky:n1 walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

```text
##########
#.#M.G...#
#...M....#
#.G.SG.#@#
#...B...C#
#..PL.#.##
##########
```

### 2. RA_PHASE_FERRY_SEARCH_247

- score=420.0 cost=24 explored=6791 probe=found bypass=true missing=sticky_merge
- inputs=up up up right down up right down left left up right down right down right down right up up down right left down
- events=push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#3 push_object:crate#2 push_object:crate#3 push_object:crate#4 box_to_sticky:n1 sticky_merge:n1 walk push_object:crate#3 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:crate#3 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#3 box_to_sticky:n1

```text
##########
#.PLC....#
#.C.G.#.##
#.C.#.GB.#
#M...G.S.#
#@MMG..#.#
##########
```

### 3. RA_PHASE_FERRY_SEARCH_99

- score=350.0 cost=21 explored=20730 probe=exhausted bypass=false missing=n/a
- inputs=left left right down left down left left up down down right right right right up left left down down left
- events=walk walk pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid pull_object:crate#1 pull_object:crate#1 walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 walk walk pull_object:sticky#4 move_sticky_rigid sticky_merge:n1 pull_object:sticky#3 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#.MPLM..@#
#..S.#...#
#..B...C.#
#C..G...G#
#.....GC.#
##########
```

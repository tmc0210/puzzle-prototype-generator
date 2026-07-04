# Phase Ferry Search

- seed: 741201
- iterations: 1200
- maxStates: 80000
- graphMaxStates: 120000
- maxDepth: 70
- minCost: 8
- sampleMode: micro
- wallRate: 0.22
- hits: 0
- solverHits: 2

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_1154

- score=410.0 cost=27 explored=234 probe=found bypass=true missing=material_normalization,sticky_merge
- inputs=up down left up left down right right up up up right right right right down down right up up left left down right up right down
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#3 move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
##########
###P.....#
##.L..B..#
#.G.#MSMG#
#..@.#M.G#
##########
```

### 2. RA_PHASE_FERRY_SEARCH_649

- score=310.0 cost=15 explored=659 probe=found bypass=true missing=push_pull_anchor_shift,material_normalization,sticky_merge
- inputs=left left up left left down right right right left left left up left right
- events=walk walk walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1 pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
##G.BSM..#
#L....MGM#
#PG.C..@.#
##########
```

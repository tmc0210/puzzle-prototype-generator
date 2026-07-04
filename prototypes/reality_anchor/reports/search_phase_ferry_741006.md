# Phase Ferry Search

- seed: 741006
- iterations: 260
- maxStates: 50000
- graphMaxStates: 90000
- maxDepth: 85
- minCost: 12
- hits: 0
- solverHits: 6

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_186

- score=770.0 cost=61 explored=47701 probe=exhausted bypass=false missing=n/a
- inputs=right down right right right left up right up left down left left up up right right left left up up right down left down down down right right right down right right up down left left left up up up right left left up left down down left down right right right down right right up left down left up
- events=walk walk walk walk walk pull_object:crate#1 walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#2 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1 push_object:crate#1 walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#2 walk walk push_object:crate#2

```text
##########
#......M.#
#...M##.G#
##...PL.M#
#...#GSM.#
#.@...B..#
#.#.G..C.#
##########
```

### 2. RA_PHASE_FERRY_SEARCH_165

- score=560.0 cost=38 explored=35352 probe=exhausted bypass=false missing=n/a
- inputs=down down right up right down right left left up right up right right right down down left down left left left left up up down right up left left up right down right down down left up
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2

```text
#########
#.@GG.G.#
#G.C..#.#
#C.PL.B.#
#M....SM#
#########
```

### 3. RA_PHASE_FERRY_SEARCH_21

- score=550.0 cost=39 explored=9746 probe=exhausted bypass=false missing=n/a
- inputs=down up left down left down right right up up left up left right right down down down left left left left up left up up right down up right down left up left left down down right up
- events=walk pull_object:sticky#4 move_sticky_rigid walk walk pull_object:sticky#4 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk pull_object:crate#1 pull_object:crate#1 walk walk walk walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.GGCBG.#
#...MS.@#
#..PL...#
#MM.M..M#
#########
```

### 4. RA_PHASE_FERRY_SEARCH_64

- score=500.0 cost=36 explored=13415 probe=found bypass=true missing=sticky_merge
- inputs=left down down down right up down down left up up up up left right right down down left down left left down left up up left up left down up right right down right right
- events=walk walk walk walk walk walk pull_object:crate#2 pull_object:crate#4 box_to_sticky:n1 walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:sticky#1 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
#.#PL..@#
#...GCGC#
#.C.BC..#
#G#.S.G.#
#....#..#
#########
```

### 5. RA_PHASE_FERRY_SEARCH_12

- score=410.0 cost=23 explored=48050 probe=exhausted bypass=false missing=n/a
- inputs=up right right up right down left down right down down right right up down left left up up right down right left
- events=walk walk push_object:crate#3 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#3 box_to_sticky:n1 walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#3 force_chain:n2 anchor_boundary_shift:box_sticky push_object:sticky#2 move_sticky_rigid walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
#########
#CC.....#
#...PL..#
#..C.#B.#
#@#..GS.#
#....MG.#
#MM..G..#
#########
```

### 6. RA_PHASE_FERRY_SEARCH_91

- score=370.0 cost=19 explored=17565 probe=exhausted bypass=false missing=n/a
- inputs=up up up up up right right down right down left right right down up up right right right
- events=walk walk walk walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_to_box:n1 sticky_merge:n1 walk push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:crate#2 pull_object:crate#2 pull_object:crate#2

```text
##########
#...C....#
#..B...G.#
#..SM..#.#
#.GMPL#..#
#.MG..M..#
#@.#.#...#
##########
```

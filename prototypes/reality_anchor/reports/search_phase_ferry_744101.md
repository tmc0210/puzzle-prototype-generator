# Phase Ferry Search

- seed: 744101
- iterations: 1000
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 60
- minCost: 12
- sampleMode: micro
- wallRate: 0.12
- hits: 0
- solverHits: 16

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_474

- score=650.0 cost=47 explored=9438 probe=found bypass=true missing=sticky_merge
- inputs=left right up up left down up left down left left up left left down right right right up right down right up right down up left left left down left up right right down down up right up left right right down right down up left
- events=push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1 walk push_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid

```text
##########
#....MG.##
#....LP..#
#..#.SM@.#
##C#.B#.G#
##########
```

### 2. RA_PHASE_FERRY_SEARCH_163

- score=630.0 cost=47 explored=34113 probe=exhausted bypass=false missing=n/a
- inputs=right up left down right right right up up left right right down left down left left up left right up up left down up right down down down left up down right right right up right up down right down left left left left left left
- events=walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

```text
##########
#.#M..SBG#
#..GM....#
#.L.M#...#
#GP@...C.#
##########
```

### 3. RA_PHASE_FERRY_SEARCH_350

- score=620.0 cost=44 explored=11542 probe=exhausted bypass=false missing=n/a
- inputs=down right left up right right down up down right up left down left up right down right left left left up right down right right right down left left up up left down up left down down down right right up right right
- events=push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk pull_object:sticky#1 move_sticky_rigid pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 walk pull_object:crate#2 box_to_sticky:n1 walk walk pull_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#@.M.#PG#
#M.M.SL.#
#....B#.#
#...G...#
#########
```

### 4. RA_PHASE_FERRY_SEARCH_986

- score=570.0 cost=41 explored=21058 probe=found bypass=true missing=sticky_merge
- inputs=down up up left down down down right right right left left left up right right right right right up down left down left up down left up left left up up right right right right down left left down left
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk pull_object:sticky#3 move_sticky_rigid pull_object:sticky#3 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk walk pull_object:sticky#3 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2

```text
########
#..M.PM#
#G@.ML.#
#....G.#
#GBS.M##
########
```

### 5. RA_PHASE_FERRY_SEARCH_839

- score=560.0 cost=38 explored=12040 probe=found bypass=true missing=sticky_merge
- inputs=up up right right right right left left left down up right right down right up right down up left left left down left down left down right right right up up left down up right right right
- events=walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk push_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#..G..M.#
#....MM.#
#@PL.#SG#
#..G..B##
#########
```

### 6. RA_PHASE_FERRY_SEARCH_402

- score=540.0 cost=36 explored=1111 probe=found bypass=true missing=sticky_merge
- inputs=right right down down right right up up left left down down left down right up up left left left right right right down down left up right up up right right down down down left
- events=walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#..#@..G.#
#BSMMM.#.#
#....LG..#
#.#..P...#
##########
```

### 7. RA_PHASE_FERRY_SEARCH_16

- score=530.0 cost=35 explored=1287 probe=found bypass=true missing=sticky_merge
- inputs=down down down right left up right right down left up up down left up left left down down right right right right up up left left right right down down left up up left
- events=walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 push_object:crate#3 push_object:crate#3 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#...C@LP#
#GB.G..C#
#.S.#...#
#.#....M#
#########
```

### 8. RA_PHASE_FERRY_SEARCH_239

- score=490.0 cost=33 explored=7845 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=down down right up left left down down right right up up up left left left left down right right right right right up left left left down left left down left up
- events=walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
##..BS@.M#
##C.C....#
#.G..M..##
#PL#...G.#
##########
```

### 9. RA_PHASE_FERRY_SEARCH_86

- score=480.0 cost=32 explored=7541 probe=found bypass=true missing=material_normalization,sticky_merge,sticky_rigid_move
- inputs=down right down down right right up left right up right left left down right right right up down down left left left left up right up right right down right up
- events=walk walk pull_object:crate#1 walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid

```text
#########
#@C#.CCG#
#..L..BS#
#..P....#
##..G...#
#########
```

### 10. RA_PHASE_FERRY_SEARCH_668

- score=460.0 cost=30 explored=26509 probe=exhausted bypass=false missing=n/a
- inputs=down right right right down up left up left down up left left down left up left left down up right right down right right down right right left left
- events=push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#4 walk pull_object:crate#2 box_to_sticky:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 walk walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#3 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#3 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
##########
#....@..##
#SGMGPL..#
#B.#C..C.#
#G..#.C.C#
##########
```

### 11. RA_PHASE_FERRY_SEARCH_583

- score=450.0 cost=27 explored=5520 probe=found bypass=true missing=sticky_merge
- inputs=up down right down right up right down left up left left down right right up right down left up right left left up left up left
- events=walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#3 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#3 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
########
#.M..S.#
#G...BC#
#G@.C.L#
##..G.P#
########
```

### 12. RA_PHASE_FERRY_SEARCH_594

- score=450.0 cost=31 explored=1942 probe=found bypass=true missing=material_normalization,sticky_merge
- inputs=left left up up up right right right right down down up left right up left left down down down left left up up up right right right down left left
- events=walk walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk push_object:sticky#1 move_sticky_rigid

```text
##########
#.......M#
###GMS..##
#..GCBLP.#
#...G@..##
##########
```

### 13. RA_PHASE_FERRY_SEARCH_571

- score=440.0 cost=30 explored=1753 probe=exhausted bypass=false missing=n/a
- inputs=left left down down right right up up left left down right right left down left left right right right up right down left up up left left down right
- events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.#...###
#..BS@GM#
#PC..G..#
#LC.....#
#########
```

### 14. RA_PHASE_FERRY_SEARCH_836

- score=420.0 cost=24 explored=15427 probe=found bypass=true missing=material_normalization
- inputs=right up left down down right right right right up left left up right right right down left down up down left left left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 walk pull_object:sticky#1 move_sticky_rigid pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#..C.BG.G#
#@..MS...#
#GL....M##
##P......#
##########
```

### 15. RA_PHASE_FERRY_SEARCH_428

- score=320.0 cost=16 explored=476 probe=found bypass=true missing=material_normalization
- inputs=down left up down left up up left left down up right right right right right
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid

```text
##########
#....MG..#
#CG..L@.M#
#.BS.P.#.#
##########
```

### 16. RA_PHASE_FERRY_SEARCH_349

- score=310.0 cost=15 explored=2631 probe=found bypass=true missing=sticky_merge
- inputs=right up down right down left up left left down right right right up left
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:sticky#1 move_sticky_rigid

```text
#########
#.#C....#
#B......#
#S@..ML.#
#.M.G.PG#
#########
```

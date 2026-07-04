# Phase Ferry Search

- seed: 744103
- iterations: 1000
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 60
- minCost: 12
- sampleMode: lean
- wallRate: 0.14
- hits: 0
- solverHits: 15

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_197

- score=730.0 cost=55 explored=11453 probe=exhausted bypass=false missing=n/a
- inputs=up up left left down down left left down right right up up left down up left up down down right up right up left down down left up right up right down down up left down right right down left left up left up up up right down down left down right right right
- events=walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
#########
##C.B#..#
#...S..M#
#.LPG#.##
#.M...@M#
#.....GM#
#########
```

### 2. RA_PHASE_FERRY_SEARCH_295

- score=590.0 cost=43 explored=74610 probe=exhausted bypass=false missing=n/a
- inputs=up left left left up up right right right right right down up left left left left down left down down right up up down right up left left up right right down left down down down right up right right up down
- events=walk walk walk walk walk walk walk walk walk walk walk walk pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#2 push_object:crate#2 walk pull_object:sticky#1 force_chain:n3 move_sticky_rigid sticky_to_box:n2

```text
#########
#.....G.#
#..PL#M.#
#...G..M#
#..SM@.M#
#..B..#G#
#########
```

### 3. RA_PHASE_FERRY_SEARCH_161

- score=560.0 cost=38 explored=82720 probe=exhausted bypass=false missing=n/a
- inputs=down left down down left up up left up right right down up left down down down left left left left left up up right down left down right right right right right up up up right right
- events=walk pull_object:crate#4 pull_object:crate#2 pull_object:crate#3 walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 walk walk walk walk walk walk walk walk walk walk push_object:crate#3 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#2 push_object:crate#2

```text
###########
#..C#..C@G#
#.C....G.C#
#.PL.B..C.#
#....S.G..#
###########
```

### 4. RA_PHASE_FERRY_SEARCH_793

- score=500.0 cost=36 explored=76700 probe=exhausted bypass=false missing=n/a
- inputs=down right right up up right right right down left down down down left right up up left left up right right right right up left left left left left down down down up up up
- events=walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:crate#1 push_object:crate#2 push_object:crate#2 push_object:crate#2 push_object:crate#2 walk walk walk walk push_object:crate#1 push_object:crate#1 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#G......##
#@.G..B.G#
#...M.S#.#
#..M#..#.#
##.LP.#.M#
##########
```

### 5. RA_PHASE_FERRY_SEARCH_522

- score=480.0 cost=32 explored=87740 probe=exhausted bypass=false missing=n/a
- inputs=right right right up right down right right left left left left left left up up right up right right right down right down left up right right left left down right
- events=walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#..PLSM..#
#....BC..#
#C##.G...#
#@.G.G..C#
##########
```

### 6. RA_PHASE_FERRY_SEARCH_18

- score=450.0 cost=27 explored=68358 probe=exhausted bypass=false missing=n/a
- inputs=up right down right right up down left left up right down left left down down right up up right right down left up left left down
- events=walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#2 box_to_sticky:n1 walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
###########
#C....BC.##
#.#...S..G#
#...G@PL..#
#......G..#
#.....M.M.#
###########
```

### 7. RA_PHASE_FERRY_SEARCH_391

- score=440.0 cost=28 explored=2382 probe=found bypass=true missing=sticky_merge
- inputs=up left down right down down left up right up right up left left down down up right right right right down left up up left up right
- events=walk pull_object:crate#1 walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##PLG..##
#...CCB.#
##.@.GS.#
##..MM.##
#...G##.#
#########
```

### 8. RA_PHASE_FERRY_SEARCH_148

- score=410.0 cost=25 explored=3605 probe=found bypass=true missing=material_normalization,sticky_merge
- inputs=down right right up down left left up right right down right right up right left down down up up right right down down right
- events=walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
###########
#CB..CG..##
#@SPLM..#.#
#..M.M.G#.#
#...#.....#
#...#..G..#
###########
```

### 9. RA_PHASE_FERRY_SEARCH_243

- score=400.0 cost=22 explored=7519 probe=found bypass=true missing=sticky_merge
- inputs=right down right up left left down down right up up left left down left down right right right down left left
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 force_chain:n3 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
###########
#..#.@...C#
#...CB...G#
##.G.S.MG##
##M#MPL...#
###########
```

### 10. RA_PHASE_FERRY_SEARCH_606

- score=390.0 cost=23 explored=17961 probe=exhausted bypass=false missing=n/a
- inputs=up up left right right right up right down right right down down left up down left left left left up left left
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk pull_object:crate#2 walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
#.##...G.##
#CBG....G.#
#.S..MLP..#
#..#@.M...#
###########
```

### 11. RA_PHASE_FERRY_SEARCH_419

- score=380.0 cost=22 explored=2569 probe=exhausted bypass=false missing=n/a
- inputs=up up up left left down down right up left up right right right right down down left left down left up
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.G.....#
#CG.B.#.#
#M..S.M.#
#..@#.#.#
#GPL.#..#
#########
```

### 12. RA_PHASE_FERRY_SEARCH_439

- score=380.0 cost=22 explored=12583 probe=exhausted bypass=false missing=n/a
- inputs=up up left left left down down right right down left down right right right right left left left left left up
- events=pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##......#
#....#.##
#.PL.M..#
#G.S@..##
#..BC..##
#.G....C#
#########
```

### 13. RA_PHASE_FERRY_SEARCH_74

- score=340.0 cost=16 explored=306 probe=found bypass=true missing=material_normalization,sticky_merge
- inputs=down right up right up up left left down up left down right left left left
- events=pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 pull_object:crate#1 walk push_object:crate#2 force_chain:n2 pull_object:crate#2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.......#
#..B.CCG#
#G.SM@..#
##.PLG.##
#########
```

### 14. RA_PHASE_FERRY_SEARCH_316

- score=340.0 cost=18 explored=14204 probe=found bypass=true missing=material_normalization
- inputs=right up right down down right right up up left left down left down right up up right
- events=walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk push_object:sticky#2 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#....B#.#
##M..S.##
#.@.G.G.#
#..M..MG#
##..LP..#
#########
```

### 15. RA_PHASE_FERRY_SEARCH_317

- score=290.0 cost=13 explored=7071 probe=found bypass=true missing=sticky_merge
- inputs=up right right left up up right down right right left left up
- events=walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk walk push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
###########
#........C#
#.##GCGB..#
#..G.PLS..#
#..@.M....#
#...M..#..#
###########
```

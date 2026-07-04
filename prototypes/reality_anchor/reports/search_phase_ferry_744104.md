# Phase Ferry Search

- seed: 744104
- iterations: 1000
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 60
- minCost: 12
- sampleMode: lean
- wallRate: 0.16
- hits: 0
- solverHits: 15

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_345

- score=760.0 cost=58 explored=19581 probe=exhausted bypass=false missing=n/a
- inputs=left up left left down left left left down right right up up left down left up left down down right right up down left up left down down right right up right up left down left down right up left up down right right up up left down right down left down left up up left down
- events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk push_object:crate#3 force_chain:n2 walk walk pull_object:crate#3 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#G#.#...C#
#.LP.....#
#.G...GB@#
#M...#.S.#
#..M..#M.#
##########
```

### 2. RA_PHASE_FERRY_SEARCH_166

- score=740.0 cost=56 explored=15616 probe=exhausted bypass=false missing=n/a
- inputs=up left right right right down left left left up left up right down down left left up down right up right up right down down left up down right up up left left left down down right right right up right down left left left left up up right down left down right right right
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n2 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#3 walk walk walk walk pull_object:crate#3 box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:crate#2 force_chain:n2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid

```text
##########
#.C.BG..##
#.#MS....#
#.M.M.@G.#
#.#PL.#G.#
##########
```

### 3. RA_PHASE_FERRY_SEARCH_472

- score=670.0 cost=51 explored=47581 probe=found bypass=true missing=material_normalization,sticky_merge
- inputs=up right right up right up up right down down right right right up left left down up right right down left up left down right down left left left up left up right right up left right right down down left down right up right down up right up left
- events=walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk push_object:crate#2 force_chain:n2 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
##G....B.#
#.#M..GS.#
###......#
#...M.LP##
#@.#M.#G.#
##########
```

### 4. RA_PHASE_FERRY_SEARCH_678

- score=590.0 cost=41 explored=2569 probe=exhausted bypass=false missing=n/a
- inputs=left down down right up down left up up up right down up left down down down right up right right down right up left up down right right up left up left down right down left left up left down
- events=pull_object:crate#1 walk walk walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n3 walk walk walk walk walk walk walk walk pull_object:crate#3 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#2 force_chain:n3 anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#....#LP##
#GB.@C...#
#.S..MM..#
##..G#G..#
##########
```

### 5. RA_PHASE_FERRY_SEARCH_525

- score=550.0 cost=39 explored=5926 probe=found bypass=true missing=sticky_merge
- inputs=down right right left left up right right down down up up right down down right up up left down down down left left right right right up left left up left up right right down down up up
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#3 move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk push_object:sticky#3 move_sticky_rigid push_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#M#@...G#
##.G.GS.#
#.#.C.B.#
##PL.C.C#
#########
```

### 6. RA_PHASE_FERRY_SEARCH_574

- score=480.0 cost=30 explored=16986 probe=found bypass=true missing=push_pull_anchor_shift,sticky_merge
- inputs=right up left down left up right up right up up left left left left down up up right right down down down left left up left down up up
- events=walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

```text
#########
#.G..#..#
#.......#
#GM#M#.##
#.MG.S..#
#CLP.B.C#
##.#.@..#
#########
```

### 7. RA_PHASE_FERRY_SEARCH_436

- score=450.0 cost=27 explored=39450 probe=exhausted bypass=false missing=n/a
- inputs=up down left left up left up up right right down up right down down left down right up right down left down right down left left
- events=walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#1 walk push_object:crate#2 push_object:crate#2 walk push_object:crate#3 push_object:crate#3

```text
#########
#..PLMM.#
#..#SM..#
#...B...#
#....@.G#
#.#.#..G#
#.#G....#
#########
```

### 8. RA_PHASE_FERRY_SEARCH_579

- score=430.0 cost=27 explored=27623 probe=found bypass=true missing=material_normalization
- inputs=right up up right up up left down right down left left left down left up left up up right right down right right left left left
- events=walk walk walk walk walk walk pull_object:crate#1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 walk walk walk pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk push_object:sticky#2 move_sticky_rigid walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#GPLB..C#
#..MS..G#
#.M....##
##..#...#
#M..@...#
#########
```

### 9. RA_PHASE_FERRY_SEARCH_145

- score=390.0 cost=23 explored=47703 probe=exhausted bypass=false missing=n/a
- inputs=down right down down down down right right up up right down down right up up up down left up left left up
- events=push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky walk push_object:crate#1

```text
#########
#@.G#.B.#
#M....S.#
#...MG.##
##.#GM..#
#...PL..#
#......M#
#########
```

### 10. RA_PHASE_FERRY_SEARCH_828

- score=390.0 cost=23 explored=26314 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=up left up left left left left up up right up right down down down right right down right right down left right
- events=walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk walk push_object:crate#1 push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull walk walk push_object:crate#2 push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#......#.#
#CCPLG#..#
#.#.#..B##
#.....MS.#
#..M...GG#
#.#...@.##
##########
```

### 11. RA_PHASE_FERRY_SEARCH_735

- score=380.0 cost=20 explored=11421 probe=found bypass=true missing=material_normalization
- inputs=left left up left up up left up left up right right down down down down left left down right
- events=walk walk walk pull_object:sticky#4 move_sticky_rigid walk push_object:sticky#3 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 box_to_sticky:n1 push_object:sticky#3 move_sticky_rigid push_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk walk push_object:sticky#2 move_sticky_rigid

```text
##########
##.......#
#GB.PL#..#
#.S.M.#..#
###......#
##....M#.#
#M.MG.G@.#
##########
```

### 12. RA_PHASE_FERRY_SEARCH_898

- score=380.0 cost=22 explored=4123 probe=found bypass=true missing=sticky_merge
- inputs=up right up right right up right right down up right up left left down left left down right down right up
- events=walk push_object:sticky#1 force_chain:n3 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#4 walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:crate#2 push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#2

```text
#########
#.#.#...#
#.PL.G.G#
#...B...#
#.MMSM.M#
#@###.G.#
#########
```

### 13. RA_PHASE_FERRY_SEARCH_883

- score=340.0 cost=18 explored=14089 probe=found bypass=true missing=pull_event,material_normalization
- inputs=up up left up down left right right right right down right up up left left up left
- events=walk walk push_object:sticky#2 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
###########
#.G.....C.#
#..BC.#..##
#..S#PL..##
#G.M.G..#.#
#M......M.#
#...@#....#
###########
```

### 14. RA_PHASE_FERRY_SEARCH_984

- score=330.0 cost=15 explored=1483 probe=found bypass=true missing=material_normalization
- inputs=right down down up right right up left left down left left down down down
- events=walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#..#@...M#
#...M....#
#..PL.SG.#
#.#..CB..#
#.C...#..#
###.G....#
##########
```

### 15. RA_PHASE_FERRY_SEARCH_372

- score=300.0 cost=14 explored=1105 probe=found bypass=true missing=push_pull_anchor_shift,sticky_merge
- inputs=left left up down down left up left up right down right right left
- events=pull_object:sticky#3 move_sticky_rigid pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#GPL.B..#
#MG.MSG.#
#....@M.#
##......#
#########
```

# Phase Ferry Search

- seed: 745106
- iterations: 2500
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 46
- minCost: 12
- sampleMode: lean
- wallRate: 0.14
- hits: 1
- solverHits: 16

## 1. RA_PHASE_FERRY_SEARCH_225

- score=476.3 cost=19 explored=579 graphStates=676 winStates=5 probeStates=934 scc=branching_win_dag
- inputs=right up up left left down right up right down up left left left down left down down left
- events=walk walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid walk walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#....BC.#
#....SM.#
#.MG##@G#
#..GLP#.#
#########
```

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_122

- score=560.0 cost=40 explored=26261 probe=found bypass=true missing=material_normalization,sticky_merge
- inputs=left up up right up right right left left down right down right down right up right right down left left left up up up left down right up right up left left left down right right down down right
- events=walk walk walk walk walk walk walk pull_object:crate#2 pull_object:crate#2 walk push_object:sticky#2 move_sticky_rigid pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1 walk pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:sticky#2 move_sticky_rigid

```text
#########
#.PLG.C.#
##...CBG#
#..M.#S.#
#.#....G#
#.@#....#
#M.#....#
#########
```

### 2. RA_PHASE_FERRY_SEARCH_1087

- score=550.0 cost=39 explored=46745 probe=exhausted bypass=false missing=n/a
- inputs=up up left up right down down right up down right right down right right up right right up left up left left down right down left left left left up left up right right up right down down
- events=walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid

```text
###########
#.#..B.#..#
#.M..S....#
#..M#MM...#
#G...G...G#
#.@.#..PL.#
###########
```

### 3. RA_PHASE_FERRY_SEARCH_1363

- score=540.0 cost=38 explored=84747 probe=exhausted bypass=false missing=n/a
- inputs=down right down up up up left left down down right right left down right down right right up up down right up right right down left down left up up up left left left left up up
- events=walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#1 walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
###########
#..#......#
#G..#.#.###
#.@BC.....#
#..S.....##
##..#..G..#
#.PL...GMM#
###########
```

### 4. RA_PHASE_FERRY_SEARCH_2065

- score=540.0 cost=36 explored=5303 probe=found bypass=true missing=sticky_merge
- inputs=right up up right up left left up left down up left down down down down right up right right left left left up up up right down down up right right right down up up
- events=walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk pull_object:crate#4 pull_object:crate#3

```text
#########
#.C..#..#
##.B..G##
#..S#G..#
#..PLGM.#
#...@.MM#
#########
```

### 5. RA_PHASE_FERRY_SEARCH_1878

- score=520.0 cost=34 explored=92983 probe=exhausted bypass=false missing=n/a
- inputs=up up down down right up left up left left down down right up right left left up right right left up right right down down up right down left down left left left
- events=push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 push_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 box_to_sticky:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

```text
#########
#..B....#
#..S...G#
#.G..M.M#
#....@M.#
##..#PLG#
#########
```

### 6. RA_PHASE_FERRY_SEARCH_1886

- score=520.0 cost=36 explored=19169 probe=found bypass=true missing=pull_event
- inputs=left down right up right right down right right down left left up up right down right left left down right right left up up right right down left left down left up down left up
- events=walk walk push_object:sticky#2 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#4 move_sticky_rigid push_object:sticky#4 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#3 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:sticky#3 move_sticky_rigid push_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n2 walk walk push_object:sticky#2 force_chain:n2 move_sticky_rigid sticky_to_box:n1

```text
##########
#.#G.#.#.#
#.@GPL.B.#
#.M..M.SG#
#M#.M....#
##########
```

### 7. RA_PHASE_FERRY_SEARCH_1025

- score=510.0 cost=35 explored=2073 probe=found bypass=true missing=sticky_merge
- inputs=up left up right right down left up down right up left down down right right right up down left left left up up left up right right right down left left down left up
- events=walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk push_object:crate#2 push_object:crate#2 walk walk push_object:crate#2

```text
###########
#.GPLB.C..#
#..M.S.#.##
##..G#G####
###@M...###
###########
```

### 8. RA_PHASE_FERRY_SEARCH_1555

- score=510.0 cost=35 explored=41126 probe=found bypass=true missing=sticky_merge
- inputs=up left left left down down left right right down left left up up right up right right down right down down left left left up up down left left up up right up right
- events=walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#...G.#..#
#.B...##C#
#.SG....M#
#G..#.@#.#
#M...#...#
#....LP..#
##########
```

### 9. RA_PHASE_FERRY_SEARCH_2357

- score=490.0 cost=31 explored=47292 probe=exhausted bypass=false missing=n/a
- inputs=up left right down down down down left left up left up up right up right right down right down left down right down left right right up up left right
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:crate#2 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
###.G..##
#.PL..###
#...#@..#
#...B..C#
#..MS...#
#.....MG#
#########
```

### 10. RA_PHASE_FERRY_SEARCH_2299

- score=470.0 cost=33 explored=52236 probe=exhausted bypass=false missing=n/a
- inputs=up up up left left down left left left down right up right down left left down left up right right right down left up left left up right right down right up
- events=walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#.B#G.G..#
#.S...M.##
#.....#M.#
#G...##.M#
#..LP..@.#
##########
```

### 11. RA_PHASE_FERRY_SEARCH_849

- score=460.0 cost=30 explored=69559 probe=exhausted bypass=false missing=n/a
- inputs=left right down left left left right right right right right up left up left down right down left left left up up right up left down down left down
- events=walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#..G.#...#
##C...#.C#
#.C.BLP.##
#.#.S.@..#
#.M......#
#.G.#.G..#
##########
```

### 12. RA_PHASE_FERRY_SEARCH_2042

- score=460.0 cost=30 explored=78133 probe=exhausted bypass=false missing=n/a
- inputs=up up up left left up right down left left down up left left down down right down right right down right up up left left left down down right
- events=walk walk walk walk walk walk pull_object:crate#1 walk walk walk push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

```text
#########
#...CG.##
#.......#
##.#C#B.#
#G...MS.#
#.#.PL.@#
#...MG..#
#########
```

### 13. RA_PHASE_FERRY_SEARCH_693

- score=440.0 cost=28 explored=96870 probe=exhausted bypass=false missing=n/a
- inputs=up up right up right down left left down down down left left up up right down up up up up right right right down right down right
- events=walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:sticky#2 move_sticky_rigid walk push_object:sticky#2 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#2 move_sticky_rigid

```text
##########
#.G..PLC##
#C..BC..G#
#...SM...#
#.....####
#...@....#
#..G..#..#
##########
```

### 14. RA_PHASE_FERRY_SEARCH_144

- score=420.0 cost=26 explored=26179 probe=found bypass=true missing=sticky_merge,sticky_rigid_move
- inputs=up up right right down down up right down right up down right right left left left left left down right right right up left left
- events=walk walk push_object:crate#1 force_chain:n3 anchor_boundary_shift:box_sticky push_object:crate#1 force_chain:n3 anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 box_to_sticky:n1 walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

```text
##########
#.CCB.G#C#
#G..S...##
#@GPL...M#
#........#
##########
```

### 15. RA_PHASE_FERRY_SEARCH_404

- score=420.0 cost=26 explored=46911 probe=found bypass=true missing=material_normalization
- inputs=up right up up right down right right down left left down left up right right up up left down down left down right right right
- events=walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk pull_object:crate#2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:crate#2 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

```text
##########
##......C#
#....BG..#
#..LPS..##
#@M.MMG.G#
##########
```

### 16. RA_PHASE_FERRY_SEARCH_432

- score=410.0 cost=25 explored=76208 probe=exhausted bypass=false missing=n/a
- inputs=up left down right up right right down left left left left left down down right right up up up right right down down down
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1

```text
##########
#..PL#...#
#.......G#
#..M.@..##
#.M#.....#
#..SM...##
#.#B.GG#.#
##########
```

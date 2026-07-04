# Phase Ferry Search

- seed: 745101
- iterations: 1800
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 50
- minCost: 12
- sampleMode: micro
- wallRate: 0.13
- hits: 1
- solverHits: 16

## 1. RA_PHASE_FERRY_SEARCH_1751

- score=576.1 cost=30 explored=273 graphStates=389 winStates=26 probeStates=603 scc=branching_win_dag
- inputs=down right up right left left up right right left down down down right right left left up up up right down right down left left down left up up
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:crate#1 walk walk walk walk walk walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

```text
########
#G.....#
#M@PLC##
##..SB##
##..GC.#
########
```

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_156

- score=680.0 cost=50 explored=50459 probe=exhausted bypass=false missing=n/a
- inputs=right left down right right up down right up down left left left up up right right right up left left right down left left down right down left up up right right right down down right up left up up left right right down down down left left left
- events=walk pull_object:crate#3 walk walk walk walk pull_object:crate#1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:crate#3

```text
##########
###PL.G..#
#..#..CBS#
#.C#@GC..#
#.C.G....#
##########
```

### 2. RA_PHASE_FERRY_SEARCH_122

- score=630.0 cost=45 explored=105276 probe=exhausted bypass=false missing=n/a
- inputs=up right down down left left up up right right down up right right down down right right up left down left left up right right down right up right up left down down down right up left left left left left up left down
- events=pull_object:crate#1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:sticky#3 move_sticky_rigid walk walk pull_object:sticky#3 move_sticky_rigid pull_object:sticky#3 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#3 force_chain:n2 push_object:crate#3 force_chain:n2 walk walk push_object:crate#3

```text
##########
#...G.#..#
#.@.G....#
#.C.BS..L#
##G#C.#MP#
##########
```

### 3. RA_PHASE_FERRY_SEARCH_1655

- score=630.0 cost=45 explored=1620 probe=exhausted bypass=false missing=n/a
- inputs=down down left left left left left up up right down right down right right right down left left up left up right down right left left up left left down right right right up down left left up up right down left down right
- events=walk walk walk walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk walk pull_object:crate#1 pull_object:crate#3 pull_object:crate#3 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..PL#@##
#.MSBC.C#
#...GG..#
####G..C#
#########
```

### 4. RA_PHASE_FERRY_SEARCH_892

- score=530.0 cost=37 explored=18836 probe=found bypass=true missing=material_normalization
- inputs=up left left up left up right right right left down right down up left down left up left left up right right right right down down right up left left down down right left left up
- events=walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:sticky#2 move_sticky_rigid walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#2 walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
########
#..G..M#
#.G.M.L#
#C....P#
##BS.@G#
########
```

### 5. RA_PHASE_FERRY_SEARCH_1241

- score=530.0 cost=35 explored=81450 probe=exhausted bypass=false missing=n/a
- inputs=down right up right down left left up up right left up right right down right down up right down right right up left down left left up right down left right right right up
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:crate#1 push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 push_object:crate#2 push_object:crate#4 box_to_sticky:n1 pull_object:crate#3 pull_object:crate#3 walk push_object:crate#2 push_object:crate#3 box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:crate#2 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2

```text
##########
#BC.G.#.G#
#S....G.P#
#@..MM..L#
#....M...#
##########
```

### 6. RA_PHASE_FERRY_SEARCH_819

- score=510.0 cost=33 explored=6684 probe=exhausted bypass=false missing=n/a
- inputs=up left left down right up left down up right right down left left left left right right right up left up left down left down right right right right up right down
- events=walk walk walk pull_object:crate#1 walk walk push_object:crate#2 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#2 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk push_object:crate#1 push_object:crate#1 push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1

```text
##########
#MGSBC#.##
#..MC....#
#.G....@.#
#..#.LP.G#
##########
```

### 7. RA_PHASE_FERRY_SEARCH_983

- score=500.0 cost=32 explored=4482 probe=exhausted bypass=false missing=n/a
- inputs=right down down left left up up down down right right up left down left up right right right down right right up left left right right up left down right up
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n3 walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:crate#2 pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 push_object:crate#4 push_object:crate#3 box_to_sticky:n1

```text
##########
#.M##.MG.#
#.S@GLMM.#
#.B..P..G#
#C.......#
##########
```

### 8. RA_PHASE_FERRY_SEARCH_1751

- score=460.0 cost=30 explored=273 probe=complete bypass=false missing=n/a
- inputs=down right up right left left up right right left down down down right right left left up up up right down right down left left down left up up
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:crate#1 walk walk walk walk walk walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

```text
########
#G.....#
#M@PLC##
##..SB##
##..GC.#
########
```

### 9. RA_PHASE_FERRY_SEARCH_344

- score=450.0 cost=29 explored=943 probe=exhausted bypass=false missing=n/a
- inputs=down left up down right right up left up right right down down left left right up right left left down right right up down up right right left
- events=walk push_object:crate#1 walk pull_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 push_object:sticky#2 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#.M...MM.#
#GG@SM..L#
#.C.B.#GP#
##########
```

### 10. RA_PHASE_FERRY_SEARCH_1715

- score=440.0 cost=30 explored=18615 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=up left left left left up up right down right left left down right right left up up right down right down left left left left up left up right
- events=walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#3 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#3 move_sticky_rigid push_object:sticky#3 move_sticky_rigid push_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid walk walk walk push_object:sticky#2 move_sticky_rigid

```text
#########
#.MG.SB.#
#...PLCC#
#G......#
#.M#..G@#
#########
```

### 11. RA_PHASE_FERRY_SEARCH_328

- score=420.0 cost=26 explored=486 probe=exhausted bypass=false missing=n/a
- inputs=right right right left up left down left down down right right up right right up right right right down left left up left up left
- events=walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk pull_object:crate#1 pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
##G.SB...#
#@...C...#
#.#M.GLP.#
#....##C.#
##########
```

### 12. RA_PHASE_FERRY_SEARCH_441

- score=420.0 cost=26 explored=1909 probe=found bypass=true missing=sticky_merge
- inputs=right down down right right down left up up up right right down left up left down right down left left right down right left left
- events=walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..@..B.#
#..#M.SP#
#M#....L#
#MGG.G..#
#########
```

### 13. RA_PHASE_FERRY_SEARCH_93

- score=410.0 cost=25 explored=13348 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization,sticky_merge,sticky_rigid_move
- inputs=down left down right up right down left left left up down right up up right left left left down down left left up down
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 pull_object:crate#1 walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#M..PS###
#C..LB@.#
#G.....G#
#.GC....#
#########
```

### 14. RA_PHASE_FERRY_SEARCH_1448

- score=410.0 cost=23 explored=2359 probe=found bypass=true missing=sticky_merge,sticky_rigid_move
- inputs=up up right up left left down up right down down down left left left right right right up left left left up
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n1 walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n4 anchor_boundary_shift:box_sticky walk push_object:crate#3

```text
##########
#C.#G....#
#.#.C....#
#.#C.CC.B#
#.PL..G@S#
##########
```

### 15. RA_PHASE_FERRY_SEARCH_1475

- score=410.0 cost=23 explored=16183 probe=found bypass=true missing=sticky_merge
- inputs=right up right down left up right left down left right up right right down left up left left up left left up
- events=walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:sticky#2 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:crate#1 push_object:crate#2 box_to_sticky:n1 walk pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.M....#
#G....C#
#L.MSBC#
#PG@G..#
########
```

### 16. RA_PHASE_FERRY_SEARCH_421

- score=400.0 cost=24 explored=22208 probe=found bypass=true missing=sticky_merge
- inputs=up up left left right down left right down left left left up down right right right right down left up left up right
- events=walk walk push_object:crate#2 push_object:crate#2 force_chain:n2 box_to_sticky:n1 pull_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#..C.C..#
#.SBLP.G#
#M....@.#
#...G...#
#########
```

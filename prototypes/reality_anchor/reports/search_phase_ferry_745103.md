# Phase Ferry Search

- seed: 745103
- iterations: 2500
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 46
- minCost: 12
- sampleMode: micro
- wallRate: 0.12
- hits: 1
- solverHits: 16

## 1. RA_PHASE_FERRY_SEARCH_2444

- score=582.3 cost=29 explored=445 graphStates=466 winStates=9 probeStates=687 scc=branching_win_dag
- inputs=left left right right up left left left left down right up up left left down right right left down left right right up up left left down right
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#3 move_sticky_rigid push_object:sticky#3 move_sticky_rigid push_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#M...#..#
#P..GGC.#
#LMSB..@#
#########
```

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_786

- score=620.0 cost=44 explored=909 probe=exhausted bypass=false missing=n/a
- inputs=left down down left down left up right down left left left right up up right down left left right right up up left left down down left up down right right right down left right up left left left up up right right
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:crate#2 box_to_sticky:n1 walk walk walk push_object:sticky#2 move_sticky_rigid walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

```text
#########
#...G#.@#
#BS..#GP#
#C.M...L#
#C....###
#########
```

### 2. RA_PHASE_FERRY_SEARCH_623

- score=590.0 cost=41 explored=2342 probe=exhausted bypass=false missing=n/a
- inputs=down right right down right up up left left left down right right up left down right down up up left left down down right up down down right right right left left left up right up left right down left
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 force_chain:n3 anchor_boundary_shift:box_sticky move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:crate#3 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#@SB.#..#
#G...GC.#
#.MG.#C##
##PL..C##
#########
```

### 3. RA_PHASE_FERRY_SEARCH_793

- score=570.0 cost=41 explored=1871 probe=exhausted bypass=false missing=n/a
- inputs=down left down left left up left down right up left left right up left left down down right right right left left left down right right right up left right up up left down left down right down right up
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#2 push_object:crate#1 box_to_sticky:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 walk walk push_object:crate#1

```text
##########
#G..SB#@.#
#M..G#..##
#.M....LP#
#....#CC##
##########
```

### 4. RA_PHASE_FERRY_SEARCH_1358

- score=560.0 cost=38 explored=1178 probe=exhausted bypass=false missing=n/a
- inputs=left up left down down right up right right down up up right right left down down left down left left left up up right left up right right right down down right down left right right up
- events=walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk pull_object:crate#2 walk walk walk pull_object:crate#3 pull_object:crate#3 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:crate#3 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#3 force_chain:n2 anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2

```text
########
#..MM.G#
#..@.S.#
#..C.B.#
#GC.CLP#
########
```

### 5. RA_PHASE_FERRY_SEARCH_1912

- score=550.0 cost=37 explored=60767 probe=exhausted bypass=false missing=n/a
- inputs=left left left down up left down down left down right up right down left left up left up right down right up left up right right right right down right down right down left left left
- events=walk walk walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#3 pull_object:crate#3 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk pull_object:sticky#2 move_sticky_rigid walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
##.....@G#
#PL..#S.M#
#.G.CCB.G#
#....C...#
##########
```

### 6. RA_PHASE_FERRY_SEARCH_1793

- score=540.0 cost=36 explored=1739 probe=exhausted bypass=false missing=n/a
- inputs=up down left left up right up right right right right down up left left left left down down right up right left left up right right left down down right right up left left left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
#MPL.G..#
#G..M.GC#
#..@SBC.#
#########
```

### 7. RA_PHASE_FERRY_SEARCH_709

- score=530.0 cost=35 explored=2152 probe=exhausted bypass=false missing=n/a
- inputs=up left up down down right right up up up left left left down up right right right down down left up left right down up left left down right right down right up up
- events=walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk walk walk walk walk walk walk walk pull_object:crate#1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

```text
########
#..BS.G#
#.L.M.M#
#GPC..##
#.#G@.##
########
```

### 8. RA_PHASE_FERRY_SEARCH_1976

- score=530.0 cost=37 explored=3915 probe=exhausted bypass=false missing=n/a
- inputs=up right right down right right right left left down right up right up left down left left up left left down right right right down right up left left up right down right right up left
- events=push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#..#G.BG#
#M....SM#
#@M...M.#
#.##.PL.#
#########
```

### 9. RA_PHASE_FERRY_SEARCH_328

- score=510.0 cost=35 explored=22305 probe=found bypass=true missing=sticky_merge,sticky_rigid_move
- inputs=up right right left up right down right left left up left right right right down left left left up down down right right right right up left up left down left left down right
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#2 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#2 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#M.C...G.#
#SBC.L..##
#.#..P...#
#..@..G..#
##########
```

### 10. RA_PHASE_FERRY_SEARCH_1095

- score=510.0 cost=33 explored=20158 probe=exhausted bypass=false missing=n/a
- inputs=right up up right right left left down down right right up down right right up up left down left up right down down left left left left left up up down down
- events=walk walk push_object:crate#1 box_to_sticky:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#4 push_object:crate#2 walk push_object:crate#4 push_object:crate#4 push_object:crate#3 push_object:crate#3 box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#2 box_to_sticky:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1

```text
##########
#M...GS..#
#.#C..B.L#
#G#..C.CP#
#.@..C...#
##########
```

### 11. RA_PHASE_FERRY_SEARCH_1356

- score=500.0 cost=34 explored=17502 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=down right down left left up up left left left down down right right right right down left left up left left left left down right up right up up right right down down
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 box_to_sticky:n1 walk walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid walk walk push_object:crate#1 walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n3 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:crate#2 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid

```text
##########
#B.C..P@C#
#S..#.L..#
#.G..M...#
#...#GM..#
##########
```

### 12. RA_PHASE_FERRY_SEARCH_411

- score=490.0 cost=33 explored=9502 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=down left up left up left down right down right up down left left up right right right up right down left left left left down right right right up down right up
- events=walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 walk walk push_object:crate#1 force_chain:n2 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:crate#2 push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid walk walk walk walk push_object:crate#1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
########
##..#G.#
#P...@.#
#LCC...#
#.GBSM.#
########
```

### 13. RA_PHASE_FERRY_SEARCH_2272

- score=480.0 cost=30 explored=830 probe=exhausted bypass=false missing=n/a
- inputs=up up right right down up left left down down right up down right left up left down right left up up left down right left down right left up
- events=walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:crate#3 push_object:crate#2 walk push_object:crate#3 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#C.G..##
#...C..#
#G.@CBS#
#...PLM#
########
```

### 14. RA_PHASE_FERRY_SEARCH_2092

- score=470.0 cost=29 explored=5851 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=right right right right right down down up right up left left down up left left left left down down down right up right right up right up left
- events=walk walk walk walk walk walk walk pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 pull_object:crate#1 walk walk walk walk pull_object:sticky#2 force_chain:n2 move_sticky_rigid sticky_to_box:n2 pull_object:crate#1 pull_object:crate#1 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid walk push_object:crate#1

```text
##########
#@GG.....#
#.B#.C...#
#.SPLM...#
#..M#.M..#
##########
```

### 15. RA_PHASE_FERRY_SEARCH_2292

- score=460.0 cost=32 explored=5855 probe=exhausted bypass=false missing=n/a
- inputs=right up right down left up right left down right up left right down down right right up down left left up up up right down left left left down left up
- events=pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk push_object:sticky#2 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid walk push_object:crate#1

```text
##########
##.G.#..B#
#......PS#
#..M@.ML.#
#..#MG...#
##########
```

### 16. RA_PHASE_FERRY_SEARCH_2444

- score=450.0 cost=29 explored=445 probe=complete bypass=false missing=n/a
- inputs=left left right right up left left left left down right up up left left down right right left down left right right up up left left down right
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#3 move_sticky_rigid push_object:sticky#3 move_sticky_rigid push_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#M...#..#
#P..GGC.#
#LMSB..@#
#########
```

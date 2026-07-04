# Soft Handoff Search

- seed: 742013
- iterations: 2500
- maxStates: 70000
- graphMaxStates: 90000
- maxDepth: 36
- costRange: 8-18
- wallRate: 0.14
- hits: 1
- solverHits: 24

## 1. RA_SOFT_HANDOFF_SEARCH_742013_977

- score=397.4 cost=15 explored=53 graphStates=189 winStates=86 probeStates=189 scc=branching_win_dag
- inputs=up left left right right up up left left down down left up right up
- events=walk walk walk pull_object:crate#2 pull_object:crate#2 walk walk walk walk walk walk pull_object:crate#2 pull_object:push_pull_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 pull_object:crate#1

```text
########
#G.#...#
#MC.G#.#
#SBC...#
#.PL.#@#
########
```

## Solver-Only Material

### 1. RA_SOFT_HANDOFF_SEARCH_742013_2311

- score=384.0 cost=16 explored=1341 probe=found bypass=true missing=material_normalization
- inputs=left left up right right down down down left up right up up right right right
- events=pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
##......#
#.G.@ML.#
#.S.M#PG#
#.B.....#
#########
```

### 2. RA_SOFT_HANDOFF_SEARCH_742013_1016

- score=380.0 cost=15 explored=366 probe=exhausted bypass=false missing=n/a
- inputs=up left down left left up up down down right up right down left up
- events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

```text
#########
##C#C#.G#
#.##.G.B#
#.M.ML.S#
#..G.P.@#
#########
```

### 3. RA_SOFT_HANDOFF_SEARCH_742013_137

- score=376.0 cost=14 explored=405 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=right down left left up left up up right right right down left down
- events=pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky

```text
########
#BS....#
#..G.M.#
#C..M@.#
#.PLG..#
########
```

### 4. RA_SOFT_HANDOFF_SEARCH_742013_585

- score=376.0 cost=12 explored=133 probe=exhausted bypass=false missing=n/a
- inputs=left down left left up up right up right right right down
- events=walk pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
#M....#
#.MMLP#
#...@G#
#.G.SB#
#######
```

### 5. RA_SOFT_HANDOFF_SEARCH_742013_1054

- score=372.0 cost=17 explored=390 probe=exhausted bypass=false missing=n/a
- inputs=left left left up right up down down right right right up left up right up right
- events=walk walk walk walk push_object:crate#2 walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:crate#2 pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1 walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
########
#PLBSG.#
#C.#G..#
#.C...M#
#...@.##
########
```

### 6. RA_SOFT_HANDOFF_SEARCH_742013_2192

- score=370.0 cost=13 explored=612 probe=exhausted bypass=false missing=n/a
- inputs=up right down up left up left left down up left down left
- events=pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#3 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
##.....C#
#....G.##
#GCB#@.G#
#..S.MLP#
#########
```

### 7. RA_SOFT_HANDOFF_SEARCH_742013_2277

- score=370.0 cost=13 explored=558 probe=exhausted bypass=false missing=n/a
- inputs=left right up up left left down left left up right right right
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
#########
#..BC..C#
#.MS.G..#
#..PG.#.#
#..L.@#.#
#########
```

### 8. RA_SOFT_HANDOFF_SEARCH_742013_977

- score=364.0 cost=15 explored=53 probe=complete bypass=false missing=n/a
- inputs=up left left right right up up left left down down left up right up
- events=walk walk walk pull_object:crate#2 pull_object:crate#2 walk walk walk walk walk walk pull_object:crate#2 pull_object:push_pull_anchor force_chain:n4 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 pull_object:crate#1

```text
########
#G.#...#
#MC.G#.#
#SBC...#
#.PL.#@#
########
```

### 9. RA_SOFT_HANDOFF_SEARCH_742013_2214

- score=360.0 cost=18 explored=6435 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=up down left left up left down up right right right down left up left left up right
- events=push_object:sticky#2 move_sticky_rigid walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
##G..M..#
#..C..GM#
##.C...@#
#..BSLP.#
#########
```

### 10. RA_SOFT_HANDOFF_SEARCH_742013_780

- score=358.0 cost=12 explored=165 probe=found bypass=true missing=material_normalization
- inputs=down left up down left left up right left left down down
- events=walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#LPB.CG.#
#..SM@..#
#G....#.#
#.......#
#########
```

### 11. RA_SOFT_HANDOFF_SEARCH_742013_1091

- score=358.0 cost=14 explored=3899 probe=found bypass=true missing=material_normalization
- inputs=right right down down left right right up left left down right down left
- events=walk walk walk walk push_object:crate#2 box_to_sticky:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2

```text
#########
#..@....#
#...C...#
#..GC...#
#.GSBPL.#
#########
```

### 12. RA_SOFT_HANDOFF_SEARCH_742013_550

- score=356.0 cost=17 explored=3330 probe=found bypass=true missing=material_normalization
- inputs=up right down left down down left up left up right right left left down left up
- events=walk pull_object:crate#1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#G.C..B##
#.PL@.S.#
#.....#.#
#.G..M..#
#########
```

### 13. RA_SOFT_HANDOFF_SEARCH_742013_629

- score=346.0 cost=15 explored=313 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=up up left down left up down right right down left up up up left
- events=walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk pull_object:crate#1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
#######
#.CGBS#
##...M#
#LG.G##
#P..@M#
#######
```

### 14. RA_SOFT_HANDOFF_SEARCH_742013_2101

- score=346.0 cost=15 explored=722 probe=found bypass=true missing=material_normalization
- inputs=left left up up right right right down down up right right down left left
- events=walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:crate#2 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#.PLC...#
#.#GC.B.#
#..@..S.#
#...G...#
#########
```

### 15. RA_SOFT_HANDOFF_SEARCH_742013_988

- score=336.0 cost=10 explored=161 probe=found bypass=true missing=material_normalization
- inputs=right up right right right down left left left left
- events=walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#..M.LP.#
#M...G..#
#@G...SB#
#########
```

### 16. RA_SOFT_HANDOFF_SEARCH_742013_2443

- score=334.0 cost=10 explored=203 probe=found bypass=true missing=material_normalization
- inputs=down right right right up up up left down right
- events=pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#....PG.#
#.#.MLS.#
###.@.B.#
#CC...G.#
#########
```

### 17. RA_SOFT_HANDOFF_SEARCH_742013_2460

- score=334.0 cost=16 explored=2262 probe=exhausted bypass=false missing=n/a
- inputs=left left up down down left up up right right up right down down left right
- events=walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.#C.LP.#
##.B..C.#
#..S..G@#
#....GG.#
#########
```

### 18. RA_SOFT_HANDOFF_SEARCH_742013_887

- score=330.0 cost=15 explored=595 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=up right right down down down left right up right right up up left left
- events=walk walk walk walk walk walk walk pull_object:crate#2 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

```text
########
#...G..#
#@S....#
#.B...C#
#CG..LP#
########
```

### 19. RA_SOFT_HANDOFF_SEARCH_742013_995

- score=330.0 cost=15 explored=1070 probe=found bypass=true missing=push_pull_anchor_shift,material_normalization
- inputs=up left up left down up right right down right left left down left left
- events=walk pull_object:sticky#2 move_sticky_rigid walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:sticky#1 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

```text
#########
#C.M...P#
#....GML#
#.BS.@M.#
#.#G....#
#########
```

### 20. RA_SOFT_HANDOFF_SEARCH_742013_1267

- score=330.0 cost=11 explored=299 probe=found bypass=true missing=material_normalization
- inputs=right down left right up left left up left left down
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#...C.C.#
#PLG@...#
#GSB....#
#########
```

### 21. RA_SOFT_HANDOFF_SEARCH_742013_2386

- score=330.0 cost=15 explored=281 probe=found bypass=true missing=material_normalization
- inputs=down left down down left left up down right right right up up right up
- events=walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.S.M@.#
#.B#..G#
#.G#.L.#
#C...P.#
########
```

### 22. RA_SOFT_HANDOFF_SEARCH_742013_2026

- score=328.0 cost=18 explored=1347 probe=exhausted bypass=false missing=n/a
- inputs=right up left up left left right right down right down left left up left down left left
- events=walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk pull_object:crate#1 walk walk walk walk pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#.SB...##
##..GC..#
#.....@.#
#GPLC#C.#
#########
```

### 23. RA_SOFT_HANDOFF_SEARCH_742013_1429

- score=326.0 cost=12 explored=517 probe=found bypass=true missing=material_normalization
- inputs=down down right right up right right left left down left left
- events=walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.@.M..S#
#..#.G.B#
#....L..#
#C.G.P..#
#########
```

### 24. RA_SOFT_HANDOFF_SEARCH_742013_376

- score=322.0 cost=17 explored=1052 probe=exhausted bypass=false missing=n/a
- inputs=right up right right down down left left down right right right up right up up left
- events=walk pull_object:crate#2 walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:crate#3 pull_object:crate#3 pull_object:crate#3 box_to_sticky:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#...GP..#
#@.#GL..#
#CC..BS##
#C..G.M.#
#########
```

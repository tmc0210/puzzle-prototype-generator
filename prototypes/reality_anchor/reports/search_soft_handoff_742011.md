# Soft Handoff Search

- seed: 742011
- iterations: 2500
- maxStates: 70000
- graphMaxStates: 90000
- maxDepth: 36
- costRange: 8-18
- wallRate: 0.1
- hits: 7
- solverHits: 24

## 1. RA_SOFT_HANDOFF_SEARCH_742011_2193

- score=457.0 cost=14 explored=62 graphStates=385 winStates=25 probeStates=426 scc=one_win_continuation_per_scc
- inputs=down left up up right right right right down right down left left up
- events=pull_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:crate#1 push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.MGG..##
#.@SB...#
#..LPC..#
#########
```

## 2. RA_SOFT_HANDOFF_SEARCH_742011_1990

- score=449.1 cost=16 explored=217 graphStates=373 winStates=13 probeStates=678 scc=branching_win_dag
- inputs=up left right down down left left right right up up left down left left right
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 push_object:crate#1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk pull_object:box_sticky_anchor force_chain:n4 anchor_boundary_shift:box_sticky

```text
#######
#..##.#
#..LP.#
#S.MM@#
#BG.CG#
#######
```

## 3. RA_SOFT_HANDOFF_SEARCH_742011_1585

- score=441.2 cost=10 explored=44 graphStates=71 winStates=9 probeStates=117 scc=one_win_continuation_per_scc
- inputs=right down down right up left left left down right
- events=walk push_object:crate#2 push_object:crate#2 box_to_sticky:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
##.@.C#
#P..C.#
#LGB..#
#M#SG.#
#######
```

## 4. RA_SOFT_HANDOFF_SEARCH_742011_1334

- score=439.1 cost=18 explored=169 graphStates=179 winStates=10 probeStates=394 scc=branching_win_dag
- inputs=right right left left up right right left down down right right left left up up right down
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
########
#.PL..M#
#@..BS.#
##.CGMG#
########
```

## 5. RA_SOFT_HANDOFF_SEARCH_742011_1924

- score=435.3 cost=12 explored=52 graphStates=60 winStates=2 probeStates=60 scc=one_win_continuation_per_scc
- inputs=down left left right up left down left left right right right
- events=walk walk walk pull_object:crate#1 walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#MPSB..@#
#.L.CG..#
##..#G..#
#########
```

## 6. RA_SOFT_HANDOFF_SEARCH_742011_1740

- score=429.6 cost=18 explored=195 graphStates=209 winStates=2 probeStates=209 scc=branching_win_dag
- inputs=down down left up up left right right down down left up down right up up left left
- events=walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk walk walk pull_object:crate#1 walk walk walk pull_object:crate#1 pull_object:crate#1

```text
#########
##.M.G@C#
#..L#G.C#
#..PSB.##
#########
```

## 7. RA_SOFT_HANDOFF_SEARCH_742011_549

- score=393.3 cost=9 explored=42 graphStates=59 winStates=2 probeStates=76 scc=branching_win_dag
- inputs=right up up down left left left right right
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull box_to_sticky:n1

```text
########
#CPCG.G#
#.L..C.#
##.#.@.#
#..C#BS#
########
```

## Solver-Only Material

### 1. RA_SOFT_HANDOFF_SEARCH_742011_2409

- score=420.0 cost=13 explored=383 probe=exhausted bypass=false missing=n/a
- inputs=left left down down down left up up right right right left up
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk push_object:crate#2 push_object:crate#1 walk push_object:crate#2 push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#G..@BS#
#.GC...#
#C.PLC.#
#...#..#
########
```

### 2. RA_SOFT_HANDOFF_SEARCH_742011_1271

- score=404.0 cost=13 explored=137 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=up right down left up left down right right right up left left
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1

```text
########
#M.##LP#
#GC....#
#SBG@..#
########
```

### 3. RA_SOFT_HANDOFF_SEARCH_742011_2238

- score=392.0 cost=14 explored=1044 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=right right right left up right down right right left up left down left
- events=walk walk walk pull_object:crate#1 walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
##.....P#
#@...CGL#
#...GB.C#
#..GMS..#
#########
```

### 4. RA_SOFT_HANDOFF_SEARCH_742011_1220

- score=388.0 cost=13 explored=143 probe=found bypass=true missing=material_normalization
- inputs=down right right down down left left up left up left down left
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid

```text
#########
#.PL#@.##
#.GSB...#
#..G.GC.#
#...C...#
#########
```

### 5. RA_SOFT_HANDOFF_SEARCH_742011_472

- score=380.0 cost=15 explored=1011 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=up right up left left down down down right up down left left up up
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 push_object:crate#2

```text
#######
#.G.G.#
#..L.G#
#CCP@B#
#....S#
#######
```

### 6. RA_SOFT_HANDOFF_SEARCH_742011_1210

- score=380.0 cost=11 explored=145 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=down left left up left left left left down down right
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#......@#
#.C..G..#
#.CG#B..#
#.MPLS..#
#########
```

### 7. RA_SOFT_HANDOFF_SEARCH_742011_2464

- score=380.0 cost=15 explored=250 probe=found bypass=true missing=material_normalization
- inputs=right right down down right left left down up right right down left up down
- events=walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 box_to_sticky:n1

```text
#######
#@..B.#
##M.S.#
#L.G.M#
#PG...#
#######
```

### 8. RA_SOFT_HANDOFF_SEARCH_742011_2413

- score=372.0 cost=17 explored=3674 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=down right left up right right down down down left up left up down right right up
- events=walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#1 move_sticky_rigid

```text
#########
#.@.GG#.#
#...MLG.#
#..MMP..#
#.BS...##
#########
```

### 9. RA_SOFT_HANDOFF_SEARCH_742011_108

- score=370.0 cost=13 explored=622 probe=found bypass=true missing=material_normalization
- inputs=down down left up left up right down left left up right right
- events=walk push_object:sticky#3 move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk push_object:crate#1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
########
#..BG.@#
#..S.MG#
#..MLPM#
###..#G#
########
```

### 10. RA_SOFT_HANDOFF_SEARCH_742011_1975

- score=370.0 cost=13 explored=394 probe=found bypass=true missing=material_normalization
- inputs=up right up right right down up left left down right down left
- events=pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#..C...#
#.PGB#C#
#@L.SG.#
#M.....#
########
```

### 11. RA_SOFT_HANDOFF_SEARCH_742011_2454

- score=370.0 cost=13 explored=246 probe=found bypass=true missing=material_normalization
- inputs=up left left left left down down right right left left left down
- events=walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull

```text
#########
#.......#
#..GPLM@#
#CGBS.M##
#.......#
#########
```

### 12. RA_SOFT_HANDOFF_SEARCH_742011_7

- score=358.0 cost=12 explored=420 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=up right right down down up right right right left down down
- events=walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid

```text
#########
#.....CB#
#@.PL..S#
##M..G.##
#.#G....#
#########
```

### 13. RA_SOFT_HANDOFF_SEARCH_742011_1008

- score=358.0 cost=14 explored=463 probe=found bypass=true missing=material_normalization
- inputs=up left down right up right right down down right up left left left
- events=walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull

```text
#########
#.GCP...#
#B@.L..C#
#S#..G#.#
#G...M.##
#########
```

### 14. RA_SOFT_HANDOFF_SEARCH_742011_1241

- score=358.0 cost=14 explored=470 probe=exhausted bypass=false missing=n/a
- inputs=right down down right up right left down left left up up right down
- events=walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
#G..G.#
#@..MS#
#C.PLB#
#.G..##
#######
```

### 15. RA_SOFT_HANDOFF_SEARCH_742011_1549

- score=358.0 cost=12 explored=347 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=left right right down left left up right right right left left
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
##M.G#..#
#BS.@G.L#
#.G.M.MP#
#########
```

### 16. RA_SOFT_HANDOFF_SEARCH_742011_1829

- score=358.0 cost=14 explored=475 probe=found bypass=true missing=material_normalization
- inputs=right down right down up right down down left left up right up right
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#2

```text
#########
#.@G..#C#
#PL.G...#
#.#...B##
#...MGSM#
#########
```

### 17. RA_SOFT_HANDOFF_SEARCH_742011_2121

- score=358.0 cost=14 explored=1027 probe=exhausted bypass=false missing=n/a
- inputs=down left left down right down left left up right up up left right
- events=walk walk walk push_object:crate#3 box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:crate#2 walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull

```text
#########
#L...@..#
#PGG....#
#CCCB...#
#...S...#
#########
```

### 18. RA_SOFT_HANDOFF_SEARCH_742011_2193

- score=358.0 cost=14 explored=62 probe=complete bypass=false missing=n/a
- inputs=down left up up right right right right down right down left left up
- events=pull_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:crate#1 push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.MGG..##
#.@SB...#
#..LPC..#
#########
```

### 19. RA_SOFT_HANDOFF_SEARCH_742011_1935

- score=354.0 cost=13 explored=492 probe=found bypass=true missing=push_pull_anchor_shift,pull_event
- inputs=right down right right right up left left left down down right right
- events=walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#2 push_object:crate#2 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#G@.SB.C#
#.P.M...#
##L.G...#
#########
```

### 20. RA_SOFT_HANDOFF_SEARCH_742011_1585

- score=350.0 cost=10 explored=44 probe=complete bypass=false missing=n/a
- inputs=right down down right up left left left down right
- events=walk push_object:crate#2 push_object:crate#2 box_to_sticky:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
##.@.C#
#P..C.#
#LGB..#
#M#SG.#
#######
```

### 21. RA_SOFT_HANDOFF_SEARCH_742011_1105

- score=346.0 cost=11 explored=245 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=down left up right right down down left up down left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#..##..##
#.SM.@.##
#.BC.GL.#
#..G..PC#
#########
```

### 22. RA_SOFT_HANDOFF_SEARCH_742011_1484

- score=346.0 cost=11 explored=808 probe=found bypass=true missing=material_normalization
- inputs=left down down left left up left left right right right
- events=push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
#..GSBC@#
#M..G...#
#....G.##
#...LP.##
#########
```

### 23. RA_SOFT_HANDOFF_SEARCH_742011_1984

- score=342.0 cost=14 explored=481 probe=found bypass=true missing=material_normalization
- inputs=down left left right right right up left up up left left down right
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.....#.#
#.MS.GG.#
#.CB.@..#
#PL.....#
#########
```

### 24. RA_SOFT_HANDOFF_SEARCH_742011_744

- score=340.0 cost=14 explored=193 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=down left left up right up right down left down right up right up
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 box_to_sticky:n1

```text
#######
#..#G.#
#SPLM.#
#B.@C.#
#...G.#
#######
```

# Dual Lockstep Search

- seed: 742002
- iterations: 1600
- minCost: 16
- maxStates: 70000
- graphMaxStates: 90000
- solverHits: 44
- hits: 4/18

## 1. RA_SEARCH_245

- score=297.0 cost=23 explored=2716 graph=complete/7515 wins=45 scc=branching_win_dag
- inputs=down right up up up down left left up up right down down down up up up right left left down down down
- events=walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#LP.G#.#
#......#
#.C.#CC#
#G.B##C#
#.@S#..#
#.G..#.#
########
```

## 2. RA_SEARCH_418

- score=240.7 cost=18 explored=375 graph=complete/737 wins=36 scc=branching_win_dag
- inputs=right right left left up down left up up right right right down left up left up right
- events=walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 move_sticky_rigid

```text
########
#..CG###
#.LP..M#
#.GBS###
#.@.MGM#
########
```

## 3. RA_SEARCH_832

- score=54.0 cost=34 explored=6158 graph=complete/17650 wins=222 scc=branching_win_dag
- inputs=up right up right right up right down right down down left up up up right down left down down down left left up up left up right right right down up up left
- events=walk walk walk walk walk walk pull_object:crate#2 box_to_sticky:n1 walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.CC.GM#
##.....#
#..L#..#
#@.P#G.#
#..BS.M#
########
```

## 4. RA_SEARCH_10

- score=-65.0 cost=45 explored=12707 graph=complete/25750 wins=313 scc=branching_win_dag
- inputs=down down down right up up down down left up up right up right right down right down down left up up up right left left left left down down right down right right up up up right down right right up left down left
- events=walk walk walk push_object:crate#4 walk walk pull_object:crate#2 pull_object:crate#3 walk walk walk walk pull_object:crate#3 walk walk walk walk pull_object:crate#2 pull_object:crate#3 walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid

```text
##########
#C@CGGCBS#
##..#..G.#
#L.G#..#M#
#P.C...C.#
##########
```

## Solver-Only Hits

### 1. RA_SEARCH_727

- score=527.3 cost=77 explored=53136
- inputs=left left down left down right down up left left down down right down right left up left up up right right down up left left down down right down right right up down left left left up up up up left down right right right right down up left left left down down right right up right up left left right down down left left up up down down right down right right left left left
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk walk walk pull_object:sticky#3 move_sticky_rigid walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:crate#2 walk walk push_object:crate#2 push_object:crate#2 walk walk walk walk walk walk push_object:crate#2 walk walk walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#..#..@C#
#.G.P####
#B..L..##
#S.#..#.#
#.G.M...#
#M...M..#
#########
```

### 2. RA_SEARCH_1563

- score=451.7 cost=57 explored=39951
- inputs=right right up left right right right up right up right right down down left down left left up left up up right right down left up left down right down left up right right right down left up left left down down left left up right down right up up right up left right right down
- events=walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk pull_object:crate#1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#3 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:sticky#2 move_sticky_rigid walk walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 push_object:crate#1 push_object:crate#2 walk push_object:crate#1 walk walk push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1

```text
##########
#.#GPL...#
#.B#C..C.#
#.S.M.G..#
#@..MG..##
##########
```

### 3. RA_SEARCH_1168

- score=450.3 cost=56 explored=29106
- inputs=up left up up right right down down down left left left up right right right right down left up up up left left down right up right right right down up left left down down left up up left down up right right left down right up left down left down up up right right
- events=walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:crate#1 walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n3 pull_object:crate#3 walk push_object:crate#1 force_chain:n2 box_to_sticky:n1 pull_object:crate#2 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#2 pull_object:crate#1 pull_object:crate#3 walk push_object:crate#1 force_chain:n2 box_to_sticky:n1 sticky_merge:n1 pull_object:crate#1 walk pull_object:sticky#1 force_chain:n3 move_sticky_rigid sticky_to_box:n2 pull_object:crate#3 push_object:crate#1 push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull

```text
########
#...PGG#
##.CLB.#
#....S.#
#.M@.MM#
########
```

### 4. RA_SEARCH_1116

- score=444.4 cost=53 explored=1937
- inputs=right right down right up left up left down down left up down right up up up left down right up up right right left left down down down down right right right right up up up up left down right down down down left left up left right right up right down
- events=walk walk walk pull_object:sticky#3 move_sticky_rigid walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 pull_object:sticky#3 move_sticky_rigid walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:crate#1 force_chain:n3 anchor_boundary_shift:box_sticky walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 push_object:crate#3 push_object:crate#1 walk push_object:crate#3

```text
########
#M...LP#
#..##M.#
#M..#M.#
#@G..SB#
#.M...G#
########
```

### 5. RA_SEARCH_1165

- score=420.9 cost=50 explored=27226
- inputs=left left up left up right right right left down down right right up up up left left left right down right right left left left up right right down right right right up left down left left up right down left left down left up right down down left
- events=walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#3 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 push_object:crate#1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk push_object:sticky#3 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#2 move_sticky_rigid

```text
#########
#.GSBPG.#
#....LC.#
#..M#.C.#
#M.G@..##
#########
```

### 6. RA_SEARCH_497

- score=418.3 cost=51 explored=50123
- inputs=left left left left left up down right right up up left down left left left right right right right right up left left left down right left down right down left up up right right left left left left down right right right right up left left up right right
- events=walk walk walk walk push_object:sticky#2 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 move_sticky_rigid walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n3 walk walk pull_object:crate#1 box_to_sticky:n1 walk walk pull_object:sticky#1 move_sticky_rigid pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 push_object:crate#1 force_chain:n2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1

```text
###########
#.#.LP..G.#
#MGG....SB#
#M..M...G@#
#.##.M.M.##
###########
```

### 7. RA_SEARCH_1407

- score=395.1 cost=46 explored=44617
- inputs=up up left left right down down right down left up up up left left down left down left up right right up right right down left right down down left left up left up right right right right left left left left left left up
- events=walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 push_object:crate#1 walk walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk push_object:crate#1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#.#...MG.#
#.G...M.G#
#...C#.@.#
##.LPBS..#
##########
```

### 8. RA_SEARCH_1599

- score=378.0 cost=44 explored=5989
- inputs=up up left left left left down down down left up right right right left left up up right right down down right right left down right right up down left left up left up up left down down right left left left up
- events=pull_object:crate#3 pull_object:crate#2 walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:crate#2 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#2 box_to_sticky:n1 walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

```text
#########
##...G.P#
#.GSB#.L#
#G...C@C#
#..M..C.#
#########
```

### 9. RA_SEARCH_560

- score=364.6 cost=39 explored=31288
- inputs=down left left down right up up up right right right right left left left left down down right right right right right right down left left left left up right right right up up left left left down
- events=pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 box_to_sticky:n1

```text
##########
#BGC...LP#
#S.@MG#.##
#...G....#
#G..MM.M.#
##########
```

### 10. RA_SEARCH_1394

- score=364.2 cost=38 explored=17344
- inputs=down up up left down left up right right down down right down left up up up left left left right right down left up right down right down left right down left left up left up right
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 push_object:sticky#1 move_sticky_rigid pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid

```text
#########
##M.GG..#
#MMM.G@G#
##..S...#
##..B.LP#
#########
```

### 11. RA_SEARCH_10

- score=360.8 cost=45 explored=12707
- inputs=down down down right up up down down left up up right up right right down right down down left up up up right left left left left down down right down right right up up up right down right right up left down left
- events=walk walk walk push_object:crate#4 walk walk pull_object:crate#2 pull_object:crate#3 walk walk walk walk pull_object:crate#3 walk walk walk walk pull_object:crate#2 pull_object:crate#3 walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid

```text
##########
#C@CGGCBS#
##..#..G.#
#L.G#..#M#
#P.C...C.#
##########
```

### 12. RA_SEARCH_1527

- score=350.4 cost=35 explored=13763
- inputs=down down right right up up right right down right down up left left up left left up right right down right down left up left left down down right right left left up up
- events=walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#3 move_sticky_rigid walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 box_to_sticky:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk walk walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
##GG.M.#
#@.....#
#..BS..#
#..GPL.#
#..#M.M#
########
```

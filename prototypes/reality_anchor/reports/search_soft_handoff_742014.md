# Soft Handoff Search

- seed: 742014
- iterations: 2500
- maxStates: 70000
- graphMaxStates: 90000
- maxDepth: 36
- costRange: 8-18
- wallRate: 0.16
- hits: 2
- solverHits: 23

## 1. RA_SOFT_HANDOFF_SEARCH_742014_1822

- score=401.8 cost=9 explored=54 graphStates=120 winStates=3 probeStates=120 scc=branching_win_dag
- inputs=down down right right right up right right down
- events=walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#@..MPL#
#.M#..G#
#M..S..#
#.#.BG##
########
```

## 2. RA_SOFT_HANDOFF_SEARCH_742014_976

- score=369.9 cost=18 explored=111 graphStates=151 winStates=17 probeStates=181 scc=branching_win_dag
- inputs=right right down left left up right right down left down left up left right right up left
- events=walk walk push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##G.@..##
#.GGSBC##
#.##LP..#
###.MC#.#
#########
```

## Solver-Only Material

### 1. RA_SOFT_HANDOFF_SEARCH_742014_2089

- score=396.0 cost=15 explored=136 probe=exhausted bypass=false missing=n/a
- inputs=up left right right down up right down up left left down right left left
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1 walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 pull_object:crate#3 box_to_sticky:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 walk pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#######
#.P..M#
#.L@MM#
#M.S..#
##GB#G#
#######
```

### 2. RA_SOFT_HANDOFF_SEARCH_742014_558

- score=384.0 cost=16 explored=2573 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=up right down right left up right up right up right down up right down up
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2

```text
#########
#.#...G.#
#.......#
#L.GB.C.#
#P@.SM.M#
#########
```

### 3. RA_SOFT_HANDOFF_SEARCH_742014_1890

- score=376.0 cost=12 explored=255 probe=exhausted bypass=false missing=n/a
- inputs=right right up left up left right down down left left up
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
########
#GM....#
#BSM..L#
#.M@.GP#
########
```

### 4. RA_SOFT_HANDOFF_SEARCH_742014_1499

- score=368.0 cost=16 explored=378 probe=exhausted bypass=false missing=n/a
- inputs=right left up left right right down left up left left down right right up down
- events=push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
##C..C..#
#SB.GL.##
#.G.@P.##
#########
```

### 5. RA_SOFT_HANDOFF_SEARCH_742014_444

- score=364.0 cost=11 explored=99 probe=found bypass=true missing=material_normalization
- inputs=right right right right right left up up left left down
- events=walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#......##
#GM.C..##
###SB.GP#
#@..G..L#
#########
```

### 6. RA_SOFT_HANDOFF_SEARCH_742014_2032

- score=362.0 cost=11 explored=272 probe=found bypass=true missing=material_normalization
- inputs=left up up up right right down down up right down
- events=walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 box_to_sticky:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#....BS.#
#.....M.#
#.C.#PLG#
#C..@.G.#
#########
```

### 7. RA_SOFT_HANDOFF_SEARCH_742014_1068

- score=354.0 cost=13 explored=288 probe=found bypass=true missing=pull_event
- inputs=up left down down right up right up right right down right up
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#2 box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid

```text
########
#.G..CG#
#..L.C.#
#.@P.BS#
#..##.G#
########
```

### 8. RA_SOFT_HANDOFF_SEARCH_742014_1728

- score=346.0 cost=15 explored=190 probe=exhausted bypass=false missing=n/a
- inputs=right up right down right left up right up left right down down left up
- events=walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1

```text
#######
##CG.B#
##...S#
#@.PLM#
#.MG..#
#######
```

### 9. RA_SOFT_HANDOFF_SEARCH_742014_1254

- score=344.0 cost=18 explored=4076 probe=found bypass=true missing=material_normalization
- inputs=down right right up left up right up left right right right right down right down up up
- events=walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 walk walk push_object:crate#1 walk walk walk walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#G...G..#
#.C..M..#
#@..M#M.#
#.BS.PL.#
#########
```

### 10. RA_SOFT_HANDOFF_SEARCH_742014_1636

- score=342.0 cost=12 explored=499 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=down down left left left right right up left up left left
- events=walk walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

```text
#########
#.G.C@.C#
#..G..#.#
#L.G...C#
#PSB..#.#
#########
```

### 11. RA_SOFT_HANDOFF_SEARCH_742014_495

- score=334.0 cost=16 explored=1096 probe=found bypass=true missing=push_pull_anchor_shift,material_normalization
- inputs=right down right up left up left down left left right right up left left left
- events=walk walk walk push_object:crate#1 walk walk pull_object:crate#1 walk walk walk pull_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

```text
#########
#.G.....#
#L..@.C.#
#PSBC.G##
#########
```

### 12. RA_SOFT_HANDOFF_SEARCH_742014_510

- score=330.0 cost=11 explored=47 probe=exhausted bypass=false missing=n/a
- inputs=down left left down down right right left up left right
- events=walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
########
#C..#@C#
##BGG.##
##SGML.#
##M..P.#
########
```

### 13. RA_SOFT_HANDOFF_SEARCH_742014_1170

- score=330.0 cost=15 explored=197 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=down left left down left up left right right up left down down left left
- events=walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid

```text
#########
##.....@#
#SBG.LP.#
#G.C..C##
#########
```

### 14. RA_SOFT_HANDOFF_SEARCH_742014_847

- score=310.0 cost=18 explored=851 probe=found bypass=true missing=material_normalization
- inputs=up right up right up left left left right down right down down left left left up right
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.GGC...#
#...#LP.#
#..SB.G.#
#...C@..#
#########
```

### 15. RA_SOFT_HANDOFF_SEARCH_742014_1822

- score=306.0 cost=9 explored=54 probe=complete bypass=false missing=n/a
- inputs=down down right right right up right right down
- events=walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#@..MPL#
#.M#..G#
#M..S..#
#.#.BG##
########
```

### 16. RA_SOFT_HANDOFF_SEARCH_742014_1087

- score=296.0 cost=15 explored=1515 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=up right up right down left left left up right right right down left left
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 push_object:crate#1 box_to_sticky:n1

```text
#########
##PL...G#
#.G...C.#
#..@..C.#
##SB.#.##
#########
```

### 17. RA_SOFT_HANDOFF_SEARCH_742014_1418

- score=294.0 cost=18 explored=712 probe=exhausted bypass=false missing=n/a
- inputs=down left down right down left right right up up up left left down left down down right
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
##..@S#
#.C.GB#
##CG..#
#PL..G#
#######
```

### 18. RA_SOFT_HANDOFF_SEARCH_742014_1474

- score=294.0 cost=18 explored=496 probe=found bypass=true missing=material_normalization
- inputs=up down left up left down right right right up up left right right right down down left
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.MSBG..#
#....L.C#
#..@GP.##
#########
```

### 19. RA_SOFT_HANDOFF_SEARCH_742014_553

- score=284.0 cost=16 explored=364 probe=found bypass=true missing=material_normalization
- inputs=right right right right down down left left left up right up right down right left
- events=walk walk walk walk walk walk walk walk push_object:crate#2 push_object:crate#1 box_to_sticky:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#..#....#
#.@G...S#
###CPLGB#
#..C.G..#
#########
```

### 20. RA_SOFT_HANDOFF_SEARCH_742014_976

- score=276.0 cost=18 explored=111 probe=complete bypass=false missing=n/a
- inputs=right right down left left up right right down left down left up left right right up left
- events=walk walk push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##G.@..##
#.GGSBC##
#.##LP..#
###.MC#.#
#########
```

### 21. RA_SOFT_HANDOFF_SEARCH_742014_267

- score=272.0 cost=9 explored=238 probe=found bypass=true missing=push_pull_anchor_shift,material_normalization
- inputs=up left left down down right down right up
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
#########
#....G#M#
##...@.M#
#.LG.S..#
#.P..B..#
#########
```

### 22. RA_SOFT_HANDOFF_SEARCH_742014_2129

- score=272.0 cost=9 explored=211 probe=found bypass=true missing=material_normalization
- inputs=up right up right up left right down right
- events=walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
########
#L.....#
#PGBS.G#
#....M.#
#@.C..M#
########
```

### 23. RA_SOFT_HANDOFF_SEARCH_742014_1463

- score=260.0 cost=8 explored=133 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=down left left up up left left right
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
#########
#BSG..M.#
#.MM...@#
##.GLP..#
#########
```

# Phase Ferry Search

- seed: 745105
- iterations: 2500
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 46
- minCost: 12
- sampleMode: lean
- wallRate: 0.12
- hits: 0
- solverHits: 16

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_1519

- score=610.0 cost=45 explored=53963 probe=exhausted bypass=false missing=n/a
- inputs=up left left up right right down down right up right down down left left left up up right down up right down left right up left left up left down down right left left down right right right up left right right right up
- events=walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#2 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..BCC..#
#M.S....#
#..G.@.G#
#....PL.#
#########
```

### 2. RA_PHASE_FERRY_SEARCH_2120

- score=590.0 cost=45 explored=114704 probe=exhausted bypass=false missing=n/a
- inputs=up up right right right down right left left left down right right right up up left left left up left left down up right right down left left right right right right right down left left left right right right right right up up
- events=walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid walk pull_object:crate#1 pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
###########
#M...#M#..#
#GS......G#
##BG....C.#
##.@.PL...#
###########
```

### 3. RA_PHASE_FERRY_SEARCH_2103

- score=550.0 cost=41 explored=71307 probe=found bypass=true missing=sticky_merge
- inputs=left up left up up up right right right right down down down up up up left left left left down down down right right right left left left up up up right right right down down right down left left
- events=walk walk walk walk walk walk walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#C.......#
#.C.##B..#
#...#.S..#
#.#..PL.M#
##..G@.MG#
##########
```

### 4. RA_PHASE_FERRY_SEARCH_958

- score=530.0 cost=35 explored=11610 probe=exhausted bypass=false missing=n/a
- inputs=left up up right left up right right down down right down right up down right right up right up left down left up right right up left left left down down left down right
- events=walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#3 force_chain:n3 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#3 force_chain:n3 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#3 force_chain:n3 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk push_object:crate#1 walk walk push_object:crate#1

```text
##########
#G..M....#
#..S#M.M.#
#.CB..LP.#
#.@#..G..#
##########
```

### 5. RA_PHASE_FERRY_SEARCH_195

- score=520.0 cost=34 explored=102977 probe=exhausted bypass=false missing=n/a
- inputs=up up up right right down left left down left up up left up right right right down right down left down left down left up up right up right right right down down
- events=walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#3 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#....PL.#
#..G.B..#
#M...S.G#
##G..M#.#
#.M.@...#
#########
```

### 6. RA_PHASE_FERRY_SEARCH_1117

- score=510.0 cost=35 explored=42741 probe=exhausted bypass=false missing=n/a
- inputs=down left down left left right right right down right down down left right up up up up up left left down up left left down down down up right left left up up left
- events=walk walk pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk pull_object:crate#1 box_to_sticky:n1 walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

```text
#########
#....M@.#
#G..#...#
#.M.....#
#.S.....#
#GBC#.#.#
##.#GLP.#
#########
```

### 7. RA_PHASE_FERRY_SEARCH_1520

- score=470.0 cost=31 explored=76920 probe=exhausted bypass=false missing=n/a
- inputs=left up right down right right up right right right down right up up left left down up right down left up left up left left down left down right right
- events=walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
#.#..M..MM#
#.S.#.PL.M#
#.B..G....#
#.@..GG...#
###########
```

### 8. RA_PHASE_FERRY_SEARCH_1703

- score=470.0 cost=31 explored=58407 probe=found bypass=true missing=material_normalization,sticky_merge
- inputs=up right right right right down up left left up right right right down left down right down left left up left left up left up right right right right right
- events=walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#2 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#......BG#
#..M..GS##
#@....M#.#
#M..PL..##
##########
```

### 9. RA_PHASE_FERRY_SEARCH_1900

- score=460.0 cost=28 explored=34932 probe=found bypass=true missing=sticky_merge
- inputs=left left right up left up right down down left left left left up left up up right right down right down right up down left left left
- events=walk walk pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

```text
#########
##..C.B.#
#.PL..S.#
#.#MG..G#
#..M....#
#G..M..@#
#########
```

### 10. RA_PHASE_FERRY_SEARCH_1778

- score=450.0 cost=29 explored=101355 probe=exhausted bypass=false missing=n/a
- inputs=down down left right up left left left down right up up left right down down down down left left left up up right up right down left left
- events=walk walk walk pull_object:crate#3 walk walk walk walk pull_object:crate#1 pull_object:crate#2 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#G.PLC..@#
#..GG....#
#.#BC.C..#
#..S#....#
#..M.....#
##########
```

### 11. RA_PHASE_FERRY_SEARCH_83

- score=440.0 cost=26 explored=26162 probe=exhausted bypass=false missing=n/a
- inputs=up up right right right right down down right down left left down left up up right left left left up up right down down down
- events=walk walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_to_box:n2 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
#########
#.....B.#
#..G#.SG#
#@.PL...#
#.MM....#
#MG.....#
#########
```

### 12. RA_PHASE_FERRY_SEARCH_1652

- score=440.0 cost=28 explored=6227 probe=exhausted bypass=false missing=n/a
- inputs=down left up up down left up right down left down up up right down left up down down right right up left left down down left left
- events=walk push_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid walk pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk push_object:sticky#2 move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:crate#1 push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky

```text
##########
###.M...##
#......#.#
#....LP@.#
#GS##.M.##
#GB.CC#..#
##########
```

### 13. RA_PHASE_FERRY_SEARCH_114

- score=430.0 cost=25 explored=102333 probe=exhausted bypass=false missing=n/a
- inputs=up right left down right down left right right down left left left up right left left up up up right right right down left
- events=walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:sticky#1 move_sticky_rigid

```text
###########
#...MMS...#
##G...B##.#
#..#@G.#.##
#.PL......#
#.C...G...#
###########
```

### 14. RA_PHASE_FERRY_SEARCH_2111

- score=400.0 cost=26 explored=40024 probe=found bypass=true missing=sticky_merge
- inputs=right up down down down left up left left left up up up right right down down left down left up right right right down left
- events=walk walk pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#1 move_sticky_rigid

```text
#########
#GPL.C#.#
#GB.#.###
#.S.@...#
#......M#
#.G...M.#
#########
```

### 15. RA_PHASE_FERRY_SEARCH_667

- score=390.0 cost=23 explored=58863 probe=exhausted bypass=false missing=n/a
- inputs=left left up left down up left left up right down down right right down left left up up up left up right
- events=push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
##...G...#
#C.......#
#C...##..#
#......#.#
#...B.LP@#
#.MGS....#
##########
```

### 16. RA_PHASE_FERRY_SEARCH_1032

- score=390.0 cost=23 explored=43443 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=left up left up left up up up right down down down right right up right down down left left down right right
- events=pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
###########
#.....#..##
#..B......#
#..S#.....#
#...PL....#
#..G.M..M.#
#....@MG.G#
###########
```

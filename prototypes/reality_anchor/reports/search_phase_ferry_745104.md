# Phase Ferry Search

- seed: 745104
- iterations: 2500
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 46
- minCost: 12
- sampleMode: micro
- wallRate: 0.14
- hits: 0
- solverHits: 16

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_30

- score=610.0 cost=43 explored=5636 probe=exhausted bypass=false missing=n/a
- inputs=up up left up left down up left down right right down left left up up right right down down left left down right right up up up left left down right right down down left up up down left up right down
- events=walk walk walk walk push_object:crate#1 push_object:crate#2 walk push_object:crate#1 walk walk walk walk push_object:crate#2 push_object:crate#2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:crate#2 walk walk walk walk push_object:crate#1 box_to_sticky:n1 walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
##..C.##
#M..CG.#
##G....#
#SBLPC@#
########
```

### 2. RA_PHASE_FERRY_SEARCH_75

- score=600.0 cost=42 explored=24002 probe=exhausted bypass=false missing=n/a
- inputs=down left up right right right down down left left right right up left up left down up left down left right right right down down left up right up up left left right right down left left left up left down
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:crate#3 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk walk walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#G.BSG@..#
#.CC...LP#
##G.#.M..#
#..#..M..#
##########
```

### 3. RA_PHASE_FERRY_SEARCH_597

- score=600.0 cost=44 explored=7444 probe=exhausted bypass=false missing=n/a
- inputs=down up up right down right up left left down down left down left up down left right right right up up up left left down up right right down left down up up left down right right down down right right up up
- events=walk pull_object:crate#3 pull_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#2 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk pull_object:crate#1 pull_object:crate#1 pull_object:crate#1 walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk pull_object:crate#1 box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid

```text
#########
#.#SP.G.#
#.#BL@..#
#..GG.#C#
#C...C..#
#########
```

### 4. RA_PHASE_FERRY_SEARCH_675

- score=600.0 cost=42 explored=3443 probe=exhausted bypass=false missing=n/a
- inputs=down left down left up up left down up left down down right right left left up up right right right down down right right left down right right up up right up left left left left left down right right right
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:crate#2 pull_object:crate#3 pull_object:crate#2 walk walk pull_object:crate#2 walk walk walk walk walk pull_object:crate#3 pull_object:crate#3 walk walk walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#G...@S..#
#.....BG.#
#.CG.C.LP#
#..C#....#
##########
```

### 5. RA_PHASE_FERRY_SEARCH_1604

- score=560.0 cost=38 explored=7575 probe=exhausted bypass=false missing=n/a
- inputs=up up left left left down left down right up up right down left up right right down down right down right up right down left left up up left up left left left down down right left
- events=pull_object:sticky#3 move_sticky_rigid pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1 walk push_object:crate#1 push_object:crate#1 walk walk pull_object:crate#1 walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#3 box_to_sticky:n1 walk walk pull_object:sticky#2 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
##########
##..C...P#
##G..B.#L#
#..GMS@..#
#MG#.#M..#
##########
```

### 6. RA_PHASE_FERRY_SEARCH_1730

- score=510.0 cost=35 explored=2611 probe=exhausted bypass=false missing=n/a
- inputs=up up up right right down up right right down left up left left left down down down right right right up left up down down right right right up right up left up left
- events=walk walk walk walk walk walk pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#2 move_sticky_rigid walk walk walk push_object:sticky#3 move_sticky_rigid sticky_to_box:n1 push_object:crate#2 walk walk walk push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid walk pull_object:crate#1

```text
##########
##G....GC#
#M.M..GSB#
#..#ML#..#
##@..PM..#
##########
```

### 7. RA_PHASE_FERRY_SEARCH_1180

- score=490.0 cost=31 explored=10298 probe=exhausted bypass=false missing=n/a
- inputs=up up right right down down left up left up left left down up right right down down down left left right right up up left up left down right left
- events=walk walk walk push_object:crate#2 push_object:crate#3 push_object:crate#3 box_to_sticky:n1 sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.CG..C.#
#.....CP#
#.B#@.GL#
#MSG.M..#
#########
```

### 8. RA_PHASE_FERRY_SEARCH_749

- score=480.0 cost=30 explored=3822 probe=exhausted bypass=false missing=n/a
- inputs=down down left left left up down right right right up up down left up right down left right down left left up up down down right right up left
- events=walk walk walk walk walk walk pull_object:sticky#3 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:crate#3 push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#3 pull_object:crate#1 walk push_object:crate#3 force_chain:n2 box_to_sticky:n1 pull_object:crate#2 walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#3 walk push_object:crate#2 force_chain:n2 anchor_boundary_shift:box_sticky

```text
#########
#M.#SB.G#
#...MC.@#
#.#G.LP.#
##.M..G.#
#########
```

### 9. RA_PHASE_FERRY_SEARCH_1665

- score=480.0 cost=32 explored=9931 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=right down left down right right up up right down left down left left up up right left down left left left right right right right up down left left left up
- events=push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#.C..@P..#
#CG...LM.#
#CBS#GG..#
##########
```

### 10. RA_PHASE_FERRY_SEARCH_1722

- score=480.0 cost=30 explored=2361 probe=exhausted bypass=false missing=n/a
- inputs=down left right up right down down left left left left up right down left left up up up right down up right right down down right left left left
- events=push_object:sticky#1 move_sticky_rigid walk pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk push_object:crate#2 push_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.CBS.G.#
#P.#.@M.#
#L.C.MG##
#G......#
#########
```

### 11. RA_PHASE_FERRY_SEARCH_1874

- score=480.0 cost=32 explored=12570 probe=found bypass=true missing=material_normalization
- inputs=up left right right right down left down left up up up left left right right down left left left up left left down down up right right up right down down
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#1 walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:crate#1 push_object:crate#1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:crate#1 box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid sticky_merge:n1

```text
##########
#.PLB....#
#..MS....#
#MM..G@..#
#G.MG#...#
##########
```

### 12. RA_PHASE_FERRY_SEARCH_1285

- score=460.0 cost=28 explored=2370 probe=exhausted bypass=false missing=n/a
- inputs=up up right right right right left left down right right down right up right left down left up right left down left left up right up left
- events=walk walk walk walk walk walk pull_object:crate#1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 sticky_merge:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:crate#2 walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk push_object:crate#1

```text
##########
#.G...CGM#
#...PLC..#
#@.C...BS#
##########
```

### 13. RA_PHASE_FERRY_SEARCH_1990

- score=460.0 cost=32 explored=417 probe=found bypass=true missing=material_normalization,sticky_merge
- inputs=down up right right down down left right up up left left down left left down right up up left left down right left down right up up left left down right
- events=push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#....@...#
#BP.GC#.C#
#SLGM....#
##########
```

### 14. RA_PHASE_FERRY_SEARCH_207

- score=450.0 cost=29 explored=6144 probe=exhausted bypass=false missing=n/a
- inputs=right down up left left down down left down right right up up up left down right right right up right right left down down right left up down
- events=walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk pull_object:sticky#2 move_sticky_rigid pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_to_box:n2

```text
##########
#P.@...MG#
#L.S...#.#
#.GBC#..C#
#......G##
##########
```

### 15. RA_PHASE_FERRY_SEARCH_814

- score=450.0 cost=27 explored=12311 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=up left down down right right right up left down left left up left left down down right right left left up up right right left left
- events=pull_object:crate#1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 walk walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n3 pull_object:crate#2

```text
########
#.#..M.#
#.G.@..#
#GG.C..#
#.PLBSM#
########
```

### 16. RA_PHASE_FERRY_SEARCH_564

- score=440.0 cost=30 explored=31784 probe=found bypass=true missing=sticky_merge
- inputs=down down left up right up left left right right right down down left left left up up right right right down right down left left left up down left
- events=walk walk pull_object:sticky#2 move_sticky_rigid walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#PL.G@..G#
#..M...M.#
#G....MSB#
##########
```

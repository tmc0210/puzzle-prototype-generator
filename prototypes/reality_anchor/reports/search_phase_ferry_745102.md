# Phase Ferry Search

- seed: 745102
- iterations: 1800
- maxStates: 120000
- graphMaxStates: 160000
- maxDepth: 50
- minCost: 12
- sampleMode: micro
- wallRate: 0.15
- hits: 2
- solverHits: 11

## 1. RA_PHASE_FERRY_SEARCH_585

- score=542.3 cost=29 explored=219 graphStates=290 winStates=24 probeStates=320 scc=one_win_continuation_per_scc
- inputs=up left up left down down down left left right right up up up left down up right down down down left left left left up right up down
- events=walk walk pull_object:sticky#3 move_sticky_rigid walk walk walk walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#PLM.G.##
#G.#....#
#.BSMGM@#
#.C...M.#
#########
```

## 2. RA_PHASE_FERRY_SEARCH_1778

- score=428.3 cost=17 explored=365 graphStates=991 winStates=3 probeStates=1103 scc=branching_win_dag
- inputs=down right right right up left left down left up down right right right right up down
- events=walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#G.#MPL..#
#.@BSG.M.#
#..C.....#
##########
```

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_220

- score=630.0 cost=45 explored=26894 probe=exhausted bypass=false missing=n/a
- inputs=down left left left down right up left up up left right right right down right up down left left down left down left left up down right right up up up left left down up right right right right right down left left left
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

```text
########
#.P..SB#
#GL.M.@#
#.#....#
#GM..M##
########
```

### 2. RA_PHASE_FERRY_SEARCH_144

- score=610.0 cost=43 explored=11512 probe=exhausted bypass=false missing=n/a
- inputs=right right right right down right up left left down down left left up up right right down down right down left up up right left up right right right down left down right up up left left left down down right right
- events=walk walk walk walk walk pull_object:crate#1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#3 box_to_sticky:n1 walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:crate#3 push_object:crate#3 box_to_sticky:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#.@......#
#PL.#C...#
##C....BG#
##.M#G.SG#
##########
```

### 3. RA_PHASE_FERRY_SEARCH_149

- score=530.0 cost=35 explored=1874 probe=found bypass=true missing=sticky_merge
- inputs=down right up up down right down left up left down left up left right up right down down left up right down left right up left down up right right right up down down
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#3 box_to_sticky:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:sticky#3 move_sticky_rigid walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk walk walk push_object:sticky#2 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#3 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#3 move_sticky_rigid

```text
#########
#.#.#BCC#
#M.#GS..#
##L..@.G#
#.PM..G.#
#########
```

### 4. RA_PHASE_FERRY_SEARCH_857

- score=530.0 cost=37 explored=7023 probe=exhausted bypass=false missing=n/a
- inputs=left up right down up left down down left left up left up right right down down left left right right up left up left left right right right down down left left left left up down
- events=walk walk push_object:sticky#2 move_sticky_rigid walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 push_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk pull_object:crate#1

```text
##########
#....P.MG#
#G#.GL.@.#
#BSM...MM#
##########
```

### 5. RA_PHASE_FERRY_SEARCH_585

- score=450.0 cost=29 explored=219 probe=complete bypass=false missing=n/a
- inputs=up left up left down down down left left right right up up up left down up right down down down left left left left up right up down
- events=walk walk pull_object:sticky#3 move_sticky_rigid walk walk walk walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#PLM.G.##
#G.#....#
#.BSMGM@#
#.C...M.#
#########
```

### 6. RA_PHASE_FERRY_SEARCH_679

- score=420.0 cost=24 explored=3302 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=down right right down up left up right right down right down down left up left down right up left left up left up
- events=walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 pull_object:crate#2 walk push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#3 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#@...C.#
#G..C..#
#LM...C#
#P#SBG.#
########
```

### 7. RA_PHASE_FERRY_SEARCH_1038

- score=400.0 cost=22 explored=2934 probe=found bypass=true missing=sticky_merge
- inputs=right left up up right right left down up right down right right left down right right up up left left left
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 push_object:crate#1 walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:crate#1 force_chain:n4 anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull pull_object:crate#2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
##########
#GM..PC..#
#GM..L..##
#@.SB..C##
##########
```

### 8. RA_PHASE_FERRY_SEARCH_1718

- score=370.0 cost=21 explored=14956 probe=found bypass=true missing=box_sticky_anchor_shift,sticky_merge
- inputs=left down right up right down right down down left up right up right down down left left up right down
- events=walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.@.#SB.#
#PL...C.#
#M.G...G#
#G...M..#
#########
```

### 9. RA_PHASE_FERRY_SEARCH_1287

- score=360.0 cost=22 explored=25514 probe=exhausted bypass=false missing=n/a
- inputs=down down up right right right down up up left left left left down down down right right up down right right
- events=walk walk pull_object:crate#1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#..@...#.#
#SB....G.#
#......G.#
#M.C..LPC#
##########
```

### 10. RA_PHASE_FERRY_SEARCH_156

- score=350.0 cost=21 explored=675 probe=found bypass=true missing=sticky_rigid_move
- inputs=left right right right up up left left up left left left down right right down right left down left left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
#.....#.#
##SM....#
#.B#C.CG#
#GPL.@..#
#########
```

### 11. RA_PHASE_FERRY_SEARCH_1778

- score=310.0 cost=17 explored=365 probe=complete bypass=false missing=n/a
- inputs=down right right right up left left down left up down right right right right up down
- events=walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#G.#MPL..#
#.@BSG.M.#
#..C.....#
##########
```

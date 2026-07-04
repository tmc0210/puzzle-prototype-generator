# Soft Handoff Search

- seed: 742012
- iterations: 2500
- maxStates: 70000
- graphMaxStates: 90000
- maxDepth: 36
- costRange: 8-18
- wallRate: 0.12
- hits: 5
- solverHits: 24

## 1. RA_SOFT_HANDOFF_SEARCH_742012_842

- score=486.1 cost=13 explored=119 graphStates=156 winStates=2 probeStates=266 scc=one_win_continuation_per_scc
- inputs=down left left left left up down right right right up down right
- events=walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
#######
#..C#.#
#G.PL##
#MSB.@#
#...G.#
#######
```

## 2. RA_SOFT_HANDOFF_SEARCH_742012_1474

- score=471.1 cost=12 explored=61 graphStates=82 winStates=6 probeStates=95 scc=one_win_continuation_per_scc
- inputs=left left left left down up right right right right down left
- events=walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#...G.@M#
#C.GLP.##
#BS#.#..#
#########
```

## 3. RA_SOFT_HANDOFF_SEARCH_742012_718

- score=468.5 cost=17 explored=1075 graphStates=1250 winStates=1 probeStates=1282 scc=branching_win_dag
- inputs=down right right up left up right right right left down down right up right right up
- events=walk walk walk push_object:crate#2 walk walk push_object:crate#2 push_object:crate#2 push_object:crate#2 box_to_sticky:n1 walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##..C#G##
##......#
#@.C.BSG#
#.....PL#
#########
```

## 4. RA_SOFT_HANDOFF_SEARCH_742012_1377

- score=414.7 cost=8 explored=91 graphStates=107 winStates=2 probeStates=107 scc=branching_win_dag
- inputs=down left left up down down left right
- events=push_object:sticky#2 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1

```text
#######
#CG..M#
#.BS.@#
#PCG.M#
#L..#.#
#######
```

## 5. RA_SOFT_HANDOFF_SEARCH_742012_720

- score=345.6 cost=8 explored=40 graphStates=69 winStates=7 probeStates=69 scc=one_win_continuation_per_scc
- inputs=right left up left left down up left
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#..G..LP#
#..G#@.S#
##.C#CGB#
#########
```

## Solver-Only Material

### 1. RA_SOFT_HANDOFF_SEARCH_742012_1733

- score=380.0 cost=15 explored=941 probe=found bypass=true missing=material_normalization
- inputs=right down left left down right up right right up right up left left down
- events=walk pull_object:sticky#1 move_sticky_rigid walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
########
#.MM..C#
##@..G.#
#...GSB#
#.PLG..#
########
```

### 2. RA_SOFT_HANDOFF_SEARCH_742012_679

- score=376.0 cost=12 explored=506 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=down left up right down right down right up down left left
- events=walk walk pull_object:crate#1 box_to_sticky:n1 walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#....P.M#
##.@ML#.#
#G....S##
#.C.G.B.#
#########
```

### 3. RA_SOFT_HANDOFF_SEARCH_742012_106

- score=372.0 cost=17 explored=380 probe=exhausted bypass=false missing=n/a
- inputs=down down down left right up up left left down left left down right left left up
- events=walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#M..#C.@#
#MGPL...#
#.....C.#
#..GSB..#
#########
```

### 4. RA_SOFT_HANDOFF_SEARCH_742012_842

- score=370.0 cost=13 explored=119 probe=complete bypass=false missing=n/a
- inputs=down left left left left up down right right right up down right
- events=walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1

```text
#######
#..C#.#
#G.PL##
#MSB.@#
#...G.#
#######
```

### 5. RA_SOFT_HANDOFF_SEARCH_742012_1862

- score=370.0 cost=13 explored=1948 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=down right right up left left left left down down right right right
- events=walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid

```text
#########
#BS...G##
#C..@LP.#
#..M....#
#...G..##
#########
```

### 6. RA_SOFT_HANDOFF_SEARCH_742012_2129

- score=368.0 cost=10 explored=82 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=up right left down right right up up left left
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#######
#GCC.P#
#G...L#
#SB@..#
#######
```

### 7. RA_SOFT_HANDOFF_SEARCH_742012_292

- score=358.0 cost=12 explored=843 probe=found bypass=true missing=pull_event
- inputs=left left left left down right down right right left up up
- events=walk walk walk push_object:crate#1 push_object:crate#2 box_to_sticky:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##...G.##
#.C...@.#
#.CPLB..#
#...MS.G#
#########
```

### 8. RA_SOFT_HANDOFF_SEARCH_742012_743

- score=358.0 cost=14 explored=854 probe=found bypass=true missing=material_normalization
- inputs=left up down left up left up right right right left down down right
- events=walk walk pull_object:crate#1 walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1

```text
#########
#.M.SB.P#
##...CGL#
##....#.#
#....G@.#
#########
```

### 9. RA_SOFT_HANDOFF_SEARCH_742012_1474

- score=358.0 cost=12 explored=61 probe=complete bypass=false missing=n/a
- inputs=left left left left down up right right right right down left
- events=walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#...G.@M#
#C.GLP.##
#BS#.#..#
#########
```

### 10. RA_SOFT_HANDOFF_SEARCH_742012_2008

- score=358.0 cost=14 explored=2495 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=up left down down left up left up right right right right down up
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk pull_object:crate#1 box_to_sticky:n1

```text
########
#....G.#
#M...@G#
#....SM#
#.PLCB.#
########
```

### 11. RA_SOFT_HANDOFF_SEARCH_742012_643

- score=356.0 cost=17 explored=766 probe=exhausted bypass=false missing=n/a
- inputs=left down down left up right down down left left up up down right down right up
- events=walk walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull box_to_sticky:n2 sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
#SB.G@#
#.CL.C#
#GCP..#
#G...##
#######
```

### 12. RA_SOFT_HANDOFF_SEARCH_742012_108

- score=354.0 cost=13 explored=124 probe=exhausted bypass=false missing=n/a
- inputs=left down left down down right up up up left left left down
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
########
#.MPL.@#
#BS...##
#G....##
#..MG.##
########
```

### 13. RA_SOFT_HANDOFF_SEARCH_742012_526

- score=352.0 cost=16 explored=1423 probe=found bypass=true missing=material_normalization
- inputs=right right right right down left left left right down left left down left left up
- events=pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#SB@....#
#.GC....#
#PL...###
#.GGCC..#
#########
```

### 14. RA_SOFT_HANDOFF_SEARCH_742012_705

- score=352.0 cost=16 explored=274 probe=exhausted bypass=false missing=n/a
- inputs=left up up down down left up up up right down left down down right right
- events=walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1

```text
#######
#PL.CB#
#.M.GS#
##...M#
#...G@#
#######
```

### 15. RA_SOFT_HANDOFF_SEARCH_742012_2244

- score=350.0 cost=10 explored=567 probe=found bypass=true missing=pull_event,material_normalization
- inputs=left left down left up right up right right right
- events=push_object:crate#1 push_object:crate#1 force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 pull_object:crate#1

```text
########
#GL..G.#
#.P.C@C#
#.SB..##
#..G..C#
########
```

### 16. RA_SOFT_HANDOFF_SEARCH_742012_910

- score=346.0 cost=11 explored=121 probe=found bypass=true missing=pull_event
- inputs=up left left left left down right down down right left
- events=walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk pull_object:crate#3

```text
#######
#.....#
#MSGP@#
#GBCL.#
#..GC.#
#######
```

### 17. RA_SOFT_HANDOFF_SEARCH_742012_1499

- score=346.0 cost=15 explored=130 probe=found bypass=true missing=material_normalization
- inputs=left up left left left left down right up right down left down right right
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.....M#
#.PL.G@#
#C..BSG#
########
```

### 18. RA_SOFT_HANDOFF_SEARCH_742012_678

- score=342.0 cost=12 explored=309 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=up up left right down left down right right up left right
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
#PL...#
##BGG.#
#MS.@.#
#..MG.#
#######
```

### 19. RA_SOFT_HANDOFF_SEARCH_742012_2067

- score=342.0 cost=12 explored=87 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=left down left down right up up up left down left right
- events=walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##.P.S..#
###LGB.@#
#..CC..##
#.#..G..#
#########
```

### 20. RA_SOFT_HANDOFF_SEARCH_742012_198

- score=338.0 cost=17 explored=1453 probe=found bypass=true missing=material_normalization
- inputs=left down down right up down right up up up left left down right down up up
- events=pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull box_to_sticky:n1 pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#M...GMS#
##C...@B#
##.#...G#
#..PL...#
#########
```

### 21. RA_SOFT_HANDOFF_SEARCH_742012_369

- score=330.0 cost=11 explored=204 probe=found bypass=true missing=material_normalization
- inputs=down right left up up down right up right right right
- events=walk walk pull_object:sticky#1 move_sticky_rigid walk walk pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.PLC.###
#.B...G.#
#.S@G#..#
#....M..#
#########
```

### 22. RA_SOFT_HANDOFF_SEARCH_742012_847

- score=326.0 cost=12 explored=182 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=right up left up right up left left left down left down
- events=walk walk pull_object:sticky#2 move_sticky_rigid walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#PL....##
#.G.B...#
#..#S.GM#
#M...@.M#
#########
```

### 23. RA_SOFT_HANDOFF_SEARCH_742012_716

- score=322.0 cost=17 explored=239 probe=found bypass=true missing=material_normalization
- inputs=down right down right down left left up right left left up right down down right up
- events=walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#######
#C.@.G#
#BS.GM#
#.PL..#
##M...#
#######
```

### 24. RA_SOFT_HANDOFF_SEARCH_742012_718

- score=322.0 cost=17 explored=1075 probe=complete bypass=false missing=n/a
- inputs=down right right up left up right right right left down down right up right right up
- events=walk walk walk push_object:crate#2 walk walk push_object:crate#2 push_object:crate#2 push_object:crate#2 box_to_sticky:n1 walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##..C#G##
##......#
#@.C.BSG#
#.....PL#
#########
```

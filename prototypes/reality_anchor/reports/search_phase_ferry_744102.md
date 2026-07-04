# Phase Ferry Search

- seed: 744102
- iterations: 1000
- maxStates: 90000
- graphMaxStates: 120000
- maxDepth: 60
- minCost: 12
- sampleMode: micro
- wallRate: 0.14
- hits: 1
- solverHits: 14

## 1. RA_PHASE_FERRY_SEARCH_184

- score=357.2 cost=14 explored=188 graphStates=287 winStates=13 probeStates=538 scc=one_win_continuation_per_scc
- inputs=right left left down down left left up down right right up up right
- events=walk pull_object:crate#2 pull_object:crate#2 pull_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.#CG#.#
#BL.@.C#
#SPG.M##
#...#M##
########
```

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_530

- score=690.0 cost=51 explored=1694 probe=found bypass=true missing=push_pull_anchor_shift
- inputs=right down down right right left down up left up up right left down down right right right up right down left down right up up left left right right down down left up down right up up left left left left down right right left left up right right down
- events=walk walk walk walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk pull_object:crate#1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk walk walk push_object:crate#2 force_chain:n2 pull_object:crate#2 walk walk walk walk walk walk walk walk walk walk pull_object:crate#2 pull_object:crate#2 box_to_sticky:n1 walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#########
#@...G###
#M.MSB..#
#....C.L#
#.#G#..P#
#########
```

### 2. RA_PHASE_FERRY_SEARCH_628

- score=640.0 cost=46 explored=38797 probe=exhausted bypass=false missing=n/a
- inputs=up left up left right down right up left right down right up left right down right right up up left left right right down left right right down left left left up up right left down right left left left up left down left up
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n3 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk walk walk pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:crate#1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#2 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:crate#1 walk walk push_object:crate#2 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
##########
#M.G...G.#
#MLP...G.#
#SB......#
#.#C@#.CC#
##########
```

### 3. RA_PHASE_FERRY_SEARCH_405

- score=550.0 cost=41 explored=20800 probe=exhausted bypass=false missing=n/a
- inputs=up right up left down down left left left left up up left down right down right right right right down right up left left left left up left up left left down down right up up right right left left
- events=walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk pull_object:crate#1 walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#...CB...#
#..G.S#..#
#..GMM.@L#
#.G.#.M.P#
##########
```

### 4. RA_PHASE_FERRY_SEARCH_898

- score=490.0 cost=31 explored=42705 probe=exhausted bypass=false missing=n/a
- inputs=left left down left left left up right down down down left up right up right right right up left left down left up right right down down up up right
- events=walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1 walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:crate#1 walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid

```text
#########
#...G.@##
#..LPG.G#
#M.M.S..#
#...CB..#
#########
```

### 5. RA_PHASE_FERRY_SEARCH_309

- score=480.0 cost=30 explored=16067 probe=found bypass=true missing=sticky_merge
- inputs=right right down right right down right right down left left left up left left up up left down up right down down down right right right up left left
- events=walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 push_object:crate#3 push_object:crate#3 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
##########
##@..C#..#
#.MMG....#
#GLGSB...#
##P.M....#
##########
```

### 6. RA_PHASE_FERRY_SEARCH_431

- score=480.0 cost=30 explored=3422 probe=found bypass=true missing=sticky_rigid_move
- inputs=right down right up left left left down down up left left left up right right right right down left down up left down left right up up left down
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk pull_object:crate#3 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky

```text
#########
#.PL.@..#
#...BS..#
#GCC..#.#
#G#GC#.##
#########
```

### 7. RA_PHASE_FERRY_SEARCH_710

- score=480.0 cost=32 explored=2849 probe=found bypass=true missing=sticky_merge
- inputs=up right right right right down down left right up up left left left down down left right up up left down up right right right right down left down left left
- events=walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk pull_object:crate#3 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk walk push_object:crate#2 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#1 move_sticky_rigid walk push_object:crate#2 force_chain:n2 anchor_boundary_shift:push_pull

```text
########
#C.....#
#P@GBS.#
#L.CC.M#
#G..#..#
########
```

### 8. RA_PHASE_FERRY_SEARCH_900

- score=480.0 cost=30 explored=22485 probe=found bypass=true missing=sticky_merge
- inputs=down left left left up right down down left left up right down right up left up up right right left left left down down right right down left left
- events=pull_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:crate#3 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk walk push_object:crate#2 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 walk push_object:crate#3 push_object:crate#4 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:crate#3

```text
#########
#C.PL.M##
#.C.C.@##
##.G....#
#G...BS.#
#########
```

### 9. RA_PHASE_FERRY_SEARCH_191

- score=460.0 cost=30 explored=8053 probe=found bypass=true missing=box_sticky_anchor_shift
- inputs=right up left down left left up right right down down right up up left left left down down left up down right right up right up left left left
- events=walk pull_object:crate#2 box_to_sticky:n1 walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky push_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

```text
#########
#GG.....#
#.SM..@.#
#.BCPLGC#
#########
```

### 10. RA_PHASE_FERRY_SEARCH_408

- score=390.0 cost=21 explored=1296 probe=found bypass=true missing=box_sticky_anchor_shift,material_normalization
- inputs=right up right left left down down right right right right right up left left left right up left left down
- events=walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
##G...SBC#
#..@.MLP.#
#..GM....#
##########
```

### 11. RA_PHASE_FERRY_SEARCH_360

- score=340.0 cost=18 explored=417 probe=found bypass=true missing=sticky_merge
- inputs=down up right right down up right right down down right down left left left up left up
- events=walk pull_object:crate#4 walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n4 sticky_merge:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3

```text
#########
#G@....##
#C.C...C#
##C.B#..#
#.GGSLP.#
#########
```

### 12. RA_PHASE_FERRY_SEARCH_839

- score=310.0 cost=15 explored=1880 probe=found bypass=true missing=sticky_merge
- inputs=up left down right right right up right down down right left down left left
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:sticky#3 move_sticky_rigid sticky_to_box:n1 walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

```text
##########
#..LPSBG.#
#.@......#
#...#.CG.#
#GM.M.#..#
##########
```

### 13. RA_PHASE_FERRY_SEARCH_184

- score=300.0 cost=14 explored=188 probe=complete bypass=false missing=n/a
- inputs=right left left down down left left up down right right up up right
- events=walk pull_object:crate#2 pull_object:crate#2 pull_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
########
#.#CG#.#
#BL.@.C#
#SPG.M##
#...#M##
########
```

### 14. RA_PHASE_FERRY_SEARCH_487

- score=260.0 cost=12 explored=346 probe=found bypass=true missing=sticky_rigid_move
- inputs=down left left down down right right right right up left left
- events=walk walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#.#..@.G#
#C....#B#
#M#GLP.S#
#.M.....#
#########
```

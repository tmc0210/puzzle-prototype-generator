# Phase Ferry Search

- seed: 741008
- iterations: 260
- maxStates: 50000
- graphMaxStates: 90000
- maxDepth: 85
- minCost: 12
- hits: 0
- solverHits: 9

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_21

- score=740.0 cost=58 explored=20017 probe=exhausted bypass=false missing=n/a
- inputs=left up left down down right right up up left up left down down down left left left up right up right down right left left down right right up right up up left down right down left left down left left up up right right down down left up right up left left left down left up
- events=walk pull_object:sticky#3 move_sticky_rigid walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk pull_object:sticky#2 move_sticky_rigid walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
##########
#G.#.B.G##
#....S...#
#...PL..@#
#MM..M.MG#
##########
```

### 2. RA_PHASE_FERRY_SEARCH_243

- score=680.0 cost=52 explored=25738 probe=exhausted bypass=false missing=n/a
- inputs=down right right up left left down down right up right left left up right right left down down right up right right left left down left left up left left down down right up up left up right right right right left down right right right down up left left left
- events=walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk walk push_object:crate#1 box_to_sticky:n1 walk walk pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk push_object:crate#1 push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:crate#2 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#..@GG.S.#
#....GCB.#
#.C.PL#G.#
#..##.CCC#
##########
```

### 3. RA_PHASE_FERRY_SEARCH_120

- score=510.0 cost=35 explored=22619 probe=exhausted bypass=false missing=n/a
- inputs=down right right down down right down right up down right up left left left up up right right down right right up down left left down right right up left left down right left
- events=push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#4 move_sticky_rigid walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk walk pull_object:sticky#4 move_sticky_rigid sticky_merge:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n1 walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky

```text
#########
#@...#.M#
#M...MGG#
#G#.#...#
#...PL.M#
#...GS..#
#....B..#
#########
```

### 4. RA_PHASE_FERRY_SEARCH_22

- score=450.0 cost=31 explored=670 probe=found bypass=true missing=sticky_rigid_move
- inputs=up right left left down right right right up up right left left down down right right down left up left left down left up up up right right left left
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk pull_object:crate#2 pull_object:crate#2 walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#3 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
##########
#..GS.MMM#
#...BLP.C#
#G@....#.#
#..#CGC..#
##########
```

### 5. RA_PHASE_FERRY_SEARCH_222

- score=450.0 cost=29 explored=37415 probe=exhausted bypass=false missing=n/a
- inputs=up right up right down down left left up right up up left down down up right right down right left left up up right right down down right
- events=push_object:crate#3 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#2 force_chain:n2 push_object:crate#3 push_object:crate#3 box_to_sticky:n1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
##########
#GCCPL..##
#..G...#.#
#..C...B##
#MG@..GS.#
##########
```

### 6. RA_PHASE_FERRY_SEARCH_187

- score=440.0 cost=26 explored=19883 probe=exhausted bypass=false missing=n/a
- inputs=down left up right down down right up left up right up left left right down down left left up right right right down right up
- events=walk push_object:sticky#2 move_sticky_rigid walk pull_object:crate#1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid sticky_to_box:n1

```text
#########
#..LP.G.#
##C.@B.G#
#G.M.S.M#
#M....MM#
#########
```

### 7. RA_PHASE_FERRY_SEARCH_151

- score=390.0 cost=25 explored=46757 probe=exhausted bypass=false missing=n/a
- inputs=left left down right up right right down right up up right up left up left down up left left down right left left down
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 walk push_object:crate#2 push_object:crate#1 box_to_sticky:n1 push_object:sticky#2 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
#.LPM....##
#.S.M.....#
#.B#.GG.#.#
#...@C....#
#.G.#.C...#
###########
```

### 8. RA_PHASE_FERRY_SEARCH_159

- score=380.0 cost=22 explored=19524 probe=exhausted bypass=false missing=n/a
- inputs=up up right up right right down right down left right down left left left right right down right up up up
- events=pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:sticky#3 move_sticky_rigid push_object:sticky#3 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##.M...G#
#....LP.#
#..G.GM.#
#MM@SG..#
#..CB#..#
#########
```

### 9. RA_PHASE_FERRY_SEARCH_211

- score=340.0 cost=20 explored=3423 probe=found bypass=true missing=material_normalization
- inputs=left down down left up left left down right up right right up up right up right down left down
- events=walk pull_object:crate#1 pull_object:crate#1 pull_object:sticky#2 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk push_object:crate#1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n2 pull_object:crate#2 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
#...PL..#
#.#.#CG.#
#...#.@##
#.B.G.G##
#.SM..M##
#########
```

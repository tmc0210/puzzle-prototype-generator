# Phase Ferry Search

- seed: 741101
- iterations: 500
- maxStates: 70000
- graphMaxStates: 120000
- maxDepth: 90
- minCost: 10
- sampleMode: lean
- wallRate: 0.18
- hits: 0
- solverHits: 5

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_194

- score=590.0 cost=41 explored=14998 probe=exhausted bypass=false missing=n/a
- inputs=down right up up down right right up up right right up right right down left left left up right down left down left down left left down right right right right left left up up up right right right right
- events=walk push_object:sticky#1 move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_to_box:n2 walk walk walk pull_object:crate#2 pull_object:crate#2 walk walk walk walk walk pull_object:crate#1 walk walk pull_object:crate#1 box_to_sticky:n1 walk walk walk walk walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#2 move_sticky_rigid

```text
###########
#..#...G.##
#........G#
##B#CC#..##
#@S..#.#.M#
#.M.PL...G#
###########
```

### 2. RA_PHASE_FERRY_SEARCH_180

- score=430.0 cost=27 explored=22163 probe=exhausted bypass=false missing=n/a
- inputs=left right down down down left left up right up left left up right down right up down down left left left left down left up up
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:crate#1 pull_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1 push_object:crate#1 push_object:crate#1 push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

```text
###########
#G....#.GM#
#M..#PL.@.#
#M.#...S..#
##.....B.##
#........C#
###########
```

### 3. RA_PHASE_FERRY_SEARCH_175

- score=410.0 cost=25 explored=54198 probe=exhausted bypass=false missing=n/a
- inputs=left down right right up left up left down right down left left left left left up left up right right right down right up
- events=push_object:sticky#3 move_sticky_rigid sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3

```text
###########
#C..#.B.G.#
#.....SLPG#
#..M.M.M@.#
#G........#
###########
```

### 4. RA_PHASE_FERRY_SEARCH_138

- score=390.0 cost=23 explored=4127 probe=found bypass=true missing=push_pull_anchor_shift,sticky_merge
- inputs=right down down left right up up left left down down left down left left right up up left down up right down
- events=walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:sticky#3 move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
##########
#..PL..@.#
#.M.GM.#.#
#..M.GS..#
#.G...B..#
##########
```

### 5. RA_PHASE_FERRY_SEARCH_232

- score=340.0 cost=18 explored=6333 probe=exhausted bypass=false missing=n/a
- inputs=left down left up up right right right down left up left up up up right right right
- events=pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#2 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid walk walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
###########
#...G.B...#
#..G.#S.G.#
#..M.#...##
#.#.MM....#
#....@LP.##
#.........#
###########
```

# Phase Ferry Search

- seed: 741009
- iterations: 260
- maxStates: 50000
- graphMaxStates: 90000
- maxDepth: 85
- minCost: 12
- hits: 0
- solverHits: 5

## Solver-Only Material

### 1. RA_PHASE_FERRY_SEARCH_150

- score=1030.0 cost=85 explored=36450 probe=exhausted bypass=false missing=n/a
- inputs=down down right right right up up up right right down up left left down down right right up left up left left down right up right left down down right right left down left up up right left left up right right left down down down right up right right up left right down left left down left up up down right left down right right right up up up left down down down right up up down down left up up right right
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#2 push_object:crate#2 walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#2 walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#2 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk push_object:crate#2 walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk pull_object:crate#2 walk walk walk walk walk walk pull_object:crate#2 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid

```text
##########
#C.GGC...#
#@#..B.G.#
#..#.SM.G#
#.PL...M##
##########
```

### 2. RA_PHASE_FERRY_SEARCH_209

- score=610.0 cost=45 explored=9411 probe=exhausted bypass=false missing=n/a
- inputs=up up right right down left up down down right up down right down left up left left left up left up down down right right right up up down down left up left down left left up up up up right right right right
- events=walk walk walk walk walk push_object:sticky#3 move_sticky_rigid sticky_merge:n1 walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n3 walk walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#3 force_chain:n2 walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1

```text
#########
#.B...G##
#.S.#M#.#
#..#G...#
#..M.M..#
#.G.@M..#
##.#.LP.#
#########
```

### 3. RA_PHASE_FERRY_SEARCH_104

- score=480.0 cost=30 explored=1047 probe=exhausted bypass=false missing=n/a
- inputs=up up right down left down left left left up left left left up right right right down right up left up right down down down right right up down
- events=walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk walk pull_object:sticky#2 move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk push_object:crate#1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk pull_object:crate#2 box_to_sticky:n1

```text
##########
#G#...BG.#
#MPLM.S..#
#..G.M#G.#
##.M...@.#
##########
```

### 4. RA_PHASE_FERRY_SEARCH_9

- score=390.0 cost=23 explored=11836 probe=exhausted bypass=false missing=n/a
- inputs=down down down left left left up right left left left up up right right right right down down right right right down
- events=walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:crate#1 push_object:crate#1 push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n3 anchor_boundary_shift:box_sticky walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n3

```text
##########
#.C..C@B.#
#.MGM..S.#
#..MPL..G#
###...G#.#
##########
```

### 5. RA_PHASE_FERRY_SEARCH_249

- score=340.0 cost=16 explored=26752 probe=exhausted bypass=false missing=n/a
- inputs=right right down left down right right up right right up right up up left left
- events=walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 pull_object:sticky#2 force_chain:n2 move_sticky_rigid sticky_to_box:n2 pull_object:crate#1 pull_object:crate#1

```text
##########
#.....G..#
#.#.G...C#
#@.B....C#
#GMS.GM.##
#..PLM...#
##########
```

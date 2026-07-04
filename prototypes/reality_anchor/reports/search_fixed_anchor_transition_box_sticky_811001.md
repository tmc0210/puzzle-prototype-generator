# Fixed Anchor Transition Search

- fixedKind: box_sticky
- seed: 811001
- iterations: 3500
- maxStates: 80000
- graphMaxStates: 120000
- maxDepth: 28
- costRange: 6-16
- wallRate: 0.1
- requiredGroups: movable_push_pull_shift, fixed_box_sticky_effect, pull_event
- forbiddenReachable: anchor_boundary_shift:box_sticky
- hits: 5

## 1. RA_FIXED_BOX_STICKY_SEARCH_811001_156

- score=365.4 cost=12 explored=77 graphStates=93 winStates=1 probeStates=93 scc=one_win_continuation_per_scc scripted=3/6
- inputs=down left left down left left up right right right right up
- events=walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 push_object:crate#2 push_object:crate#1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- forbiddenHits=none

```text
########
##BS####
########
##G..#@#
#...MGG#
#..M.PL#
########
```

## 2. RA_FIXED_BOX_STICKY_SEARCH_811001_2881

- score=345.1 cost=11 explored=35 graphStates=44 winStates=10 probeStates=98 scc=one_win_continuation_per_scc scripted=0/1
- inputs=right down right up left left left down down right left
- events=walk push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- forbiddenHits=none

```text
########
####BS##
########
#C.P@..#
#.GL#M.#
#.#.G..#
########
```

## 3. RA_FIXED_BOX_STICKY_SEARCH_811001_1732

- score=336.4 cost=10 explored=152 graphStates=288 winStates=12 probeStates=454 scc=one_win_continuation_per_scc scripted=1/3
- inputs=up up right down right right down left left left
- events=walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- forbiddenHits=none

```text
##########
###BS#####
##########
#..#.PL..#
###C..G..#
#.#G@M..##
##########
```

## 4. RA_FIXED_BOX_STICKY_SEARCH_811001_580

- score=291.2 cost=6 explored=36 graphStates=263 winStates=16 probeStates=374 scc=branching_win_dag scripted=2/2
- inputs=left right right down up left
- events=walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid
- forbiddenHits=none

```text
########
##BS####
########
##CG@..#
###.LP.#
#C...G##
########
```

## 5. RA_FIXED_BOX_STICKY_SEARCH_811001_1629

- score=276.9 cost=10 explored=83 graphStates=595 winStates=42 probeStates=1276 scc=one_win_continuation_per_scc scripted=n/a
- inputs=down up left left down left left left up right
- events=walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk push_object:crate#1 box_to_sticky:n1
- forbiddenHits=none

```text
#########
###BS####
#########
#..CG..@#
#C....G.#
#....#PL#
#########
```

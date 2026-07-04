# Fixed Anchor Transition Search

- fixedKind: push_pull
- seed: 814001
- iterations: 7000
- maxStates: 100000
- graphMaxStates: 160000
- maxDepth: 34
- costRange: 8-20
- wallRate: 0.1
- profile: strong_material
- requiredGroups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
- forbiddenReachable: anchor_boundary_shift:push_pull
- hits: 3

## 1. RA_FIXED_PUSH_PULL_SEARCH_814001_4296

- score=376.1 cost=10 explored=103 graphStates=158 winStates=1 probeStates=219 scc=branching_win_dag scripted=5/6
- inputs=down right up up left left left right right right
- events=pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- forbiddenHits=none

```text
##########
###PL#####
##########
#..M.SB..#
##.M.M@..#
#..M..GG.#
##########
```

## 2. RA_FIXED_PUSH_PULL_SEARCH_814001_4928

- score=332.6 cost=18 explored=367 graphStates=478 winStates=1 probeStates=683 scc=branching_win_dag scripted=5/8
- inputs=right down right down left up right up left down down right right right right left left left
- events=push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:crate#1 walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- forbiddenHits=none

```text
##########
###PL#####
##########
##@M.M...#
#.GG.M.MS#
#....G..B#
##########
```

## 3. RA_FIXED_PUSH_PULL_SEARCH_814001_3249

- score=316.1 cost=17 explored=86 graphStates=98 winStates=6 probeStates=127 scc=branching_win_dag scripted=7/10
- inputs=right right up right left down right left left down right right up down left left right
- events=walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- forbiddenHits=none

```text
########
##PL####
########
#.#..SB#
#@..GMG#
#...GM.#
########
```

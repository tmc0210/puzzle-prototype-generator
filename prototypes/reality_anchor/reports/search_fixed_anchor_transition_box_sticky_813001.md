# Fixed Anchor Transition Search

- fixedKind: box_sticky
- seed: 813001
- iterations: 7000
- maxStates: 100000
- graphMaxStates: 160000
- maxDepth: 34
- costRange: 8-20
- wallRate: 0.1
- profile: strong_material
- requiredGroups: movable_push_pull_shift, fixed_box_sticky_effect, pull_event, box_to_sticky, sticky_merge, sticky_rigid_move
- forbiddenReachable: anchor_boundary_shift:box_sticky
- hits: 2

## 1. RA_FIXED_BOX_STICKY_SEARCH_813001_6944

- score=366.4 cost=9 explored=79 graphStates=188 winStates=17 probeStates=445 scc=one_win_continuation_per_scc scripted=n/a
- inputs=left down right up right right right up left
- events=walk walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- forbiddenHits=none

```text
########
##BS####
########
#.#M.GL#
#.@...P#
#.CMG..#
########
```

## 2. RA_FIXED_BOX_STICKY_SEARCH_813001_5082

- score=361.6 cost=12 explored=194 graphStates=379 winStates=11 probeStates=538 scc=one_win_continuation_per_scc scripted=3/5
- inputs=left down right up right right up left left left down right
- events=walk pull_object:sticky#1 move_sticky_rigid pull_object:crate#2 box_to_sticky:n1 sticky_merge:n1 walk pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid
- forbiddenHits=none

```text
########
##BS####
########
#..MLP.#
#.#.@G.#
#CC..G.#
########
```

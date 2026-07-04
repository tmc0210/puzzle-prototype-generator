# Phase Ferry Search

- seed: 741001
- iterations: 900
- maxStates: 70000
- graphMaxStates: 100000
- maxDepth: 80
- minCost: 16
- hits: 1

## 1. RA_PHASE_FERRY_SEARCH_852

- score=652.7 cost=56 explored=1325 graphStates=3210 winStates=194 probeStates=3350 scc=branching_win_dag
- inputs=down right right right left up up right right down left down left left up right up right up left down right right left up left down down up right left up right right down down up up left left down down left down right right right up up left up left down right down left
- events=walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid walk walk push_object:push_pull_anchor force_chain:n3 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk push_object:crate#1 walk walk walk pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n3 walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#3 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
#########
##.CPL#.#
#.#.B.GG#
#@G.S..M#
#..M.MM.#
#########
```

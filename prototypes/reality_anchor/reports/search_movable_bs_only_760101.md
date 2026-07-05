# Movable B/S Search 760101

iterations=8000 maxStates=90000 graphMaxStates=110000 maxDepth=30

## Hit 1: RA_MOVABLE_BS_SEARCH_760101_7703

score=537.2 cost=10 firstAnchorStep=6 graph=429 win=25 probe=665 scc=branching_win_dag

Source:

```text
#########
#G.M.#..#
##@BS..M#
#.G.M..M#
#########
```

Rendered:

```text
#########
#G.C.#..#
##@BS..M#
#.G.M..M#
#########
```

inputs=down right right right up left up left left down
events=walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

## Hit 2: RA_MOVABLE_BS_SEARCH_760101_5597

score=487.4 cost=9 firstAnchorStep=4 graph=115 win=11 probe=125 scc=one_win_continuation_per_scc

Source:

```text
#########
#.#.BS.M#
##M..C..#
#.@.GM.##
#########
```

Rendered:

```text
#########
#.#.BS.M#
##C..M..#
#.@.GM.##
#########
```

inputs=right up up right down right right down left
events=walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#2 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:crate#2

## Hit 3: RA_MOVABLE_BS_SEARCH_760101_1023

score=454.0 cost=13 firstAnchorStep=3 graph=221 win=17 probe=236 scc=one_win_continuation_per_scc

Source:

```text
#########
#....G#.#
#..BS#G.#
##.M.MM.#
#M@#....#
#########
```

Rendered:

```text
#########
#....G#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#########
```

inputs=up right up left up right down right down right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

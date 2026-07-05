# Movable B/S Search 760201

iterations=8000 maxStates=90000 graphMaxStates=120000 maxDepth=30

## Hit 1: RA_MOVABLE_BS_SEARCH_760201_563

score=447.2 cost=19 firstAnchorStep=6 graph=249 win=10 probe=257 scc=one_win_continuation_per_scc

Source:

```text
##########
#..G.BSGM#
#..#..CM.#
##..##@..#
##########
```

Rendered:

```text
##########
#..G.BSGM#
#..#..MM.#
##..##@..#
##########
```

inputs=right right up left up left left left right right right down down left up left left up right
events=walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:sticky#1 move_sticky_rigid sticky_merge:n1

## Hit 2: RA_MOVABLE_BS_SEARCH_760201_4214

score=443.8 cost=8 firstAnchorStep=3 graph=72 win=16 probe=72 scc=one_win_continuation_per_scc

Source:

```text
##########
#.M....CC#
#GM#.@...#
#.BS.#...#
##########
```

Rendered:

```text
##########
#.C....MM#
#GC#.@...#
#.BS.#...#
##########
```

inputs=left down left right up up left left
events=walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2

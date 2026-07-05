# L11 Start Variant Search

hits=3

## Hit 1: RA_L11_START_VARIANT_2

cost=29 graph=284706 win=3129 forcedViable=n/a forcedCommitment=n/a
firstNonWalkStep=3 firstNonWalkEvents=push_object:crate#1

```text
###########
###########
###..######
###@CCC####
###...G####
#...G....##
#.....BS.##
###########
```

inputs=up right down left down right down right right right right down left left up up left down left left up up up right down left down right right
events=walk walk push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

## Hit 2: RA_L11_START_VARIANT_0

cost=28 graph=284706 win=3129 forcedViable=n/a forcedCommitment=n/a
firstNonWalkStep=2 firstNonWalkEvents=push_object:crate#1

```text
###########
###########
###@.######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```

inputs=right down left down right down right right right right down left left up up left down left left up up up right down left down right right
events=walk push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

## Hit 3: RA_L11_START_VARIANT_1

cost=27 graph=284706 win=3129 forcedViable=n/a forcedCommitment=n/a
firstNonWalkStep=1 firstNonWalkEvents=push_object:crate#1

```text
###########
###########
###.@######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```

inputs=down left down right down right right right right down left left up up left down left left up up up right down left down right right
events=push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

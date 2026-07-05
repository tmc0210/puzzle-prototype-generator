# L11 Hard Probe: RA_CURR_L11_TMP_START_VARIANT_1_HARD

- Budget: maxStates=2000000, maxDepth=none
- Required: anchor_boundary_shift:box_sticky, box_to_sticky, sticky_merge, sticky_to_box, move_sticky_rigid, push_object:crate, post_sticky_to_box_push_object:crate

## Layout

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

## Shortest Solver Path

- Found: true
- Cost: 27
- Depth: 27
- Explored states: 4576
- Inputs: down left down right down right right right right down left left up up left down left left up up up right down left down right right
- Events: push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid

### Event Steps

- 1. down: push_object:crate#1
- 4. right: push_object:crate#3
- 11. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1
- 12. left: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1
- 15. left: push_object:sticky#1 move_sticky_rigid sticky_to_box:n2
- 23. down: push_object:crate#1 force_chain:n2
- 26. right: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1
- 27. right: push_object:sticky#1 move_sticky_rigid

## Hard Probe

- Found bypass: true
- Status: found
- Explored states: 231118
- Bypass depth: 52
- Missing features: post_sticky_to_box_push_object:crate
- Bypass inputs: down left down right down right right right right down left left up up left right up left down down right down left left up left up right down left left left down right right up up right right down right down left up up left left up up right down down
- Bypass events: push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
